import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { hashPassword } from "@/lib/password";
import { createNotification, sendAccessRequestDecisionEmail } from "@/lib/notifications";
import { generateTemporaryPassword } from "@/lib/access-requests";

function requireAdmin(auth: { role: string } | null) {
  if (!auth || auth.role !== "Admin") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  return null;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await getAuthFromRequest(req);
  const adminError = requireAdmin(auth);
  if (adminError) return adminError;

  const { id } = await params;
  const accessRequestId = parseInt(id, 10);
  if (Number.isNaN(accessRequestId)) {
    return NextResponse.json({ error: "Invalid access request ID" }, { status: 400 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const decision = String(body.decision || "").trim().toUpperCase();
    const reviewNote = String(body.reviewNote || "").trim() || null;

    if (!["APPROVED", "DENIED"].includes(decision)) {
      return NextResponse.json({ error: "A valid decision is required" }, { status: 400 });
    }

    const requestRecord = await prisma.accessRequest.findUnique({
      where: { id: accessRequestId },
    });

    if (!requestRecord) {
      return NextResponse.json({ error: "Access request not found" }, { status: 404 });
    }

    if (requestRecord.status !== "PENDING") {
      return NextResponse.json({ error: "This request has already been reviewed" }, { status: 409 });
    }

    const actorName = auth.name?.trim() || auth.email.split("@")[0];

    if (decision === "DENIED") {
      const updated = await prisma.accessRequest.update({
        where: { id: accessRequestId },
        data: {
          status: "DENIED",
          reviewNote,
          reviewedAt: new Date(),
          reviewedByEmail: auth.email,
        },
      });

      await sendAccessRequestDecisionEmail({
        recipientEmail: updated.email,
        recipientName: updated.fullName,
        actorName,
        actorRole: auth.role,
        requestedRole: updated.requestedRole,
        department: updated.department,
        hodName: updated.hodName,
        reviewNote,
        status: "DENIED",
      });

      return NextResponse.json(updated);
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: requestRecord.email.toLowerCase() },
      select: { id: true },
    });

    if (existingUser) {
      return NextResponse.json({ error: "A user with this email already exists" }, { status: 409 });
    }

    const temporaryPassword = generateTemporaryPassword();
    const passwordHash = hashPassword(temporaryPassword);

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: requestRecord.email.toLowerCase(),
          password: passwordHash,
          name: requestRecord.fullName,
          role: requestRecord.requestedRole,
          department: requestRecord.department,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          department: true,
        },
      });

      const updatedRequest = await tx.accessRequest.update({
        where: { id: accessRequestId },
        data: {
          status: "APPROVED",
          reviewNote,
          reviewedAt: new Date(),
          reviewedByEmail: auth.email,
          createdUserId: user.id,
        },
      });

      return { user, updatedRequest };
    });

    const accountDetails = [
      `Role: ${result.user.role}`,
      `Department: ${result.user.department || "Not assigned"}`,
      `HOD: ${requestRecord.hodName || "Not assigned"}`,
    ].join(" ");

    await createNotification({
      actorEmail: auth.email,
      actionType: "CREATE_USER",
      targetId: result.user.id,
      message: `Your Calaya Taskly account has been created from your access request. ${accountDetails}`,
      recipients: {
        userIds: [result.user.id],
        includeActor: false,
      },
      linkPath: `/open/item?type=user&id=${result.user.id}`,
    });

    await sendAccessRequestDecisionEmail({
      recipientEmail: result.user.email,
      recipientName: result.user.name || result.user.email,
      actorName,
      actorRole: auth.role,
      requestedRole: result.user.role,
      department: result.user.department || requestRecord.department,
      hodName: requestRecord.hodName,
      reviewNote,
      status: "APPROVED",
      temporaryPassword,
    });

    return NextResponse.json(result.updatedRequest);
  } catch (error) {
    console.error("Failed to review access request:", error);
    return NextResponse.json({ error: "Failed to review access request" }, { status: 500 });
  }
}

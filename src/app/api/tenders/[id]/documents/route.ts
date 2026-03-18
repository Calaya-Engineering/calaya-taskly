import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { emitRealtimeEvent } from "@/lib/realtime-events";
import { createNotification } from "@/lib/notifications";
import { getManagedDepartmentNamesByEmail } from "@/lib/hod-departments";

const DEFAULT_TENDER_DEPARTMENT = "Company-wide";

function parseTenderId(value: string) {
  const trimmed = value.trim();
  return /^\d+$/.test(trimmed) ? parseInt(trimmed, 10) : Number.NaN;
}

async function findTenderByIdentifier(id: string) {
  const parsedId = parseTenderId(id);
  return prisma.tender.findFirst({
    where: {
      OR: [
        { id: Number.isNaN(parsedId) ? -1 : parsedId },
        { referenceNo: id },
      ],
    },
  });
}

async function resolveUploaderContext(auth: { email: string; role: string; name?: string | null }) {
  const user = await prisma.user.findUnique({
    where: { email: auth.email },
    select: { name: true, department: true },
  });

  const managedDepartments =
    auth.role === "HOD" ? await getManagedDepartmentNamesByEmail(auth.email) : [];

  return {
    uploaderName: user?.name?.trim() || auth.name?.trim() || auth.email.split("@")[0] || "Unknown",
    primaryDepartment:
      managedDepartments[0] ||
      user?.department?.trim() ||
      null,
    managedDepartments,
  };
}

function resolveDepartmentForUpload(
  authRole: string,
  requestedDepartment: string | undefined,
  primaryDepartment: string | null,
  managedDepartments: string[],
) {
  const trimmedRequestedDepartment = requestedDepartment?.trim() || "";

  if (authRole === "MD") {
    return trimmedRequestedDepartment || primaryDepartment || DEFAULT_TENDER_DEPARTMENT;
  }

  if (authRole === "HOD") {
    if (trimmedRequestedDepartment && managedDepartments.includes(trimmedRequestedDepartment)) {
      return trimmedRequestedDepartment;
    }
    return primaryDepartment;
  }

  return primaryDepartment;
}

function inferDocumentRole(role: string) {
  if (role === "MD" || role === "HOD" || role === "Secretary") return role;
  return "Staff";
}

/**
 * POST /api/tenders/[id]/documents - Upload a tender workspace document
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const tender = await findTenderByIdentifier(id);
    if (!tender) {
      return NextResponse.json({ error: "Tender not found" }, { status: 404 });
    }

    const body = await req.json().catch(() => ({}));
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const fileUrl = typeof body.fileUrl === "string" ? body.fileUrl.trim() : "";
    const fileSize = typeof body.fileSize === "string" ? body.fileSize.trim() : "";
    const type = typeof body.type === "string" ? body.type.trim() : "Tender Document";
    const requestedDepartment =
      typeof body.department === "string" ? body.department : undefined;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    if (!fileUrl) {
      return NextResponse.json({ error: "File URL is required" }, { status: 400 });
    }

    const { uploaderName, primaryDepartment, managedDepartments } = await resolveUploaderContext(auth);
    const department = resolveDepartmentForUpload(
      auth.role,
      requestedDepartment,
      primaryDepartment,
      managedDepartments,
    );

    if (!department) {
      return NextResponse.json(
        { error: "No department section is available for this account" },
        { status: 400 },
      );
    }

    const document = await prisma.document.create({
      data: {
        title,
        type,
        department,
        uploadedBy: uploaderName,
        scope: "TENDER",
        fileSize: fileSize || "—",
        fileUrl,
        tenderId: tender.id,
      },
    });

    emitRealtimeEvent({
      type: "tender:updated",
      entity: "tender",
      action: "updated",
      entityId: tender.id,
    });

    emitRealtimeEvent({
      type: "document:created",
      entity: "document",
      action: "created",
      entityId: document.id,
    });

    createNotification({
      actorEmail: auth.email,
      actionType: "UPLOAD_DOCUMENT",
      targetId: tender.id,
      message: `${uploaderName} (${inferDocumentRole(auth.role)}) uploaded a tender document to ${department}: ${title}`,
    });

    return NextResponse.json({
      id: document.id,
      tenderId: tender.referenceNo,
      title: document.title,
      fileName: document.title,
      uploadedBy: document.uploadedBy,
      uploadedByRole: inferDocumentRole(auth.role),
      uploadedDate: document.createdAt.toISOString().split("T")[0],
      fileSize: document.fileSize || "—",
      fileType: document.type,
      category: document.type,
      downloads: document.downloads,
      status: "ACTIVE",
      department: document.department,
      comments: [],
      type: document.type,
      fileUrl: document.fileUrl,
    });
  } catch (error: any) {
    console.error("Error creating tender document:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create tender document" },
      { status: 500 },
    );
  }
}

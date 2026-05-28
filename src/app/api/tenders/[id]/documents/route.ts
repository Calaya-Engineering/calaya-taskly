import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { emitRealtimeEvent } from "@/lib/realtime-events";
import { createNotification } from "@/lib/notifications";
import { getManagedDepartmentNamesByEmail } from "@/lib/hod-departments";
import { getTenderAudience } from "@/lib/notification-audiences";

const DEFAULT_TENDER_DEPARTMENT = "Company-wide";

type TenderUploadCandidate = {
  title?: unknown;
  fileUrl?: unknown;
  fileSize?: unknown;
  type?: unknown;
  department?: unknown;
};

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

  const authName = typeof auth.name === "string" ? auth.name.trim() : "";

  const managedDepartments =
    auth.role === "HOD" ? await getManagedDepartmentNamesByEmail(auth.email) : [];

  return {
    uploaderName: user?.name?.trim() || authName || auth.email.split("@")[0] || "Unknown",
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

function normalizeUploadCandidates(input: unknown) {
  if (!Array.isArray(input)) return [];

  return input
    .map((entry) => {
      const candidate = (entry ?? {}) as TenderUploadCandidate;
      const title = typeof candidate.title === "string" ? candidate.title.trim() : "";
      const fileUrl = typeof candidate.fileUrl === "string" ? candidate.fileUrl.trim() : "";
      const fileSize = typeof candidate.fileSize === "string" ? candidate.fileSize.trim() : "";
      const type =
        typeof candidate.type === "string" && candidate.type.trim()
          ? candidate.type.trim()
          : "Tender Document";
      const department = typeof candidate.department === "string" ? candidate.department.trim() : "";

      if (!title || !fileUrl) return null;

      return {
        title,
        fileUrl,
        fileSize: fileSize || "—",
        type,
        department,
      };
    })
    .filter(
      (entry): entry is { title: string; fileUrl: string; fileSize: string; type: string; department: string } =>
        Boolean(entry),
    );
}

/**
 * POST /api/tenders/[id]/documents - DISABLED.
 *
 * Per stakeholder decision, tenders no longer accept document uploads — only comments.
 * Use POST /api/tenders/[id]/comments instead.
 */
export async function POST(
  _req: NextRequest,
  _ctx: { params: Promise<{ id: string }> },
) {
  return NextResponse.json(
    {
      error:
        "Tender document uploads are disabled. Please use the tender comments thread to share updates.",
    },
    { status: 410 },
  );
}

async function _disabledPost(
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
    const requestedDepartment = typeof body.department === "string" ? body.department : undefined;
    const uploadCandidates = normalizeUploadCandidates(
      Array.isArray(body.documents)
        ? body.documents
        : [
            {
              title: body.title,
              fileUrl: body.fileUrl,
              fileSize: body.fileSize,
              type: body.type,
              department: body.department,
            },
          ],
    );

    if (!uploadCandidates.length) {
      return NextResponse.json({ error: "At least one valid document is required" }, { status: 400 });
    }

    const { uploaderName, primaryDepartment, managedDepartments } = await resolveUploaderContext(auth);
    const audienceDepartment = resolveDepartmentForUpload(
      auth.role,
      requestedDepartment,
      primaryDepartment,
      managedDepartments,
    );

    if (!audienceDepartment) {
      return NextResponse.json(
        { error: "No department section is available for this account" },
        { status: 400 },
      );
    }

    const documents = await prisma.$transaction(
      uploadCandidates.map((candidate) => {
        const department = resolveDepartmentForUpload(
          auth.role,
          candidate.department || requestedDepartment,
          primaryDepartment,
          managedDepartments,
        );

        if (!department) {
          throw new Error("No department section is available for this account");
        }

        return prisma.document.create({
          data: {
            title: candidate.title,
            type: candidate.type,
            department,
            uploadedBy: uploaderName,
            scope: "TENDER",
            fileSize: candidate.fileSize,
            fileUrl: candidate.fileUrl,
            tenderId: tender.id,
          },
        });
      }),
    );

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
      entityId: documents[0]?.id ?? tender.id,
    });

    createNotification({
      actorEmail: auth.email,
      actionType: "UPLOAD_DOCUMENT",
      targetId: tender.id,
      message:
        documents.length === 1
          ? `${uploaderName} (${inferDocumentRole(auth.role)}) uploaded a tender document: ${documents[0].title}`
          : `${uploaderName} (${inferDocumentRole(auth.role)}) uploaded ${documents.length} tender documents to ${tender.title}.`,
      recipients: getTenderAudience([audienceDepartment]),
      sendEmail: true,
      emailSubject: `Tender Document Uploaded — ${tender.title}`,
      linkPath: `/open/item?type=tender&id=${tender.id}`,
    });

    return NextResponse.json({
      documents: documents.map((document) => ({
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
      })),
      count: documents.length,
    });
  } catch (error: any) {
    console.error("Error creating tender document:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create tender document" },
      { status: 500 },
    );
  }
}

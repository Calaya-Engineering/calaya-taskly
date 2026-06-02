import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { emitRealtimeEvent } from "@/lib/realtime-events";
import { createNotification } from "@/lib/notifications";
import { getTenderAudience } from "@/lib/notification-audiences";
import { recordAudit, getRequestIp } from "@/lib/audit";
import { isManagingDirectorRole } from "@/lib/auth-config";
import {
  buildUserDisplayLookup,
  getDisplayNameForUserValue,
  getRoleForUserValue,
} from "@/lib/user-display";
import { processMentions, stripMentionTokens } from "@/lib/mentions";

const DEFAULT_TENDER_DEPARTMENT = "Company-wide";

function inferUploadedByRole(uploadedBy: string, userLookup: Map<string, { name: string | null; role: string | null }>) {
  const resolvedRole = getRoleForUserValue(uploadedBy, userLookup);
  if (resolvedRole) return resolvedRole;
  return uploadedBy.toLowerCase().includes("vendor") ? "Vendor" : "Staff";
}

function inferDocumentFileType(title: string, fileUrl: string | null | undefined, type: string) {
  const fromTitle = title.includes(".") ? title.split(".").pop() : "";
  const fromUrl = fileUrl ? fileUrl.split("?")[0].split(".").pop() : "";
  const fromType = type.replace(/\s*document$/i, "").trim();
  return String(fromTitle || fromUrl || fromType || "FILE").toUpperCase();
}

function isSubmissionDocument(type: string) {
  return type.toUpperCase() === "SUBMISSION";
}

function getTenderDocumentCategory(type: string) {
  if (isSubmissionDocument(type)) return "Bid Submission";

  const trimmed = type.trim();
  if (!trimmed || /document$/i.test(trimmed)) {
    return "Tender Document";
  }

  return trimmed;
}

/**
 * GET /api/tenders - List tenders (Authenticated)
 * Query params: status, department, search
 */
export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = req.nextUrl;
    const status = searchParams.get("status");
    const search = searchParams.get("search")?.trim() || "";
    const compact = searchParams.get("compact") === "true";
    const includeDocuments = searchParams.get("includeDocuments") === "true";
    const limit = Math.min(
      parseInt(searchParams.get("limit") ?? "50", 10) || 50,
      100,
    );

    const where: any = {};
    if (status && status !== "all") where.status = status;
    // Tenders are intentionally company-visible. Department filters are ignored here
    // so staff, HODs, MD, and secretary roles see the same tender list.
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { referenceNo: { contains: search } },
        { description: { contains: search } },
      ];
    }

    if (compact) {
      const compactTenders = await prisma.tender.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        select: {
          id: true,
          createdAt: true,
        },
      });
      return NextResponse.json(compactTenders);
    }

    const tenders = await prisma.tender.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        ...(includeDocuments
          ? {
              documents: {
                orderBy: { createdAt: "desc" },
              },
            }
          : {}),
        _count: {
          select: { documents: true, comments: true },
        },
      },
    });

    const uploaderValues: string[] = includeDocuments
      ? Array.from(
          new Set(
            tenders.flatMap((tender) =>
              ((((tender as any).documents as Array<{ uploadedBy?: unknown }> | undefined) || [])
                .map((document) =>
                  typeof document.uploadedBy === "string" ? document.uploadedBy.trim() : "",
                )
                .filter((value): value is string => Boolean(value))),
            ),
          ),
        )
      : [];

    const userLookup = await buildUserDisplayLookup(uploaderValues);

    const formatted = tenders.map((t) => {
      const tenderDocuments = (((t as any).documents as any[]) || []);

      return {
        id: t.referenceNo, // In frontend, ID is used as the reference No or short ID
        dbId: t.id,
        title: t.title,
        referenceNo: t.referenceNo,
        description: t.description,
        issuedDate: t.issuedDate.toISOString().split("T")[0],
        closingDate: t.closingDate.toISOString().split("T")[0],
        department: t.department || DEFAULT_TENDER_DEPARTMENT,
        category: t.category,
        documents: includeDocuments
          ? tenderDocuments.map((document) => ({
              id: document.id,
              tenderId: t.referenceNo,
              title: document.title,
              fileName: document.title,
              uploadedBy: getDisplayNameForUserValue(document.uploadedBy, userLookup),
              uploadedByRole: inferUploadedByRole(document.uploadedBy, userLookup),
              uploadedDate: document.createdAt.toISOString().split("T")[0],
              fileSize: document.fileSize || "—",
              fileType: inferDocumentFileType(document.title, document.fileUrl, document.type),
              category: getTenderDocumentCategory(document.type),
              downloads: document.downloads,
              status: "ACTIVE",
              department: document.department || t.department || DEFAULT_TENDER_DEPARTMENT,
              comments: [],
              type: document.type,
              fileUrl: document.fileUrl,
            }))
          : t._count.documents,
        documentsCount: t._count.documents,
        commentsCount: t._count.comments,
        submissions: includeDocuments
          ? tenderDocuments.filter((document) => isSubmissionDocument(document.type)).length
          : 0,
        downloads: 0,
        fileSize: `${t._count.documents} file${t._count.documents === 1 ? "" : "s"}`,
        status: t.status,
        createdBy: t.createdBy,
        createdAt: t.createdAt.toISOString().split("T")[0],
      };
    });

    return NextResponse.json(formatted);
  } catch (error: any) {
    console.error("Error fetching tenders:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/tenders - Create tender (MD only)
 */
export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth || (!isManagingDirectorRole(auth.role) && auth.role !== "HOD")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, closingDate, referenceNo, status } = body;

    if (!title || !closingDate || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const tender = await prisma.tender.create({
      data: {
        title,
        referenceNo: referenceNo || `TEN-${Date.now()}`,
        description,
        department: DEFAULT_TENDER_DEPARTMENT,
        category: null,
        closingDate: new Date(closingDate),
        createdBy: auth.email || "Unknown",
        status: typeof status === "string" && status.trim() ? status : "OPEN",
      },
    });

    emitRealtimeEvent({
      type: "tender:created",
      entity: "tender",
      action: "created",
      entityId: tender.id,
    });

    void recordAudit({
      action: "TENDER_CREATED",
      actor: { email: auth.email, role: auth.role },
      targetType: "TENDER",
      targetId: tender.id,
      summary: `Created tender "${tender.title}" (${tender.referenceNo})`,
      metadata: { closingDate: tender.closingDate, department: tender.department },
      ipAddress: getRequestIp(req),
    });

    createNotification({
      actorEmail: auth.email,
      actionType: "CREATE_TENDER",
      targetId: tender.id,
      message: `${auth.name || auth.email.split("@")[0]} (${auth.role}) created a new tender: ${tender.title}`,
      recipients: getTenderAudience(),
      sendEmail: true,
      emailSubject: `Tender Created — ${tender.title}`,
      linkPath: `/open/item?type=tender&id=${tender.id}`,
    });

    void processMentions({
      text: description,
      sourceType: "TENDER_CREATED",
      sourceId: tender.id,
      actor: { email: auth.email, role: auth.role, name: auth.name as string | undefined },
      notificationActionType: "MENTION_TENDER_CREATED",
      notificationMessage: `${auth.name || auth.email.split("@")[0]} mentioned you in tender "${tender.title}"`,
      emailSubject: `Mentioned in tender — ${tender.title}`,
      linkPath: `/open/item?type=tender&id=${tender.id}`,
      context: stripMentionTokens(description).slice(0, 200),
    });

    return NextResponse.json(tender);
  } catch (error: any) {
    console.error("Error creating tender:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { emitRealtimeEvent } from "@/lib/realtime-events";
import { createNotification } from "@/lib/notifications";

const DEFAULT_TENDER_DEPARTMENT = "Company-wide";

type TenderDocumentInput = {
  title?: unknown;
  fileUrl?: unknown;
  fileSize?: unknown;
  fileType?: unknown;
};

type NormalizedTenderDocument = {
  title: string;
  type: string;
  department: string;
  uploadedBy: string;
  scope: string;
  fileSize: string;
  fileUrl: string;
};

function normalizeTenderDocuments(input: unknown, uploadedBy: string) {
  if (!Array.isArray(input)) return [];

  return input
    .map((doc) => {
      const candidate = (doc ?? {}) as TenderDocumentInput;
      const fileUrl = typeof candidate.fileUrl === "string" ? candidate.fileUrl.trim() : "";
      if (!fileUrl) return null;

      const title =
        typeof candidate.title === "string" && candidate.title.trim()
          ? candidate.title.trim()
          : "Tender Document";

      return {
        title,
        type:
          typeof candidate.fileType === "string" && candidate.fileType.trim()
            ? candidate.fileType.trim()
            : "Tender Document",
        department: DEFAULT_TENDER_DEPARTMENT,
        uploadedBy,
        scope: "TENDER",
        fileSize:
          typeof candidate.fileSize === "string" && candidate.fileSize.trim()
            ? candidate.fileSize.trim()
            : "—",
        fileUrl,
      };
    })
    .filter((doc): doc is NormalizedTenderDocument => doc !== null);
}

function getUserLookupKeys(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return [];

  const keys = new Set<string>([trimmed.toLowerCase()]);
  if (trimmed.includes("@")) {
    keys.add(trimmed.split("@")[0].toLowerCase());
  }

  return Array.from(keys);
}

function inferUploadedByRole(uploadedBy: string, roleLookup: Map<string, string>) {
  for (const key of getUserLookupKeys(uploadedBy)) {
    const role = roleLookup.get(key);
    if (role) return role;
  }

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
    const department = searchParams.get("department");
    const search = searchParams.get("search")?.trim() || "";
    const compact = searchParams.get("compact") === "true";
    const includeDocuments = searchParams.get("includeDocuments") === "true";
    const limit = Math.min(
      parseInt(searchParams.get("limit") ?? "50", 10) || 50,
      100,
    );

    const where: any = {};
    if (status && status !== "all") where.status = status;
    if (department && department !== "all") {
      where.department = department;
    } else {
      const departments = searchParams.get("departments");
      if (departments) {
        const list = departments
          .split(",")
          .map((d) => d.trim())
          .filter(Boolean);
        if (list.length === 1) where.department = list[0];
        else if (list.length > 1) where.department = { in: list };
      }
    }
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
          select: { documents: true },
        },
      },
    });

    const uploaderValues = includeDocuments
      ? Array.from(
          new Set(
            tenders.flatMap((tender) =>
              (((tender as any).documents as Array<{ uploadedBy?: string }> | undefined) || [])
                .map((document) => document.uploadedBy?.trim())
                .filter(Boolean) as string[],
            ),
          ),
        )
      : [];

    const users = uploaderValues.length
      ? await prisma.user.findMany({
          where: {
            OR: [
              { email: { in: uploaderValues } },
              { name: { in: uploaderValues } },
            ],
          },
          select: {
            email: true,
            name: true,
            role: true,
          },
        })
      : [];

    const roleLookup = new Map<string, string>();
    for (const user of users) {
      if (user.email) {
        for (const key of getUserLookupKeys(user.email)) {
          roleLookup.set(key, user.role);
        }
      }
      if (user.name) {
        for (const key of getUserLookupKeys(user.name)) {
          roleLookup.set(key, user.role);
        }
      }
    }

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
              uploadedBy: document.uploadedBy,
              uploadedByRole: inferUploadedByRole(document.uploadedBy, roleLookup),
              uploadedDate: document.createdAt.toISOString().split("T")[0],
              fileSize: document.fileSize || "—",
              fileType: inferDocumentFileType(document.title, document.fileUrl, document.type),
              category: isSubmissionDocument(document.type) ? "Bid Submission" : "Tender Document",
              downloads: document.downloads,
              status: "ACTIVE",
              department: document.department || t.department || DEFAULT_TENDER_DEPARTMENT,
              comments: [],
              type: document.type,
              fileUrl: document.fileUrl,
            }))
          : t._count.documents,
        documentsCount: t._count.documents,
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
    if (!auth || !["MD", "HOD"].includes(auth.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, closingDate, referenceNo, status, documents } = body;

    if (!title || !closingDate || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const uploaderName = auth.name || auth.email.split("@")[0] || "Unknown";
    const tenderDocuments = normalizeTenderDocuments(documents, uploaderName);

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
        ...(tenderDocuments.length > 0
          ? {
              documents: {
                create: tenderDocuments,
              },
            }
          : {}),
      },
    });

    emitRealtimeEvent({
      type: "tender:created",
      entity: "tender",
      action: "created",
      entityId: tender.id,
    });

    createNotification({
      actorEmail: auth.email,
      actionType: "CREATE_TENDER",
      targetId: tender.id,
      message: `${auth.name || auth.email.split("@")[0]} (${auth.role}) created a new tender: ${tender.title}`,
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

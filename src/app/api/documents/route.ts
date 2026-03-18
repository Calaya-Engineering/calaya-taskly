import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { createNotification } from "@/lib/notifications";
import { emitRealtimeEvent } from "@/lib/realtime-events";

const DOCUMENT_RECIPIENT_ROLES = ["HOD", "Staff", "Personnel", "Corp Member", "Secretary"];

/**
 * GET /api/documents - List documents (MD, HOD, Secretary, Staff - authenticated)
 * Query params: type, scope, department, departments, search
 */
export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const { searchParams } = req.nextUrl;
      const type = searchParams.get("type");
      const scope = searchParams.get("scope");
      const department = searchParams.get("department");
      const departments = searchParams.get("departments");
      const search = searchParams.get("search")?.trim() || "";
      const limitParam = searchParams.get("limit");
      const offsetParam = searchParams.get("offset");

      const parsedLimit = limitParam ? Number.parseInt(limitParam, 10) : NaN;
      const parsedOffset = offsetParam ? Number.parseInt(offsetParam, 10) : NaN;
      const limit = Number.isFinite(parsedLimit) ? Math.min(Math.max(parsedLimit, 1), 500) : undefined;
      const offset = Number.isFinite(parsedOffset) ? Math.max(parsedOffset, 0) : 0;

      const where: any = {};
      if (type && type !== "All Types") where.type = type;
      if (scope && scope !== "All Scopes") where.scope = scope;
      if (department && department !== "all") {
        where.department = department;
      } else if (departments) {
        const list = departments
          .split(",")
          .map((d) => d.trim())
          .filter(Boolean);
        if (list.length === 1) where.department = list[0];
        if (list.length > 1) where.department = { in: list };
      }

      if (search) {
        where.OR = [
          { title: { contains: search } },
          { uploadedBy: { contains: search } },
          { department: { contains: search } },
          { type: { contains: search } },
        ];
      }

      const documents = await prisma.document.findMany({
        where,
        orderBy: { createdAt: "desc" },
        ...(typeof limit === "number" ? { take: limit, skip: offset } : {}),
        select: {
          id: true,
          title: true,
          type: true,
          department: true,
          uploadedBy: true,
          scope: true,
          fileSize: true,
          fileUrl: true,
          downloads: true,
          createdAt: true,
        },
      });

      // Format for frontend
      const formatted = documents.map((d) => ({
        id: `DOC-${String(d.id).padStart(3, "0")}`,
        dbId: d.id,
        title: d.title,
        type: d.type,
        department: d.department,
        uploadedBy: d.uploadedBy,
        date: d.createdAt,
        size: d.fileSize || "—",
        scope: d.scope,
        downloads: d.downloads,
        fileUrl: d.fileUrl ?? null,
      }));

      return NextResponse.json(formatted, {
        headers: { "Cache-Control": "no-store, max-age=0" },
      });
    } catch (error: any) {
      console.error("Error fetching documents:", error);
      return NextResponse.json(
        { error: error?.message || "Failed to fetch documents" },
        { status: 500 }
      );
    }
  } catch (outerError: any) {
    console.error("Outer error in GET /api/documents:", outerError);
    return NextResponse.json(
      { error: outerError?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/documents - Create document (MD only)
 */
export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (auth.role !== "MD") {
      return NextResponse.json({ error: "MD access required" }, { status: 403 });
    }

    try {
      const body = await req.json().catch(() => ({}));
      const { title, type, department, scope, fileSize, fileUrl, uploadedBy } = body as {
        title?: string;
        type?: string;
        department?: string;
        scope?: string;
        fileSize?: string;
        fileUrl?: string;
        uploadedBy?: string;
      };

      if (!title || typeof title !== "string" || !title.trim()) {
        return NextResponse.json({ error: "Title is required" }, { status: 400 });
      }
      if (!type || typeof type !== "string" || !type.trim()) {
        return NextResponse.json({ error: "Type is required" }, { status: 400 });
      }
      if (!department || typeof department !== "string" || !department.trim()) {
        return NextResponse.json({ error: "Department is required" }, { status: 400 });
      }
      if (!scope || typeof scope !== "string" || !scope.trim()) {
        return NextResponse.json({ error: "Scope is required" }, { status: 400 });
      }

      const doc = await prisma.document.create({
        data: {
          title: title.trim(),
          type: type.trim(),
          department: department.trim(),
          scope: scope.trim(),
          uploadedBy:
            (uploadedBy && typeof uploadedBy === "string" ? uploadedBy.trim() : auth.email) ||
            "Unknown",
          fileSize: fileSize && typeof fileSize === "string" ? fileSize.trim() : null,
          fileUrl: fileUrl && typeof fileUrl === "string" ? fileUrl.trim() : null,
        },
      });

      emitRealtimeEvent({
        type: "document:created",
        entity: "document",
        action: "created",
        entityId: doc.id,
      });

      // Fire and forget notification
      createNotification({
        actorEmail: auth.email,
        actionType: 'UPLOAD_DOCUMENT',
        targetId: doc.id,
        message: `${auth.name || auth.email.split('@')[0]} (${auth.role}) uploaded a document: ${doc.title}`,
        recipients: {
          roles: DOCUMENT_RECIPIENT_ROLES,
          ...(doc.scope.toUpperCase().includes("ALL") || doc.scope.toUpperCase().includes("COMPANY")
            ? {}
            : { departments: [doc.department] }),
          includeActor: false,
        },
        sendEmail: true,
        emailSubject: `Document Uploaded — ${doc.title}`,
        linkPath: `/open/item?type=document&id=${doc.id}`,
      });

      return NextResponse.json({
        id: `DOC-${String(doc.id).padStart(3, "0")}`,
        dbId: doc.id,
        title: doc.title,
        type: doc.type,
        department: doc.department,
        uploadedBy: doc.uploadedBy,
        date: doc.createdAt,
        size: doc.fileSize || "—",
        scope: doc.scope,
        downloads: doc.downloads,
      });
    } catch (error: any) {
      console.error("Error creating document:", error);
      return NextResponse.json(
        { error: error?.message || "Failed to create document" },
        { status: 500 }
      );
    }
  } catch (outerError: any) {
    console.error("Outer error in POST /api/documents:", outerError);
    return NextResponse.json(
      { error: outerError?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

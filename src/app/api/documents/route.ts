import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";

/**
 * GET /api/documents - List documents (MD, HOD, Secretary, Staff - authenticated)
 * Query params: type, scope, department, search
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
      const search = searchParams.get("search")?.trim().toLowerCase() || "";

      const where: any = {};
      if (type && type !== "All Types") where.type = type;
      if (scope && scope !== "All Scopes") where.scope = scope;
      if (department && department !== "all") where.department = department;

      let documents = await prisma.document.findMany({
        where,
        orderBy: { createdAt: "desc" },
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

      // Client-side search filter
      if (search) {
        const q = search.toLowerCase();
        documents = documents.filter(
          (d) =>
            (d.title || "").toLowerCase().includes(q) ||
            (d.uploadedBy || "").toLowerCase().includes(q) ||
            (d.department || "").toLowerCase().includes(q) ||
            (d.type || "").toLowerCase().includes(q)
        );
      }

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
      console.log("POST /api/documents - Body:", JSON.stringify(body));
      console.log("POST /api/documents - Auth:", JSON.stringify(auth));

      console.log("Prisma instance check - keys:", Object.keys(prisma || {}));
      console.log("Prisma document property exists:", !!(prisma as any).document);

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

      console.log("POST /api/documents - Validated fields. Creating in DB...");

      const doc = await (prisma as any).document.create({
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

      console.log("POST /api/documents - Created successfully:", doc.id);

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

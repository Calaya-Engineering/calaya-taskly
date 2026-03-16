import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { emitRealtimeEvent } from "@/lib/realtime-events";
import { createNotification } from "@/lib/notifications";

function parseDocId(id: string): number | null {
  const num = parseInt(id, 10);
  if (!Number.isNaN(num)) return num;
  const match = id.match(/^DOC-(\d+)$/i);
  if (match) return parseInt(match[1], 10);
  return null;
}

/**
 * GET /api/documents/[id] - Get single document
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthFromRequest(_req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const docId = parseDocId(id);
  if (docId == null) {
    return NextResponse.json({ error: "Invalid document ID" }, { status: 400 });
  }

  try {
    const doc = await prisma.document.findUnique({
      where: { id: docId },
    });
    if (!doc) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    createNotification({
      actorEmail: auth.email,
      actionType: 'VIEW_DOCUMENT',
      targetId: doc.id,
      message: `${auth.name || auth.email.split('@')[0]} (${auth.role}) viewed document: ${doc.title}`,
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
      fileUrl: doc.fileUrl,
    });
  } catch (error) {
    console.error("Error fetching document:", error);
    return NextResponse.json({ error: "Failed to fetch document" }, { status: 500 });
  }
}

/**
 * PATCH /api/documents/[id] - Update document or increment downloads (MD only for update)
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthFromRequest(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const docId = parseDocId(id);
  if (docId == null) {
    return NextResponse.json({ error: "Invalid document ID" }, { status: 400 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { incrementDownload } = body as { incrementDownload?: boolean };

    if (incrementDownload === true) {
      const doc = await prisma.document.update({
        where: { id: docId },
        data: { downloads: { increment: 1 } },
      });

      emitRealtimeEvent({
        type: "document:downloaded",
        entity: "document",
        action: "downloaded",
        entityId: doc.id,
      });

      createNotification({
        actorEmail: auth.email,
        actionType: 'DOWNLOAD_DOCUMENT',
        targetId: doc.id,
        message: `${auth.name || auth.email.split('@')[0]} (${auth.role}) downloaded document: ${doc.title}`,
      });

      return NextResponse.json({
        id: `DOC-${String(doc.id).padStart(3, "0")}`,
        downloads: doc.downloads,
      });
    }

    if (auth.role !== "MD") {
      return NextResponse.json({ error: "MD access required" }, { status: 403 });
    }

    const updateData: Record<string, unknown> = {};
    const { title, type, department, scope, fileSize, fileUrl, uploadedBy } = body;
    if (typeof title === "string" && title.trim()) updateData.title = title.trim();
    if (typeof type === "string" && type.trim()) updateData.type = type.trim();
    if (typeof department === "string" && department.trim()) updateData.department = department.trim();
    if (typeof scope === "string" && scope.trim()) updateData.scope = scope.trim();
    if (typeof fileSize === "string") updateData.fileSize = fileSize.trim() || null;
    if (typeof fileUrl === "string") updateData.fileUrl = fileUrl.trim() || null;
    if (typeof uploadedBy === "string" && uploadedBy.trim()) updateData.uploadedBy = uploadedBy.trim();

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    const doc = await prisma.document.update({
      where: { id: docId },
      data: updateData,
    });

    emitRealtimeEvent({
      type: "document:updated",
      entity: "document",
      action: "updated",
      entityId: doc.id,
    });

    createNotification({
      actorEmail: auth.email,
      actionType: 'UPDATE_DOCUMENT',
      targetId: doc.id,
      message: `${auth.name || auth.email.split('@')[0]} (${auth.role}) updated document: ${doc.title}`,
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
  } catch (error: unknown) {
    const prismaErr = error as { code?: string };
    if (prismaErr.code === "P2025") {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }
    console.error("Error updating document:", error);
    return NextResponse.json({ error: "Failed to update document" }, { status: 500 });
  }
}

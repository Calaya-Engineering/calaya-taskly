import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { emitRealtimeEvent } from "@/lib/realtime-events";

function parseDocId(id: string): number | null {
    const num = parseInt(id, 10);
    if (!Number.isNaN(num)) return num;
    const match = id.match(/^DOC-(\d+)$/i);
    if (match) return parseInt(match[1], 10);
    return null;
}

function extractExtension(value: string | null | undefined): string | null {
    if (!value) return null;
    const withoutQuery = value.split("?")[0].split("#")[0];
    const segment = withoutQuery.split("/").pop() || withoutQuery;
    const match = segment.match(/\.([a-zA-Z0-9]{1,12})$/);
    return match ? match[1].toLowerCase() : null;
}

function stripExtension(value: string | null | undefined): string {
    if (!value) return "document";
    return value.replace(/\.[^.]+$/, "");
}

function sanitizeFilename(value: string | null | undefined): string {
    const cleaned = String(value || "document")
        .replace(/[\r\n]/g, " ")
        .replace(/[\/\\?%*:|"<>]/g, "_")
        .trim();

    return cleaned || "document";
}

function extractFilenameFromContentDisposition(header: string | null): string | null {
    if (!header) return null;

    const utfMatch = header.match(/filename\*\s*=\s*UTF-8''([^;]+)/i);
    if (utfMatch?.[1]) {
        try {
            return decodeURIComponent(utfMatch[1]);
        } catch {
            return utfMatch[1];
        }
    }

    const basicMatch = header.match(/filename\s*=\s*"([^"]+)"/i) || header.match(/filename\s*=\s*([^;]+)/i);
    return basicMatch?.[1]?.trim() || null;
}

const STORAGE_FETCH_TIMEOUT_MS = 15000;

/**
 * GET /api/documents/[id]/download - Securely download a document
 */
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    let auth = await getAuthFromRequest(req);

    // Fallback: Check for token in query parameter (for standard browser downloads)
    if (!auth) {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get("token");
        if (token) {
            const { verifyAuthToken } = await import("@/lib/jwt");
            auth = await verifyAuthToken(token);
        }
    }

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

        if (!doc.fileUrl) {
            return NextResponse.json({ error: "No file URL associated with this document" }, { status: 400 });
        }

        let finalUrl = doc.fileUrl;
        if (!finalUrl.startsWith("http")) {
            // If it's just a public ID or relative path, this might be the issue
            console.warn(`[WARN] Document fileUrl is not absolute: ${finalUrl}`);
            // Attempt rescue if it looks like a Cloudinary path
            if (finalUrl.startsWith("/")) {
                 // You might want to use an env var for CLOUDINARY_BASE_URL
                 // For now, let's just log it and try to fetch it if it's absolute-path-like
            }
        }

        // Fetch the file from Cloudinary (or original storage)
        console.log(`[DEBUG] Attempting fetch from: ${finalUrl}`);
        let cloudinaryResponse: Response;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), STORAGE_FETCH_TIMEOUT_MS);
        try {
            cloudinaryResponse = await fetch(finalUrl, { signal: controller.signal });
        } catch (fetchErr: any) {
            console.error("ERROR: fetch(doc.fileUrl) threw:", fetchErr);
            return NextResponse.json({
                error: "Failed to reach document storage",
                details: fetchErr?.message || String(fetchErr)
            }, { status: 502 });
        } finally {
            clearTimeout(timeoutId);
        }

        if (!cloudinaryResponse.ok || !cloudinaryResponse.body) {
            const errorText = cloudinaryResponse.statusText || "Unknown error";
            const cldError = cloudinaryResponse.headers.get("x-cld-error");
            console.error(`Failed to fetch file (Status ${cloudinaryResponse.status}):`, errorText, cldError ? `Cloudinary Error: ${cldError}` : "");

            return NextResponse.json({
                error: "Document storage returned an error",
                details: cldError || errorText,
                status: cloudinaryResponse.status
            }, { status: 502 });
        }

        // Increment download count
        try {
            await prisma.document.update({
                where: { id: docId },
                data: { downloads: { increment: 1 } },
            });
        } catch (dbErr) {
            console.warn("WARNING: Failed to increment download count:", dbErr);
            // We continue anyway, the file fetch was successful
        }

        emitRealtimeEvent({
            type: "document:downloaded",
            entity: "document",
            action: "downloaded",
            entityId: docId,
        });

        // Determine filename and extension — prefer the original stored title/filename
        // so users download `invoice.pdf` instead of a generic `.bin`.
        const originalTitle = sanitizeFilename(doc.title || "document");
        const upstreamDisposition = cloudinaryResponse.headers.get("Content-Disposition");
        const upstreamFilenameRaw = extractFilenameFromContentDisposition(upstreamDisposition);
        const upstreamFilename = upstreamFilenameRaw ? sanitizeFilename(upstreamFilenameRaw) : null;

        const extFromTitle = extractExtension(originalTitle);
        const extFromUpstreamFilename = extractExtension(upstreamFilename);
        const extFromUrl = extractExtension(doc.fileUrl);

        const MIME_TO_EXT: Record<string, string> = {
            "application/pdf": "pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
            "application/msword": "doc",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
            "application/vnd.ms-excel": "xls",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
            "application/vnd.ms-powerpoint": "ppt",
            "application/zip": "zip",
            "application/x-zip-compressed": "zip",
            "image/png": "png",
            "image/jpeg": "jpg",
            "image/gif": "gif",
            "image/webp": "webp",
            "text/plain": "txt",
            "text/csv": "csv",
            "video/mp4": "mp4",
            "audio/mpeg": "mp3",
        };
        const contentTypeHeader = cloudinaryResponse.headers.get("Content-Type")?.split(";")[0].trim() || "";
        const extFromMime = MIME_TO_EXT[contentTypeHeader] ?? null;

        const extension = extFromTitle ?? extFromUpstreamFilename ?? extFromUrl ?? extFromMime ?? null;

        let filename = originalTitle;
        if (!extFromTitle && extension) {
            const baseName = stripExtension(upstreamFilename || originalTitle);
            filename = `${sanitizeFilename(baseName)}.${extension}`;
        }

        // Stream the response back to the user
        try {
            return new Response(cloudinaryResponse.body as any, {
                headers: {
                    "Content-Type": contentTypeHeader || "application/octet-stream",
                    "Content-Disposition": `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
                    "Cache-Control": "no-cache",
                },
            });
        } catch (streamErr: any) {
            console.error("ERROR: new Response(body) threw:", streamErr);
            return NextResponse.json({
                error: "Failed to initiate download stream",
                details: streamErr?.message || String(streamErr)
            }, { status: 500 });
        }

    } catch (error: any) {
        console.error("CRITICAL: Error in document download proxy:", error);
        return NextResponse.json({ 
            error: "An error occurred during download",
            details: error?.message || String(error),
            stack: process.env.NODE_ENV === "development" ? error?.stack : undefined
        }, { status: 500 });
    }
}

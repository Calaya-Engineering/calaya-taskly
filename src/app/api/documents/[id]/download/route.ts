import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";

function parseDocId(id: string): number | null {
    const num = parseInt(id, 10);
    if (!Number.isNaN(num)) return num;
    const match = id.match(/^DOC-(\d+)$/i);
    if (match) return parseInt(match[1], 10);
    return null;
}

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

        // Fetch the file from Cloudinary (or original storage)
        const cloudinaryResponse = await fetch(doc.fileUrl);

        if (!cloudinaryResponse.ok || !cloudinaryResponse.body) {
            const errorText = cloudinaryResponse.statusText || "Unknown error";
            const cldError = cloudinaryResponse.headers.get("x-cld-error");
            console.error(`Failed to fetch file from source (Status ${cloudinaryResponse.status}):`, errorText, cldError ? `Cloudinary Error: ${cldError}` : "");

            return NextResponse.json({
                error: "Failed to retrieve the file from storage",
                details: cldError || errorText,
                status: cloudinaryResponse.status
            }, { status: 502 });
        }

        // Increment download count ONLY on successful fetch
        await prisma.document.update({
            where: { id: docId },
            data: { downloads: { increment: 1 } },
        });

        // Determine filename and extension
        // We try to use the stored title and derive extension from the URL if possible, or default to .pdf
        const sanitizedTitle = (doc.title || "document").replace(/[^a-z0-9]/gi, "_").toLowerCase();
        let extension = "pdf";

        // Check original URL for extension
        const urlParts = doc.fileUrl.split(".");
        if (urlParts.length > 1) {
            const urlExt = urlParts.pop()?.toLowerCase();
            if (urlExt && ["pdf", "docx", "doc", "xlsx", "xls", "zip", "png", "jpg", "jpeg"].includes(urlExt)) {
                extension = urlExt;
            }
        }

        const filename = `${sanitizedTitle}.${extension}`;

        // Stream the response back to the user
        // We use a regular Response object for streaming from common platforms
        return new Response(cloudinaryResponse.body as any, {
            headers: {
                "Content-Type": cloudinaryResponse.headers.get("Content-Type") || "application/octet-stream",
                "Content-Disposition": `attachment; filename="${filename}"`,
                "Cache-Control": "no-cache",
            },
        });

    } catch (error) {
        console.error("Error in document download proxy:", error);
        return NextResponse.json({ error: "An error occurred during download" }, { status: 500 });
    }
}

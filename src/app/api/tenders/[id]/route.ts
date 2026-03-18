import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { emitRealtimeEvent } from "@/lib/realtime-events";
import { createNotification } from "@/lib/notifications";
import { getTenderAudience } from "@/lib/notification-audiences";

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
                { referenceNo: id }
            ]
        },
        include: {
            documents: true,
        }
    });
}

/**
 * GET /api/tenders/[id] - Get tender details
 */
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
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

        const formatted = {
            id: tender.referenceNo,
            dbId: tender.id,
            title: tender.title,
            referenceNo: tender.referenceNo,
            description: tender.description,
            issuedDate: tender.issuedDate.toISOString().split("T")[0],
            closingDate: tender.closingDate.toISOString().split("T")[0],
            department: tender.department || DEFAULT_TENDER_DEPARTMENT,
            category: tender.category,
            status: tender.status,
            createdBy: tender.createdBy,
            createdAt: tender.createdAt.toISOString().split("T")[0],
            documents: tender.documents.map(d => ({
                id: `DOC-${String(d.id).padStart(3, "0")}`,
                dbId: d.id,
                name: d.title,
                size: d.fileSize || "—",
                uploadedAt: d.createdAt.toISOString().split("T")[0],
                fileUrl: d.fileUrl,
                type: d.type
            })),
        };

        createNotification({
            actorEmail: auth.email,
            actionType: 'VIEW_TENDER',
            targetId: tender.id,
            message: `${auth.name || auth.email.split('@')[0]} (${auth.role}) viewed tender: ${tender.title}`
        });

        return NextResponse.json(formatted);
    } catch (error: any) {
        console.error("Error fetching tender detail:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

/**
 * PATCH /api/tenders/[id] - Update tender
 */
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const auth = await getAuthFromRequest(req);
        if (!auth || !["MD", "HOD"].includes(auth.role)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await req.json();
        const tender = await findTenderByIdentifier(id);

        if (!tender) {
            return NextResponse.json({ error: "Tender not found" }, { status: 404 });
        }

        const uploaderName = auth.name || auth.email.split("@")[0] || "Unknown";
        const nextData: Record<string, unknown> = {};
        if (typeof body.title === "string" && body.title.trim()) nextData.title = body.title.trim();
        if (typeof body.description === "string" && body.description.trim()) nextData.description = body.description.trim();
        if (typeof body.closingDate === "string" && body.closingDate.trim()) nextData.closingDate = new Date(body.closingDate);
        if (typeof body.status === "string" && body.status.trim()) nextData.status = body.status.trim();
        const tenderDocuments = normalizeTenderDocuments(body.documents, uploaderName);

        const updatedTender = await prisma.tender.update({
            where: {
                id: tender.id
            },
            data: {
                ...nextData,
                department: DEFAULT_TENDER_DEPARTMENT,
                category: null,
                ...(tenderDocuments.length > 0
                    ? {
                        documents: {
                            create: tenderDocuments,
                        },
                    }
                    : {}),
            }
        });

        emitRealtimeEvent({
            type: "tender:updated",
            entity: "tender",
            action: "updated",
            entityId: updatedTender.id,
        });

        createNotification({
            actorEmail: auth.email,
            actionType: 'UPDATE_TENDER',
            targetId: updatedTender.id,
            message: `${auth.name || auth.email.split('@')[0]} (${auth.role}) updated tender: ${updatedTender.title}`,
            recipients: getTenderAudience([updatedTender.department || DEFAULT_TENDER_DEPARTMENT]),
            sendEmail: true,
            emailSubject: `Tender Updated — ${updatedTender.title}`,
            linkPath: `/open/item?type=tender&id=${updatedTender.id}`,
        });

        return NextResponse.json(updatedTender);
    } catch (error: any) {
        console.error("Error updating tender:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/tenders/[id] - Delete tender
 */
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const auth = await getAuthFromRequest(req);
        if (!auth || !["MD", "HOD"].includes(auth.role)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const tender = await findTenderByIdentifier(id);
        if (!tender) {
            return NextResponse.json({ error: "Tender not found" }, { status: 404 });
        }

        await prisma.tender.delete({
            where: {
                id: tender.id
            }
        });

        emitRealtimeEvent({
            type: "tender:deleted",
            entity: "tender",
            action: "deleted",
            entityId: tender.id,
        });

        createNotification({
            actorEmail: auth.email,
            actionType: 'DELETE_TENDER',
            targetId: tender.id,
            message: `${auth.name || auth.email.split('@')[0]} (${auth.role}) deleted tender: ${tender.title}.`,
            recipients: getTenderAudience([tender.department || DEFAULT_TENDER_DEPARTMENT]),
            sendEmail: true,
            emailSubject: `Tender Deleted — ${tender.title}`,
            linkPath: `/open/item?type=tender`,
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error deleting tender:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

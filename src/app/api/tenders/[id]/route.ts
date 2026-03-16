import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { emitRealtimeEvent } from "@/lib/realtime-events";
import { createNotification } from "@/lib/notifications";

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
        // id could be the database ID or the referenceNo
        const tender = await prisma.tender.findFirst({
            where: {
                OR: [
                    { id: isNaN(parseInt(id)) ? -1 : parseInt(id) },
                    { referenceNo: id }
                ]
            },
            include: {
                documents: true,
            }
        });

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
            department: tender.department,
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
            // Requirements are not in the schema yet, we could use a text field or related model.
            // For now, let's just use defaults or dummy if empty.
            requirements: [
                "Valid tax clearance certificate",
                "Evidence of similar projects completed",
            ],
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
        if (!auth) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await req.json();

        const tender = await prisma.tender.update({
            where: {
                id: parseInt(id)
            },
            data: body
        });

        emitRealtimeEvent({
            type: "tender:updated",
            entity: "tender",
            action: "updated",
            entityId: tender.id,
        });

        createNotification({
            actorEmail: auth.email,
            actionType: 'UPDATE_TENDER',
            targetId: tender.id,
            message: `${auth.name || auth.email.split('@')[0]} (${auth.role}) updated tender: ${tender.title}`
        });

        return NextResponse.json(tender);
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
        if (!auth) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        await prisma.tender.delete({
            where: {
                id: parseInt(id)
            }
        });

        emitRealtimeEvent({
            type: "tender:deleted",
            entity: "tender",
            action: "deleted",
            entityId: parseInt(id),
        });

        createNotification({
            actorEmail: auth.email,
            actionType: 'DELETE_TENDER',
            targetId: parseInt(id),
            message: `${auth.name || auth.email.split('@')[0]} (${auth.role}) deleted a tender.`
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

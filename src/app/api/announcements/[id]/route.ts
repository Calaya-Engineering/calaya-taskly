import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { emitAnnouncementEvent } from "@/lib/announcement-events";
import { createNotification } from "@/lib/notifications";
import { getAnnouncementAudience } from "@/lib/notification-audiences";

/**
 * GET /api/announcements/[id] - Get details of an announcement
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: paramId } = await params;
    const id = parseInt(paramId, 10);
    if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    try {
        const announcement = await prisma.announcement.findUnique({ where: { id } });
        if (!announcement) return NextResponse.json({ error: "Not found" }, { status: 404 });

        createNotification({
            actorEmail: auth.email,
            actionType: 'VIEW_ANNOUNCEMENT',
            targetId: announcement.id,
            message: `${auth.name || auth.email.split('@')[0]} (${auth.role}) viewed announcement: ${announcement.title}`
        });

        return NextResponse.json(announcement);
    } catch (error) {
        console.error("Error fetching announcement details:", error);
        return NextResponse.json({ error: "Failed to fetch announcement details" }, { status: 500 });
    }
}

/**
 * PUT /api/announcements/[id] - Update an announcement
 */
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: paramId } = await params;
    const id = parseInt(paramId, 10);
    if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    try {
        const existing = await prisma.announcement.findUnique({ where: { id } });
        if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

        const body = await req.json();
        const { title, description, date, department, targetRole } = body as {
            title?: string;
            description?: string;
            date?: string;
            department?: string;
            targetRole?: string;
        };

        const updateData: any = {};
        if (title !== undefined) updateData.title = title.trim();
        if (description !== undefined) updateData.description = description.trim();
        if (date !== undefined) updateData.date = new Date(date);
        if (department !== undefined) updateData.department = department?.trim() || null;
        if (targetRole !== undefined) updateData.targetRole = targetRole?.trim() || null;

        const announcement = await prisma.announcement.update({
            where: { id },
            data: updateData,
        });

        emitAnnouncementEvent({ type: "announcement:updated", announcementId: announcement.id });

        createNotification({
            actorEmail: auth.email,
            actionType: 'UPDATE_ANNOUNCEMENT',
            targetId: announcement.id,
            message: `${auth.name || auth.email.split('@')[0]} (${auth.role}) updated announcement: ${announcement.title}`,
            recipients: getAnnouncementAudience({
                scopeType: announcement.scopeType,
                selectedDepartments: announcement.department ? announcement.department.split(",") : [],
                targetRole: announcement.targetRole,
            }),
            sendEmail: true,
            emailSubject: `Announcement Updated — ${announcement.title}`,
            linkPath: `/open/item?type=announcement&id=${announcement.id}`,
        });

        return NextResponse.json(announcement);
    } catch (error) {
        console.error("Error updating announcement:", error);
        return NextResponse.json({ error: "Failed to update announcement" }, { status: 500 });
    }
}

/**
 * DELETE /api/announcements/[id] - Delete an announcement
 */
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: paramId } = await params;
    const id = parseInt(paramId, 10);
    if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    try {
        const existing = await prisma.announcement.findUnique({ where: { id } });
        if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

        await prisma.announcement.delete({ where: { id } });

        emitAnnouncementEvent({ type: "announcement:deleted", announcementId: id });

        createNotification({
            actorEmail: auth.email,
            actionType: 'DELETE_ANNOUNCEMENT',
            targetId: id,
            message: `${auth.name || auth.email.split('@')[0]} (${auth.role}) deleted an announcement: ${existing.title}.`,
            recipients: getAnnouncementAudience({
                scopeType: existing.scopeType,
                selectedDepartments: existing.department ? existing.department.split(",") : [],
                targetRole: existing.targetRole,
            }),
            sendEmail: true,
            emailSubject: `Announcement Deleted — ${existing.title}`,
            linkPath: `/open/item?type=announcement`,
        });

        return NextResponse.json({ success: true, message: "Announcement deleted" });
    } catch (error) {
        console.error("Error deleting announcement:", error);
        return NextResponse.json({ error: "Failed to delete announcement" }, { status: 500 });
    }
}

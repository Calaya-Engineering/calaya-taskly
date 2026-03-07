import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { emitRealtimeEvent } from "@/lib/realtime-events";

export async function GET(req: NextRequest) {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: auth.email },
            select: { id: true },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const unreadOnly = req.nextUrl.searchParams.get("unread") === "true";
        const compact = req.nextUrl.searchParams.get("compact") === "true";
        const limit = Math.min(parseInt(req.nextUrl.searchParams.get("limit") || "50", 10) || 50, 100);

        const where: any = { recipientId: user.id };
        if (unreadOnly) {
            where.read = false;
        }

        const notifications = compact
            ? await prisma.notification.findMany({
                where,
                orderBy: { createdAt: "desc" },
                take: limit,
                select: {
                    id: true,
                    read: true,
                    createdAt: true,
                },
            })
            : await prisma.notification.findMany({
                where,
                orderBy: { createdAt: "desc" },
                take: limit,
                include: {
                    actor: { select: { id: true, name: true, role: true } },
                },
            });

        return NextResponse.json(notifications);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to fetch notifications" },
            { status: 500 }
        );
    }
}

export async function PATCH(req: NextRequest) {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: auth.email },
            select: { id: true },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const body = await req.json();
        const { id, markAllRead } = body;

        if (markAllRead) {
            await prisma.notification.updateMany({
                where: { recipientId: user.id, read: false },
                data: { read: true },
            });
            emitRealtimeEvent({
                type: "notification:all-read",
                entity: "notification",
                action: "all-read",
                entityId: user.id,
            });
            return NextResponse.json({ success: true, message: "All marked as read" });
        }

        if (id) {
            const notification = await prisma.notification.findUnique({
                where: { id: Number(id) }
            });

            if (!notification || notification.recipientId !== user.id) {
                return NextResponse.json({ error: "Not found or forbidden" }, { status: 403 });
            }

            const updated = await prisma.notification.update({
                where: { id: Number(id) },
                data: { read: true },
            });

            emitRealtimeEvent({
                type: "notification:read",
                entity: "notification",
                action: "read",
                entityId: updated.id,
            });

            return NextResponse.json({ success: true, notification: updated });
        }

        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    } catch (error) {
        console.error("Error updating notifications:", error);
        return NextResponse.json(
            { error: "Failed to update notifications" },
            { status: 500 }
        );
    }
}

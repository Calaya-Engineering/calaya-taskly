import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email: auth.email } });
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id: paramId } = await params;
    const id = parseInt(paramId, 10);
    if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    try {
        await prisma.announcementRead.upsert({
            where: {
                announcementId_userId: {
                    announcementId: id,
                    userId: user.id,
                },
            },
            update: {},
            create: {
                announcementId: id,
                userId: user.id,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error marking announcement as read:", error);
        return NextResponse.json({ error: "Failed to mark as read" }, { status: 500 });
    }
}

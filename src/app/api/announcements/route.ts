import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { emitAnnouncementEvent } from "@/lib/announcement-events";
import { createNotification } from "@/lib/notifications";
import { getAnnouncementAudience } from "@/lib/notification-audiences";

export async function GET(req: NextRequest) {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const department = searchParams.get("department");
    const targetRole = searchParams.get("targetRole");
    const compact = searchParams.get("compact") === "true";
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "50", 10) || 50, 100);

    try {
        const where: Record<string, any> = {};
        if (department && department !== "all") {
            where.OR = [
                { department: { contains: department } },
                { scopeType: "ALL_COMPANY" }
            ];
        } else {
            const departments = searchParams.get("departments");
            if (departments) {
                const list = departments.split(",").map(d => d.trim()).filter(Boolean);
                where.OR = [
                    ...list.map(d => ({ department: { contains: d } })),
                    { scopeType: "ALL_COMPANY" }
                ];
            }
        }
        if (targetRole) where.targetRole = targetRole;

        const authUser = await prisma.user.findUnique({
            where: { email: auth.email },
            select: { id: true },
        });

        if (compact) {
            const announcements = await prisma.announcement.findMany({
                where,
                take: limit,
                select: {
                    id: true,
                    createdAt: true,
                    reads: {
                        where: authUser ? { userId: authUser.id } : undefined,
                        select: { userId: true },
                    },
                },
                orderBy: { createdAt: "desc" },
            });

            const compactMapped = announcements.map((a) => ({
                id: a.id,
                createdAt: a.createdAt,
                read: authUser ? a.reads.length > 0 : false,
            }));
            return NextResponse.json(compactMapped);
        }

        const announcements = await prisma.announcement.findMany({
            where,
            take: limit,
            include: {
                reads: {
                    select: { userId: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        const mappedAnnouncements = announcements.map(a => ({
            ...a,
            read: authUser ? a.reads.some(r => r.userId === authUser.id) : false,
            message: a.description,
            createdDate: a.createdAt,
            scope: a.scopeType,
            readsCount: a.reads.length,
            departments: a.department ? a.department.split(',') : [],
            comments: 0,
            documents: 0
        }));

        return NextResponse.json(mappedAnnouncements);
    } catch (error) {
        console.error("Error fetching announcements:", error);
        return NextResponse.json({ error: "Failed to fetch announcements" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const creator = await prisma.user.findUnique({
        where: { email: auth.email },
        select: { id: true, name: true, role: true },
    });
    if (!creator) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    try {
        const body = await req.json();
        const { title, message, priority, scopeType, selectedDepartments, expiresAt, date, description } = body as {
            title?: string;
            message?: string;
            description?: string;
            priority?: string;
            scopeType?: string;
            selectedDepartments?: string[];
            expiresAt?: string;
            date?: string;
        };

        if (!title || typeof title !== "string" || title.trim().length === 0) {
            return NextResponse.json({ error: "Title is required" }, { status: 400 });
        }

        const finalDescription = (message || description || "").trim();
        if (!finalDescription) {
            return NextResponse.json({ error: "Message/Description is required" }, { status: 400 });
        }

        const createdBy = creator.name || creator.role;

        const finalDate = date ? new Date(date) : new Date();

        const announcement = await prisma.announcement.create({
            data: {
                title: title.trim(),
                description: finalDescription,
                date: finalDate,
                priority: priority || "NORMAL",
                scopeType: scopeType || "ALL_COMPANY",
                department: Array.isArray(selectedDepartments) && selectedDepartments.length > 0 ? selectedDepartments.join(",") : null,
                expiresAt: expiresAt ? new Date(expiresAt) : null,
                createdBy,
                createdByRole: creator.role,
                createdById: creator.id,
            },
        });

        emitAnnouncementEvent({ type: "announcement:created", announcementId: announcement.id });

        // Sync to calendar by creating a mirror Task of type EVENT
        await prisma.task.create({
            data: {
                title: `📣 ${announcement.title}`,
                description: announcement.description,
                startDate: finalDate,
                dueDate: finalDate,
                type: "EVENT",
                status: "OPEN",
                priority: "HIGH",
                visibility: "PUBLIC",
                createdById: creator.id,
                department: announcement.department || "All Company",
            },
        });

        createNotification({
            actorEmail: auth.email,
            actionType: 'CREATE_ANNOUNCEMENT',
            targetId: announcement.id,
            message: `${auth.name || auth.email.split('@')[0]} (${auth.role}) posted an announcement: ${announcement.title}`,
            recipients: getAnnouncementAudience({
                scopeType: announcement.scopeType,
                selectedDepartments: announcement.department ? announcement.department.split(",") : [],
                targetRole: announcement.targetRole,
            }),
            sendEmail: true,
            emailSubject: `Announcement Posted — ${announcement.title}`,
            linkPath: `/open/item?type=announcement&id=${announcement.id}`,
        });

        return NextResponse.json(announcement);
    } catch (error) {
        console.error("Error creating announcement:", error);
        return NextResponse.json({ error: "Failed to create announcement" }, { status: 500 });
    }
}

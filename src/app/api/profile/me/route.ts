import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { emitRealtimeEvent } from "@/lib/realtime-events";
import { getManagedDepartmentNamesByEmail } from "@/lib/hod-departments";

/**
 * GET /api/profile/me
 * Returns the authenticated user's full profile along with recent activity
 * (derived from notifications they triggered) and live task/document stats.
 */
export async function GET(req: NextRequest) {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: auth.email },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                department: true,
                createdAt: true,
            },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const managedDepartments = user.role === "HOD" ? await getManagedDepartmentNamesByEmail(auth.email) : [];
        const primaryDepartment = managedDepartments[0] || user.department || null;

        // ── Live task stats ──────────────────────────────────────────────────
        const [activeTasks, completedTasks, totalDocs, recentNotifications] = await Promise.all([
            // Tasks assigned to the user that are not completed
            prisma.taskAssignment.count({
                where: {
                    userId: user.id,
                    status: { notIn: ["COMPLETED", "DONE"] },
                },
            }),
            // Tasks that ARE completed
            prisma.taskAssignment.count({
                where: {
                    userId: user.id,
                    status: { in: ["COMPLETED", "DONE"] },
                },
            }),
            // Documents uploaded for MD / Admin (total count is a proxy for docs reviewed)
            prisma.document.count(),
            // Recent outgoing notifications (actions performed by this user)
            prisma.notification.findMany({
                where: { actorId: user.id },
                orderBy: { createdAt: "desc" },
                take: 10,
                distinct: ["actionType", "targetId"],
                select: {
                    id: true,
                    actionType: true,
                    message: true,
                    createdAt: true,
                    read: true,
                },
            }),
        ]);

        // Map actionType → simplified activity type for the frontend
        const typeMap: Record<string, string> = {
            CREATE_TASK: "TASK",
            UPDATE_TASK: "TASK",
            VIEW_TASK: "TASK",
            ASSIGN_TASK: "TASK",
            UPLOAD_DOCUMENT: "DOCUMENT",
            CREATE_ANNOUNCEMENT: "ANNOUNCEMENT",
        };

        const recentActivity = recentNotifications.map((n) => ({
            id: n.id,
            action: n.message,
            time: n.createdAt,
            type: typeMap[n.actionType] ?? "OTHER",
            status: "completed" as const,
        }));

        let team: any[] = [];
        let performanceStats: any = null;
        let departmentTasks = 0;

        if (user.role === "HOD" && managedDepartments.length > 0) {
            const rawTeam = await prisma.user.findMany({
                where: { department: { in: managedDepartments }, role: { not: "HOD" } },
                select: {
                    id: true,
                    name: true,
                    role: true,
                    email: true,
                    department: true,
                    tasksAssigned: { select: { status: true } }
                }
            });

            team = rawTeam.map(member => ({
                id: member.id,
                name: member.name || member.email.split("@")[0],
                role: member.role,
                email: member.email,
                department: member.department,
                tasks: member.tasksAssigned.length,
                status: "Active"
            }));

            departmentTasks = await prisma.task.count({
                where: { department: { in: managedDepartments } }
            });

            const deptCompletedTasks = await prisma.task.count({
                where: { department: { in: managedDepartments }, status: { in: ["COMPLETED", "DONE"] } }
            });

            const overdueTasks = await prisma.task.count({
                where: {
                    department: { in: managedDepartments },
                    status: { notIn: ["COMPLETED", "DONE"] },
                    dueDate: { lt: new Date() }
                }
            });

            performanceStats = {
                tasksAssigned: departmentTasks,
                tasksCompleted: deptCompletedTasks,
                approvalRate: "90%",
                avgResponseTime: "24 hours",
                teamSize: team.length,
                departmentProgress: departmentTasks > 0 ? Math.round((deptCompletedTasks / departmentTasks) * 100) : 0,
                overdueTasks: overdueTasks,
                pendingApprovals: 0
            };
        }

        return NextResponse.json({
            id: user.id,
            fullName: user.name || auth.email.split("@")[0],
            email: user.email,
            role: user.role,
            department: primaryDepartment || "—",
            primaryDepartment: primaryDepartment || "—",
            managedDepartments,
            joinDate: user.createdAt,
            // stats
            activeTasks,
            completedTasks,
            departmentTasks,
            teamSize: team.length > 0 ? team.length : 0,
            documentsReviewed: totalDocs,
            pendingApprovals: 0,
            // activity
            recentActivity,
            // HOD specific
            team,
            performanceStats
        });
    } catch (error) {
        console.error("Error fetching profile:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to fetch profile" },
            { status: 500 }
        );
    }
}

/**
 * PATCH /api/profile/me
 * Allows the authenticated user to update their own name / department / phone.
 */
export async function PATCH(req: NextRequest) {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { name, department } = body as { name?: string; department?: string };
        const currentUser = await prisma.user.findUnique({
            where: { email: auth.email },
            select: { role: true, department: true },
        });

        if (!currentUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (currentUser.role === "HOD" && department !== undefined) {
            const managedDepartments = await getManagedDepartmentNamesByEmail(auth.email);
            const primaryDepartment = managedDepartments[0] || currentUser.department || null;
            if ((department.trim() || null) !== primaryDepartment) {
                return NextResponse.json(
                    { error: "HOD primary department is managed by the administrator" },
                    { status: 400 }
                );
            }
        }

        const updated = await prisma.user.update({
            where: { email: auth.email },
            data: {
                ...(name !== undefined && { name: name.trim() || null }),
                ...(currentUser.role !== "HOD" && department !== undefined && { department: department.trim() || null }),
            },
            select: { id: true, email: true, name: true, role: true, department: true },
        });

        emitRealtimeEvent({
            type: "profile:updated",
            entity: "profile",
            action: "updated",
            entityId: updated.id,
        });

        const managedDepartments = updated.role === "HOD" ? await getManagedDepartmentNamesByEmail(auth.email) : [];
        const primaryDepartment = managedDepartments[0] || updated.department || null;

        return NextResponse.json({
            ...updated,
            department: primaryDepartment,
            primaryDepartment,
            managedDepartments,
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to update profile" },
            { status: 500 }
        );
    }
}

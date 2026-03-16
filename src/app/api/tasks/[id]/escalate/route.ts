import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { emitTaskEvent } from "@/lib/task-events";
import { createNotification } from "@/lib/notifications";

/**
 * POST /api/tasks/[id]/escalate
 * Body: { reason?: string }
 * Marks a task as escalated and notifies all MD and Admin users.
 */
export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only HODs (and above) can escalate
    if (!["HOD", "MD", "ADMIN"].includes(auth.role)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const taskId = parseInt(id, 10);
    if (Number.isNaN(taskId)) {
        return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
    }

    const body = await req.json().catch(() => ({}));
    const reason: string = body.reason?.trim() || "Escalated by HOD";

    try {
        const task = await prisma.task.findUnique({
            where: { id: taskId },
            include: {
                createdBy: { select: { id: true, email: true, name: true, role: true } },
                assignments: {
                    include: {
                        user: { select: { id: true, email: true, name: true, role: true, department: true } },
                    },
                },
            },
        });

        if (!task) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        if (task.escalated) {
            return NextResponse.json({ error: "Task is already escalated" }, { status: 409 });
        }

        // Update task with escalation
        const updated = await prisma.task.update({
            where: { id: taskId },
            data: {
                escalated: true,
                escalatedAt: new Date(),
                escalationReason: reason,
            },
            include: {
                createdBy: { select: { id: true, email: true, name: true, role: true } },
                assignments: {
                    include: {
                        user: { select: { id: true, email: true, name: true, role: true, department: true } },
                    },
                },
            },
        });

        // Emit SSE event so all dashboards update in real-time
        emitTaskEvent({ type: "task:escalated", taskId });

        // createNotification already broadcasts to all MD/Admin users automatically
        const escalationMsg = `${auth.name || auth.email.split("@")[0]} (HOD) escalated task: "${task.title}". Reason: ${reason}`;
        await createNotification({
            actorEmail: auth.email,
            actionType: "ESCALATE_TASK",
            targetId: taskId,
            message: escalationMsg,
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error escalating task:", error);
        return NextResponse.json({ error: "Failed to escalate task" }, { status: 500 });
    }
}

/**
 * DELETE /api/tasks/[id]/escalate — de-escalate a task (MD/Admin only)
 */
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!["MD", "ADMIN"].includes(auth.role)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const taskId = parseInt(id, 10);
    if (Number.isNaN(taskId)) {
        return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
    }

    try {
        const updated = await prisma.task.update({
            where: { id: taskId },
            data: { escalated: false, escalatedAt: null, escalationReason: null },
        });

        emitTaskEvent({ type: "task:updated", taskId });

        createNotification({
            actorEmail: auth.email,
            actionType: 'DEESCALATE_TASK',
            targetId: taskId,
            message: `${auth.name || auth.email.split('@')[0]} (${auth.role}) de-escalated task: "${updated.title}"`
        });

        return NextResponse.json(updated);
    } catch {
        return NextResponse.json({ error: "Failed to de-escalate task" }, { status: 500 });
    }
}

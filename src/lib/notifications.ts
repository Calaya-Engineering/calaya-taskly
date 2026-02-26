import { prisma } from './prisma';

export async function createNotification(params: {
    actorEmail: string;
    actionType: string;
    targetId?: number;
    message: string;
}) {
    try {
        // 1. Get the actor
        const actor = await prisma.user.findUnique({
            where: { email: params.actorEmail },
            select: { id: true, role: true, name: true, email: true }
        });

        if (!actor) {
            console.warn(`Could not create notification, actor not found for email: ${params.actorEmail}`);
            return;
        }

        const actorName = actor.name || actor.email.split('@')[0];

        // Format final message by replacing placeholder if necessary, or just use params.message
        // If we want to automatically prepend the actor name, we could, but let's just use what's given.

        // 2. Get all MD and Admin users
        const adminMgmtUsers = await prisma.user.findMany({
            where: {
                role: {
                    in: ['MD', 'Admin']
                }
            },
            select: { id: true }
        });

        const recipientIds = new Set(adminMgmtUsers.map(u => u.id));
        // Users should also see notifications related to their own actions
        recipientIds.add(actor.id);

        const notifications = Array.from(recipientIds).map(recipientId => ({
            recipientId,
            actorId: actor.id,
            actorRole: actor.role,
            actionType: params.actionType,
            targetId: params.targetId,
            message: params.message
        }));

        if (notifications.length > 0) {
            await prisma.notification.createMany({
                data: notifications
            });
        }

    } catch (error) {
        console.error('Failed to create notifications:', error);
    }
}

import { prisma } from "@/lib/prisma";

export type RecipientCountQuery = {
  userIds?: number[];
  roles?: string[];
  departments?: string[];
  includeActor?: boolean;
};

export async function countRecipientUsers(actorId: number, query?: RecipientCountQuery) {
  const recipientIds = new Set<number>();

  if (!query) {
    const users = await prisma.user.findMany({
      where: {
        role: {
          in: ["MD", "Admin"],
        },
      },
      select: { id: true },
    });

    users.forEach((user) => recipientIds.add(user.id));
    recipientIds.add(actorId);
    return recipientIds.size;
  }

  const directIds = Array.isArray(query.userIds)
    ? query.userIds.filter((value) => Number.isInteger(value) && value > 0)
    : [];
  directIds.forEach((id) => recipientIds.add(id));

  const roles = Array.from(new Set((query.roles || []).map((value) => value.trim()).filter(Boolean)));
  const departments = Array.from(new Set((query.departments || []).map((value) => value.trim()).filter(Boolean)));

  if (roles.length > 0 || departments.length > 0) {
    const users = await prisma.user.findMany({
      where: {
        ...(roles.length > 0 ? { role: { in: roles } } : {}),
        ...(departments.length > 0
          ? {
              OR: [
                { department: { in: departments } },
                {
                  managedDepartmentRelations: {
                    some: {
                      department: {
                        is: {
                          name: { in: departments },
                        },
                      },
                    },
                  },
                },
              ],
            }
          : {}),
      },
      select: { id: true },
    });

    users.forEach((user) => recipientIds.add(user.id));
  }

  if (query.includeActor) {
    recipientIds.add(actorId);
  }

  return recipientIds.size;
}

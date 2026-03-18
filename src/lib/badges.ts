import { prisma } from "@/lib/prisma";
import { resolveBadgeSectionPath, TRACKED_BADGE_PATHS, getDashboardPrefixForRole } from "@/lib/badge-paths";
import { getManagedDepartmentNamesByUserId } from "@/lib/hod-departments";

type BadgeCounts = Record<string, number>;

type SeenMap = Map<string, Date>;

function buildAnnouncementScope(departments: string[]) {
  if (departments.length === 0) return undefined;

  return {
    OR: [
      ...departments.map((department) => ({
        department: { contains: department },
      })),
      { scopeType: "ALL_COMPANY" },
    ],
  };
}

function buildDepartmentInScope(departments: string[]) {
  if (departments.length === 0) return undefined;
  return { in: departments };
}

async function getUserAndSeenState(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    select: {
      id: true,
      role: true,
      department: true,
      sectionSeen: {
        select: {
          section: true,
          seenAt: true,
        },
      },
    },
  });

  if (!user) return null;

  const seenBySection: SeenMap = new Map(
    user.sectionSeen.map((entry) => [entry.section, entry.seenAt])
  );

  return { user, seenBySection };
}

function setBadge(counts: BadgeCounts, section: string, count: number) {
  if (!TRACKED_BADGE_PATHS.has(section)) return;
  counts[section] = count > 0 ? count : 0;
}

export async function getBadgeCountsForUser(email: string): Promise<BadgeCounts> {
  const state = await getUserAndSeenState(email);
  if (!state) return {};

  const { user, seenBySection } = state;
  const prefix = getDashboardPrefixForRole(user.role);
  if (!prefix || prefix === "/admin-dashboard") return {};

  const managedDepartments =
    user.role === "HOD"
      ? await getManagedDepartmentNamesByUserId(user.id)
      : [];
  const userDepartments = managedDepartments.length > 0
    ? managedDepartments
    : user.department?.trim()
      ? [user.department.trim()]
      : [];

  const counts: BadgeCounts = {};

  const notificationsSection = `${prefix}/notifications`;
  setBadge(
    counts,
    notificationsSection,
    await prisma.notification.count({
      where: {
        recipientId: user.id,
        read: false,
      },
    })
  );

  const announcementsSection = `${prefix}/announcements`;
  const announcementsSeenAt = seenBySection.get(announcementsSection);
  setBadge(
    counts,
    announcementsSection,
    await prisma.announcement.count({
      where: {
        ...(buildAnnouncementScope(userDepartments) ?? {}),
        ...(announcementsSeenAt
          ? {
              createdAt: {
                gt: announcementsSeenAt,
              },
            }
          : {}),
      },
    })
  );

  const tendersSection = `${prefix}/tenders`;
  const tendersSeenAt = seenBySection.get(tendersSection);
  setBadge(
    counts,
    tendersSection,
    await prisma.tender.count({
      where: {
        ...(user.role === "MD" || userDepartments.length === 0
          ? {}
          : { department: buildDepartmentInScope(userDepartments) }),
        ...(tendersSeenAt
          ? {
              createdAt: {
                gt: tendersSeenAt,
              },
            }
          : {}),
      },
    })
  );

  if (prefix === "/secretary-dashboard") {
    return counts;
  }

  if (prefix === "/staff-dashboard") {
    const tasksSection = `${prefix}/tasks`;
    const tasksSeenAt = seenBySection.get(tasksSection);
    setBadge(
      counts,
      tasksSection,
      await prisma.taskAssignment.count({
        where: {
          userId: user.id,
          ...(tasksSeenAt
            ? {
                assignedAt: {
                  gt: tasksSeenAt,
                },
              }
            : {}),
          task: {
            type: {
              not: "EVENT",
            },
          },
        },
      })
    );

    return counts;
  }

  const departmentScope =
    prefix === "/md-dashboard" || userDepartments.length === 0
      ? {}
      : {
          department: buildDepartmentInScope(userDepartments),
        };

  const tasksSection = `${prefix}/tasks`;
  const tasksSeenAt = seenBySection.get(tasksSection);
  setBadge(
    counts,
    tasksSection,
    await prisma.task.count({
      where: {
        ...(prefix === "/hod-dashboard"
          ? {
              OR: [
                ...(userDepartments.length > 0
                  ? [{ department: buildDepartmentInScope(userDepartments) }]
                  : []),
                { assignments: { some: { userId: user.id } } },
              ],
            }
          : departmentScope),
        type: {
          not: "EVENT",
        },
        ...(tasksSeenAt
          ? {
              createdAt: {
                gt: tasksSeenAt,
              },
            }
          : {}),
      },
    })
  );

  if (prefix === "/hod-dashboard") {
    const myTasksSection = `${prefix}/my-tasks`;
    const myTasksSeenAt = seenBySection.get(myTasksSection);
    setBadge(
      counts,
      myTasksSection,
      await prisma.taskAssignment.count({
        where: {
          userId: user.id,
          ...(myTasksSeenAt
            ? {
                assignedAt: {
                  gt: myTasksSeenAt,
                },
              }
            : {}),
          task: {
            type: {
              not: "EVENT",
            },
          },
        },
      })
    );
  }

  const approvalsSection = `${prefix}/approvals`;
  const approvalsSeenAt = seenBySection.get(approvalsSection);
  setBadge(
    counts,
    approvalsSection,
    await prisma.task.count({
      where: {
        status: "PENDING",
        type: {
          not: "EVENT",
        },
        ...departmentScope,
        ...(approvalsSeenAt
          ? {
              updatedAt: {
                gt: approvalsSeenAt,
              },
            }
          : {}),
      },
    })
  );

  const escalationsSection = `${prefix}/escalations`;
  const escalationsSeenAt = seenBySection.get(escalationsSection);
  setBadge(
    counts,
    escalationsSection,
    await prisma.task.count({
      where: {
        escalated: true,
        ...departmentScope,
        ...(escalationsSeenAt
          ? {
              escalatedAt: {
                gt: escalationsSeenAt,
              },
            }
          : {}),
      },
    })
  );

  return counts;
}

export async function markBadgeSectionSeen(email: string, path: string) {
  const section = resolveBadgeSectionPath(path);
  if (!section) return false;

  const normalizedEmail = email.trim().toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    select: { id: true },
  });

  if (!user) return false;

  await prisma.userSectionSeen.upsert({
    where: {
      userId_section: {
        userId: user.id,
        section,
      },
    },
    create: {
      userId: user.id,
      section,
      seenAt: new Date(),
    },
    update: {
      seenAt: new Date(),
    },
  });

  return true;
}

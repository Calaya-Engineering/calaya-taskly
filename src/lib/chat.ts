import { prisma } from "@/lib/prisma";

export type AuthedUser = {
  id: number;
  email: string;
  name: string | null;
  role: string;
  department: string | null;
};

/**
 * Canonical key for a direct-message channel between two users.
 * Sorted so (a,b) === (b,a).
 */
export function buildDirectKey(userIdA: number, userIdB: number): string {
  const [a, b] = userIdA < userIdB ? [userIdA, userIdB] : [userIdB, userIdA];
  return `u:${a}:${b}`;
}

export async function getAuthedUserOrNull(email: string): Promise<AuthedUser | null> {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      department: true,
    },
  });
  return user;
}

/**
 * Ensure the current user is a member of their department channel.
 * Creates the channel if missing, then adds the member if not present.
 * Returns the channel id, or null if the user has no department.
 */
export async function ensureDepartmentChannel(user: AuthedUser): Promise<number | null> {
  const department = user.department?.trim();
  if (!department) return null;

  const existing = await prisma.chatChannel.findFirst({
    where: { type: "DEPARTMENT", departmentName: department },
    select: { id: true },
  });

  let channelId = existing?.id;
  if (!channelId) {
    const created = await prisma.chatChannel.create({
      data: {
        type: "DEPARTMENT",
        name: `${department} Department`,
        departmentName: department,
      },
      select: { id: true },
    });
    channelId = created.id;
  }

  await prisma.chatChannelMember.upsert({
    where: { channelId_userId: { channelId, userId: user.id } },
    create: { channelId, userId: user.id },
    update: {},
  });

  // Also lazily add every other user in the same department so the
  // group chat actually has its members.
  const otherUsers = await prisma.user.findMany({
    where: { department, NOT: { id: user.id } },
    select: { id: true },
  });
  if (otherUsers.length > 0) {
    await prisma.chatChannelMember.createMany({
      data: otherUsers.map((u) => ({ channelId, userId: u.id })),
      skipDuplicates: true,
    });
  }

  return channelId;
}

/**
 * Find or create a 1:1 direct-message channel between two users.
 * Returns the channel id.
 */
export async function ensureDirectChannel(userA: AuthedUser, otherUserId: number): Promise<number> {
  if (userA.id === otherUserId) {
    throw new Error("Cannot start a direct message with yourself");
  }
  const directKey = buildDirectKey(userA.id, otherUserId);

  const existing = await prisma.chatChannel.findUnique({
    where: { directKey },
    select: { id: true },
  });
  if (existing) return existing.id;

  // Confirm the other user exists before creating.
  const other = await prisma.user.findUnique({
    where: { id: otherUserId },
    select: { id: true },
  });
  if (!other) throw new Error("User not found");

  const channel = await prisma.chatChannel.create({
    data: {
      type: "DIRECT",
      directKey,
      members: {
        create: [
          { userId: userA.id },
          { userId: otherUserId },
        ],
      },
    },
    select: { id: true },
  });
  return channel.id;
}

/**
 * Confirm the requesting user is a member of the channel.
 * Returns the member record (with lastReadAt) or null.
 */
export async function getMembership(channelId: number, userId: number) {
  return prisma.chatChannelMember.findUnique({
    where: { channelId_userId: { channelId, userId } },
    select: { id: true, lastReadAt: true },
  });
}

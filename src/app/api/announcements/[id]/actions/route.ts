import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { createNotification, notifyUsers } from "@/lib/notifications";
import { emitAnnouncementEvent } from "@/lib/announcement-events";
import { getAnnouncementAudience } from "@/lib/notification-audiences";
import { countRecipientUsers } from "@/lib/notification-recipient-count";

const REPOST_ALLOWED_ROLES = new Set(["Admin", "MD", "HOD", "Secretary"]);

function parseAnnouncementId(value: string) {
  const id = parseInt(value, 10);
  return Number.isNaN(id) ? null : id;
}

function formatActorLabel(email: string) {
  return email.split("@")[0] || "System";
}

function formatDateTime(value?: Date | null) {
  if (!value) return "Not set";
  return value.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await getAuthFromRequest(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: rawId } = await params;
  const announcementId = parseAnnouncementId(rawId);
  if (!announcementId) {
    return NextResponse.json({ error: "Invalid announcement ID" }, { status: 400 });
  }

  const action = new URL(req.url).searchParams.get("action");
  if (action !== "analytics") {
    return NextResponse.json({ error: "Unsupported action" }, { status: 400 });
  }

  try {
    const [actor, announcement] = await Promise.all([
      prisma.user.findUnique({
        where: { email: auth.email },
        select: { id: true },
      }),
      prisma.announcement.findUnique({
        where: { id: announcementId },
        include: {
          reads: {
            select: { userId: true },
          },
        },
      }),
    ]);

    if (!actor) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!announcement) {
      return NextResponse.json({ error: "Announcement not found" }, { status: 404 });
    }

    const audience = getAnnouncementAudience({
      scopeType: announcement.scopeType,
      selectedDepartments: announcement.department ? announcement.department.split(",") : [],
      targetRole: announcement.targetRole,
    });
    const audienceCount = await countRecipientUsers(actor.id, audience);
    const readsCount = announcement.reads.length;

    return NextResponse.json({
      title: announcement.title,
      entityLabel: "Announcement",
      stats: [
        { label: "Target Audience", value: String(audienceCount), tone: "blue" },
        { label: "Reads", value: String(readsCount), tone: "green" },
        { label: "Unread", value: String(Math.max(audienceCount - readsCount, 0)), tone: "amber" },
        { label: "Published", value: formatDateTime(announcement.date), tone: "slate" },
        { label: "Expires", value: announcement.expiresAt ? formatDateTime(announcement.expiresAt) : "No expiry", tone: "purple" },
      ],
    });
  } catch (error) {
    console.error("Failed to load announcement analytics:", error);
    return NextResponse.json({ error: "Failed to load announcement analytics" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await getAuthFromRequest(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: rawId } = await params;
  const announcementId = parseAnnouncementId(rawId);
  if (!announcementId) {
    return NextResponse.json({ error: "Invalid announcement ID" }, { status: 400 });
  }

  try {
    const announcement = await prisma.announcement.findUnique({
      where: { id: announcementId },
    });

    if (!announcement) {
      return NextResponse.json({ error: "Announcement not found" }, { status: 404 });
    }

    const body = (await req.json().catch(() => ({}))) as {
      action?: string;
      userIds?: number[];
      date?: string;
      expiresAt?: string | null;
    };

    const audience = getAnnouncementAudience({
      scopeType: announcement.scopeType,
      selectedDepartments: announcement.department ? announcement.department.split(",") : [],
      targetRole: announcement.targetRole,
    });
    const actorLabel = formatActorLabel(auth.email);

    if (body.action === "email") {
      await createNotification({
        actorEmail: auth.email,
        actionType: "ANNOUNCEMENT_REMINDER",
        targetId: announcement.id,
        message: `${actorLabel} (${auth.role}) sent a reminder for announcement: ${announcement.title}`,
        recipients: audience,
        sendEmail: true,
        emailSubject: `Announcement Reminder — ${announcement.title}`,
        linkPath: `/open/item?type=announcement&id=${announcement.id}`,
      });

      return NextResponse.json({ message: "Announcement email reminder queued successfully." });
    }

    if (body.action === "share") {
      const userIds = Array.isArray(body.userIds)
        ? body.userIds.filter((value) => Number.isInteger(value) && value > 0)
        : [];
      if (userIds.length === 0) {
        return NextResponse.json({ error: "Select at least one person to share with." }, { status: 400 });
      }

      await notifyUsers({
        actorEmail: auth.email,
        actionType: "ANNOUNCEMENT_SHARED",
        targetId: announcement.id,
        message: `${actorLabel} (${auth.role}) shared an announcement with you: ${announcement.title}`,
        recipientIds: userIds,
        sendEmail: true,
        emailSubject: `Announcement Shared — ${announcement.title}`,
        linkPath: `/open/item?type=announcement&id=${announcement.id}`,
      });

      return NextResponse.json({ message: "Announcement shared successfully." });
    }

    if (body.action === "repost") {
      if (!REPOST_ALLOWED_ROLES.has(auth.role)) {
        return NextResponse.json({ error: "You do not have permission to repost announcements." }, { status: 403 });
      }

      const nextDate = body.date ? new Date(body.date) : new Date();
      if (Number.isNaN(nextDate.getTime())) {
        return NextResponse.json({ error: "A valid publish date is required." }, { status: 400 });
      }

      const nextExpiresAt =
        body.expiresAt === null || body.expiresAt === ""
          ? null
          : body.expiresAt
            ? new Date(body.expiresAt)
            : announcement.expiresAt;
      if (nextExpiresAt && Number.isNaN(nextExpiresAt.getTime())) {
        return NextResponse.json({ error: "Expiry date is invalid." }, { status: 400 });
      }

      const updatedAnnouncement = await prisma.announcement.update({
        where: { id: announcement.id },
        data: {
          date: nextDate,
          expiresAt: nextExpiresAt ?? null,
        },
      });

      emitAnnouncementEvent({ type: "announcement:updated", announcementId: updatedAnnouncement.id });

      await createNotification({
        actorEmail: auth.email,
        actionType: "ANNOUNCEMENT_REMINDER",
        targetId: updatedAnnouncement.id,
        message: `${actorLabel} (${auth.role}) re-posted announcement: ${updatedAnnouncement.title}`,
        recipients: audience,
        sendEmail: true,
        emailSubject: `Announcement Re-posted — ${updatedAnnouncement.title}`,
        linkPath: `/open/item?type=announcement&id=${updatedAnnouncement.id}`,
      });

      return NextResponse.json({
        message: "Announcement re-posted successfully.",
        announcement: updatedAnnouncement,
      });
    }

    return NextResponse.json({ error: "Unsupported action" }, { status: 400 });
  } catch (error) {
    console.error("Failed to handle announcement action:", error);
    return NextResponse.json({ error: "Failed to process announcement action" }, { status: 500 });
  }
}

"use client";

import { useMemo, useState, type ReactNode } from "react";
import { fetchWithAuth } from "@/lib/api";
import { toast } from "@/lib/toast";
import { LucideGlyph, renderNodeWithIcons } from "@/components/ui/lucide-icon-text";

type EntityType = "announcement" | "event" | "meeting";

type UserOption = {
  id: number;
  email: string;
  name?: string | null;
  role?: string | null;
  department?: string | null;
};

type AnalyticsStat = {
  label: string;
  value: string;
  tone?: string;
};

type AnalyticsPayload = {
  title: string;
  entityLabel: string;
  stats: AnalyticsStat[];
};

type Props = {
  entityType: EntityType;
  entityId: string | number;
  title: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
  layout?: "stack" | "grid";
  currentDate?: string | null;
  currentExpiresAt?: string | null;
  currentStartDate?: string | null;
  currentEndDate?: string | null;
};

const buttonBase =
  "rounded-2xl border bg-white px-4 py-3 font-semibold transition hover:bg-gray-50 active:scale-[0.99]";

function formatDateTimeLocalInput(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

function parseDate(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function buildSuggestedEventDates(startValue?: string | null, endValue?: string | null) {
  const now = new Date();
  const start = parseDate(startValue) || now;
  const end = parseDate(endValue);
  const durationMs = Math.max((end?.getTime() || start.getTime() + 60 * 60 * 1000) - start.getTime(), 60 * 60 * 1000);
  const suggestedStart = new Date(start);

  if (suggestedStart.getTime() <= now.getTime()) {
    suggestedStart.setFullYear(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  }

  const suggestedEnd = new Date(suggestedStart.getTime() + durationMs);
  return {
    start: formatDateTimeLocalInput(suggestedStart.toISOString()),
    end: formatDateTimeLocalInput(suggestedEnd.toISOString()),
  };
}

function buildSuggestedAnnouncementDates(dateValue?: string | null, expiresValue?: string | null) {
  const now = new Date();
  const publishDate = parseDate(dateValue) || now;
  const expiresDate = parseDate(expiresValue);
  const expiryOffsetMs = expiresDate ? Math.max(expiresDate.getTime() - publishDate.getTime(), 0) : 0;
  const suggestedPublish = publishDate.getTime() > now.getTime() ? publishDate : new Date(now.getTime() + 60 * 60 * 1000);
  const suggestedExpires = expiryOffsetMs > 0 ? new Date(suggestedPublish.getTime() + expiryOffsetMs) : null;

  return {
    publish: formatDateTimeLocalInput(suggestedPublish.toISOString()),
    expires: suggestedExpires ? formatDateTimeLocalInput(suggestedExpires.toISOString()) : "",
  };
}

function toneClasses(tone?: string) {
  switch (tone) {
    case "green":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "amber":
      return "border-amber-200 bg-amber-50 text-amber-700";
    case "purple":
      return "border-violet-200 bg-violet-50 text-violet-700";
    case "slate":
      return "border-slate-200 bg-slate-50 text-slate-700";
    default:
      return "border-blue-200 bg-blue-50 text-blue-700";
  }
}

function ModalShell({
  title,
  subtitle,
  children,
  onClose,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
            {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-500 transition hover:bg-slate-50"
          >
            Close
          </button>
        </div>
        <div className="max-h-[80vh] overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

export default function EntityQuickActions({
  entityType,
  entityId,
  title,
  sectionTitle = "Quick Actions",
  sectionSubtitle,
  layout = "stack",
  currentDate,
  currentExpiresAt,
  currentStartDate,
  currentEndDate,
}: Props) {
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isLoadingPeople, setIsLoadingPeople] = useState(false);
  const [people, setPeople] = useState<UserOption[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [shareSearch, setShareSearch] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [isSubmittingShare, setIsSubmittingShare] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticsPayload | null>(null);
  const [isRepostOpen, setIsRepostOpen] = useState(false);
  const [isSubmittingRepost, setIsSubmittingRepost] = useState(false);
  const [announcementPublishAt, setAnnouncementPublishAt] = useState("");
  const [announcementExpiresAt, setAnnouncementExpiresAt] = useState("");
  const [eventStartAt, setEventStartAt] = useState("");
  const [eventEndAt, setEventEndAt] = useState("");

  const entityLabel = entityType === "announcement" ? "Announcement" : entityType === "meeting" ? "Meeting" : "Event";
  const emailLabel = entityType === "announcement" ? "Email Announcement" : "Email Reminder";
  const basePath = entityType === "announcement" ? `/api/announcements/${entityId}/actions` : `/api/tasks/${entityId}/actions`;
  const actions = [
    {
      key: "email",
      label: emailLabel,
      icon: "📧",
      className: "border-[rgba(44,75,155,0.35)] text-[color:var(--primary-blue)]",
    },
    {
      key: "share",
      label: "Share Link",
      icon: "🔗",
      className: "border-[rgba(109,198,223,0.55)] text-[color:var(--secondary-blue)]",
    },
    {
      key: "analytics",
      label: "View Analytics",
      icon: "📊",
      className: "border-amber-300 text-amber-600",
    },
    {
      key: "repost",
      label: "Re-post",
      icon: "🔄",
      className: "border-emerald-300 text-emerald-600",
    },
  ];

  const filteredPeople = useMemo(() => {
    const query = shareSearch.trim().toLowerCase();
    return people
      .filter((person) => person.id !== currentUserId)
      .filter((person) => {
        if (!query) return true;
        return [person.name, person.email, person.role, person.department]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query));
      });
  }, [people, currentUserId, shareSearch]);

  async function loadPeople() {
    if (people.length > 0) return;

    setIsLoadingPeople(true);
    try {
      const [meResponse, usersResponse] = await Promise.all([fetchWithAuth("/api/me"), fetchWithAuth("/api/users")]);
      const meData = meResponse.ok ? await meResponse.json() : null;
      const usersData = usersResponse.ok ? await usersResponse.json() : [];
      setCurrentUserId(meData?.id ?? null);
      setPeople(Array.isArray(usersData) ? usersData : []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load people in the system.");
    } finally {
      setIsLoadingPeople(false);
    }
  }

  async function handleEmail() {
    setIsSendingEmail(true);
    try {
      const response = await fetchWithAuth(basePath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "email" }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error || `Failed to email ${entityLabel.toLowerCase()}.`);
      }
      toast.success(data?.message || `${entityLabel} email queued successfully.`);
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : `Failed to email ${entityLabel.toLowerCase()}.`);
    } finally {
      setIsSendingEmail(false);
    }
  }

  async function handleShareOpen() {
    try {
      if (typeof window !== "undefined" && navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
      }
      toast.success("Link copied. Choose who should receive it by email.");
    } catch {
      toast.info("Choose who should receive the link by email.");
    }

    setIsShareOpen(true);
    void loadPeople();
  }

  async function handleShareSubmit() {
    if (selectedUserIds.length === 0) {
      toast.info("Select at least one person to share with.");
      return;
    }

    setIsSubmittingShare(true);
    try {
      const response = await fetchWithAuth(basePath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "share",
          userIds: selectedUserIds,
        }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error || `Failed to share ${entityLabel.toLowerCase()}.`);
      }
      toast.success(data?.message || `${entityLabel} shared successfully.`);
      setSelectedUserIds([]);
      setShareSearch("");
      setIsShareOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : `Failed to share ${entityLabel.toLowerCase()}.`);
    } finally {
      setIsSubmittingShare(false);
    }
  }

  async function handleAnalytics() {
    setIsLoadingAnalytics(true);
    setIsAnalyticsOpen(true);
    try {
      const response = await fetchWithAuth(`${basePath}?action=analytics`);
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error || `Failed to load ${entityLabel.toLowerCase()} analytics.`);
      }
      setAnalytics(data);
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : `Failed to load ${entityLabel.toLowerCase()} analytics.`);
      setIsAnalyticsOpen(false);
    } finally {
      setIsLoadingAnalytics(false);
    }
  }

  function openRepostModal() {
    if (entityType === "announcement") {
      const suggestedDates = buildSuggestedAnnouncementDates(currentDate, currentExpiresAt);
      setAnnouncementPublishAt(suggestedDates.publish);
      setAnnouncementExpiresAt(suggestedDates.expires);
    } else {
      const suggestedDates = buildSuggestedEventDates(currentStartDate, currentEndDate);
      setEventStartAt(suggestedDates.start);
      setEventEndAt(suggestedDates.end);
    }

    setIsRepostOpen(true);
  }

  async function handleRepostSubmit() {
    setIsSubmittingRepost(true);
    try {
      const payload =
        entityType === "announcement"
          ? {
              action: "repost",
              date: announcementPublishAt,
              expiresAt: announcementExpiresAt || null,
            }
          : {
              action: "repost",
              startDate: eventStartAt,
              dueDate: eventEndAt,
            };

      const response = await fetchWithAuth(basePath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error || `Failed to re-post ${entityLabel.toLowerCase()}.`);
      }

      toast.success(data?.message || `${entityLabel} re-posted successfully.`);
      setIsRepostOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : `Failed to re-post ${entityLabel.toLowerCase()}.`);
    } finally {
      setIsSubmittingRepost(false);
    }
  }

  const wrapperClasses =
    layout === "grid"
      ? "mt-5 grid grid-cols-2 gap-4 md:grid-cols-4"
      : "mt-4 space-y-2";

  return (
    <>
      <div className="rounded-2xl border border-gray-200/70 bg-white p-6 shadow-none">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-extrabold tracking-tight text-[color:var(--primary-blue)]">{renderNodeWithIcons(sectionTitle)}</h3>
            {sectionSubtitle ? <p className="mt-1 text-sm text-gray-500">{sectionSubtitle}</p> : null}
          </div>
        </div>

        <div className={wrapperClasses}>
          {actions.map((action) => {
            const isBusy = action.key === "email" && isSendingEmail;
            const onClick =
              action.key === "email"
                ? handleEmail
                : action.key === "share"
                  ? handleShareOpen
                  : action.key === "analytics"
                    ? handleAnalytics
                    : openRepostModal;

            return (
              <button
                key={action.key}
                type="button"
                onClick={onClick}
                disabled={isBusy}
                className={`${buttonBase} ${action.className} ${
                  layout === "grid" ? "text-center" : "flex w-full items-center justify-between"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                {layout === "grid" ? (
                  <>
                    <div className="mb-2">
                      <LucideGlyph icon={action.icon} className="text-2xl" />
                    </div>
                    <div>{isBusy ? "Sending..." : action.label}</div>
                  </>
                ) : (
                  <>
                    <span>{isBusy ? "Sending..." : action.label}</span>
                    <LucideGlyph icon={action.icon} />
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {isShareOpen ? (
        <ModalShell
          title={`Share ${entityLabel} Link`}
          subtitle={`Search for people in the system and email "${title}" to them.`}
          onClose={() => setIsShareOpen(false)}
        >
          <div className="space-y-4">
            <input
              type="text"
              value={shareSearch}
              onChange={(event) => setShareSearch(event.target.value)}
              placeholder="Search by name, email, role, or department"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[color:var(--primary-blue)] focus:bg-white"
            />

            <div className="max-h-[360px] space-y-2 overflow-y-auto rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
              {isLoadingPeople ? (
                <div className="px-3 py-8 text-center text-sm text-slate-500">Loading people...</div>
              ) : filteredPeople.length === 0 ? (
                <div className="px-3 py-8 text-center text-sm text-slate-500">No matching people found.</div>
              ) : (
                filteredPeople.map((person) => {
                  const checked = selectedUserIds.includes(person.id);
                  return (
                    <label
                      key={person.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 transition ${
                        checked ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          setSelectedUserIds((current) =>
                            checked ? current.filter((value) => value !== person.id) : [...current, person.id],
                          )
                        }
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900">{person.name || person.email.split("@")[0]}</p>
                        <p className="truncate text-sm text-slate-500">{person.email}</p>
                        <p className="mt-1 text-xs text-slate-400">
                          {[person.role, person.department].filter(Boolean).join(" • ") || "System user"}
                        </p>
                      </div>
                    </label>
                  );
                })
              )}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <p className="text-sm text-slate-500">{selectedUserIds.length} selected</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsShareOpen(false)}
                  className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleShareSubmit}
                  disabled={isSubmittingShare}
                  className="rounded-2xl bg-[color:var(--primary-blue)] px-4 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmittingShare ? "Sending..." : "Send Email"}
                </button>
              </div>
            </div>
          </div>
        </ModalShell>
      ) : null}

      {isAnalyticsOpen ? (
        <ModalShell
          title={`${entityLabel} Analytics`}
          subtitle={analytics ? analytics.title : `Loading analytics for "${title}"`}
          onClose={() => setIsAnalyticsOpen(false)}
        >
          {isLoadingAnalytics ? (
            <div className="py-8 text-center text-sm text-slate-500">Loading analytics...</div>
          ) : analytics ? (
            <div className="grid gap-3 md:grid-cols-2">
              {analytics.stats.map((stat) => (
                <div key={`${stat.label}-${stat.value}`} className={`rounded-2xl border p-4 ${toneClasses(stat.tone)}`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em]">{stat.label}</p>
                  <p className="mt-2 text-xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>
          ) : null}
        </ModalShell>
      ) : null}

      {isRepostOpen ? (
        <ModalShell
          title={`Re-post ${entityLabel}`}
          subtitle={
            entityType === "announcement"
              ? "Refresh the publish window and optionally extend the expiry date."
              : "Update the schedule before sending the reminder back out."
          }
          onClose={() => setIsRepostOpen(false)}
        >
          <div className="space-y-4">
            {entityType === "announcement" ? (
              <>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Publish Date & Time</span>
                  <input
                    type="datetime-local"
                    value={announcementPublishAt}
                    onChange={(event) => setAnnouncementPublishAt(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[color:var(--primary-blue)] focus:bg-white"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Expires At</span>
                  <input
                    type="datetime-local"
                    value={announcementExpiresAt}
                    onChange={(event) => setAnnouncementExpiresAt(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[color:var(--primary-blue)] focus:bg-white"
                  />
                </label>
              </>
            ) : (
              <>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Start Date & Time</span>
                  <input
                    type="datetime-local"
                    value={eventStartAt}
                    onChange={(event) => setEventStartAt(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[color:var(--primary-blue)] focus:bg-white"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">End Date & Time</span>
                  <input
                    type="datetime-local"
                    value={eventEndAt}
                    onChange={(event) => setEventEndAt(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[color:var(--primary-blue)] focus:bg-white"
                  />
                </label>
              </>
            )}

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setIsRepostOpen(false)}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRepostSubmit}
                disabled={isSubmittingRepost}
                className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmittingRepost ? "Saving..." : "Re-post"}
              </button>
            </div>
          </div>
        </ModalShell>
      ) : null}
    </>
  );
}

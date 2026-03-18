export type DailyReportEntry = {
  taskName: string;
  objective: string;
  target: string;
  nextDayTask: string;
};

export type DailyReportPayload = {
  entries: DailyReportEntry[];
  attachmentUrl: string | null;
  attachmentName: string | null;
  previewAvailability: "full" | "limited" | "unavailable";
  previewNote: string | null;
};

type RawEntry = {
  taskName?: unknown;
  TASKNAME?: unknown;
  task_name?: unknown;
  objective?: unknown;
  OBJECTIVE?: unknown;
  target?: unknown;
  TARGET?: unknown;
  nextDayTask?: unknown;
  NEXTDAYTASK?: unknown;
  next_day_task?: unknown;
};

function normalizeEntry(entry: RawEntry): DailyReportEntry {
  return {
    taskName: String(entry.taskName ?? entry.TASKNAME ?? entry.task_name ?? "").trim(),
    objective: String(entry.objective ?? entry.OBJECTIVE ?? "").trim(),
    target: String(entry.target ?? entry.TARGET ?? "").trim(),
    nextDayTask: String(entry.nextDayTask ?? entry.NEXTDAYTASK ?? entry.next_day_task ?? "").trim(),
  };
}

function isUrl(value: string) {
  return /^https?:\/\//i.test(value);
}

function tryParseJsonValue(value: string): unknown | null {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function parseCompactPayload(value: string): DailyReportPayload {
  const compact = value.slice(4);
  const parts = compact.split("|").filter(Boolean);
  const taskNames = parts.slice(1);

  return {
    entries: taskNames.map((taskName) => ({
      taskName: taskName.trim(),
      objective: "",
      target: "",
      nextDayTask: "",
    })),
    attachmentUrl: null,
    attachmentName: null,
    previewAvailability: "limited",
    previewNote: "This is a legacy compact report. Only task names are available for preview.",
  };
}

function parseJsonPayload(payload: unknown): DailyReportPayload {
  if (Array.isArray(payload)) {
    return {
      entries: payload.map((entry) => normalizeEntry((entry ?? {}) as RawEntry)).filter((entry) => entry.taskName),
      attachmentUrl: null,
      attachmentName: null,
      previewAvailability: "full",
      previewNote: null,
    };
  }

  if (payload && typeof payload === "object") {
    const candidate = payload as {
      entries?: unknown;
      attachmentUrl?: unknown;
      attachmentName?: unknown;
    };
    const entries = Array.isArray(candidate.entries)
      ? candidate.entries.map((entry) => normalizeEntry((entry ?? {}) as RawEntry)).filter((entry) => entry.taskName)
      : [];

    return {
      entries,
      attachmentUrl: typeof candidate.attachmentUrl === "string" && candidate.attachmentUrl.trim() ? candidate.attachmentUrl : null,
      attachmentName: typeof candidate.attachmentName === "string" && candidate.attachmentName.trim() ? candidate.attachmentName : null,
      previewAvailability: entries.length > 0 ? "full" : "unavailable",
      previewNote: entries.length > 0 ? null : "This report file did not contain previewable task entries.",
    };
  }

  return {
    entries: [],
    attachmentUrl: null,
    attachmentName: null,
    previewAvailability: "unavailable",
    previewNote: "This report format could not be parsed for preview.",
  };
}

async function fetchJsonPayloadFromUrl(url: string): Promise<DailyReportPayload> {
  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      entries: [],
      attachmentUrl: null,
      attachmentName: null,
      previewAvailability: "unavailable",
      previewNote: "The report file could not be fetched for preview.",
    };
  }

  const text = await response.text();
  const parsed = tryParseJsonValue(text);
  if (parsed === null) {
    return {
      entries: [],
      attachmentUrl: null,
      attachmentName: null,
      previewAvailability: "unavailable",
      previewNote: "The report file is not valid JSON.",
    };
  }

  return parseJsonPayload(parsed);
}

export async function resolveDailyReportPayload(fileUrl: string | null | undefined): Promise<DailyReportPayload> {
  const source = String(fileUrl ?? "").trim();

  if (!source || source === "SHORT_FALLBACK") {
    return {
      entries: [],
      attachmentUrl: null,
      attachmentName: null,
      previewAvailability: "unavailable",
      previewNote: "No preview file is available for this report.",
    };
  }

  if (source.startsWith("RPT:")) {
    return parseCompactPayload(source);
  }

  const inlinePayload = tryParseJsonValue(source);
  if (inlinePayload !== null) {
    return parseJsonPayload(inlinePayload);
  }

  if (isUrl(source)) {
    try {
      return await fetchJsonPayloadFromUrl(source);
    } catch {
      return {
        entries: [],
        attachmentUrl: null,
        attachmentName: null,
        previewAvailability: "unavailable",
        previewNote: "The report file could not be reached for preview.",
      };
    }
  }

  return {
    entries: [],
    attachmentUrl: null,
    attachmentName: null,
    previewAvailability: "unavailable",
    previewNote: "This legacy report cannot be previewed inline.",
  };
}

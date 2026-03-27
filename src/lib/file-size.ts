const KB = 1024;
const MB = KB * 1024;
const GB = MB * 1024;

export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 KB";

  if (bytes < MB) {
    const kb = bytes / KB;
    return `${kb >= 100 ? kb.toFixed(0) : kb.toFixed(1)} KB`;
  }

  if (bytes < GB) {
    return `${(bytes / MB).toFixed(2)} MB`;
  }

  return `${(bytes / GB).toFixed(2)} GB`;
}

export function parseFileSize(size: string | number | null | undefined): number {
  if (typeof size === "number") {
    return Number.isFinite(size) ? size : 0;
  }

  const value = String(size ?? "").trim();
  if (!value) return 0;

  const numeric = Number.parseFloat(value.replace(/,/g, ""));
  if (!Number.isFinite(numeric)) return 0;

  const upper = value.toUpperCase();

  if (upper.includes("GB")) return numeric * GB;
  if (upper.includes("MB")) return numeric * MB;
  if (upper.includes("KB")) return numeric * KB;
  if (upper.includes("B")) return numeric;

  // Legacy values without a unit were stored as MB-like display numbers.
  return numeric * MB;
}

"use client";

import type { ChangeEvent } from "react";
import { LucideGlyph } from "@/components/ui/lucide-icon-text";
import { formatFileSize } from "@/lib/file-size";

type FileUploadSectionProps = {
  inputId: string;
  files: File[];
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
  title?: string;
  required?: boolean;
  accept?: string;
  helperText?: string;
  emptyText?: string;
  selectedTitle?: string;
};

const fileIcon = (name = "") => {
  const normalized = name.toLowerCase();
  if (normalized.endsWith(".pdf")) return "📕";
  if (normalized.endsWith(".doc") || normalized.endsWith(".docx")) return "📘";
  if (normalized.endsWith(".xls") || normalized.endsWith(".xlsx") || normalized.endsWith(".csv")) return "📗";
  if (normalized.endsWith(".ppt") || normalized.endsWith(".pptx")) return "📙";
  if (normalized.endsWith(".png") || normalized.endsWith(".jpg") || normalized.endsWith(".jpeg") || normalized.endsWith(".webp")) return "🖼️";
  if (normalized.endsWith(".zip") || normalized.endsWith(".rar")) return "🗜️";
  return "📎";
};

export default function FileUploadSection({
  inputId,
  files,
  onFileChange,
  onRemoveFile,
  title = "Upload Files",
  required = false,
  accept,
  helperText = "Large files supported • PDF, DOCX, XLSX, JPG, PNG, PPTX",
  emptyText = "No files selected yet.",
  selectedTitle = "Selected Files",
}: FileUploadSectionProps) {
  const totalSizeBytes = files.reduce((sum, file) => sum + file.size, 0);

  return (
    <div className="rounded-2xl border border-gray-200/70 p-5">
      <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
        {title} {required ? <span className="text-red-500">*</span> : null}
      </p>

      <div className="mt-4 border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-blue-200 transition">
        <input type="file" multiple className="hidden" id={inputId} onChange={onFileChange} accept={accept} />
        <label htmlFor={inputId} className="cursor-pointer">
          <div
            className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "rgba(109, 198, 223, 0.14)" }}
          >
            <LucideGlyph icon="📤" className="text-3xl" />
          </div>
          <p className="text-gray-700 font-semibold mb-2">Click to upload or drag and drop</p>
          <p className="text-sm text-gray-500">{helperText}</p>
        </label>
      </div>

      {files.length ? (
        <div className="mt-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
              {selectedTitle}
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 bg-blue-50 text-blue-700 ring-blue-100">
                {files.length} file(s)
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 bg-blue-50 text-blue-700 ring-blue-100">
                {formatFileSize(totalSizeBytes)}
              </span>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between gap-3 p-3 rounded-2xl border border-gray-200/70 bg-white"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "rgba(44, 75, 155, 0.08)" }}
                  >
                    <LucideGlyph icon={fileIcon(file.name)} className="text-lg" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-gray-900 truncate max-w-[520px]">{file.name}</div>
                    <div className="text-xs text-gray-500">
                      {formatFileSize(file.size)} {file.type ? `• ${file.type}` : ""}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveFile(index)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold border bg-white hover:bg-red-50 transition"
                  style={{ borderColor: "rgba(239,68,68,0.25)", color: "#DC2626" }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 text-sm text-gray-500">{emptyText}</div>
      )}
    </div>
  );
}

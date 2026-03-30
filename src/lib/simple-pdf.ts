"use client";

type PdfFont = "regular" | "bold";

export type PdfTextBlock = {
  text: string;
  font?: PdfFont;
  size?: number;
  gapBefore?: number;
  gapAfter?: number;
  indent?: number;
};

const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const MARGIN_LEFT = 54;
const MARGIN_RIGHT = 54;
const MARGIN_TOP = 56;
const MARGIN_BOTTOM = 56;

function escapePdfText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/\r/g, "")
    .replace(/\n/g, " ");
}

function approximateCharsPerLine(fontSize: number, availableWidth: number) {
  return Math.max(12, Math.floor(availableWidth / (fontSize * 0.52)));
}

function wrapText(value: string, maxChars: number) {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (!normalized) {
    return [""];
  }

  const words = normalized.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  const pushLine = () => {
    if (currentLine) {
      lines.push(currentLine);
      currentLine = "";
    }
  };

  for (const word of words) {
    if (!word) continue;

    if (word.length > maxChars) {
      pushLine();
      for (let index = 0; index < word.length; index += maxChars) {
        lines.push(word.slice(index, index + maxChars));
      }
      continue;
    }

    const candidate = currentLine ? `${currentLine} ${word}` : word;
    if (candidate.length <= maxChars) {
      currentLine = candidate;
      continue;
    }

    pushLine();
    currentLine = word;
  }

  pushLine();
  return lines.length > 0 ? lines : [""];
}

export function createSimplePdfBlob(blocks: PdfTextBlock[]) {
  const pages: string[] = [];
  let pageCommands: string[] = [];
  let cursorY = PAGE_HEIGHT - MARGIN_TOP;

  const pushPage = (force = false) => {
    if (force || pageCommands.length > 0) {
      pages.push(pageCommands.join("\n"));
    }
    pageCommands = [];
    cursorY = PAGE_HEIGHT - MARGIN_TOP;
  };

  const ensurePageSpace = (requiredHeight: number) => {
    if (cursorY - requiredHeight < MARGIN_BOTTOM) {
      pushPage();
    }
  };

  const drawLine = (text: string, font: PdfFont, size: number, indent: number) => {
    const fontRef = font === "bold" ? "F2" : "F1";
    const x = MARGIN_LEFT + indent;
    pageCommands.push("BT");
    pageCommands.push(`/${fontRef} ${size} Tf`);
    pageCommands.push(`1 0 0 1 ${x.toFixed(2)} ${cursorY.toFixed(2)} Tm`);
    pageCommands.push(`(${escapePdfText(text)}) Tj`);
    pageCommands.push("ET");
    cursorY -= Math.max(size + 4, 14);
  };

  for (const block of blocks) {
    const font = block.font ?? "regular";
    const size = block.size ?? 11;
    const indent = block.indent ?? 0;
    const gapBefore = block.gapBefore ?? 0;
    const gapAfter = block.gapAfter ?? 0;
    const availableWidth = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT - indent;
    const wrappedLines = wrapText(block.text, approximateCharsPerLine(size, availableWidth));

    if (gapBefore > 0) {
      ensurePageSpace(gapBefore);
      cursorY -= gapBefore;
    }

    const lineHeight = Math.max(size + 4, 14);
    for (const line of wrappedLines) {
      ensurePageSpace(lineHeight);
      drawLine(line, font, size, indent);
    }

    if (gapAfter > 0) {
      ensurePageSpace(gapAfter);
      cursorY -= gapAfter;
    }
  }

  if (pageCommands.length > 0 || pages.length === 0) {
    pushPage(true);
  }

  const pageRefs = pages.map((_, index) => ({
    pageId: 3 + index * 2,
    contentId: 4 + index * 2,
  }));
  const fontRegularId = 3 + pages.length * 2;
  const fontBoldId = fontRegularId + 1;
  const maxObjectId = fontBoldId;
  const objects = new Map<number, string>();

  objects.set(1, "<< /Type /Catalog /Pages 2 0 R >>");
  objects.set(
    2,
    `<< /Type /Pages /Kids [${pageRefs.map((page) => `${page.pageId} 0 R`).join(" ")}] /Count ${pageRefs.length} >>`
  );

  pageRefs.forEach((page, index) => {
    objects.set(
      page.pageId,
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${page.contentId} 0 R >>`
    );

    const contentStream = pages[index];
    const contentLength = new TextEncoder().encode(contentStream).length;
    objects.set(
      page.contentId,
      `<< /Length ${contentLength} >>\nstream\n${contentStream}\nendstream`
    );
  });

  objects.set(fontRegularId, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  objects.set(fontBoldId, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [0];

  for (let id = 1; id <= maxObjectId; id += 1) {
    offsets[id] = pdf.length;
    pdf += `${id} 0 obj\n${objects.get(id) ?? ""}\nendobj\n`;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${maxObjectId + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let id = 1; id <= maxObjectId; id += 1) {
    pdf += `${String(offsets[id]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${maxObjectId + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new Blob([pdf], { type: "application/pdf" });
}

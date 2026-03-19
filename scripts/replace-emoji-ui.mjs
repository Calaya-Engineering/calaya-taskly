import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const rootDir = process.cwd();
const dashboardsDir = path.join(rootDir, "src", "views", "dashboards");
const importLine = 'import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";\n';
const emojiPattern = /[\u2600-\u27BF\u{1F300}-\u{1FAFF}]/u;
const expressionPattern =
  /(?:\.(?:icon|avatar)\b|\b(?:getFileIcon|getFileTypeIcon|getActivityIcon|getTypeIcon|typeEmoji|fileEmoji|eventIcon|typeIcon|fileIcon|getStatusLabel|getTaskStatusIcon)\s*\()/;

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (fullPath.endsWith(".tsx")) {
      transformFile(fullPath);
    }
  }
}

function ensureImport(sourceText) {
  if (sourceText.includes(importLine)) return sourceText;

  const imports = [...sourceText.matchAll(/^import .*$/gm)];
  if (imports.length === 0) {
    return `${importLine}${sourceText}`;
  }

  const lastImport = imports[imports.length - 1];
  const insertAt = lastImport.index + lastImport[0].length + 1;
  return `${sourceText.slice(0, insertAt)}${importLine}${sourceText.slice(insertAt)}`;
}

function shouldWrapExpression(node, sourceFile) {
  if (!node.expression) return false;
  if (!(ts.isJsxElement(node.parent) || ts.isJsxFragment(node.parent))) return false;

  const expressionText = node.expression.getText(sourceFile).trim();
  if (!expressionText) return false;
  if (expressionText.includes("renderNodeWithIcons(")) return false;
  if (expressionText.includes("LucideGlyph")) return false;
  if (expressionText.includes("getIconByKey(")) return false;
  if (expressionText.includes("<")) return false;

  return emojiPattern.test(expressionText) || expressionPattern.test(expressionText);
}

function collectReplacements(sourceFile, sourceText) {
  const replacements = [];

  function visit(node) {
    if (ts.isJsxText(node)) {
      const rawText = sourceText.slice(node.pos, node.end);
      if (emojiPattern.test(rawText)) {
        replacements.push({
          start: node.pos,
          end: node.end,
          text: `{renderNodeWithIcons(${JSON.stringify(rawText)})}`,
        });
      }
    }

    if (ts.isJsxExpression(node) && shouldWrapExpression(node, sourceFile)) {
      const expressionText = node.expression.getText(sourceFile).trim();
      replacements.push({
        start: node.getStart(sourceFile),
        end: node.getEnd(),
        text: `{renderNodeWithIcons(${expressionText})}`,
      });
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return replacements.sort((a, b) => b.start - a.start);
}

function transformFile(filePath) {
  const sourceText = fs.readFileSync(filePath, "utf8");
  if (!emojiPattern.test(sourceText)) return;

  const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const replacements = collectReplacements(sourceFile, sourceText);
  if (replacements.length === 0) return;

  let nextText = sourceText;
  for (const replacement of replacements) {
    nextText = `${nextText.slice(0, replacement.start)}${replacement.text}${nextText.slice(replacement.end)}`;
  }

  if (nextText !== sourceText) {
    nextText = ensureImport(nextText);
    fs.writeFileSync(filePath, nextText);
  }
}

walk(dashboardsDir);

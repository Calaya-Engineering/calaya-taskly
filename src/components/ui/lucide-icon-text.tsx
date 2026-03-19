"use client";

import type { ReactNode } from "react";
import {
  AlarmClock,
  Archive,
  Bell,
  Bot,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  CircleDot,
  ClipboardList,
  DollarSign,
  Download,
  Eye,
  Factory,
  FileArchive,
  FileImage,
  FileSpreadsheet,
  FileStack,
  FileText,
  Folder,
  Globe2,
  GraduationCap,
  ImageIcon,
  Lightbulb,
  Link2,
  Lock,
  Mail,
  MapPin,
  Megaphone,
  MessageSquare,
  NotebookPen,
  Package,
  Paperclip,
  PartyPopper,
  Pin,
  Printer,
  RefreshCw,
  Search,
  Send,
  Settings,
  Shield,
  Siren,
  Target,
  Trash2,
  TriangleAlert,
  TreePalm,
  TrendingUp,
  Truck,
  Upload,
  User,
  Users,
  Wrench,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const EMOJI_PATTERN = /[\u2600-\u27BF\u{1F300}-\u{1FAFF}]/u;

const LEGACY_ICON_MAP: Record<string, LucideIcon> = {
  "✓": Check,
  "✅": Check,
  "✗": X,
  "✕": X,
  "❌": X,
  "⚠": TriangleAlert,
  "⚠️": TriangleAlert,
  "⏰": AlarmClock,
  "🕐": AlarmClock,
  "📄": FileText,
  "📕": FileText,
  "📘": FileText,
  "📙": FileText,
  "📗": FileSpreadsheet,
  "📊": TrendingUp,
  "📈": TrendingUp,
  "📋": ClipboardList,
  "📅": CalendarDays,
  "📆": CalendarDays,
  "🗓": CalendarDays,
  "📎": Paperclip,
  "📤": Upload,
  "📥": Download,
  "📢": Megaphone,
  "📣": Megaphone,
  "📌": Pin,
  "📍": MapPin,
  "📁": Folder,
  "📑": FileStack,
  "📦": Package,
  "📧": Mail,
  "📨": Send,
  "📭": Mail,
  "📚": GraduationCap,
  "📖": NotebookPen,
  "📽": FileStack,
  "📝": NotebookPen,
  "✏": NotebookPen,
  "✍": NotebookPen,
  "🖼": FileImage,
  "🎥": ImageIcon,
  "🔎": Search,
  "🔔": Bell,
  "🔄": RefreshCw,
  "🔒": Lock,
  "🔗": Link2,
  "🔴": CircleDot,
  "⚙": Settings,
  "⚙️": Settings,
  "⚡": Zap,
  "💬": MessageSquare,
  "💰": DollarSign,
  "💡": Lightbulb,
  "👁": Eye,
  "👁️": Eye,
  "👤": User,
  "👥": Users,
  "👔": BriefcaseBusiness,
  "🤝": Users,
  "🤖": Bot,
  "🗑": Trash2,
  "🗑️": Trash2,
  "🗄": Archive,
  "🗜": FileArchive,
  "🖨": Printer,
  "🧐": Search,
  "🏖": TreePalm,
  "🏢": Building2,
  "🏭": Factory,
  "🌍": Globe2,
  "🌐": Globe2,
  "🎄": Archive,
  "🎉": PartyPopper,
  "🎓": GraduationCap,
  "🎯": Target,
  "🚚": Truck,
  "🚨": Siren,
  "🛠": Wrench,
  "🛡": Shield,
  "🦺": Shield,
  "🟥": CircleDot,
  "🟧": CircleDot,
  "🟨": CircleDot,
  "🟩": CircleDot,
  task: ClipboardList,
  check: Check,
  document: FileText,
  chart: TrendingUp,
  analytics: TrendingUp,
  upload: Upload,
  search: Search,
  bell: Bell,
  edit: NotebookPen,
  email: Mail,
  delete: Trash2,
  link: Link2,
  share: Link2,
  calendar: CalendarDays,
  users: Users,
  training: GraduationCap,
  event: CalendarDays,
  globe: Globe2,
  briefcase: BriefcaseBusiness,
  target: Target,
  building: Building2,
  user: User,
  lock: Lock,
  money: DollarSign,
  megaphone: Megaphone,
  warning: TriangleAlert,
  clock: AlarmClock,
  settings: Settings,
  download: Download,
  attachment: Paperclip,
  archive: Archive,
  image: ImageIcon,
  folder: Folder,
  info: TriangleAlert,
  message: MessageSquare,
  refresh: RefreshCw,
  lightbulb: Lightbulb,
  alert: TriangleAlert,
  "file-pdf": FileText,
  "file-doc": FileText,
  "file-xls": FileSpreadsheet,
  "file-ppt": FileStack,
  "file-zip": FileArchive,
  "file-img": FileImage,
  job: Folder,
  activity: TrendingUp,
  navigation: MapPin,
};

function normalizeLegacyIcon(value: string) {
  return value.replace(/\uFE0F/g, "");
}

function resolveLegacyIcon(icon?: string | null) {
  if (!icon) return null;
  const normalized = normalizeLegacyIcon(icon);
  return LEGACY_ICON_MAP[normalized] || LEGACY_ICON_MAP[icon] || null;
}

export function LucideGlyph({
  icon,
  className,
  strokeWidth = 2,
}: {
  icon?: string | null;
  className?: string;
  strokeWidth?: number;
}) {
  const Icon = resolveLegacyIcon(icon);
  if (!Icon) return null;
  return <Icon aria-hidden className={cn("inline-block h-[1em] w-[1em] shrink-0 align-[-0.125em]", className)} strokeWidth={strokeWidth} />;
}

export function renderNodeWithIcons(node: ReactNode, iconClassName = "h-[1em] w-[1em] shrink-0"): ReactNode {
  if (node == null || typeof node === "boolean") return node;
  if (typeof node === "number") return node;

  if (typeof node === "string") {
    const characters = Array.from(node);
    if (!characters.some((character) => resolveLegacyIcon(character))) {
      return node;
    }

    return characters.map((character, index) => {
      const normalized = normalizeLegacyIcon(character);
      if (!EMOJI_PATTERN.test(normalized)) {
        return <span key={`text-${index}`}>{character}</span>;
      }

      const Icon = resolveLegacyIcon(normalized);
      if (!Icon) {
        return <span key={`text-${index}`}>{character}</span>;
      }

      return <LucideGlyph key={`icon-${index}`} icon={normalized} className={iconClassName} />;
    });
  }

  if (Array.isArray(node)) {
    return node.map((child, index) => <span key={`node-${index}`}>{renderNodeWithIcons(child, iconClassName)}</span>);
  }

  return node;
}

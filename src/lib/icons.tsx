"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  Archive01Icon,
  ArrowDown01Icon,
  ArrowRight01Icon,
  ArrowUp01Icon,
  Attachment01Icon,
  Book01Icon,
  Bookmark01Icon,
  Building06Icon,
  BulbIcon,
  Calendar01Icon,
  Call02Icon,
  Cancel01Icon,
  CancelCircleIcon,
  ChartHistogramIcon,
  CheckmarkBadge01Icon,
  CheckmarkCircle02Icon,
  DashboardSquare02Icon,
  Delete02Icon,
  Download01Icon,
  File02Icon,
  FileUploadIcon,
  FilterIcon as FilterIconSvg,
  Folder01Icon,
  Globe02Icon,
  Image01Icon,
  InformationCircleIcon,
  Link01Icon,
  Location01Icon,
  Mail01Icon,
  Megaphone01Icon,
  Menu01Icon,
  Message01Icon,
  MoneyBag01Icon,
  Notification02Icon,
  PencilEdit02Icon,
  Refresh01Icon,
  Search01Icon,
  Settings01Icon,
  Share01Icon,
  SquareLock02Icon,
  Target01Icon,
  TaskDone01Icon,
  Time04Icon,
  User02Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";

const SIZE = 20;

const withIcon = (IconObj) => (props) => (
  <HugeiconsIcon icon={IconObj} size={SIZE} className="w-5 h-5 shrink-0" {...props} />
);

// Layout / navigation
export const DashboardIcon = withIcon(DashboardSquare02Icon);
export const HomeIcon = withIcon(DashboardSquare02Icon);
export const TaskIcon = withIcon(TaskDone01Icon);
export const DocumentIcon = withIcon(File02Icon);
export const TenderIcon = withIcon(File02Icon);
export const FileIcon = withIcon(File02Icon);
export const ReportIcon = withIcon(ChartHistogramIcon);
export const BarChartIcon = withIcon(ChartHistogramIcon);
export const ChartIcon = withIcon(ChartHistogramIcon);
export const AnalyticsIcon = withIcon(ChartHistogramIcon);
export const CalendarIcon = withIcon(Calendar01Icon);
export const CalendarTodayIcon = withIcon(Calendar01Icon);
export const AnnouncementIcon = withIcon(Megaphone01Icon);
export const MegaphoneIcon = withIcon(Megaphone01Icon);
export const ApprovalIcon = withIcon(CheckmarkCircle02Icon);
export const CheckCircleIcon = withIcon(CheckmarkCircle02Icon);
export const AlertIcon = withIcon(CancelCircleIcon);
export const AlertTriangleIcon = withIcon(CancelCircleIcon);
export const WarningIcon = withIcon(CancelCircleIcon);
export const EmergencyIcon = withIcon(CancelCircleIcon);
export const HazardIcon = withIcon(CancelCircleIcon);
export const BellIcon = withIcon(Notification02Icon);
export const NotificationPreferencesIcon = withIcon(Notification02Icon);
export const UserIcon = withIcon(User02Icon);
export const UsersIcon = withIcon(UserGroupIcon);
export const TeamIcon = withIcon(UserGroupIcon);
export const BuildingIcon = withIcon(Building06Icon);
export const DepartmentIcon = withIcon(Building06Icon);
export const HierarchyIcon = withIcon(Building06Icon);

// Actions / utilities
export const PlusIcon = withIcon(Add01Icon);
export const AddIcon = withIcon(Add01Icon);
export const SearchIcon = withIcon(Search01Icon);
export const FilterIcon = withIcon(FilterIconSvg);
export const DownloadIcon = withIcon(Download01Icon);
export const UploadIcon = withIcon(FileUploadIcon);
export const FileUploadIconComponent = withIcon(FileUploadIcon);
export const DeleteIcon = withIcon(Delete02Icon);
export const EditIcon = withIcon(PencilEdit02Icon);
export const SaveIcon = withIcon(CheckmarkCircle02Icon);
export const CancelIcon = withIcon(Cancel01Icon);
export const ChevronRightIcon = withIcon(ArrowRight01Icon);
export const ChevronDownIcon = withIcon(ArrowDown01Icon);
export const ChevronUpIcon = withIcon(ArrowUp01Icon);
export const EmailIcon = withIcon(Mail01Icon);
export const PhoneIcon = withIcon(Call02Icon);
export const SettingsIcon = withIcon(Settings01Icon);
export const LocationIcon = withIcon(Location01Icon);
export const BadgeIcon = withIcon(CheckmarkBadge01Icon);

// Misc for emoji replacement
export const MoneyIcon = withIcon(MoneyBag01Icon);
export const LockIcon = withIcon(SquareLock02Icon);
export const ClockIcon = withIcon(Time04Icon);

// Menu toggle (for Layout header)
export const MenuIcon = withIcon(Menu01Icon);
export const CloseMenuIcon = withIcon(Cancel01Icon);

// Activity / trending
export const ActivityIcon = withIcon(ChartHistogramIcon);

// Emoji replacements (Hugeicons)
export const LinkIcon = withIcon(Link01Icon);
export const ShareIcon = withIcon(Share01Icon);
export const RefreshIcon = withIcon(Refresh01Icon);
export const TargetIcon = withIcon(Target01Icon);
export const ImageIcon = withIcon(Image01Icon);
export const ArchiveIcon = withIcon(Archive01Icon);
export const AttachmentIcon = withIcon(Attachment01Icon);
export const GlobeIcon = withIcon(Globe02Icon);
export const InfoIcon = withIcon(InformationCircleIcon);
export const LightbulbIcon = withIcon(BulbIcon);
export const MessageIcon = withIcon(Message01Icon);
export const FolderIcon = withIcon(Folder01Icon);
export const BookmarkIcon = withIcon(Bookmark01Icon);
export const BookIcon = withIcon(Book01Icon);

/** Returns icon component for string key (replaces emoji keys). Use: {getIconByKey("task")} or getIconByKey(iconKey, "w-6 h-6") */
const ICON_MAP = {
  task: TaskIcon,
  check: CheckCircleIcon,
  document: DocumentIcon,
  chart: ChartIcon,
  upload: FileUploadIconComponent,
  search: SearchIcon,
  bell: BellIcon,
  edit: EditIcon,
  email: EmailIcon,
  delete: DeleteIcon,
  link: LinkIcon,
  share: ShareIcon,
  calendar: CalendarIcon,
  users: UsersIcon,
  training: BookIcon,
  event: CalendarIcon,
  globe: GlobeIcon,
  briefcase: BuildingIcon,
  target: TargetIcon,
  building: BuildingIcon,
  user: UserIcon,
  lock: LockIcon,
  money: MoneyIcon,
  megaphone: MegaphoneIcon,
  warning: WarningIcon,
  clock: ClockIcon,
  settings: SettingsIcon,
  download: DownloadIcon,
  attachment: AttachmentIcon,
  archive: ArchiveIcon,
  image: ImageIcon,
  folder: FolderIcon,
  info: InfoIcon,
  message: MessageIcon,
  refresh: RefreshIcon,
  lightbulb: LightbulbIcon,
  alert: AlertIcon,
  "file-pdf": FileIcon,
  "file-doc": FileIcon,
  "file-xls": FileIcon,
  "file-ppt": FileIcon,
  "file-zip": ArchiveIcon,
  "file-img": ImageIcon,
  job: FolderIcon,
  activity: ActivityIcon,
  navigation: LocationIcon,
};
export function getIconByKey(key, className = "w-5 h-5 shrink-0") {
  if (!key || typeof key !== "string") return null;
  const Icon = ICON_MAP[key] || DocumentIcon;
  return <Icon className={className} />;
}

// Document type mapping (returns icon component for getDocIcon usage)
const DocReportIcon = withIcon(ChartHistogramIcon);
const DocListIcon = withIcon(TaskDone01Icon);
const DocDefaultIcon = withIcon(File02Icon);
const DocFinancialIcon = withIcon(MoneyBag01Icon);
const DocSecurityIcon = withIcon(SquareLock02Icon);

/** Returns an icon component for document type. Usage: {getDocIconComponent(type)} */
export const getDocIconComponent = (type) => {
  const map = {
    Report: DocReportIcon,
    Checklist: DocListIcon,
    Procedure: DocListIcon,
    Manual: DocDefaultIcon,
    Log: DocListIcon,
    Policy: DocDefaultIcon,
    Financial: DocFinancialIcon,
    Certificate: DocDefaultIcon,
    Drawing: DocDefaultIcon,
    Map: DocDefaultIcon,
    Security: DocSecurityIcon,
  };
  const Icon = map[type] || DocDefaultIcon;
  return <Icon />;
};

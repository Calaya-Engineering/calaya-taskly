(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/calaya-taskly/src/lib/toast.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toast",
    ()=>toast
]);
/**
 * Toast notifications via Sonner.
 * Use instead of alert() for consistent UX.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
const toast = {
    success: (message)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(message),
    error: (message)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(message),
    warning: (message)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].warning(message),
    info: (message)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info(message),
    promise: (promise, data)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].promise(promise, data),
    loading: (message)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].loading(message),
    dismiss: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].dismiss(id),
    /** Generic toast (default style) */ message: (message)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])(message)
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/calaya-taskly/src/lib/icons.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActivityIcon",
    ()=>ActivityIcon,
    "AddIcon",
    ()=>AddIcon,
    "AlertIcon",
    ()=>AlertIcon,
    "AlertTriangleIcon",
    ()=>AlertTriangleIcon,
    "AnalyticsIcon",
    ()=>AnalyticsIcon,
    "AnnouncementIcon",
    ()=>AnnouncementIcon,
    "ApprovalIcon",
    ()=>ApprovalIcon,
    "ArchiveIcon",
    ()=>ArchiveIcon,
    "AttachmentIcon",
    ()=>AttachmentIcon,
    "BadgeIcon",
    ()=>BadgeIcon,
    "BarChartIcon",
    ()=>BarChartIcon,
    "BellIcon",
    ()=>BellIcon,
    "BookIcon",
    ()=>BookIcon,
    "BookmarkIcon",
    ()=>BookmarkIcon,
    "BuildingIcon",
    ()=>BuildingIcon,
    "CalendarIcon",
    ()=>CalendarIcon,
    "CalendarTodayIcon",
    ()=>CalendarTodayIcon,
    "CancelIcon",
    ()=>CancelIcon,
    "ChartIcon",
    ()=>ChartIcon,
    "CheckCircleIcon",
    ()=>CheckCircleIcon,
    "ChevronDownIcon",
    ()=>ChevronDownIcon,
    "ChevronRightIcon",
    ()=>ChevronRightIcon,
    "ChevronUpIcon",
    ()=>ChevronUpIcon,
    "ClockIcon",
    ()=>ClockIcon,
    "CloseMenuIcon",
    ()=>CloseMenuIcon,
    "DashboardIcon",
    ()=>DashboardIcon,
    "DeleteIcon",
    ()=>DeleteIcon,
    "DepartmentIcon",
    ()=>DepartmentIcon,
    "DocumentIcon",
    ()=>DocumentIcon,
    "DownloadIcon",
    ()=>DownloadIcon,
    "EditIcon",
    ()=>EditIcon,
    "EmailIcon",
    ()=>EmailIcon,
    "EmergencyIcon",
    ()=>EmergencyIcon,
    "FileIcon",
    ()=>FileIcon,
    "FileUploadIconComponent",
    ()=>FileUploadIconComponent,
    "FilterIcon",
    ()=>FilterIcon,
    "FolderIcon",
    ()=>FolderIcon,
    "GlobeIcon",
    ()=>GlobeIcon,
    "HazardIcon",
    ()=>HazardIcon,
    "HierarchyIcon",
    ()=>HierarchyIcon,
    "HomeIcon",
    ()=>HomeIcon,
    "ImageIcon",
    ()=>ImageIcon,
    "InfoIcon",
    ()=>InfoIcon,
    "LightbulbIcon",
    ()=>LightbulbIcon,
    "LinkIcon",
    ()=>LinkIcon,
    "LocationIcon",
    ()=>LocationIcon,
    "LockIcon",
    ()=>LockIcon,
    "MegaphoneIcon",
    ()=>MegaphoneIcon,
    "MenuIcon",
    ()=>MenuIcon,
    "MessageIcon",
    ()=>MessageIcon,
    "MoneyIcon",
    ()=>MoneyIcon,
    "NotificationPreferencesIcon",
    ()=>NotificationPreferencesIcon,
    "PhoneIcon",
    ()=>PhoneIcon,
    "PlusIcon",
    ()=>PlusIcon,
    "RefreshIcon",
    ()=>RefreshIcon,
    "ReportIcon",
    ()=>ReportIcon,
    "SaveIcon",
    ()=>SaveIcon,
    "SearchIcon",
    ()=>SearchIcon,
    "SettingsIcon",
    ()=>SettingsIcon,
    "ShareIcon",
    ()=>ShareIcon,
    "TargetIcon",
    ()=>TargetIcon,
    "TaskIcon",
    ()=>TaskIcon,
    "TeamIcon",
    ()=>TeamIcon,
    "TenderIcon",
    ()=>TenderIcon,
    "UploadIcon",
    ()=>UploadIcon,
    "UserIcon",
    ()=>UserIcon,
    "UsersIcon",
    ()=>UsersIcon,
    "WarningIcon",
    ()=>WarningIcon,
    "getDocIconComponent",
    ()=>getDocIconComponent,
    "getIconByKey",
    ()=>getIconByKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/react/dist/esm/HugeiconsIcon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Add01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Add01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Add01Icon.js [app-client] (ecmascript) <export default as Add01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Archive01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Archive01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Archive01Icon.js [app-client] (ecmascript) <export default as Archive01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ArrowDown01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/ArrowDown01Icon.js [app-client] (ecmascript) <export default as ArrowDown01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ArrowRight01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/ArrowRight01Icon.js [app-client] (ecmascript) <export default as ArrowRight01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ArrowUp01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/ArrowUp01Icon.js [app-client] (ecmascript) <export default as ArrowUp01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Attachment01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Attachment01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Attachment01Icon.js [app-client] (ecmascript) <export default as Attachment01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Book01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Book01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Book01Icon.js [app-client] (ecmascript) <export default as Book01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Bookmark01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Bookmark01Icon.js [app-client] (ecmascript) <export default as Bookmark01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Building06Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building06Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Building06Icon.js [app-client] (ecmascript) <export default as Building06Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$BulbIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BulbIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/BulbIcon.js [app-client] (ecmascript) <export default as BulbIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Calendar01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Calendar01Icon.js [app-client] (ecmascript) <export default as Calendar01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Call02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Call02Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Call02Icon.js [app-client] (ecmascript) <export default as Call02Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Cancel01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cancel01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Cancel01Icon.js [app-client] (ecmascript) <export default as Cancel01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CancelCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CancelCircleIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/CancelCircleIcon.js [app-client] (ecmascript) <export default as CancelCircleIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ChartHistogramIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartHistogramIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/ChartHistogramIcon.js [app-client] (ecmascript) <export default as ChartHistogramIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CheckmarkBadge01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckmarkBadge01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/CheckmarkBadge01Icon.js [app-client] (ecmascript) <export default as CheckmarkBadge01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CheckmarkCircle02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckmarkCircle02Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/CheckmarkCircle02Icon.js [app-client] (ecmascript) <export default as CheckmarkCircle02Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$DashboardSquare02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DashboardSquare02Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/DashboardSquare02Icon.js [app-client] (ecmascript) <export default as DashboardSquare02Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Delete02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Delete02Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Delete02Icon.js [app-client] (ecmascript) <export default as Delete02Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Download01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Download01Icon.js [app-client] (ecmascript) <export default as Download01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$File02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File02Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/File02Icon.js [app-client] (ecmascript) <export default as File02Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$FileUploadIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileUploadIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/FileUploadIcon.js [app-client] (ecmascript) <export default as FileUploadIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$FilterIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FilterIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/FilterIcon.js [app-client] (ecmascript) <export default as FilterIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Folder01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Folder01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Folder01Icon.js [app-client] (ecmascript) <export default as Folder01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Globe02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe02Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Globe02Icon.js [app-client] (ecmascript) <export default as Globe02Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Image01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Image01Icon.js [app-client] (ecmascript) <export default as Image01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$InformationCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InformationCircleIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/InformationCircleIcon.js [app-client] (ecmascript) <export default as InformationCircleIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Link01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Link01Icon.js [app-client] (ecmascript) <export default as Link01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Location01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Location01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Location01Icon.js [app-client] (ecmascript) <export default as Location01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Mail01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Mail01Icon.js [app-client] (ecmascript) <export default as Mail01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Megaphone01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Megaphone01Icon.js [app-client] (ecmascript) <export default as Megaphone01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Menu01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Menu01Icon.js [app-client] (ecmascript) <export default as Menu01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Message01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Message01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Message01Icon.js [app-client] (ecmascript) <export default as Message01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$MoneyBag01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoneyBag01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/MoneyBag01Icon.js [app-client] (ecmascript) <export default as MoneyBag01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Notification02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Notification02Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Notification02Icon.js [app-client] (ecmascript) <export default as Notification02Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$PencilEdit02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PencilEdit02Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/PencilEdit02Icon.js [app-client] (ecmascript) <export default as PencilEdit02Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Refresh01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Refresh01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Refresh01Icon.js [app-client] (ecmascript) <export default as Refresh01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Search01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Search01Icon.js [app-client] (ecmascript) <export default as Search01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Settings01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Settings01Icon.js [app-client] (ecmascript) <export default as Settings01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Share01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Share01Icon.js [app-client] (ecmascript) <export default as Share01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$SquareLock02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SquareLock02Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/SquareLock02Icon.js [app-client] (ecmascript) <export default as SquareLock02Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Target01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Target01Icon.js [app-client] (ecmascript) <export default as Target01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$TaskDone01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TaskDone01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/TaskDone01Icon.js [app-client] (ecmascript) <export default as TaskDone01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Time04Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Time04Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Time04Icon.js [app-client] (ecmascript) <export default as Time04Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$User02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User02Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/User02Icon.js [app-client] (ecmascript) <export default as User02Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$UserGroupIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserGroupIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/UserGroupIcon.js [app-client] (ecmascript) <export default as UserGroupIcon>");
"use client";
;
;
;
const SIZE = 20;
const withIcon = (IconObj)=>(props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HugeiconsIcon"], {
            icon: IconObj,
            size: SIZE,
            className: "w-5 h-5 shrink-0",
            ...props
        }, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/lib/icons.jsx",
            lineNumber: 56,
            columnNumber: 3
        }, ("TURBOPACK compile-time value", void 0));
const DashboardIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$DashboardSquare02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DashboardSquare02Icon$3e$__["DashboardSquare02Icon"]);
_c = DashboardIcon;
const HomeIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$DashboardSquare02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DashboardSquare02Icon$3e$__["DashboardSquare02Icon"]);
_c1 = HomeIcon;
const TaskIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$TaskDone01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TaskDone01Icon$3e$__["TaskDone01Icon"]);
_c2 = TaskIcon;
const DocumentIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$File02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File02Icon$3e$__["File02Icon"]);
_c3 = DocumentIcon;
const TenderIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$File02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File02Icon$3e$__["File02Icon"]);
_c4 = TenderIcon;
const FileIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$File02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File02Icon$3e$__["File02Icon"]);
_c5 = FileIcon;
const ReportIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ChartHistogramIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartHistogramIcon$3e$__["ChartHistogramIcon"]);
_c6 = ReportIcon;
const BarChartIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ChartHistogramIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartHistogramIcon$3e$__["ChartHistogramIcon"]);
_c7 = BarChartIcon;
const ChartIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ChartHistogramIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartHistogramIcon$3e$__["ChartHistogramIcon"]);
_c8 = ChartIcon;
const AnalyticsIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ChartHistogramIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartHistogramIcon$3e$__["ChartHistogramIcon"]);
_c9 = AnalyticsIcon;
const CalendarIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Calendar01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar01Icon$3e$__["Calendar01Icon"]);
_c10 = CalendarIcon;
const CalendarTodayIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Calendar01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar01Icon$3e$__["Calendar01Icon"]);
_c11 = CalendarTodayIcon;
const AnnouncementIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Megaphone01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone01Icon$3e$__["Megaphone01Icon"]);
_c12 = AnnouncementIcon;
const MegaphoneIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Megaphone01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone01Icon$3e$__["Megaphone01Icon"]);
_c13 = MegaphoneIcon;
const ApprovalIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CheckmarkCircle02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckmarkCircle02Icon$3e$__["CheckmarkCircle02Icon"]);
_c14 = ApprovalIcon;
const CheckCircleIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CheckmarkCircle02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckmarkCircle02Icon$3e$__["CheckmarkCircle02Icon"]);
_c15 = CheckCircleIcon;
const AlertIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CancelCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CancelCircleIcon$3e$__["CancelCircleIcon"]);
_c16 = AlertIcon;
const AlertTriangleIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CancelCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CancelCircleIcon$3e$__["CancelCircleIcon"]);
_c17 = AlertTriangleIcon;
const WarningIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CancelCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CancelCircleIcon$3e$__["CancelCircleIcon"]);
_c18 = WarningIcon;
const EmergencyIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CancelCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CancelCircleIcon$3e$__["CancelCircleIcon"]);
_c19 = EmergencyIcon;
const HazardIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CancelCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CancelCircleIcon$3e$__["CancelCircleIcon"]);
_c20 = HazardIcon;
const BellIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Notification02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Notification02Icon$3e$__["Notification02Icon"]);
_c21 = BellIcon;
const NotificationPreferencesIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Notification02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Notification02Icon$3e$__["Notification02Icon"]);
_c22 = NotificationPreferencesIcon;
const UserIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$User02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User02Icon$3e$__["User02Icon"]);
_c23 = UserIcon;
const UsersIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$UserGroupIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserGroupIcon$3e$__["UserGroupIcon"]);
_c24 = UsersIcon;
const TeamIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$UserGroupIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserGroupIcon$3e$__["UserGroupIcon"]);
_c25 = TeamIcon;
const BuildingIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Building06Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building06Icon$3e$__["Building06Icon"]);
_c26 = BuildingIcon;
const DepartmentIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Building06Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building06Icon$3e$__["Building06Icon"]);
_c27 = DepartmentIcon;
const HierarchyIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Building06Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building06Icon$3e$__["Building06Icon"]);
_c28 = HierarchyIcon;
const PlusIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Add01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Add01Icon$3e$__["Add01Icon"]);
_c29 = PlusIcon;
const AddIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Add01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Add01Icon$3e$__["Add01Icon"]);
_c30 = AddIcon;
const SearchIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Search01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search01Icon$3e$__["Search01Icon"]);
_c31 = SearchIcon;
const FilterIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$FilterIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FilterIcon$3e$__["FilterIcon"]);
_c32 = FilterIcon;
const DownloadIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Download01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download01Icon$3e$__["Download01Icon"]);
_c33 = DownloadIcon;
const UploadIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$FileUploadIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileUploadIcon$3e$__["FileUploadIcon"]);
_c34 = UploadIcon;
const FileUploadIconComponent = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$FileUploadIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileUploadIcon$3e$__["FileUploadIcon"]);
_c35 = FileUploadIconComponent;
const DeleteIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Delete02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Delete02Icon$3e$__["Delete02Icon"]);
_c36 = DeleteIcon;
const EditIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$PencilEdit02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PencilEdit02Icon$3e$__["PencilEdit02Icon"]);
_c37 = EditIcon;
const SaveIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CheckmarkCircle02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckmarkCircle02Icon$3e$__["CheckmarkCircle02Icon"]);
_c38 = SaveIcon;
const CancelIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Cancel01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cancel01Icon$3e$__["Cancel01Icon"]);
_c39 = CancelIcon;
const ChevronRightIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ArrowRight01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight01Icon$3e$__["ArrowRight01Icon"]);
_c40 = ChevronRightIcon;
const ChevronDownIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ArrowDown01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown01Icon$3e$__["ArrowDown01Icon"]);
_c41 = ChevronDownIcon;
const ChevronUpIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ArrowUp01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp01Icon$3e$__["ArrowUp01Icon"]);
_c42 = ChevronUpIcon;
const EmailIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Mail01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail01Icon$3e$__["Mail01Icon"]);
_c43 = EmailIcon;
const PhoneIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Call02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Call02Icon$3e$__["Call02Icon"]);
_c44 = PhoneIcon;
const SettingsIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Settings01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings01Icon$3e$__["Settings01Icon"]);
_c45 = SettingsIcon;
const LocationIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Location01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Location01Icon$3e$__["Location01Icon"]);
_c46 = LocationIcon;
const BadgeIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CheckmarkBadge01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckmarkBadge01Icon$3e$__["CheckmarkBadge01Icon"]);
_c47 = BadgeIcon;
const MoneyIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$MoneyBag01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoneyBag01Icon$3e$__["MoneyBag01Icon"]);
_c48 = MoneyIcon;
const LockIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$SquareLock02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SquareLock02Icon$3e$__["SquareLock02Icon"]);
_c49 = LockIcon;
const ClockIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Time04Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Time04Icon$3e$__["Time04Icon"]);
_c50 = ClockIcon;
const MenuIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Menu01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu01Icon$3e$__["Menu01Icon"]);
_c51 = MenuIcon;
const CloseMenuIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Cancel01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cancel01Icon$3e$__["Cancel01Icon"]);
_c52 = CloseMenuIcon;
const ActivityIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ChartHistogramIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartHistogramIcon$3e$__["ChartHistogramIcon"]);
_c53 = ActivityIcon;
const LinkIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Link01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link01Icon$3e$__["Link01Icon"]);
_c54 = LinkIcon;
const ShareIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Share01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share01Icon$3e$__["Share01Icon"]);
_c55 = ShareIcon;
const RefreshIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Refresh01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Refresh01Icon$3e$__["Refresh01Icon"]);
_c56 = RefreshIcon;
const TargetIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Target01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target01Icon$3e$__["Target01Icon"]);
_c57 = TargetIcon;
const ImageIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Image01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image01Icon$3e$__["Image01Icon"]);
_c58 = ImageIcon;
const ArchiveIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Archive01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Archive01Icon$3e$__["Archive01Icon"]);
_c59 = ArchiveIcon;
const AttachmentIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Attachment01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Attachment01Icon$3e$__["Attachment01Icon"]);
_c60 = AttachmentIcon;
const GlobeIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Globe02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe02Icon$3e$__["Globe02Icon"]);
_c61 = GlobeIcon;
const InfoIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$InformationCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InformationCircleIcon$3e$__["InformationCircleIcon"]);
_c62 = InfoIcon;
const LightbulbIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$BulbIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BulbIcon$3e$__["BulbIcon"]);
_c63 = LightbulbIcon;
const MessageIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Message01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Message01Icon$3e$__["Message01Icon"]);
_c64 = MessageIcon;
const FolderIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Folder01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Folder01Icon$3e$__["Folder01Icon"]);
_c65 = FolderIcon;
const BookmarkIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Bookmark01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark01Icon$3e$__["Bookmark01Icon"]);
_c66 = BookmarkIcon;
const BookIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Book01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Book01Icon$3e$__["Book01Icon"]);
_c67 = BookIcon;
/** Returns icon component for string key (replaces emoji keys). Use: {getIconByKey("task")} or getIconByKey(iconKey, "w-6 h-6") */ const ICON_MAP = {
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
    navigation: LocationIcon
};
function getIconByKey(key, className = "w-5 h-5 shrink-0") {
    if (!key || typeof key !== "string") return null;
    const Icon = ICON_MAP[key] || DocumentIcon;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
        className: className
    }, void 0, false, {
        fileName: "[project]/Desktop/calaya-taskly/src/lib/icons.jsx",
        lineNumber: 191,
        columnNumber: 10
    }, this);
}
// Document type mapping (returns icon component for getDocIcon usage)
const DocReportIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ChartHistogramIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartHistogramIcon$3e$__["ChartHistogramIcon"]);
_c68 = DocReportIcon;
const DocListIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$TaskDone01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TaskDone01Icon$3e$__["TaskDone01Icon"]);
_c69 = DocListIcon;
const DocDefaultIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$File02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File02Icon$3e$__["File02Icon"]);
_c70 = DocDefaultIcon;
const DocFinancialIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$MoneyBag01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoneyBag01Icon$3e$__["MoneyBag01Icon"]);
_c71 = DocFinancialIcon;
const DocSecurityIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$SquareLock02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SquareLock02Icon$3e$__["SquareLock02Icon"]);
_c72 = DocSecurityIcon;
const getDocIconComponent = (type)=>{
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
        Security: DocSecurityIcon
    };
    const Icon = map[type] || DocDefaultIcon;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {}, void 0, false, {
        fileName: "[project]/Desktop/calaya-taskly/src/lib/icons.jsx",
        lineNumber: 217,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14, _c15, _c16, _c17, _c18, _c19, _c20, _c21, _c22, _c23, _c24, _c25, _c26, _c27, _c28, _c29, _c30, _c31, _c32, _c33, _c34, _c35, _c36, _c37, _c38, _c39, _c40, _c41, _c42, _c43, _c44, _c45, _c46, _c47, _c48, _c49, _c50, _c51, _c52, _c53, _c54, _c55, _c56, _c57, _c58, _c59, _c60, _c61, _c62, _c63, _c64, _c65, _c66, _c67, _c68, _c69, _c70, _c71, _c72;
__turbopack_context__.k.register(_c, "DashboardIcon");
__turbopack_context__.k.register(_c1, "HomeIcon");
__turbopack_context__.k.register(_c2, "TaskIcon");
__turbopack_context__.k.register(_c3, "DocumentIcon");
__turbopack_context__.k.register(_c4, "TenderIcon");
__turbopack_context__.k.register(_c5, "FileIcon");
__turbopack_context__.k.register(_c6, "ReportIcon");
__turbopack_context__.k.register(_c7, "BarChartIcon");
__turbopack_context__.k.register(_c8, "ChartIcon");
__turbopack_context__.k.register(_c9, "AnalyticsIcon");
__turbopack_context__.k.register(_c10, "CalendarIcon");
__turbopack_context__.k.register(_c11, "CalendarTodayIcon");
__turbopack_context__.k.register(_c12, "AnnouncementIcon");
__turbopack_context__.k.register(_c13, "MegaphoneIcon");
__turbopack_context__.k.register(_c14, "ApprovalIcon");
__turbopack_context__.k.register(_c15, "CheckCircleIcon");
__turbopack_context__.k.register(_c16, "AlertIcon");
__turbopack_context__.k.register(_c17, "AlertTriangleIcon");
__turbopack_context__.k.register(_c18, "WarningIcon");
__turbopack_context__.k.register(_c19, "EmergencyIcon");
__turbopack_context__.k.register(_c20, "HazardIcon");
__turbopack_context__.k.register(_c21, "BellIcon");
__turbopack_context__.k.register(_c22, "NotificationPreferencesIcon");
__turbopack_context__.k.register(_c23, "UserIcon");
__turbopack_context__.k.register(_c24, "UsersIcon");
__turbopack_context__.k.register(_c25, "TeamIcon");
__turbopack_context__.k.register(_c26, "BuildingIcon");
__turbopack_context__.k.register(_c27, "DepartmentIcon");
__turbopack_context__.k.register(_c28, "HierarchyIcon");
__turbopack_context__.k.register(_c29, "PlusIcon");
__turbopack_context__.k.register(_c30, "AddIcon");
__turbopack_context__.k.register(_c31, "SearchIcon");
__turbopack_context__.k.register(_c32, "FilterIcon");
__turbopack_context__.k.register(_c33, "DownloadIcon");
__turbopack_context__.k.register(_c34, "UploadIcon");
__turbopack_context__.k.register(_c35, "FileUploadIconComponent");
__turbopack_context__.k.register(_c36, "DeleteIcon");
__turbopack_context__.k.register(_c37, "EditIcon");
__turbopack_context__.k.register(_c38, "SaveIcon");
__turbopack_context__.k.register(_c39, "CancelIcon");
__turbopack_context__.k.register(_c40, "ChevronRightIcon");
__turbopack_context__.k.register(_c41, "ChevronDownIcon");
__turbopack_context__.k.register(_c42, "ChevronUpIcon");
__turbopack_context__.k.register(_c43, "EmailIcon");
__turbopack_context__.k.register(_c44, "PhoneIcon");
__turbopack_context__.k.register(_c45, "SettingsIcon");
__turbopack_context__.k.register(_c46, "LocationIcon");
__turbopack_context__.k.register(_c47, "BadgeIcon");
__turbopack_context__.k.register(_c48, "MoneyIcon");
__turbopack_context__.k.register(_c49, "LockIcon");
__turbopack_context__.k.register(_c50, "ClockIcon");
__turbopack_context__.k.register(_c51, "MenuIcon");
__turbopack_context__.k.register(_c52, "CloseMenuIcon");
__turbopack_context__.k.register(_c53, "ActivityIcon");
__turbopack_context__.k.register(_c54, "LinkIcon");
__turbopack_context__.k.register(_c55, "ShareIcon");
__turbopack_context__.k.register(_c56, "RefreshIcon");
__turbopack_context__.k.register(_c57, "TargetIcon");
__turbopack_context__.k.register(_c58, "ImageIcon");
__turbopack_context__.k.register(_c59, "ArchiveIcon");
__turbopack_context__.k.register(_c60, "AttachmentIcon");
__turbopack_context__.k.register(_c61, "GlobeIcon");
__turbopack_context__.k.register(_c62, "InfoIcon");
__turbopack_context__.k.register(_c63, "LightbulbIcon");
__turbopack_context__.k.register(_c64, "MessageIcon");
__turbopack_context__.k.register(_c65, "FolderIcon");
__turbopack_context__.k.register(_c66, "BookmarkIcon");
__turbopack_context__.k.register(_c67, "BookIcon");
__turbopack_context__.k.register(_c68, "DocReportIcon");
__turbopack_context__.k.register(_c69, "DocListIcon");
__turbopack_context__.k.register(_c70, "DocDefaultIcon");
__turbopack_context__.k.register(_c71, "DocFinancialIcon");
__turbopack_context__.k.register(_c72, "DocSecurityIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/calaya-taskly/src/components/Layout.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Layout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// components/Layout.jsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/contexts/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/lib/icons.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function Layout({ children, menuItems, userRole }) {
    _s();
    const [sidebarOpen, setSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showLogoutModal, setShowLogoutModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isAuthenticated, loading, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const handleLogoutClick = ()=>setShowLogoutModal(true);
    const handleConfirmLogout = ()=>{
        setShowLogoutModal(false);
        logout();
    };
    const handleCancelLogout = ()=>setShowLogoutModal(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Layout.useEffect": ()=>{
            setSidebarOpen(false);
        }
    }["Layout.useEffect"], [
        pathname
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Layout.useEffect": ()=>{
            const onKeyDown = {
                "Layout.useEffect.onKeyDown": (e)=>{
                    if (e.key === "Escape") {
                        setSidebarOpen(false);
                        setShowLogoutModal(false);
                    }
                }
            }["Layout.useEffect.onKeyDown"];
            window.addEventListener("keydown", onKeyDown);
            return ({
                "Layout.useEffect": ()=>window.removeEventListener("keydown", onKeyDown)
            })["Layout.useEffect"];
        }
    }["Layout.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Layout.useEffect": ()=>{
            if (!loading && !isAuthenticated) {
                router.replace("/login");
            }
        }
    }["Layout.useEffect"], [
        loading,
        isAuthenticated,
        router
    ]);
    const isActive = (path)=>pathname === path;
    const quickStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Layout.useMemo[quickStats]": ()=>[
                {
                    label: "Active Tasks",
                    value: 0
                },
                {
                    label: "Overdue",
                    value: 0
                },
                {
                    label: "Pending Approvals",
                    value: 7
                }
            ]
    }["Layout.useMemo[quickStats]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 text-gray-900",
        style: {
            "--primary-blue": "#2C4B9B",
            "--secondary-blue": "#6DC6DF",
            "--accent-red": "#ED3237"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "fixed top-0 left-0 right-0 z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-16 bg-white/80 backdrop-blur border-b border-gray-200",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-full px-4 md:px-6 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setSidebarOpen((s)=>!s),
                                        className: "md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 active:scale-[0.98] transition",
                                        "aria-label": "Toggle sidebar",
                                        "aria-expanded": sidebarOpen,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "var(--primary-blue)"
                                            },
                                            className: "w-6 h-6 flex items-center justify-center",
                                            children: sidebarOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CloseMenuIcon"], {
                                                size: 24
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                lineNumber: 80,
                                                columnNumber: 34
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuIcon"], {
                                                size: 24
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                lineNumber: 80,
                                                columnNumber: 64
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                            lineNumber: 79,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                        lineNumber: 73,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/login",
                                        className: "flex items-center gap-3 group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative h-9 w-auto min-w-[120px]",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: "/calaya-logo.png",
                                                    alt: "Calaya Engineering Services",
                                                    height: 36,
                                                    width: 140,
                                                    className: "h-9 w-auto object-contain object-left"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                    lineNumber: 87,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                lineNumber: 86,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-2 hidden sm:inline-flex items-center px-2.5 py-1 text-[11px] font-semibold rounded-full",
                                                style: {
                                                    backgroundColor: "var(--accent-red)",
                                                    color: "white"
                                                },
                                                children: userRole
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                lineNumber: 96,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                        lineNumber: 85,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 md:gap-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleLogoutClick,
                                    className: "h-10 px-4 rounded-2xl text-sm font-semibold text-white active:scale-[0.99] transition",
                                    style: {
                                        backgroundColor: "var(--accent-red)"
                                    },
                                    children: "Logout"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                    lineNumber: 108,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                lineNumber: 106,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            sidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/40 z-40 md:hidden",
                onClick: ()=>setSidebarOpen(false),
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                lineNumber: 122,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: [
                    "fixed z-50 md:z-30 top-16 left-0 bottom-0 w-72 md:w-64",
                    "bg-white border-r border-gray-200",
                    "transition-transform duration-300 ease-out",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                ].join(" "),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full flex flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-3 py-4 overflow-y-auto scrollbar-hide",
                            children: [
                                (()=>{
                                    // Group items by group property; ungrouped go under "Menu"
                                    const groups = {};
                                    (menuItems || []).forEach((item, index)=>{
                                        const key = item.group ?? "General";
                                        if (!groups[key]) groups[key] = [];
                                        groups[key].push({
                                            ...item,
                                            _idx: index
                                        });
                                    });
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                        className: "space-y-6",
                                        children: Object.entries(groups).map(([label, items])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "px-2 mb-2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[11px] font-semibold text-gray-500 uppercase tracking-wider",
                                                            children: label
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                            lineNumber: 155,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                        lineNumber: 154,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-1",
                                                        children: items.map((item)=>{
                                                            const active = isActive(item.path);
                                                            const path = item.path ?? "#";
                                                            const isLink = path.startsWith("/") && path !== "#";
                                                            const linkClass = [
                                                                "group relative flex items-center gap-3 px-3 py-2.5 rounded-2xl",
                                                                "text-sm font-medium transition",
                                                                active ? "text-white" : "text-gray-700 hover:bg-gray-100"
                                                            ].join(" ");
                                                            const linkStyle = {
                                                                backgroundColor: active ? "var(--primary-blue)" : "transparent"
                                                            };
                                                            return isLink ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                href: path,
                                                                prefetch: true,
                                                                className: linkClass,
                                                                style: linkStyle,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: [
                                                                            "absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full",
                                                                            active ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                                                                        ].join(" "),
                                                                        style: {
                                                                            backgroundColor: "var(--secondary-blue)"
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                                        lineNumber: 184,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: [
                                                                            "inline-flex items-center justify-center w-9 h-9 rounded-2xl",
                                                                            active ? "bg-white/15" : "bg-gray-100 group-hover:bg-gray-200"
                                                                        ].join(" "),
                                                                        children: typeof item.icon === "string" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-lg",
                                                                            children: item.icon
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                                            lineNumber: 198,
                                                                            columnNumber: 35
                                                                        }, this) : item.icon
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                                        lineNumber: 191,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "truncate",
                                                                        children: item.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                                        lineNumber: 203,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    item.badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: [
                                                                            "ml-auto text-xs font-semibold px-2 py-1 rounded-full",
                                                                            active ? "bg-white/15 text-white" : "bg-red-500 text-white"
                                                                        ].join(" "),
                                                                        children: item.badge
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                                        lineNumber: 205,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, item._idx, true, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                                lineNumber: 177,
                                                                columnNumber: 29
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: linkClass,
                                                                style: linkStyle,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: [
                                                                            "absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full",
                                                                            active ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                                                                        ].join(" "),
                                                                        style: {
                                                                            backgroundColor: "var(--secondary-blue)"
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                                        lineNumber: 217,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: [
                                                                            "inline-flex items-center justify-center w-9 h-9 rounded-2xl",
                                                                            active ? "bg-white/15" : "bg-gray-100 group-hover:bg-gray-200"
                                                                        ].join(" "),
                                                                        children: typeof item.icon === "string" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-lg",
                                                                            children: item.icon
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                                            lineNumber: 231,
                                                                            columnNumber: 35
                                                                        }, this) : item.icon
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                                        lineNumber: 224,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "truncate",
                                                                        children: item.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                                        lineNumber: 236,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    item.badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: [
                                                                            "ml-auto text-xs font-semibold px-2 py-1 rounded-full",
                                                                            active ? "bg-white/15 text-white" : "bg-red-500 text-white"
                                                                        ].join(" "),
                                                                        children: item.badge
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                                        lineNumber: 238,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, item._idx, true, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                                lineNumber: 216,
                                                                columnNumber: 29
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                        lineNumber: 159,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, label, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                lineNumber: 153,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                        lineNumber: 151,
                                        columnNumber: 17
                                    }, this);
                                })(),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 px-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl p-4 border border-gray-200",
                                        style: {
                                            backgroundColor: "rgba(109,198,223,0.12)"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm font-extrabold",
                                                        style: {
                                                            color: "var(--primary-blue)"
                                                        },
                                                        children: "Quick Stats"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                        lineNumber: 264,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[11px] text-gray-500",
                                                        children: "Today"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                        lineNumber: 267,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                lineNumber: 263,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 space-y-2.5",
                                                children: quickStats.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-gray-700",
                                                                children: s.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                                lineNumber: 273,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-extrabold",
                                                                style: {
                                                                    color: "var(--accent-red)"
                                                                },
                                                                children: s.value
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                                lineNumber: 274,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, s.label, true, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                        lineNumber: 272,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                lineNumber: 270,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-2 rounded-full bg-white/60 overflow-hidden",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-full rounded-full",
                                                            style: {
                                                                width: "62%",
                                                                background: "var(--primary-blue)"
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                            lineNumber: 286,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                        lineNumber: 285,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-2 text-[11px] text-gray-600",
                                                        children: "Progress overview"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                        lineNumber: 295,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                lineNumber: 284,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                        lineNumber: 259,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                    lineNumber: 258,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                            lineNumber: 140,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-auto p-4 border-t border-gray-200",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold",
                                        style: {
                                            backgroundColor: "var(--primary-blue)"
                                        },
                                        children: "C"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                        lineNumber: 306,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm font-semibold truncate",
                                                children: "Calaya"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                lineNumber: 313,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-500 truncate",
                                                children: userRole
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                                lineNumber: 314,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                        lineNumber: 312,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                lineNumber: 305,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                            lineNumber: 304,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                    lineNumber: 138,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "pt-16 md:pl-64",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 md:p-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-[1400px] mx-auto",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                        lineNumber: 324,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                    lineNumber: 323,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                lineNumber: 322,
                columnNumber: 7
            }, this),
            showLogoutModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/40",
                        onClick: handleCancelLogout,
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                        lineNumber: 331,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold mb-2",
                                style: {
                                    color: "var(--primary-blue)"
                                },
                                children: "System log out?"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                lineNumber: 337,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-600 mb-4",
                                children: "Are you sure you want to log out of your session?"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                lineNumber: 340,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-end gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleCancelLogout,
                                        className: "px-4 py-2 rounded-xl text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-100",
                                        children: "No"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                        lineNumber: 344,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleConfirmLogout,
                                        className: "px-4 py-2 rounded-xl text-sm font-semibold text-white",
                                        style: {
                                            backgroundColor: "var(--accent-red)"
                                        },
                                        children: "Yes"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                        lineNumber: 351,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                                lineNumber: 343,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                        lineNumber: 336,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
                lineNumber: 330,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/calaya-taskly/src/components/Layout.jsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_s(Layout, "cayK46VauH0B/L7dk84mP2Rtjys=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = Layout;
var _c;
__turbopack_context__.k.register(_c, "Layout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/calaya-taskly/src/utils/menus.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdminMenuItems",
    ()=>AdminMenuItems,
    "HODMenuItems",
    ()=>HODMenuItems,
    "MDMenuItems",
    ()=>MDMenuItems,
    "SecretaryMenuItems",
    ()=>SecretaryMenuItems,
    "StaffMenuItems",
    ()=>StaffMenuItems
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/components/Layout.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/lib/icons.jsx [app-client] (ecmascript)");
"use client";
;
;
;
const AdminMenuItems = [
    {
        label: "Dashboard",
        path: "/admin-dashboard",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 20,
            columnNumber: 57
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Overview"
    },
    {
        label: "Users",
        path: "/admin-dashboard/users",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 21,
            columnNumber: 59
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Management"
    },
    {
        label: "Roles",
        path: "/admin-dashboard/roles",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 22,
            columnNumber: 59
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Management"
    },
    {
        label: "Accounts",
        path: "/admin-dashboard/accounts",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 23,
            columnNumber: 65
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Management"
    },
    {
        label: "Departments",
        path: "/admin-dashboard/departments",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BuildingIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 24,
            columnNumber: 71
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Management"
    }
];
const HODMenuItems = [
    {
        label: "Dashboard",
        path: "/hod-dashboard",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 28,
            columnNumber: 55
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Overview"
    },
    {
        label: "Department Users",
        path: "/hod-dashboard/department-users",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 29,
            columnNumber: 79
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Management"
    },
    {
        label: "Department Tasks",
        path: "/hod-dashboard/tasks",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 30,
            columnNumber: 68
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "18",
        group: "Tasks"
    },
    {
        label: "My Tasks",
        path: "/hod-dashboard/my-tasks",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 31,
            columnNumber: 63
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "5",
        group: "Tasks"
    },
    {
        label: "Documents",
        path: "/hod-dashboard/documents",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocumentIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 32,
            columnNumber: 65
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Documents & Reports"
    },
    {
        label: "Daily Reports",
        path: "/hod-dashboard/reports",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReportIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 33,
            columnNumber: 67
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Documents & Reports"
    },
    {
        label: "Meetings/Events",
        path: "/hod-dashboard/events",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CalendarIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 34,
            columnNumber: 68
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Calendar"
    },
    {
        label: "Tenders",
        path: "/hod-dashboard/tenders",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TenderIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 35,
            columnNumber: 61
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "3",
        group: "Tenders"
    },
    {
        label: "Tender Documents",
        path: "/hod-dashboard/tender-documents",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocumentIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 36,
            columnNumber: 79
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "5",
        group: "Tenders"
    },
    {
        label: "Announcements",
        path: "/hod-dashboard/announcements",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnnouncementIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 37,
            columnNumber: 73
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Communications"
    },
    {
        label: "Approvals",
        path: "/hod-dashboard/approvals",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApprovalIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 38,
            columnNumber: 65
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "4",
        group: "Workflow"
    },
    {
        label: "Escalations/Overdue",
        path: "/hod-dashboard/escalations",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 39,
            columnNumber: 77
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "2",
        group: "Workflow"
    },
    {
        label: "Notifications",
        path: "/hod-dashboard/notifications",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BellIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 40,
            columnNumber: 73
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "8",
        group: "Account"
    },
    {
        label: "Profile",
        path: "/hod-dashboard/profile",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 41,
            columnNumber: 61
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Account"
    }
];
const MDMenuItems = [
    {
        label: "Dashboard",
        path: "/md-dashboard",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 45,
            columnNumber: 54
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Overview"
    },
    {
        label: "Tasks (All)",
        path: "/md-dashboard/tasks",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 46,
            columnNumber: 62
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "24",
        group: "Tasks"
    },
    {
        label: "Active Jobs",
        path: "/md-dashboard/jobs",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 47,
            columnNumber: 61
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "8",
        group: "Tasks"
    },
    {
        label: "Documents",
        path: "/md-dashboard/documents",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocumentIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 48,
            columnNumber: 64
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "3",
        group: "Documents & Reports"
    },
    {
        label: "Daily Reports",
        path: "/md-dashboard/reports",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReportIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 49,
            columnNumber: 66
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Documents & Reports"
    },
    {
        label: "Meetings/Events",
        path: "/md-dashboard/events",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CalendarIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 50,
            columnNumber: 67
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "2",
        group: "Calendar"
    },
    {
        label: "Tenders",
        path: "/md-dashboard/tenders",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocumentIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 51,
            columnNumber: 60
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Tenders"
    },
    {
        label: "Tender Documents",
        path: "/md-dashboard/tender-documents",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocumentIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 52,
            columnNumber: 78
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "5",
        group: "Tenders"
    },
    {
        label: "Announcements",
        path: "/md-dashboard/announcements",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnnouncementIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 53,
            columnNumber: 72
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Communications"
    },
    {
        label: "Approvals",
        path: "/md-dashboard/approvals",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApprovalIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 54,
            columnNumber: 64
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "7",
        group: "Workflow"
    },
    {
        label: "Escalations/Overdue",
        path: "/md-dashboard/escalations",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 55,
            columnNumber: 76
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "3",
        group: "Workflow"
    },
    {
        label: "Notifications",
        path: "/md-dashboard/notifications",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BellIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 56,
            columnNumber: 72
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "12",
        group: "Account"
    },
    {
        label: "Profile",
        path: "/md-dashboard/profile",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 57,
            columnNumber: 60
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Account"
    }
];
const StaffMenuItems = [
    {
        label: "Dashboard",
        path: "/staff-dashboard",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 61,
            columnNumber: 57
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Overview"
    },
    {
        label: "My Tasks",
        path: "/staff-dashboard/tasks",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 62,
            columnNumber: 62
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "8",
        group: "Tasks"
    },
    {
        label: "Submit Reports",
        path: "/staff-dashboard/submit-reports",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReportIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 63,
            columnNumber: 77
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Documents & Reports"
    },
    {
        label: "Documents",
        path: "/staff-dashboard/documents",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocumentIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 64,
            columnNumber: 67
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Documents & Reports"
    },
    {
        label: "Daily Reports",
        path: "/staff-dashboard/daily-reports",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReportIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 65,
            columnNumber: 75
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Documents & Reports"
    },
    {
        label: "Meetings/Events",
        path: "/staff-dashboard/events",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CalendarIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 66,
            columnNumber: 70
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Calendar"
    },
    {
        label: "Tenders",
        path: "/staff-dashboard/tenders",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TenderIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 67,
            columnNumber: 63
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "3",
        group: "Tenders"
    },
    {
        label: "Tender Documents",
        path: "/staff-dashboard/tender-documents",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocumentIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 68,
            columnNumber: 81
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "5",
        group: "Tenders"
    },
    {
        label: "Announcements",
        path: "/staff-dashboard/announcements",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnnouncementIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 69,
            columnNumber: 75
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Communications"
    },
    {
        label: "Notifications",
        path: "/staff-dashboard/notifications",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BellIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 70,
            columnNumber: 75
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "5",
        group: "Account"
    },
    {
        label: "Profile",
        path: "/staff-dashboard/profile",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 71,
            columnNumber: 63
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Account"
    }
];
const SecretaryMenuItems = [
    {
        label: "Dashboard",
        path: "/secretary-dashboard",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 75,
            columnNumber: 61
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Overview"
    },
    {
        label: "Upload Daily Report",
        path: "/secretary-dashboard/upload-report",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReportIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 76,
            columnNumber: 85
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Documents & Reports"
    },
    {
        label: "Daily Reports Archive",
        path: "/secretary-dashboard/reports-archive",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReportIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 77,
            columnNumber: 89
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "24",
        group: "Documents & Reports"
    },
    {
        label: "Task Reports Archive",
        path: "/secretary-dashboard/task-reports",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocumentIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 78,
            columnNumber: 85
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "45",
        group: "Documents & Reports"
    },
    {
        label: "Documents",
        path: "/secretary-dashboard/documents",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocumentIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 79,
            columnNumber: 71
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Documents & Reports"
    },
    {
        label: "Meetings/Events",
        path: "/secretary-dashboard/events",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CalendarIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 80,
            columnNumber: 74
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "3",
        group: "Calendar"
    },
    {
        label: "Tenders",
        path: "/secretary-dashboard/tenders",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TenderIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 81,
            columnNumber: 67
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "5",
        group: "Tenders"
    },
    {
        label: "Announcements",
        path: "/secretary-dashboard/announcements",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnnouncementIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 82,
            columnNumber: 79
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "3",
        group: "Communications"
    },
    {
        label: "Notifications",
        path: "/secretary-dashboard/notifications",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BellIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 83,
            columnNumber: 79
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "12",
        group: "Account"
    },
    {
        label: "Profile",
        path: "/secretary-dashboard/profile",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 84,
            columnNumber: 67
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Account"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/calaya-taskly/src/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchWithAuth",
    ()=>fetchWithAuth,
    "getAuthToken",
    ()=>getToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$auth$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/lib/auth-config.ts [app-client] (ecmascript)");
;
function getToken() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$auth$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"]);
}
async function fetchWithAuth(input, init) {
    const token = getToken();
    const headers = new Headers(init?.headers);
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    return fetch(input, {
        ...init,
        headers
    });
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/calaya-taskly/src/hooks/useSSE.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSSE",
    ()=>useSSE
]);
/**
 * useSSE — lightweight Server-Sent Events hook.
 *
 * Opens a ReadableStream against `endpoint` (authenticated via fetchWithAuth)
 * and calls `onEvent(parsedData)` whenever a `data:` line arrives.
 * Automatically reconnects on drop using exponential back-off (up to 30 s).
 *
 * Usage
 * -----
 *   useSSE("/api/tasks/events", (ev) => {
 *     if (ev.type === "task:created") refetch();
 *   });
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/lib/api.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
const INITIAL_DELAY = 2_000;
const MAX_DELAY = 30_000;
function useSSE(endpoint, onEvent, enabled = true) {
    _s();
    const onEventRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(onEvent);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSSE.useEffect": ()=>{
            onEventRef.current = onEvent;
        }
    }["useSSE.useEffect"], [
        onEvent
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSSE.useEffect": ()=>{
            if (!enabled) return;
            let cancelled = false;
            let delay = INITIAL_DELAY;
            let timeoutId = null;
            let currentReader = null;
            async function connect() {
                if (cancelled) return;
                try {
                    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchWithAuth"])(endpoint);
                    if (!res.ok || !res.body) throw new Error(`SSE ${res.status}`);
                    delay = INITIAL_DELAY; // reset back-off on successful connect
                    const reader = res.body.getReader();
                    currentReader = reader;
                    const decoder = new TextDecoder();
                    let buf = "";
                    while(!cancelled){
                        const { done, value } = await reader.read();
                        if (done) break;
                        buf += decoder.decode(value, {
                            stream: true
                        });
                        const parts = buf.split("\n\n");
                        buf = parts.pop() ?? "";
                        for (const part of parts){
                            const m = part.match(/^data: (.+)$/m);
                            if (m) {
                                try {
                                    const ev = JSON.parse(m[1]);
                                    if (ev.type !== "ping") onEventRef.current(ev);
                                } catch  {}
                            }
                        }
                    }
                } catch  {
                /* connection error — schedule reconnect */ } finally{
                    currentReader = null;
                    if (!cancelled) {
                        timeoutId = setTimeout({
                            "useSSE.useEffect.connect": ()=>{
                                delay = Math.min(delay * 2, MAX_DELAY);
                                connect();
                            }
                        }["useSSE.useEffect.connect"], delay);
                    }
                }
            }
            connect();
            return ({
                "useSSE.useEffect": ()=>{
                    cancelled = true;
                    if (timeoutId) clearTimeout(timeoutId);
                    currentReader?.cancel().catch({
                        "useSSE.useEffect": ()=>{}
                    }["useSSE.useEffect"]);
                }
            })["useSSE.useEffect"];
        }
    }["useSSE.useEffect"], [
        endpoint,
        enabled
    ]);
}
_s(useSSE, "b7hTHAEEP71BDtClz18fy3Q0k6E=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HODApprovals
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// pages/dashboards/HOD/HODApprovals.jsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/lib/toast.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/components/Layout.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$utils$2f$menus$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/utils/menus.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/lib/icons.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$hooks$2f$useSSE$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/hooks/useSSE.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
/* ---------- UI helpers ---------- */ const Card = ({ className = "", children, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
        lineNumber: 14,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = Card;
const SectionTitle = ({ title, subtitle, action })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-start justify-between gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg md:text-xl font-extrabold tracking-tight",
                        style: {
                            color: "var(--primary-blue)"
                        },
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                        lineNumber: 25,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    subtitle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-500 mt-1",
                        children: subtitle
                    }, void 0, false, {
                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                        lineNumber: 28,
                        columnNumber: 19
                    }, ("TURBOPACK compile-time value", void 0)) : null
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                lineNumber: 24,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            action
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
        lineNumber: 23,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = SectionTitle;
const Pill = ({ children, tone = "default" })=>{
    const styles = tone === "danger" ? "bg-red-50 text-red-700 ring-red-100" : tone === "success" ? "bg-emerald-50 text-emerald-700 ring-emerald-100" : tone === "warn" ? "bg-amber-50 text-amber-800 ring-amber-100" : tone === "info" ? "bg-blue-50 text-blue-700 ring-blue-100" : "bg-gray-50 text-gray-700 ring-gray-100";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
        lineNumber: 46,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c2 = Pill;
function HODApprovals() {
    _s();
    const [approvalsData, setApprovalsData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [approvalType, setApprovalType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All");
    const [priorityFilter, setPriorityFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All");
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("PENDING");
    const [selectedApproval, setSelectedApproval] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [comment, setComment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeDocTab, setActiveDocTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("details");
    const [reviewedDocs, setReviewedDocs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const fetchApprovals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HODApprovals.useCallback[fetchApprovals]": async ()=>{
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchWithAuth"])("/api/tasks?limit=100");
                if (res.ok) {
                    const tasks = await res.json();
                    // Map tasks to the approval shape the UI expects
                    const mapped = tasks.map({
                        "HODApprovals.useCallback[fetchApprovals].mapped": (t)=>({
                                id: `TSK-${t.id}`,
                                dbId: t.id,
                                title: t.title,
                                type: t.type === "JOB" ? "TASK_COMPLETION" : "DOCUMENT",
                                submittedBy: t.assignments?.[0]?.user?.name || t.assignments?.[0]?.user?.email || "Unassigned",
                                department: t.department || "—",
                                submittedDate: t.createdAt?.split("T")[0] || "",
                                dueDate: t.dueDate || "",
                                priority: t.priority || "MEDIUM",
                                status: t.status || "PENDING",
                                description: t.description || "",
                                reference: t.type === "JOB" ? `JOB-${t.id}` : `TSK-${t.id}`,
                                attachments: 0,
                                daysPending: t.dueDate ? Math.max(0, Math.ceil((Date.now() - new Date(t.createdAt)) / 86400000)) : 0,
                                documents: [],
                                approvedDate: t.completedAt?.split("T")[0] || null,
                                rejectedDate: null,
                                approvalComment: null,
                                rejectionReason: null
                            })
                    }["HODApprovals.useCallback[fetchApprovals].mapped"]);
                    setApprovalsData(mapped);
                }
            } catch (e) {
                console.error("Failed to fetch approvals:", e);
            } finally{
                setLoading(false);
            }
        }
    }["HODApprovals.useCallback[fetchApprovals]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HODApprovals.useEffect": ()=>{
            fetchApprovals();
        }
    }["HODApprovals.useEffect"], [
        fetchApprovals
    ]);
    // Real-time: re-fetch on task events
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$hooks$2f$useSSE$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSSE"])("/api/tasks/events", {
        "HODApprovals.useSSE": (ev)=>{
            if (ev.type?.startsWith("task:")) fetchApprovals();
        }
    }["HODApprovals.useSSE"]);
    const approvalHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HODApprovals.useMemo[approvalHistory]": ()=>approvalsData.filter({
                "HODApprovals.useMemo[approvalHistory]": (a)=>a.status === "COMPLETED" || a.status === "APPROVED" || a.status === "REJECTED"
            }["HODApprovals.useMemo[approvalHistory]"])
    }["HODApprovals.useMemo[approvalHistory]"], [
        approvalsData
    ]);
    const filteredApprovals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HODApprovals.useMemo[filteredApprovals]": ()=>approvalsData.filter({
                "HODApprovals.useMemo[filteredApprovals]": (approval)=>{
                    if (approvalType !== "All" && approval.type !== approvalType) return false;
                    if (priorityFilter !== "All" && approval.priority !== priorityFilter) return false;
                    if (statusFilter !== "All" && approval.status !== statusFilter) return false;
                    return true;
                }
            }["HODApprovals.useMemo[filteredApprovals]"])
    }["HODApprovals.useMemo[filteredApprovals]"], [
        approvalsData,
        approvalType,
        priorityFilter,
        statusFilter
    ]);
    const getPriorityTone = (priority)=>{
        switch(priority){
            case "URGENT":
                return "danger";
            case "HIGH":
                return "warn";
            case "MEDIUM":
                return "info";
            case "LOW":
                return "success";
            default:
                return "default";
        }
    };
    const getStatusTone = (status)=>{
        switch(status){
            case "PENDING":
                return "warn";
            case "APPROVED":
                return "success";
            case "REJECTED":
                return "danger";
            default:
                return "default";
        }
    };
    const getTypeIcon = (type)=>{
        switch(type){
            case "TASK_COMPLETION":
                return "check";
            case "DOCUMENT":
                return "document";
            case "REPORT":
                return "chart";
            default:
                return "task";
        }
    };
    const getFileIcon = (type)=>{
        if (!type) return "attachment";
        const t = String(type).toLowerCase();
        if (t.includes("pdf")) return "file-pdf";
        if (t.includes("doc")) return "file-doc";
        if (t.includes("xls") || t.includes("csv")) return "file-xls";
        if (t.includes("ppt")) return "file-ppt";
        if (t.includes("zip") || t.includes("rar")) return "file-zip";
        return "attachment";
    };
    const openModal = (approval)=>{
        setSelectedApproval(approval);
        setComment("");
        setActiveDocTab("details");
        setReviewedDocs({});
        setIsModalOpen(true);
    };
    const closeModal = ()=>{
        setIsModalOpen(false);
        setSelectedApproval(null);
        setComment("");
        setActiveDocTab("details");
        setReviewedDocs({});
    };
    // ESC to close
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HODApprovals.useEffect": ()=>{
            const onKeyDown = {
                "HODApprovals.useEffect.onKeyDown": (e)=>{
                    if (e.key === "Escape") closeModal();
                }
            }["HODApprovals.useEffect.onKeyDown"];
            if (isModalOpen) window.addEventListener("keydown", onKeyDown);
            return ({
                "HODApprovals.useEffect": ()=>window.removeEventListener("keydown", onKeyDown)
            })["HODApprovals.useEffect"];
        }
    }["HODApprovals.useEffect"], [
        isModalOpen
    ]);
    // Lock scroll while modal open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HODApprovals.useEffect": ()=>{
            if (!isModalOpen) return;
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return ({
                "HODApprovals.useEffect": ()=>{
                    document.body.style.overflow = prev;
                }
            })["HODApprovals.useEffect"];
        }
    }["HODApprovals.useEffect"], [
        isModalOpen
    ]);
    const handleApprove = async ()=>{
        if (!selectedApproval) return;
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchWithAuth"])(`/api/tasks/${selectedApproval.dbId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: "COMPLETED"
                })
            });
            if (res.ok) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`Task ${selectedApproval.id} approved`);
                fetchApprovals();
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to approve task");
            }
        } catch  {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to approve task");
        }
        closeModal();
    };
    const handleReject = async ()=>{
        if (!selectedApproval) return;
        const reason = comment.trim() || "No reason provided";
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchWithAuth"])(`/api/tasks/${selectedApproval.dbId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: "ON_HOLD",
                    comment: reason
                })
            });
            if (res.ok) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].warning(`Task ${selectedApproval.id} placed on hold: ${reason}`);
                fetchApprovals();
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to reject task");
            }
        } catch  {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to reject task");
        }
        closeModal();
    };
    const handleDownloadDocument = (doc)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info(`Downloading ${doc.name}`);
    const handleViewDocument = (doc)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info(`Opening ${doc.name} for preview`);
    const fmtDate = (iso)=>iso ? new Date(iso).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric"
        }) : "Not set";
    const pendingCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HODApprovals.useMemo[pendingCount]": ()=>approvalsData.filter({
                "HODApprovals.useMemo[pendingCount]": (a)=>a.status === "PENDING"
            }["HODApprovals.useMemo[pendingCount]"]).length
    }["HODApprovals.useMemo[pendingCount]"], [
        approvalsData
    ]);
    const urgentPendingCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HODApprovals.useMemo[urgentPendingCount]": ()=>approvalsData.filter({
                "HODApprovals.useMemo[urgentPendingCount]": (a)=>a.priority === "URGENT" && a.status === "PENDING"
            }["HODApprovals.useMemo[urgentPendingCount]"]).length
    }["HODApprovals.useMemo[urgentPendingCount]"], [
        approvalsData
    ]);
    const reviewedCount = selectedApproval?.documents ? selectedApproval.documents.filter((d)=>reviewedDocs[d.name]).length : 0;
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        menuItems: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$utils$2f$menus$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HODMenuItems"],
        userRole: "HOD",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center min-h-[60vh]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"
            }, void 0, false, {
                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                lineNumber: 260,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
            lineNumber: 259,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
        lineNumber: 258,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        menuItems: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$utils$2f$menus$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HODMenuItems"],
        userRole: "HOD",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                        className: "overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6 md:p-8",
                                style: {
                                    background: "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap items-center gap-2 mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                            children: "Approvals Inbox"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                            lineNumber: 280,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                            tone: "warn",
                                                            children: [
                                                                pendingCount,
                                                                " Pending"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                            lineNumber: 281,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                            tone: "danger",
                                                            children: [
                                                                urgentPendingCount,
                                                                " Urgent"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                            lineNumber: 282,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                    lineNumber: 279,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                    className: "text-2xl md:text-3xl font-extrabold tracking-tight",
                                                    style: {
                                                        color: "var(--primary-blue)"
                                                    },
                                                    children: "HOD Approvals Dashboard"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                    lineNumber: 284,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-600 mt-2 max-w-2xl",
                                                    children: "Review and approve pending requests from your department"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                    lineNumber: 287,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                            lineNumber: 278,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col sm:flex-row gap-3",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/hod-dashboard/approvals/bulk",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition",
                                                    style: {
                                                        borderColor: "var(--secondary-blue)",
                                                        color: "var(--primary-blue)"
                                                    },
                                                    children: "Bulk Actions"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                    lineNumber: 291,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                lineNumber: 290,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                            lineNumber: 289,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                    lineNumber: 277,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                lineNumber: 270,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-4 gap-3 p-4 md:p-5 bg-white border-t border-gray-200/70",
                                children: [
                                    {
                                        label: "Total Pending",
                                        value: pendingCount,
                                        tone: "warn"
                                    },
                                    {
                                        label: "Urgent",
                                        value: urgentPendingCount,
                                        tone: "danger"
                                    },
                                    {
                                        label: "Approval Rate",
                                        value: "85%",
                                        tone: "success"
                                    },
                                    {
                                        label: "Avg Response",
                                        value: "1.5 days",
                                        tone: "info"
                                    }
                                ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl border border-gray-200/70 p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-600",
                                                        children: s.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 312,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                        tone: s.tone,
                                                        children: "Live"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 313,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                lineNumber: 311,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-2xl font-extrabold mt-2",
                                                style: {
                                                    color: "var(--primary-blue)"
                                                },
                                                children: s.value
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                lineNumber: 315,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, s.label, true, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                        lineNumber: 310,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                lineNumber: 303,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                        lineNumber: 269,
                        columnNumber: 9
                    }, this),
                    urgentPendingCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                        className: "overflow-hidden border-red-200/70",
                        style: {
                            borderColor: "rgba(237, 50, 55, 0.3)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 md:p-5 bg-red-50",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIconByKey"])("alert", "w-6 h-6"),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-extrabold text-red-800",
                                                        children: "Urgent Approvals Require Your Attention!"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 331,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-red-600",
                                                        children: [
                                                            urgentPendingCount,
                                                            " urgent approval(s) pending your decision"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 332,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                lineNumber: 330,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                        lineNumber: 328,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setPriorityFilter("URGENT"),
                                        className: "px-4 py-2 rounded-xl text-sm font-semibold text-white active:scale-[0.99] transition",
                                        style: {
                                            backgroundColor: "var(--accent-red)"
                                        },
                                        children: "View Urgent"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                        lineNumber: 335,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                lineNumber: 327,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                            lineNumber: 326,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                        lineNumber: 325,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                        className: "p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                title: "Filters",
                                subtitle: "Refine approvals by type, priority, and status"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                lineNumber: 349,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-gray-700 mb-1",
                                                children: "Approval Type"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                lineNumber: 352,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: approvalType,
                                                onChange: (e)=>setApprovalType(e.target.value),
                                                className: "w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "All",
                                                        children: "All Types"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 358,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "TASK_COMPLETION",
                                                        children: "Task Completion"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 359,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "DOCUMENT",
                                                        children: "Document"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 360,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "REPORT",
                                                        children: "Report"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 361,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "OTHER",
                                                        children: "Other"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 362,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                lineNumber: 353,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                        lineNumber: 351,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-gray-700 mb-1",
                                                children: "Priority"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                lineNumber: 367,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: priorityFilter,
                                                onChange: (e)=>setPriorityFilter(e.target.value),
                                                className: "w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "All",
                                                        children: "All Priorities"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 373,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "URGENT",
                                                        children: "Urgent"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 374,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "HIGH",
                                                        children: "High"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 375,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "MEDIUM",
                                                        children: "Medium"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 376,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "LOW",
                                                        children: "Low"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 377,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                lineNumber: 368,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                        lineNumber: 366,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-gray-700 mb-1",
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                lineNumber: 382,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: statusFilter,
                                                onChange: (e)=>setStatusFilter(e.target.value),
                                                className: "w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "All",
                                                        children: "All Status"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 388,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "PENDING",
                                                        children: "Pending"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 389,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "APPROVED",
                                                        children: "Approved"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 390,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "REJECTED",
                                                        children: "Rejected"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 391,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                lineNumber: 383,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                        lineNumber: 381,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                lineNumber: 350,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 flex flex-wrap gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setApprovalType("All");
                                            setPriorityFilter("All");
                                            setStatusFilter("PENDING");
                                        },
                                        className: "px-3.5 py-2 rounded-2xl text-sm font-semibold border bg-amber-50 text-amber-800 hover:bg-amber-100 transition",
                                        children: "⏳ All Pending"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                        lineNumber: 397,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setPriorityFilter("URGENT");
                                            setStatusFilter("PENDING");
                                        },
                                        className: "px-3.5 py-2 rounded-2xl text-sm font-semibold border bg-red-50 text-red-700 hover:bg-red-100 transition",
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIconByKey"])("alert", "w-4 h-4 inline-block mr-1 align-middle"),
                                            " Urgent Only"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                        lineNumber: 407,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setApprovalType("TASK_COMPLETION");
                                            setStatusFilter("PENDING");
                                        },
                                        className: "px-3.5 py-2 rounded-2xl text-sm font-semibold border bg-blue-50 text-blue-700 hover:bg-blue-100 transition",
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIconByKey"])("check", "w-4 h-4 inline-block mr-1 align-middle"),
                                            " Task Approvals"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                        lineNumber: 416,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setApprovalType("All");
                                            setPriorityFilter("All");
                                            setStatusFilter("All");
                                        },
                                        className: "px-3.5 py-2 rounded-2xl text-sm font-semibold border bg-white hover:bg-gray-50 transition",
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIconByKey"])("refresh", "w-4 h-4 inline-block mr-1 align-middle"),
                                            " Clear All"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                        lineNumber: 425,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                lineNumber: 396,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                        lineNumber: 348,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                title: "Pending Approvals",
                                subtitle: "Requests awaiting your decision",
                                action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-gray-500",
                                    children: [
                                        filteredApprovals.filter((a)=>a.status === "PENDING").length,
                                        " pending"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                    lineNumber: 443,
                                    columnNumber: 21
                                }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                lineNumber: 440,
                                columnNumber: 11
                            }, this),
                            filteredApprovals.filter((a)=>a.status === "PENDING").length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                                className: "p-10 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-center",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIconByKey"])("check", "w-16 h-16 text-green-600")
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                        lineNumber: 448,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 font-extrabold",
                                        style: {
                                            color: "var(--primary-blue)"
                                        },
                                        children: "No pending approvals"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                        lineNumber: 449,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-gray-500 mt-1",
                                        children: "Great job! You're all caught up with approvals"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                        lineNumber: 452,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                lineNumber: 447,
                                columnNumber: 13
                            }, this) : filteredApprovals.filter((a)=>a.status === "PENDING").map((approval)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                                    className: "p-6 hover:-translate-y-0.5 transition-all cursor-pointer",
                                    role: "button",
                                    tabIndex: 0,
                                    onClick: ()=>openModal(approval),
                                    onKeyDown: (e)=>{
                                        if (e.key === "Enter" || e.key === " ") openModal(approval);
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col xl:flex-row xl:items-start gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap items-center gap-2 mb-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                                tone: getPriorityTone(approval.priority),
                                                                children: approval.priority
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                lineNumber: 471,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                                tone: getStatusTone(approval.status),
                                                                children: approval.status
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                lineNumber: 472,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                                children: approval.department
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                lineNumber: 473,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                                tone: "info",
                                                                children: [
                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIconByKey"])(getTypeIcon(approval.type), "w-4 h-4 inline-block mr-1 align-middle"),
                                                                    " ",
                                                                    approval.type.replace("_", " ")
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                lineNumber: 474,
                                                                columnNumber: 25
                                                            }, this),
                                                            approval.daysPending > 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                                tone: "danger",
                                                                children: [
                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIconByKey"])("warning", "w-4 h-4 inline-block mr-1 align-middle"),
                                                                    " ",
                                                                    approval.daysPending,
                                                                    " days pending"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                lineNumber: 477,
                                                                columnNumber: 54
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 470,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-extrabold tracking-tight",
                                                        style: {
                                                            color: "var(--primary-blue)"
                                                        },
                                                        children: approval.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 480,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-600 mt-2",
                                                        children: approval.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 483,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-4 grid grid-cols-1 md:grid-cols-3 gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "rounded-xl border border-gray-200/70 p-3",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center text-sm",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-gray-500 w-20",
                                                                            children: "Submitted:"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                            lineNumber: 488,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-semibold",
                                                                            children: approval.submittedBy
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                            lineNumber: 489,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                    lineNumber: 487,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                lineNumber: 486,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "rounded-xl border border-gray-200/70 p-3",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center text-sm",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-gray-500 w-20",
                                                                            children: "Reference:"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                            lineNumber: 494,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                                            className: "font-mono bg-gray-100 px-2 py-0.5 rounded text-xs",
                                                                            children: approval.reference
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                            lineNumber: 495,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                    lineNumber: 493,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                lineNumber: 492,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "rounded-xl border border-gray-200/70 p-3",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center text-sm",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-gray-500 w-20",
                                                                            children: "Due Date:"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                            lineNumber: 502,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: `font-semibold ${new Date(approval.dueDate) < new Date() ? "text-red-600" : ""}`,
                                                                            children: [
                                                                                fmtDate(approval.dueDate),
                                                                                new Date(approval.dueDate) < new Date() && " (OVERDUE)"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                            lineNumber: 503,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                    lineNumber: 501,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                lineNumber: 500,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 485,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                lineNumber: 469,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex xl:flex-col items-center gap-2 xl:w-32",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-12 h-12 rounded-2xl flex items-center justify-center ",
                                                        style: {
                                                            backgroundColor: "rgba(109, 198, 223, 0.18)"
                                                        },
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIconByKey"])(getTypeIcon(approval.type), "w-8 h-8")
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 513,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex xl:flex-col items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-semibold text-gray-700",
                                                                children: [
                                                                    approval.attachments,
                                                                    " file(s)"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                lineNumber: 520,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-gray-500",
                                                                children: "Click to review →"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                lineNumber: 521,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 519,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                lineNumber: 512,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                        lineNumber: 468,
                                        columnNumber: 19
                                    }, this)
                                }, approval.id, false, {
                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                    lineNumber: 458,
                                    columnNumber: 17
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                        lineNumber: 439,
                        columnNumber: 9
                    }, this),
                    approvalHistory.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                        className: "overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6 border-b border-gray-200/70",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                    title: "Recent Approval History",
                                    subtitle: "Your recent decisions"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                    lineNumber: 534,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                lineNumber: 533,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden lg:block overflow-x-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "min-w-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            className: "bg-gray-50 border-b border-gray-200/70",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "text-[11px] font-semibold text-gray-500 uppercase tracking-wider",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-5 py-3 text-left",
                                                        children: "ID"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 541,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-5 py-3 text-left",
                                                        children: "Type"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 542,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-5 py-3 text-left",
                                                        children: "Title"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 543,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-5 py-3 text-left",
                                                        children: "Requester"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 544,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-5 py-3 text-left",
                                                        children: "Department"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 545,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-5 py-3 text-left",
                                                        children: "Decision"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 546,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-5 py-3 text-left",
                                                        children: "Date"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 547,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-5 py-3 text-left",
                                                        children: "Comment"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 548,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                lineNumber: 540,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                            lineNumber: 539,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            className: "divide-y divide-gray-200/70 text-[13px]",
                                            children: approvalHistory.slice(0, 5).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "hover:bg-gray-50/70 transition",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-5 py-3 whitespace-nowrap",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-extrabold",
                                                                style: {
                                                                    color: "var(--primary-blue)"
                                                                },
                                                                children: item.id
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                lineNumber: 556,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                            lineNumber: 555,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-5 py-3 whitespace-nowrap",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIconByKey"])(getTypeIcon(item.type), "w-5 h-5"),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                                        children: item.type.replace("_", " ")
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                        lineNumber: 563,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                lineNumber: 561,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                            lineNumber: 560,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-5 py-3",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-semibold",
                                                                children: item.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                lineNumber: 567,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                            lineNumber: 566,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-5 py-3 whitespace-nowrap",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm",
                                                                children: item.submittedBy
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                lineNumber: 570,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                            lineNumber: 569,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-5 py-3 whitespace-nowrap",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                                children: item.department
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                lineNumber: 573,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                            lineNumber: 572,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-5 py-3 whitespace-nowrap",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                                tone: item.status === "APPROVED" ? "success" : "danger",
                                                                children: item.status
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                lineNumber: 576,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                            lineNumber: 575,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-5 py-3 whitespace-nowrap",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm",
                                                                children: item.approvedDate || item.rejectedDate
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                lineNumber: 579,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                            lineNumber: 578,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-5 py-3",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm text-gray-600 max-w-xs truncate",
                                                                children: item.approvalComment || item.rejectionReason || "-"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                lineNumber: 582,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                            lineNumber: 581,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, item.id, true, {
                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                    lineNumber: 554,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                            lineNumber: 552,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                    lineNumber: 538,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                lineNumber: 537,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:hidden p-4 space-y-3",
                                children: approvalHistory.slice(0, 3).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl border border-gray-200/70 p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-extrabold",
                                                        style: {
                                                            color: "var(--primary-blue)"
                                                        },
                                                        children: item.id
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 594,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                        tone: item.status === "APPROVED" ? "success" : "danger",
                                                        children: item.status
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 597,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                lineNumber: 593,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-semibold",
                                                children: item.title
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                lineNumber: 599,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-600 mt-1",
                                                children: [
                                                    "By ",
                                                    item.submittedBy,
                                                    " • ",
                                                    item.department
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                lineNumber: 600,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-500 mt-2",
                                                children: item.approvalComment || item.rejectionReason
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                lineNumber: 603,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                        lineNumber: 592,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                lineNumber: 590,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-6 py-4 border-t border-gray-200/70 bg-white",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/hod-dashboard/approvals/history",
                                    className: "text-sm font-semibold",
                                    style: {
                                        color: "var(--primary-blue)"
                                    },
                                    children: "View Full History →"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                    lineNumber: 609,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                lineNumber: 608,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                        lineNumber: 532,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                        className: "p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                title: "Department Approval Workflow",
                                subtitle: "Standard approval process for department requests"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                lineNumber: 618,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5 grid grid-cols-1 md:grid-cols-4 gap-4",
                                children: [
                                    {
                                        step: 1,
                                        title: "Team Submission",
                                        desc: "Team member submits request",
                                        icon: "upload"
                                    },
                                    {
                                        step: 2,
                                        title: "Document Review",
                                        desc: "HOD reviews attached documents",
                                        icon: "search"
                                    },
                                    {
                                        step: 3,
                                        title: "Decision",
                                        desc: "Approve, reject, or request changes",
                                        icon: "edit"
                                    },
                                    {
                                        step: 4,
                                        title: "Notification",
                                        desc: "Team notified of decision",
                                        icon: "bell"
                                    }
                                ].map((step)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl border border-gray-200/70 p-4 hover:bg-gray-50 transition",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold",
                                                    style: {
                                                        backgroundColor: "var(--secondary-blue)"
                                                    },
                                                    children: step.step
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                    lineNumber: 628,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-extrabold",
                                                            style: {
                                                                color: "var(--primary-blue)"
                                                            },
                                                            children: step.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                            lineNumber: 632,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-gray-500 mt-1",
                                                            children: step.desc
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                            lineNumber: 635,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                    lineNumber: 631,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-auto",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIconByKey"])(step.icon, "w-8 h-8")
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                    lineNumber: 637,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                            lineNumber: 627,
                                            columnNumber: 17
                                        }, this)
                                    }, step.step, false, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                        lineNumber: 626,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                lineNumber: 619,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                        lineNumber: 617,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                lineNumber: 267,
                columnNumber: 7
            }, this),
            isModalOpen && selectedApproval && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[9999]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-gray-900/60",
                        onClick: closeModal
                    }, void 0, false, {
                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                        lineNumber: 649,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 min-h-full flex items-end sm:items-center justify-center p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full sm:max-w-6xl",
                            onClick: (e)=>e.stopPropagation(),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                                className: "overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-6 pt-6 pb-4 border-b border-gray-200/70",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-start",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "text-2xl font-extrabold",
                                                                style: {
                                                                    color: "var(--primary-blue)"
                                                                },
                                                                children: "Review Approval Request"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                lineNumber: 659,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 mt-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                                        className: "font-mono bg-gray-100 px-3 py-1 rounded text-sm",
                                                                        children: selectedApproval.id
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                        lineNumber: 663,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                                        tone: getPriorityTone(selectedApproval.priority),
                                                                        children: selectedApproval.priority
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                        lineNumber: 664,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                                        tone: getStatusTone(selectedApproval.status),
                                                                        children: selectedApproval.status
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                        lineNumber: 665,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                lineNumber: 662,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 658,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: closeModal,
                                                        className: "text-gray-400 hover:text-gray-500 focus:outline-none w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center transition",
                                                        "aria-label": "Close",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-2xl",
                                                            children: "×"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                            lineNumber: 673,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 668,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                lineNumber: 657,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-4 mt-4",
                                                children: [
                                                    {
                                                        id: "details",
                                                        label: "Request Details"
                                                    },
                                                    {
                                                        id: "documents",
                                                        label: `Documents (${selectedApproval.attachments})`
                                                    },
                                                    {
                                                        id: "review",
                                                        label: "Review & Decision"
                                                    }
                                                ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setActiveDocTab(tab.id),
                                                        className: `pb-2 px-1 font-semibold transition border-b-2 ${activeDocTab === tab.id ? "text-gray-900" : "text-gray-500 hover:text-gray-700"}`,
                                                        style: {
                                                            borderBottomColor: activeDocTab === tab.id ? "var(--primary-blue)" : "transparent"
                                                        },
                                                        children: tab.label
                                                    }, tab.id, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 684,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                lineNumber: 678,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                        lineNumber: 656,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-6 max-h-[70vh] overflow-y-auto",
                                        children: [
                                            activeDocTab === "details" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "rounded-2xl border border-gray-200/70 p-5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "text-lg font-extrabold mb-3",
                                                                style: {
                                                                    color: "var(--primary-blue)"
                                                                },
                                                                children: selectedApproval.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                lineNumber: 703,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-gray-600 text-sm mb-4",
                                                                children: selectedApproval.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                lineNumber: 706,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "space-y-3",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-start",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "w-24 text-sm text-gray-500",
                                                                                        children: "Submitted By:"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                        lineNumber: 711,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                className: "font-semibold",
                                                                                                children: selectedApproval.submittedBy
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                                lineNumber: 713,
                                                                                                columnNumber: 33
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                className: "text-xs text-gray-500",
                                                                                                children: selectedApproval.department
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                                lineNumber: 714,
                                                                                                columnNumber: 33
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                        lineNumber: 712,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                lineNumber: 710,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center text-sm",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "w-24 text-gray-500",
                                                                                        children: "Reference:"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                        lineNumber: 718,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                                                        className: "font-mono bg-gray-100 px-2 py-1 rounded text-xs",
                                                                                        children: selectedApproval.reference
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                        lineNumber: 719,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                lineNumber: 717,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                        lineNumber: 709,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "space-y-3",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center text-sm",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "w-24 text-gray-500",
                                                                                        children: "Submitted:"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                        lineNumber: 726,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "font-semibold",
                                                                                        children: fmtDate(selectedApproval.submittedDate)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                        lineNumber: 727,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                lineNumber: 725,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center text-sm",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "w-24 text-gray-500",
                                                                                        children: "Due Date:"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                        lineNumber: 730,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: `font-semibold ${new Date(selectedApproval.dueDate) < new Date() ? "text-red-600" : ""}`,
                                                                                        children: [
                                                                                            fmtDate(selectedApproval.dueDate),
                                                                                            new Date(selectedApproval.dueDate) < new Date() && " (OVERDUE)"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                        lineNumber: 731,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                lineNumber: 729,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                        lineNumber: 724,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                lineNumber: 708,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 702,
                                                        columnNumber: 23
                                                    }, this),
                                                    selectedApproval.attachments > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "rounded-2xl border border-gray-200/70 p-5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "text-sm font-extrabold mb-3",
                                                                style: {
                                                                    color: "var(--primary-blue)"
                                                                },
                                                                children: [
                                                                    "Attached Documents (",
                                                                    selectedApproval.attachments,
                                                                    ")"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                lineNumber: 743,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-2",
                                                                children: [
                                                                    selectedApproval.documents?.slice(0, 3).map((doc, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center justify-between p-2 hover:bg-gray-50 rounded-xl",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-center gap-3",
                                                                                    children: [
                                                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIconByKey"])(getFileIcon(doc.type), "w-6 h-6"),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                    className: "text-sm font-semibold",
                                                                                                    children: doc.name
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                                    lineNumber: 752,
                                                                                                    columnNumber: 37
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                    className: "text-xs text-gray-500",
                                                                                                    children: [
                                                                                                        doc.size,
                                                                                                        " • Uploaded by ",
                                                                                                        doc.uploadedBy
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                                    lineNumber: 753,
                                                                                                    columnNumber: 37
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                            lineNumber: 751,
                                                                                            columnNumber: 35
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                    lineNumber: 749,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                    onClick: ()=>setActiveDocTab("documents"),
                                                                                    className: "text-sm font-semibold px-3 py-1.5 rounded-xl hover:bg-gray-100 transition",
                                                                                    style: {
                                                                                        color: "var(--primary-blue)"
                                                                                    },
                                                                                    children: "View →"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                    lineNumber: 758,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            ]
                                                                        }, idx, true, {
                                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                            lineNumber: 748,
                                                                            columnNumber: 31
                                                                        }, this)),
                                                                    selectedApproval.attachments > 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-gray-500 mt-2 text-center",
                                                                        children: [
                                                                            "+",
                                                                            selectedApproval.attachments - 3,
                                                                            " more documents"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                        lineNumber: 768,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                lineNumber: 746,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 742,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                lineNumber: 701,
                                                columnNumber: 21
                                            }, this),
                                            activeDocTab === "documents" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4",
                                                children: [
                                                    selectedApproval.documents && selectedApproval.documents.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-1 gap-3",
                                                        children: selectedApproval.documents.map((doc, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "rounded-2xl border border-gray-200/70 p-4 transition",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-start justify-between",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-start gap-4",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl",
                                                                                    style: {
                                                                                        backgroundColor: "rgba(109, 198, 223, 0.1)"
                                                                                    },
                                                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIconByKey"])(getFileIcon(doc.type), "w-6 h-6")
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                    lineNumber: 787,
                                                                                    columnNumber: 35
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                                                            className: "font-extrabold text-gray-900",
                                                                                            children: doc.name
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                            lineNumber: 791,
                                                                                            columnNumber: 37
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "flex flex-wrap items-center gap-2 mt-1",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "text-xs text-gray-500",
                                                                                                    children: doc.size
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                                    lineNumber: 793,
                                                                                                    columnNumber: 39
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "text-xs text-gray-500",
                                                                                                    children: "•"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                                    lineNumber: 794,
                                                                                                    columnNumber: 39
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "text-xs text-gray-500",
                                                                                                    children: [
                                                                                                        "Uploaded by ",
                                                                                                        doc.uploadedBy
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                                    lineNumber: 795,
                                                                                                    columnNumber: 39
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "text-xs text-gray-500",
                                                                                                    children: "•"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                                    lineNumber: 796,
                                                                                                    columnNumber: 39
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "text-xs text-gray-500",
                                                                                                    children: doc.date
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                                    lineNumber: 797,
                                                                                                    columnNumber: 39
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                            lineNumber: 792,
                                                                                            columnNumber: 37
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                    lineNumber: 790,
                                                                                    columnNumber: 35
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                            lineNumber: 786,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex gap-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                    onClick: ()=>handleViewDocument(doc),
                                                                                    className: "px-4 py-2 rounded-xl text-sm font-semibold border hover:bg-gray-50 transition",
                                                                                    style: {
                                                                                        borderColor: "rgba(44, 75, 155, 0.25)",
                                                                                        color: "var(--primary-blue)"
                                                                                    },
                                                                                    children: "Preview"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                    lineNumber: 802,
                                                                                    columnNumber: 35
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                    onClick: ()=>handleDownloadDocument(doc),
                                                                                    className: "px-4 py-2 rounded-xl text-sm font-semibold text-white active:scale-[0.99] transition",
                                                                                    style: {
                                                                                        backgroundColor: "var(--secondary-blue)"
                                                                                    },
                                                                                    children: "Download"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                    lineNumber: 809,
                                                                                    columnNumber: 35
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                            lineNumber: 801,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                    lineNumber: 785,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, idx, false, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                lineNumber: 784,
                                                                columnNumber: 29
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 782,
                                                        columnNumber: 25
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "rounded-2xl border border-gray-200/70 p-8 text-center",
                                                        children: [
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIconByKey"])("document", "w-16 h-16 mx-auto text-gray-400"),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-3 text-gray-600",
                                                                children: "No documents attached to this request"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                lineNumber: 824,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 822,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "rounded-2xl bg-blue-50 border border-blue-100 p-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-start gap-3",
                                                            children: [
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIconByKey"])("info", "w-5 h-5 text-blue-600 shrink-0"),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm font-semibold text-blue-800",
                                                                            children: "Document Review Guidelines"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                            lineNumber: 832,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs text-blue-600 mt-1",
                                                                            children: "Review all attached documents carefully before making your decision."
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                            lineNumber: 833,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                    lineNumber: 831,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                            lineNumber: 829,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 828,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                lineNumber: 780,
                                                columnNumber: 21
                                            }, this),
                                            activeDocTab === "review" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-4",
                                                        children: [
                                                            selectedApproval.attachments > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "rounded-2xl border border-gray-200/70 p-5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                        className: "text-sm font-extrabold mb-3",
                                                                        style: {
                                                                            color: "var(--primary-blue)"
                                                                        },
                                                                        children: "Documents to Review"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                        lineNumber: 849,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "space-y-2",
                                                                        children: selectedApproval.documents?.map((doc, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl cursor-pointer",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                        type: "checkbox",
                                                                                        checked: !!reviewedDocs[doc.name],
                                                                                        onChange: (e)=>setReviewedDocs((prev)=>({
                                                                                                    ...prev,
                                                                                                    [doc.name]: e.target.checked
                                                                                                })),
                                                                                        className: "rounded border-gray-300"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                        lineNumber: 856,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIconByKey"])(getFileIcon(doc.type), "w-5 h-5"),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-sm flex-1",
                                                                                        children: doc.name
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                        lineNumber: 868,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-xs text-gray-500",
                                                                                        children: doc.size
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                        lineNumber: 869,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, idx, true, {
                                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                lineNumber: 855,
                                                                                columnNumber: 33
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                        lineNumber: 853,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-gray-500 mt-3",
                                                                        children: "✓ Check off documents as you review them"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                        lineNumber: 874,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                lineNumber: 848,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "rounded-2xl border border-gray-200/70 p-5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                        className: "text-sm font-extrabold mb-3",
                                                                        style: {
                                                                            color: "var(--primary-blue)"
                                                                        },
                                                                        children: "Review Summary"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                        lineNumber: 879,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "space-y-2 text-sm",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex justify-between",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-gray-600",
                                                                                        children: "Total Documents:"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                        lineNumber: 884,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "font-semibold",
                                                                                        children: selectedApproval.attachments
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                        lineNumber: 885,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                lineNumber: 883,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            selectedApproval.attachments > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex justify-between",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-gray-600",
                                                                                                children: "Reviewed:"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                                lineNumber: 890,
                                                                                                columnNumber: 35
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "font-semibold text-green-600",
                                                                                                children: reviewedCount
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                                lineNumber: 891,
                                                                                                columnNumber: 35
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                        lineNumber: 889,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex justify-between",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-gray-600",
                                                                                                children: "Pending Review:"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                                lineNumber: 894,
                                                                                                columnNumber: 35
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "font-semibold text-amber-600",
                                                                                                children: selectedApproval.attachments - reviewedCount
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                                lineNumber: 895,
                                                                                                columnNumber: 35
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                        lineNumber: 893,
                                                                                        columnNumber: 33
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                        lineNumber: 882,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                lineNumber: 878,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 846,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "rounded-2xl border border-gray-200/70 p-5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "text-sm font-extrabold mb-3",
                                                                    style: {
                                                                        color: "var(--primary-blue)"
                                                                    },
                                                                    children: "Your Decision"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                    lineNumber: 906,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "space-y-4",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "block text-sm font-semibold text-gray-700 mb-2",
                                                                                    children: "Add Comment"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                    lineNumber: 912,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                                    rows: 4,
                                                                                    className: "w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100",
                                                                                    placeholder: "Add your approval comment, feedback, or rejection reason...",
                                                                                    value: comment,
                                                                                    onChange: (e)=>setComment(e.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                    lineNumber: 913,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-xs text-gray-500 mt-2",
                                                                                    children: "Your comment will be visible to the requester"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                    lineNumber: 920,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                            lineNumber: 911,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-3 pt-4",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                    onClick: handleApprove,
                                                                                    className: "w-full px-5 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition",
                                                                                    style: {
                                                                                        backgroundColor: "#10B981"
                                                                                    },
                                                                                    children: "✓ Approve Request"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                    lineNumber: 924,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                    onClick: handleReject,
                                                                                    className: "w-full px-5 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition",
                                                                                    style: {
                                                                                        backgroundColor: "var(--accent-red)"
                                                                                    },
                                                                                    children: "✗ Reject Request"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                    lineNumber: 931,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                selectedApproval.attachments > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                    onClick: ()=>setActiveDocTab("documents"),
                                                                                    className: "w-full px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition",
                                                                                    style: {
                                                                                        borderColor: "rgba(44, 75, 155, 0.25)",
                                                                                        color: "var(--primary-blue)"
                                                                                    },
                                                                                    children: "← Back to Documents"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                                    lineNumber: 939,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                            lineNumber: 923,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                                    lineNumber: 910,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                            lineNumber: 905,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                        lineNumber: 904,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                lineNumber: 844,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                        lineNumber: 698,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-6 py-4 border-t border-gray-200/70 bg-gray-50",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-gray-600",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold",
                                                            children: "Request ID:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                            lineNumber: 959,
                                                            columnNumber: 23
                                                        }, this),
                                                        " ",
                                                        selectedApproval.id,
                                                        " •",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold ml-2",
                                                            children: "Type:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                            lineNumber: 960,
                                                            columnNumber: 23
                                                        }, this),
                                                        " ",
                                                        selectedApproval.type.replace("_", " ")
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                    lineNumber: 958,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: closeModal,
                                                    className: "px-4 py-2 rounded-xl text-sm font-semibold border bg-white hover:bg-gray-50 transition",
                                                    style: {
                                                        borderColor: "rgba(44, 75, 155, 0.25)",
                                                        color: "var(--primary-blue)"
                                                    },
                                                    children: "Close"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                                    lineNumber: 962,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                            lineNumber: 957,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                        lineNumber: 956,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                                lineNumber: 654,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                            lineNumber: 653,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                        lineNumber: 652,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
                lineNumber: 647,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx",
        lineNumber: 266,
        columnNumber: 5
    }, this);
}
_s(HODApprovals, "xfXF02b19m9i5/XQrJERAs87BMA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$hooks$2f$useSSE$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSSE"]
    ];
});
_c3 = HODApprovals;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "SectionTitle");
__turbopack_context__.k.register(_c2, "Pill");
__turbopack_context__.k.register(_c3, "HODApprovals");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/calaya-taskly/src/app/hod-dashboard/approvals/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$views$2f$dashboards$2f$HOD$2f$HODApprovals$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/views/dashboards/HOD/HODApprovals.jsx [app-client] (ecmascript)");
"use client";
;
;
function Page() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$views$2f$dashboards$2f$HOD$2f$HODApprovals$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/Desktop/calaya-taskly/src/app/hod-dashboard/approvals/page.jsx",
        lineNumber: 5,
        columnNumber: 10
    }, this);
}
_c = Page;
var _c;
__turbopack_context__.k.register(_c, "Page");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_calaya-taskly_src_ca2dfe7d._.js.map
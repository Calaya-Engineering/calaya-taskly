(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/calaya-taskly/src/components/Layout.jsx [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/Desktop/calaya-taskly/src/components/Layout.jsx'\n\nExpected '</', got ')'");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[project]/Desktop/calaya-taskly/src/utils/menus.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
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
"use client";
;
;
const HODMenuItems = [
    {
        label: "Dashboard",
        path: "/hod-dashboard",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 18,
            columnNumber: 55
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Overview"
    },
    {
        label: "Department Tasks",
        path: "/hod-dashboard/tasks",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 19,
            columnNumber: 68
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "18",
        group: "Tasks"
    },
    {
        label: "My Tasks",
        path: "/hod-dashboard/my-tasks",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 20,
            columnNumber: 63
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "5",
        group: "Tasks"
    },
    {
        label: "Documents",
        path: "/hod-dashboard/documents",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocumentIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 21,
            columnNumber: 65
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Documents & Reports"
    },
    {
        label: "Daily Reports",
        path: "/hod-dashboard/reports",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReportIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 22,
            columnNumber: 67
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Documents & Reports"
    },
    {
        label: "Meetings/Events",
        path: "/hod-dashboard/events",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CalendarIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 23,
            columnNumber: 68
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Calendar"
    },
    {
        label: "Tenders",
        path: "/hod-dashboard/tenders",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TenderIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 24,
            columnNumber: 61
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "3",
        group: "Tenders"
    },
    {
        label: "Tender Documents",
        path: "/hod-dashboard/tender-documents",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocumentIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 25,
            columnNumber: 79
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "5",
        group: "Tenders"
    },
    {
        label: "Announcements",
        path: "/hod-dashboard/announcements",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnnouncementIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 26,
            columnNumber: 73
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Communications"
    },
    {
        label: "Approvals",
        path: "/hod-dashboard/approvals",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApprovalIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 27,
            columnNumber: 65
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "4",
        group: "Workflow"
    },
    {
        label: "Escalations/Overdue",
        path: "/hod-dashboard/escalations",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 28,
            columnNumber: 77
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "2",
        group: "Workflow"
    },
    {
        label: "Notifications",
        path: "/hod-dashboard/notifications",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BellIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 29,
            columnNumber: 73
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "8",
        group: "Account"
    },
    {
        label: "Profile",
        path: "/hod-dashboard/profile",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 30,
            columnNumber: 61
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Account"
    }
];
const MDMenuItems = [
    {
        label: "Dashboard",
        path: "/md-dashboard",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 34,
            columnNumber: 54
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Overview"
    },
    {
        label: "Tasks (All)",
        path: "/md-dashboard/tasks",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 35,
            columnNumber: 62
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "24",
        group: "Tasks"
    },
    {
        label: "Active Jobs",
        path: "/md-dashboard/jobs",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 36,
            columnNumber: 61
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "8",
        group: "Tasks"
    },
    {
        label: "Documents",
        path: "/md-dashboard/documents",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocumentIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 37,
            columnNumber: 64
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "3",
        group: "Documents & Reports"
    },
    {
        label: "Daily Reports",
        path: "/md-dashboard/reports",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReportIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 38,
            columnNumber: 66
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Documents & Reports"
    },
    {
        label: "Meetings/Events",
        path: "/md-dashboard/events",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CalendarIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 39,
            columnNumber: 67
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "2",
        group: "Calendar"
    },
    {
        label: "Tenders",
        path: "/md-dashboard/tenders",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocumentIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 40,
            columnNumber: 60
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Tenders"
    },
    {
        label: "Tender Documents",
        path: "/md-dashboard/tender-documents",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocumentIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 41,
            columnNumber: 78
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "5",
        group: "Tenders"
    },
    {
        label: "Announcements",
        path: "/md-dashboard/announcements",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnnouncementIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 42,
            columnNumber: 72
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Communications"
    },
    {
        label: "Approvals",
        path: "/md-dashboard/approvals",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApprovalIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 43,
            columnNumber: 64
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "7",
        group: "Workflow"
    },
    {
        label: "Escalations/Overdue",
        path: "/md-dashboard/escalations",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 44,
            columnNumber: 76
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "3",
        group: "Workflow"
    },
    {
        label: "Notifications",
        path: "/md-dashboard/notifications",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BellIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 45,
            columnNumber: 72
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "12",
        group: "Account"
    },
    {
        label: "Profile",
        path: "/md-dashboard/profile",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 46,
            columnNumber: 60
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Account"
    }
];
const StaffMenuItems = [
    {
        label: "Dashboard",
        path: "/staff-dashboard",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 50,
            columnNumber: 57
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Overview"
    },
    {
        label: "My Tasks",
        path: "/staff-dashboard/tasks",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 51,
            columnNumber: 62
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "8",
        group: "Tasks"
    },
    {
        label: "Submit Reports",
        path: "/staff-dashboard/submit-reports",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReportIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 52,
            columnNumber: 77
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Documents & Reports"
    },
    {
        label: "Documents",
        path: "/staff-dashboard/documents",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocumentIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 53,
            columnNumber: 67
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Documents & Reports"
    },
    {
        label: "Daily Reports",
        path: "/staff-dashboard/daily-reports",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReportIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 54,
            columnNumber: 75
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Documents & Reports"
    },
    {
        label: "Meetings/Events",
        path: "/staff-dashboard/events",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CalendarIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 55,
            columnNumber: 70
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Calendar"
    },
    {
        label: "Tenders",
        path: "/staff-dashboard/tenders",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TenderIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 56,
            columnNumber: 63
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "3",
        group: "Tenders"
    },
    {
        label: "Tender Documents",
        path: "/staff-dashboard/tender-documents",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocumentIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 57,
            columnNumber: 81
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "5",
        group: "Tenders"
    },
    {
        label: "Announcements",
        path: "/staff-dashboard/announcements",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnnouncementIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 58,
            columnNumber: 75
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Communications"
    },
    {
        label: "Notifications",
        path: "/staff-dashboard/notifications",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BellIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 59,
            columnNumber: 75
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "5",
        group: "Account"
    },
    {
        label: "Profile",
        path: "/staff-dashboard/profile",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 60,
            columnNumber: 63
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Account"
    }
];
const SecretaryMenuItems = [
    {
        label: "Dashboard",
        path: "/secretary-dashboard",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 64,
            columnNumber: 61
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Overview"
    },
    {
        label: "Upload Daily Report",
        path: "/secretary-dashboard/upload-report",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReportIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 65,
            columnNumber: 85
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Documents & Reports"
    },
    {
        label: "Daily Reports Archive",
        path: "/secretary-dashboard/reports-archive",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReportIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 66,
            columnNumber: 89
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "24",
        group: "Documents & Reports"
    },
    {
        label: "Task Reports Archive",
        path: "/secretary-dashboard/task-reports",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocumentIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 67,
            columnNumber: 85
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "45",
        group: "Documents & Reports"
    },
    {
        label: "Documents",
        path: "/secretary-dashboard/documents",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocumentIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 68,
            columnNumber: 71
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Documents & Reports"
    },
    {
        label: "Meetings/Events",
        path: "/secretary-dashboard/events",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CalendarIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 69,
            columnNumber: 74
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "3",
        group: "Calendar"
    },
    {
        label: "Tenders",
        path: "/secretary-dashboard/tenders",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TenderIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 70,
            columnNumber: 67
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "5",
        group: "Tenders"
    },
    {
        label: "Announcements",
        path: "/secretary-dashboard/announcements",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnnouncementIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 71,
            columnNumber: 79
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "3",
        group: "Communications"
    },
    {
        label: "Notifications",
        path: "/secretary-dashboard/notifications",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BellIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 72,
            columnNumber: 79
        }, ("TURBOPACK compile-time value", void 0)),
        badge: "12",
        group: "Account"
    },
    {
        label: "Profile",
        path: "/secretary-dashboard/profile",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 73,
            columnNumber: 67
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Account"
    }
];
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/react/dist/esm/index.js [app-client] (ecmascript) <locals>");
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
    /** Generic toast (default style) */ message: (message)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])(message)
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MDEditTask
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// pages/dashboards/MD/MDEditTask.jsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/components/Layout.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$utils$2f$menus$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/utils/menus.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/lib/icons.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/lib/toast.js [app-client] (ecmascript)");
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
const Card = ({ className = "", children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
        lineNumber: 14,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = Card;
const Pill = ({ children, tone = "default" })=>{
    const styles = tone === "danger" ? "bg-red-50 text-red-700 ring-red-100" : tone === "success" ? "bg-emerald-50 text-emerald-700 ring-emerald-100" : tone === "warn" ? "bg-amber-50 text-amber-800 ring-amber-100" : tone === "info" ? "bg-blue-50 text-blue-700 ring-blue-100" : "bg-gray-50 text-gray-700 ring-gray-100";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
        lineNumber: 29,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c1 = Pill;
const getPriorityTone = (p)=>p === "CRITICAL" ? "danger" : p === "HIGH" ? "warn" : p === "MEDIUM" ? "info" : "success";
const fmtDate = (iso)=>iso ? new Date(iso).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric"
    }) : "Not set";
function MDEditTask() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])() || {};
    const taskId = params.taskId;
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [task, setTask] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [departments, setDepartments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [hodUsers, setHodUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [staffUsers, setStaffUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        title: "",
        description: "",
        department: "",
        priority: "MEDIUM",
        status: "PENDING",
        type: "TASK",
        startDate: "",
        dueDate: "",
        estimatedHours: "",
        visibility: "ASSIGNED_ONLY",
        departments: [],
        hods: [],
        staff: []
    });
    const fetchTask = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MDEditTask.useCallback[fetchTask]": async ()=>{
            if (!taskId) return;
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchWithAuth"])(`/api/tasks/${taskId}`);
                if (res.ok) {
                    const data = await res.json();
                    setTask(data);
                    const hodIds = data.assignments?.filter({
                        "MDEditTask.useCallback[fetchTask]": (a)=>a.user?.role === "HOD"
                    }["MDEditTask.useCallback[fetchTask]"]).map({
                        "MDEditTask.useCallback[fetchTask]": (a)=>a.userId
                    }["MDEditTask.useCallback[fetchTask]"]) ?? [];
                    const staffIds = data.assignments?.filter({
                        "MDEditTask.useCallback[fetchTask]": (a)=>a.user?.role === "Staff"
                    }["MDEditTask.useCallback[fetchTask]"]).map({
                        "MDEditTask.useCallback[fetchTask]": (a)=>a.userId
                    }["MDEditTask.useCallback[fetchTask]"]) ?? [];
                    const deptSet = new Set(data.assignments?.map({
                        "MDEditTask.useCallback[fetchTask]": (a)=>a.user?.department
                    }["MDEditTask.useCallback[fetchTask]"]).filter(Boolean) ?? []);
                    setFormData({
                        title: data.title ?? "",
                        description: data.description ?? "",
                        department: data.department ?? "",
                        priority: data.priority ?? "MEDIUM",
                        status: data.status ?? "PENDING",
                        type: data.type ?? "TASK",
                        startDate: data.startDate ? data.startDate.slice(0, 10) : "",
                        dueDate: data.dueDate ? data.dueDate.slice(0, 10) : "",
                        estimatedHours: data.estimatedHours ? String(data.estimatedHours) : "",
                        visibility: data.visibility ?? "ASSIGNED_ONLY",
                        departments: [
                            ...deptSet
                        ],
                        hods: hodIds,
                        staff: staffIds
                    });
                } else {
                    setTask(null);
                }
            } catch  {
                setTask(null);
            } finally{
                setLoading(false);
            }
        }
    }["MDEditTask.useCallback[fetchTask]"], [
        taskId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MDEditTask.useEffect": ()=>{
            fetchTask();
        }
    }["MDEditTask.useEffect"], [
        fetchTask
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MDEditTask.useEffect": ()=>{
            async function loadOptions() {
                try {
                    const [deptRes, hodRes, staffRes] = await Promise.all([
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchWithAuth"])("/api/departments"),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchWithAuth"])("/api/users?role=HOD"),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchWithAuth"])("/api/users?role=Staff")
                    ]);
                    if (deptRes.ok) setDepartments((await deptRes.json()).map({
                        "MDEditTask.useEffect.loadOptions": (d)=>d.name
                    }["MDEditTask.useEffect.loadOptions"]));
                    if (hodRes.ok) setHodUsers(await hodRes.json());
                    if (staffRes.ok) setStaffUsers(await staffRes.json());
                } catch (e) {
                    console.error("Failed to load options:", e);
                }
            }
            loadOptions();
        }
    }["MDEditTask.useEffect"], []);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!task) return;
        if (!formData.title?.trim()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].warning("Title is required");
            return;
        }
        const deptIds = new Set(formData.hods);
        formData.staff.forEach((id)=>deptIds.add(id));
        if (formData.departments.length > 0) {
            const params = formData.departments.map((d)=>`department=${encodeURIComponent(d)}`).join("&");
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchWithAuth"])(`/api/users?${params}`);
            if (res.ok) {
                const users = await res.json();
                users.forEach((u)=>deptIds.add(u.id));
            }
        }
        const finalAssigneeIds = [
            ...deptIds
        ];
        setSaving(true);
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchWithAuth"])(`/api/tasks/${taskId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: formData.title.trim(),
                    description: formData.description?.trim() || null,
                    department: formData.department || formData.departments[0] || null,
                    priority: formData.priority,
                    status: formData.status,
                    type: formData.type,
                    startDate: formData.startDate || null,
                    dueDate: formData.dueDate || null,
                    estimatedHours: formData.estimatedHours ? parseInt(formData.estimatedHours, 10) : null,
                    visibility: formData.visibility,
                    assigneeIds: finalAssigneeIds
                })
            });
            if (!res.ok) {
                const err = await res.json().catch(()=>({}));
                throw new Error(err.error || "Failed to update task");
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Task updated successfully!");
            router.push(`/md-dashboard/task/${taskId}`);
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err.message || "Failed to update task");
        } finally{
            setSaving(false);
        }
    };
    const toggleUser = (userId, list)=>{
        setFormData((p)=>({
                ...p,
                [list]: p[list].includes(userId) ? p[list].filter((id)=>id !== userId) : [
                    ...p[list],
                    userId
                ]
            }));
    };
    const toggleDepartment = (dept)=>{
        setFormData((p)=>({
                ...p,
                departments: p.departments.includes(dept) ? p.departments.filter((d)=>d !== dept) : [
                    ...p.departments,
                    dept
                ]
            }));
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            menuItems: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$utils$2f$menus$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MDMenuItems"],
            userRole: "MD",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                className: "p-12 text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-600",
                    children: "Loading task…"
                }, void 0, false, {
                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                    lineNumber: 195,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                lineNumber: 194,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
            lineNumber: 193,
            columnNumber: 7
        }, this);
    }
    if (!task) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            menuItems: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$utils$2f$menus$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MDMenuItems"],
            userRole: "MD",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                className: "p-12 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-extrabold",
                        style: {
                            color: "var(--primary-blue)"
                        },
                        children: "Task not found"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                        lineNumber: 205,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/md-dashboard/tasks",
                        className: "mt-4 inline-block px-6 py-3 rounded-2xl font-semibold text-white",
                        style: {
                            backgroundColor: "var(--primary-blue)"
                        },
                        children: "Back to Tasks"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                        lineNumber: 208,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                lineNumber: 204,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
            lineNumber: 203,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        menuItems: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$utils$2f$menus$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MDMenuItems"],
        userRole: "MD",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-4xl mx-auto space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                    className: "overflow-hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 md:p-8",
                        style: {
                            background: "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: `/md-dashboard/task/${taskId}`,
                                className: "text-sm text-gray-600 hover:text-gray-800 mb-4 inline-block",
                                children: "← Back to Task"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                lineNumber: 221,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-extrabold",
                                style: {
                                    color: "var(--primary-blue)"
                                },
                                children: "Edit Task"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                lineNumber: 224,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-600 mt-1",
                                children: "Update task details and assignees."
                            }, void 0, false, {
                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                lineNumber: 227,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                        lineNumber: 220,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                    lineNumber: 219,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                        className: "p-6 space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-gray-700 mb-2",
                                        children: "Title *"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                        lineNumber: 234,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        required: true,
                                        className: "w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100",
                                        value: formData.title,
                                        onChange: (e)=>setFormData((p)=>({
                                                    ...p,
                                                    title: e.target.value
                                                }))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                        lineNumber: 235,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                lineNumber: 233,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-gray-700 mb-2",
                                        children: "Description"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                        lineNumber: 245,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        rows: 4,
                                        className: "w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100",
                                        value: formData.description,
                                        onChange: (e)=>setFormData((p)=>({
                                                    ...p,
                                                    description: e.target.value
                                                }))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                        lineNumber: 246,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                lineNumber: 244,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-gray-700 mb-2",
                                                children: "Department"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                lineNumber: 256,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                className: "w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-100",
                                                value: formData.department,
                                                onChange: (e)=>setFormData((p)=>({
                                                            ...p,
                                                            department: e.target.value
                                                        })),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "— Select —"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                        lineNumber: 262,
                                                        columnNumber: 19
                                                    }, this),
                                                    departments.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: d,
                                                            children: d
                                                        }, d, false, {
                                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                            lineNumber: 264,
                                                            columnNumber: 21
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                lineNumber: 257,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                        lineNumber: 255,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-gray-700 mb-2",
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                lineNumber: 269,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                className: "w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-100",
                                                value: formData.status,
                                                onChange: (e)=>setFormData((p)=>({
                                                            ...p,
                                                            status: e.target.value
                                                        })),
                                                children: [
                                                    "PENDING",
                                                    "IN_PROGRESS",
                                                    "ON_HOLD",
                                                    "COMPLETED",
                                                    "CANCELLED"
                                                ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: s,
                                                        children: s.replace("_", " ")
                                                    }, s, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                        lineNumber: 276,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                lineNumber: 270,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                        lineNumber: 268,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-gray-700 mb-2",
                                                children: "Priority"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                lineNumber: 281,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                className: "w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-100",
                                                value: formData.priority,
                                                onChange: (e)=>setFormData((p)=>({
                                                            ...p,
                                                            priority: e.target.value
                                                        })),
                                                children: [
                                                    "LOW",
                                                    "MEDIUM",
                                                    "HIGH",
                                                    "CRITICAL"
                                                ].map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: p,
                                                        children: p
                                                    }, p, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                        lineNumber: 288,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                lineNumber: 282,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                        lineNumber: 280,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-gray-700 mb-2",
                                                children: "Type"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                lineNumber: 293,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                className: "w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-100",
                                                value: formData.type,
                                                onChange: (e)=>setFormData((p)=>({
                                                            ...p,
                                                            type: e.target.value
                                                        })),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "TASK",
                                                        children: "Task"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                        lineNumber: 299,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "JOB",
                                                        children: "Job"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                        lineNumber: 300,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                lineNumber: 294,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                        lineNumber: 292,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-gray-700 mb-2",
                                                children: "Start Date"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                lineNumber: 304,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "date",
                                                className: "w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100",
                                                value: formData.startDate,
                                                onChange: (e)=>setFormData((p)=>({
                                                            ...p,
                                                            startDate: e.target.value
                                                        }))
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                lineNumber: 305,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                        lineNumber: 303,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-gray-700 mb-2",
                                                children: "Due Date"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                lineNumber: 313,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "date",
                                                className: "w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100",
                                                value: formData.dueDate,
                                                onChange: (e)=>setFormData((p)=>({
                                                            ...p,
                                                            dueDate: e.target.value
                                                        }))
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                lineNumber: 314,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                        lineNumber: 312,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                lineNumber: 254,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-gray-700 mb-2",
                                        children: "Assignees (Departments or Users)"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                        lineNumber: 324,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500 mb-3",
                                        children: "Select departments to assign all users in that department, or select individual HODs/Staff."
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                        lineNumber: 325,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-medium text-gray-700 mb-2",
                                                        children: "Departments"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                        lineNumber: 329,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap gap-2",
                                                        children: departments.map((d)=>{
                                                            const active = formData.departments.includes(d);
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>toggleDepartment(d),
                                                                className: `px-3 py-2 rounded-xl text-sm font-semibold border transition ${active ? "text-white" : "bg-white hover:bg-gray-50"}`,
                                                                style: {
                                                                    backgroundColor: active ? "var(--primary-blue)" : undefined,
                                                                    borderColor: active ? "transparent" : "rgba(0,0,0,0.08)"
                                                                },
                                                                children: [
                                                                    d,
                                                                    " ",
                                                                    active ? "✓" : ""
                                                                ]
                                                            }, d, true, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                                lineNumber: 334,
                                                                columnNumber: 25
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                        lineNumber: 330,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                lineNumber: 328,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-medium text-gray-700 mb-2",
                                                        children: "HODs"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                        lineNumber: 349,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap gap-2",
                                                        children: hodUsers.map((u)=>{
                                                            const active = formData.hods.includes(u.id);
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>toggleUser(u.id, "hods"),
                                                                className: `px-3 py-2 rounded-xl text-sm font-semibold border transition ${active ? "bg-blue-50" : "bg-white hover:bg-gray-50"}`,
                                                                style: {
                                                                    borderColor: active ? "rgba(44, 75, 155, 0.35)" : "rgba(0,0,0,0.08)"
                                                                },
                                                                children: [
                                                                    u.name || u.email,
                                                                    " ",
                                                                    active ? "✓" : ""
                                                                ]
                                                            }, u.id, true, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                                lineNumber: 354,
                                                                columnNumber: 25
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                        lineNumber: 350,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                lineNumber: 348,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-medium text-gray-700 mb-2",
                                                        children: "Staff"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                        lineNumber: 369,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap gap-2 max-h-40 overflow-y-auto",
                                                        children: staffUsers.map((u)=>{
                                                            const active = formData.staff.includes(u.id);
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>toggleUser(u.id, "staff"),
                                                                className: `px-3 py-2 rounded-xl text-sm font-semibold border transition ${active ? "bg-emerald-50" : "bg-white hover:bg-gray-50"}`,
                                                                style: {
                                                                    borderColor: active ? "rgba(16,185,129,0.25)" : "rgba(0,0,0,0.08)"
                                                                },
                                                                children: [
                                                                    u.name || u.email,
                                                                    " ",
                                                                    active ? "✓" : ""
                                                                ]
                                                            }, u.id, true, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                                lineNumber: 374,
                                                                columnNumber: 25
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                        lineNumber: 370,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                                lineNumber: 368,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                        lineNumber: 327,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                lineNumber: 323,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3 pt-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: saving,
                                        className: "px-6 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition disabled:opacity-70",
                                        style: {
                                            backgroundColor: "var(--primary-blue)"
                                        },
                                        children: saving ? "Saving…" : "Save Changes"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                        lineNumber: 391,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/md-dashboard/task/${taskId}`,
                                        className: "px-6 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition",
                                        style: {
                                            borderColor: "rgba(44, 75, 155, 0.35)",
                                            color: "var(--primary-blue)"
                                        },
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                        lineNumber: 399,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                                lineNumber: 390,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                        lineNumber: 232,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
                    lineNumber: 231,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
            lineNumber: 218,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDEditTask.jsx",
        lineNumber: 217,
        columnNumber: 5
    }, this);
}
_s(MDEditTask, "xV2c4YbAwliHXslTSVrdLJu3Os8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c2 = MDEditTask;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "Pill");
__turbopack_context__.k.register(_c2, "MDEditTask");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_calaya-taskly_src_baa59ae5._.js.map
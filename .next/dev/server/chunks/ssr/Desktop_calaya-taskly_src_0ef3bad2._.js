module.exports = [
"[project]/Desktop/calaya-taskly/src/components/Layout.jsx [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/Desktop/calaya-taskly/src/components/Layout.jsx'\n\nExpected '</', got ')'");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[project]/Desktop/calaya-taskly/src/utils/menus.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/components/Layout.jsx [app-ssr] (ecmascript)");
"use client";
;
;
const HODMenuItems = [
    {
        label: "Dashboard",
        path: "/hod-dashboard",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DashboardIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 18,
            columnNumber: 55
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Overview"
    },
    {
        label: "Department Tasks",
        path: "/hod-dashboard/tasks",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TaskIcon"], {}, void 0, false, {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TaskIcon"], {}, void 0, false, {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DocumentIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 21,
            columnNumber: 65
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Documents & Reports"
    },
    {
        label: "Daily Reports",
        path: "/hod-dashboard/reports",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReportIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 22,
            columnNumber: 67
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Documents & Reports"
    },
    {
        label: "Meetings/Events",
        path: "/hod-dashboard/events",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CalendarIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 23,
            columnNumber: 68
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Calendar"
    },
    {
        label: "Tenders",
        path: "/hod-dashboard/tenders",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TenderIcon"], {}, void 0, false, {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DocumentIcon"], {}, void 0, false, {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnnouncementIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 26,
            columnNumber: 73
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Communications"
    },
    {
        label: "Approvals",
        path: "/hod-dashboard/approvals",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApprovalIcon"], {}, void 0, false, {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertIcon"], {}, void 0, false, {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BellIcon"], {}, void 0, false, {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserIcon"], {}, void 0, false, {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DashboardIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 34,
            columnNumber: 54
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Overview"
    },
    {
        label: "Tasks (All)",
        path: "/md-dashboard/tasks",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TaskIcon"], {}, void 0, false, {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TaskIcon"], {}, void 0, false, {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DocumentIcon"], {}, void 0, false, {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReportIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 38,
            columnNumber: 66
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Documents & Reports"
    },
    {
        label: "Meetings/Events",
        path: "/md-dashboard/events",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CalendarIcon"], {}, void 0, false, {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DocumentIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 40,
            columnNumber: 60
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Tenders"
    },
    {
        label: "Tender Documents",
        path: "/md-dashboard/tender-documents",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DocumentIcon"], {}, void 0, false, {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnnouncementIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 42,
            columnNumber: 72
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Communications"
    },
    {
        label: "Approvals",
        path: "/md-dashboard/approvals",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApprovalIcon"], {}, void 0, false, {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertIcon"], {}, void 0, false, {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BellIcon"], {}, void 0, false, {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserIcon"], {}, void 0, false, {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DashboardIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 50,
            columnNumber: 57
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Overview"
    },
    {
        label: "My Tasks",
        path: "/staff-dashboard/tasks",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TaskIcon"], {}, void 0, false, {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReportIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 52,
            columnNumber: 77
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Documents & Reports"
    },
    {
        label: "Documents",
        path: "/staff-dashboard/documents",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DocumentIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 53,
            columnNumber: 67
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Documents & Reports"
    },
    {
        label: "Daily Reports",
        path: "/staff-dashboard/daily-reports",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReportIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 54,
            columnNumber: 75
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Documents & Reports"
    },
    {
        label: "Meetings/Events",
        path: "/staff-dashboard/events",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CalendarIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 55,
            columnNumber: 70
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Calendar"
    },
    {
        label: "Tenders",
        path: "/staff-dashboard/tenders",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TenderIcon"], {}, void 0, false, {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DocumentIcon"], {}, void 0, false, {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnnouncementIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 58,
            columnNumber: 75
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Communications"
    },
    {
        label: "Notifications",
        path: "/staff-dashboard/notifications",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BellIcon"], {}, void 0, false, {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserIcon"], {}, void 0, false, {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DashboardIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 64,
            columnNumber: 61
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Overview"
    },
    {
        label: "Upload Daily Report",
        path: "/secretary-dashboard/upload-report",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReportIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 65,
            columnNumber: 85
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Documents & Reports"
    },
    {
        label: "Daily Reports Archive",
        path: "/secretary-dashboard/reports-archive",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReportIcon"], {}, void 0, false, {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DocumentIcon"], {}, void 0, false, {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DocumentIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 68,
            columnNumber: 71
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Documents & Reports"
    },
    {
        label: "Meetings/Events",
        path: "/secretary-dashboard/events",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CalendarIcon"], {}, void 0, false, {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TenderIcon"], {}, void 0, false, {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnnouncementIcon"], {}, void 0, false, {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BellIcon"], {}, void 0, false, {
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
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserIcon"], {}, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/utils/menus.jsx",
            lineNumber: 73,
            columnNumber: 67
        }, ("TURBOPACK compile-time value", void 0)),
        group: "Account"
    }
];
}),
"[project]/Desktop/calaya-taskly/src/lib/toast.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toast",
    ()=>toast
]);
/**
 * Toast notifications via Sonner.
 * Use instead of alert() for consistent UX.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
;
const toast = {
    success: (message)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(message),
    error: (message)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(message),
    warning: (message)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].warning(message),
    info: (message)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info(message),
    /** Generic toast (default style) */ message: (message)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"])(message)
};
}),
"[project]/Desktop/calaya-taskly/src/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchWithAuth",
    ()=>fetchWithAuth,
    "getAuthToken",
    ()=>getToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$auth$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/lib/auth-config.ts [app-ssr] (ecmascript)");
;
function getToken() {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
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
}),
"[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MDTaskDetail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// pages/dashboards/MD/MDTaskDetail.jsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/components/Layout.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$utils$2f$menus$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/utils/menus.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$toast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/lib/toast.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/lib/api.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
/* ---------- UI helpers ---------- */ const Card = ({ className = "", children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
        lineNumber: 13,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const SectionTitle = ({ title, subtitle, action })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-start justify-between gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg md:text-xl font-extrabold tracking-tight",
                        style: {
                            color: "var(--primary-blue)"
                        },
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                        lineNumber: 19,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    subtitle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-500 mt-1",
                        children: subtitle
                    }, void 0, false, {
                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                        lineNumber: 22,
                        columnNumber: 19
                    }, ("TURBOPACK compile-time value", void 0)) : null
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                lineNumber: 18,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            action
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
        lineNumber: 17,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const Pill = ({ children, tone = "default" })=>{
    const styles = tone === "danger" ? "bg-red-50 text-red-700 ring-red-100" : tone === "success" ? "bg-emerald-50 text-emerald-700 ring-emerald-100" : tone === "warn" ? "bg-amber-50 text-amber-800 ring-amber-100" : tone === "info" ? "bg-blue-50 text-blue-700 ring-blue-100" : "bg-gray-50 text-gray-700 ring-gray-100";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
        lineNumber: 40,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const taskCreatedByLabel = (task)=>task?.createdBy?.role || task?.createdBy?.name || "—";
const taskAssigneeLabel = (task)=>{
    const a = task?.assignments;
    if (!a?.length) return "Unassigned";
    if (a.length === 1) return a[0].user?.name || a[0].user?.email || "—";
    return `${a.length} assignees`;
};
function MDTaskDetail() {
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])() || {};
    const taskId = params.taskId;
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [taskData, setTaskData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("overview");
    const fetchTask = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!taskId) return;
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchWithAuth"])(`/api/tasks/${taskId}`);
            if (res.ok) {
                const data = await res.json();
                setTaskData(data);
            } else {
                setTaskData(null);
            }
        } catch  {
            setTaskData(null);
        } finally{
            setLoading(false);
        }
    }, [
        taskId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchTask();
    }, [
        fetchTask
    ]);
    const handleStatusChange = async (newStatus)=>{
        if (!taskData) return;
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchWithAuth"])(`/api/tasks/${taskId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: newStatus
                })
            });
            if (res.ok) {
                setTaskData((p)=>({
                        ...p,
                        status: newStatus
                    }));
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$toast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(`Task status changed to ${newStatus}`);
            } else {
                const err = await res.json().catch(()=>({}));
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$toast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(err.error || "Failed to update status");
            }
        } catch  {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$toast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Failed to update status");
        }
    };
    const getStatusTone = (status)=>{
        switch(status){
            case 'COMPLETED':
                return 'success';
            case 'IN_PROGRESS':
                return 'info';
            case 'ON_HOLD':
                return 'warn';
            case 'CANCELLED':
                return 'danger';
            default:
                return 'default';
        }
    };
    const getPriorityTone = (priority)=>{
        switch(priority){
            case 'CRITICAL':
                return 'danger';
            case 'HIGH':
                return 'warn';
            case 'MEDIUM':
                return 'info';
            default:
                return 'success';
        }
    };
    const fmtDate = (iso)=>iso ? new Date(iso).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric"
        }) : "Not set";
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            menuItems: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$utils$2f$menus$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MDMenuItems"],
            userRole: "MD",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                    className: "p-12 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-6xl mb-4",
                            children: "📋"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                            lineNumber: 132,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600",
                            children: "Loading task…"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                            lineNumber: 133,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                    lineNumber: 131,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                lineNumber: 130,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
            lineNumber: 129,
            columnNumber: 7
        }, this);
    }
    if (!taskData) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            menuItems: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$utils$2f$menus$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MDMenuItems"],
            userRole: "MD",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                    className: "p-12 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-6xl mb-4",
                            children: "📋"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                            lineNumber: 145,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-extrabold",
                            style: {
                                color: "var(--primary-blue)"
                            },
                            children: "Task not found"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                            lineNumber: 146,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600 mt-2",
                            children: "No task data available. Create tasks from the tasks list or select an existing task."
                        }, void 0, false, {
                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                            lineNumber: 149,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>router.push("/md-dashboard/tasks"),
                            className: "mt-6 px-6 py-3 rounded-2xl font-semibold text-white transition",
                            style: {
                                backgroundColor: "var(--primary-blue)"
                            },
                            children: "Back to Tasks"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                            lineNumber: 152,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                    lineNumber: 144,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                lineNumber: 143,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
            lineNumber: 142,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        menuItems: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$utils$2f$menus$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MDMenuItems"],
        userRole: "MD",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                    className: "overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 md:p-8",
                            style: {
                                background: "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>router.push('/md-dashboard/tasks'),
                                                className: "flex items-center text-sm text-gray-600 hover:text-gray-800 mb-4",
                                                children: "← Back to Tasks"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                lineNumber: 179,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap items-center gap-2 mb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                        tone: getStatusTone(taskData.status),
                                                        children: taskData.status.replace("_", " ")
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                        lineNumber: 187,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                        tone: getPriorityTone(taskData.priority),
                                                        children: taskData.priority
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                        lineNumber: 188,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                        tone: "info",
                                                        children: taskData.type
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                        lineNumber: 189,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                        children: taskData.department || "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                        lineNumber: 190,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                lineNumber: 186,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-2xl md:text-3xl font-extrabold tracking-tight",
                                                style: {
                                                    color: "var(--primary-blue)"
                                                },
                                                children: taskData.title
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                lineNumber: 193,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-600 mt-2 max-w-2xl",
                                                children: [
                                                    "ID: ",
                                                    taskData.id,
                                                    " • Created by ",
                                                    taskCreatedByLabel(taskData),
                                                    " on ",
                                                    fmtDate(taskData.createdAt)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                lineNumber: 196,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                        lineNumber: 178,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col sm:flex-row gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: `/md-dashboard/edit-task/${taskId}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition",
                                                    style: {
                                                        borderColor: "rgba(44, 75, 155, 0.35)",
                                                        color: "var(--primary-blue)"
                                                    },
                                                    children: "Edit"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                    lineNumber: 203,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                lineNumber: 202,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "px-5 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition",
                                                style: {
                                                    backgroundColor: "var(--accent-red)"
                                                },
                                                children: "Export"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                lineNumber: 210,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                        lineNumber: 201,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                lineNumber: 177,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                            lineNumber: 170,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white border-t border-gray-200/70",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap",
                                children: [
                                    {
                                        id: "overview",
                                        label: "Overview"
                                    },
                                    {
                                        id: "updates",
                                        label: "Updates & Comments"
                                    }
                                ].map((t)=>{
                                    const active = activeTab === t.id;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setActiveTab(t.id),
                                        className: `px-6 py-4 text-sm font-semibold transition border-b-2 ${active ? "text-gray-900" : "text-gray-500 hover:text-gray-700"}`,
                                        style: {
                                            borderBottomColor: active ? "var(--primary-blue)" : "transparent"
                                        },
                                        children: t.label
                                    }, t.id, false, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                        lineNumber: 229,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                lineNumber: 222,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                            lineNumber: 221,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, this),
                activeTab === 'overview' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-2 space-y-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                                className: "p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                        title: "Task Details"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                        lineNumber: 252,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-6 space-y-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-extrabold mb-3",
                                                        style: {
                                                            color: "var(--primary-blue)"
                                                        },
                                                        children: "Description"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                        lineNumber: 257,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-700 whitespace-pre-line leading-relaxed",
                                                        children: taskData.description || "No description provided."
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                        lineNumber: 260,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                lineNumber: 256,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 md:grid-cols-4 gap-4",
                                                children: [
                                                    {
                                                        label: "Estimated Hours",
                                                        value: taskData.estimatedHours ?? "—",
                                                        icon: "⏱️"
                                                    },
                                                    {
                                                        label: "Assignees",
                                                        value: taskData.assignments?.length ?? 0,
                                                        icon: "👥"
                                                    }
                                                ].map((stat, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "rounded-2xl border border-gray-200/70 p-4 hover:bg-gray-50 transition",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-gray-500",
                                                                        children: stat.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                                        lineNumber: 273,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-lg",
                                                                        children: stat.icon
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                                        lineNumber: 274,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                                lineNumber: 272,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-2xl font-extrabold mt-2",
                                                                style: {
                                                                    color: "var(--primary-blue)"
                                                                },
                                                                children: stat.value
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                                lineNumber: 276,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, index, true, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                        lineNumber: 271,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                lineNumber: 266,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                        lineNumber: 254,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                lineNumber: 251,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                            lineNumber: 250,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-1 space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                                    className: "p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                            title: "Task Information"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                            lineNumber: 289,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-6 space-y-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                                    label: "Department",
                                                    value: taskData.department || "—"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                    lineNumber: 292,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-medium text-gray-500 mb-2",
                                                            children: "Created By"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                            lineNumber: 295,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold",
                                                                    style: {
                                                                        backgroundColor: "var(--secondary-blue)"
                                                                    },
                                                                    children: taskCreatedByLabel(taskData).charAt(0)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                                    lineNumber: 297,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "font-extrabold text-gray-900",
                                                                            children: taskCreatedByLabel(taskData)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                                            lineNumber: 304,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs text-gray-500",
                                                                            children: fmtDate(taskData.createdAt)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                                            lineNumber: 305,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                                    lineNumber: 303,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                            lineNumber: 296,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                    lineNumber: 294,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-medium text-gray-500 mb-2",
                                                            children: "Assigned To"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                            lineNumber: 311,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold",
                                                                    style: {
                                                                        backgroundColor: "var(--secondary-blue)"
                                                                    },
                                                                    children: taskAssigneeLabel(taskData).charAt(0)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                                    lineNumber: 313,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-extrabold text-gray-900",
                                                                        children: taskAssigneeLabel(taskData)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                                        lineNumber: 320,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                                    lineNumber: 319,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                            lineNumber: 312,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                    lineNumber: 310,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                                    label: "Start Date",
                                                    value: fmtDate(taskData.startDate)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                    lineNumber: 325,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                                    label: "Due Date",
                                                    value: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `font-extrabold ${taskData.dueDate && new Date(taskData.dueDate) < new Date() && taskData.status !== "COMPLETED" ? "text-red-600" : ""}`,
                                                        children: [
                                                            fmtDate(taskData.dueDate),
                                                            taskData.dueDate && new Date(taskData.dueDate) < new Date() && taskData.status !== "COMPLETED" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "ml-2 text-xs",
                                                                children: "(Overdue)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                                lineNumber: 341,
                                                                columnNumber: 29
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                        lineNumber: 330,
                                                        columnNumber: 23
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                    lineNumber: 327,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                                    label: "Visibility",
                                                    value: taskData.visibility || "—"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                    lineNumber: 347,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                            lineNumber: 291,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                    lineNumber: 288,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                                    className: "p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                            title: "Update Status"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                            lineNumber: 353,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-6 grid grid-cols-2 gap-2",
                                            children: [
                                                "PENDING",
                                                "IN_PROGRESS",
                                                "ON_HOLD",
                                                "COMPLETED",
                                                "CANCELLED"
                                            ].map((status)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: `px-3 py-2.5 rounded-xl text-sm font-semibold transition active:scale-[0.99] ${taskData.status === status ? "text-white" : "border bg-white hover:bg-gray-50"}`,
                                                    style: {
                                                        backgroundColor: taskData.status === status ? "var(--secondary-blue)" : undefined,
                                                        borderColor: taskData.status === status ? "transparent" : "rgba(0,0,0,0.08)"
                                                    },
                                                    onClick: ()=>handleStatusChange(status),
                                                    children: status.replace("_", " ")
                                                }, status, false, {
                                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                    lineNumber: 357,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                            lineNumber: 355,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                    lineNumber: 352,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                            lineNumber: 287,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                    lineNumber: 248,
                    columnNumber: 11
                }, this),
                activeTab === "updates" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                    className: "p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                            title: "Updates & Comments",
                            subtitle: "Commenting coming soon"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                            lineNumber: 379,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 p-8 text-center text-gray-500",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Add comments and updates to tasks (coming soon)."
                            }, void 0, false, {
                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                lineNumber: 381,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                            lineNumber: 380,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                    lineNumber: 378,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                    className: "p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                            title: "Quick Actions",
                            subtitle: "Common task operations"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                            lineNumber: 388,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 grid grid-cols-2 md:grid-cols-4 gap-4",
                            children: [
                                {
                                    icon: "📋",
                                    label: "Create Sub-task",
                                    color: "var(--primary-blue)"
                                },
                                {
                                    icon: "🔄",
                                    label: "Reassign Task",
                                    color: "var(--secondary-blue)"
                                },
                                {
                                    icon: "📅",
                                    label: "Extend Deadline",
                                    color: "#10B981"
                                },
                                {
                                    icon: "📊",
                                    label: "View Analytics",
                                    color: "#8B5CF6"
                                }
                            ].map((action, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "group p-5 rounded-2xl border border-gray-200/70 hover:-translate-y-0.5 transition-all text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-12 h-12 mx-auto rounded-2xl flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition",
                                            style: {
                                                backgroundColor: `${action.color}18`
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: action.color
                                                },
                                                children: action.icon
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                                lineNumber: 405,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                            lineNumber: 401,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-extrabold text-sm",
                                            style: {
                                                color: action.color
                                            },
                                            children: action.label
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                            lineNumber: 407,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                                    lineNumber: 397,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                            lineNumber: 390,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                    lineNumber: 387,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
            lineNumber: 167,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
        lineNumber: 166,
        columnNumber: 5
    }, this);
}
// Helper component for info rows
const InfoRow = ({ label, value })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-sm font-medium text-gray-500 mb-1",
                children: label
            }, void 0, false, {
                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                lineNumber: 422,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-extrabold text-gray-900",
                children: value
            }, void 0, false, {
                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
                lineNumber: 423,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MD/MDTaskDetail.jsx",
        lineNumber: 421,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
}),
];

//# sourceMappingURL=Desktop_calaya-taskly_src_0ef3bad2._.js.map
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
"[project]/Desktop/calaya-taskly/src/lib/icons.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/react/dist/esm/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/react/dist/esm/HugeiconsIcon.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Add01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Add01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Add01Icon.js [app-ssr] (ecmascript) <export default as Add01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Archive01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Archive01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Archive01Icon.js [app-ssr] (ecmascript) <export default as Archive01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ArrowDown01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/ArrowDown01Icon.js [app-ssr] (ecmascript) <export default as ArrowDown01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ArrowRight01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/ArrowRight01Icon.js [app-ssr] (ecmascript) <export default as ArrowRight01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ArrowUp01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/ArrowUp01Icon.js [app-ssr] (ecmascript) <export default as ArrowUp01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Attachment01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Attachment01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Attachment01Icon.js [app-ssr] (ecmascript) <export default as Attachment01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Book01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Book01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Book01Icon.js [app-ssr] (ecmascript) <export default as Book01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Bookmark01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Bookmark01Icon.js [app-ssr] (ecmascript) <export default as Bookmark01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Building06Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building06Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Building06Icon.js [app-ssr] (ecmascript) <export default as Building06Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$BulbIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BulbIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/BulbIcon.js [app-ssr] (ecmascript) <export default as BulbIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Calendar01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Calendar01Icon.js [app-ssr] (ecmascript) <export default as Calendar01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Call02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Call02Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Call02Icon.js [app-ssr] (ecmascript) <export default as Call02Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Cancel01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Cancel01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Cancel01Icon.js [app-ssr] (ecmascript) <export default as Cancel01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CancelCircleIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CancelCircleIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/CancelCircleIcon.js [app-ssr] (ecmascript) <export default as CancelCircleIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ChartHistogramIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartHistogramIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/ChartHistogramIcon.js [app-ssr] (ecmascript) <export default as ChartHistogramIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CheckmarkBadge01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckmarkBadge01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/CheckmarkBadge01Icon.js [app-ssr] (ecmascript) <export default as CheckmarkBadge01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CheckmarkCircle02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckmarkCircle02Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/CheckmarkCircle02Icon.js [app-ssr] (ecmascript) <export default as CheckmarkCircle02Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$DashboardSquare02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DashboardSquare02Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/DashboardSquare02Icon.js [app-ssr] (ecmascript) <export default as DashboardSquare02Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Delete02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Delete02Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Delete02Icon.js [app-ssr] (ecmascript) <export default as Delete02Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Download01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Download01Icon.js [app-ssr] (ecmascript) <export default as Download01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$File02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__File02Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/File02Icon.js [app-ssr] (ecmascript) <export default as File02Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$FileUploadIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileUploadIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/FileUploadIcon.js [app-ssr] (ecmascript) <export default as FileUploadIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$FilterIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FilterIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/FilterIcon.js [app-ssr] (ecmascript) <export default as FilterIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Folder01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Folder01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Folder01Icon.js [app-ssr] (ecmascript) <export default as Folder01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Globe02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe02Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Globe02Icon.js [app-ssr] (ecmascript) <export default as Globe02Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Image01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Image01Icon.js [app-ssr] (ecmascript) <export default as Image01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$InformationCircleIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InformationCircleIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/InformationCircleIcon.js [app-ssr] (ecmascript) <export default as InformationCircleIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Link01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Link01Icon.js [app-ssr] (ecmascript) <export default as Link01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Location01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Location01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Location01Icon.js [app-ssr] (ecmascript) <export default as Location01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Mail01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Mail01Icon.js [app-ssr] (ecmascript) <export default as Mail01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Megaphone01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Megaphone01Icon.js [app-ssr] (ecmascript) <export default as Megaphone01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Menu01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Menu01Icon.js [app-ssr] (ecmascript) <export default as Menu01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Message01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Message01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Message01Icon.js [app-ssr] (ecmascript) <export default as Message01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$MoneyBag01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoneyBag01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/MoneyBag01Icon.js [app-ssr] (ecmascript) <export default as MoneyBag01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Notification02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Notification02Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Notification02Icon.js [app-ssr] (ecmascript) <export default as Notification02Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$PencilEdit02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PencilEdit02Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/PencilEdit02Icon.js [app-ssr] (ecmascript) <export default as PencilEdit02Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Refresh01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Refresh01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Refresh01Icon.js [app-ssr] (ecmascript) <export default as Refresh01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Search01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Search01Icon.js [app-ssr] (ecmascript) <export default as Search01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Settings01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Settings01Icon.js [app-ssr] (ecmascript) <export default as Settings01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Share01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Share01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Share01Icon.js [app-ssr] (ecmascript) <export default as Share01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$SquareLock02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SquareLock02Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/SquareLock02Icon.js [app-ssr] (ecmascript) <export default as SquareLock02Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Target01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Target01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Target01Icon.js [app-ssr] (ecmascript) <export default as Target01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$TaskDone01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TaskDone01Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/TaskDone01Icon.js [app-ssr] (ecmascript) <export default as TaskDone01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Time04Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Time04Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/Time04Icon.js [app-ssr] (ecmascript) <export default as Time04Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$User02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User02Icon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/User02Icon.js [app-ssr] (ecmascript) <export default as User02Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$UserGroupIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserGroupIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@hugeicons/core-free-icons/dist/esm/UserGroupIcon.js [app-ssr] (ecmascript) <export default as UserGroupIcon>");
"use client";
;
;
;
const SIZE = 20;
const withIcon = (IconObj)=>(props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HugeiconsIcon"], {
            icon: IconObj,
            size: SIZE,
            className: "w-5 h-5 shrink-0",
            ...props
        }, void 0, false, {
            fileName: "[project]/Desktop/calaya-taskly/src/lib/icons.jsx",
            lineNumber: 56,
            columnNumber: 3
        }, ("TURBOPACK compile-time value", void 0));
const DashboardIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$DashboardSquare02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DashboardSquare02Icon$3e$__["DashboardSquare02Icon"]);
const HomeIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$DashboardSquare02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DashboardSquare02Icon$3e$__["DashboardSquare02Icon"]);
const TaskIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$TaskDone01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TaskDone01Icon$3e$__["TaskDone01Icon"]);
const DocumentIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$File02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__File02Icon$3e$__["File02Icon"]);
const TenderIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$File02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__File02Icon$3e$__["File02Icon"]);
const FileIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$File02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__File02Icon$3e$__["File02Icon"]);
const ReportIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ChartHistogramIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartHistogramIcon$3e$__["ChartHistogramIcon"]);
const BarChartIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ChartHistogramIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartHistogramIcon$3e$__["ChartHistogramIcon"]);
const ChartIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ChartHistogramIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartHistogramIcon$3e$__["ChartHistogramIcon"]);
const AnalyticsIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ChartHistogramIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartHistogramIcon$3e$__["ChartHistogramIcon"]);
const CalendarIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Calendar01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar01Icon$3e$__["Calendar01Icon"]);
const CalendarTodayIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Calendar01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar01Icon$3e$__["Calendar01Icon"]);
const AnnouncementIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Megaphone01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone01Icon$3e$__["Megaphone01Icon"]);
const MegaphoneIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Megaphone01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone01Icon$3e$__["Megaphone01Icon"]);
const ApprovalIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CheckmarkCircle02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckmarkCircle02Icon$3e$__["CheckmarkCircle02Icon"]);
const CheckCircleIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CheckmarkCircle02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckmarkCircle02Icon$3e$__["CheckmarkCircle02Icon"]);
const AlertIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CancelCircleIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CancelCircleIcon$3e$__["CancelCircleIcon"]);
const AlertTriangleIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CancelCircleIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CancelCircleIcon$3e$__["CancelCircleIcon"]);
const WarningIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CancelCircleIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CancelCircleIcon$3e$__["CancelCircleIcon"]);
const EmergencyIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CancelCircleIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CancelCircleIcon$3e$__["CancelCircleIcon"]);
const HazardIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CancelCircleIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CancelCircleIcon$3e$__["CancelCircleIcon"]);
const BellIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Notification02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Notification02Icon$3e$__["Notification02Icon"]);
const NotificationPreferencesIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Notification02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Notification02Icon$3e$__["Notification02Icon"]);
const UserIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$User02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User02Icon$3e$__["User02Icon"]);
const UsersIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$UserGroupIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserGroupIcon$3e$__["UserGroupIcon"]);
const TeamIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$UserGroupIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserGroupIcon$3e$__["UserGroupIcon"]);
const BuildingIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Building06Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building06Icon$3e$__["Building06Icon"]);
const DepartmentIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Building06Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building06Icon$3e$__["Building06Icon"]);
const HierarchyIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Building06Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building06Icon$3e$__["Building06Icon"]);
const PlusIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Add01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Add01Icon$3e$__["Add01Icon"]);
const AddIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Add01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Add01Icon$3e$__["Add01Icon"]);
const SearchIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Search01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search01Icon$3e$__["Search01Icon"]);
const FilterIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$FilterIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FilterIcon$3e$__["FilterIcon"]);
const DownloadIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Download01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download01Icon$3e$__["Download01Icon"]);
const UploadIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$FileUploadIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileUploadIcon$3e$__["FileUploadIcon"]);
const FileUploadIconComponent = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$FileUploadIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileUploadIcon$3e$__["FileUploadIcon"]);
const DeleteIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Delete02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Delete02Icon$3e$__["Delete02Icon"]);
const EditIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$PencilEdit02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PencilEdit02Icon$3e$__["PencilEdit02Icon"]);
const SaveIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CheckmarkCircle02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckmarkCircle02Icon$3e$__["CheckmarkCircle02Icon"]);
const CancelIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Cancel01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Cancel01Icon$3e$__["Cancel01Icon"]);
const ChevronRightIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ArrowRight01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight01Icon$3e$__["ArrowRight01Icon"]);
const ChevronDownIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ArrowDown01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown01Icon$3e$__["ArrowDown01Icon"]);
const ChevronUpIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ArrowUp01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp01Icon$3e$__["ArrowUp01Icon"]);
const EmailIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Mail01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail01Icon$3e$__["Mail01Icon"]);
const PhoneIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Call02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Call02Icon$3e$__["Call02Icon"]);
const SettingsIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Settings01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings01Icon$3e$__["Settings01Icon"]);
const LocationIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Location01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Location01Icon$3e$__["Location01Icon"]);
const BadgeIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CheckmarkBadge01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckmarkBadge01Icon$3e$__["CheckmarkBadge01Icon"]);
const MoneyIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$MoneyBag01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoneyBag01Icon$3e$__["MoneyBag01Icon"]);
const LockIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$SquareLock02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SquareLock02Icon$3e$__["SquareLock02Icon"]);
const ClockIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Time04Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Time04Icon$3e$__["Time04Icon"]);
const MenuIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Menu01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu01Icon$3e$__["Menu01Icon"]);
const CloseMenuIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Cancel01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Cancel01Icon$3e$__["Cancel01Icon"]);
const ActivityIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ChartHistogramIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartHistogramIcon$3e$__["ChartHistogramIcon"]);
const LinkIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Link01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link01Icon$3e$__["Link01Icon"]);
const ShareIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Share01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Share01Icon$3e$__["Share01Icon"]);
const RefreshIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Refresh01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Refresh01Icon$3e$__["Refresh01Icon"]);
const TargetIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Target01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Target01Icon$3e$__["Target01Icon"]);
const ImageIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Image01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image01Icon$3e$__["Image01Icon"]);
const ArchiveIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Archive01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Archive01Icon$3e$__["Archive01Icon"]);
const AttachmentIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Attachment01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Attachment01Icon$3e$__["Attachment01Icon"]);
const GlobeIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Globe02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe02Icon$3e$__["Globe02Icon"]);
const InfoIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$InformationCircleIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InformationCircleIcon$3e$__["InformationCircleIcon"]);
const LightbulbIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$BulbIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BulbIcon$3e$__["BulbIcon"]);
const MessageIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Message01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Message01Icon$3e$__["Message01Icon"]);
const FolderIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Folder01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Folder01Icon$3e$__["Folder01Icon"]);
const BookmarkIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Bookmark01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark01Icon$3e$__["Bookmark01Icon"]);
const BookIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Book01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Book01Icon$3e$__["Book01Icon"]);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
        className: className
    }, void 0, false, {
        fileName: "[project]/Desktop/calaya-taskly/src/lib/icons.jsx",
        lineNumber: 191,
        columnNumber: 10
    }, this);
}
// Document type mapping (returns icon component for getDocIcon usage)
const DocReportIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ChartHistogramIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartHistogramIcon$3e$__["ChartHistogramIcon"]);
const DocListIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$TaskDone01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TaskDone01Icon$3e$__["TaskDone01Icon"]);
const DocDefaultIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$File02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__File02Icon$3e$__["File02Icon"]);
const DocFinancialIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$MoneyBag01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoneyBag01Icon$3e$__["MoneyBag01Icon"]);
const DocSecurityIcon = withIcon(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$SquareLock02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SquareLock02Icon$3e$__["SquareLock02Icon"]);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {}, void 0, false, {
        fileName: "[project]/Desktop/calaya-taskly/src/lib/icons.jsx",
        lineNumber: 217,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MDDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// pages/dashboards/MDDashboard.jsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/components/Layout.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$utils$2f$menus$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/utils/menus.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/lib/icons.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const Card = ({ className = "", children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
        lineNumber: 11,
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
                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                        lineNumber: 17,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    subtitle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-500 mt-1",
                        children: subtitle
                    }, void 0, false, {
                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                        lineNumber: 20,
                        columnNumber: 19
                    }, ("TURBOPACK compile-time value", void 0)) : null
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                lineNumber: 16,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            action
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
        lineNumber: 15,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const Pill = ({ children, tone = "default" })=>{
    const styles = tone === "danger" ? "bg-red-50 text-red-700 ring-red-100" : tone === "success" ? "bg-emerald-50 text-emerald-700 ring-emerald-100" : tone === "warn" ? "bg-amber-50 text-amber-800 ring-amber-100" : "bg-blue-50 text-blue-700 ring-blue-100";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
        lineNumber: 36,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const priorityTone = (p)=>p === "URGENT" ? "danger" : p === "IMPORTANT" ? "warn" : "default";
function MDDashboard() {
    const stats = [
        {
            title: "Total Tasks",
            value: "0",
            change: "—",
            color: "var(--primary-blue)",
            link: "/md-dashboard/tasks",
            bar: "0%"
        },
        {
            title: "Active Jobs",
            value: "0",
            change: "—",
            color: "var(--secondary-blue)",
            link: "/md-dashboard/jobs",
            bar: "0%"
        },
        {
            title: "Overdue Tasks",
            value: "0",
            change: "—",
            color: "var(--accent-red)",
            link: "/md-dashboard/escalations",
            bar: "0%"
        },
        {
            title: "Completion Rate",
            value: "0%",
            change: "—",
            color: "#10B981",
            link: "/md-dashboard/tasks",
            bar: "0%"
        }
    ];
    const actions = [
        {
            title: "Create Task",
            desc: "Assign work & deadlines",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlusIcon"], {}, void 0, false, {
                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                lineNumber: 53,
                columnNumber: 68
            }, this),
            link: "/md-dashboard/create-task"
        },
        {
            title: "Upload Document",
            desc: "Add files to workspace",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FileUploadIconComponent"], {}, void 0, false, {
                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                lineNumber: 54,
                columnNumber: 71
            }, this),
            link: "/md-dashboard/create-document"
        },
        {
            title: "Schedule Meeting",
            desc: "Create events quickly",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CalendarIcon"], {}, void 0, false, {
                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                lineNumber: 55,
                columnNumber: 71
            }, this),
            link: "/md-dashboard/create-event"
        },
        {
            title: "Post Announcement",
            desc: "Update the company",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MegaphoneIcon"], {}, void 0, false, {
                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                lineNumber: 56,
                columnNumber: 69
            }, this),
            link: "/md-dashboard/create-announcement"
        }
    ];
    const deptPerf = [];
    const activity = [];
    const tenders = [
        {
            id: "TEN-001",
            title: "Pipeline Equipment Supply",
            deadline: "2024-12-20",
            department: "Procurement",
            status: "OPEN"
        },
        {
            id: "TEN-002",
            title: "Safety Training Services",
            deadline: "2024-12-22",
            department: "HSE",
            status: "OPEN"
        },
        {
            id: "TEN-003",
            title: "IT Infrastructure Upgrade",
            deadline: "2024-12-25",
            department: "Technical",
            status: "OPEN"
        }
    ];
    const announcements = [
        {
            id: "ANN-001",
            title: "Year-End Holiday Schedule",
            author: "HR Department",
            time: "2 hours ago",
            priority: "IMPORTANT"
        },
        {
            id: "ANN-002",
            title: "Safety Protocol Updates",
            author: "HSE Department",
            time: "1 day ago",
            priority: "URGENT"
        },
        {
            id: "ANN-003",
            title: "Monthly Performance Review",
            author: "Managing Director",
            time: "2 days ago",
            priority: "NORMAL"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        menuItems: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$utils$2f$menus$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MDMenuItems"],
        userRole: "MD",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                    className: "overflow-hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 md:p-8",
                        style: {
                            background: "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                    children: "Executive Overview"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                    lineNumber: 90,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                    tone: "success",
                                                    children: "System Healthy"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                    lineNumber: 91,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                            lineNumber: 89,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-2xl md:text-3xl font-extrabold tracking-tight",
                                            style: {
                                                color: "var(--primary-blue)"
                                            },
                                            children: "Welcome, Managing Director"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                            lineNumber: 94,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-600 mt-2 max-w-2xl",
                                            children: "Overview of all company operations, escalations, and performance at a glance."
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                            lineNumber: 97,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                    lineNumber: 88,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col sm:flex-row gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/md-dashboard/create-task",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold active:scale-[0.99] transition",
                                                style: {
                                                    backgroundColor: "var(--accent-red)",
                                                    color: "white"
                                                },
                                                children: "Create Task"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                lineNumber: 104,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                            lineNumber: 103,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/md-dashboard/create-document",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition",
                                                style: {
                                                    borderColor: "rgba(109, 198, 223, 0.7)",
                                                    color: "var(--primary-blue)"
                                                },
                                                children: "Upload Document"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                lineNumber: 112,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                            lineNumber: 111,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                    lineNumber: 102,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                            lineNumber: 87,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6",
                    children: stats.map((stat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: stat.link,
                            className: "group",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                                className: "p-5 shadow-none hover:-translate-y-0.5 transition-all",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start justify-between gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-500",
                                                        children: stat.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                        lineNumber: 131,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-3xl font-extrabold tracking-tight mt-1",
                                                        children: stat.value
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                        lineNumber: 132,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm mt-3",
                                                        style: {
                                                            color: stat.color
                                                        },
                                                        children: [
                                                            stat.change,
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-500",
                                                                children: "from last month"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                                lineNumber: 134,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                        lineNumber: 133,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                lineNumber: 130,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-12 h-12 rounded-2xl flex items-center justify-center ",
                                                style: {
                                                    backgroundColor: `${stat.color}18`
                                                },
                                                "aria-hidden": "true",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: stat.color
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$icons$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChartIcon"], {
                                                        size: 24
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                        lineNumber: 144,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                    lineNumber: 143,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                lineNumber: 138,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                        lineNumber: 129,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 h-2 rounded-full bg-gray-100 overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-full rounded-full",
                                            style: {
                                                width: stat.bar,
                                                background: stat.color
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                            lineNumber: 150,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                        lineNumber: 149,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                lineNumber: 128,
                                columnNumber: 15
                            }, this)
                        }, stat.title, false, {
                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                            lineNumber: 127,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                    lineNumber: 125,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                    className: "p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                            title: "Quick Actions",
                            subtitle: "Fast shortcuts for common executive operations"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                            lineNumber: 165,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4",
                            children: actions.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: a.link,
                                    className: "group",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-5 rounded-2xl border border-gray-200/80 bg-white hover:bg-gray-50 transition",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-11 h-11 rounded-2xl flex items-center justify-center ",
                                                        style: {
                                                            backgroundColor: "rgba(109, 198, 223, 0.18)",
                                                            color: "var(--primary-blue)"
                                                        },
                                                        children: a.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                        lineNumber: 171,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-gray-500 group-hover:text-gray-700 transition",
                                                        children: "Open →"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                        lineNumber: 177,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                lineNumber: 170,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-extrabold",
                                                        style: {
                                                            color: "var(--primary-blue)"
                                                        },
                                                        children: a.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                        lineNumber: 180,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-gray-500 mt-1",
                                                        children: a.desc
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                        lineNumber: 183,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                lineNumber: 179,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                        lineNumber: 169,
                                        columnNumber: 17
                                    }, this)
                                }, a.title, false, {
                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                    lineNumber: 168,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                            lineNumber: 166,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                    lineNumber: 164,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 xl:grid-cols-2 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                            className: "p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                    title: "Department Performance",
                                    subtitle: "Completion progress across departments",
                                    action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/md-dashboard/tasks",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "text-sm font-semibold px-3 py-2 rounded-xl text-white active:scale-[0.99] transition",
                                            style: {
                                                backgroundColor: "var(--secondary-blue)"
                                            },
                                            children: "View All"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                            lineNumber: 200,
                                            columnNumber: 19
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                        lineNumber: 199,
                                        columnNumber: 17
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                    lineNumber: 195,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-5 space-y-3",
                                    children: deptPerf.length > 0 ? deptPerf.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: d.link,
                                            className: "block",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-2xl border border-gray-200/70 p-4 hover:bg-gray-50 transition",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-semibold",
                                                                children: d.dept
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                                lineNumber: 216,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                                tone: d.pct >= 90 ? "success" : "default",
                                                                children: [
                                                                    d.pct,
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                                lineNumber: 217,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                        lineNumber: 215,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-3 h-2.5 rounded-full bg-gray-100 overflow-hidden",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-full rounded-full",
                                                            style: {
                                                                width: `${d.pct}%`,
                                                                backgroundColor: "var(--primary-blue)"
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                            lineNumber: 221,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                        lineNumber: 220,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                lineNumber: 214,
                                                columnNumber: 21
                                            }, this)
                                        }, d.dept, false, {
                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                            lineNumber: 213,
                                            columnNumber: 19
                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl border border-gray-200/70 p-8 text-center text-gray-500",
                                        children: "No department data yet. Create tasks to see performance."
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                        lineNumber: 233,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                    lineNumber: 210,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                            lineNumber: 194,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                            className: "p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                    title: "Recent Activity",
                                    subtitle: "Live updates from teams and systems",
                                    action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/md-dashboard/notifications",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "text-sm font-semibold px-3 py-2 rounded-xl text-white active:scale-[0.99] transition",
                                            style: {
                                                backgroundColor: "var(--secondary-blue)"
                                            },
                                            children: "See All"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                            lineNumber: 247,
                                            columnNumber: 19
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                        lineNumber: 246,
                                        columnNumber: 17
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                    lineNumber: 242,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-5 space-y-2",
                                    children: activity.length > 0 ? activity.map((a, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: a.link,
                                            className: "block",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-3 p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold shrink-0 ",
                                                        style: {
                                                            backgroundColor: "var(--secondary-blue)"
                                                        },
                                                        children: a.user.charAt(0)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                        lineNumber: 262,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "min-w-0 flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-gray-800",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-semibold",
                                                                        children: a.user
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                                        lineNumber: 270,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    " ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: a.action
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                                        lineNumber: 271,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                                lineNumber: 269,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-500 mt-1",
                                                                children: a.time
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                                lineNumber: 273,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                        lineNumber: 268,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-gray-400 mt-1",
                                                        children: "→"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                        lineNumber: 275,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                lineNumber: 261,
                                                columnNumber: 21
                                            }, this)
                                        }, index, false, {
                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                            lineNumber: 260,
                                            columnNumber: 19
                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl border border-gray-200/70 p-8 text-center text-gray-500",
                                        children: "No recent activity yet."
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                        lineNumber: 280,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                    lineNumber: 257,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                            lineNumber: 241,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                    lineNumber: 192,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 xl:grid-cols-2 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                            className: "p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                    title: "Tenders Closing Soon",
                                    subtitle: "Time-sensitive procurement opportunities",
                                    action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/md-dashboard/tenders",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "text-sm font-semibold px-3 py-2 rounded-xl text-white active:scale-[0.99] transition",
                                            style: {
                                                backgroundColor: "var(--secondary-blue)"
                                            },
                                            children: "View All"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                            lineNumber: 297,
                                            columnNumber: 19
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                        lineNumber: 296,
                                        columnNumber: 17
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                    lineNumber: 292,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-5 space-y-2",
                                    children: tenders.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/md-dashboard/tender/${t.id}`,
                                            className: "block",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start justify-between gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-semibold truncate",
                                                                    children: t.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                                    lineNumber: 313,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-gray-500 mt-1",
                                                                    children: t.department
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                                    lineNumber: 314,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                            lineNumber: 312,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-right shrink-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm font-extrabold",
                                                                    style: {
                                                                        color: "var(--accent-red)"
                                                                    },
                                                                    children: t.deadline
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                                    lineNumber: 317,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                                    children: t.status
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                                    lineNumber: 320,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                            lineNumber: 316,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                    lineNumber: 311,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                lineNumber: 310,
                                                columnNumber: 19
                                            }, this)
                                        }, t.id, false, {
                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                            lineNumber: 309,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                    lineNumber: 307,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                            lineNumber: 291,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                            className: "p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                    title: "Recent Announcements",
                                    subtitle: "Company-wide communications",
                                    action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/md-dashboard/announcements",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "text-sm font-semibold px-3 py-2 rounded-xl text-white active:scale-[0.99] transition",
                                            style: {
                                                backgroundColor: "var(--secondary-blue)"
                                            },
                                            children: "View All"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                            lineNumber: 336,
                                            columnNumber: 19
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                        lineNumber: 335,
                                        columnNumber: 17
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                    lineNumber: 331,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-5 space-y-2",
                                    children: announcements.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/md-dashboard/announcement/${a.id}`,
                                            className: "block",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start justify-between gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-semibold",
                                                                children: a.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                                lineNumber: 351,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                                tone: priorityTone(a.priority),
                                                                children: a.priority
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                                lineNumber: 352,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                        lineNumber: 350,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-500 mt-2",
                                                        children: [
                                                            "By ",
                                                            a.author,
                                                            " • ",
                                                            a.time
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                        lineNumber: 354,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                                lineNumber: 349,
                                                columnNumber: 19
                                            }, this)
                                        }, a.id, false, {
                                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                            lineNumber: 348,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                                    lineNumber: 346,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                            lineNumber: 330,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
                    lineNumber: 289,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
            lineNumber: 77,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/calaya-taskly/src/app/md-dashboard/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$pages$2f$dashboards$2f$MDDashboard$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/pages/dashboards/MDDashboard.jsx [app-ssr] (ecmascript)");
"use client";
;
;
function Page() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$pages$2f$dashboards$2f$MDDashboard$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/Desktop/calaya-taskly/src/app/md-dashboard/page.jsx",
        lineNumber: 5,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=Desktop_calaya-taskly_src_ab3cc5b6._.js.map
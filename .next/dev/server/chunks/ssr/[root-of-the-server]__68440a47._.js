module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Desktop/calaya-taskly/src/lib/auth-config.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Key used in sessionStorage for the JWT. */ __turbopack_context__.s([
    "ADMIN_EMAIL",
    ()=>ADMIN_EMAIL,
    "ADMIN_PASSWORD",
    ()=>ADMIN_PASSWORD,
    "AUTH_TOKEN_KEY",
    ()=>AUTH_TOKEN_KEY,
    "DEMO_CREDENTIALS",
    ()=>DEMO_CREDENTIALS,
    "getRouteForRole",
    ()=>getRouteForRole
]);
const AUTH_TOKEN_KEY = "authToken";
function getRouteForRole(role) {
    const map = {
        Admin: "/admin-dashboard",
        MD: "/md-dashboard",
        HOD: "/hod-dashboard",
        Staff: "/staff-dashboard",
        Personnel: "/staff-dashboard",
        "Corp Member": "/staff-dashboard",
        Secretary: "/secretary-dashboard"
    };
    return map[role] ?? "/staff-dashboard";
}
const ADMIN_EMAIL = "admin@calaya.com";
const ADMIN_PASSWORD = "admin123";
const DEMO_CREDENTIALS = [
    {
        email: "admin@calaya.com",
        password: "admin123",
        role: "Admin",
        route: "/admin-dashboard"
    },
    {
        email: "izuchukwuonuoha6@gmail.com",
        password: "admin123",
        role: "MD",
        route: "/md-dashboard"
    },
    {
        email: "izuchukwuonuoha6+HOD@gmail.com",
        password: "admin123",
        role: "HOD",
        route: "/hod-dashboard"
    },
    {
        email: "staff@calaya.com",
        password: "demo123",
        role: "Staff",
        route: "/staff-dashboard"
    },
    {
        email: "personnel@calaya.com",
        password: "demo123",
        role: "Personnel",
        route: "/staff-dashboard"
    },
    {
        email: "corp@calaya.com",
        password: "demo123",
        role: "Corp Member",
        route: "/staff-dashboard"
    },
    {
        email: "secretary@calaya.com",
        password: "demo123",
        role: "Secretary",
        route: "/secretary-dashboard"
    }
];
}),
"[project]/Desktop/calaya-taskly/src/contexts/AuthContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$jwt$2d$decode$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/jwt-decode/build/esm/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$auth$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/lib/auth-config.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const token = undefined;
    }, []);
    const logout = ()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        setUser(null);
        router.push("/login");
    };
    const clearSession = ()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        setUser(null);
    };
    const setSession = (token)=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    };
    const getToken = ()=>{
        if ("TURBOPACK compile-time truthy", 1) return null;
        //TURBOPACK unreachable
        ;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            isAuthenticated: !!user,
            loading,
            logout,
            clearSession,
            setSession,
            getToken
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/calaya-taskly/src/contexts/AuthContext.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
function useAuth() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return ctx;
}
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
"[project]/Desktop/calaya-taskly/src/hooks/useSSE.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/lib/api.ts [app-ssr] (ecmascript)");
;
;
const INITIAL_DELAY = 2_000;
const MAX_DELAY = 30_000;
function useSSE(endpoint, onEvent, enabled = true) {
    const onEventRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(onEvent);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        onEventRef.current = onEvent;
    }, [
        onEvent
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!enabled) return;
        let cancelled = false;
        let delay = INITIAL_DELAY;
        let timeoutId = null;
        let currentReader = null;
        async function connect() {
            if (cancelled) return;
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchWithAuth"])(endpoint);
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
                    timeoutId = setTimeout(()=>{
                        delay = Math.min(delay * 2, MAX_DELAY);
                        connect();
                    }, delay);
                }
            }
        }
        connect();
        return ()=>{
            cancelled = true;
            if (timeoutId) clearTimeout(timeoutId);
            currentReader?.cancel().catch(()=>{});
        };
    }, [
        endpoint,
        enabled
    ]);
}
}),
"[project]/Desktop/calaya-taskly/src/contexts/BadgeContext.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BadgeProvider",
    ()=>BadgeProvider,
    "useBadges",
    ()=>useBadges
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * BadgeContext – real-time sidebar badge counts.
 *
 * • Fetches live counts from APIs on mount.
 * • Listens to SSE events (tasks + announcements) to bump counts.
 * • Clears badge for a page when the user visits it.
 * • Persists "last seen" timestamps per path in sessionStorage so
 *   badges only show for NEW items since the user last visited.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$hooks$2f$useSSE$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/hooks/useSSE.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/contexts/AuthContext.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
// ─── Storage helpers ──────────────────────────────────────────────
const STORAGE_KEY = "calaya_badge_seen";
function getSeenMap() {
    try {
        return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
    } catch  {
        return {};
    }
}
function markPathSeen(path) {
    const map = getSeenMap();
    map[path] = Date.now();
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}
// ─── Context ──────────────────────────────────────────────────────
const BadgeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
/**
 * Detects the current dashboard prefix from the pathname,
 * e.g. "/hod-dashboard/tasks" -> "/hod-dashboard"
 */ function getDashboardPrefix(pathname) {
    const prefixes = [
        "/hod-dashboard",
        "/md-dashboard",
        "/staff-dashboard",
        "/secretary-dashboard",
        "/admin-dashboard"
    ];
    return prefixes.find((p)=>pathname.startsWith(p)) || "";
}
function BadgeProvider({ children }) {
    const { isAuthenticated, loading: authLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const prefix = getDashboardPrefix(pathname);
    // { "/hod-dashboard/notifications": 5, "/hod-dashboard/tasks": 3, ... }
    const [badges, setBadges] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const hasFetchedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    // ── Mark current page as seen (clear its badge) ───────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!pathname) return;
        markPathSeen(pathname);
        setBadges((prev)=>{
            if (prev[pathname] === undefined || prev[pathname] === 0) return prev;
            return {
                ...prev,
                [pathname]: 0
            };
        });
    }, [
        pathname
    ]);
    // ── Fetch initial counts from APIs ────────────────────────────
    const fetchCounts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!prefix || !isAuthenticated) return;
        try {
            const results = await Promise.allSettled([
                // Unread notifications
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchWithAuth"])("/api/notifications?unread=true&limit=200").then((r)=>r.ok ? r.json() : []),
                // Pending approvals (tasks with status PENDING for HOD/MD)
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchWithAuth"])("/api/tasks?status=PENDING&limit=200").then((r)=>r.ok ? r.json() : []),
                // Escalated tasks
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchWithAuth"])("/api/tasks?limit=200").then((r)=>r.ok ? r.json() : []),
                // Announcements
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchWithAuth"])("/api/announcements?limit=200").then((r)=>r.ok ? r.json() : []),
                // Tenders
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchWithAuth"])("/api/tenders?limit=200").then((r)=>r.ok ? r.json() : [])
            ]);
            const notifications = results[0].status === "fulfilled" ? results[0].value : [];
            const pendingTasks = results[1].status === "fulfilled" ? results[1].value : [];
            const allTasks = results[2].status === "fulfilled" ? results[2].value : [];
            const announcements = results[3].status === "fulfilled" ? results[3].value : [];
            const tenders = results[4].status === "fulfilled" ? results[4].value : [];
            const seen = getSeenMap();
            // Count items that are NEWER than the user's last visit to that page
            const countNewSince = (items, path, dateField = "createdAt")=>{
                const lastSeen = seen[path] || 0;
                if (!lastSeen) return items.length; // never visited -> show all
                return items.filter((i)=>new Date(i[dateField]).getTime() > lastSeen).length;
            };
            const notifPath = `${prefix}/notifications`;
            const tasksPath = `${prefix}/tasks`;
            const myTasksPath = `${prefix}/my-tasks`;
            const approvalsPath = `${prefix}/approvals`;
            const escalationsPath = `${prefix}/escalations`;
            const announcementsPath = `${prefix}/announcements`;
            const tendersPath = `${prefix}/tenders`;
            const documentsPath = `${prefix}/documents`;
            const tenderDocsPath = `${prefix}/tender-documents`;
            // Unread notifications count (use read field, not time-based)
            const unreadNotifCount = Array.isArray(notifications) ? notifications.length : 0;
            // Escalated tasks (filter to those with escalatedAt set)
            const escalatedTasks = Array.isArray(allTasks) ? allTasks.filter((t)=>t.escalated && t.escalatedAt) : [];
            // Pending approval tasks
            const pendingApprovalCount = Array.isArray(pendingTasks) ? pendingTasks.length : 0;
            // Unread announcements
            const unreadAnnouncements = Array.isArray(announcements) ? announcements.filter((a)=>!a.read) : [];
            const newBadges = {};
            // Notifications: use unread count (already filtered server-side)
            if (pathname !== notifPath) {
                newBadges[notifPath] = unreadNotifCount;
            }
            // Tasks: new tasks since last visit
            if (pathname !== tasksPath && Array.isArray(allTasks)) {
                newBadges[tasksPath] = countNewSince(allTasks, tasksPath);
            }
            // My Tasks: new assignments since last visit
            if (pathname !== myTasksPath && Array.isArray(allTasks)) {
                newBadges[myTasksPath] = countNewSince(allTasks, myTasksPath);
            }
            // Approvals: pending count
            if (pathname !== approvalsPath) {
                newBadges[approvalsPath] = pendingApprovalCount;
            }
            // Escalations: only count tasks escalated AFTER the user's last visit
            if (pathname !== escalationsPath) {
                newBadges[escalationsPath] = countNewSince(escalatedTasks, escalationsPath, "escalatedAt");
            }
            // Announcements: unread count
            if (pathname !== announcementsPath) {
                newBadges[announcementsPath] = unreadAnnouncements.length;
            }
            // Tenders: new since last visit
            if (pathname !== tendersPath && Array.isArray(tenders)) {
                newBadges[tendersPath] = countNewSince(tenders, tendersPath);
            }
            setBadges(newBadges);
        } catch (err) {
            console.error("Badge fetch error:", err);
        }
    // Note: intentionally omitting `pathname` from deps — fetching once on
    // auth is enough. SSE events handle real-time badge bumps thereafter.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        prefix,
        isAuthenticated
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (authLoading || !isAuthenticated || hasFetchedRef.current) return;
        hasFetchedRef.current = true;
        fetchCounts();
    }, [
        authLoading,
        isAuthenticated,
        fetchCounts
    ]);
    // ── SSE: bump badge counts in real-time ───────────────────────
    const handleTaskEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((ev)=>{
        if (!prefix) return;
        const tasksPath = `${prefix}/tasks`;
        const myTasksPath = `${prefix}/my-tasks`;
        const approvalsPath = `${prefix}/approvals`;
        const escalationsPath = `${prefix}/escalations`;
        const notifPath = `${prefix}/notifications`;
        setBadges((prev)=>{
            const next = {
                ...prev
            };
            // Any task event -> bump tasks badge (if user is NOT on that page)
            if (pathname !== tasksPath) {
                if (ev.type === "task:created" || ev.type === "task:assigned" || ev.type === "task:updated") {
                    next[tasksPath] = (next[tasksPath] || 0) + 1;
                }
            }
            // Task assigned to current user -> bump my-tasks
            if (pathname !== myTasksPath && ev.type === "task:assigned") {
                next[myTasksPath] = (next[myTasksPath] || 0) + 1;
            }
            // Task escalated -> bump escalations
            if (pathname !== escalationsPath && ev.type === "task:escalated") {
                next[escalationsPath] = (next[escalationsPath] || 0) + 1;
            }
            // Most task events also generate notifications
            if (pathname !== notifPath && [
                "task:created",
                "task:assigned",
                "task:escalated"
            ].includes(ev.type)) {
                next[notifPath] = (next[notifPath] || 0) + 1;
            }
            return next;
        });
    }, [
        prefix,
        pathname
    ]);
    const handleAnnouncementEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((ev)=>{
        if (!prefix) return;
        const announcementsPath = `${prefix}/announcements`;
        const notifPath = `${prefix}/notifications`;
        setBadges((prev)=>{
            const next = {
                ...prev
            };
            if (pathname !== announcementsPath && ev.type === "announcement:created") {
                next[announcementsPath] = (next[announcementsPath] || 0) + 1;
            }
            if (pathname !== notifPath && ev.type === "announcement:created") {
                next[notifPath] = (next[notifPath] || 0) + 1;
            }
            return next;
        });
    }, [
        prefix,
        pathname
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$hooks$2f$useSSE$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSSE"])("/api/tasks/events", handleTaskEvent, isAuthenticated && !authLoading);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$hooks$2f$useSSE$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSSE"])("/api/announcements/events", handleAnnouncementEvent, isAuthenticated && !authLoading);
    // ── Exposed API ───────────────────────────────────────────────
    const getBadge = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((path)=>{
        const count = badges[path];
        if (!count || count <= 0) return null;
        return count > 99 ? "99+" : String(count);
    }, [
        badges
    ]);
    const clearBadge = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((path)=>{
        markPathSeen(path);
        setBadges((prev)=>{
            if (!prev[path]) return prev;
            return {
                ...prev,
                [path]: 0
            };
        });
    }, []);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            badges,
            getBadge,
            clearBadge
        }), [
        badges,
        getBadge,
        clearBadge
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BadgeContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/calaya-taskly/src/contexts/BadgeContext.jsx",
        lineNumber: 324,
        columnNumber: 9
    }, this);
}
function useBadges() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(BadgeContext);
    if (!ctx) {
        throw new Error("useBadges must be used within a BadgeProvider");
    }
    return ctx;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__68440a47._.js.map
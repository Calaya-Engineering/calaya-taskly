(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/calaya-taskly/src/lib/auth-config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
        email: "md@calaya.com",
        password: "demo123",
        role: "MD",
        route: "/md-dashboard"
    },
    {
        email: "hod@calaya.com",
        password: "demo123",
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/calaya-taskly/src/contexts/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$jwt$2d$decode$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/jwt-decode/build/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$auth$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/lib/auth-config.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const token = window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$auth$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"]);
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const decoded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$jwt$2d$decode$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jwtDecode"])(token);
                if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                    window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$auth$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"]);
                    setLoading(false);
                    return;
                }
                setUser({
                    email: decoded.email,
                    role: decoded.role
                });
            } catch  {
                window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$auth$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"]);
            } finally{
                setLoading(false);
            }
        }
    }["AuthProvider.useEffect"], []);
    const logout = ()=>{
        if ("TURBOPACK compile-time truthy", 1) {
            window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$auth$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"]);
        }
        setUser(null);
        router.push("/login");
    };
    const clearSession = ()=>{
        if ("TURBOPACK compile-time truthy", 1) {
            window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$auth$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"]);
        }
        setUser(null);
    };
    const setSession = (token)=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        window.sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$auth$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"], token);
        try {
            const decoded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$jwt$2d$decode$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jwtDecode"])(token);
            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$auth$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"]);
                return;
            }
            setUser({
                email: decoded.email,
                role: decoded.role
            });
        } catch  {
            window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$auth$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"]);
        }
    };
    const getToken = ()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$auth$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"]);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
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
_s(AuthProvider, "J17Kp8z+0ojgAqGoY5o3BCjwWms=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AuthProvider;
function useAuth() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return ctx;
}
_s1(useAuth, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_calaya-taskly_src_3458991b._.js.map
module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

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
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Desktop/calaya-taskly/src/app/api/auth/otp-store.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "consumeOtp",
    ()=>consumeOtp,
    "saveOtp",
    ()=>saveOtp
]);
// In-memory OTP store keyed by email. Suitable for demo/dev environments only.
const store = new Map();
function saveOtp(email, otp, user, ttlMs = 5 * 60 * 1000) {
    const expiresAt = Date.now() + ttlMs;
    store.set(email.toLowerCase(), {
        otp,
        expiresAt,
        user
    });
}
function consumeOtp(email, otp) {
    const key = email.toLowerCase();
    const record = store.get(key);
    if (!record) return null;
    const now = Date.now();
    if (record.expiresAt < now || record.otp !== otp) {
        store.delete(key);
        return null;
    }
    store.delete(key);
    return record.user;
}
}),
"[project]/Desktop/calaya-taskly/src/lib/jwt.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAuthFromRequest",
    ()=>getAuthFromRequest,
    "getBearerToken",
    ()=>getBearerToken,
    "signAuthToken",
    ()=>signAuthToken,
    "verifyAuthToken",
    ()=>verifyAuthToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/jose/dist/webapi/jwt/sign.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/jose/dist/webapi/jwt/verify.js [app-route] (ecmascript)");
;
const encoder = new TextEncoder();
function getSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not set");
    }
    return encoder.encode(secret);
}
async function signAuthToken(payload) {
    const secret = getSecret();
    return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SignJWT"]({
        email: payload.email,
        role: payload.role
    }).setProtectedHeader({
        alg: "HS256",
        typ: "JWT"
    }).setIssuedAt().setExpirationTime("1h").sign(secret);
}
async function verifyAuthToken(token) {
    try {
        const secret = getSecret();
        const { payload } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jwtVerify"])(token, secret);
        return payload;
    } catch  {
        return null;
    }
}
function getBearerToken(authHeader) {
    if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
    return authHeader.slice(7).trim() || null;
}
async function getAuthFromRequest(request) {
    const authHeader = request.headers.get("Authorization");
    const token = getBearerToken(authHeader);
    if (!token) return null;
    return verifyAuthToken(token);
}
}),
"[project]/Desktop/calaya-taskly/src/app/api/auth/verify-otp/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$app$2f$api$2f$auth$2f$otp$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/app/api/auth/otp-store.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$jwt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/lib/jwt.ts [app-route] (ecmascript)");
;
;
;
async function POST(req) {
    try {
        const body = await req.json();
        const { email, otp } = body;
        if (!email || !otp) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Email and OTP are required."
            }, {
                status: 400
            });
        }
        const emailKey = String(email).trim().toLowerCase();
        const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$app$2f$api$2f$auth$2f$otp$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["consumeOtp"])(emailKey, otp.trim());
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid or expired OTP."
            }, {
                status: 401
            });
        }
        const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$jwt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["signAuthToken"])({
            email: user.email,
            role: user.role
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            token,
            role: user.role,
            route: user.route
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error in verify-otp route:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to verify OTP."
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__18a27a48._.js.map
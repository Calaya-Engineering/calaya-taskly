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
"[project]/Desktop/calaya-taskly/src/lib/auth-config.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEMO_CREDENTIALS",
    ()=>DEMO_CREDENTIALS
]);
const DEMO_CREDENTIALS = [
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
}),
"[project]/Desktop/calaya-taskly/src/lib/resend.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resend",
    ()=>resend
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/resend/dist/index.mjs [app-route] (ecmascript)");
;
if (!process.env.RESEND_API_KEY) {
    // In dev we log a warning; in production this should be configured properly.
    // eslint-disable-next-line no-console
    console.warn("RESEND_API_KEY is not set. OTP emails will not be sent.");
}
const resend = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Resend"](process.env.RESEND_API_KEY || "");
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
"[project]/Desktop/calaya-taskly/src/app/api/auth/send-otp/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$auth$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/lib/auth-config.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$resend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/lib/resend.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$app$2f$api$2f$auth$2f$otp$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/app/api/auth/otp-store.ts [app-route] (ecmascript)");
;
;
;
;
async function POST(req) {
    try {
        const body = await req.json();
        const { email, password } = body;
        if (!email || !password) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Email and password are required."
            }, {
                status: 400
            });
        }
        const user = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$auth$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEMO_CREDENTIALS"].find((demo)=>demo.email.toLowerCase() === email.toLowerCase() && demo.password === password);
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid credentials."
            }, {
                status: 401
            });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$app$2f$api$2f$auth$2f$otp$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["saveOtp"])(user.email, otp, user);
        if (!process.env.RESEND_API_KEY) {
            // In development, log OTP so it's still testable without email setup.
            // eslint-disable-next-line no-console
            console.log(`OTP for ${user.email}: ${otp} (RESEND_API_KEY not set, email not sent)`);
        } else {
            await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$resend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resend"].emails.send({
                from: "Calaya Taskly <noreply@calayaengineering.com>",
                to: [
                    user.email
                ],
                subject: "Your Calaya Taskly verification code",
                text: `Your one-time verification code is ${otp}. It expires in 5 minutes.`
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            role: user.role,
            route: user.route
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error in send-otp route:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to send OTP."
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f4d09816._.js.map
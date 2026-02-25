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
"[project]/Desktop/calaya-taskly/src/lib/task-events.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Simple in-memory pub/sub for real-time task events.
 * When tasks are created or assigned, subscribers receive updates.
 */ __turbopack_context__.s([
    "emitTaskEvent",
    ()=>emitTaskEvent,
    "subscribeTaskEvents",
    ()=>subscribeTaskEvents
]);
const listeners = new Set();
function subscribeTaskEvents(listener) {
    listeners.add(listener);
    return ()=>listeners.delete(listener);
}
function emitTaskEvent(event) {
    listeners.forEach((fn)=>{
        try {
            fn(event);
        } catch (e) {
            console.error("Task event listener error:", e);
        }
    });
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
"[project]/Desktop/calaya-taskly/src/app/api/tasks/events/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$task$2d$events$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/lib/task-events.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$jwt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/lib/jwt.ts [app-route] (ecmascript)");
;
;
;
async function GET(req) {
    const auth = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$jwt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAuthFromRequest"])(req);
    if (!auth) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]("Unauthorized", {
            status: 401
        });
    }
    const encoder = new TextEncoder();
    let keepAliveId = null;
    let unsubscribe = null;
    const stream = new ReadableStream({
        start (controller) {
            const send = (event)=>{
                try {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
                } catch  {
                // Client disconnected
                }
            };
            unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$task$2d$events$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["subscribeTaskEvents"])((event)=>send(event));
            keepAliveId = setInterval(()=>send({
                    type: "ping",
                    ts: Date.now()
                }), 30000);
            req.signal?.addEventListener("abort", ()=>{
                if (keepAliveId) clearInterval(keepAliveId);
                unsubscribe?.();
                controller.close();
            });
        },
        cancel () {
            if (keepAliveId) clearInterval(keepAliveId);
            unsubscribe?.();
        }
    });
    return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive"
        }
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__accc7ebc._.js.map
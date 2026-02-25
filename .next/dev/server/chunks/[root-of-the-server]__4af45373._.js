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
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/string_decoder [external] (string_decoder, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("string_decoder", () => require("string_decoder"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/node:url [external] (node:url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:url", () => require("node:url"));

module.exports = mod;
}),
"[project]/Desktop/calaya-taskly/generated/prisma/internal/class.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPrismaClientClass",
    ()=>getPrismaClientClass
]);
/* !!! This is code generated by Prisma. Do not edit directly. !!! */ /* eslint-disable */ // biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * WARNING: This is an internal file that is subject to change!
 *
 * 🛑 Under no circumstances should you import this file directly! 🛑
 *
 * Please import the `PrismaClient` class from the `client.ts` file instead.
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client/runtime/client [external] (@prisma/client/runtime/client, cjs, [project]/Desktop/calaya-taskly/node_modules/@prisma/client)");
;
const config = {
    "previewFeatures": [],
    "clientVersion": "7.4.1",
    "engineVersion": "55ae170b1ced7fc6ed07a15f110549408c501bb3",
    "activeProvider": "mysql",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = \"prisma-client\"\n  output   = \"../generated/prisma\"\n}\n\ndatasource db {\n  provider = \"mysql\"\n}\n\nmodel Department {\n  id        Int      @id @default(autoincrement())\n  name      String   @unique\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Role {\n  id        Int      @id @default(autoincrement())\n  name      String   @unique\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel User {\n  id         Int      @id @default(autoincrement())\n  email      String   @unique\n  password   String\n  role       String\n  name       String?\n  department String?\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  tasksAssigned   TaskAssignment[] @relation(\"AssignedTo\")\n  tasksCreated    Task[]           @relation(\"CreatedBy\")\n  assignmentsMade TaskAssignment[] @relation(\"AssignedBy\")\n}\n\nmodel Task {\n  id             Int       @id @default(autoincrement())\n  title          String\n  description    String?   @db.Text\n  department     String?\n  priority       String    @default(\"MEDIUM\")\n  status         String    @default(\"PENDING\")\n  type           String    @default(\"TASK\")\n  createdById    Int\n  startDate      DateTime?\n  dueDate        DateTime?\n  estimatedHours Int?\n  visibility     String    @default(\"ASSIGNED_ONLY\")\n  createdAt      DateTime  @default(now())\n  updatedAt      DateTime  @updatedAt\n\n  createdBy   User             @relation(\"CreatedBy\", fields: [createdById], references: [id])\n  assignments TaskAssignment[]\n\n  @@index([createdById])\n  @@index([status])\n  @@index([department])\n  @@index([createdAt])\n}\n\nmodel Document {\n  id         Int      @id @default(autoincrement())\n  title      String\n  type       String // Report, Procedure, Policy, etc.\n  department String\n  uploadedBy String\n  scope      String // PUBLIC, PRIVATE, ALL_HODS, SPECIFIC_HODS, SPECIFIC_DEPARTMENTS\n  fileSize   String? // e.g. \"2.4 MB\"\n  fileUrl    String? // path or URL to file\n  downloads  Int      @default(0)\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([type])\n  @@index([department])\n  @@index([scope])\n  @@index([createdAt])\n}\n\nmodel TaskAssignment {\n  id           Int      @id @default(autoincrement())\n  taskId       Int\n  userId       Int\n  assignedById Int\n  status       String   @default(\"PENDING\")\n  assignedAt   DateTime @default(now())\n  createdAt    DateTime @default(now())\n  updatedAt    DateTime @updatedAt\n\n  task       Task @relation(fields: [taskId], references: [id], onDelete: Cascade)\n  user       User @relation(\"AssignedTo\", fields: [userId], references: [id], onDelete: Cascade)\n  assignedBy User @relation(\"AssignedBy\", fields: [assignedById], references: [id])\n\n  @@unique([taskId, userId])\n  @@index([userId])\n  @@index([taskId])\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"Department\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Role\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"department\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"tasksAssigned\",\"kind\":\"object\",\"type\":\"TaskAssignment\",\"relationName\":\"AssignedTo\"},{\"name\":\"tasksCreated\",\"kind\":\"object\",\"type\":\"Task\",\"relationName\":\"CreatedBy\"},{\"name\":\"assignmentsMade\",\"kind\":\"object\",\"type\":\"TaskAssignment\",\"relationName\":\"AssignedBy\"}],\"dbName\":null},\"Task\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"department\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"priority\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdById\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"startDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"dueDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"estimatedHours\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"visibility\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdBy\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"CreatedBy\"},{\"name\":\"assignments\",\"kind\":\"object\",\"type\":\"TaskAssignment\",\"relationName\":\"TaskToTaskAssignment\"}],\"dbName\":null},\"Document\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"department\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"uploadedBy\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"scope\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"fileSize\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"fileUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"downloads\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"TaskAssignment\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"taskId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"assignedById\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"assignedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"task\",\"kind\":\"object\",\"type\":\"Task\",\"relationName\":\"TaskToTaskAssignment\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"AssignedTo\"},{\"name\":\"assignedBy\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"AssignedBy\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"Department.findUnique\",\"Department.findUniqueOrThrow\",\"orderBy\",\"cursor\",\"Department.findFirst\",\"Department.findFirstOrThrow\",\"Department.findMany\",\"data\",\"Department.createOne\",\"Department.createMany\",\"Department.updateOne\",\"Department.updateMany\",\"create\",\"update\",\"Department.upsertOne\",\"Department.deleteOne\",\"Department.deleteMany\",\"having\",\"_count\",\"_avg\",\"_sum\",\"_min\",\"_max\",\"Department.groupBy\",\"Department.aggregate\",\"Role.findUnique\",\"Role.findUniqueOrThrow\",\"Role.findFirst\",\"Role.findFirstOrThrow\",\"Role.findMany\",\"Role.createOne\",\"Role.createMany\",\"Role.updateOne\",\"Role.updateMany\",\"Role.upsertOne\",\"Role.deleteOne\",\"Role.deleteMany\",\"Role.groupBy\",\"Role.aggregate\",\"createdBy\",\"assignments\",\"task\",\"user\",\"assignedBy\",\"tasksAssigned\",\"tasksCreated\",\"assignmentsMade\",\"User.findUnique\",\"User.findUniqueOrThrow\",\"User.findFirst\",\"User.findFirstOrThrow\",\"User.findMany\",\"User.createOne\",\"User.createMany\",\"User.updateOne\",\"User.updateMany\",\"User.upsertOne\",\"User.deleteOne\",\"User.deleteMany\",\"User.groupBy\",\"User.aggregate\",\"Task.findUnique\",\"Task.findUniqueOrThrow\",\"Task.findFirst\",\"Task.findFirstOrThrow\",\"Task.findMany\",\"Task.createOne\",\"Task.createMany\",\"Task.updateOne\",\"Task.updateMany\",\"Task.upsertOne\",\"Task.deleteOne\",\"Task.deleteMany\",\"Task.groupBy\",\"Task.aggregate\",\"Document.findUnique\",\"Document.findUniqueOrThrow\",\"Document.findFirst\",\"Document.findFirstOrThrow\",\"Document.findMany\",\"Document.createOne\",\"Document.createMany\",\"Document.updateOne\",\"Document.updateMany\",\"Document.upsertOne\",\"Document.deleteOne\",\"Document.deleteMany\",\"Document.groupBy\",\"Document.aggregate\",\"TaskAssignment.findUnique\",\"TaskAssignment.findUniqueOrThrow\",\"TaskAssignment.findFirst\",\"TaskAssignment.findFirstOrThrow\",\"TaskAssignment.findMany\",\"TaskAssignment.createOne\",\"TaskAssignment.createMany\",\"TaskAssignment.updateOne\",\"TaskAssignment.updateMany\",\"TaskAssignment.upsertOne\",\"TaskAssignment.deleteOne\",\"TaskAssignment.deleteMany\",\"TaskAssignment.groupBy\",\"TaskAssignment.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"taskId\",\"userId\",\"assignedById\",\"status\",\"assignedAt\",\"createdAt\",\"updatedAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"search\",\"title\",\"type\",\"department\",\"uploadedBy\",\"scope\",\"fileSize\",\"fileUrl\",\"downloads\",\"description\",\"priority\",\"createdById\",\"startDate\",\"dueDate\",\"estimatedHours\",\"visibility\",\"email\",\"password\",\"role\",\"name\",\"every\",\"some\",\"none\",\"taskId_userId\",\"is\",\"isNot\",\"_relevance\",\"connectOrCreate\",\"upsert\",\"createMany\",\"set\",\"disconnect\",\"delete\",\"connect\",\"updateMany\",\"deleteMany\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "vgIzVAdoAAC9AQAwaQAABAAQagAAvQEAMGsCAAAAAXFAAKcBACFyQACnAQAhkQEBAAAAAQEAAAABACABAAAAAQAgB2gAAL0BADBpAAAEABBqAAC9AQAwawIApAEAIXFAAKcBACFyQACnAQAhkQEBAKUBACEBmAEAAKYCACADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACAEawIAAAABcUAAAAABckAAAAABkQEBAAAAAQEIAAAJACAEawIAAAABcUAAAAABckAAAAABkQEBAAAAAQEIAAALADAEawIAxQEAIXFAAMQBACFyQADEAQAhkQEBAMMBACECAAAAAQAgCAAADQAgBGsCAMUBACFxQADEAQAhckAAxAEAIZEBAQDDAQAhAgAAAAQAIAgAAA8AIAMAAAABACANAAAJACAOAAANACABAAAAAQAgAQAAAAQAIAUTAAChAgAgFAAAogIAIBUAAKUCACAWAACkAgAgFwAAowIAIAdoAAC8AQAwaQAAFQAQagAAvAEAMGsCAJQBACFxQACWAQAhckAAlgEAIZEBAQCVAQAhAwAAAAQAIAMAABQAMBIAABUAIAMAAAAEACADAAAFADAEAAABACAHaAAAuwEAMGkAABsAEGoAALsBADBrAgAAAAFxQACnAQAhckAApwEAIZEBAQAAAAEBAAAAGAAgAQAAABgAIAdoAAC7AQAwaQAAGwAQagAAuwEAMGsCAKQBACFxQACnAQAhckAApwEAIZEBAQClAQAhAZgBAACgAgAgAwAAABsAIAMAABwAMAQAABgAIAMAAAAbACADAAAcADAEAAAYACADAAAAGwAgAwAAHAAwBAAAGAAgBGsCAAAAAXFAAAAAAXJAAAAAAZEBAQAAAAEBCAAAIAAgBGsCAAAAAXFAAAAAAXJAAAAAAZEBAQAAAAEBCAAAIgAwBGsCAMUBACFxQADEAQAhckAAxAEAIZEBAQDDAQAhAgAAABgAIAgAACQAIARrAgDFAQAhcUAAxAEAIXJAAMQBACGRAQEAwwEAIQIAAAAbACAIAAAmACADAAAAGAAgDQAAIAAgDgAAJAAgAQAAABgAIAEAAAAbACAFEwAAmwIAIBQAAJwCACAVAACfAgAgFgAAngIAIBcAAJ0CACAHaAAAugEAMGkAACwAEGoAALoBADBrAgCUAQAhcUAAlgEAIXJAAJYBACGRAQEAlQEAIQMAAAAbACADAAArADASAAAsACADAAAAGwAgAwAAHAAwBAAAGAAgDi0AALEBACAuAACyAQAgLwAAsQEAIGgAALABADBpAABAABBqAACwAQAwawIAAAABcUAApwEAIXJAAKcBACGBAQEApgEAIY4BAQAAAAGPAQEApQEAIZABAQClAQAhkQEBAKYBACEBAAAALwAgDioAALkBACArAAC2AQAgLAAAtgEAIGgAALgBADBpAAAxABBqAAC4AQAwawIApAEAIWwCAKQBACFtAgCkAQAhbgIApAEAIW8BAKUBACFwQACnAQAhcUAApwEAIXJAAKcBACEEKgAAmQIAICsAAJcCACAsAACXAgAgmAEAAJoCACAPKgAAuQEAICsAALYBACAsAAC2AQAgaAAAuAEAMGkAADEAEGoAALgBADBrAgAAAAFsAgCkAQAhbQIApAEAIW4CAKQBACFvAQClAQAhcEAApwEAIXFAAKcBACFyQACnAQAhlQEAALcBACADAAAAMQAgAwAAMgAwBAAAMwAgAwAAADEAIAMAADIAMAQAADMAIAEAAAAxACATKAAAtgEAICkAALEBACBoAACzAQAwaQAANwAQagAAswEAMGsCAKQBACFvAQClAQAhcUAApwEAIXJAAKcBACF_AQClAQAhgAEBAKUBACGBAQEApgEAIYcBAQCmAQAhiAEBAKUBACGJAQIApAEAIYoBQAC0AQAhiwFAALQBACGMAQIAtQEAIY0BAQClAQAhCCgAAJcCACApAACUAgAggQEAAMwBACCHAQAAzAEAIIoBAADMAQAgiwEAAMwBACCMAQAAzAEAIJgBAACYAgAgEygAALYBACApAACxAQAgaAAAswEAMGkAADcAEGoAALMBADBrAgAAAAFvAQClAQAhcUAApwEAIXJAAKcBACF_AQClAQAhgAEBAKUBACGBAQEApgEAIYcBAQCmAQAhiAEBAKUBACGJAQIApAEAIYoBQAC0AQAhiwFAALQBACGMAQIAtQEAIY0BAQClAQAhAwAAADcAIAMAADgAMAQAADkAIAMAAAAxACADAAAyADAEAAAzACABAAAAMQAgAQAAADcAIAEAAAAxACABAAAALwAgDi0AALEBACAuAACyAQAgLwAAsQEAIGgAALABADBpAABAABBqAACwAQAwawIApAEAIXFAAKcBACFyQACnAQAhgQEBAKYBACGOAQEApQEAIY8BAQClAQAhkAEBAKUBACGRAQEApgEAIQYtAACUAgAgLgAAlQIAIC8AAJQCACCBAQAAzAEAIJEBAADMAQAgmAEAAJYCACADAAAAQAAgAwAAQQAwBAAALwAgAwAAAEAAIAMAAEEAMAQAAC8AIAMAAABAACADAABBADAEAAAvACALLQAAkQIAIC4AAJICACAvAACTAgAgawIAAAABcUAAAAABckAAAAABgQEBAAAAAY4BAQAAAAGPAQEAAAABkAEBAAAAAZEBAQAAAAEBCAAARQAgCGsCAAAAAXFAAAAAAXJAAAAAAYEBAQAAAAGOAQEAAAABjwEBAAAAAZABAQAAAAGRAQEAAAABAQgAAEcAMAstAADwAQAgLgAA8QEAIC8AAPIBACBrAgDFAQAhcUAAxAEAIXJAAMQBACGBAQEA0gEAIY4BAQDDAQAhjwEBAMMBACGQAQEAwwEAIZEBAQDSAQAhAgAAAC8AIAgAAEkAIAhrAgDFAQAhcUAAxAEAIXJAAMQBACGBAQEA0gEAIY4BAQDDAQAhjwEBAMMBACGQAQEAwwEAIZEBAQDSAQAhAgAAAEAAIAgAAEsAIAMAAAAvACANAABFACAOAABJACABAAAALwAgAQAAAEAAIAcTAADrAQAgFAAA7AEAIBUAAO8BACAWAADuAQAgFwAA7QEAIIEBAADMAQAgkQEAAMwBACALaAAArwEAMGkAAFEAEGoAAK8BADBrAgCUAQAhcUAAlgEAIXJAAJYBACGBAQEAnwEAIY4BAQCVAQAhjwEBAJUBACGQAQEAlQEAIZEBAQCfAQAhAwAAAEAAIAMAAFAAMBIAAFEAIAMAAABAACADAABBADAEAAAvACABAAAAOQAgAQAAADkAIAMAAAA3ACADAAA4ADAEAAA5ACADAAAANwAgAwAAOAAwBAAAOQAgAwAAADcAIAMAADgAMAQAADkAIBAoAADpAQAgKQAA6gEAIGsCAAAAAW8BAAAAAXFAAAAAAXJAAAAAAX8BAAAAAYABAQAAAAGBAQEAAAABhwEBAAAAAYgBAQAAAAGJAQIAAAABigFAAAAAAYsBQAAAAAGMAQIAAAABjQEBAAAAAQEIAABZACAOawIAAAABbwEAAAABcUAAAAABckAAAAABfwEAAAABgAEBAAAAAYEBAQAAAAGHAQEAAAABiAEBAAAAAYkBAgAAAAGKAUAAAAABiwFAAAAAAYwBAgAAAAGNAQEAAAABAQgAAFsAMBAoAADbAQAgKQAA3AEAIGsCAMUBACFvAQDDAQAhcUAAxAEAIXJAAMQBACF_AQDDAQAhgAEBAMMBACGBAQEA0gEAIYcBAQDSAQAhiAEBAMMBACGJAQIAxQEAIYoBQADZAQAhiwFAANkBACGMAQIA2gEAIY0BAQDDAQAhAgAAADkAIAgAAF0AIA5rAgDFAQAhbwEAwwEAIXFAAMQBACFyQADEAQAhfwEAwwEAIYABAQDDAQAhgQEBANIBACGHAQEA0gEAIYgBAQDDAQAhiQECAMUBACGKAUAA2QEAIYsBQADZAQAhjAECANoBACGNAQEAwwEAIQIAAAA3ACAIAABfACADAAAAOQAgDQAAWQAgDgAAXQAgAQAAADkAIAEAAAA3ACAKEwAA1AEAIBQAANUBACAVAADYAQAgFgAA1wEAIBcAANYBACCBAQAAzAEAIIcBAADMAQAgigEAAMwBACCLAQAAzAEAIIwBAADMAQAgEWgAAKgBADBpAABlABBqAACoAQAwawIAlAEAIW8BAJUBACFxQACWAQAhckAAlgEAIX8BAJUBACGAAQEAlQEAIYEBAQCfAQAhhwEBAJ8BACGIAQEAlQEAIYkBAgCUAQAhigFAAKkBACGLAUAAqQEAIYwBAgCqAQAhjQEBAJUBACEDAAAANwAgAwAAZAAwEgAAZQAgAwAAADcAIAMAADgAMAQAADkAIA5oAACjAQAwaQAAawAQagAAowEAMGsCAAAAAXFAAKcBACFyQACnAQAhfwEApQEAIYABAQClAQAhgQEBAKUBACGCAQEApQEAIYMBAQClAQAhhAEBAKYBACGFAQEApgEAIYYBAgCkAQAhAQAAAGgAIAEAAABoACAOaAAAowEAMGkAAGsAEGoAAKMBADBrAgCkAQAhcUAApwEAIXJAAKcBACF_AQClAQAhgAEBAKUBACGBAQEApQEAIYIBAQClAQAhgwEBAKUBACGEAQEApgEAIYUBAQCmAQAhhgECAKQBACEDhAEAAMwBACCFAQAAzAEAIJgBAADTAQAgAwAAAGsAIAMAAGwAMAQAAGgAIAMAAABrACADAABsADAEAABoACADAAAAawAgAwAAbAAwBAAAaAAgC2sCAAAAAXFAAAAAAXJAAAAAAX8BAAAAAYABAQAAAAGBAQEAAAABggEBAAAAAYMBAQAAAAGEAQEAAAABhQEBAAAAAYYBAgAAAAEBCAAAcAAgC2sCAAAAAXFAAAAAAXJAAAAAAX8BAAAAAYABAQAAAAGBAQEAAAABggEBAAAAAYMBAQAAAAGEAQEAAAABhQEBAAAAAYYBAgAAAAEBCAAAcgAwC2sCAMUBACFxQADEAQAhckAAxAEAIX8BAMMBACGAAQEAwwEAIYEBAQDDAQAhggEBAMMBACGDAQEAwwEAIYQBAQDSAQAhhQEBANIBACGGAQIAxQEAIQIAAABoACAIAAB0ACALawIAxQEAIXFAAMQBACFyQADEAQAhfwEAwwEAIYABAQDDAQAhgQEBAMMBACGCAQEAwwEAIYMBAQDDAQAhhAEBANIBACGFAQEA0gEAIYYBAgDFAQAhAgAAAGsAIAgAAHYAIAMAAABoACANAABwACAOAAB0ACABAAAAaAAgAQAAAGsAIAcTAADNAQAgFAAAzgEAIBUAANEBACAWAADQAQAgFwAAzwEAIIQBAADMAQAghQEAAMwBACAOaAAAngEAMGkAAHwAEGoAAJ4BADBrAgCUAQAhcUAAlgEAIXJAAJYBACF_AQCVAQAhgAEBAJUBACGBAQEAlQEAIYIBAQCVAQAhgwEBAJUBACGEAQEAnwEAIYUBAQCfAQAhhgECAJQBACEDAAAAawAgAwAAewAwEgAAfAAgAwAAAGsAIAMAAGwAMAQAAGgAIAEAAAAzACABAAAAMwAgAwAAADEAIAMAADIAMAQAADMAIAMAAAAxACADAAAyADAEAAAzACADAAAAMQAgAwAAMgAwBAAAMwAgCyoAAMkBACArAADKAQAgLAAAywEAIGsCAAAAAWwCAAAAAW0CAAAAAW4CAAAAAW8BAAAAAXBAAAAAAXFAAAAAAXJAAAAAAQEIAACEAQAgCGsCAAAAAWwCAAAAAW0CAAAAAW4CAAAAAW8BAAAAAXBAAAAAAXFAAAAAAXJAAAAAAQEIAACGAQAwCyoAAMYBACArAADHAQAgLAAAyAEAIGsCAMUBACFsAgDFAQAhbQIAxQEAIW4CAMUBACFvAQDDAQAhcEAAxAEAIXFAAMQBACFyQADEAQAhAgAAADMAIAgAAIgBACAIawIAxQEAIWwCAMUBACFtAgDFAQAhbgIAxQEAIW8BAMMBACFwQADEAQAhcUAAxAEAIXJAAMQBACECAAAAMQAgCAAAigEAIAMAAAAzACANAACEAQAgDgAAiAEAIAEAAAAzACABAAAAMQAgBRMAAL4BACAUAAC_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_AQClAQAhgAEBAKUBACGBAQEApgEAIYcBAQCmAQAhiAEBAKUBACGJAQIApAEAIYoBQAC0AQAhiwFAALQBACGMAQIAtQEAIY0BAQClAQAhlgEAADcAIJcBAAA3ACAHaAAAugEAMGkAACwAEGoAALoBADBrAgCUAQAhcUAAlgEAIXJAAJYBACGRAQEAlQEAIQdoAAC7AQAwaQAAGwAQagAAuwEAMGsCAKQBACFxQACnAQAhckAApwEAIZEBAQClAQAhB2gAALwBADBpAAAVABBqAAC8AQAwawIAlAEAIXFAAJYBACFyQACWAQAhkQEBAJUBACEHaAAAvQEAMGkAAAQAEGoAAL0BADBrAgCkAQAhcUAApwEAIXJAAKcBACGRAQEApQEAIQAAAAAAAZwBAQAAAAEBnAFAAAAAAQWcAQIAAAABogECAAAAAaMBAgAAAAGkAQIAAAABpQECAAAAAQUNAAC0AgAgDgAAvQIAIJkBAAC1AgAgmgEAALwCACCfAQAAOQAgBQ0AALICACAOAAC6AgAgmQEAALMCACCaAQAAuQIAIJ8BAAAvACAFDQAAsAIAIA4AALcCACCZAQAAsQIAIJoBAAC2AgAgnwEAAC8AIAMNAAC0AgAgmQEAALUCACCfAQAAOQAgAw0AALICACCZAQAAswIAIJ8BAAAvACADDQAAsAIAIJkBAACxAgAgnwEAAC8AIAAAAAAAAAGcAQEAAAABAX4BAAAAAQAAAAAAAZwBQAAAAAEFnAECAAAAAaIBAgAAAAGjAQIAAAABpAECAAAAAaUBAgAAAAEFDQAAqgIAIA4AAK4CACCZAQAAqwIAIJoBAACtAgAgnwEAAC8AIAsNAADdAQAwDgAA4gEAMJkBAADeAQAwmgEAAN8BADCbAQAA4AEAIJwBAADhAQAwnQEAAOEBADCeAQAA4QEAMJ8BAADhAQAwoAEAAOMBADChAQAA5AEAMAkrAADKAQAgLAAAywEAIGsCAAAAAW0CAAAAAW4CAAAAAW8BAAAAAXBAAAAAAXFAAAAAAXJAAAAAAQIAAAAzACANAADoAQAgAwAAADMAIA0AAOgBACAOAADnAQAgAQgAAKwCADAPKgAAuQEAICsAALYBACAsAAC2AQAgaAAAuAEAMGkAADEAEGoAALgBADBrAgAAAAFsAgCkAQAhbQIApAEAIW4CAKQBACFvAQClAQAhcEAApwEAIXFAAKcBACFyQACnAQAhlQEAALcBACACAAAAMwAgCAAA5wEAIAIAAADlAQAgCAAA5gEAIAtoAADkAQAwaQAA5QEAEGoAAOQBADBrAgCkAQAhbAIApAEAIW0CAKQBACFuAgCkAQAhbwEApQEAIXBAAKcBACFxQACnAQAhckAApwEAIQtoAADkAQAwaQAA5QEAEGoAAOQBADBrAgCkAQAhbAIApAEAIW0CAKQBACFuAgCkAQAhbwEApQEAIXBAAKcBACFxQACnAQAhckAApwEAIQdrAgDFAQAhbQIAxQEAIW4CAMUBACFvAQDDAQAhcEAAxAEAIXFAAMQBACFyQADEAQAhCSsAAMcBACAsAADIAQAgawIAxQEAIW0CAMUBACFuAgDFAQAhbwEAwwEAIXBAAMQBACFxQADEAQAhckAAxAEAIQkrAADKAQAgLAAAywEAIGsCAAAAAW0CAAAAAW4CAAAAAW8BAAAAAXBAAAAAAXFAAAAAAXJAAAAAAQMNAACqAgAgmQEAAKsCACCfAQAALwAgBA0AAN0BADCZAQAA3gEAMJsBAADgAQAgnwEAAOEBADAAAAAAAAsNAACIAgAwDgAAjAIAMJkBAACJAgAwmgEAAIoCADCbAQAAiwIAIJwBAADhAQAwnQEAAOEBADCeAQAA4QEAMJ8BAADhAQAwoAEAAI0CADChAQAA5AEAMAsNAAD8AQAwDgAAgQIAMJkBAAD9AQAwmgEAAP4BADCbAQAA_wEAIJwBAACAAgAwnQEAAIACADCeAQAAgAIAMJ8BAACAAgAwoAEAAIICADChAQAAgwIAMAsNAADzAQAwDgAA9wEAMJkBAAD0AQAwmgEAAPUBADCbAQAA9gEAIJwBAADhAQAwnQEAAOEBADCeAQAA4QEAMJ8BAADhAQAwoAEAAPgBADChAQAA5AEAMAkqAADJAQAgKwAAygEAIGsCAAAAAWwCAAAAAW0CAAAAAW8BAAAAAXBAAAAAAXFAAAAAAXJAAAAAAQIAAAAzACANAAD7AQAgAwAAADMAIA0AAPsBACAOAAD6AQAgAQgAAKkCADACAAAAMwAgCAAA-gEAIAIAAADlAQAgCAAA-QEAIAdrAgDFAQAhbAIAxQEAIW0CAMUBACFvAQDDAQAhcEAAxAEAIXFAAMQBACFyQADEAQAhCSoAAMYBACArAADHAQAgawIAxQEAIWwCAMUBACFtAgDFAQAhbwEAwwEAIXBAAMQBACFxQADEAQAhckAAxAEAIQkqAADJAQAgKwAAygEAIGsCAAAAAWwCAAAAAW0CAAAAAW8BAAAAAXBAAAAAAXFAAAAAAXJAAAAAAQ4pAADqAQAgawIAAAABbwEAAAABcUAAAAABckAAAAABfwEAAAABgAEBAAAAAYEBAQAAAAGHAQEAAAABiAEBAAAAAYoBQAAAAAGLAUAAAAABjAECAAAAAY0BAQAAAAECAAAAOQAgDQAAhwIAIAMAAAA5ACANAACHAgAgDgAAhgIAIAEIAACoAgAwEygAALYBACApAACxAQAgaAAAswEAMGkAADcAEGoAALMBADBrAgAAAAFvAQClAQAhcUAApwEAIXJAAKcBACF_AQClAQAhgAEBAKUBACGBAQEApgEAIYcBAQCmAQAhiAEBAKUBACGJAQIApAEAIYoBQAC0AQAhiwFAALQBACGMAQIAtQEAIY0BAQClAQAhAgAAADkAIAgAAIYCACACAAAAhAIAIAgAAIUCACARaAAAgwIAMGkAAIQCABBqAACDAgAwawIApAEAIW8BAKUBACFxQACnAQAhckAApwEAIX8BAKUBACGAAQEApQEAIYEBAQCmAQAhhwEBAKYBACGIAQEApQEAIYkBAgCkAQAhigFAALQBACGLAUAAtAEAIYwBAgC1AQAhjQEBAKUBACERaAAAgwIAMGkAAIQCABBqAACDAgAwawIApAEAIW8BAKUBACFxQACnAQAhckAApwEAIX8BAKUBACGAAQEApQEAIYEBAQCmAQAhhwEBAKYBACGIAQEApQEAIYkBAgCkAQAhigFAALQBACGLAUAAtAEAIYwBAgC1AQAhjQEBAKUBACENawIAxQEAIW8BAMMBACFxQADEAQAhckAAxAEAIX8BAMMBACGAAQEAwwEAIYEBAQDSAQAhhwEBANIBACGIAQEAwwEAIYoBQADZAQAhiwFAANkBACGMAQIA2gEAIY0BAQDDAQAhDikAANwBACBrAgDFAQAhbwEAwwEAIXFAAMQBACFyQADEAQAhfwEAwwEAIYABAQDDAQAhgQEBANIBACGHAQEA0gEAIYgBAQDDAQAhigFAANkBACGLAUAA2QEAIYwBAgDaAQAhjQEBAMMBACEOKQAA6gEAIGsCAAAAAW8BAAAAAXFAAAAAAXJAAAAAAX8BAAAAAYABAQAAAAGBAQEAAAABhwEBAAAAAYgBAQAAAAGKAUAAAAABiwFAAAAAAYwBAgAAAAGNAQEAAAABCSoAAMkBACAsAADLAQAgawIAAAABbAIAAAABbgIAAAABbwEAAAABcEAAAAABcUAAAAABckAAAAABAgAAADMAIA0AAJACACADAAAAMwAgDQAAkAIAIA4AAI8CACABCAAApwIAMAIAAAAzACAIAACPAgAgAgAAAOUBACAIAACOAgAgB2sCAMUBACFsAgDFAQAhbgIAxQEAIW8BAMMBACFwQADEAQAhcUAAxAEAIXJAAMQBACEJKgAAxgEAICwAAMgBACBrAgDFAQAhbAIAxQEAIW4CAMUBACFvAQDDAQAhcEAAxAEAIXFAAMQBACFyQADEAQAhCSoAAMkBACAsAADLAQAgawIAAAABbAIAAAABbgIAAAABbwEAAAABcEAAAAABcUAAAAABckAAAAABBA0AAIgCADCZAQAAiQIAMJsBAACLAgAgnwEAAOEBADAEDQAA_AEAMJkBAAD9AQAwmwEAAP8BACCfAQAAgAIAMAQNAADzAQAwmQEAAPQBADCbAQAA9gEAIJ8BAADhAQAwAAABfgEAAAABBi0AAJQCACAuAACVAgAgLwAAlAIAIIEBAADMAQAgkQEAAMwBACCYAQAAlgIAIAF-AQAAAAEIKAAAlwIAICkAAJQCACCBAQAAzAEAIIcBAADMAQAgigEAAMwBACCLAQAAzAEAIIwBAADMAQAgmAEAAJgCACABfgEAAAABAAAAAAABfgEAAAABAAAAAAABfgEAAAABB2sCAAAAAWwCAAAAAW4CAAAAAW8BAAAAAXBAAAAAAXFAAAAAAXJAAAAAAQ1rAgAAAAFvAQAAAAFxQAAAAAFyQAAAAAF_AQAAAAGAAQEAAAABgQEBAAAAAYcBAQAAAAGIAQEAAAABigFAAAAAAYsBQAAAAAGMAQIAAAABjQEBAAAAAQdrAgAAAAFsAgAAAAFtAgAAAAFvAQAAAAFwQAAAAAFxQAAAAAFyQAAAAAEKLQAAkQIAIC8AAJMCACBrAgAAAAFxQAAAAAFyQAAAAAGBAQEAAAABjgEBAAAAAY8BAQAAAAGQAQEAAAABkQEBAAAAAQIAAAAvACANAACqAgAgB2sCAAAAAW0CAAAAAW4CAAAAAW8BAAAAAXBAAAAAAXFAAAAAAXJAAAAAAQMAAABAACANAACqAgAgDgAArwIAIAwAAABAACAIAACvAgAgLQAA8AEAIC8AAPIBACBrAgDFAQAhcUAAxAEAIXJAAMQBACGBAQEA0gEAIY4BAQDDAQAhjwEBAMMBACGQAQEAwwEAIZEBAQDSAQAhCi0AAPABACAvAADyAQAgawIAxQEAIXFAAMQBACFyQADEAQAhgQEBANIBACGOAQEAwwEAIY8BAQDDAQAhkAEBAMMBACGRAQEA0gEAIQotAACRAgAgLgAAkgIAIGsCAAAAAXFAAAAAAXJAAAAAAYEBAQAAAAGOAQEAAAABjwEBAAAAAZABAQAAAAGRAQEAAAABAgAAAC8AIA0AALACACAKLgAAkgIAIC8AAJMCACBrAgAAAAFxQAAAAAFyQAAAAAGBAQEAAAABjgEBAAAAAY8BAQAAAAGQAQEAAAABkQEBAAAAAQIAAAAvACANAACyAgAgDygAAOkBACBrAgAAAAFvAQAAAAFxQAAAAAFyQAAAAAF_AQAAAAGAAQEAAAABgQEBAAAAAYcBAQAAAAGIAQEAAAABiQECAAAAAYoBQAAAAAGLAUAAAAABjAECAAAAAY0BAQAAAAECAAAAOQAgDQAAtAIAIAMAAABAACANAACwAgAgDgAAuAIAIAwAAABAACAIAAC4AgAgLQAA8AEAIC4AAPEBACBrAgDFAQAhcUAAxAEAIXJAAMQBACGBAQEA0gEAIY4BAQDDAQAhjwEBAMMBACGQAQEAwwEAIZEBAQDSAQAhCi0AAPABACAuAADxAQAgawIAxQEAIXFAAMQBACFyQADEAQAhgQEBANIBACGOAQEAwwEAIY8BAQDDAQAhkAEBAMMBACGRAQEA0gEAIQMAAABAACANAACyAgAgDgAAuwIAIAwAAABAACAIAAC7AgAgLgAA8QEAIC8AAPIBACBrAgDFAQAhcUAAxAEAIXJAAMQBACGBAQEA0gEAIY4BAQDDAQAhjwEBAMMBACGQAQEAwwEAIZEBAQDSAQAhCi4AAPEBACAvAADyAQAgawIAxQEAIXFAAMQBACFyQADEAQAhgQEBANIBACGOAQEAwwEAIY8BAQDDAQAhkAEBAMMBACGRAQEA0gEAIQMAAAA3ACANAAC0AgAgDgAAvgIAIBEAAAA3ACAIAAC-AgAgKAAA2wEAIGsCAMUBACFvAQDDAQAhcUAAxAEAIXJAAMQBACF_AQDDAQAhgAEBAMMBACGBAQEA0gEAIYcBAQDSAQAhiAEBAMMBACGJAQIAxQEAIYoBQADZAQAhiwFAANkBACGMAQIA2gEAIY0BAQDDAQAhDygAANsBACBrAgDFAQAhbwEAwwEAIXFAAMQBACFyQADEAQAhfwEAwwEAIYABAQDDAQAhgQEBANIBACGHAQEA0gEAIYgBAQDDAQAhiQECAMUBACGKAUAA2QEAIYsBQADZAQAhjAECANoBACGNAQEAwwEAIQAABRMABBQABRUABhYABxcACAAAAAAABRMABBQABRUABhYABxcACAAFEwAMFAANFQAOFgAPFwAQAAAAAAAFEwAMFAANFQAOFgAPFwAQBBMAFi00Ey46FC87EwMqABQrABIsABIDEwAVKAASKTUTASk2AAMtPAAuPQAvPgAFEwAYFAAZFQAaFgAbFwAcAAAAAAAFEwAYFAAZFQAaFgAbFwAcBRMAHxQAIBUAIRYAIhcAIwAAAAAABRMAHxQAIBUAIRYAIhcAIwAFEwAnFAAoFQApFgAqFwArAAAAAAAFEwAnFAAoFQApFgAqFwArBRMALhQALxUAMBYAMRcAMgAAAAAABRMALhQALxUAMBYAMRcAMgECAQIDAQUGAQYHAQcIAQkKAQoMAgsOAQwQAg8RARASARETAhgWAxkXCRoZChsaChwdCh0eCh4fCh8hCiAjAiElCiInAiMoCiQpCiUqAiYtCycuETAwEjE_EjJCEjNDEjREEjVGEjZIAjdKEjhMAjlNEjpOEjtPAjxSFz1THT5UFD9VFEBWFEFXFEJYFENaFERcAkVeFEZgAkdhFEhiFEljAkpmHktnJExpJU1qJU5tJU9uJVBvJVFxJVJzAlN1JVR3AlV4JVZ5JVd6Alh9Jll-LFp_E1uAARNcgQETXYIBE16DARNfhQETYIcBAmGJARNiiwECY4wBE2SNARNljgECZpEBLWeSATM"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await __turbopack_context__.A("[externals]/node:buffer [external] (node:buffer, cjs, async loader)");
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async ()=>await __turbopack_context__.A("[externals]/@prisma/client/runtime/query_compiler_fast_bg.mysql.mjs [external] (@prisma/client/runtime/query_compiler_fast_bg.mysql.mjs, esm_import, [project]/Desktop/calaya-taskly/node_modules/@prisma/client, async loader)"),
    getQueryCompilerWasmModule: async ()=>{
        const { wasm } = await __turbopack_context__.A("[externals]/@prisma/client/runtime/query_compiler_fast_bg.mysql.wasm-base64.mjs [external] (@prisma/client/runtime/query_compiler_fast_bg.mysql.wasm-base64.mjs, esm_import, [project]/Desktop/calaya-taskly/node_modules/@prisma/client, async loader)");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$prisma$2f$client$29$__["getPrismaClient"](config);
}
}),
"[project]/Desktop/calaya-taskly/generated/prisma/internal/prismaNamespace.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnyNull",
    ()=>AnyNull,
    "DbNull",
    ()=>DbNull,
    "Decimal",
    ()=>Decimal,
    "DepartmentOrderByRelevanceFieldEnum",
    ()=>DepartmentOrderByRelevanceFieldEnum,
    "DepartmentScalarFieldEnum",
    ()=>DepartmentScalarFieldEnum,
    "DocumentOrderByRelevanceFieldEnum",
    ()=>DocumentOrderByRelevanceFieldEnum,
    "DocumentScalarFieldEnum",
    ()=>DocumentScalarFieldEnum,
    "JsonNull",
    ()=>JsonNull,
    "ModelName",
    ()=>ModelName,
    "NullTypes",
    ()=>NullTypes,
    "NullsOrder",
    ()=>NullsOrder,
    "PrismaClientInitializationError",
    ()=>PrismaClientInitializationError,
    "PrismaClientKnownRequestError",
    ()=>PrismaClientKnownRequestError,
    "PrismaClientRustPanicError",
    ()=>PrismaClientRustPanicError,
    "PrismaClientUnknownRequestError",
    ()=>PrismaClientUnknownRequestError,
    "PrismaClientValidationError",
    ()=>PrismaClientValidationError,
    "RoleOrderByRelevanceFieldEnum",
    ()=>RoleOrderByRelevanceFieldEnum,
    "RoleScalarFieldEnum",
    ()=>RoleScalarFieldEnum,
    "SortOrder",
    ()=>SortOrder,
    "Sql",
    ()=>Sql,
    "TaskAssignmentOrderByRelevanceFieldEnum",
    ()=>TaskAssignmentOrderByRelevanceFieldEnum,
    "TaskAssignmentScalarFieldEnum",
    ()=>TaskAssignmentScalarFieldEnum,
    "TaskOrderByRelevanceFieldEnum",
    ()=>TaskOrderByRelevanceFieldEnum,
    "TaskScalarFieldEnum",
    ()=>TaskScalarFieldEnum,
    "TransactionIsolationLevel",
    ()=>TransactionIsolationLevel,
    "UserOrderByRelevanceFieldEnum",
    ()=>UserOrderByRelevanceFieldEnum,
    "UserScalarFieldEnum",
    ()=>UserScalarFieldEnum,
    "defineExtension",
    ()=>defineExtension,
    "empty",
    ()=>empty,
    "getExtensionContext",
    ()=>getExtensionContext,
    "join",
    ()=>join,
    "prismaVersion",
    ()=>prismaVersion,
    "raw",
    ()=>raw,
    "sql",
    ()=>sql
]);
/* !!! This is code generated by Prisma. Do not edit directly. !!! */ /* eslint-disable */ // biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * WARNING: This is an internal file that is subject to change!
 *
 * 🛑 Under no circumstances should you import this file directly! 🛑
 *
 * All exports from this file are wrapped under a `Prisma` namespace object in the client.ts file.
 * While this enables partial backward compatibility, it is not part of the stable public API.
 *
 * If you are looking for your Models, Enums, and Input Types, please import them from the respective
 * model files in the `model` directory!
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client/runtime/client [external] (@prisma/client/runtime/client, cjs, [project]/Desktop/calaya-taskly/node_modules/@prisma/client)");
;
const PrismaClientKnownRequestError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientKnownRequestError"];
const PrismaClientUnknownRequestError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientUnknownRequestError"];
const PrismaClientRustPanicError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientRustPanicError"];
const PrismaClientInitializationError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientInitializationError"];
const PrismaClientValidationError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientValidationError"];
const sql = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$prisma$2f$client$29$__["sqltag"];
const empty = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$prisma$2f$client$29$__["empty"];
const join = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$prisma$2f$client$29$__["join"];
const raw = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$prisma$2f$client$29$__["raw"];
const Sql = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$prisma$2f$client$29$__["Sql"];
const Decimal = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$prisma$2f$client$29$__["Decimal"];
const getExtensionContext = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$prisma$2f$client$29$__["Extensions"].getExtensionContext;
const prismaVersion = {
    client: "7.4.1",
    engine: "55ae170b1ced7fc6ed07a15f110549408c501bb3"
};
const NullTypes = {
    DbNull: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$prisma$2f$client$29$__["NullTypes"].DbNull,
    JsonNull: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$prisma$2f$client$29$__["NullTypes"].JsonNull,
    AnyNull: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$prisma$2f$client$29$__["NullTypes"].AnyNull
};
const DbNull = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$prisma$2f$client$29$__["DbNull"];
const JsonNull = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$prisma$2f$client$29$__["JsonNull"];
const AnyNull = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$prisma$2f$client$29$__["AnyNull"];
const ModelName = {
    Department: 'Department',
    Role: 'Role',
    User: 'User',
    Task: 'Task',
    Document: 'Document',
    TaskAssignment: 'TaskAssignment'
};
const TransactionIsolationLevel = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$prisma$2f$client$29$__["makeStrictEnum"]({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
const DepartmentScalarFieldEnum = {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
const RoleScalarFieldEnum = {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
const UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    password: 'password',
    role: 'role',
    name: 'name',
    department: 'department',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
const TaskScalarFieldEnum = {
    id: 'id',
    title: 'title',
    description: 'description',
    department: 'department',
    priority: 'priority',
    status: 'status',
    type: 'type',
    createdById: 'createdById',
    startDate: 'startDate',
    dueDate: 'dueDate',
    estimatedHours: 'estimatedHours',
    visibility: 'visibility',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
const DocumentScalarFieldEnum = {
    id: 'id',
    title: 'title',
    type: 'type',
    department: 'department',
    uploadedBy: 'uploadedBy',
    scope: 'scope',
    fileSize: 'fileSize',
    fileUrl: 'fileUrl',
    downloads: 'downloads',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
const TaskAssignmentScalarFieldEnum = {
    id: 'id',
    taskId: 'taskId',
    userId: 'userId',
    assignedById: 'assignedById',
    status: 'status',
    assignedAt: 'assignedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
const DepartmentOrderByRelevanceFieldEnum = {
    name: 'name'
};
const RoleOrderByRelevanceFieldEnum = {
    name: 'name'
};
const NullsOrder = {
    first: 'first',
    last: 'last'
};
const UserOrderByRelevanceFieldEnum = {
    email: 'email',
    password: 'password',
    role: 'role',
    name: 'name',
    department: 'department'
};
const TaskOrderByRelevanceFieldEnum = {
    title: 'title',
    description: 'description',
    department: 'department',
    priority: 'priority',
    status: 'status',
    type: 'type',
    visibility: 'visibility'
};
const DocumentOrderByRelevanceFieldEnum = {
    title: 'title',
    type: 'type',
    department: 'department',
    uploadedBy: 'uploadedBy',
    scope: 'scope',
    fileSize: 'fileSize',
    fileUrl: 'fileUrl'
};
const TaskAssignmentOrderByRelevanceFieldEnum = {
    status: 'status'
};
const defineExtension = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$prisma$2f$client$29$__["Extensions"].defineExtension;
}),
"[project]/Desktop/calaya-taskly/generated/prisma/enums.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* !!! This is code generated by Prisma. Do not edit directly. !!! */ /* eslint-disable */ // biome-ignore-all lint: generated file
// @ts-nocheck 
/*
* This file exports all enum related types from the schema.
*
* 🟢 You can import this file directly.
*/ // This file is empty because there are no enums in the schema.
__turbopack_context__.s([]);
;
}),
"[project]/Desktop/calaya-taskly/generated/prisma/client.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/* !!! This is code generated by Prisma. Do not edit directly. !!! */ /* eslint-disable */ // biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * This file should be your main import to use Prisma. Through it you get access to all the models, enums, and input types.
 * If you're looking for something you can import in the client-side of your application, please refer to the `browser.ts` file instead.
 *
 * 🟢 You can import this file directly.
 */ __turbopack_context__.s([
    "PrismaClient",
    ()=>PrismaClient
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:url [external] (node:url, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$generated$2f$prisma$2f$internal$2f$class$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/generated/prisma/internal/class.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$generated$2f$prisma$2f$internal$2f$prismaNamespace$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/generated/prisma/internal/prismaNamespace.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$generated$2f$prisma$2f$enums$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/generated/prisma/enums.ts [app-route] (ecmascript)");
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("Desktop/calaya-taskly/generated/prisma/client.ts")}`;
    }
};
;
;
globalThis['__dirname'] = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["dirname"]((0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__["fileURLToPath"])(__TURBOPACK__import$2e$meta__.url));
;
;
;
;
const PrismaClient = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$generated$2f$prisma$2f$internal$2f$class$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPrismaClientClass"]();
;
}),
"[project]/Desktop/calaya-taskly/src/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$dotenv$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/dotenv/config.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$prisma$2f$adapter$2d$mariadb$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/@prisma/adapter-mariadb/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$generated$2f$prisma$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/generated/prisma/client.ts [app-route] (ecmascript) <locals>");
;
;
;
const adapter = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f40$prisma$2f$adapter$2d$mariadb$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaMariaDb"]({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: parseInt(process.env.DATABASE_PORT ?? "3306", 10),
    connectionLimit: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 5
});
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$generated$2f$prisma$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PrismaClient"]({
    adapter
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[project]/Desktop/calaya-taskly/src/lib/password.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hashPassword",
    ()=>hashPassword,
    "verifyPassword",
    ()=>verifyPassword
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
function hashPassword(password) {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash("sha256").update(password).digest("hex");
}
function verifyPassword(password, hash) {
    return hashPassword(password) === hash;
}
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
"[project]/Desktop/calaya-taskly/src/app/api/auth/send-otp/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$auth$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/lib/auth-config.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$password$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/lib/password.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$resend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/lib/resend.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$app$2f$api$2f$auth$2f$otp$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/app/api/auth/otp-store.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$jwt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/calaya-taskly/src/lib/jwt.ts [app-route] (ecmascript)");
;
;
;
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
        const emailLower = email.toLowerCase().trim();
        // Admin login: no OTP required
        if (emailLower === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$auth$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ADMIN_EMAIL"] && password === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$auth$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ADMIN_PASSWORD"]) {
            const dbAdmin = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
                where: {
                    email: emailLower
                }
            });
            if (dbAdmin && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$password$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyPassword"])(password, dbAdmin.password)) {
                const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$jwt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["signAuthToken"])({
                    email: dbAdmin.email,
                    role: dbAdmin.role
                });
                return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true,
                    skipOtp: true,
                    token,
                    route: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$auth$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRouteForRole"])(dbAdmin.role)
                });
            }
        }
        // 1. Check User database first
        const dbUser = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
            where: {
                email: emailLower
            }
        });
        if (dbUser) {
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$password$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyPassword"])(password, dbUser.password)) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "Invalid credentials."
                }, {
                    status: 401
                });
            }
            const userInfo = {
                email: dbUser.email,
                role: dbUser.role,
                route: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$auth$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRouteForRole"])(dbUser.role)
            };
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$app$2f$api$2f$auth$2f$otp$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["saveOtp"])(userInfo.email, otp, userInfo);
            if (!process.env.RESEND_API_KEY) {
                // eslint-disable-next-line no-console
                console.log(`OTP for ${userInfo.email}: ${otp} (RESEND_API_KEY not set, email not sent)`);
            } else {
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$resend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resend"].emails.send({
                    from: "Calaya Taskly <noreply@calayaengineering.com>",
                    to: [
                        userInfo.email
                    ],
                    subject: "Your Calaya Taskly verification code",
                    text: `Your one-time verification code is ${otp}. It expires in 5 minutes.`
                });
                if (error) {
                    // eslint-disable-next-line no-console
                    console.error("Resend error:", error);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: `Email failed: ${error.message}. Check Resend dashboard and domain verification.`
                    }, {
                        status: 500
                    });
                }
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                role: userInfo.role,
                route: userInfo.route
            });
        }
        // 2. Fall back to demo credentials
        const demoUser = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$auth$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEMO_CREDENTIALS"].find((demo)=>demo.email.toLowerCase() === emailLower && demo.password === password);
        if (!demoUser) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid credentials."
            }, {
                status: 401
            });
        }
        const userInfo = {
            email: demoUser.email,
            role: demoUser.role,
            route: demoUser.route
        };
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$app$2f$api$2f$auth$2f$otp$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["saveOtp"])(userInfo.email, otp, userInfo);
        if (!process.env.RESEND_API_KEY) {
            // eslint-disable-next-line no-console
            console.log(`OTP for ${userInfo.email}: ${otp} (RESEND_API_KEY not set, email not sent)`);
        } else {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$src$2f$lib$2f$resend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resend"].emails.send({
                from: "Calaya Taskly <noreply@calayaengineering.com>",
                to: [
                    userInfo.email
                ],
                subject: "Your Calaya Taskly verification code",
                text: `Your one-time verification code is ${otp}. It expires in 5 minutes.`
            });
            if (error) {
                // eslint-disable-next-line no-console
                console.error("Resend error:", error);
                return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: `Email failed: ${error.message}. Check Resend dashboard and domain verification.`
                }, {
                    status: 500
                });
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$calaya$2d$taskly$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            role: userInfo.role,
            route: userInfo.route
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

//# sourceMappingURL=%5Broot-of-the-server%5D__4af45373._.js.map
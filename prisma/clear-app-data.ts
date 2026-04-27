/**
 * Deletes operational data while keeping authentication / account setup:
 * preserved: User, Role, Department, DepartmentHod
 * removed: tasks, tenders, documents, reports, announcements, notifications, badge seen state, access requests, OTP tokens
 *
 * Usage: CONFIRM_DB_CLEAR=yes npx tsx prisma/clear-app-data.ts
 */
import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

function envFlag(value: string | undefined, fallback: boolean) {
  if (value === undefined) return fallback;
  return !["0", "false", "off", "no", "disable", "disabled"].includes(value.trim().toLowerCase());
}

function buildSslConfig(hostForHeuristic: string) {
  const shouldUseSsl = envFlag(
    process.env.DATABASE_SSL_MODE ?? process.env.DATABASE_SSL,
    /aivencloud\.com|amazonaws\.com|planetscale|render\.com|railway\.app/i.test(hostForHeuristic)
  );

  if (!shouldUseSsl) return undefined;

  const ca = process.env.DATABASE_SSL_CA?.replace(/\\n/g, "\n");
  const rejectUnauthorized = envFlag(
    process.env.DATABASE_SSL_REJECT_UNAUTHORIZED,
    !/aivencloud\.com/i.test(hostForHeuristic)
  );

  return ca ? { ca, rejectUnauthorized } : { rejectUnauthorized };
}

if (process.env.CONFIRM_DB_CLEAR !== "yes") {
  console.error(
    "Refusing to run: set CONFIRM_DB_CLEAR=yes to clear application data (users and roles are kept)."
  );
  process.exit(1);
}

function connectionFromEnv(): {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
} {
  const host = process.env.DATABASE_HOST?.trim();
  const user = process.env.DATABASE_USER?.trim();
  const database = process.env.DATABASE_NAME?.trim();
  if (host && user && database) {
    return {
      host,
      user,
      password: process.env.DATABASE_PASSWORD ?? "",
      database,
      port: parseInt(process.env.DATABASE_PORT ?? "3306", 10),
    };
  }

  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    throw new Error("Set DATABASE_HOST/DATABASE_USER/DATABASE_NAME or DATABASE_URL");
  }
  const u = new URL(url);
  const db = u.pathname.replace(/^\//, "").split("?")[0];
  if (!db) throw new Error("DATABASE_URL must include a database name");
  return {
    host: u.hostname,
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: db,
    port: parseInt(u.port || "3306", 10),
  };
}

const conn = connectionFromEnv();

const adapter = new PrismaMariaDb({
  host: conn.host,
  user: conn.user,
  password: conn.password,
  database: conn.database,
  port: conn.port,
  connectionLimit: 5,
  connectTimeout: parseInt(process.env.DATABASE_CONNECT_TIMEOUT_MS ?? "10000", 10),
  acquireTimeout: parseInt(process.env.DATABASE_ACQUIRE_TIMEOUT_MS ?? "10000", 10),
  ssl: buildSslConfig(conn.host),
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.$transaction(async (tx) => {
    const del = async (label: string, fn: () => Promise<{ count: number }>) => {
      const r = await fn();
      console.log(`${label}: deleted ${r.count} row(s)`);
    };

    await del("Notification", () => tx.notification.deleteMany({}));
    await del("AnnouncementRead", () => tx.announcementRead.deleteMany({}));
    await del("Announcement", () => tx.announcement.deleteMany({}));
    await del("DailyReport", () => tx.dailyReport.deleteMany({}));
    await del("Document", () => tx.document.deleteMany({}));
    await del("Tender", () => tx.tender.deleteMany({}));
    await del("Task", () => tx.task.deleteMany({}));
    await del("AccessRequest", () => tx.accessRequest.deleteMany({}));
    await del("UserSectionSeen", () => tx.userSectionSeen.deleteMany({}));
    await del("OtpToken", () => tx.otpToken.deleteMany({}));
  });

  const users = await prisma.user.count();
  const roles = await prisma.role.count();
  const departments = await prisma.department.count();
  const hodLinks = await prisma.departmentHod.count();
  console.log("\nKept: User, Role, Department, DepartmentHod");
  console.log(`Counts — users: ${users}, roles: ${roles}, departments: ${departments}, departmentHod: ${hodLinks}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

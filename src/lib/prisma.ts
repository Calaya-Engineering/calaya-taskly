import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
  adapter: PrismaMariaDb;
};

const databaseHost = process.env.DATABASE_HOST ?? "";

function envFlag(value: string | undefined, fallback: boolean) {
  if (value === undefined) return fallback;
  return !["0", "false", "off", "no", "disable", "disabled"].includes(value.trim().toLowerCase());
}

function buildSslConfig() {
  const shouldUseSsl = envFlag(
    process.env.DATABASE_SSL_MODE ?? process.env.DATABASE_SSL,
    /aivencloud\.com|amazonaws\.com|planetscale|render\.com|railway\.app/i.test(databaseHost)
  );

  if (!shouldUseSsl) return undefined;

  const ca = process.env.DATABASE_SSL_CA?.replace(/\\n/g, "\n");
  const rejectUnauthorized = envFlag(
    process.env.DATABASE_SSL_REJECT_UNAUTHORIZED,
    !/aivencloud\.com/i.test(databaseHost)
  );

  return ca ? { ca, rejectUnauthorized } : { rejectUnauthorized };
}

if (!globalForPrisma.adapter) {
  globalForPrisma.adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST!,
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
    port: parseInt(process.env.DATABASE_PORT ?? "3306", 10),
    connectionLimit: process.env.NODE_ENV === "production" ? 10 : 5,
    connectTimeout: parseInt(process.env.DATABASE_CONNECT_TIMEOUT_MS ?? "10000", 10),
    acquireTimeout: parseInt(process.env.DATABASE_ACQUIRE_TIMEOUT_MS ?? "10000", 10),
    ssl: buildSslConfig(),
  }, {
    onConnectionError(error) {
      console.error("Prisma MariaDB connection error:", error);
      if (error?.cause) {
        console.error("Prisma MariaDB connection cause:", error.cause);
      }
    },
  });
}

// Force a new instance if the cached one is missing models
const useCached =
  globalForPrisma.prisma &&
  (globalForPrisma.prisma as any).document &&
  (globalForPrisma.prisma as any).dailyReport &&
  (globalForPrisma.prisma as any).dailyReportEntry &&
  (globalForPrisma.prisma as any).announcementRead &&
  (globalForPrisma.prisma as any).notification &&
  (globalForPrisma.prisma as any).departmentHod &&
  (globalForPrisma.prisma as any).userSectionSeen;

export const prisma = useCached ? globalForPrisma.prisma : new PrismaClient({ adapter: globalForPrisma.adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

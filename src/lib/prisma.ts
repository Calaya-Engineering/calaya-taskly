import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
  adapter: PrismaMariaDb;
};

if (!globalForPrisma.adapter) {
  globalForPrisma.adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST!,
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
    port: parseInt(process.env.DATABASE_PORT ?? "3306", 10),
    connectionLimit: process.env.NODE_ENV === "production" ? 10 : 5,
  });
}

// Force a new instance if the cached one is missing the 'announcementRead' model
const useCached = globalForPrisma.prisma && (globalForPrisma.prisma as any).document && (globalForPrisma.prisma as any).announcementRead;

export const prisma = useCached ? globalForPrisma.prisma : new PrismaClient({ adapter: globalForPrisma.adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

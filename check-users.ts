
import { PrismaClient } from "./generated/prisma/client";
import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST!,
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
    port: parseInt(process.env.DATABASE_PORT ?? "3306", 10),
});

const prisma = new PrismaClient({ adapter });

async function main() {
    try {
        const users = await prisma.user.findMany({
            select: { email: true, role: true }
        });
        console.log("Users:", users);
    } catch (error) {
        console.error("Database error:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();

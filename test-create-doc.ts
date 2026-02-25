
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
        const doc = await prisma.document.create({
            data: {
                title: "Test Document " + Date.now(),
                type: "Report",
                department: "Technical",
                scope: "PRIVATE",
                uploadedBy: "test@example.com",
                fileSize: "1.2 MB",
                fileUrl: "https://example.com/file.pdf",
            },
        });
        console.log("Document created successfully:", doc);
    } catch (error) {
        console.error("Database error during document creation:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();

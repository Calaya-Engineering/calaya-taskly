
import { prisma } from "./src/lib/prisma";

async function main() {
    try {
        const docs = await prisma.document.findMany();
        console.log("Documents currently in DB:", JSON.stringify(docs, null, 2));
    } catch (error) {
        console.error("Database error:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();

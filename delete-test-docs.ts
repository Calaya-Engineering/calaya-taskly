
import { prisma } from "./src/lib/prisma";

async function main() {
    try {
        const deleted = await prisma.document.deleteMany({
            where: {
                title: {
                    startsWith: "Test Document"
                }
            }
        });
        console.log(`Deleted ${deleted.count} test documents.`);

        // Also delete any other obvious test ones
        const deletedByEmail = await prisma.document.deleteMany({
            where: {
                uploadedBy: "test@example.com"
            }
        });
        console.log(`Deleted ${deletedByEmail.count} documents uploaded by test@example.com.`);

    } catch (error) {
        console.error("Database error during deletion:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();

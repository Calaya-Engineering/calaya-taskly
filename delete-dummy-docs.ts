
import { prisma } from "./src/lib/prisma";

async function main() {
    try {
        const seedNames = [
            "Sarah Smith", "Mike Johnson", "Robert Chen", "David Kim",
            "James Wilson", "Maria Garcia", "Alex Turner", "Lisa Wang",
            "John Doe"
        ];
        const deleted = await prisma.document.deleteMany({
            where: {
                uploadedBy: {
                    in: seedNames
                }
            }
        });
        console.log(`Deleted ${deleted.count} dummy documents from seed data.`);
    } catch (error) {
        console.error("Database error during deletion:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();

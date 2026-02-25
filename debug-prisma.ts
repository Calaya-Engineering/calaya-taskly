
import { prisma } from "./src/lib/prisma";

async function main() {
    console.log("Prisma keys:", Object.keys(prisma));
    // @ts-ignore
    console.log("Prisma document property:", prisma.document);
    // @ts-ignore
    console.log("Prisma Document property:", prisma.Document);
}

main();

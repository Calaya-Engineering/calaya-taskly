import { prisma } from "./src/lib/prisma";
async function main() {
  const c = await prisma.user.count();
  console.log("Success, count:", c);
}
main().finally(() => prisma.$disconnect());

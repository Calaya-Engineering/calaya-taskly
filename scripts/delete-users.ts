import { prisma } from '../src/lib/prisma';

async function main() {
  const deleted = await prisma.user.deleteMany({
    where: {
      email: {
        not: "admin@calaya.com"
      }
    }
  });

  console.log(`Successfully deleted ${deleted.count} users.`);
}
main();

import { prisma } from '../src/lib/prisma';

async function main() {
  const userCount = await prisma.user.count();
  const depCount = await prisma.department.count();
  const roleCount = await prisma.role.count();

  console.log({
    users: userCount,
    departments: depCount,
    roles: roleCount
  });
}
main();

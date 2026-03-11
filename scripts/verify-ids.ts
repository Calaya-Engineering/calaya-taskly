import { prisma } from '../src/lib/prisma';

async function main() {
  const roles = await prisma.role.findMany();
  const departments = await prisma.department.findMany();
  
  console.log("Roles:");
  roles.forEach(r => console.log(`${r.id}: ${r.name}`));
  
  console.log("\nDepartments:");
  departments.forEach(d => console.log(`${d.id}: ${d.name}`));

  const userCount = await prisma.user.count();
  console.log(`\nUsers count: ${userCount}`);
}
main();

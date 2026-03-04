import { prisma } from './src/lib/prisma'

async function main() {
  const hod = await prisma.user.findFirst({ where: { role: 'HOD' } })
  console.log("HOD:", hod)
  if (hod) {
    const assignments = await prisma.taskAssignment.findMany({ where: { userId: hod.id } })
    console.log("Assignments for HOD:", assignments)

    // Test the logic directly
    const uid = hod.id;
    const hodOrConditions = [
      { department: hod.department },
      { assignments: { some: { userId: hod.id } } }
    ];
    const where: any = { type: { not: 'EVENT' } };
    const additionalAnds: any[] = [{ assignments: { some: { userId: uid } } }];
    where.AND = [
      { OR: hodOrConditions },
      ...additionalAnds
    ];

    const tasks = await prisma.task.findMany({ where, include: { assignments: true } })
    console.log("Tasks retrieved by API logic:", tasks.length)
    //    console.log("Tasks:", tasks)
  }
}
main().then(() => console.log('Done')).catch(console.error)

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkTasks() {
  const meId = 1; // Assuming HOD is id 1 or we can find an HOD
  const hod = await prisma.user.findFirst({ where: { role: 'HOD' } });
  if (!hod) return console.log("No HOD found");

  const uid = hod.id;
  
  const hodOrConditions = [
    { department: hod.department },
    { assignments: { some: { userId: uid } } }
  ];

  const additionalAnds = [];
  additionalAnds.push({ assignments: { some: { userId: uid } } });

  const where = {
    AND: [
      { OR: hodOrConditions },
      ...additionalAnds
    ]
  };

  const tasks = await prisma.task.findMany({ where, include: { assignments: true } });
  
  console.log("HOD:", hod.email, "Tasks assigned to them:", tasks.length);
  // Compare to if we just fetched tasks where assignments has their id
  const tasks2 = await prisma.task.findMany({ where: { assignments: { some: { userId: uid } } }, include: { assignments: true } });
  console.log("Expected tasks assigned to them:", tasks2.length);
  
}
checkTasks().finally(() => prisma.$disconnect());

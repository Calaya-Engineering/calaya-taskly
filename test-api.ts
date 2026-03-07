import { PrismaClient } from "./generated/prisma/client";

const prisma = new PrismaClient();

async function checkTasks() {
  const hod = await prisma.user.findFirst({ where: { role: "HOD" } });
  if (!hod) {
    console.log("No HOD found");
    return;
  }

  const uid = hod.id;

  const hodOrConditions = [
    { department: hod.department },
    { assignments: { some: { userId: uid } } },
  ];

  const additionalAnds = [{ assignments: { some: { userId: uid } } }];

  const where = {
    AND: [{ OR: hodOrConditions }, ...additionalAnds],
  };

  const tasks = await prisma.task.findMany({ where, include: { assignments: true } });

  console.log("HOD:", hod.email, "Tasks assigned to them:", tasks.length);

  const tasks2 = await prisma.task.findMany({
    where: { assignments: { some: { userId: uid } } },
    include: { assignments: true },
  });
  console.log("Expected tasks assigned to them:", tasks2.length);
}

checkTasks().finally(() => prisma.$disconnect());

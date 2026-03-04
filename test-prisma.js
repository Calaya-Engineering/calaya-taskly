const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const currentUser = { id: 1, department: "Engineering", role: "HOD" };
  const assigneeId = "1";
  
  const where = {};
  
  const hodOrConditions = [
    { department: currentUser.department },
    { assignments: { some: { userId: currentUser.id } } }
  ];

  const additionalAnds = [];
  if (assigneeId) {
    const uid = parseInt(assigneeId, 10);
    if (!Number.isNaN(uid)) additionalAnds.push({ assignments: { some: { userId: uid } } });
  }

  if (additionalAnds.length > 0) {
    where.AND = [
      { OR: hodOrConditions },
      ...additionalAnds
    ];
  } else {
    where.OR = hodOrConditions;
  }
  
  console.log("WHERE CLAUSE:", JSON.stringify(where, null, 2));
}
main();

import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";
import crypto from "crypto";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST!,
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  port: parseInt(process.env.DATABASE_PORT ?? "3306", 10),
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

function hashPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

const DEMO_PASSWORD = "demo123";

/**
 * Roles seeded into the Role table.
 */
const ROLES = [
  { name: "Admin", dashboardRoute: "/admin-dashboard" },
  { name: "MD", dashboardRoute: "/md-dashboard" },
  { name: "HOD", dashboardRoute: "/hod-dashboard" },
  { name: "Staff", dashboardRoute: "/staff-dashboard" },
];

const DEPARTMENTS = [
  "Technical",
  "Workshop",
  "Logistics",
  "Contract and Procurement",
  "Legal and Compliances",
  "HR",
  "HSE",
  "Business Development (BDD)",
  "Accounts",
  "NCD",
  "QHSE",
  "Admin",
];

async function main() {
  console.log("Erasing existing database records for a clean slate with contiguous IDs...");

  // Delete all rows in reverse order of relationships to prevent foreign key errors. 
  // We don't have PRAGMA foreign_keys = OFF here, so we must be orderly or just let the tables empty.
  await prisma.notification.deleteMany();
  await prisma.announcementRead.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.taskAssignment.deleteMany();
  await prisma.task.deleteMany();
  await prisma.document.deleteMany();
  await prisma.tender.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();
  await prisma.department.deleteMany();

  // Seed roles sequentially to guarantee IDs 1, 2, 3...
  for (const role of ROLES) {
    await prisma.role.create({
      data: { name: role.name, dashboardRoute: role.dashboardRoute },
    });
  }
  console.log(`Seeded ${ROLES.length} roles (guaranteed sequential IDs)`);

  // Seed departments
  for (const name of DEPARTMENTS) {
    await prisma.department.create({
      data: { name },
    });
  }
  console.log(`Seeded ${DEPARTMENTS.length} departments (guaranteed sequential IDs)`);

  const passwordHash = hashPassword("admin123");
  await prisma.user.create({
    data: {
      email: "admin@calaya.com",
      password: passwordHash,
      name: "System Admin",
      role: "Admin",
    },
  });
  console.log("Seeded Admin user: admin@calaya.com");
  // Removed extra MD, HOD, and Staff user creations per user request
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

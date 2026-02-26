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

const HOD_USERS = [
  { email: "hod.technical@company.com", name: "John Smith", department: "Technical", role: "HOD" },
  { email: "hod.workshop@company.com", name: "David Chen", department: "Workshop", role: "HOD" },
  { email: "hod.hse@company.com", name: "Maria Garcia", department: "HSE", role: "HOD" },
  { email: "hod.logistics@company.com", name: "Robert Lee", department: "Logistics", role: "HOD" },
  { email: "hod.accounts@company.com", name: "Sarah Johnson", department: "Accounts", role: "HOD" },
  { email: "hod.hr@company.com", name: "Patricia Davis", department: "HR", role: "HOD" },
  { email: "hod.procurement@company.com", name: "James Wilson", department: "Contract and Procurement", role: "HOD" },
  { email: "hod.legal@company.com", name: "Lisa Wang", department: "Legal and Compliances", role: "HOD" },
];

const STAFF_USERS = [
  { email: "john.doe@company.com", name: "John Doe", department: "Technical", role: "Staff" },
  { email: "mike.johnson@company.com", name: "Mike Johnson", department: "Technical", role: "Staff" },
  { email: "alex.turner@company.com", name: "Alex Turner", department: "Technical", role: "Staff" },
  { email: "sarah.smith@company.com", name: "Sarah Smith", department: "HSE", role: "Staff" },
  { email: "robert.chen@company.com", name: "Robert Chen", department: "Workshop", role: "Staff" },
  { email: "emma.wilson@company.com", name: "Emma Wilson", department: "Technical", role: "Staff" },
  { email: "michael.brown@company.com", name: "Michael Brown", department: "Logistics", role: "Staff" },
  { email: "lisa.wang@company.com", name: "Lisa Wang", department: "Logistics", role: "Staff" },
  { email: "david.kim@company.com", name: "David Kim", department: "Legal and Compliances", role: "Staff" },
  { email: "james.miller@company.com", name: "James Miller", department: "HR", role: "Staff" },
];

const DEMO_PASSWORD = "demo123";

/**
 * Roles seeded into the Role table.
 * - Admin: Full CRUD on users, roles, departments, accounts
 * - MD: Company-wide tasks, approvals, escalations
 * - HOD: Manage users in own department; create/edit/delete Staff, Personnel, Corp Member
 * - Staff / Personnel / Corp Member: Same dashboard and capabilities
 * - Secretary: Upload reports, manage documents, events, tenders
 */
const ROLES = [
  "Admin",
  "MD",
  "HOD",
  "Staff",
  "Personnel",
  "Corp Member",
  "Secretary",
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
  // Seed roles
  for (const name of ROLES) {
    await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log(`Seeded ${ROLES.length} roles`);

  // Seed departments first (required for task creation)
  for (const name of DEPARTMENTS) {
    await prisma.department.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log(`Seeded ${DEPARTMENTS.length} departments`);

  const passwordHash = hashPassword("admin123");
  await prisma.user.upsert({
    where: { email: "admin@calaya.com" },
    update: { password: passwordHash, role: "Admin" },
    create: {
      email: "admin@calaya.com",
      password: passwordHash,
      name: "System Admin",
      role: "Admin",
    },
  });
  console.log("Seeded Admin user: admin@calaya.com (password: admin123, no OTP)");

  await prisma.user.upsert({
    where: { email: "izuchukwuonuoha6@gmail.com" },
    update: { password: passwordHash, role: "MD" },
    create: {
      email: "izuchukwuonuoha6@gmail.com",
      password: passwordHash,
      role: "MD",
    },
  });
  console.log("Seeded MD user: izuchukwuonuoha6@gmail.com");

  await prisma.user.upsert({
    where: { email: "izuchukwuonuoha6+HOD@gmail.com" },
    update: { password: passwordHash, role: "HOD", name: "Tony Junior" },
    create: {
      email: "izuchukwuonuoha6+HOD@gmail.com",
      password: passwordHash,
      name: "Tony Junior",
      role: "HOD",
    },
  });
  console.log("Seeded HOD user: izuchukwuonuoha6+HOD@gmail.com");

  const demoHash = hashPassword(DEMO_PASSWORD);
  for (const u of HOD_USERS) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: { name: u.name, department: u.department, role: u.role },
      create: {
        email: u.email,
        password: demoHash,
        name: u.name,
        department: u.department,
        role: u.role,
      },
    });
  }
  console.log(`Seeded ${HOD_USERS.length} HOD users`);

  for (const u of STAFF_USERS) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: { name: u.name, department: u.department, role: u.role },
      create: {
        email: u.email,
        password: demoHash,
        name: u.name,
        department: u.department,
        role: u.role,
      },
    });
  }
  console.log(`Seeded ${STAFF_USERS.length} Staff users`);

  // Seed sample documents (only if none exist)
  const docCount = await prisma.document.count();
  if (docCount === 0) {
    const SAMPLE_DOCS = [
      { title: "Safety Audit Report Q4", type: "Report", department: "HSE", uploadedBy: "Sarah Smith", scope: "PUBLIC", fileSize: "2.4 MB", downloads: 42 },
      { title: "Pipeline Inspection Guidelines", type: "Procedure", department: "Technical", uploadedBy: "Mike Johnson", scope: "ALL_HODS", fileSize: "4.1 MB", downloads: 28 },
      { title: "Workshop Maintenance Log", type: "Log", department: "Workshop", uploadedBy: "Robert Chen", scope: "SPECIFIC_DEPARTMENTS", fileSize: "1.2 MB", downloads: 15 },
      { title: "Legal Compliance Certificate", type: "Certificate", department: "Legal and Compliances", uploadedBy: "David Kim", scope: "SPECIFIC_HODS", fileSize: "3.7 MB", downloads: 8 },
      { title: "Financial Quarter Summary", type: "Financial", department: "Accounts", uploadedBy: "James Wilson", scope: "PRIVATE", fileSize: "5.2 MB", downloads: 3 },
      { title: "HR Policy Handbook 2024", type: "Policy", department: "HR", uploadedBy: "Maria Garcia", scope: "PUBLIC", fileSize: "8.9 MB", downloads: 56 },
      { title: "IT Security Protocols", type: "Security", department: "Technical", uploadedBy: "Alex Turner", scope: "ALL_HODS", fileSize: "2.1 MB", downloads: 31 },
      { title: "Logistics Route Maps", type: "Map", department: "Logistics", uploadedBy: "Lisa Wang", scope: "SPECIFIC_DEPARTMENTS", fileSize: "6.5 MB", downloads: 19 },
    ];
    await prisma.document.createMany({ data: SAMPLE_DOCS });
    console.log(`Seeded ${SAMPLE_DOCS.length} sample documents`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client.js";
import crypto from "crypto";

const databaseHost = process.env.DATABASE_HOST ?? "";

function envFlag(value, fallback) {
  if (value === undefined) return fallback;
  return !["0", "false", "off", "no", "disable", "disabled"].includes(String(value).trim().toLowerCase());
}

function buildSslConfig() {
  const shouldUseSsl = envFlag(
    process.env.DATABASE_SSL_MODE ?? process.env.DATABASE_SSL,
    /aivencloud\.com|amazonaws\.com|planetscale|render\.com|railway\.app/i.test(databaseHost)
  );

  if (!shouldUseSsl) return undefined;

  const ca = process.env.DATABASE_SSL_CA?.replace(/\\n/g, "\n");
  const rejectUnauthorized = envFlag(
    process.env.DATABASE_SSL_REJECT_UNAUTHORIZED,
    !/aivencloud\.com/i.test(databaseHost)
  );

  return ca ? { ca, rejectUnauthorized } : { rejectUnauthorized };
}

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: parseInt(process.env.DATABASE_PORT ?? "3306", 10),
  connectionLimit: 5,
  connectTimeout: parseInt(process.env.DATABASE_CONNECT_TIMEOUT_MS ?? "10000", 10),
  acquireTimeout: parseInt(process.env.DATABASE_ACQUIRE_TIMEOUT_MS ?? "10000", 10),
  ssl: buildSslConfig(),
});

const prisma = new PrismaClient({ adapter });

function hashPassword(password) {
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

async function main() {
  const passwordHash = hashPassword("admin123");
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

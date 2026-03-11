import { PrismaClient } from "./generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: parseInt(process.env.DATABASE_PORT || "3306"),
  });
  const prisma = new PrismaClient({ adapter });
  
  try {
    const docs = await prisma.document.findMany({
      take: 5,
      select: { id: true, title: true, fileUrl: true }
    });
    console.log("Documents:", JSON.stringify(docs, null, 2));
  } catch (err) {
    console.error("Query error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();

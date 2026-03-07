import "dotenv/config";
import { defineConfig } from "prisma/config";

function buildDatasourceUrl(): string {
  const direct = process.env.DATABASE_URL?.trim();
  if (direct) return direct;

  const host = process.env.DATABASE_HOST?.trim();
  const user = process.env.DATABASE_USER?.trim();
  const password = process.env.DATABASE_PASSWORD ?? "";
  const database = process.env.DATABASE_NAME?.trim();
  const port = process.env.DATABASE_PORT?.trim() || "3306";

  if (host && user && database) {
    return `mysql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${database}`;
  }

  // Build-time fallback so `prisma generate` can run in CI even when DB vars are not injected yet.
  return "mysql://placeholder:placeholder@localhost:3306/placeholder";
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts",
  },
  datasource: {
    url: buildDatasourceUrl(),
  },
});

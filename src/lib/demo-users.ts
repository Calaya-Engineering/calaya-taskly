import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import type { DemoCredential } from "@/lib/auth-config";

function displayNameFromEmail(email: string) {
  const localPart = email.split("@")[0] || "User";
  return localPart
    .replace(/[._+-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function ensureDemoUser(demoUser: DemoCredential) {
  const email = demoUser.email.toLowerCase().trim();

  return prisma.user.upsert({
    where: { email },
    update: {
      role: demoUser.role,
      password: hashPassword(demoUser.password),
      department: demoUser.department ?? null,
    },
    create: {
      email,
      password: hashPassword(demoUser.password),
      role: demoUser.role,
      name: displayNameFromEmail(email),
      department: demoUser.department ?? null,
    },
  });
}

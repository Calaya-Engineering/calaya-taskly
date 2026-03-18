import { prisma } from "@/lib/prisma";

export type ManagedDepartmentRecord = {
  id: number;
  name: string;
};

export async function getManagedDepartmentRecordsByUserId(userId: number): Promise<ManagedDepartmentRecord[]> {
  if (!Number.isFinite(userId)) return [];

  const assignments = await prisma.departmentHod.findMany({
    where: { hodId: userId },
    select: {
      department: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      department: {
        name: "asc",
      },
    },
  });

  return assignments.map((assignment) => assignment.department);
}

export async function getManagedDepartmentRecordsByEmail(email: string): Promise<ManagedDepartmentRecord[]> {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail) return [];

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    select: { id: true, department: true, role: true },
  });

  if (!user) return [];

  const managedDepartments = await getManagedDepartmentRecordsByUserId(user.id);
  if (managedDepartments.length > 0) {
    return managedDepartments;
  }

  if (user.role === "HOD" && user.department?.trim()) {
    const fallbackDepartment = await prisma.department.findUnique({
      where: { name: user.department.trim() },
      select: { id: true, name: true },
    });
    return fallbackDepartment ? [fallbackDepartment] : [];
  }

  return [];
}

export async function getManagedDepartmentNamesByEmail(email: string): Promise<string[]> {
  const records = await getManagedDepartmentRecordsByEmail(email);
  return records.map((department) => department.name);
}

export async function getManagedDepartmentNamesByUserId(userId: number): Promise<string[]> {
  const records = await getManagedDepartmentRecordsByUserId(userId);
  return records.map((department) => department.name);
}

export async function getPrimaryDepartmentForUser(email: string): Promise<string | null> {
  const records = await getManagedDepartmentRecordsByEmail(email);
  return records[0]?.name ?? null;
}

export async function getValidatedDepartmentRecords(departmentIds: number[]): Promise<ManagedDepartmentRecord[]> {
  if (departmentIds.length === 0) return [];

  const uniqueIds = Array.from(
    new Set(
      departmentIds
        .map((departmentId) => Number(departmentId))
        .filter((departmentId) => Number.isInteger(departmentId) && departmentId > 0)
    )
  );

  if (uniqueIds.length === 0) return [];

  return prisma.department.findMany({
    where: { id: { in: uniqueIds } },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [departments, hodUsers] = await Promise.all([
      prisma.department.findMany({
        orderBy: { name: "asc" },
        select: { id: true, name: true },
      }),
      prisma.user.findMany({
        where: { role: "HOD" },
        orderBy: [{ name: "asc" }, { email: "asc" }],
        select: {
          id: true,
          name: true,
          email: true,
          department: true,
          managedDepartmentRelations: {
            select: {
              department: {
                select: { name: true },
              },
            },
            orderBy: {
              department: {
                name: "asc",
              },
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      departments,
      hods: hodUsers.map((hod) => {
        const departmentsForHod = Array.from(
          new Set(
            [
              hod.department,
              ...hod.managedDepartmentRelations.map((relation) => relation.department.name),
            ].filter(Boolean),
          ),
        );

        return {
          id: hod.id,
          name: hod.name?.trim() || hod.email.split("@")[0],
          email: hod.email,
          departments: departmentsForHod,
          label: `${hod.name?.trim() || hod.email.split("@")[0]} - ${departmentsForHod.join(", ") || "No department"}`,
        };
      }),
    });
  } catch (error) {
    console.error("Failed to load request-access options:", error);
    return NextResponse.json({ error: "Failed to load access request options" }, { status: 500 });
  }
}

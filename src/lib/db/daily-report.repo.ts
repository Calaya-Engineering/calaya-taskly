import { db } from "@/lib/db/client";

export async function getDailyReportRequesterDepartmentsRepo(email: string) {
  return db.user.findUnique({
    where: { email: email.trim().toLowerCase() },
    select: {
      department: true,
      managedDepartmentRelations: {
        select: {
          department: {
            select: { name: true },
          },
        },
      },
    },
  });
}

export async function listDailyReportsRepo(params: {
  where: any;
  limit: number;
  offset: number;
}) {
  const [data, total] = await Promise.all([
    db.dailyReport.findMany({
      where: params.where,
      orderBy: [{ reportDate: "desc" }, { submittedAt: "desc" }, { id: "desc" }],
      skip: params.offset,
      take: params.limit,
      select: {
        id: true,
        title: true,
        department: true,
        submittedBy: true,
        status: true,
        summary: true,
        payloadSource: true,
        attachmentUrl: true,
        attachmentName: true,
        downloads: true,
        reportDate: true,
        submittedAt: true,
        _count: {
          select: { entries: true },
        },
      },
    }),
    db.dailyReport.count({ where: params.where }),
  ]);

  return { data, total };
}

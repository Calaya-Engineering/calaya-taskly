import { buildDailyReportSummary, normalizeDailyReportStatus } from "@/lib/daily-reports";
import {
  getDailyReportRequesterDepartmentsRepo,
  listDailyReportsRepo,
} from "@/lib/db/daily-report.repo";
import type { ListDailyReportsQuery } from "@/lib/schemas/daily-report.schema";

type Requester = {
  email: string;
  role: string;
};

function toUtcDayBounds(date: string) {
  return {
    start: new Date(`${date}T00:00:00.000Z`),
    end: new Date(`${date}T23:59:59.999Z`),
  };
}

function splitDepartments(value: string | undefined) {
  return String(value ?? "")
    .split(",")
    .map((department) => department.trim())
    .filter(Boolean);
}

async function getManagedDepartments(requester: Requester) {
  if (requester.role !== "HOD") return [];

  const user = await getDailyReportRequesterDepartmentsRepo(requester.email);
  const managed = (user?.managedDepartmentRelations ?? [])
    .map((relation) => relation.department?.name)
    .filter((name): name is string => Boolean(name));
  const fallback = user?.department?.trim();

  return managed.length > 0 || !fallback ? managed : [fallback];
}

export async function listDailyReports(input: ListDailyReportsQuery, requester: Requester) {
  const managedDepartments = await getManagedDepartments(requester);
  const where: any = {};

  if (requester.role === "HOD") {
    if (managedDepartments.length === 0) {
      return { data: [], total: 0, page: 1, limit: input.limit };
    }
    where.department = { in: managedDepartments };
  }

  const department = input.department;
  if (department && department.toLowerCase() !== "all") {
    if (requester.role === "HOD" && !managedDepartments.includes(department)) {
      return { data: [], total: 0, page: 1, limit: input.limit };
    }
    where.department = department;
  } else {
    const requestedDepartments = splitDepartments(input.departments);
    if (requestedDepartments.length > 0) {
      const filteredDepartments =
        requester.role === "HOD"
          ? requestedDepartments.filter((value) => managedDepartments.includes(value))
          : requestedDepartments;

      if (filteredDepartments.length === 0 && requester.role === "HOD") {
        return { data: [], total: 0, page: 1, limit: input.limit };
      }

      where.department =
        filteredDepartments.length === 1 ? filteredDepartments[0] : { in: filteredDepartments };
    }
  }

  if (input.date) {
    const { start, end } = toUtcDayBounds(input.date);
    where.reportDate = { gte: start, lte: end };
  }

  if (input.linkedTask || input.reportType === "task") {
    where.entries = { some: { target: { contains: "Task ID:" } } };
  } else if (input.reportType === "general") {
    where.entries = { none: { target: { contains: "Task ID:" } } };
    where.submittedByRole = "STAFF";
  } else if (input.reportType === "daily") {
    where.entries = { none: { target: { contains: "Task ID:" } } };
    where.submittedByRole = { not: "STAFF" };
  }

  const { data, total } = await listDailyReportsRepo({
    where,
    limit: input.limit,
    offset: input.offset,
  });

  return {
    data: data.map((report) => {
      const entryCount = report._count.entries;
      return {
        id: `RPT-${String(report.id).padStart(4, "0")}`,
        dbId: report.id,
        title: report.title,
        date: report.reportDate.toISOString().split("T")[0],
        department: report.department,
        submittedBy: report.submittedBy,
        submittedAt: report.submittedAt.toISOString(),
        entries: [],
        entriesUrl: report.payloadSource,
        fileSize: buildDailyReportSummary(entryCount, report.summary),
        fileType: "Report",
        status: normalizeDailyReportStatus(report.status),
        downloads: report.downloads,
        fileUrl: report.attachmentUrl || report.payloadSource || null,
        attachmentUrl: report.attachmentUrl,
        attachmentName: report.attachmentName,
      };
    }),
    total,
    page: Math.floor(input.offset / input.limit) + 1,
    limit: input.limit,
  };
}

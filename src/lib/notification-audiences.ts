export type NotificationAudience = {
  roles?: string[];
  departments?: string[];
  includeActor?: boolean;
};

const DEFAULT_DASHBOARD_ROLES = ["MD", "HOD", "Secretary", "Staff", "Personnel", "Corp Member"];

function unique(values: (string | null | undefined)[]) {
  return Array.from(new Set(values.map((value) => value?.trim()).filter(Boolean))) as string[];
}

export function getDashboardAudience(params?: {
  roles?: string[];
  departments?: string[];
  includeActor?: boolean;
}) {
  return {
    roles: unique(params?.roles?.length ? params.roles : DEFAULT_DASHBOARD_ROLES),
    departments: unique(params?.departments || []),
    includeActor: params?.includeActor ?? false,
  } satisfies NotificationAudience;
}

export function getAnnouncementAudience(params: {
  scopeType?: string | null;
  selectedDepartments?: string[] | null;
  targetRole?: string | null;
}) {
  const scopeType = params.scopeType?.trim() || "ALL_COMPANY";
  const departments = unique(params.selectedDepartments || []);

  if (scopeType === "HODS_ONLY") {
    return getDashboardAudience({
      roles: ["HOD", "MD"],
      departments,
    });
  }

  if (params.targetRole?.trim()) {
    return getDashboardAudience({
      roles: [params.targetRole.trim()],
      departments,
    });
  }

  if (scopeType === "DEPARTMENTS") {
    return getDashboardAudience({ departments });
  }

  return getDashboardAudience();
}

export function getEventAudience(params: {
  visibility?: string | null;
  departments?: string[] | null;
}) {
  const visibility = params.visibility?.trim() || "ALL_COMPANY";
  const departments = unique(params.departments || []);

  if (visibility === "USERS") {
    return {
      roles: [],
      departments: [],
      includeActor: false,
    } satisfies NotificationAudience;
  }

  if (visibility === "HODS_ONLY") {
    return getDashboardAudience({
      roles: ["HOD", "MD"],
      departments,
    });
  }

  if (visibility === "DEPARTMENTS") {
    return getDashboardAudience({ departments });
  }

  return getDashboardAudience();
}

export function getTenderAudience(departments?: string[] | null) {
  return getDashboardAudience({
    departments: unique(departments || []),
  });
}

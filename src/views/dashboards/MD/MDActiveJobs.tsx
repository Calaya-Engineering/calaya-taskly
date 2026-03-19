"use client";

import { useMemo, useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { MDMenuItems } from "@/utils/menus";
import { SearchIcon, FolderIcon, getIconByKey } from "@/lib/icons";
import { fetchWithAuth } from "@/lib/api";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";

function progressFromStatus(status) {
  if (status === "COMPLETED") return 100;
  if (status === "IN_PROGRESS") return 50;
  if (status === "OVERDUE") return 25;
  if (status === "CANCELLED") return 0;
  return 0;
}

function mapTaskToJob(task) {
  const createdByName = task.createdBy?.name ?? task.createdBy?.email ?? "Unknown";
  const supervisor = task.assignments?.[0]?.user?.name ?? task.assignments?.[0]?.user?.email ?? createdByName;
  return {
    id: String(task.id),
    title: task.title,
    department: task.department ?? "Unknown",
    priority: task.priority ?? "MEDIUM",
    status: task.status ?? "PENDING",
    project: task.description?.slice(0, 60) ?? task.title,
    supervisor,
    startDate: task.startDate ?? task.createdAt,
    endDate: task.dueDate ?? task.createdAt,
    progress: progressFromStatus(task.status),
  };
}

/* ---------- UI helpers ---------- */
interface CardProps {
  className?: string;
  children: ReactNode;
}
const Card = ({ className = "", children }: CardProps) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`}>{children}</div>
);

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}
const SectionTitle = ({ title, subtitle, action = null }: SectionTitleProps) => (
  <div className="flex items-start justify-between gap-3">
    <div>
      <h2 className="text-lg md:text-xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
        {renderNodeWithIcons(title)}
      </h2>
      {subtitle ? <p className="text-sm text-gray-500 mt-1">{subtitle}</p> : null}
    </div>
    {action}
  </div>
);

interface PillProps {
  children: ReactNode;
  tone?: string;
}
const Pill = ({ children, tone = "default" }: PillProps) => {
  const styles =
    tone === "danger"
      ? "bg-red-50 text-red-700 ring-red-100"
      : tone === "success"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
      : tone === "warn"
      ? "bg-amber-50 text-amber-800 ring-amber-100"
      : "bg-blue-50 text-blue-700 ring-blue-100";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {renderNodeWithIcons(children, "h-[0.875em] w-[0.875em] shrink-0")}
    </span>
  );
};

const statusTone = (s) => (s === "ACTIVE" ? "success" : s === "ON_HOLD" ? "warn" : "default");
const priorityTone = (p) => (p === "CRITICAL" ? "danger" : p === "HIGH" ? "warn" : "default");

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" });

const progressTone = (v) => (v >= 80 ? "success" : v >= 50 ? "default" : "warn");

interface Job {
  id: string;
  title: string;
  department: string;
  priority: string;
  status: string;
  project: string;
  supervisor: string;
  startDate: string;
  endDate: string;
  progress: number;
}

export default function MDActiveJobs() {
  const [dept, setDept] = useState("all");
  const [q, setQ] = useState("");
  const [view, setView] = useState("cards");
  const [jobsData, setJobsData] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchWithAuth("/api/tasks?type=JOB&limit=100")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch jobs");
        return res.json();
      })
      .then((tasks) => {
        if (!cancelled) {
          setJobsData(Array.isArray(tasks) ? tasks.map(mapTaskToJob) : []);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message ?? "Failed to load jobs");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const departments = useMemo(() => ["all", ...new Set(jobsData.map((j) => j.department).filter(Boolean))], [jobsData]);

  const filteredJobs = useMemo(() => {
    const query = q.trim().toLowerCase();
    return jobsData.filter((job) => {
      const matchesOpenStatus = job.status !== "COMPLETED" && job.status !== "CANCELLED";
      const matchesDept = dept === "all" || job.department === dept;
      const matchesQ =
        !query ||
        job.id.toLowerCase().includes(query) ||
        job.title.toLowerCase().includes(query) ||
        (job.project && job.project.toLowerCase().includes(query)) ||
        job.supervisor.toLowerCase().includes(query);
      return matchesOpenStatus && matchesDept && matchesQ;
    });
  }, [dept, q, jobsData]);

  const overview = useMemo(() => {
    const openJobs = jobsData.filter((j) => j.status !== "COMPLETED" && j.status !== "CANCELLED");
    const active = openJobs.length;
    const hold = openJobs.filter((j) => j.status === "ON_HOLD").length;
    const critical = openJobs.filter((j) => j.priority === "CRITICAL").length;
    const avg = openJobs.length ? Math.round(openJobs.reduce((sum, j) => sum + j.progress, 0) / openJobs.length) : 0;
    return { active, hold, critical, avg };
  }, [jobsData]);

  if (loading) {
    return (
      <Layout menuItems={MDMenuItems} userRole="MD">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#2C4B9B] border-t-transparent" />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout menuItems={MDMenuItems} userRole="MD">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-semibold text-red-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 rounded-xl font-semibold text-white"
            style={{ backgroundColor: "var(--accent-red)" }}
          >
            Retry
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout menuItems={MDMenuItems} userRole="MD">
      <div className="space-y-6">
        {/* Hero */}
        <Card className="overflow-hidden">
          <div
            className="p-6 md:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)",
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill>Ongoing Projects</Pill>
                  <Pill tone="success">{overview.active} Active</Pill>
                  {overview.hold ? <Pill tone="warn">{overview.hold} On Hold</Pill> : <Pill tone="default">No Holds</Pill>}
                  {overview.critical ? <Pill tone="danger">{overview.critical} Critical</Pill> : null}
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Active Jobs
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Monitor ongoing jobs and projects across the company progress, deadlines, and priorities.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/md-dashboard/create-task?type=JOB">
                  <button
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--accent-red)", color: "white" }}
                  >
                    + Create New Job
                  </button>
                </Link>

                <div className="flex w-full sm:w-auto gap-2">
                  <button
                    className={`flex-1 sm:flex-none px-4 py-3 rounded-2xl font-semibold border transition ${
                      view === "cards" ? "bg-white" : "bg-gray-50"
                    }`}
                    style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                    onClick={() => setView("cards")}
                  >
                    Cards
                  </button>
                  <button
                    className={`flex-1 sm:flex-none px-4 py-3 rounded-2xl font-semibold border transition ${
                      view === "table" ? "bg-white" : "bg-gray-50"
                    }`}
                    style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                    onClick={() => setView("table")}
                  >
                    Table
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Filters row */}
          <div className="p-4 md:p-5 bg-white border-t border-gray-200/70">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
              {/* Dept chips */}
              <div className="flex flex-wrap gap-2">
                {departments.map((d) => {
                  const active = d === dept;
                  return (
                    <button
                      key={d}
                      className={`px-3.5 py-2 rounded-2xl text-sm font-semibold transition ring-1 ${
                        active ? "text-white" : "text-gray-700 bg-gray-50 hover:bg-gray-100"
                      }`}
                      style={{
                        backgroundColor: active ? "var(--primary-blue)" : undefined,
                        borderColor: active ? "transparent" : "rgba(0,0,0,0.06)",
                      }}
                      onClick={() => setDept(d)}
                    >
                      {d === "all" ? "All Departments" : d}
                    </button>
                  );
                })}
              </div>

              {/* Search */}
              <div className="w-full xl:w-[420px]">
                <div className="relative">
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search by job ID, title, project, supervisor..."
                    className="w-full pl-10 pr-3 py-2.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Showing <span className="font-semibold text-gray-800">{filteredJobs.length}</span> job(s)
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: "Total Active Jobs", value: overview.active, color: "var(--primary-blue)" },
            { label: "On Hold", value: overview.hold, color: "#F59E0B" },
            { label: "Critical Priority", value: overview.critical, color: "var(--accent-red)" },
            { label: "Avg Progress", value: `${overview.avg}%`, color: "#10B981" },
          ].map((s) => (
            <Card key={s.label} className="p-5">
              <p className="text-sm text-gray-500">{s.label}</p>
              <p className="text-3xl font-extrabold mt-2" style={{ color: s.color }}>
                {s.value}
              </p>
              <div className="mt-4 h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: typeof s.value === "string" && s.value.includes("%") ? s.value : "60%",
                    backgroundColor: "var(--primary-blue)",
                  }}
                />
              </div>
            </Card>
          ))}
        </div>

        {/* Jobs list */}
        {view === "cards" ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <Link key={job.id} href={`/md-dashboard/task/${job.id}`} className="group">
                <Card className="p-6 hover:-translate-y-0.5 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                          {job.id}
                        </span>
                        <Pill>{job.department}</Pill>
                        <Pill tone={priorityTone(job.priority)}>{job.priority}</Pill>
                        <Pill tone={statusTone(job.status)}>{job.status}</Pill>
                      </div>

                      <h3 className="mt-2 text-lg font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 truncate">{job.project}</p>
                    </div>

                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center  shrink-0"
                      style={{ backgroundColor: "rgba(109, 198, 223, 0.18)" }}
                    >
                      {getIconByKey("navigation", "w-5 h-5")}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-gray-200/70 p-4">
                      <p className="text-xs text-gray-500">Supervisor</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">{job.supervisor}</p>
                    </div>
                    <div className="rounded-2xl border border-gray-200/70 p-4">
                      <p className="text-xs text-gray-500">Timeline</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {fmtDate(job.startDate)} — {fmtDate(job.endDate)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <Pill tone={progressTone(job.progress)}>{job.progress}%</Pill>
                    </div>

                    <div className="mt-2 h-2.5 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${job.progress}%`,
                          backgroundColor:
                            job.progress >= 80
                              ? "#10B981"
                              : job.progress >= 50
                              ? "var(--primary-blue)"
                              : "#F59E0B",
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-2">
                    <button
                      className="flex-1 px-4 py-2.5 rounded-2xl font-semibold text-sm text-white active:scale-[0.99] transition"
                      style={{ backgroundColor: "var(--secondary-blue)" }}
                    >
                      View Details
                    </button>
                    <button
                      className="flex-1 px-4 py-2.5 rounded-2xl font-semibold text-sm border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                      style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                    >
                      Update Progress
                    </button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="overflow-hidden">
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 border-b border-gray-200/70">
                  <tr className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="px-5 py-3 text-left">Job</th>
                    <th className="px-5 py-3 text-left">Department</th>
                    <th className="px-5 py-3 text-left">Supervisor</th>
                    <th className="px-5 py-3 text-left">Priority</th>
                    <th className="px-5 py-3 text-left">Status</th>
                    <th className="px-5 py-3 text-left">Timeline</th>
                    <th className="px-5 py-3 text-left">Progress</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200/70 text-[13px]">
                  {filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50/70 transition">
                      <td className="px-5 py-3">
                        <div className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                          {job.id}
                        </div>
                        <div className="text-[13px] font-semibold text-gray-900 mt-1">{job.title}</div>
                        <div className="text-[11px] text-gray-500">{job.project}</div>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        <Pill>{job.department}</Pill>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        <div className="text-[13px] font-semibold text-gray-900">{job.supervisor}</div>
                        <div className="text-[11px] text-gray-500">Supervisor</div>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        <Pill tone={priorityTone(job.priority)}>{job.priority}</Pill>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        <Pill tone={statusTone(job.status)}>{job.status}</Pill>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        <div className="text-[13px] font-semibold text-gray-900">{fmtDate(job.startDate)}</div>
                        <div className="text-[11px] text-gray-500">to {fmtDate(job.endDate)}</div>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Pill tone={progressTone(job.progress)}>{job.progress}%</Pill>
                          <div className="w-28 h-2 rounded-full bg-gray-100 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${job.progress}%`,
                                backgroundColor:
                                  job.progress >= 80
                                    ? "#10B981"
                                    : job.progress >= 50
                                    ? "var(--primary-blue)"
                                    : "#F59E0B",
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-right whitespace-nowrap">
                        <Link href={`/md-dashboard/task/${job.id}`}>
                          <button
                            className="px-3 py-1.5 rounded-xl text-[12px] font-semibold text-white active:scale-[0.99] transition"
                            style={{ backgroundColor: "var(--secondary-blue)" }}
                          >
                            View
                          </button>
                        </Link>
                        <button
                          className="ml-2 px-3 py-1.5 rounded-xl text-[12px] font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                          style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile fallback for table view */}
            <div className="lg:hidden p-4 text-sm text-gray-600">
              Switch to <span className="font-semibold">Cards</span> view for mobile-friendly layout.
            </div>
          </Card>
        )}

        {/* Empty state */}
        {filteredJobs.length === 0 ? (
          <Card className="p-10 text-center">
            <FolderIcon className="w-16 h-16 mx-auto text-gray-400" />
            <div className="mt-3 font-extrabold" style={{ color: "var(--primary-blue)" }}>
              No jobs found
            </div>
            <div className="text-sm text-gray-500 mt-1">Try changing department filter or search keywords.</div>
          </Card>
        ) : null}

        {/* Department Performance */}
        <Card className="p-6">
          <SectionTitle title="Department Performance" subtitle="Average progress by department" />
          <div className="mt-5 space-y-3">
            {departments
              .filter((d) => d !== "all")
              .map((d) => {
                const deptJobs = jobsData.filter((j) => j.department === d);
                const avg = deptJobs.length ? Math.round(deptJobs.reduce((s, j) => s + j.progress, 0) / deptJobs.length) : 0;

                return (
                  <div key={d} className="rounded-2xl border border-gray-200/70 p-4 hover:bg-gray-50 transition">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold "
                          style={{ backgroundColor: "var(--secondary-blue)" }}
                        >
                          {d.charAt(0)}
                        </div>
                        <div>
                          <div className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                            {d}
                          </div>
                          <div className="text-sm text-gray-500">{deptJobs.length} job(s)</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-full md:w-64">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Avg Progress</span>
                            <Pill tone={progressTone(avg)}>{avg}%</Pill>
                          </div>
                          <div className="mt-2 h-2.5 rounded-full bg-gray-100 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${avg}%`,
                                backgroundColor: "var(--primary-blue)",
                              }}
                            />
                          </div>
                        </div>

                        <button
                          className="px-4 py-2 rounded-2xl text-sm font-semibold text-white active:scale-[0.99] transition"
                          style={{ backgroundColor: "var(--primary-blue)" }}
                        >
                          View Jobs
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </Card>
      </div>
    </Layout>
  );
}

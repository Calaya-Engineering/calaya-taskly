// @ts-nocheck
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import { Card, SectionTitle, Pill } from "@/components/dashboard-ui";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { fetchWithAuth } from "@/lib/api";
import { toast } from "@/lib/toast";
import { EditIcon, DeleteIcon, PlusIcon, UserIcon } from "@/lib/icons";
import { Checkbox } from "@/components/ui/checkbox";

const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 rounded-xl ${className}`} />
);

const TABLE_VIEWPORT_HEIGHT = 520;
const VIRTUAL_ROW_HEIGHT = 62;
const VIRTUAL_OVERSCAN = 8;
const PAGE_SIZE_OPTIONS = [25, 50, 100];

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // { type: "create" | "edit", user?: {} }
  const [form, setForm] = useState({ email: "", password: "", name: "", role: "", department: "", managedDepartmentIds: [] });
  const [saving, setSaving] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [viewMode, setViewMode] = useState("table"); // "table" | "cards"
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableScrollTop, setTableScrollTop] = useState(0);
  const tableViewportRef = useRef(null);

  const filteredUsers = useMemo(() => {
    if (departmentFilter === "all") return users;
    return users.filter((u) => {
      const departmentsForUser = Array.isArray(u.managedDepartments) && u.managedDepartments.length > 0
        ? u.managedDepartments
        : [u.department].filter(Boolean);
      return departmentsForUser.includes(departmentFilter);
    });
  }, [users, departmentFilter]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredUsers.length / pageSize)),
    [filteredUsers.length, pageSize]
  );

  const pageUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, currentPage, pageSize]);

  const virtualWindow = useMemo(() => {
    const itemCount = pageUsers.length;
    const visibleCount = Math.ceil(TABLE_VIEWPORT_HEIGHT / VIRTUAL_ROW_HEIGHT);
    const startIndex = Math.max(0, Math.floor(tableScrollTop / VIRTUAL_ROW_HEIGHT) - VIRTUAL_OVERSCAN);
    const endIndex = Math.min(itemCount, startIndex + visibleCount + VIRTUAL_OVERSCAN * 2);
    return {
      startIndex,
      endIndex,
      topSpacer: startIndex * VIRTUAL_ROW_HEIGHT,
      bottomSpacer: Math.max(0, (itemCount - endIndex) * VIRTUAL_ROW_HEIGHT),
      rows: pageUsers.slice(startIndex, endIndex),
    };
  }, [pageUsers, tableScrollTop]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
    setTableScrollTop(0);
    if (tableViewportRef.current) {
      tableViewportRef.current.scrollTop = 0;
    }
  }, [departmentFilter, pageSize]);

  const load = async () => {
    setLoading(true);
    try {
      const [uRes, rRes, dRes] = await Promise.all([
        fetchWithAuth("/api/users"),
        fetchWithAuth("/api/roles"),
        fetchWithAuth("/api/departments"),
      ]);
      if (uRes.ok) setUsers(await uRes.json());
      if (rRes.ok) setRoles(await rRes.json());
      if (dRes.ok) setDepartments(await dRes.json());
    } catch (e) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setModal({ type: "create" });
    setForm({ email: "", password: "", name: "", role: roles[0]?.name || "", department: "", managedDepartmentIds: [] });
  };

  const openEdit = (user) => {
    setModal({ type: "edit", user });
    setForm({
      email: user.email,
      password: "",
      name: user.name || "",
      role: user.role || "",
      department: user.department || "",
      managedDepartmentIds: Array.isArray(user.managedDepartmentIds) ? user.managedDepartmentIds : [],
    });
  };

  const closeModal = () => setModal(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (modal.type === "create") {
        const res = await fetchWithAuth("/api/users", {
          method: "POST",
          timeoutMs: 90000,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
            name: form.name || null,
            role: form.role,
            department: form.role === "HOD" ? null : form.department || null,
            managedDepartmentIds: form.role === "HOD" ? form.managedDepartmentIds : [],
          }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Failed to create user");
        }
        toast.success("User created");
      } else {
        const payload = {
          email: form.email,
          name: form.name || null,
          role: form.role,
          department: form.role === "HOD" ? null : form.department || null,
          managedDepartmentIds: form.role === "HOD" ? form.managedDepartmentIds : [],
        };
        if (form.password) payload.password = form.password;
        const res = await fetchWithAuth(`/api/users/${modal.user.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Failed to update user");
        }
        toast.success("User updated");
      }
      closeModal();
      load();
    } catch (err) {
      toast.error(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (user) => {
    if (!confirm(`Delete user ${user.email}?`)) return;
    try {
      const res = await fetchWithAuth(`/api/users/${user.id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to delete");
      }
      toast.success("User deleted");
      load();
    } catch (err) {
      toast.error(err.message || "Failed to delete");
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (pageUsers.length === 0) return;
    const allSelected = pageUsers.every((u) => selectedIds.has(u.id));
    if (allSelected) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        pageUsers.forEach((u) => next.delete(u.id));
        return next;
      });
      return;
    }

    setSelectedIds((prev) => {
      const next = new Set(prev);
      pageUsers.forEach((u) => next.add(u.id));
      return next;
    });
  };

  const handleDeleteSelected = async () => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;
    if (!confirm(`Delete ${ids.length} selected user(s)?`)) return;
    setSaving(true);
    try {
      let ok = 0;
      let fail = 0;
      for (const id of ids) {
        const res = await fetchWithAuth(`/api/users/${id}`, { method: "DELETE" });
        if (res.ok) ok++;
        else fail++;
      }
      if (fail > 0) toast.error(`${fail} failed to delete`);
      if (ok > 0) {
        toast.success(`${ok} user(s) deleted`);
        setSelectedIds(new Set());
        load();
      }
    } catch (err) {
      toast.error(err.message || "Failed to delete");
    } finally {
      setSaving(false);
    }
  };

  const toggleManagedDepartment = (departmentId) => {
    setForm((prev) => ({
      ...prev,
      managedDepartmentIds: prev.managedDepartmentIds.includes(departmentId)
        ? prev.managedDepartmentIds.filter((id) => id !== departmentId)
        : [...prev.managedDepartmentIds, departmentId],
    }));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="max-w-7xl mx-auto space-y-6">
          <Card className="overflow-hidden">
            <div className="p-6 md:p-8" style={{ background: "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)" }}>
              <Skeleton className="h-4 w-32 mb-4" />
              <Skeleton className="h-8 w-64 mb-3" />
              <Skeleton className="h-5 w-96" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex justify-between mb-6">
              <div>
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-72" />
              </div>
              <Skeleton className="h-10 w-32" />
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <Card className="overflow-hidden">
          <div
            className="p-6 md:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)",
            }}
          >
            <Link href="/admin-dashboard" className="text-sm text-gray-600 hover:text-gray-800 mb-4 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
              Users
            </h1>
            <p className="text-gray-600 mt-1">Manage user accounts, roles, and departments.</p>
          </div>
        </Card>

        {/* Filters */}
        <Card className="p-6">
          <SectionTitle
            title="Filters"
            subtitle="Filter by department and switch between table or card view"
            action={
              <div className="flex items-center gap-2">
                {selectedIds.size > 0 && (
                  <button
                    onClick={handleDeleteSelected}
                    disabled={saving}
                    className="text-sm font-semibold px-4 py-2 rounded-xl text-white active:scale-[0.99] transition flex items-center gap-2 disabled:opacity-60"
                    style={{ backgroundColor: "var(--accent-red)" }}
                  >
                    <DeleteIcon className="w-4 h-4" />
                    Delete selected ({selectedIds.size})
                  </button>
                )}
                <div className="flex rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setViewMode("table")}
                    className={`px-3 py-2 text-sm font-semibold transition ${viewMode === "table" ? "text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    style={viewMode === "table" ? { backgroundColor: "var(--primary-blue)" } : {}}
                  >
                    Table
                  </button>
                  <button
                    onClick={() => setViewMode("cards")}
                    className={`px-3 py-2 text-sm font-semibold transition ${viewMode === "cards" ? "text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    style={viewMode === "cards" ? { backgroundColor: "var(--primary-blue)" } : {}}
                  >
                    Cards
                  </button>
                </div>
                <button
                  onClick={openCreate}
                  className="text-sm font-semibold px-4 py-2 rounded-xl text-white active:scale-[0.99] transition flex items-center gap-2"
                  style={{ backgroundColor: "var(--accent-red)" }}
                >
                  <PlusIcon className="w-4 h-4" />
                  Add User
                </button>
              </div>
            }
          />
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Department</label>
              <NativeSelect
                className="w-full min-w-[180px] px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="all">All Departments</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </NativeSelect>
            </div>
            <div className="text-sm text-gray-500 self-end pb-2">
              Showing <span className="font-semibold text-gray-800">{filteredUsers.length}</span> of{" "}
              <span className="font-semibold text-gray-800">{users.length}</span> users
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <SectionTitle
            title="All Users"
            subtitle="Create, edit, or remove user accounts. Select rows to bulk delete."
          />

          {viewMode === "table" ? (
            <div
              ref={tableViewportRef}
              onScroll={(e) => setTableScrollTop(e.currentTarget.scrollTop)}
              className="mt-5 overflow-auto"
              style={{ maxHeight: `${TABLE_VIEWPORT_HEIGHT}px` }}
            >
              <table className="w-full text-sm min-w-[900px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="w-10 px-5 py-3">
                      <Checkbox
                        checked={pageUsers.length > 0 && pageUsers.every((u) => selectedIds.has(u.id))}
                        onCheckedChange={toggleSelectAll}
                        aria-label="Select all"
                      />
                    </th>
                    <th className="text-left px-5 py-3 font-semibold">Email</th>
                    <th className="text-left px-5 py-3 font-semibold">Name</th>
                    <th className="text-left px-5 py-3 font-semibold">Role</th>
                    <th className="text-left px-5 py-3 font-semibold">Department</th>
                    <th className="text-right px-5 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {virtualWindow.topSpacer > 0 && (
                    <tr aria-hidden="true">
                      <td colSpan={6} style={{ height: `${virtualWindow.topSpacer}px` }} />
                    </tr>
                  )}
                  {virtualWindow.rows.map((u) => (
                    <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50/70 transition">
                      <td className="px-5 py-3">
                        <Checkbox
                          checked={selectedIds.has(u.id)}
                          onCheckedChange={() => toggleSelect(u.id)}
                          aria-label={`Select ${u.email}`}
                        />
                      </td>
                      <td className="px-5 py-3">{u.email}</td>
                      <td className="px-5 py-3">{u.name || "—"}</td>
                      <td className="px-5 py-3">
                        <Pill>{u.role}</Pill>
                      </td>
                      <td className="px-5 py-3">
                        {Array.isArray(u.managedDepartments) && u.managedDepartments.length > 0
                          ? u.managedDepartments.join(", ")
                          : u.department || "—"}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={() => openEdit(u)}
                          className="px-3 py-1.5 rounded-xl text-[12px] font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition inline-flex items-center gap-1 mr-2"
                          style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                        >
                          <EditIcon className="w-3.5 h-3.5" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(u)}
                          className="px-3 py-1.5 rounded-xl text-[12px] font-semibold text-white active:scale-[0.99] transition inline-flex items-center gap-1"
                          style={{ backgroundColor: "var(--accent-red)" }}
                        >
                          <DeleteIcon className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {virtualWindow.bottomSpacer > 0 && (
                    <tr aria-hidden="true">
                      <td colSpan={6} style={{ height: `${virtualWindow.bottomSpacer}px` }} />
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredUsers.map((u) => (
                <Card key={u.id} className="p-4 hover:bg-gray-50/50 transition">
                  <div className="flex items-start justify-between gap-3">
                    <Checkbox
                      checked={selectedIds.has(u.id)}
                      onCheckedChange={() => toggleSelect(u.id)}
                      aria-label={`Select ${u.email}`}
                      className="shrink-0 mt-0.5"
                    />
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "rgba(109, 198, 223, 0.18)", color: "var(--primary-blue)" }}
                    >
                      <UserIcon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-extrabold truncate" style={{ color: "var(--primary-blue)" }}>
                        {u.name || u.email}
                      </div>
                      <div className="text-xs text-gray-500 truncate mt-0.5">{u.email}</div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        <Pill>{u.role}</Pill>
                        {Array.isArray(u.managedDepartments) && u.managedDepartments.length > 0
                          ? u.managedDepartments.map((departmentName) => (
                              <Pill key={`${u.id}-${departmentName}`} tone="info">{departmentName}</Pill>
                            ))
                          : u.department ? <Pill tone="info">{u.department}</Pill> : null}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => openEdit(u)}
                      className="flex-1 px-3 py-2 rounded-xl text-[12px] font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition inline-flex items-center justify-center gap-1"
                      style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                    >
                      <EditIcon className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(u)}
                      className="flex-1 px-3 py-2 rounded-xl text-[12px] font-semibold text-white active:scale-[0.99] transition inline-flex items-center justify-center gap-1"
                      style={{ backgroundColor: "var(--accent-red)" }}
                    >
                      <DeleteIcon className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {viewMode === "table" && (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-gray-500">
                Page <span className="font-semibold text-gray-900">{currentPage}</span> of{" "}
                <span className="font-semibold text-gray-900">{totalPages}</span> (
                {filteredUsers.length} users)
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-600 font-semibold" htmlFor="pageSize">
                  Rows
                </label>
                <select
                  id="pageSize"
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="px-2 py-1.5 border border-gray-200 rounded-lg bg-white text-sm"
                >
                  {PAGE_SIZE_OPTIONS.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-semibold disabled:opacity-50"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-semibold disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </Card>

        {modal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md p-6">
              <h2 className="text-lg font-extrabold mb-4" style={{ color: "var(--primary-blue)" }}>
                {modal.type === "create" ? "Create User" : "Edit User"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="mt-1 w-full px-4 py-3 rounded-2xl border-gray-200 focus:ring-2 focus:ring-blue-100"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="password">
                    Password {modal.type === "edit" ? "(leave blank to keep)" : "*"}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    required={modal.type === "create"}
                    minLength={6}
                    className="mt-1 w-full px-4 py-3 rounded-2xl border-gray-200 focus:ring-2 focus:ring-blue-100"
                    value={form.password}
                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    className="mt-1 w-full px-4 py-3 rounded-2xl border-gray-200 focus:ring-2 focus:ring-blue-100"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role *</Label>
                  <select
                    id="role"
                    required
                    className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                    value={form.role}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        role: e.target.value,
                        department: e.target.value === "HOD" ? "" : f.department,
                        managedDepartmentIds: e.target.value === "HOD" ? f.managedDepartmentIds : [],
                      }))
                    }
                  >
                    <option value="">— Select —</option>
                    {roles.map((r) => (
                      <option key={r.id} value={r.name}>{r.name}</option>
                    ))}
                  </select>
                </div>
                {form.role === "HOD" ? (
                  <div>
                    <Label>Managed Departments</Label>
                    <div className="mt-2 rounded-2xl border border-gray-200 bg-white p-4 space-y-3 max-h-56 overflow-y-auto">
                      {departments.map((d) => (
                        <label key={d.id} className="flex items-center gap-3 text-sm text-gray-700">
                          <Checkbox
                            checked={form.managedDepartmentIds.includes(d.id)}
                            onCheckedChange={() => toggleManagedDepartment(d.id)}
                            aria-label={`Select ${d.name}`}
                          />
                          <span>{d.name}</span>
                        </label>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Select every department this HOD should manage.
                    </p>
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <select
                      id="department"
                      className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                      value={form.department}
                      onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
                    >
                      <option value="">— None —</option>
                      {departments.map((d) => (
                        <option key={d.id} value={d.name}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--primary-blue)" }}
                  >
                    {saving ? "Saving…" : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                    style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

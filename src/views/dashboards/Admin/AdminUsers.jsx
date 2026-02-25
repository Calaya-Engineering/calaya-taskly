"use client";

import { useEffect, useState, useMemo } from "react";
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

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // { type: "create" | "edit", user?: {} }
  const [form, setForm] = useState({ email: "", password: "", name: "", role: "", department: "" });
  const [saving, setSaving] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [viewMode, setViewMode] = useState("table"); // "table" | "cards"
  const [selectedIds, setSelectedIds] = useState(new Set());

  const filteredUsers = useMemo(() => {
    if (departmentFilter === "all") return users;
    return users.filter((u) => u.department === departmentFilter);
  }, [users, departmentFilter]);

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
    setForm({ email: "", password: "", name: "", role: roles[0]?.name || "", department: "" });
  };

  const openEdit = (user) => {
    setModal({ type: "edit", user });
    setForm({
      email: user.email,
      password: "",
      name: user.name || "",
      role: user.role || "",
      department: user.department || "",
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
            name: form.name || null,
            role: form.role,
            department: form.department || null,
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
          department: form.department || null,
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
    if (selectedIds.size === filteredUsers.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(filteredUsers.map((u) => u.id)));
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
                    className={`px-3 py-2 text-sm font-semibold transition ${
                      viewMode === "table" ? "text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                    style={viewMode === "table" ? { backgroundColor: "var(--primary-blue)" } : {}}
                  >
                    Table
                  </button>
                  <button
                    onClick={() => setViewMode("cards")}
                    className={`px-3 py-2 text-sm font-semibold transition ${
                      viewMode === "cards" ? "text-white" : "bg-white text-gray-600 hover:bg-gray-50"
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

          {loading ? (
            <p className="text-gray-500 mt-5">Loading...</p>
          ) : viewMode === "table" ? (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="w-10 px-5 py-3">
                      <Checkbox
                        checked={filteredUsers.length > 0 && selectedIds.size === filteredUsers.length}
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
                  {filteredUsers.map((u) => (
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
                      <td className="px-5 py-3">{u.department || "—"}</td>
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
                        {u.department ? <Pill tone="info">{u.department}</Pill> : null}
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
                    onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                  >
                    <option value="">— Select —</option>
                    {roles.map((r) => (
                      <option key={r.id} value={r.name}>{r.name}</option>
                    ))}
                  </select>
                </div>
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

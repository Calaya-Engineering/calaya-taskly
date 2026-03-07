"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import { Card, SectionTitle, Pill } from "@/components/dashboard-ui";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchWithAuth } from "@/lib/api";
import { toast } from "@/lib/toast";
import { PlusIcon, EditIcon, DeleteIcon, BuildingIcon, SearchIcon } from "@/lib/icons";
import { Checkbox } from "@/components/ui/checkbox";

export default function AdminDepartments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name: "" });
  const [saving, setSaving] = useState(false);
  const [viewMode, setViewMode] = useState("table"); // "table" | "cards"
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedIds, setSelectedIds] = useState(new Set());

  const sortedDepts = useMemo(() => {
    const sorted = [...departments].sort((a, b) => a.id - b.id);
    if (!searchFilter.trim()) return sorted;
    const q = searchFilter.trim().toLowerCase();
    return sorted.filter((d) => d.name.toLowerCase().includes(q));
  }, [departments, searchFilter]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth("/api/departments");
      if (res.ok) setDepartments(await res.json());
    } catch {
      toast.error("Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setModal({ type: "create" });
    setForm({ name: "" });
  };

  const openEdit = (dept) => {
    setModal({ type: "edit", dept });
    setForm({ name: dept.name });
  };

  const closeModal = () => setModal(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (modal.type === "create") {
        const res = await fetchWithAuth("/api/departments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: form.name.trim() }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Failed to create department");
        }
        toast.success("Department created");
      } else {
        const res = await fetchWithAuth(`/api/departments/${modal.dept.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: form.name.trim() }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Failed to update department");
        }
        toast.success("Department updated");
      }
      closeModal();
      load();
    } catch (err) {
      toast.error(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (dept) => {
    if (!confirm(`Delete department "${dept.name}"?`)) return;
    try {
      const res = await fetchWithAuth(`/api/departments/${dept.id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to delete");
      }
      toast.success("Department deleted");
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
    if (selectedIds.size === sortedDepts.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(sortedDepts.map((d) => d.id)));
  };

  const handleDeleteSelected = async () => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;
    if (!confirm(`Delete ${ids.length} selected department(s)?`)) return;
    setSaving(true);
    try {
      let ok = 0;
      let fail = 0;
      for (const id of ids) {
        const res = await fetchWithAuth(`/api/departments/${id}`, { method: "DELETE" });
        if (res.ok) ok++;
        else fail++;
      }
      if (fail > 0) toast.error(`${fail} failed to delete`);
      if (ok > 0) {
        toast.success(`${ok} department(s) deleted`);
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
              Departments
            </h1>
            <p className="text-gray-600 mt-1">Manage company departments and divisions.</p>
          </div>
        </Card>

        {/* Filters */}
        <Card className="p-6">
          <SectionTitle
            title="Filters"
            subtitle="Filter by name and switch between table or card view"
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
                  Add Department
                </button>
              </div>
            }
          />
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Search by name</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Filter departments..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
            <div className="text-sm text-gray-500 self-end pb-2">
              Showing <span className="font-semibold text-gray-800">{sortedDepts.length}</span> of{" "}
              <span className="font-semibold text-gray-800">{departments.length}</span> departments
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <SectionTitle
            title="All Departments"
            subtitle="Create, edit, or remove departments. Select rows to bulk delete."
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
                        checked={sortedDepts.length > 0 && selectedIds.size === sortedDepts.length}
                        onCheckedChange={toggleSelectAll}
                        aria-label="Select all"
                      />
                    </th>
                    <th className="text-left px-5 py-3 font-semibold">ID</th>
                    <th className="text-left px-5 py-3 font-semibold">Name</th>
                    <th className="text-right px-5 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedDepts.map((d) => (
                    <tr key={d.id} className="border-b border-gray-100 hover:bg-gray-50/70 transition">
                      <td className="px-5 py-3">
                        <Checkbox
                          checked={selectedIds.has(d.id)}
                          onCheckedChange={() => toggleSelect(d.id)}
                          aria-label={`Select ${d.name}`}
                        />
                      </td>
                      <td className="px-5 py-3">{d.id}</td>
                      <td className="px-5 py-3">
                        <Pill>{d.name}</Pill>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={() => openEdit(d)}
                          className="px-3 py-1.5 rounded-xl text-[12px] font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition inline-flex items-center gap-1 mr-2"
                          style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                        >
                          <EditIcon className="w-3.5 h-3.5" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(d)}
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
              {sortedDepts.map((d) => (
                <Card key={d.id} className="p-4 hover:bg-gray-50/50 transition">
                  <div className="flex items-start justify-between gap-3">
                    <Checkbox
                      checked={selectedIds.has(d.id)}
                      onCheckedChange={() => toggleSelect(d.id)}
                      aria-label={`Select ${d.name}`}
                      className="shrink-0 mt-0.5"
                    />
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "rgba(109, 198, 223, 0.18)", color: "var(--primary-blue)" }}
                    >
                      <BuildingIcon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-semibold text-gray-500">ID {d.id}</div>
                      <div className="mt-1 font-extrabold truncate" style={{ color: "var(--primary-blue)" }}>
                        {d.name}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => openEdit(d)}
                      className="flex-1 px-3 py-2 rounded-xl text-[12px] font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition inline-flex items-center justify-center gap-1"
                      style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                    >
                      <EditIcon className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(d)}
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
                {modal.type === "create" ? "Create Department" : "Edit Department"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="dept-name">Name *</Label>
                  <Input
                    id="dept-name"
                    type="text"
                    required
                    className="mt-1 w-full px-4 py-3 rounded-2xl border-gray-200 focus:ring-2 focus:ring-blue-100"
                    value={form.name}
                    onChange={(e) => setForm({ name: e.target.value })}
                  />
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

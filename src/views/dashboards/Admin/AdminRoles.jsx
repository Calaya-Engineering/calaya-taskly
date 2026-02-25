"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import { Card, SectionTitle, Pill } from "@/components/dashboard-ui";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchWithAuth } from "@/lib/api";
import { toast } from "@/lib/toast";
import { PlusIcon, EditIcon, DeleteIcon, RefreshIcon } from "@/lib/icons";
import { Checkbox } from "@/components/ui/checkbox";

export default function AdminRoles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name: "" });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      // Fetch roles from Role table via /api/roles (prisma.role.findMany)
      const res = await fetchWithAuth("/api/roles");
      if (res.ok) {
        const data = await res.json();
        setRoles(Array.isArray(data) ? data : []);
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || "Failed to load roles");
        setRoles([]);
      }
    } catch {
      toast.error("Failed to load roles");
      setRoles([]);
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

  const openEdit = (role) => {
    setModal({ type: "edit", role });
    setForm({ name: role.name });
  };

  const closeModal = () => setModal(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (modal.type === "create") {
        const res = await fetchWithAuth("/api/roles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: form.name.trim() }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Failed to create role");
        }
        toast.success("Role created");
      } else {
        const res = await fetchWithAuth(`/api/roles/${modal.role.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: form.name.trim() }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Failed to update role");
        }
        toast.success("Role updated");
      }
      closeModal();
      load();
    } catch (err) {
      toast.error(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (role) => {
    if (!confirm(`Delete role "${role.name}"?`)) return;
    try {
      const res = await fetchWithAuth(`/api/roles/${role.id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to delete");
      }
      toast.success("Role deleted");
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
    if (selectedIds.size === roles.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(roles.map((r) => r.id)));
  };

  const handleDeleteSelected = async () => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;
    if (!confirm(`Delete ${ids.length} selected role(s)?`)) return;
    setSaving(true);
    try {
      let ok = 0;
      let fail = 0;
      for (const id of ids) {
        const res = await fetchWithAuth(`/api/roles/${id}`, { method: "DELETE" });
        if (res.ok) ok++;
        else fail++;
      }
      if (fail > 0) toast.error(`${fail} failed to delete`);
      if (ok > 0) {
        toast.success(`${ok} role(s) deleted`);
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
              Roles
            </h1>
            <p className="text-gray-600 mt-1">Manage system roles and permissions.</p>
          </div>
        </Card>

        <Card className="p-6">
          <SectionTitle
            title="Current Roles in System"
            subtitle="Roles fetched from database. Create, edit, or remove roles."
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
                <button
                  onClick={load}
                  disabled={loading}
                  className="text-sm font-semibold px-4 py-2 rounded-xl border bg-white hover:bg-gray-50 active:scale-[0.99] transition flex items-center gap-2 disabled:opacity-60"
                  style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                >
                  <RefreshIcon className="w-4 h-4" />
                  Refresh
                </button>
                <button
                  onClick={openCreate}
                  className="text-sm font-semibold px-4 py-2 rounded-xl text-white active:scale-[0.99] transition flex items-center gap-2"
                  style={{ backgroundColor: "var(--accent-red)" }}
                >
                  <PlusIcon className="w-4 h-4" />
                  Add Role
                </button>
              </div>
            }
          />

          {loading ? (
            <p className="text-gray-500 mt-5">Loading roles from system...</p>
          ) : roles.length === 0 ? (
            <div className="mt-5 p-8 text-center rounded-2xl border border-gray-200/70 bg-gray-50/50">
              <p className="text-gray-600 font-medium">No roles in the system yet.</p>
              <p className="text-sm text-gray-500 mt-1">Add a role to get started, or run the database seed.</p>
              <button
                onClick={openCreate}
                className="mt-4 px-4 py-2 rounded-xl font-semibold text-white"
                style={{ backgroundColor: "var(--primary-blue)" }}
              >
                Add First Role
              </button>
            </div>
          ) : (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="w-10 px-5 py-3">
                      <Checkbox
                        checked={roles.length > 0 && selectedIds.size === roles.length}
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
                  {roles.map((r) => (
                    <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50/70 transition">
                      <td className="px-5 py-3">
                        <Checkbox
                          checked={selectedIds.has(r.id)}
                          onCheckedChange={() => toggleSelect(r.id)}
                          aria-label={`Select ${r.name}`}
                        />
                      </td>
                      <td className="px-5 py-3">{r.id}</td>
                      <td className="px-5 py-3">
                        <Pill>{r.name}</Pill>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={() => openEdit(r)}
                          className="px-3 py-1.5 rounded-xl text-[12px] font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition inline-flex items-center gap-1 mr-2"
                          style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                        >
                          <EditIcon className="w-3.5 h-3.5" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(r)}
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
          )}
        </Card>

        {modal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md p-6">
              <h2 className="text-lg font-extrabold mb-4" style={{ color: "var(--primary-blue)" }}>
                {modal.type === "create" ? "Create Role" : "Edit Role"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="role-name">Name *</Label>
                  <Input
                    id="role-name"
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

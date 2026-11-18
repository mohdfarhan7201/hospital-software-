"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { StatCard } from "@/components/common/StatCard";
import { toast } from "sonner";
import { Building2, MapPin, Phone, Plus, CheckCircle2, ShieldCheck } from "lucide-react";

interface Branch {
  id: string;
  code: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  bedCount: number;
  isMainBranch: boolean;
  status: "Active" | "Maintenance";
}

const INITIAL_BRANCHES: Branch[] = [
  { id: "1", code: "DEL-HQ", name: "NuvertOS Memorial Hospital (Main Campus)", city: "New Delhi", address: "Sector 62, Institutional Area", phone: "+91 11 4820 0000", bedCount: 250, isMainBranch: true, status: "Active" },
  { id: "2", code: "GGN-02", name: "NuvertOS Clinic & Daycare Centre", city: "Gurugram", address: "DLF Cyber City, Phase 2", phone: "+91 124 455 1100", bedCount: 45, isMainBranch: false, status: "Active" },
  { id: "3", code: "NOI-03", name: "NuvertOS Multispecialty Extension", city: "Noida", address: "Sector 18, Commercial Hub", phone: "+91 120 488 2200", bedCount: 80, isMainBranch: false, status: "Active" },
];

export default function BranchesSettingsPage() {
  const [branches, setBranches] = useState<Branch[]>(INITIAL_BRANCHES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({
    code: "",
    name: "",
    city: "",
    address: "",
    phone: "",
    bedCount: 30,
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code || !form.name) {
      toast.error("Please enter required branch details");
      return;
    }
    const newB: Branch = {
      id: String(branches.length + 1),
      code: form.code.toUpperCase(),
      name: form.name,
      city: form.city || "New Delhi",
      address: form.address,
      phone: form.phone,
      bedCount: Number(form.bedCount),
      isMainBranch: false,
      status: "Active",
    };
    setBranches([...branches, newB]);
    setShowAddModal(false);
    toast.success(`Hospital facility ${newB.name} added`);
  };

  const columns = [
    { key: "code", header: "Branch Code", render: (r: Branch) => <span className="font-mono font-bold text-[var(--primary)]">{r.code}</span> },
    { 
      key: "name", 
      header: "Facility Campus",
      render: (r: Branch) => (
        <div>
          <div className="font-bold text-[var(--foreground)] flex items-center gap-2">
            {r.name}
            {r.isMainBranch && (
              <span className="px-2 py-0.2 rounded text-[10px] bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 font-semibold">
                HQ Campus
              </span>
            )}
          </div>
          <div className="text-xs text-[var(--muted-foreground)] flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3" /> {r.address}, {r.city}
          </div>
        </div>
      )
    },
    { key: "phone", header: "Helpdesk Phone", render: (r: Branch) => <span className="font-mono text-xs">{r.phone}</span> },
    { key: "bedCount", header: "Capacity", render: (r: Branch) => <span className="font-mono font-semibold">{r.bedCount} Beds</span> },
    {
      key: "status",
      header: "Status",
      render: (r: Branch) => (
        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400">
          {r.status}
        </span>
      )
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        title="Multi-Branch & Unit Configuration"
        description="Configure hospital campuses, satellite daycare clinics, regional referral centers, and shared electronic medical records"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings/hospital" },
          { label: "Branches" },
        ]}
        actions={
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Add Campus Facility
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard title="Active Hospital Facilities" value={String(branches.length)} subtitle="Integrated in HIS" icon={Building2} />
        <StatCard title="Total Cumulative Beds" value={String(branches.reduce((acc, b) => acc + b.bedCount, 0))} subtitle="Across all facilities" icon={ShieldCheck} />
        <StatCard title="Centralized EHR Network" value="100% Synced" subtitle="Single patient identity" icon={CheckCircle2} />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">Operating Campuses & Satellite Units</h3>
        <DataTable columns={columns} data={branches} searchKey="name" searchPlaceholder="Search branch by name or city..." />
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl w-full max-w-lg p-6 shadow-xl text-xs">
            <h3 className="text-base font-bold text-[var(--foreground)] mb-1">Add Hospital Campus / Unit</h3>
            <p className="text-xs text-[var(--muted-foreground)] mb-4">Register a satellite clinic or sister multispecialty facility</p>

            <form onSubmit={handleAdd} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Branch Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. FBD-04"
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] font-mono uppercase focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Sanctioned Beds</label>
                  <input
                    type="number"
                    value={form.bedCount}
                    onChange={(e) => setForm({ ...form, bedCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Facility Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NuvertOS Mother & Child Super Speciality"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">City / District *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Faridabad"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Helpdesk Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 129 400 0000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Address Location</label>
                <input
                  type="text"
                  placeholder="Plot / Sector / Road"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border border-[var(--border)] hover:bg-[var(--background)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white hover:opacity-90 font-semibold"
                >
                  Save Branch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

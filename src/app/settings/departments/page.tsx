"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { StatCard } from "@/components/common/StatCard";
import { toast } from "sonner";
import { Layers, Users, Stethoscope, Plus, CheckCircle2 } from "lucide-react";

interface DepartmentRecord {
  id: string;
  code: string;
  name: string;
  type: "Clinical" | "Diagnostic" | "Administrative" | "Supportive";
  headOfDept: string;
  doctorCount: number;
  bedCount: number;
  status: "Active" | "Inactive";
}

const INITIAL_DEPTS: DepartmentRecord[] = [
  { id: "1", code: "CARDIO", name: "Cardiology & Cardiac Surgery", type: "Clinical", headOfDept: "Dr. Arvind Swamy", doctorCount: 8, bedCount: 24, status: "Active" },
  { id: "2", code: "PEDIA", name: "Pediatrics & Neonatology (NICU)", type: "Clinical", headOfDept: "Dr. Sneha Roy", doctorCount: 6, bedCount: 16, status: "Active" },
  { id: "3", code: "OBGYN", name: "Obstetrics & Gynecology", type: "Clinical", headOfDept: "Dr. Meenakshi Sundaram", doctorCount: 7, bedCount: 20, status: "Active" },
  { id: "4", code: "ORTHO", name: "Orthopedics & Joint Replacement", type: "Clinical", headOfDept: "Dr. Vikram Seth", doctorCount: 5, bedCount: 18, status: "Active" },
  { id: "5", code: "GENMED", name: "General Medicine & Diabetology", type: "Clinical", headOfDept: "Dr. Farhan Qureshi", doctorCount: 9, bedCount: 30, status: "Active" },
  { id: "6", code: "PATHLAB", name: "Pathology & Clinical Biochemistry", type: "Diagnostic", headOfDept: "Dr. Sunita Kulkarni", doctorCount: 4, bedCount: 0, status: "Active" },
  { id: "7", code: "RADIOL", name: "Radiology & Imaging Sciences", type: "Diagnostic", headOfDept: "Dr. Raghavendra Rao", doctorCount: 5, bedCount: 0, status: "Active" },
  { id: "8", code: "PHARM", name: "Hospital Pharmacy Services", type: "Supportive", headOfDept: "Sunil Narang", doctorCount: 0, bedCount: 0, status: "Active" },
];

export default function DepartmentsMasterPage() {
  const [departments, setDepartments] = useState<DepartmentRecord[]>(INITIAL_DEPTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    type: "Clinical",
    headOfDept: "",
    doctorCount: 3,
    bedCount: 12,
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code || !formData.name) {
      toast.error("Please fill department details");
      return;
    }
    const newDept: DepartmentRecord = {
      id: String(departments.length + 1),
      code: formData.code.toUpperCase(),
      name: formData.name,
      type: formData.type as any,
      headOfDept: formData.headOfDept || "To Be Assigned",
      doctorCount: Number(formData.doctorCount),
      bedCount: Number(formData.bedCount),
      status: "Active",
    };
    setDepartments([...departments, newDept]);
    setShowAddModal(false);
    toast.success(`Department ${newDept.name} registered`);
  };

  const columns = [
    { key: "code", header: "Code", render: (r: DepartmentRecord) => <span className="font-mono font-bold text-[var(--primary)]">{r.code}</span> },
    { key: "name", header: "Department Name", render: (r: DepartmentRecord) => <span className="font-bold text-[var(--foreground)]">{r.name}</span> },
    {
      key: "type",
      header: "Category",
      render: (r: DepartmentRecord) => (
        <span className="px-2 py-0.5 rounded text-xs bg-[var(--background)] border border-[var(--border)] font-medium">
          {r.type}
        </span>
      )
    },
    { key: "headOfDept", header: "Head of Department (HOD)" },
    { key: "doctorCount", header: "Physicians", render: (r: DepartmentRecord) => <span className="font-mono">{r.doctorCount} Doctors</span> },
    { key: "bedCount", header: "Ward Beds", render: (r: DepartmentRecord) => <span className="font-mono">{r.bedCount > 0 ? `${r.bedCount} Beds` : "—"}</span> },
    {
      key: "status",
      header: "Status",
      render: (r: DepartmentRecord) => (
        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400">
          {r.status}
        </span>
      )
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        title="Hospital Departments Master"
        description="Clinical specialties, diagnostic laboratories, allied healthcare wings, and administrative service units"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings/hospital" },
          { label: "Departments Master" },
        ]}
        actions={
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Create Department
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Departments" value={String(departments.length)} subtitle="Configured in HIS" icon={Layers} />
        <StatCard title="Clinical Specialties" value={String(departments.filter(d => d.type === "Clinical").length)} subtitle="Outpatient & Inpatient" icon={Stethoscope} />
        <StatCard title="Diagnostic Units" value={String(departments.filter(d => d.type === "Diagnostic").length)} subtitle="Pathology & Radiology" icon={CheckCircle2} />
        <StatCard title="Consultants Onboard" value={String(departments.reduce((acc, d) => acc + d.doctorCount, 0))} subtitle="Across all specialties" icon={Users} />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">Specialty & Service Department Directory</h3>
        <DataTable columns={columns} data={departments} searchKey="name" searchPlaceholder="Search department or HOD..." />
      </div>

      {/* Add Department Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl w-full max-w-lg p-6 shadow-xl text-xs">
            <h3 className="text-base font-bold text-[var(--foreground)] mb-1">Add Specialty Department</h3>
            <p className="text-xs text-[var(--muted-foreground)] mb-4">Define department code, category, and clinical leadership</p>

            <form onSubmit={handleAdd} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Department Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NEURO"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] font-mono uppercase focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Category Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                  >
                    <option value="Clinical">Clinical</option>
                    <option value="Diagnostic">Diagnostic</option>
                    <option value="Administrative">Administrative</option>
                    <option value="Supportive">Supportive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Department Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Neurology & Neurosurgery"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Head of Department (HOD)</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Ananya Sen"
                  value={formData.headOfDept}
                  onChange={(e) => setFormData({ ...formData, headOfDept: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Physician Headcount</label>
                  <input
                    type="number"
                    value={formData.doctorCount}
                    onChange={(e) => setFormData({ ...formData, doctorCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Sanctioned Beds</label>
                  <input
                    type="number"
                    value={formData.bedCount}
                    onChange={(e) => setFormData({ ...formData, bedCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] font-mono focus:outline-none"
                  />
                </div>
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
                  Save Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

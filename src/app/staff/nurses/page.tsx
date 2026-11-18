"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { StatCard } from "@/components/common/StatCard";
import { exportToCSV } from "@/lib/utils";
import { toast } from "sonner";
import { HeartPulse, UserCheck, Clock, Award, Plus, Mail, Phone } from "lucide-react";

interface NurseRecord {
  id: string;
  empId: string;
  name: string;
  role: string;
  wardStation: string;
  shift: string;
  contact: string;
  certification: string;
  status: "On Duty" | "Off Duty" | "On Leave";
}

const NURSES_LIST: NurseRecord[] = [
  { id: "1", empId: "NUR-201", name: "Nurse Priya Thomas", role: "Nursing In-Charge", wardStation: "ICU / CCU Station A", shift: "Morning (07:00 - 15:30)", contact: "+91 98111 22441", certification: "Critical Care (CCRN)", status: "On Duty" },
  { id: "2", empId: "NUR-202", name: "Nurse Anjali Nair", role: "Staff Nurse Gr-I", wardStation: "General Ward (Male)", shift: "Morning (07:00 - 15:30)", contact: "+91 98111 22442", certification: "BLS / ACLS", status: "On Duty" },
  { id: "3", empId: "NUR-203", name: "Nurse Sarita Joseph", role: "Staff Nurse Gr-II", wardStation: "Pediatric Ward", shift: "Evening (15:00 - 23:00)", contact: "+91 98111 22443", certification: "PALS Certified", status: "Off Duty" },
  { id: "4", empId: "NUR-204", name: "Nurse Bincy Mathew", role: "OT Scrub Nurse", wardStation: "Operation Theatre Complex", shift: "Morning (07:00 - 15:30)", contact: "+91 98111 22444", certification: "Perioperative Nursing", status: "On Duty" },
  { id: "5", empId: "NUR-205", name: "Nurse Kavita Sharma", role: "Staff Nurse Gr-I", wardStation: "Private Deluxe Wing", shift: "Night (22:30 - 07:30)", contact: "+91 98111 22445", certification: "IV Cannulation / ACLS", status: "Off Duty" },
  { id: "6", empId: "NUR-206", name: "Nurse Reena Kurien", role: "Triage Nurse", wardStation: "Emergency & Trauma", shift: "Morning (07:00 - 15:30)", contact: "+91 98111 22446", certification: "TNCC Certified", status: "On Leave" },
];

export default function NursesDirectoryPage() {
  const [nurses, setNurses] = useState<NurseRecord[]>(NURSES_LIST);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "Staff Nurse Gr-I",
    wardStation: "General Ward (Male)",
    shift: "Morning (07:00 - 15:30)",
    contact: "",
    certification: "BLS / ACLS",
  });

  const handleAddNurse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) {
      toast.error("Please enter required nurse details");
      return;
    }
    const newNurse: NurseRecord = {
      id: String(nurses.length + 1),
      empId: `NUR-${200 + nurses.length + 1}`,
      name: formData.name,
      role: formData.role,
      wardStation: formData.wardStation,
      shift: formData.shift,
      contact: formData.contact,
      certification: formData.certification,
      status: "On Duty",
    };
    setNurses([newNurse, ...nurses]);
    setShowAddModal(false);
    toast.success(`Nurse ${newNurse.name} added to station duty`);
  };

  const columns = [
    { key: "empId", header: "Nurse ID", render: (r: NurseRecord) => <span className="font-mono font-bold text-[var(--primary)]">{r.empId}</span> },
    {
      key: "name",
      header: "Nursing Officer",
      render: (r: NurseRecord) => (
        <div>
          <div className="font-bold text-[var(--foreground)]">{r.name}</div>
          <div className="text-xs text-[var(--muted-foreground)]">{r.role}</div>
        </div>
      )
    },
    { key: "wardStation", header: "Assigned Nursing Station", render: (r: NurseRecord) => <span className="font-medium">{r.wardStation}</span> },
    { key: "shift", header: "Duty Shift", render: (r: NurseRecord) => <span className="text-xs">{r.shift}</span> },
    { key: "certification", header: "Certifications", render: (r: NurseRecord) => <span className="text-xs px-2 py-0.5 rounded bg-[var(--background)] border border-[var(--border)]">{r.certification}</span> },
    { key: "contact", header: "Contact Mobile", render: (r: NurseRecord) => <span className="font-mono text-xs">{r.contact}</span> },
    {
      key: "status",
      header: "Status",
      render: (r: NurseRecord) => (
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
          r.status === "On Duty" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400" :
          r.status === "On Leave" ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400" :
          "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
        }`}>
          {r.status}
        </span>
      )
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        title="Nursing Staff & Ward Stations"
        description="Nursing station allocations, nurse-to-patient ratio compliance, ACLS/BLS certifications, and shift changeovers"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Staff", href: "/staff" },
          { label: "Nursing Staff" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                exportToCSV(nurses, "nurses-roster.csv");
                toast.success("Nursing roster exported");
              }}
              className="px-3 py-2 text-xs font-semibold rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--background)]"
            >
              Export Roster
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Assign Nursing Officer
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Nursing Staff" value={String(nurses.length + 42)} subtitle="Trained professionals" icon={HeartPulse} />
        <StatCard title="Active On Duty" value={String(nurses.filter(n => n.status === "On Duty").length + 24)} subtitle="Across 6 ward stations" icon={UserCheck} />
        <StatCard title="Nurse-to-Patient Ratio" value="1 : 4 (General) / 1 : 1 (ICU)" subtitle="NABH Compliant Standard" icon={Award} />
        <StatCard title="BLS / ACLS Certified" value="100%" subtitle="All nursing staff verified" icon={Clock} />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">Nursing Station Duty Roster</h3>
        <DataTable columns={columns} data={nurses} searchKey="name" searchPlaceholder="Search nurse or ward station..." />
      </div>

      {/* Add Nurse Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl w-full max-w-lg p-6 shadow-xl">
            <h3 className="text-base font-bold text-[var(--foreground)] mb-1">Assign Nursing Officer</h3>
            <p className="text-xs text-[var(--muted-foreground)] mb-4">Assign nurse to a ward station, duty shift, and skill credential</p>

            <form onSubmit={handleAddNurse} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold mb-1">Nurse Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nurse Maria Joseph"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Designation</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                  >
                    <option value="Staff Nurse Gr-I">Staff Nurse Gr-I</option>
                    <option value="Staff Nurse Gr-II">Staff Nurse Gr-II</option>
                    <option value="Nursing In-Charge">Nursing In-Charge</option>
                    <option value="OT Scrub Nurse">OT Scrub Nurse</option>
                    <option value="Triage Nurse">Triage Nurse</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Ward Station *</label>
                  <select
                    value={formData.wardStation}
                    onChange={(e) => setFormData({ ...formData, wardStation: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                  >
                    <option value="ICU / CCU Station A">ICU / CCU Station A</option>
                    <option value="General Ward (Male)">General Ward (Male)</option>
                    <option value="General Ward (Female)">General Ward (Female)</option>
                    <option value="Pediatric Ward">Pediatric Ward</option>
                    <option value="Operation Theatre Complex">Operation Theatre Complex</option>
                    <option value="Private Deluxe Wing">Private Deluxe Wing</option>
                    <option value="Emergency & Trauma">Emergency & Trauma</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Duty Shift</label>
                  <select
                    value={formData.shift}
                    onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                  >
                    <option value="Morning (07:00 - 15:30)">Morning (07:00 - 15:30)</option>
                    <option value="Evening (15:00 - 23:00)">Evening (15:00 - 23:00)</option>
                    <option value="Night (22:30 - 07:30)">Night (22:30 - 07:30)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Contact Mobile *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 00000"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Certification & Credentials</label>
                <input
                  type="text"
                  placeholder="e.g. BLS / ACLS / CCRN / PALS"
                  value={formData.certification}
                  onChange={(e) => setFormData({ ...formData, certification: e.target.value })}
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
                  Assign to Roster
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

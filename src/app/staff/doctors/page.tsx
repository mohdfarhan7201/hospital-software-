"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { StatCard } from "@/components/common/StatCard";
import { exportToCSV, formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { UserCheck, Award, Clock, DollarSign, Plus, Phone, Mail } from "lucide-react";

interface DoctorRecord {
  id: string;
  name: string;
  registrationNo: string;
  department: string;
  qualification: string;
  experienceYears: number;
  consultationFee: number;
  opdRoom: string;
  photoUrl?: string;
  status: "Available" | "In OPD" | "In Surgery" | "On Leave";
}

const INITIAL_DOCTORS: DoctorRecord[] = [
  { id: "1", name: "Dr. Arvind Swamy", registrationNo: "MCI-48201", department: "Cardiology", qualification: "MBBS, MD, DM (Cardio)", experienceYears: 18, consultationFee: 1200, opdRoom: "Room 101", status: "In OPD", photoUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80" },
  { id: "2", name: "Dr. Sneha Roy", registrationNo: "MCI-52194", department: "Pediatrics", qualification: "MBBS, DCH, DNB (Ped)", experienceYears: 12, consultationFee: 800, opdRoom: "Room 104", status: "Available", photoUrl: "https://images.unsplash.com/photo-1594824813508-4d64319087cf?w=200&auto=format&fit=crop&q=80" },
  { id: "3", name: "Dr. Meenakshi Sundaram", registrationNo: "MCI-39812", department: "Obstetrics & Gynecology", qualification: "MBBS, MS (OBG), FICOG", experienceYears: 22, consultationFee: 1000, opdRoom: "Room 106", status: "In Surgery", photoUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80" },
  { id: "4", name: "Dr. Vikram Seth", registrationNo: "MCI-61029", department: "Orthopedics", qualification: "MBBS, MS (Ortho), MCh", experienceYears: 15, consultationFee: 1100, opdRoom: "Room 108", status: "Available", photoUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&auto=format&fit=crop&q=80" },
  { id: "5", name: "Dr. Farhan Qureshi", registrationNo: "MCI-73014", department: "General Medicine", qualification: "MBBS, MD (Internal Med)", experienceYears: 9, consultationFee: 700, opdRoom: "Room 102", status: "In OPD", photoUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&auto=format&fit=crop&q=80" },
  { id: "6", name: "Dr. Ananya Sen", registrationNo: "MCI-84192", department: "Neurology", qualification: "MBBS, MD, DM (Neuro)", experienceYears: 14, consultationFee: 1500, opdRoom: "Room 110", status: "On Leave", photoUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&auto=format&fit=crop&q=80" },
];

export default function DoctorsDirectoryPage() {
  const [doctors, setDoctors] = useState<DoctorRecord[]>(INITIAL_DOCTORS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    registrationNo: "",
    department: "Cardiology",
    qualification: "",
    experienceYears: 5,
    consultationFee: 1000,
    opdRoom: "Room 105",
  });

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.registrationNo) {
      toast.error("Please fill required doctor details");
      return;
    }
    const newDoc: DoctorRecord = {
      id: String(doctors.length + 1),
      name: form.name,
      registrationNo: form.registrationNo,
      department: form.department,
      qualification: form.qualification || "MBBS, MD",
      experienceYears: Number(form.experienceYears),
      consultationFee: Number(form.consultationFee),
      opdRoom: form.opdRoom,
      status: "Available",
    };
    setDoctors([newDoc, ...doctors]);
    setShowAddModal(false);
    toast.success(`Physician ${newDoc.name} registered successfully`);
  };

  const columns = [
    {
      key: "name",
      header: "Consultant Physician",
      render: (r: DoctorRecord) => (
        <div className="flex items-center gap-3">
          {r.photoUrl ? (
            <img
              src={r.photoUrl}
              alt={r.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-[var(--primary)]/20 shrink-0 shadow-xs"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-bold flex items-center justify-center text-xs shrink-0">
              {r.name.slice(0, 2)}
            </div>
          )}
          <div>
            <div className="font-bold text-[var(--foreground)]">{r.name}</div>
            <div className="text-xs text-[var(--muted-foreground)]">{r.qualification}</div>
          </div>
        </div>
      )
    },
    { key: "registrationNo", header: "MCI / State Reg No", render: (r: DoctorRecord) => <span className="font-mono text-xs font-semibold">{r.registrationNo}</span> },
    { key: "department", header: "Specialty", render: (r: DoctorRecord) => <span className="px-2 py-0.5 rounded text-xs bg-[var(--background)] border border-[var(--border)]">{r.department}</span> },
    { key: "experienceYears", header: "Experience", render: (r: DoctorRecord) => <span>{r.experienceYears} Years</span> },
    { key: "opdRoom", header: "OPD Chamber", render: (r: DoctorRecord) => <span className="font-mono text-xs">{r.opdRoom}</span> },
    { key: "consultationFee", header: "OPD Fee", render: (r: DoctorRecord) => <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(r.consultationFee)}</span> },
    {
      key: "status",
      header: "Real-time Status",
      render: (r: DoctorRecord) => (
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
          r.status === "Available" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400" :
          r.status === "In OPD" ? "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-400" :
          r.status === "In Surgery" ? "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-400" :
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
        title="Consultant Physicians & Surgeons Directory"
        description="Medical Council of India (MCI) credentialing, OPD consultation schedule, surgical privileges, and chamber assignments"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Staff", href: "/staff" },
          { label: "Doctor Directory" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                exportToCSV(doctors, "doctors-directory.csv");
                toast.success("Doctors directory downloaded");
              }}
              className="px-3 py-2 text-xs font-semibold rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--background)]"
            >
              Export CSV
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Register Physician
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Specialists" value={String(doctors.length)} subtitle="Across 6 departments" icon={Award} />
        <StatCard title="Active In Consultation" value={String(doctors.filter(d => d.status === "In OPD").length)} subtitle="OPD chamber active" icon={UserCheck} />
        <StatCard title="In Operation Theatres" value={String(doctors.filter(d => d.status === "In Surgery").length)} subtitle="Major OT active" icon={Clock} />
        <StatCard title="Avg Consultation Fee" value="₹1,050" subtitle="Per OPD consult" icon={DollarSign} />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">Physicians Credentialing Registry</h3>
        <DataTable columns={columns} data={doctors} searchKey="name" searchPlaceholder="Search by doctor name or specialty..." />
      </div>

      {/* Add Doctor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl w-full max-w-lg p-6 shadow-xl">
            <h3 className="text-base font-bold text-[var(--foreground)] mb-1">Add Consultant Physician</h3>
            <p className="text-xs text-[var(--muted-foreground)] mb-4">Register doctor credentials, OPD consultation fee, and chamber</p>

            <form onSubmit={handleAddDoctor} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold mb-1">Doctor Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Khanna"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">MCI / SMC Reg No *</label>
                  <input
                    type="text"
                    required
                    placeholder="MCI-XXXXX"
                    value={form.registrationNo}
                    onChange={(e) => setForm({ ...form, registrationNo: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Department *</label>
                  <select
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Obstetrics & Gynecology">Obstetrics & Gynecology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="General Medicine">General Medicine</option>
                    <option value="Neurology">Neurology</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Qualifications</label>
                  <input
                    type="text"
                    placeholder="e.g. MBBS, MS, FRCS"
                    value={form.qualification}
                    onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    value={form.experienceYears}
                    onChange={(e) => setForm({ ...form, experienceYears: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">OPD Consultation Fee (₹)</label>
                  <input
                    type="number"
                    value={form.consultationFee}
                    onChange={(e) => setForm({ ...form, consultationFee: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">OPD Chamber Room</label>
                  <input
                    type="text"
                    value={form.opdRoom}
                    onChange={(e) => setForm({ ...form, opdRoom: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
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
                  Save Physician
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

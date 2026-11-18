"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { StatCard } from "@/components/common/StatCard";
import { exportToCSV } from "@/lib/utils";
import { toast } from "sonner";
import { Users, UserCheck, Calendar, Clock, Plus, ShieldCheck, Mail, Phone, Filter } from "lucide-react";

interface StaffMember {
  id: string;
  empId: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  shift: string;
  photoUrl?: string;
  status: "Active" | "On Leave" | "Off Duty";
}

const INITIAL_STAFF: StaffMember[] = [
  { id: "1", empId: "EMP-1001", name: "Dr. Arvind Swamy", role: "Chief of Cardiology", department: "Cardiology", email: "a.swamy@nuvertos.org", phone: "+91 98111 00001", shift: "Morning (08:00 - 16:00)", status: "Active", photoUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80" },
  { id: "2", empId: "EMP-1002", name: "Dr. Sneha Roy", role: "Senior Consultant", department: "Pediatrics", email: "s.roy@nuvertos.org", phone: "+91 98111 00002", shift: "Morning (08:00 - 16:00)", status: "Active", photoUrl: "https://images.unsplash.com/photo-1594824813508-4d64319087cf?w=200&auto=format&fit=crop&q=80" },
  { id: "3", empId: "EMP-1003", name: "Nurse Priya Thomas", role: "Head Nursing Superintendent", department: "ICU / CCU", email: "p.thomas@nuvertos.org", phone: "+91 98111 00003", shift: "Night (20:00 - 08:00)", status: "Active", photoUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=200&auto=format&fit=crop&q=80" },
  { id: "4", empId: "EMP-1004", name: "Sunil Narang", role: "Chief Pharmacist", department: "Pharmacy", email: "s.narang@nuvertos.org", phone: "+91 98111 00004", shift: "General (09:00 - 18:00)", status: "Active", photoUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&auto=format&fit=crop&q=80" },
  { id: "5", empId: "EMP-1005", name: "Ritu Sengupta", role: "Senior Lab Technologist", department: "Laboratory", email: "r.sengupta@nuvertos.org", phone: "+91 98111 00005", shift: "Morning (08:00 - 16:00)", status: "On Leave", photoUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80" },
  { id: "6", empId: "EMP-1006", name: "Dr. Vikram Seth", role: "Consultant Orthopedist", department: "Orthopedics", email: "v.seth@nuvertos.org", phone: "+91 98111 00006", shift: "Morning (08:00 - 16:00)", status: "Off Duty", photoUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&auto=format&fit=crop&q=80" },
];

export default function StaffDirectoryPage() {
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "Doctor",
    department: "Cardiology",
    email: "",
    phone: "",
    shift: "Morning (08:00 - 16:00)",
  });

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill all required staff details");
      return;
    }
    const newStaff: StaffMember = {
      id: String(staff.length + 1),
      empId: `EMP-${1000 + staff.length + 1}`,
      name: formData.name,
      role: formData.role,
      department: formData.department,
      email: formData.email,
      phone: formData.phone,
      shift: formData.shift,
      status: "Active",
    };
    setStaff([newStaff, ...staff]);
    setShowAddModal(false);
    toast.success(`Staff member ${newStaff.name} added successfully with ID ${newStaff.empId}`);
  };

  const columns = [
    { key: "empId", header: "Emp ID", render: (r: StaffMember) => <span className="font-mono font-bold text-[var(--primary)]">{r.empId}</span> },
    { 
      key: "name", 
      header: "Staff Name",
      render: (r: StaffMember) => (
        <div className="flex items-center gap-3">
          {r.photoUrl ? (
            <img
              src={r.photoUrl}
              alt={r.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-[var(--primary)]/20 shrink-0 shadow-xs"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-bold flex items-center justify-center text-xs shrink-0">
              {r.name.slice(0, 2)}
            </div>
          )}
          <div>
            <div className="font-bold text-[var(--foreground)]">{r.name}</div>
            <div className="text-xs text-[var(--muted-foreground)]">{r.role}</div>
          </div>
        </div>
      )
    },
    { key: "department", header: "Department", render: (r: StaffMember) => <span className="px-2 py-0.5 rounded text-xs bg-[var(--background)] border border-[var(--border)]">{r.department}</span> },
    { 
      key: "contact", 
      header: "Contact Details",
      render: (r: StaffMember) => (
        <div className="text-xs">
          <div className="flex items-center gap-1"><Mail className="w-3 h-3 text-[var(--muted-foreground)]" /> {r.email}</div>
          <div className="flex items-center gap-1 font-mono text-[var(--muted-foreground)]"><Phone className="w-3 h-3" /> {r.phone}</div>
        </div>
      )
    },
    { key: "shift", header: "Duty Shift", render: (r: StaffMember) => <span className="text-xs">{r.shift}</span> },
    {
      key: "status",
      header: "Duty Status",
      render: (r: StaffMember) => (
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
          r.status === "Active" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400" :
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
        title="Hospital Staff & HR Directory"
        description="Comprehensive healthcare workforce roster, employee onboarding, credentialing, shift duty allocation, and contact ledger"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Staff & Administration", href: "/staff" },
          { label: "Staff Directory" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                exportToCSV(staff, "staff-directory.csv");
                toast.success("Staff directory exported");
              }}
              className="px-3 py-2 text-xs font-semibold rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--background)] transition-colors"
            >
              Export CSV
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5 transition-opacity"
            >
              <Plus className="w-3.5 h-3.5" /> Onboard New Staff
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Hospital Workforce" value={String(staff.length + 184)} subtitle="Across all facilities" icon={Users} />
        <StatCard title="Active On-Duty Today" value={String(staff.filter(s => s.status === 'Active').length + 120)} subtitle="Day & Night shifts" icon={UserCheck} />
        <StatCard title="Staff on Approved Leave" value="12" subtitle="Annual / Casual / Sick" icon={Calendar} />
        <StatCard title="Attendance Compliance" value="98.2%" subtitle="Biometric check-in verified" icon={Clock} />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[var(--foreground)]">Registered Hospital Staff Directory</h3>
          <div className="flex items-center gap-2 text-xs">
            <Link href="/staff/doctors" className="text-[var(--primary)] hover:underline font-semibold">Doctors Directory &rarr;</Link>
            <span className="text-[var(--muted-foreground)]">•</span>
            <Link href="/staff/nurses" className="text-[var(--primary)] hover:underline font-semibold">Nursing Directory &rarr;</Link>
          </div>
        </div>
        <DataTable columns={columns} data={staff} searchKey="name" searchPlaceholder="Search by name, emp ID, or department..." />
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl w-full max-w-lg p-6 shadow-xl">
            <h3 className="text-base font-bold text-[var(--foreground)] mb-1">Onboard Healthcare Staff</h3>
            <p className="text-xs text-[var(--muted-foreground)] mb-4">Add a physician, nursing professional, technician, or administrative staff</p>

            <form onSubmit={handleAddStaff} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold mb-1">Full Name & Salutation *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Khanna / Nurse Mary D'Souza"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Role / Designation *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Consultant Surgeon / Staff Nurse"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Department *</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="ICU / CCU">ICU / CCU</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Laboratory">Laboratory</option>
                    <option value="Radiology">Radiology</option>
                    <option value="General Administration">General Administration</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Hospital Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@nuvertos.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Mobile Contact *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Duty Shift Allocation</label>
                <select
                  value={formData.shift}
                  onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                >
                  <option value="Morning (08:00 - 16:00)">Morning (08:00 - 16:00)</option>
                  <option value="Evening (14:00 - 22:00)">Evening (14:00 - 22:00)</option>
                  <option value="Night (20:00 - 08:00)">Night (20:00 - 08:00)</option>
                  <option value="General (09:00 - 18:00)">General (09:00 - 18:00)</option>
                </select>
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
                  Save & Onboard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

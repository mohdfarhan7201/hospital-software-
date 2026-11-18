"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { StatCard } from "@/components/common/StatCard";
import { toast } from "sonner";
import { Users, ShieldCheck, Key, Lock, Plus, CheckCircle2, AlertTriangle } from "lucide-react";

interface UserAccount {
  id: string;
  username: string;
  name: string;
  role: string;
  department: string;
  lastLogin: string;
  mfaEnabled: boolean;
  status: "Active" | "Suspended" | "Pending Activation";
}

const INITIAL_USERS: UserAccount[] = [
  { id: "1", username: "superadmin@nuvertos.org", name: "System Administrator", role: "Super Administrator", department: "IT & Systems", lastLogin: "2 mins ago", mfaEnabled: true, status: "Active" },
  { id: "2", username: "admin@nuvertos.org", name: "Dr. Alok Verma", role: "Hospital Administrator", department: "Executive Office", lastLogin: "15 mins ago", mfaEnabled: true, status: "Active" },
  { id: "3", username: "doctor@nuvertos.org", name: "Dr. Arvind Swamy", role: "Doctor", department: "Cardiology", lastLogin: "1 hour ago", mfaEnabled: true, status: "Active" },
  { id: "4", username: "nurse@nuvertos.org", name: "Nurse Priya Thomas", role: "Nurse", department: "ICU / CCU", lastLogin: "3 hours ago", mfaEnabled: false, status: "Active" },
  { id: "5", username: "reception@nuvertos.org", name: "Pooja Sharma", role: "Receptionist", department: "Front Desk", lastLogin: "5 mins ago", mfaEnabled: false, status: "Active" },
  { id: "6", username: "billing@nuvertos.org", name: "Ramesh Jain", role: "Accountant", department: "Finance & Accounts", lastLogin: "30 mins ago", mfaEnabled: true, status: "Active" },
  { id: "7", username: "pharmacy@nuvertos.org", name: "Sunil Narang", role: "Pharmacist", department: "Pharmacy", lastLogin: "2 hours ago", mfaEnabled: false, status: "Active" },
  { id: "8", username: "lab@nuvertos.org", name: "Ritu Sengupta", role: "Lab Technician", department: "Laboratory", lastLogin: "Yesterday", mfaEnabled: true, status: "Active" },
];

export default function UsersAccessPage() {
  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    username: "",
    role: "Doctor",
    department: "Cardiology",
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.username) {
      toast.error("Please fill required user credentials");
      return;
    }
    const newUser: UserAccount = {
      id: String(users.length + 1),
      username: form.username,
      name: form.name,
      role: form.role,
      department: form.department,
      lastLogin: "Never",
      mfaEnabled: true,
      status: "Active",
    };
    setUsers([newUser, ...users]);
    setShowAddModal(false);
    toast.success(`User ${newUser.username} provisioned with temporary access token`);
  };

  const columns = [
    {
      key: "username",
      header: "Login Email",
      render: (r: UserAccount) => (
        <div>
          <div className="font-mono font-semibold text-[var(--primary)] text-xs">{r.username}</div>
          <div className="text-[11px] text-[var(--muted-foreground)]">{r.name}</div>
        </div>
      )
    },
    { key: "role", header: "Assigned Role", render: (r: UserAccount) => <span className="font-bold text-[var(--foreground)]">{r.role}</span> },
    { key: "department", header: "Department" },
    { 
      key: "mfaEnabled", 
      header: "2FA Security",
      render: (r: UserAccount) => (
        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
          r.mfaEnabled ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400" : "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400"
        }`}>
          {r.mfaEnabled ? "Enforced (TOTP)" : "Disabled"}
        </span>
      )
    },
    { key: "lastLogin", header: "Last Activity", render: (r: UserAccount) => <span className="text-xs text-[var(--muted-foreground)]">{r.lastLogin}</span> },
    {
      key: "status",
      header: "Account State",
      render: (r: UserAccount) => (
        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400">
          {r.status}
        </span>
      )
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        title="User Access & Security Management"
        description="Provision hospital staff accounts, manage multi-factor authentication (MFA/2FA), session policies, and password expiry rules"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings/hospital" },
          { label: "User Access" },
        ]}
        actions={
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Provision User
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <StatCard title="Active Accounts" value={String(users.length + 142)} subtitle="Provisioned in Directory" icon={Users} />
        <StatCard title="MFA Enforced Rate" value="82.5%" subtitle="Hardware / App Authenticator" icon={ShieldCheck} />
        <StatCard title="Concurrent Sessions" value="54" subtitle="Active logged-in staff" icon={Key} />
        <StatCard title="Failed Login Lockouts" value="0" subtitle="Zero brute-force alerts" icon={Lock} />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">Provisioned Hospital User Accounts</h3>
        <DataTable columns={columns} data={users} searchKey="username" searchPlaceholder="Search by email or name..." />
      </div>

      {/* Provision User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl w-full max-w-lg p-6 shadow-xl text-xs">
            <h3 className="text-base font-bold text-[var(--foreground)] mb-1">Provision New User Account</h3>
            <p className="text-xs text-[var(--muted-foreground)] mb-4">Create login credentials and link to an operational RBAC role</p>

            <form onSubmit={handleAdd} className="space-y-3.5">
              <div>
                <label className="block font-semibold mb-1">Staff Member Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Khanna"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Login Email / Username *</label>
                <input
                  type="email"
                  required
                  placeholder="name@nuvertos.org"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Assigned Role</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                  >
                    <option value="Super Administrator">Super Administrator</option>
                    <option value="Hospital Administrator">Hospital Administrator</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Accountant">Accountant</option>
                    <option value="Pharmacist">Pharmacist</option>
                    <option value="Receptionist">Receptionist</option>
                    <option value="Lab Technician">Lab Technician</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Department</label>
                  <select
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="ICU / CCU">ICU / CCU</option>
                    <option value="Front Desk">Front Desk</option>
                    <option value="Finance & Accounts">Finance & Accounts</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Laboratory">Laboratory</option>
                  </select>
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
                  Provision User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

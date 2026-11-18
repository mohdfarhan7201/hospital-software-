"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { StatCard } from "@/components/common/StatCard";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import { Calendar, CheckCircle2, XCircle, Clock, Plus, ShieldAlert } from "lucide-react";

interface LeaveApplication {
  id: string;
  empId: string;
  name: string;
  department: string;
  leaveType: "Privilege Leave (PL)" | "Casual Leave (CL)" | "Sick Leave (SL)" | "Maternity Leave";
  fromDate: string;
  toDate: string;
  days: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

const INITIAL_LEAVES: LeaveApplication[] = [
  { id: "1", empId: "EMP-1005", name: "Ritu Sengupta", department: "Laboratory", leaveType: "Sick Leave (SL)", fromDate: "2026-10-15", toDate: "2026-10-17", days: 3, reason: "Viral fever and acute throat infection", status: "Pending" },
  { id: "2", empId: "EMP-1006", name: "Dr. Vikram Seth", department: "Orthopedics", leaveType: "Casual Leave (CL)", fromDate: "2026-10-20", toDate: "2026-10-21", days: 2, reason: "Attending Indian Orthopedic Association National Conference", status: "Approved" },
  { id: "3", empId: "NUR-206", name: "Nurse Reena Kurien", department: "Emergency & Trauma", leaveType: "Privilege Leave (PL)", fromDate: "2026-10-14", toDate: "2026-10-19", days: 6, reason: "Annual family visit to Kerala", status: "Approved" },
  { id: "4", empId: "EMP-1004", name: "Sunil Narang", department: "Pharmacy", leaveType: "Casual Leave (CL)", fromDate: "2026-10-25", toDate: "2026-10-26", days: 2, reason: "Family wedding event", status: "Pending" },
];

export default function LeaveManagementPage() {
  const [leaves, setLeaves] = useState<LeaveApplication[]>(INITIAL_LEAVES);

  const handleAction = (id: string, newStatus: "Approved" | "Rejected") => {
    setLeaves(leaves.map(l => l.id === id ? { ...l, status: newStatus } : l));
    toast.success(`Leave request ${newStatus.toLowerCase()} successfully`);
  };

  const columns = [
    { key: "empId", header: "Emp ID", render: (r: LeaveApplication) => <span className="font-mono font-bold text-[var(--primary)]">{r.empId}</span> },
    { key: "name", header: "Employee Name", render: (r: LeaveApplication) => <span className="font-bold text-[var(--foreground)]">{r.name}</span> },
    { key: "department", header: "Department" },
    { key: "leaveType", header: "Leave Category", render: (r: LeaveApplication) => <span className="text-xs px-2 py-0.5 rounded bg-[var(--background)] border border-[var(--border)]">{r.leaveType}</span> },
    { key: "duration", header: "Period", render: (r: LeaveApplication) => <span className="text-xs">{formatDate(r.fromDate)} to {formatDate(r.toDate)} ({r.days} d)</span> },
    { key: "reason", header: "Application Reason", render: (r: LeaveApplication) => <span className="text-xs text-[var(--muted-foreground)] max-w-xs truncate block">{r.reason}</span> },
    {
      key: "status",
      header: "Status",
      render: (r: LeaveApplication) => (
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
          r.status === "Approved" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400" :
          r.status === "Rejected" ? "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-400" :
          "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400"
        }`}>
          {r.status}
        </span>
      )
    },
    {
      key: "actions",
      header: "HR Decision",
      render: (r: LeaveApplication) => (
        r.status === "Pending" ? (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleAction(r.id, "Approved")}
              className="px-2 py-1 text-xs rounded bg-emerald-600 text-white hover:bg-emerald-700 font-semibold"
            >
              Approve
            </button>
            <button
              onClick={() => handleAction(r.id, "Rejected")}
              className="px-2 py-1 text-xs rounded bg-rose-600 text-white hover:bg-rose-700 font-semibold"
            >
              Reject
            </button>
          </div>
        ) : (
          <span className="text-xs text-[var(--muted-foreground)] italic">Decided</span>
        )
      )
    }
  ];

  return (
    <DashboardShell>
      <PageHeader
        title="Staff Leave Administration & Approvals"
        description="Departmental leave workflows, coverage validation, statutory maternity/sick allowances, and annual leave balance ledger"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Staff", href: "/staff" },
          { label: "Leave Approvals" },
        ]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <StatCard title="Active On Leave" value="5" subtitle="Currently off duty" icon={Calendar} />
        <StatCard title="Pending Approvals" value={String(leaves.filter(l => l.status === "Pending").length)} subtitle="Requires supervisor review" icon={Clock} />
        <StatCard title="Approved This Month" value="18" subtitle="Coverage backfilled" icon={CheckCircle2} />
        <StatCard title="Department Minimum Staff" value="100% OK" subtitle="No critical ward understaffed" icon={ShieldAlert} />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">Pending & Processed Leave Applications</h3>
        <DataTable columns={columns} data={leaves} searchKey="name" searchPlaceholder="Search employee, ID or reason..." />
      </div>
    </DashboardShell>
  );
}

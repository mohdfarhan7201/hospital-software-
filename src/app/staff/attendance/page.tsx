"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { StatCard } from "@/components/common/StatCard";
import { exportToCSV } from "@/lib/utils";
import { toast } from "sonner";
import { Clock, CheckCircle2, AlertTriangle, Fingerprint, Calendar, Download } from "lucide-react";

interface AttendanceRecord {
  id: string;
  empId: string;
  name: string;
  department: string;
  date: string;
  checkIn: string;
  checkOut: string;
  workHours: string;
  biometricTerminal: string;
  status: "Present" | "Late In" | "Half Day" | "Absent";
}

const ATTENDANCE_LOGS: AttendanceRecord[] = [
  { id: "1", empId: "EMP-1001", name: "Dr. Arvind Swamy", department: "Cardiology", date: "2026-10-15", checkIn: "07:54 AM", checkOut: "04:15 PM", workHours: "8h 21m", biometricTerminal: "Terminal 01 - OPD Gate", status: "Present" },
  { id: "2", empId: "EMP-1002", name: "Dr. Sneha Roy", department: "Pediatrics", date: "2026-10-15", checkIn: "08:14 AM", checkOut: "04:02 PM", workHours: "7h 48m", biometricTerminal: "Terminal 01 - OPD Gate", status: "Late In" },
  { id: "3", empId: "EMP-1003", name: "Nurse Priya Thomas", department: "ICU / CCU", date: "2026-10-15", checkIn: "06:50 AM", checkOut: "03:35 PM", workHours: "8h 45m", biometricTerminal: "Terminal 03 - ICU Wing", status: "Present" },
  { id: "4", empId: "EMP-1004", name: "Sunil Narang", department: "Pharmacy", date: "2026-10-15", checkIn: "08:55 AM", checkOut: "06:10 PM", workHours: "9h 15m", biometricTerminal: "Terminal 02 - Admin Lobby", status: "Present" },
  { id: "5", empId: "EMP-1005", name: "Ritu Sengupta", department: "Laboratory", date: "2026-10-15", checkIn: "—", checkOut: "—", workHours: "0h 00m", biometricTerminal: "None", status: "Absent" },
  { id: "6", empId: "EMP-1006", name: "Dr. Vikram Seth", department: "Orthopedics", date: "2026-10-15", checkIn: "08:02 AM", checkOut: "04:20 PM", workHours: "8h 18m", biometricTerminal: "Terminal 01 - OPD Gate", status: "Present" },
];

export default function AttendancePage() {
  const [data, setData] = useState<AttendanceRecord[]>(ATTENDANCE_LOGS);

  const columns = [
    { key: "empId", header: "Emp ID", render: (r: AttendanceRecord) => <span className="font-mono font-bold text-[var(--primary)]">{r.empId}</span> },
    { key: "name", header: "Employee Name", render: (r: AttendanceRecord) => <span className="font-semibold text-[var(--foreground)]">{r.name}</span> },
    { key: "department", header: "Department" },
    { key: "checkIn", header: "Check In", render: (r: AttendanceRecord) => <span className="font-mono text-xs">{r.checkIn}</span> },
    { key: "checkOut", header: "Check Out", render: (r: AttendanceRecord) => <span className="font-mono text-xs">{r.checkOut}</span> },
    { key: "workHours", header: "Total Duration", render: (r: AttendanceRecord) => <span className="font-mono font-medium">{r.workHours}</span> },
    { key: "biometricTerminal", header: "Biometric Terminal", render: (r: AttendanceRecord) => <span className="text-xs text-[var(--muted-foreground)]">{r.biometricTerminal}</span> },
    {
      key: "status",
      header: "Status",
      render: (r: AttendanceRecord) => (
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
          r.status === "Present" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400" :
          r.status === "Late In" ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400" :
          r.status === "Half Day" ? "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-400" :
          "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-400"
        }`}>
          {r.status}
        </span>
      )
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        title="Biometric Attendance & Time Tracking"
        description="Real-time biometric punch logs, overtime audits, late check-in tracking, and shift duration compliance"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Staff", href: "/staff" },
          { label: "Attendance" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                exportToCSV(data, "attendance-punch-logs.csv");
                toast.success("Punch logs exported to CSV");
              }}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Export Punch Log
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <StatCard title="Punch Compliance" value="96.4%" subtitle="174 of 180 logged in" icon={Fingerprint} />
        <StatCard title="Present On Time" value="162" subtitle="Before shift start" icon={CheckCircle2} />
        <StatCard title="Grace Late Punches" value="12" subtitle="Within 15 mins grace" icon={AlertTriangle} />
        <StatCard title="Unscheduled Absences" value="6" subtitle="Requires supervisor review" icon={Clock} />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">Live Daily Attendance & Punch Register</h3>
        <DataTable columns={columns} data={data} searchKey="name" searchPlaceholder="Search employee, ID or department..." />
      </div>
    </DashboardShell>
  );
}

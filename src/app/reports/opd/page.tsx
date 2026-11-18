"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { StatCard } from "@/components/common/StatCard";
import { exportToCSV, formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { Activity, Clock, UserCheck, Calendar, Download } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const OPD_HOURLY_TRAFFIC = [
  { time: "08:00 AM", visits: 18 },
  { time: "09:00 AM", visits: 45 },
  { time: "10:00 AM", visits: 72 },
  { time: "11:00 AM", visits: 88 },
  { time: "12:00 PM", visits: 64 },
  { time: "01:00 PM", visits: 32 },
  { time: "02:00 PM", visits: 28 },
  { time: "03:00 PM", visits: 54 },
  { time: "04:00 PM", visits: 66 },
  { time: "05:00 PM", visits: 42 },
];

const OPD_DOCTOR_STATS = [
  { id: "1", doctor: "Dr. Arvind Swamy", dept: "Cardiology", totalConsults: 142, avgTime: "16 min", revenue: 170400, noShows: 4 },
  { id: "2", doctor: "Dr. Sneha Roy", dept: "Pediatrics", totalConsults: 198, avgTime: "12 min", revenue: 158400, noShows: 8 },
  { id: "3", doctor: "Dr. Meenakshi Sundaram", dept: "Obstetrics & Gynecology", totalConsults: 165, avgTime: "18 min", revenue: 165000, noShows: 5 },
  { id: "4", doctor: "Dr. Vikram Seth", dept: "Orthopedics", totalConsults: 130, avgTime: "15 min", revenue: 143000, noShows: 2 },
  { id: "5", doctor: "Dr. Farhan Qureshi", dept: "General Medicine", totalConsults: 240, avgTime: "10 min", revenue: 192000, noShows: 11 },
];

export default function OPDReportsPage() {
  const [data, setData] = useState(OPD_DOCTOR_STATS);

  const columns = [
    { key: "doctor", header: "Consultant Physician", render: (r: any) => <span className="font-bold text-[var(--foreground)]">{r.doctor}</span> },
    { key: "dept", header: "Department", render: (r: any) => <span className="text-xs px-2 py-0.5 rounded bg-[var(--background)] border border-[var(--border)]">{r.dept}</span> },
    { key: "totalConsults", header: "Total Consultations", render: (r: any) => <span className="font-mono font-semibold">{r.totalConsults}</span> },
    { key: "avgTime", header: "Avg Consultation Duration" },
    { key: "revenue", header: "Consultation Revenue", render: (r: any) => <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(r.revenue)}</span> },
    { key: "noShows", header: "No-Shows / Cancelled", render: (r: any) => <span className="text-rose-500 font-mono">{r.noShows}</span> },
  ];

  return (
    <DashboardShell>
      <PageHeader
        title="Outpatient (OPD) Flow & Turnaround Analytics"
        description="Hourly clinic throughput, waiting queue velocity, physician consultation metrics, and no-show rates"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Reports", href: "/reports" },
          { label: "OPD Reports" },
        ]}
        actions={
          <button
            onClick={() => {
              exportToCSV(data, "opd-performance-report.csv");
              toast.success("OPD Performance Report exported");
            }}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Export OPD Analytics
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total OPD Footfall" value="875" subtitle="Past 7 days" icon={Activity} />
        <StatCard title="Average Wait Time" value="16.4 min" subtitle="Target: < 20 min" trend={{ value: -8.2, isPositive: true }} icon={Clock} />
        <StatCard title="Total Consult Revenue" value="₹8,28,800" subtitle="Past 7 days" icon={Calendar} />
        <StatCard title="No-Show Rate" value="3.4%" subtitle="Within benchmark (< 5%)" icon={UserCheck} />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 mb-6 shadow-sm">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-1">Clinic Rush Hours & Token Traffic</h3>
        <p className="text-xs text-[var(--muted-foreground)] mb-4">Patient check-in volume distributed by consultation slot hours</p>
        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={OPD_HOURLY_TRAFFIC}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="visits" name="Consultations" stroke="#16a34a" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">Physician OPD Volume & Clinical Metrics</h3>
        <DataTable columns={columns} data={data} searchKey="doctor" searchPlaceholder="Filter doctor or department..." />
      </div>
    </DashboardShell>
  );
}

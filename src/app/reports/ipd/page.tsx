"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { StatCard } from "@/components/common/StatCard";
import { exportToCSV, formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { Bed, Users, Calendar, TrendingUp, Download, ArrowUpRight } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const WARD_UTILIZATION = [
  { ward: "General Male", total: 20, occupied: 18, rate: "90%" },
  { ward: "General Female", total: 15, occupied: 13, rate: "86.6%" },
  { ward: "Private Deluxe", total: 10, occupied: 7, rate: "70%" },
  { ward: "ICU / CCU", total: 8, occupied: 7, rate: "87.5%" },
  { ward: "Post-Op Recovery", total: 6, occupied: 3, rate: "50%" },
  { ward: "Pediatric Ward", total: 8, occupied: 5, rate: "62.5%" },
];

const IPD_ADMISSION_RECORDS = [
  { id: "1", ipdNo: "IPD-2026-0812", patient: "Ramesh Gupta", ward: "Cardiology ICU", bed: "ICU-02", doctor: "Dr. Arvind Swamy", admitDate: "2026-10-10", alosDays: 5, billEstimate: 145000 },
  { id: "2", ipdNo: "IPD-2026-0813", patient: "Sunita Verma", ward: "Private Deluxe", bed: "PVT-104", doctor: "Dr. Sneha Roy", admitDate: "2026-10-12", alosDays: 3, billEstimate: 85000 },
  { id: "3", ipdNo: "IPD-2026-0814", patient: "Harish Patel", ward: "General Male", bed: "GM-08", doctor: "Dr. Vikram Seth", admitDate: "2026-10-13", alosDays: 2, billEstimate: 42000 },
  { id: "4", ipdNo: "IPD-2026-0815", patient: "Ananya Iyer", ward: "Maternity Suite", bed: "MAT-03", doctor: "Dr. Meenakshi", admitDate: "2026-10-14", alosDays: 1, billEstimate: 68000 },
  { id: "5", ipdNo: "IPD-2026-0816", patient: "Kavita Nair", ward: "General Female", bed: "GF-04", doctor: "Dr. Farhan Qureshi", admitDate: "2026-10-14", alosDays: 1, billEstimate: 36000 },
];

export default function IPDReportsPage() {
  const [data, setData] = useState(IPD_ADMISSION_RECORDS);

  const columns = [
    { key: "ipdNo", header: "IPD Reg No", render: (r: any) => <span className="font-mono font-bold text-[var(--primary)]">{r.ipdNo}</span> },
    { key: "patient", header: "Inpatient Name", render: (r: any) => <span className="font-semibold text-[var(--foreground)]">{r.patient}</span> },
    { key: "ward", header: "Ward / Bed", render: (r: any) => <span>{r.ward} ({r.bed})</span> },
    { key: "doctor", header: "Attending Consultant" },
    { key: "alosDays", header: "Current Stay", render: (r: any) => <span className="font-mono font-medium">{r.alosDays} Days</span> },
    { key: "billEstimate", header: "Accrued Charges", render: (r: any) => <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(r.billEstimate)}</span> },
  ];

  return (
    <DashboardShell>
      <PageHeader
        title="Inpatient (IPD) Census & Length of Stay (ALOS)"
        description="Bed occupancy ratio, inpatient admission trajectory, departmental bed turnover, and average length of stay"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Reports", href: "/reports" },
          { label: "IPD Reports" },
        ]}
        actions={
          <button
            onClick={() => {
              exportToCSV(data, "ipd-census-report.csv");
              toast.success("IPD Census report downloaded");
            }}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Export IPD Data
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Inpatients" value="53" subtitle="Currently admitted" icon={Users} />
        <StatCard title="Overall Occupancy" value="81.5%" subtitle="53 of 65 beds" icon={Bed} />
        <StatCard title="Average Length of Stay" value="4.1 Days" subtitle="Within target (3.5 - 4.5)" icon={Calendar} />
        <StatCard title="Accrued IPD Billing" value="₹24.8 Lakhs" subtitle="Unbilled in-progress treatments" icon={TrendingUp} />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 mb-6 shadow-sm">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-1">Ward-wise Bed Utilization Breakdown</h3>
        <p className="text-xs text-[var(--muted-foreground)] mb-4">Occupied beds vs total capacity across all specialty wards</p>
        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={WARD_UTILIZATION}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="ward" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip />
              <Bar dataKey="total" name="Total Beds" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="occupied" name="Occupied Beds" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">Active Inpatient Census</h3>
        <DataTable columns={columns} data={data} searchKey="patient" searchPlaceholder="Search patient or IPD number..." />
      </div>
    </DashboardShell>
  );
}

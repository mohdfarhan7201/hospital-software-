"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { StatCard } from "@/components/common/StatCard";
import { exportToCSV } from "@/lib/utils";
import { toast } from "sonner";
import { Bed, CheckCircle2, Clock, AlertTriangle, Download, RefreshCw } from "lucide-react";

const BED_METRICS = [
  { ward: "Cardiology ICU", total: 8, occupied: 7, cleaning: 1, available: 0, turnRate: "92%", avgDays: 3.4 },
  { ward: "General Ward (Male)", total: 20, occupied: 17, cleaning: 2, available: 1, turnRate: "85%", avgDays: 4.8 },
  { ward: "General Ward (Female)", total: 15, occupied: 12, cleaning: 1, available: 2, turnRate: "80%", avgDays: 4.2 },
  { ward: "Private Deluxe Rooms", total: 10, occupied: 7, cleaning: 1, available: 2, turnRate: "70%", avgDays: 3.1 },
  { ward: "Pediatric Care Unit", total: 8, occupied: 5, cleaning: 0, available: 3, turnRate: "62%", avgDays: 2.6 },
  { ward: "Post-Op Recovery", total: 6, occupied: 3, cleaning: 1, available: 2, turnRate: "50%", avgDays: 1.2 },
];

export default function BedOccupancyReportsPage() {
  const [data, setData] = useState(BED_METRICS);

  const columns = [
    { key: "ward", header: "Ward Name", render: (r: any) => <span className="font-bold text-[var(--foreground)]">{r.ward}</span> },
    { key: "total", header: "Capacity", render: (r: any) => <span className="font-mono font-medium">{r.total} Beds</span> },
    { key: "occupied", header: "Occupied", render: (r: any) => <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{r.occupied}</span> },
    { key: "cleaning", header: "Housekeeping", render: (r: any) => <span className="font-mono text-amber-500">{r.cleaning}</span> },
    { key: "available", header: "Ready / Free", render: (r: any) => <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{r.available}</span> },
    { key: "turnRate", header: "Occupancy Rate", render: (r: any) => <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">{r.turnRate}</span> },
    { key: "avgDays", header: "Avg Ward Stay", render: (r: any) => <span className="font-mono text-xs">{r.avgDays} Days</span> },
  ];

  return (
    <DashboardShell>
      <PageHeader
        title="Bed Occupancy & Turnover Analytics"
        description="Live bed state matrix, turnover velocity intervals, housekeeping clearance lags, and departmental capacity constraints"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Reports", href: "/reports" },
          { label: "Occupancy Reports" },
        ]}
        actions={
          <button
            onClick={() => {
              exportToCSV(data, "bed-occupancy-report.csv");
              toast.success("Occupancy report exported");
            }}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Export Occupancy Data
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Capacity" value="67 Beds" subtitle="Across 6 specialty units" icon={Bed} />
        <StatCard title="Active Inpatients" value="51 Beds" subtitle="Occupancy: 76.1%" icon={CheckCircle2} />
        <StatCard title="Housekeeping Underway" value="6 Beds" subtitle="Turnaround avg: 34 mins" icon={Clock} />
        <StatCard title="Available for Admission" value="10 Beds" subtitle="Immediate allocation ready" icon={CheckCircle2} />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">Departmental Ward Utilization Ledger</h3>
        <DataTable columns={columns} data={data} searchKey="ward" searchPlaceholder="Search by ward name..." />
      </div>
    </DashboardShell>
  );
}

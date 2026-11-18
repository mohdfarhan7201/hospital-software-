"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { StatCard } from "@/components/common/StatCard";
import { exportToCSV, formatDate } from "@/lib/utils";
import { toast } from "sonner";
import { Calendar, Clock, CheckCircle2, AlertCircle, Download } from "lucide-react";

const DISCHARGE_RECORDS = [
  { id: "1", ipdNo: "IPD-2026-0798", patient: "Manoj Bajpayee", doctor: "Dr. Arvind Swamy", admitDate: "2026-10-08", dischargeDate: "2026-10-14", los: 6, type: "Routine Planned", tpaStatus: "Approved", timeToClear: "2.5 hrs" },
  { id: "2", ipdNo: "IPD-2026-0801", patient: "Kiran Mazumdar", doctor: "Dr. Sneha Roy", admitDate: "2026-10-10", dischargeDate: "2026-10-14", los: 4, type: "Routine Planned", tpaStatus: "Self-Pay", timeToClear: "45 mins" },
  { id: "3", ipdNo: "IPD-2026-0805", patient: "Deepak Chaurasia", doctor: "Dr. Vikram Seth", admitDate: "2026-10-09", dischargeDate: "2026-10-15", los: 6, type: "Routine Planned", tpaStatus: "Approved", timeToClear: "3.2 hrs" },
  { id: "4", ipdNo: "IPD-2026-0810", patient: "Shabana Azmi", doctor: "Dr. Meenakshi Sundaram", admitDate: "2026-10-12", dischargeDate: "2026-10-15", los: 3, type: "Routine Planned", tpaStatus: "Approved", timeToClear: "1.8 hrs" },
  { id: "5", ipdNo: "IPD-2026-0811", patient: "Tanmay Bhat", doctor: "Dr. Farhan Qureshi", admitDate: "2026-10-14", dischargeDate: "2026-10-15", los: 1, type: "LAMA (Left Against Medical Advice)", tpaStatus: "Pending", timeToClear: "1.0 hr" },
];

export default function DischargeReportsPage() {
  const [data, setData] = useState(DISCHARGE_RECORDS);

  const columns = [
    { key: "ipdNo", header: "IPD No", render: (r: any) => <span className="font-mono font-bold text-[var(--primary)]">{r.ipdNo}</span> },
    { key: "patient", header: "Patient Name", render: (r: any) => <span className="font-semibold text-[var(--foreground)]">{r.patient}</span> },
    { key: "doctor", header: "Discharging Physician" },
    { key: "los", header: "Length of Stay", render: (r: any) => <span className="font-mono font-medium">{r.los} Days</span> },
    { 
      key: "type", 
      header: "Discharge Category",
      render: (r: any) => (
        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
          r.type.includes("LAMA") ? "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-400" :
          "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
        }`}>
          {r.type}
        </span>
      )
    },
    { key: "timeToClear", header: "Billing Clearance Lag", render: (r: any) => <span className="font-mono text-xs">{r.timeToClear}</span> },
    { key: "dischargeDate", header: "Discharge Date", render: (r: any) => formatDate(r.dischargeDate) },
  ];

  return (
    <DashboardShell>
      <PageHeader
        title="Discharge & Length of Stay (LOS) Audit"
        description="Comprehensive analysis of inpatient discharge turnaround, clearance lags, planned vs emergency discharges, and 30-day readmissions"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Reports", href: "/reports" },
          { label: "Discharge Reports" },
        ]}
        actions={
          <button
            onClick={() => {
              exportToCSV(data, "discharge-audit-report.csv");
              toast.success("Discharge audit report downloaded");
            }}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Export Discharge Audit
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Discharges" value="142" subtitle="This month" icon={Calendar} />
        <StatCard title="Average Length of Stay" value="4.2 Days" subtitle="Benchmarked for tertiary care" icon={Clock} />
        <StatCard title="Discharge Cycle Time" value="2.1 Hours" subtitle="Doctor order to gate pass" icon={CheckCircle2} />
        <StatCard title="Readmission (30-day)" value="1.8%" subtitle="Benchmark target: < 3.0%" icon={AlertCircle} />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">Discharged Inpatients Ledger</h3>
        <DataTable columns={columns} data={data} searchKey="patient" searchPlaceholder="Search patient or IPD no..." />
      </div>
    </DashboardShell>
  );
}

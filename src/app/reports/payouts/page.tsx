"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { StatCard } from "@/components/common/StatCard";
import { exportToCSV, formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { DollarSign, UserCheck, Calendar, CheckCircle2, Download, Clock } from "lucide-react";

const DOCTOR_PAYOUT_AUDIT = [
  { id: "1", doctor: "Dr. Arvind Swamy", dept: "Cardiology", opdShare: 85200, ipdShare: 145000, surgeryShare: 180000, totalEarnings: 410200, tdsDeducted: 41020, netPayable: 369180, status: "Settled" },
  { id: "2", doctor: "Dr. Sneha Roy", dept: "Pediatrics", opdShare: 98000, ipdShare: 42000, surgeryShare: 0, totalEarnings: 140000, tdsDeducted: 14000, netPayable: 126000, status: "Settled" },
  { id: "3", doctor: "Dr. Meenakshi Sundaram", dept: "Obstetrics & Gynecology", opdShare: 82500, ipdShare: 96000, surgeryShare: 110000, totalEarnings: 288500, tdsDeducted: 28850, netPayable: 259650, status: "Pending Review" },
  { id: "4", doctor: "Dr. Vikram Seth", dept: "Orthopedics", opdShare: 71500, ipdShare: 120000, surgeryShare: 210000, totalEarnings: 401500, tdsDeducted: 40150, netPayable: 361350, status: "Settled" },
  { id: "5", doctor: "Dr. Farhan Qureshi", dept: "General Medicine", opdShare: 96000, ipdShare: 35000, surgeryShare: 0, totalEarnings: 131000, tdsDeducted: 13100, netPayable: 117900, status: "Pending Review" },
];

export default function DoctorPayoutReportsPage() {
  const [data, setData] = useState(DOCTOR_PAYOUT_AUDIT);

  const columns = [
    { key: "doctor", header: "Consultant Doctor", render: (r: any) => <span className="font-bold text-[var(--foreground)]">{r.doctor}</span> },
    { key: "dept", header: "Department" },
    { key: "opdShare", header: "OPD Consult Share", render: (r: any) => <span className="font-mono">{formatCurrency(r.opdShare)}</span> },
    { key: "ipdShare", header: "IPD Visit Share", render: (r: any) => <span className="font-mono">{formatCurrency(r.ipdShare)}</span> },
    { key: "surgeryShare", header: "Surgeon Share", render: (r: any) => <span className="font-mono">{formatCurrency(r.surgeryShare)}</span> },
    { key: "tdsDeducted", header: "TDS (10% u/s 194J)", render: (r: any) => <span className="font-mono text-xs text-rose-500">-{formatCurrency(r.tdsDeducted)}</span> },
    { key: "netPayable", header: "Net Payout", render: (r: any) => <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(r.netPayable)}</span> },
    { 
      key: "status", 
      header: "Status",
      render: (r: any) => (
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
          r.status === "Settled" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400" :
          "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400"
        }`}>
          {r.status}
        </span>
      )
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        title="Doctor Payouts & Commission Audit"
        description="Physician revenue-sharing reconciliation across OPD consultations, inpatient rounds, surgical procedures, and statutory 194J TDS deductions"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Reports", href: "/reports" },
          { label: "Doctor Payouts" },
        ]}
        actions={
          <button
            onClick={() => {
              exportToCSV(data, "doctor-payout-schedule.csv");
              toast.success("Doctor payout ledger exported");
            }}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Export Payout Ledger
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <StatCard title="Gross Physician Earnings" value="₹13,71,200" subtitle="This fiscal cycle" icon={DollarSign} />
        <StatCard title="TDS Deducted (194J)" value="₹1,37,120" subtitle="Deposited with IT Department" icon={Calendar} />
        <StatCard title="Disbursed Payouts" value="₹8,56,530" subtitle="Transferred via NEFT" icon={CheckCircle2} />
        <StatCard title="Pending Approvals" value="₹3,77,550" subtitle="Under final CFO sign-off" icon={Clock} />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">Consultant Physician Payout Ledger</h3>
        <DataTable columns={columns} data={data} searchKey="doctor" searchPlaceholder="Search consultant doctor..." />
      </div>
    </DashboardShell>
  );
}

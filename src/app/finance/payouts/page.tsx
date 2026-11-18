"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { mockDoctors } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";
import { IndianRupee, CheckCircle2, FileText, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface DoctorPayout {
  id: string;
  doctorName: string;
  department: string;
  opdShare: number;
  surgeryShare: number;
  grossPayable: number;
  tdsDeduction: number;
  netDisbursable: number;
  status: "Disbursed" | "Pending Approval";
}

const initialPayouts: DoctorPayout[] = [
  {
    id: "dp-1",
    doctorName: "Dr. Arvind Subramaniam",
    department: "Cardiology",
    opdShare: 84000,
    surgeryShare: 240000,
    grossPayable: 324000,
    tdsDeduction: 32400,
    netDisbursable: 291600,
    status: "Pending Approval",
  },
  {
    id: "dp-2",
    doctorName: "Dr. Sandeep Chawla",
    department: "Orthopaedics",
    opdShare: 62000,
    surgeryShare: 195000,
    grossPayable: 257000,
    tdsDeduction: 25700,
    netDisbursable: 231300,
    status: "Pending Approval",
  },
  {
    id: "dp-3",
    doctorName: "Dr. Radhika Kulkarni",
    department: "Neurology",
    opdShare: 72000,
    surgeryShare: 80000,
    grossPayable: 152000,
    tdsDeduction: 15200,
    netDisbursable: 136800,
    status: "Disbursed",
  },
];

export default function DoctorPayoutsPage() {
  const [payouts, setPayouts] = useState<DoctorPayout[]>(initialPayouts);

  const handleDisburse = (id: string, name: string) => {
    setPayouts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Disbursed" } : p))
    );
    toast.success(`Professional fee payout voucher authorized for ${name}. Form 16A drafted.`);
  };

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Finance", href: "/billing" },
          { label: "Doctor Payouts" },
        ]}
        title="Consultant Professional Fee Payouts & Commission Shares"
        description="Monthly physician fee reconciliation, surgery professional share, OPD consultation split, and TDS deduction calculation."
      />

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4 text-xs">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {payouts.map((p) => (
            <div
              key={p.id}
              className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {p.doctorName}
                  </h3>
                  <span className="text-slate-400">({p.department})</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.status === "Disbursed"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                        : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-slate-500 mt-1 font-mono">
                  <span>OPD Share: {formatCurrency(p.opdShare)}</span>
                  <span>•</span>
                  <span>Surgery Share: {formatCurrency(p.surgeryShare)}</span>
                  <span>•</span>
                  <span>TDS (10% u/s 194J): -{formatCurrency(p.tdsDeduction)}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end lg:self-center font-mono">
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase font-sans">Net Disbursable</p>
                  <p className="text-base font-bold text-emerald-600">
                    {formatCurrency(p.netDisbursable)}
                  </p>
                </div>
                {p.status === "Pending Approval" ? (
                  <button
                    onClick={() => handleDisburse(p.id, p.doctorName)}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold font-sans text-xs"
                  >
                    Approve & Disburse
                  </button>
                ) : (
                  <span className="text-emerald-600 font-bold font-sans text-xs flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Paid via Bank RTGS
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}

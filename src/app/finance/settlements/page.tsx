"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatCurrency } from "@/lib/utils";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface SettlementBatch {
  id: string;
  batchNumber: string;
  tpaName: string;
  claimsCount: number;
  totalClaimed: number;
  settledAmount: number;
  deductionAmount: number;
  settlementDate: string;
  status: "Settled" | "Under Reconciliation" | "Query Responded";
}

const mockBatches: SettlementBatch[] = [
  {
    id: "set-1",
    batchNumber: "SET-TPA-2026-89",
    tpaName: "MediAssist TPA Pvt Ltd",
    claimsCount: 18,
    totalClaimed: 840000,
    settledAmount: 765000,
    deductionAmount: 75000,
    settlementDate: "15 Nov 2026",
    status: "Settled",
  },
  {
    id: "set-2",
    batchNumber: "SET-TPA-2026-90",
    tpaName: "Family Health Plan Insurance TPA (FHPL)",
    claimsCount: 12,
    totalClaimed: 520000,
    settledAmount: 480000,
    deductionAmount: 40000,
    settlementDate: "16 Nov 2026",
    status: "Under Reconciliation",
  },
];

export default function BulkSettlementPage() {
  const handleReconcile = (id: string) => {
    toast.success("TPA settlement batch reconciled with hospital bank statement.");
  };

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Finance", href: "/billing" },
          { label: "Bulk Settlements" },
        ]}
        title="Insurance TPA Bulk Claim Settlements & Reconciliation"
        description="Reconcile bulk bank credit transfers from TPAs against patient inpatient claims and record TDS/co-pay deductions."
      />

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4 text-xs">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {mockBatches.map((b) => (
            <div
              key={b.id}
              className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-blue-600">{b.batchNumber}</span>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {b.tpaName}
                  </h3>
                  <StatusBadge status={b.status} />
                </div>
                <p className="text-slate-500 mt-1">
                  Settlement Date: {b.settlementDate} • Total Claims: {b.claimsCount} Inpatient Files
                </p>
              </div>

              <div className="flex items-center gap-6 self-end md:self-center font-mono">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-sans">Claimed</p>
                  <p className="font-bold text-slate-700 dark:text-slate-300">
                    {formatCurrency(b.totalClaimed)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-sans">Deduction</p>
                  <p className="font-bold text-rose-600">
                    {formatCurrency(b.deductionAmount)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-sans">Credited</p>
                  <p className="font-bold text-emerald-600">
                    {formatCurrency(b.settledAmount)}
                  </p>
                </div>
                {b.status === "Under Reconciliation" && (
                  <button
                    onClick={() => handleReconcile(b.id)}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold font-sans text-xs"
                  >
                    Reconcile
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}

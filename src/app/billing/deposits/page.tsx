"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatCurrency } from "@/lib/utils";
import { Plus, Wallet, Printer } from "lucide-react";
import { toast } from "sonner";

interface DepositEntry {
  id: string;
  uhid: string;
  patientName: string;
  depositDate: string;
  amount: number;
  mode: string;
  balanceRemaining: number;
  remarks: string;
}

const mockDeposits: DepositEntry[] = [
  {
    id: "dep-1",
    uhid: "NU-2026-401928",
    patientName: "Rajesh V. Sharma",
    depositDate: "15 Nov 2026",
    amount: 50000,
    mode: "UPI",
    balanceRemaining: 18000,
    remarks: "Admission initial deposit for CCU monitoring",
  },
  {
    id: "dep-2",
    uhid: "NU-2026-512093",
    patientName: "Ananya S. Sen",
    depositDate: "16 Nov 2026",
    amount: 40000,
    mode: "Credit Card",
    balanceRemaining: 15000,
    remarks: "Maternity suite admission security deposit",
  },
];

export default function DepositsManagementPage() {
  const [deposits, setDeposits] = useState<DepositEntry[]>(mockDeposits);

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Billing", href: "/billing" },
          { label: "Deposits" },
        ]}
        title="Patient Advance Deposits & IPD Running Ledger"
        description="Track inpatient admission security deposits, running bill consumption, and real-time ledger balances."
      />

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4 text-xs">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {deposits.map((dep) => (
            <div
              key={dep.id}
              className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {dep.patientName}
                  </h3>
                  <span className="font-mono text-slate-400">({dep.uhid})</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    Mode: {dep.mode}
                  </span>
                </div>
                <p className="text-slate-500 mt-1">
                  Deposited On: {dep.depositDate} • {dep.remarks}
                </p>
              </div>

              <div className="flex items-center gap-6 self-end md:self-center font-mono">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-sans">Total Deposited</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    {formatCurrency(dep.amount)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-sans">Remaining Balance</p>
                  <p className="font-bold text-emerald-600">
                    {formatCurrency(dep.balanceRemaining)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}

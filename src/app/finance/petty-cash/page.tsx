"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { formatCurrency } from "@/lib/utils";
import { Plus, Wallet, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

interface PettyCashEntry {
  id: string;
  voucherNo: string;
  date: string;
  type: "Debit (Expense)" | "Credit (Top-up)";
  description: string;
  amount: number;
  balance: number;
  handedTo: string;
}

const mockPettyCash: PettyCashEntry[] = [
  {
    id: "pc-1",
    voucherNo: "PCV-2026-101",
    date: "16 Nov 2026",
    type: "Debit (Expense)",
    description: "Emergency local medicine purchase (Rare antidote ampoules)",
    amount: 3200,
    balance: 16800,
    handedTo: "Chief Pharmacist",
  },
  {
    id: "pc-2",
    voucherNo: "PCV-2026-102",
    date: "15 Nov 2026",
    type: "Debit (Expense)",
    description: "OPD Reception patient drinking water cans & paper cups refill",
    amount: 1450,
    balance: 20000,
    handedTo: "Housekeeping Supervisor",
  },
  {
    id: "pc-3",
    voucherNo: "PCV-2026-100",
    date: "14 Nov 2026",
    type: "Credit (Top-up)",
    description: "Imprest fund monthly replenishment from Main Bank Account",
    amount: 25000,
    balance: 21450,
    handedTo: "Accounts Cashier",
  },
];

export default function PettyCashPage() {
  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Finance", href: "/billing" },
          { label: "Petty Cash" },
        ]}
        title="Hospital Petty Cash & Imprest Book"
        description="Daily minor operational cash outflows, emergency local supplies, tea/refreshments, and voucher records."
      >
        <button
          onClick={() => toast.info("New petty cash voucher form opened.")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white"
        >
          <Plus className="w-4 h-4" /> Issue Petty Cash Voucher
        </button>
      </PageHeader>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs text-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Current Imprest Balance</span>
            <p className="text-2xl font-bold font-mono text-emerald-600 mt-0.5">₹16,800</p>
          </div>
          <span className="text-slate-400 text-xs">Safe Limit: ₹25,000</span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {mockPettyCash.map((item) => (
            <div key={item.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-blue-600">{item.voucherNo}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.type.includes("Credit")
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                        : "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                    }`}
                  >
                    {item.type}
                  </span>
                  <span className="text-slate-400">{item.date}</span>
                </div>
                <p className="font-medium text-slate-800 dark:text-slate-200 mt-1">{item.description}</p>
                <p className="text-slate-500 mt-0.5">Authorized to: {item.handedTo}</p>
              </div>

              <div className="text-right font-mono">
                <span
                  className={`text-sm font-bold ${
                    item.type.includes("Credit") ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {item.type.includes("Credit") ? "+" : "-"}
                  {formatCurrency(item.amount)}
                </span>
                <p className="text-[10px] text-slate-400 font-sans">
                  Balance: {formatCurrency(item.balance)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}

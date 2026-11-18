"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { formatCurrency } from "@/lib/utils";
import { IndianRupee, Clock, CheckCircle2, ShieldCheck, Printer, Save } from "lucide-react";
import { toast } from "sonner";

export default function AccountsClosingPage() {
  const [cashInHand, setCashInHand] = useState("18500");
  const [closed, setClosed] = useState(false);

  const collections = [
    { mode: "Cash Counter Collections", expected: 18500, count: 24 },
    { mode: "UPI (PhonePe / GPay QR)", expected: 94200, count: 48 },
    { mode: "Credit / Debit Card (EDC POS)", expected: 142500, count: 18 },
    { mode: "NEFT / Direct Bank Transfers", expected: 65000, count: 4 },
  ];

  const totalExpected = collections.reduce((a, b) => a + b.expected, 0);

  const handleCloseShift = (e: React.FormEvent) => {
    e.preventDefault();
    setClosed(true);
    toast.success("Morning shift accounts closed and cash handover voucher generated!");
  };

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Finance", href: "/billing" },
          { label: "Shift Accounts Closing" },
        ]}
        title="Daily Shift Cashier Accounts Closing & Handover"
        description="Reconciliation of physical counter cash, POS EDC batch settlement, UPI transactions, and shift handover."
      >
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
        >
          <Printer className="w-3.5 h-3.5" /> Print Shift Audit Sheet
        </button>
      </PageHeader>

      <div className="max-w-3xl mx-auto space-y-6 text-xs">
        {/* Active Shift Details Banner */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Current Cashier Shift</span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              Morning Shift A (08:00 AM - 04:00 PM)
            </h3>
            <p className="text-slate-500">
              Cashier: <strong>Ramesh P. Kulkarni</strong> • Terminal: Counter #02 (Main Lobby)
            </p>
          </div>
          <div className="text-right">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              Shift Active
            </span>
          </div>
        </div>

        {/* Collections Breakdown Table */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
            System Expected Collections Audit
          </h3>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
            {collections.map((c) => (
              <div key={c.mode} className="py-2.5 flex justify-between items-center">
                <div>
                  <span className="font-sans font-semibold text-slate-800 dark:text-slate-200">
                    {c.mode}
                  </span>
                  <span className="font-sans text-[11px] text-slate-400 ml-2">
                    ({c.count} transactions)
                  </span>
                </div>
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  {formatCurrency(c.expected)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center font-bold text-sm">
            <span>Total Shift Gross Inflow:</span>
            <span className="font-mono text-emerald-600 text-base">
              {formatCurrency(totalExpected)}
            </span>
          </div>
        </div>

        {/* Physical Handover Form */}
        <form
          onSubmit={handleCloseShift}
          className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4"
        >
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
            Physical Cash Verification & Handover Sign-Off
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Physical Cash Counted in Safe (₹)</label>
              <input
                type="number"
                value={cashInHand}
                onChange={(e) => setCashInHand(e.target.value)}
                className="w-full p-2.5 rounded-lg border font-mono font-bold bg-slate-50 dark:bg-slate-800 text-sm"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Handover Supervisor</label>
              <input
                type="text"
                disabled
                defaultValue="Chief Financial Controller (CFO Office)"
                className="w-full p-2.5 rounded-lg border bg-slate-100 dark:bg-slate-800/50 text-slate-500 font-medium"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={closed}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 shadow-xs disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              {closed ? "Shift Accounts Closed & Reconciled" : "Reconcile & Close Cashier Shift"}
            </button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}

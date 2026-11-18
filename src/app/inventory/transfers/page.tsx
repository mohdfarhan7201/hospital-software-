"use client";

import React from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ArrowLeftRight, CheckCircle2, Plus } from "lucide-react";
import { toast } from "sonner";

export default function StockTransfersPage() {
  const transfers = [
    {
      id: "tr-1",
      transferNo: "TRF-2026-092",
      fromStore: "Main Central Drug Warehouse (Ground Floor)",
      toStore: "OT Emergency Pharmacy Sub-store",
      item: "Propofol 1% Injection (20ml)",
      quantity: 50,
      date: "16 Nov 2026",
      status: "Completed",
    },
    {
      id: "tr-2",
      transferNo: "TRF-2026-093",
      fromStore: "Main Central Drug Warehouse",
      toStore: "Coronary Care Unit (CCU) Emergency Crash Cart",
      item: "Amiodarone 150mg Ampoules",
      quantity: 20,
      date: "17 Nov 2026",
      status: "In Transit",
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Inventory", href: "/inventory/stock" },
          { label: "Department Transfers" },
        ]}
        title="Inter-Department Stock & Pharmacy Transfers"
        description="Transfer bulk medication packs, crash cart replenishments, and sub-store inventory."
      >
        <button
          onClick={() => toast.info("New stock transfer voucher form opened.")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white"
        >
          <Plus className="w-4 h-4" /> New Stock Transfer
        </button>
      </PageHeader>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4 text-xs">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {transfers.map((t) => (
            <div
              key={t.id}
              className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-blue-600">{t.transferNo}</span>
                  <StatusBadge status={t.status} />
                  <span className="text-slate-400">{t.date}</span>
                </div>
                <p className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-1">
                  {t.item} ({t.quantity} Units)
                </p>
                <div className="flex items-center gap-2 text-slate-500 mt-1">
                  <span>From: {t.fromStore}</span>
                  <ArrowLeftRight className="w-3.5 h-3.5 text-blue-500" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    To: {t.toStore}
                  </span>
                </div>
              </div>

              <div className="self-end md:self-center">
                <button
                  onClick={() => toast.success("Transfer delivery challan printed.")}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 font-semibold"
                >
                  Print Gate Pass
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}

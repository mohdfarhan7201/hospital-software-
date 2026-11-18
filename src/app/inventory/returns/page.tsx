"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { RotateCcw, Plus, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface IndentReturn {
  id: string;
  returnNo: string;
  fromWard: string;
  medicine: string;
  batch: string;
  quantity: number;
  reason: string;
  status: "Restocked into Pharmacy" | "Awaiting Inspection";
}

const mockReturns: IndentReturn[] = [
  {
    id: "ret-1",
    returnNo: "RET-2026-019",
    fromWard: "Male Medical Ward (Floor 2)",
    medicine: "Augmentin 625 Duo Tablets",
    batch: "BN-2026-891",
    quantity: 14,
    reason: "Patient discharged before consuming full course",
    status: "Restocked into Pharmacy",
  },
  {
    id: "ret-2",
    returnNo: "RET-2026-020",
    fromWard: "OT Suite 01",
    medicine: "Ceftriaxone 1g Injection",
    batch: "BN-2026-402",
    quantity: 6,
    reason: "Unopened unused surgical vial return",
    status: "Awaiting Inspection",
  },
];

export default function IndentReturnsPage() {
  const [returns, setReturns] = useState<IndentReturn[]>(mockReturns);

  const handleInspectAndRestock = (id: string) => {
    setReturns((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Restocked into Pharmacy" } : r))
    );
    toast.success("Vials quality-verified and safely restocked into pharmacy shelf inventory.");
  };

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Inventory", href: "/inventory/stock" },
          { label: "Indent Returns" },
        ]}
        title="Ward Medication Returns & Re-Stocking Audit"
        description="Verify unopened medication returns from discharged inpatients and restock into usable pharmacy lots."
      />

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4 text-xs">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {returns.map((r) => (
            <div
              key={r.id}
              className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-blue-600">{r.returnNo}</span>
                  <StatusBadge status={r.status} />
                  <span className="text-slate-400">From: {r.fromWard}</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-1">
                  {r.medicine} ({r.quantity} Units)
                </h3>
                <p className="text-slate-500 font-mono mt-0.5">
                  Batch: {r.batch} • Reason: {r.reason}
                </p>
              </div>

              <div className="self-end md:self-center">
                {r.status === "Awaiting Inspection" ? (
                  <button
                    onClick={() => handleInspectAndRestock(r.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1.5 shadow-2xs"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Verify & Re-Stock
                  </button>
                ) : (
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Restocked
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

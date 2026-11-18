"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Pill, Plus, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface WardIndent {
  id: string;
  indentNumber: string;
  department: string;
  requestedBy: string;
  date: string;
  itemsList: string;
  urgency: "Emergency STAT" | "Routine Ward Refill";
  status: "Dispensed & Dispatched" | "Pending Pharmacy Issue";
}

const mockIndents: WardIndent[] = [
  {
    id: "ind-1",
    indentNumber: "IND-CCU-2026-081",
    department: "Coronary ICU (CCU)",
    requestedBy: "Sr. Marykutty Thomas",
    date: "17 Nov 2026 09:15 AM",
    itemsList: "Noradrenaline Infusion (10 Vials), Heparin 25000 IU (4 Vials), IV Pantoprazole (20 Vials)",
    urgency: "Emergency STAT",
    status: "Pending Pharmacy Issue",
  },
  {
    id: "ind-2",
    indentNumber: "IND-OT-2026-042",
    department: "Operation Theatre Suite 02",
    requestedBy: "OT In-Charge Sister",
    date: "17 Nov 2026 08:30 AM",
    itemsList: "Propofol 1% 20ml (12 Ampoules), Atracurium (15 Ampoules), Normal Saline 500ml (24 Bottles)",
    urgency: "Routine Ward Refill",
    status: "Dispensed & Dispatched",
  },
];

export default function DepartmentIndentsPage() {
  const [indents, setIndents] = useState<WardIndent[]>(mockIndents);

  const handleDispense = (id: string, num: string) => {
    setIndents((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: "Dispensed & Dispatched" } : i))
    );
    toast.success(`Indent ${num} verified and dispatched to ward!`);
  };

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Inventory", href: "/inventory/stock" },
          { label: "Department Indents" },
        ]}
        title="Inpatient Ward & OT Medication Indents"
        description="Review clinical department drug requisition indents, batch verification, and central pharmacy issue."
      />

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4 text-xs">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {indents.map((item) => (
            <div
              key={item.id}
              className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-blue-600">{item.indentNumber}</span>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {item.department}
                  </h3>
                  <StatusBadge status={item.status} />
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.urgency.includes("STAT")
                        ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400 animate-pulse"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {item.urgency}
                  </span>
                </div>
                <p className="text-slate-500 mt-1">
                  Raised By: <strong>{item.requestedBy}</strong> • Time: {item.date}
                </p>
                <p className="text-slate-700 dark:text-slate-300 mt-1 font-mono bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                  {item.itemsList}
                </p>
              </div>

              <div className="self-end md:self-center">
                {item.status === "Pending Pharmacy Issue" ? (
                  <button
                    onClick={() => handleDispense(item.id, item.indentNumber)}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1.5 shadow-2xs"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Issue & Dispatch Drugs
                  </button>
                ) : (
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Stock Transferred
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

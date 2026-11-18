"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockMedicines } from "@/data/mockData";
import { Medicine } from "@/types";
import { AlertTriangle, Clock, ShieldAlert, ArrowRight, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function ExpiryTrackingPage() {
  const [filterWindow, setFilterWindow] = useState<"all" | "30" | "60" | "90">("all");

  const expiringList = [
    {
      name: "Ceftum 500 (Cefuroxime Axetil)",
      batch: "BN-2025-099",
      sku: "MED-CEF-500",
      expiryDate: "2026-12-15",
      daysLeft: 28,
      stockQty: 40,
      manufacturer: "GlaxoSmithKline",
      status: "Expiring in < 30 Days",
    },
    {
      name: "Pantocid 40 IV Injection",
      batch: "BN-2026-302",
      sku: "MED-PAN-040-INJ",
      expiryDate: "2026-12-31",
      daysLeft: 44,
      stockQty: 45,
      manufacturer: "Sun Pharma",
      status: "Expiring in < 60 Days",
    },
    {
      name: "Augmentin 625 Duo",
      batch: "BN-2026-891",
      sku: "MED-AUG-625",
      expiryDate: "2027-02-28",
      daysLeft: 102,
      stockQty: 480,
      manufacturer: "GSK",
      status: "Optimal Validity",
    },
  ];

  const handleQuarantine = (batch: string) => {
    toast.success(`Batch ${batch} transferred to Quarantine Destruction / Supplier Return lot.`);
  };

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Inventory", href: "/inventory/stock" },
          { label: "Expiry Tracking" },
        ]}
        title="Drug Expiry Tracking & Quarantine Protocol"
        description="Monitor near-expiry medications, automated 30/60/90 days early warning alerts, and supplier return debit notes."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-rose-50/60 dark:bg-rose-950/30 p-5 rounded-xl border border-rose-200 dark:border-rose-900 shadow-xs flex items-center justify-between text-xs">
          <div>
            <p className="font-bold text-rose-700 dark:text-rose-400 uppercase">Expiring in &lt; 30 Days</p>
            <p className="text-2xl font-bold font-mono text-rose-600 mt-1">1 Batch</p>
            <p className="text-slate-500 mt-0.5">40 Vials / Tablets</p>
          </div>
          <AlertTriangle className="w-8 h-8 text-rose-500 opacity-60" />
        </div>

        <div className="bg-amber-50/60 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200 dark:border-amber-900 shadow-xs flex items-center justify-between text-xs">
          <div>
            <p className="font-bold text-amber-700 dark:text-amber-400 uppercase">Expiring in &lt; 60 Days</p>
            <p className="text-2xl font-bold font-mono text-amber-600 mt-1">1 Batch</p>
            <p className="text-slate-500 mt-0.5">45 Ampoules</p>
          </div>
          <Clock className="w-8 h-8 text-amber-500 opacity-60" />
        </div>

        <div className="bg-emerald-50/60 dark:bg-emerald-950/30 p-5 rounded-xl border border-emerald-200 dark:border-emerald-900 shadow-xs flex items-center justify-between text-xs">
          <div>
            <p className="font-bold text-emerald-700 dark:text-emerald-400 uppercase">Safe Shelf Validity</p>
            <p className="text-2xl font-bold font-mono text-emerald-600 mt-1">98.4%</p>
            <p className="text-slate-500 mt-0.5">FEFO Protocol Compliant</p>
          </div>
          <ShieldAlert className="w-8 h-8 text-emerald-500 opacity-60" />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4 text-xs">
        <h2 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" />
          Active Batches Nearing Expiry
        </h2>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {expiringList.map((item) => (
            <div
              key={item.batch}
              className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">{item.name}</h3>
                  <span className="font-mono text-slate-400">Batch: {item.batch}</span>
                  <StatusBadge status={item.status} />
                </div>
                <p className="text-slate-500 mt-1">
                  Manufacturer: {item.manufacturer} • Stock:{" "}
                  <strong>{item.stockQty} Units Remaining</strong>
                </p>
                <p className="text-rose-600 dark:text-rose-400 font-mono font-bold mt-0.5">
                  Expires On: {item.expiryDate} ({item.daysLeft} days remaining)
                </p>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                <button
                  onClick={() => handleQuarantine(item.batch)}
                  className="px-3 py-1.5 rounded-lg border border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-semibold hover:bg-rose-100"
                >
                  Return to Supplier / Debit Note
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockMedicines } from "@/data/mockData";
import { Pill, AlertTriangle, ShoppingCart, Truck, Plus, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function PharmacyDashboardPage() {
  const lowStock = mockMedicines.filter((m) => m.stockStatus === "Low Stock" || m.stockStatus === "Out of Stock");

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Pharmacy & Inventory" },
        ]}
        title="Hospital Central Pharmacy & Drug Store Command"
        description="Prescription dispensing POS, cold-chain medication storage, expiry alerts, and automated purchase indents."
      >
        <Link
          href="/pharmacy/sales"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white shadow-xs"
        >
          <ShoppingCart className="w-4 h-4" /> Pharmacy Dispense POS
        </Link>
        <Link
          href="/pharmacy/medicines"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
        >
          <Pill className="w-3.5 h-3.5 text-emerald-600" /> Drug Directory
        </Link>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Daily Medicine Sales"
          value="₹3,42,800"
          subtext="OPD Dispense & IPD Charts"
          change="+11.4%"
          isPositive={true}
          icon={ShoppingCart}
          iconColor="emerald"
        />
        <StatCard
          title="Active Formulations"
          value="1,420 SKUs"
          subtext="Antibiotics, Cardiac, Critical"
          change="Optimal"
          isPositive={true}
          icon={Pill}
          iconColor="blue"
        />
        <StatCard
          title="Low Stock Critical Alerts"
          value={`${lowStock.length} Items`}
          subtext="Below buffer safety threshold"
          change="Reorder Needed"
          isPositive={false}
          icon={AlertTriangle}
          iconColor="rose"
        />
        <StatCard
          title="Purchase Orders Inward"
          value="4 Shipments"
          subtext="GRN verification pending"
          change="Arrived Today"
          isPositive={true}
          icon={Truck}
          iconColor="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alerts */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              Critical Low Stock / Out of Stock Formulations
            </h2>
            <Link
              href="/inventory/stock"
              className="text-xs text-blue-600 font-semibold hover:underline"
            >
              Inventory Matrix
            </Link>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {lowStock.map((m) => (
              <div key={m.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 dark:text-slate-100">{m.name}</p>
                  <p className="text-[11px] text-slate-500">{m.genericName}</p>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Batch: {m.batchNumber} • Exp: {m.expiryDate}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-rose-600 text-sm">
                    {m.stockQty} Units Left
                  </p>
                  <StatusBadge status={m.stockStatus} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Dispense Shortcuts */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3">
              Pharmacy Operations Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <Link
                href="/pharmacy/sales"
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 bg-slate-50 dark:bg-slate-800/40 hover:bg-blue-50/50 transition-all flex flex-col gap-1"
              >
                <ShoppingCart className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  New Patient Sale
                </span>
                <span className="text-[11px] text-slate-400">Barcode scan & dispense</span>
              </Link>

              <Link
                href="/inventory/expiry"
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-500 bg-slate-50 dark:bg-slate-800/40 hover:bg-amber-50/50 transition-all flex flex-col gap-1"
              >
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Expiry Tracker
                </span>
                <span className="text-[11px] text-slate-400">Next 30/60/90 days</span>
              </Link>

              <Link
                href="/inventory/indents"
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 bg-slate-50 dark:bg-slate-800/40 hover:bg-emerald-50/50 transition-all flex flex-col gap-1"
              >
                <Pill className="w-5 h-5 text-emerald-600" />
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Ward Drug Indents
                </span>
                <span className="text-[11px] text-slate-400">CCU / ICU stock issue</span>
              </Link>

              <Link
                href="/pharmacy/purchases"
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 bg-slate-50 dark:bg-slate-800/40 hover:bg-purple-50/50 transition-all flex flex-col gap-1"
              >
                <Truck className="w-5 h-5 text-purple-600" />
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Purchase Orders
                </span>
                <span className="text-[11px] text-slate-400">Supplier GRN receipt</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

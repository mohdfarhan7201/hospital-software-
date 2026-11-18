"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Droplet, Heart, Users, CheckCircle, Plus, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface BloodGroupStock {
  group: string;
  prbcUnits: number;
  ffpUnits: number;
  plateletUnits: number;
  status: "Normal" | "Low Stock" | "Critical Shortage";
}

const bloodStockData: BloodGroupStock[] = [
  { group: "A+", prbcUnits: 28, ffpUnits: 14, plateletUnits: 8, status: "Normal" },
  { group: "A-", prbcUnits: 6, ffpUnits: 4, plateletUnits: 2, status: "Low Stock" },
  { group: "B+", prbcUnits: 34, ffpUnits: 18, plateletUnits: 12, status: "Normal" },
  { group: "B-", prbcUnits: 5, ffpUnits: 3, plateletUnits: 2, status: "Low Stock" },
  { group: "O+", prbcUnits: 42, ffpUnits: 20, plateletUnits: 15, status: "Normal" },
  { group: "O-", prbcUnits: 3, ffpUnits: 2, plateletUnits: 1, status: "Critical Shortage" },
  { group: "AB+", prbcUnits: 16, ffpUnits: 10, plateletUnits: 6, status: "Normal" },
  { group: "AB-", prbcUnits: 4, ffpUnits: 2, plateletUnits: 1, status: "Low Stock" },
];

export default function BloodBankDashboardPage() {
  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Blood Bank" },
        ]}
        title="Hospital Licensed Blood Centre & Transfusion Medicine"
        description="Apheresis platelet donor registry, cross-matching compatibility, component fractionation, and cold storage monitoring."
      >
        <Link
          href="/blood-bank/requests"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-600 text-white shadow-xs"
        >
          <Droplet className="w-4 h-4" /> Issue Blood Units
        </Link>
        <Link
          href="/blood-bank/donors"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
        >
          <Heart className="w-3.5 h-3.5 text-rose-500" /> Donor Registry
        </Link>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Blood Units"
          value="182 Units"
          subtext="Packed RBCs & Whole Blood"
          change="Available"
          isPositive={true}
          icon={Droplet}
          iconColor="rose"
        />
        <StatCard
          title="Fresh Frozen Plasma"
          value="73 Units"
          subtext="Stored at -30°C Freezer"
          change="Optimal"
          isPositive={true}
          icon={Droplet}
          iconColor="amber"
        />
        <StatCard
          title="Random Donor Platelets"
          value="37 Units"
          subtext="Agitator Incubator at 22°C"
          change="5-day shelf life"
          isPositive={true}
          icon={Droplet}
          iconColor="purple"
        />
        <StatCard
          title="Donations This Month"
          value="142 Voluntary"
          subtext="Zero TTIs verified (ELISA)"
          change="+8.4%"
          isPositive={true}
          icon={Heart}
          iconColor="emerald"
        />
      </div>

      {/* Blood Group Matrix Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {bloodStockData.map((b) => (
          <div
            key={b.group}
            className={`p-4 rounded-xl border-2 transition-all flex flex-col justify-between ${
              b.status === "Critical Shortage"
                ? "border-rose-500 bg-rose-50/50 dark:bg-rose-950/30"
                : b.status === "Low Stock"
                ? "border-amber-400 bg-amber-50/40 dark:bg-amber-950/20"
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-extrabold text-2xl text-rose-600">{b.group}</span>
                <StatusBadge status={b.status} />
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">PRBC Units:</span>
                  <span className="font-mono font-bold">{b.prbcUnits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">FFP Plasma:</span>
                  <span className="font-mono font-bold">{b.ffpUnits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Platelets:</span>
                  <span className="font-mono font-bold">{b.plateletUnits}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-center text-slate-400">
              Total: {b.prbcUnits + b.ffpUnits + b.plateletUnits} Units
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}

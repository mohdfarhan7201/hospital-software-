"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { formatCurrency } from "@/lib/utils";
import { Calculator, Printer, Plus, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface EstimatePlan {
  name: string;
  roomDays: number;
  roomRate: number;
  otCharges: number;
  surgeonFee: number;
  anesthesiaFee: number;
  pharmacyEstimate: number;
  investigationsEstimate: number;
}

export default function BillEstimatesPage() {
  const [plans, setPlans] = useState<EstimatePlan[]>([
    {
      name: "Total Knee Replacement (Arthroplasty) - Unilateral",
      roomDays: 4,
      roomRate: 7500,
      otCharges: 45000,
      surgeonFee: 65000,
      anesthesiaFee: 18000,
      pharmacyEstimate: 35000,
      investigationsEstimate: 12000,
    },
    {
      name: "Laparoscopic Cholecystectomy (Gallbladder Removal)",
      roomDays: 2,
      roomRate: 4200,
      otCharges: 28000,
      surgeonFee: 40000,
      anesthesiaFee: 12000,
      pharmacyEstimate: 15000,
      investigationsEstimate: 8500,
    },
  ]);

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Billing", href: "/billing" },
          { label: "Bill Estimates" },
        ]}
        title="Surgical & Inpatient Bill Cost Estimation"
        description="Provide comprehensive pre-admission financial estimates for planned surgeries, insurance pre-auth, and packages."
      >
        <button
          onClick={() => toast.info("Estimate template builder opened.")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white"
        >
          <Plus className="w-4 h-4" /> New Procedure Estimate
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((p, i) => {
          const total =
            p.roomDays * p.roomRate +
            p.otCharges +
            p.surgeonFee +
            p.anesthesiaFee +
            p.pharmacyEstimate +
            p.investigationsEstimate;

          return (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4 text-xs"
            >
              <div className="flex items-start justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">{p.name}</h3>
                  <p className="text-slate-400 mt-0.5">Estimated Inpatient Stay: {p.roomDays} Days</p>
                </div>
                <Calculator className="w-5 h-5 text-blue-600 shrink-0" />
              </div>

              <div className="space-y-2 divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
                <div className="flex justify-between pt-1">
                  <span className="font-sans text-slate-500">Room Rent ({p.roomDays}d x {formatCurrency(p.roomRate)}):</span>
                  <span>{formatCurrency(p.roomDays * p.roomRate)}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="font-sans text-slate-500">Operation Theatre & Consumables:</span>
                  <span>{formatCurrency(p.otCharges)}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="font-sans text-slate-500">Lead Surgeon & Assistant Fee:</span>
                  <span>{formatCurrency(p.surgeonFee)}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="font-sans text-slate-500">Anesthetist Charges:</span>
                  <span>{formatCurrency(p.anesthesiaFee)}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="font-sans text-slate-500">Pharmacy & Implant Estimate:</span>
                  <span>{formatCurrency(p.pharmacyEstimate)}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="font-sans text-slate-500">Diagnostics & Blood Work:</span>
                  <span>{formatCurrency(p.investigationsEstimate)}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-sm font-bold">
                <span className="font-sans">Total Estimated Cost:</span>
                <span className="text-emerald-600 font-mono text-base">{formatCurrency(total)}</span>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => toast.success("Estimate sheet printed for insurance pre-authorization.")}
                  className="px-3 py-1.5 rounded-lg border hover:bg-slate-50 flex items-center gap-1 font-semibold"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Patient Estimate
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardShell>
  );
}

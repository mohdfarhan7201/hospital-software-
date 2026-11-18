"use client";

import React from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatCurrency } from "@/lib/utils";
import { Percent, CheckCircle, ShieldCheck } from "lucide-react";

export default function DiscountsConcessionsPage() {
  const concessions = [
    {
      id: "dsc-1",
      patient: "Rajesh V. Sharma",
      uhid: "NU-2026-401928",
      billNo: "INV-2026-00891",
      category: "Senior Citizen Concession (Cardiology OPD)",
      discountAmount: 500,
      approvedBy: "Medical Superintendent",
      status: "Approved",
    },
    {
      id: "dsc-2",
      patient: "Sunita Verma",
      uhid: "NU-2026-302198",
      billNo: "INV-2026-00885",
      category: "Staff Welfare Courtesy Concession",
      discountAmount: 2200,
      approvedBy: "Hospital Managing Director",
      status: "Approved",
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Billing", href: "/billing" },
          { label: "Discounts & Concessions" },
        ]}
        title="Billing Concessions & Waiver Approvals"
        description="Audit log of billing discounts, senior citizen welfare waivers, staff concessions, and administrative approvals."
      />

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs text-xs space-y-4">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {concessions.map((c) => (
            <div key={c.id} className="py-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {c.patient}
                  </h3>
                  <span className="font-mono text-slate-400">({c.uhid})</span>
                  <StatusBadge status={c.status} />
                </div>
                <p className="text-blue-600 font-semibold mt-0.5">{c.category}</p>
                <p className="text-slate-500 mt-0.5">
                  Applied on {c.billNo} • Authorized by {c.approvedBy}
                </p>
              </div>

              <div className="text-right font-mono">
                <span className="text-base font-bold text-emerald-600">
                  {formatCurrency(c.discountAmount)}
                </span>
                <p className="text-[10px] text-slate-400 font-sans">Concession Applied</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}

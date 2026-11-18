"use client";

import React from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Building2, Handshake, Shield, Calendar } from "lucide-react";

interface CorporateMOU {
  id: string;
  corporateName: string;
  category: "Public Sector (PSU)" | "Corporate IT" | "TPA Insurance" | "Government Scheme";
  discountAgreed: string;
  creditDays: number;
  validTill: string;
  status: "Active Agreement" | "Under Renewal";
}

const mockMOUs: CorporateMOU[] = [
  {
    id: "mou-1",
    corporateName: "Oil and Natural Gas Corporation (ONGC)",
    category: "Public Sector (PSU)",
    discountAgreed: "CGHS NABH Empanelled Rates",
    creditDays: 45,
    validTill: "31 Dec 2027",
    status: "Active Agreement",
  },
  {
    id: "mou-2",
    corporateName: "Tata Consultancy Services (TCS) Healthcare Desk",
    category: "Corporate IT",
    discountAgreed: "15% on Diagnostics • 10% on Room Tariff",
    creditDays: 30,
    validTill: "30 Jun 2027",
    status: "Active Agreement",
  },
  {
    id: "mou-3",
    corporateName: "Ayushman Bharat PM-JAY Scheme",
    category: "Government Scheme",
    discountAgreed: "Government Fixed Health Package Tariffs",
    creditDays: 60,
    validTill: "31 Mar 2028",
    status: "Active Agreement",
  },
];

export default function MOUManagementPage() {
  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Finance", href: "/billing" },
          { label: "MOU Management" },
        ]}
        title="Corporate & TPA Memorandums of Understanding (MOU)"
        description="Corporate empanelment contracts, credit period limits, negotiated tariff rate schedules, and renewal tracking."
      />

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4 text-xs">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {mockMOUs.map((m) => (
            <div
              key={m.id}
              className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {m.corporateName}
                  </h3>
                  <StatusBadge status={m.status} />
                </div>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mt-0.5">
                  Category: {m.category} • Tariff Rule: {m.discountAgreed}
                </p>
                <p className="text-slate-500 mt-0.5">
                  Credit Terms: {m.creditDays} Days Credit • Agreement Valid Till: {m.validTill}
                </p>
              </div>

              <div className="self-end md:self-center">
                <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 font-semibold">
                  View Contract Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}

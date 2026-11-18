"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockClaims } from "@/data/mockData";
import { ShieldCheck, Building2, CheckCircle2, Clock, Plus, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function InsuranceDashboardPage() {
  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Insurance & TPA" },
        ]}
        title="Insurance & TPA Cashless Command Desk"
        description="Cashless hospital pre-authorization, TPA query resolution, claim documents upload, and settlement tracking."
      >
        <Link
          href="/insurance/pre-authorization"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white shadow-xs"
        >
          <Plus className="w-4 h-4" /> Submit Pre-Auth
        </Link>
        <Link
          href="/insurance/claims"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
        >
          Track Claims
        </Link>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Claims This Month"
          value="₹1.48 Cr"
          subtext="64 Inpatient Cashless Files"
          change="+16.2%"
          isPositive={true}
          icon={ShieldCheck}
          iconColor="blue"
        />
        <StatCard
          title="Approval Rate"
          value="89.4%"
          subtext="Target: &gt; 85% approved"
          change="+3.1%"
          isPositive={true}
          icon={CheckCircle2}
          iconColor="emerald"
        />
        <StatCard
          title="Pre-Auth Avg Turnaround"
          value="1.8 Hours"
          subtext="IRDAI Standard: &lt; 2 hrs"
          change="-22 mins"
          isPositive={true}
          icon={Clock}
          iconColor="purple"
        />
        <StatCard
          title="Empanelled Insurers"
          value="28 TPAs / Insurers"
          subtext="GIPSA, Private & PSU"
          change="All Active"
          isPositive={true}
          icon={Building2}
          iconColor="amber"
        />
      </div>

      {/* Active Cashless Claims Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <h2 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            Active Cashless Pre-Auth & Claims
          </h2>
          <Link href="/insurance/claims" className="text-blue-600 font-semibold hover:underline">
            View All Claims
          </Link>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {mockClaims.map((claim) => (
            <div
              key={claim.id}
              className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-blue-600">{claim.claimId}</span>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {claim.patientName}
                  </h3>
                  <span className="font-mono text-slate-400">({claim.uhid})</span>
                  <StatusBadge status={claim.status} />
                </div>
                <p className="text-slate-500 mt-1">
                  Insurer: <strong>{claim.insuranceCompany}</strong> • TPA:{" "}
                  <strong>{claim.tpaName}</strong>
                </p>
                <p className="text-slate-500 font-mono mt-0.5">Policy: {claim.policyNumber}</p>
              </div>

              <div className="flex items-center gap-6 self-end md:self-center font-mono">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-sans">Claimed</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    {formatCurrency(claim.claimAmount)}
                  </p>
                </div>
                {claim.approvedAmount && (
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-sans">Approved</p>
                    <p className="font-bold text-emerald-600">
                      {formatCurrency(claim.approvedAmount)}
                    </p>
                  </div>
                )}
                <Link
                  href="/insurance/claims"
                  className="px-3 py-1.5 rounded-lg border hover:bg-slate-50 font-sans font-semibold text-xs"
                >
                  View File
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}

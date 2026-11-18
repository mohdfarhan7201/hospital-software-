"use client";

import React from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { RevenueBarChart } from "@/components/dashboard/DashboardCharts";
import { IndianRupee, CreditCard, ShieldCheck, AlertCircle, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { mockInvoices } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";

export default function FinancialDashboardPage() {
  const totalBilled = mockInvoices.reduce((acc, inv) => acc + inv.totalAmount, 0);
  const totalPaid = mockInvoices.reduce((acc, inv) => acc + inv.paidAmount, 0);
  const totalOutstanding = mockInvoices.reduce((acc, inv) => acc + inv.outstandingAmount, 0);

  const paymentModes = [
    { method: "Insurance TPA Claims", amount: "₹48.2 Lakhs", pct: "46%", color: "bg-blue-600" },
    { method: "UPI & Digital Wallets", amount: "₹31.4 Lakhs", pct: "30%", color: "bg-emerald-500" },
    { method: "Credit / Debit Cards", amount: "₹18.6 Lakhs", pct: "18%", color: "bg-purple-500" },
    { method: "Cash Counter Collections", amount: "₹6.3 Lakhs", pct: "6%", color: "bg-amber-500" },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Dashboards", href: "/dashboard" },
          { label: "Financial Dashboard" },
        ]}
        title="Hospital Financial Analytics & Billing Revenue"
        description="Daily collections, TPA pre-auth settlements, AR aging, and payment gateway ledger."
      >
        <Link
          href="/billing"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
        >
          <IndianRupee className="w-3.5 h-3.5" /> Billing Console
        </Link>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Monthly Gross Billing"
          value="₹1.28 Cr"
          subtext="Current calendar month"
          change="+14.8%"
          isPositive={true}
          icon={IndianRupee}
          iconColor="blue"
        />
        <StatCard
          title="TPA Claim Settlements"
          value="₹48.2 Lakhs"
          subtext="88% claim approval rate"
          change="+9.2%"
          isPositive={true}
          icon={ShieldCheck}
          iconColor="emerald"
        />
        <StatCard
          title="Outstanding Receivables"
          value="₹14.6 Lakhs"
          subtext="Avg DSO: 18 days"
          change="-3.5%"
          isPositive={true}
          icon={CreditCard}
          iconColor="amber"
        />
        <StatCard
          title="Refunds & Deductions"
          value="₹42,800"
          subtext="Discounts & concessions"
          change="0.3% of rev"
          isPositive={true}
          icon={AlertCircle}
          iconColor="rose"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Monthly Revenue & Claim Settlements Trend
              </h2>
              <p className="text-xs text-slate-500">
                Direct patient counter collections vs Third Party Administrator (TPA) claims
              </p>
            </div>
          </div>
          <RevenueBarChart />
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
              Payment Inflow Breakdown
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Distribution by collection mode this month
            </p>
            <div className="space-y-4">
              {paymentModes.map((pm) => (
                <div key={pm.method} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {pm.method}
                    </span>
                    <span className="font-mono text-slate-500">
                      {pm.amount} ({pm.pct})
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full ${pm.color}`}
                      style={{ width: pm.pct }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
            <Link
              href="/finance/accounts-closing"
              className="text-blue-600 dark:text-blue-400 font-semibold flex items-center justify-between hover:underline"
            >
              <span>Daily Shift Accounts Closing</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { StatCard } from "@/components/common/StatCard";
import { exportToCSV, formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { TrendingUp, DollarSign, CreditCard, Percent, Download } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

const REVENUE_BY_DEPT = [
  { dept: "IPD Surgery & Wards", billed: 1240000, collected: 1180000, pending: 60000 },
  { dept: "OPD Consultations", billed: 420000, collected: 420000, pending: 0 },
  { dept: "Pharmacy Sales", billed: 560000, collected: 540000, pending: 20000 },
  { dept: "Laboratory / Pathology", billed: 280000, collected: 275000, pending: 5000 },
  { dept: "Radiology / Imaging", billed: 210000, collected: 195000, pending: 15000 },
  { dept: "Operation Theatre (OT)", billed: 380000, collected: 360000, pending: 20000 },
];

const REVENUE_TRANSACTIONS = [
  { id: "1", date: "2026-10-15", category: "IPD Discharge Settlement", paymentMode: "TPA / Insurance", ref: "TXN-9021", billed: 85000, collected: 85000, discount: 0 },
  { id: "2", date: "2026-10-15", category: "Pharmacy Counter", paymentMode: "UPI / QR", ref: "TXN-9022", billed: 4250, collected: 4250, discount: 200 },
  { id: "3", date: "2026-10-15", category: "OPD Consultation", paymentMode: "Credit Card", ref: "TXN-9023", billed: 1200, collected: 1200, discount: 0 },
  { id: "4", date: "2026-10-15", category: "Diagnostics / MRI", paymentMode: "Cash", ref: "TXN-9024", billed: 7500, collected: 7500, discount: 500 },
  { id: "5", date: "2026-10-15", category: "IPD Advance Deposit", paymentMode: "Bank NEFT", ref: "TXN-9025", billed: 30000, collected: 30000, discount: 0 },
];

export default function RevenueReportsPage() {
  const [data, setData] = useState(REVENUE_TRANSACTIONS);

  const columns = [
    { key: "date", header: "Date" },
    { key: "category", header: "Revenue Stream", render: (r: any) => <span className="font-semibold text-[var(--foreground)]">{r.category}</span> },
    { key: "ref", header: "Ref Txn ID", render: (r: any) => <span className="font-mono text-xs">{r.ref}</span> },
    { key: "paymentMode", header: "Tender Type", render: (r: any) => <span className="px-2 py-0.5 rounded text-xs bg-[var(--background)] border border-[var(--border)]">{r.paymentMode}</span> },
    { key: "billed", header: "Gross Billed", render: (r: any) => <span className="font-mono">{formatCurrency(r.billed)}</span> },
    { key: "discount", header: "Concession", render: (r: any) => <span className="font-mono text-amber-600">{formatCurrency(r.discount)}</span> },
    { key: "collected", header: "Net Realized", render: (r: any) => <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(r.collected)}</span> },
  ];

  return (
    <DashboardShell>
      <PageHeader
        title="Revenue, Collections & Cashflow Audit"
        description="Daily collection reconciliation, tender breakdowns (Cash, UPI, Card, NEFT, TPA), discount concessions, and receivable ageing"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Reports", href: "/reports" },
          { label: "Revenue Reports" },
        ]}
        actions={
          <button
            onClick={() => {
              exportToCSV(data, "revenue-collections-report.csv");
              toast.success("Revenue report downloaded");
            }}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Export Financial Summary
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <StatCard title="Gross Billed Revenue" value="₹30,90,000" subtitle="This month" icon={TrendingUp} />
        <StatCard title="Net Realized Collections" value="₹29,70,000" subtitle="96.1% collection efficiency" icon={DollarSign} />
        <StatCard title="Concessions & Discounts" value="₹48,500" subtitle="1.56% of gross billing" icon={Percent} />
        <StatCard title="Outstanding Receivables" value="₹1,20,000" subtitle="Pending TPA settlements" icon={CreditCard} />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 mb-6 shadow-sm">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-1">Departmental Revenue Realization</h3>
        <p className="text-xs text-[var(--muted-foreground)] mb-4">Gross billed amount compared against realized cash/bank collections</p>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={REVENUE_BY_DEPT}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="dept" stroke="#94a3b8" fontSize={11} />
              <YAxis tickFormatter={(val) => `₹${val / 1000}k`} stroke="#94a3b8" fontSize={12} />
              <Tooltip formatter={(val: any) => formatCurrency(Number(val))} />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
              <Bar dataKey="billed" name="Billed Amount" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="collected" name="Realized Collections" fill="#16a34a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">Daily Realization Journal</h3>
        <DataTable columns={columns} data={data} searchKey="category" searchPlaceholder="Search stream, ref or payment mode..." />
      </div>
    </DashboardShell>
  );
}

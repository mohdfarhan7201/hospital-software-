"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { exportToCSV, formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { FileText, Award, TrendingUp, Users, Bed, Download, Printer } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

const MONTHLY_KPIS = [
  { metric: "OPD Total Footfall", m1: 3420, m2: 3680, m3: 3910, benchmark: "3,500+", compliance: "Achieved" },
  { metric: "IPD Admissions", m1: 210, m2: 235, m3: 254, benchmark: "220+", compliance: "Achieved" },
  { metric: "Average Bed Occupancy", m1: "78%", m2: "80%", m3: "82.4%", benchmark: "> 75%", compliance: "Achieved" },
  { metric: "Average Length of Stay (ALOS)", m1: "4.4d", m2: "4.3d", m3: "4.1d", benchmark: "< 4.5d", compliance: "Achieved" },
  { metric: "Hospital-Acquired Infection Rate", m1: "0.4%", m2: "0.3%", m3: "0.2%", benchmark: "< 1.0%", compliance: "NABH Compliant" },
  { metric: "Gross Operating Margin", m1: "26.4%", m2: "27.1%", m3: "28.5%", benchmark: "> 25%", compliance: "Exceeded" },
];

export default function MISReportsPage() {
  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    exportToCSV(MONTHLY_KPIS, "nuvertos-mis-executive-statement.csv");
    toast.success("Executive MIS statement exported");
  };

  return (
    <DashboardShell>
      <PageHeader
        title="Management Information System (MIS) Executive Dossier"
        description="Consolidated executive board indicators, NABH quality metrics, clinical governance audit, and EBITDA margin review"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Reports", href: "/reports" },
          { label: "Executive MIS" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-2 text-xs font-semibold rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--background)] flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" /> Print Board Deck
            </button>
            <button
              onClick={handleExport}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Export MIS Report
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <StatCard title="NABH Compliance Index" value="98.4%" subtitle="Audit Grade A+" icon={Award} />
        <StatCard title="Operating Revenue Runrate" value="₹3.42 Cr" subtitle="Annualized projection" icon={TrendingUp} />
        <StatCard title="Total Clinical Man-Hours" value="14,280" subtitle="Physicians & Nursing Staff" icon={Users} />
        <StatCard title="Overall Bed Utilization" value="82.4%" subtitle="Peak: 91% (ICU)" icon={Bed} />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-[var(--foreground)]">Executive Governance & Quality KPI Matrix</h3>
            <p className="text-xs text-[var(--muted-foreground)]">3-Month rolling performance benchmarked against NABH & internal targets</p>
          </div>
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400">
            Q2 Fiscal Certified
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--background)] text-xs uppercase tracking-wider text-[var(--muted-foreground)] border-b border-[var(--border)]">
              <tr>
                <th className="px-4 py-3 font-semibold">Strategic Metric</th>
                <th className="px-4 py-3 font-semibold">Month 1 (Aug)</th>
                <th className="px-4 py-3 font-semibold">Month 2 (Sep)</th>
                <th className="px-4 py-3 font-semibold">Month 3 (Oct)</th>
                <th className="px-4 py-3 font-semibold">NABH Benchmark</th>
                <th className="px-4 py-3 font-semibold">Compliance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {MONTHLY_KPIS.map((kpi, idx) => (
                <tr key={idx} className="hover:bg-[var(--background)]/50 transition-colors">
                  <td className="px-4 py-3 font-bold text-[var(--foreground)]">{kpi.metric}</td>
                  <td className="px-4 py-3 font-mono">{kpi.m1}</td>
                  <td className="px-4 py-3 font-mono">{kpi.m2}</td>
                  <td className="px-4 py-3 font-mono font-semibold text-[var(--primary)]">{kpi.m3}</td>
                  <td className="px-4 py-3 font-mono text-xs">{kpi.benchmark}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                      {kpi.compliance}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}

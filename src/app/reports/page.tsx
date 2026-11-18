"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { exportToCSV, formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { 
  BarChart3, 
  FileText, 
  TrendingUp, 
  Users, 
  Calendar, 
  Bed, 
  Receipt, 
  Percent, 
  Download, 
  Printer, 
  ArrowRight,
  Filter,
  DollarSign,
  Activity
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";

const MONTHLY_REVENUE_DATA = [
  { month: "May", opd: 420000, ipd: 890000, pharmacy: 310000, lab: 180000 },
  { month: "Jun", opd: 460000, ipd: 940000, pharmacy: 340000, lab: 210000 },
  { month: "Jul", opd: 490000, ipd: 1020000, pharmacy: 390000, lab: 230000 },
  { month: "Aug", opd: 530000, ipd: 1150000, pharmacy: 420000, lab: 260000 },
  { month: "Sep", opd: 580000, ipd: 1210000, pharmacy: 440000, lab: 280000 },
  { month: "Oct", opd: 640000, ipd: 1380000, pharmacy: 510000, lab: 320000 },
];

const REPORT_MODULES = [
  {
    title: "Patient Census Reports",
    desc: "New registrations, demographic distribution, age/gender clusters, ABHA adoption metrics.",
    href: "/reports/patients",
    icon: Users,
    color: "text-blue-500 bg-blue-50 dark:bg-blue-950/40",
    stats: "2,420 Registered this month",
  },
  {
    title: "OPD Volume & Wait Times",
    desc: "Outpatient consultations, doctor-wise throughput, queue turnaround times, specialty metrics.",
    href: "/reports/opd",
    icon: Activity,
    color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40",
    stats: "18 mins avg turnaround",
  },
  {
    title: "IPD Census & Admissions",
    desc: "Inpatient admission trends, department bed utilization, ALOS (Average Length of Stay).",
    href: "/reports/ipd",
    icon: Bed,
    color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40",
    stats: "82% Bed Occupancy",
  },
  {
    title: "Revenue & Billing Reports",
    desc: "Gross collections, departmental billing breakdown, discounts offered, payment gateway logs.",
    href: "/reports/revenue",
    icon: TrendingUp,
    color: "text-amber-500 bg-amber-50 dark:bg-amber-950/40",
    stats: "₹28,50,000 this month",
  },
  {
    title: "Bed Occupancy Analytics",
    desc: "Real-time ward & ICU utilization heatmaps, turnover intervals, reserved vs active beds.",
    href: "/reports/occupancy",
    icon: Bed,
    color: "text-rose-500 bg-rose-50 dark:bg-rose-950/40",
    stats: "48/60 Beds Occupied",
  },
  {
    title: "Discharges & LOS Tracking",
    desc: "Planned vs emergency discharges, clearance cycle times, readmission rates within 30 days.",
    href: "/reports/discharge",
    icon: Calendar,
    color: "text-cyan-500 bg-cyan-50 dark:bg-cyan-950/40",
    stats: "4.2 days ALOS",
  },
  {
    title: "GST & Tax Reconciliation",
    desc: "GSTR-1 & GSTR-3B tax reports for taxable pharmacy & consumable medical items with HSN codes.",
    href: "/reports/gst",
    icon: Percent,
    color: "text-purple-500 bg-purple-50 dark:bg-purple-950/40",
    stats: "5% & 12% Slab Audits",
  },
  {
    title: "Doctor Payouts & Commission",
    desc: "Doctor share reconciliation across OPD consultations, surgical procedures, and cross-referrals.",
    href: "/reports/payouts",
    icon: DollarSign,
    color: "text-orange-500 bg-orange-50 dark:bg-orange-950/40",
    stats: "₹9.4L Paid / ₹2.1L Pending",
  },
  {
    title: "MIS & Executive Board Deck",
    desc: "Comprehensive monthly hospital performance statement for management board and NABH audits.",
    href: "/reports/mis",
    icon: FileText,
    color: "text-teal-500 bg-teal-50 dark:bg-teal-950/40",
    stats: "NABH / MoHFW Ready",
  },
];

export default function ReportsHubPage() {
  const [period, setPeriod] = useState("oct2026");

  const handleExportSummary = () => {
    exportToCSV(MONTHLY_REVENUE_DATA, "nuvertos-executive-revenue-trends.csv");
    toast.success("Executive report exported to CSV successfully");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardShell>
      <PageHeader
        title="Hospital Analytics & Reports Hub"
        description="Enterprise Business Intelligence, NABH compliance statements, financial reconciliation, and operational audit reports"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Reports & Analytics" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-2 text-xs font-semibold rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--background)] flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" /> Print Overview
            </button>
            <button
              onClick={handleExportSummary}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5 transition-opacity"
            >
              <Download className="w-3.5 h-3.5" /> Export Data (CSV)
            </button>
          </div>
        }
      />

      {/* KPI Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Gross Revenue"
          value="₹28,50,000"
          subtitle="Current fiscal month"
          trend={{ value: 14.8, isPositive: true }}
          icon={TrendingUp}
        />
        <StatCard
          title="Active Bed Occupancy"
          value="82.4%"
          subtitle="48 of 60 beds occupied"
          trend={{ value: 3.2, isPositive: true }}
          icon={Bed}
        />
        <StatCard
          title="Total Patient Footfall"
          value="4,892"
          subtitle="OPD (3,910) + IPD (982)"
          trend={{ value: 8.6, isPositive: true }}
          icon={Users}
        />
        <StatCard
          title="Avg Turnaround Time"
          value="18.5 min"
          subtitle="Registration to Doctor Consult"
          trend={{ value: -12.4, isPositive: true }}
          icon={Activity}
        />
      </div>

      {/* Main Chart Section */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-base font-bold text-[var(--foreground)]">Departmental Revenue Trajectory (Last 6 Months)</h3>
            <p className="text-xs text-[var(--muted-foreground)]">Breakdown between Inpatient (IPD), Outpatient (OPD), Pharmacy, and Diagnostics</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--muted-foreground)]">Period:</span>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-2.5 py-1 text-xs rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none"
            >
              <option value="oct2026">FY 2026-27 (H1)</option>
              <option value="lastquarter">Last Quarter (Q2)</option>
              <option value="ytd">Year to Date</option>
            </select>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MONTHLY_REVENUE_DATA} margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIpd" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorOpd" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPharm" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d97706" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis tickFormatter={(val) => `₹${val / 1000}k`} stroke="#94a3b8" fontSize={12} />
              <Tooltip formatter={(val: any) => formatCurrency(Number(val))} />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
              <Area type="monotone" dataKey="ipd" name="IPD Admissions" stroke="#2563eb" fillOpacity={1} fill="url(#colorIpd)" />
              <Area type="monotone" dataKey="opd" name="OPD Visits" stroke="#16a34a" fillOpacity={1} fill="url(#colorOpd)" />
              <Area type="monotone" dataKey="pharmacy" name="Pharmacy Dispensing" stroke="#d97706" fillOpacity={1} fill="url(#colorPharm)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Directory of Report Sub-modules */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-4">
          Detailed Operational & Compliance Reports
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REPORT_MODULES.map((mod) => {
            const Icon = mod.icon;
            return (
              <Link
                key={mod.href}
                href={mod.href}
                className="group p-5 bg-[var(--card)] border border-[var(--border)] rounded-xl hover:border-[var(--primary)] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2.5 rounded-lg ${mod.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[var(--background)] border border-[var(--border)] text-[var(--muted-foreground)]">
                      {mod.stats}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors mb-1">
                    {mod.title}
                  </h4>
                  <p className="text-xs text-[var(--muted-foreground)] line-clamp-2 leading-relaxed">
                    {mod.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-semibold text-[var(--primary)]">
                  <span>Open Report</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </DashboardShell>
  );
}

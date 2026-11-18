"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockLabRequests, mockLabTests } from "@/data/mockData";
import {
  FlaskConical,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Plus,
  FileText,
  Activity,
  ArrowRight,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function LaboratoryDashboardPage() {
  const criticalRequests = mockLabRequests.filter((r) => r.status === "Critical Alert" || r.urgent);

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Diagnostic Services" },
          { label: "Laboratory" },
        ]}
        title="Clinical Pathology & Biochemistry Command Centre"
        description="NABL-accredited diagnostic laboratory workflow, automated sample barcoding, analyzer interfaces, and critical value alarms."
      >
        <Link
          href="/laboratory/results"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white shadow-xs"
        >
          <Activity className="w-4 h-4" /> Enter Lab Results
        </Link>
        <Link
          href="/laboratory/samples"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
        >
          Phlebotomy Samples
        </Link>
      </PageHeader>

      {/* Critical Value Alert Banner */}
      <div className="mb-6 p-4 rounded-xl border border-rose-300 dark:border-rose-900 bg-rose-50/70 dark:bg-rose-950/40 text-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-rose-600 text-white animate-pulse">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-rose-800 dark:text-rose-200 text-sm">
              Critical Biomarker Alert — Immediate Attending Doctor Notification Required
            </p>
            <p className="text-slate-600 dark:text-slate-400 mt-0.5">
              Patient: <strong>Mohammed Irfan Siddiqui (NU-2026-890234)</strong> • Bed ICU-01 •
              Marked Leukocytosis: <strong>WBC 19,400 /uL</strong> (Panic Value)
            </p>
          </div>
        </div>
        <Link
          href="/laboratory/reports"
          className="px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs whitespace-nowrap self-end md:self-center"
        >
          View Panic Report
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Tests Ordered Today"
          value="184 Tests"
          subtext="Biochemistry, Hematology, KFT"
          change="+14.2%"
          isPositive={true}
          icon={FlaskConical}
          iconColor="blue"
        />
        <StatCard
          title="Samples In Phlebotomy"
          value="14 Pending"
          subtext="Barcode labeled vacutainers"
          change="Queue normal"
          isPositive={true}
          icon={Clock}
          iconColor="amber"
        />
        <StatCard
          title="Turn-Around-Time (TAT)"
          value="94.8% Adherence"
          subtext="Emergency STAT: < 60 mins"
          change="Compliant"
          isPositive={true}
          icon={CheckCircle2}
          iconColor="emerald"
        />
        <StatCard
          title="Critical Panic Alerts"
          value="3 Critical Values"
          subtext="Immediate phone call recorded"
          change="Urgent"
          isPositive={false}
          icon={AlertTriangle}
          iconColor="rose"
        />
      </div>

      {/* Active Lab Requisitions */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <h2 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-blue-600" />
            Recent Diagnostic Lab Requests
          </h2>
          <Link href="/laboratory/requests" className="text-blue-600 font-semibold hover:underline">
            View All Requisitions
          </Link>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {mockLabRequests.map((req) => (
            <div
              key={req.id}
              className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-blue-600">{req.requestNumber}</span>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100">
                    {req.patientName}
                  </h3>
                  <span className="font-mono text-slate-400">({req.uhid})</span>
                  <StatusBadge status={req.status} />
                  {req.urgent && (
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400">
                      STAT Urgent
                    </span>
                  )}
                </div>
                <p className="text-slate-500 mt-1">
                  Ordering Doctor: {req.doctorName} • Date: {req.requestDate}
                </p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {req.tests.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                <Link
                  href="/laboratory/results"
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1 shadow-2xs"
                >
                  <Activity className="w-3.5 h-3.5" /> Enter Results
                </Link>
                <Link
                  href="/laboratory/reports"
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 font-semibold"
                >
                  Report
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}

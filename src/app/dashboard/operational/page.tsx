"use client";

import React from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import {
  BedDouble,
  Clock,
  Activity,
  HeartPulse,
  UserCheck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { mockBeds, mockDoctors } from "@/data/mockData";

export default function OperationalDashboardPage() {
  const wards = [
    { name: "Coronary Intensive Care Unit (CCU)", total: 12, occupied: 11, status: "Critical High" },
    { name: "High Dependency Unit (HDU)", total: 16, occupied: 14, status: "High" },
    { name: "Male Medical Ward (Floor 2)", total: 32, occupied: 26, status: "Optimal" },
    { name: "Female Surgical Ward (Floor 3)", total: 30, occupied: 22, status: "Optimal" },
    { name: "Maternity & OBG Special Care", total: 20, occupied: 15, status: "Optimal" },
    { name: "Pediatric Care Unit", total: 18, occupied: 9, status: "Low" },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Dashboards", href: "/dashboard" },
          { label: "Operational Dashboard" },
        ]}
        title="Hospital Operational Intelligence"
        description="Bed turn-around time, nursing shift distribution, and department throughput metrics."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Avg Length of Stay (ALOS)"
          value="3.8 Days"
          subtext="Target: < 4.2 Days"
          change="-0.4d"
          isPositive={true}
          icon={Clock}
          iconColor="blue"
        />
        <StatCard
          title="Bed Turnaround Time"
          value="48 Mins"
          subtext="Discharge to sanitized ready"
          change="-12 min"
          isPositive={true}
          icon={BedDouble}
          iconColor="emerald"
        />
        <StatCard
          title="Nurse-to-Patient Ratio"
          value="1 : 4"
          subtext="ICU Standard: 1:1 maintained"
          change="Compliant"
          isPositive={true}
          icon={UserCheck}
          iconColor="purple"
        />
        <StatCard
          title="OT Turnaround Interval"
          value="24 Mins"
          subtext="Between scheduled surgeries"
          change="-5 min"
          isPositive={true}
          icon={Activity}
          iconColor="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ward Bed Matrix */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4">
            Ward Occupancy & Live Capacity
          </h2>
          <div className="space-y-4">
            {wards.map((ward) => {
              const pct = Math.round((ward.occupied / ward.total) * 100);
              return (
                <div key={ward.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {ward.name}
                    </span>
                    <span className="text-slate-500 font-mono">
                      {ward.occupied}/{ward.total} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full transition-all ${
                        pct > 85 ? "bg-rose-500" : pct > 70 ? "bg-amber-500" : "bg-blue-600"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* On-Duty Medical Specialists */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4">
            On-Duty Consultants & OPD Presence
          </h2>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {mockDoctors.map((doc) => (
              <div key={doc.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {doc.name}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {doc.specialization} • {doc.opdRoom}
                  </p>
                </div>
                <StatusBadge status={doc.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

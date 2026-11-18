"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockSurgeries, mockDoctors } from "@/data/mockData";
import { SurgeryRecord } from "@/types";
import {
  Scissors,
  Calendar,
  Clock,
  UserCheck,
  CheckCircle,
  AlertCircle,
  Plus,
  Play,
} from "lucide-react";
import { toast } from "sonner";

export default function OTDashboardPage() {
  const [surgeries, setSurgeries] = useState<SurgeryRecord[]>(mockSurgeries);

  const handleStartSurgery = (id: string, name: string) => {
    setSurgeries((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "In Progress" } : s))
    );
    toast.success(`Surgery started: ${name} is now In Progress in OT.`);
  };

  const handleFinishSurgery = (id: string, name: string) => {
    setSurgeries((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "Post-Op Recovery" } : s))
    );
    toast.success(`Surgery completed: Patient moved to PACU Post-Op Recovery.`);
  };

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Operation Theatre (OT)" },
        ]}
        title="Operation Theatre (OT) Surgical Command Centre"
        description="Live surgical suite tracking, laminar flow cleanrooms, anesthesia checklists, and surgical scheduling."
      >
        <Link
          href="/operation-theatre/calendar"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors"
        >
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
          <span>OT Schedule Grid</span>
        </Link>
        <Link
          href="/operation-theatre/surgeries"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white shadow-xs"
        >
          <Plus className="w-4 h-4" /> Book Surgery Slot
        </Link>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Surgeries Today"
          value="6 Procedures"
          subtext="2 Completed • 1 Active"
          change="+1 Emergency"
          isPositive={true}
          icon={Scissors}
          iconColor="rose"
        />
        <StatCard
          title="Active OT Suites"
          value="3 / 4 Operational"
          subtext="OT-04 in Terminal Cleaning"
          change="75% Utilized"
          isPositive={true}
          icon={Clock}
          iconColor="blue"
        />
        <StatCard
          title="Pre-Op PACU Patients"
          value="2 Ready"
          subtext="Anesthesia clearance given"
          change="On Schedule"
          isPositive={true}
          icon={UserCheck}
          iconColor="emerald"
        />
        <StatCard
          title="OT Turnaround Time"
          value="24 Mins"
          subtext="Benchmark: < 30 mins"
          change="-6 mins"
          isPositive={true}
          icon={CheckCircle}
          iconColor="purple"
        />
      </div>

      {/* Live OT Suites Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono font-bold text-xs">OT SUITE 01</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
              Orthopaedic Laminar Flow
            </span>
          </div>
          <p className="text-xs text-slate-500">Upcoming: Total Knee Arthroplasty</p>
          <p className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-2">
            Surgeon: Dr. Sandeep Chawla
          </p>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs">
            <span className="text-slate-500">Start: 09:00 AM</span>
            <span className="font-semibold text-emerald-600">Pre-Op Ready</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border-2 border-rose-500 p-5 shadow-xs bg-rose-50/20 dark:bg-rose-950/20">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono font-bold text-xs text-rose-600">OT SUITE 02 (ACTIVE)</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 animate-pulse">
              In Surgery
            </span>
          </div>
          <p className="text-xs text-slate-500">Emergency Laparoscopic Appendectomy</p>
          <p className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-2">
            Surgeon: Dr. Amitesh Mukherjee
          </p>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs">
            <span className="text-slate-500">Elapsed: 42 mins</span>
            <span className="font-semibold text-rose-600">Ongoing</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono font-bold text-xs">OT SUITE 03</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              Cleaned & Ready
            </span>
          </div>
          <p className="text-xs text-slate-500">General & Laparoscopy Theatre</p>
          <p className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-2">
            Next: Lap Cholecystectomy (02:30 PM)
          </p>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs">
            <span className="text-slate-500">HVAC Pressure: Positive</span>
            <span className="font-semibold text-emerald-600">Available</span>
          </div>
        </div>
      </div>

      {/* Surgeries Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs p-5">
        <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4">
          Today's Operating Theatre Schedule
        </h2>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {surgeries.map((s) => (
            <div
              key={s.id}
              className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-rose-600">{s.surgeryNumber}</span>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {s.surgeryName}
                  </h3>
                  <StatusBadge status={s.status} />
                </div>
                <p className="text-slate-500 mt-1">
                  Patient: <strong>{s.patientName}</strong> ({s.uhid}) • {s.otRoom}
                </p>
                <p className="text-slate-500 mt-0.5">
                  Surgeon: {s.leadSurgeon} • Anesthetist: {s.anesthetist} • Scheduled:{" "}
                  {s.scheduledTime} ({s.durationMins} mins)
                </p>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                {s.status === "Pre-Op Ready" && (
                  <button
                    onClick={() => handleStartSurgery(s.id, s.surgeryName)}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold flex items-center gap-1 shadow-2xs"
                  >
                    <Play className="w-3.5 h-3.5" /> Start Surgery
                  </button>
                )}
                {s.status === "In Progress" && (
                  <button
                    onClick={() => handleFinishSurgery(s.id, s.surgeryName)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1 shadow-2xs"
                  >
                    <CheckCircle className="w-3.5 h-3.5" /> Transfer to PACU
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}

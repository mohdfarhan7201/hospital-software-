"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { mockPatients, mockDoctors } from "@/data/mockData";
import {
  Activity,
  FileText,
  Pill,
  Heart,
  Stethoscope,
  Clock,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

export default function ClinicalPortalPage() {
  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Clinical & Patient Care" },
        ]}
        title="Clinical EMR & Physician Workstation"
        description="Electronic medical record (EMR) charting, vitals monitoring, clinical notes, and prescription management."
      >
        <Link
          href="/clinical/vitals"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white"
        >
          <Activity className="w-3.5 h-3.5" /> Record Vitals
        </Link>
        <Link
          href="/prescriptions"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
        >
          <Pill className="w-3.5 h-3.5 text-purple-600" /> E-Prescriptions
        </Link>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Link
          href="/clinical/vitals"
          className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-500 transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">Nursing Station</span>
            <Activity className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            Vitals & Triage
          </h3>
          <p className="text-xs text-slate-500 mt-1">BP, Pulse, SpO2, Temp, BMI</p>
        </Link>

        <Link
          href="/clinical/notes"
          className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-purple-500 transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">Physician Notes</span>
            <FileText className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            SOAP Clinical Notes
          </h3>
          <p className="text-xs text-slate-500 mt-1">Diagnosis, assessment & plans</p>
        </Link>

        <Link
          href="/clinical/icu"
          className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-rose-500 transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">Critical Care</span>
            <Heart className="w-5 h-5 text-rose-600" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            ICU / CCU Charting
          </h3>
          <p className="text-xs text-slate-500 mt-1">Ventilator, telemetry & infusion</p>
        </Link>

        <Link
          href="/prescriptions"
          className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-500 transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">Pharmacy EMR</span>
            <Pill className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            E-Prescribing Console
          </h3>
          <p className="text-xs text-slate-500 mt-1">Drug database & dosage schedules</p>
        </Link>
      </div>

      {/* Active Patients EMR Quick Access */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4">
          Active Inpatient & Outpatient EMR Profiles
        </h2>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {mockPatients.map((p) => (
            <div
              key={p.id}
              className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {p.fullName}
                  </span>
                  <span className="font-mono text-blue-600 font-semibold">{p.uhid}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 font-bold">
                    {p.bloodGroup}
                  </span>
                </div>
                <p className="text-slate-500 mt-0.5">
                  Age: {p.age} Y / {p.gender} • Primary Allergy:{" "}
                  {p.medicalSummary?.allergies?.[0] || "None"} • Chronic:{" "}
                  {p.medicalSummary?.chronicConditions?.[0] || "None"}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <Link
                  href={`/patients/${p.uhid}`}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold flex items-center gap-1 hover:bg-blue-100"
                >
                  Open Patient 360 <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}

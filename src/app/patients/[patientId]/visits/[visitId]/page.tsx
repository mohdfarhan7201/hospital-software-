"use client";

import React, { use } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { formatCurrency, formatDate } from "@/lib/utils";
import { toast } from "sonner";
import { 
  Activity, 
  Calendar, 
  Clock, 
  FileText, 
  Pill, 
  Stethoscope, 
  User, 
  Printer, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function PatientVisitDetailPage({ params }: { params: Promise<{ patientId: string; visitId: string }> }) {
  const resolvedParams = use(params);
  const patientId = resolvedParams.patientId;
  const visitId = resolvedParams.visitId;

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardShell>
      <PageHeader
        title={`Outpatient Visit Encounter: ${visitId}`}
        description={`Clinical episode consultation details for Patient ID: ${patientId}`}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Patients", href: "/patients" },
          { label: patientId, href: `/patients/${patientId}` },
          { label: `Visit ${visitId}` },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Link
              href={`/patients/${patientId}`}
              className="px-3 py-2 text-xs font-semibold rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--background)] flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Patient 360
            </Link>
            <button
              onClick={handlePrint}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" /> Print Summary
            </button>
          </div>
        }
      />

      {/* Patient & Doctor Banner */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
              RS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[var(--foreground)]">Rajesh Kumar Sharma</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--background)] border border-[var(--border)]">
                  UHID: NU-2026-004812
                </span>
              </div>
              <p className="text-xs text-[var(--muted-foreground)]">46 Y / Male • Blood Group: O+ • Mobile: +91 98765 43210</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div>
              <span className="text-[var(--muted-foreground)] block">Attending Consultant</span>
              <span className="font-bold text-[var(--foreground)]">Dr. Arvind Swamy (Cardiology)</span>
            </div>
            <div className="border-l border-[var(--border)] pl-4">
              <span className="text-[var(--muted-foreground)] block">Encounter Date</span>
              <span className="font-medium text-[var(--foreground)]">15 Oct 2026, 10:30 AM</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Vitals at Visit */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2">
            <Activity className="w-4 h-4 text-[var(--primary)]" /> Triage Vitals at Check-in
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-[var(--background)] border border-[var(--border)]">
              <span className="text-[var(--muted-foreground)] block text-[10px]">Blood Pressure</span>
              <span className="font-bold font-mono">128 / 82 mmHg</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[var(--background)] border border-[var(--border)]">
              <span className="text-[var(--muted-foreground)] block text-[10px]">Heart Rate (PR)</span>
              <span className="font-bold font-mono">76 bpm</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[var(--background)] border border-[var(--border)]">
              <span className="text-[var(--muted-foreground)] block text-[10px]">Oxygen (SpO2)</span>
              <span className="font-bold font-mono">98% Room Air</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[var(--background)] border border-[var(--border)]">
              <span className="text-[var(--muted-foreground)] block text-[10px]">Temperature</span>
              <span className="font-bold font-mono">98.4 °F</span>
            </div>
          </div>
        </div>

        {/* Clinical Diagnosis */}
        <div className="md:col-span-2 bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm space-y-3 text-xs">
          <h3 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-emerald-600" /> Physician SOAP Notes & Diagnosis
          </h3>
          <div>
            <span className="font-bold text-[var(--foreground)]">Subjective / Chief Complaint:</span>
            <p className="text-[var(--muted-foreground)] mt-0.5">Mild exertional chest tightness for 4 days, aggravated after heavy meals. No radiating arm pain, no syncope or diaphoresis.</p>
          </div>
          <div>
            <span className="font-bold text-[var(--foreground)]">Assessment & Provisional ICD-10:</span>
            <p className="text-[var(--foreground)] font-medium mt-0.5">Primary Essential Hypertension (ICD-10 I10) with atypical exertional angina (ICD-10 I20.9)</p>
          </div>
        </div>
      </div>

      {/* Medications Prescribed */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 mb-6 shadow-sm">
        <h3 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2 mb-3">
          <Pill className="w-4 h-4 text-amber-500" /> Medications Prescribed in this Visit
        </h3>
        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-lg border border-[var(--border)] bg-[var(--background)] flex items-center justify-between">
            <div>
              <span className="font-bold text-[var(--foreground)]">Tab Telma-H 40/12.5 (Telmisartan + Hydrochlorothiazide)</span>
              <div className="text-[var(--muted-foreground)] text-[11px]">1 Tablet • Once daily morning after breakfast • 30 Days</div>
            </div>
            <span className="px-2 py-0.5 rounded text-[11px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 font-semibold">
              Dispensed
            </span>
          </div>

          <div className="p-3 rounded-lg border border-[var(--border)] bg-[var(--background)] flex items-center justify-between">
            <div>
              <span className="font-bold text-[var(--foreground)]">Tab Sorbitrate 5mg (Isosorbide Dinitrate)</span>
              <div className="text-[var(--muted-foreground)] text-[11px]">1 Tablet Sublingually • SOS when experiencing acute chest discomfort • 10 Days</div>
            </div>
            <span className="px-2 py-0.5 rounded text-[11px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 font-semibold">
              Dispensed
            </span>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

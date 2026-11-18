"use client";

import React, { use } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { toast } from "sonner";
import { 
  Activity, 
  Stethoscope, 
  FileText, 
  Pill, 
  Save, 
  ArrowLeft,
  CheckCircle2,
  Clock,
  Printer
} from "lucide-react";

export default function ClinicalConsultationEncounterPage({ params }: { params: Promise<{ patientId: string; visitId: string }> }) {
  const resolvedParams = use(params);
  const patientId = resolvedParams.patientId;
  const visitId = resolvedParams.visitId;

  const handleSave = () => {
    toast.success("Consultation notes & clinical chart committed to patient electronic record");
  };

  return (
    <DashboardShell>
      <PageHeader
        title={`Doctor Consultation Workstation: ${visitId}`}
        description={`Clinical encounter charting for Patient: ${patientId}`}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Clinical EMR", href: "/clinical" },
          { label: `Encounter ${visitId}` },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/clinical"
              className="px-3 py-2 text-xs font-semibold rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--background)] flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to OPD Queue
            </Link>
            <button
              onClick={handleSave}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" /> Sign & Lock Chart
            </button>
          </div>
        }
      />

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-[var(--foreground)]">Patient: Rajesh Kumar Sharma</span>
              <span className="font-mono text-xs text-[var(--primary)] font-semibold">(UHID: NU-2026-004812)</span>
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">46 Y / Male • Known Hypertensive (3 yrs) • No known drug allergies</p>
          </div>
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400">
            Consultation In Progress
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SOAP Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm space-y-3 text-xs">
            <h3 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-[var(--primary)]" /> Subjective History & Complaints
            </h3>
            <textarea
              rows={3}
              defaultValue="Patient reports mild retrosternal heaviness and breathlessness on climbing 2 flights of stairs for 1 week. Relieved with 5 minutes of rest. No palpitations, no nocturnal dyspnea."
              className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
            />

            <h3 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2 pt-2">
              <Activity className="w-4 h-4 text-emerald-600" /> Objective Physical Examination
            </h3>
            <textarea
              rows={3}
              defaultValue="CVS: S1, S2 audible, no murmurs or gallop. Chest: Bilateral vesicular breath sounds, no rhonchi or crepitations. P/A: Soft, non-tender, no organomegaly. Extremities: No pedal edema."
              className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
            />

            <h3 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2 pt-2">
              <FileText className="w-4 h-4 text-amber-500" /> Assessment & Diagnosis (ICD-10)
            </h3>
            <input
              type="text"
              defaultValue="Primary Essential Hypertension (I10) / Chronic Ischemic Heart Disease (I25.9)"
              className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] font-medium focus:outline-none"
            />
          </div>
        </div>

        {/* Side Panel: Vitals & Prescriptions */}
        <div className="space-y-4">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm text-xs space-y-2">
            <h4 className="font-bold text-[var(--foreground)] mb-2">Encounter Recorded Vitals</h4>
            <div className="flex justify-between py-1 border-b border-[var(--border)]">
              <span className="text-[var(--muted-foreground)]">Blood Pressure:</span>
              <span className="font-mono font-bold">128 / 82 mmHg</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[var(--border)]">
              <span className="text-[var(--muted-foreground)]">Pulse Rate:</span>
              <span className="font-mono font-bold">76 bpm</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[var(--border)]">
              <span className="text-[var(--muted-foreground)]">SpO2:</span>
              <span className="font-mono font-bold">98% Room Air</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[var(--muted-foreground)]">BMI:</span>
              <span className="font-mono font-bold">24.2 kg/m²</span>
            </div>
          </div>

          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm text-xs">
            <h4 className="font-bold text-[var(--foreground)] mb-2 flex items-center gap-1.5">
              <Pill className="w-3.5 h-3.5 text-amber-500" /> Linked Prescription (Rx)
            </h4>
            <div className="p-2.5 rounded-lg bg-[var(--background)] border border-[var(--border)] space-y-1">
              <div className="font-semibold text-[var(--foreground)]">Tab Telma-H 40/12.5</div>
              <div className="text-[11px] text-[var(--muted-foreground)]">1 tab OD after breakfast x 30d</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

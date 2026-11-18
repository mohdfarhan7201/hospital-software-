"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { StatCard } from "@/components/common/StatCard";
import { toast } from "sonner";
import { Activity, Plus, AlertTriangle, CheckCircle2 } from "lucide-react";

interface VitalParam {
  id: string;
  code: string;
  name: string;
  unit: string;
  normalMin: number;
  normalMax: number;
  criticalLow: number;
  criticalHigh: number;
  isMandatoryInTriage: boolean;
}

const VITALS_MASTER: VitalParam[] = [
  { id: "1", code: "SBP", name: "Systolic Blood Pressure", unit: "mmHg", normalMin: 100, normalMax: 130, criticalLow: 85, criticalHigh: 180, isMandatoryInTriage: true },
  { id: "2", code: "DBP", name: "Diastolic Blood Pressure", unit: "mmHg", normalMin: 60, normalMax: 85, criticalLow: 50, criticalHigh: 110, isMandatoryInTriage: true },
  { id: "3", code: "PR", name: "Pulse Heart Rate", unit: "bpm", normalMin: 60, normalMax: 100, criticalLow: 45, criticalHigh: 130, isMandatoryInTriage: true },
  { id: "4", code: "SPO2", name: "Oxygen Saturation (SpO2)", unit: "%", normalMin: 95, normalMax: 100, criticalLow: 90, criticalHigh: 100, isMandatoryInTriage: true },
  { id: "5", code: "TEMP", name: "Body Temperature", unit: "°F", normalMin: 97.5, normalMax: 99.0, criticalLow: 95.0, criticalHigh: 103.0, isMandatoryInTriage: true },
  { id: "6", code: "RR", name: "Respiratory Rate", unit: "breaths/min", normalMin: 12, normalMax: 20, criticalLow: 8, criticalHigh: 30, isMandatoryInTriage: false },
  { id: "7", code: "RBS", name: "Random Blood Sugar", unit: "mg/dL", normalMin: 70, normalMax: 140, criticalLow: 55, criticalHigh: 300, isMandatoryInTriage: false },
];

export default function VitalsMasterPage() {
  const [vitals, setVitals] = useState<VitalParam[]>(VITALS_MASTER);

  const columns = [
    { key: "code", header: "Param Code", render: (r: VitalParam) => <span className="font-mono font-bold text-[var(--primary)]">{r.code}</span> },
    { key: "name", header: "Physiological Vital Sign", render: (r: VitalParam) => <span className="font-semibold text-[var(--foreground)]">{r.name}</span> },
    { key: "unit", header: "Unit of Measurement", render: (r: VitalParam) => <span className="font-mono text-xs">{r.unit}</span> },
    { key: "normal", header: "Standard Physiological Range", render: (r: VitalParam) => <span className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">{r.normalMin} — {r.normalMax} {r.unit}</span> },
    { key: "critical", header: "Critical Trigger Thresholds", render: (r: VitalParam) => <span className="text-xs font-mono text-rose-500 font-semibold">&lt; {r.criticalLow} or &gt; {r.criticalHigh}</span> },
    { 
      key: "isMandatoryInTriage", 
      header: "Triage Protocol", 
      render: (r: VitalParam) => (
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
          r.isMandatoryInTriage ? "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
        }`}>
          {r.isMandatoryInTriage ? "Mandatory in OPD/ER" : "Optional / Bedside"}
        </span>
      )
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        title="Physiological Vitals Master & Panic Triggers"
        description="Standard adult & pediatric physiological ranges, emergency triage protocols, automated NEWS2 score triggers, and telemetry alerts"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings/hospital" },
          { label: "Vitals Master" },
        ]}
        actions={
          <button
            onClick={() => toast.success("New vital parameter definition modal opened")}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Define Vital Sign
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard title="Tracked Vital Signs" value={String(vitals.length)} subtitle="Integrated in EMR flowsheet" icon={Activity} />
        <StatCard title="Mandatory Triage Vitals" value="5 Parameters" subtitle="BP, Pulse, SpO2, Temp, RR" icon={CheckCircle2} />
        <StatCard title="Panic Auto-Escalation" value="Active (NEWS2)" subtitle="Instant alert to on-duty doctor" icon={AlertTriangle} />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">Vitals Parameters & Critical Range Directory</h3>
        <DataTable columns={columns} data={vitals} searchKey="name" searchPlaceholder="Search vital sign..." />
      </div>
    </DashboardShell>
  );
}

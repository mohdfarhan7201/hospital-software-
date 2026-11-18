"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { StatCard } from "@/components/common/StatCard";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { Scissors, Clock, DollarSign, Plus, CheckCircle2 } from "lucide-react";

interface SurgeryMasterItem {
  id: string;
  code: string;
  name: string;
  department: string;
  category: "Major" | "Super Major" | "Intermediate" | "Minor";
  standardDurationMins: number;
  surgeonFee: number;
  otCharges: number;
  anesthesiaType: string;
  status: "Active" | "Inactive";
}

const INITIAL_SURGERIES: SurgeryMasterItem[] = [
  { id: "1", code: "SURG-101", name: "Coronary Artery Bypass Graft (CABG)", department: "Cardiothoracic Surgery", category: "Super Major", standardDurationMins: 240, surgeonFee: 75000, otCharges: 45000, anesthesiaType: "General (GA)", status: "Active" },
  { id: "2", code: "SURG-102", name: "Laparoscopic Cholecystectomy", department: "General Surgery", category: "Major", standardDurationMins: 75, surgeonFee: 25000, otCharges: 18000, anesthesiaType: "General (GA)", status: "Active" },
  { id: "3", code: "SURG-103", name: "Total Knee Replacement (Unilateral)", department: "Orthopedics", category: "Super Major", standardDurationMins: 120, surgeonFee: 45000, otCharges: 30000, anesthesiaType: "Spinal / Epidural", status: "Active" },
  { id: "4", code: "SURG-104", name: "Lower Segment Cesarean Section (LSCS)", department: "Obstetrics", category: "Major", standardDurationMins: 60, surgeonFee: 22000, otCharges: 15000, anesthesiaType: "Spinal Anesthesia", status: "Active" },
  { id: "5", code: "SURG-105", name: "Phacoemulsification with Foldable IOL", department: "Ophthalmology", category: "Intermediate", standardDurationMins: 30, surgeonFee: 14000, otCharges: 8000, anesthesiaType: "Topical / Local", status: "Active" },
  { id: "6", code: "SURG-106", name: "Diagnostic Laparoscopy & Biopsy", department: "Surgical Oncology", category: "Intermediate", standardDurationMins: 45, surgeonFee: 18000, otCharges: 12000, anesthesiaType: "General (GA)", status: "Active" },
];

export default function SurgeriesMasterPage() {
  const [surgeries, setSurgeries] = useState<SurgeryMasterItem[]>(INITIAL_SURGERIES);

  const columns = [
    { key: "code", header: "Surgery Code", render: (r: SurgeryMasterItem) => <span className="font-mono font-bold text-[var(--primary)]">{r.code}</span> },
    { key: "name", header: "Surgical Procedure", render: (r: SurgeryMasterItem) => <span className="font-bold text-[var(--foreground)]">{r.name}</span> },
    { key: "department", header: "Surgical Department" },
    { 
      key: "category", 
      header: "Severity Class",
      render: (r: SurgeryMasterItem) => (
        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
          r.category === "Super Major" ? "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300" :
          r.category === "Major" ? "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300" :
          "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
        }`}>
          {r.category}
        </span>
      )
    },
    { key: "standardDurationMins", header: "Avg OT Time", render: (r: SurgeryMasterItem) => <span className="font-mono text-xs">{r.standardDurationMins} Mins</span> },
    { key: "anesthesiaType", header: "Anesthesia", render: (r: SurgeryMasterItem) => <span className="text-xs">{r.anesthesiaType}</span> },
    { key: "surgeonFee", header: "Surgeon Share", render: (r: SurgeryMasterItem) => <span className="font-mono font-semibold">{formatCurrency(r.surgeonFee)}</span> },
    { key: "otCharges", header: "OT Charges", render: (r: SurgeryMasterItem) => <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(r.otCharges)}</span> },
  ];

  return (
    <DashboardShell>
      <PageHeader
        title="Operation Theatre & Surgery Master"
        description="Catalog of surgical procedures, standard operative durations, OT equipment requirements, anesthesia protocols, and surgeon tariffs"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings/hospital" },
          { label: "Surgery Master" },
        ]}
        actions={
          <button
            onClick={() => toast.success("Surgery definition wizard opened")}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Define Surgery
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <StatCard title="Procedures Configured" value={String(surgeries.length + 84)} subtitle="Across 8 surgical units" icon={Scissors} />
        <StatCard title="Super Major Surgeries" value="34" subtitle="Open heart, Joint, Neuro" icon={Clock} />
        <StatCard title="Daycare Surgical Slates" value="48" subtitle="Discharge within 12h" icon={CheckCircle2} />
        <StatCard title="WHO Surgical Checklist" value="100% Enforced" subtitle="Mandatory pre-op protocol" icon={DollarSign} />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">Surgical Procedure Master Registry</h3>
        <DataTable columns={columns} data={surgeries} searchKey="name" searchPlaceholder="Search procedure name or code..." />
      </div>
    </DashboardShell>
  );
}

"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { toast } from "sonner";
import { FileCode, Plus, Save, Trash2, CheckCircle2 } from "lucide-react";

interface PrescriptionTemplate {
  id: string;
  name: string;
  specialty: string;
  chiefComplaints: string;
  diagnosis: string;
  medicines: { name: string; dosage: string; freq: string; duration: string }[];
  instructions: string;
}

const TEMPLATES: PrescriptionTemplate[] = [
  {
    id: "1",
    name: "Acute Upper Respiratory Tract Infection (URTI)",
    specialty: "General Medicine / ENT",
    chiefComplaints: "Fever, sore throat, nasal congestion, dry cough for 3 days",
    diagnosis: "Acute Viral Pharyngitis / URTI (ICD-10 J06.9)",
    medicines: [
      { name: "Tab Augmentin 625mg", dosage: "1 tab", freq: "Twice daily (BD)", duration: "5 Days" },
      { name: "Tab Dolo 650mg", dosage: "1 tab", freq: "Thrice daily (TDS)", duration: "3 Days" },
      { name: "Syp Ascoril-D", dosage: "10 ml", freq: "Thrice daily (TDS)", duration: "5 Days" },
    ],
    instructions: "Warm saline gargles 3-4 times daily. Steam inhalation twice daily. Adequate oral hydration.",
  },
  {
    id: "2",
    name: "Essential Hypertension Maintenance",
    specialty: "Cardiology",
    chiefComplaints: "Occasional morning headache, routine BP follow-up",
    diagnosis: "Primary Essential Hypertension (ICD-10 I10)",
    medicines: [
      { name: "Tab Telma 40mg (Telmisartan)", dosage: "1 tab", freq: "Once daily morning (OD)", duration: "30 Days" },
      { name: "Tab Amlong 5mg (Amlodipine)", dosage: "1 tab", freq: "Once daily night (HS)", duration: "30 Days" },
    ],
    instructions: "Low salt diet (< 3g/day). Daily 30 min brisk walk. Log daily blood pressure readings.",
  },
  {
    id: "3",
    name: "Type 2 Diabetes Mellitus Protocol",
    specialty: "Endocrinology / Diabetology",
    chiefComplaints: "Fatigue, post-prandial polydipsia, routine HbA1c review",
    diagnosis: "Type 2 Diabetes Mellitus with uncomplicated status (ICD-10 E11.9)",
    medicines: [
      { name: "Tab Glycomet-GP 1 (Metformin + Glimepiride)", dosage: "1 tab", freq: "Before breakfast (OD)", duration: "30 Days" },
      { name: "Tab Januvia 100mg (Sitagliptin)", dosage: "1 tab", freq: "Once daily morning (OD)", duration: "30 Days" },
    ],
    instructions: "Strict diabetic diet plan. Monitor fasting & post-prandial blood sugar weekly. Annual retinal screen.",
  },
];

export default function PrescriptionTemplatesPage() {
  const [templates, setTemplates] = useState<PrescriptionTemplate[]>(TEMPLATES);
  const [selectedId, setSelectedId] = useState<string>("1");

  const activeTemplate = templates.find(t => t.id === selectedId) || templates[0];

  const handleSave = () => {
    toast.success(`Rx template "${activeTemplate.name}" updated successfully`);
  };

  return (
    <DashboardShell>
      <PageHeader
        title="Physician Prescription (Rx) Templates"
        description="Preconfigured clinical disease protocols, standardized pharmacotherapy regimens, dosage instructions, and patient dietary guidelines"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings/hospital" },
          { label: "Prescription Formats" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => toast.success("New Rx protocol modal opened")}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Create Rx Protocol
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Template List */}
        <div className="lg:col-span-1 space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-2">
            Clinical Disease Protocols
          </h3>
          {templates.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => setSelectedId(tpl.id)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                selectedId === tpl.id
                  ? "bg-[var(--card)] border-[var(--primary)] shadow-sm ring-1 ring-[var(--primary)]"
                  : "bg-[var(--card)] border-[var(--border)] hover:border-[var(--primary)] text-[var(--foreground)]"
              }`}
            >
              <div className="font-bold text-xs text-[var(--foreground)]">{tpl.name}</div>
              <div className="text-[11px] text-[var(--muted-foreground)] mt-0.5">{tpl.specialty}</div>
              <div className="text-[10px] text-emerald-600 font-medium mt-1">{tpl.medicines.length} Preconfigured Drugs</div>
            </button>
          ))}
        </div>

        {/* Template Detail Form */}
        <div className="lg:col-span-2 bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-sm space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
            <div>
              <h3 className="text-base font-bold text-[var(--foreground)]">{activeTemplate.name}</h3>
              <p className="text-xs text-[var(--muted-foreground)]">{activeTemplate.specialty}</p>
            </div>
            <button
              onClick={handleSave}
              className="px-3 py-1.5 rounded-lg bg-[var(--primary)] text-white font-semibold flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" /> Save Changes
            </button>
          </div>

          <div>
            <label className="block font-semibold mb-1">Standard Chief Complaints</label>
            <textarea
              rows={2}
              value={activeTemplate.chiefComplaints}
              onChange={(e) => setTemplates(templates.map(t => t.id === selectedId ? { ...t, chiefComplaints: e.target.value } : t))}
              className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Provisional Diagnosis (ICD-10)</label>
            <input
              type="text"
              value={activeTemplate.diagnosis}
              onChange={(e) => setTemplates(templates.map(t => t.id === selectedId ? { ...t, diagnosis: e.target.value } : t))}
              className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] font-medium focus:outline-none"
            />
          </div>

          {/* Preconfigured Drugs */}
          <div>
            <label className="block font-semibold mb-2">Standard Pharmacotherapy Schedule</label>
            <div className="space-y-2">
              {activeTemplate.medicines.map((med, idx) => (
                <div key={idx} className="p-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] flex items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-[var(--foreground)]">{med.name}</span>
                    <span className="text-[var(--muted-foreground)] ml-2">• {med.dosage} • {med.freq}</span>
                  </div>
                  <span className="font-mono font-medium px-2 py-0.5 rounded bg-[var(--card)] border border-[var(--border)]">
                    {med.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Dietary & Lifestyle Advice</label>
            <textarea
              rows={2}
              value={activeTemplate.instructions}
              onChange={(e) => setTemplates(templates.map(t => t.id === selectedId ? { ...t, instructions: e.target.value } : t))}
              className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
            />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

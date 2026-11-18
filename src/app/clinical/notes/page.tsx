"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { mockPatients } from "@/data/mockData";
import { FileText, Save, Sparkles, Check, Clock } from "lucide-react";
import { toast } from "sonner";

export default function ClinicalNotesPage() {
  const [selectedPatientId, setSelectedPatientId] = useState(mockPatients[0].id);
  const [subjective, setSubjective] = useState(
    "Patient presents with episodic mild chest discomfort on moderate exertion since 3 weeks. No radiation to left arm or jaw. No diaphoresis or syncope."
  );
  const [objective, setObjective] = useState(
    "Vitals: BP 134/84 mmHg, HR 72 bpm regular, SpO2 98% room air. Chest: Clear bilaterally, S1/S2 heard normally, no gallop or murmurs. ECG: Normal sinus rhythm with non-specific T wave flattening in V4-V6."
  );
  const [assessment, setAssessment] = useState(
    "Coronary Artery Disease - Class II Angina. Post-PCI (2021). Essential Hypertension under medical control."
  );
  const [plan, setPlan] = useState(
    "1. Continue Tab Telma 40mg OD.\n2. Add Tab Ecospirin 75mg post lunch.\n3. Lipid Profile & hs-Troponin I investigation.\n4. Schedule Stress ECHO next Tuesday."
  );

  const applyTemplate = (type: string) => {
    if (type === "Diabetes") {
      setSubjective("Routine 3-month review for Type 2 Diabetes. Reports polyuria occasionally. Compliance with oral hypoglycemics good.");
      setObjective("Vitals: BP 126/80 mmHg. BMI: 26.2 kg/m². Feet: Peripheral pulses palpable, sensation intact to monofilament test.");
      setAssessment("Type 2 Diabetes Mellitus - Moderate glycemic control. Overweight.");
      setPlan("1. Continue Metformin 500mg BD.\n2. Advised 30 min daily brisk walking.\n3. Check HbA1c, Fasting & Post-prandial blood sugar.");
    } else if (type === "Hypertension") {
      setSubjective("Follow-up for essential hypertension. Denies headache, visual disturbances, or chest discomfort.");
      setObjective("Vitals: Sitting BP 130/82 mmHg, Pulse 74 bpm regular.");
      setAssessment("Essential Hypertension - Controlled.");
      setPlan("Continue current dosage of Telmisartan 40mg once daily in morning. Low sodium DASH diet.");
    }
    toast.info(`Applied ${type} clinical template.`);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("SOAP Clinical progress note saved to electronic medical record (EMR).");
  };

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Clinical Care", href: "/clinical" },
          { label: "Clinical Notes" },
        ]}
        title="Physician SOAP Clinical Notes"
        description="Structured Subjective, Objective, Assessment, and Plan (SOAP) clinical documentation with instant templates."
      />

      <div className="max-w-4xl mx-auto space-y-4">
        {/* Quick Template Chips */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Quick Clinical Templates:
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => applyTemplate("Hypertension")}
              className="px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Hypertension Review
            </button>
            <button
              onClick={() => applyTemplate("Diabetes")}
              className="px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Type 2 Diabetes
            </button>
          </div>
        </div>

        {/* SOAP Form */}
        <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-5 text-xs">
          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
              Select Encounter Patient
            </label>
            <select
              aria-label="Select Encounter Patient"
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
            >
              {mockPatients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.fullName} ({p.uhid}) — {p.age}Y/{p.gender}
                </option>
              ))}
            </select>
          </div>

          {/* S - Subjective */}
          <div>
            <label className="block font-bold text-blue-600 dark:text-blue-400 mb-1">
              [S] Subjective — Chief Complaints & History of Present Illness (HPI)
            </label>
            <textarea
              rows={3}
              value={subjective}
              onChange={(e) => setSubjective(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50"
            />
          </div>

          {/* O - Objective */}
          <div>
            <label className="block font-bold text-emerald-600 dark:text-emerald-400 mb-1">
              [O] Objective — Physical Exam Findings, Vitals & Diagnostic Review
            </label>
            <textarea
              rows={3}
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50"
            />
          </div>

          {/* A - Assessment */}
          <div>
            <label className="block font-bold text-amber-600 dark:text-amber-400 mb-1">
              [A] Assessment — Working Clinical Diagnosis & Differential
            </label>
            <textarea
              rows={2}
              value={assessment}
              onChange={(e) => setAssessment(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50"
            />
          </div>

          {/* P - Plan */}
          <div>
            <label className="block font-bold text-purple-600 dark:text-purple-400 mb-1">
              [P] Plan — Rx Medications, Lab Orders, Patient Counseling & Next Review
            </label>
            <textarea
              rows={4}
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" /> Sign & Save Clinical Note
            </button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}

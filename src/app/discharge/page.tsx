"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockPatients } from "@/data/mockData";
import { FileText, Printer, CheckCircle, ArrowRight, ShieldCheck, User } from "lucide-react";
import { toast } from "sonner";

export default function DischargeManagementPage() {
  const [selectedPatientId, setSelectedPatientId] = useState(mockPatients[0].id);
  const patient = mockPatients.find((p) => p.id === selectedPatientId) || mockPatients[0];

  const [finalDiagnosis, setFinalDiagnosis] = useState(
    "Coronary Artery Disease • Post Successful Percutaneous Coronary Intervention (PCI to LAD) • Grade 1 Hypertension"
  );
  const [hospitalCourse, setHospitalCourse] = useState(
    "Patient admitted via ER with unstable angina. Emergency coronary angiogram revealed 90% stenosis in mid-LAD. Stented with 3.0 x 24mm DES uneventfully. Post-op hemodynamics stable without arrhythmia. Pre-discharge 2D ECHO revealed EF 55%."
  );
  const [dischargeMeds, setDischargeMeds] = useState(
    "1. Tab Ecospirin 75mg OD after lunch\n2. Tab Brilinta 90mg BD x 12 months\n3. Tab Telma 40mg OD morning\n4. Tab Rosuvas 20mg OD night"
  );
  const [followup, setFollowup] = useState("Review in Cardiology OPD on 24-Nov-2026 at 10:00 AM.");

  const handleDischargeSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Discharge summary generated for ${patient.fullName}! Clearance issued.`);
  };

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "IPD & Clinical", href: "/ipd" },
          { label: "Discharge Summary" },
        ]}
        title="Inpatient Discharge Management & Clinical Summary"
        description="Standardized NABH/JCI hospital discharge summary generator with discharge medications, emergency advice, and clearances."
      >
        <Link
          href="/discharge/approvals"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> View Multi-Department Clearances
        </Link>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white"
        >
          <Printer className="w-3.5 h-3.5" /> Print Formal Discharge Card
        </button>
      </PageHeader>

      <form onSubmit={handleDischargeSave} className="max-w-4xl mx-auto space-y-6 text-xs">
        {/* Patient Selection Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Select Inpatient for Discharge
              </label>
              <select
                aria-label="Select Inpatient for Discharge"
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
              >
                {mockPatients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.fullName} ({p.uhid}) — Ward: Floor 2, Room 201
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Admission Date
                </label>
                <input
                  type="date"
                  defaultValue="2026-11-12"
                  className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Discharge Date
                </label>
                <input
                  type="date"
                  defaultValue="2026-11-17"
                  className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Summary Sections */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <div>
            <label className="block font-bold text-blue-600 mb-1">
              Final Clinical Discharge Diagnosis
            </label>
            <input
              type="text"
              value={finalDiagnosis}
              onChange={(e) => setFinalDiagnosis(e.target.value)}
              className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800 font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Hospital Course & Clinical Summary
            </label>
            <textarea
              rows={4}
              value={hospitalCourse}
              onChange={(e) => setHospitalCourse(e.target.value)}
              className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800 leading-relaxed"
            />
          </div>

          <div>
            <label className="block font-bold text-emerald-600 mb-1">
              Discharge Medications & Dosage Schedules
            </label>
            <textarea
              rows={4}
              value={dischargeMeds}
              onChange={(e) => setDischargeMeds(e.target.value)}
              className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800 font-mono"
            />
          </div>

          <div>
            <label className="block font-bold text-purple-600 mb-1">
              Follow-up Review Schedule & Emergency Red-Flag Warnings
            </label>
            <textarea
              rows={2}
              value={followup}
              onChange={(e) => setFollowup(e.target.value)}
              className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 shadow-xs"
            >
              <CheckCircle className="w-4 h-4" /> Finalize Discharge Summary & Archive
            </button>
          </div>
        </div>
      </form>
    </DashboardShell>
  );
}

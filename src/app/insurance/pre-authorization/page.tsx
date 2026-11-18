"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { mockPatients, mockDoctors } from "@/data/mockData";
import { ShieldCheck, Plus, CheckCircle, ArrowLeft, Upload, FileText } from "lucide-react";
import { toast } from "sonner";

export default function PreAuthorizationPage() {
  const router = useRouter();
  const [patientId, setPatientId] = useState(mockPatients[1].id);
  const [insuranceCompany, setInsuranceCompany] = useState("Star Health & Allied Insurance");
  const [tpaName, setTpaName] = useState("MediAssist TPA");
  const [policyNo, setPolicyNo] = useState("SH-MUM-8921-2025");
  const [provisionalDiagnosis, setProvisionalDiagnosis] = useState("High-risk pregnancy monitoring, 35th week with Gestational Hypertension");
  const [estimatedCost, setEstimatedCost] = useState("85000");
  const [admittingDoctor, setAdmittingDoctor] = useState("Dr. Meenakshi Sundaram");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Cashless pre-authorization request submitted to TPA portal. Reference: PREAUTH-2026-9041.");
    router.push("/insurance/claims");
  };

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Insurance", href: "/insurance" },
          { label: "Pre-Authorization" },
        ]}
        title="Cashless Hospital Pre-Authorization Request"
        description="Standardized IRDAI Cashless Pre-Auth Form (Part A Hospital & Part B Patient) electronic transmission."
      >
        <Link
          href="/insurance/claims"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Claims
        </Link>
      </PageHeader>

      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Select Patient</label>
              <select
                aria-label="Select Patient for Pre-Auth"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800 font-semibold"
              >
                {mockPatients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.fullName} ({p.uhid})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Health Insurance Company</label>
              <input
                type="text"
                value={insuranceCompany}
                onChange={(e) => setInsuranceCompany(e.target.value)}
                className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Third-Party Administrator (TPA)</label>
              <input
                type="text"
                value={tpaName}
                onChange={(e) => setTpaName(e.target.value)}
                className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Insurance Policy / Member ID</label>
              <input
                type="text"
                value={policyNo}
                onChange={(e) => setPolicyNo(e.target.value)}
                className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800 font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold mb-1">Admitting Clinical Diagnosis</label>
              <input
                type="text"
                value={provisionalDiagnosis}
                onChange={(e) => setProvisionalDiagnosis(e.target.value)}
                className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Attending Consultant</label>
              <input
                type="text"
                value={admittingDoctor}
                onChange={(e) => setAdmittingDoctor(e.target.value)}
                className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Estimated Inpatient Hospitalization Cost (₹)</label>
              <input
                type="number"
                value={estimatedCost}
                onChange={(e) => setEstimatedCost(e.target.value)}
                className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800 font-mono font-bold"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/20 text-center">
            <Upload className="w-6 h-6 mx-auto mb-1 text-slate-400" />
            <p className="font-semibold text-slate-700 dark:text-slate-300">
              Attached: Insurance Card Scan & Doctor First Consultation Sheet
            </p>
            <span className="text-[10px] text-slate-400">PDF documents attached (2.4 MB)</span>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" /> Transmit Cashless Pre-Auth Request
            </button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { mockPatients, mockLabRequests } from "@/data/mockData";
import { FlaskConical, CheckCircle2, AlertTriangle, Save, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

interface TestParam {
  parameter: string;
  observedValue: string;
  unit: string;
  referenceInterval: string;
  flag: "Normal" | "High" | "Low" | "Panic";
}

export default function LabResultEntryPage() {
  const router = useRouter();
  const [selectedReq, setSelectedReq] = useState(mockLabRequests[0].requestNumber);

  const [parameters, setParameters] = useState<TestParam[]>([
    {
      parameter: "Hemoglobin (Hb)",
      observedValue: "14.2",
      unit: "g/dL",
      referenceInterval: "13.0 - 17.0",
      flag: "Normal",
    },
    {
      parameter: "Total Leukocyte Count (TLC / WBC)",
      observedValue: "19400",
      unit: "/uL",
      referenceInterval: "4000 - 11000",
      flag: "Panic",
    },
    {
      parameter: "Platelet Count",
      observedValue: "245000",
      unit: "/mcL",
      referenceInterval: "150000 - 450000",
      flag: "Normal",
    },
    {
      parameter: "Serum Creatinine",
      observedValue: "1.1",
      unit: "mg/dL",
      referenceInterval: "0.7 - 1.3",
      flag: "Normal",
    },
    {
      parameter: "Blood Urea Nitrogen (BUN)",
      observedValue: "18",
      unit: "mg/dL",
      referenceInterval: "7 - 20",
      flag: "Normal",
    },
  ]);

  const handleAuthorize = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Pathology results authorized by Consultant Pathologist. Report released to EMR!");
    router.push("/laboratory/reports");
  };

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Laboratory", href: "/laboratory" },
          { label: "Result Entry" },
        ]}
        title="Pathology Diagnostic Result Entry & Medical Verification"
        description="Analyzer LIMS data interface, biological flag triggers (High/Low/Critical), and pathologist digital authorization."
      />

      <form onSubmit={handleAuthorize} className="max-w-4xl mx-auto space-y-6 text-xs">
        {/* Requisition Header */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Active Accession ID</span>
            <p className="font-mono font-bold text-base text-blue-600 mt-0.5">{selectedReq}</p>
            <p className="text-slate-600 dark:text-slate-300 font-semibold mt-1">
              Patient: Mohammed Irfan Siddiqui (NU-2026-890234) • Bed ICU-01
            </p>
          </div>
          <span className="px-3 py-1 rounded-md text-xs font-bold bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-900 self-start sm:self-center">
            Critical Value Trigger Active
          </span>
        </div>

        {/* Results Entry Grid */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-500 font-semibold uppercase">
              <tr>
                <th className="p-3">Biomarker Parameter</th>
                <th className="p-3 w-32">Observed Value</th>
                <th className="p-3">Units</th>
                <th className="p-3">Reference Interval</th>
                <th className="p-3 text-right">Flag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {parameters.map((param, idx) => (
                <tr key={idx} className={param.flag === "Panic" ? "bg-rose-50/40 dark:bg-rose-950/20" : ""}>
                  <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">
                    {param.parameter}
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={param.observedValue}
                      onChange={(e) => {
                        const updated = [...parameters];
                        updated[idx].observedValue = e.target.value;
                        setParameters(updated);
                      }}
                      className={`w-full p-1.5 rounded-lg border font-mono font-bold text-center ${
                        param.flag === "Panic"
                          ? "border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200"
                          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                      }`}
                    />
                  </td>
                  <td className="p-3 font-mono text-slate-500">{param.unit}</td>
                  <td className="p-3 font-mono text-slate-600 dark:text-slate-400">
                    {param.referenceInterval}
                  </td>
                  <td className="p-3 text-right">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        param.flag === "Panic"
                          ? "bg-rose-600 text-white animate-pulse"
                          : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      }`}
                    >
                      {param.flag}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-slate-500">
              Verified by: <strong>Dr. Pooja V. Patil (MD Pathology)</strong>
            </span>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 shadow-xs"
            >
              <ShieldCheck className="w-4 h-4" /> Authorize & Release Report to EMR
            </button>
          </div>
        </div>
      </form>
    </DashboardShell>
  );
}

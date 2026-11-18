"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { mockPatients } from "@/data/mockData";
import { Printer, ShieldCheck, Download, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function LabReportsViewPage() {
  const patient = mockPatients[0]; // Rajesh Sharma

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Laboratory", href: "/laboratory" },
          { label: "Diagnostic Report" },
        ]}
        title="Formal Diagnostic Laboratory Investigation Report"
        description="NABL-formatted electronic diagnostic laboratory report with digital cryptographic signature and QR code."
      >
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white shadow-xs"
        >
          <Printer className="w-3.5 h-3.5" /> Print Laboratory Report (PDF)
        </button>
      </PageHeader>

      {/* Formal Diagnostic Report Container */}
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl text-xs space-y-6">
        {/* Lab Header */}
        <div className="flex items-start justify-between border-b pb-4 border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-blue-600">NuvertOS Central Laboratory</h1>
            <p className="text-slate-500 font-medium">Department of Clinical Biochemistry & Hematology</p>
            <p className="text-slate-400 text-[10px]">NABL Certificate No: MC-4190 • ISO 15189:2022 Certified</p>
          </div>
          <div className="text-right font-mono">
            <p className="font-bold text-sm text-slate-800 dark:text-slate-200">LR-2026-00412</p>
            <p className="text-slate-400 text-[10px]">Sample Collected: 17-Nov-2026 09:30 AM</p>
            <p className="text-slate-400 text-[10px]">Reported: 17-Nov-2026 11:45 AM</p>
          </div>
        </div>

        {/* Patient Demographics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold">Patient Name</span>
            <p className="font-bold text-slate-900 dark:text-slate-100">{patient.fullName}</p>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold">UHID</span>
            <p className="font-mono font-bold text-blue-600">{patient.uhid}</p>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold">Age / Gender</span>
            <p className="font-semibold text-slate-800 dark:text-slate-200">{patient.age} Y / {patient.gender}</p>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold">Referred By</span>
            <p className="font-semibold text-slate-800 dark:text-slate-200">Dr. Arvind Subramaniam</p>
          </div>
        </div>

        {/* Test Result Section */}
        <div className="space-y-4">
          <h2 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 border-b pb-1">
            CARDIAC BIOMARKERS & METABOLIC PANEL
          </h2>

          <table className="w-full text-left">
            <thead className="border-b text-slate-500 font-semibold text-[11px]">
              <tr>
                <th className="py-2">Test Investigation</th>
                <th className="py-2 text-center">Observed Result</th>
                <th className="py-2">Units</th>
                <th className="py-2">Biological Reference Interval</th>
                <th className="py-2 text-right">Methodology</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-2.5 font-bold">High Sensitivity Cardiac Troponin-I</td>
                <td className="py-2.5 text-center font-mono font-bold text-emerald-600">0.012</td>
                <td className="py-2.5 font-mono text-slate-500">ng/mL</td>
                <td className="py-2.5 font-mono">&lt; 0.04 (Normal)</td>
                <td className="py-2.5 text-right text-slate-400">ECLIA (Cobas 6000)</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold">Total Cholesterol</td>
                <td className="py-2.5 text-center font-mono font-bold text-slate-900 dark:text-slate-100">168</td>
                <td className="py-2.5 font-mono text-slate-500">mg/dL</td>
                <td className="py-2.5 font-mono">&lt; 200 (Desirable)</td>
                <td className="py-2.5 text-right text-slate-400">Enzymatic CHOD-PAP</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold">HDL Cholesterol (Good)</td>
                <td className="py-2.5 text-center font-mono font-bold text-slate-900 dark:text-slate-100">48</td>
                <td className="py-2.5 font-mono text-slate-500">mg/dL</td>
                <td className="py-2.5 font-mono">&gt; 40</td>
                <td className="py-2.5 text-right text-slate-400">Direct Clearance</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold">LDL Cholesterol (Calculated)</td>
                <td className="py-2.5 text-center font-mono font-bold text-slate-900 dark:text-slate-100">88</td>
                <td className="py-2.5 font-mono text-slate-500">mg/dL</td>
                <td className="py-2.5 font-mono">&lt; 100 (Optimal in CAD)</td>
                <td className="py-2.5 text-right text-slate-400">Friedewald Equation</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold">Triglycerides</td>
                <td className="py-2.5 text-center font-mono font-bold text-slate-900 dark:text-slate-100">142</td>
                <td className="py-2.5 font-mono text-slate-500">mg/dL</td>
                <td className="py-2.5 font-mono">&lt; 150 (Normal)</td>
                <td className="py-2.5 text-right text-slate-400">GPO-PAP Method</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pathologist Sign-off Block */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex items-end justify-between">
          <div className="text-[10px] text-slate-400">
            <p>*** End of Diagnostic Laboratory Report ***</p>
            <p className="mt-0.5">This report is released with 256-bit PKI digital signature.</p>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[10px] text-emerald-600 mb-1 font-bold">
              DIGITALLY VERIFIED
            </span>
            <p className="font-bold text-slate-900 dark:text-slate-100 text-xs">Dr. Pooja V. Patil</p>
            <p className="text-[10px] text-slate-500">MBBS, MD (Pathology) • Reg: MMC-2012/04/1029</p>
            <p className="text-[10px] text-slate-400">Senior Consultant Pathologist</p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockPatients } from "@/data/mockData";
import { CheckCircle2, Clock, AlertCircle, ShieldCheck, Check, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface DischargeClearance {
  id: string;
  patientName: string;
  uhid: string;
  wardBed: string;
  doctorApproved: boolean;
  nurseApproved: boolean;
  pharmacyApproved: boolean;
  billingApproved: boolean;
}

const initialClearances: DischargeClearance[] = [
  {
    id: "clr-1",
    patientName: "Rajesh V. Sharma",
    uhid: "NU-2026-401928",
    wardBed: "Male Medical Ward (GW-101)",
    doctorApproved: true,
    nurseApproved: true,
    pharmacyApproved: true,
    billingApproved: true,
  },
  {
    id: "clr-2",
    patientName: "Ananya S. Sen",
    uhid: "NU-2026-512093",
    wardBed: "Maternity Suite (PVT-301)",
    doctorApproved: true,
    nurseApproved: true,
    pharmacyApproved: false,
    billingApproved: false,
  },
  {
    id: "clr-3",
    patientName: "Mohammed Irfan Siddiqui",
    uhid: "NU-2026-890234",
    wardBed: "Coronary ICU (ICU-01)",
    doctorApproved: false,
    nurseApproved: false,
    pharmacyApproved: false,
    billingApproved: false,
  },
];

export default function DischargeApprovalsPage() {
  const [clearances, setClearances] = useState<DischargeClearance[]>(initialClearances);

  const toggleApproval = (
    id: string,
    field: "doctorApproved" | "nurseApproved" | "pharmacyApproved" | "billingApproved"
  ) => {
    setClearances((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: !c[field] } : c))
    );
    toast.success("Department clearance status updated.");
  };

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "IPD & Clinical", href: "/ipd" },
          { label: "Discharge Approvals" },
        ]}
        title="Multi-Department Discharge Clearance Matrix"
        description="Verify clearances across Attending Physician, Inpatient Nursing, Pharmacy returns, and Billing desk before gate pass issuance."
      />

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {clearances.map((c) => {
            const allApproved =
              c.doctorApproved && c.nurseApproved && c.pharmacyApproved && c.billingApproved;

            return (
              <div
                key={c.id}
                className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {c.patientName}
                    </h3>
                    <span className="font-mono text-slate-400">({c.uhid})</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800">
                      {c.wardBed}
                    </span>
                  </div>
                  <p className="text-slate-500 mt-1">
                    Gate Pass Status:{" "}
                    {allApproved ? (
                      <strong className="text-emerald-600">Cleared for Physical Discharge</strong>
                    ) : (
                      <strong className="text-amber-600">Clearances in Progress</strong>
                    )}
                  </p>
                </div>

                {/* 4 Clearance Badges/Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => toggleApproval(c.id, "doctorApproved")}
                    className={`px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 transition-colors ${
                      c.doctorApproved
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800"
                        : "bg-slate-50 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 hover:border-slate-300"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Doctor Summary
                  </button>

                  <button
                    onClick={() => toggleApproval(c.id, "nurseApproved")}
                    className={`px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 transition-colors ${
                      c.nurseApproved
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800"
                        : "bg-slate-50 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 hover:border-slate-300"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Nursing Handover
                  </button>

                  <button
                    onClick={() => toggleApproval(c.id, "pharmacyApproved")}
                    className={`px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 transition-colors ${
                      c.pharmacyApproved
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800"
                        : "bg-slate-50 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 hover:border-slate-300"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Pharmacy Returns
                  </button>

                  <button
                    onClick={() => toggleApproval(c.id, "billingApproved")}
                    className={`px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 transition-colors ${
                      c.billingApproved
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800"
                        : "bg-slate-50 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 hover:border-slate-300"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Accounts / Zero Due
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardShell>
  );
}

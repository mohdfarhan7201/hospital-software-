"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockPatients } from "@/data/mockData";
import { FileCheck, Shield, Check, Plus, Eye, PenTool } from "lucide-react";
import { toast } from "sonner";

interface ConsentRecord {
  id: string;
  patientName: string;
  uhid: string;
  consentType: string;
  doctorName: string;
  witnessName: string;
  dateSigned: string;
  status: "Digitally Signed" | "Pending Signature" | "Witness Awaiting";
}

const initialConsents: ConsentRecord[] = [
  {
    id: "con-1",
    patientName: "Mohammed Irfan Siddiqui",
    uhid: "NU-2026-890234",
    consentType: "Informed Consent for Emergency Laparoscopic Appendectomy & General Anesthesia",
    doctorName: "Dr. Amitesh Mukherjee",
    witnessName: "Farida Siddiqui (Spouse)",
    dateSigned: "17 Nov 2026",
    status: "Digitally Signed",
  },
  {
    id: "con-2",
    patientName: "Vikramaditya Patel",
    uhid: "NU-2026-621874",
    consentType: "Total Knee Arthroplasty (Joint Replacement) Surgical Consent & Blood Transfusion",
    doctorName: "Dr. Sandeep Chawla",
    witnessName: "Chirag Patel (Son)",
    dateSigned: "16 Nov 2026",
    status: "Digitally Signed",
  },
  {
    id: "con-3",
    patientName: "Ananya S. Sen",
    uhid: "NU-2026-512093",
    consentType: "High-Risk Pregnancy Inpatient Admission & Emergency Cesarean Section Protocol",
    doctorName: "Dr. Meenakshi Sundaram",
    witnessName: "Subhash Sen (Father)",
    dateSigned: "17 Nov 2026",
    status: "Pending Signature",
  },
];

export default function ConsentManagementPage() {
  const [consents, setConsents] = useState<ConsentRecord[]>(initialConsents);
  const [showSignModal, setShowSignModal] = useState(false);
  const [activeConsent, setActiveConsent] = useState<ConsentRecord | null>(null);

  const handleSign = (id: string) => {
    setConsents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "Digitally Signed" } : c))
    );
    setShowSignModal(false);
    toast.success("Informed Consent digitally signed with Aadhaar e-Sign verification.");
  };

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Clinical Care", href: "/clinical" },
          { label: "Consent Management" },
        ]}
        title="Informed Surgical & Clinical Consent Management"
        description="Medico-legal informed consent documentation, high-risk surgical approvals, and digital signatures."
      />

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {consents.map((item) => (
            <div
              key={item.id}
              className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {item.patientName}
                  </h3>
                  <span className="font-mono text-slate-400">({item.uhid})</span>
                  <StatusBadge status={item.status} />
                </div>
                <p className="font-semibold text-blue-600 dark:text-blue-400 mt-1">
                  {item.consentType}
                </p>
                <p className="text-slate-500 mt-0.5">
                  Primary Physician: {item.doctorName} • Witness: {item.witnessName} • Date:{" "}
                  {item.dateSigned}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                {item.status === "Pending Signature" ? (
                  <button
                    onClick={() => {
                      setActiveConsent(item);
                      setShowSignModal(true);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1.5 shadow-2xs"
                  >
                    <PenTool className="w-3.5 h-3.5" /> e-Sign Document
                  </button>
                ) : (
                  <button
                    onClick={() => toast.info("Opening cryptographically signed PDF document...")}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 font-semibold flex items-center gap-1.5"
                  >
                    <FileCheck className="w-3.5 h-3.5 text-emerald-600" /> View Signed Form
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showSignModal && activeConsent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl text-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Execute Medico-Legal Informed Consent
            </h3>
            <p className="text-slate-500">
              I, or my legal guardian, hereby acknowledge that the planned clinical procedure, risks,
              benefits, and alternative therapies have been explained in full.
            </p>

            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
              <p className="font-bold">{activeConsent.consentType}</p>
              <p className="text-slate-500 mt-1">Patient: {activeConsent.patientName} ({activeConsent.uhid})</p>
            </div>

            <div className="h-28 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-400">
              <div className="text-center">
                <PenTool className="w-6 h-6 mx-auto mb-1 opacity-50" />
                <span>Patient / Guardian Signature Pad Active</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowSignModal(false)}
                className="px-4 py-2 rounded-lg border font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSign(activeConsent.id)}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold"
              >
                Confirm & Seal Digitally
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

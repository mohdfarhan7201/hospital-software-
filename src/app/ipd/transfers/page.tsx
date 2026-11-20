"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { mockBeds } from "@/data/mockData";
import { ArrowLeftRight, BedDouble, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function PatientTransfersPage() {
  const router = useRouter();
  const occupiedBeds = mockBeds.filter((b) => b.patient);
  const availableBeds = mockBeds.filter((b) => b.status === "Available");

  const [fromBedId, setFromBedId] = useState(occupiedBeds[0]?.id || "bed-101");
  const [toBedId, setToBedId] = useState(availableBeds[0]?.id || "bed-103");
  const [transferReason, setTransferReason] = useState("Step-down from ICU to General Ward post-stabilization");

  const fromBed = mockBeds.find((b) => b.id === fromBedId);
  const toBed = mockBeds.find((b) => b.id === toBedId);

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const sourceBed = mockBeds.find((b) => b.id === fromBedId);
    const targetBed = mockBeds.find((b) => b.id === toBedId);
    if (sourceBed && targetBed && sourceBed.patient) {
      targetBed.patient = { ...sourceBed.patient };
      targetBed.status = "Occupied";
      sourceBed.patient = undefined;
      sourceBed.status = "Cleaning";
    }
    toast.success(`Patient successfully transferred to ${toBed?.bedNumber || "target bed"}! Previous bed moved to Cleaning.`);
    router.push("/wards/roster");
  };

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "IPD", href: "/ipd" },
          { label: "Patient Transfers" },
        ]}
        title="Inter-Ward & Bed Transfer Protocol"
        description="Transfer admitted inpatients between critical care ICUs, step-down HDUs, and private suites."
      />

      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
        <form onSubmit={handleTransfer} className="space-y-5 text-xs">
          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
              Current Inpatient (Source Bed)
            </label>
            <select
              aria-label="Current Inpatient Source Bed"
              value={fromBedId}
              onChange={(e) => setFromBedId(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
            >
              {occupiedBeds.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.patient?.name} ({b.patient?.uhid}) — Current: {b.bedNumber} ({b.wardName})
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center my-2">
            <div className="p-2.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 border border-blue-200 dark:border-blue-800">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
              Destination Target Bed
            </label>
            <select
              aria-label="Destination Target Bed"
              value={toBedId}
              onChange={(e) => setToBedId(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold text-emerald-600 dark:text-emerald-400"
            >
              {availableBeds.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.bedNumber} — {b.wardName} ({b.type} • ₹{b.ratePerDay}/d)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
              Clinical Transfer Indication / Doctor's Order
            </label>
            <textarea
              rows={3}
              required
              value={transferReason}
              onChange={(e) => setTransferReason(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> Execute Transfer & Notify Nursing
            </button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}

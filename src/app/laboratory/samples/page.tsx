"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { QrCode, CheckCircle2, FlaskConical, Printer } from "lucide-react";
import { toast } from "sonner";

interface SampleItem {
  id: string;
  barcode: string;
  patientName: string;
  uhid: string;
  testName: string;
  vacutainerColor: string;
  collectionTime: string;
  status: "Collected & In Transit" | "Awaiting Phlebotomy" | "Received at Bench";
}

const mockSamples: SampleItem[] = [
  {
    id: "smp-1",
    barcode: "BC-9812401",
    patientName: "Rajesh V. Sharma",
    uhid: "NU-2026-401928",
    testName: "High Sensitivity Cardiac Troponin-I (hs-cTnI)",
    vacutainerColor: "Gold Top (SST / Gel Separator)",
    collectionTime: "09:45 AM",
    status: "Received at Bench",
  },
  {
    id: "smp-2",
    barcode: "BC-9812402",
    patientName: "Mohammed Irfan Siddiqui",
    uhid: "NU-2026-890234",
    testName: "Complete Blood Count (CBC) with ESR",
    vacutainerColor: "Lavender Top (K2-EDTA)",
    collectionTime: "10:15 AM",
    status: "Collected & In Transit",
  },
  {
    id: "smp-3",
    barcode: "BC-9812403",
    patientName: "Ananya S. Sen",
    uhid: "NU-2026-512093",
    testName: "Comprehensive Kidney Function Test (KFT)",
    vacutainerColor: "Red Top (Plain Serum)",
    collectionTime: "Pending Phlebotomy",
    status: "Awaiting Phlebotomy",
  },
];

export default function PhlebotomySamplesPage() {
  const [samples, setSamples] = useState<SampleItem[]>(mockSamples);

  const handleCollect = (id: string, barcode: string) => {
    setSamples((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: "Collected & In Transit", collectionTime: "Just Now" } : s
      )
    );
    toast.success(`Sample barcode ${barcode} collected and dispatched to laboratory bench.`);
  };

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Laboratory", href: "/laboratory" },
          { label: "Phlebotomy Samples" },
        ]}
        title="Phlebotomy Specimen Collection & Barcode Tracking"
        description="Vacuum tube barcode label generation, specimen accessioning, and temperature-controlled sample logistics."
      />

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4 text-xs">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {samples.map((s) => (
            <div
              key={s.id}
              className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-blue-600 flex items-center gap-1">
                    <QrCode className="w-3.5 h-3.5" /> {s.barcode}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {s.patientName}
                  </h3>
                  <span className="font-mono text-slate-400">({s.uhid})</span>
                  <StatusBadge status={s.status} />
                </div>
                <p className="font-semibold text-blue-600 dark:text-blue-400 mt-1">
                  Investigation: {s.testName}
                </p>
                <p className="text-slate-500 mt-0.5">
                  Vacutainer Specimen: <strong>{s.vacutainerColor}</strong> • Time: {s.collectionTime}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                {s.status === "Awaiting Phlebotomy" ? (
                  <button
                    onClick={() => handleCollect(s.id, s.barcode)}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1 shadow-2xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Collect Sample
                  </button>
                ) : (
                  <button
                    onClick={() => toast.info(`Printing 2D barcode labels for ${s.barcode}...`)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 font-semibold flex items-center gap-1"
                  >
                    <Printer className="w-3.5 h-3.5" /> Reprint Barcode
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}

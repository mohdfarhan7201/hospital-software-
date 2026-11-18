"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Droplet, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

interface BloodReq {
  id: string;
  requisitionNo: string;
  patientName: string;
  uhid: string;
  wardLocation: string;
  bloodGroup: string;
  component: string;
  unitsRequested: number;
  priority: "Emergency STAT" | "Elective OT Reservation";
  crossmatchStatus: "Cross-Matched Compatible" | "Sample Received for Grouping" | "Issued to OT";
}

const mockRequests: BloodReq[] = [
  {
    id: "br-1",
    requisitionNo: "BREQ-2026-041",
    patientName: "Mohammed Irfan Siddiqui",
    uhid: "NU-2026-890234",
    wardLocation: "OT Suite 02 (Emergency Surgery)",
    bloodGroup: "O-",
    component: "Packed Red Blood Cells (PRBC)",
    unitsRequested: 2,
    priority: "Emergency STAT",
    crossmatchStatus: "Cross-Matched Compatible",
  },
  {
    id: "br-2",
    requisitionNo: "BREQ-2026-042",
    patientName: "Vikramaditya Patel",
    uhid: "NU-2026-621874",
    wardLocation: "OT Suite 01 (Ortho TKR)",
    bloodGroup: "A+",
    component: "Packed Red Blood Cells (PRBC)",
    unitsRequested: 1,
    priority: "Elective OT Reservation",
    crossmatchStatus: "Issued to OT",
  },
  {
    id: "br-3",
    requisitionNo: "BREQ-2026-043",
    patientName: "Ananya S. Sen",
    uhid: "NU-2026-512093",
    wardLocation: "Floor 4, Maternity Suite",
    bloodGroup: "O+",
    component: "Fresh Frozen Plasma (FFP)",
    unitsRequested: 2,
    priority: "Elective OT Reservation",
    crossmatchStatus: "Sample Received for Grouping",
  },
];

export default function BloodRequestsPage() {
  const [requests, setRequests] = useState<BloodReq[]>(mockRequests);

  const handleIssue = (id: string, reqNo: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, crossmatchStatus: "Issued to OT" } : r))
    );
    toast.success(`Blood units for ${reqNo} cross-matched and dispatched in temperature shipper!`);
  };

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Blood Bank", href: "/blood-bank" },
          { label: "Transfusion Requests" },
        ]}
        title="Blood Transfusion Requisitions & Cross-Matching Issue"
        description="Verify major & minor cross-match compatibility, Coombs test verification, and cold-shipper dispatch to OT/ICU."
      />

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4 text-xs">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {requests.map((r) => (
            <div
              key={r.id}
              className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-rose-600">{r.requisitionNo}</span>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {r.patientName}
                  </h3>
                  <span className="font-mono text-slate-400">({r.uhid})</span>
                  <span className="font-mono font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                    Group: {r.bloodGroup}
                  </span>
                  <StatusBadge status={r.crossmatchStatus} />
                </div>
                <p className="text-slate-500 mt-1">
                  Required At: <strong>{r.wardLocation}</strong> • Component:{" "}
                  <strong>
                    {r.component} ({r.unitsRequested} Units)
                  </strong>
                </p>
                <span
                  className={`inline-block mt-1 px-2 py-0.2 rounded text-[10px] font-bold ${
                    r.priority.includes("STAT")
                      ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400 animate-pulse"
                      : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  {r.priority}
                </span>
              </div>

              <div className="self-end md:self-center">
                {r.crossmatchStatus === "Cross-Matched Compatible" ? (
                  <button
                    onClick={() => handleIssue(r.id, r.requisitionNo)}
                    className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold flex items-center gap-1.5 shadow-2xs"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Issue Blood Units
                  </button>
                ) : r.crossmatchStatus === "Issued to OT" ? (
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Dispatched to Theatre
                  </span>
                ) : (
                  <button
                    onClick={() => toast.info("Grouping and cross-match incubations underway.")}
                    className="px-3 py-1.5 rounded-lg border font-semibold"
                  >
                    Incubation in Progress
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

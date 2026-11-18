"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockPatients, mockDoctors } from "@/data/mockData";
import {
  Users,
  Clock,
  ArrowRight,
  Activity,
  CheckCircle,
  Stethoscope,
  Pill,
  FlaskConical,
  Plus,
} from "lucide-react";
import { toast } from "sonner";

interface FlowPatient {
  id: string;
  name: string;
  uhid: string;
  token: string;
  doctor: string;
  stage: "Checked-In" | "Vitals Taken" | "In Consultation" | "Investigation" | "Completed";
  waitMins: number;
}

const initialFlow: FlowPatient[] = [
  {
    id: "fp-1",
    name: "Rajesh V. Sharma",
    uhid: "NU-2026-401928",
    token: "TK-101",
    doctor: "Dr. Arvind Subramaniam",
    stage: "In Consultation",
    waitMins: 12,
  },
  {
    id: "fp-2",
    name: "Vikramaditya Patel",
    uhid: "NU-2026-621874",
    token: "TK-102",
    doctor: "Dr. Sandeep Chawla",
    stage: "Vitals Taken",
    waitMins: 18,
  },
  {
    id: "fp-3",
    name: "Priya S. Iyer",
    uhid: "NU-2026-789012",
    token: "TK-103",
    doctor: "Dr. Radhika Kulkarni",
    stage: "Checked-In",
    waitMins: 5,
  },
  {
    id: "fp-4",
    name: "Mohammed Irfan Siddiqui",
    uhid: "NU-2026-890234",
    token: "TK-104",
    doctor: "Dr. Amitesh Mukherjee",
    stage: "Investigation",
    waitMins: 24,
  },
  {
    id: "fp-5",
    name: "Ananya S. Sen",
    uhid: "NU-2026-512093",
    token: "TK-105",
    doctor: "Dr. Meenakshi Sundaram",
    stage: "Completed",
    waitMins: 45,
  },
];

export default function OPDFlowboardPage() {
  const [patients, setPatients] = useState<FlowPatient[]>(initialFlow);

  const stages: FlowPatient["stage"][] = [
    "Checked-In",
    "Vitals Taken",
    "In Consultation",
    "Investigation",
    "Completed",
  ];

  const handleAdvance = (patientId: string, currentStage: FlowPatient["stage"]) => {
    const nextStageMap: Record<FlowPatient["stage"], FlowPatient["stage"]> = {
      "Checked-In": "Vitals Taken",
      "Vitals Taken": "In Consultation",
      "In Consultation": "Investigation",
      Investigation: "Completed",
      Completed: "Completed",
    };

    const next = nextStageMap[currentStage];
    setPatients((prev) =>
      prev.map((p) => (p.id === patientId ? { ...p, stage: next } : p))
    );
    toast.success(`Patient moved to ${next}`);
  };

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Clinical Care", href: "/clinical" },
          { label: "OPD Flowboard" },
        ]}
        title="Outpatient (OPD) Flowboard & Visual Kanban"
        description="Real-time multi-stage patient tracking from arrival check-in to vitals, doctor consult, and pharmacy dispense."
      >
        <Link
          href="/queue"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
        >
          Queue Caller
        </Link>
        <Link
          href="/patients/new"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white"
        >
          <Plus className="w-4 h-4" /> New Patient
        </Link>
      </PageHeader>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto min-h-[550px] pb-4">
        {stages.map((stage) => {
          const list = patients.filter((p) => p.stage === stage);
          return (
            <div
              key={stage}
              className="bg-slate-100/70 dark:bg-slate-900/50 rounded-xl p-3 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between"
            >
              <div>
                {/* Stage Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
                    {stage}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white dark:bg-slate-800 text-blue-600 border border-slate-200 dark:border-slate-700">
                    {list.length}
                  </span>
                </div>

                {/* Cards List */}
                <div className="space-y-3">
                  {list.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-xs transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xs text-blue-600">
                          {item.token}
                        </span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {item.waitMins}m
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <img
                          src={
                            mockPatients.find((p) => p.uhid === item.uhid)?.photoUrl ||
                            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                          }
                          alt={item.name}
                          className="w-7 h-7 rounded-full object-cover ring-1 ring-[var(--primary)]/20 shrink-0"
                        />
                        <div className="min-w-0">
                          <Link
                            href={`/patients/${item.uhid}`}
                            className="font-bold text-xs text-[var(--foreground)] hover:text-[var(--primary)] truncate block"
                          >
                            {item.name}
                          </Link>
                          <p className="text-[10px] text-[var(--muted-foreground)] font-mono">{item.uhid}</p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
                        <p className="truncate">{item.doctor}</p>
                      </div>

                      {stage !== "Completed" && (
                        <button
                          onClick={() => handleAdvance(item.id, item.stage)}
                          className="w-full mt-2 py-1 text-[11px] font-semibold rounded bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1 transition-colors"
                        >
                          Advance Next <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {list.length === 0 && (
                <div className="text-center py-12 text-slate-400 text-xs italic">
                  No patients in this stage
                </div>
              )}
            </div>
          );
        })}
      </div>
    </DashboardShell>
  );
}

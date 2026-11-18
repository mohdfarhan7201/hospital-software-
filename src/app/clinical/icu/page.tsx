"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import {
  Heart,
  Activity,
  Wind,
  Droplet,
  Zap,
  AlertTriangle,
  Clock,
  Save,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function ICUChartingPage() {
  const [selectedBed, setSelectedBed] = useState("ICU-01");

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Clinical Care", href: "/clinical" },
          { label: "ICU Charting" },
        ]}
        title="Intensive Care Unit (ICU) Telemetry & Flowsheet"
        description="Continuous hemodynamic monitoring, mechanical ventilator parameters, infusion pumps, and arterial blood gas (ABG) charts."
      >
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold">Active Critical Bed:</span>
          <select
            aria-label="Active Critical Bed"
            value={selectedBed}
            onChange={(e) => setSelectedBed(e.target.value)}
            className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
          >
            <option value="ICU-01">Bed ICU-01 (Mohammed Irfan - CCU)</option>
            <option value="ICU-02">Bed ICU-02 (Post-CABG Monitor)</option>
            <option value="HDU-01">Bed HDU-01 (Neuro Trauma Observation)</option>
          </select>
        </div>
      </PageHeader>

      {/* Bedside Telemetry Monitor Grid */}
      <div className="bg-slate-950 text-white rounded-2xl p-6 border border-slate-800 shadow-2xl mb-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
            <h2 className="font-mono text-sm font-bold tracking-widest text-emerald-400">
              PHILIPS INTELLIVUE MP70 • BEDSIDE TELEMETRY LIVE FEED
            </h2>
          </div>
          <span className="font-mono text-xs text-slate-400">Rhythm: Sinus Tachycardia (102 bpm)</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {/* ECG / Heart Rate */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
              ECG / HR (BPM)
            </span>
            <p className="text-4xl font-mono font-extrabold text-emerald-400 animate-pulse">102</p>
            <span className="text-[10px] text-slate-500">ST: +0.04 mV</span>
          </div>

          {/* Arterial Line BP */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-rose-400 font-bold uppercase">
              ART BP (mmHg)
            </span>
            <p className="text-4xl font-mono font-extrabold text-rose-400">118/74</p>
            <span className="text-[10px] text-slate-500">MAP: 88 mmHg</span>
          </div>

          {/* SpO2 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
              PLETH / SpO2
            </span>
            <p className="text-4xl font-mono font-extrabold text-cyan-400">98%</p>
            <span className="text-[10px] text-slate-500">High Perfusion Index</span>
          </div>

          {/* EtCO2 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
              EtCO2 (mmHg)
            </span>
            <p className="text-4xl font-mono font-extrabold text-amber-400">38</p>
            <span className="text-[10px] text-slate-500">RR: 18 /min</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ventilator Settings */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Wind className="w-4 h-4 text-blue-600" />
              Mechanical Ventilator Settings (Dräger Evita)
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              Mode: SIMV-PC
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
              <p className="text-slate-400">FiO2</p>
              <p className="font-mono font-bold text-base text-slate-800 dark:text-slate-200 mt-1">
                40%
              </p>
            </div>
            <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
              <p className="text-slate-400">PEEP</p>
              <p className="font-mono font-bold text-base text-slate-800 dark:text-slate-200 mt-1">
                6 cmH2O
              </p>
            </div>
            <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
              <p className="text-slate-400">Tidal Volume</p>
              <p className="font-mono font-bold text-base text-slate-800 dark:text-slate-200 mt-1">
                440 mL
              </p>
            </div>
            <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
              <p className="text-slate-400">Set Rate</p>
              <p className="font-mono font-bold text-base text-slate-800 dark:text-slate-200 mt-1">
                14 bpm
              </p>
            </div>
          </div>
        </div>

        {/* Infusion Pumps */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              Active Syringe Infusion Pumps
            </h3>
            <span className="text-xs text-slate-400">3 Pumps Running</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100">
                  Noradrenaline (4mg in 50ml NS)
                </p>
                <p className="text-slate-500">Vasopressor support • Titrated to MAP &gt; 65</p>
              </div>
              <span className="font-mono font-bold text-sm text-blue-600">4.5 mL/hr</span>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100">
                  Fentanyl Infusion (1000mcg in 50ml)
                </p>
                <p className="text-slate-500">Analgesia & sedation for intubated patient</p>
              </div>
              <span className="font-mono font-bold text-sm text-emerald-600">2.0 mL/hr</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

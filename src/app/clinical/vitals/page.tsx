"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { mockPatients } from "@/data/mockData";
import { Activity, Heart, Thermometer, Wind, Scale, Check, Save } from "lucide-react";
import { toast } from "sonner";

export default function VitalsRecordingPage() {
  const [selectedPatientId, setSelectedPatientId] = useState(mockPatients[0].id);
  const [systolic, setSystolic] = useState("128");
  const [diastolic, setDiastolic] = useState("82");
  const [pulse, setPulse] = useState("74");
  const [temperature, setTemperature] = useState("98.4");
  const [spO2, setSpO2] = useState("99");
  const [respiration, setRespiration] = useState("16");
  const [heightCm, setHeightCm] = useState("172");
  const [weightKg, setWeightKg] = useState("70");

  const heightM = parseFloat(heightCm) / 100;
  const bmi =
    heightM > 0 && parseFloat(weightKg) > 0
      ? (parseFloat(weightKg) / (heightM * heightM)).toFixed(1)
      : "23.7";

  const handleSaveVitals = (e: React.FormEvent) => {
    e.preventDefault();
    const p = mockPatients.find((pt) => pt.id === selectedPatientId);
    toast.success(`Vitals recorded successfully for ${p?.fullName || "patient"}! Added to clinical chart.`);
  };

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Clinical Care", href: "/clinical" },
          { label: "Vitals Recording" },
        ]}
        title="Nursing Vitals & Triage Station"
        description="Record comprehensive physiological biomarkers, continuous oxygen saturation, and body mass index."
      />

      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
        <form onSubmit={handleSaveVitals} className="space-y-6 text-xs">
          {/* Patient Select */}
          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
              Select Patient
            </label>
            <select
              aria-label="Select Patient"
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium"
            >
              {mockPatients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.fullName} ({p.uhid}) — {p.age}Y/{p.gender} — {p.status}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Blood Pressure */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                <Heart className="w-4 h-4 text-rose-600" />
                <span>Blood Pressure (mmHg)</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Systolic"
                  value={systolic}
                  onChange={(e) => setSystolic(e.target.value)}
                  className="w-full p-2 rounded-lg border bg-white dark:bg-slate-900 text-center font-mono font-bold"
                />
                <span className="font-bold text-slate-400">/</span>
                <input
                  type="number"
                  placeholder="Diastolic"
                  value={diastolic}
                  onChange={(e) => setDiastolic(e.target.value)}
                  className="w-full p-2 rounded-lg border bg-white dark:bg-slate-900 text-center font-mono font-bold"
                />
              </div>
              <span className="text-[10px] text-slate-400">Target: 120/80 mmHg</span>
            </div>

            {/* Pulse */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                <Activity className="w-4 h-4 text-blue-600" />
                <span>Heart / Pulse Rate</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={pulse}
                  onChange={(e) => setPulse(e.target.value)}
                  className="w-full p-2 rounded-lg border bg-white dark:bg-slate-900 font-mono font-bold text-center"
                />
                <span className="absolute right-3 top-2 text-slate-400 text-[10px]">bpm</span>
              </div>
              <span className="text-[10px] text-slate-400">Normal: 60 - 100 bpm</span>
            </div>

            {/* SpO2 */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                <Wind className="w-4 h-4 text-emerald-600" />
                <span>Oxygen Saturation (SpO2)</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={spO2}
                  onChange={(e) => setSpO2(e.target.value)}
                  className="w-full p-2 rounded-lg border bg-white dark:bg-slate-900 font-mono font-bold text-center text-emerald-600"
                />
                <span className="absolute right-3 top-2 text-slate-400 text-[10px]">%</span>
              </div>
              <span className="text-[10px] text-slate-400">Normal: 95% - 100%</span>
            </div>

            {/* Temperature */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                <Thermometer className="w-4 h-4 text-amber-600" />
                <span>Body Temperature</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="w-full p-2 rounded-lg border bg-white dark:bg-slate-900 font-mono font-bold text-center"
                />
                <span className="absolute right-3 top-2 text-slate-400 text-[10px]">°F</span>
              </div>
              <span className="text-[10px] text-slate-400">Normal: 98.6°F</span>
            </div>

            {/* Height & Weight */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                <Scale className="w-4 h-4 text-purple-600" />
                <span>Height & Weight</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Height cm"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  className="p-2 rounded-lg border bg-white dark:bg-slate-900 text-center font-mono text-xs"
                />
                <input
                  type="number"
                  placeholder="Weight kg"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="p-2 rounded-lg border bg-white dark:bg-slate-900 text-center font-mono text-xs"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1">
                <span>Calculated BMI:</span>
                <span className="font-bold text-blue-600 font-mono">{bmi} kg/m²</span>
              </div>
            </div>

            {/* Respiratory Rate */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                <Activity className="w-4 h-4 text-indigo-600" />
                <span>Respiration Rate</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={respiration}
                  onChange={(e) => setRespiration(e.target.value)}
                  className="w-full p-2 rounded-lg border bg-white dark:bg-slate-900 font-mono font-bold text-center"
                />
                <span className="absolute right-3 top-2 text-slate-400 text-[10px]">/ min</span>
              </div>
              <span className="text-[10px] text-slate-400">Normal: 12 - 20 breaths/min</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 shadow-xs"
            >
              <Save className="w-4 h-4" /> Save Vitals to EMR
            </button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}

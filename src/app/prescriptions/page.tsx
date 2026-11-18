"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { mockPatients, mockDoctors, mockMedicines } from "@/data/mockData";
import {
  Pill,
  Plus,
  Trash2,
  Printer,
  Save,
  AlertTriangle,
  CheckCircle,
  FileText,
  User,
} from "lucide-react";
import { toast } from "sonner";

interface RxItem {
  id: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  durationDays: number;
  instructions: string;
}

export default function PrescriptionManagementPage() {
  const [selectedPatientId, setSelectedPatientId] = useState(mockPatients[0].id);
  const [selectedDoctorId, setSelectedDoctorId] = useState(mockDoctors[0].id);
  const [diagnosis, setDiagnosis] = useState("Coronary Artery Disease • Hypertension Grade 1");
  const [rxItems, setRxItems] = useState<RxItem[]>([
    {
      id: "rx-1",
      medicineName: "Augmentin 625 Duo (Amoxicillin + Clavulanic)",
      dosage: "625 mg",
      frequency: "1 - 0 - 1 (Twice Daily)",
      durationDays: 5,
      instructions: "After meals with full glass of water",
    },
    {
      id: "rx-2",
      medicineName: "Telma 40 (Telmisartan 40mg)",
      dosage: "40 mg",
      frequency: "1 - 0 - 0 (Morning)",
      durationDays: 30,
      instructions: "Before breakfast daily",
    },
  ]);

  const patient = mockPatients.find((p) => p.id === selectedPatientId) || mockPatients[0];
  const doctor = mockDoctors.find((d) => d.id === selectedDoctorId) || mockDoctors[0];

  const handleAddRow = () => {
    const newItem: RxItem = {
      id: `rx-${Date.now()}`,
      medicineName: "Pantocid 40 IV (Pantoprazole 40mg)",
      dosage: "40 mg",
      frequency: "1 - 0 - 0",
      durationDays: 7,
      instructions: "Early morning empty stomach",
    };
    setRxItems([...rxItems, newItem]);
    toast.info("Added drug line item to prescription.");
  };

  const handleRemoveRow = (id: string) => {
    setRxItems(rxItems.filter((i) => i.id !== id));
  };

  const handleSavePrescription = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`E-Prescription Rx successfully issued for ${patient.fullName}! Sent to Pharmacy.`);
  };

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Clinical Care", href: "/clinical" },
          { label: "Prescription Management" },
        ]}
        title="Physician E-Prescribing & Medication Management"
        description="Comprehensive e-prescriptions with automatic drug-allergy alerts, dosage frequency schedules, and instant pharmacy routing."
      >
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
        >
          <Printer className="w-3.5 h-3.5" /> Print Rx Preview
        </button>
      </PageHeader>

      <form onSubmit={handleSavePrescription} className="space-y-6">
        {/* Prescription Header / Patient Details */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Patient (UHID / Name)
              </label>
              <select
                aria-label="Select Patient for Prescription"
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
              >
                {mockPatients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.fullName} ({p.uhid}) — {p.age}Y/{p.gender}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Prescribing Consultant
              </label>
              <select
                aria-label="Prescribing Consultant"
                value={selectedDoctorId}
                onChange={(e) => setSelectedDoctorId(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
              >
                {mockDoctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.specialization})
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Clinical Diagnosis & Indications
              </label>
              <input
                type="text"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>

          {/* Allergy Alert Ribbon */}
          {patient.medicalSummary?.allergies && (
            <div className="p-3 rounded-lg border border-rose-200 dark:border-rose-900 bg-rose-50/60 dark:bg-rose-950/30 flex items-center gap-2 text-rose-700 dark:text-rose-400">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>
                Safety Warning: Patient has documented allergies to:{" "}
                <strong>{patient.medicalSummary.allergies.join(", ")}</strong>. Avoid penicillin derivatives.
              </span>
            </div>
          )}
        </div>

        {/* Medication Table Items */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Pill className="w-4 h-4 text-blue-600" />
              Rx Medication Items
            </h2>
            <button
              type="button"
              onClick={handleAddRow}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 hover:bg-blue-100"
            >
              <Plus className="w-3.5 h-3.5" /> Add Drug Row
            </button>
          </div>

          <div className="space-y-3">
            {rxItems.map((item, idx) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/20 grid grid-cols-1 md:grid-cols-12 gap-3 text-xs items-center"
              >
                <div className="md:col-span-4">
                  <label className="block text-[11px] font-semibold text-slate-500 mb-0.5">
                    Medicine Name & Generic
                  </label>
                  <select
                    aria-label="Medicine Name"
                    value={item.medicineName}
                    onChange={(e) => {
                      const updated = [...rxItems];
                      updated[idx].medicineName = e.target.value;
                      setRxItems(updated);
                    }}
                    className="w-full p-2 rounded-lg border bg-white dark:bg-slate-900"
                  >
                    {mockMedicines.map((m) => (
                      <option key={m.id} value={`${m.name} (${m.genericName})`}>
                        {m.name} ({m.dosageForm}) - {m.genericName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-500 mb-0.5">
                    Dosage
                  </label>
                  <input
                    type="text"
                    value={item.dosage}
                    onChange={(e) => {
                      const updated = [...rxItems];
                      updated[idx].dosage = e.target.value;
                      setRxItems(updated);
                    }}
                    className="w-full p-2 rounded-lg border bg-white dark:bg-slate-900"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-500 mb-0.5">
                    Frequency
                  </label>
                  <select
                    aria-label="Frequency"
                    value={item.frequency}
                    onChange={(e) => {
                      const updated = [...rxItems];
                      updated[idx].frequency = e.target.value;
                      setRxItems(updated);
                    }}
                    className="w-full p-2 rounded-lg border bg-white dark:bg-slate-900"
                  >
                    <option>1 - 0 - 1 (Twice Daily)</option>
                    <option>1 - 0 - 0 (Morning)</option>
                    <option>0 - 0 - 1 (Night)</option>
                    <option>1 - 1 - 1 (Thrice Daily)</option>
                    <option>SOS (As Needed)</option>
                  </select>
                </div>

                <div className="md:col-span-1">
                  <label className="block text-[11px] font-semibold text-slate-500 mb-0.5">
                    Days
                  </label>
                  <input
                    type="number"
                    value={item.durationDays}
                    onChange={(e) => {
                      const updated = [...rxItems];
                      updated[idx].durationDays = parseInt(e.target.value) || 1;
                      setRxItems(updated);
                    }}
                    className="w-full p-2 rounded-lg border bg-white dark:bg-slate-900 text-center font-mono"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-500 mb-0.5">
                    Instructions
                  </label>
                  <input
                    type="text"
                    value={item.instructions}
                    onChange={(e) => {
                      const updated = [...rxItems];
                      updated[idx].instructions = e.target.value;
                      setRxItems(updated);
                    }}
                    className="w-full p-2 rounded-lg border bg-white dark:bg-slate-900"
                  />
                </div>

                <div className="md:col-span-1 flex justify-center pt-4 md:pt-0">
                  <button
                    type="button"
                    onClick={() => handleRemoveRow(item.id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 shadow-xs"
            >
              <Save className="w-4 h-4" /> Sign & Dispatch E-Prescription
            </button>
          </div>
        </div>
      </form>
    </DashboardShell>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { mockPatients, mockDoctors, mockBeds } from "@/data/mockData";
import { BedDouble, User, Shield, CreditCard, ArrowLeft, Save, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function NewIPDAdmissionPage() {
  const router = useRouter();
  const availableBeds = mockBeds.filter((b) => b.status === "Available");

  const [patientId, setPatientId] = useState(mockPatients[0].id);
  const [doctorId, setDoctorId] = useState(mockDoctors[0].id);
  const [bedId, setBedId] = useState(availableBeds[0]?.id || "bed-103");
  const [admissionType, setAdmissionType] = useState("Planned Elective");
  const [diagnosis, setDiagnosis] = useState("Acute Coronary Syndrome for Coronary Angiogram & Intervention");
  const [isMLC, setIsMLC] = useState(false);
  const [advanceDeposit, setAdvanceDeposit] = useState("25000");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const patient = mockPatients.find((p) => p.id === patientId) || mockPatients[0];
    const bed = mockBeds.find((b) => b.id === bedId);
    if (bed) {
      bed.status = "Occupied";
      bed.patient = {
        uhid: patient.uhid,
        name: patient.fullName,
        admissionDate: "Today, Just Now",
        doctorName: mockDoctors.find((d) => d.id === doctorId)?.name || "Dr. Arvind Subramaniam",
        diagnosis,
      };
    }

    toast.success(`Patient ${patient.fullName} admitted successfully to Bed ${bed?.bedNumber || "ICU-03"}!`);
    router.push("/wards/roster");
  };

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "IPD", href: "/ipd" },
          { label: "New Admission" },
        ]}
        title="Formal Inpatient (IPD) Admission Protocol"
        description="Allocate inpatient bed, record primary admitting diagnosis, assign specialist, and process admission deposit."
      >
        <Link
          href="/ipd"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Census
        </Link>
      </PageHeader>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6 text-xs">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <User className="w-4 h-4 text-blue-600" />
            1. Inpatient Identity & Consultant Assignment
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Select Registered Patient (UHID)
              </label>
              <select
                aria-label="Select Patient"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
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
                Admitting Consultant
              </label>
              <select
                aria-label="Admitting Consultant"
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
              >
                {mockDoctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.department})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Admission Category
              </label>
              <select
                aria-label="Admission Category"
                value={admissionType}
                onChange={(e) => setAdmissionType(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              >
                <option>Emergency Admission (ER Triage)</option>
                <option>Planned Elective Surgery</option>
                <option>Day Care Procedure (Dialysis / Chemo)</option>
                <option>Inter-Hospital Transfer</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Medico-Legal Case (MLC)?
              </label>
              <div className="flex items-center gap-4 mt-2">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="mlc"
                    checked={!isMLC}
                    onChange={() => setIsMLC(false)}
                    className="text-blue-600"
                  />
                  <span>No (Normal Medical)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="mlc"
                    checked={isMLC}
                    onChange={() => setIsMLC(true)}
                    className="text-rose-600"
                  />
                  <span className="font-semibold text-rose-600">Yes (MLC Intimation)</span>
                </label>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Provisional / Admitting Diagnosis
              </label>
              <input
                type="text"
                required
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Ward & Bed Allocation */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <BedDouble className="w-4 h-4 text-emerald-600" />
            2. Inpatient Ward & Bed Allocation
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Select Available Bed
              </label>
              <select
                aria-label="Select Available Bed"
                value={bedId}
                onChange={(e) => setBedId(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
              >
                {availableBeds.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.bedNumber} — {b.wardName} ({b.type} • ₹{b.ratePerDay}/day)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Initial Admission Deposit (₹ INR)
              </label>
              <input
                type="number"
                value={advanceDeposit}
                onChange={(e) => setAdvanceDeposit(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Link
            href="/ipd"
            className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 shadow-sm"
          >
            <Save className="w-4 h-4" /> Confirm Admission & Generate Bed Card
          </button>
        </div>
      </form>
    </DashboardShell>
  );
}

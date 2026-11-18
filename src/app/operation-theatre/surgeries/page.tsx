"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockSurgeries, mockPatients, mockDoctors } from "@/data/mockData";
import { SurgeryRecord } from "@/types";
import { Scissors, Plus, Play, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function SurgerySchedulingPage() {
  const [surgeries, setSurgeries] = useState<SurgeryRecord[]>(mockSurgeries);
  const [showAddModal, setShowAddModal] = useState(false);

  const [patientId, setPatientId] = useState(mockPatients[0].id);
  const [surgeonId, setSurgeonId] = useState(mockDoctors[2].id);
  const [surgeryName, setSurgeryName] = useState("Coronary Artery Bypass Graft (CABG)");
  const [otRoom, setOtRoom] = useState("OT Suite 02 (Major Laparoscopy)");
  const [scheduledTime, setScheduledTime] = useState("Tomorrow 09:00 AM");

  const handleBookSurgery = (e: React.FormEvent) => {
    e.preventDefault();
    const patient = mockPatients.find((p) => p.id === patientId) || mockPatients[0];
    const surgeon = mockDoctors.find((d) => d.id === surgeonId) || mockDoctors[2];

    const newSurgery: SurgeryRecord = {
      id: `surg-${Date.now()}`,
      surgeryNumber: `OT-2026-${Math.floor(100 + Math.random() * 900)}`,
      uhid: patient.uhid,
      patientName: patient.fullName,
      surgeryName,
      otRoom,
      leadSurgeon: surgeon.name,
      anesthetist: "Dr. Neha Agarwal",
      scheduledTime,
      durationMins: 90,
      status: "Scheduled",
    };

    setSurgeries([newSurgery, ...surgeries]);
    setShowAddModal(false);
    toast.success(`Surgery ${newSurgery.surgeryNumber} scheduled in ${otRoom}!`);
  };

  const columns: Column<SurgeryRecord>[] = [
    {
      header: "OT ID",
      accessorKey: "surgeryNumber",
      cell: (s) => <span className="font-mono font-bold text-rose-600">{s.surgeryNumber}</span>,
    },
    {
      header: "Patient",
      accessorKey: "patientName",
      cell: (s) => (
        <div>
          <p className="font-bold">{s.patientName}</p>
          <p className="text-[11px] text-slate-400 font-mono">{s.uhid}</p>
        </div>
      ),
    },
    {
      header: "Procedure Name",
      accessorKey: "surgeryName",
      cell: (s) => <span className="font-semibold text-slate-800 dark:text-slate-200">{s.surgeryName}</span>,
    },
    {
      header: "OT Room",
      accessorKey: "otRoom",
    },
    {
      header: "Lead Surgeon",
      accessorKey: "leadSurgeon",
    },
    {
      header: "Schedule",
      accessorKey: "scheduledTime",
      cell: (s) => `${s.scheduledTime} (${s.durationMins}m)`,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (s) => <StatusBadge status={s.status} />,
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Operation Theatre", href: "/operation-theatre" },
          { label: "Surgeries Directory" },
        ]}
        title="Operation Theatre Surgery Scheduling & Log"
        description="Master roster of elective and emergency surgical procedures, lead surgeons, anesthetists, and theater bookings."
      >
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white"
        >
          <Plus className="w-4 h-4" /> Schedule New Surgery
        </button>
      </PageHeader>

      <DataTable
        data={surgeries}
        columns={columns}
        searchPlaceholder="Search surgeries by procedure, surgeon, patient..."
        searchFields={["surgeryName", "patientName", "leadSurgeon", "surgeryNumber", "otRoom"]}
      />

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl text-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Schedule New Surgical Procedure
            </h3>

            <form onSubmit={handleBookSurgery} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Select Patient</label>
                <select
                  aria-label="Select Patient for Surgery"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800"
                >
                  {mockPatients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.fullName} ({p.uhid})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Procedure Name</label>
                <input
                  type="text"
                  required
                  value={surgeryName}
                  onChange={(e) => setSurgeryName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Lead Surgeon</label>
                  <select
                    aria-label="Lead Surgeon"
                    value={surgeonId}
                    onChange={(e) => setSurgeonId(e.target.value)}
                    className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800"
                  >
                    {mockDoctors.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.department})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">OT Suite</label>
                  <select
                    aria-label="OT Suite"
                    value={otRoom}
                    onChange={(e) => setOtRoom(e.target.value)}
                    className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800"
                  >
                    <option>OT Suite 01 (Laminar Flow Ortho)</option>
                    <option>OT Suite 02 (Major Laparoscopy)</option>
                    <option>OT Suite 03 (Neurosurgery)</option>
                    <option>Minor OT (Daycare)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Scheduled Date & Time</label>
                <input
                  type="text"
                  required
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold"
                >
                  Confirm Surgery Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

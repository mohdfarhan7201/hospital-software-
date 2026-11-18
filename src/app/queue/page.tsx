"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockAppointments, mockDoctors } from "@/data/mockData";
import { Appointment } from "@/types";
import {
  Clock,
  Play,
  CheckCircle,
  SkipForward,
  UserCheck,
  AlertTriangle,
  Volume2,
  Filter,
} from "lucide-react";
import { toast } from "sonner";

export default function QueueManagementPage() {
  const [queue, setQueue] = useState<Appointment[]>(mockAppointments);
  const [departmentFilter, setDepartmentFilter] = useState("ALL");

  const filteredQueue = queue.filter(
    (item) => departmentFilter === "ALL" || item.department === departmentFilter
  );

  const handleCallNext = (id: string, name: string, token: string) => {
    setQueue((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: "In Consultation" } : q))
    );
    toast.success(`Calling Token ${token}: ${name} to consultation room!`, {
      icon: <Volume2 className="w-4 h-4 text-blue-500" />,
    });
  };

  const handleComplete = (id: string, name: string) => {
    setQueue((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: "Completed" } : q))
    );
    toast.success(`Consultation completed for ${name}`);
  };

  const handleSkip = (id: string, token: string) => {
    setQueue((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: "Unconfirmed" } : q))
    );
    toast.warning(`Token ${token} skipped and moved to delayed list.`);
  };

  const activeConsultation = queue.find((q) => q.status === "In Consultation");
  const waitingPatients = filteredQueue.filter(
    (q) => q.status === "Checked In" || q.status === "Confirmed"
  );

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Front Desk", href: "/patients" },
          { label: "Queue Management" },
        ]}
        title="Real-Time OPD Token & Queue Console"
        description="Live doctor consultation token caller, patient wait-time monitoring, and OPD flow dispatch."
      >
        <div className="flex items-center gap-2">
          <select
            aria-label="Filter Queue by Department"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
          >
            <option value="ALL">All Clinical OPDs</option>
            <option value="Cardiology">Cardiology OPD</option>
            <option value="Orthopaedics">Orthopaedics OPD</option>
            <option value="Neurology">Neurology OPD</option>
            <option value="General Surgery">Surgery OPD</option>
            <option value="Obstetrics & Gynaecology">OBG OPD</option>
          </select>
        </div>
      </PageHeader>

      {/* Live Now Banner */}
      {activeConsultation && (
        <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-mono font-extrabold text-2xl border border-white/30">
              {activeConsultation.tokenNumber}
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded text-blue-100">
                Currently In Consultation Room
              </span>
              <h2 className="text-xl font-bold mt-1">{activeConsultation.patientName}</h2>
              <p className="text-xs text-blue-100">
                Consultant: {activeConsultation.doctorName} • {activeConsultation.department}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-center">
            <button
              onClick={() =>
                handleComplete(activeConsultation.id, activeConsultation.patientName)
              }
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" /> Mark Consultation Done
            </button>
          </div>
        </div>
      )}

      {/* Queue List Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            Active Tokens in Waiting Room ({waitingPatients.length} Waiting)
          </h2>
          <span className="text-xs text-slate-400">Live Auto-Refresh: Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-semibold uppercase">
              <tr>
                <th className="p-3">Token No.</th>
                <th className="p-3">Patient Name</th>
                <th className="p-3">Doctor</th>
                <th className="p-3">Department</th>
                <th className="p-3">Wait Time</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Queue Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredQueue.map((item) => (
                <tr
                  key={item.id}
                  className={`hover:bg-blue-50/30 dark:hover:bg-blue-950/20 transition-colors ${
                    item.status === "In Consultation" ? "bg-blue-50/50 dark:bg-blue-950/30" : ""
                  }`}
                >
                  <td className="p-3 font-mono font-bold text-sm text-blue-600">
                    {item.tokenNumber}
                  </td>
                  <td className="p-3">
                    <p className="font-bold text-slate-900 dark:text-slate-100">
                      {item.patientName}
                    </p>
                    <p className="text-[11px] text-slate-400">{item.uhid}</p>
                  </td>
                  <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                    {item.doctorName}
                  </td>
                  <td className="p-3">{item.department}</td>
                  <td className="p-3 font-mono text-slate-600 dark:text-slate-400">
                    {item.queueWaitingMins || 15} mins
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.priority === "Urgent"
                          ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400"
                          : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                    >
                      {item.priority}
                    </span>
                  </td>
                  <td className="p-3">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {item.status !== "In Consultation" && item.status !== "Completed" && (
                        <button
                          onClick={() =>
                            handleCallNext(item.id, item.patientName, item.tokenNumber)
                          }
                          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 shadow-2xs"
                        >
                          <Play className="w-3 h-3" /> Call Token
                        </button>
                      )}
                      {item.status === "In Consultation" && (
                        <button
                          onClick={() => handleComplete(item.id, item.patientName)}
                          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          Finish
                        </button>
                      )}
                      <button
                        onClick={() => handleSkip(item.id, item.tokenNumber)}
                        className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Skip Token"
                      >
                        <SkipForward className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}

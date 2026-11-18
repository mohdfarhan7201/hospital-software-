"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { mockDoctors, mockAppointments } from "@/data/mockData";
import { ChevronLeft, ChevronRight, Calendar as CalIcon, Clock, User, Plus } from "lucide-react";
import { toast } from "sonner";

export default function AppointmentCalendarPage() {
  const [selectedDoctor, setSelectedDoctor] = useState("ALL");
  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];
  const days = ["Mon (17 Nov)", "Tue (18 Nov)", "Wed (19 Nov)", "Thu (20 Nov)", "Fri (21 Nov)"];

  const handleSlotClick = (day: string, slot: string) => {
    toast.info(`Slot selected: ${day} at ${slot}. Ready for booking.`);
  };

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Appointments", href: "/appointments" },
          { label: "Calendar Grid" },
        ]}
        title="Outpatient Appointment Calendar"
        description="Weekly schedule grid by doctor, consultation room, and available appointment slots."
      >
        <Link
          href="/appointments"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors"
        >
          Table View
        </Link>
        <select
          aria-label="Filter by Doctor"
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
        >
          <option value="ALL">All Consulting Doctors</option>
          {mockDoctors.map((doc) => (
            <option key={doc.id} value={doc.name}>
              {doc.name} ({doc.department})
            </option>
          ))}
        </select>
      </PageHeader>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        {/* Calendar Header Controls */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <CalIcon className="w-4 h-4 text-blue-600" />
              17 Nov – 21 Nov 2026
            </h2>
            <span className="text-xs text-slate-500 font-medium">Active Week</span>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-50" title="Previous Week">
              <ChevronLeft className="w-4 h-4 text-slate-500" />
            </button>
            <button className="px-3 py-1 text-xs font-semibold rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-50">
              Today
            </button>
            <button className="p-1.5 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-50" title="Next Week">
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
              <tr>
                <th className="p-3 w-28 text-center">Time Slot</th>
                {days.map((day) => (
                  <th key={day} className="p-3 border-l border-slate-200 dark:border-slate-800 font-bold">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {timeSlots.map((slot, sIdx) => (
                <tr key={slot} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-3 text-center font-mono font-medium text-slate-400 bg-slate-50/30 dark:bg-slate-800/20">
                    {slot}
                  </td>
                  {days.map((day, dIdx) => {
                    const hasMockApt = (sIdx + dIdx) % 3 === 0;
                    return (
                      <td
                        key={day}
                        onClick={() => handleSlotClick(day, slot)}
                        className="p-2 border-l border-slate-100 dark:border-slate-800 cursor-pointer align-top h-20 transition-colors hover:bg-blue-50/40 dark:hover:bg-blue-950/20"
                      >
                        {hasMockApt ? (
                          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-900 text-[11px] shadow-2xs">
                            <p className="font-bold text-blue-900 dark:text-blue-200 truncate">
                              {mockAppointments[(sIdx + dIdx) % mockAppointments.length].patientName}
                            </p>
                            <p className="text-blue-700 dark:text-blue-400 truncate">
                              {mockAppointments[(sIdx + dIdx) % mockAppointments.length].doctorName}
                            </p>
                            <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[10px] font-bold bg-blue-200/60 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                              {mockAppointments[(sIdx + dIdx) % mockAppointments.length].tokenNumber}
                            </span>
                          </div>
                        ) : (
                          <div className="h-full flex items-center justify-center opacity-0 hover:opacity-100 text-slate-400 text-[10px]">
                            + Available
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}

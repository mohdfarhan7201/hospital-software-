"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { mockSurgeries } from "@/data/mockData";
import { Scissors, Calendar, Clock, ArrowRight } from "lucide-react";

export default function OTCalendarPage() {
  const rooms = ["OT Suite 01 (Ortho)", "OT Suite 02 (Laparoscopy)", "OT Suite 03 (Neuro)"];
  const slots = ["08:00 AM", "10:30 AM", "01:30 PM", "04:00 PM"];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Operation Theatre", href: "/operation-theatre" },
          { label: "OT Calendar" },
        ]}
        title="Operation Theatre (OT) Surgical Scheduling Calendar"
        description="Weekly theatre allocation, surgeon bookings, sterilization intervals, and PACU bed coordination."
      >
        <Link
          href="/operation-theatre/surgeries"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white"
        >
          <Scissors className="w-3.5 h-3.5" /> Book Surgery
        </Link>
      </PageHeader>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-rose-600" />
            Theatre Schedule — 17 Nov 2026
          </h2>
          <span className="text-xs text-slate-500">3 Major Operating Theatres Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
              <tr>
                <th className="p-3 w-32">Time Slot</th>
                {rooms.map((r) => (
                  <th key={r} className="p-3 border-l border-slate-200 dark:border-slate-800 font-bold">
                    {r}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {slots.map((slot, sIdx) => (
                <tr key={slot}>
                  <td className="p-3 font-mono font-medium text-slate-400 bg-slate-50/40 dark:bg-slate-800/20">
                    {slot}
                  </td>
                  {rooms.map((room, rIdx) => {
                    const hasSurgery = (sIdx + rIdx) % 2 === 0;
                    return (
                      <td
                        key={room}
                        className="p-3 border-l border-slate-100 dark:border-slate-800 align-top h-24"
                      >
                        {hasSurgery ? (
                          <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-xs space-y-1">
                            <p className="font-bold text-rose-900 dark:text-rose-200 truncate">
                              {mockSurgeries[sIdx % mockSurgeries.length]?.surgeryName}
                            </p>
                            <p className="text-[11px] text-slate-600 dark:text-slate-300 truncate">
                              Patient: {mockSurgeries[sIdx % mockSurgeries.length]?.patientName}
                            </p>
                            <p className="text-[10px] text-rose-700 dark:text-rose-400 font-medium truncate">
                              Surgeon: {mockSurgeries[sIdx % mockSurgeries.length]?.leadSurgeon}
                            </p>
                          </div>
                        ) : (
                          <div className="h-full flex items-center justify-center text-slate-400 text-[11px] italic">
                            Theatre Available / Sanitized
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

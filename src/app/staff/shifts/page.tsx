"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { exportToCSV } from "@/lib/utils";
import { toast } from "sonner";
import { Clock, Calendar, Users, Moon, Sun, Sunrise, Plus, Download } from "lucide-react";

interface ShiftSlot {
  id: string;
  department: string;
  morningStaff: string[];
  eveningStaff: string[];
  nightStaff: string[];
}

const ROSTER_DATA: ShiftSlot[] = [
  { id: "1", department: "ICU & Critical Care", morningStaff: ["Dr. Arvind Swamy", "Nurse Priya Thomas", "Nurse Sarah"], eveningStaff: ["Dr. Sneha Roy", "Nurse Bincy Mathew"], nightStaff: ["Dr. Farhan Qureshi", "Nurse Kavita Sharma"] },
  { id: "2", department: "Emergency & Trauma", morningStaff: ["Dr. Vikram Seth", "Nurse Reena Kurien"], eveningStaff: ["Dr. Amit Shah", "Nurse Divya"], nightStaff: ["Dr. Rajiv Menon", "Nurse Joseph"] },
  { id: "3", department: "General Ward (Male & Female)", morningStaff: ["Dr. Sneha Roy", "Nurse Anjali Nair"], eveningStaff: ["Dr. Rajesh", "Nurse Sarita"], nightStaff: ["Dr. Meenakshi", "Nurse Mary"] },
  { id: "4", department: "Operation Theatre (OT)", morningStaff: ["Dr. Vikram Seth", "Dr. Meenakshi", "Nurse Bincy"], eveningStaff: ["Dr. Arvind Swamy", "Nurse Anjali"], nightStaff: ["On-Call Surgical Team"] },
  { id: "5", department: "Pharmacy (24x7)", morningStaff: ["Sunil Narang", "Deepak"], eveningStaff: ["Ravi Kumar"], nightStaff: ["Mohit Verma"] },
];

export default function ShiftsRosterPage() {
  const [data, setData] = useState(ROSTER_DATA);

  return (
    <DashboardShell>
      <PageHeader
        title="Hospital Shift Schedule & Duty Roster"
        description="24x7 departmental rotational shifts, on-call physician rosters, emergency coverages, and handover handshakes"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Staff", href: "/staff" },
          { label: "Shift Roster" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                exportToCSV(data, "shift-duty-roster.csv");
                toast.success("Shift roster schedule exported");
              }}
              className="px-3 py-2 text-xs font-semibold rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--background)] flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Export Roster
            </button>
            <button
              onClick={() => toast.success("New weekly shift template generated")}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Generate Next Week
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/40">
            <Sunrise className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-[var(--muted-foreground)]">Morning Shift</div>
            <div className="text-lg font-bold text-[var(--foreground)]">07:00 — 15:30</div>
            <div className="text-xs text-emerald-600 font-medium">48 Healthcare Staff Active</div>
          </div>
        </div>

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40">
            <Sun className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-[var(--muted-foreground)]">Evening Shift</div>
            <div className="text-lg font-bold text-[var(--foreground)]">15:00 — 23:00</div>
            <div className="text-xs text-blue-600 font-medium">34 Healthcare Staff Scheduled</div>
          </div>
        </div>

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/40">
            <Moon className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-[var(--muted-foreground)]">Night Emergency Shift</div>
            <div className="text-lg font-bold text-[var(--foreground)]">22:30 — 07:30</div>
            <div className="text-xs text-purple-600 font-medium">22 Healthcare Staff Scheduled</div>
          </div>
        </div>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
        <h3 className="text-base font-bold text-[var(--foreground)] mb-1">Weekly Departmental Shift Matrix</h3>
        <p className="text-xs text-[var(--muted-foreground)] mb-4">Assigned physicians and nursing teams for current rotational schedule</p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--background)] text-xs uppercase tracking-wider text-[var(--muted-foreground)] border-b border-[var(--border)]">
              <tr>
                <th className="px-4 py-3 font-semibold">Department Unit</th>
                <th className="px-4 py-3 font-semibold">Morning (07:00 - 15:30)</th>
                <th className="px-4 py-3 font-semibold">Evening (15:00 - 23:00)</th>
                <th className="px-4 py-3 font-semibold">Night (22:30 - 07:30)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-[var(--background)]/50 transition-colors">
                  <td className="px-4 py-3 font-bold text-[var(--foreground)]">{row.department}</td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      {row.morningStaff.map((s, idx) => (
                        <div key={idx} className="text-xs font-medium text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> {s}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      {row.eveningStaff.map((s, idx) => (
                        <div key={idx} className="text-xs font-medium text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {s}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      {row.nightStaff.map((s, idx) => (
                        <div key={idx} className="text-xs font-medium text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> {s}
                        </div>
                      ))}
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

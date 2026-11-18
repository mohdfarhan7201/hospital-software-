"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { mockAppointments } from "@/data/mockData";
import { Appointment } from "@/types";
import { CheckCircle2, Phone, XCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function UnconfirmedAppointmentsPage() {
  const [unconfirmed, setUnconfirmed] = useState<Appointment[]>(
    mockAppointments.filter((a) => a.status === "Unconfirmed" || a.status === "Confirmed").slice(0, 4)
  );

  const handleConfirm = (id: string, name: string) => {
    setUnconfirmed((prev) => prev.filter((a) => a.id !== id));
    toast.success(`Appointment confirmed for ${name}. Token dispatched via SMS/WhatsApp.`);
  };

  const handleReject = (id: string) => {
    setUnconfirmed((prev) => prev.filter((a) => a.id !== id));
    toast.error("Appointment reservation declined.");
  };

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Appointments", href: "/appointments" },
          { label: "Unconfirmed Bookings" },
        ]}
        title="Unconfirmed Patient Bookings & Web Enquiries"
        description="Verify patient mobile details, confirm time slots, and dispatch confirmation notifications."
      />

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs p-5">
        <div className="space-y-4">
          {unconfirmed.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2 opacity-80" />
              <p className="font-semibold text-sm">All pending bookings have been confirmed.</p>
            </div>
          ) : (
            unconfirmed.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {item.patientName}
                    </h3>
                    <span className="font-mono text-slate-500">({item.uhid})</span>
                  </div>
                  <p className="text-slate-500 mt-0.5">
                    Consulting: {item.doctorName} • {item.department}
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mt-1">
                    Slot Requested: {item.appointmentDate} at {item.timeSlot} ({item.visitType})
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 italic mt-0.5">
                    Notes: {item.reason}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  <a
                    href={`tel:${item.patientMobile}`}
                    className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-700 dark:text-slate-200 flex items-center gap-1 font-semibold"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-600" /> Call {item.patientMobile}
                  </a>
                  <button
                    onClick={() => handleConfirm(item.id, item.patientName)}
                    className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Confirm Slot
                  </button>
                  <button
                    onClick={() => handleReject(item.id)}
                    className="p-2 rounded-lg border border-rose-200 dark:border-rose-900 text-rose-600 hover:bg-rose-50"
                    title="Reject Booking"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardShell>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { mockDoctors, mockPatients } from "@/data/mockData";
import { Calendar, Clock, User, Shield, CheckCircle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function AdvanceBookingPage() {
  const router = useRouter();
  const [patientId, setPatientId] = useState(mockPatients[0].id);
  const [doctorId, setDoctorId] = useState(mockDoctors[0].id);
  const [date, setDate] = useState("2026-12-05");
  const [slot, setSlot] = useState("11:00 AM - 11:30 AM");
  const [packageType, setPackageType] = useState("Specialist Second Opinion");
  const [advanceDeposit, setAdvanceDeposit] = useState("1500");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Advance booking successfully confirmed with receipt generation.");
    router.push("/appointments");
  };

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Front Desk", href: "/patients" },
          { label: "Advance Booking" },
        ]}
        title="Advance Clinical Appointment & Procedure Booking"
        description="Reserve consulting slots, surgery dates, or master executive health checkups up to 90 days in advance."
      >
        <Link
          href="/appointments"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </Link>
      </PageHeader>

      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
              Select Registered Patient (or enter UHID)
            </label>
            <select
              aria-label="Select Registered Patient"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
            >
              {mockPatients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.fullName} ({p.uhid}) - {p.mobile}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
              Consulting Specialist & Department
            </label>
            <select
              aria-label="Consulting Specialist"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
            >
              {mockDoctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} — {d.specialization} ({d.department})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Advance Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Preferred Slot
              </label>
              <select
                aria-label="Preferred Slot"
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
              >
                <option>09:30 AM - 10:00 AM</option>
                <option>10:30 AM - 11:00 AM</option>
                <option>11:30 AM - 12:00 PM</option>
                <option>02:30 PM - 03:00 PM</option>
                <option>04:00 PM - 04:30 PM</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Package / Visit Category
              </label>
              <select
                aria-label="Package / Visit Category"
                value={packageType}
                onChange={(e) => setPackageType(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
              >
                <option>Specialist Second Opinion</option>
                <option>Executive Comprehensive Health Check</option>
                <option>Pre-Operative Anaesthesia Assessment</option>
                <option>Post-Op Review Consultation</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Advance Token Deposit (₹ INR)
              </label>
              <input
                type="number"
                value={advanceDeposit}
                onChange={(e) => setAdvanceDeposit(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs"
            >
              Confirm Advance Booking & Issue Token
            </button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockAppointments } from "@/data/mockData";
import { Appointment } from "@/types";
import { Plus } from "lucide-react";

export default function BookingsListPage() {
  const columns: Column<Appointment>[] = [
    {
      header: "Booking Token",
      accessorKey: "tokenNumber",
      cell: (a) => <span className="font-mono font-bold text-blue-600">{a.tokenNumber}</span>,
    },
    {
      header: "Patient",
      accessorKey: "patientName",
      cell: (a) => (
        <div>
          <p className="font-bold">{a.patientName}</p>
          <p className="text-[11px] text-slate-500 font-mono">{a.uhid}</p>
        </div>
      ),
    },
    {
      header: "Specialist",
      accessorKey: "doctorName",
      cell: (a) => `${a.doctorName} (${a.department})`,
    },
    {
      header: "Encounter Slot",
      accessorKey: "appointmentDate",
      cell: (a) => `${a.appointmentDate} • ${a.timeSlot}`,
    },
    {
      header: "Mode",
      accessorKey: "visitType",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (a) => <StatusBadge status={a.status} />,
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Front Desk", href: "/patients" },
          { label: "Bookings" },
        ]}
        title="Patient Consultation Bookings & Tokens"
        description="Daily master log of outpatient consultation appointments and front-desk walk-in tokens."
      >
        <Link
          href="/advance-booking"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white"
        >
          <Plus className="w-4 h-4" /> Advance Booking
        </Link>
      </PageHeader>

      <DataTable
        data={mockAppointments}
        columns={columns}
        searchPlaceholder="Search bookings..."
        searchFields={["patientName", "uhid", "doctorName", "tokenNumber"]}
      />
    </DashboardShell>
  );
}

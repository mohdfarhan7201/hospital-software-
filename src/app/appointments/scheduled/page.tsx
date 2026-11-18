"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockAppointments } from "@/data/mockData";
import { Appointment } from "@/types";
import { Calendar, Plus } from "lucide-react";

export default function ScheduledVisitsPage() {
  const columns: Column<Appointment>[] = [
    {
      header: "Token",
      accessorKey: "tokenNumber",
      cell: (a) => <span className="font-mono font-bold text-blue-600">{a.tokenNumber}</span>,
    },
    {
      header: "Patient",
      accessorKey: "patientName",
      cell: (a) => (
        <div>
          <p className="font-bold">{a.patientName}</p>
          <p className="text-[11px] text-slate-400">{a.uhid}</p>
        </div>
      ),
    },
    {
      header: "Consultant",
      accessorKey: "doctorName",
      cell: (a) => (
        <div>
          <p className="font-semibold">{a.doctorName}</p>
          <p className="text-[11px] text-slate-400">{a.department}</p>
        </div>
      ),
    },
    {
      header: "Schedule Date & Time",
      accessorKey: "appointmentDate",
      cell: (a) => `${a.appointmentDate} • ${a.timeSlot}`,
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
          { label: "Appointments", href: "/appointments" },
          { label: "Scheduled Visits" },
        ]}
        title="Scheduled Hospital Visits & Encounters"
        description="Comprehensive forward schedule of verified patient clinical visits across all departments."
      >
        <Link
          href="/appointments"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white"
        >
          <Plus className="w-4 h-4" /> Book Visit
        </Link>
      </PageHeader>

      <DataTable
        data={mockAppointments}
        columns={columns}
        searchPlaceholder="Search scheduled visits..."
        searchFields={["patientName", "uhid", "doctorName"]}
      />
    </DashboardShell>
  );
}

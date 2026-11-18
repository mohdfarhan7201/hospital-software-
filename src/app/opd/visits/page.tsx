"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockAppointments } from "@/data/mockData";
import { Appointment } from "@/types";
import { Eye, Stethoscope } from "lucide-react";

export default function OPDVisitsPage() {
  const columns: Column<Appointment>[] = [
    {
      header: "Visit Token",
      accessorKey: "tokenNumber",
      cell: (a) => <span className="font-mono font-bold text-blue-600">{a.tokenNumber}</span>,
    },
    {
      header: "Patient",
      accessorKey: "patientName",
      cell: (a) => (
        <div>
          <p className="font-bold">{a.patientName}</p>
          <p className="text-[11px] text-slate-400 font-mono">{a.uhid}</p>
        </div>
      ),
    },
    {
      header: "Attending Consultant",
      accessorKey: "doctorName",
      cell: (a) => (
        <div>
          <p className="font-semibold">{a.doctorName}</p>
          <p className="text-[11px] text-slate-400">{a.department}</p>
        </div>
      ),
    },
    {
      header: "Encounter Date",
      accessorKey: "appointmentDate",
    },
    {
      header: "Visit Reason",
      accessorKey: "reason",
      cell: (a) => <span className="text-xs text-slate-600 dark:text-slate-300 truncate max-w-xs block">{a.reason}</span>,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (a) => <StatusBadge status={a.status} />,
    },
    {
      header: "Actions",
      cell: (a) => (
        <Link
          href={`/patients/${a.uhid}`}
          className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
        >
          <Eye className="w-3.5 h-3.5" /> View EMR
        </Link>
      ),
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Clinical Care", href: "/clinical" },
          { label: "OPD Visits" },
        ]}
        title="Outpatient (OPD) Visits & Consultations"
        description="Comprehensive clinical log of daily OPD encounters, vitals reviews, and doctor consultation notes."
      />

      <DataTable
        data={mockAppointments}
        columns={columns}
        searchPlaceholder="Search OPD encounters by patient, doctor, reason..."
        searchFields={["patientName", "uhid", "doctorName", "department", "reason"]}
      />
    </DashboardShell>
  );
}

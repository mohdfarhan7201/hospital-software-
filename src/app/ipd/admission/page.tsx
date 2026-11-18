"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockBeds } from "@/data/mockData";
import { Bed } from "@/types";
import { Plus, ArrowRight } from "lucide-react";

export default function AdmissionManagementPage() {
  const admittedBeds = mockBeds.filter((b) => b.patient);

  const columns: Column<Bed>[] = [
    {
      header: "UHID",
      cell: (b) => <span className="font-mono font-bold text-blue-600">{b.patient?.uhid}</span>,
    },
    {
      header: "Patient Name",
      cell: (b) => (
        <div>
          <p className="font-bold">{b.patient?.name}</p>
          <p className="text-[11px] text-slate-400">{b.patient?.diagnosis}</p>
        </div>
      ),
    },
    {
      header: "Ward / Bed",
      cell: (b) => `${b.wardName} (${b.bedNumber})`,
    },
    {
      header: "Admitting Consultant",
      cell: (b) => b.patient?.doctorName,
    },
    {
      header: "Date of Admission",
      cell: (b) => b.patient?.admissionDate,
    },
    {
      header: "Actions",
      cell: (b) => (
        <Link
          href={`/patients/${b.patient?.uhid}`}
          className="text-xs font-semibold text-blue-600 hover:underline"
        >
          View Case Sheet
        </Link>
      ),
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "IPD", href: "/ipd" },
          { label: "Admission Management" },
        ]}
        title="Inpatient (IPD) Admission Management"
        description="Bed assignment, emergency inpatient admissions, planned surgical bookings, and MLC registrations."
      >
        <Link
          href="/ipd/admission/new"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white"
        >
          <Plus className="w-4 h-4" /> New Admission Form
        </Link>
      </PageHeader>

      <DataTable
        data={admittedBeds}
        columns={columns}
        searchPlaceholder="Search admissions..."
      />
    </DashboardShell>
  );
}

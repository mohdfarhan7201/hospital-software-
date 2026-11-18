"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockBeds } from "@/data/mockData";
import { Bed } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Plus, BedDouble, Eye, ArrowRight } from "lucide-react";

export default function IPDPatientListPage() {
  const admittedBeds = mockBeds.filter((b) => b.status === "Occupied" && b.patient);

  const columns: Column<Bed>[] = [
    {
      header: "Bed No.",
      accessorKey: "bedNumber",
      cell: (b) => (
        <span className="font-mono font-bold text-xs bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
          {b.bedNumber}
        </span>
      ),
    },
    {
      header: "Inpatient",
      cell: (b) => (
        <div>
          <p className="font-bold text-slate-900 dark:text-slate-100">{b.patient?.name}</p>
          <p className="text-[11px] font-mono text-slate-400">{b.patient?.uhid}</p>
        </div>
      ),
    },
    {
      header: "Ward & Category",
      cell: (b) => (
        <div>
          <p className="font-semibold text-slate-800 dark:text-slate-200">{b.wardName}</p>
          <p className="text-[11px] text-slate-400">{b.type} ({formatCurrency(b.ratePerDay)}/day)</p>
        </div>
      ),
    },
    {
      header: "Admitting Consultant",
      cell: (b) => b.patient?.doctorName,
    },
    {
      header: "Admission Date",
      cell: (b) => b.patient?.admissionDate,
    },
    {
      header: "Clinical Diagnosis",
      cell: (b) => (
        <span className="text-xs text-slate-600 dark:text-slate-300 truncate max-w-xs block">
          {b.patient?.diagnosis}
        </span>
      ),
    },
    {
      header: "Actions",
      cell: (b) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/patients/${b.patient?.uhid}`}
            className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
          >
            <Eye className="w-3.5 h-3.5" /> 360
          </Link>
          <Link
            href="/ipd/transfers"
            className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            Transfer
          </Link>
        </div>
      ),
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "IPD & Wards", href: "/ipd" },
          { label: "Inpatient (IPD) Directory" },
        ]}
        title="Inpatient (IPD) Census & Active Admissions"
        description="Live inpatient census across Intensive Care, Coronary Care, High Dependency, and General Wards."
      >
        <Link
          href="/ipd/admission/new"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white shadow-xs"
        >
          <Plus className="w-4 h-4" /> New Inpatient Admission
        </Link>
        <Link
          href="/wards/roster"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
        >
          <BedDouble className="w-3.5 h-3.5 text-blue-600" /> Bed Matrix Roster
        </Link>
      </PageHeader>

      <DataTable
        data={admittedBeds}
        columns={columns}
        searchPlaceholder="Search active inpatients by UHID, patient name, bed, diagnosis..."
      />
    </DashboardShell>
  );
}

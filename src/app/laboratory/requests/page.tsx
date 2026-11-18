"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockLabRequests } from "@/data/mockData";
import { LabRequest } from "@/types";
import { Activity, Eye } from "lucide-react";

export default function LabRequestsPage() {
  const columns: Column<LabRequest>[] = [
    {
      header: "Req No.",
      accessorKey: "requestNumber",
      cell: (r) => <span className="font-mono font-bold text-xs text-blue-600">{r.requestNumber}</span>,
    },
    {
      header: "Patient",
      accessorKey: "patientName",
      cell: (r) => (
        <div>
          <p className="font-bold">{r.patientName}</p>
          <p className="text-[11px] text-slate-400 font-mono">{r.uhid}</p>
        </div>
      ),
    },
    {
      header: "Ordering Doctor",
      accessorKey: "doctorName",
    },
    {
      header: "Tests Requested",
      cell: (r) => (
        <span className="text-xs truncate max-w-xs block text-slate-700 dark:text-slate-300">
          {r.tests.join(", ")}
        </span>
      ),
    },
    {
      header: "Date Ordered",
      accessorKey: "requestDate",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (r) => <StatusBadge status={r.status} />,
    },
    {
      header: "Actions",
      cell: (r) => (
        <div className="flex items-center gap-2">
          <Link
            href="/laboratory/results"
            className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
          >
            <Activity className="w-3.5 h-3.5" /> Enter Results
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
          { label: "Laboratory", href: "/laboratory" },
          { label: "Test Requests" },
        ]}
        title="Diagnostic Laboratory Test Requisitions"
        description="Master queue of ordered pathology investigations across Emergency, Inpatient Wards, and Outpatient OPD."
      />

      <DataTable
        data={mockLabRequests}
        columns={columns}
        searchPlaceholder="Search requests by patient, requisition no, doctor..."
        searchFields={["requestNumber", "patientName", "uhid", "doctorName"]}
      />
    </DashboardShell>
  );
}

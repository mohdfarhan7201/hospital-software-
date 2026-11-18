"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockBeds } from "@/data/mockData";
import { Bed } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { BedDouble, Plus } from "lucide-react";

export default function BedManagementPage() {
  const columns: Column<Bed>[] = [
    {
      header: "Bed Number",
      accessorKey: "bedNumber",
      cell: (b) => <span className="font-mono font-bold text-blue-600">{b.bedNumber}</span>,
    },
    {
      header: "Ward",
      accessorKey: "wardName",
      sortable: true,
    },
    {
      header: "Category",
      accessorKey: "type",
      sortable: true,
    },
    {
      header: "Rate / Day",
      accessorKey: "ratePerDay",
      cell: (b) => <span className="font-mono font-bold">{formatCurrency(b.ratePerDay)}</span>,
    },
    {
      header: "Occupying Patient",
      cell: (b) =>
        b.patient ? (
          <div>
            <p className="font-semibold">{b.patient.name}</p>
            <p className="text-[10px] text-slate-400 font-mono">{b.patient.uhid}</p>
          </div>
        ) : (
          <span className="text-slate-400 text-xs italic">Unoccupied</span>
        ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (b) => <StatusBadge status={b.status} />,
    },
    {
      header: "Actions",
      cell: (b) => (
        <Link
          href="/wards/roster"
          className="text-xs font-semibold text-blue-600 hover:underline"
        >
          Manage Status
        </Link>
      ),
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "IPD & Wards", href: "/wards" },
          { label: "Beds Master" },
        ]}
        title="Hospital Bed Master & Allocation Directory"
        description="Master index of all physical inpatient beds, daily billing rates, and real-time occupancy status."
      >
        <Link
          href="/wards/roster"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white"
        >
          <BedDouble className="w-3.5 h-3.5" /> Bed Matrix Roster
        </Link>
      </PageHeader>

      <DataTable
        data={mockBeds}
        columns={columns}
        searchPlaceholder="Search beds by number, ward, category..."
        searchFields={["bedNumber", "wardName", "type", "status"]}
        filters={[
          {
            key: "status",
            label: "Status",
            options: [
              { label: "Available", value: "Available" },
              { label: "Occupied", value: "Occupied" },
              { label: "Cleaning", value: "Cleaning" },
              { label: "Maintenance", value: "Maintenance" },
            ],
          },
        ]}
      />
    </DashboardShell>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatCurrency } from "@/lib/utils";

interface RoomItem {
  id: string;
  roomNumber: string;
  wardName: string;
  roomCategory: string;
  bedsCount: number;
  tariffPerDay: number;
  status: "Fully Occupied" | "Partially Occupied" | "Vacant" | "Maintenance";
}

const mockRooms: RoomItem[] = [
  { id: "rm-1", roomNumber: "Floor 3, Suite 301", wardName: "Coronary Care Unit", roomCategory: "ICU Single Cubicle", bedsCount: 1, tariffPerDay: 12500, status: "Fully Occupied" },
  { id: "rm-2", roomNumber: "Floor 4, Suite 405", wardName: "Maternity & OBG Special Care", roomCategory: "Deluxe Suite", bedsCount: 1, tariffPerDay: 7500, status: "Fully Occupied" },
  { id: "rm-3", roomNumber: "Floor 2, Room 201", wardName: "Male Medical Ward", roomCategory: "General Multi-Bed", bedsCount: 6, tariffPerDay: 2200, status: "Partially Occupied" },
  { id: "rm-4", roomNumber: "Floor 2, Wing D", wardName: "Semi-Private Ortho Ward", roomCategory: "Semi-Private Twin Sharing", bedsCount: 2, tariffPerDay: 4200, status: "Vacant" },
];

export default function RoomManagementPage() {
  const columns: Column<RoomItem>[] = [
    {
      header: "Room Identifier",
      accessorKey: "roomNumber",
      cell: (r) => <span className="font-bold text-slate-900 dark:text-slate-100">{r.roomNumber}</span>,
    },
    {
      header: "Ward",
      accessorKey: "wardName",
    },
    {
      header: "Category",
      accessorKey: "roomCategory",
    },
    {
      header: "Beds Capacity",
      accessorKey: "bedsCount",
      cell: (r) => `${r.bedsCount} Beds`,
    },
    {
      header: "Tariff / Day",
      accessorKey: "tariffPerDay",
      cell: (r) => <span className="font-mono font-semibold">{formatCurrency(r.tariffPerDay)}</span>,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (r) => <StatusBadge status={r.status} />,
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "IPD & Wards", href: "/wards" },
          { label: "Room Directory" },
        ]}
        title="Inpatient Rooms & Suite Master Directory"
        description="Configuration of hospital rooms, private suites, ICU cubicles, daily billing tariffs, and bed capacity."
      />

      <DataTable
        data={mockRooms}
        columns={columns}
        searchPlaceholder="Search rooms..."
        searchFields={["roomNumber", "wardName", "roomCategory"]}
      />
    </DashboardShell>
  );
}

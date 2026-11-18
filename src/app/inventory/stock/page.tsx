"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockMedicines } from "@/data/mockData";
import { Medicine } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Warehouse, AlertTriangle } from "lucide-react";

export default function StockManagementPage() {
  const columns: Column<Medicine>[] = [
    {
      header: "Formulation",
      accessorKey: "name",
      cell: (m) => (
        <div>
          <p className="font-bold">{m.name}</p>
          <p className="text-[11px] text-slate-400 font-mono">{m.sku}</p>
        </div>
      ),
    },
    {
      header: "Active Batch",
      accessorKey: "batchNumber",
      cell: (m) => <span className="font-mono text-xs">{m.batchNumber}</span>,
    },
    {
      header: "Shelf Location",
      cell: (m) => <span className="text-xs font-mono">Rack B-04 / Shelf 2</span>,
    },
    {
      header: "Current Stock",
      accessorKey: "stockQty",
      cell: (m) => <span className="font-mono font-bold text-sm">{m.stockQty} Units</span>,
    },
    {
      header: "Safety Buffer",
      accessorKey: "reorderLevel",
      cell: (m) => <span className="font-mono text-xs">{m.reorderLevel} Units</span>,
    },
    {
      header: "Status",
      accessorKey: "stockStatus",
      cell: (m) => <StatusBadge status={m.stockStatus} />,
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Pharmacy & Inventory", href: "/pharmacy" },
          { label: "Stock Management" },
        ]}
        title="Hospital Central Warehouse & Stock Inventory"
        description="Physical batch inventory tracking, rack & bin shelf locations, and automatic safety reorder thresholds."
      >
        <Link
          href="/inventory/expiry"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Expiry Tracker
        </Link>
      </PageHeader>

      <DataTable
        data={mockMedicines}
        columns={columns}
        searchPlaceholder="Search inventory by medicine, batch, SKU..."
        searchFields={["name", "sku", "batchNumber"]}
      />
    </DashboardShell>
  );
}

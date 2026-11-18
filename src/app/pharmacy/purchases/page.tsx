"use client";

import React from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatCurrency } from "@/lib/utils";
import { Truck, Plus } from "lucide-react";
import { toast } from "sonner";

interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplier: string;
  orderDate: string;
  deliveryDate: string;
  itemsCount: number;
  totalAmount: number;
  status: "Received & Stocked" | "In Transit" | "Pending Approval";
}

const mockPurchases: PurchaseOrder[] = [
  {
    id: "po-1",
    poNumber: "PO-2026-0891",
    supplier: "GlaxoSmithKline Pharmaceuticals India",
    orderDate: "10 Nov 2026",
    deliveryDate: "15 Nov 2026",
    itemsCount: 14,
    totalAmount: 284000,
    status: "Received & Stocked",
  },
  {
    id: "po-2",
    poNumber: "PO-2026-0892",
    supplier: "Sun Pharmaceutical Industries Ltd",
    orderDate: "14 Nov 2026",
    deliveryDate: "18 Nov 2026",
    itemsCount: 8,
    totalAmount: 142000,
    status: "In Transit",
  },
];

export default function PurchasesManagementPage() {
  const columns: Column<PurchaseOrder>[] = [
    {
      header: "PO Number",
      accessorKey: "poNumber",
      cell: (p) => <span className="font-mono font-bold text-xs text-blue-600">{p.poNumber}</span>,
    },
    {
      header: "Pharmaceutical Supplier",
      accessorKey: "supplier",
      cell: (p) => <span className="font-semibold text-slate-900 dark:text-slate-100">{p.supplier}</span>,
    },
    {
      header: "Order Date",
      accessorKey: "orderDate",
    },
    {
      header: "Delivery Date",
      accessorKey: "deliveryDate",
    },
    {
      header: "Items",
      accessorKey: "itemsCount",
      cell: (p) => `${p.itemsCount} SKUs`,
    },
    {
      header: "Total Value",
      accessorKey: "totalAmount",
      cell: (p) => <span className="font-mono font-bold">{formatCurrency(p.totalAmount)}</span>,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (p) => <StatusBadge status={p.status} />,
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Pharmacy", href: "/pharmacy" },
          { label: "Purchase Orders" },
        ]}
        title="Drug Procurement & Goods Receipt Notes (GRN)"
        description="Manage wholesale pharmaceutical purchase orders, batch number verification, cold-chain checks, and supplier invoices."
      >
        <button
          onClick={() => toast.info("New purchase order draft opened.")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white"
        >
          <Plus className="w-4 h-4" /> Create Purchase Order
        </button>
      </PageHeader>

      <DataTable
        data={mockPurchases}
        columns={columns}
        searchPlaceholder="Search POs..."
        searchFields={["poNumber", "supplier"]}
      />
    </DashboardShell>
  );
}

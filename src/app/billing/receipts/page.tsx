"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, Column } from "@/components/common/DataTable";
import { mockInvoices } from "@/data/mockData";
import { BillingInvoice } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Printer, Receipt } from "lucide-react";
import { toast } from "sonner";

export default function ReceiptsPage() {
  const settledInvoices = mockInvoices.filter((i) => i.paidAmount > 0);

  const columns: Column<BillingInvoice>[] = [
    {
      header: "Receipt No.",
      cell: (inv) => (
        <span className="font-mono font-bold text-xs text-blue-600">
          RCP-{inv.billNumber.replace("INV-", "")}
        </span>
      ),
    },
    {
      header: "Patient",
      accessorKey: "patientName",
      cell: (inv) => (
        <div>
          <p className="font-bold">{inv.patientName}</p>
          <p className="text-[11px] font-mono text-slate-400">{inv.uhid}</p>
        </div>
      ),
    },
    {
      header: "Receipt Date",
      accessorKey: "billingDate",
      cell: (inv) => formatDate(inv.billingDate),
    },
    {
      header: "Amount Paid",
      accessorKey: "paidAmount",
      cell: (inv) => (
        <span className="font-mono font-bold text-emerald-600">
          {formatCurrency(inv.paidAmount)}
        </span>
      ),
    },
    {
      header: "Instrument / Mode",
      accessorKey: "paymentMethod",
    },
    {
      header: "Action",
      cell: (inv) => (
        <button
          onClick={() => {
            toast.info(`Printing money receipt for ${inv.billNumber}...`);
            window.print();
          }}
          className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-blue-600 flex items-center gap-1 font-semibold text-xs"
        >
          <Printer className="w-3.5 h-3.5" /> Print Receipt
        </button>
      ),
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Billing", href: "/billing" },
          { label: "Receipts" },
        ]}
        title="Official Money Receipts & Payment Slips"
        description="Search, view, reprint, and verify patient collection receipts issued across all counters."
      />

      <DataTable
        data={settledInvoices}
        columns={columns}
        searchPlaceholder="Search receipts by receipt number, patient name, UHID..."
        searchFields={["billNumber", "patientName", "uhid"]}
      />
    </DashboardShell>
  );
}

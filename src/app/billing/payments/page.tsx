"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockInvoices } from "@/data/mockData";
import { BillingInvoice } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { CreditCard, QrCode, CheckCircle, IndianRupee } from "lucide-react";
import { toast } from "sonner";

export default function PaymentCollectionPage() {
  const [invoices, setInvoices] = useState<BillingInvoice[]>(mockInvoices);

  const handleCollect = (id: string, name: string, due: number) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id
          ? {
              ...inv,
              paidAmount: inv.totalAmount,
              outstandingAmount: 0,
              status: "Paid",
            }
          : inv
      )
    );
    toast.success(`Payment of ${formatCurrency(due)} collected from ${name}! Receipt issued.`);
  };

  const columns: Column<BillingInvoice>[] = [
    {
      header: "Invoice No.",
      accessorKey: "billNumber",
      cell: (inv) => <span className="font-mono font-bold text-blue-600">{inv.billNumber}</span>,
    },
    {
      header: "Patient",
      accessorKey: "patientName",
      cell: (inv) => (
        <div>
          <p className="font-bold">{inv.patientName}</p>
          <p className="text-[11px] text-slate-400 font-mono">{inv.uhid}</p>
        </div>
      ),
    },
    {
      header: "Total Bill",
      accessorKey: "totalAmount",
      cell: (inv) => <span className="font-mono font-semibold">{formatCurrency(inv.totalAmount)}</span>,
    },
    {
      header: "Outstanding Due",
      accessorKey: "outstandingAmount",
      cell: (inv) => (
        <span className="font-mono font-bold text-rose-600">
          {formatCurrency(inv.outstandingAmount)}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (inv) => <StatusBadge status={inv.status} />,
    },
    {
      header: "Action",
      cell: (inv) => (
        <div>
          {inv.outstandingAmount > 0 ? (
            <button
              onClick={() => handleCollect(inv.id, inv.patientName, inv.outstandingAmount)}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1 shadow-2xs"
            >
              <IndianRupee className="w-3.5 h-3.5" /> Collect {formatCurrency(inv.outstandingAmount)}
            </button>
          ) : (
            <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Settled
            </span>
          )}
        </div>
      ),
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Billing", href: "/billing" },
          { label: "Payments" },
        ]}
        title="Payment Collection & Cashier Settlement Console"
        description="Receive counter payments via Cash, Dynamic BharatQR / UPI, EDC Card Terminal, or Net Banking."
      />

      <DataTable
        data={invoices}
        columns={columns}
        searchPlaceholder="Search invoices by number or patient name..."
        searchFields={["billNumber", "patientName", "uhid"]}
      />
    </DashboardShell>
  );
}

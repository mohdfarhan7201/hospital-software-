"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface ExpenseItem {
  id: string;
  voucherNo: string;
  category: string;
  vendorName: string;
  date: string;
  amount: number;
  paymentMode: string;
  status: "Approved" | "Paid" | "Pending Approval";
}

const mockExpenses: ExpenseItem[] = [
  {
    id: "exp-1",
    voucherNo: "EXP-2026-041",
    category: "Medical Liquid Oxygen (Cryogenic Cylinder Refill)",
    vendorName: "Inox Air Products Pvt Ltd",
    date: "14 Nov 2026",
    amount: 145000,
    paymentMode: "NEFT / RTGS",
    status: "Paid",
  },
  {
    id: "exp-2",
    voucherNo: "EXP-2026-042",
    category: "Biomedical Waste Disposal & Incineration Services",
    vendorName: "Medicare Environmental Management Pvt Ltd",
    date: "12 Nov 2026",
    amount: 38500,
    paymentMode: "Net Banking",
    status: "Paid",
  },
  {
    id: "exp-3",
    voucherNo: "EXP-2026-043",
    category: "Hospital Linen & Sterilized OT Drapes Laundry",
    vendorName: "Apollo Steam Cleaners & Laundry",
    date: "16 Nov 2026",
    amount: 24000,
    paymentMode: "Cheque",
    status: "Approved",
  },
];

export default function ExpensesManagementPage() {
  const columns: Column<ExpenseItem>[] = [
    {
      header: "Voucher No.",
      accessorKey: "voucherNo",
      cell: (e) => <span className="font-mono font-bold text-xs text-blue-600">{e.voucherNo}</span>,
    },
    {
      header: "Expense Category",
      accessorKey: "category",
      cell: (e) => <span className="font-semibold text-slate-800 dark:text-slate-200">{e.category}</span>,
    },
    {
      header: "Vendor / Supplier",
      accessorKey: "vendorName",
    },
    {
      header: "Date",
      accessorKey: "date",
    },
    {
      header: "Amount (₹)",
      accessorKey: "amount",
      cell: (e) => <span className="font-mono font-bold text-rose-600">{formatCurrency(e.amount)}</span>,
    },
    {
      header: "Mode",
      accessorKey: "paymentMode",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (e) => <StatusBadge status={e.status} />,
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Finance", href: "/billing" },
          { label: "Expenses" },
        ]}
        title="Hospital Operational Expenditure (OPEX) Management"
        description="Record vendor bills, biomedical waste contracts, utility invoices, oxygen plant refills, and facility maintenance."
      >
        <button
          onClick={() => toast.info("New expense voucher modal opened.")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white"
        >
          <Plus className="w-4 h-4" /> Add Expense Voucher
        </button>
      </PageHeader>

      <DataTable
        data={mockExpenses}
        columns={columns}
        searchPlaceholder="Search expenses..."
        searchFields={["voucherNo", "category", "vendorName"]}
      />
    </DashboardShell>
  );
}

"use client";

import React from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Building2, Phone, Mail, Plus } from "lucide-react";

interface Supplier {
  id: string;
  name: string;
  dlNumber: string;
  gstin: string;
  contactPerson: string;
  phone: string;
  email: string;
  city: string;
  status: "Active Verified" | "Under Audit";
}

const mockSuppliers: Supplier[] = [
  {
    id: "sup-1",
    name: "GlaxoSmithKline Pharmaceuticals India Ltd",
    dlNumber: "DL-MH-20B-9812",
    gstin: "27AAACG1234F1Z8",
    contactPerson: "Rajeev Nambiar",
    phone: "+91 22 2495 9000",
    email: "india.orders@gsk.com",
    city: "Mumbai",
    status: "Active Verified",
  },
  {
    id: "sup-2",
    name: "Sun Pharmaceutical Industries Ltd",
    dlNumber: "DL-MH-21B-4412",
    gstin: "27AAACS8912P1ZA",
    contactPerson: "Amitesh Shah",
    phone: "+91 22 4324 4324",
    email: "supply.chain@sunpharma.com",
    city: "Mumbai",
    status: "Active Verified",
  },
  {
    id: "sup-3",
    name: "Glenmark Pharmaceuticals",
    dlNumber: "DL-MH-20B-1102",
    gstin: "27AAACG9912K1Z3",
    contactPerson: "Kavita Rane",
    phone: "+91 22 4018 9999",
    email: "hospital.supplies@glenmark.com",
    city: "Mumbai",
    status: "Active Verified",
  },
];

export default function SuppliersPage() {
  const columns: Column<Supplier>[] = [
    {
      header: "Supplier Organization",
      accessorKey: "name",
      cell: (s) => (
        <div>
          <p className="font-bold text-slate-900 dark:text-slate-100">{s.name}</p>
          <p className="text-[11px] font-mono text-slate-400">Drug License: {s.dlNumber}</p>
        </div>
      ),
    },
    {
      header: "GSTIN",
      accessorKey: "gstin",
      cell: (s) => <span className="font-mono text-xs">{s.gstin}</span>,
    },
    {
      header: "Key Contact",
      accessorKey: "contactPerson",
      cell: (s) => (
        <div>
          <p className="font-semibold">{s.contactPerson}</p>
          <p className="text-[11px] text-slate-500">{s.phone}</p>
        </div>
      ),
    },
    {
      header: "Location",
      accessorKey: "city",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (s) => <StatusBadge status={s.status} />,
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Pharmacy", href: "/pharmacy" },
          { label: "Suppliers" },
        ]}
        title="Approved Pharmaceutical Suppliers & Distributors"
        description="Verify drug wholesale licenses, GST compliance, credit terms, and contact desks."
      />

      <DataTable
        data={mockSuppliers}
        columns={columns}
        searchPlaceholder="Search suppliers by name, DL number, contact..."
        searchFields={["name", "dlNumber", "contactPerson", "gstin"]}
      />
    </DashboardShell>
  );
}

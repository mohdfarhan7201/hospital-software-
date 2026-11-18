"use client";

import React from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Building2, Plus, Phone } from "lucide-react";

interface InsuranceCompany {
  id: string;
  name: string;
  category: "Private Health Insurer" | "Public Sector (GIPSA PSU)" | "Standalone Health";
  tollFree: string;
  email: string;
  cashlessNetworkStatus: "Empanelled Active" | "Under Renewal";
}

const mockCompanies: InsuranceCompany[] = [
  {
    id: "ic-1",
    name: "Star Health and Allied Insurance Co Ltd",
    category: "Standalone Health",
    tollFree: "1800 425 2255",
    email: "cashless@starhealth.in",
    cashlessNetworkStatus: "Empanelled Active",
  },
  {
    id: "ic-2",
    name: "ICICI Lombard General Insurance Co Ltd",
    category: "Private Health Insurer",
    tollFree: "1800 2666",
    email: "hospitalcashless@icicilombard.com",
    cashlessNetworkStatus: "Empanelled Active",
  },
  {
    id: "ic-3",
    name: "HDFC ERGO General Insurance Co Ltd",
    category: "Private Health Insurer",
    tollFree: "1800 266 0700",
    email: "healthclaims@hdfcergo.com",
    cashlessNetworkStatus: "Empanelled Active",
  },
  {
    id: "ic-4",
    name: "New India Assurance Co Ltd (GIPSA)",
    category: "Public Sector (GIPSA PSU)",
    tollFree: "1800 209 1415",
    email: "gipsadesk@newindia.co.in",
    cashlessNetworkStatus: "Empanelled Active",
  },
];

export default function InsuranceCompaniesPage() {
  const columns: Column<InsuranceCompany>[] = [
    {
      header: "Insurance Organization",
      accessorKey: "name",
      cell: (c) => <span className="font-bold text-slate-900 dark:text-slate-100">{c.name}</span>,
    },
    {
      header: "Underwriter Category",
      accessorKey: "category",
    },
    {
      header: "Cashless Authorization Desk",
      cell: (c) => (
        <div>
          <p className="font-semibold">{c.tollFree}</p>
          <p className="text-[11px] text-slate-400">{c.email}</p>
        </div>
      ),
    },
    {
      header: "Empanelment Status",
      accessorKey: "cashlessNetworkStatus",
      cell: (c) => <StatusBadge status={c.cashlessNetworkStatus} />,
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Insurance", href: "/insurance" },
          { label: "Empanelled Insurers" },
        ]}
        title="Empanelled Health Insurance Companies"
        description="Directory of private health insurance underwriters, GIPSA public sector PSUs, and cashless hospital agreements."
      />

      <DataTable
        data={mockCompanies}
        columns={columns}
        searchPlaceholder="Search insurance companies..."
        searchFields={["name", "category", "tollFree"]}
      />
    </DashboardShell>
  );
}

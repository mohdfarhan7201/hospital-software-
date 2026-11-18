"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockClaims } from "@/data/mockData";
import { InsuranceClaim } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { CheckCircle2, ShieldCheck } from "lucide-react";

export default function InsuranceSettlementsPage() {
  const settledClaims = mockClaims.filter((c) => c.status === "Approved" || c.status === "Settled");

  const columns: Column<InsuranceClaim>[] = [
    {
      header: "Claim Docket",
      accessorKey: "claimId",
      cell: (c) => <span className="font-mono font-bold text-xs text-blue-600">{c.claimId}</span>,
    },
    {
      header: "Patient",
      accessorKey: "patientName",
      cell: (c) => (
        <div>
          <p className="font-bold">{c.patientName}</p>
          <p className="text-[11px] font-mono text-slate-400">{c.uhid}</p>
        </div>
      ),
    },
    {
      header: "TPA Desk",
      accessorKey: "tpaName",
    },
    {
      header: "Claimed Amount",
      accessorKey: "claimAmount",
      cell: (c) => <span className="font-mono">{formatCurrency(c.claimAmount)}</span>,
    },
    {
      header: "Approved / Remitted",
      accessorKey: "approvedAmount",
      cell: (c) => (
        <span className="font-mono font-bold text-emerald-600">
          {formatCurrency(c.approvedAmount || c.claimAmount)}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (c) => <StatusBadge status="Settled" />,
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Insurance", href: "/insurance" },
          { label: "Settlements" },
        ]}
        title="Insurance Claim Settlements & Bank Remittance"
        description="Verify NEFT/RTGS bank advice references, cashless final payment remittances, and co-pay adjustments."
      />

      <DataTable
        data={settledClaims}
        columns={columns}
        searchPlaceholder="Search settled claims..."
        searchFields={["claimId", "patientName", "tpaName"]}
      />
    </DashboardShell>
  );
}

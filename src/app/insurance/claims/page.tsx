"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockClaims } from "@/data/mockData";
import { InsuranceClaim } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Shield, Plus } from "lucide-react";

export default function ClaimManagementPage() {
  const columns: Column<InsuranceClaim>[] = [
    {
      header: "Claim ID",
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
      header: "Insurance / TPA",
      cell: (c) => (
        <div>
          <p className="font-semibold">{c.insuranceCompany}</p>
          <p className="text-[11px] text-slate-400">{c.tpaName}</p>
        </div>
      ),
    },
    {
      header: "Claimed (₹)",
      accessorKey: "claimAmount",
      cell: (c) => <span className="font-mono font-semibold">{formatCurrency(c.claimAmount)}</span>,
    },
    {
      header: "Approved (₹)",
      accessorKey: "approvedAmount",
      cell: (c) =>
        c.approvedAmount ? (
          <span className="font-mono font-bold text-emerald-600">
            {formatCurrency(c.approvedAmount)}
          </span>
        ) : (
          <span className="text-slate-400 italic">Pending</span>
        ),
    },
    {
      header: "Submission Date",
      accessorKey: "submissionDate",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (c) => <StatusBadge status={c.status} />,
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Insurance", href: "/insurance" },
          { label: "Claims Directory" },
        ]}
        title="Inpatient Cashless Claims Tracking & Query Desk"
        description="Monitor electronic claim dockets, IRDAI query responses, final bills submission, and settlement status."
      >
        <Link
          href="/insurance/pre-authorization"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white"
        >
          <Plus className="w-4 h-4" /> New Pre-Auth Claim
        </Link>
      </PageHeader>

      <DataTable
        data={mockClaims}
        columns={columns}
        searchPlaceholder="Search claims by claim ID, patient, insurer, TPA..."
        searchFields={["claimId", "patientName", "uhid", "insuranceCompany", "tpaName"]}
      />
    </DashboardShell>
  );
}

"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, Column } from "@/components/common/DataTable";
import { mockLabTests } from "@/data/mockData";
import { LabTest } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { FlaskConical, Plus } from "lucide-react";
import { toast } from "sonner";

export default function LabTestDirectoryPage() {
  const [tests, setTests] = useState<LabTest[]>(mockLabTests);

  const columns: Column<LabTest>[] = [
    {
      header: "Test Code",
      accessorKey: "code",
      cell: (t) => <span className="font-mono font-bold text-xs text-blue-600">{t.code}</span>,
    },
    {
      header: "Investigation Name",
      accessorKey: "name",
      cell: (t) => <span className="font-bold text-slate-900 dark:text-slate-100">{t.name}</span>,
    },
    {
      header: "Department",
      accessorKey: "category",
    },
    {
      header: "Sample Required",
      accessorKey: "sampleType",
      cell: (t) => (
        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          {t.sampleType}
        </span>
      ),
    },
    {
      header: "Turn-Around (TAT)",
      accessorKey: "tatHours",
      cell: (t) => `${t.tatHours} Hours`,
    },
    {
      header: "Biological Reference Range",
      accessorKey: "normalRange",
      cell: (t) => <span className="text-xs font-mono text-slate-600 dark:text-slate-400">{t.normalRange}</span>,
    },
    {
      header: "Tariff (₹)",
      accessorKey: "price",
      cell: (t) => <span className="font-mono font-bold">{formatCurrency(t.price)}</span>,
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Laboratory", href: "/laboratory" },
          { label: "Test Directory" },
        ]}
        title="Pathology & Laboratory Test Master Directory"
        description="Comprehensive diagnostic investigation menu, biological reference intervals, specimen requirements, and tariffs."
      >
        <button
          onClick={() => toast.info("New laboratory investigation form opened.")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white"
        >
          <Plus className="w-4 h-4" /> Add Test Master
        </button>
      </PageHeader>

      <DataTable
        data={tests}
        columns={columns}
        searchPlaceholder="Search diagnostic tests by name, code, category..."
        searchFields={["name", "code", "category", "sampleType"]}
      />
    </DashboardShell>
  );
}

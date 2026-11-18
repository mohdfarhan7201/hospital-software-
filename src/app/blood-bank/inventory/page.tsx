"use client";

import React from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Droplet } from "lucide-react";

interface BloodBag {
  id: string;
  bagNumber: string;
  bloodGroup: string;
  component: "Packed Red Blood Cells (PRBC)" | "Fresh Frozen Plasma (FFP)" | "Platelet Concentrate";
  volumeMl: number;
  collectionDate: string;
  expiryDate: string;
  storageTemp: string;
  serologyStatus: "Non-Reactive (HIV/HCV/HBsAg Clear)";
}

const mockBags: BloodBag[] = [
  {
    id: "bg-1",
    bagNumber: "BB-2026-4412",
    bloodGroup: "O+",
    component: "Packed Red Blood Cells (PRBC)",
    volumeMl: 350,
    collectionDate: "12 Nov 2026",
    expiryDate: "24 Dec 2026 (42 Days)",
    storageTemp: "+2°C to +6°C (Blood Bank Refrigerator #01)",
    serologyStatus: "Non-Reactive (HIV/HCV/HBsAg Clear)",
  },
  {
    id: "bg-2",
    bagNumber: "BB-2026-4413",
    bloodGroup: "B+",
    component: "Fresh Frozen Plasma (FFP)",
    volumeMl: 220,
    collectionDate: "10 Nov 2026",
    expiryDate: "09 Nov 2027 (1 Year)",
    storageTemp: "-30°C Ultra Deep Freezer #02",
    serologyStatus: "Non-Reactive (HIV/HCV/HBsAg Clear)",
  },
  {
    id: "bg-3",
    bagNumber: "BB-2026-4414",
    bloodGroup: "A+",
    component: "Platelet Concentrate",
    volumeMl: 60,
    collectionDate: "15 Nov 2026",
    expiryDate: "20 Nov 2026 (5 Days)",
    storageTemp: "+22°C Platelet Agitator Incubator",
    serologyStatus: "Non-Reactive (HIV/HCV/HBsAg Clear)",
  },
];

export default function BloodInventoryPage() {
  const columns: Column<BloodBag>[] = [
    {
      header: "Unit / Bag No.",
      accessorKey: "bagNumber",
      cell: (b) => <span className="font-mono font-bold text-xs text-rose-600">{b.bagNumber}</span>,
    },
    {
      header: "Blood Group",
      accessorKey: "bloodGroup",
      cell: (b) => (
        <span className="font-mono font-bold text-sm px-2.5 py-0.5 rounded bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
          {b.bloodGroup}
        </span>
      ),
    },
    {
      header: "Component Fraction",
      accessorKey: "component",
    },
    {
      header: "Volume",
      accessorKey: "volumeMl",
      cell: (b) => `${b.volumeMl} mL`,
    },
    {
      header: "Expiry Date",
      accessorKey: "expiryDate",
    },
    {
      header: "Storage Location",
      accessorKey: "storageTemp",
      cell: (b) => <span className="text-[11px] text-slate-500">{b.storageTemp}</span>,
    },
    {
      header: "Transfusion Safety",
      accessorKey: "serologyStatus",
      cell: (b) => (
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          {b.serologyStatus}
        </span>
      ),
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Blood Bank", href: "/blood-bank" },
          { label: "Blood Inventory" },
        ]}
        title="Component Blood Inventory & Cold Chain Tracking"
        description="Individual barcoded blood bag unit inventory, storage temperature loggers, and component shelf-life monitors."
      />

      <DataTable
        data={mockBags}
        columns={columns}
        searchPlaceholder="Search blood inventory by bag number, blood group, component..."
        searchFields={["bagNumber", "bloodGroup", "component"]}
      />
    </DashboardShell>
  );
}

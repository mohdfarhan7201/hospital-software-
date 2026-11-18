"use client";

import React from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";

interface TPADesk {
  id: string;
  name: string;
  code: string;
  portalUrl: string;
  contactNumber: string;
  avgTurnaround: string;
  status: "Active Connected" | "Portal Maintenance";
}

const mockTPAs: TPADesk[] = [
  {
    id: "tpa-1",
    name: "MediAssist Insurance TPA Pvt Ltd",
    code: "TPA-MEDIASST",
    portalUrl: "portal.mediassist.in",
    contactNumber: "+91 80 2206 7000",
    avgTurnaround: "1.4 Hours",
    status: "Active Connected",
  },
  {
    id: "tpa-2",
    name: "Family Health Plan Insurance TPA Ltd (FHPL)",
    code: "TPA-FHPL",
    portalUrl: "claims.fhpl.net",
    contactNumber: "+91 40 2355 2200",
    avgTurnaround: "1.9 Hours",
    status: "Active Connected",
  },
  {
    id: "tpa-3",
    name: "Vidal Health TPA Pvt Ltd",
    code: "TPA-VIDAL",
    portalUrl: "vidalhealthtpa.com",
    contactNumber: "+91 80 4333 4333",
    avgTurnaround: "2.1 Hours",
    status: "Active Connected",
  },
  {
    id: "tpa-4",
    name: "MDIndia Health Insurance TPA Pvt Ltd",
    code: "TPA-MDINDIA",
    portalUrl: "mdindiaonline.com",
    contactNumber: "+91 20 2530 0000",
    avgTurnaround: "1.8 Hours",
    status: "Active Connected",
  },
];

export default function TPAManagementPage() {
  const columns: Column<TPADesk>[] = [
    {
      header: "TPA Name",
      accessorKey: "name",
      cell: (t) => (
        <div>
          <p className="font-bold text-slate-900 dark:text-slate-100">{t.name}</p>
          <p className="font-mono text-[11px] text-blue-600">{t.code}</p>
        </div>
      ),
    },
    {
      header: "Portal Desk",
      accessorKey: "portalUrl",
      cell: (t) => <span className="font-mono text-xs">{t.portalUrl}</span>,
    },
    {
      header: "Direct Helpline",
      accessorKey: "contactNumber",
    },
    {
      header: "Avg Pre-Auth TAT",
      accessorKey: "avgTurnaround",
      cell: (t) => <span className="font-bold text-emerald-600">{t.avgTurnaround}</span>,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (t) => <StatusBadge status={t.status} />,
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Insurance", href: "/insurance" },
          { label: "TPA Desks" },
        ]}
        title="Third Party Administrators (TPA) Management"
        description="Portal interfaces, automated pre-authorization APIs, insurer integrations, and response metrics."
      />

      <DataTable
        data={mockTPAs}
        columns={columns}
        searchPlaceholder="Search TPAs..."
        searchFields={["name", "code", "portalUrl"]}
      />
    </DashboardShell>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Scan, Eye, Activity } from "lucide-react";

interface RadiologyReq {
  id: string;
  orderNumber: string;
  uhid: string;
  patientName: string;
  modality: "MRI 3.0 Tesla" | "CT 128 Slice" | "Digital X-Ray" | "Ultrasound 4D";
  bodyPart: string;
  referringDoctor: string;
  priority: "Emergency STAT" | "Routine Outpatient";
  status: "Scheduled" | "Scan Completed" | "Reporting";
}

const mockRadiologyOrders: RadiologyReq[] = [
  {
    id: "rad-1",
    orderNumber: "RAD-2026-901",
    uhid: "NU-2026-621874",
    patientName: "Vikramaditya Patel",
    modality: "Digital X-Ray",
    bodyPart: "Bilateral Knee AP & Lateral Standing",
    referringDoctor: "Dr. Sandeep Chawla (Ortho)",
    priority: "Routine Outpatient",
    status: "Scan Completed",
  },
  {
    id: "rad-2",
    orderNumber: "RAD-2026-512",
    uhid: "NU-2026-512093",
    patientName: "Ananya S. Sen",
    modality: "Ultrasound 4D",
    bodyPart: "Obstetric Anomaly & Fetal Doppler Scan",
    referringDoctor: "Dr. Meenakshi Sundaram (OBG)",
    priority: "Routine Outpatient",
    status: "Scan Completed",
  },
  {
    id: "rad-3",
    orderNumber: "RAD-2026-890",
    uhid: "NU-2026-890234",
    patientName: "Mohammed Irfan Siddiqui",
    modality: "CT 128 Slice",
    bodyPart: "Contrast Enhanced CT Abdomen & Pelvis",
    referringDoctor: "Dr. Amitesh Mukherjee (Surgery)",
    priority: "Emergency STAT",
    status: "Reporting",
  },
];

export default function RadiologyRequestsPage() {
  const columns: Column<RadiologyReq>[] = [
    {
      header: "Order ID",
      accessorKey: "orderNumber",
      cell: (r) => <span className="font-mono font-bold text-xs text-blue-600">{r.orderNumber}</span>,
    },
    {
      header: "Patient",
      accessorKey: "patientName",
      cell: (r) => (
        <div>
          <p className="font-bold">{r.patientName}</p>
          <p className="text-[11px] text-slate-400 font-mono">{r.uhid}</p>
        </div>
      ),
    },
    {
      header: "Imaging Modality",
      accessorKey: "modality",
      cell: (r) => (
        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          {r.modality}
        </span>
      ),
    },
    {
      header: "Study Description",
      accessorKey: "bodyPart",
      cell: (r) => <span className="font-medium text-slate-800 dark:text-slate-200">{r.bodyPart}</span>,
    },
    {
      header: "Referring Consultant",
      accessorKey: "referringDoctor",
    },
    {
      header: "Priority",
      accessorKey: "priority",
      cell: (r) => (
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
            r.priority.includes("STAT")
              ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400 animate-pulse"
              : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
          }`}
        >
          {r.priority}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (r) => <StatusBadge status={r.status} />,
    },
    {
      header: "Actions",
      cell: (r) => (
        <Link
          href="/radiology/reports"
          className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
        >
          <Eye className="w-3.5 h-3.5" /> DICOM Report
        </Link>
      ),
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Radiology", href: "/radiology/requests" },
          { label: "Imaging Requests" },
        ]}
        title="Department of Diagnostic Radiology & Imaging Requisitions"
        description="MRI 3.0T, 128-Slice Multi-detector CT, Digital Radiography, Ultrasound 4D Doppler, and Mammography orders."
      />

      <DataTable
        data={mockRadiologyOrders}
        columns={columns}
        searchPlaceholder="Search imaging orders by patient, modality, body part..."
        searchFields={["orderNumber", "patientName", "uhid", "modality", "bodyPart"]}
      />
    </DashboardShell>
  );
}

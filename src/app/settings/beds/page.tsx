"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { StatCard } from "@/components/common/StatCard";
import { toast } from "sonner";
import { Bed, CheckCircle2, Clock, Wrench, Plus } from "lucide-react";

interface BedMasterRecord {
  id: string;
  bedNumber: string;
  ward: string;
  roomType: string;
  oxygenPort: boolean;
  ventilatorAttached: boolean;
  isMotorized: boolean;
  status: "Available" | "Occupied" | "Cleaning" | "Maintenance";
}

const INITIAL_BEDS: BedMasterRecord[] = [
  { id: "1", bedNumber: "ICU-01", ward: "ICU Complex", roomType: "ICU / CCU", oxygenPort: true, ventilatorAttached: true, isMotorized: true, status: "Occupied" },
  { id: "2", bedNumber: "ICU-02", ward: "ICU Complex", roomType: "ICU / CCU", oxygenPort: true, ventilatorAttached: true, isMotorized: true, status: "Occupied" },
  { id: "3", bedNumber: "ICU-03", ward: "ICU Complex", roomType: "ICU / CCU", oxygenPort: true, ventilatorAttached: false, isMotorized: true, status: "Available" },
  { id: "4", bedNumber: "PVT-101", ward: "Private Wing", roomType: "Private Deluxe", oxygenPort: true, ventilatorAttached: false, isMotorized: true, status: "Occupied" },
  { id: "5", bedNumber: "PVT-102", ward: "Private Wing", roomType: "Private Deluxe", oxygenPort: true, ventilatorAttached: false, isMotorized: true, status: "Available" },
  { id: "6", bedNumber: "PVT-103", ward: "Private Wing", roomType: "Private Deluxe", oxygenPort: true, ventilatorAttached: false, isMotorized: true, status: "Cleaning" },
  { id: "7", bedNumber: "GM-01", ward: "General Ward", roomType: "General Male", oxygenPort: true, ventilatorAttached: false, isMotorized: false, status: "Occupied" },
  { id: "8", bedNumber: "GM-02", ward: "General Ward", roomType: "General Male", oxygenPort: true, ventilatorAttached: false, isMotorized: false, status: "Available" },
  { id: "9", bedNumber: "GM-03", ward: "General Ward", roomType: "General Male", oxygenPort: false, ventilatorAttached: false, isMotorized: false, status: "Maintenance" },
];

export default function BedsMasterPage() {
  const [beds, setBeds] = useState<BedMasterRecord[]>(INITIAL_BEDS);

  const columns = [
    { key: "bedNumber", header: "Bed Identifier", render: (r: BedMasterRecord) => <span className="font-mono font-bold text-[var(--primary)]">{r.bedNumber}</span> },
    { key: "ward", header: "Ward Zone" },
    { key: "roomType", header: "Accommodation Class", render: (r: BedMasterRecord) => <span className="font-medium text-[var(--foreground)]">{r.roomType}</span> },
    { key: "oxygenPort", header: "Central O2 Port", render: (r: BedMasterRecord) => <span className="text-xs">{r.oxygenPort ? "Yes (Pipeline)" : "Cylinder"}</span> },
    { key: "ventilatorAttached", header: "Ventilator Port", render: (r: BedMasterRecord) => <span className="text-xs">{r.ventilatorAttached ? "Equipped" : "No"}</span> },
    { key: "isMotorized", header: "Bed Type", render: (r: BedMasterRecord) => <span className="text-xs">{r.isMotorized ? "Electric Motorized (5-Func)" : "Manual Fowler"}</span> },
    {
      key: "status",
      header: "Status",
      render: (r: BedMasterRecord) => (
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
          r.status === "Available" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400" :
          r.status === "Occupied" ? "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-400" :
          r.status === "Cleaning" ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400" :
          "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-400"
        }`}>
          {r.status}
        </span>
      )
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        title="Physical Beds & Biomedical Asset Master"
        description="Individual bed inventory, medical gas pipeline ports (MGPS), motorized Fowler beds, telemetry ports, and operational status"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings/hospital" },
          { label: "Beds Master" },
        ]}
        actions={
          <button
            onClick={() => toast.success("New bed asset registration modal opened")}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Add Bed Asset
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Registered Beds" value={String(beds.length + 50)} subtitle="Hardware inventory" icon={Bed} />
        <StatCard title="Occupied (Active)" value={String(beds.filter(b => b.status === "Occupied").length + 40)} subtitle="Current patients" icon={CheckCircle2} />
        <StatCard title="Ready / Vacant" value={String(beds.filter(b => b.status === "Available").length + 7)} subtitle="Immediate admission" icon={CheckCircle2} />
        <StatCard title="Under Maintenance" value="3" subtitle="Bio-medical servicing" icon={Wrench} />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">Individual Bed Asset Directory</h3>
        <DataTable columns={columns} data={beds} searchKey="bedNumber" searchPlaceholder="Search bed ID or ward..." />
      </div>
    </DashboardShell>
  );
}

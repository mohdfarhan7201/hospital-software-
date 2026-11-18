"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { StatCard } from "@/components/common/StatCard";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { Building, Bed, DollarSign, Plus, CheckCircle2 } from "lucide-react";

interface RoomCategory {
  id: string;
  code: string;
  name: string;
  ward: string;
  floor: string;
  capacityBeds: number;
  dailyRent: number;
  nursingDailyCharge: number;
  amenities: string[];
  status: "Active" | "Maintenance";
}

const INITIAL_ROOMS: RoomCategory[] = [
  { id: "1", code: "GEN-M", name: "General Ward (Male Wing)", ward: "General Ward", floor: "1st Floor", capacityBeds: 20, dailyRent: 1200, nursingDailyCharge: 400, amenities: ["Shared Bathroom", "Ceiling Fan", "Nurse Call Bell"], status: "Active" },
  { id: "2", code: "GEN-F", name: "General Ward (Female Wing)", ward: "General Ward", floor: "1st Floor", capacityBeds: 15, dailyRent: 1200, nursingDailyCharge: 400, amenities: ["Shared Bathroom", "Curtain Partition", "Nurse Call Bell"], status: "Active" },
  { id: "3", code: "PVT-DLX", name: "Private Deluxe Single Room", ward: "Private Wing", floor: "2nd Floor", capacityBeds: 10, dailyRent: 4500, nursingDailyCharge: 1200, amenities: ["Attached Bath", "AC", "Attendant Couch", "Smart TV", "Mini Refrigerator"], status: "Active" },
  { id: "4", code: "ICU-CCU", name: "Cardiothoracic Intensive Care Unit", ward: "ICU Complex", floor: "3rd Floor", capacityBeds: 8, dailyRent: 7500, nursingDailyCharge: 2500, amenities: ["Invasive Ventilator", "Central Monitoring", "1:1 Dedicated Nurse", "Oxygen Port"], status: "Active" },
  { id: "5", code: "MAT-SUITE", name: "Maternity & LDRP Suite", ward: "Mother & Child Wing", floor: "2nd Floor", capacityBeds: 6, dailyRent: 5500, nursingDailyCharge: 1500, amenities: ["LDR Bed", "Baby Warmer", "Attached Restroom", "Sofa-cum-Bed"], status: "Active" },
];

export default function RoomsMasterPage() {
  const [rooms, setRooms] = useState<RoomCategory[]>(INITIAL_ROOMS);

  const columns = [
    { key: "code", header: "Class Code", render: (r: RoomCategory) => <span className="font-mono font-bold text-[var(--primary)]">{r.code}</span> },
    { key: "name", header: "Room / Ward Type", render: (r: RoomCategory) => <span className="font-bold text-[var(--foreground)]">{r.name}</span> },
    { key: "ward", header: "Ward Zone" },
    { key: "floor", header: "Floor Location", render: (r: RoomCategory) => <span className="text-xs font-mono">{r.floor}</span> },
    { key: "capacityBeds", header: "Bed Capacity", render: (r: RoomCategory) => <span className="font-mono font-semibold">{r.capacityBeds} Beds</span> },
    { key: "dailyRent", header: "Daily Rent", render: (r: RoomCategory) => <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(r.dailyRent)}/day</span> },
    { key: "nursingDailyCharge", header: "Nursing Charge", render: (r: RoomCategory) => <span className="font-mono text-xs">{formatCurrency(r.nursingDailyCharge)}/day</span> },
    {
      key: "status",
      header: "Status",
      render: (r: RoomCategory) => (
        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400">
          {r.status}
        </span>
      )
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        title="Rooms & Wards Master Configuration"
        description="Ward classifications, single deluxe suites, semi-private rooms, ICU beds, tariff structures, and amenity configurations"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings/hospital" },
          { label: "Rooms & Wards" },
        ]}
        actions={
          <button
            onClick={() => toast.success("Room category wizard opened")}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Define Room Class
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <StatCard title="Ward Categories" value={String(rooms.length)} subtitle="Configured in HIS" icon={Building} />
        <StatCard title="Total Sanctioned Beds" value={String(rooms.reduce((acc, r) => acc + r.capacityBeds, 0))} subtitle="Across all ward floors" icon={Bed} />
        <StatCard title="ICU / CCU Beds" value="8" subtitle="Dedicated telemetry" icon={CheckCircle2} />
        <StatCard title="Base Room Tariff" value="₹1,200/day" subtitle="General Ward standard" icon={DollarSign} />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">Inpatient Accommodation Tariff Schedule</h3>
        <DataTable columns={columns} data={rooms} searchKey="name" searchPlaceholder="Search room class or ward..." />
      </div>
    </DashboardShell>
  );
}

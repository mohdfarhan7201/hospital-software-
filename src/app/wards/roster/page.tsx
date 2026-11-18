"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockBeds } from "@/data/mockData";
import { Bed } from "@/types";
import { formatCurrency } from "@/lib/utils";
import {
  BedDouble,
  User,
  Activity,
  Plus,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

export default function BedRosterPage() {
  const [beds, setBeds] = useState<Bed[]>(mockBeds);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);

  const filteredBeds = beds.filter(
    (b) => statusFilter === "ALL" || b.status.toLowerCase() === statusFilter.toLowerCase()
  );

  const handleUpdateBedStatus = (bedId: string, newStatus: Bed["status"]) => {
    setBeds((prev) =>
      prev.map((b) => (b.id === bedId ? { ...b, status: newStatus } : b))
    );
    setSelectedBed(null);
    toast.success(`Bed updated to ${newStatus}`);
  };

  const getStatusColor = (status: Bed["status"]) => {
    switch (status) {
      case "Available":
        return "border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300";
      case "Occupied":
        return "border-blue-500 bg-blue-50/60 dark:bg-blue-950/30 text-blue-800 dark:text-blue-200";
      case "Reserved":
        return "border-purple-500 bg-purple-50/50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300";
      case "Cleaning":
        return "border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300";
      case "Maintenance":
        return "border-slate-400 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400";
      default:
        return "border-slate-200";
    }
  };

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "IPD & Wards", href: "/ipd" },
          { label: "Bed Roster" },
        ]}
        title="Visual Bed Roster & Occupancy Matrix"
        description="Real-time graphical ward layout showing live bed vacancies, occupied clinical cases, sanitization, and maintenance statuses."
      >
        <Link
          href="/ipd/admission/new"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white shadow-xs"
        >
          <Plus className="w-4 h-4" /> Admit Patient
        </Link>
      </PageHeader>

      {/* Legend & Filter Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 mb-6 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-semibold text-slate-500">Legend:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>Available ({beds.filter((b) => b.status === "Available").length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-600" />
            <span>Occupied ({beds.filter((b) => b.status === "Occupied").length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-purple-500" />
            <span>Reserved ({beds.filter((b) => b.status === "Reserved").length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span>Cleaning ({beds.filter((b) => b.status === "Cleaning").length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-slate-400" />
            <span>Maintenance ({beds.filter((b) => b.status === "Maintenance").length})</span>
          </div>
        </div>

        <select
          aria-label="Filter Bed Roster by Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
        >
          <option value="ALL">Show All Bed Categories</option>
          <option value="available">Only Available</option>
          <option value="occupied">Only Occupied</option>
          <option value="cleaning">Only Cleaning / Sanitizing</option>
        </select>
      </div>

      {/* Bed Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredBeds.map((bed) => {
          const isOccupied = bed.status === "Occupied";
          return (
            <div
              key={bed.id}
              onClick={() => setSelectedBed(bed)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-[1.02] shadow-2xs flex flex-col justify-between h-44 ${getStatusColor(
                bed.status
              )}`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-extrabold text-sm">{bed.bedNumber}</span>
                  <StatusBadge status={bed.status} />
                </div>
                <p className="font-semibold text-xs line-clamp-1">{bed.wardName}</p>
                <p className="text-[11px] opacity-75">{bed.type} • {formatCurrency(bed.ratePerDay)}/d</p>
              </div>

              {isOccupied && bed.patient ? (
                <div className="pt-2 border-t border-blue-200/50 dark:border-blue-900/50">
                  <p className="font-bold text-xs truncate">{bed.patient.name}</p>
                  <p className="text-[10px] font-mono opacity-80">{bed.patient.uhid}</p>
                  <p className="text-[10px] truncate opacity-85 mt-0.5">{bed.patient.doctorName}</p>
                </div>
              ) : (
                <div className="pt-2 border-t border-current/20 text-[11px] font-medium opacity-75">
                  {bed.status === "Available" ? "Ready for patient admission" : `Status: ${bed.status}`}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bed Details Drawer / Modal */}
      {selectedBed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl text-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Bed: {selectedBed.bedNumber}
                </h3>
                <p className="text-slate-500">{selectedBed.wardName} ({selectedBed.type})</p>
              </div>
              <StatusBadge status={selectedBed.status} />
            </div>

            <div className="space-y-2">
              <p className="text-slate-500">Tariff Rate:</p>
              <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
                {formatCurrency(selectedBed.ratePerDay)} / Day
              </p>

              {selectedBed.patient && (
                <div className="p-3 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/30 space-y-1.5 mt-2">
                  <p className="font-bold text-slate-900 dark:text-slate-100">
                    Occupying Patient: {selectedBed.patient.name}
                  </p>
                  <p className="font-mono text-slate-500">UHID: {selectedBed.patient.uhid}</p>
                  <p className="text-slate-600 dark:text-slate-300">
                    Consultant: {selectedBed.patient.doctorName}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    Admitted: {selectedBed.patient.admissionDate}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 font-medium">
                    Diagnosis: {selectedBed.patient.diagnosis}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <p className="font-bold text-slate-700 dark:text-slate-300">Change Bed State:</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleUpdateBedStatus(selectedBed.id, "Available")}
                  className="p-2 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 font-semibold"
                >
                  Mark Available
                </button>
                <button
                  onClick={() => handleUpdateBedStatus(selectedBed.id, "Cleaning")}
                  className="p-2 rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 font-semibold"
                >
                  Send to Cleaning
                </button>
                <button
                  onClick={() => handleUpdateBedStatus(selectedBed.id, "Maintenance")}
                  className="p-2 rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-semibold"
                >
                  Maintenance
                </button>
                <button
                  onClick={() => handleUpdateBedStatus(selectedBed.id, "Reserved")}
                  className="p-2 rounded-lg bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border border-purple-200 font-semibold"
                >
                  Reserve Bed
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setSelectedBed(null)}
                className="px-4 py-2 rounded-lg border font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

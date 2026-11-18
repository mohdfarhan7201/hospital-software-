"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Scissors, CheckCircle, Clock } from "lucide-react";

interface OTRoom {
  id: string;
  name: string;
  speciality: string;
  hvacAirPressure: string;
  equipment: string[];
  status: "Active" | "Cleaning" | "Ready";
}

const otSuites: OTRoom[] = [
  {
    id: "ot-1",
    name: "OT Suite 01",
    speciality: "Orthopaedics & Joint Replacement",
    hvacAirPressure: "Positive Pressure Laminar Airflow (HEPA 99.99%)",
    equipment: ["Brainlab Navigation System", "Stryker Ortho Power Tools", "C-Arm Fluoroscopy"],
    status: "Ready",
  },
  {
    id: "ot-2",
    name: "OT Suite 02",
    speciality: "Laparoscopic & Minimally Invasive Surgery",
    hvacAirPressure: "Positive Pressure Cleanroom Class 100",
    equipment: ["Karl Storz 4K Laparoscopy Tower", "Olympus Thunderbeat Energy Device"],
    status: "Active",
  },
  {
    id: "ot-3",
    name: "OT Suite 03",
    speciality: "Neurosurgery & Spine Centre",
    hvacAirPressure: "Positive Laminar Airflow",
    equipment: ["Zeiss Kinevo 900 Surgical Microscope", "Medtronic StealthStation S8"],
    status: "Ready",
  },
  {
    id: "ot-4",
    name: "Minor OT & Daycare Surgery",
    speciality: "Plastic & Minor Trauma Procedures",
    hvacAirPressure: "Standard Clean Air",
    equipment: ["Electrocautery", "Minor Procedure Sets"],
    status: "Cleaning",
  },
];

export default function OTRoomsPage() {
  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Operation Theatre", href: "/operation-theatre" },
          { label: "Surgical Suites" },
        ]}
        title="Operation Theatre (OT) Suites & Infrastructure"
        description="Air handling units (AHU), laminar airflow sterility ratings, biomedical equipment, and cleanroom readiness."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {otSuites.map((ot) => (
          <div
            key={ot.id}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">{ot.name}</h3>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{ot.speciality}</p>
              </div>
              <StatusBadge status={ot.status} />
            </div>

            <p className="text-xs text-slate-500 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
              <strong>HVAC:</strong> {ot.hvacAirPressure}
            </p>

            <div className="text-xs space-y-1">
              <span className="font-bold text-slate-700 dark:text-slate-300">Biomedical Equipment:</span>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-400">
                {ot.equipment.map((eq, i) => (
                  <li key={i}>{eq}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}

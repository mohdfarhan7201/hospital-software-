"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { BedDouble, Users, ArrowRight, Plus } from "lucide-react";

export default function WardManagementPage() {
  const wardsList = [
    { name: "Coronary Intensive Care Unit (CCU)", floor: "Floor 3, Wing A", beds: 12, headNurse: "Sr. Marykutty Thomas", type: "Critical Care" },
    { name: "Male Medical Ward", floor: "Floor 2, Wing A", beds: 32, headNurse: "Sr. Anita Deshmukh", type: "General Inpatient" },
    { name: "Female Surgical Ward", floor: "Floor 2, Wing B", beds: 28, headNurse: "Sr. Deepa Nair", type: "Post-Surgical" },
    { name: "Maternity & OBG Special Care", floor: "Floor 4, Wing A", beds: 20, headNurse: "Sr. Kavita Salunke", type: "Maternity Care" },
    { name: "High Dependency Unit (HDU)", floor: "Floor 3, Wing B", beds: 16, headNurse: "Sr. Preeti Joseph", type: "Step-Down ICU" },
    { name: "Deluxe Private Suites", floor: "Floor 4, Wing C", beds: 14, headNurse: "Sr. Shweta Patil", type: "Private" },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "IPD & Wards", href: "/wards" },
          { label: "Wards Directory" },
        ]}
        title="Hospital Inpatient Wards Directory"
        description="Configuration of hospital wings, ward units, nursing in-charges, and bed capacity ceilings."
      >
        <Link
          href="/wards/roster"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white shadow-xs"
        >
          <BedDouble className="w-4 h-4" /> Visual Bed Matrix
        </Link>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {wardsList.map((ward) => (
          <div
            key={ward.name}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  {ward.type}
                </span>
                <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                  {ward.beds} Beds
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">{ward.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{ward.floor}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                Nursing In-charge: <strong>{ward.headNurse}</strong>
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <Link href="/wards/beds" className="text-blue-600 font-semibold hover:underline">
                View Assigned Beds
              </Link>
              <Link href="/wards/roster" className="text-slate-500 hover:text-slate-800">
                Live Roster
              </Link>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}

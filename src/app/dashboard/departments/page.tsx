"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import {
  Heart,
  Bone,
  Brain,
  Baby,
  Activity,
  Scissors,
  Stethoscope,
  Users,
  BedDouble,
  ArrowRight,
  Search,
} from "lucide-react";

interface Dept {
  id: string;
  name: string;
  hod: string;
  icon: any;
  iconColor: string;
  doctorsCount: number;
  bedsAllocated: number;
  occupancyPct: number;
  opdPatientsToday: number;
  surgeriesToday: number;
  status: "Normal" | "High Load" | "Critical";
}

const departmentsData: Dept[] = [
  {
    id: "cardio",
    name: "Cardiology & Cardiac Surgery",
    hod: "Dr. Arvind Subramaniam",
    icon: Heart,
    iconColor: "text-rose-600 bg-rose-50 dark:bg-rose-950/50",
    doctorsCount: 8,
    bedsAllocated: 34,
    occupancyPct: 94,
    opdPatientsToday: 68,
    surgeriesToday: 3,
    status: "High Load",
  },
  {
    id: "ortho",
    name: "Orthopaedics & Joint Care",
    hod: "Dr. Sandeep Chawla",
    icon: Bone,
    iconColor: "text-blue-600 bg-blue-50 dark:bg-blue-950/50",
    doctorsCount: 6,
    bedsAllocated: 28,
    occupancyPct: 82,
    opdPatientsToday: 54,
    surgeriesToday: 4,
    status: "Normal",
  },
  {
    id: "neuro",
    name: "Neurology & Neurosurgery",
    hod: "Dr. Radhika Kulkarni",
    icon: Brain,
    iconColor: "text-purple-600 bg-purple-50 dark:bg-purple-950/50",
    doctorsCount: 5,
    bedsAllocated: 20,
    occupancyPct: 85,
    opdPatientsToday: 42,
    surgeriesToday: 1,
    status: "Normal",
  },
  {
    id: "obg",
    name: "Obstetrics & Gynaecology",
    hod: "Dr. Meenakshi Sundaram",
    icon: Baby,
    iconColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50",
    doctorsCount: 7,
    bedsAllocated: 24,
    occupancyPct: 79,
    opdPatientsToday: 61,
    surgeriesToday: 2,
    status: "Normal",
  },
  {
    id: "pediatrics",
    name: "Pediatrics & Neonatology",
    hod: "Dr. Farhan Qureshi",
    icon: Activity,
    iconColor: "text-amber-600 bg-amber-50 dark:bg-amber-950/50",
    doctorsCount: 5,
    bedsAllocated: 18,
    occupancyPct: 60,
    opdPatientsToday: 48,
    surgeriesToday: 0,
    status: "Normal",
  },
  {
    id: "gensurg",
    name: "General & Laparoscopic Surgery",
    hod: "Dr. Amitesh Mukherjee",
    icon: Scissors,
    iconColor: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50",
    doctorsCount: 6,
    bedsAllocated: 22,
    occupancyPct: 88,
    opdPatientsToday: 39,
    surgeriesToday: 3,
    status: "Normal",
  },
];

export default function DepartmentDashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDepts = departmentsData.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.hod.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Dashboards", href: "/dashboard" },
          { label: "Department Dashboard" },
        ]}
        title="Departmental Operations & Specialities"
        description="Head of department allocation, live bed occupancy, and daily case distribution."
      >
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search department or HOD..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
          />
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDepts.map((dept) => {
          const Icon = dept.icon;
          return (
            <div
              key={dept.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${dept.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <StatusBadge status={dept.status} />
                </div>

                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  {dept.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">HOD: {dept.hod}</p>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" /> Consultants On Duty
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {dept.doctorsCount} Specialists
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Stethoscope className="w-3.5 h-3.5" /> OPD Volume Today
                    </span>
                    <span className="font-bold text-blue-600">
                      {dept.opdPatientsToday} Consults
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Scissors className="w-3.5 h-3.5" /> Surgeries Scheduled
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {dept.surgeriesToday} Procedures
                    </span>
                  </div>

                  {/* Bed Occupancy Bar */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-500">
                        Bed Occupancy ({dept.bedsAllocated} Beds)
                      </span>
                      <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                        {dept.occupancyPct}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full ${
                          dept.occupancyPct > 90
                            ? "bg-rose-500"
                            : dept.occupancyPct > 75
                            ? "bg-blue-600"
                            : "bg-emerald-500"
                        }`}
                        style={{ width: `${dept.occupancyPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <Link
                  href="/opd/flowboard"
                  className="text-blue-600 dark:text-blue-400 font-semibold inline-flex items-center gap-1 hover:underline"
                >
                  View OPD Flow <ArrowRight className="w-3 h-3" />
                </Link>
                <Link
                  href="/wards/roster"
                  className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                >
                  Ward Beds
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardShell>
  );
}

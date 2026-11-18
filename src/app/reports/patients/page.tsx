"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { StatCard } from "@/components/common/StatCard";
import { exportToCSV, formatDate } from "@/lib/utils";
import { toast } from "sonner";
import { Users, UserCheck, ShieldCheck, Download, Calendar, Filter } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const AGE_DISTRIBUTION = [
  { group: "0-12 yrs", count: 340 },
  { group: "13-25 yrs", count: 520 },
  { group: "26-45 yrs", count: 1140 },
  { group: "46-60 yrs", count: 860 },
  { group: "60+ yrs", count: 680 },
];

const PATIENT_REG_RECORDS = [
  { id: "1", uhid: "NU-2026-004812", name: "Rajesh Kumar Sharma", age: 46, gender: "Male", phone: "+91 98765 43210", abhaStatus: "Linked", city: "Dwarka, New Delhi", regDate: "2026-10-12" },
  { id: "2", uhid: "NU-2026-004813", name: "Priya Sundaram", age: 34, gender: "Female", phone: "+91 98111 22334", abhaStatus: "Linked", city: "Gurugram, HR", regDate: "2026-10-12" },
  { id: "3", uhid: "NU-2026-004814", name: "Amitabh Verma", age: 58, gender: "Male", phone: "+91 94500 11223", abhaStatus: "Pending", city: "Noida, UP", regDate: "2026-10-13" },
  { id: "4", uhid: "NU-2026-004815", name: "Sunita Deshmukh", age: 62, gender: "Female", phone: "+91 97654 32109", abhaStatus: "Linked", city: "South Ex, New Delhi", regDate: "2026-10-13" },
  { id: "5", uhid: "NU-2026-004816", name: "Manish Aggarwal", age: 29, gender: "Male", phone: "+91 99887 76655", abhaStatus: "Not Created", city: "Faridabad, HR", regDate: "2026-10-14" },
  { id: "6", uhid: "NU-2026-004817", name: "Ananya Iyer", age: 27, gender: "Female", phone: "+91 91234 56789", abhaStatus: "Linked", city: "Vasant Kunj, New Delhi", regDate: "2026-10-15" },
];

export default function PatientReportsPage() {
  const [data, setData] = useState(PATIENT_REG_RECORDS);

  const columns = [
    { key: "uhid", header: "UHID", render: (r: any) => <span className="font-mono font-bold text-[var(--primary)]">{r.uhid}</span> },
    { key: "name", header: "Patient Name", render: (r: any) => <span className="font-medium text-[var(--foreground)]">{r.name}</span> },
    { key: "demographics", header: "Demographics", render: (r: any) => <span>{r.age} Y / {r.gender}</span> },
    { key: "phone", header: "Mobile", render: (r: any) => <span className="font-mono text-xs">{r.phone}</span> },
    { key: "city", header: "Location" },
    { 
      key: "abhaStatus", 
      header: "ABHA Status", 
      render: (r: any) => (
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
          r.abhaStatus === "Linked" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400" :
          r.abhaStatus === "Pending" ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400" :
          "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
        }`}>
          {r.abhaStatus}
        </span>
      )
    },
    { key: "regDate", header: "Registration Date", render: (r: any) => formatDate(r.regDate) },
  ];

  return (
    <DashboardShell>
      <PageHeader
        title="Patient Demographics & Census Reports"
        description="Comprehensive audit of patient registrations, age clusters, regional reach, and Ayushman Bharat (ABHA) digital integration"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Reports", href: "/reports" },
          { label: "Patient Reports" },
        ]}
        actions={
          <button
            onClick={() => {
              exportToCSV(data, "patient-demographics-report.csv");
              toast.success("Patient demographics report downloaded");
            }}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Export Patient Audit
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Registrations" value="3,540" subtitle="This financial year" icon={Users} />
        <StatCard title="ABHA Linkage Ratio" value="78.2%" subtitle="2,768 linked to ABDM" icon={ShieldCheck} />
        <StatCard title="Repeat Patient Rate" value="44.8%" subtitle="Return consults within 90 days" icon={UserCheck} />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 mb-6 shadow-sm">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-1">Patient Age Cohort Distribution</h3>
        <p className="text-xs text-[var(--muted-foreground)] mb-4">Volume by demographic age bands for clinical workload profiling</p>
        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={AGE_DISTRIBUTION}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="group" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip />
              <Bar dataKey="count" name="Patients" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">Recent Registration Registry</h3>
        <DataTable columns={columns} data={data} searchKey="name" searchPlaceholder="Search by name, UHID, or city..." />
      </div>
    </DashboardShell>
  );
}

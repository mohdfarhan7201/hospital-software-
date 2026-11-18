"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Patient } from "@/types";
import { mockPatients } from "@/data/mockData";
import { formatDate } from "@/lib/utils";
import { Plus, Eye, Calendar, FileText, Phone, UserCheck } from "lucide-react";
import { toast } from "sonner";

export default function PatientsListPage() {
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>(mockPatients);

  const columns: Column<Patient>[] = [
    {
      header: "UHID",
      accessorKey: "uhid",
      sortable: true,
      cell: (p) => (
        <span className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400">
          {p.uhid}
        </span>
      ),
    },
    {
      header: "Patient Name",
      accessorKey: "fullName",
      sortable: true,
      cell: (p) => (
        <div className="flex items-center gap-3">
          {p.photoUrl ? (
            <img
              src={p.photoUrl}
              alt={p.fullName}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-[var(--primary)]/20 shrink-0 shadow-xs"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-bold flex items-center justify-center text-xs shrink-0">
              {p.fullName.slice(0, 2)}
            </div>
          )}
          <div>
            <p className="font-bold text-[var(--foreground)]">{p.fullName}</p>
            <p className="text-[11px] text-[var(--muted-foreground)]">{p.address.city}, {p.address.state}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Age / Sex",
      cell: (p) => (
        <span className="text-xs">
          {p.age} Y / {p.gender[0]}
        </span>
      ),
    },
    {
      header: "Mobile",
      accessorKey: "mobile",
      cell: (p) => (
        <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
          {p.mobile}
        </span>
      ),
    },
    {
      header: "Blood Group",
      accessorKey: "bloodGroup",
      cell: (p) => (
        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          {p.bloodGroup}
        </span>
      ),
    },
    {
      header: "Registered",
      accessorKey: "registrationDate",
      sortable: true,
      cell: (p) => (
        <span className="text-xs">{formatDate(p.registrationDate)}</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (p) => <StatusBadge status={p.status} />,
    },
    {
      header: "Actions",
      cell: (p) => (
        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          <Link
            href={`/patients/${p.uhid}`}
            className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-blue-600"
            title="Open Patient 360"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <Link
            href={`/appointments`}
            className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-emerald-600"
            title="Schedule Appointment"
          >
            <Calendar className="w-4 h-4" />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Front Desk", href: "/patients" },
          { label: "Patient Directory" },
        ]}
        title="Patient Management & Directory"
        description="Comprehensive master patient index (MPI) with unique health identifier (UHID), registration records, and clinical histories."
      >
        <Link
          href="/patients/new"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Patient</span>
        </Link>
      </PageHeader>

      <DataTable
        data={patients}
        columns={columns}
        searchPlaceholder="Search by UHID, patient name, phone, or city..."
        searchFields={["uhid", "fullName", "mobile"]}
        filters={[
          {
            key: "status",
            label: "Status",
            options: [
              { label: "Active", value: "Active" },
              { label: "Admitted", value: "Admitted" },
              { label: "Discharged", value: "Discharged" },
              { label: "Emergency", value: "Emergency" },
            ],
          },
          {
            key: "gender",
            label: "Gender",
            options: [
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
            ],
          },
        ]}
        exportFileName="nuvertos_patients_master"
        onRowClick={(patient) => router.push(`/patients/${patient.uhid}`)}
      />
    </DashboardShell>
  );
}

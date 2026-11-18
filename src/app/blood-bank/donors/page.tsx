"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Heart, Plus, Phone } from "lucide-react";
import { toast } from "sonner";

interface Donor {
  id: string;
  donorId: string;
  fullName: string;
  bloodGroup: string;
  age: number;
  gender: string;
  mobile: string;
  lastDonationDate: string;
  totalDonations: number;
  eligibility: "Eligible to Donate" | "Deferred (Within 90 Days)";
}

const mockDonors: Donor[] = [
  {
    id: "dn-1",
    donorId: "DNR-2026-081",
    fullName: "Karan S. Malhotra",
    bloodGroup: "O-",
    age: 32,
    gender: "Male",
    mobile: "+91 98201 88123",
    lastDonationDate: "12 Aug 2026",
    totalDonations: 8,
    eligibility: "Eligible to Donate",
  },
  {
    id: "dn-2",
    donorId: "DNR-2026-082",
    fullName: "Pooja V. Nair",
    bloodGroup: "A+",
    age: 26,
    gender: "Female",
    mobile: "+91 98202 77112",
    lastDonationDate: "14 Oct 2026",
    totalDonations: 3,
    eligibility: "Deferred (Within 90 Days)",
  },
  {
    id: "dn-3",
    donorId: "DNR-2026-083",
    fullName: "Sameer A. Deshpande",
    bloodGroup: "B+",
    age: 41,
    gender: "Male",
    mobile: "+91 98203 55441",
    lastDonationDate: "05 Jun 2026",
    totalDonations: 12,
    eligibility: "Eligible to Donate",
  },
];

export default function BloodDonorsPage() {
  const columns: Column<Donor>[] = [
    {
      header: "Donor ID",
      accessorKey: "donorId",
      cell: (d) => <span className="font-mono font-bold text-xs text-blue-600">{d.donorId}</span>,
    },
    {
      header: "Donor Name",
      accessorKey: "fullName",
      cell: (d) => <span className="font-bold text-slate-900 dark:text-slate-100">{d.fullName}</span>,
    },
    {
      header: "Blood Group",
      accessorKey: "bloodGroup",
      cell: (d) => (
        <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
          {d.bloodGroup}
        </span>
      ),
    },
    {
      header: "Age / Sex",
      cell: (d) => `${d.age} Y / ${d.gender[0]}`,
    },
    {
      header: "Mobile",
      accessorKey: "mobile",
      cell: (d) => <span className="font-mono text-xs">{d.mobile}</span>,
    },
    {
      header: "Last Donation",
      accessorKey: "lastDonationDate",
    },
    {
      header: "Donation Count",
      accessorKey: "totalDonations",
      cell: (d) => <span className="font-bold">{d.totalDonations} Times</span>,
    },
    {
      header: "Eligibility",
      accessorKey: "eligibility",
      cell: (d) => <StatusBadge status={d.eligibility} />,
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Blood Bank", href: "/blood-bank" },
          { label: "Voluntary Donors" },
        ]}
        title="Voluntary Blood Donor Registry & Medical Screening"
        description="Maintain rare blood donor registries, 90-day donation intervals, hemoglobin screening, and camp records."
      >
        <button
          onClick={() => toast.info("New voluntary donor registration form opened.")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-600 text-white"
        >
          <Plus className="w-4 h-4" /> Register Blood Donor
        </button>
      </PageHeader>

      <DataTable
        data={mockDonors}
        columns={columns}
        searchPlaceholder="Search donors by name, blood group, mobile..."
        searchFields={["fullName", "bloodGroup", "mobile", "donorId"]}
      />
    </DashboardShell>
  );
}

"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { StatCard } from "@/components/common/StatCard";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { Package, Heart, Activity, Plus, CheckCircle2 } from "lucide-react";

interface HealthPackage {
  id: string;
  code: string;
  name: string;
  department: string;
  targetGroup: string;
  testsIncludedCount: number;
  marketPrice: number;
  packagePrice: number;
  status: "Active" | "Inactive";
}

const INITIAL_PACKAGES: HealthPackage[] = [
  { id: "1", code: "PKG-EXEC", name: "Comprehensive Executive Health Checkup", department: "Preventive Care", targetGroup: "Adults (35+ yrs)", testsIncludedCount: 42, marketPrice: 12500, packagePrice: 5999, status: "Active" },
  { id: "2", code: "PKG-CARDIO", name: "Advanced Healthy Heart Comprehensive", department: "Cardiology", targetGroup: "Hypertension / Cardiac Risk", testsIncludedCount: 18, marketPrice: 9800, packagePrice: 4499, status: "Active" },
  { id: "3", code: "PKG-DIABETIC", name: "Comprehensive Diabetic Care Annual", department: "Endocrinology", targetGroup: "Diabetic Patients", testsIncludedCount: 24, marketPrice: 8500, packagePrice: 3800, status: "Active" },
  { id: "4", code: "PKG-WOMEN", name: "Well-Woman Vitality & Cancer Screen", department: "Gynecology", targetGroup: "Women (25+ yrs)", testsIncludedCount: 28, marketPrice: 11000, packagePrice: 4999, status: "Active" },
  { id: "5", code: "PKG-SENIOR", name: "Golden Age Senior Citizen Wellness", department: "Geriatrics", targetGroup: "Seniors (60+ yrs)", testsIncludedCount: 36, marketPrice: 14000, packagePrice: 6500, status: "Active" },
];

export default function PackagesMasterPage() {
  const [packages, setPackages] = useState<HealthPackage[]>(INITIAL_PACKAGES);

  const columns = [
    { key: "code", header: "Package Code", render: (r: HealthPackage) => <span className="font-mono font-bold text-[var(--primary)]">{r.code}</span> },
    { key: "name", header: "Package Title", render: (r: HealthPackage) => <span className="font-bold text-[var(--foreground)]">{r.name}</span> },
    { key: "department", header: "Specialty" },
    { key: "targetGroup", header: "Target Audience", render: (r: HealthPackage) => <span className="text-xs px-2 py-0.5 rounded bg-[var(--background)] border border-[var(--border)]">{r.targetGroup}</span> },
    { key: "testsIncludedCount", header: "Tests Included", render: (r: HealthPackage) => <span className="font-mono font-semibold">{r.testsIncludedCount} Investigations</span> },
    { key: "marketPrice", header: "Market Value", render: (r: HealthPackage) => <span className="font-mono text-xs line-through text-[var(--muted-foreground)]">{formatCurrency(r.marketPrice)}</span> },
    { key: "packagePrice", header: "Package Price", render: (r: HealthPackage) => <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(r.packagePrice)}</span> },
    {
      key: "status",
      header: "Status",
      render: (r: HealthPackage) => (
        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400">
          {r.status}
        </span>
      )
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        title="Preventive Healthcare & Surgical Packages"
        description="Bundled health checkup packages, corporate wellness screenings, antenatal care plans, and surgical all-inclusive packages"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings/hospital" },
          { label: "Healthcare Packages" },
        ]}
        actions={
          <button
            onClick={() => toast.success("Package creation modal opened")}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Create Health Package
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard title="Active Health Packages" value={String(packages.length)} subtitle="Available at OPD counter" icon={Package} />
        <StatCard title="Executive Packages Sold" value="384" subtitle="This fiscal quarter" icon={Heart} />
        <StatCard title="Average Patient Savings" value="52%" subtitle="Compared to individual tests" icon={Activity} />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">Configured Wellness & Diagnostic Packages</h3>
        <DataTable columns={columns} data={packages} searchKey="name" searchPlaceholder="Search package name or code..." />
      </div>
    </DashboardShell>
  );
}

"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { StatCard } from "@/components/common/StatCard";
import { toast } from "sonner";
import { Database, Plus, CheckCircle2, Lock } from "lucide-react";

interface SystemField {
  id: string;
  fieldKey: string;
  label: string;
  entity: string;
  dataType: string;
  isRequired: boolean;
  isSystemLocked: boolean;
  status: "Active" | "Disabled";
}

const SYSTEM_FIELDS: SystemField[] = [
  { id: "1", fieldKey: "uhid", label: "Unique Health Identifier (UHID)", entity: "Patient Master", dataType: "String (Indexed)", isRequired: true, isSystemLocked: true, status: "Active" },
  { id: "2", fieldKey: "abha_address", label: "ABHA Health Address ID", entity: "Patient Master", dataType: "String (ABDM)", isRequired: false, isSystemLocked: true, status: "Active" },
  { id: "3", fieldKey: "blood_group", label: "ABO / Rh Blood Group", entity: "Clinical Profile", dataType: "Enum (8 Types)", isRequired: true, isSystemLocked: true, status: "Active" },
  { id: "4", fieldKey: "gstin_tax_id", label: "Hospital GSTIN Identifier", entity: "Hospital Identity", dataType: "Alphanumeric (15 char)", isRequired: true, isSystemLocked: true, status: "Active" },
  { id: "5", fieldKey: "mci_reg_no", label: "Medical Council Registration", entity: "Doctor Profile", dataType: "String", isRequired: true, isSystemLocked: true, status: "Active" },
  { id: "6", fieldKey: "tpa_preauth_no", label: "Cashless Pre-Auth Reference", entity: "Insurance Claim", dataType: "String", isRequired: false, isSystemLocked: false, status: "Active" },
];

export default function FieldMasterPage() {
  const [fields, setFields] = useState<SystemField[]>(SYSTEM_FIELDS);

  const columns = [
    { key: "fieldKey", header: "Field Data Key", render: (r: SystemField) => <span className="font-mono font-bold text-[var(--primary)] text-xs">{r.fieldKey}</span> },
    { key: "label", header: "Display Label", render: (r: SystemField) => <span className="font-semibold text-[var(--foreground)]">{r.label}</span> },
    { key: "entity", header: "Database Entity", render: (r: SystemField) => <span className="px-2 py-0.5 rounded text-xs bg-[var(--background)] border border-[var(--border)]">{r.entity}</span> },
    { key: "dataType", header: "Data Type", render: (r: SystemField) => <span className="font-mono text-xs">{r.dataType}</span> },
    { key: "isRequired", header: "Constraint", render: (r: SystemField) => <span className="text-xs">{r.isRequired ? "Mandatory" : "Optional"}</span> },
    { 
      key: "isSystemLocked", 
      header: "Governance", 
      render: (r: SystemField) => (
        r.isSystemLocked ? (
          <span className="flex items-center gap-1 text-xs text-amber-600 font-medium"><Lock className="w-3 h-3" /> System Core</span>
        ) : (
          <span className="text-xs text-emerald-600">Custom Extensible</span>
        )
      ) 
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        title="Field Master & Data Dictionary"
        description="Core database schemas, FHIR/ABDM interoperability fields, metadata dictionaries, and clinical data constraints"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings/hospital" },
          { label: "Field Master" },
        ]}
        actions={
          <button
            onClick={() => toast.success("Custom attribute builder opened")}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Define Custom Field
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard title="Core Data Fields" value={String(fields.length + 48)} subtitle="ABDM & FHIR compliant" icon={Database} />
        <StatCard title="System Locked" value="42" subtitle="Protected clinical schemas" icon={Lock} />
        <StatCard title="Extensible Custom Fields" value="12" subtitle="Hospital specific fields" icon={CheckCircle2} />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">Enterprise Data Schema Dictionary</h3>
        <DataTable columns={columns} data={fields} searchKey="label" searchPlaceholder="Search field label or key..." />
      </div>
    </DashboardShell>
  );
}

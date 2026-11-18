"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { StatCard } from "@/components/common/StatCard";
import { exportToCSV, formatDate } from "@/lib/utils";
import { toast } from "sonner";
import { History, ShieldCheck, UserCheck, AlertTriangle, Download, Lock } from "lucide-react";

interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  targetEntity: string;
  ipAddress: string;
  severity: "INFO" | "WARNING" | "CRITICAL";
  details: string;
}

const AUDIT_LOGS: AuditLogEntry[] = [
  { id: "1", timestamp: "2026-10-15 14:42:10", actor: "Dr. Arvind Swamy", role: "Doctor", action: "E-PRESCRIPTION_CREATED", targetEntity: "UHID: NU-2026-004812", ipAddress: "192.168.1.104", severity: "INFO", details: "Prescribed Tab Augmentin 625mg BD x 5d" },
  { id: "2", timestamp: "2026-10-15 14:38:05", actor: "Ramesh Jain", role: "Accountant", action: "TAX_INVOICE_GENERATED", targetEntity: "INV-2026-1045", ipAddress: "192.168.1.112", severity: "INFO", details: "Settled ₹85,000 via Cashless TPA (Medi Assist)" },
  { id: "3", timestamp: "2026-10-15 14:30:22", actor: "Nurse Priya Thomas", role: "Nurse", action: "ICU_BED_TRANSFER", targetEntity: "Bed ICU-02 -> GM-08", ipAddress: "192.168.1.108", severity: "INFO", details: "Post-op recovery stable, shifted to stepdown general ward" },
  { id: "4", timestamp: "2026-10-15 14:15:40", actor: "Sunil Narang", role: "Pharmacist", action: "SCHEDULE_H1_DRUG_DISPENSED", targetEntity: "Tab Tramadol 50mg (Batch TM-401)", ipAddress: "192.168.1.120", severity: "WARNING", details: "Schedule H1 narcotics register updated with Doctor MCI reg" },
  { id: "5", timestamp: "2026-10-15 13:58:12", actor: "Pooja Sharma", role: "Receptionist", action: "PATIENT_RECORD_REGISTERED", targetEntity: "UHID: NU-2026-004817", ipAddress: "192.168.1.102", severity: "INFO", details: "Ananya Iyer registered with linked ABHA ID" },
  { id: "6", timestamp: "2026-10-15 13:42:00", actor: "System Administrator", role: "Super Administrator", action: "ROLE_PERMISSIONS_MODIFIED", targetEntity: "Role: Doctor", ipAddress: "192.168.1.200", severity: "CRITICAL", details: "Granted Export capability for Clinical EMR" },
];

export default function AuditLogsPage() {
  const [data, setData] = useState<AuditLogEntry[]>(AUDIT_LOGS);

  const columns = [
    { key: "timestamp", header: "Timestamp", render: (r: AuditLogEntry) => <span className="font-mono text-xs">{r.timestamp}</span> },
    { 
      key: "actor", 
      header: "Actor", 
      render: (r: AuditLogEntry) => (
        <div>
          <div className="font-bold text-[var(--foreground)]">{r.actor}</div>
          <div className="text-[11px] text-[var(--muted-foreground)]">{r.role}</div>
        </div>
      ) 
    },
    { key: "action", header: "Event Code", render: (r: AuditLogEntry) => <span className="font-mono text-xs font-semibold text-[var(--primary)]">{r.action}</span> },
    { key: "targetEntity", header: "Target Entity / Record", render: (r: AuditLogEntry) => <span className="font-mono text-xs">{r.targetEntity}</span> },
    { key: "ipAddress", header: "Client IP", render: (r: AuditLogEntry) => <span className="font-mono text-xs text-[var(--muted-foreground)]">{r.ipAddress}</span> },
    { 
      key: "severity", 
      header: "Severity",
      render: (r: AuditLogEntry) => (
        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
          r.severity === "CRITICAL" ? "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-400" :
          r.severity === "WARNING" ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400" :
          "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-400"
        }`}>
          {r.severity}
        </span>
      )
    },
    { key: "details", header: "Audit Trail Description", render: (r: AuditLogEntry) => <span className="text-xs text-[var(--muted-foreground)] max-w-sm truncate block">{r.details}</span> },
  ];

  return (
    <DashboardShell>
      <PageHeader
        title="Institutional Audit Trail & Immutable Logs"
        description="Tamper-evident legal audit trails, HIPAA & DISHA compliance logs, biometric staff access tracking, and clinical change histories"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings/hospital" },
          { label: "Audit Trail & Logs" },
        ]}
        actions={
          <button
            onClick={() => {
              exportToCSV(data, "institutional-audit-logs.csv");
              toast.success("Audit trail exported for forensic compliance");
            }}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Export Audit Trail
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Event Records" value="148,290" subtitle="SHA-256 Checksum Verified" icon={History} />
        <StatCard title="Clinical Record Access" value="4,812" subtitle="Doctor & Nurse chart opens" icon={UserCheck} />
        <StatCard title="Security & Privilege Changes" value="6" subtitle="Super Admin authenticated" icon={Lock} />
        <StatCard title="Tamper-Proof Integrity" value="100% OK" subtitle="DISHA / NABH Audited" icon={ShieldCheck} />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">Live Security & Clinical Action Trail</h3>
        <DataTable columns={columns} data={data} searchKey="action" searchPlaceholder="Search action, actor or entity..." />
      </div>
    </DashboardShell>
  );
}

"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { toast } from "sonner";
import { ShieldCheck, Plus, Save, RotateCcw, Check, CheckSquare, Square } from "lucide-react";

interface RoleDef {
  id: string;
  name: string;
  description: string;
  userCount: number;
  isSystem: boolean;
}

const ROLES_LIST: RoleDef[] = [
  { id: "super_admin", name: "Super Administrator", description: "Full unrestricted platform access, system configuration, audit logs, and master settings", userCount: 3, isSystem: true },
  { id: "hospital_admin", name: "Hospital Administrator", description: "Operational oversight, HR duty rosters, facility management, and executive MIS reports", userCount: 6, isSystem: true },
  { id: "doctor", name: "Consultant Physician / Doctor", description: "OPD consultations, clinical notes, e-prescriptions, surgical records, and patient histories", userCount: 45, isSystem: true },
  { id: "nurse", name: "Nursing Staff", description: "Vitals recording, bedside ICU charting, nursing station orders, and medication administration", userCount: 68, isSystem: true },
  { id: "accountant", name: "Billing & Finance Officer", description: "Invoicing, cashier receipts, refunds, deposits, TPA pre-authorization, and GST reports", userCount: 12, isSystem: true },
  { id: "pharmacist", name: "Chief Pharmacist", description: "Formulary management, POS medicine sales, purchase indents, and expiry tracking", userCount: 8, isSystem: true },
  { id: "receptionist", name: "Front Desk Receptionist", description: "Patient registration, appointment scheduling, token queue calling, and visitor passes", userCount: 15, isSystem: true },
  { id: "lab_technician", name: "Laboratory Technologist", description: "Sample accessioning, analyzer result entry, test verification, and panic value alerts", userCount: 10, isSystem: true },
];

const MODULE_LIST = [
  { id: "patients", name: "Patient Management (Registration & 360)" },
  { id: "appointments", name: "Appointments & Queue Tokens" },
  { id: "clinical", name: "Clinical EMR & Doctor Notes" },
  { id: "prescriptions", name: "E-Prescriptions & Formulary" },
  { id: "ipd", name: "IPD Admissions & Ward Management" },
  { id: "ot", name: "Operation Theatre (OT) & Surgeries" },
  { id: "billing", name: "Billing, Invoicing & Cash Collections" },
  { id: "pharmacy", name: "Pharmacy Sales & Inventory" },
  { id: "laboratory", name: "Laboratory Tests & Pathology Results" },
  { id: "radiology", name: "Radiology & Imaging PACS" },
  { id: "blood_bank", name: "Blood Bank & Component Inventory" },
  { id: "insurance", name: "Insurance & TPA Claims" },
  { id: "reports", name: "Financial & Operational MIS Reports" },
  { id: "staff", name: "Staff HR, Attendance & Leaves" },
  { id: "settings", name: "System Settings & Masters" },
];

type ActionType = "view" | "create" | "edit" | "delete" | "approve" | "export";

export default function RolesAndPermissionsPage() {
  const [selectedRole, setSelectedRole] = useState<string>("doctor");
  const [permissions, setPermissions] = useState<Record<string, Record<ActionType, boolean>>>({
    patients: { view: true, create: true, edit: true, delete: false, approve: true, export: true },
    appointments: { view: true, create: true, edit: true, delete: false, approve: true, export: false },
    clinical: { view: true, create: true, edit: true, delete: false, approve: true, export: true },
    prescriptions: { view: true, create: true, edit: true, delete: true, approve: true, export: true },
    ipd: { view: true, create: true, edit: true, delete: false, approve: true, export: false },
    ot: { view: true, create: true, edit: true, delete: false, approve: true, export: false },
    billing: { view: true, create: false, edit: false, delete: false, approve: false, export: false },
    pharmacy: { view: true, create: false, edit: false, delete: false, approve: false, export: false },
    laboratory: { view: true, create: true, edit: true, delete: false, approve: true, export: true },
    radiology: { view: true, create: true, edit: true, delete: false, approve: true, export: true },
    blood_bank: { view: true, create: true, edit: false, delete: false, approve: false, export: false },
    insurance: { view: true, create: false, edit: false, delete: false, approve: false, export: false },
    reports: { view: true, create: false, edit: false, delete: false, approve: false, export: true },
    staff: { view: true, create: false, edit: false, delete: false, approve: false, export: false },
    settings: { view: false, create: false, edit: false, delete: false, approve: false, export: false },
  });

  const togglePermission = (moduleId: string, action: ActionType) => {
    setPermissions(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [action]: !prev[moduleId]?.[action],
      }
    }));
  };

  const handleSelectAllForModule = (moduleId: string, enable: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [moduleId]: {
        view: enable,
        create: enable,
        edit: enable,
        delete: enable,
        approve: enable,
        export: enable,
      }
    }));
  };

  const handleSave = () => {
    const roleObj = ROLES_LIST.find(r => r.id === selectedRole);
    toast.success(`Permissions for role "${roleObj?.name}" saved successfully`);
  };

  const handleReset = () => {
    toast.info("Permissions reset to institutional defaults");
  };

  const activeRoleObj = ROLES_LIST.find(r => r.id === selectedRole);

  return (
    <DashboardShell>
      <PageHeader
        title="Roles & Interactive Permission Matrix"
        description="Fine-grained Role-Based Access Control (RBAC) across hospital operational modules, clinical charts, and action permissions"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings/hospital" },
          { label: "Roles & Permissions" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-2 text-xs font-semibold rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--background)] flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5 transition-opacity"
            >
              <Save className="w-3.5 h-3.5" /> Save Matrix
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Role Selector Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-3">
            Institutional User Roles
          </h3>
          {ROLES_LIST.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`w-full text-left p-3 rounded-xl border transition-all ${
                selectedRole === role.id
                  ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-sm"
                  : "bg-[var(--card)] border-[var(--border)] hover:border-[var(--primary)] text-[var(--foreground)]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs">{role.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  selectedRole === role.id ? "bg-white/20 text-white" : "bg-[var(--background)] text-[var(--muted-foreground)]"
                }`}>
                  {role.userCount} users
                </span>
              </div>
              <p className={`text-[11px] mt-1 line-clamp-2 leading-relaxed ${
                selectedRole === role.id ? "text-white/80" : "text-[var(--muted-foreground)]"
              }`}>
                {role.description}
              </p>
            </button>
          ))}
        </div>

        {/* Permission Matrix Table */}
        <div className="lg:col-span-3 bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border)]">
            <div>
              <h3 className="text-base font-bold text-[var(--foreground)]">
                Permissions Matrix: <span className="text-[var(--primary)]">{activeRoleObj?.name}</span>
              </h3>
              <p className="text-xs text-[var(--muted-foreground)]">
                Grant or revoke module-level capabilities: View, Create, Edit, Delete, Clinical/Financial Approve, and CSV Export
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
              <ShieldCheck className="w-4 h-4" /> Policy Enforced
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--background)] text-[11px] uppercase tracking-wider text-[var(--muted-foreground)] border-b border-[var(--border)]">
                <tr>
                  <th className="px-4 py-3 font-semibold w-1/3">Hospital Operating Module</th>
                  <th className="px-3 py-3 font-semibold text-center">View</th>
                  <th className="px-3 py-3 font-semibold text-center">Create</th>
                  <th className="px-3 py-3 font-semibold text-center">Edit</th>
                  <th className="px-3 py-3 font-semibold text-center">Delete</th>
                  <th className="px-3 py-3 font-semibold text-center">Approve</th>
                  <th className="px-3 py-3 font-semibold text-center">Export</th>
                  <th className="px-3 py-3 font-semibold text-center">Quick</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {MODULE_LIST.map((mod) => {
                  const modPerms = permissions[mod.id] || { view: false, create: false, edit: false, delete: false, approve: false, export: false };
                  const allActive = Object.values(modPerms).every(Boolean);

                  return (
                    <tr key={mod.id} className="hover:bg-[var(--background)]/40 transition-colors">
                      <td className="px-4 py-3 font-medium text-[var(--foreground)]">{mod.name}</td>
                      
                      {(["view", "create", "edit", "delete", "approve", "export"] as ActionType[]).map((action) => {
                        const isChecked = modPerms[action];
                        return (
                          <td key={action} className="px-3 py-3 text-center">
                            <button
                              type="button"
                              onClick={() => togglePermission(mod.id, action)}
                              className={`p-1.5 rounded transition-colors ${
                                isChecked
                                  ? "text-[var(--primary)] bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20"
                                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                              }`}
                              title={`${action.toUpperCase()} ${mod.name}`}
                            >
                              {isChecked ? (
                                <CheckSquare className="w-4 h-4" />
                              ) : (
                                <Square className="w-4 h-4 opacity-40" />
                              )}
                            </button>
                          </td>
                        );
                      })}

                      <td className="px-3 py-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleSelectAllForModule(mod.id, !allActive)}
                          className="text-[10px] px-2 py-0.5 rounded border border-[var(--border)] hover:bg-[var(--background)] font-medium text-[var(--muted-foreground)]"
                        >
                          {allActive ? "None" : "All"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

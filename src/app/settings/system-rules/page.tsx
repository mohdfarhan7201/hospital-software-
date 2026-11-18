"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { toast } from "sonner";
import { Sliders, Save, ShieldAlert, CheckCircle2, Lock } from "lucide-react";

export default function SystemRulesPage() {
  const [rules, setRules] = useState({
    autoGenerateUHID: true,
    uhidPrefix: "NU-2026-",
    requireAbhaOnRegistration: false,
    opdConsultationValidityDays: 7,
    allowNegativePharmacyStock: false,
    enforceMfaForDoctors: true,
    autoDischargeBedAfterHours: 2,
    sessionTimeoutMinutes: 30,
    enableCriticalLabPanicSms: true,
    allowDiscountWithoutAdminOtp: false,
    taxInclusivePharmacyPricing: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Institutional business rules and workflow constraints updated");
  };

  return (
    <DashboardShell>
      <PageHeader
        title="Institutional System Rules & Workflows"
        description="Global operational policies, UHID numbering schemes, OPD follow-up validity, financial concession thresholds, and automated bed turnover constraints"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings/hospital" },
          { label: "System Rules" },
        ]}
      />

      <form onSubmit={handleSave} className="space-y-6 max-w-4xl text-xs">
        {/* Patient & Clinical Rules */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-[var(--foreground)] border-b border-[var(--border)] pb-2">
            Patient Identity & Clinical Policies
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">UHID Numbering Scheme</label>
              <input
                type="text"
                value={rules.uhidPrefix}
                onChange={(e) => setRules({ ...rules, uhidPrefix: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] font-mono focus:outline-none"
              />
              <span className="text-[11px] text-[var(--muted-foreground)]">e.g. Generated as NU-2026-004812</span>
            </div>

            <div>
              <label className="block font-semibold mb-1">OPD Re-consultation Free Window</label>
              <select
                value={rules.opdConsultationValidityDays}
                onChange={(e) => setRules({ ...rules, opdConsultationValidityDays: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
              >
                <option value={3}>3 Days from visit</option>
                <option value={7}>7 Days from visit (Standard)</option>
                <option value={14}>14 Days from visit</option>
                <option value={0}>No free re-visit (Every consult billed)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="flex items-center gap-2 p-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] cursor-pointer">
              <input
                type="checkbox"
                checked={rules.autoGenerateUHID}
                onChange={(e) => setRules({ ...rules, autoGenerateUHID: e.target.checked })}
                className="rounded text-[var(--primary)]"
              />
              <span className="font-semibold">Auto-generate cryptographic UHID sequence on registration</span>
            </label>

            <label className="flex items-center gap-2 p-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] cursor-pointer">
              <input
                type="checkbox"
                checked={rules.enableCriticalLabPanicSms}
                onChange={(e) => setRules({ ...rules, enableCriticalLabPanicSms: e.target.checked })}
                className="rounded text-[var(--primary)]"
              />
              <span className="font-semibold">Instantly trigger SMS & push notification to attending consultant on critical panic lab value</span>
            </label>
          </div>
        </div>

        {/* Financial & Inventory Rules */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-[var(--foreground)] border-b border-[var(--border)] pb-2">
            Financial & Pharmacy Inventory Constraints
          </h3>

          <div className="space-y-2">
            <label className="flex items-center gap-2 p-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] cursor-pointer">
              <input
                type="checkbox"
                checked={rules.allowNegativePharmacyStock}
                onChange={(e) => setRules({ ...rules, allowNegativePharmacyStock: e.target.checked })}
                className="rounded text-[var(--primary)]"
              />
              <div>
                <span className="font-semibold">Allow Negative Pharmacy Inventory Dispensing</span>
                <p className="text-[11px] text-[var(--muted-foreground)]">Disabled by default to prevent stock pilferage and physical audit variances</p>
              </div>
            </label>

            <label className="flex items-center gap-2 p-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] cursor-pointer">
              <input
                type="checkbox"
                checked={rules.allowDiscountWithoutAdminOtp}
                onChange={(e) => setRules({ ...rules, allowDiscountWithoutAdminOtp: e.target.checked })}
                className="rounded text-[var(--primary)]"
              />
              <div>
                <span className="font-semibold">Allow Billing Cashier to apply discount &gt; 10% without Admin Dual-Authorization</span>
                <p className="text-[11px] text-[var(--muted-foreground)]">Requires hospital superintendent OTP authorization</p>
              </div>
            </label>
          </div>
        </div>

        {/* Security & Inactivity Session Rules */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-[var(--foreground)] border-b border-[var(--border)] pb-2">
            Security & Session Timeout Controls
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Inactivity Screen Lock / Auto Logout</label>
              <select
                value={rules.sessionTimeoutMinutes}
                onChange={(e) => setRules({ ...rules, sessionTimeoutMinutes: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
              >
                <option value={15}>15 Minutes of idle time</option>
                <option value={30}>30 Minutes of idle time (Recommended)</option>
                <option value={60}>60 Minutes of idle time</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Mandatory Staff 2FA / MFA</label>
              <select
                value={rules.enforceMfaForDoctors ? "all" : "admins"}
                onChange={(e) => setRules({ ...rules, enforceMfaForDoctors: e.target.value === "all" })}
                className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
              >
                <option value="all">Enforce for all Clinical & Financial roles</option>
                <option value="admins">Enforce only for Super Admins</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-[var(--primary)] text-white font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Save className="w-4 h-4" /> Save System Rules
          </button>
        </div>
      </form>
    </DashboardShell>
  );
}

"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { toast } from "sonner";
import { Bell, Smartphone, Mail, MessageSquare, Save, CheckCircle2 } from "lucide-react";

interface NotificationChannelRule {
  id: string;
  event: string;
  category: "Patient Alert" | "Clinical Critical" | "Billing / Financial" | "System Security";
  sms: boolean;
  whatsapp: boolean;
  email: boolean;
  inApp: boolean;
}

const INITIAL_RULES: NotificationChannelRule[] = [
  { id: "1", event: "Patient Appointment Booking Confirmation & Token", category: "Patient Alert", sms: true, whatsapp: true, email: true, inApp: true },
  { id: "2", event: "Pathology / Radiology Diagnostic Report Ready", category: "Patient Alert", sms: true, whatsapp: true, email: false, inApp: true },
  { id: "3", event: "Critical Laboratory Panic Value Alert to Attending Doctor", category: "Clinical Critical", sms: true, whatsapp: true, email: true, inApp: true },
  { id: "4", event: "Inpatient Admission Deposit & Interim Bill Summary", category: "Billing / Financial", sms: true, whatsapp: true, email: true, inApp: true },
  { id: "5", event: "TPA Cashless Pre-Authorization Approval Received", category: "Billing / Financial", sms: true, whatsapp: true, email: true, inApp: true },
  { id: "6", event: "Unrecognized Staff Login from New IP / Failed MFA", category: "System Security", sms: false, whatsapp: false, email: true, inApp: true },
];

export default function NotificationSettingsPage() {
  const [rules, setRules] = useState<NotificationChannelRule[]>(INITIAL_RULES);

  const toggleChannel = (id: string, channel: "sms" | "whatsapp" | "email" | "inApp") => {
    setRules(rules.map(r => r.id === id ? { ...r, [channel]: !r[channel] } : r));
  };

  const handleSave = () => {
    toast.success("Notification delivery preferences and gateway routes saved");
  };

  return (
    <DashboardShell>
      <PageHeader
        title="Notification Gateways & Alert Rules"
        description="Configure SMS (DLT registered), WhatsApp Business API, transactional email, and browser push notifications for patients and clinical staff"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings/hospital" },
          { label: "Notification Settings" },
        ]}
        actions={
          <button
            onClick={handleSave}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" /> Save Delivery Rules
          </button>
        }
      />

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-[var(--foreground)] mb-1">Event-Triggered Dispatch Matrix</h3>
        <p className="text-xs text-[var(--muted-foreground)] mb-4">Control automated patient SMS, WhatsApp PDF delivery, and clinical staff alerts</p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[var(--background)] text-[11px] uppercase tracking-wider text-[var(--muted-foreground)] border-b border-[var(--border)]">
              <tr>
                <th className="px-4 py-3 font-semibold">Hospital Event Trigger</th>
                <th className="px-4 py-3 font-semibold">Classification</th>
                <th className="px-3 py-3 font-semibold text-center">SMS (DLT)</th>
                <th className="px-3 py-3 font-semibold text-center">WhatsApp API</th>
                <th className="px-3 py-3 font-semibold text-center">Email</th>
                <th className="px-3 py-3 font-semibold text-center">In-App Push</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {rules.map((rule) => (
                <tr key={rule.id} className="hover:bg-[var(--background)]/40 transition-colors">
                  <td className="px-4 py-3 font-medium text-[var(--foreground)]">{rule.event}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[var(--background)] border border-[var(--border)]">
                      {rule.category}
                    </span>
                  </td>
                  
                  {(["sms", "whatsapp", "email", "inApp"] as const).map((ch) => (
                    <td key={ch} className="px-3 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={rule[ch]}
                        onChange={() => toggleChannel(rule.id, ch)}
                        className="rounded text-[var(--primary)] focus:ring-[var(--primary)] cursor-pointer"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}

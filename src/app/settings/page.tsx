"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { 
  Building2, 
  MapPin, 
  Layers, 
  Receipt, 
  Package, 
  Scissors, 
  Building, 
  Bed, 
  ShieldCheck, 
  Users, 
  Printer, 
  FileCode, 
  FormInput, 
  Database, 
  Activity, 
  Bell, 
  Sliders, 
  Plug, 
  History,
  ArrowRight
} from "lucide-react";

const SETTINGS_SECTIONS = [
  {
    title: "Hospital Profile & Registration",
    desc: "Entity legal identifiers, ROHINI, GSTIN, PAN, and address",
    href: "/settings/hospital",
    icon: Building2,
  },
  {
    title: "Branches & Satellite Units",
    desc: "Multi-campus network, satellite daycare clinics, and centralized records",
    href: "/settings/branches",
    icon: MapPin,
  },
  {
    title: "Departments Master",
    desc: "Clinical specialties, diagnostic wings, and administrative units",
    href: "/settings/departments",
    icon: Layers,
  },
  {
    title: "Services & Pricing Tariff",
    desc: "Standard charges, investigations, day-care procedures, and TPA rates",
    href: "/settings/services",
    icon: Receipt,
  },
  {
    title: "Healthcare Packages",
    desc: "Preventive health checkups, wellness screenings, and surgery bundles",
    href: "/settings/packages",
    icon: Package,
  },
  {
    title: "Surgery Master",
    desc: "OT procedures, time slots, surgeon share tariffs, and anesthesia protocols",
    href: "/settings/surgeries",
    icon: Scissors,
  },
  {
    title: "Rooms & Wards Master",
    desc: "Ward categories, deluxe private suites, ICU beds, and daily tariff",
    href: "/settings/rooms",
    icon: Building,
  },
  {
    title: "Beds Master",
    desc: "Individual bed inventory, medical gas pipeline ports, and status",
    href: "/settings/beds",
    icon: Bed,
  },
  {
    title: "Roles & Permission Matrix",
    desc: "Fine-grained Role-Based Access Control (RBAC) across hospital modules",
    href: "/settings/roles",
    icon: ShieldCheck,
  },
  {
    title: "User Access & Security",
    desc: "Provision staff logins, 2FA/MFA security policies, and session timeout",
    href: "/settings/users",
    icon: Users,
  },
  {
    title: "Print & Header Templates",
    desc: "Letterheads, digital doctor signatures, and ABDM QR verification",
    href: "/settings/print-templates",
    icon: Printer,
  },
  {
    title: "Prescription Formats (Rx)",
    desc: "Preconfigured clinical disease protocols and standardized medications",
    href: "/settings/prescription-templates",
    icon: FileCode,
  },
  {
    title: "Dynamic Form Builder",
    desc: "Customized clinical questionnaires, nursing intake, and audit checklists",
    href: "/settings/forms",
    icon: FormInput,
  },
  {
    title: "Field Master & Data Dictionary",
    desc: "Core database schema, ABDM/FHIR data fields, and metadata constraints",
    href: "/settings/fields",
    icon: Database,
  },
  {
    title: "Vitals Master & Panic Triggers",
    desc: "Physiological thresholds, NEWS2 emergency triggers, and telemetry alerts",
    href: "/settings/vitals",
    icon: Activity,
  },
  {
    title: "Notification Gateways",
    desc: "SMS (DLT registered), WhatsApp Business API, and automated alerts",
    href: "/settings/notifications",
    icon: Bell,
  },
  {
    title: "Institutional System Rules",
    desc: "UHID schemes, OPD re-consult validity, discount policies, and bed rules",
    href: "/settings/system-rules",
    icon: Sliders,
  },
  {
    title: "Integrations & APIs",
    desc: "ABDM (M1-M3), NHCX claim exchange, ASTM/HL7 analyzers, and payment gateways",
    href: "/settings/integrations",
    icon: Plug,
  },
  {
    title: "Audit Trail & Immutable Logs",
    desc: "Tamper-evident legal audit trails, HIPAA & DISHA compliance logs",
    href: "/settings/audit-logs",
    icon: History,
  },
];

export default function SettingsHubPage() {
  return (
    <DashboardShell>
      <PageHeader
        title="Settings & Institutional Masters"
        description="Configure hospital parameters, multi-campus facilities, billing tariffs, clinical templates, and administrative security"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings" },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SETTINGS_SECTIONS.map((sec) => {
          const Icon = sec.icon;
          return (
            <Link
              key={sec.href}
              href={sec.href}
              className="group p-5 bg-[var(--card)] border border-[var(--border)] rounded-xl hover:border-[var(--primary)] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="p-2.5 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] w-fit mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors mb-1">
                  {sec.title}
                </h4>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  {sec.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-semibold text-[var(--primary)]">
                <span>Configure Master</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </DashboardShell>
  );
}

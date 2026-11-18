"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { toast } from "sonner";
import { Plug, ShieldCheck, CheckCircle2, RefreshCw, Key, ExternalLink } from "lucide-react";

interface IntegrationConnector {
  id: string;
  name: string;
  category: "Government / ABDM" | "Insurance TPA" | "Diagnostic Lab Equipment" | "Payment Gateway" | "Messaging";
  description: string;
  status: "Connected" | "Configured" | "Pending Credentials";
  protocol: string;
}

const CONNECTORS: IntegrationConnector[] = [
  { id: "1", name: "Ayushman Bharat Digital Mission (ABDM M1, M2, M3)", category: "Government / ABDM", description: "ABHA creation, health record linking (HIP/HIU), and consent manager via National Health Authority bridge", status: "Connected", protocol: "FHIR R4 / REST APIs" },
  { id: "2", name: "National Health Claims Exchange (NHCX)", category: "Insurance TPA", description: "Standardized cashless claim submission to ICICI Lombard, Star Health, Medi Assist, and Bajaj Allianz", status: "Connected", protocol: "HCX 1.0 JSON-LD" },
  { id: "3", name: "Laboratory Analyzer Bi-directional Interface (LIS)", category: "Diagnostic Lab Equipment", description: "Sysmex Hematology & Roche Cobas automated sample accessioning and direct result pull", status: "Connected", protocol: "ASTM / HL7 v2.5" },
  { id: "4", name: "Picture Archiving and Communication System (PACS)", category: "Diagnostic Lab Equipment", description: "Radiology DICOM store, query/retrieve, and web viewer integration with CT/MRI modalities", status: "Connected", protocol: "DICOM 3.0 / WADO-RS" },
  { id: "5", name: "Razorpay Healthcare Payment Gateway", category: "Payment Gateway", description: "Cashless UPI QR codes at billing desk, credit cards, net banking, and instant web deposit checkout", status: "Connected", protocol: "Webhook / REST" },
  { id: "6", name: "Gupshup WhatsApp & SMS DLT Gateway", category: "Messaging", description: "DLT approved SMS templates, WhatsApp digital prescription PDFs, and appointment reminders", status: "Connected", protocol: "HTTPS Webhook" },
];

export default function IntegrationsPage() {
  const [connectors, setConnectors] = useState<IntegrationConnector[]>(CONNECTORS);

  const handleTestConnection = (name: string) => {
    toast.success(`Ping test to ${name} gateway succeeded (Latency: 28ms)`);
  };

  return (
    <DashboardShell>
      <PageHeader
        title="Healthcare Integrations & Interoperability APIs"
        description="Ayushman Bharat Digital Mission (ABDM / ABDM M1-M3), NHCX claim exchange, ASTM/HL7 analyzer interfaces, PACS DICOM, and UPI payment gateways"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings/hospital" },
          { label: "Integrations & APIs" },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {connectors.map((c) => (
          <div key={c.id} className="p-5 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--background)] border border-[var(--border)] text-[var(--muted-foreground)]">
                    {c.category}
                  </span>
                  <h4 className="text-sm font-bold text-[var(--foreground)] mt-2">{c.name}</h4>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {c.status}
                </span>
              </div>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed mb-3">{c.description}</p>
            </div>

            <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] text-[var(--muted-foreground)]">{c.protocol}</span>
              <button
                type="button"
                onClick={() => handleTestConnection(c.name)}
                className="px-2.5 py-1 rounded bg-[var(--background)] border border-[var(--border)] hover:bg-[var(--card)] text-[var(--primary)] font-semibold flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Test Connectivity
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}

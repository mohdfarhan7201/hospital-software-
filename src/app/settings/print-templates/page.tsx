"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { toast } from "sonner";
import { Printer, FileText, CheckCircle2, Eye, Save } from "lucide-react";

interface PrintTemplate {
  id: string;
  name: string;
  documentType: string;
  paperSize: string;
  hasHospitalHeader: boolean;
  hasWatermark: boolean;
  hasQrCode: boolean;
  disclaimer: string;
}

const TEMPLATES: PrintTemplate[] = [
  { id: "1", name: "Standard Outpatient Prescription", documentType: "Prescription", paperSize: "A4 Portrait", hasHospitalHeader: true, hasWatermark: false, hasQrCode: true, disclaimer: "Valid for 30 days. Not for medico-legal purposes without authorized seal." },
  { id: "2", name: "Inpatient Final Tax Invoice", documentType: "Billing Invoice", paperSize: "A4 Portrait", hasHospitalHeader: true, hasWatermark: true, hasQrCode: true, disclaimer: "Subject to New Delhi jurisdiction. Goods once sold will not be taken back." },
  { id: "3", name: "Clinical Discharge Summary", documentType: "Discharge Summary", paperSize: "A4 Portrait", hasHospitalHeader: true, hasWatermark: false, hasQrCode: true, disclaimer: "Strict adherence to discharge medications and emergency warning signs advised." },
  { id: "4", name: "Pathology & Biochemistry Report", documentType: "Diagnostic Report", paperSize: "A4 Portrait", hasHospitalHeader: true, hasWatermark: false, hasQrCode: true, disclaimer: "Biological reference intervals are methodology-specific. Clinical correlation recommended." },
  { id: "5", name: "Inpatient Bedside Wristband Barcode", documentType: "Patient ID Tag", paperSize: "Thermal Roll (100x25mm)", hasHospitalHeader: false, hasWatermark: false, hasQrCode: true, disclaimer: "" },
];

export default function PrintTemplatesPage() {
  const [templates, setTemplates] = useState<PrintTemplate[]>(TEMPLATES);
  const [selectedId, setSelectedId] = useState<string>("1");

  const activeTemplate = templates.find(t => t.id === selectedId) || templates[0];

  const handleSave = () => {
    toast.success(`Print template "${activeTemplate.name}" configuration saved`);
  };

  return (
    <DashboardShell>
      <PageHeader
        title="Print Templates & Document Header Formats"
        description="Configure hospital letterheads, digital doctor signatures, NABH accreditation logos, QR verification, and statutory disclaimers"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings/hospital" },
          { label: "Print Templates" },
        ]}
        actions={
          <button
            onClick={handleSave}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" /> Save Template
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Templates List */}
        <div className="lg:col-span-1 space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-2">
            Configured Document Formats
          </h3>
          {templates.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => setSelectedId(tpl.id)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                selectedId === tpl.id
                  ? "bg-[var(--card)] border-[var(--primary)] shadow-sm ring-1 ring-[var(--primary)]"
                  : "bg-[var(--card)] border-[var(--border)] hover:border-[var(--primary)] text-[var(--foreground)]"
              }`}
            >
              <div className="font-bold text-xs text-[var(--foreground)]">{tpl.name}</div>
              <div className="text-[11px] text-[var(--muted-foreground)] mt-0.5">{tpl.documentType} • {tpl.paperSize}</div>
            </button>
          ))}
        </div>

        {/* Template Preview & Customizer */}
        <div className="lg:col-span-2 bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border)]">
            <div>
              <h3 className="text-base font-bold text-[var(--foreground)]">{activeTemplate.name}</h3>
              <p className="text-xs text-[var(--muted-foreground)]">Customization settings and live layout simulation</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded bg-[var(--background)] border border-[var(--border)] font-mono">
              {activeTemplate.paperSize}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-xs">
            <label className="flex items-center gap-2 p-3 rounded-lg border border-[var(--border)] bg-[var(--background)] cursor-pointer">
              <input
                type="checkbox"
                checked={activeTemplate.hasHospitalHeader}
                onChange={(e) => setTemplates(templates.map(t => t.id === selectedId ? { ...t, hasHospitalHeader: e.target.checked } : t))}
                className="rounded text-[var(--primary)] focus:ring-[var(--primary)]"
              />
              <span className="font-semibold">Include Official Hospital Header & Logo</span>
            </label>

            <label className="flex items-center gap-2 p-3 rounded-lg border border-[var(--border)] bg-[var(--background)] cursor-pointer">
              <input
                type="checkbox"
                checked={activeTemplate.hasQrCode}
                onChange={(e) => setTemplates(templates.map(t => t.id === selectedId ? { ...t, hasQrCode: e.target.checked } : t))}
                className="rounded text-[var(--primary)] focus:ring-[var(--primary)]"
              />
              <span className="font-semibold">Include ABDM / UHID Verification QR Code</span>
            </label>

            <label className="flex items-center gap-2 p-3 rounded-lg border border-[var(--border)] bg-[var(--background)] cursor-pointer">
              <input
                type="checkbox"
                checked={activeTemplate.hasWatermark}
                onChange={(e) => setTemplates(templates.map(t => t.id === selectedId ? { ...t, hasWatermark: e.target.checked } : t))}
                className="rounded text-[var(--primary)] focus:ring-[var(--primary)]"
              />
              <span className="font-semibold">Include Security Watermark</span>
            </label>
          </div>

          {/* Simulated Paper Preview */}
          <div className="p-6 rounded-lg border border-dashed border-[var(--border)] bg-[var(--background)] text-xs font-mono relative">
            <div className="text-center pb-4 mb-4 border-b border-[var(--border)]">
              {activeTemplate.hasHospitalHeader && (
                <>
                  <div className="font-bold text-sm tracking-wide">NUVERTOS MEMORIAL HOSPITAL & RESEARCH CENTRE</div>
                  <div className="text-[10px] text-[var(--muted-foreground)]">Sector 62, Institutional Area, New Delhi - 110075 • Tel: +91 11 4820 0000</div>
                  <div className="text-[10px] text-[var(--muted-foreground)]">NABH Accredited Tertiary Care Hospital • Reg: DEL-HOSP-2024-9042</div>
                </>
              )}
            </div>

            <div className="py-8 text-center text-[var(--muted-foreground)] italic border border-dashed border-[var(--border)] rounded my-4">
              [ Dynamic Document Body: {activeTemplate.documentType} Data Grid & Clinical Records ]
            </div>

            {activeTemplate.hasQrCode && (
              <div className="flex justify-between items-end pt-4 border-t border-[var(--border)] text-[10px]">
                <div>
                  <div className="font-bold">Authorized Signatory / Medical Superintendent</div>
                  <div className="text-[var(--muted-foreground)]">Verified Digital Cryptographic Signature</div>
                </div>
                <div className="p-2 bg-white text-black font-sans font-bold text-[9px] border rounded">
                  [ QR VERIFIED ]
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

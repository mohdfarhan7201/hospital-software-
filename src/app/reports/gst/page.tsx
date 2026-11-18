"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { StatCard } from "@/components/common/StatCard";
import { exportToCSV, formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { Percent, Receipt, FileText, Download, Building } from "lucide-react";

const GST_ITEMS = [
  { id: "1", invoiceNo: "INV-2026-1045", hsnCode: "3004", description: "Anti-infective Medicines (Tab Augmentin 625)", taxableValue: 14200, gstRate: "12%", cgst: 852, sgst: 852, igst: 0, totalTax: 1704 },
  { id: "2", invoiceNo: "INV-2026-1046", hsnCode: "9018", description: "Disposable Surgical Syringes & Cannulas", taxableValue: 5600, gstRate: "12%", cgst: 336, sgst: 336, igst: 0, totalTax: 672 },
  { id: "3", invoiceNo: "INV-2026-1047", hsnCode: "3002", description: "Vaccines & Immunologicals (Hepatitis-B)", taxableValue: 8400, gstRate: "5%", cgst: 210, sgst: 210, igst: 0, totalTax: 420 },
  { id: "4", invoiceNo: "INV-2026-1048", hsnCode: "3822", description: "Pathology Diagnostic Reagent Kits", taxableValue: 22000, gstRate: "12%", cgst: 1320, sgst: 1320, igst: 0, totalTax: 2640 },
  { id: "5", invoiceNo: "INV-2026-1049", hsnCode: "9993", description: "Clinical Healthcare Consulting (Exempted)", taxableValue: 45000, gstRate: "0% (Exempt)", cgst: 0, sgst: 0, igst: 0, totalTax: 0 },
];

export default function GSTReportsPage() {
  const [data, setData] = useState(GST_ITEMS);

  const columns = [
    { key: "invoiceNo", header: "Tax Invoice No", render: (r: any) => <span className="font-mono font-bold text-[var(--primary)]">{r.invoiceNo}</span> },
    { key: "hsnCode", header: "HSN / SAC", render: (r: any) => <span className="font-mono text-xs">{r.hsnCode}</span> },
    { key: "description", header: "Goods / Service Description", render: (r: any) => <span className="font-medium text-[var(--foreground)]">{r.description}</span> },
    { key: "taxableValue", header: "Taxable Value", render: (r: any) => <span className="font-mono">{formatCurrency(r.taxableValue)}</span> },
    { key: "gstRate", header: "GST Slab", render: (r: any) => <span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-100 dark:bg-slate-800">{r.gstRate}</span> },
    { key: "cgst", header: "CGST", render: (r: any) => <span className="font-mono text-xs">{formatCurrency(r.cgst)}</span> },
    { key: "sgst", header: "SGST", render: (r: any) => <span className="font-mono text-xs">{formatCurrency(r.sgst)}</span> },
    { key: "totalTax", header: "Total Tax Liability", render: (r: any) => <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(r.totalTax)}</span> },
  ];

  return (
    <DashboardShell>
      <PageHeader
        title="GST & Indirect Tax Compliance (GSTR-1 / GSTR-3B)"
        description="Reconciliation of GST collected on pharmacy consumables, diagnostic reagents, and exempt clinical healthcare services with HSN/SAC codes"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Reports", href: "/reports" },
          { label: "GST Reports" },
        ]}
        actions={
          <button
            onClick={() => {
              exportToCSV(data, "gst-reconciliation-report.csv");
              toast.success("GST filing schedule downloaded");
            }}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Export GSTR Format
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Taxable Turnover" value="₹5,82,400" subtitle="Taxable pharmacy & supplies" icon={Receipt} />
        <StatCard title="Output Tax Collected" value="₹54,320" subtitle="CGST (₹27,160) + SGST (₹27,160)" icon={Percent} />
        <StatCard title="Input Tax Credit (ITC)" value="₹38,200" subtitle="From wholesale supplier bills" icon={FileText} />
        <StatCard title="Net GST Payable" value="₹16,120" subtitle="Due on 20th of next month" icon={Building} />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">Itemized Tax Invoice Registry</h3>
        <DataTable columns={columns} data={data} searchKey="invoiceNo" searchPlaceholder="Search invoice, HSN or item..." />
      </div>
    </DashboardShell>
  );
}

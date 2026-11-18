"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatCurrency } from "@/lib/utils";
import { RotateCcw, Plus, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface RefundRecord {
  id: string;
  refundNumber: string;
  patientName: string;
  uhid: string;
  originalBill: string;
  amount: number;
  reason: string;
  approvedBy: string;
  status: "Processed" | "Pending Approval";
}

const mockRefunds: RefundRecord[] = [
  {
    id: "ref-1",
    refundNumber: "RF-2026-0012",
    patientName: "Vikramaditya Patel",
    uhid: "NU-2026-621874",
    originalBill: "INV-2026-00893",
    amount: 1600,
    reason: "Diagnostic investigation cancelled prior to sample collection",
    approvedBy: "Medical Superintendent",
    status: "Processed",
  },
  {
    id: "ref-2",
    refundNumber: "RF-2026-0013",
    patientName: "Priya S. Iyer",
    uhid: "NU-2026-789012",
    originalBill: "INV-2026-00890",
    amount: 2500,
    reason: "Advance deposit balance return upon discharge",
    approvedBy: "Accounts Officer",
    status: "Pending Approval",
  },
];

export default function RefundsPage() {
  const [refunds, setRefunds] = useState<RefundRecord[]>(mockRefunds);

  const handleApprove = (id: string) => {
    setRefunds((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Processed" } : r))
    );
    toast.success("Refund voucher approved and credited to patient source account.");
  };

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Billing", href: "/billing" },
          { label: "Refunds" },
        ]}
        title="Refund Management & Deposit Reversals"
        description="Process billing refund requests, investigation cancellations, and unutilized security deposits."
      />

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4 text-xs">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {refunds.map((ref) => (
            <div
              key={ref.id}
              className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-rose-600">{ref.refundNumber}</span>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100">{ref.patientName}</h3>
                  <span className="font-mono text-slate-400">({ref.uhid})</span>
                  <StatusBadge status={ref.status} />
                </div>
                <p className="text-slate-500 mt-1">
                  Original Invoice: <strong>{ref.originalBill}</strong> • Approved By:{" "}
                  {ref.approvedBy}
                </p>
                <p className="text-slate-600 dark:text-slate-300 italic mt-0.5">
                  Reason: {ref.reason}
                </p>
              </div>

              <div className="flex items-center gap-4 self-end md:self-center">
                <span className="font-mono font-bold text-sm text-rose-600">
                  {formatCurrency(ref.amount)}
                </span>
                {ref.status === "Pending Approval" && (
                  <button
                    onClick={() => handleApprove(ref.id)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1 shadow-2xs"
                  >
                    <CheckCircle className="w-3.5 h-3.5" /> Approve Refund
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}

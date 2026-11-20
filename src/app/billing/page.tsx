"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockInvoices, mockPatients } from "@/data/mockData";
import { BillingInvoice } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  IndianRupee,
  Plus,
  Printer,
  Eye,
  CreditCard,
  QrCode,
  FileCheck2,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";

interface BillItemRow {
  id: string;
  description: string;
  category: any;
  quantity: number;
  unitPrice: number;
  taxPercent: number;
}

function buildNewInvoice(
  patient: (typeof mockPatients)[0],
  department: string,
  billItems: BillItemRow[],
  subtotal: number,
  tax: number,
  discountAmount: number,
  totalAmount: number,
  paymentMethod: BillingInvoice["paymentMethod"]
): BillingInvoice {
  return {
    id: `inv-${Date.now()}`,
    billNumber: `INV-2026-${Math.floor(10000 + Math.random() * 90000)}`,
    uhid: patient.uhid,
    patientName: patient.fullName,
    patientMobile: patient.mobile,
    billingDate: new Date().toISOString().split("T")[0],
    department,
    items: billItems.map((i) => ({
      description: i.description,
      category: i.category,
      quantity: i.quantity,
      unitPrice: i.unitPrice,
      taxPercent: i.taxPercent,
      total: i.quantity * i.unitPrice,
    })),
    subtotal,
    tax,
    discount: discountAmount,
    totalAmount,
    paidAmount: totalAmount,
    outstandingAmount: 0,
    paymentMethod,
    status: "Paid",
  };
}

export default function BillingDashboardPage() {
  const [invoices, setInvoices] = useState<BillingInvoice[]>(mockInvoices);
  const [showNewBillModal, setShowNewBillModal] = useState(false);
  const [previewInvoice, setPreviewInvoice] = useState<BillingInvoice | null>(null);

  // New Invoice State
  const [selectedPatientId, setSelectedPatientId] = useState(mockPatients[0].id);
  const [department, setDepartment] = useState("Cardiology");
  const [paymentMethod, setPaymentMethod] = useState<any>("UPI");
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [billItems, setBillItems] = useState<BillItemRow[]>([
    {
      id: "bi-1",
      description: "Senior Specialist Clinical Consultation",
      category: "Consultation",
      quantity: 1,
      unitPrice: 1500,
      taxPercent: 0,
    },
    {
      id: "bi-2",
      description: "Comprehensive 2D Echocardiogram with Colour Doppler",
      category: "Investigation",
      quantity: 1,
      unitPrice: 3200,
      taxPercent: 0,
    },
  ]);

  const subtotal = billItems.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
  const tax = billItems.reduce(
    (acc, item) => acc + (item.quantity * item.unitPrice * item.taxPercent) / 100,
    0
  );
  const totalAmount = Math.max(0, subtotal + tax - discountAmount);

  const handleAddItem = () => {
    setBillItems([
      ...billItems,
      {
        id: `bi-${Date.now()}`,
        description: "Routine Diagnostic Investigation / Consumable",
        category: "Investigation",
        quantity: 1,
        unitPrice: 850,
        taxPercent: 0,
      },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    setBillItems(billItems.filter((i) => i.id !== id));
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const patient = mockPatients.find((p) => p.id === selectedPatientId) || mockPatients[0];

    const newInv = buildNewInvoice(
      patient,
      department,
      billItems,
      subtotal,
      tax,
      discountAmount,
      totalAmount,
      paymentMethod
    );

    setInvoices([newInv, ...invoices]);
    setShowNewBillModal(false);
    toast.success(`Tax invoice ${newInv.billNumber} generated successfully!`);
    setPreviewInvoice(newInv);
  };

  const columns: Column<BillingInvoice>[] = [
    {
      header: "Invoice No.",
      accessorKey: "billNumber",
      cell: (inv) => (
        <span className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400">
          {inv.billNumber}
        </span>
      ),
    },
    {
      header: "Patient",
      accessorKey: "patientName",
      cell: (inv) => (
        <div>
          <p className="font-bold text-slate-900 dark:text-slate-100">{inv.patientName}</p>
          <p className="text-[11px] font-mono text-slate-400">{inv.uhid}</p>
        </div>
      ),
    },
    {
      header: "Date",
      accessorKey: "billingDate",
      cell: (inv) => formatDate(inv.billingDate),
    },
    {
      header: "Department",
      accessorKey: "department",
    },
    {
      header: "Total (₹)",
      accessorKey: "totalAmount",
      cell: (inv) => <span className="font-mono font-bold">{formatCurrency(inv.totalAmount)}</span>,
    },
    {
      header: "Paid (₹)",
      accessorKey: "paidAmount",
      cell: (inv) => (
        <span className="font-mono font-bold text-emerald-600">
          {formatCurrency(inv.paidAmount)}
        </span>
      ),
    },
    {
      header: "Mode",
      accessorKey: "paymentMethod",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (inv) => <StatusBadge status={inv.status} />,
    },
    {
      header: "Actions",
      cell: (inv) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreviewInvoice(inv)}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-blue-600"
            title="View & Print Invoice"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Billing & Finance", href: "/billing" },
          { label: "Invoices & Receipts" },
        ]}
        title="Patient Billing & Revenue Cashier Console"
        description="Comprehensive OPD & IPD tax invoicing, multi-mode payment collection (UPI/Cash/TPA), and formal receipt generation."
      >
        <Link
          href="/billing/estimates"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors"
        >
          Bill Estimates
        </Link>
        <button
          onClick={() => setShowNewBillModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" /> Generate New Bill
        </button>
      </PageHeader>

      <DataTable
        data={invoices}
        columns={columns}
        searchPlaceholder="Search invoices by bill number, patient name, UHID..."
        searchFields={["billNumber", "patientName", "uhid", "department"]}
      />

      {/* Generate New Bill Modal */}
      {showNewBillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl text-xs space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-emerald-600" />
                Generate Patient Tax Invoice
              </h3>
              <button onClick={() => setShowNewBillModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Select Patient</label>
                  <select
                    aria-label="Select Patient"
                    value={selectedPatientId}
                    onChange={(e) => setSelectedPatientId(e.target.value)}
                    className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800 font-semibold"
                  >
                    {mockPatients.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.fullName} ({p.uhid})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Department</label>
                  <select
                    aria-label="Department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800 font-semibold"
                  >
                    <option>Cardiology</option>
                    <option>Orthopaedics</option>
                    <option>Neurology</option>
                    <option>Obstetrics & Gynaecology</option>
                    <option>General Surgery</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Payment Method</label>
                  <select
                    aria-label="Payment Method"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800 font-semibold text-emerald-600"
                  >
                    <option value="UPI">UPI (GooglePay / PhonePe / Paytm)</option>
                    <option value="Credit Card">Credit / Debit Card (POS)</option>
                    <option value="Cash">Cash Counter</option>
                    <option value="Insurance TPA">Insurance TPA Desk (Cashless)</option>
                    <option value="Net Banking">NEFT / RTGS Net Banking</option>
                  </select>
                </div>
              </div>

              {/* Service Line Items */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    Billed Services & Investigations
                  </span>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="px-2.5 py-1 text-xs font-semibold rounded bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                  >
                    + Add Line Item
                  </button>
                </div>

                {billItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 gap-2 items-center p-2.5 rounded-lg border bg-slate-50/50 dark:bg-slate-800/40"
                  >
                    <div className="col-span-6">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => {
                          const updated = [...billItems];
                          updated[idx].description = e.target.value;
                          setBillItems(updated);
                        }}
                        className="w-full p-1.5 rounded border bg-white dark:bg-slate-900"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => {
                          const updated = [...billItems];
                          updated[idx].quantity = parseInt(e.target.value) || 1;
                          setBillItems(updated);
                        }}
                        className="w-full p-1.5 rounded border bg-white dark:bg-slate-900 text-center font-mono"
                      />
                    </div>
                    <div className="col-span-3">
                      <input
                        type="number"
                        placeholder="Price"
                        value={item.unitPrice}
                        onChange={(e) => {
                          const updated = [...billItems];
                          updated[idx].unitPrice = parseFloat(e.target.value) || 0;
                          setBillItems(updated);
                        }}
                        className="w-full p-1.5 rounded border bg-white dark:bg-slate-900 text-right font-mono"
                      />
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-rose-500 hover:text-rose-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Automatic Calculation Summary Box */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1.5 text-right font-mono">
                <div className="flex justify-between">
                  <span className="font-sans text-slate-500">Subtotal:</span>
                  <span className="font-bold">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans text-slate-500">Concession / Discount:</span>
                  <input
                    type="number"
                    value={discountAmount}
                    onChange={(e) => setDiscountAmount(parseFloat(e.target.value) || 0)}
                    className="w-28 p-1 rounded border text-right font-mono bg-white dark:bg-slate-900"
                  />
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-slate-100 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span className="font-sans">Net Total Payable:</span>
                  <span className="text-emerald-600">{formatCurrency(totalAmount)}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewBillModal(false)}
                  className="px-4 py-2 rounded-lg border font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <FileCheck2 className="w-4 h-4" /> Settle & Issue Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Invoice Modal Preview */}
      {previewInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-2xl text-xs space-y-6 my-8">
            <div className="flex items-start justify-between border-b pb-4 border-slate-200 dark:border-slate-800">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-blue-600">NuvertOS Healthcare</h2>
                <p className="text-slate-500 text-[11px]">Apex Super-Speciality Hospital & Research Centre</p>
                <p className="text-slate-400 text-[10px]">GSTIN: 27AABCN8891P1ZX • Bandra West, Mumbai</p>
              </div>
              <div className="text-right">
                <p className="font-mono font-bold text-sm">{previewInvoice.billNumber}</p>
                <p className="text-slate-400">Date: {previewInvoice.billingDate}</p>
                <StatusBadge status={previewInvoice.status} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl">
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-bold">Billed To (Patient):</p>
                <p className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-0.5">
                  {previewInvoice.patientName}
                </p>
                <p className="font-mono text-slate-500">UHID: {previewInvoice.uhid}</p>
                <p className="text-slate-500">Mobile: {previewInvoice.patientMobile}</p>
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-[10px] uppercase font-bold">Payment Mode:</p>
                <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                  {previewInvoice.paymentMethod}
                </p>
                <p className="text-slate-400 mt-1">Counter: Cashier Desk #03</p>
              </div>
            </div>

            <table className="w-full text-left">
              <thead className="border-b text-slate-500">
                <tr>
                  <th className="py-2">Item Description</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Unit Price</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {previewInvoice.items.map((it, i) => (
                  <tr key={i}>
                    <td className="py-2.5 font-medium">{it.description}</td>
                    <td className="py-2.5 text-center font-mono">{it.quantity}</td>
                    <td className="py-2.5 text-right font-mono">{formatCurrency(it.unitPrice)}</td>
                    <td className="py-2.5 text-right font-mono font-bold">
                      {formatCurrency(it.quantity * it.unitPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="border-t pt-3 flex justify-between items-center text-sm font-bold">
              <span>Grand Total Amount:</span>
              <span className="font-mono text-blue-600 text-lg">
                {formatCurrency(previewInvoice.totalAmount)}
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 no-print">
              <button
                onClick={() => setPreviewInvoice(null)}
                className="px-4 py-2 rounded-lg border font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" /> Print Thermal / A4 Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { mockMedicines, mockPatients } from "@/data/mockData";
import { Medicine } from "@/types";
import { formatCurrency } from "@/lib/utils";
import {
  ShoppingCart,
  Plus,
  Trash2,
  Printer,
  CheckCircle,
  IndianRupee,
  Search,
} from "lucide-react";
import { toast } from "sonner";

interface CartItem {
  medicine: Medicine;
  quantity: number;
}

export default function PharmacySalesPOSPage() {
  const [patientId, setPatientId] = useState(mockPatients[0].id);
  const [cart, setCart] = useState<CartItem[]>([
    { medicine: mockMedicines[0], quantity: 2 },
    { medicine: mockMedicines[1], quantity: 1 },
  ]);
  const [paymentMode, setPaymentMode] = useState("UPI");
  const [discountPercent, setDiscountPercent] = useState(5);

  const subtotal = cart.reduce((acc, item) => acc + item.medicine.sellingPrice * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const grandTotal = subtotal - discountAmount;

  const handleAddToCart = (med: Medicine) => {
    const existing = cart.find((i) => i.medicine.id === med.id);
    if (existing) {
      setCart(cart.map((i) => (i.medicine.id === med.id ? { ...i, quantity: i.quantity + 1 } : i)));
    } else {
      setCart([...cart, { medicine: med, quantity: 1 }]);
    }
    toast.info(`Added ${med.name} to dispensing tray.`);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(cart.filter((i) => i.medicine.id !== id));
  };

  const handleCompleteSale = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Medicines dispensed successfully! Invoice total: ${formatCurrency(grandTotal)}.`);
    setCart([]);
  };

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Pharmacy", href: "/pharmacy" },
          { label: "Dispensing POS" },
        ]}
        title="Pharmacy Point-of-Sale (POS) & Drug Dispense"
        description="Outpatient counter drug dispensing, automated batch lot selection, GST billing, and thermal slip printing."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Available Medicines Shelf Search */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Search className="w-4 h-4 text-blue-600" />
              Quick Medicine Formulations Catalog
            </h2>
            <span className="text-slate-400">Click formulation to add</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto">
            {mockMedicines.map((med) => (
              <div
                key={med.id}
                onClick={() => handleAddToCart(med)}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-blue-50/40 cursor-pointer transition-all space-y-1"
              >
                <div className="flex justify-between items-start">
                  <span className="font-bold text-slate-900 dark:text-slate-100">{med.name}</span>
                  <span className="font-mono font-bold text-blue-600">
                    {formatCurrency(med.sellingPrice)}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{med.genericName}</p>
                <div className="flex justify-between text-[10px] text-slate-400 pt-1 font-mono">
                  <span>Batch: {med.batchNumber}</span>
                  <span className={med.stockQty > 50 ? "text-emerald-600" : "text-amber-600"}>
                    {med.stockQty} in stock
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Dispensing Cart & Checkout */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between text-xs space-y-4">
          <form onSubmit={handleCompleteSale} className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Dispensing Patient</label>
              <select
                aria-label="Dispensing Patient"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800 font-semibold"
              >
                <option value="walk-in">Direct Walk-In Retail Customer</option>
                {mockPatients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.fullName} ({p.uhid})
                  </option>
                ))}
              </select>
            </div>

            {/* Cart Items */}
            <div className="space-y-2 border-y border-slate-100 dark:border-slate-800 py-3 max-h-48 overflow-y-auto">
              {cart.length === 0 ? (
                <p className="text-center text-slate-400 py-6">Dispensing tray is empty</p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.medicine.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40"
                  >
                    <div>
                      <p className="font-bold text-slate-900 dark:text-slate-100">
                        {item.medicine.name}
                      </p>
                      <p className="text-[10px] font-mono text-slate-400">
                        {item.quantity} x {formatCurrency(item.medicine.sellingPrice)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                        {formatCurrency(item.medicine.sellingPrice * item.quantity)}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFromCart(item.medicine.id)}
                        className="text-rose-500 hover:text-rose-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Checkout Calculation */}
            <div className="space-y-1.5 font-mono text-right">
              <div className="flex justify-between">
                <span className="font-sans text-slate-500">Gross Total:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans text-slate-500">Concession ({discountPercent}%):</span>
                <span className="text-emerald-600">-{formatCurrency(discountAmount)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-slate-900 dark:text-slate-100 pt-1 border-t">
                <span className="font-sans">Payable:</span>
                <span className="text-blue-600">{formatCurrency(grandTotal)}</span>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Payment Mode</label>
              <select
                aria-label="Payment Mode"
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800 font-semibold text-emerald-600"
              >
                <option>UPI (BharatQR / GPay)</option>
                <option>Cash Counter</option>
                <option>Credit / Debit Card</option>
                <option>Add to Inpatient (IPD) Running Bill</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={cart.length === 0}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
            >
              <CheckCircle className="w-4 h-4" /> Collect & Print Pharmacy Bill
            </button>
          </form>
        </div>
      </div>
    </DashboardShell>
  );
}

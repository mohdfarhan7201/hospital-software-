"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockMedicines } from "@/data/mockData";
import { Medicine } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Pill, Plus } from "lucide-react";
import { toast } from "sonner";

export default function MedicineMasterPage() {
  const [medicines, setMedicines] = useState<Medicine[]>(mockMedicines);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Drug Form State
  const [name, setName] = useState("");
  const [genericName, setGenericName] = useState("");
  const [category, setCategory] = useState<any>("Antibiotics");
  const [dosageForm, setDosageForm] = useState<any>("Tablet");
  const [batchNumber, setBatchNumber] = useState("BN-2026-999");
  const [manufacturer, setManufacturer] = useState("Sun Pharmaceuticals");
  const [expiryDate, setExpiryDate] = useState("2027-10-31");
  const [purchasePrice, setPurchasePrice] = useState("120");
  const [sellingPrice, setSellingPrice] = useState("175");
  const [stockQty, setStockQty] = useState("300");

  const handleCreateMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    const newMed: Medicine = {
      id: `med-${Date.now()}`,
      name,
      sku: `MED-${name.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      genericName,
      category,
      dosageForm,
      batchNumber,
      manufacturer,
      expiryDate,
      purchasePrice: parseFloat(purchasePrice) || 100,
      sellingPrice: parseFloat(sellingPrice) || 150,
      stockQty: parseInt(stockQty) || 100,
      reorderLevel: 50,
      stockStatus: "In Stock",
    };

    setMedicines([newMed, ...medicines]);
    setShowAddModal(false);
    toast.success(`Medicine ${name} registered in pharmacy inventory.`);
  };

  const columns: Column<Medicine>[] = [
    {
      header: "Medicine Formulation",
      accessorKey: "name",
      sortable: true,
      cell: (m) => (
        <div>
          <p className="font-bold text-slate-900 dark:text-slate-100">{m.name}</p>
          <p className="text-[11px] text-slate-500">{m.genericName}</p>
        </div>
      ),
    },
    {
      header: "SKU / Batch",
      cell: (m) => (
        <div>
          <span className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
            {m.sku}
          </span>
          <p className="text-[10px] text-slate-400 font-mono">B/N: {m.batchNumber}</p>
        </div>
      ),
    },
    {
      header: "Category",
      accessorKey: "category",
    },
    {
      header: "Form",
      accessorKey: "dosageForm",
    },
    {
      header: "MRP (₹)",
      accessorKey: "sellingPrice",
      sortable: true,
      cell: (m) => <span className="font-mono font-bold">{formatCurrency(m.sellingPrice)}</span>,
    },
    {
      header: "Stock Qty",
      accessorKey: "stockQty",
      sortable: true,
      cell: (m) => <span className="font-mono font-bold text-sm">{m.stockQty}</span>,
    },
    {
      header: "Expiry Date",
      accessorKey: "expiryDate",
    },
    {
      header: "Status",
      accessorKey: "stockStatus",
      cell: (m) => <StatusBadge status={m.stockStatus} />,
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Pharmacy", href: "/pharmacy" },
          { label: "Medicines Master" },
        ]}
        title="Pharmaceutical Master Formulary & Drug Directory"
        description="Master index of registered drug formulations, batch numbers, manufacturer MRPs, and stock thresholds."
      >
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white shadow-xs"
        >
          <Plus className="w-4 h-4" /> Add Formulation
        </button>
      </PageHeader>

      <DataTable
        data={medicines}
        columns={columns}
        searchPlaceholder="Search medicines by brand name, generic formulation, SKU, manufacturer..."
        searchFields={["name", "genericName", "sku", "batchNumber", "manufacturer"]}
        filters={[
          {
            key: "category",
            label: "Category",
            options: [
              { label: "Antibiotics", value: "Antibiotics" },
              { label: "Cardiovascular", value: "Cardiovascular" },
              { label: "Antidiabetic", value: "Antidiabetic" },
              { label: "Analgesics", value: "Analgesics" },
            ],
          },
          {
            key: "stockStatus",
            label: "Stock Status",
            options: [
              { label: "In Stock", value: "In Stock" },
              { label: "Low Stock", value: "Low Stock" },
              { label: "Out of Stock", value: "Out of Stock" },
            ],
          },
        ]}
        exportFileName="nuvertos_pharmacy_master"
      />

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl text-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Register New Drug Formulation
            </h3>

            <form onSubmit={handleCreateMedicine} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Brand Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dolo 650"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Generic Salt</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Paracetamol 650mg"
                    value={genericName}
                    onChange={(e) => setGenericName(e.target.value)}
                    className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    aria-label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800"
                  >
                    <option>Antibiotics</option>
                    <option>Analgesics</option>
                    <option>Cardiovascular</option>
                    <option>Antidiabetic</option>
                    <option>Respiratory</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Dosage Form</label>
                  <select
                    aria-label="Dosage Form"
                    value={dosageForm}
                    onChange={(e) => setDosageForm(e.target.value)}
                    className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800"
                  >
                    <option>Tablet</option>
                    <option>Syrup</option>
                    <option>Injection</option>
                    <option>Capsule</option>
                    <option>Ointment</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                    className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={stockQty}
                    onChange={(e) => setStockQty(e.target.value)}
                    className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold"
                >
                  Save Formulation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

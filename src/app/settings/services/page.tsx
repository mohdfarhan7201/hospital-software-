"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { StatCard } from "@/components/common/StatCard";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { Receipt, DollarSign, Layers, Plus, CheckCircle2 } from "lucide-react";

interface ServiceItem {
  id: string;
  code: string;
  name: string;
  department: string;
  category: "Consultation" | "Investigation" | "Procedure" | "Nursing" | "Bed Charge";
  standardPrice: number;
  tpaPrice: number;
  taxExempt: boolean;
  status: "Active" | "Inactive";
}

const INITIAL_SERVICES: ServiceItem[] = [
  { id: "1", code: "SRV-101", name: "OPD Specialist Consultation", department: "General Medicine", category: "Consultation", standardPrice: 800, tpaPrice: 700, taxExempt: true, status: "Active" },
  { id: "2", code: "SRV-102", name: "Complete Blood Count (CBC) Automated", department: "Laboratory", category: "Investigation", standardPrice: 450, tpaPrice: 380, taxExempt: true, status: "Active" },
  { id: "3", code: "SRV-103", name: "Digital Chest X-Ray (PA View)", department: "Radiology", category: "Investigation", standardPrice: 750, tpaPrice: 650, taxExempt: true, status: "Active" },
  { id: "4", code: "SRV-104", name: "12-Lead Electrocardiogram (ECG)", department: "Cardiology", category: "Investigation", standardPrice: 500, tpaPrice: 420, taxExempt: true, status: "Active" },
  { id: "5", code: "SRV-105", name: "2D Echocardiography with Color Doppler", department: "Cardiology", category: "Investigation", standardPrice: 2800, tpaPrice: 2400, taxExempt: true, status: "Active" },
  { id: "6", code: "SRV-106", name: "ICU Day Telemetry & Monitoring", department: "ICU / CCU", category: "Bed Charge", standardPrice: 6500, tpaPrice: 5500, taxExempt: true, status: "Active" },
  { id: "7", code: "SRV-107", name: "Wound Debridement & Suturing (Minor OT)", department: "General Surgery", category: "Procedure", standardPrice: 1800, tpaPrice: 1500, taxExempt: true, status: "Active" },
];

export default function ServicesMasterPage() {
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({
    code: "",
    name: "",
    department: "Cardiology",
    category: "Investigation",
    standardPrice: 1000,
    tpaPrice: 850,
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code || !form.name) {
      toast.error("Please enter required service details");
      return;
    }
    const newSrv: ServiceItem = {
      id: String(services.length + 1),
      code: form.code.toUpperCase(),
      name: form.name,
      department: form.department,
      category: form.category as any,
      standardPrice: Number(form.standardPrice),
      tpaPrice: Number(form.tpaPrice),
      taxExempt: true,
      status: "Active",
    };
    setServices([...services, newSrv]);
    setShowAddModal(false);
    toast.success(`Service item ${newSrv.name} added to hospital tariff`);
  };

  const columns = [
    { key: "code", header: "Service Code", render: (r: ServiceItem) => <span className="font-mono font-bold text-[var(--primary)]">{r.code}</span> },
    { key: "name", header: "Clinical Service / Procedure", render: (r: ServiceItem) => <span className="font-semibold text-[var(--foreground)]">{r.name}</span> },
    { key: "department", header: "Department" },
    { key: "category", header: "Category", render: (r: ServiceItem) => <span className="px-2 py-0.5 rounded text-xs bg-[var(--background)] border border-[var(--border)]">{r.category}</span> },
    { key: "standardPrice", header: "Standard Tariff", render: (r: ServiceItem) => <span className="font-mono font-bold">{formatCurrency(r.standardPrice)}</span> },
    { key: "tpaPrice", header: "TPA / Insurance Rate", render: (r: ServiceItem) => <span className="font-mono text-emerald-600 dark:text-emerald-400">{formatCurrency(r.tpaPrice)}</span> },
    {
      key: "status",
      header: "Status",
      render: (r: ServiceItem) => (
        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400">
          {r.status}
        </span>
      )
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        title="Hospital Services Tariff & Pricing Master"
        description="Standard healthcare service catalog, investigations, day-care procedures, ICU charges, and agreed TPA cashless rate schedules"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings/hospital" },
          { label: "Services Tariff" },
        ]}
        actions={
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Add Service Item
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <StatCard title="Active Tariff Items" value={String(services.length + 340)} subtitle="Cataloged in billing" icon={Receipt} />
        <StatCard title="Laboratory Tests" value="185" subtitle="Biochemistry, Hema, Micro" icon={Layers} />
        <StatCard title="Radiology Scans" value="72" subtitle="MRI, CT, Ultrasound, X-Ray" icon={CheckCircle2} />
        <StatCard title="TPA Negotiated Rates" value="100% Configured" subtitle="Auto applies on claims" icon={DollarSign} />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">Master Tariff Schedule</h3>
        <DataTable columns={columns} data={services} searchKey="name" searchPlaceholder="Search service by name or code..." />
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl w-full max-w-lg p-6 shadow-xl text-xs">
            <h3 className="text-base font-bold text-[var(--foreground)] mb-1">Add Healthcare Service Tariff</h3>
            <p className="text-xs text-[var(--muted-foreground)] mb-4">Define billing code, standard price, and insurance package rates</p>

            <form onSubmit={handleAdd} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Service Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SRV-201"
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] font-mono uppercase focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                  >
                    <option value="Consultation">Consultation</option>
                    <option value="Investigation">Investigation</option>
                    <option value="Procedure">Procedure</option>
                    <option value="Nursing">Nursing</option>
                    <option value="Bed Charge">Bed Charge</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Service Item Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MRI Brain with Contrast"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Department</label>
                <select
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                >
                  <option value="Cardiology">Cardiology</option>
                  <option value="Laboratory">Laboratory</option>
                  <option value="Radiology">Radiology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="ICU / CCU">ICU / CCU</option>
                  <option value="General Surgery">General Surgery</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Standard Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={form.standardPrice}
                    onChange={(e) => setForm({ ...form, standardPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">TPA Insurance Price (₹)</label>
                  <input
                    type="number"
                    value={form.tpaPrice}
                    onChange={(e) => setForm({ ...form, tpaPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border border-[var(--border)] hover:bg-[var(--background)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white hover:opacity-90 font-semibold"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

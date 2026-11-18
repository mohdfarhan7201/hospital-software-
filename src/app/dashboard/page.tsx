"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  BedDouble,
  Activity,
  IndianRupee,
  Scissors,
  Pill,
  Clock,
  ArrowUpRight,
  Plus,
  Stethoscope,
  Building2,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Video,
  FileText,
  FlaskConical,
  Droplet,
  ShieldCheck,
  Receipt,
  Package,
  HeartPulse,
  Eye,
  Check,
  ArrowRight,
  UserCheck,
  Sparkles,
  DollarSign,
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import {
  PatientFlowChart,
  RevenueBarChart,
  DepartmentPieChart,
} from "@/components/dashboard/DashboardCharts";
import { mockAppointments, mockBeds, mockPatients, mockDoctors } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

export default function MainDashboardPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState(mockAppointments);

  const handleCallNext = (id: string, name: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "In Consultation" } : a))
    );
    toast.success(`Token called: ${name} is now In Consultation`);
  };

  const handleComplete = (id: string, name: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Completed" } : a))
    );
    toast.success(`Consultation completed for ${name}`);
  };

  const occupiedBeds = mockBeds.filter((b) => b.status === "Occupied").length;
  const totalBeds = mockBeds.length;
  const occupancyPercent = Math.round((occupiedBeds / totalBeds) * 100);

  // ==========================================
  // 1. DOCTOR WORKSTATION DASHBOARD
  // ==========================================
  if (user.role === "Doctor") {
    return (
      <DashboardShell>
        <PageHeader
          title={`Doctor Clinical Console: ${user.name}`}
          description={`Speciality: ${user.department || "Cardiology"} • OPD Chamber 101 • Active In-Session`}
        >
          <Link
            href="/opd/flowboard"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[var(--primary)] hover:opacity-90 text-white shadow-xs transition-opacity"
          >
            <Stethoscope className="w-4 h-4" />
            <span>OPD Flowboard</span>
          </Link>
          <Link
            href="/appointments/virtual-clinic"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
          >
            <Video className="w-3.5 h-3.5 text-blue-500" />
            <span>Virtual Clinic (Telehealth)</span>
          </Link>
        </PageHeader>

        {/* Doctor KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="OPD Patients Waiting"
            value="8 Waiting"
            subtitle="Next Token: TK-102 (Vikramaditya)"
            trend={{ value: 4, isPositive: true }}
            icon={Users}
            iconColor="blue"
          />
          <StatCard
            title="Completed Consults"
            value="16 Done"
            subtitle="Average 9.2 mins/patient"
            trend={{ value: 12, isPositive: true }}
            icon={CheckCircle}
            iconColor="emerald"
          />
          <StatCard
            title="Virtual Consultations"
            value="3 Sessions"
            subtitle="Next video consult @ 03:00 PM"
            trend={{ value: 1, isPositive: true }}
            icon={Video}
            iconColor="purple"
          />
          <StatCard
            title="OT Procedures Today"
            value="1 Surgery"
            subtitle="Coronary Angioplasty (04:30 PM)"
            trend={{ value: 0, isPositive: true }}
            icon={Scissors}
            iconColor="amber"
          />
        </div>

        {/* Doctor Specific Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left: Active OPD Patient Queue */}
          <div className="lg:col-span-2 bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
              <div>
                <h3 className="font-bold text-sm text-[var(--foreground)]">
                  My Outpatient Queue (Today's Tokens)
                </h3>
                <p className="text-xs text-[var(--muted-foreground)]">
                  Click 'Call Inside' to begin clinical encounter & e-prescription
                </p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-[var(--primary)] border border-blue-500/20">
                Chamber 101
              </span>
            </div>

            <div className="divide-y divide-[var(--border)] mt-2">
              {appointments.slice(0, 5).map((apt) => (
                <div key={apt.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-xs px-2 py-1 rounded bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)]">
                      {apt.tokenNumber}
                    </span>
                    <div>
                      <Link
                        href={`/patients/${apt.uhid}`}
                        className="font-bold text-xs text-[var(--foreground)] hover:text-[var(--primary)]"
                      >
                        {apt.patientName}
                      </Link>
                      <p className="text-[11px] text-[var(--muted-foreground)] font-mono">
                        {apt.uhid} • {apt.timeSlot}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <StatusBadge status={apt.status} />
                    {apt.status === "Confirmed" && (
                      <button
                        onClick={() => handleCallNext(apt.id, apt.patientName)}
                        className="px-2.5 py-1 text-xs font-semibold rounded bg-[var(--primary)] text-white hover:opacity-90"
                      >
                        Call Inside
                      </button>
                    )}
                    {apt.status === "In Consultation" && (
                      <div className="flex items-center gap-1.5">
                        <Link
                          href={`/patients/${apt.uhid}`}
                          className="px-2.5 py-1 text-xs font-semibold rounded bg-emerald-600 text-white hover:bg-emerald-700"
                        >
                          Clinical EMR
                        </Link>
                        <button
                          onClick={() => handleComplete(apt.id, apt.patientName)}
                          className="px-2 py-1 text-xs rounded border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)]"
                        >
                          Complete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Quick Clinical Actions & Telehealth */}
          <div className="space-y-4">
            <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 shadow-xs">
              <h4 className="font-bold text-xs text-[var(--foreground)] mb-2 flex items-center gap-2">
                <Video className="w-4 h-4 text-[var(--primary)]" />
                Live Telehealth Virtual Room
              </h4>
              <p className="text-xs text-[var(--muted-foreground)] mb-3">
                Patient Rajesh Sharma is connected in the virtual waiting lobby.
              </p>
              <Link
                href="/appointments/virtual-clinic"
                className="w-full py-2 rounded-lg bg-[var(--primary)] text-white text-xs font-bold flex items-center justify-center gap-2 hover:opacity-90"
              >
                <span>Launch Virtual Clinic Console</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 shadow-xs">
              <h4 className="font-bold text-xs text-[var(--foreground)] mb-3">
                Doctor Shortcuts
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  href="/prescriptions"
                  className="p-2.5 rounded-lg border border-[var(--border)] hover:bg-[var(--muted)] text-[var(--foreground)] font-medium text-center"
                >
                  Write Rx
                </Link>
                <Link
                  href="/radiology/reports"
                  className="p-2.5 rounded-lg border border-[var(--border)] hover:bg-[var(--muted)] text-[var(--foreground)] font-medium text-center"
                >
                  PACS Imaging
                </Link>
                <Link
                  href="/operation-theatre/calendar"
                  className="p-2.5 rounded-lg border border-[var(--border)] hover:bg-[var(--muted)] text-[var(--foreground)] font-medium text-center"
                >
                  OT Schedule
                </Link>
                <Link
                  href="/discharge"
                  className="p-2.5 rounded-lg border border-[var(--border)] hover:bg-[var(--muted)] text-[var(--foreground)] font-medium text-center"
                >
                  Discharge Summary
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DashboardShell>
    );
  }

  // ==========================================
  // 2. RECEPTIONIST DASHBOARD
  // ==========================================
  if (user.role === "Receptionist") {
    return (
      <DashboardShell>
        <PageHeader
          title={`Front Desk & Reception: ${user.name}`}
          description="Patient registration, OPD appointment scheduling, token generation, and bed availability."
        >
          <Link
            href="/patients/new"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>New Patient Registration</span>
          </Link>
          <Link
            href="/appointments"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)]"
          >
            <Calendar className="w-3.5 h-3.5 text-blue-500" />
            <span>Book Appointment</span>
          </Link>
        </PageHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Today's Registrations"
            value="28 Patients"
            subtitle="Walk-in + Online OPD"
            trend={{ value: 15, isPositive: true }}
            icon={Users}
            iconColor="blue"
          />
          <StatCard
            title="Confirmed Appointments"
            value="64 Scheduled"
            subtitle="18 Consultations Ongoing"
            trend={{ value: 8, isPositive: true }}
            icon={Calendar}
            iconColor="emerald"
          />
          <StatCard
            title="Pending Tokens"
            value="14 in Lobby"
            subtitle="Avg Wait: 12 minutes"
            trend={{ value: -3, isPositive: true }}
            icon={Clock}
            iconColor="purple"
          />
          <StatCard
            title="Vacant IPD Beds"
            value={`${totalBeds - occupiedBeds} Vacant Beds`}
            subtitle="Ready for Emergency Admission"
            trend={{ value: 2, isPositive: true }}
            icon={BedDouble}
            iconColor="amber"
          />
        </div>

        {/* Front Desk Live Queue Table */}
        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 shadow-xs mb-6">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
            <h3 className="font-bold text-sm text-[var(--foreground)]">
              Front Desk OPD Token Queue & Token Status
            </h3>
            <Link href="/queue" className="text-xs text-[var(--primary)] font-semibold hover:underline">
              Full Queue Manager →
            </Link>
          </div>

          <div className="divide-y divide-[var(--border)] mt-2">
            {appointments.map((apt) => (
              <div key={apt.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-xs px-2 py-1 rounded bg-[var(--muted)] text-[var(--primary)] border border-[var(--border)]">
                    {apt.tokenNumber}
                  </span>
                  <div>
                    <p className="font-bold text-xs text-[var(--foreground)]">{apt.patientName}</p>
                    <p className="text-[11px] text-[var(--muted-foreground)]">
                      {apt.uhid} • Assigned: {apt.doctorName} ({apt.department})
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[var(--muted-foreground)]">{apt.timeSlot}</span>
                  <StatusBadge status={apt.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardShell>
    );
  }

  // ==========================================
  // 3. NURSE DASHBOARD
  // ==========================================
  if (user.role === "Nurse") {
    return (
      <DashboardShell>
        <PageHeader
          title={`Nursing Station & Ward Care: ${user.name}`}
          description="Inpatient bed monitoring, vital signs roster, Medication Administration (MAR), and nurse notes."
        >
          <Link
            href="/clinical/vitals"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white shadow-xs"
          >
            <Activity className="w-4 h-4" />
            <span>Record Patient Vitals</span>
          </Link>
          <Link
            href="/wards/roster"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)]"
          >
            <BedDouble className="w-3.5 h-3.5 text-purple-500" />
            <span>IPD Bed Roster</span>
          </Link>
        </PageHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Inpatients in Ward"
            value="18 Patients"
            subtitle="Coronary ICU & General Wards"
            trend={{ value: 2, isPositive: true }}
            icon={BedDouble}
            iconColor="blue"
          />
          <StatCard
            title="Pending Vitals Due"
            value="6 Patients"
            subtitle="Hourly BP / SpO2 Checks"
            trend={{ value: 3, isPositive: false }}
            icon={Activity}
            iconColor="purple"
          />
          <StatCard
            title="Medications Due (MAR)"
            value="12 Doses"
            subtitle="Scheduled at 02:00 PM Round"
            trend={{ value: 5, isPositive: true }}
            icon={Pill}
            iconColor="emerald"
          />
          <StatCard
            title="Pending Doctor Rounds"
            value="3 Consultants"
            subtitle="Dr. Arvind Swamy @ 03:30 PM"
            trend={{ value: 0, isPositive: true }}
            icon={Stethoscope}
            iconColor="amber"
          />
        </div>

        {/* Inpatient Ward Bed Grid */}
        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 shadow-xs mb-6">
          <h3 className="font-bold text-sm text-[var(--foreground)] mb-4">
            Live Ward Bed Status & Nursing Roster
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockBeds.slice(0, 6).map((bed) => (
              <div
                key={bed.id}
                className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)] transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-[var(--muted)] text-[var(--foreground)]">
                    {bed.bedNumber}
                  </span>
                  <StatusBadge status={bed.status} />
                </div>
                <p className="font-bold text-xs text-[var(--foreground)] truncate">
                  {bed.patient ? bed.patient.name : "Available / Vacant"}
                </p>
                <p className="text-[11px] text-[var(--muted-foreground)]">
                  {bed.wardName} • {bed.type}
                </p>
                {bed.patient && (
                  <div className="mt-2.5 pt-2 border-t border-[var(--border)] flex items-center justify-between text-[11px]">
                    <span className="text-[var(--muted-foreground)]">Admitted by: {bed.patient.doctorName}</span>
                    <Link
                      href={`/patients/${bed.patient.uhid}`}
                      className="text-[var(--primary)] font-bold hover:underline"
                    >
                      EMR →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </DashboardShell>
    );
  }

  // ==========================================
  // 4. ACCOUNTANT DASHBOARD
  // ==========================================
  if (user.role === "Accountant") {
    return (
      <DashboardShell>
        <PageHeader
          title={`Billing, Cashier & Finance: ${user.name}`}
          description="Cash counter receipts, digital settlements, insurance TPA claims, and day accounts closing."
        >
          <Link
            href="/billing"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white shadow-xs"
          >
            <Receipt className="w-4 h-4" />
            <span>Generate New Bill</span>
          </Link>
          <Link
            href="/finance/accounts-closing"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)]"
          >
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span>Daily Accounts Closing</span>
          </Link>
        </PageHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Today's Total Collections"
            value="₹8,42,850"
            subtitle="Cash ₹1.4L • UPI ₹3.8L • TPA ₹3.2L"
            trend={{ value: 8.4, isPositive: true }}
            icon={IndianRupee}
            iconColor="emerald"
          />
          <StatCard
            title="Outstanding Invoices"
            value="₹2,14,000"
            subtitle="12 Unpaid Inpatient Invoices"
            trend={{ value: -4.2, isPositive: false }}
            icon={Receipt}
            iconColor="amber"
          />
          <StatCard
            title="Pending TPA Claims"
            value="7 Claims"
            subtitle="₹4,95,000 Under Review"
            trend={{ value: 2, isPositive: true }}
            icon={ShieldCheck}
            iconColor="blue"
          />
          <StatCard
            title="Petty Cash Balance"
            value="₹45,200"
            subtitle="₹4,800 Disbursed Today"
            trend={{ value: 0, isPositive: true }}
            icon={DollarSign}
            iconColor="purple"
          />
        </div>

        {/* Revenue Breakdown Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 shadow-xs">
            <h3 className="font-bold text-sm text-[var(--foreground)] mb-3">
              Departmental Revenue & Billing Receipts
            </h3>
            <RevenueBarChart />
          </div>
          <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 shadow-xs">
            <h3 className="font-bold text-sm text-[var(--foreground)] mb-3">
              Financial Actions & GST Reports
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <Link href="/billing/payments" className="p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--muted)] font-semibold">
                Payment Collection (POS)
              </Link>
              <Link href="/billing/refunds" className="p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--muted)] font-semibold">
                Process Patient Refund
              </Link>
              <Link href="/insurance/claims" className="p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--muted)] font-semibold">
                Insurance Claims Desk
              </Link>
              <Link href="/reports/gst" className="p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--muted)] font-semibold">
                GST GSTR-1 & B2B Reports
              </Link>
            </div>
          </div>
        </div>
      </DashboardShell>
    );
  }

  // ==========================================
  // 5. PHARMACIST DASHBOARD
  // ==========================================
  if (user.role === "Pharmacist") {
    return (
      <DashboardShell>
        <PageHeader
          title={`Central Pharmacy & Dispensing: ${user.name}`}
          description="Doctor e-prescription dispensing, counter sales, stock batch alerts, and expiry management."
        >
          <Link
            href="/pharmacy/sales"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white shadow-xs"
          >
            <Pill className="w-4 h-4" />
            <span>Counter POS Sale</span>
          </Link>
          <Link
            href="/inventory/expiry"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)]"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
            <span>Expiry Warnings (3)</span>
          </Link>
        </PageHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Prescriptions to Dispense"
            value="9 Pending"
            subtitle="OPD & IPD Doctor Orders"
            trend={{ value: 4, isPositive: true }}
            icon={Pill}
            iconColor="blue"
          />
          <StatCard
            title="Today's Pharmacy Sales"
            value="₹1,24,600"
            subtitle="42 Invoices Cleared"
            trend={{ value: 14.2, isPositive: true }}
            icon={IndianRupee}
            iconColor="emerald"
          />
          <StatCard
            title="Low Stock Medicines"
            value="6 Items"
            subtitle="Below Reorder Threshold"
            trend={{ value: -2, isPositive: false }}
            icon={Package}
            iconColor="amber"
          />
          <StatCard
            title="Near-Expiry Batches"
            value="3 Batches"
            subtitle="Expiring in < 30 Days"
            trend={{ value: 0, isPositive: false }}
            icon={AlertTriangle}
            iconColor="rose"
          />
        </div>

        {/* Pharmacy Quick Shortcuts */}
        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 shadow-xs mb-6">
          <h3 className="font-bold text-sm text-[var(--foreground)] mb-3">
            Dispensing & Stock Operations
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <Link href="/pharmacy/medicines" className="p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--muted)] font-semibold text-center">
              Medicine Catalog
            </Link>
            <Link href="/inventory/stock" className="p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--muted)] font-semibold text-center">
              Batch Stock Ledger
            </Link>
            <Link href="/inventory/indents" className="p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--muted)] font-semibold text-center">
              Ward Indent Requests
            </Link>
            <Link href="/pharmacy/purchases" className="p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--muted)] font-semibold text-center">
              Purchase Orders
            </Link>
          </div>
        </div>
      </DashboardShell>
    );
  }

  // ==========================================
  // 6. LAB TECHNICIAN DASHBOARD
  // ==========================================
  if (user.role === "Lab Technician") {
    return (
      <DashboardShell>
        <PageHeader
          title={`Clinical Laboratory & Diagnostics: ${user.name}`}
          description="Specimen collection, auto-analyzer queues, diagnostic result entry, and blood bank status."
        >
          <Link
            href="/laboratory/samples"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white shadow-xs"
          >
            <FlaskConical className="w-4 h-4" />
            <span>Sample Collection</span>
          </Link>
          <Link
            href="/laboratory/results"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)]"
          >
            <FileText className="w-3.5 h-3.5 text-blue-500" />
            <span>Enter Results</span>
          </Link>
        </PageHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Samples Pending Collection"
            value="14 Samples"
            subtitle="Blood, Urine & Biopsy"
            trend={{ value: 3, isPositive: true }}
            icon={FlaskConical}
            iconColor="blue"
          />
          <StatCard
            title="Analyzers In-Progress"
            value="22 Tests"
            subtitle="Sysmex & Cobas Analyzers"
            trend={{ value: 6, isPositive: true }}
            icon={Activity}
            iconColor="purple"
          />
          <StatCard
            title="Results Pending Sign-off"
            value="7 Reports"
            subtitle="Requires Pathologist Review"
            trend={{ value: -1, isPositive: true }}
            icon={CheckCircle}
            iconColor="emerald"
          />
          <StatCard
            title="Blood Bank Units"
            value="24 Units"
            subtitle="Ready for Emergency Crossmatch"
            trend={{ value: 0, isPositive: true }}
            icon={Droplet}
            iconColor="rose"
          />
        </div>

        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 shadow-xs mb-6">
          <h3 className="font-bold text-sm text-[var(--foreground)] mb-3">
            Diagnostic Laboratory Shortcuts
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <Link href="/laboratory/tests" className="p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--muted)] font-semibold text-center">
              Test Directory Master
            </Link>
            <Link href="/laboratory/reports" className="p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--muted)] font-semibold text-center">
              Print Lab Reports
            </Link>
            <Link href="/blood-bank/inventory" className="p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--muted)] font-semibold text-center">
              Blood Bank Stock
            </Link>
            <Link href="/radiology/requests" className="p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--muted)] font-semibold text-center">
              Radiology Worklist
            </Link>
          </div>
        </div>
      </DashboardShell>
    );
  }

  // ==========================================
  // 7. SUPER ADMIN & HOSPITAL ADMIN DASHBOARD
  // ==========================================
  return (
    <DashboardShell>
      <PageHeader
        title={user.role === "Super Admin" ? "Super Admin Enterprise Master Dashboard" : "Executive Hospital Overview"}
        description={`Logged in as ${user.name} (${user.role}) • Complete hospital operational, clinical, and financial oversight.`}
      >
        <Link
          href="/patients/new"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[var(--primary)] hover:opacity-90 text-white shadow-xs transition-opacity"
        >
          <Plus className="w-4 h-4" />
          <span>Register Patient</span>
        </Link>
        <Link
          href="/billing"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
        >
          <IndianRupee className="w-3.5 h-3.5 text-emerald-500" />
          <span>New Invoice</span>
        </Link>
      </PageHeader>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Bed Occupancy"
          value={`${occupiedBeds}/${totalBeds} Beds`}
          subtitle={`${occupancyPercent}% occupancy active`}
          trend={{ value: 3.5, isPositive: true }}
          icon={BedDouble}
          iconColor="blue"
        />
        <StatCard
          title="OPD Consultations"
          value="184 Today"
          subtitle="42 In Queue, 128 Done"
          trend={{ value: 12.0, isPositive: true }}
          icon={Activity}
          iconColor="emerald"
        />
        <StatCard
          title="Surgeries Today"
          value="14 Slates"
          subtitle="6 Major, 8 Daycare"
          trend={{ value: -2.0, isPositive: false }}
          icon={Scissors}
          iconColor="purple"
        />
        <StatCard
          title="Gross Collections"
          value="₹8,42,850"
          subtitle="UPI 42%, TPA 38%, Cash 20%"
          trend={{ value: 8.4, isPositive: true }}
          icon={IndianRupee}
          iconColor="amber"
        />
      </div>

      {/* Analytical Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-[var(--foreground)]">
                Weekly Clinical Throughput
              </h3>
              <p className="text-xs text-[var(--muted-foreground)]">
                OPD Outpatient Consultations vs IPD Inpatient Admissions
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--primary)]" />
                OPD
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                IPD Admissions
              </span>
            </div>
          </div>
          <PatientFlowChart />
        </div>

        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-[var(--foreground)] mb-1">
              Departmental Bed Allocation
            </h3>
            <p className="text-xs text-[var(--muted-foreground)] mb-4">
              Distribution of active inpatient beds
            </p>
            <DepartmentPieChart />
          </div>
          <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs">
            <span className="text-[var(--muted-foreground)]">Total Capacity</span>
            <span className="font-bold text-[var(--foreground)]">{totalBeds} Operational Beds</span>
          </div>
        </div>
      </div>

      {/* OPD Live Consultation Queue */}
      <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 shadow-xs mb-6">
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
          <div>
            <h3 className="font-bold text-sm text-[var(--foreground)]">
              OPD Live Consultation Flow
            </h3>
            <p className="text-xs text-[var(--muted-foreground)]">
              Real-time patient queue, token sequence, and clinical consult status
            </p>
          </div>
          <Link
            href="/opd/flowboard"
            className="text-xs font-semibold text-[var(--primary)] hover:underline flex items-center gap-1"
          >
            <span>Open OPD Flowboard</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--muted-foreground)]">
                <th className="py-3 px-3 font-semibold">Token</th>
                <th className="py-3 px-3 font-semibold">Patient Name</th>
                <th className="py-3 px-3 font-semibold">UHID</th>
                <th className="py-3 px-3 font-semibold">Doctor / Specialty</th>
                <th className="py-3 px-3 font-semibold">Slot Time</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {appointments.slice(0, 6).map((apt) => (
                <tr
                  key={apt.id}
                  className="hover:bg-[var(--muted)]/50 transition-colors"
                >
                  <td className="py-3 px-3">
                    <span className="font-mono font-bold text-[var(--primary)] bg-[var(--muted)] px-2 py-0.5 rounded">
                      {apt.tokenNumber}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-[var(--foreground)]">
                    {apt.patientName}
                  </td>
                  <td className="py-3 px-3 font-mono text-[var(--muted-foreground)]">
                    {apt.uhid}
                  </td>
                  <td className="py-3 px-3">
                    <p className="font-medium text-[var(--foreground)]">{apt.doctorName}</p>
                    <p className="text-[10px] text-[var(--muted-foreground)]">{apt.department}</p>
                  </td>
                  <td className="py-3 px-3 font-mono text-[var(--muted-foreground)]">
                    {apt.timeSlot}
                  </td>
                  <td className="py-3 px-3">
                    <StatusBadge status={apt.status} />
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {apt.status === "Confirmed" && (
                        <button
                          onClick={() => handleCallNext(apt.id, apt.patientName)}
                          className="px-2.5 py-1 rounded bg-[var(--primary)] text-white hover:opacity-90 font-semibold"
                        >
                          Call Next
                        </button>
                      )}
                      {apt.status === "In Consultation" && (
                        <button
                          onClick={() => handleComplete(apt.id, apt.patientName)}
                          className="px-2.5 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700 font-semibold"
                        >
                          Finish
                        </button>
                      )}
                      <Link
                        href={`/patients/${apt.uhid}`}
                        className="px-2 py-1 rounded border border-[var(--border)] hover:bg-[var(--muted)] text-[var(--foreground)]"
                      >
                        View 360
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}

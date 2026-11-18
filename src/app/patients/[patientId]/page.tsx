"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockPatients, mockInvoices, mockMedicines, mockAppointments } from "@/data/mockData";
import { Patient } from "@/types";
import { formatDate, formatCurrency } from "@/lib/utils";
import {
  User,
  Heart,
  Phone,
  Calendar,
  FileText,
  Pill,
  CreditCard,
  Shield,
  Activity,
  Plus,
  Clock,
  Printer,
  Edit3,
  Stethoscope,
  AlertCircle,
  FileCheck,
  CheckCircle2,
  FolderOpen,
  MapPin,
  Download,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function Patient360Page({ params }: { params: Promise<{ patientId: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const patientId = resolvedParams?.patientId as string;

  // Find patient by UHID or ID
  const patient: Patient =
    mockPatients.find((p) => p.uhid === patientId || p.id === patientId) || mockPatients[0];

  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "visits"
    | "clinical"
    | "prescriptions"
    | "services"
    | "payments"
    | "files"
    | "claims"
    | "notes"
  >("overview");

  const [showAddVisitModal, setShowAddVisitModal] = useState(false);
  const [newVisitReason, setNewVisitReason] = useState("");
  const [newVisitDoctor, setNewVisitDoctor] = useState("Dr. Arvind Subramaniam");

  const patientInvoices = mockInvoices.filter(
    (inv) => inv.uhid === patient.uhid || inv.patientName.includes(patient.fullName.split(" ")[0])
  );

  const totalBilled = patientInvoices.reduce((a, b) => a + b.totalAmount, 0);
  const totalPaid = patientInvoices.reduce((a, b) => a + b.paidAmount, 0);
  const outstanding = patientInvoices.reduce((a, b) => a + b.outstandingAmount, 0);

  const handleCreateVisit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddVisitModal(false);
    toast.success(`New OPD consultation visit created for ${patient.fullName} with ${newVisitDoctor}`);
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "visits", label: "Visits & Appointments", icon: Calendar },
    { id: "clinical", label: "Clinical Timeline", icon: Activity },
    { id: "prescriptions", label: "Prescriptions", icon: Pill },
    { id: "payments", label: "Billing & Ledger", icon: CreditCard },
    { id: "claims", label: "Insurance Claims", icon: Shield },
    { id: "files", label: "Medical Documents", icon: FolderOpen },
    { id: "notes", label: "Progress Notes", icon: FileText },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Patients", href: "/patients" },
          { label: `Patient 360 (${patient.uhid})` },
        ]}
        title={`Patient 360: ${patient.fullName}`}
        description="Comprehensive longitudinal Electronic Medical Record (EMR) and hospital clinical encounter profile."
      >
        <button
          onClick={() => setShowAddVisitModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Visit Encounter
        </button>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors"
        >
          <Printer className="w-3.5 h-3.5" /> Print Patient Summary
        </button>
      </PageHeader>

      {/* Patient Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <img
                src={patient.photoUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"}
                alt={patient.fullName}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[var(--primary)]/30 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-[var(--card)]" title="Active Patient" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {patient.fullName}
                </h1>
                <span className="font-mono px-2 py-0.5 rounded text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {patient.uhid}
                </span>
                <StatusBadge status={patient.status} />
              </div>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-2 text-xs text-slate-500 dark:text-slate-400">
                <span>
                  <strong>Age/Sex:</strong> {patient.age} Yrs / {patient.gender}
                </span>
                <span>
                  <strong>Blood Group:</strong> {patient.bloodGroup}
                </span>
                <span>
                  <strong>Mobile:</strong> {patient.mobile}
                </span>
                <span>
                  <strong>City:</strong> {patient.address.city}, {patient.address.state}
                </span>
                {patient.abhaId && (
                  <span className="font-mono text-emerald-600 dark:text-emerald-400">
                    <strong>ABHA:</strong> {patient.abhaId}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Financial summary snapshot */}
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200/80 dark:border-slate-700/80">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Total Billed</p>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {formatCurrency(totalBilled || 28544)}
              </p>
            </div>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Collected</p>
              <p className="text-xs font-bold text-emerald-600">
                {formatCurrency(totalPaid || 22000)}
              </p>
            </div>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Due Balance</p>
              <p className="text-xs font-bold text-rose-600">
                {formatCurrency(outstanding || 6544)}
              </p>
            </div>
          </div>
        </div>

        {/* Clinical Alert Ribbon */}
        {patient.medicalSummary?.allergies && patient.medicalSummary.allergies.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 font-bold text-rose-600 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-900">
              <AlertCircle className="w-3.5 h-3.5" /> High Risk Drug Allergies:
            </span>
            <span className="text-slate-700 dark:text-slate-300">
              {patient.medicalSummary.allergies.join(", ")}
            </span>
          </div>
        )}
      </div>

      {/* Tabs Bar */}
      <div className="border-b border-slate-200 dark:border-slate-800 flex overflow-x-auto gap-2 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
                isActive
                  ? "border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20"
                  : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content 1: Overview */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Vitals Card */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  Latest Recorded Vitals
                </h3>
                <span className="text-[11px] text-slate-400">
                  {patient.medicalSummary?.recentVitals?.recordedAt || "Today, 10:30 AM"}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <p className="text-[11px] text-slate-400">Blood Pressure</p>
                  <p className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1 font-mono">
                    {patient.medicalSummary?.recentVitals?.bloodPressure || "128/82 mmHg"}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <p className="text-[11px] text-slate-400">Pulse / Heart Rate</p>
                  <p className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1 font-mono">
                    {patient.medicalSummary?.recentVitals?.pulseRate || 76} bpm
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <p className="text-[11px] text-slate-400">Body Temp</p>
                  <p className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1 font-mono">
                    {patient.medicalSummary?.recentVitals?.temperature || 98.4}°F
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <p className="text-[11px] text-slate-400">Oxygen Sat (SpO2)</p>
                  <p className="text-base font-bold text-emerald-600 mt-1 font-mono">
                    {patient.medicalSummary?.recentVitals?.spO2 || 99}%
                  </p>
                </div>
              </div>
            </div>

            {/* Longitudinal Medical Timeline */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600" />
                Longitudinal Encounter History
              </h3>
              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                {(patient.clinicalEncounterHistory || []).map((enc, idx) => (
                  <div key={enc.id || idx} className="relative">
                    <div
                      className={`absolute -left-6 top-1 w-3 h-3 rounded-full ring-4 ring-white dark:ring-slate-900 ${
                        enc.type === "Emergency"
                          ? "bg-rose-600"
                          : enc.type === "Diagnostic"
                          ? "bg-amber-500"
                          : enc.type === "IPD"
                          ? "bg-purple-600"
                          : "bg-blue-600"
                      }`}
                    />
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {enc.title}
                      </p>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {enc.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {enc.date} • {enc.doctorName} ({enc.department})
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                      {enc.notes}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info: Address, Insurance & Guardian */}
          <div className="space-y-6">
            {/* Address Card */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                Residential Address
              </h3>
              <div className="space-y-2 text-xs">
                <p className="text-slate-500">Street Address:</p>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  {patient.address?.street || "Not Provided"}
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <p className="text-slate-500">City / District:</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {patient.address?.city || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500">State:</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {patient.address?.state || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="pt-1">
                  <p className="text-slate-500">PIN Code:</p>
                  <p className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    {patient.address?.pincode || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Insurance & TPA Coverage */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                Insurance & TPA Coverage
              </h3>
              <div className="space-y-2 text-xs">
                <p className="text-slate-500">Insurance Provider:</p>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  {patient.insurance?.provider || "Self Pay / Cash"}
                </p>
                {patient.insurance?.policyNumber && (
                  <>
                    <p className="text-slate-500 pt-1">Policy Number:</p>
                    <p className="font-mono text-slate-800 dark:text-slate-200">
                      {patient.insurance.policyNumber}
                    </p>
                  </>
                )}
                {patient.insurance?.tpaName && (
                  <>
                    <p className="text-slate-500 pt-1">TPA Desk:</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {patient.insurance.tpaName}
                    </p>
                  </>
                )}
                {patient.insurance?.sumInsured && (
                  <>
                    <p className="text-slate-500 pt-1">Sum Insured Limit:</p>
                    <p className="font-bold text-emerald-600">
                      {formatCurrency(patient.insurance.sumInsured)}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Emergency Contact / Guardian */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-purple-600" />
                Emergency Contact / Guardian
              </h3>
              <div className="space-y-2 text-xs">
                <p className="text-slate-500">Guardian Name:</p>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  {patient.guardian?.name || "Self / None"}
                </p>
                {patient.guardian?.relationship && (
                  <>
                    <p className="text-slate-500 pt-1">Relationship:</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {patient.guardian.relationship}
                    </p>
                  </>
                )}
                {patient.guardian?.mobile && (
                  <>
                    <p className="text-slate-500 pt-1">Mobile Contact:</p>
                    <p className="font-mono text-slate-800 dark:text-slate-200">
                      {patient.guardian.mobile}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: Visits */}
      {activeTab === "visits" && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Consultation & Appointment History
            </h3>
            <button
              onClick={() => setShowAddVisitModal(true)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white"
            >
              + Book Visit
            </button>
          </div>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500">
              <tr>
                <th className="p-3">Token</th>
                <th className="p-3">Encounter Date</th>
                <th className="p-3">Specialist / Doctor</th>
                <th className="p-3">Department</th>
                <th className="p-3">Type</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {mockAppointments
                .filter((a) => a.patientId === patient.id || a.uhid === patient.uhid)
                .map((apt, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 font-mono font-bold text-blue-600">{apt.tokenNumber}</td>
                    <td className="p-3">{apt.appointmentDate}</td>
                    <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                      {apt.doctorName}
                    </td>
                    <td className="p-3">{apt.department}</td>
                    <td className="p-3">{apt.visitType}</td>
                    <td className="p-3">
                      <StatusBadge status={apt.status} />
                    </td>
                  </tr>
                ))}
              {mockAppointments.filter((a) => a.patientId === patient.id || a.uhid === patient.uhid).length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-slate-400">
                    No appointment records found for this patient.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab Content 3: Clinical Timeline */}
      {activeTab === "clinical" && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Detailed Clinical Encounters & Diagnostic Records
              </h3>
              <p className="text-xs text-slate-500">
                Chronological hospital trajectory across OPD, IPD, Diagnostics, Emergency, and Surgery.
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-semibold border border-blue-200 dark:border-blue-900">
              {patient.clinicalEncounterHistory?.length || 0} Encounters Logged
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {(patient.clinicalEncounterHistory || []).map((enc) => (
              <div
                key={enc.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2 text-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        enc.type === "Emergency"
                          ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                          : enc.type === "IPD"
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                          : enc.type === "Diagnostic"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                      }`}
                    >
                      {enc.type}
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                      {enc.title}
                    </h4>
                  </div>
                  <span className="font-mono text-slate-400">{enc.date}</span>
                </div>
                <p className="text-slate-500 font-medium">
                  Attending Consultant: <strong className="text-slate-800 dark:text-slate-200">{enc.doctorName}</strong> ({enc.department})
                </p>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed">
                  {enc.notes}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 4: Prescriptions */}
      {activeTab === "prescriptions" && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-6">
          {(patient.prescriptionsList || []).map((rx) => (
            <div key={rx.id} className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
                      Rx #{rx.rxNumber}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Prescribed by <strong>{rx.doctorName}</strong> ({rx.department}) • Date: {rx.date} • Validity: {rx.validityDays} Days
                  </p>
                </div>
                <Link
                  href="/prescriptions"
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  + Write New Rx
                </Link>
              </div>

              <div className="space-y-3">
                {rx.medicines.map((med, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-slate-50/50 dark:bg-slate-800/30"
                  >
                    <div>
                      <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                        {med.name}
                      </p>
                      <p className="text-slate-500">{med.genericName}</p>
                      <p className="text-blue-600 dark:text-blue-400 font-medium mt-1">
                        Instructions: {med.dosage} • Duration: {med.duration}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono text-slate-500">{med.quantity}</span>
                      <p className="text-emerald-600 font-bold mt-1 flex items-center gap-1 justify-end">
                        <CheckCircle className="w-3.5 h-3.5" /> {med.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {(!patient.prescriptionsList || patient.prescriptionsList.length === 0) && (
            <div className="p-8 text-center text-slate-400">
              <Pill className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No active prescriptions logged for this patient.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab Content 5: Billing & Payments */}
      {activeTab === "payments" && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Patient Billing Ledger & Receipts
              </h3>
              <p className="text-xs text-slate-500">
                Total Billed: {formatCurrency(totalBilled)} | Total Paid: {formatCurrency(totalPaid)} | Balance Due: {formatCurrency(outstanding)}
              </p>
            </div>
            <Link
              href="/billing"
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              + Generate Bill
            </Link>
          </div>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500">
              <tr>
                <th className="p-3">Bill No.</th>
                <th className="p-3">Date</th>
                <th className="p-3">Department</th>
                <th className="p-3">Total Amount</th>
                <th className="p-3">Paid Amount</th>
                <th className="p-3">Outstanding</th>
                <th className="p-3">Mode</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {patientInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-mono font-bold text-blue-600">{inv.billNumber}</td>
                  <td className="p-3">{inv.billingDate}</td>
                  <td className="p-3">{inv.department}</td>
                  <td className="p-3 font-bold">{formatCurrency(inv.totalAmount)}</td>
                  <td className="p-3 text-emerald-600 font-bold">{formatCurrency(inv.paidAmount)}</td>
                  <td className="p-3 text-rose-600 font-bold">{formatCurrency(inv.outstandingAmount)}</td>
                  <td className="p-3">{inv.paymentMethod}</td>
                  <td className="p-3">
                    <StatusBadge status={inv.status} />
                  </td>
                </tr>
              ))}
              {patientInvoices.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-slate-400">
                    No billing invoices generated yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab Content 6: Insurance Claims */}
      {activeTab === "claims" && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Insurance Pre-Authorization & Cashless TPA Claims
              </h3>
              <p className="text-xs text-slate-500">
                Policy verification, digital pre-auth approvals, queries, and claim settlement tracker.
              </p>
            </div>
            <Link
              href="/tpa-claims"
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white"
            >
              Open TPA Portal
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <p className="text-slate-400 font-medium">Primary Insurer</p>
              <p className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1">
                {patient.insurance?.provider || "Self Pay"}
              </p>
              <p className="font-mono text-slate-500 mt-1">
                Policy: {patient.insurance?.policyNumber || "N/A"}
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <p className="text-slate-400 font-medium">Third Party Administrator (TPA)</p>
              <p className="text-base font-bold text-blue-600 mt-1">
                {patient.insurance?.tpaName || "Direct Hospital Billing"}
              </p>
              <p className="text-slate-500 mt-1">
                Pre-Auth Desk Status: <span className="font-semibold text-emerald-600">Approved</span>
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <p className="text-slate-400 font-medium">Sum Insured Limit</p>
              <p className="text-base font-bold text-emerald-600 mt-1 font-mono">
                {formatCurrency(patient.insurance?.sumInsured || 0)}
              </p>
              <p className="text-slate-500 mt-1">
                Valid till: {patient.insurance?.validTill || "2027-12-31"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 7: Medical Documents / Files */}
      {activeTab === "files" && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Diagnostic Reports & PACS Imaging Archive
              </h3>
              <p className="text-xs text-slate-500">
                Certified lab results, DICOM imaging links, ultrasound studies, and consent records.
              </p>
            </div>
            <Link
              href="/lab-results"
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white"
            >
              Central Laboratory
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileCheck className="w-8 h-8 text-blue-600 shrink-0" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-slate-100">
                    Latest Diagnostic Investigation Summary.pdf
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Central Clinical Pathology • Signed by Chief Pathologist
                  </p>
                </div>
              </div>
              <button
                onClick={() => toast.success("Diagnostic report download initiated")}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Download className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              </button>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className="w-8 h-8 text-purple-600 shrink-0" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-slate-100">
                    PACS Radiology Imaging Scan & DICOM.dcm
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    High-Res Multi-slice Imaging Archive • Modality: Digital
                  </p>
                </div>
              </div>
              <button
                onClick={() => toast.success("Opening PACS DICOM Viewer...")}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <FolderOpen className="w-4 h-4 text-purple-600" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 8: Progress Notes */}
      {activeTab === "notes" && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Doctor Clinical Progress Notes & ICD-10 Coding
              </h3>
              <p className="text-xs text-slate-500">
                Formal clinical assessment, differential diagnosis, and post-discharge treatment directives.
              </p>
            </div>
            <button
              onClick={() => toast.success("Doctor clinical note drafted successfully")}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white"
            >
              + Add Clinical Note
            </button>
          </div>

          <div className="space-y-4 pt-2">
            {(patient.clinicalNotesList || []).map((note) => (
              <div
                key={note.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3 text-xs"
              >
                <div className="flex items-center justify-between">
                  <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {note.doctorName} ({note.department})
                  </p>
                  <span className="font-mono text-slate-400">{note.date}</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                  <p className="text-slate-500 font-semibold mb-1">
                    ICD-10 Working Diagnosis ({note.icd10}):
                  </p>
                  <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                    {note.diagnosis}
                  </p>
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-slate-500 font-semibold mb-1">Treatment Directive & Plan:</p>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {note.treatmentPlan}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Visit Modal */}
      {showAddVisitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
              Create New OPD Encounter
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Patient: {patient.fullName} ({patient.uhid})
            </p>

            <form onSubmit={handleCreateVisit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Attending Consultant
                </label>
                <select
                  aria-label="Attending Consultant"
                  value={newVisitDoctor}
                  onChange={(e) => setNewVisitDoctor(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  <option>Dr. Arvind Subramaniam (Cardiology)</option>
                  <option>Dr. Radhika Kulkarni (Neurology)</option>
                  <option>Dr. Sandeep Chawla (Orthopaedics)</option>
                  <option>Dr. Meenakshi Sundaram (OBG)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Chief Complaint / Reason for Visit
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Mild palpitations and shortness of breath since 2 days..."
                  value={newVisitReason}
                  onChange={(e) => setNewVisitReason(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddVisitModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
                >
                  Generate Token & Check-In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

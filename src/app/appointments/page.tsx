"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Appointment } from "@/types";
import { mockAppointments, mockDoctors, mockPatients } from "@/data/mockData";
import {
  Calendar,
  Clock,
  User,
  Plus,
  Video,
  CheckCircle,
  XCircle,
  UserCheck,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";

export default function AppointmentsListPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Appointment Form State
  const [selectedPatientId, setSelectedPatientId] = useState(mockPatients[0].id);
  const [selectedDoctorId, setSelectedDoctorId] = useState(mockDoctors[0].id);
  const [date, setDate] = useState("2026-11-18");
  const [timeSlot, setTimeSlot] = useState("10:00 AM - 10:20 AM");
  const [visitType, setVisitType] = useState<any>("New Visit");
  const [reason, setReason] = useState("");
  const [addressStreet, setAddressStreet] = useState(mockPatients[0].address?.street || "");
  const [addressCity, setAddressCity] = useState(mockPatients[0].address?.city || "");
  const [addressState, setAddressState] = useState(mockPatients[0].address?.state || "");
  const [addressPincode, setAddressPincode] = useState(mockPatients[0].address?.pincode || "");

  const handlePatientSelect = (patientId: string) => {
    setSelectedPatientId(patientId);
    const pat = mockPatients.find((p) => p.id === patientId);
    if (pat?.address) {
      setAddressStreet(pat.address.street || "");
      setAddressCity(pat.address.city || "");
      setAddressState(pat.address.state || "");
      setAddressPincode(pat.address.pincode || "");
    }
  };

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const patient = mockPatients.find((p) => p.id === selectedPatientId) || mockPatients[0];
    const doctor = mockDoctors.find((d) => d.id === selectedDoctorId) || mockDoctors[0];

    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      tokenNumber: `TK-${Math.floor(100 + Math.random() * 900)}`,
      patientId: patient.id,
      uhid: patient.uhid,
      patientName: patient.fullName,
      patientMobile: patient.mobile,
      patientAddress: {
        street: addressStreet || patient.address?.street || "",
        city: addressCity || patient.address?.city || "",
        state: addressState || patient.address?.state || "",
        pincode: addressPincode || patient.address?.pincode || "",
      },
      doctorId: doctor.id,
      doctorName: doctor.name,
      department: doctor.department,
      appointmentDate: date,
      timeSlot,
      visitType,
      reason: reason || "Routine Consultation",
      status: "Confirmed",
      priority: "Normal",
    };

    setAppointments([newApt, ...appointments]);
    setShowAddModal(false);
    toast.success(`Appointment confirmed for ${patient.fullName} (${addressCity || "Local"}) with ${doctor.name}`);
  };

  const handleUpdateStatus = (id: string, newStatus: Appointment["status"]) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    toast.success(`Appointment updated to ${newStatus}`);
  };

  const columns: Column<Appointment>[] = [
    {
      header: "Token",
      accessorKey: "tokenNumber",
      cell: (a) => (
        <span className="font-mono font-bold text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-blue-600 dark:text-blue-400">
          {a.tokenNumber}
        </span>
      ),
    },
    {
      header: "Patient",
      accessorKey: "patientName",
      sortable: true,
      cell: (a) => {
        const pat = mockPatients.find((p) => p.uhid === a.uhid);
        return (
          <div className="flex items-center gap-2.5">
            <img
              src={pat?.photoUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"}
              alt={a.patientName}
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[var(--primary)]/20 shrink-0"
            />
            <div>
              <p className="font-bold text-[var(--foreground)]">{a.patientName}</p>
              <p className="text-[11px] font-mono text-[var(--muted-foreground)]">{a.uhid}</p>
            </div>
          </div>
        );
      },
    },
    {
      header: "Patient Location",
      accessorKey: "patientAddress",
      cell: (a) => {
        const addr = typeof a.patientAddress === "object" ? a.patientAddress : undefined;
        return (
          <div className="text-xs">
            <p className="font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-blue-500 shrink-0" />
              {addr?.city ? `${addr.city}, ${addr.state}` : typeof a.patientAddress === "string" ? a.patientAddress : "Mumbai, Maharashtra"}
            </p>
            <p className="text-[11px] text-slate-400 truncate max-w-[150px]">
              {addr?.street || (addr?.pincode ? `PIN: ${addr.pincode}` : "In-city")}
            </p>
          </div>
        );
      },
    },
    {
      header: "Doctor / Speciality",
      accessorKey: "doctorName",
      sortable: true,
      cell: (a) => {
        const doc = mockDoctors.find((d) => d.name === a.doctorName);
        return (
          <div className="flex items-center gap-2.5">
            <img
              src={doc?.photoUrl || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"}
              alt={a.doctorName}
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[var(--primary)]/20 shrink-0"
            />
            <div>
              <p className="font-semibold text-[var(--foreground)]">{a.doctorName}</p>
              <p className="text-[11px] text-[var(--muted-foreground)]">{a.department}</p>
            </div>
          </div>
        );
      },
    },
    {
      header: "Date & Time",
      accessorKey: "appointmentDate",
      sortable: true,
      cell: (a) => (
        <div>
          <p className="font-medium text-slate-800 dark:text-slate-200">{a.appointmentDate}</p>
          <p className="text-[11px] text-slate-500">{a.timeSlot}</p>
        </div>
      ),
    },
    {
      header: "Type",
      accessorKey: "visitType",
      cell: (a) => (
        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
          {a.visitType}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (a) => <StatusBadge status={a.status} />,
    },
    {
      header: "Actions",
      cell: (a) => (
        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          {a.status === "Confirmed" && (
            <button
              onClick={() => handleUpdateStatus(a.id, "Checked In")}
              className="px-2 py-1 text-xs font-semibold rounded bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 hover:bg-blue-100"
            >
              Check-In
            </button>
          )}
          {a.status === "Checked In" && (
            <button
              onClick={() => handleUpdateStatus(a.id, "In Consultation")}
              className="px-2 py-1 text-xs font-semibold rounded bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 hover:bg-amber-100"
            >
              Call In
            </button>
          )}
          {a.status === "In Consultation" && (
            <button
              onClick={() => handleUpdateStatus(a.id, "Completed")}
              className="px-2 py-1 text-xs font-semibold rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 hover:bg-emerald-100"
            >
              Complete
            </button>
          )}
          {a.status !== "Cancelled" && a.status !== "Completed" && (
            <button
              onClick={() => handleUpdateStatus(a.id, "Cancelled")}
              className="p-1 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950"
              title="Cancel appointment"
            >
              <XCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Front Desk", href: "/patients" },
          { label: "Appointments" },
        ]}
        title="Appointment Scheduling & Rosters"
        description="Doctor slot allocation, queue check-ins, unconfirmed reservations, and OPD visits."
      >
        <Link
          href="/appointments/calendar"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors"
        >
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
          <span>Calendar Grid</span>
        </Link>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Book Appointment</span>
        </button>
      </PageHeader>

      <DataTable
        data={appointments}
        columns={columns}
        searchPlaceholder="Search by token, patient name, doctor, or department..."
        searchFields={["patientName", "uhid", "doctorName", "department", "tokenNumber"]}
        filters={[
          {
            key: "department",
            label: "Department",
            options: [
              { label: "Cardiology", value: "Cardiology" },
              { label: "Neurology", value: "Neurology" },
              { label: "Orthopaedics", value: "Orthopaedics" },
              { label: "Pediatrics", value: "Pediatrics" },
              { label: "Obstetrics & Gynaecology", value: "Obstetrics & Gynaecology" },
            ],
          },
          {
            key: "status",
            label: "Status",
            options: [
              { label: "Confirmed", value: "Confirmed" },
              { label: "Checked In", value: "Checked In" },
              { label: "In Consultation", value: "In Consultation" },
              { label: "Completed", value: "Completed" },
              { label: "Cancelled", value: "Cancelled" },
            ],
          },
        ]}
        exportFileName="nuvertos_appointments"
      />

      {/* Book New Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4">
          <div className="w-full max-w-lg max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
              Book New Patient Appointment
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Allocate token, select consulting specialist and OPD time slot.
            </p>

            <form onSubmit={handleCreateAppointment} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Select Patient
                </label>
                <select
                  aria-label="Select Patient"
                  value={selectedPatientId}
                  onChange={(e) => handlePatientSelect(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  {mockPatients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.fullName} ({p.uhid}) - {p.mobile}
                    </option>
                  ))}
                </select>
              </div>

              {/* Patient Residential Address Fields */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2.5">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  Patient Address & Residential Location
                </div>
                <div>
                  <label className="block text-[11px] font-medium mb-1 text-slate-600 dark:text-slate-400">
                    Street / Residential Address
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Flat 402, Sea Green Apts, Prabhadevi"
                    value={addressStreet}
                    onChange={(e) => setAddressStreet(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium mb-1 text-slate-600 dark:text-slate-400">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mumbai"
                      value={addressCity}
                      onChange={(e) => setAddressCity(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium mb-1 text-slate-600 dark:text-slate-400">
                      State
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maharashtra"
                      value={addressState}
                      onChange={(e) => setAddressState(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium mb-1 text-slate-600 dark:text-slate-400">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 400025"
                      value={addressPincode}
                      onChange={(e) => setAddressPincode(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Consulting Doctor & Speciality
                </label>
                <select
                  aria-label="Consulting Doctor"
                  value={selectedDoctorId}
                  onChange={(e) => setSelectedDoctorId(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  {mockDoctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.department} - {d.opdRoom})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                    Time Slot
                  </label>
                  <select
                    aria-label="Time Slot"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  >
                    <option>09:30 AM - 09:50 AM</option>
                    <option>10:00 AM - 10:20 AM</option>
                    <option>10:30 AM - 10:50 AM</option>
                    <option>11:00 AM - 11:20 AM</option>
                    <option>11:30 AM - 11:50 AM</option>
                    <option>02:00 PM - 02:20 PM</option>
                    <option>03:00 PM - 03:20 PM</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                    Visit Type
                  </label>
                  <select
                    aria-label="Visit Type"
                    value={visitType}
                    onChange={(e) => setVisitType(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  >
                    <option>New Visit</option>
                    <option>Follow-up</option>
                    <option>Emergency</option>
                    <option>Virtual Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                    Chief Complaint / Notes
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Follow-up post ECHO"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
                >
                  Generate Token & Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

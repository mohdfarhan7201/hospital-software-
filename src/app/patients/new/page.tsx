"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { generateUHID } from "@/lib/utils";
import {
  User,
  Phone,
  MapPin,
  Heart,
  Shield,
  FileText,
  Upload,
  CheckCircle,
  Save,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { mockPatients } from "@/data/mockData";
import { Patient } from "@/types";

export default function NewPatientRegistrationPage() {
  const router = useRouter();
  const [uhid] = useState(generateUHID());

  // Form states
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"Male" | "Female" | "Other">("Male");
  const [bloodGroup, setBloodGroup] = useState<any>("O+");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("Mumbai");
  const [state, setState] = useState("Maharashtra");
  const [pincode, setPincode] = useState("400050");
  const [guardianName, setGuardianName] = useState("");
  const [guardianRel, setGuardianRel] = useState("Spouse");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [allergies, setAllergies] = useState("Penicillin");
  const [chronicConditions, setChronicConditions] = useState("Hypertension");
  const [insuranceProvider, setInsuranceProvider] = useState("Star Health & Allied Insurance");
  const [policyNumber, setPolicyNumber] = useState("SH-MUM-9912");
  const [tpaName, setTpaName] = useState("MediAssist TPA");
  const [sumInsured, setSumInsured] = useState("1000000");
  const [abhaId, setAbhaId] = useState("91-4421-8890-0012");
  const [idFileName, setIdFileName] = useState("aadhaar_card_scan.pdf");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !mobile.trim() || !age) {
      toast.error("Please fill in all mandatory patient identity fields.");
      return;
    }

    setSubmitting(true);

    const newPatient: Patient = {
      id: `pat-${Date.now()}`,
      uhid,
      fullName,
      age: parseInt(age) || 30,
      gender,
      mobile: mobile.startsWith("+91") ? mobile : `+91 ${mobile}`,
      email,
      bloodGroup,
      registrationDate: new Date().toISOString().split("T")[0],
      lastVisitDate: new Date().toISOString().split("T")[0],
      status: "Active",
      address: {
        street,
        city,
        state,
        pincode,
      },
      guardian: {
        name: guardianName,
        relationship: guardianRel,
        mobile: guardianPhone,
      },
      medicalSummary: {
        allergies: allergies.split(",").map((s) => s.trim()).filter(Boolean),
        chronicConditions: chronicConditions.split(",").map((s) => s.trim()).filter(Boolean),
      },
      insurance: {
        provider: insuranceProvider,
        policyNumber,
        tpaName,
        sumInsured: parseInt(sumInsured) || 500000,
        validTill: "2027-12-31",
      },
      abhaId,
    };

    mockPatients.unshift(newPatient);

    setTimeout(() => {
      setSubmitting(false);
      toast.success(`Patient registered successfully! Assigned UHID: ${uhid}`);
      router.push(`/patients/${uhid}`);
    }, 500);
  };

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Patients", href: "/patients" },
          { label: "New Patient Registration" },
        ]}
        title="Comprehensive Patient Registration"
        description="Register a new hospital patient, generate instant UHID, record clinical history, insurance, and ABHA ID."
      >
        <Link
          href="/patients"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Directory
        </Link>
      </PageHeader>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* UHID Banner Card */}
        <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/60 dark:bg-blue-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                Auto-Generated Unique Hospital Identification (UHID)
              </p>
              <p className="text-xl font-mono font-bold text-blue-900 dark:text-blue-100">
                {uhid}
              </p>
            </div>
          </div>
          <span className="text-xs text-slate-500 bg-white dark:bg-slate-900 px-3 py-1 rounded-md border border-slate-200 dark:border-slate-800 self-start sm:self-center font-medium">
            Status: New Uncommitted File
          </span>
        </div>

        {/* Section 1: Personal Information */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <User className="w-4 h-4 text-blue-600" />
            1. Personal & Demographic Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name (First Middle Last) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh V. Kulkarni"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Age (Years) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                required
                placeholder="45"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Gender <span className="text-rose-500">*</span>
              </label>
              <select
                aria-label="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Blood Group <span className="text-rose-500">*</span>
              </label>
              <select
                aria-label="Blood Group"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Marital Status
              </label>
              <select
                aria-label="Marital Status"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option>Married</option>
                <option>Single</option>
                <option>Widowed</option>
                <option>Divorced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Contact & Residential Address */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Phone className="w-4 h-4 text-emerald-600" />
            2. Contact & Residential Address
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Mobile Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="98201 12345"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="patient@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Street Address / House No.
              </label>
              <input
                type="text"
                placeholder="Flat 304, Green Heights, SV Road"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                State
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Pincode
              </label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Guardian Details */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <User className="w-4 h-4 text-purple-600" />
            3. Guardian / Next of Kin Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Guardian / Spouse Name
              </label>
              <input
                type="text"
                placeholder="e.g. Meera Kulkarni"
                value={guardianName}
                onChange={(e) => setGuardianName(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Relationship
              </label>
              <select
                aria-label="Relationship"
                value={guardianRel}
                onChange={(e) => setGuardianRel(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              >
                <option>Spouse</option>
                <option>Father</option>
                <option>Mother</option>
                <option>Son</option>
                <option>Daughter</option>
                <option>Sibling</option>
                <option>Legal Guardian</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Guardian Emergency Contact
              </label>
              <input
                type="tel"
                placeholder="98201 55667"
                value={guardianPhone}
                onChange={(e) => setGuardianPhone(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Clinical History & Insurance & ABHA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Medical Profile */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Heart className="w-4 h-4 text-rose-600" />
              4. Clinical Alerts & Known Allergies
            </h2>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Drug Allergies (Comma separated)
              </label>
              <input
                type="text"
                placeholder="e.g. Penicillin, Sulfa, Aspirin"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Chronic Medical Conditions
              </label>
              <input
                type="text"
                placeholder="e.g. Type 2 Diabetes, Hypertension, CAD"
                value={chronicConditions}
                onChange={(e) => setChronicConditions(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          {/* Insurance & ABHA */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Shield className="w-4 h-4 text-blue-600" />
              5. TPA Insurance & ABHA ID
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Insurance Provider
                </label>
                <input
                  type="text"
                  value={insuranceProvider}
                  onChange={(e) => setInsuranceProvider(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Policy Number
                </label>
                <input
                  type="text"
                  value={policyNumber}
                  onChange={(e) => setPolicyNumber(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ABHA (Ayushman Bharat Health Account) ID
                </label>
                <input
                  type="text"
                  value={abhaId}
                  onChange={(e) => setAbhaId(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit & Cancel Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <Link
            href="/patients"
            className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {submitting ? "Registering Patient..." : "Complete Registration & Open 360"}
          </button>
        </div>
      </form>
    </DashboardShell>
  );
}

"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { toast } from "sonner";
import { Building2, Save, Upload, MapPin, Phone, Mail, Globe, Award, ShieldCheck } from "lucide-react";

export default function HospitalSettingsPage() {
  const [profile, setProfile] = useState({
    name: "NuvertOS Memorial Hospital & Research Centre",
    tagline: "Advanced Multispecialty Tertiary Healthcare Institute",
    registrationNo: "DEL-HOSP-2024-9042",
    rohiniCode: "890042",
    pan: "AAACN4820P",
    gstin: "07AAACN4820P1Z4",
    phone: "+91 11 4820 0000",
    emergencyPhone: "+91 11 4820 9999 (Toll-Free 1066)",
    email: "contact@nuvertos-memorial.org",
    billingEmail: "billing@nuvertos-memorial.org",
    website: "https://www.nuvertos.org",
    addressLine1: "Plot No. 12, Institutional Area, Sector 62",
    city: "New Delhi",
    state: "Delhi NCR",
    pincode: "110075",
    nabhStatus: "Fully Accredited (5th Edition)",
    nabhExpiry: "2028-11-30",
    bedCapacity: 250,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Hospital profile and regulatory credentials saved successfully");
  };

  return (
    <DashboardShell>
      <PageHeader
        title="Hospital Enterprise Profile"
        description="Master healthcare entity identifiers, statutory licenses (ROHINI, GSTIN, PAN), NABH accreditation, and letterhead contact details"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings/hospital" },
          { label: "Hospital Profile" },
        ]}
      />

      <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
        {/* Identity & Legal Info */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--foreground)]">Healthcare Entity Identity</h3>
              <p className="text-xs text-[var(--muted-foreground)]">Displayed on patient discharge summaries, bills, OPD prescriptions and lab reports</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Official Hospital Name *</label>
                <input
                  type="text"
                  required
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] font-medium text-sm focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Tagline / Mission Subtitle</label>
                <input
                  type="text"
                  value={profile.tagline}
                  onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold mb-1">Clinical Est. Registration No *</label>
                <input
                  type="text"
                  value={profile.registrationNo}
                  onChange={(e) => setProfile({ ...profile, registrationNo: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] font-mono focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Insurance ROHINI ID *</label>
                <input
                  type="text"
                  value={profile.rohiniCode}
                  onChange={(e) => setProfile({ ...profile, rohiniCode: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] font-mono focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">GSTIN Number *</label>
                <input
                  type="text"
                  value={profile.gstin}
                  onChange={(e) => setProfile({ ...profile, gstin: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] font-mono focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Location & Contact */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--foreground)]">Address & Communications</h3>
              <p className="text-xs text-[var(--muted-foreground)]">Dispatch address for mediclaim TPAs, statutory tax audits, and patient helpdesk</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold mb-1">Street Address Line</label>
              <input
                type="text"
                value={profile.addressLine1}
                onChange={(e) => setProfile({ ...profile, addressLine1: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold mb-1">City</label>
                <input
                  type="text"
                  value={profile.city}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">State / Region</label>
                <input
                  type="text"
                  value={profile.state}
                  onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">PIN Code</label>
                <input
                  type="text"
                  value={profile.pincode}
                  onChange={(e) => setProfile({ ...profile, pincode: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] font-mono focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold mb-1">General Reception Phone</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] font-mono focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">24x7 Emergency Line</label>
                <input
                  type="text"
                  value={profile.emergencyPhone}
                  onChange={(e) => setProfile({ ...profile, emergencyPhone: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] font-mono text-rose-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Official Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Accreditation & Capacity */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-600">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--foreground)]">NABH Accreditation & Capacity</h3>
              <p className="text-xs text-[var(--muted-foreground)]">Quality board certifications and sanctioned in-patient bed counts</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold mb-1">NABH Certification Level</label>
              <input
                type="text"
                value={profile.nabhStatus}
                onChange={(e) => setProfile({ ...profile, nabhStatus: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">NABH Valid Upto</label>
              <input
                type="date"
                value={profile.nabhExpiry}
                onChange={(e) => setProfile({ ...profile, nabhExpiry: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Sanctioned Bed Capacity</label>
              <input
                type="number"
                value={profile.bedCapacity}
                onChange={(e) => setProfile({ ...profile, bedCapacity: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] font-mono focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-[var(--primary)] text-white hover:opacity-90 font-semibold text-xs flex items-center gap-2 shadow-sm transition-opacity"
          >
            <Save className="w-4 h-4" /> Save Profile Changes
          </button>
        </div>
      </form>
    </DashboardShell>
  );
}

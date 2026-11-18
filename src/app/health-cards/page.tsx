"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { CreditCard, ShieldCheck, Heart, Award, Check, Plus } from "lucide-react";
import { toast } from "sonner";

export default function HealthCardsPage() {
  const [showIssueModal, setShowIssueModal] = useState(false);

  const tiers = [
    {
      name: "Silver Wellness Card",
      badge: "Standard",
      price: "₹1,999 / year",
      color: "from-slate-700 to-slate-900",
      benefits: [
        "10% concession on Outpatient Consultations",
        "15% concession on Diagnostic Lab Investigations",
        "1 Free Executive Health Screening annually",
        "Direct priority front-desk token queue",
      ],
      activeMembers: 1240,
    },
    {
      name: "Gold Family Health Shield",
      badge: "Most Popular",
      price: "₹4,999 / year",
      color: "from-amber-600 to-amber-900",
      benefits: [
        "Covers primary holder + spouse + 2 children",
        "20% concession on All Diagnostics & Imaging (CT/MRI)",
        "10% discount on Inpatient Bed Charges",
        "Free 24x7 Ambulance transfer within city limits",
      ],
      activeMembers: 3410,
    },
    {
      name: "Platinum Elite Care Card",
      badge: "Comprehensive",
      price: "₹9,999 / year",
      color: "from-blue-700 to-indigo-950",
      benefits: [
        "Comprehensive VIP Concierge admission priority",
        "Unlimited Telemedicine video consultations",
        "25% concession on investigations & radiology",
        "Complimentary Annual Master Cardiac Checkup",
        "Priority OT & ICU bed reservation guarantee",
      ],
      activeMembers: 890,
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Front Desk", href: "/patients" },
          { label: "Health Cards" },
        ]}
        title="Hospital Health Membership Cards & Loyalty Plans"
        description="Issue health cards, manage member benefits, family health shields, and corporate memberships."
      >
        <button
          onClick={() => setShowIssueModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> Issue New Health Card
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs flex flex-col justify-between"
          >
            <div>
              {/* Card Face Preview */}
              <div
                className={`p-5 bg-gradient-to-tr ${tier.color} text-white relative overflow-hidden`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-200" />
                    <span className="font-bold text-xs tracking-wider">NuvertOS HEALTH PASS</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-white/20">
                    {tier.badge}
                  </span>
                </div>
                <p className="font-mono text-sm tracking-widest text-slate-300">
                  •••• •••• •••• 9821
                </p>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <div>
                    <p className="text-[10px] text-slate-300">CARD TIER</p>
                    <p className="font-bold">{tier.name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-300">VALID THRU</p>
                    <p className="font-mono">11/2027</p>
                  </div>
                </div>
              </div>

              {/* Pricing & Benefits */}
              <div className="p-5 space-y-4">
                <div className="flex items-baseline justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    {tier.price}
                  </span>
                  <span className="text-xs text-slate-500">
                    {tier.activeMembers} Members Active
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  {tier.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => {
                  toast.success(`Health card membership plan selected: ${tier.name}`);
                  setShowIssueModal(true);
                }}
                className="w-full py-2.5 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 text-xs font-semibold transition-colors"
              >
                Enroll Patient to {tier.badge}
              </button>
            </div>
          </div>
        ))}
      </div>

      {showIssueModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
            <h3 className="font-bold text-base mb-1">Issue Hospital Membership Card</h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter patient UHID to link and generate card instantly.
            </p>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Patient UHID</label>
                <input
                  type="text"
                  placeholder="NU-2026-401928"
                  defaultValue="NU-2026-401928"
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Card Tier</label>
                <select aria-label="Card Tier" className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                  <option>Gold Family Health Shield (₹4,999/yr)</option>
                  <option>Silver Wellness Card (₹1,999/yr)</option>
                  <option>Platinum Elite Care Card (₹9,999/yr)</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowIssueModal(false)}
                  className="px-4 py-2 rounded-lg border font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowIssueModal(false);
                    toast.success("Health Card successfully issued & RFID token assigned.");
                  }}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold"
                >
                  Generate Digital Card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

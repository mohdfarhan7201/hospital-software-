"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { Star, MessageSquare, ThumbsUp, Heart, TrendingUp, Award } from "lucide-react";
import { toast } from "sonner";

export default function PatientFeedbackPage() {
  const reviews = [
    {
      patient: "Rajesh V. Sharma",
      uhid: "NU-2026-401928",
      department: "Cardiology",
      doctor: "Dr. Arvind Subramaniam",
      rating: 5,
      date: "16 Nov 2026",
      comment:
        "Exceptional care by Dr. Arvind and the CCU nursing staff. OPD flow was remarkably quick with zero waiting room hassle.",
      nps: 10,
    },
    {
      patient: "Ananya S. Sen",
      uhid: "NU-2026-512093",
      department: "Obstetrics & Gynaecology",
      doctor: "Dr. Meenakshi Sundaram",
      rating: 5,
      date: "14 Nov 2026",
      comment:
        "Private suite facilities and the dietary support were five-star. Clear explanation of pregnancy ultrasound by Dr. Meenakshi.",
      nps: 10,
    },
    {
      patient: "Vikramaditya Patel",
      uhid: "NU-2026-621874",
      department: "Orthopaedics",
      doctor: "Dr. Sandeep Chawla",
      rating: 4,
      date: "12 Nov 2026",
      comment:
        "Very good joint replacement consultation. X-ray report was available in 15 mins on patient portal.",
      nps: 9,
    },
  ];

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Front Desk", href: "/patients" },
          { label: "Patient Feedback & NPS" },
        ]}
        title="Patient Experience & Net Promoter Score (NPS)"
        description="Patient satisfaction scoring, departmental care reviews, and clinical feedback analytics."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase">Net Promoter Score (NPS)</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">+84</p>
            <span className="text-[11px] text-slate-400">Industry benchmark: +62</span>
          </div>
          <Award className="w-10 h-10 text-emerald-500 opacity-20" />
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase">Average Rating</p>
            <p className="text-2xl font-bold text-amber-500 mt-1">4.8 / 5.0</p>
            <span className="text-[11px] text-slate-400">Based on 1,420 reviews</span>
          </div>
          <Star className="w-10 h-10 text-amber-400 opacity-20" />
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase">Doctor Communication</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">98.2%</p>
            <span className="text-[11px] text-slate-400">Positive sentiment</span>
          </div>
          <Heart className="w-10 h-10 text-blue-500 opacity-20" />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-blue-600" />
          Recent Verified Clinical Encounters Feedback
        </h2>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {reviews.map((r, i) => (
            <div key={i} className="py-4 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{r.patient}</span>
                  <span className="text-slate-400 ml-1.5 font-mono">({r.uhid})</span>
                  <span className="text-slate-400 mx-2">•</span>
                  <span className="text-slate-500">
                    {r.department} ({r.doctor})
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <Star
                      key={starIdx}
                      className={`w-3.5 h-3.5 ${
                        starIdx < r.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-slate-200 dark:text-slate-700"
                      }`}
                    />
                  ))}
                  <span className="text-slate-400 ml-2">{r.date}</span>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 italic bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                "{r.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}

"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { Printer, Scan, ZoomIn, ZoomOut, RotateCw, Contrast, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function RadiologyReportViewPage() {
  const [zoom, setZoom] = useState(100);

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Radiology", href: "/radiology/requests" },
          { label: "Imaging Report & PACS" },
        ]}
        title="Diagnostic Radiology Report & DICOM PACS Viewer"
        description="High-resolution web DICOM image viewer, radiologist structured findings, and digital diagnostic sign-off."
      >
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white"
        >
          <Printer className="w-3.5 h-3.5" /> Print Radiology Report
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: DICOM PACS Simulation Viewer */}
        <div className="lg:col-span-6 bg-slate-950 rounded-2xl border border-slate-800 p-4 text-white flex flex-col justify-between shadow-2xl min-h-[450px]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
            <span className="font-mono text-emerald-400 font-bold">DICOM WEB PACS • SERIES 02 / 14</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoom((z) => Math.min(150, z + 10))}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoom((z) => Math.max(70, z - 10))}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => toast.info("Windowing WW/WL leveled for bone contrast.")}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700"
                title="Contrast Level"
              >
                <Contrast className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Real High-Resolution DICOM PACS Image Display */}
          <div className="relative my-auto py-4 flex flex-col items-center justify-center overflow-hidden">
            <div
              className="relative w-full max-w-sm aspect-square rounded-xl bg-black border border-zinc-800 overflow-hidden shadow-2xl flex items-center justify-center transition-transform duration-200"
              style={{ transform: `scale(${zoom / 100})` }}
            >
              <img
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80"
                alt="Radiology DICOM Scan"
                className="w-full h-full object-cover filter contrast-125 brightness-95"
              />
              <div className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400">
                L: AP VIEW
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-0.5 rounded text-[10px] font-mono text-zinc-300">
                W: 2400 / C: 800
              </div>
            </div>

            {/* Series Multi-slice Thumbnail strip */}
            <div className="flex items-center gap-2 mt-4 px-2 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800">
              <span className="text-[10px] text-zinc-400 font-mono">SERIES:</span>
              <button className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white">AP View</button>
              <button className="px-2 py-0.5 rounded text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300">Lateral</button>
              <button className="px-2 py-0.5 rounded text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300">Bone 3D</button>
              <button className="px-2 py-0.5 rounded text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300">Coronal</button>
            </div>

            <p className="font-mono text-xs text-zinc-300 mt-2">
              Vikramaditya Patel • UHID: NU-2026-621874
            </p>
            <p className="text-[11px] text-zinc-400">
              Modality: Digital Radiography • High-Resolution Diagnostic PACS
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-zinc-800 text-[10px] text-zinc-400 font-mono">
            <span>KV: 65 • mAs: 12.5 • Slice: 1.0mm</span>
            <span>Zoom: {zoom}%</span>
          </div>
        </div>

        {/* Right: Structured Clinical Radiology Report */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs text-xs space-y-4">
          <div className="border-b pb-3 border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <div>
              <h2 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                Department of Radiology & Imaging
              </h2>
              <p className="text-slate-400 text-[11px]">Report ID: RAD-2026-901</p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              Report Finalized
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <p className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px]">
                CLINICAL INDICATION
              </p>
              <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                68-year-old male with chronic severe bilateral knee pain with restricted joint mobility.
                Evaluation for total knee replacement surgery.
              </p>
            </div>

            <div>
              <p className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px]">
                TECHNIQUE & PROJECTIONS
              </p>
              <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                Digital Radiography of both knee joints in weight-bearing anteroposterior (AP) and lateral views.
              </p>
            </div>

            <div>
              <p className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px]">
                FINDINGS / OBSERVATIONS
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1 mt-0.5">
                <li>Marked narrowing of medial joint compartments bilaterally (Right &gt; Left).</li>
                <li>Prominent subchondral sclerosis and osteophyte formation along tibiofemoral margins.</li>
                <li>Tibial spine sharpening and small subchondral cyst in medial tibial plateau.</li>
                <li>Patellofemoral joint space moderately preserved. No bony erosion or joint effusion.</li>
              </ul>
            </div>

            <div className="p-3 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/40">
              <p className="font-bold text-blue-900 dark:text-blue-200 text-xs">IMPRESSION:</p>
              <p className="text-blue-800 dark:text-blue-300 mt-0.5 font-medium">
                Severe Bilateral Knee Osteoarthritis (Kellgren-Lawrence Grade IV on Right, Grade III on Left) with prominent medial compartment collapse.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Radiological Sign-off: 17-Nov-2026</span>
            <div className="text-right">
              <p className="font-bold text-slate-900 dark:text-slate-100">Dr. Anand M. Joshi</p>
              <p className="text-[10px] text-slate-500">MD Radiodiagnosis, DMRD • Consultant Radiologist</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

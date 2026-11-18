"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { mockPatients, mockDoctors } from "@/data/mockData";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  MessageSquare,
  FileText,
  User,
  Heart,
  Share2,
  Send,
  Pill,
} from "lucide-react";
import { toast } from "sonner";

export default function VirtualClinicPage() {
  const patient = mockPatients[1]; // Ananya Sen
  const doctor = mockDoctors[3]; // Dr. Meenakshi Sundaram

  const [inCall, setInCall] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [chatMessage, setChatMessage] = useState("");
  const [chatList, setChatList] = useState([
    { sender: "Doctor", time: "10:02 AM", text: "Good morning Ananya, how are your BP readings today?" },
    { sender: "Patient", time: "10:03 AM", text: "Hello Doctor, morning reading was 128/82 mmHg. Feeling much better." },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatList([...chatList, { sender: "Doctor", time: "10:05 AM", text: chatMessage }]);
    setChatMessage("");
  };

  const handleEndCall = () => {
    setInCall(false);
    toast.info("Telemedicine consultation ended. Summary saved to EMR.");
  };

  return (
    <DashboardShell>
      <PageHeader
        breadcrumbs={[
          { label: "NuvertOS", href: "/dashboard" },
          { label: "Appointments", href: "/appointments" },
          { label: "Virtual Clinic (Telemedicine)" },
        ]}
        title="Telemedicine & Virtual Clinic Console"
        description="Encrypted WebRTC high-definition virtual consultation session with integrated EHR and e-prescribing."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Video Call Area */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative aspect-video rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center text-white">
            {inCall ? (
              <>
                {videoOn ? (
                  <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80"
                      alt={patient.fullName}
                      className="w-full h-full object-cover filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
                    <div className="absolute bottom-16 left-6 text-white">
                      <p className="text-base font-bold drop-shadow-md">{patient.fullName}</p>
                      <span className="text-xs text-emerald-400 mt-0.5 flex items-center gap-1.5 font-medium">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live Encrypted HD Video (1080p • 08:42 mins)
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-slate-400">
                    <VideoOff className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-xs">Camera Feed Disabled</p>
                  </div>
                )}

                {/* Self View (Doctor Picture-in-Picture) */}
                <div className="absolute top-4 right-4 w-36 sm:w-48 aspect-video rounded-xl bg-black border-2 border-zinc-700 shadow-2xl overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80"
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-black/75 px-2 py-1">
                    <p className="text-[10px] font-bold text-white truncate">{doctor.name}</p>
                    <p className="text-[9px] text-zinc-300 truncate">{doctor.department}</p>
                  </div>
                </div>

                {/* Call Control Toolbar */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-slate-900/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-slate-700 shadow-2xl">
                  <button
                    onClick={() => setMicOn(!micOn)}
                    className={`p-3 rounded-full transition-all ${
                      micOn ? "bg-slate-800 hover:bg-slate-700 text-white" : "bg-rose-600 text-white"
                    }`}
                    title={micOn ? "Mute Microphone" : "Unmute Microphone"}
                  >
                    {micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => setVideoOn(!videoOn)}
                    className={`p-3 rounded-full transition-all ${
                      videoOn ? "bg-slate-800 hover:bg-slate-700 text-white" : "bg-rose-600 text-white"
                    }`}
                    title={videoOn ? "Turn Camera Off" : "Turn Camera On"}
                  >
                    {videoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => toast.info("Screen sharing initiated.")}
                    className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-all"
                    title="Share Screen / Report"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleEndCall}
                    className="p-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-lg transition-all"
                    title="End Consultation"
                  >
                    <PhoneOff className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center p-6 space-y-3">
                <p className="text-sm font-semibold">Consultation Ended</p>
                <button
                  onClick={() => setInCall(true)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                >
                  Reconnect Room
                </button>
              </div>
            )}
          </div>

          {/* Quick Doctor Clinical Notes Bar */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              Live Clinical Consultation Notes
            </h3>
            <textarea
              rows={3}
              placeholder="Record chief complaints, telemedicine findings, and follow-up advice..."
              defaultValue="Patient doing well on Labetalol 100mg. BP within normal range. Fetal movements satisfactory. Advised repeat NST in 1 week."
              className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => toast.success("E-Prescription Rx dispatched to patient mobile")}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white flex items-center gap-1"
              >
                <Pill className="w-3.5 h-3.5" /> Dispatch E-Prescription
              </button>
            </div>
          </div>
        </div>

        {/* Right: Patient EHR & Tele-Chat */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs text-xs space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-600" />
              Patient Profile
            </h3>
            <p className="font-semibold text-sm">{patient.fullName}</p>
            <p className="text-slate-500">
              UHID: {patient.uhid} • {patient.age}Y / {patient.gender}
            </p>
            <p className="text-slate-500">Known Diagnosis: {patient.medicalSummary?.chronicConditions?.[0]}</p>
          </div>

          {/* Real-time Session Chat */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col h-80 justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
                Session Chat
              </h3>
              <div className="space-y-3 overflow-y-auto max-h-52 pr-1">
                {chatList.map((c, i) => (
                  <div
                    key={i}
                    className={`text-xs p-2 rounded-lg ${
                      c.sender === "Doctor"
                        ? "bg-blue-50 dark:bg-blue-950/60 ml-4 border border-blue-100 dark:border-blue-900"
                        : "bg-slate-100 dark:bg-slate-800 mr-4"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                      <span className="font-bold text-slate-700 dark:text-slate-300">{c.sender}</span>
                      <span>{c.time}</span>
                    </div>
                    <p className="text-slate-800 dark:text-slate-200">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <input
                type="text"
                placeholder="Type message to patient..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
              <button
                type="submit"
                className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

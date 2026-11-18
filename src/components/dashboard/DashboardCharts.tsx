"use client";

import React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const patientTrendData = [
  { day: "Mon", opd: 142, ipd: 28, emergency: 16 },
  { day: "Tue", opd: 188, ipd: 34, emergency: 22 },
  { day: "Wed", opd: 165, ipd: 30, emergency: 18 },
  { day: "Thu", opd: 210, ipd: 42, emergency: 25 },
  { day: "Fri", opd: 195, ipd: 38, emergency: 19 },
  { day: "Sat", opd: 170, ipd: 25, emergency: 24 },
  { day: "Sun", opd: 85, ipd: 18, emergency: 30 },
];

const revenueTrendData = [
  { month: "Jun", collections: 42.5, insurance: 31.0 },
  { month: "Jul", collections: 48.0, insurance: 35.5 },
  { month: "Aug", collections: 51.2, insurance: 39.0 },
  { month: "Sep", collections: 56.4, insurance: 43.8 },
  { month: "Oct", collections: 62.0, insurance: 47.5 },
  { month: "Nov", collections: 68.5, insurance: 52.2 },
];

const departmentOccupancy = [
  { name: "Cardiology", value: 34, color: "#2563EB" },
  { name: "Orthopaedics", value: 24, color: "#10B981" },
  { name: "Neurology", value: 18, color: "#F59E0B" },
  { name: "OBG & Maternity", value: 16, color: "#8B5CF6" },
  { name: "Pediatrics", value: 8, color: "#EC4899" },
];

export const PatientFlowChart: React.FC = () => {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={patientTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorOpd" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorIpd" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
          <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
          <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(17, 24, 39, 0.9)",
              borderRadius: "8px",
              border: "none",
              color: "#fff",
              fontSize: "12px",
            }}
          />
          <Area
            type="monotone"
            dataKey="opd"
            stroke="#2563EB"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorOpd)"
            name="OPD Consultations"
          />
          <Area
            type="monotone"
            dataKey="ipd"
            stroke="#10B981"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorIpd)"
            name="IPD Admissions"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const RevenueBarChart: React.FC = () => {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={revenueTrendData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
          <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
          <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${v}L`} />
          <Tooltip
            formatter={(value: any) => [`₹${value} Lakhs`, ""]}
            contentStyle={{
              backgroundColor: "rgba(17, 24, 39, 0.9)",
              borderRadius: "8px",
              border: "none",
              color: "#fff",
              fontSize: "12px",
            }}
          />
          <Bar dataKey="collections" fill="#2563EB" radius={[4, 4, 0, 0]} name="Direct Collections" />
          <Bar dataKey="insurance" fill="#60A5FA" radius={[4, 4, 0, 0]} name="TPA Claims Settled" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const DepartmentPieChart: React.FC = () => {
  return (
    <div className="h-[240px] w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={departmentOccupancy}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={4}
            dataKey="value"
          >
            {departmentOccupancy.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: any) => [`${value}% Beds`, "Occupancy"]}
            contentStyle={{
              backgroundColor: "rgba(17, 24, 39, 0.9)",
              borderRadius: "8px",
              border: "none",
              color: "#fff",
              fontSize: "12px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

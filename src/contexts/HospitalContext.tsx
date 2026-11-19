"use client";

import React, { createContext, useContext, useState } from "react";
import { Branch, Appointment } from "@/types";
import { mockBranches, mockAppointments } from "@/data/mockData";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: "alert" | "info" | "warning" | "success";
  read: boolean;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Critical Lab Value Alert",
    message: "Patient Mohammed Irfan Siddiqui (NU-2026-890234): Marked elevated WBC (19,400 /uL).",
    timestamp: "10 mins ago",
    type: "alert",
    read: false,
  },
  {
    id: "notif-2",
    title: "OT Booking Scheduled",
    message: "OT-02 reserved for Emergency Laparoscopic Appendectomy at 01:30 PM.",
    timestamp: "25 mins ago",
    type: "info",
    read: false,
  },
  {
    id: "notif-3",
    title: "Low Medicine Stock",
    message: "Pantocid 40 IV is below threshold (45 vials remaining). Indent recommended.",
    timestamp: "1 hour ago",
    type: "warning",
    read: false,
  },
  {
    id: "notif-4",
    title: "Pre-Auth Approval Received",
    message: "Star Health approved pre-auth for ₹72,000 for Patient Ananya Sen.",
    timestamp: "2 hours ago",
    type: "success",
    read: true,
  },
];

const initialUnconfirmedList = mockAppointments.filter((a) => a.status === "Unconfirmed");

interface HospitalContextType {
  currentBranch: Branch;
  branches: Branch[];
  setBranch: (branchId: string) => void;
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  unconfirmedAppointments: Appointment[];
  unconfirmedCount: number;
  confirmAppointment: (id: string) => void;
  rejectAppointment: (id: string) => void;
}

const HospitalContext = createContext<HospitalContextType>({
  currentBranch: mockBranches[0],
  branches: mockBranches,
  setBranch: () => {},
  notifications: initialNotifications,
  unreadCount: 3,
  markAsRead: () => {},
  markAllAsRead: () => {},
  unconfirmedAppointments: initialUnconfirmedList,
  unconfirmedCount: initialUnconfirmedList.length,
  confirmAppointment: () => {},
  rejectAppointment: () => {},
});

export const HospitalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentBranch, setCurrentBranch] = useState<Branch>(mockBranches[0]);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [unconfirmedAppointments, setUnconfirmedAppointments] = useState<Appointment[]>(initialUnconfirmedList);

  const setBranch = (branchId: string) => {
    const found = mockBranches.find((b) => b.id === branchId);
    if (found) setCurrentBranch(found);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const confirmAppointment = (id: string) => {
    setUnconfirmedAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const rejectAppointment = (id: string) => {
    setUnconfirmedAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const unconfirmedCount = unconfirmedAppointments.length;

  return (
    <HospitalContext.Provider
      value={{
        currentBranch,
        branches: mockBranches,
        setBranch,
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        unconfirmedAppointments,
        unconfirmedCount,
        confirmAppointment,
        rejectAppointment,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => useContext(HospitalContext);

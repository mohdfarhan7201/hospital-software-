"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Menu,
  Sun,
  Moon,
  Bell,
  Search,
  Building,
  User,
  LogOut,
  ChevronDown,
  Check,
  AlertCircle,
  PanelLeft,
  PanelLeftClose,
  Plus,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useHospital } from "@/contexts/HospitalContext";
import { UserRole } from "@/types";
import { toast } from "sonner";

interface AppHeaderProps {
  onOpenMobileMenu: () => void;
  collapsed?: boolean;
  onToggleSidebar?: () => void;
}

const allRoles: UserRole[] = [
  "Super Admin",
  "Hospital Admin",
  "Doctor",
  "Receptionist",
  "Nurse",
  "Accountant",
  "Pharmacist",
  "Lab Technician",
];

export const AppHeader: React.FC<AppHeaderProps> = ({
  onOpenMobileMenu,
  collapsed,
  onToggleSidebar,
}) => {
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { user, setUserRole, logout } = useAuth();
  const { currentBranch, branches, setBranch, notifications, unreadCount, markAllAsRead } =
    useHospital();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showBranchMenu, setShowBranchMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";
    setTheme(nextTheme);
    if (typeof document !== "undefined") {
      if (nextTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  const handleRoleSwitch = (r: UserRole) => {
    setUserRole(r);
    setShowRoleMenu(false);
    toast.success(`Role switched to ${r}: Workspace & navigation tailored for your privileges.`);
    router.push("/dashboard");
  };

  const handleBranchSwitch = (bId: string) => {
    setBranch(bId);
    setShowBranchMenu(false);
  };

  const quickJumpRoutes = [
    { title: "New Patient Registration", href: "/patients/new", tag: "Front Desk" },
    { title: "Patient 360 - Rajesh Sharma", href: "/patients/NU-2026-401928", tag: "EMR" },
    { title: "New Appointment", href: "/appointments", tag: "Scheduling" },
    { title: "OPD Flowboard", href: "/opd/flowboard", tag: "Clinical" },
    { title: "IPD Bed Roster", href: "/wards/roster", tag: "Wards" },
    { title: "Generate Bill / Invoice", href: "/billing", tag: "Finance" },
    { title: "Operation Theatre Calendar", href: "/operation-theatre/calendar", tag: "Surgical" },
    { title: "Pharmacy Dispense & Sales", href: "/pharmacy/sales", tag: "Pharmacy" },
  ];

  const filteredQuickJumps = quickJumpRoutes.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-[var(--card)]/95 backdrop-blur-md border-b border-[var(--border)] flex items-center justify-between px-4 sm:px-6 transition-colors shadow-xs">
        {/* Left: Mobile Toggle & Branch Selector */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
            title="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop Sidebar Toggle Icon */}
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="hidden md:flex p-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors cursor-pointer"
              title={collapsed ? "Expand sidebar navigation" : "Collapse sidebar navigation"}
            >
              {collapsed ? (
                <PanelLeft className="w-4 h-4 text-[var(--primary)]" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Hospital / Branch Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowBranchMenu(!showBranchMenu)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
            >
              <Building className="w-3.5 h-3.5 text-[var(--primary)]" />
              <span className="hidden sm:inline font-semibold">
                {currentBranch.code}:
              </span>
              <span className="truncate max-w-[140px] md:max-w-[200px]">
                {currentBranch.city}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[var(--muted-foreground)]" />
            </button>

            {showBranchMenu && (
              <div
                className="absolute left-0 mt-2 w-72 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                onMouseLeave={() => setShowBranchMenu(false)}
              >
                <div className="px-3 py-1.5 text-[11px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">
                  Select Hospital Branch
                </div>
                {branches.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => handleBranchSwitch(b.id)}
                    className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[var(--muted)] text-[var(--foreground)]"
                  >
                    <div>
                      <p className="font-semibold">{b.name}</p>
                      <p className="text-[11px] text-[var(--muted-foreground)]">{b.city}</p>
                    </div>
                    {b.id === currentBranch.id && (
                      <Check className="w-4 h-4 text-[var(--primary)]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Global Search Trigger */}
          <button
            onClick={() => setShowSearchModal(true)}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] w-64 justify-between transition-colors"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5" />
              <span>Search patient, doctor, test...</span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[10px] bg-[var(--muted)] text-[var(--muted-foreground)] rounded font-mono border border-[var(--border)]">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Action Icons & Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Register Patient Button */}
          <Link
            href="/patients/new"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[var(--primary)] hover:opacity-90 text-white shadow-xs transition-opacity"
          >
            <Plus className="w-4 h-4" />
            <span>New Patient</span>
          </Link>

          {/* GLOBAL THEME TOGGLE BUTTON (Prominent & Universal) */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)] text-[var(--foreground)] transition-colors shadow-xs font-medium text-xs cursor-pointer"
            title={isDark ? "Switch to Pure Light Mode" : "Switch to Deep Dark Mode"}
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline font-bold">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-slate-800" />
                <span className="hidden sm:inline font-bold">Dark Mode</span>
              </>
            )}
          </button>

          {/* Notifications Popover */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors border border-[var(--border)] bg-[var(--card)]"
              title="Notifications & Alerts"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              )}
            </button>

            {showNotifMenu && (
              <div
                className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95"
                onMouseLeave={() => setShowNotifMenu(false)}
              >
                <div className="px-4 py-2 border-b border-[var(--border)] flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--foreground)]">
                    Hospital Notifications ({unreadCount} new)
                  </span>
                  <button
                    onClick={markAllAsRead}
                    className="text-[11px] text-[var(--primary)] hover:underline"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-[var(--border)]">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 text-xs hover:bg-[var(--muted)] transition-colors ${
                        !n.read ? "bg-[var(--muted)]/50" : ""
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <AlertCircle
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            n.type === "alert"
                              ? "text-rose-500"
                              : n.type === "warning"
                              ? "text-amber-500"
                              : "text-[var(--primary)]"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-[var(--foreground)]">
                            {n.title}
                          </p>
                          <p className="text-[var(--muted-foreground)] text-[11px] mt-0.5">
                            {n.message}
                          </p>
                          <span className="text-[10px] text-[var(--muted-foreground)] mt-1 block">
                            {n.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Demo Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[var(--muted)] transition-colors border border-[var(--border)] bg-[var(--card)]"
            >
              {user.photoUrl ? (
                <img
                  src={user.photoUrl}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-[var(--primary)]/30 shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white font-bold flex items-center justify-center text-xs shadow-xs">
                  {user.avatar || "VS"}
                </div>
              )}
              <div className="hidden md:block text-left text-xs">
                <p className="font-semibold text-[var(--foreground)] leading-tight">
                  {user.name.split(" ")[0]}
                </p>
                <p className="text-[10px] text-[var(--primary)] font-medium leading-tight">
                  {user.role}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[var(--muted-foreground)] hidden sm:block" />
            </button>

            {showRoleMenu && (
              <div
                className="absolute right-0 mt-2 w-64 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95"
                onMouseLeave={() => setShowRoleMenu(false)}
              >
                <div className="px-3 py-2 border-b border-[var(--border)]">
                  <p className="text-xs font-bold text-[var(--foreground)]">
                    {user.name}
                  </p>
                  <p className="text-[11px] text-[var(--muted-foreground)]">{user.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold rounded bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)]">
                    Active: {user.role}
                  </span>
                </div>

                {/* Switch Demo Role Section */}
                <div className="px-3 py-1.5 text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider">
                  Switch Demo Role
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {allRoles.map((r) => (
                    <button
                      key={r}
                      onClick={() => handleRoleSwitch(r)}
                      className="w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[var(--muted)] text-[var(--foreground)]"
                    >
                      <span>{r}</span>
                      {user.role === r && <Check className="w-3.5 h-3.5 text-[var(--primary)]" />}
                    </button>
                  ))}
                </div>

                <div className="border-t border-[var(--border)] pt-1 mt-1">
                  <Link
                    href="/settings/hospital"
                    onClick={() => setShowRoleMenu(false)}
                    className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-[var(--muted)] text-[var(--foreground)]"
                  >
                    <User className="w-3.5 h-3.5 text-[var(--muted-foreground)]" />
                    Account Settings
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      router.push("/login");
                    }}
                    className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-rose-500/10 text-rose-500"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Quick Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-xs p-4">
          <div
            className="w-full max-w-lg bg-[var(--card)] rounded-xl border border-[var(--border)] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95"
            onKeyDown={(e) => e.key === "Escape" && setShowSearchModal(false)}
          >
            <div className="p-3 border-b border-[var(--border)] flex items-center gap-2.5">
              <Search className="w-4 h-4 text-[var(--muted-foreground)]" />
              <input
                type="text"
                placeholder="Search patient, module, doctor, or test..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full text-sm bg-transparent border-none text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-hidden"
              />
              <button
                onClick={() => setShowSearchModal(false)}
                className="text-xs px-2 py-1 rounded bg-[var(--muted)] text-[var(--muted-foreground)]"
              >
                ESC
              </button>
            </div>

            <div className="p-2 max-h-72 overflow-y-auto space-y-1">
              <p className="px-2 py-1 text-[11px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">
                Quick Shortcuts & Modules
              </p>
              {filteredQuickJumps.map((jump) => (
                <button
                  key={jump.href}
                  onClick={() => {
                    setShowSearchModal(false);
                    router.push(jump.href);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg hover:bg-[var(--muted)] text-[var(--foreground)] text-left transition-colors"
                >
                  <span className="font-medium">{jump.title}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--muted)] text-[var(--muted-foreground)]">
                    {jump.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

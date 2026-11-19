"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  HeartPulse,
  Search,
  PanelLeftClose,
  PanelLeft,
  X,
  ShieldCheck,
  ChevronRightSquare,
} from "lucide-react";
import { NavGroup, getNavigationForRole } from "@/config/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useHospital } from "@/contexts/HospitalContext";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}) => {
  const pathname = usePathname();
  const { user } = useAuth();
  const { currentBranch } = useHospital();
  const [navSearch, setNavSearch] = useState("");
  
  // Track hovered group for flyout menu when collapsed
  const [hoveredGroupId, setHoveredGroupId] = useState<string | null>(null);

  // All groups open by default in expanded mode so inner items are visible
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    dashboard: true,
    "front-desk": true,
    clinical: true,
    ipd: true,
    ot: true,
    billing: true,
    pharmacy: true,
    lab: true,
    "blood-bank": true,
    insurance: true,
    reports: true,
    staff: true,
    settings: true,
  });

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 1. Role-based navigation filtering: Only show modules permitted for this user's medical role
  const roleNav = getNavigationForRole(user.role);

  // 2. Further filter navigation items by search query if user typed anything
  const filteredNav: NavGroup[] = roleNav
    .map((group) => {
      if (!navSearch.trim()) return group;
      const matchingItems = group.items.filter((item) =>
        item.title.toLowerCase().includes(navSearch.toLowerCase())
      );
      return matchingItems.length > 0 ? { ...group, items: matchingItems } : null;
    })
    .filter(Boolean) as NavGroup[];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-[var(--sidebar)] border-r border-[var(--sidebar-border)] text-[var(--sidebar-foreground)] transition-all duration-300 ease-in-out shadow-xl md:shadow-none",
          // On mobile, drawer is always full 18rem (w-72); on desktop toggles between w-20 and w-72
          collapsed ? "w-72 md:w-20" : "w-72",
          // Mobile slide-over drawer
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Header / Brand */}
        <div
          className={cn(
            "h-16 flex items-center border-b border-[var(--sidebar-border)] shrink-0 transition-all",
            collapsed ? "justify-between px-4 md:justify-center md:px-2" : "justify-between px-4"
          )}
        >
          {/* 1. Mobile Header (always full branding + close X button) */}
          <div className="flex md:hidden items-center justify-between w-full">
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 overflow-hidden min-w-0"
              onClick={onCloseMobile}
            >
              <div className="w-9 h-9 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white shadow-xs shrink-0">
                <HeartPulse className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="truncate">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-base text-[var(--foreground)] tracking-tight">
                    Nuvert<span className="text-[var(--primary)]">OS</span>
                  </span>
                  <span className="text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.2 rounded bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
                    HIS
                  </span>
                </div>
                <p className="text-[10px] text-[var(--muted-foreground)] truncate max-w-[140px]">
                  {currentBranch.city} Branch
                </p>
              </div>
            </Link>
            <button
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              title="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. Desktop Header (switches between icon-only and full branding) */}
          <div className="hidden md:flex items-center w-full justify-between">
            {collapsed ? (
              <div className="flex items-center justify-center w-full">
                <button
                  onClick={onToggleCollapse}
                  className="w-10 h-10 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white shadow-md shrink-0 hover:opacity-90 transition-transform active:scale-95 cursor-pointer"
                  title="Click to expand sidebar"
                >
                  <HeartPulse className="w-6 h-6 stroke-[2.2]" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 overflow-hidden min-w-0"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white shadow-xs shrink-0">
                    <HeartPulse className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div className="truncate">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-lg text-[var(--foreground)] tracking-tight">
                        Nuvert<span className="text-[var(--primary)]">OS</span>
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.2 rounded bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
                        HIS
                      </span>
                    </div>
                    <p className="text-[10px] text-[var(--muted-foreground)] truncate max-w-[170px]">
                      {currentBranch.name}
                    </p>
                  </div>
                </Link>

                <button
                  onClick={onToggleCollapse}
                  className="p-1.5 rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
                  title="Collapse sidebar"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Quick Nav Search (visible when expanded OR on mobile drawer) */}
        {(!collapsed || mobileOpen) && (
          <div className="px-3 pt-3 pb-2 border-b border-[var(--sidebar-border)] shrink-0">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
              <input
                type="text"
                placeholder="Filter menu..."
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-hidden focus:ring-1 focus:ring-[var(--primary)]"
              />
            </div>
          </div>
        )}

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
          {filteredNav.map((group) => {
            const GroupIcon = group.icon;
            const isOpen = openGroups[group.id] || !!navSearch.trim();
            const hasActiveChild = group.items.some(
              (item) =>
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href))
            );

            return (
              <div
                key={group.id}
                className="relative mb-1"
                onMouseEnter={() => collapsed && setHoveredGroupId(group.id)}
                onMouseLeave={() => collapsed && setHoveredGroupId(null)}
              >
                {/* Group Heading Button */}
                <button
                  onClick={() => {
                    if (collapsed) {
                      onToggleCollapse();
                      setOpenGroups((prev) => ({ ...prev, [group.id]: true }));
                    } else {
                      toggleGroup(group.id);
                    }
                  }}
                  title={collapsed ? `Click to expand ${group.title} dropdown` : undefined}
                  className={cn(
                    "w-full flex items-center justify-between px-2.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer",
                    hasActiveChild
                      ? "text-[var(--primary)] bg-[var(--primary)]/10 font-bold"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]",
                    collapsed && "justify-center px-0 py-2.5"
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <GroupIcon
                      className={cn(
                        "w-4 h-4 shrink-0",
                        hasActiveChild ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]"
                      )}
                    />
                    {!collapsed && (
                      <span className="truncate uppercase tracking-wider text-[11px]">
                        {group.title}
                      </span>
                    )}
                  </div>
                  {!collapsed &&
                    (isOpen ? (
                      <ChevronDown className="w-3.5 h-3.5 text-[var(--muted-foreground)]" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-[var(--muted-foreground)]" />
                    ))}
                </button>

                {/* ============================================================== */}
                {/* 1. COLLAPSED FLYOUT POPOVER: Shows all inner dropdown items! */}
                {/* ============================================================== */}
                {collapsed && hoveredGroupId === group.id && (
                  <div
                    className="absolute left-[74px] top-0 z-50 w-64 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-2xl p-2 animate-in fade-in zoom-in-95"
                    onMouseEnter={() => setHoveredGroupId(group.id)}
                    onMouseLeave={() => setHoveredGroupId(null)}
                  >
                    <div className="px-3 py-2 border-b border-[var(--border)] mb-1 flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <GroupIcon className="w-4 h-4 text-[var(--primary)] shrink-0" />
                        <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] truncate">
                          {group.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-[var(--muted-foreground)] font-mono">
                        {group.items.length} items
                      </span>
                    </div>

                    <div className="max-h-80 overflow-y-auto space-y-0.5 py-1">
                      {group.items.map((item) => {
                        const isActive =
                          pathname === item.href ||
                          (item.href !== "/dashboard" && pathname.startsWith(item.href));

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => {
                              setHoveredGroupId(null);
                              onCloseMobile();
                            }}
                            className={cn(
                              "flex items-center justify-between px-3 py-1.5 text-xs rounded-lg transition-colors font-medium",
                              isActive
                                ? "bg-[var(--primary)] text-white font-semibold shadow-xs"
                                : "text-[var(--foreground)] hover:bg-[var(--muted)]"
                            )}
                          >
                            <span className="truncate">{item.title}</span>
                            {item.badge && (
                              <span
                                className={cn(
                                  "text-[10px] px-1.5 py-0.2 rounded-full font-bold",
                                  isActive
                                    ? "bg-white/20 text-white"
                                    : item.badge === "Critical" || item.badge === "Alert"
                                    ? "bg-rose-500/10 text-rose-500"
                                    : "bg-[var(--primary)]/10 text-[var(--primary)]"
                                )}
                              >
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ============================================================== */}
                {/* 2. EXPANDED ACCORDION: Shows all inner dropdown items inline!   */}
                {/* ============================================================== */}
                {!collapsed && isOpen && (
                  <div className="mt-1 space-y-0.5 pl-3 border-l-2 border-[var(--border)] ml-3">
                    {group.items.map((item) => {
                      const isActive =
                        pathname === item.href ||
                        (item.href !== "/dashboard" && pathname.startsWith(item.href));

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onCloseMobile}
                          className={cn(
                            "flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg transition-colors font-medium group/link",
                            isActive
                              ? "bg-[var(--primary)] text-white font-semibold shadow-xs"
                              : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                          )}
                        >
                          <span className="truncate">{item.title}</span>
                          {item.badge && (
                            <span
                              className={cn(
                                "text-[10px] px-1.5 py-0.2 rounded-full font-bold",
                                isActive
                                  ? "bg-white/20 text-white"
                                  : item.badge === "Critical" || item.badge === "Alert"
                                  ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                                  : "bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20"
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Expand / Collapse Toggle Bar */}
        <div className="p-2 border-t border-[var(--sidebar-border)] shrink-0">
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center gap-2 p-2 rounded-lg text-xs font-medium text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeft className="w-4 h-4 text-[var(--primary)]" />
            ) : (
              <>
                <PanelLeftClose className="w-4 h-4" />
                <span className="text-xs">Collapse Sidebar</span>
              </>
            )}
          </button>
        </div>

        {/* Current User & Role Status Bar */}
        <div className="p-3 border-t border-[var(--sidebar-border)] bg-[var(--muted)]/40 shrink-0">
          <div className="flex items-center gap-2.5">
            {user.photoUrl ? (
              <img
                src={user.photoUrl}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[var(--primary)]/30 shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white font-semibold flex items-center justify-center text-xs shrink-0 shadow-xs">
                {user.avatar || "VS"}
              </div>
            )}
            {!collapsed && (
              <div className="truncate flex-1">
                <p className="text-xs font-semibold text-[var(--foreground)] truncate">
                  {user.name}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 truncate">
                    {user.role}
                  </span>
                  <span className="text-[10px] text-[var(--muted-foreground)]">
                    {filteredNav.length} modules
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

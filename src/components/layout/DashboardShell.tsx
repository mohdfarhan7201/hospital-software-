"use client";

import React, { useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { cn } from "@/lib/utils";

interface DashboardShellProps {
  children: React.ReactNode;
}

export const DashboardShell: React.FC<DashboardShellProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors">
      <AppSidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div
        className={cn(
          "flex flex-col min-h-screen transition-all duration-300 ease-in-out",
          collapsed ? "md:pl-20" : "md:pl-72"
        )}
      >
        <AppHeader
          onOpenMobileMenu={() => setMobileOpen(true)}
          collapsed={collapsed}
          onToggleSidebar={() => setCollapsed(!collapsed)}
        />

        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

        <footer className="h-12 border-t border-[var(--border)] px-6 flex items-center justify-between text-xs text-[var(--muted-foreground)] bg-[var(--card)]/60">
          <p>© 2026 NuvertOS Hospital Operating System. Enterprise Healthcare Edition.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              NABH & HIPAA Compliant Ready
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};

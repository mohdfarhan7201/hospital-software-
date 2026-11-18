"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home, RefreshCw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
  const { user, setUserRole } = useAuth();

  // Super Admin has unrestricted access to all modules
  if (user.role === "Super Admin" || allowedRoles.includes(user.role)) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-[500px] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 shadow-xl text-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <h2 className="text-lg font-bold text-[var(--foreground)] mb-1">
          Access Restricted
        </h2>
        <p className="text-xs text-[var(--muted-foreground)] mb-4 leading-relaxed">
          Your active profile (<span className="font-semibold text-[var(--foreground)]">{user.role}</span>) does not have privileges to view or execute operations in this module.
        </p>

        <div className="p-3 rounded-lg bg-[var(--muted)]/50 border border-[var(--border)] text-left mb-5 text-xs">
          <p className="font-semibold text-[var(--foreground)] mb-1">Required Privileges:</p>
          <div className="flex flex-wrap gap-1.5">
            {allowedRoles.map((r) => (
              <span
                key={r}
                className="px-2 py-0.5 rounded bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] text-[11px] font-mono"
              >
                {r}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Link
            href="/dashboard"
            className="w-full py-2 px-3 rounded-lg bg-[var(--primary)] text-white text-xs font-semibold hover:opacity-90 flex items-center justify-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5" /> Return to My Dashboard
          </Link>
          <button
            onClick={() => setUserRole("Super Admin")}
            className="w-full py-2 px-3 rounded-lg border border-[var(--border)] hover:bg-[var(--muted)] text-[var(--foreground)] text-xs font-medium flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[var(--primary)]" /> Switch to Super Admin
          </button>
        </div>
      </div>
    </div>
  );
};

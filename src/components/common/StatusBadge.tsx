import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral"
  | "purple";

interface StatusBadgeProps {
  status: string;
  variant?: BadgeVariant;
  className?: string;
  dot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  variant,
  className,
  dot = true,
}) => {
  // Infer variant if not provided
  let autoVariant: BadgeVariant = variant || "neutral";
  if (!variant) {
    const s = status.toLowerCase();
    if (
      s.includes("active") ||
      s.includes("paid") ||
      s.includes("available") ||
      s.includes("completed") ||
      s.includes("approved") ||
      s.includes("settled") ||
      s.includes("normal")
    ) {
      autoVariant = "success";
    } else if (
      s.includes("in consultation") ||
      s.includes("pending") ||
      s.includes("low") ||
      s.includes("unconfirmed") ||
      s.includes("partially") ||
      s.includes("warning")
    ) {
      autoVariant = "warning";
    } else if (
      s.includes("emergency") ||
      s.includes("cancelled") ||
      s.includes("critical") ||
      s.includes("expired") ||
      s.includes("out of stock") ||
      s.includes("rejected") ||
      s.includes("urgent")
    ) {
      autoVariant = "danger";
    } else if (
      s.includes("admitted") ||
      s.includes("confirmed") ||
      s.includes("checked in") ||
      s.includes("processing") ||
      s.includes("in progress")
    ) {
      autoVariant = "info";
    } else if (s.includes("occupied") || s.includes("reserved") || s.includes("scheduled")) {
      autoVariant = "purple";
    }
  }

  const variantStyles = {
    success:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50",
    warning:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/50",
    danger:
      "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/50",
    info:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/50",
    neutral:
      "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
    purple:
      "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800/50",
  };

  const dotColors = {
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-rose-500",
    info: "bg-blue-500",
    neutral: "bg-slate-400",
    purple: "bg-indigo-500",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors",
        variantStyles[autoVariant],
        className
      )}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full animate-pulse", dotColors[autoVariant])}
        />
      )}
      {status}
    </span>
  );
};

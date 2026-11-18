import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  subtext?: string;
  subtitle?: string;
  trend?: { value: number; isPositive?: boolean };
  icon: LucideIcon;
  iconColor?: "blue" | "emerald" | "amber" | "rose" | "purple";
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  subtext,
  subtitle,
  trend,
  icon: Icon,
  iconColor = "blue",
  className,
}) => {
  const colorMap = {
    blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    rose: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  };

  const effectiveSubtext = subtitle || subtext;
  const effectiveIsPositive = trend ? (trend.isPositive ?? trend.value >= 0) : isPositive;
  const effectiveChange = trend
    ? `${trend.value >= 0 ? "+" : ""}${trend.value}%`
    : change;

  return (
    <div
      className={cn(
        "p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] shadow-xs hover:shadow-sm transition-all",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">
          {title}
        </p>
        <div className={cn("p-2 rounded-lg border", colorMap[iconColor])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
          {value}
        </h3>
        {(effectiveChange || effectiveSubtext) && (
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            {effectiveChange && (
              <span
                className={cn(
                  "inline-flex items-center font-medium",
                  effectiveIsPositive
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                )}
              >
                {effectiveIsPositive ? (
                  <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
                )}
                {effectiveChange}
              </span>
            )}
            {effectiveSubtext && (
              <span className="text-[var(--muted-foreground)]">
                {effectiveSubtext}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

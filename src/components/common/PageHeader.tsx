import React from "react";
import Link from "next/link";
import { ChevronRight, Database } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  title: string;
  description?: string;
  badge?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  showDemoBadge?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  breadcrumbs = [{ label: "NuvertOS", href: "/dashboard" }],
  title,
  description,
  badge,
  actions,
  children,
  showDemoBadge = true,
}) => {
  const actionSlot = actions || children;

  return (
    <div className="mb-6 space-y-2">
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center space-x-1.5 text-xs text-[var(--muted-foreground)]">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.label + idx}>
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-[var(--muted-foreground)] opacity-60" />}
              {crumb.href && idx < breadcrumbs.length - 1 ? (
                <Link
                  href={crumb.href}
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-semibold text-[var(--foreground)]">
                  {crumb.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Main Title and Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
              {title}
            </h1>
            {badge && (
              <span className="px-2 py-0.5 text-xs font-semibold rounded bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
                {badge}
              </span>
            )}
            {showDemoBadge && (
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-full bg-[var(--muted)] text-[var(--muted-foreground)] border border-[var(--border)]">
                <Database className="w-3 h-3 text-emerald-500" />
                Live Demo Data
              </span>
            )}
          </div>
          {description && (
            <p className="text-sm text-[var(--muted-foreground)] mt-1">
              {description}
            </p>
          )}
        </div>

        {actionSlot && (
          <div className="flex items-center flex-wrap gap-2.5">{actionSlot}</div>
        )}
      </div>
    </div>
  );
};

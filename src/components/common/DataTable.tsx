"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Filter,
} from "lucide-react";
import { exportToCSV } from "@/lib/utils";

export interface Column<T> {
  header: string;
  accessorKey?: keyof T | string;
  key?: keyof T | string;
  cell?: (item: T) => React.ReactNode;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface FilterOption {
  key: string;
  label: string;
  options: { label: string; value: string }[];
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  searchFields?: (keyof T | string)[];
  searchKey?: keyof T | string;
  filters?: FilterOption[];
  exportFileName?: string;
  pageSize?: number;
  onRowClick?: (item: T) => void;
  actions?: React.ReactNode;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchPlaceholder = "Search records...",
  searchFields = [],
  searchKey,
  filters = [],
  exportFileName = "hospital_data",
  pageSize = 8,
  onRowClick,
  actions,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const effectiveSearchFields = searchKey ? [searchKey] : searchFields;

  // Handle Search & Filter
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          effectiveSearchFields.length > 0
            ? effectiveSearchFields.some((field) => {
                const val = item[field as keyof T];
                return val ? String(val).toLowerCase().includes(query) : false;
              })
            : Object.values(item).some((val) =>
                val ? String(val).toLowerCase().includes(query) : false
              );

        if (!matchesSearch) return false;
      }

      // 2. Active Filters
      for (const [filterKey, filterVal] of Object.entries(activeFilters)) {
        if (filterVal && filterVal !== "ALL") {
          const itemVal = item[filterKey];
          if (
            itemVal === undefined ||
            String(itemVal).toLowerCase() !== filterVal.toLowerCase()
          ) {
            return false;
          }
        }
      }

      return true;
    });
  }, [data, searchQuery, effectiveSearchFields, activeFilters]);

  // Handle Sorting
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      const compare = aVal < bVal ? -1 : 1;
      return sortOrder === "asc" ? compare : -compare;
    });
  }, [filteredData, sortKey, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleExport = () => {
    exportToCSV(exportFileName, sortedData);
  };

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden shadow-xs transition-colors">
      {/* Table Toolbar */}
      <div className="p-4 border-b border-[var(--border)] flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search */}
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-1.5 text-sm rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-hidden focus:ring-1 focus:ring-[var(--primary)] transition-all"
            />
          </div>

          {/* Filter Dropdowns */}
          {filters.map((filter) => (
            <div key={filter.key} className="flex items-center gap-1.5">
              <select
                aria-label={filter.label}
                value={activeFilters[filter.key] || "ALL"}
                onChange={(e) => {
                  setActiveFilters({
                    ...activeFilters,
                    [filter.key]: e.target.value,
                  });
                  setCurrentPage(1);
                }}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-hidden focus:ring-1 focus:ring-[var(--primary)]"
              >
                <option value="ALL">All {filter.label}</option>
                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {actions}
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)] text-[var(--foreground)] transition-colors shadow-xs"
            title="Download CSV report"
          >
            <Download className="w-3.5 h-3.5 text-[var(--muted-foreground)]" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto min-h-[300px]">
        <table className="w-full text-left text-sm text-[var(--foreground)]">
          <thead className="bg-[var(--muted)]/50 text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] border-b border-[var(--border)]">
            <tr>
              {columns.map((col, idx) => {
                const colKey = col.accessorKey || col.key;
                return (
                  <th
                    key={idx}
                    className="px-4 py-3 cursor-pointer select-none"
                    onClick={() =>
                      col.sortable && colKey
                        ? handleSort(String(colKey))
                        : undefined
                    }
                  >
                    <div className="flex items-center gap-1">
                      {col.header}
                      {col.sortable && (
                        <ChevronsUpDown className="w-3.5 h-3.5 text-[var(--muted-foreground)] hover:text-[var(--foreground)]" />
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-[var(--muted-foreground)]"
                >
                  <Filter className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="text-sm font-medium">No records found matching criteria.</p>
                  <p className="text-xs mt-1">Try resetting search filters or keywords.</p>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rIdx) => (
                <tr
                  key={row.id || rIdx}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`hover:bg-[var(--muted)]/50 transition-colors ${
                    onRowClick ? "cursor-pointer" : ""
                  }`}
                >
                  {columns.map((col, cIdx) => {
                    const colKey = col.accessorKey || col.key;
                    return (
                      <td key={cIdx} className="px-4 py-3 whitespace-nowrap">
                        {col.render
                          ? col.render(row)
                          : col.cell
                          ? col.cell(row)
                          : colKey
                          ? String(row[colKey as keyof T] ?? "-")
                          : "-"}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-4 py-3 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--muted-foreground)] bg-[var(--card)]">
        <div>
          Showing{" "}
          <span className="font-semibold text-[var(--foreground)]">
            {sortedData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-[var(--foreground)]">
            {Math.min(currentPage * pageSize, sortedData.length)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-[var(--foreground)]">
            {sortedData.length}
          </span>{" "}
          records
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] enabled:hover:bg-[var(--muted)] text-[var(--foreground)] disabled:opacity-40 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-2 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage >= totalPages}
            className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] enabled:hover:bg-[var(--muted)] text-[var(--foreground)] disabled:opacity-40 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

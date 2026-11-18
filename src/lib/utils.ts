import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date | undefined): string {
  if (!date) return "-";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "-";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function formatTime(date: string | Date | undefined): string {
  if (!date) return "-";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "-";
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(d);
}

export function generateUHID(): string {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `NU-${new Date().getFullYear()}-${random}`;
}

export function exportToCSV(arg1: any, arg2?: any) {
  let rows: Record<string, any>[] = [];
  let filename = "export";

  if (Array.isArray(arg1)) {
    rows = arg1;
    filename = typeof arg2 === "string" ? arg2 : "export";
  } else if (typeof arg1 === "string") {
    filename = arg1;
    rows = Array.isArray(arg2) ? arg2 : [];
  }

  if (!rows || !rows.length) return;
  const cleanFilename = filename.endsWith(".csv") ? filename.slice(0, -4) : filename;

  const separator = ",";
  const keys = Object.keys(rows[0]);
  const csvContent =
    keys.join(separator) +
    "\n" +
    rows
      .map((row) =>
        keys
          .map((k) => {
            let val = row[k] === null || row[k] === undefined ? "" : String(row[k]);
            val = val.replace(/"/g, '""');
            if (val.search(/("|,|\n)/g) >= 0) {
              val = `"${val}"`;
            }
            return val;
          })
          .join(separator)
      )
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${cleanFilename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

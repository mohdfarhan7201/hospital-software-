import {
  LayoutDashboard,
  Users,
  Stethoscope,
  BedDouble,
  Scissors,
  Receipt,
  Pill,
  FlaskConical,
  Droplet,
  ShieldCheck,
  BarChart3,
  UserCheck,
  Settings,
  Calendar,
  Clock,
  FileText,
  Activity,
  HeartPulse,
  Syringe,
  Building2,
  FileCheck2,
  Percent,
  Warehouse,
  ClipboardList,
  Sparkles,
  DollarSign,
  LucideIcon,
} from "lucide-react";
import { UserRole } from "@/types";

export interface NavItem {
  title: string;
  href: string;
  badge?: string;
  roles?: UserRole[];
}

export interface NavGroup {
  id: string;
  title: string;
  icon: LucideIcon;
  defaultOpen?: boolean;
  roles?: UserRole[];
  items: NavItem[];
}

export const navigationConfig: NavGroup[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
    defaultOpen: true,
    roles: [
      "Super Admin",
      "Hospital Admin",
      "Doctor",
      "Receptionist",
      "Nurse",
      "Accountant",
      "Pharmacist",
      "Lab Technician",
    ],
    items: [
      { title: "Main Dashboard", href: "/dashboard" },
      {
        title: "Operational Dashboard",
        href: "/dashboard/operational",
        roles: ["Super Admin", "Hospital Admin", "Doctor", "Receptionist", "Nurse"],
      },
      {
        title: "Financial Dashboard",
        href: "/dashboard/financial",
        roles: ["Super Admin", "Hospital Admin", "Accountant"],
      },
      {
        title: "Department Dashboard",
        href: "/dashboard/departments",
        roles: ["Super Admin", "Hospital Admin", "Doctor"],
      },
    ],
  },
  {
    id: "front-desk",
    title: "Front Desk & Reception",
    icon: Users,
    roles: [
      "Super Admin",
      "Hospital Admin",
      "Receptionist",
      "Doctor",
      "Nurse",
      "Accountant",
      "Pharmacist",
      "Lab Technician",
    ],
    items: [
      {
        title: "Patient Management",
        href: "/patients",
        roles: ["Super Admin", "Hospital Admin", "Receptionist"],
      },
      {
        title: "Register Patient",
        href: "/patients/new",
        roles: ["Super Admin", "Hospital Admin", "Receptionist"],
      },
      {
        title: "Patient 360 (Profile)",
        href: "/patients/NU-2026-401928",
        roles: [
          "Super Admin",
          "Hospital Admin",
          "Doctor",
          "Receptionist",
          "Nurse",
          "Accountant",
          "Pharmacist",
          "Lab Technician",
        ],
      },
      {
        title: "Appointments",
        href: "/appointments",
        roles: ["Super Admin", "Hospital Admin", "Receptionist", "Doctor"],
      },
      {
        title: "Appointment Calendar",
        href: "/appointments/calendar",
        roles: ["Super Admin", "Hospital Admin", "Receptionist", "Doctor"],
      },
      {
        title: "Unconfirmed Appointments",
        href: "/appointments/unconfirmed",
        roles: ["Super Admin", "Hospital Admin", "Receptionist"],
      },
      {
        title: "Scheduled Visits",
        href: "/appointments/scheduled",
        roles: ["Super Admin", "Hospital Admin", "Receptionist"],
      },
      {
        title: "Queue Management",
        href: "/queue",
        roles: ["Super Admin", "Hospital Admin", "Receptionist", "Nurse"],
      },
      {
        title: "Bookings",
        href: "/bookings",
        roles: ["Super Admin", "Hospital Admin", "Receptionist"],
      },
      {
        title: "Advance Booking",
        href: "/advance-booking",
        roles: ["Super Admin", "Hospital Admin", "Receptionist"],
      },
      {
        title: "Virtual Clinic",
        href: "/appointments/virtual-clinic",
        roles: ["Super Admin", "Hospital Admin", "Doctor", "Receptionist"],
      },
      {
        title: "Patient Feedback",
        href: "/feedback",
        roles: ["Super Admin", "Hospital Admin", "Receptionist"],
      },
      {
        title: "Health Cards",
        href: "/health-cards",
        roles: ["Super Admin", "Hospital Admin", "Receptionist", "Accountant"],
      },
    ],
  },
  {
    id: "clinical",
    title: "Clinical & Patient Care",
    icon: Stethoscope,
    roles: [
      "Super Admin",
      "Hospital Admin",
      "Doctor",
      "Nurse",
      "Receptionist",
      "Pharmacist",
    ],
    items: [
      {
        title: "OPD Flowboard",
        href: "/opd/flowboard",
        roles: ["Super Admin", "Hospital Admin", "Doctor", "Receptionist"],
      },
      {
        title: "OPD Visits",
        href: "/opd/visits",
        roles: ["Super Admin", "Hospital Admin", "Doctor", "Receptionist"],
      },
      {
        title: "Clinical Chart",
        href: "/clinical",
        roles: ["Super Admin", "Hospital Admin", "Doctor", "Nurse"],
      },
      {
        title: "Vitals Recording",
        href: "/clinical/vitals",
        roles: ["Super Admin", "Hospital Admin", "Doctor", "Nurse"],
      },
      {
        title: "Clinical Notes",
        href: "/clinical/notes",
        roles: ["Super Admin", "Hospital Admin", "Doctor", "Nurse"],
      },
      {
        title: "ICU Charting",
        href: "/clinical/icu",
        badge: "Critical",
        roles: ["Super Admin", "Hospital Admin", "Doctor", "Nurse"],
      },
      {
        title: "Prescription Management",
        href: "/prescriptions",
        roles: ["Super Admin", "Hospital Admin", "Doctor", "Pharmacist"],
      },
      {
        title: "Consent Management",
        href: "/clinical/consent",
        roles: ["Super Admin", "Hospital Admin", "Doctor", "Nurse"],
      },
      {
        title: "Discharge Summary",
        href: "/discharge",
        roles: ["Super Admin", "Hospital Admin", "Doctor", "Nurse"],
      },
    ],
  },
  {
    id: "ipd",
    title: "IPD & Ward Management",
    icon: BedDouble,
    roles: [
      "Super Admin",
      "Hospital Admin",
      "Nurse",
      "Doctor",
      "Receptionist",
    ],
    items: [
      {
        title: "IPD Patient List",
        href: "/ipd",
        roles: ["Super Admin", "Hospital Admin", "Nurse", "Doctor"],
      },
      {
        title: "Admission Management",
        href: "/ipd/admission",
        roles: ["Super Admin", "Hospital Admin", "Receptionist", "Nurse"],
      },
      {
        title: "New Admission",
        href: "/ipd/admission/new",
        roles: ["Super Admin", "Hospital Admin", "Receptionist", "Nurse"],
      },
      {
        title: "Ward Management",
        href: "/wards",
        roles: ["Super Admin", "Hospital Admin", "Nurse"],
      },
      {
        title: "Room Management",
        href: "/wards/rooms",
        roles: ["Super Admin", "Hospital Admin", "Nurse"],
      },
      {
        title: "Bed Management",
        href: "/wards/beds",
        roles: ["Super Admin", "Hospital Admin", "Nurse"],
      },
      {
        title: "Bed Roster",
        href: "/wards/roster",
        roles: ["Super Admin", "Hospital Admin", "Nurse", "Doctor", "Receptionist"],
      },
      {
        title: "Patient Transfers",
        href: "/ipd/transfers",
        roles: ["Super Admin", "Hospital Admin", "Nurse", "Doctor"],
      },
      {
        title: "Discharge Approvals",
        href: "/discharge/approvals",
        roles: ["Super Admin", "Hospital Admin", "Nurse", "Doctor"],
      },
    ],
  },
  {
    id: "ot",
    title: "Operation Theatre (OT)",
    icon: Scissors,
    roles: ["Super Admin", "Hospital Admin", "Doctor", "Nurse"],
    items: [
      {
        title: "OT Dashboard",
        href: "/operation-theatre",
        roles: ["Super Admin", "Hospital Admin", "Doctor", "Nurse"],
      },
      {
        title: "OT Calendar",
        href: "/operation-theatre/calendar",
        roles: ["Super Admin", "Hospital Admin", "Doctor", "Nurse"],
      },
      {
        title: "OT Rooms",
        href: "/operation-theatre/rooms",
        roles: ["Super Admin", "Hospital Admin", "Doctor"],
      },
      {
        title: "Surgery Scheduling",
        href: "/operation-theatre/surgeries",
        roles: ["Super Admin", "Hospital Admin", "Doctor"],
      },
    ],
  },
  {
    id: "billing",
    title: "Billing & Finance",
    icon: Receipt,
    roles: ["Super Admin", "Hospital Admin", "Accountant", "Receptionist"],
    items: [
      {
        title: "Billing Dashboard",
        href: "/billing",
        roles: ["Super Admin", "Hospital Admin", "Accountant"],
      },
      {
        title: "Bill Estimates",
        href: "/billing/estimates",
        roles: ["Super Admin", "Hospital Admin", "Accountant", "Receptionist"],
      },
      {
        title: "Payment Collection",
        href: "/billing/payments",
        roles: ["Super Admin", "Hospital Admin", "Accountant", "Receptionist"],
      },
      {
        title: "Receipts",
        href: "/billing/receipts",
        roles: ["Super Admin", "Hospital Admin", "Accountant", "Receptionist"],
      },
      {
        title: "Refunds",
        href: "/billing/refunds",
        roles: ["Super Admin", "Hospital Admin", "Accountant"],
      },
      {
        title: "Deposits",
        href: "/billing/deposits",
        roles: ["Super Admin", "Hospital Admin", "Accountant", "Receptionist"],
      },
      {
        title: "Discounts & Concessions",
        href: "/billing/discounts",
        roles: ["Super Admin", "Hospital Admin", "Accountant"],
      },
      {
        title: "Accounts Closing",
        href: "/finance/accounts-closing",
        roles: ["Super Admin", "Hospital Admin", "Accountant"],
      },
      {
        title: "Expense Management",
        href: "/finance/expenses",
        roles: ["Super Admin", "Hospital Admin", "Accountant"],
      },
      {
        title: "Petty Cash",
        href: "/finance/petty-cash",
        roles: ["Super Admin", "Hospital Admin", "Accountant"],
      },
      {
        title: "Bulk Settlement",
        href: "/finance/settlements",
        roles: ["Super Admin", "Hospital Admin", "Accountant"],
      },
      {
        title: "MOU Management",
        href: "/finance/mou",
        roles: ["Super Admin", "Hospital Admin", "Accountant"],
      },
      {
        title: "Doctor Payouts",
        href: "/finance/payouts",
        roles: ["Super Admin", "Hospital Admin", "Accountant"],
      },
    ],
  },
  {
    id: "pharmacy",
    title: "Pharmacy & Inventory",
    icon: Pill,
    roles: ["Super Admin", "Hospital Admin", "Pharmacist", "Nurse"],
    items: [
      {
        title: "Pharmacy Dashboard",
        href: "/pharmacy",
        roles: ["Super Admin", "Hospital Admin", "Pharmacist"],
      },
      {
        title: "Medicine Management",
        href: "/pharmacy/medicines",
        roles: ["Super Admin", "Hospital Admin", "Pharmacist"],
      },
      {
        title: "Medicine Sales (POS)",
        href: "/pharmacy/sales",
        roles: ["Super Admin", "Hospital Admin", "Pharmacist"],
      },
      {
        title: "Purchase Management",
        href: "/pharmacy/purchases",
        roles: ["Super Admin", "Hospital Admin", "Pharmacist"],
      },
      {
        title: "Supplier Management",
        href: "/pharmacy/suppliers",
        roles: ["Super Admin", "Hospital Admin", "Pharmacist"],
      },
      {
        title: "Stock Management",
        href: "/inventory/stock",
        roles: ["Super Admin", "Hospital Admin", "Pharmacist"],
      },
      {
        title: "Expiry Tracking",
        href: "/inventory/expiry",
        badge: "Alert",
        roles: ["Super Admin", "Hospital Admin", "Pharmacist"],
      },
      {
        title: "Department Indents",
        href: "/inventory/indents",
        roles: ["Super Admin", "Hospital Admin", "Pharmacist", "Nurse"],
      },
      {
        title: "Department Transfers",
        href: "/inventory/transfers",
        roles: ["Super Admin", "Hospital Admin", "Pharmacist"],
      },
      {
        title: "Indent Returns",
        href: "/inventory/returns",
        roles: ["Super Admin", "Hospital Admin", "Pharmacist", "Nurse"],
      },
    ],
  },
  {
    id: "lab",
    title: "Laboratory & Radiology",
    icon: FlaskConical,
    roles: ["Super Admin", "Hospital Admin", "Lab Technician", "Doctor", "Nurse"],
    items: [
      {
        title: "Laboratory Dashboard",
        href: "/laboratory",
        roles: ["Super Admin", "Hospital Admin", "Lab Technician"],
      },
      {
        title: "Test Directory",
        href: "/laboratory/tests",
        roles: ["Super Admin", "Hospital Admin", "Lab Technician", "Doctor"],
      },
      {
        title: "Test Requests",
        href: "/laboratory/requests",
        roles: ["Super Admin", "Hospital Admin", "Lab Technician", "Doctor"],
      },
      {
        title: "Sample Collection",
        href: "/laboratory/samples",
        roles: ["Super Admin", "Hospital Admin", "Lab Technician", "Nurse"],
      },
      {
        title: "Laboratory Results",
        href: "/laboratory/results",
        roles: ["Super Admin", "Hospital Admin", "Lab Technician"],
      },
      {
        title: "Lab Reports",
        href: "/laboratory/reports",
        roles: ["Super Admin", "Hospital Admin", "Lab Technician", "Doctor", "Nurse"],
      },
      {
        title: "Radiology Requests",
        href: "/radiology/requests",
        roles: ["Super Admin", "Hospital Admin", "Doctor", "Lab Technician"],
      },
      {
        title: "Imaging Reports (PACS)",
        href: "/radiology/reports",
        roles: ["Super Admin", "Hospital Admin", "Doctor", "Lab Technician", "Nurse"],
      },
    ],
  },
  {
    id: "blood-bank",
    title: "Blood Bank",
    icon: Droplet,
    roles: ["Super Admin", "Hospital Admin", "Lab Technician", "Doctor", "Nurse"],
    items: [
      {
        title: "Blood Bank Dashboard",
        href: "/blood-bank",
        roles: ["Super Admin", "Hospital Admin", "Lab Technician"],
      },
      {
        title: "Blood Inventory",
        href: "/blood-bank/inventory",
        roles: ["Super Admin", "Hospital Admin", "Lab Technician"],
      },
      {
        title: "Blood Donors",
        href: "/blood-bank/donors",
        roles: ["Super Admin", "Hospital Admin", "Lab Technician"],
      },
      {
        title: "Blood Requests & Issue",
        href: "/blood-bank/requests",
        roles: ["Super Admin", "Hospital Admin", "Lab Technician", "Doctor", "Nurse"],
      },
    ],
  },
  {
    id: "insurance",
    title: "Insurance & TPA",
    icon: ShieldCheck,
    roles: ["Super Admin", "Hospital Admin", "Accountant"],
    items: [
      {
        title: "Insurance Dashboard",
        href: "/insurance",
        roles: ["Super Admin", "Hospital Admin", "Accountant"],
      },
      {
        title: "Insurance Companies",
        href: "/insurance/companies",
        roles: ["Super Admin", "Hospital Admin", "Accountant"],
      },
      {
        title: "TPA Management",
        href: "/insurance/tpa",
        roles: ["Super Admin", "Hospital Admin", "Accountant"],
      },
      {
        title: "Pre-Authorization",
        href: "/insurance/pre-authorization",
        roles: ["Super Admin", "Hospital Admin", "Accountant"],
      },
      {
        title: "Claim Management",
        href: "/insurance/claims",
        roles: ["Super Admin", "Hospital Admin", "Accountant"],
      },
      {
        title: "Claim Settlements",
        href: "/insurance/settlements",
        roles: ["Super Admin", "Hospital Admin", "Accountant"],
      },
    ],
  },
  {
    id: "reports",
    title: "Reports & Analytics",
    icon: BarChart3,
    roles: ["Super Admin", "Hospital Admin", "Accountant", "Pharmacist", "Lab Technician"],
    items: [
      {
        title: "Reports Overview",
        href: "/reports",
        roles: ["Super Admin", "Hospital Admin", "Accountant", "Pharmacist", "Lab Technician"],
      },
      {
        title: "Patient Reports",
        href: "/reports/patients",
        roles: ["Super Admin", "Hospital Admin"],
      },
      {
        title: "OPD Reports",
        href: "/reports/opd",
        roles: ["Super Admin", "Hospital Admin"],
      },
      {
        title: "IPD Reports",
        href: "/reports/ipd",
        roles: ["Super Admin", "Hospital Admin"],
      },
      {
        title: "Revenue & Billing Reports",
        href: "/reports/revenue",
        roles: ["Super Admin", "Hospital Admin", "Accountant"],
      },
      {
        title: "Bed Occupancy Reports",
        href: "/reports/occupancy",
        roles: ["Super Admin", "Hospital Admin"],
      },
      {
        title: "Discharge & LOS Reports",
        href: "/reports/discharge",
        roles: ["Super Admin", "Hospital Admin"],
      },
      {
        title: "MIS & Executive Reports",
        href: "/reports/mis",
        roles: ["Super Admin", "Hospital Admin", "Accountant"],
      },
      {
        title: "GST Reports",
        href: "/reports/gst",
        roles: ["Super Admin", "Hospital Admin", "Accountant"],
      },
      {
        title: "Doctor Payout Reports",
        href: "/reports/payouts",
        roles: ["Super Admin", "Hospital Admin", "Accountant"],
      },
    ],
  },
  {
    id: "staff",
    title: "Staff & Administration",
    icon: UserCheck,
    roles: ["Super Admin", "Hospital Admin"],
    items: [
      {
        title: "Staff Directory",
        href: "/staff",
        roles: ["Super Admin", "Hospital Admin"],
      },
      {
        title: "Doctor Management",
        href: "/staff/doctors",
        roles: ["Super Admin", "Hospital Admin"],
      },
      {
        title: "Nurse Management",
        href: "/staff/nurses",
        roles: ["Super Admin", "Hospital Admin"],
      },
      {
        title: "Shift Management",
        href: "/staff/shifts",
        roles: ["Super Admin", "Hospital Admin"],
      },
      {
        title: "Attendance Tracking",
        href: "/staff/attendance",
        roles: ["Super Admin", "Hospital Admin"],
      },
      {
        title: "Leave Approvals",
        href: "/staff/leaves",
        roles: ["Super Admin", "Hospital Admin"],
      },
    ],
  },
  {
    id: "settings",
    title: "Settings & Configuration",
    icon: Settings,
    roles: ["Super Admin", "Hospital Admin"],
    items: [
      {
        title: "Hospital Profile",
        href: "/settings/hospital",
        roles: ["Super Admin", "Hospital Admin"],
      },
      {
        title: "Branches & Units",
        href: "/settings/branches",
        roles: ["Super Admin"],
      },
      {
        title: "Departments Master",
        href: "/settings/departments",
        roles: ["Super Admin", "Hospital Admin"],
      },
      {
        title: "Services & Pricing",
        href: "/settings/services",
        roles: ["Super Admin", "Hospital Admin"],
      },
      {
        title: "Healthcare Packages",
        href: "/settings/packages",
        roles: ["Super Admin", "Hospital Admin"],
      },
      {
        title: "Surgery Master",
        href: "/settings/surgeries",
        roles: ["Super Admin", "Hospital Admin"],
      },
      {
        title: "Rooms & Wards Master",
        href: "/settings/rooms",
        roles: ["Super Admin", "Hospital Admin"],
      },
      {
        title: "Beds Master",
        href: "/settings/beds",
        roles: ["Super Admin", "Hospital Admin"],
      },
      {
        title: "Roles & Permission Matrix",
        href: "/settings/roles",
        roles: ["Super Admin"],
      },
      {
        title: "User Access",
        href: "/settings/users",
        roles: ["Super Admin", "Hospital Admin"],
      },
      {
        title: "Print & Header Templates",
        href: "/settings/print-templates",
        roles: ["Super Admin", "Hospital Admin"],
      },
      {
        title: "Prescription Formats",
        href: "/settings/prescription-templates",
        roles: ["Super Admin", "Hospital Admin"],
      },
      {
        title: "Dynamic Form Builder",
        href: "/settings/forms",
        roles: ["Super Admin"],
      },
      {
        title: "Field Master",
        href: "/settings/fields",
        roles: ["Super Admin"],
      },
      {
        title: "Vitals Master",
        href: "/settings/vitals",
        roles: ["Super Admin", "Hospital Admin"],
      },
      {
        title: "System Rules",
        href: "/settings/system-rules",
        roles: ["Super Admin"],
      },
      {
        title: "Integrations & APIs",
        href: "/settings/integrations",
        roles: ["Super Admin"],
      },
      {
        title: "Audit Trail & Logs",
        href: "/settings/audit-logs",
        roles: ["Super Admin"],
      },
    ],
  },
];

/**
 * Filter navigation configuration specifically for a given UserRole
 */
export function getNavigationForRole(role: UserRole): NavGroup[] {
  // Super Admin has full unrestricted access to all groups and items
  if (role === "Super Admin") {
    return navigationConfig;
  }

  return navigationConfig
    .map((group) => {
      // Check if group is permitted for this role
      if (group.roles && !group.roles.includes(role)) {
        return null;
      }

      // Filter child items permitted for this role
      const permittedItems = group.items.filter((item) => {
        if (!item.roles) return true; // Inherit group permission if not specified
        return item.roles.includes(role);
      });

      if (permittedItems.length === 0) {
        return null;
      }

      return {
        ...group,
        items: permittedItems,
      };
    })
    .filter(Boolean) as NavGroup[];
}

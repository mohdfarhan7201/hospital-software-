# NuvertOS — Enterprise Hospital Operating System (HIS / HMS)
### Modern Multispecialty Hospital Management Platform
*Built with Next.js 16 (App Router), TypeScript, Tailwind CSS, and Recharts*

---

## 🏥 Overview

**NuvertOS** is a comprehensive, production-quality Hospital Information System (HIS / HMS) designed to manage end-to-end multi-departmental clinical, administrative, and financial hospital workflows. It supports tertiary multispecialty hospitals, daycare surgical centers, and regional multi-campus healthcare systems.

### Key Capabilities
- **Multi-Role Healthcare Personas:** 8 preconfigured institutional roles with 1-click credential switching (Super Admin, Hospital Admin, Doctor, Nurse, Accountant, Pharmacist, Receptionist, Lab Technician).
- **Patient 360 & EMR:** Detailed chronological patient timeline, vitals history, digital prescriptions, lab reports, and billing ledger.
- **24x7 Inpatient & Bed Roster:** Live ward occupancy visualization, MGPS oxygen pipeline tracking, ICU telemetry flowsheets, and inter-ward transfer management.
- **Enterprise Billing & Finance:** NABH/GST-compliant tax invoicing, cashless TPA claim pre-authorization (NHCX), cashier day-end accounts closing, and physician revenue-share calculations.
- **Diagnostic Operations:** Laboratory Information System (LIS) with critical panic value alerts, and Radiology PACS DICOM simulation viewer.
- **Full Indian Healthcare Context:** Currency in INR (`₹`), UHID pattern (`NU-2026-XXXXXX`), ABDM/ABHA integration, DLT registered SMS alerts, and Indian drug formulary.
- **Dual Theme Engine:** Pixel-perfect Light & Dark themes with persistent theme selection across sessions.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 16 (App Router with Server & Client Component separation)
- **Language:** TypeScript 5+ (Strict mode)
- **Styling:** Tailwind CSS with CSS Variable tokens (`globals.css`)
- **Icons:** Lucide React
- **Data Visualizations:** Recharts (Area charts, Bar charts, Donut pies, Telemetry curves)
- **Interactive Tables:** Filterable TanStack Table pattern with multi-column sorting, pagination, and instant CSV export
- **Theme Manager:** `next-themes` (Class-based dark mode toggle)
- **Feedback & Notifications:** Sonner (Toast alerts) & Context API
- **Date Management:** `date-fns`

---

## 🏛️ Application Architecture & Navigation Modules

```
NuvertOS HIS
├── Group A: Dashboards (/dashboard, /dashboard/operational, /dashboard/financial, /dashboard/departments)
├── Group B: Front Desk (/patients, /patients/new, /patients/[id], /appointments, /queue, /virtual-clinic, etc.)
├── Group C: Clinical & Patient Care (/opd/flowboard, /clinical, /clinical/vitals, /clinical/icu, /prescriptions, etc.)
├── Group D: IPD & Wards (/ipd, /ipd/admission, /wards, /wards/roster, /ipd/transfers, /discharge)
├── Group E: Operation Theatre (/operation-theatre, /operation-theatre/calendar, /operation-theatre/surgeries)
├── Group F: Billing & Finance (/billing, /billing/estimates, /billing/payments, /finance/accounts-closing, etc.)
├── Group G: Pharmacy & Inventory (/pharmacy, /pharmacy/medicines, /pharmacy/sales, /inventory/stock, /inventory/expiry)
├── Group H: Laboratory & Radiology (/laboratory, /laboratory/samples, /laboratory/results, /radiology/reports)
├── Group I: Blood Bank (/blood-bank, /blood-bank/inventory, /blood-bank/donors, /blood-bank/requests)
├── Group J: Insurance & TPA (/insurance, /insurance/pre-authorization, /insurance/claims, /insurance/settlements)
├── Group K: Reports & Analytics (/reports, /reports/patients, /reports/opd, /reports/ipd, /reports/revenue, /reports/mis, /reports/gst)
├── Group L: Staff & Administration (/staff, /staff/doctors, /staff/nurses, /staff/shifts, /staff/attendance, /staff/leaves)
└── Group M: Settings & Masters (/settings/hospital, /settings/branches, /settings/services, /settings/roles, /settings/forms, etc.)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.18.0 or newer recommended)
- npm or yarn

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/organization/nuvertos-his.git
cd nuvertos-his
npm install --legacy-peer-deps
```

### 2. Development Server
Start the local Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. The application will automatically route you to the Executive Command Center at `/dashboard` or the Demo Login Portal at `/login`.

### 3. Production Build
Compile and verify the production bundle:
```bash
npm run build
npm run start
```

---

## 👥 Demo Credentials & Role Switcher

For evaluation, you can switch between any of the 8 pre-configured hospital roles using the **Role Switcher Dropdown** in the top navigation header or via the 1-click buttons on the `/login` screen:

| Role Persona | Demo Email | Primary Privileges |
|---|---|---|
| **Super Administrator** | `superadmin@nuvertos.org` | Unrestricted platform access, system masters, audit logs, and security |
| **Hospital Administrator**| `admin@nuvertos.org` | Executive dashboards, doctor rosters, bed allocations, and MIS reports |
| **Consultant Physician** | `doctor@nuvertos.org` | OPD flowboard, clinical SOAP notes, e-prescribing, surgical schedules |
| **Nursing Staff** | `nurse@nuvertos.org` | Triage vitals desk, bedside ICU flowsheet, nursing station orders |
| **Billing & Cashier** | `billing@nuvertos.org` | Inpatient billing, receipt issuance, advance deposits, and day-end closing |
| **Chief Pharmacist** | `pharmacy@nuvertos.org` | POS dispensing counter, formulary stock master, and expiry tracking |
| **Receptionist** | `reception@nuvertos.org` | Patient registration, appointment bookings, and queue token calling |
| **Laboratory Technician** | `lab@nuvertos.org` | Sample collection accessioning, analyzer result entry, and panic alerts |

---

## 📄 Key Features Breakdown

### 1. Patient 360 Profile (`/patients/[patientId]`)
- Comprehensive clinical summary with patient banner (UHID, Age, Gender, Blood Group, ABHA status).
- 8 dedicated tabs: Overview, Visits & Encounters, Clinical Diagnoses, Prescriptions, Laboratory Reports, Billing Transactions, Uploaded Documents, and Emergency Alerts.

### 2. Live Queue Management (`/queue`)
- Real-time token caller for outpatient consults.
- Interactive token states: *Waiting*, *Called*, *In Consultation*, *Completed*, or *No-Show*.
- Audio announcement simulation and direct transfer to doctor chamber.

### 3. Visual Bed Roster (`/wards/roster`)
- Color-coded bed state matrix across ICU, Private Deluxe, General Wards, and Post-Op.
- Real-time status toggling (*Available*, *Occupied*, *Housekeeping / Sanitization*, *Under Maintenance*).

### 4. Interactive RBAC Matrix (`/settings/roles`)
- Granular permission matrix across all 15 operational modules.
- Independent switches for *View*, *Create*, *Edit*, *Delete*, *Approve*, and *Export* capabilities.

### 5. Dynamic Form Builder (`/settings/forms`)
- Visual drag-and-drop questionnaire designer for pre-anesthetic checkups, Morse fall scales, and clinical triage.
- Supports text, numeric, dropdowns, date pickers, and required constraints.

---

## 📊 Reports & Business Intelligence (`/reports`)
- **Revenue Trajectory:** Departmental breakdown between IPD, OPD, Pharmacy, and Diagnostics.
- **Census & Demographics:** Age cohort distributions and Ayushman Bharat (ABHA) linkage statistics.
- **NABH Governance Dossier:** 3-month rolling KPI statement benchmarked against NABH/MoHFW quality standards.
- **GST Reconciliation:** Itemized tax invoices with HSN/SAC codes (5%, 12%, and exempt clinical services).
- **Physician Payouts:** Doctor revenue-share ledger with statutory Section 194J TDS deductions.

---

## 🔒 Security & Compliance
- **Zero Real Secret Storage:** No live medical secrets stored in insecure client storage.
- **HIPAA / DISHA Audit Trail:** Immutable event logger tracking clinical chart access, user logins, and privilege changes.
- **Export Security:** Client-side CSV export sanitized against spreadsheet injection.

---

## 📜 License
NuvertOS is proprietary software developed for enterprise commercial hospital networks. All rights reserved.

 #   h o s p i t a l - s o f t w a r e -  
 
# NuvertOS — Enterprise Hospital Operating System (HIS / HMS)
## Frontend Implementation & Project Status Report

### 1. Executive Summary
NuvertOS is an enterprise-grade Hospital Information System (HIS / HMS) frontend built from scratch using Next.js 16 (App Router), TypeScript, Tailwind CSS, and modern healthcare UI/UX design patterns. It provides complete multi-departmental coverage for high-volume tertiary hospitals, polyclinics, and multi-campus healthcare systems.

- **Application Name:** NuvertOS
- **Architecture:** Next.js App Router with Server & Client components
- **Styling:** Tailwind CSS with CSS Variable design tokens (Dual Theme: Light / Dark)
- **Design System:** Clean enterprise healthcare aesthetic with subtle shadows, Indian clinical/financial conventions (INR `₹`, UHID pattern `NU-2026-XXXXXX`, ABDM/ABHA integration, DLT/SMS, GST HSN schedules)
- **Role-Based Access Control (RBAC):** 8 pre-configured institutional personas with 1-click credential switching (Super Admin, Hospital Admin, Doctor, Nurse, Accountant, Pharmacist, Receptionist, Lab Technician).

---

### 2. Complete Module & Route Map

| Module Group | Route | Purpose & Key Features | Status |
|---|---|---|---|
| **Authentication** | `/login` | 8-role 1-click demo switcher, password visibility, remember me | Completed |
| | `/forgot-password` | Self-service credential recovery flow with OTP simulation | Completed |
| | `/reset-password` | Password reset interface with validation feedback | Completed |
| **Group A: Dashboards** | `/dashboard` | Executive command center, hospital KPIs, patient flows, revenue graphs | Completed |
| | `/dashboard/operational` | Turnaround times, triage queues, OT status, bed turnaround | Completed |
| | `/dashboard/financial` | Gross revenue, collection efficiency, discounts, TPA receivables | Completed |
| | `/dashboard/departments` | Department-wise workload, consult count, bed utilization | Completed |
| **Group B: Front Desk** | `/patients` | Patient directory, filterable table, CSV export, instant search | Completed |
| | `/patients/new` | Multi-section registration: personal, guardian, insurance, ABHA | Completed |
| | `/patients/[patientId]` | **Patient 360 flagship profile**: 8 interactive tabs (Vitals, Rx, Visits, etc.) | Completed |
| | `/patients/[patientId]/visits/[visitId]` | Outpatient encounter drilldown, SOAP notes, vital readings | Completed |
| | `/appointments` | Appointment schedule, check-in, doctor selection, booking modal | Completed |
| | `/appointments/calendar` | Interactive weekly doctor appointment scheduling grid | Completed |
| | `/appointments/unconfirmed` | Confirmation workflow for digital bookings & web requests | Completed |
| | `/appointments/scheduled` | Filtered list of verified upcoming patient appointments | Completed |
| | `/appointments/virtual-clinic` | Telemedicine room with WebRTC simulation & real-time e-Rx | Completed |
| | `/queue` | Live OPD token queue caller with Call Next, In-Consult, and Finish | Completed |
| | `/bookings` | Advance consult bookings directory | Completed |
| | `/advance-booking` | Booking creation wizard with deposit payment | Completed |
| | `/feedback` | Patient satisfaction ratings (NPS) and grievance logs | Completed |
| | `/health-cards` | Preventive healthcare loyalty and corporate membership cards | Completed |
| **Group C: Clinical & Patient Care** | `/opd/flowboard` | Interactive Kanban visualizer with stage drag/advancement | Completed |
| | `/opd/visits` | Outpatient visit census with attending physician filter | Completed |
| | `/clinical` | Physician EMR workstation with real-time patient queue | Completed |
| | `/clinical/vitals` | Nurse triage desk with automated BMI & normal range alerts | Completed |
| | `/clinical/notes` | SOAP clinical progress documentation with preloaded templates | Completed |
| | `/clinical/icu` | Bedside telemetry flowsheets (SpO2, Art BP, CVP, Ventilator mode) | Completed |
| | `/clinical/[patientId]/[visitId]` | Full doctor consultation workspace with SOAP and Rx linking | Completed |
| | `/prescriptions` | Digital prescription writer with drug formulary & allergy safety alerts | Completed |
| | `/clinical/consent` | Informed surgical and blood transfusion consents with digital signing | Completed |
| | `/discharge` | Inpatient discharge summary generator with ICD-10 codings | Completed |
| | `/discharge/approvals` | Clearance matrix: Clinical, Nursing, Pharmacy, Billing sign-offs | Completed |
| **Group D: IPD & Wards** | `/ipd` | Inpatient census with ward filters and active treatment plans | Completed |
| | `/ipd/admission` | Inpatient admission registry and bed allocation status | Completed |
| | `/ipd/admission/new` | Admission protocol form with admitting consultant & room selector | Completed |
| | `/wards` | Ward zones (General, Private Deluxe, ICU, Maternity, Recovery) | Completed |
| | `/wards/rooms` | Room category directory with amenities and daily tariffs | Completed |
| | `/wards/beds` | Physical bed directory with MGPS oxygen pipeline indicators | Completed |
| | `/wards/roster` | Visual Bed Roster with live occupancy, housekeeping, and transfers | Completed |
| | `/ipd/transfers` | Inter-ward patient transfer protocol with handover documentation | Completed |
| **Group E: Operation Theatre** | `/operation-theatre` | OT command center with room readiness and case progress | Completed |
| | `/operation-theatre/calendar` | Visual surgical schedule across all operating suites | Completed |
| | `/operation-theatre/rooms` | Operating theatre suites (OT-1 Cardiac, OT-2 Ortho, OT-3 Laparoscopy) | Completed |
| | `/operation-theatre/surgeries` | Surgery scheduling wizard, surgeon assignment, WHO checklist | Completed |
| **Group F: Billing & Finance** | `/billing` | Centralized billing dashboard, invoice generator, printable tax invoices | Completed |
| | `/billing/estimates` | Pre-admission surgical package cost estimates | Completed |
| | `/billing/payments` | Cashier payment collection with Cash, UPI QR, Card, and NEFT | Completed |
| | `/billing/receipts` | Money receipts repository with printable voucher copies | Completed |
| | `/billing/refunds` | Patient advance refund workflows with approval sign-offs | Completed |
| | `/billing/deposits` | Inpatient advance deposit collection and ledger tracking | Completed |
| | `/billing/discounts` | Concession approvals with administrative authorization codes | Completed |
| | `/finance/accounts-closing` | Daily cashier day-end cash tally and bank reconciliation | Completed |
| | `/finance/expenses` | Hospital operational expense vouchers and department indents | Completed |
| | `/finance/petty-cash` | Petty cash drawer balance tracking and replenishment logs | Completed |
| | `/finance/settlements` | Third-party insurance and corporate bulk settlements | Completed |
| | `/finance/mou` | Institutional MOUs with corporate clients and PSU panels | Completed |
| | `/finance/payouts` | Consultant doctor revenue-share commission calculations | Completed |
| **Group G: Pharmacy & Inventory** | `/pharmacy` | Pharmacy dispensing command center with stock alerts | Completed |
| | `/pharmacy/medicines` | Comprehensive drug formulary master with batch & expiry tracking | Completed |
| | `/pharmacy/sales` | Retail pharmacy Point-of-Sale (POS) counter with barcode lookup | Completed |
| | `/pharmacy/purchases` | Purchase orders (PO) to wholesale pharmaceutical distributors | Completed |
| | `/pharmacy/suppliers` | Drug supplier directory with GSTIN and credit period records | Completed |
| | `/inventory/stock` | Medical supplies and consumable stock ledger across stores | Completed |
| | `/inventory/expiry` | Automated drug expiry tracking with 30/60/90-day alert flags | Completed |
| | `/inventory/indents` | Ward medication requisitions with one-click issue workflows | Completed |
| | `/inventory/transfers` | Inter-departmental pharmacy and consumables transfers | Completed |
| | `/inventory/returns` | Unused ward medication returns back to central pharmacy | Completed |
| **Group H: Laboratory & Radiology** | `/laboratory` | Central diagnostic lab command center with panic value alerts | Completed |
| | `/laboratory/tests` | Directory of pathology, biochemistry, and microbiology investigations | Completed |
| | `/laboratory/requests` | Barcode accessioning and sample collection queue | Completed |
| | `/laboratory/samples` | Phlebotomy sample collection desk and specimen tracking | Completed |
| | `/laboratory/results` | Laboratory analyzer result entry with biological reference ranges | Completed |
| | `/laboratory/reports` | Print-ready diagnostic reports with QR code verification | Completed |
| | `/radiology/requests` | Imaging requisition desk (MRI, CT, Ultrasound, Digital X-Ray) | Completed |
| | `/radiology/reports` | DICOM PACS simulation viewer and radiologist report writer | Completed |
| **Group I: Blood Bank** | `/blood-bank` | Blood component inventory (PRBC, Platelets, FFP, Cryoprecipitate) | Completed |
| | `/blood-bank/inventory` | Component availability, blood bag unit numbers, and expiry alerts | Completed |
| | `/blood-bank/donors` | Voluntary blood donor registry and donation deferral logs | Completed |
| | `/blood-bank/requests` | Cross-matching and cross-matched blood issue requisitions | Completed |
| **Group J: Insurance & TPA** | `/insurance` | Cashless insurance desk with pre-auth pipeline tracking | Completed |
| | `/insurance/companies` | Empanelled private and public health insurance companies | Completed |
| | `/insurance/tpa` | Third-Party Administrator (TPA) contracts and coordinator desk | Completed |
| | `/insurance/pre-authorization` | Digital cashless pre-authorization submission forms | Completed |
| | `/insurance/claims` | Cashless insurance claims tracking with settlement stages | Completed |
| | `/insurance/settlements` | Claim settlement disbursement and deduction reconciliation | Completed |
| **Group K: Reports & Analytics** | `/reports` | Executive Business Intelligence hub with KPI trajectory charts | Completed |
| | `/reports/patients` | Patient demographic clusters, age cohorts, and ABHA ratios | Completed |
| | `/reports/opd` | Outpatient rush hours, queue velocity, and physician throughput | Completed |
| | `/reports/ipd` | Inpatient bed utilization, ALOS trends, and department stays | Completed |
| | `/reports/revenue` | Daily financial collection journals, tender modes, and discounts | Completed |
| | `/reports/occupancy` | Ward occupancy heatmaps, turnover velocity, housekeeping lags | Completed |
| | `/reports/discharge` | Planned vs emergency discharges, clearance lags, readmission rate | Completed |
| | `/reports/mis` | Consolidated NABH executive statement and quality board deck | Completed |
| | `/reports/gst` | GSTR-1 / GSTR-3B tax reports with HSN codes (5%, 12%, Exempt) | Completed |
| | `/reports/payouts` | Physician commission schedule with statutory Section 194J TDS | Completed |
| **Group L: Staff & Administration**| `/staff` | Hospital workforce directory with onboard modal & filters | Completed |
| | `/staff/doctors` | Consultant credentialing, MCI registration, and OPD fees | Completed |
| | `/staff/nurses` | Nursing stations, nurse-to-patient ratios, BLS/ACLS certificates | Completed |
| | `/staff/shifts` | 24x7 rotational shift rosters (Morning, Evening, Night) | Completed |
| | `/staff/attendance` | Biometric punch logs, check-in timestamps, and duration audit | Completed |
| | `/staff/leaves` | Leave applications with HR supervisor approval workflows | Completed |
| **Group M: Settings & Masters** | `/settings` | Settings hub linking all 19 configuration master categories | Completed |
| | `/settings/hospital` | Hospital legal entity profile, ROHINI, GSTIN, PAN, and NABH | Completed |
| | `/settings/branches` | Multi-campus network configuration and satellite clinics | Completed |
| | `/settings/departments` | Specialty departments master with clinical leadership links | Completed |
| | `/settings/services` | Service catalog master with standard and TPA tariff rates | Completed |
| | `/settings/packages` | Preventive wellness and surgical package pricing | Completed |
| | `/settings/surgeries` | Surgery master with duration, anesthesia type, and OT charges | Completed |
| | `/settings/rooms` | Ward and room categories with daily accommodation rates | Completed |
| | `/settings/beds` | Individual bed assets with MGPS oxygen pipeline tracking | Completed |
| | `/settings/roles` | **Interactive RBAC Permission Matrix** (View, Create, Edit, Delete, Approve, Export) | Completed |
| | `/settings/users` | Staff user provisioning with 2FA/MFA security controls | Completed |
| | `/settings/print-templates` | Hospital letterheads, watermarks, and ABDM QR codes | Completed |
| | `/settings/prescription-templates`| Preconfigured clinical Rx disease protocols | Completed |
| | `/settings/forms` | **Dynamic Clinical Form Builder** with drag/input types | Completed |
| | `/settings/fields` | Master data dictionary and FHIR/ABDM database constraints | Completed |
| | `/settings/vitals` | Physiological ranges and NEWS2 critical panic thresholds | Completed |
| | `/settings/notifications` | DLT SMS, WhatsApp Business API, and automated email rules | Completed |
| | `/settings/system-rules` | UHID prefixes, OPD validity windows, and discount policies | Completed |
| | `/settings/integrations` | ABDM (M1-M3), NHCX, ASTM/HL7 analyzers, and Razorpay | Completed |
| | `/settings/audit-logs` | Immutable audit trails for forensic, DISHA, and HIPAA compliance | Completed |

---

### 3. Reusable Component Architecture

1. **Layout Shell:**
   - `AppSidebar.tsx`: Multi-tier collapsible navigation with grouping, active highlight, role filtering, search, and mobile drawer.
   - `AppHeader.tsx`: Global search, multi-branch campus switcher, theme toggle (Light/Dark), notification drawer with unread counter, and user profile switcher.
   - `DashboardShell.tsx`: Standard page container wrapping main application content with breadcrumbs and padding.

2. **Common & Data Presentation:**
   - `PageHeader.tsx`: Consistent page header with breadcrumb navigation, title, descriptive summary, and slot for action buttons.
   - `StatCard.tsx`: Metric presentation card with trend indicators, color icons, and comparison badges.
   - `StatusBadge.tsx`: Harmonized status pill with thematic colors (Emerald, Blue, Amber, Rose, Purple, Slate).
   - `DataTable.tsx`: Full-featured data table supporting real-time search, sorting, multi-column rendering, pagination controls, and 1-click CSV export.

3. **Clinical & Financial Widgets:**
   - `DashboardCharts.tsx`: Responsive Recharts components (`PatientFlowChart`, `RevenueBarChart`, `DepartmentPieChart`).
   - `PatientTimeline`: Chronological visit and event tracker.
   - `VitalsCard`: Bedside physiological vital sign gauges with normal range validation.
   - `InvoicePreview`: NABH-compliant print-ready tax invoice preview.

---

### 4. Quality Assurance & Verification
- **Dual Theme Support:** Verified light and dark mode tokens across all surfaces using CSS variables (`--background`, `--foreground`, `--card`, `--border`, `--primary`, `--muted-foreground`).
- **Data Integrity:** Centralized mock data layer (`src/data/mockData.ts`) providing realistic Indian medical records with valid phone formatting, currency formatting in INR (`₹`), and UHID sequencing.
- **Export Capabilities:** Client-side CSV export functioning on all primary data tables.
- **Print Previews:** Window print CSS optimized for invoice, prescription, and lab report documents.
- **Route Completeness:** All 95+ routes resolve to rich, interactive frontend pages. Zero dead links.

---

### 5. Backend Integration Blueprint (Next Phase)
When connecting real backend infrastructure:
1. Replace `AuthProvider.tsx` state with NextAuth.js or JWT session cookie authentication against OAuth2/OIDC servers.
2. Connect `src/lib/axios.ts` to backend REST or GraphQL microservices (Spring Boot / NestJS / Go).
3. Connect ABDM gateway endpoints to the National Health Authority (NHA) sandbox bridge for live ABHA verification.
4. Hook PACS viewer to real Orthanc or dcm4chee DICOM web services (`WADO-RS`).
5. Hook laboratory analyzer results to HL7/ASTM engine over MLLP protocol.

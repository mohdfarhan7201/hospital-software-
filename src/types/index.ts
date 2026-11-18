export type UserRole =
  | "Super Admin"
  | "Hospital Admin"
  | "Doctor"
  | "Receptionist"
  | "Nurse"
  | "Accountant"
  | "Pharmacist"
  | "Lab Technician";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  photoUrl?: string;
  department?: string;
  branchId: string;
}

export interface Branch {
  id: string;
  name: string;
  code: string;
  city: string;
  isMain: boolean;
  address: string;
  contact: string;
}

export interface Patient {
  id: string;
  uhid: string;
  fullName: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  mobile: string;
  email?: string;
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
  registrationDate: string;
  lastVisitDate: string;
  status: "Active" | "Admitted" | "Discharged" | "Emergency";
  photoUrl?: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  guardian?: {
    name: string;
    relationship: string;
    mobile: string;
  };
  medicalSummary?: {
    allergies: string[];
    chronicConditions: string[];
    recentVitals?: {
      bloodPressure: string;
      pulseRate: number;
      temperature: number;
      spO2: number;
      recordedAt: string;
    };
  };
  insurance?: {
    provider: string;
    policyNumber: string;
    tpaName?: string;
    sumInsured: number;
    validTill: string;
  };
  abhaId?: string;
  clinicalEncounterHistory?: {
    id: string;
    date: string;
    title: string;
    doctorName: string;
    department: string;
    notes: string;
    type: "OPD" | "IPD" | "Diagnostic" | "Emergency" | "Surgery";
  }[];
  prescriptionsList?: {
    id: string;
    rxNumber: string;
    date: string;
    doctorName: string;
    department: string;
    validityDays: number;
    medicines: {
      name: string;
      genericName: string;
      dosage: string;
      duration: string;
      quantity: string;
      status: string;
    }[];
  }[];
  clinicalNotesList?: {
    id: string;
    date: string;
    doctorName: string;
    department: string;
    diagnosis: string;
    icd10: string;
    treatmentPlan: string;
  }[];
}

export interface Appointment {
  id: string;
  tokenNumber: string;
  patientId: string;
  uhid: string;
  patientName: string;
  patientMobile: string;
  patientAddress?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  } | string;
  doctorId: string;
  doctorName: string;
  department: string;
  appointmentDate: string;
  timeSlot: string;
  visitType: "New Visit" | "Follow-up" | "Emergency" | "Virtual Consultation";
  reason: string;
  status: "Confirmed" | "Checked In" | "In Consultation" | "Completed" | "Cancelled" | "Unconfirmed";
  priority: "Normal" | "Urgent" | "VIP";
  queueWaitingMins?: number;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  department: string;
  qualifications: string;
  experienceYears: number;
  availableDays: string[];
  opdRoom: string;
  consultationFee: number;
  phone: string;
  email: string;
  avatar?: string;
  photoUrl?: string;
  status: "Available" | "In OPD" | "In Surgery" | "On Leave";
}

export interface Bed {
  id: string;
  bedNumber: string;
  wardName: string;
  roomNumber: string;
  type: "General" | "Semi-Private" | "Private Suite" | "ICU" | "HDU" | "NICU";
  status: "Available" | "Occupied" | "Reserved" | "Cleaning" | "Maintenance";
  ratePerDay: number;
  patient?: {
    uhid: string;
    name: string;
    admissionDate: string;
    doctorName: string;
    diagnosis: string;
  };
}

export interface BillingInvoice {
  id: string;
  billNumber: string;
  uhid: string;
  patientName: string;
  patientMobile: string;
  billingDate: string;
  department: string;
  items: {
    description: string;
    category: "Consultation" | "Pharmacy" | "Investigation" | "Room Rent" | "Procedure";
    quantity: number;
    unitPrice: number;
    taxPercent: number;
    total: number;
  }[];
  subtotal: number;
  tax: number;
  discount: number;
  totalAmount: number;
  paidAmount: number;
  outstandingAmount: number;
  paymentMethod: "Cash" | "UPI" | "Credit Card" | "Insurance TPA" | "Net Banking";
  status: "Paid" | "Partially Paid" | "Pending" | "Refunded" | "Cancelled";
}

export interface Medicine {
  id: string;
  name: string;
  sku: string;
  genericName: string;
  category: "Antibiotics" | "Analgesics" | "Cardiovascular" | "Antidiabetic" | "Respiratory" | "Supplements";
  dosageForm: "Tablet" | "Syrup" | "Injection" | "Capsule" | "Ointment";
  batchNumber: string;
  manufacturer: string;
  expiryDate: string;
  purchasePrice: number;
  sellingPrice: number;
  stockQty: number;
  reorderLevel: number;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock" | "Expired";
}

export interface LabTest {
  id: string;
  code: string;
  name: string;
  category: "Biochemistry" | "Hematology" | "Microbiology" | "Pathology" | "Serology";
  price: number;
  tatHours: number;
  sampleType: "Blood" | "Urine" | "Serum" | "Swab" | "Tissue";
  normalRange: string;
  units: string;
}

export interface LabRequest {
  id: string;
  requestNumber: string;
  uhid: string;
  patientName: string;
  doctorName: string;
  requestDate: string;
  tests: string[];
  status: "Sample Pending" | "Sample Collected" | "Processing" | "Completed" | "Critical Alert";
  urgent: boolean;
}

export interface SurgeryRecord {
  id: string;
  surgeryNumber: string;
  uhid: string;
  patientName: string;
  surgeryName: string;
  otRoom: string;
  leadSurgeon: string;
  anesthetist: string;
  scheduledTime: string;
  durationMins: number;
  status: "Scheduled" | "Pre-Op Ready" | "In Progress" | "Completed" | "Post-Op Recovery";
}

export interface InsuranceClaim {
  id: string;
  claimId: string;
  uhid: string;
  patientName: string;
  insuranceCompany: string;
  tpaName: string;
  policyNumber: string;
  claimAmount: number;
  approvedAmount?: number;
  status: "Pre-Auth Submitted" | "Query Raised" | "Approved" | "Settled" | "Rejected";
  submissionDate: string;
}

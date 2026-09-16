export type UserRole = 'doctor' | 'receptionist' | 'patient';

export type NavItem = 
  | 'dashboard'
  | 'appointments'
  | 'waiting-room'
  | 'patients'
  | 'doctors'
  | 'availability'
  | 'calendar'
  | 'billing'
  | 'calls'
  | 'reports'
  | 'portfolio'
  | 'records'
  | 'assistant'
  | 'treatment-plans'
  | 'follow-ups'
  | 'messages'
  | 'analytics'
  | 'settings';

export type AppointmentStatus = 
  | 'confirmed'
  | 'waiting' 
  | 'in-progress' 
  | 'in-consultation' 
  | 'scheduled' 
  | 'completed' 
  | 'cancelled' 
  | 'rescheduled' 
  | 'no-show';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  avatar: string;
  phone: string;
  email: string;
  assignedBD?: string;
  bdStatus?: 'Follow-up Required' | 'Contacted' | 'Converted';
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  stats: {
    totalVisits: number;
    lastTreatment: string;
    lastTreatmentDate: string;
    upcomingAppointment?: string;
    pendingFollowUp: boolean;
  };
  medicalOverview: {
    allergies: string[];
    medicalHistory: string[];
    currentMedications: string[];
    importantNotes: string;
  };
  dentalHistory: Array<{
    id: string;
    year: string;
    date: string;
    treatment: string;
    toothNumber?: string;
    doctor: string;
    notes: string;
  }>;
  aiSummary: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientAvatar: string;
  patientPhone?: string;
  doctorId?: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  reason: string;
  tooth?: string;
  isPreviousPatient: boolean;
  previousVisitSummary?: string;
  aiSummary: string;
  room?: string;
  estimatedDuration: string;
  paymentStatus?: 'Paid' | 'Pending' | 'Partially Paid';
  confirmationStatus?: 'confirmed' | 'pending' | 'reminder-sent';
  waitingSince?: string;
  waitingMinutes?: number;
  trafficInfo?: {
    distance: string;
    duration: string;
    status: 'Light' | 'Moderate' | 'Heavy';
    recommendedDeparture: string;
  };
}

export interface ClinicalNoteDraft {
  patientId: string;
  patientName: string;
  appointmentId: string;
  date: string;
  chiefComplaint: string;
  symptoms: string[];
  clinicalObservations: string;
  diagnosis: string;
  toothNumber: string;
  treatmentPlan: string;
  prescription: Array<{
    medicine: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }>;
  followUpRecommendation: string;
  followUpDays: number;
  isApproved: boolean;
  approvedAt?: string;
  doctorSignature?: string;
  rawVoiceTranscript: string;
}

export interface ReportItem {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  procedure: string;
  clinicalFindings: string;
  radiographicEvaluation: string;
  diagnosis: string;
  recommendedTreatment: string;
  patientFriendlyExplanations: {
    en: string;
    hi: string;
    mr: string;
    es: string;
  };
}

export interface TreatmentPlan {
  id: string;
  patientId: string;
  patientName: string;
  title: string;
  toothNumber?: string;
  overallStatus: 'In Progress' | 'Completed' | 'Pending Review';
  estimatedCost: number;
  insuranceCovered: number;
  outOfPocket: number;
  expectedDuration: string;
  appointmentsRequired: number;
  stages: Array<{
    number: number;
    title: string;
    description: string;
    status: 'Completed' | 'Upcoming' | 'Pending';
    scheduledDate?: string;
    cost: number;
  }>;
}

export interface FollowUpItem {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  treatment: string;
  followUpDate: string;
  tabCategory: 'due_today' | 'upcoming' | 'completed' | 'no_response';
  status: 'Awaiting response' | 'Check-in sent' | 'Patient responded' | 'Call required' | 'Completed';
  lastResponse?: string;
  sentiment?: 'good' | 'neutral' | 'problem';
  checkInHistory: Array<{
    timestamp: string;
    type: 'automated_sms' | 'whatsapp' | 'call' | 'patient_reply';
    message: string;
  }>;
}

export interface BillingInvoice {
  id: string;
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  date: string;
  treatment: string;
  items: Array<{
    code: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paid: number;
  pending: number;
  paymentMethod: 'Credit Card' | 'Debit Card' | 'Insurance' | 'UPI / Cash' | 'Pending';
  status: 'Paid' | 'Partially Paid' | 'Unpaid';
}

export interface ClinicMessage {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  category: 'appointment' | 'reminder' | 'followup' | 'treatment' | 'billing' | 'patient_message';
  content: string;
  timestamp: string;
  status: 'Sent' | 'Delivered' | 'Read' | 'Responded';
  sender: 'Clinic AI' | 'Dr. Priya Mehta' | 'Reception' | 'Patient';
}

export type VoiceState = 'idle' | 'listening' | 'processing' | 'responding' | 'completed';

export interface DoctorSlot {
  time: string;
  isAvailable: boolean;
  appointmentId?: string;
  patientName?: string;
  treatment?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualifications: string;
  avatar: string;
  phone: string;
  email: string;
  room: string;
  rating: number;
  reviewsCount: string;
  patientsCount: string;
  experienceYears: number;
  status: 'available' | 'in-consultation' | 'on-break';
  todayAppointmentsCount: number;
  nextAvailableSlot: string;
  treatments: string[];
  slots: DoctorSlot[];
}

export interface CallLogItem {
  id: string;
  patientId: string;
  patientName: string;
  phone: string;
  timestamp: string;
  duration: string;
  outcome: 'Completed' | 'No Answer' | 'Busy' | 'Reschedule Requested' | 'Voicemail';
  notes: string;
  appointmentContext?: string;
}

export interface ClinicNotification {
  id: string;
  type: 'appointment' | 'cancellation' | 'rescheduled' | 'doctor' | 'reminder' | 'payment';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  linkNav?: NavItem;
  patientName?: string;
}

export type CallStatus = 'Not Called' | 'Called' | 'No Answer' | 'Confirmed' | 'Call Back';

export interface UpcomingCallItem {
  id: string;
  patientId: string;
  patientName: string;
  patientAvatar: string;
  phone: string;
  appointmentTime: string;
  scheduledTime?: string;
  doctorName: string;
  treatment: string;
  reason?: string;
  callStatus: CallStatus;
  status?: CallStatus;
  priority?: 'normal' | 'high';
  notes?: string;
  lastCalledAt?: string;
}

export interface TreatmentService {
  id: string;
  name: string;
  defaultPrice: number;
  specialty: string;
  duration: string;
  icon: string;
  popular?: boolean;
}

export const DENTAL_TREATMENTS: TreatmentService[] = [
  { id: 'root-canal', name: 'Root Canal Treatment', defaultPrice: 5000, specialty: 'Endodontics', duration: '45 mins', icon: '⚡', popular: true },
  { id: 'tooth-filling', name: 'Tooth Filing (Composite)', defaultPrice: 1500, specialty: 'General Dentistry', duration: '30 mins', icon: '🦷', popular: true },
  { id: 'routine-scaling', name: 'Routine Scaling & Cleaning', defaultPrice: 1000, specialty: 'Preventive Dentistry', duration: '30 mins', icon: '🧼', popular: true },
  { id: 'dental-implant', name: 'Dental Implants', defaultPrice: 25000, specialty: 'Oral Surgery & Implants', duration: '60 mins', icon: '🔩', popular: true },
  { id: 'braces', name: 'Braces & Aligners', defaultPrice: 35000, specialty: 'Orthodontics', duration: '45 mins', icon: '✨', popular: true },
  { id: 'crown-placement', name: 'Crown Placement (Zirconia)', defaultPrice: 8000, specialty: 'Prosthodontics', duration: '45 mins', icon: '👑' },
  { id: 'teeth-whitening', name: 'Teeth Whitening (In-Office)', defaultPrice: 4000, specialty: 'Aesthetic Dentistry', duration: '45 mins', icon: '💎' },
  { id: 'tooth-extraction', name: 'Tooth Extraction (Surgical)', defaultPrice: 1200, specialty: 'Oral Surgery & Implants', duration: '30 mins', icon: '🩹' }
];


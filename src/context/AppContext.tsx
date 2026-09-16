import React, { createContext, useContext, useState } from 'react';
import { 
  UserRole, 
  NavItem, 
  Patient, 
  Appointment, 
  AppointmentStatus, 
  ClinicalNoteDraft, 
  ReportItem, 
  TreatmentPlan, 
  FollowUpItem, 
  BillingInvoice, 
  ClinicMessage,
  Doctor,
  CallLogItem,
  ClinicNotification,
  UpcomingCallItem,
  CallStatus
} from '../types';
import { 
  INITIAL_PATIENTS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_CLINICAL_NOTE, 
  INITIAL_REPORTS, 
  INITIAL_TREATMENT_PLANS, 
  INITIAL_FOLLOW_UPS, 
  INITIAL_INVOICES, 
  INITIAL_MESSAGES,
  INITIAL_DOCTORS,
  INITIAL_CALL_LOGS,
  INITIAL_NOTIFICATIONS,
  INITIAL_UPCOMING_CALLS
} from '../data/mockData';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export interface ActiveCallInfo {
  name: string;
  phone: string;
  avatar?: string;
  treatment?: string;
  time?: string;
  patientId?: string;
  appointmentId?: string;
}

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentNav: NavItem;
  setCurrentNav: (nav: NavItem) => void;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  
  // Patients
  patients: Patient[];
  selectedPatientId: string;
  setSelectedPatientId: (id: string) => void;
  selectedPatient: Patient;
  addPatient: (data: Partial<Patient>) => Patient;
  
  // Appointments
  appointments: Appointment[];
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  addAppointment: (appointment: Partial<Appointment>) => void;
  checkInPatient: (id: string) => void;
  notifyDoctor: (id: string, doctorName: string, patientName: string) => void;
  rescheduleAppointment: (id: string, newDate: string, newTime: string, newDoctor?: string) => void;
  cancelAppointment: (id: string, reason?: string) => void;
  sendPatientReminder: (id: string, channel: 'sms' | 'whatsapp') => void;

  // Doctors
  doctors: Doctor[];
  updateDoctorStatus: (id: string, status: Doctor['status']) => void;

  // Billing & Payments
  invoices: BillingInvoice[];
  createBill: (invoiceData: Partial<BillingInvoice>) => BillingInvoice;
  collectPayment: (invoiceId: string, amount: number, method: BillingInvoice['paymentMethod']) => void;

  // Communications & Calls
  callLogs: CallLogItem[];
  logCall: (data: Partial<CallLogItem>) => void;
  upcomingCalls: UpcomingCallItem[];
  updateUpcomingCallStatus: (callId: string, status: CallStatus, notes?: string) => void;
  isCallModalOpen: boolean;
  activeCallPatient: ActiveCallInfo | null;
  startCall: (patientInfo: ActiveCallInfo) => void;
  endCall: () => void;

  // BD Assigner
  assignBDToPatient: (patientId: string, bdName: string, status?: 'Follow-up Required' | 'Contacted' | 'Converted') => void;


  // Notifications
  notifications: ClinicNotification[];
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Global Dialogs & Modals
  isScheduleModalOpen: boolean;
  scheduleModalPrefill: Partial<Appointment> | null;
  openScheduleModal: (prefill?: Partial<Appointment>) => void;
  closeScheduleModal: () => void;

  isRescheduleModalOpen: boolean;
  activeRescheduleAppointment: Appointment | null;
  openRescheduleModal: (apt: Appointment) => void;
  closeRescheduleModal: () => void;

  isAddPatientModalOpen: boolean;
  openAddPatientModal: (onSuccessBook?: boolean) => void;
  closeAddPatientModal: () => void;
  addPatientBookCallback: boolean;

  isCreateBillModalOpen: boolean;
  billModalPrefill: { patientName?: string; treatment?: string; doctorName?: string; patientId?: string } | null;
  openCreateBillModal: (prefill?: { patientName?: string; treatment?: string; doctorName?: string; patientId?: string }) => void;
  closeCreateBillModal: () => void;

  isGlobalSearchOpen: boolean;
  openGlobalSearch: () => void;
  closeGlobalSearch: () => void;

  // Other systems
  clinicalNote: ClinicalNoteDraft;
  updateClinicalNote: (updates: Partial<ClinicalNoteDraft>) => void;
  approveClinicalNote: () => void;
  reports: ReportItem[];
  treatmentPlans: TreatmentPlan[];
  followUps: FollowUpItem[];
  sendFollowUpCheckIn: (followUpId: string) => void;
  recordPatientCheckInResponse: (followUpId: string, feeling: 'better' | 'same' | 'problem', notes?: string) => void;
  messages: ClinicMessage[];
  sendMessage: (patientId: string, content: string, category: ClinicMessage['category']) => void;
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  isGlobalVoiceModalOpen: boolean;
  openVoiceModal: () => void;
  closeVoiceModal: () => void;
  executeVoiceAction: (command: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default role to 'receptionist' for front desk workflow
  const [userRole, setUserRole] = useState<UserRole>('receptionist');
  const [currentNav, setCurrentNav] = useState<NavItem>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  // Entities
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('P-1001');
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [doctors, setDoctors] = useState<Doctor[]>(INITIAL_DOCTORS);
  const [invoices, setInvoices] = useState<BillingInvoice[]>(INITIAL_INVOICES);
  const [callLogs, setCallLogs] = useState<CallLogItem[]>(INITIAL_CALL_LOGS);
  const [notifications, setNotifications] = useState<ClinicNotification[]>(INITIAL_NOTIFICATIONS);
  const [messages, setMessages] = useState<ClinicMessage[]>(INITIAL_MESSAGES);
  const [clinicalNote, setClinicalNote] = useState<ClinicalNoteDraft>(INITIAL_CLINICAL_NOTE);
  const [reports] = useState<ReportItem[]>(INITIAL_REPORTS);
  const [treatmentPlans] = useState<TreatmentPlan[]>(INITIAL_TREATMENT_PLANS);
  const [followUps, setFollowUps] = useState<FollowUpItem[]>(INITIAL_FOLLOW_UPS);
  const [upcomingCalls, setUpcomingCalls] = useState<UpcomingCallItem[]>(INITIAL_UPCOMING_CALLS);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Modals
  const [isCallModalOpen, setIsCallModalOpen] = useState<boolean>(false);
  const [activeCallPatient, setActiveCallPatient] = useState<ActiveCallInfo | null>(null);

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState<boolean>(false);
  const [scheduleModalPrefill, setScheduleModalPrefill] = useState<Partial<Appointment> | null>(null);

  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState<boolean>(false);
  const [activeRescheduleAppointment, setActiveRescheduleAppointment] = useState<Appointment | null>(null);

  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState<boolean>(false);
  const [addPatientBookCallback, setAddPatientBookCallback] = useState<boolean>(false);

  const [isCreateBillModalOpen, setIsCreateBillModalOpen] = useState<boolean>(false);
  const [billModalPrefill, setBillModalPrefill] = useState<{ patientName?: string; treatment?: string; doctorName?: string; patientId?: string } | null>(null);

  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState<boolean>(false);
  const [isGlobalVoiceModalOpen, setIsGlobalVoiceModalOpen] = useState<boolean>(false);

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleSidebar = () => setIsSidebarCollapsed(prev => !prev);

  // Patient Actions
  const addPatient = (data: Partial<Patient>): Patient => {
    const newId = `P-${1000 + patients.length + 1}`;
    const newPatient: Patient = {
      id: newId,
      name: data.name || 'New Patient',
      age: data.age || 30,
      gender: data.gender || 'Female',
      avatar: data.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
      phone: data.phone || '+91 98000 00000',
      email: data.email || 'patient@example.com',
      emergencyContact: data.emergencyContact || {
        name: 'Family Contact',
        relationship: 'Relation',
        phone: '+91 98000 00000'
      },
      stats: {
        totalVisits: 1,
        lastTreatment: data.dentalHistory?.[0]?.treatment || 'Registration',
        lastTreatmentDate: 'Sep 13, 2026',
        pendingFollowUp: false
      },
      medicalOverview: data.medicalOverview || {
        allergies: [],
        medicalHistory: [],
        currentMedications: [],
        importantNotes: ''
      },
      dentalHistory: data.dentalHistory || [],
      aiSummary: 'New patient registered today at front desk.'
    };

    setPatients(prev => [newPatient, ...prev]);
    setSelectedPatientId(newId);
    showToast(`Patient "${newPatient.name}" registered successfully.`, 'success');
    return newPatient;
  };

  const assignBDToPatient = (patientId: string, bdName: string, status: 'Follow-up Required' | 'Contacted' | 'Converted' = 'Follow-up Required') => {
    setPatients(prev => prev.map(p => p.id === patientId ? { ...p, assignedBD: bdName, bdStatus: status } : p));
    showToast(`Assigned BD "${bdName}" to patient.`, 'success');
  };

  const updateUpcomingCallStatus = (callId: string, status: CallStatus, notes?: string) => {
    setUpcomingCalls(prev => prev.map(c => c.id === callId ? { 
      ...c, 
      callStatus: status, 
      ...(notes ? { notes } : {}), 
      lastCalledAt: 'Just now' 
    } : c));
    showToast(`Call status updated to "${status}".`, 'info');
  };

  // Appointment Actions
  const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    showToast(`Appointment status updated to "${status}".`, 'success');
  };

  const addAppointment = (newAptData: Partial<Appointment>) => {
    const newApt: Appointment = {
      id: `APT-${Date.now().toString().slice(-4)}`,
      patientId: newAptData.patientId || selectedPatient.id,
      patientName: newAptData.patientName || selectedPatient.name,
      patientAvatar: newAptData.patientAvatar || selectedPatient.avatar,
      patientPhone: newAptData.patientPhone || selectedPatient.phone,
      doctorId: newAptData.doctorId || 'DOC-1',
      doctorName: newAptData.doctorName || 'Dr. Sarah Johnson',
      doctorSpecialty: newAptData.doctorSpecialty || 'Tooth Filing & Orthodontics',
      date: newAptData.date || '2026-09-13',
      time: newAptData.time || '03:00 PM',
      status: newAptData.status || 'confirmed',
      reason: newAptData.reason || 'General Dental Consultation',
      tooth: newAptData.tooth,
      isPreviousPatient: true,
      aiSummary: `Booked for ${newAptData.reason || 'Consultation'} with ${newAptData.doctorName || 'Dr. Sarah Johnson'}`,
      room: newAptData.room || 'Operatory 1',
      estimatedDuration: newAptData.estimatedDuration || '30 mins',
      paymentStatus: 'Pending',
      confirmationStatus: 'confirmed',
      ...newAptData
    };

    setAppointments(prev => [newApt, ...prev]);
    
    // Add notification
    const newNotif: ClinicNotification = {
      id: `NOTIF-${Date.now()}`,
      type: 'appointment',
      title: 'New Appointment Booked',
      message: `${newApt.patientName} scheduled with ${newApt.doctorName} for ${newApt.date} at ${newApt.time}.`,
      timestamp: 'Just now',
      read: false,
      linkNav: 'appointments',
      patientName: newApt.patientName
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast(`Appointment booked for ${newApt.patientName} on ${newApt.time}`, 'success');
  };

  const checkInPatient = (id: string) => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAppointments(prev => prev.map(a => {
      if (a.id === id) {
        return {
          ...a,
          status: 'waiting',
          waitingSince: nowTime,
          waitingMinutes: 1
        };
      }
      return a;
    }));

    const apt = appointments.find(a => a.id === id);
    if (apt) {
      showToast(`${apt.patientName} checked in. Moved to Waiting Room.`, 'success');
      const notif: ClinicNotification = {
        id: `NOTIF-${Date.now()}`,
        type: 'appointment',
        title: 'Patient Checked In',
        message: `${apt.patientName} has arrived and is waiting in reception for ${apt.doctorName}.`,
        timestamp: 'Just now',
        read: false,
        linkNav: 'waiting-room',
        patientName: apt.patientName
      };
      setNotifications(prev => [notif, ...prev]);
    }
  };

  const notifyDoctor = (id: string, doctorName: string, patientName: string) => {
    showToast(`Intercom Alert sent to ${doctorName}: "${patientName} is ready in waiting room."`, 'info');
    const notif: ClinicNotification = {
      id: `NOTIF-${Date.now()}`,
      type: 'doctor',
      title: 'Doctor Intercom Alert',
      message: `Notified ${doctorName} that patient ${patientName} is seated and prepped.`,
      timestamp: 'Just now',
      read: false,
      linkNav: 'waiting-room'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const rescheduleAppointment = (id: string, newDate: string, newTime: string, newDoctor?: string) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === id) {
        return {
          ...a,
          date: newDate,
          time: newTime,
          doctorName: newDoctor || a.doctorName,
          status: 'rescheduled',
          confirmationStatus: 'confirmed'
        };
      }
      return a;
    }));

    const apt = appointments.find(a => a.id === id);
    showToast(`Appointment rescheduled to ${newDate} at ${newTime}.`, 'success');

    const notif: ClinicNotification = {
      id: `NOTIF-${Date.now()}`,
      type: 'rescheduled',
      title: 'Appointment Rescheduled',
      message: `${apt?.patientName || 'Patient'} rescheduled to ${newDate} at ${newTime}.`,
      timestamp: 'Just now',
      read: false,
      linkNav: 'appointments'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const cancelAppointment = (id: string, reason?: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelled' } : a));
    const apt = appointments.find(a => a.id === id);
    showToast(`Appointment for ${apt?.patientName || 'Patient'} cancelled.`, 'info');

    const notif: ClinicNotification = {
      id: `NOTIF-${Date.now()}`,
      type: 'cancellation',
      title: 'Appointment Cancelled',
      message: `Appointment for ${apt?.patientName || 'Patient'} on ${apt?.time} was cancelled. ${reason ? `Reason: ${reason}` : ''}`,
      timestamp: 'Just now',
      read: false,
      linkNav: 'appointments'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const sendPatientReminder = (id: string, channel: 'sms' | 'whatsapp') => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, confirmationStatus: 'reminder-sent' } : a));
    const apt = appointments.find(a => a.id === id);
    showToast(`Reminder dispatched via ${channel.toUpperCase()} to ${apt?.patientName || 'Patient'}.`, 'success');

    const newMsg: ClinicMessage = {
      id: `MSG-${Date.now()}`,
      patientId: apt?.patientId || 'P-1001',
      patientName: apt?.patientName || 'Patient',
      patientPhone: apt?.patientPhone || '+91 98000 00000',
      category: 'reminder',
      content: `SmileCare Reminder: Hi ${apt?.patientName}, your appointment is on ${apt?.date} at ${apt?.time} with ${apt?.doctorName}. Reply 1 to Confirm.`,
      timestamp: 'Just now',
      status: 'Sent',
      sender: 'Reception'
    };
    setMessages(prev => [newMsg, ...prev]);
  };

  // Doctor Actions
  const updateDoctorStatus = (id: string, status: Doctor['status']) => {
    setDoctors(prev => prev.map(d => d.id === id ? { ...d, status } : d));
    const doc = doctors.find(d => d.id === id);
    showToast(`${doc?.name || 'Doctor'} status set to "${status}".`, 'info');
  };

  // Billing Actions
  const createBill = (invoiceData: Partial<BillingInvoice>): BillingInvoice => {
    const invNumber = `SMC-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newInv: BillingInvoice = {
      id: `INV-${Date.now()}`,
      invoiceNumber: invNumber,
      patientId: invoiceData.patientId || selectedPatient.id,
      patientName: invoiceData.patientName || selectedPatient.name,
      date: invoiceData.date || 'Sep 13, 2026',
      treatment: invoiceData.treatment || 'Dental Procedure',
      items: invoiceData.items || [
        {
          code: 'D2391',
          description: invoiceData.treatment || 'Dental Treatment',
          quantity: 1,
          unitPrice: invoiceData.subtotal || 3000,
          total: invoiceData.subtotal || 3000
        }
      ],
      subtotal: invoiceData.subtotal || 3000,
      discount: invoiceData.discount || 0,
      tax: invoiceData.tax || 0,
      total: invoiceData.total || 3000,
      paid: invoiceData.paid || 0,
      pending: (invoiceData.total || 3000) - (invoiceData.paid || 0),
      paymentMethod: invoiceData.paymentMethod || 'Pending',
      status: (invoiceData.paid || 0) >= (invoiceData.total || 3000)
        ? 'Paid'
        : (invoiceData.paid || 0) > 0
        ? 'Partially Paid'
        : 'Unpaid'
    };

    setInvoices(prev => [newInv, ...prev]);
    showToast(`Invoice ${invNumber} generated for ₹${newInv.total.toLocaleString()}`, 'success');
    return newInv;
  };

  const collectPayment = (invoiceId: string, amount: number, method: BillingInvoice['paymentMethod']) => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === invoiceId || inv.invoiceNumber === invoiceId) {
        const newPaid = inv.paid + amount;
        const newPending = Math.max(0, inv.total - newPaid);
        const newStatus = newPending === 0 ? 'Paid' : 'Partially Paid';
        return {
          ...inv,
          paid: newPaid,
          pending: newPending,
          status: newStatus,
          paymentMethod: method
        };
      }
      return inv;
    }));

    showToast(`Payment of ₹${amount.toLocaleString()} recorded via ${method}. Receipt generated.`, 'success');
  };

  // Telephony & Call logs
  const startCall = (patientInfo: ActiveCallInfo) => {
    setActiveCallPatient(patientInfo);
    setIsCallModalOpen(true);
  };

  const endCall = () => {
    setIsCallModalOpen(false);
    setActiveCallPatient(null);
  };

  const logCall = (data: Partial<CallLogItem>) => {
    const newLog: CallLogItem = {
      id: `CALL-${Date.now().toString().slice(-4)}`,
      patientId: data.patientId || activeCallPatient?.patientId || 'P-1001',
      patientName: data.patientName || activeCallPatient?.name || 'Patient',
      phone: data.phone || activeCallPatient?.phone || '+91 98000 00000',
      timestamp: 'Just now',
      duration: data.duration || '01:12',
      outcome: data.outcome || 'Completed',
      notes: data.notes || 'Front desk follow-up call.',
      appointmentContext: data.appointmentContext || activeCallPatient?.treatment || 'General Checkup'
    };

    setCallLogs(prev => [newLog, ...prev]);
    showToast(`Call logged: ${newLog.outcome} for ${newLog.patientName}`, 'info');
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  // Modal Triggers
  const openScheduleModal = (prefill?: Partial<Appointment>) => {
    setScheduleModalPrefill(prefill || null);
    setIsScheduleModalOpen(true);
  };
  const closeScheduleModal = () => {
    setIsScheduleModalOpen(false);
    setScheduleModalPrefill(null);
  };

  const openRescheduleModal = (apt: Appointment) => {
    setActiveRescheduleAppointment(apt);
    setIsRescheduleModalOpen(true);
  };
  const closeRescheduleModal = () => {
    setIsRescheduleModalOpen(false);
    setActiveRescheduleAppointment(null);
  };

  const openAddPatientModal = (onSuccessBook = false) => {
    setAddPatientBookCallback(onSuccessBook);
    setIsAddPatientModalOpen(true);
  };
  const closeAddPatientModal = () => {
    setIsAddPatientModalOpen(false);
    setAddPatientBookCallback(false);
  };

  const openCreateBillModal = (prefill?: { patientName?: string; treatment?: string; doctorName?: string; patientId?: string }) => {
    setBillModalPrefill(prefill || null);
    setIsCreateBillModalOpen(true);
  };
  const closeCreateBillModal = () => {
    setIsCreateBillModalOpen(false);
    setBillModalPrefill(null);
  };

  const openGlobalSearch = () => setIsGlobalSearchOpen(true);
  const closeGlobalSearch = () => setIsGlobalSearchOpen(false);

  // Other systems preservation
  const updateClinicalNote = (updates: Partial<ClinicalNoteDraft>) => {
    setClinicalNote(prev => ({ ...prev, ...updates }));
  };

  const approveClinicalNote = () => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setClinicalNote(prev => ({
      ...prev,
      isApproved: true,
      approvedAt: now,
      doctorSignature: 'Dr. Priya Mehta, MDS'
    }));
    showToast('Clinical record approved and securely saved to Patient EHR.', 'success');
  };

  const sendFollowUpCheckIn = (followUpId: string) => {
    setFollowUps(prev => prev.map(fu => {
      if (fu.id === followUpId) {
        return {
          ...fu,
          status: 'Check-in sent',
          lastResponse: 'Automated SMS & WhatsApp check-in dispatched just now.',
          checkInHistory: [
            ...fu.checkInHistory,
            {
              timestamp: 'Just now',
              type: 'automated_sms',
              message: `Hi ${fu.patientName}, checking in from SmileCare Dental Clinic. How are you feeling post-treatment?`
            }
          ]
        };
      }
      return fu;
    }));
    showToast('Follow-up check-in dispatched via automated SMS & WhatsApp', 'success');
  };

  const recordPatientCheckInResponse = (followUpId: string, feeling: 'better' | 'same' | 'problem', notes?: string) => {
    setFollowUps(prev => prev.map(fu => {
      if (fu.id === followUpId) {
        const sentimentMap = { better: 'good', same: 'neutral', problem: 'problem' } as const;
        const statusMap = {
          better: 'Patient responded' as const,
          same: 'Patient responded' as const,
          problem: 'Call required' as const
        };
        const summary = feeling === 'better' 
          ? 'Patient reports feeling much better. Pain well managed.'
          : feeling === 'same'
          ? 'Patient reports pain is about the same. Continuing medications.'
          : `Patient reports experiencing issues: "${notes || 'Severe sensitivity / swelling'}". Flagged for urgent doctor review.`;

        return {
          ...fu,
          status: statusMap[feeling],
          sentiment: sentimentMap[feeling],
          lastResponse: summary,
          checkInHistory: [
            ...fu.checkInHistory,
            {
              timestamp: 'Just now',
              type: 'patient_reply',
              message: summary
            }
          ]
        };
      }
      return fu;
    }));

    if (feeling === 'problem') {
      showToast('Patient response flagged: Clinic team alerted for urgent triage.', 'warning');
    } else {
      showToast('Patient check-in response recorded successfully.', 'success');
    }
  };

  const sendMessage = (patientId: string, content: string, category: ClinicMessage['category']) => {
    const pat = patients.find(p => p.id === patientId) || patients[0];
    const newMsg: ClinicMessage = {
      id: `MSG-${Date.now()}`,
      patientId: pat.id,
      patientName: pat.name,
      patientPhone: pat.phone,
      category,
      content,
      timestamp: 'Just now',
      status: 'Delivered',
      sender: userRole === 'doctor' ? 'Dr. Priya Mehta' : 'Reception'
    };
    setMessages(prev => [newMsg, ...prev]);
    showToast('Message sent to patient', 'success');
  };

  const openVoiceModal = () => setIsGlobalVoiceModalOpen(true);
  const closeVoiceModal = () => setIsGlobalVoiceModalOpen(false);

  const executeVoiceAction = (command: string) => {
    const lower = command.toLowerCase();
    if (lower.includes("waiting") || lower.includes("lobby")) {
      setCurrentNav('waiting-room');
      showToast("Voice AI: Opened Waiting Room Lobby", 'info');
    } else if (lower.includes("today's patient") || lower.includes("show patient") || lower.includes("appointment")) {
      setCurrentNav('appointments');
      showToast("Voice AI: Opened Appointments queue", 'info');
    } else if (lower.includes("doctor") || lower.includes("availability")) {
      setCurrentNav('availability');
      showToast("Voice AI: Opened Doctor Availability Finder", 'info');
    } else if (lower.includes("billing") || lower.includes("invoice") || lower.includes("payment")) {
      setCurrentNav('billing');
      showToast("Voice AI: Navigated to Clinic Billing", 'info');
    } else if (lower.includes("patient")) {
      setCurrentNav('patients');
      showToast("Voice AI: Navigated to Patient Management", 'info');
    } else {
      setCurrentNav('dashboard');
      showToast(`Voice AI understood: "${command}". Opened Dashboard.`, 'success');
    }
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        currentNav,
        setCurrentNav,
        isSidebarCollapsed,
        toggleSidebar,

        // Patients
        patients,
        selectedPatientId,
        setSelectedPatientId,
        selectedPatient,
        addPatient,

        // Appointments
        appointments,
        updateAppointmentStatus,
        addAppointment,
        checkInPatient,
        notifyDoctor,
        rescheduleAppointment,
        cancelAppointment,
        sendPatientReminder,

        // Doctors
        doctors,
        updateDoctorStatus,

        // Billing
        invoices,
        createBill,
        collectPayment,

        // Telephony & Communication
        callLogs,
        logCall,
        upcomingCalls,
        updateUpcomingCallStatus,
        isCallModalOpen,
        activeCallPatient,
        startCall,
        endCall,

        // BD Assigner
        assignBDToPatient,


        // Notifications
        notifications,
        markNotificationRead,
        clearAllNotifications,

        // Modals
        isScheduleModalOpen,
        scheduleModalPrefill,
        openScheduleModal,
        closeScheduleModal,
        isRescheduleModalOpen,
        activeRescheduleAppointment,
        openRescheduleModal,
        closeRescheduleModal,
        isAddPatientModalOpen,
        openAddPatientModal,
        closeAddPatientModal,
        addPatientBookCallback,
        isCreateBillModalOpen,
        billModalPrefill,
        openCreateBillModal,
        closeCreateBillModal,
        isGlobalSearchOpen,
        openGlobalSearch,
        closeGlobalSearch,

        // Clinical / EHR
        clinicalNote,
        updateClinicalNote,
        approveClinicalNote,
        reports,
        treatmentPlans,
        followUps,
        sendFollowUpCheckIn,
        recordPatientCheckInResponse,
        messages,
        sendMessage,
        toasts,
        showToast,
        removeToast,
        isGlobalVoiceModalOpen,
        openVoiceModal,
        closeVoiceModal,
        executeVoiceAction
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

import { 
  Patient, 
  Appointment, 
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
  AuthUser,
  Prescription,
  MedicalNote,
  DentalTreatmentRecord
} from '../types';

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'P-1001',
    name: 'Rahul Sharma',
    age: 32,
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    phone: '+91 98201 44521',
    email: 'rahul.sharma@example.com',
    emergencyContact: {
      name: 'Sunita Sharma',
      relationship: 'Spouse',
      phone: '+91 98201 44599'
    },
    stats: {
      totalVisits: 4,
      lastTreatment: 'Composite Restoration #19',
      lastTreatmentDate: 'May 14, 2025',
      upcomingAppointment: 'Today, 10:00 AM',
      pendingFollowUp: true
    },
    medicalOverview: {
      allergies: ['Amoxicillin / Penicillin Group (Mild Rash)', 'Latex (Mild Contact)'],
      medicalHistory: ['Mild seasonal asthma', 'No cardiovascular history', 'Normal blood pressure (120/80)'],
      currentMedications: ['Montelukast 10mg (as needed for allergies)'],
      importantNotes: 'High dental anxiety during drilling. Prefers topical numbing gel prior to local anesthetic injection.'
    },
    dentalHistory: [
      {
        id: 'DH-1',
        year: '2026',
        date: 'Sep 12, 2026',
        treatment: 'Consultation & X-Ray (Periapical #30)',
        toothNumber: '#30',
        doctor: 'Dr. Priya Mehta',
        notes: 'Deep decay reaching pulp chamber. Recommended Root Canal Therapy.'
      },
      {
        id: 'DH-2',
        year: '2025',
        date: 'May 14, 2025',
        treatment: 'Composite Resin Filling',
        toothNumber: '#19',
        doctor: 'Dr. Priya Mehta',
        notes: 'Occlusal composite restoration completed under rubber dam isolation.'
      },
      {
        id: 'DH-3',
        year: '2025',
        date: 'Jan 10, 2025',
        treatment: 'Ultrasonic Scaling & Polishing',
        doctor: 'Dr. Rajesh Rao',
        notes: 'Mild supragingival calculus removed. Gingival health good.'
      },
      {
        id: 'DH-4',
        year: '2024',
        date: 'Aug 22, 2024',
        treatment: 'Routine Dental Examination',
        doctor: 'Dr. Priya Mehta',
        notes: 'Initial comprehensive charting and bitewing radiographs.'
      }
    ],
    aiSummary: 'Lower-right molar pain for 3 days. Previous filling 1 year ago. Patient exhibits mild dental anxiety; penicillin allergy flagged.'
  },
  {
    id: 'P-1002',
    name: 'Priya Kapoor',
    age: 28,
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    phone: '+91 97690 12345',
    email: 'priya.k@example.com',
    emergencyContact: {
      name: 'Rohan Kapoor',
      relationship: 'Brother',
      phone: '+91 97690 99887'
    },
    stats: {
      totalVisits: 7,
      lastTreatment: 'Clear Aligner Tray #14 Check',
      lastTreatmentDate: 'Aug 28, 2026',
      upcomingAppointment: 'Today, 10:45 AM',
      pendingFollowUp: false
    },
    medicalOverview: {
      allergies: ['None known'],
      medicalHistory: ['No systemic medical conditions'],
      currentMedications: ['Multivitamins'],
      importantNotes: 'Under active clear aligner therapy. High compliance.'
    },
    dentalHistory: [
      {
        id: 'DH-5',
        year: '2026',
        date: 'Aug 28, 2026',
        treatment: 'Aligner Tracking Review',
        doctor: 'Dr. Priya Mehta',
        notes: 'Tracking progressing according to 3D treatment simulation.'
      }
    ],
    aiSummary: 'Aligner check-in scheduled. Reports slight pressure on upper canine. Excellent hygiene compliance.'
  },
  {
    id: 'P-1003',
    name: 'Vikram Sen',
    age: 45,
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    phone: '+91 98111 88776',
    email: 'vikram.sen@example.com',
    emergencyContact: {
      name: 'Anita Sen',
      relationship: 'Spouse',
      phone: '+91 98111 55443'
    },
    stats: {
      totalVisits: 5,
      lastTreatment: 'Implant Osseointegration Review',
      lastTreatmentDate: 'Jul 15, 2026',
      upcomingAppointment: 'Today, 11:30 AM',
      pendingFollowUp: true
    },
    medicalOverview: {
      allergies: ['Sulfa drugs'],
      medicalHistory: ['Controlled Type 2 Diabetes (HbA1c 6.4%)'],
      currentMedications: ['Metformin 500mg daily'],
      importantNotes: 'Monitor gum healing closely due to diabetes history.'
    },
    dentalHistory: [
      {
        id: 'DH-6',
        year: '2026',
        date: 'Jul 15, 2026',
        treatment: 'Implant Placement #14',
        toothNumber: '#14',
        doctor: 'Dr. Rajesh Rao',
        notes: 'Straumann SLA 4.1mm implant placed with primary stability.'
      }
    ],
    aiSummary: 'Implant healing check on #14. Controlled diabetic. CBCT imaging shows solid bone integration.'
  },
  {
    id: 'P-1004',
    name: 'Ananya Roy',
    age: 24,
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    phone: '+91 99203 11223',
    email: 'ananya.roy@example.com',
    emergencyContact: {
      name: 'Deb Roy',
      relationship: 'Father',
      phone: '+91 99203 99881'
    },
    stats: {
      totalVisits: 2,
      lastTreatment: 'Routine Examination',
      lastTreatmentDate: 'Mar 10, 2026',
      upcomingAppointment: 'Today, 02:15 PM',
      pendingFollowUp: false
    },
    medicalOverview: {
      allergies: ['None'],
      medicalHistory: ['Healthy, non-smoker'],
      currentMedications: ['None'],
      importantNotes: 'Interested in in-office teeth whitening.'
    },
    dentalHistory: [
      {
        id: 'DH-7',
        year: '2026',
        date: 'Mar 10, 2026',
        treatment: 'Routine Exam & Fluoride Varnish',
        doctor: 'Dr. Priya Mehta',
        notes: 'Zero active caries. Mild stains on lower anterior teeth.'
      }
    ],
    aiSummary: 'Scale and polish + aesthetic whitening consultation. Nil dental decay.'
  },
  {
    id: 'P-1005',
    name: 'Rajesh Gupta',
    age: 58,
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    phone: '+91 98330 45678',
    email: 'rajesh.gupta@example.com',
    emergencyContact: {
      name: 'Kavita Gupta',
      relationship: 'Spouse',
      phone: '+91 98330 99999'
    },
    stats: {
      totalVisits: 9,
      lastTreatment: 'Mandibular Partial Denture Delivery',
      lastTreatmentDate: 'Aug 04, 2026',
      upcomingAppointment: 'Today, 03:30 PM',
      pendingFollowUp: true
    },
    medicalOverview: {
      allergies: ['Aspirin (GI upset)'],
      medicalHistory: ['Hypertension (Stage 1 controlled)'],
      currentMedications: ['Amlodipine 5mg daily'],
      importantNotes: 'Aspirin sensitive. Use non-epinephrine local anesthetic.'
    },
    dentalHistory: [
      {
        id: 'DH-8',
        year: '2026',
        date: 'Aug 04, 2026',
        treatment: 'Partial Denture Occlusion Adjustment',
        doctor: 'Dr. Rajesh Rao',
        notes: 'Slight soreness on right lingual flange relieved.'
      }
    ],
    aiSummary: 'Denture border adjustment. Mild localized erythema noted at last check. Hypertensive under treatment.'
  },
  {
    id: 'P-1006',
    name: 'Meera Nambiar',
    age: 39,
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    phone: '+91 98450 77665',
    email: 'meera.n@example.com',
    emergencyContact: {
      name: 'Girish Nambiar',
      relationship: 'Spouse',
      phone: '+91 98450 11224'
    },
    stats: {
      totalVisits: 6,
      lastTreatment: 'Core Build-up #19',
      lastTreatmentDate: 'Sep 02, 2026',
      upcomingAppointment: 'Tomorrow, 10:00 AM',
      pendingFollowUp: false
    },
    medicalOverview: {
      allergies: ['None'],
      medicalHistory: ['Healthy, normal parameters'],
      currentMedications: ['None'],
      importantNotes: 'Zirconia crown shade match selection required.'
    },
    dentalHistory: [
      {
        id: 'DH-9',
        year: '2026',
        date: 'Sep 02, 2026',
        treatment: 'Crown Prep & Digital Intraoral Scan',
        toothNumber: '#19',
        doctor: 'Dr. Priya Mehta',
        notes: '3Shape TRIOS digital impression captured. Temporary crown seated.'
      }
    ],
    aiSummary: 'Scheduled for permanent Zirconia crown delivery on #19. Temporary crown intact.'
  },
  {
    id: 'P-1007',
    name: 'Sunita Verma',
    age: 26,
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    phone: '+91 98202 33445',
    email: 'sunita.v@example.com',
    emergencyContact: {
      name: 'Manoj Verma',
      relationship: 'Father',
      phone: '+91 98202 99881'
    },
    stats: {
      totalVisits: 1,
      lastTreatment: 'Orthodontic Assessment',
      lastTreatmentDate: 'Sep 05, 2026',
      upcomingAppointment: 'Today, 04:15 PM',
      pendingFollowUp: false
    },
    medicalOverview: {
      allergies: ['Nickel sensitivity (mild contact dermatitis)'],
      medicalHistory: ['No chronic conditions'],
      currentMedications: ['None'],
      importantNotes: 'Requires ceramic/nickel-free orthodontic brackets and coated wires.'
    },
    dentalHistory: [
      {
        id: 'DH-10',
        year: '2026',
        date: 'Sep 05, 2026',
        treatment: 'Cephalometric & Panoramic Digital Analysis',
        doctor: 'Dr. Sarah Johnson',
        notes: 'Class II Division 1 malocclusion. Recommended ceramic bracket bonding.'
      }
    ],
    aiSummary: 'Ceramic brackets setup. Nickel allergy noted. Arriving today for bracket placement.'
  },
  {
    id: 'P-1008',
    name: 'Amit Patel',
    age: 34,
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250',
    phone: '+91 98700 88990',
    email: 'amit.patel@example.com',
    emergencyContact: {
      name: 'Bhavna Patel',
      relationship: 'Spouse',
      phone: '+91 98700 11223'
    },
    stats: {
      totalVisits: 3,
      lastTreatment: 'OPG Radiograph & Operculectomy',
      lastTreatmentDate: 'Aug 19, 2026',
      upcomingAppointment: 'Today, 05:00 PM',
      pendingFollowUp: true
    },
    medicalOverview: {
      allergies: ['None'],
      medicalHistory: ['Normal systemic parameters'],
      currentMedications: ['None'],
      importantNotes: 'Impaction close to inferior alveolar nerve. CBCT review scheduled.'
    },
    dentalHistory: [
      {
        id: 'DH-11',
        year: '2026',
        date: 'Aug 19, 2026',
        treatment: 'Pericoronitis Irrigation & Laser Operculectomy',
        toothNumber: '#32',
        doctor: 'Dr. James Carter',
        notes: 'Inflammation resolved. Surgical extraction planned.'
      }
    ],
    aiSummary: 'Surgical extraction consultation for impacted lower right wisdom tooth #32.'
  },
  {
    id: 'P-1009',
    name: 'Neha Joshi',
    age: 31,
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    phone: '+91 98199 44332',
    email: 'neha.joshi@example.com',
    emergencyContact: {
      name: 'Sameer Joshi',
      relationship: 'Spouse',
      phone: '+91 98199 99001'
    },
    stats: {
      totalVisits: 5,
      lastTreatment: 'Ultrasonic Scaling',
      lastTreatmentDate: 'Sep 13, 2026',
      pendingFollowUp: false
    },
    medicalOverview: {
      allergies: ['None'],
      medicalHistory: ['Healthy'],
      currentMedications: ['None'],
      importantNotes: 'Routine cleaning completed today at 9:00 AM.'
    },
    dentalHistory: [
      {
        id: 'DH-12',
        year: '2026',
        date: 'Sep 13, 2026',
        treatment: 'Full Mouth Scaling & Polishing',
        doctor: 'Dr. David Jones',
        notes: 'No calculus remaining. Gingival tissues firm and healthy.'
      }
    ],
    aiSummary: 'Routine hygiene visit completed. Recall scheduled for 6 months.'
  },
  {
    id: 'P-1010',
    name: 'Rohan Mehta',
    age: 29,
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    phone: '+91 98980 11223',
    email: 'rohan.m@example.com',
    emergencyContact: {
      name: 'Aarti Mehta',
      relationship: 'Sister',
      phone: '+91 98980 88776'
    },
    stats: {
      totalVisits: 4,
      lastTreatment: 'Composite Tooth Filing #04',
      lastTreatmentDate: 'Sep 13, 2026',
      pendingFollowUp: false
    },
    medicalOverview: {
      allergies: ['None'],
      medicalHistory: ['Healthy'],
      currentMedications: ['None'],
      importantNotes: 'Filling completed this morning at 9:30 AM.'
    },
    dentalHistory: [
      {
        id: 'DH-13',
        year: '2026',
        date: 'Sep 13, 2026',
        treatment: 'Composite Resin Filling #04',
        toothNumber: '#04',
        doctor: 'Dr. Sarah Johnson',
        notes: 'Small occlusal cavity restored with nanohybrid composite.'
      }
    ],
    aiSummary: 'Morning tooth filing successful. Fully paid and discharged.'
  },
  {
    id: 'P-1011',
    name: 'Kavita Singh',
    age: 36,
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    phone: '+91 98222 55667',
    email: 'kavita.s@example.com',
    emergencyContact: {
      name: 'Ajay Singh',
      relationship: 'Spouse',
      phone: '+91 98222 11990'
    },
    stats: {
      totalVisits: 3,
      lastTreatment: 'Pediatric Preventive Review',
      lastTreatmentDate: 'Jul 22, 2026',
      pendingFollowUp: true
    },
    medicalOverview: {
      allergies: ['None'],
      medicalHistory: ['Healthy'],
      currentMedications: ['None'],
      importantNotes: 'Cancelled 12:00 PM slot due to school exam. Needs follow-up call.'
    },
    dentalHistory: [],
    aiSummary: 'Appointment cancelled today. Receptionist logged follow-up for next week.'
  },
  {
    id: 'P-1012',
    name: 'Deepak Chawla',
    age: 52,
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    phone: '+91 98101 22334',
    email: 'deepak.c@example.com',
    emergencyContact: {
      name: 'Ritu Chawla',
      relationship: 'Spouse',
      phone: '+91 98101 66554'
    },
    stats: {
      totalVisits: 8,
      lastTreatment: 'Root Canal Therapy #20',
      lastTreatmentDate: 'Aug 14, 2026',
      pendingFollowUp: true
    },
    medicalOverview: {
      allergies: ['Aspirin'],
      medicalHistory: ['Hypertension (Stage 1)'],
      currentMedications: ['Telmisartan 40mg'],
      importantNotes: 'No-show for 1:00 PM today. Receptionist left voicemail.'
    },
    dentalHistory: [],
    aiSummary: 'Flagged as No-Show today. Follow-up reminder queued.'
  },
  {
    id: 'P-1013',
    name: 'Meera Nambiar',
    age: 39,
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    phone: '+91 98450 77665',
    email: 'meera.n@example.com',
    emergencyContact: {
      name: 'Girish Nambiar',
      relationship: 'Spouse',
      phone: '+91 98450 11224'
    },
    stats: {
      totalVisits: 6,
      lastTreatment: 'Crown Prep & Digital Impression',
      lastTreatmentDate: 'Sep 02, 2026',
      upcomingAppointment: 'Tomorrow, 10:00 AM',
      pendingFollowUp: false
    },
    medicalOverview: {
      allergies: ['None'],
      medicalHistory: ['Healthy'],
      currentMedications: ['None'],
      importantNotes: 'Permanent Zirconia crown delivery tomorrow morning.'
    },
    dentalHistory: [],
    aiSummary: 'Confirmed for tomorrow 10:00 AM crown cementation.'
  },
  {
    id: 'P-1014',
    name: 'Arjun Nair',
    age: 19,
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    phone: '+91 98660 77889',
    email: 'arjun.nair@example.com',
    emergencyContact: {
      name: 'Radhika Nair',
      relationship: 'Mother',
      phone: '+91 98660 11445'
    },
    stats: {
      totalVisits: 5,
      lastTreatment: 'Orthodontic Wire Adjustment',
      lastTreatmentDate: 'Aug 14, 2026',
      upcomingAppointment: 'Tomorrow, 10:30 AM',
      pendingFollowUp: true
    },
    medicalOverview: {
      allergies: ['None'],
      medicalHistory: ['Healthy'],
      currentMedications: ['None'],
      importantNotes: 'Pending confirmation call for tomorrow 10:30 AM.'
    },
    dentalHistory: [],
    aiSummary: 'Braces wire change. Reminder call attempted this morning.'
  },
  {
    id: 'P-1015',
    name: 'Pooja Hegde',
    age: 27,
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    phone: '+91 98205 66778',
    email: 'pooja.hegde@example.com',
    emergencyContact: {
      name: 'Karthik Hegde',
      relationship: 'Brother',
      phone: '+91 98205 22114'
    },
    stats: {
      totalVisits: 2,
      lastTreatment: 'Dental Examination',
      lastTreatmentDate: 'Sep 01, 2026',
      upcomingAppointment: 'Tomorrow, 11:15 AM',
      pendingFollowUp: false
    },
    medicalOverview: {
      allergies: ['None'],
      medicalHistory: ['Healthy'],
      currentMedications: ['None'],
      importantNotes: 'Automated WhatsApp reminder sent for tooth filing.'
    },
    dentalHistory: [],
    aiSummary: 'Scheduled for tooth filing #12 tomorrow. Reminder dispatched.'
  },
  {
    id: 'P-1016',
    name: 'Suresh Menon',
    age: 61,
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    phone: '+91 98119 33221',
    email: 'suresh.m@example.com',
    emergencyContact: {
      name: 'Padma Menon',
      relationship: 'Spouse',
      phone: '+91 98119 88771'
    },
    stats: {
      totalVisits: 7,
      lastTreatment: 'Implant Osseointegration Check',
      lastTreatmentDate: 'Aug 10, 2026',
      upcomingAppointment: 'Tomorrow, 02:00 PM',
      pendingFollowUp: false
    },
    medicalOverview: {
      allergies: ['Penicillin'],
      medicalHistory: ['Mild Hypertension'],
      currentMedications: ['Amlodipine 5mg'],
      importantNotes: 'Implant Stage 2 scheduled with Dr. James Carter.'
    },
    dentalHistory: [],
    aiSummary: 'Confirmed for Stage 2 dental implant uncovering.'
  },
  {
    id: 'P-1017',
    name: 'Tina Deshmukh',
    age: 25,
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    phone: '+91 97660 55443',
    email: 'tina.d@example.com',
    emergencyContact: {
      name: 'Rahul Deshmukh',
      relationship: 'Father',
      phone: '+91 97660 11998'
    },
    stats: {
      totalVisits: 2,
      lastTreatment: 'Aesthetic Consultation',
      lastTreatmentDate: 'Sep 03, 2026',
      upcomingAppointment: 'Tomorrow, 03:30 PM',
      pendingFollowUp: true
    },
    medicalOverview: {
      allergies: ['None'],
      medicalHistory: ['Healthy'],
      currentMedications: ['None'],
      importantNotes: 'Porcelain veneers evaluation tomorrow.'
    },
    dentalHistory: [],
    aiSummary: 'Aesthetic veneers consult tomorrow afternoon.'
  },
  {
    id: 'P-1018',
    name: 'Devendra Rao',
    age: 22,
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250',
    phone: '+91 98440 22119',
    email: 'devendra.rao@example.com',
    emergencyContact: {
      name: 'Shankar Rao',
      relationship: 'Father',
      phone: '+91 98440 77665'
    },
    stats: {
      totalVisits: 6,
      lastTreatment: 'Braces Debonding',
      lastTreatmentDate: 'Sep 06, 2026',
      upcomingAppointment: 'Tomorrow, 04:30 PM',
      pendingFollowUp: false
    },
    medicalOverview: {
      allergies: ['None'],
      medicalHistory: ['Healthy'],
      currentMedications: ['None'],
      importantNotes: 'Retainer delivery tomorrow.'
    },
    dentalHistory: [],
    aiSummary: 'Essix clear retainer delivery scheduled.'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  // --- TODAY: 2026-09-13 ---
  {
    id: 'APT-101',
    patientId: 'P-1001',
    patientName: 'Rahul Sharma',
    patientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    patientPhone: '+91 98201 44521',
    doctorId: 'DOC-1',
    doctorName: 'Dr. Sarah Johnson',
    doctorSpecialty: 'Tooth Filing & Orthodontics',
    date: '2026-09-13',
    time: '10:00 AM',
    status: 'waiting',
    reason: 'Composite Tooth Filing #14',
    tooth: '#14',
    isPreviousPatient: true,
    previousVisitSummary: 'Routine checkup completed in June. Defective occlusal restoration noted.',
    aiSummary: 'Tooth filing on upper first molar. Patient arrived 14 minutes ago and is seated in lobby.',
    room: 'Operatory 1',
    estimatedDuration: '30 mins',
    paymentStatus: 'Pending',
    confirmationStatus: 'confirmed',
    waitingSince: '09:46 AM',
    waitingMinutes: 14
  },
  {
    id: 'APT-102',
    patientId: 'P-1002',
    patientName: 'Priya Kapoor',
    patientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    patientPhone: '+91 97690 12345',
    doctorId: 'DOC-3',
    doctorName: 'Dr. Emily Brown',
    doctorSpecialty: 'Pediatric & Aesthetic Dentistry',
    date: '2026-09-13',
    time: '10:15 AM',
    status: 'waiting',
    reason: 'Clear Aligner Review & Attachment Check',
    tooth: '#08-#09',
    isPreviousPatient: true,
    previousVisitSummary: 'Tray 14 completed with 95% tracking compliance.',
    aiSummary: 'Aligner tracking check-in. Arrived on time, waiting in reception.',
    room: 'Operatory 3',
    estimatedDuration: '25 mins',
    paymentStatus: 'Paid',
    confirmationStatus: 'confirmed',
    waitingSince: '10:07 AM',
    waitingMinutes: 8
  },
  {
    id: 'APT-103',
    patientId: 'P-1003',
    patientName: 'Aarav Verma',
    patientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    patientPhone: '+91 98111 88776',
    doctorId: 'DOC-5',
    doctorName: 'Dr. Priya Mehta',
    doctorSpecialty: 'Endodontics & Conservative Dentistry',
    date: '2026-09-13',
    time: '10:30 AM',
    status: 'in-consultation',
    reason: 'Root Canal Stage 1 (Pulpectomy)',
    tooth: '#30',
    isPreviousPatient: true,
    previousVisitSummary: 'Acute pain since 3 days. Periapical radiolucency on #30.',
    aiSummary: 'Currently in chair for emergency root canal extirpation. Rubber dam applied.',
    room: 'Operatory 4',
    estimatedDuration: '45 mins',
    paymentStatus: 'Partially Paid',
    confirmationStatus: 'confirmed'
  },
  {
    id: 'APT-104',
    patientId: 'P-1004',
    patientName: 'Vikram Sen',
    patientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    patientPhone: '+91 98330 45678',
    doctorId: 'DOC-4',
    doctorName: 'Dr. James Carter',
    doctorSpecialty: 'Oral Surgery & Implants',
    date: '2026-09-13',
    time: '11:30 AM',
    status: 'scheduled',
    reason: 'Implant Osseointegration Review',
    tooth: '#14',
    isPreviousPatient: true,
    previousVisitSummary: 'Fixture placed 8 weeks ago. Healing abutment review today.',
    aiSummary: 'CBCT radiograph requested. Diabetic control verified (HbA1c 6.4%).',
    room: 'Surgical Suite A',
    estimatedDuration: '40 mins',
    paymentStatus: 'Paid',
    confirmationStatus: 'confirmed'
  },
  {
    id: 'APT-105',
    patientId: 'P-1005',
    patientName: 'Ananya Roy',
    patientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    patientPhone: '+91 99203 11223',
    doctorId: 'DOC-3',
    doctorName: 'Dr. Emily Brown',
    doctorSpecialty: 'Pediatric & Aesthetic Dentistry',
    date: '2026-09-13',
    time: '02:15 PM',
    status: 'scheduled',
    reason: 'Teeth Whitening & Ultrasonic Scaling',
    isPreviousPatient: true,
    previousVisitSummary: 'Clean caries-free checkup in March 2026.',
    aiSummary: 'In-office Zoom LED whitening consultation + prophylactic polish.',
    room: 'Operatory 3',
    estimatedDuration: '45 mins',
    paymentStatus: 'Paid',
    confirmationStatus: 'confirmed'
  },
  {
    id: 'APT-106',
    patientId: 'P-1006',
    patientName: 'Rajesh Gupta',
    patientAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=250',
    patientPhone: '+91 98450 77665',
    doctorId: 'DOC-2',
    doctorName: 'Dr. David Jones',
    doctorSpecialty: 'Tooth Filing & Restorative',
    date: '2026-09-13',
    time: '03:30 PM',
    status: 'scheduled',
    reason: 'Tooth Filing & Occlusal Adjustment',
    tooth: '#18',
    isPreviousPatient: true,
    previousVisitSummary: 'New cast partial delivered 4 weeks ago.',
    aiSummary: 'Checking bite comfort and placing small glass ionomer restoration.',
    room: 'Operatory 2',
    estimatedDuration: '35 mins',
    paymentStatus: 'Pending',
    confirmationStatus: 'confirmed'
  },
  {
    id: 'APT-107',
    patientId: 'P-1007',
    patientName: 'Sunita Verma',
    patientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    patientPhone: '+91 98202 33445',
    doctorId: 'DOC-1',
    doctorName: 'Dr. Sarah Johnson',
    doctorSpecialty: 'Tooth Filing & Orthodontics',
    date: '2026-09-13',
    time: '04:15 PM',
    status: 'scheduled',
    reason: 'Ceramic Braces Initial Consultation',
    isPreviousPatient: false,
    aiSummary: 'New orthodontic patient. Moderate crowding on lower anterior segment.',
    room: 'Operatory 1',
    estimatedDuration: '40 mins',
    paymentStatus: 'Pending',
    confirmationStatus: 'confirmed'
  },
  {
    id: 'APT-108',
    patientId: 'P-1008',
    patientName: 'Amit Patel',
    patientAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250',
    patientPhone: '+91 98700 88990',
    doctorId: 'DOC-4',
    doctorName: 'Dr. James Carter',
    doctorSpecialty: 'Oral Surgery & Implants',
    date: '2026-09-13',
    time: '05:00 PM',
    status: 'scheduled',
    reason: 'Impacted Wisdom Tooth Surgical Assessment',
    tooth: '#32',
    isPreviousPatient: true,
    aiSummary: 'OPG X-Ray reviewed. Mesio-angular impaction with recurrent pericoronitis.',
    room: 'Surgical Suite A',
    estimatedDuration: '30 mins',
    paymentStatus: 'Paid',
    confirmationStatus: 'confirmed'
  },
  {
    id: 'APT-109',
    patientId: 'P-1009',
    patientName: 'Neha Joshi',
    patientAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    patientPhone: '+91 98199 44332',
    doctorId: 'DOC-2',
    doctorName: 'Dr. David Jones',
    doctorSpecialty: 'Tooth Filing & Restorative',
    date: '2026-09-13',
    time: '09:00 AM',
    status: 'completed',
    reason: 'Routine Scaling & Tartar Removal',
    isPreviousPatient: true,
    aiSummary: 'Scaling completed without sensitivity. Gums healthy. Next recall in 6 months.',
    room: 'Operatory 2',
    estimatedDuration: '30 mins',
    paymentStatus: 'Paid',
    confirmationStatus: 'confirmed'
  },
  {
    id: 'APT-110',
    patientId: 'P-1010',
    patientName: 'Rohan Mehta',
    patientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    patientPhone: '+91 98980 11223',
    doctorId: 'DOC-1',
    doctorName: 'Dr. Sarah Johnson',
    doctorSpecialty: 'Tooth Filing & Orthodontics',
    date: '2026-09-13',
    time: '09:30 AM',
    status: 'completed',
    reason: 'Tooth Filing (Composite Resin #04)',
    tooth: '#04',
    isPreviousPatient: true,
    aiSummary: 'Class I restoration completed smoothly. Bite adjusted and polished.',
    room: 'Operatory 1',
    estimatedDuration: '30 mins',
    paymentStatus: 'Paid',
    confirmationStatus: 'confirmed'
  },
  {
    id: 'APT-111',
    patientId: 'P-1011',
    patientName: 'Kavita Singh',
    patientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    patientPhone: '+91 98222 55667',
    doctorId: 'DOC-3',
    doctorName: 'Dr. Emily Brown',
    doctorSpecialty: 'Pediatric & Aesthetic Dentistry',
    date: '2026-09-13',
    time: '12:00 PM',
    status: 'cancelled',
    reason: 'Pediatric Fluoride Varnish & Sealants',
    isPreviousPatient: true,
    aiSummary: 'Patient called to reschedule due to school exam conflict.',
    room: 'Operatory 3',
    estimatedDuration: '30 mins',
    paymentStatus: 'Pending',
    confirmationStatus: 'pending'
  },
  {
    id: 'APT-112',
    patientId: 'P-1012',
    patientName: 'Deepak Chawla',
    patientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    patientPhone: '+91 98101 22334',
    doctorId: 'DOC-5',
    doctorName: 'Dr. Priya Mehta',
    doctorSpecialty: 'Endodontics & Conservative Dentistry',
    date: '2026-09-13',
    time: '01:00 PM',
    status: 'no-show',
    reason: 'Endodontic Re-evaluation',
    isPreviousPatient: true,
    aiSummary: 'Did not arrive for 1:00 PM slot. Follow-up call logged by reception.',
    room: 'Operatory 4',
    estimatedDuration: '30 mins',
    paymentStatus: 'Pending',
    confirmationStatus: 'confirmed'
  },

  // --- TOMORROW: 2026-09-14 ---
  {
    id: 'APT-201',
    patientId: 'P-1013',
    patientName: 'Meera Nambiar',
    patientAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    patientPhone: '+91 98450 77665',
    doctorId: 'DOC-5',
    doctorName: 'Dr. Priya Mehta',
    doctorSpecialty: 'Endodontics & Conservative Dentistry',
    date: '2026-09-14',
    time: '10:00 AM',
    status: 'scheduled',
    reason: 'Permanent Zirconia Crown Cementation #19',
    tooth: '#19',
    isPreviousPatient: true,
    aiSummary: 'Crown delivery. Lab confirmed marginal fit and shade A2 translucency.',
    room: 'Operatory 4',
    estimatedDuration: '30 mins',
    paymentStatus: 'Pending',
    confirmationStatus: 'confirmed'
  },
  {
    id: 'APT-202',
    patientId: 'P-1014',
    patientName: 'Arjun Nair',
    patientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    patientPhone: '+91 98660 77889',
    doctorId: 'DOC-1',
    doctorName: 'Dr. Sarah Johnson',
    doctorSpecialty: 'Tooth Filing & Orthodontics',
    date: '2026-09-14',
    time: '10:30 AM',
    status: 'scheduled',
    reason: 'Braces Wire Change & Elastic Ligatures',
    tooth: 'Full Arch',
    isPreviousPatient: true,
    aiSummary: 'Monthly orthodontic activation. Archwire progression to 0.016 NiTi.',
    room: 'Operatory 1',
    estimatedDuration: '30 mins',
    paymentStatus: 'Pending',
    confirmationStatus: 'pending'
  },
  {
    id: 'APT-203',
    patientId: 'P-1015',
    patientName: 'Pooja Hegde',
    patientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    patientPhone: '+91 98205 66778',
    doctorId: 'DOC-2',
    doctorName: 'Dr. David Jones',
    doctorSpecialty: 'Tooth Filing & Restorative',
    date: '2026-09-14',
    time: '11:15 AM',
    status: 'scheduled',
    reason: 'Tooth Filing (Premolar #12)',
    tooth: '#12',
    isPreviousPatient: true,
    aiSummary: 'Small occlusal carious lesion detected at scaling session. Direct composite filling.',
    room: 'Operatory 2',
    estimatedDuration: '30 mins',
    paymentStatus: 'Pending',
    confirmationStatus: 'reminder-sent'
  },
  {
    id: 'APT-204',
    patientId: 'P-1016',
    patientName: 'Suresh Menon',
    patientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    patientPhone: '+91 98119 33221',
    doctorId: 'DOC-4',
    doctorName: 'Dr. James Carter',
    doctorSpecialty: 'Oral Surgery & Implants',
    date: '2026-09-14',
    time: '02:00 PM',
    status: 'scheduled',
    reason: 'Dental Implant Stage 2 Gingival Former',
    tooth: '#19',
    isPreviousPatient: true,
    aiSummary: 'Implant uncovered and healing collar placement under local anesthesia.',
    room: 'Surgical Suite A',
    estimatedDuration: '40 mins',
    paymentStatus: 'Paid',
    confirmationStatus: 'confirmed'
  },
  {
    id: 'APT-205',
    patientId: 'P-1017',
    patientName: 'Tina Deshmukh',
    patientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    patientPhone: '+91 97660 55443',
    doctorId: 'DOC-3',
    doctorName: 'Dr. Emily Brown',
    doctorSpecialty: 'Pediatric & Aesthetic Dentistry',
    date: '2026-09-14',
    time: '03:30 PM',
    status: 'scheduled',
    reason: 'Cosmetic Veneers Evaluation',
    tooth: '#06-#11',
    isPreviousPatient: true,
    aiSummary: 'Smile design mock-up and shade selection for porcelain veneers.',
    room: 'Operatory 3',
    estimatedDuration: '45 mins',
    paymentStatus: 'Pending',
    confirmationStatus: 'pending'
  },
  {
    id: 'APT-206',
    patientId: 'P-1018',
    patientName: 'Devendra Rao',
    patientAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250',
    patientPhone: '+91 98440 22119',
    doctorId: 'DOC-1',
    doctorName: 'Dr. Sarah Johnson',
    doctorSpecialty: 'Tooth Filing & Orthodontics',
    date: '2026-09-14',
    time: '04:30 PM',
    status: 'scheduled',
    reason: 'Orthodontic Retainer Delivery',
    tooth: 'Maxillary arch',
    isPreviousPatient: true,
    aiSummary: 'Post-debonding Essix clear retainer fit check and hygiene instructions.',
    room: 'Operatory 1',
    estimatedDuration: '25 mins',
    paymentStatus: 'Pending',
    confirmationStatus: 'reminder-sent'
  }
];

export const INITIAL_CLINICAL_NOTE: ClinicalNoteDraft = {
  patientId: 'P-1001',
  patientName: 'Aarav Sharma',
  appointmentId: 'APT-201',
  date: '2026-09-12',
  chiefComplaint: 'Severe throbbing pain in the lower-right back jaw for 3 days, worsens significantly with hot beverages and at night.',
  symptoms: [
    'Spontaneous nocturnal throbbing pain in lower-right quadrant',
    'Lingering sharp pain to hot liquids (>15 seconds)',
    'Tenderness upon vertical percussion and chewing'
  ],
  clinicalObservations: 'Tooth #30 exhibits an extensive disto-occlusal carious lesion with defective margins. Electric pulp test (EPT) elicited an exaggerated lingering response. Percussion positive. Periodontal probing depths within normal limits (2-3mm). Periapical radiograph reveals deep radiolucency approximating the mesial pulp horn with slight widening of the apical periodontal ligament space.',
  diagnosis: 'Symptomatic Irreversible Pulpitis with Symptomatic Apical Periodontitis on Tooth #30.',
  toothNumber: '#30',
  treatmentPlan: 'Immediate emergency pulpectomy and root canal instrumentation under rubber dam isolation. Canals to be shaped, disinfected with sodium hypochlorite and calcium hydroxide medicament placed. Crown restoration with bonded Zirconia crown advised post-obturation.',
  prescription: [
    {
      medicine: 'Augmentin (Amoxicillin + Clavulanate) - CONTRAINDICATED (ALLERGY)',
      dosage: 'SWITCHED TO: Clindamycin 300mg',
      frequency: 'Every 8 hours (TDS)',
      duration: '5 days',
      instructions: 'Take with a full glass of water after food. Flagged due to patient penicillin allergy.'
    },
    {
      medicine: 'Ketorolac Tromethamine (Ketorol-DT)',
      dosage: '10mg dispersible',
      frequency: 'SOS every 6-8 hours (Max 40mg/day)',
      duration: '3 days',
      instructions: 'Dissolve in half cup of water after meals for acute pain control.'
    }
  ],
  followUpRecommendation: 'Return in 5-7 days for canal obturation and core build-up. Contact clinic immediately if acute facial swelling or fever occurs.',
  followUpDays: 6,
  isApproved: false,
  rawVoiceTranscript: 'Patient presents with acute throbbing pain lower right molar for 3 days. Exam shows deep carious lesion involving the pulp of tooth number 30. Percussion is positive. EPT shows irreversible pulpitis. Note penicillin allergy, so prescribe Clindamycin 300mg and Ketorol DT for pain. Plan root canal stage one today and follow-up in six days for obturation.'
};

export const INITIAL_REPORTS: ReportItem[] = [
  {
    id: 'RPT-801',
    patientId: 'P-1001',
    patientName: 'Aarav Sharma',
    date: 'Sep 12, 2026',
    procedure: 'Endodontic Diagnostic Radiography & Pulp Vitality Assessment',
    clinicalFindings: 'Extensive distal carious involvement on tooth #30 approximating the pulp chamber. Lingering hyper-response to thermal and electrical stimulation.',
    radiographicEvaluation: 'Digital intraoral periapical view reveals coronal radiolucency invading the pulp chamber with early apical periodontal ligament space thickening at mesial apex.',
    diagnosis: 'Symptomatic Irreversible Pulpitis with Symptomatic Apical Periodontitis (#30)',
    recommendedTreatment: 'Single or two-visit Endodontic Therapy (Root Canal Treatment) followed by structural cuspal coverage with full ceramic crown.',
    patientFriendlyExplanations: {
      en: 'This tooth has a deep cavity that has reached the sensitive inner nerve (pulp). The nerve is inflamed and cannot heal on its own, which is causing your throbbing pain. We recommend a gentle root canal to clear the infection and save your natural tooth, followed by a protective crown so you can chew comfortably without pain.',
      hi: 'इस दांत में एक गहरा कीड़ा (सड़न) लगा है जो दांत की अंदरूनी नस (पल्प) तक पहुँच गया है। नस में सूजन होने के कारण आपको तेज दर्द हो रहा है। हम इस दांत को बचाने और दर्द खत्म करने के लिए रूट कैनाल ट्रीटमेंट की सलाह देते हैं, जिसके बाद दांत को मजबूत करने के लिए कैप लगाई जाएगी।',
      mr: 'या दातात एक खोल कीड लागली आहे जी दाताच्या आतील संवेदनशील नसेपर्यंत पोहोचली आहे. नसेला सूज आल्यामुळे तीव्र ठसठस होत आहे. दात वाचवण्यासाठी आणि वेदना थांबवण्यासाठी आम्ही रूट कॅनाल उपचाराची शिफारस करतो, त्यानंतर दाताला संरक्षणात्मक कॅप लावली जाईल.',
      es: 'Este diente tiene una caries profunda que ha alcanzado el nervio interno sensible (la pulpa). El nervio está inflamado y no puede sanar por sí solo, lo que provoca el dolor punzante. Recomendamos un tratamiento de conducto (endodoncia) para eliminar la infección y salvar su diente natural, seguido de una corona protectora.'
    }
  }
];

export const INITIAL_TREATMENT_PLANS: TreatmentPlan[] = [
  {
    id: 'TP-301',
    patientId: 'P-1001',
    patientName: 'Aarav Sharma',
    title: 'Complete Endodontic & Restorative Rehabilitation',
    toothNumber: '#30',
    overallStatus: 'In Progress',
    estimatedCost: 18500,
    insuranceCovered: 12000,
    outOfPocket: 6500,
    expectedDuration: '3 Weeks (3 Sessions)',
    appointmentsRequired: 3,
    stages: [
      {
        number: 1,
        title: 'Diagnostic Examination & Pulpectomy',
        description: 'Comprehensive digital X-ray, pulp chamber access, canal extirpation and soothing intracanal medicament under rubber dam isolation.',
        status: 'Completed',
        scheduledDate: 'Sep 12, 2026',
        cost: 4500
      },
      {
        number: 2,
        title: 'Root Canal Obturation & Biomechanical Prep',
        description: 'Rotary nickel-titanium instrumentation, apex locator measurement, disinfection and 3D warm vertical gutta-percha obturation.',
        status: 'Upcoming',
        scheduledDate: 'Sep 18, 2026',
        cost: 6500
      },
      {
        number: 3,
        title: 'Fiber Post, Core Build-Up & Zirconia Crown',
        description: 'Adhesive fiber post placement, high-strength composite core, digital 3D optical scan and monolithic Zirconia crown delivery.',
        status: 'Pending',
        scheduledDate: 'Sep 25, 2026',
        cost: 7500
      },
      {
        number: 4,
        title: 'Post-Restorative Review & Occlusal Check',
        description: 'Bite verification, contact point floss check, and baseline follow-up periapical X-ray.',
        status: 'Pending',
        scheduledDate: 'Oct 05, 2026',
        cost: 0
      }
    ]
  }
];

export const INITIAL_FOLLOW_UPS: FollowUpItem[] = [
  {
    id: 'FU-501',
    patientId: 'P-1001',
    patientName: 'Aarav Sharma',
    patientPhone: '+91 98201 44521',
    treatment: 'Root Canal Stage 1 (#30)',
    followUpDate: 'Today',
    tabCategory: 'due_today',
    status: 'Awaiting response',
    lastResponse: 'Check-in dispatched 1 hour ago via WhatsApp/SMS.',
    sentiment: 'neutral',
    checkInHistory: [
      {
        timestamp: '11:15 AM',
        type: 'automated_sms',
        message: 'Hi Aarav, Dr. Priya Mehta from SmileCare here. How is your tooth feeling after this morning\'s procedure? Tap here to let us know.'
      }
    ]
  },
  {
    id: 'FU-502',
    patientId: 'P-1003',
    patientName: 'Vikram Sen',
    patientPhone: '+91 98111 88776',
    treatment: 'Implant Osseointegration (#14)',
    followUpDate: 'Today',
    tabCategory: 'due_today',
    status: 'Patient responded',
    lastResponse: 'Reported mild gum soreness, no fever, chewing softly.',
    sentiment: 'good',
    checkInHistory: [
      {
        timestamp: '09:00 AM',
        type: 'whatsapp',
        message: 'Routine 8-week implant stability automated query sent.'
      },
      {
        timestamp: '09:42 AM',
        type: 'patient_reply',
        message: 'Doing great! Just a little tender when brushing around the implant, but otherwise painless.'
      }
    ]
  },
  {
    id: 'FU-503',
    patientId: 'P-1005',
    patientName: 'Rajesh Gupta',
    patientPhone: '+91 98330 45678',
    treatment: 'Mandibular Partial Denture',
    followUpDate: 'Sep 14, 2026',
    tabCategory: 'upcoming',
    status: 'Awaiting response',
    lastResponse: 'Scheduled post-adjustment review.',
    sentiment: 'neutral',
    checkInHistory: []
  },
  {
    id: 'FU-504',
    patientId: 'P-1002',
    patientName: 'Priya Kapoor',
    patientPhone: '+91 97690 12345',
    treatment: 'Aligner Tray #14 Review',
    followUpDate: 'Sep 05, 2026',
    tabCategory: 'completed',
    status: 'Completed',
    lastResponse: 'Confirmed aligner fits snugly without pressure points.',
    sentiment: 'good',
    checkInHistory: [
      {
        timestamp: 'Sep 05, 2026 10:00 AM',
        type: 'whatsapp',
        message: 'Aligner tracking satisfaction confirmed.'
      }
    ]
  },
  {
    id: 'FU-505',
    patientId: 'P-1004',
    patientName: 'Sunil Verma',
    patientPhone: '+91 98765 43210',
    treatment: 'Surgical Extraction #32',
    followUpDate: 'Sep 10, 2026',
    tabCategory: 'no_response',
    status: 'Call required',
    lastResponse: '2 automated check-ins unopened. Clinical call prioritized.',
    sentiment: 'problem',
    checkInHistory: [
      {
        timestamp: 'Sep 10, 2026',
        type: 'automated_sms',
        message: 'Day 2 extraction recovery check-in sent.'
      },
      {
        timestamp: 'Sep 11, 2026',
        type: 'automated_sms',
        message: 'Reminder sent: Please let us know how your healing is progressing.'
      }
    ]
  }
];

export const INITIAL_INVOICES: BillingInvoice[] = [
  {
    id: 'INV-401',
    invoiceNumber: 'SMC-2026-081',
    patientId: 'P-1001',
    patientName: 'Rahul Sharma',
    date: 'Sep 13, 2026',
    treatment: 'Composite Tooth Filing #14',
    items: [
      {
        code: 'D2391',
        description: 'Resin-Based Composite - One Surface, Posterior (#14)',
        quantity: 1,
        unitPrice: 2800,
        total: 2800
      },
      {
        code: 'D0220',
        description: 'Intraoral Periapical Digital Radiograph',
        quantity: 2,
        unitPrice: 350,
        total: 700
      }
    ],
    subtotal: 3500,
    discount: 0,
    tax: 0,
    total: 3500,
    paid: 0,
    pending: 3500,
    paymentMethod: 'Pending',
    status: 'Unpaid'
  },
  {
    id: 'INV-402',
    invoiceNumber: 'SMC-2026-082',
    patientId: 'P-1006',
    patientName: 'Rajesh Gupta',
    date: 'Sep 13, 2026',
    treatment: 'Mandibular Occlusal Polish & Relief',
    items: [
      {
        code: 'D5411',
        description: 'Adjust Complete/Partial Denture - Mandibular',
        quantity: 1,
        unitPrice: 2200,
        total: 2200
      },
      {
        code: 'D2330',
        description: 'Resin Composite - Tooth #18',
        quantity: 1,
        unitPrice: 3800,
        total: 3800
      }
    ],
    subtotal: 6000,
    discount: 0,
    tax: 0,
    total: 6000,
    paid: 2000,
    pending: 4000,
    paymentMethod: 'UPI / Cash',
    status: 'Partially Paid'
  },
  {
    id: 'INV-403',
    invoiceNumber: 'SMC-2026-083',
    patientId: 'P-1007',
    patientName: 'Sunita Verma',
    date: 'Sep 12, 2026',
    treatment: 'Ceramic Braces Initial Bracket Fitting',
    items: [
      {
        code: 'D8080',
        description: 'Comprehensive Orthodontic Bonding & Records',
        quantity: 1,
        unitPrice: 15000,
        total: 15000
      }
    ],
    subtotal: 15000,
    discount: 0,
    tax: 0,
    total: 15000,
    paid: 5000,
    pending: 10000,
    paymentMethod: 'Credit Card',
    status: 'Partially Paid'
  },
  {
    id: 'INV-404',
    invoiceNumber: 'SMC-2026-084',
    patientId: 'P-1013',
    patientName: 'Meera Nambiar',
    date: 'Sep 12, 2026',
    treatment: 'Zirconia Crown Prep & Temporary Delivery',
    items: [
      {
        code: 'D2740',
        description: 'Crown - Porcelain/Ceramic Substrate (#19)',
        quantity: 1,
        unitPrice: 8000,
        total: 8000
      }
    ],
    subtotal: 8000,
    discount: 0,
    tax: 0,
    total: 8000,
    paid: 7000,
    pending: 1000,
    paymentMethod: 'UPI / Cash',
    status: 'Partially Paid'
  },
  {
    id: 'INV-405',
    invoiceNumber: 'SMC-2026-085',
    patientId: 'P-1002',
    patientName: 'Priya Kapoor',
    date: 'Sep 10, 2026',
    treatment: 'Clear Aligner Staging Delivery (Tray 13-16)',
    items: [
      {
        code: 'D8090',
        description: 'Comprehensive Orthodontic Clear Aligner Phase',
        quantity: 1,
        unitPrice: 24000,
        total: 24000
      }
    ],
    subtotal: 24000,
    discount: 2000,
    tax: 1100,
    total: 23100,
    paid: 23100,
    pending: 0,
    paymentMethod: 'Credit Card',
    status: 'Paid'
  },
  {
    id: 'INV-406',
    invoiceNumber: 'SMC-2026-086',
    patientId: 'P-1004',
    patientName: 'Vikram Sen',
    date: 'Sep 08, 2026',
    treatment: 'Implant Post-Op Radiography',
    items: [
      {
        code: 'D0364',
        description: 'Cone Beam CT Imaging - Single Quadrant',
        quantity: 1,
        unitPrice: 4200,
        total: 4200
      }
    ],
    subtotal: 4200,
    discount: 0,
    tax: 210,
    total: 4410,
    paid: 4410,
    pending: 0,
    paymentMethod: 'Insurance',
    status: 'Paid'
  }
];

export const INITIAL_MESSAGES: ClinicMessage[] = [
  {
    id: 'MSG-601',
    patientId: 'P-1001',
    patientName: 'Rahul Sharma',
    patientPhone: '+91 98201 44521',
    category: 'appointment',
    content: 'SmileCare: Hi Rahul, your appointment for Tooth Filing is scheduled for today at 10:00 AM with Dr. Sarah Johnson. We look forward to seeing you!',
    timestamp: '08:30 AM',
    status: 'Read',
    sender: 'Reception'
  },
  {
    id: 'MSG-602',
    patientId: 'P-1002',
    patientName: 'Priya Kapoor',
    patientPhone: '+91 97690 12345',
    category: 'reminder',
    content: 'SmileCare: Hi Priya, gentle reminder for your Clear Aligner check with Dr. Emily Brown at 10:15 AM today.',
    timestamp: '08:45 AM',
    status: 'Read',
    sender: 'Reception'
  },
  {
    id: 'MSG-603',
    patientId: 'P-1013',
    patientName: 'Meera Nambiar',
    patientPhone: '+91 98450 77665',
    category: 'appointment',
    content: 'SmileCare: Hi Meera, your Zirconia Crown is ready from the lab! Your appointment is set for tomorrow, Sep 14 at 10:00 AM with Dr. Priya Mehta.',
    timestamp: 'Yesterday',
    status: 'Read',
    sender: 'Reception'
  }
];

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'DOC-1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Tooth Filing & Orthodontics',
    qualifications: 'MBBS, BDS, BCS',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    phone: '+91 98200 11001',
    email: 'sarah.johnson@smilecare.com',
    room: 'Operatory 1',
    rating: 4.8,
    reviewsCount: '2.8k+',
    patientsCount: '4.5k+',
    experienceYears: 8,
    status: 'available',
    todayAppointmentsCount: 6,
    nextAvailableSlot: '02:30 PM',
    treatments: ['Tooth Filing', 'Braces', 'Orthodontics', 'Composite Bonding', 'Teeth Whitening'],
    slots: [
      { time: '09:30 AM', isAvailable: false, patientName: 'Rohan Mehta', treatment: 'Tooth Filing' },
      { time: '10:00 AM', isAvailable: false, patientName: 'Rahul Sharma', treatment: 'Tooth Filing' },
      { time: '11:00 AM', isAvailable: true },
      { time: '02:30 PM', isAvailable: true },
      { time: '04:15 PM', isAvailable: false, patientName: 'Sunita Verma', treatment: 'Ceramic Braces' },
      { time: '05:30 PM', isAvailable: true }
    ]
  },
  {
    id: 'DOC-2',
    name: 'Dr. David Jones',
    specialty: 'Tooth Filing & Restorative Dentistry',
    qualifications: 'BDS, MDS (Restorative)',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
    phone: '+91 98200 22002',
    email: 'david.jones@smilecare.com',
    room: 'Operatory 2',
    rating: 4.9,
    reviewsCount: '3.1k+',
    patientsCount: '5.2k+',
    experienceYears: 10,
    status: 'available',
    todayAppointmentsCount: 5,
    nextAvailableSlot: '04:00 PM',
    treatments: ['Tooth Filing', 'Crowns & Bridges', 'Composite Bonding', 'Dental Inlays', 'Routine Scaling'],
    slots: [
      { time: '09:00 AM', isAvailable: false, patientName: 'Neha Joshi', treatment: 'Routine Scaling' },
      { time: '10:30 AM', isAvailable: true },
      { time: '12:00 PM', isAvailable: true },
      { time: '03:30 PM', isAvailable: false, patientName: 'Rajesh Gupta', treatment: 'Tooth Filing #18' },
      { time: '04:00 PM', isAvailable: true },
      { time: '05:00 PM', isAvailable: true }
    ]
  },
  {
    id: 'DOC-3',
    name: 'Dr. Emily Brown',
    specialty: 'Pediatric & Aesthetic Dentistry',
    qualifications: 'BDS, MDS (Pedodontics)',
    avatar: 'https://images.unsplash.com/photo-1594824813583-752a71d7c4eb?auto=format&fit=crop&q=80&w=300',
    phone: '+91 98200 33003',
    email: 'emily.brown@smilecare.com',
    room: 'Operatory 3',
    rating: 4.8,
    reviewsCount: '1.9k+',
    patientsCount: '3.8k+',
    experienceYears: 6,
    status: 'in-consultation',
    todayAppointmentsCount: 4,
    nextAvailableSlot: '05:30 PM',
    treatments: ['Tooth Filing', 'Pediatric Dentistry', 'Teeth Whitening', 'Clear Aligners', 'Fluoride Varnish'],
    slots: [
      { time: '10:15 AM', isAvailable: false, patientName: 'Priya Kapoor', treatment: 'Clear Aligners' },
      { time: '11:45 AM', isAvailable: true },
      { time: '02:15 PM', isAvailable: false, patientName: 'Ananya Roy', treatment: 'Teeth Whitening' },
      { time: '03:45 PM', isAvailable: false, treatment: 'Consultation' },
      { time: '05:30 PM', isAvailable: true }
    ]
  },
  {
    id: 'DOC-4',
    name: 'Dr. James Carter',
    specialty: 'Oral Surgery & Implants',
    qualifications: 'BDS, MS (Oral & Maxillofacial Surgery)',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300',
    phone: '+91 98200 44004',
    email: 'james.carter@smilecare.com',
    room: 'Surgical Suite A',
    rating: 4.9,
    reviewsCount: '4.2k+',
    patientsCount: '6.4k+',
    experienceYears: 12,
    status: 'available',
    todayAppointmentsCount: 4,
    nextAvailableSlot: '03:00 PM',
    treatments: ['Dental Implants', 'Wisdom Tooth Extraction', 'Bone Grafting', 'Surgical Extraction'],
    slots: [
      { time: '10:00 AM', isAvailable: true },
      { time: '11:30 AM', isAvailable: false, patientName: 'Vikram Sen', treatment: 'Implant Review' },
      { time: '03:00 PM', isAvailable: true },
      { time: '05:00 PM', isAvailable: false, patientName: 'Amit Patel', treatment: 'Wisdom Tooth Extraction' },
      { time: '06:00 PM', isAvailable: true }
    ]
  },
  {
    id: 'DOC-5',
    name: 'Dr. Priya Mehta',
    specialty: 'Endodontics & Conservative Dentistry',
    qualifications: 'BDS, MDS (Endodontics)',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=300',
    phone: '+91 98200 55005',
    email: 'priya.mehta@smilecare.com',
    room: 'Operatory 4',
    rating: 4.9,
    reviewsCount: '2.5k+',
    patientsCount: '4.8k+',
    experienceYears: 9,
    status: 'in-consultation',
    todayAppointmentsCount: 5,
    nextAvailableSlot: '04:30 PM',
    treatments: ['Root Canal Treatment', 'Re-Root Canal', 'Pulpectomy', 'Post & Core', 'Zirconia Crowns'],
    slots: [
      { time: '10:30 AM', isAvailable: false, patientName: 'Aarav Verma', treatment: 'Root Canal Stage 1' },
      { time: '12:00 PM', isAvailable: true },
      { time: '02:00 PM', isAvailable: true },
      { time: '03:15 PM', isAvailable: false, treatment: 'Post & Core' },
      { time: '04:30 PM', isAvailable: true }
    ]
  }
];

export const INITIAL_CALL_LOGS: CallLogItem[] = [
  {
    id: 'CALL-101',
    patientId: 'P-1013',
    patientName: 'Meera Nambiar',
    phone: '+91 98450 77665',
    timestamp: '09:15 AM',
    duration: '01:42',
    outcome: 'Completed',
    notes: 'Confirmed arrival for tomorrow 10:00 AM permanent crown delivery. Reminded to bring insurance card.',
    appointmentContext: 'Tomorrow 10:00 AM - Zirconia Crown Delivery'
  },
  {
    id: 'CALL-102',
    patientId: 'P-1014',
    patientName: 'Arjun Nair',
    phone: '+91 98660 77889',
    timestamp: '09:28 AM',
    duration: '00:35',
    outcome: 'No Answer',
    notes: 'Left voicemail reminding about tomorrow 10:30 AM braces activation. Sent follow-up WhatsApp.',
    appointmentContext: 'Tomorrow 10:30 AM - Braces Activation'
  },
  {
    id: 'CALL-103',
    patientId: 'P-1011',
    patientName: 'Kavita Singh',
    phone: '+91 98222 55667',
    timestamp: '09:45 AM',
    duration: '02:10',
    outcome: 'Reschedule Requested',
    notes: 'Patient requested cancellation of 12:00 PM slot due to child exam. Will call back Friday.',
    appointmentContext: 'Today 12:00 PM - Pediatric Fluoride'
  },
  {
    id: 'CALL-104',
    patientId: 'P-1001',
    patientName: 'Rahul Sharma',
    phone: '+91 98201 44521',
    timestamp: 'Yesterday 05:20 PM',
    duration: '01:15',
    outcome: 'Completed',
    notes: 'Confirmed today 10:00 AM appointment with Dr. Sarah Johnson for tooth filing.',
    appointmentContext: 'Today 10:00 AM - Tooth Filing'
  }
];

export const INITIAL_NOTIFICATIONS: ClinicNotification[] = [
  {
    id: 'NOTIF-1',
    type: 'appointment',
    title: 'Patient Checked In',
    message: 'Rahul Sharma arrived at 09:46 AM and is waiting in the reception for Dr. Sarah Johnson.',
    timestamp: '15 mins ago',
    read: false,
    linkNav: 'waiting-room',
    patientName: 'Rahul Sharma'
  },
  {
    id: 'NOTIF-2',
    type: 'doctor',
    title: 'Doctor Status Update',
    message: 'Dr. Sarah Johnson completed morning patient Rohan Mehta. Now available for Operatory 1.',
    timestamp: '25 mins ago',
    read: false,
    linkNav: 'doctors'
  },
  {
    id: 'NOTIF-3',
    type: 'cancellation',
    title: 'Appointment Cancelled',
    message: 'Kavita Singh cancelled 12:00 PM appointment with Dr. Emily Brown. Slot reopened for booking.',
    timestamp: '40 mins ago',
    read: false,
    linkNav: 'appointments'
  },
  {
    id: 'NOTIF-4',
    type: 'payment',
    title: 'Pending Balance Alert',
    message: 'Sunita Verma has a pending balance of ₹10,000 due upon arrival today at 04:15 PM.',
    timestamp: '1 hour ago',
    read: true,
    linkNav: 'billing'
  },
  {
    id: 'NOTIF-5',
    type: 'reminder',
    title: 'Automated Reminder Sent',
    message: 'WhatsApp reminders dispatched for all 6 confirmed appointments for tomorrow.',
    timestamp: '2 hours ago',
    read: true,
    linkNav: 'calls'
  }
];

export const INITIAL_UPCOMING_CALLS: UpcomingCallItem[] = [
  {
    id: 'CALL-1',
    patientId: 'P-1001',
    patientName: 'Rahul Sharma',
    patientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    phone: '+91 98201 44521',
    appointmentTime: 'Tomorrow — 10:30 AM',
    doctorName: 'Dr. Sarah Johnson',
    treatment: 'Root Canal Treatment',
    callStatus: 'Not Called',
    notes: 'Confirm arrival time and pre-procedure fasting instructions'
  },
  {
    id: 'CALL-2',
    patientId: 'P-1002',
    patientName: 'Priya Kapoor',
    patientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    phone: '+91 97690 12345',
    appointmentTime: 'Tomorrow — 11:15 AM',
    doctorName: 'Dr. Sarah Johnson',
    treatment: 'Clear Aligner Review',
    callStatus: 'Confirmed',
    notes: 'Patient confirmed arrival via WhatsApp'
  },
  {
    id: 'CALL-3',
    patientId: 'P-1003',
    patientName: 'Vikram Sen',
    patientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    phone: '+91 98111 88776',
    appointmentTime: 'Tomorrow — 02:00 PM',
    doctorName: 'Dr. Rajesh Rao',
    treatment: 'Dental Implant Post-Op',
    callStatus: 'Call Back',
    notes: 'Requested callback after 4 PM'
  },
  {
    id: 'CALL-4',
    patientId: 'P-1004',
    patientName: 'Ananya Roy',
    patientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    phone: '+91 99203 11223',
    appointmentTime: 'Tomorrow — 03:30 PM',
    doctorName: 'Dr. Priya Mehta',
    treatment: 'Teeth Whitening Consultation',
    callStatus: 'Not Called',
    notes: 'First time visit confirmation'
  },
  {
    id: 'CALL-5',
    patientId: 'P-1005',
    patientName: 'Rajesh Gupta',
    patientAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=250',
    phone: '+91 98330 45678',
    appointmentTime: 'Tomorrow — 04:30 PM',
    doctorName: 'Dr. Rajesh Rao',
    treatment: 'Partial Denture Polish',
    callStatus: 'No Answer',
    notes: 'Rings out, sent reminder SMS'
  }
];

export const DEFAULT_DOCTOR_USER: AuthUser = {
  id: 'DOC-1',
  name: 'Dr. Sarah Johnson',
  email: 'sarah.j@smiledental.com',
  role: 'doctor',
  avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
  title: 'Lead Dental Surgeon & Endodontist',
  specialty: 'Endodontics & Restorative Dentistry',
  operatory: 'Operatory 1 (Chair A)'
};

export const DEFAULT_RECEPTIONIST_USER: AuthUser = {
  id: 'REC-1',
  name: 'Elena Vance',
  email: 'elena.vance@smiledental.com',
  role: 'receptionist',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
  title: 'Head Receptionist & Patient Care Coordinator',
  operatory: 'Front Desk Live Station'
};

export const INITIAL_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'RX-101',
    patientId: 'P-1001',
    patientName: 'Aarav Mehta',
    doctorName: 'Dr. Sarah Johnson',
    date: '13-Sep-2026',
    diagnosis: 'Acute Pulpitis #19 — Post RCT Sitting 1',
    medicines: [
      {
        id: 'M-1',
        name: 'Amoxicillin 500mg',
        dosage: '1 capsule',
        frequency: '1-0-1 (Twice daily)',
        duration: '5 days',
        instructions: 'Take after meals. Complete full course.'
      },
      {
        id: 'M-2',
        name: 'Ketorol DT 10mg',
        dosage: '1 tablet dispersed in water',
        frequency: 'SOS for pain (Max 3/day)',
        duration: '3 days',
        instructions: 'Take only if severe pain occurs.'
      },
      {
        id: 'M-3',
        name: 'Chlorhexidine Gluconate 0.2% Mouthwash',
        dosage: '10 ml undiluted',
        frequency: 'Twice daily',
        duration: '7 days',
        instructions: 'Rinse vigorously for 60 seconds after brushing.'
      }
    ],
    notes: 'Soft diet advised for 48 hours. Avoid chewing hard foods on the lower left quadrant.'
  },
  {
    id: 'RX-102',
    patientId: 'P-1002',
    patientName: 'Sneha Patel',
    doctorName: 'Dr. Sarah Johnson',
    date: '12-Sep-2026',
    diagnosis: 'Deep Occlusal Caries #14',
    medicines: [
      {
        id: 'M-4',
        name: 'Ibuprofen 400mg + Paracetamol 325mg',
        dosage: '1 tablet',
        frequency: '1-0-1',
        duration: '3 days',
        instructions: 'Take after meals.'
      }
    ],
    notes: 'Composite resin filling placed. Mild sensitivity expected for 48 hours.'
  },
  {
    id: 'RX-103',
    patientId: 'P-1003',
    patientName: 'Vikram Malhotra',
    doctorName: 'Dr. Sarah Johnson',
    date: '11-Sep-2026',
    diagnosis: 'Subgingival Scaling & Root Planing',
    medicines: [
      {
        id: 'M-5',
        name: 'Metronidazole 400mg',
        dosage: '1 tablet',
        frequency: '1-1-1 (Three times a day)',
        duration: '5 days',
        instructions: 'Avoid alcohol completely during course.'
      },
      {
        id: 'M-6',
        name: 'Hexidine Mouth Rinse',
        dosage: '15 ml',
        frequency: 'Twice daily',
        duration: '10 days',
        instructions: 'Do not eat or drink for 30 minutes after rinsing.'
      }
    ],
    notes: 'Periodontal maintenance recalled in 6 weeks.'
  }
];

export const INITIAL_MEDICAL_NOTES: MedicalNote[] = [
  {
    id: 'NOTE-101',
    patientId: 'P-1001',
    patientName: 'Aarav Mehta',
    doctorName: 'Dr. Sarah Johnson',
    date: '13-Sep-2026',
    chiefComplaint: 'Severe throbbing pain in lower left molar, worsening at night and upon consuming cold drinks.',
    examinationFindings: 'Tooth #19 exhibits extensive deep dentinal caries involving mesial pulp horn. Tender to vertical percussion (+2). Cold test triggers lingering severe pain > 30s. Periapical radiograph confirms radiolucency widening at distal root apex.',
    diagnosis: 'Symptomatic Irreversible Pulpitis with Symptomatic Apical Periodontitis #19.',
    clinicalNotes: 'Administered 2% Lignocaine with 1:80,000 adrenaline (IANB). Rubber dam isolation placed. Caries excavated. Access cavity prepared. Working lengths: MB 21mm, ML 21mm, Distal 21.5mm. Biomechanical preparation completed up to ProTaper Gold F2. Canal irrigated with 3% NaOCl and 17% EDTA. Calcium hydroxide paste placed as intracanal medicament. Sealed with Cavit G.',
    toothNumbers: ['#19']
  },
  {
    id: 'NOTE-102',
    patientId: 'P-1002',
    patientName: 'Sneha Patel',
    doctorName: 'Dr. Sarah Johnson',
    date: '12-Sep-2026',
    chiefComplaint: 'Food entrapment and mild sensitivity in upper right premolar region.',
    examinationFindings: 'Tooth #14 shows cavitated dark brown caries on occlusal surface. Cold test normal response, no lingering pain. Percussion negative.',
    diagnosis: 'Moderate Chronic Enamel-Dentin Caries #14.',
    clinicalNotes: 'Caries completely excavated with slow-speed round bur. Total etch technique with 37% phosphoric acid. Single Bond universal adhesive light cured for 10s. 3M Filtek Z350 XT A2 shade composite layered in 2mm increments. Finishing done with fine diamond burs and Enhance polishing cups.',
    toothNumbers: ['#14']
  },
  {
    id: 'NOTE-103',
    patientId: 'P-1004',
    patientName: 'Ananya Roy',
    doctorName: 'Dr. Sarah Johnson',
    date: '10-Sep-2026',
    chiefComplaint: 'Desires aesthetic smile improvement and brighter shade for upcoming family wedding.',
    examinationFindings: 'Generalized mild extrinsic discoloration (Vita shade A3.5). Sound enamel integrity without active carious lesions. Mild supragingival calculus in lower anteriors.',
    diagnosis: 'Extrinsic Enamel Staining with Generalized Marginal Gingivitis.',
    clinicalNotes: 'Ultrasonic scaling and prophy paste polishing performed first. Patient counseled on in-office 37.5% Hydrogen Peroxide whitening vs take-home custom trays. Scheduled for 3-cycle in-office whitening next Monday.',
    toothNumbers: ['Full Mouth']
  }
];

export const INITIAL_DENTAL_TREATMENTS: DentalTreatmentRecord[] = [
  {
    id: 'TRT-1',
    patientId: 'P-1001',
    patientName: 'Aarav Mehta',
    doctorName: 'Dr. Sarah Johnson',
    date: '13-Sep-2026',
    treatmentName: 'Root Canal Treatment (Sitting 1 of 2)',
    toothNumbers: ['#19'],
    status: 'In Progress',
    cost: 5000,
    notes: 'BMP complete. Next sitting: Obturation & core buildup.'
  },
  {
    id: 'TRT-2',
    patientId: 'P-1002',
    patientName: 'Sneha Patel',
    doctorName: 'Dr. Sarah Johnson',
    date: '12-Sep-2026',
    treatmentName: 'Tooth Filing (Composite Resin)',
    toothNumbers: ['#14'],
    status: 'Completed',
    cost: 1500,
    notes: 'Cavity restored. Occlusion checked and adjusted.'
  },
  {
    id: 'TRT-3',
    patientId: 'P-1003',
    patientName: 'Vikram Malhotra',
    doctorName: 'Dr. Sarah Johnson',
    date: '11-Sep-2026',
    treatmentName: 'Routine Ultrasonic Scaling',
    toothNumbers: ['Full Mouth'],
    status: 'Completed',
    cost: 1000,
    notes: 'Subgingival scaling and polishing completed.'
  },
  {
    id: 'TRT-4',
    patientId: 'P-1004',
    patientName: 'Ananya Roy',
    doctorName: 'Dr. Sarah Johnson',
    date: '18-Sep-2026',
    treatmentName: 'In-Office Teeth Whitening',
    toothNumbers: ['#13-#23', '#33-#43'],
    status: 'Planned',
    cost: 4000,
    notes: 'Requires gingival barrier application and 3x 15min cycles.'
  },
  {
    id: 'TRT-5',
    patientId: 'P-1005',
    patientName: 'Rajesh Gupta',
    doctorName: 'Dr. Sarah Johnson',
    date: '20-Sep-2026',
    treatmentName: 'Zirconia Crown Placement',
    toothNumbers: ['#36'],
    status: 'Planned',
    cost: 8000,
    notes: 'Impression taken. Waiting for lab dispatch.'
  }
];


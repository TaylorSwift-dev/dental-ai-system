import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { ToastContainer } from './components/common/ToastContainer';
import { VoiceModal } from './components/common/VoiceModal';

// Unified Login Page
import { LoginPage } from './components/auth/LoginPage';

// Dedicated Receptionist Screens
import { ReceptionistMainDashboard } from './components/receptionist/ReceptionistMainDashboard';
import { ReceptionistAppointmentsScreen } from './components/appointments/ReceptionistAppointmentsScreen';
import { WaitingRoomScreen } from './components/receptionist/WaitingRoomScreen';
import { PatientManagementScreen } from './components/patients/PatientManagementScreen';
import { DoctorsDirectoryScreen } from './components/doctors/DoctorsDirectoryScreen';
import { DoctorAvailabilityScreen } from './components/doctors/DoctorAvailabilityScreen';
import { ReceptionistCalendarView } from './components/calendar/ReceptionistCalendarView';
import { ReceptionistBillingScreen } from './components/billing/ReceptionistBillingScreen';
import { RemindersAndCallsScreen } from './components/communication/RemindersAndCallsScreen';
import { ReceptionistReportsScreen } from './components/reports/ReceptionistReportsScreen';
import { PortfolioWebsite } from './components/portfolio/PortfolioWebsite';

// Dedicated Doctor Screens
import { DoctorDashboard } from './components/dashboard/DoctorDashboard';
import { DoctorAppointmentsScreen } from './components/appointments/DoctorAppointmentsScreen';
import { TreatmentsScreen } from './components/treatments/TreatmentsScreen';
import { PrescriptionsScreen } from './components/prescriptions/PrescriptionsScreen';
import { MedicalNotesScreen } from './components/medical-notes/MedicalNotesScreen';
import { DoctorReportsScreen } from './components/reports/DoctorReportsScreen';
import { ConsultationScreen } from './components/consultation/ConsultationScreen';
import { TreatmentPlanScreen } from './components/treatment-plan/TreatmentPlanScreen';
import { FollowUpScreen } from './components/follow-up/FollowUpScreen';

// Shared & System Views
import { VoiceBookingScreen } from './components/voice-booking/VoiceBookingScreen';
import { MessagesScreen } from './components/messages/MessagesScreen';
import { AnalyticsScreen } from './components/analytics/AnalyticsScreen';
import { PatientMobilePortal } from './components/patient-portal/PatientMobilePortal';
import { SettingsScreen } from './components/settings/SettingsScreen';

// Global Overlays & Modals
import { CallManagerModal } from './components/communication/CallManagerModal';
import { GlobalSearchModal } from './components/search/GlobalSearchModal';
import { ScheduleModal } from './components/appointments/ScheduleModal';
import { RescheduleModal } from './components/appointments/RescheduleModal';
import { AddPatientModal } from './components/patients/AddPatientModal';
import { CreateBillModal } from './components/billing/CreateBillModal';

const MainContent: React.FC = () => {
  const { currentNav, userRole } = useApp();

  // If user role is switched to Patient
  if (userRole === 'patient' && (currentNav === 'dashboard' || currentNav === 'assistant')) {
    return <PatientMobilePortal />;
  }

  // Doctor Role Perspective
  if (userRole === 'doctor') {
    switch (currentNav) {
      case 'dashboard':
        return <DoctorDashboard />;
      case 'appointments':
        return <DoctorAppointmentsScreen />;
      case 'patients':
        return <PatientManagementScreen />;
      case 'treatments':
        return <TreatmentsScreen />;
      case 'prescriptions':
        return <PrescriptionsScreen />;
      case 'medical-notes':
        return <MedicalNotesScreen />;
      case 'reports':
        return <DoctorReportsScreen />;
      case 'settings':
        return <SettingsScreen />;

      // Secondary Clinical Tools
      case 'records':
        return <ConsultationScreen />;
      case 'treatment-plans':
        return <TreatmentPlanScreen />;
      case 'follow-ups':
        return <FollowUpScreen />;
      case 'analytics':
        return <AnalyticsScreen />;

      default:
        return <DoctorDashboard />;
    }
  }

  // Front Desk Receptionist Role Views
  switch (currentNav) {
    case 'dashboard':
      return <ReceptionistMainDashboard />;
    case 'appointments':
      return <ReceptionistAppointmentsScreen />;
    case 'waiting-room':
      return <WaitingRoomScreen />;
    case 'patients':
      return <PatientManagementScreen />;
    case 'doctors':
      return <DoctorsDirectoryScreen />;
    case 'availability':
      return <DoctorAvailabilityScreen />;
    case 'calendar':
      return <ReceptionistCalendarView />;
    case 'billing':
      return <ReceptionistBillingScreen />;
    case 'calls':
    case 'reminders':
      return <RemindersAndCallsScreen />;
    case 'reports':
      return <ReceptionistReportsScreen />;
    case 'portfolio':
      return <PortfolioWebsite />;
    case 'settings':
      return <SettingsScreen />;

    // Secondary EHR views if accessed
    case 'records':
      return <ConsultationScreen />;
    case 'assistant':
      return <VoiceBookingScreen />;
    case 'treatment-plans':
      return <TreatmentPlanScreen />;
    case 'follow-ups':
      return <FollowUpScreen />;
    case 'messages':
      return <MessagesScreen />;
    case 'analytics':
      return <AnalyticsScreen />;

    default:
      return <ReceptionistMainDashboard />;
  }
};

const AppLayout: React.FC = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 text-slate-900 font-sans">
      {/* Role-Based Collapsible Sidebar */}
      <Sidebar />

      {/* Main App Container */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header />

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 min-w-0">
          <div className="max-w-7xl mx-auto">
            <MainContent />
          </div>
        </main>
      </div>

      {/* Global Receptionist Modals & Overlays */}
      <CallManagerModal />
      <GlobalSearchModal />
      <ScheduleModal />
      <RescheduleModal />
      <AddPatientModal />
      <CreateBillModal />

      {/* Auxiliary overlays */}
      <VoiceModal />
    </div>
  );
};

interface ProtectedRouteProps {
  allowedRole: 'doctor' | 'receptionist';
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRole, children }) => {
  const { isLoggedIn, userRole } = useApp();

  // 1. Unauthenticated -> Redirect to /login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // 2. Role mismatch -> Redirect to user's authorized role dashboard
  if (userRole !== allowedRole) {
    return <Navigate to={`/${userRole}`} replace />;
  }

  return <>{children}</>;
};

const MainAppRoutes: React.FC = () => {
  const { isLoggedIn, userRole } = useApp();

  return (
    <Routes>
      {/* 1. Login Route: Always renders LoginPage */}
      <Route path="/login" element={<LoginPage />} />

      {/* 2. Doctor Protected Routes */}
      <Route 
        path="/doctor/*" 
        element={
          <ProtectedRoute allowedRole="doctor">
            <AppLayout />
          </ProtectedRoute>
        } 
      />

      {/* 3. Receptionist Protected Routes */}
      <Route 
        path="/receptionist/*" 
        element={
          <ProtectedRoute allowedRole="receptionist">
            <AppLayout />
          </ProtectedRoute>
        } 
      />

      {/* 4. Root & Catch-all Redirect */}
      <Route 
        path="/" 
        element={<Navigate to={isLoggedIn ? `/${userRole}` : '/login'} replace />} 
      />
      <Route 
        path="*" 
        element={<Navigate to={isLoggedIn ? `/${userRole}` : '/login'} replace />} 
      />
    </Routes>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppRoutes />
      <ToastContainer />
    </AppProvider>
  );
}

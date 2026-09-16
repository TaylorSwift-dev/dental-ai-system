import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  Clock, 
  UserCheck, 
  CreditCard, 
  Stethoscope, 
  Plus, 
  PhoneCall, 
  SearchCheck, 
  Receipt, 
  Search, 
  CalendarPlus, 
  ChevronRight, 
  CheckCircle2, 
  Bell, 
  Send, 
  AlertCircle, 
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Star,
  MessageSquare,
  Eye,
  XCircle,
  Radio
} from 'lucide-react';
import { ActionMenu, ActionMenuItem } from '../common/ActionMenu';

export const ReceptionistMainDashboard: React.FC = () => {
  const { 
    appointments, 
    doctors, 
    invoices, 
    checkInPatient, 
    notifyDoctor, 
    updateAppointmentStatus, 
    cancelAppointment,
    startCall, 
    openScheduleModal, 
    openRescheduleModal, 
    openAddPatientModal, 
    openCreateBillModal, 
    openGlobalSearch,
    sendPatientReminder,
    setCurrentNav,
    setSelectedPatientId,
    showToast 
  } = useApp();

  const todayDate = '2026-09-13';
  const tomorrowDate = '2026-09-14';

  const todayAppointments = appointments.filter(a => a.date === todayDate);
  const tomorrowAppointments = appointments.filter(a => a.date === tomorrowDate);
  const waitingPatients = todayAppointments.filter(a => a.status === 'waiting');
  const availableDoctors = doctors.filter(d => d.status === 'available');
  const totalPendingAmount = invoices.reduce((sum, inv) => sum + inv.pending, 0);

  // Immediate Front Desk Attention Item ("Happening Now")
  const happeningNowApt = 
    todayAppointments.find(a => a.status === 'in-consultation') ||
    todayAppointments.find(a => a.status === 'waiting') ||
    todayAppointments.find(a => a.status === 'scheduled');

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Dashboard Greeting & Date Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 rounded-3xl p-6 sm:p-7 text-white shadow-lg shadow-sky-500/15 relative overflow-hidden">
        {/* Subtle decorative tooth watermark */}
        <div className="absolute -right-6 -bottom-10 opacity-10 pointer-events-none">
          <svg className="w-56 h-56 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C9.5 2 7.8 3.5 7.4 5.3C6.7 8.3 7 12 7.5 15.5C8 19 9.5 22 10.5 22C11.5 22 11.5 19.5 12 19.5C12.5 19.5 12.5 22 13.5 22C14.5 22 16 19 16.5 15.5C17 12 17.3 8.3 16.6 5.3C16.2 3.5 14.5 2 12 2Z" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
              <span>Front Desk Live Station • SmileCare Dental</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Good morning, Elena
            </h1>
            <p className="text-xs sm:text-sm text-sky-100 max-w-xl">
              Sunday, 13 September 2026 • Reviewing today's patient queue, active lobby intake, doctor operatories, and desk collections.
            </p>
          </div>

          {/* Quick Search & Direct Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <button
              onClick={() => openGlobalSearch()}
              className="flex items-center gap-2 px-3.5 py-2.5 bg-white/15 hover:bg-white/25 rounded-2xl text-xs sm:text-sm font-semibold border border-white/25 backdrop-blur-md transition-all text-white shadow-inner group"
              title="Search patient by name or phone (⌘K)"
            >
              <Search className="w-4 h-4 text-sky-200 group-hover:text-white" />
              <span className="hidden sm:inline">Search Patient...</span>
              <kbd className="hidden sm:inline text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
            </button>

            <button
              onClick={() => openAddPatientModal(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-sky-700 hover:bg-sky-50 rounded-2xl text-xs sm:text-sm font-extrabold shadow-md transition-all active:scale-98"
            >
              <Plus className="w-4 h-4 text-sky-600" />
              <span>+ Add Patient</span>
            </button>

            <button
              onClick={() => openScheduleModal()}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-900/40 hover:bg-sky-900/60 text-white rounded-2xl text-xs sm:text-sm font-extrabold border border-white/25 backdrop-blur-md transition-all active:scale-98"
            >
              <CalendarPlus className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards (Section 1 of specification) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Today's Appointments */}
        <div 
          onClick={() => setCurrentNav('appointments')}
          className="p-5 bg-white rounded-3xl border border-sky-100 shadow-sm hover:shadow-md hover:border-sky-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today's Appointments</span>
            <div className="w-9 h-9 rounded-2xl bg-sky-50 group-hover:bg-sky-500 text-sky-600 group-hover:text-white flex items-center justify-center transition-colors">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">
            {todayAppointments.length}
          </div>
          <span className="text-xs text-sky-600 font-semibold mt-1 block">
            {todayAppointments.filter(a => a.status === 'completed').length} completed • {todayAppointments.filter(a => a.status === 'scheduled').length} upcoming
          </span>
        </div>

        {/* Waiting Patients */}
        <div 
          onClick={() => setCurrentNav('waiting-room')}
          className="p-5 bg-white rounded-3xl border border-amber-100 shadow-sm hover:shadow-md hover:border-amber-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Waiting Patients</span>
            <div className="w-9 h-9 rounded-2xl bg-amber-50 group-hover:bg-amber-500 text-amber-600 group-hover:text-white flex items-center justify-center transition-colors">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-600 flex items-center gap-2">
            {waitingPatients.length}
            {waitingPatients.length > 0 && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                In Lobby
              </span>
            )}
          </div>
          <span className="text-xs text-amber-700 font-semibold mt-1 block">
            Ready for Operatory consultation
          </span>
        </div>

        {/* Available Doctors */}
        <div 
          onClick={() => setCurrentNav('doctors')}
          className="p-5 bg-white rounded-3xl border border-sky-100 shadow-sm hover:shadow-md hover:border-sky-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Available Doctors</span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 group-hover:bg-emerald-500 text-emerald-600 group-hover:text-white flex items-center justify-center transition-colors">
              <Stethoscope className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">
            {availableDoctors.length} <span className="text-base font-bold text-slate-400">/ {doctors.length}</span>
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">
            🟢 Ready for walk-in / appointments
          </span>
        </div>

        {/* Pending Payments */}
        <div 
          onClick={() => setCurrentNav('billing')}
          className="p-5 bg-white rounded-3xl border border-rose-100 shadow-sm hover:shadow-md hover:border-rose-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Payments</span>
            <div className="w-9 h-9 rounded-2xl bg-rose-50 group-hover:bg-rose-500 text-rose-600 group-hover:text-white flex items-center justify-center transition-colors">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-rose-600 font-mono">
            ₹{totalPendingAmount.toLocaleString()}
          </div>
          <span className="text-xs text-rose-600 font-semibold mt-1 block">
            {invoices.filter(i => i.pending > 0).length} invoices with outstanding dues
          </span>
        </div>
      </div>

      {/* 3. HAPPENING NOW: Priority Front Desk Alert */}
      {happeningNowApt && (
        <div className="bg-gradient-to-r from-amber-50 via-sky-50/70 to-indigo-50/50 border border-amber-200/90 rounded-3xl p-5 sm:p-6 shadow-xs relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-4">
              <div className="relative shrink-0">
                <img
                  src={happeningNowApt.patientAvatar}
                  alt={happeningNowApt.patientName}
                  className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl object-cover ring-2 ring-amber-400/80 shadow-sm"
                />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-500 text-white shadow-xs">
                    <Radio className="w-3 h-3 animate-pulse" />
                    Happening Now
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    happeningNowApt.status === 'waiting'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : happeningNowApt.status === 'in-consultation'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-sky-100 text-sky-900 border border-sky-300'
                  }`}>
                    {happeningNowApt.status === 'waiting' 
                      ? `🟡 Waiting in Lobby (${happeningNowApt.waitingMinutes || 12}m)`
                      : happeningNowApt.status === 'in-consultation'
                      ? '🟢 In Operatory Treatment'
                      : `⏰ Scheduled at ${happeningNowApt.time}`}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                  <span>{happeningNowApt.patientName}</span>
                  <span className="text-xs font-semibold text-slate-500 font-mono">({happeningNowApt.patientPhone || '+91 98201 44521'})</span>
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  <strong className="text-sky-800 font-bold">{happeningNowApt.reason}</strong> • Assigned to <span className="font-semibold text-slate-800">{happeningNowApt.doctorName}</span> ({happeningNowApt.room})
                </p>
              </div>
            </div>

            {/* Direct Contextual Receptionist Action */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              {happeningNowApt.status === 'waiting' && (
                <button
                  onClick={() => notifyDoctor(happeningNowApt.id, happeningNowApt.doctorName, happeningNowApt.patientName)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-sm transition-all"
                >
                  <Bell className="w-4 h-4" />
                  <span>Notify Doctor</span>
                </button>
              )}

              {happeningNowApt.status === 'scheduled' && (
                <button
                  onClick={() => checkInPatient(happeningNowApt.id)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-sm transition-all"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Check In Patient</span>
                </button>
              )}

              {happeningNowApt.status === 'in-consultation' && (
                <button
                  onClick={() => openCreateBillModal({
                    patientId: happeningNowApt.patientId,
                    patientName: happeningNowApt.patientName,
                    treatment: happeningNowApt.reason,
                    doctorName: happeningNowApt.doctorName
                  })}
                  className="flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-sm transition-all"
                >
                  <Receipt className="w-4 h-4" />
                  <span>Generate Bill</span>
                </button>
              )}

              <ActionMenu
                items={[
                  {
                    label: 'Call Patient',
                    icon: PhoneCall,
                    onClick: () => startCall({
                      name: happeningNowApt.patientName,
                      phone: happeningNowApt.patientPhone || '+91 98201 44521',
                      avatar: happeningNowApt.patientAvatar,
                      treatment: happeningNowApt.reason,
                      patientId: happeningNowApt.patientId
                    })
                  },
                  {
                    label: 'Send WhatsApp Reminder',
                    icon: Send,
                    onClick: () => sendPatientReminder(happeningNowApt.id, 'whatsapp')
                  },
                  {
                    label: 'View Patient File',
                    icon: Eye,
                    onClick: () => {
                      setSelectedPatientId(happeningNowApt.patientId);
                      setCurrentNav('patients');
                    }
                  },
                  {
                    label: 'Reschedule',
                    icon: CalendarPlus,
                    onClick: () => openRescheduleModal(happeningNowApt)
                  },
                  {
                    label: 'Cancel Appointment',
                    icon: XCircle,
                    danger: true,
                    divider: true,
                    onClick: () => cancelAppointment(happeningNowApt.id, 'Cancelled from Happening Now alert')
                  }
                ]}
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. Triple Operational Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Waiting Room & Today's Appointments */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 15: Waiting Room Lobby Queue */}
          <div className="bg-white rounded-3xl border border-sky-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-amber-50/50 to-white">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-black text-slate-900">
                    Live Waiting Room
                  </h2>
                  <p className="text-xs text-slate-400">Patients checked in and seated in clinic reception</p>
                </div>
              </div>
              <button
                onClick={() => setCurrentNav('waiting-room')}
                className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
              >
                <span>Manage Lobby</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {waitingPatients.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">
                  No patients currently in the waiting area. Check in an incoming patient below.
                </div>
              ) : (
                waitingPatients.map(apt => (
                  <div key={apt.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-sky-50/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <img
                        src={apt.patientAvatar}
                        alt={apt.patientName}
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-amber-300 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-black text-slate-900">{apt.patientName}</h4>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 animate-pulse">
                            Waiting {apt.waitingMinutes || 12} mins
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {apt.time} • <strong className="text-sky-800">{apt.reason}</strong> • With <span className="font-semibold text-slate-700">{apt.doctorName}</span> ({apt.room})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => notifyDoctor(apt.id, apt.doctorName, apt.patientName)}
                        className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
                        title="Alert doctor that patient is ready"
                      >
                        <Bell className="w-3.5 h-3.5" />
                        <span>Notify Doctor</span>
                      </button>

                      <ActionMenu
                        items={[
                          {
                            label: 'Send to Operatory',
                            icon: UserCheck,
                            onClick: () => updateAppointmentStatus(apt.id, 'in-consultation')
                          },
                          {
                            label: 'Call Patient',
                            icon: PhoneCall,
                            onClick: () => startCall({
                              name: apt.patientName,
                              phone: apt.patientPhone || '+91 98201 44521',
                              avatar: apt.patientAvatar,
                              treatment: apt.reason,
                              patientId: apt.patientId
                            })
                          },
                          {
                            label: 'Send WhatsApp Reminder',
                            icon: Send,
                            onClick: () => sendPatientReminder(apt.id, 'whatsapp')
                          },
                          {
                            label: 'View Patient Record',
                            icon: Eye,
                            onClick: () => {
                              setSelectedPatientId(apt.patientId);
                              setCurrentNav('patients');
                            }
                          },
                          {
                            label: 'Reschedule',
                            icon: CalendarPlus,
                            onClick: () => openRescheduleModal(apt)
                          },
                          {
                            label: 'Cancel Appointment',
                            icon: XCircle,
                            danger: true,
                            divider: true,
                            onClick: () => cancelAppointment(apt.id, 'Cancelled while in waiting lobby')
                          }
                        ]}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Section 3: Today's Appointments Feed */}
          <div className="bg-white rounded-3xl border border-sky-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-sky-600" />
                  Today's Scheduled Appointments ({todayAppointments.length})
                </h2>
                <p className="text-xs text-slate-400">Real-time status tracking and front desk check-in</p>
              </div>
              <button
                onClick={() => setCurrentNav('appointments')}
                className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
              >
                <span>View Full Schedule</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {todayAppointments.slice(0, 6).map(apt => (
                <div key={apt.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="text-center w-14 shrink-0">
                      <span className="text-xs font-mono font-black text-sky-700 bg-sky-50 px-2 py-1 rounded-lg border border-sky-100 block">
                        {apt.time}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">{apt.room || 'Operatory 1'}</span>
                    </div>

                    <img
                      src={apt.patientAvatar}
                      alt={apt.patientName}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                    />

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">{apt.patientName}</h4>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          apt.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                          apt.status === 'waiting' ? 'bg-amber-100 text-amber-800' :
                          apt.status === 'in-consultation' ? 'bg-teal-100 text-teal-800' :
                          apt.status === 'cancelled' ? 'bg-rose-100 text-rose-800' :
                          'bg-sky-100 text-sky-800'
                        }`}>
                          {apt.status}
                        </span>

                        {apt.paymentStatus && (
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            apt.paymentStatus === 'Paid' ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'
                          }`}>
                            {apt.paymentStatus}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {apt.reason} • <strong className="text-slate-700">{apt.doctorName}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Actions for Today: Contextual Primary Action + ActionMenu */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {apt.status === 'scheduled' && (
                      <button
                        onClick={() => checkInPatient(apt.id)}
                        className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Check In</span>
                      </button>
                    )}

                    {apt.status === 'waiting' && (
                      <button
                        onClick={() => notifyDoctor(apt.id, apt.doctorName, apt.patientName)}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
                      >
                        <Bell className="w-3.5 h-3.5" />
                        <span>Notify Doc</span>
                      </button>
                    )}

                    {apt.status === 'in-consultation' && (
                      <button
                        onClick={() => updateAppointmentStatus(apt.id, 'completed')}
                        className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Complete</span>
                      </button>
                    )}

                    {apt.status === 'completed' && apt.paymentStatus === 'Pending' && (
                      <button
                        onClick={() => {
                          setSelectedPatientId(apt.patientId);
                          openCreateBillModal({ patientId: apt.patientId, patientName: apt.patientName });
                        }}
                        className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
                      >
                        <Receipt className="w-3.5 h-3.5" />
                        <span>Collect Bill</span>
                      </button>
                    )}

                    {apt.status === 'completed' && apt.paymentStatus !== 'Pending' && (
                      <button
                        onClick={() => {
                          setSelectedPatientId(apt.patientId);
                          setCurrentNav('patients');
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Record</span>
                      </button>
                    )}

                    {apt.status === 'cancelled' && (
                      <button
                        onClick={() => openRescheduleModal(apt)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <CalendarPlus className="w-3.5 h-3.5" />
                        <span>Rebook</span>
                      </button>
                    )}

                    <ActionMenu
                      items={[
                        {
                          label: 'Call Patient',
                          icon: PhoneCall,
                          onClick: () => startCall({
                            name: apt.patientName,
                            phone: apt.patientPhone || '+91 98201 44521',
                            avatar: apt.patientAvatar,
                            treatment: apt.reason,
                            patientId: apt.patientId
                          })
                        },
                        {
                          label: 'Send WhatsApp Reminder',
                          icon: Send,
                          onClick: () => sendPatientReminder(apt.id, 'whatsapp')
                        },
                        {
                          label: 'View Patient File',
                          icon: Eye,
                          onClick: () => {
                            setSelectedPatientId(apt.patientId);
                            setCurrentNav('patients');
                          }
                        },
                        {
                          label: 'Reschedule',
                          icon: CalendarPlus,
                          onClick: () => openRescheduleModal(apt)
                        },
                        ...(apt.status !== 'completed' && apt.status !== 'cancelled' ? [{
                          label: 'Cancel Appointment',
                          icon: XCircle,
                          danger: true,
                          divider: true,
                          onClick: () => cancelAppointment(apt.id, 'Cancelled from front desk')
                        }] : [])
                      ]}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Doctors Live Availability & Tomorrow Preview */}
        <div className="space-y-6">
          {/* Section 8 & 9: Doctor Live Status (from Reference UI) */}
          <div className="bg-white rounded-3xl border border-sky-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-black text-slate-900">Doctors Live Availability</h3>
                <p className="text-xs text-slate-400">Real-time operatory status</p>
              </div>
              <button
                onClick={() => setCurrentNav('availability')}
                className="text-xs font-bold text-sky-600 hover:text-sky-700"
              >
                Match Slot
              </button>
            </div>

            <div className="space-y-3">
              {doctors.map(doc => (
                <div key={doc.id} className="p-3 bg-sky-50/40 hover:bg-sky-50 rounded-2xl border border-sky-100 flex items-center justify-between gap-3 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={doc.avatar} alt={doc.name} className="w-10 h-10 rounded-xl object-cover ring-1 ring-sky-200" />
                      <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                        doc.status === 'available' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}></span>
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900">{doc.name}</h4>
                      <p className="text-[11px] text-slate-400 truncate max-w-[140px]">{doc.specialty}</p>
                      <span className="text-[10px] font-bold text-sky-700">
                        Next: {doc.nextAvailableSlot}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => openScheduleModal({ doctorId: doc.id, doctorName: doc.name, doctorSpecialty: doc.specialty })}
                      className="px-2.5 py-1 text-[11px] font-extrabold rounded-lg bg-white hover:bg-sky-600 hover:text-white text-sky-700 border border-sky-200 transition-all shadow-xs"
                    >
                      Book
                    </button>
                    <ActionMenu
                      items={[
                        {
                          label: 'Book Appointment',
                          icon: CalendarPlus,
                          onClick: () => openScheduleModal({ doctorId: doc.id, doctorName: doc.name, doctorSpecialty: doc.specialty })
                        },
                        {
                          label: 'View Day Schedule',
                          icon: Eye,
                          onClick: () => setCurrentNav('availability')
                        },
                        {
                          label: `Intercom ${doc.name}`,
                          icon: Radio,
                          onClick: () => showToast(`Intercom line opened to ${doc.name} (${doc.room})`, 'info')
                        }
                      ]}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Tomorrow's Appointments Glance */}
          <div className="bg-white rounded-3xl border border-sky-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-black text-slate-900">Tomorrow's Schedule</h3>
                <p className="text-xs text-slate-400">{tomorrowAppointments.length} visits lined up</p>
              </div>
              <button
                onClick={() => setCurrentNav('appointments')}
                className="text-xs font-bold text-sky-600 hover:text-sky-700"
              >
                View All
              </button>
            </div>

            <div className="space-y-2.5">
              {tomorrowAppointments.slice(0, 4).map(apt => (
                <div key={apt.id} className="p-3 bg-slate-50 hover:bg-sky-50/50 rounded-2xl border border-slate-200/70 flex items-center justify-between gap-2 transition-colors">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-mono font-bold text-sky-700">{apt.time}</span>
                      <h4 className="text-xs font-extrabold text-slate-900 truncate">{apt.patientName}</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">{apt.reason}</p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => sendPatientReminder(apt.id, 'whatsapp')}
                      className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 border border-emerald-200 transition-all flex items-center gap-1 shadow-xs"
                      title="Send WhatsApp Reminder"
                    >
                      <Send className="w-3 h-3" />
                      <span>Remind</span>
                    </button>

                    <ActionMenu
                      items={[
                        {
                          label: 'Call to Confirm',
                          icon: PhoneCall,
                          onClick: () => startCall({
                            name: apt.patientName,
                            phone: apt.patientPhone || '+91 98450 77665',
                            avatar: apt.patientAvatar,
                            treatment: apt.reason
                          })
                        },
                        {
                          label: 'Reschedule',
                          icon: CalendarPlus,
                          onClick: () => openRescheduleModal(apt)
                        },
                        {
                          label: 'View Patient File',
                          icon: Eye,
                          onClick: () => {
                            setSelectedPatientId(apt.patientId);
                            setCurrentNav('patients');
                          }
                        },
                        {
                          label: 'Cancel Appointment',
                          icon: XCircle,
                          danger: true,
                          divider: true,
                          onClick: () => cancelAppointment(apt.id, 'Cancelled for tomorrow')
                        }
                      ]}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 13: Desk Billing & Payments Pending */}
          <div className="bg-white rounded-3xl border border-sky-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-black text-slate-900">Desk Payment Counter</h3>
                <p className="text-xs text-slate-400">₹{totalPendingAmount.toLocaleString()} pending balance</p>
              </div>
              <button
                onClick={() => setCurrentNav('billing')}
                className="text-xs font-bold text-sky-600 hover:text-sky-700"
              >
                Invoices
              </button>
            </div>

            <div className="space-y-2.5">
              {invoices.filter(i => i.pending > 0).slice(0, 3).map(inv => (
                <div key={inv.id} className="p-3 bg-rose-50/50 rounded-2xl border border-rose-100 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <h4 className="text-xs font-extrabold text-slate-900 truncate">{inv.patientName}</h4>
                    <span className="text-[10px] text-slate-500 block truncate">{inv.treatment}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-black text-rose-600 block font-mono">₹{inv.pending.toLocaleString()}</span>
                    <button
                      onClick={() => {
                        setCurrentNav('billing');
                      }}
                      className="text-[10px] font-bold text-sky-700 hover:underline"
                    >
                      Collect Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

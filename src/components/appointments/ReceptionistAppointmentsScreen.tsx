import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppointmentStatus } from '../../types';
import { 
  Calendar, 
  Clock, 
  Search, 
  Filter, 
  Plus, 
  PhoneCall, 
  UserCheck, 
  RotateCcw, 
  XCircle, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  User,
  Sparkles,
  Bell,
  Eye,
  Receipt
} from 'lucide-react';
import { ActionMenu } from '../common/ActionMenu';

export const ReceptionistAppointmentsScreen: React.FC = () => {
  const { 
    appointments, 
    doctors, 
    checkInPatient, 
    notifyDoctor,
    updateAppointmentStatus, 
    rescheduleAppointment, 
    cancelAppointment, 
    sendPatientReminder, 
    startCall, 
    openScheduleModal, 
    openRescheduleModal,
    openCreateBillModal,
    setSelectedPatientId,
    setCurrentNav,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'today' | 'tomorrow' | 'all'>('today');
  const [filterDoctor, setFilterDoctor] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const todayDate = '2026-09-13';
  const tomorrowDate = '2026-09-14';

  const displayedAppointments = appointments.filter(apt => {
    // Tab filter
    if (activeTab === 'today' && apt.date !== todayDate) return false;
    if (activeTab === 'tomorrow' && apt.date !== tomorrowDate) return false;

    // Doctor filter
    if (filterDoctor !== 'all' && apt.doctorName !== filterDoctor) return false;

    // Status filter
    if (filterStatus !== 'all' && apt.status !== filterStatus) return false;

    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = apt.patientName.toLowerCase().includes(q);
      const matchReason = apt.reason.toLowerCase().includes(q);
      const matchPhone = apt.patientPhone?.includes(q) || false;
      if (!matchName && !matchReason && !matchPhone) return false;
    }

    return true;
  });

  const todayCount = appointments.filter(a => a.date === todayDate).length;
  const tomorrowCount = appointments.filter(a => a.date === tomorrowDate).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-sky-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
              Reception Scheduling Hub
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Clinic Appointments
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage today's check-ins, tomorrow's confirmations & reminders, and overall operatory bookings.
          </p>
        </div>

        <button
          onClick={() => openScheduleModal()}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-sky-600/25 transition-all active:scale-98 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Book Appointment</span>
        </button>
      </div>

      {/* Navigation Tabs (Today's / Tomorrow's / All) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center bg-white p-1 rounded-2xl border border-sky-100 shadow-xs self-start">
          <button
            onClick={() => setActiveTab('today')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'today'
                ? 'bg-sky-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Today's Appointments</span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
              activeTab === 'today' ? 'bg-white/25 text-white' : 'bg-sky-100 text-sky-800'
            }`}>
              {todayCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('tomorrow')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'tomorrow'
                ? 'bg-sky-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Tomorrow's Appointments</span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
              activeTab === 'tomorrow' ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-700'
            }`}>
              {tomorrowCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-sky-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <span>All ({appointments.length})</span>
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search patient, treatment, phone..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <select
            value={filterDoctor}
            onChange={e => setFilterDoctor(e.target.value)}
            className="px-3 py-2 text-xs font-bold bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">All Doctors</option>
            {doctors.map(d => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-xs font-bold bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 capitalize"
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="waiting">Waiting in Lobby</option>
            <option value="in-consultation">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="no-show">No Show</option>
          </select>
        </div>
      </div>

      {/* Appointment Cards List */}
      <div className="bg-white rounded-3xl border border-sky-100 shadow-sm overflow-hidden divide-y divide-slate-100">
        {displayedAppointments.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs sm:text-sm">
            No appointments found matching the current filters.
          </div>
        ) : (
          displayedAppointments.map(apt => (
            <div 
              key={apt.id} 
              className="p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-sky-50/30 transition-colors"
            >
              {/* Left Patient & Appointment Info */}
              <div className="flex items-start gap-4">
                <div className="text-center w-16 shrink-0">
                  <span className="text-xs font-mono font-black text-sky-700 bg-sky-50 px-2.5 py-1 rounded-xl border border-sky-100 block">
                    {apt.time}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold mt-1 block">{apt.date}</span>
                </div>

                <img
                  src={apt.patientAvatar}
                  alt={apt.patientName}
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-sky-100 shrink-0"
                />

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 
                      onClick={() => {
                        setSelectedPatientId(apt.patientId);
                        setCurrentNav('patients');
                      }}
                      className="text-sm sm:text-base font-black text-slate-900 hover:text-sky-700 cursor-pointer"
                    >
                      {apt.patientName}
                    </h3>

                    {/* Status Badge */}
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${
                      apt.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                      apt.status === 'waiting' ? 'bg-amber-100 text-amber-800 animate-pulse' :
                      apt.status === 'in-consultation' ? 'bg-teal-100 text-teal-800' :
                      apt.status === 'cancelled' ? 'bg-rose-100 text-rose-800' :
                      apt.status === 'no-show' ? 'bg-slate-100 text-slate-700' :
                      'bg-sky-100 text-sky-800'
                    }`}>
                      {apt.status}
                    </span>

                    {/* Confirmation status tag (Especially for Tomorrow) */}
                    {apt.confirmationStatus && (
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        apt.confirmationStatus === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        apt.confirmationStatus === 'reminder-sent' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {apt.confirmationStatus === 'confirmed' ? '✓ Confirmed' :
                         apt.confirmationStatus === 'reminder-sent' ? '✉ Reminder Sent' : '⏳ Pending Confirmation'}
                      </span>
                    )}

                    {/* Payment Status */}
                    {apt.paymentStatus && (
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        apt.paymentStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                      }`}>
                        Payment: {apt.paymentStatus}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 font-medium">
                    <strong className="text-sky-900">{apt.reason}</strong> {apt.tooth ? `(${apt.tooth})` : ''} • Attending: <span className="text-slate-800 font-bold">{apt.doctorName}</span> ({apt.room || 'Operatory 1'})
                  </p>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="font-mono">{apt.patientPhone || '+91 98201 44521'}</span>
                    <span>• Est: {apt.estimatedDuration || '30 mins'}</span>
                  </div>
                </div>
              </div>

              {/* Right Receptionist Actions: Contextual Primary Action + ActionMenu */}
              <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
                {/* Contextual Primary Action */}
                {apt.date === todayDate && apt.status === 'scheduled' && (
                  <button
                    onClick={() => checkInPatient(apt.id)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Check In</span>
                  </button>
                )}

                {apt.date === todayDate && apt.status === 'waiting' && (
                  <button
                    onClick={() => notifyDoctor(apt.id, apt.doctorName, apt.patientName)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>Notify Doc</span>
                  </button>
                )}

                {apt.status === 'in-consultation' && (
                  <button
                    onClick={() => updateAppointmentStatus(apt.id, 'completed')}
                    className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Complete</span>
                  </button>
                )}

                {apt.date === tomorrowDate && (
                  <button
                    onClick={() => sendPatientReminder(apt.id, 'whatsapp')}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold transition-all shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Reminder</span>
                  </button>
                )}

                {apt.date !== todayDate && apt.date !== tomorrowDate && apt.status === 'scheduled' && (
                  <button
                    onClick={() => sendPatientReminder(apt.id, 'whatsapp')}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-sky-50 hover:bg-sky-600 hover:text-white text-sky-700 border border-sky-200 rounded-xl text-xs font-bold transition-all shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Reminder</span>
                  </button>
                )}

                {apt.status === 'completed' && apt.paymentStatus === 'Pending' && (
                  <button
                    onClick={() => {
                      setSelectedPatientId(apt.patientId);
                      openCreateBillModal({ patientId: apt.patientId, patientName: apt.patientName });
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
                  >
                    <Receipt className="w-3.5 h-3.5" />
                    <span>Collect Bill</span>
                  </button>
                )}

                {apt.status === 'cancelled' && (
                  <button
                    onClick={() => openRescheduleModal(apt)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Rebook</span>
                  </button>
                )}

                {/* Secondary Action Menu (...) */}
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
                        time: `${apt.date} ${apt.time}`,
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
                      label: 'Reschedule Appointment',
                      icon: RotateCcw,
                      onClick: () => openRescheduleModal(apt)
                    },
                    ...(apt.status !== 'cancelled' && apt.status !== 'completed' ? [{
                      label: 'Cancel Appointment',
                      icon: XCircle,
                      danger: true,
                      divider: true,
                      onClick: () => cancelAppointment(apt.id, 'Cancelled from appointments manager')
                    }] : [])
                  ]}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

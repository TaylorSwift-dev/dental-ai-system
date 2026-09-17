import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  Clock, 
  UserCheck, 
  CreditCard, 
  Stethoscope, 
  PhoneCall, 
  ChevronRight, 
  ArrowRight,
  Radio,
  CheckCircle2,
  AlertCircle,
  Plus
} from 'lucide-react';

export const ReceptionistMainDashboard: React.FC = () => {
  const { 
    appointments, 
    doctors, 
    invoices, 
    setCurrentNav,
    openAddPatientModal 
  } = useApp();

  const todayDate = '2026-09-13';
  const tomorrowDate = '2026-09-14';

  const todayAppointments = appointments.filter(a => a.date === todayDate);
  const tomorrowAppointments = appointments.filter(a => a.date === tomorrowDate);
  
  const waitingPatients = todayAppointments.filter(a => a.status === 'waiting');
  const inTreatmentPatients = todayAppointments.filter(a => a.status === 'in-consultation');
  const attentionCount = todayAppointments.filter(a => a.status === 'waiting' || a.status === 'scheduled').length;

  const availableDoctors = doctors.filter(d => d.status === 'available');
  const busyDoctors = doctors.filter(d => d.status !== 'available');
  
  const pendingInvoices = invoices.filter(i => i.pending > 0);
  const totalPendingAmount = invoices.reduce((sum, inv) => sum + inv.pending, 0);

  // Tomorrow timing calculation
  const tomorrowTimes = tomorrowAppointments.map(a => a.time).sort();
  const firstTomorrow = tomorrowTimes.length > 0 ? tomorrowTimes[0] : '09:30 AM';
  const lastTomorrow = tomorrowTimes.length > 0 ? tomorrowTimes[tomorrowTimes.length - 1] : '05:30 PM';

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* 1. GOOD MORNING SECTION */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 rounded-3xl p-6 sm:p-7 text-white shadow-md shadow-sky-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            Good morning, Elena <span className="inline-block">👋</span>
          </h1>
          <p className="text-sm font-semibold text-sky-100 mt-1">
            Sunday, 13 September 2026
          </p>
        </div>

        <button
          onClick={() => openAddPatientModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-sky-50 text-sky-700 rounded-2xl text-xs sm:text-sm font-extrabold shadow-sm transition-all active:scale-98 self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4 text-sky-600" />
          <span>+ Add Patient</span>
        </button>
      </div>

      {/* 2. TODAY'S OVERVIEW */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Today's Overview
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Appointments - Blue */}
          <div 
            onClick={() => setCurrentNav('appointments')}
            className="bg-blue-50/60 hover:bg-blue-50 border border-blue-200/80 hover:border-blue-300 rounded-3xl p-5 sm:p-6 shadow-xs hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Appointments</span>
              <div className="w-9 h-9 rounded-2xl bg-blue-100 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-blue-950">
              {todayAppointments.length}
            </div>
            <div className="text-xs font-bold text-blue-600 mt-1">
              Appointments
            </div>
          </div>

          {/* Waiting - Orange */}
          <div 
            onClick={() => setCurrentNav('waiting-room')}
            className="bg-amber-50/60 hover:bg-amber-50 border border-amber-200/80 hover:border-amber-300 rounded-3xl p-5 sm:p-6 shadow-xs hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Waiting</span>
              <div className="w-9 h-9 rounded-2xl bg-amber-100 group-hover:bg-amber-600 text-amber-600 group-hover:text-white flex items-center justify-center transition-colors">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-amber-950">
              {waitingPatients.length}
            </div>
            <div className="text-xs font-bold text-amber-700 mt-1">
              Waiting
            </div>
          </div>

          {/* Doctors - Green */}
          <div 
            onClick={() => setCurrentNav('doctors')}
            className="bg-emerald-50/60 hover:bg-emerald-50 border border-emerald-200/80 hover:border-emerald-300 rounded-3xl p-5 sm:p-6 shadow-xs hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Doctors</span>
              <div className="w-9 h-9 rounded-2xl bg-emerald-100 group-hover:bg-emerald-600 text-emerald-600 group-hover:text-white flex items-center justify-center transition-colors">
                <Stethoscope className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-950">
              {availableDoctors.length}
            </div>
            <div className="text-xs font-bold text-emerald-700 mt-1">
              Doctors
            </div>
          </div>

          {/* Pending - Red/Pink */}
          <div 
            onClick={() => setCurrentNav('billing')}
            className="bg-rose-50/60 hover:bg-rose-50 border border-rose-200/80 hover:border-rose-300 rounded-3xl p-5 sm:p-6 shadow-xs hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">Pending</span>
              <div className="w-9 h-9 rounded-2xl bg-rose-100 group-hover:bg-rose-600 text-rose-600 group-hover:text-white flex items-center justify-center transition-colors">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-rose-950 font-mono">
              ₹{totalPendingAmount.toLocaleString()}
            </div>
            <div className="text-xs font-bold text-rose-700 mt-1">
              Pending
            </div>
          </div>
        </div>
      </div>

      {/* 3. TODAY AT A GLANCE (Compact Summaries with View Links) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Today at a Glance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: Happening Now */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between hover:border-sky-300 transition-all">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Happening Now
                </span>
              </div>
              <div className="text-base sm:text-lg font-black text-slate-900 mt-1">
                🟢 {inTreatmentPatients.length || 1} in treatment
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {attentionCount} appointments need attention
              </p>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-100">
              <button
                onClick={() => setCurrentNav('appointments')}
                className="w-full flex items-center justify-between text-xs font-bold text-sky-600 hover:text-sky-700 group"
              >
                <span>View Appointments</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 2: Waiting */}
          <div className="bg-white border border-amber-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between hover:border-amber-300 transition-all">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Waiting Room
                </span>
              </div>
              <div className="text-base sm:text-lg font-black text-slate-900 mt-1">
                🟠 {waitingPatients.length} patients waiting
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Oldest wait: 14 minutes
              </p>
            </div>

            <div className="pt-4 mt-3 border-t border-amber-100">
              <button
                onClick={() => setCurrentNav('waiting-room')}
                className="w-full flex items-center justify-between text-xs font-bold text-amber-700 hover:text-amber-800 group"
              >
                <span>View Waiting Room</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 3: Doctors */}
          <div className="bg-white border border-emerald-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-all">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Doctors
                </span>
              </div>
              <div className="text-base sm:text-lg font-black text-slate-900 mt-1">
                🟢 {availableDoctors.length} of {doctors.length} available
              </div>
              <p className="text-xs text-slate-500 mt-1">
                🟢 {availableDoctors.length} Available • 🔴 {busyDoctors.length} Busy
              </p>
            </div>

            <div className="pt-4 mt-3 border-t border-emerald-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setCurrentNav('doctors')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
              >
                <span>View Doctors</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setCurrentNav('availability')}
                className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 group"
              >
                <span>Availability</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 4: Payments */}
          <div className="bg-white border border-rose-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between hover:border-rose-300 transition-all">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
                  Payments
                </span>
              </div>
              <div className="text-base sm:text-lg font-black text-slate-900 mt-1 font-mono">
                🔴 ₹{totalPendingAmount.toLocaleString()} pending
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {pendingInvoices.length} invoices outstanding
              </p>
            </div>

            <div className="pt-4 mt-3 border-t border-rose-100">
              <button
                onClick={() => setCurrentNav('billing')}
                className="w-full flex items-center justify-between text-xs font-bold text-rose-700 hover:text-rose-800 group"
              >
                <span>View Billing</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. TOMORROW PREVIEW & CALLS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 pt-2">
        {/* Tomorrow */}
        <div className="bg-gradient-to-r from-sky-50/60 via-cyan-50/40 to-white border border-sky-200/70 rounded-3xl p-5 sm:p-6 shadow-xs flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Calendar className="w-4 h-4 text-sky-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
                Tomorrow's Schedule
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">
              {tomorrowAppointments.length} appointments
            </div>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              First: {firstTomorrow} &bull; Last: {lastTomorrow}
            </p>
          </div>

          <button
            onClick={() => setCurrentNav('appointments')}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-sky-50 text-sky-700 rounded-2xl text-xs font-bold border border-sky-200 shadow-xs transition-all active:scale-98 shrink-0"
          >
            <span>View Tomorrow</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Pending Calls Summary */}
        <div className="bg-gradient-to-r from-indigo-50/60 via-blue-50/40 to-white border border-indigo-200/70 rounded-3xl p-5 sm:p-6 shadow-xs flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <PhoneCall className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
                Front Desk Calls
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">
              3 calls pending
            </div>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Recall follow-ups & pre-visit confirmations
            </p>
          </div>

          <button
            onClick={() => setCurrentNav('calls')}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-indigo-50 text-indigo-700 rounded-2xl text-xs font-bold border border-indigo-200 shadow-xs transition-all active:scale-98 shrink-0"
          >
            <span>View Calls</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

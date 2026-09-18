import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CalendarDays, 
  Users, 
  HeartPulse, 
  IndianRupee, 
  Clock, 
  Sparkles, 
  ArrowUpRight, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight,
  PlayCircle,
  ExternalLink,
  Mic,
  Activity
} from 'lucide-react';
import { SmartTrafficCard } from '../traffic/SmartTrafficCard';

export const DoctorDashboard: React.FC = () => {
  const { 
    appointments, 
    followUps, 
    invoices, 
    setCurrentNav, 
    setSelectedPatientId, 
    openVoiceModal,
    showToast,
    currentUser
  } = useApp();

  const todaysAppointments = appointments.filter(a => a.date === '2026-09-13');
  const waitingPatients = appointments.filter(a => a.status === 'waiting');
  const pendingFollowUps = followUps.filter(f => f.tabCategory === 'due_today' || f.status === 'Call required');
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.paid, 0);

  const handleStartConsultation = (patientId: string) => {
    setSelectedPatientId(patientId);
    setCurrentNav('records');
    showToast("Starting consultation with AI Voice Notes enabled", 'info');
  };

  const handleViewPatient = (patientId: string) => {
    setSelectedPatientId(patientId);
    setCurrentNav('patients');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
              Operatory 1 • Clinical Session
            </span>
            <span className="text-xs text-slate-400">Sunday, 13 September 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            Good morning, {currentUser?.name || 'Dr. Sarah Johnson'} <span className="inline-block">👋</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-0.5">
            Here's your clinical schedule, waiting queue, and operative workflow today.
          </p>
        </div>

        {/* Quick Voice Command Bar */}
        <div className="flex items-center gap-3">
          <button
            onClick={openVoiceModal}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-sm font-semibold transition-all group"
          >
            <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-sm">
              <Mic className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            </div>
            <span>"Show today's patients"</span>
          </button>

          <button
            onClick={() => setCurrentNav('appointments')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-all shadow-sm"
          >
            <CalendarDays className="w-4 h-4" />
            <span>Schedule</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Today's Appointments */}
        <div 
          onClick={() => setCurrentNav('appointments')}
          className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-card hover:border-teal-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Today's Appointments
            </span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CalendarDays className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">
            {todaysAppointments.length}
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-1 font-medium">
            <span className="text-teal-600 font-bold">4 completed</span> • 2 upcoming
          </div>
        </div>

        {/* Patients Waiting */}
        <div 
          onClick={() => setCurrentNav('appointments')}
          className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-card hover:border-amber-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Patients Waiting
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 mb-1">
            {waitingPatients.length}
          </div>
          <div className="text-xs text-amber-700 flex items-center gap-1 font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            In reception lobby
          </div>
        </div>

        {/* Follow-ups Pending */}
        <div 
          onClick={() => setCurrentNav('follow-ups')}
          className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-card hover:border-sky-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Follow-ups Pending
            </span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <HeartPulse className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">
            {pendingFollowUps.length}
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-1 font-medium">
            <span className="text-sky-600 font-bold">1 urgent review</span> • 4 routine
          </div>
        </div>

        {/* Revenue Today */}
        <div 
          onClick={() => setCurrentNav('billing')}
          className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-card hover:border-emerald-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Revenue Collected
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">
            ₹{totalRevenue.toLocaleString()}
          </div>
          <div className="text-xs text-emerald-600 flex items-center gap-1 font-bold">
            <ArrowUpRight className="w-3.5 h-3.5" /> +18% vs weekly avg
          </div>
        </div>
      </div>

      {/* Smart Traffic Leave-Now Spotlight */}
      <SmartTrafficCard appointment={appointments[0]} />

      {/* Prominent "Today's Patients" Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              Today's Patients
              <span className="px-2 py-0.5 rounded-full text-xs font-extrabold bg-teal-100 text-teal-800">
                {todaysAppointments.length} Total
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Live operatory queue with AI-generated clinical summaries
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Sort by:</span>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
              Appointment Time
            </span>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {todaysAppointments.map((apt) => {
            const isWaiting = apt.status === 'waiting';
            return (
              <div 
                key={apt.id} 
                className="p-5 sm:p-6 hover:bg-slate-50/70 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-5"
              >
                {/* Left: Patient Avatar & Core Details */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="relative shrink-0">
                    <img
                      src={apt.patientAvatar}
                      alt={apt.patientName}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-sm"
                    />
                    {isWaiting && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-white animate-pulse" title="In Waiting Area" />
                    )}
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-black text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200 font-mono">
                        {apt.time}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900">
                        {apt.patientName}
                      </h3>
                      {apt.tooth && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                          Tooth {apt.tooth}
                        </span>
                      )}
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                        isWaiting 
                          ? 'bg-amber-50 text-amber-700 border-amber-200' 
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {isWaiting ? 'Waiting in Lobby' : 'Scheduled'}
                      </span>
                    </div>

                    {/* Reason & History */}
                    <div className="text-xs text-slate-600 flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-slate-800">Reason:</span>
                      <span>{apt.reason}</span>
                      {apt.isPreviousPatient && (
                        <span className="inline-flex items-center gap-1 text-slate-500 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                          <CheckCircle2 className="w-3 h-3 text-teal-600" />
                          Previous patient: {apt.previousVisitSummary || 'Treated in 2025'}
                        </span>
                      )}
                    </div>

                    {/* AI-generated One-line Summary (Visually highlighted but subtle) */}
                    <div className="inline-flex items-start gap-2 p-2.5 rounded-xl bg-teal-50/70 border border-teal-200/80 text-teal-950 text-xs mt-1 shadow-soft">
                      <Sparkles className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-teal-800 mr-1">AI Summary:</span>
                        <span className="text-slate-800 leading-relaxed font-medium">
                          "{apt.aiSummary}"
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2.5 shrink-0 self-end lg:self-center">
                  <button
                    onClick={() => handleViewPatient(apt.patientId)}
                    className="px-4 py-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-xl transition-all"
                  >
                    View Patient
                  </button>
                  <button
                    onClick={() => handleStartConsultation(apt.patientId)}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-xl transition-all shadow-sm shadow-teal-600/30"
                  >
                    <PlayCircle className="w-4 h-4" />
                    Start Consultation
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

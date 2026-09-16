import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CalendarDays, 
  Plus, 
  Mic, 
  Clock, 
  User, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  MoreVertical,
  PlayCircle
} from 'lucide-react';
import { AppointmentStatus } from '../../types';

export const AppointmentsScreen: React.FC = () => {
  const { 
    appointments, 
    updateAppointmentStatus, 
    setCurrentNav, 
    setSelectedPatientId, 
    openVoiceModal,
    showToast 
  } = useApp();

  const [calendarView, setCalendarView] = useState<'Day' | 'Week' | 'Month'>('Day');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showNewModal, setShowNewModal] = useState<boolean>(false);

  const statusColors: Record<AppointmentStatus, { bg: string; text: string; border: string }> = {
    'confirmed': { bg: 'bg-sky-50', text: 'text-sky-800', border: 'border-sky-200' },
    'waiting': { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
    'in-progress': { bg: 'bg-teal-50', text: 'text-teal-800', border: 'border-teal-200' },
    'in-consultation': { bg: 'bg-teal-50', text: 'text-teal-800', border: 'border-teal-200' },
    'scheduled': { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200' },
    'completed': { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200' },
    'cancelled': { bg: 'bg-rose-50', text: 'text-rose-800', border: 'border-rose-200' },
    'rescheduled': { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200' },
    'no-show': { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-300' },
  };

  const filtered = appointments.filter(a => {
    if (filterStatus === 'all') return true;
    return a.status === filterStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
              Live Clinical Scheduler
            </span>
            <span className="text-xs text-slate-400">Dr. Priya Mehta & Dr. Rajesh Rao</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Clinic Appointments
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Real-time operatory bookings with voice booking alternatives.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Day / Week / Month Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/80">
            {(['Day', 'Week', 'Month'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setCalendarView(view)}
                className={`px-3 py-1 text-xs font-bold rounded-xl transition-all ${
                  calendarView === view
                    ? 'bg-white text-teal-700 shadow-soft border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {view}
              </button>
            ))}
          </div>

          {/* Voice Booking Shortcut */}
          <button
            onClick={() => setCurrentNav('assistant')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-xl text-xs font-bold transition-all"
            title="Book via voice"
          >
            <Mic className="w-3.5 h-3.5 text-teal-600" />
            <span>Voice Booking</span>
          </button>

          {/* + New Appointment Button */}
          <button
            onClick={() => setCurrentNav('assistant')}
            className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm shadow-teal-600/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ New Appointment</span>
          </button>
        </div>
      </div>

      {/* Date Navigator & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-slate-200/80 shadow-soft">
        <div className="flex items-center gap-3">
          <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-black text-slate-900">
            Today, Saturday • September 12, 2026
          </span>
          <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
          {['all', 'waiting', 'scheduled', 'completed', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-2.5 py-1 rounded-lg capitalize transition-all ${
                filterStatus === st
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Table / Cards */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filtered.map((apt) => {
            const badge = statusColors[apt.status];
            return (
              <div 
                key={apt.id}
                className="p-5 sm:p-6 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 sm:w-20 text-center py-2 bg-slate-50 rounded-2xl border border-slate-200 shrink-0">
                    <span className="text-xs font-black text-teal-700 block font-mono">
                      {apt.time}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">
                      {apt.estimatedDuration}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-extrabold text-slate-900">
                        {apt.patientName}
                      </h3>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${badge.bg} ${badge.text} ${badge.border} capitalize`}>
                        {apt.status}
                      </span>
                      {apt.room && (
                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {apt.room}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600">
                      <span className="font-semibold text-slate-800">Reason:</span> {apt.reason}
                    </p>

                    <p className="text-xs text-slate-400 font-medium">
                      Provider: <span className="text-slate-700 font-semibold">{apt.doctorName}</span> ({apt.doctorSpecialty})
                    </p>
                  </div>
                </div>

                {/* Status action controls */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {apt.status === 'waiting' && (
                    <button
                      onClick={() => {
                        setSelectedPatientId(apt.patientId);
                        setCurrentNav('records');
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-sm"
                    >
                      <PlayCircle className="w-3.5 h-3.5" />
                      Admit to Chair
                    </button>
                  )}
                  {apt.status === 'scheduled' && (
                    <button
                      onClick={() => updateAppointmentStatus(apt.id, 'waiting')}
                      className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-sm"
                    >
                      Mark Arrived
                    </button>
                  )}
                  {apt.status !== 'completed' && (
                    <button
                      onClick={() => updateAppointmentStatus(apt.id, 'completed')}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 rounded-xl text-xs font-bold border border-slate-200"
                    >
                      Complete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

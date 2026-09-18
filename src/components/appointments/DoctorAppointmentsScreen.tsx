import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  Clock, 
  Search, 
  Plus, 
  Stethoscope, 
  UserCheck, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  PlayCircle,
  FileText,
  Pill,
  ChevronRight,
  Filter
} from 'lucide-react';

export const DoctorAppointmentsScreen: React.FC = () => {
  const { 
    appointments, 
    currentUser, 
    setCurrentNav, 
    setSelectedPatientId, 
    updateAppointmentStatus,
    openScheduleModal,
    showToast 
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'today' | 'waiting'>('today');
  const [searchQuery, setSearchQuery] = useState('');

  const todayDate = '2026-09-13';

  const doctorAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          apt.reason.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeFilter === 'today') return matchesSearch && apt.date === todayDate;
    if (activeFilter === 'waiting') return matchesSearch && apt.status === 'waiting';
    return matchesSearch;
  });

  const handleStartConsultation = (patientId: string, aptId: string) => {
    setSelectedPatientId(patientId);
    updateAppointmentStatus(aptId, 'in-consultation');
    setCurrentNav('records');
    showToast('Starting clinical session with AI Voice Notes enabled', 'info');
  };

  const handleWritePrescription = (patientId: string) => {
    setSelectedPatientId(patientId);
    setCurrentNav('prescriptions');
  };

  const handleAddNote = (patientId: string) => {
    setSelectedPatientId(patientId);
    setCurrentNav('medical-notes');
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-sky-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
            <span>Doctor Schedule • Clinical Appointments</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Clinical Appointments
          </h1>
          <p className="text-xs sm:text-sm text-sky-100 mt-1 max-w-xl">
            Review your patient roster, clinical procedures, waiting queue, and start consultations with AI EHR.
          </p>
        </div>

        <button
          onClick={() => openScheduleModal()}
          className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-sky-50 text-sky-700 rounded-2xl text-xs sm:text-sm font-black shadow-md transition-all active:scale-98 self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4 text-sky-600" />
          <span>+ Book Operatory Slot</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search patient or treatment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setActiveFilter('today')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeFilter === 'today' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Today's Schedule
          </button>
          <button
            onClick={() => setActiveFilter('waiting')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeFilter === 'waiting' ? 'bg-white text-amber-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Waiting in Lobby
          </button>
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeFilter === 'all' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            All Appointments
          </button>
        </div>
      </div>

      {/* Appointments Roster */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="divide-y divide-slate-100">
          {doctorAppointments.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              No appointments found matching your filter criteria.
            </div>
          ) : (
            doctorAppointments.map(apt => (
              <div 
                key={apt.id}
                className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-sky-50/40 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={apt.patientAvatar}
                    alt={apt.patientName}
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-sky-200 shrink-0"
                  />

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-base font-black text-slate-900">{apt.patientName}</h4>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200">
                        {apt.reason}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        apt.status === 'in-consultation'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 animate-pulse'
                          : apt.status === 'waiting'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : apt.status === 'completed'
                          ? 'bg-slate-100 text-slate-700 border border-slate-200'
                          : 'bg-sky-100 text-sky-900 border border-sky-300'
                      }`}>
                        {apt.status === 'in-consultation' ? '🟢 In Treatment' : apt.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1.5 font-medium">
                      <span className="flex items-center gap-1 font-bold text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-sky-600" />
                        {apt.time}
                      </span>
                      <span>•</span>
                      <span>Date: {apt.date}</span>
                      <span>•</span>
                      <span>Operatory: <strong className="text-slate-800">{apt.room}</strong></span>
                      <span>•</span>
                      <span>Doctor: {apt.doctorName}</span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex items-center gap-2 self-end lg:self-auto shrink-0">
                  <button
                    onClick={() => handleStartConsultation(apt.patientId, apt.id)}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white rounded-xl text-xs font-black shadow-md shadow-sky-600/15 transition-all active:scale-98"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>Start Consultation</span>
                  </button>

                  <button
                    onClick={() => handleWritePrescription(apt.patientId)}
                    className="flex items-center gap-1.5 px-3 py-2.5 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 rounded-xl text-xs font-bold transition-all"
                    title="Write digital prescription for this patient"
                  >
                    <Pill className="w-4 h-4" />
                    <span className="hidden sm:inline">Prescribe</span>
                  </button>

                  <button
                    onClick={() => handleAddNote(apt.patientId)}
                    className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-all"
                    title="Add clinical SOAP note"
                  >
                    <FileText className="w-4 h-4" />
                    <span className="hidden sm:inline">Note</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

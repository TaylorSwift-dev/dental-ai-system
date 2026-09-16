import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  Phone, 
  Mail, 
  ShieldAlert, 
  History, 
  Calendar, 
  Clock, 
  Sparkles, 
  PlayCircle, 
  FileText, 
  Heart, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export const PatientProfileScreen: React.FC = () => {
  const { selectedPatient, setCurrentNav, showToast } = useApp();

  return (
    <div className="space-y-6 pb-12">
      {/* Patient Profile Header Card */}
      <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200/80 shadow-soft">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={selectedPatient.avatar}
              alt={selectedPatient.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-2 border-teal-200 shadow-md"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200 font-mono">
                  {selectedPatient.id}
                </span>
                <span className="text-xs text-slate-400">Registered Patient</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {selectedPatient.name}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-slate-600">
                <span>{selectedPatient.age} years</span>
                <span>•</span>
                <span>{selectedPatient.gender}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {selectedPatient.phone}
                </span>
              </div>
              {selectedPatient.emergencyContact && (
                <div className="text-xs text-slate-500 pt-1">
                  <span className="font-semibold text-slate-700">Emergency Contact:</span> {selectedPatient.emergencyContact.name} ({selectedPatient.emergencyContact.relationship}) — {selectedPatient.emergencyContact.phone}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-stretch md:self-auto">
            <button
              onClick={() => {
                setCurrentNav('records');
                showToast("Consultation workspace launched", 'info');
              }}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-sm shadow-teal-600/30 transition-all"
            >
              <PlayCircle className="w-4 h-4" />
              Start Consultation
            </button>
            <button
              onClick={() => setCurrentNav('treatment-plans')}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs sm:text-sm font-bold transition-all"
            >
              Treatment Plan
            </button>
          </div>
        </div>

        {/* Quick Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-100">
          <div className="p-3.5 bg-slate-50 rounded-2xl">
            <span className="text-xs text-slate-400 font-semibold block uppercase">Total Visits</span>
            <span className="text-xl sm:text-2xl font-black text-slate-900">{selectedPatient.stats.totalVisits}</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-2xl">
            <span className="text-xs text-slate-400 font-semibold block uppercase">Upcoming Appointment</span>
            <span className="text-sm sm:text-base font-bold text-teal-700">{selectedPatient.stats.upcomingAppointment || 'Today, 10:00 AM'}</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-2xl">
            <span className="text-xs text-slate-400 font-semibold block uppercase">Last Treatment</span>
            <span className="text-xs sm:text-sm font-bold text-slate-800 truncate block">{selectedPatient.stats.lastTreatment}</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-2xl">
            <span className="text-xs text-slate-400 font-semibold block uppercase">Pending Follow-up</span>
            <span className="text-sm font-bold text-amber-600 flex items-center gap-1 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Due Today
            </span>
          </div>
        </div>
      </div>

      {/* AI Summary Highlight Card */}
      <div className="p-5 bg-gradient-to-r from-teal-50 via-teal-50/50 to-white rounded-3xl border border-teal-200/80 shadow-soft flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-teal-600/30 mt-0.5">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal-800">
              AI Longitudinal Summary
            </span>
            <span className="text-[10px] text-teal-600 bg-white px-2 py-0.5 rounded font-mono border border-teal-200">
              Synthesized from 4 EHR records
            </span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed">
            "{selectedPatient.aiSummary}"
          </p>
        </div>
      </div>

      {/* Two Column Layout: Medical Overview vs Dental Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Medical Overview */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-soft space-y-5">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-500" />
              Medical Overview
            </h2>

            {/* Allergies */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Allergies Flagged
              </span>
              <div className="space-y-1.5">
                {selectedPatient.medicalOverview.allergies.map((allergy, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 bg-rose-50 text-rose-900 border border-rose-200 rounded-xl text-xs font-bold">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{allergy}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Medical History */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Medical History
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {selectedPatient.medicalOverview.medicalHistory.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Current Medications */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Current Medications
              </span>
              <div className="p-3 bg-slate-50 rounded-xl text-xs font-medium text-slate-800 border border-slate-100">
                {selectedPatient.medicalOverview.currentMedications.join(', ')}
              </div>
            </div>

            {/* Important Notes */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Important Clinical Notes
              </span>
              <div className="p-3 bg-amber-50 text-amber-900 rounded-xl text-xs font-medium border border-amber-200">
                {selectedPatient.medicalOverview.importantNotes}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Dental History Timeline */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <History className="w-5 h-5 text-teal-600" />
                Dental Treatment History Timeline
              </h2>
              <span className="text-xs text-slate-400">Chronological EHR</span>
            </div>

            <div className="relative pl-6 space-y-6 border-l-2 border-teal-200/70 ml-2">
              {selectedPatient.dentalHistory.map((entry) => (
                <div key={entry.id} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-teal-600 ring-4 ring-teal-100 group-hover:scale-125 transition-transform" />
                  
                  <div className="p-4 rounded-2xl bg-slate-50 group-hover:bg-teal-50/50 border border-slate-200/80 transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-teal-700 bg-white px-2 py-0.5 rounded border border-teal-200">
                          {entry.year}
                        </span>
                        <span className="text-xs text-slate-500">{entry.date}</span>
                      </div>
                      <span className="text-xs text-slate-400 font-medium">Provider: {entry.doctor}</span>
                    </div>

                    <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                      {entry.treatment}
                      {entry.toothNumber && (
                        <span className="text-[11px] font-mono px-2 py-0.2 bg-teal-100 text-teal-800 rounded">
                          {entry.toothNumber}
                        </span>
                      )}
                    </h3>

                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {entry.notes}
                    </p>
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

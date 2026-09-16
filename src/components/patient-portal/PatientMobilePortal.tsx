import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  Car, 
  Navigation, 
  Mic, 
  FileText, 
  GitFork, 
  MessageSquare, 
  Sparkles, 
  Clock, 
  MapPin, 
  PhoneCall, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { SmartTrafficCard } from '../traffic/SmartTrafficCard';

export const PatientMobilePortal: React.FC = () => {
  const { setCurrentNav, openVoiceModal, selectedPatient } = useApp();

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24">
      {/* Patient Welcome Header */}
      <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-slate-200/80 shadow-soft">
        <div className="flex items-center gap-3">
          <img
            src={selectedPatient.avatar}
            alt={selectedPatient.name}
            className="w-12 h-12 rounded-2xl object-cover border border-teal-200"
          />
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Welcome back,</span>
            <h1 className="text-lg font-black text-slate-900 leading-tight">
              {selectedPatient.name}
            </h1>
          </div>
        </div>

        <button
          onClick={openVoiceModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold"
        >
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>AuraVoice</span>
        </button>
      </div>

      {/* Smart Traffic / Leave-Now Card */}
      <SmartTrafficCard />

      {/* Quick Actions Grid */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
          Quick Dental Actions
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setCurrentNav('assistant')}
            className="p-4 bg-white hover:bg-teal-50/50 rounded-2xl border border-slate-200/80 shadow-soft flex flex-col items-start gap-2 text-left transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-slate-900 block">Book Visit</span>
              <span className="text-[11px] text-slate-500">Voice or manual</span>
            </div>
          </button>

          <button
            onClick={() => setCurrentNav('appointments')}
            className="p-4 bg-white hover:bg-teal-50/50 rounded-2xl border border-slate-200/80 shadow-soft flex flex-col items-start gap-2 text-left transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-slate-900 block">Appointments</span>
              <span className="text-[11px] text-slate-500">View schedules</span>
            </div>
          </button>

          <button
            onClick={() => setCurrentNav('reports')}
            className="p-4 bg-white hover:bg-teal-50/50 rounded-2xl border border-slate-200/80 shadow-soft flex flex-col items-start gap-2 text-left transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-slate-900 block">My Reports</span>
              <span className="text-[11px] text-slate-500">AI explanations</span>
            </div>
          </button>

          <button
            onClick={() => setCurrentNav('treatment-plans')}
            className="p-4 bg-white hover:bg-teal-50/50 rounded-2xl border border-slate-200/80 shadow-soft flex flex-col items-start gap-2 text-left transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <GitFork className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-slate-900 block">Treatment Plan</span>
              <span className="text-[11px] text-slate-500">4 stages</span>
            </div>
          </button>

          <button
            onClick={() => setCurrentNav('follow-ups')}
            className="p-4 bg-white hover:bg-teal-50/50 rounded-2xl border border-slate-200/80 shadow-soft flex flex-col items-start gap-2 text-left transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-slate-900 block">Care Check-in</span>
              <span className="text-[11px] text-slate-500">How you feel</span>
            </div>
          </button>

          <button
            onClick={() => setCurrentNav('messages')}
            className="p-4 bg-white hover:bg-teal-50/50 rounded-2xl border border-slate-200/80 shadow-soft flex flex-col items-start gap-2 text-left transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-slate-900 block">Messages</span>
              <span className="text-[11px] text-slate-500">Clinic chat</span>
            </div>
          </button>
        </div>
      </div>

      {/* Floating "Talk to AI" Microphone Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-sm px-4">
        <button
          onClick={openVoiceModal}
          className="w-full flex items-center justify-between p-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl shadow-elevated border border-slate-700 active:scale-95 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500 text-white flex items-center justify-center shadow-sm shadow-teal-500/50 group-hover:scale-105 transition-transform">
              <Mic className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-xs font-black block text-teal-300 uppercase tracking-wider">
                Talk to AI Assistant
              </span>
              <span className="text-xs text-slate-300">"Book an appointment for tooth pain"</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-teal-300 transition-colors" />
        </button>
      </div>
    </div>
  );
};

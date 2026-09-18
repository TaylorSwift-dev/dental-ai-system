import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Award, 
  Users, 
  Calendar, 
  Activity, 
  Star,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';

export const DoctorReportsScreen: React.FC = () => {
  const { currentUser, dentalTreatments, appointments } = useApp();

  const completedCount = dentalTreatments.filter(t => t.status === 'Completed').length;
  const inProgressCount = dentalTreatments.filter(t => t.status === 'In Progress').length;

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-sky-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
            <span>Clinical Performance & Patient Recovery Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Doctor Clinical Reports
          </h1>
          <p className="text-xs sm:text-sm text-sky-100 mt-1 max-w-xl">
            Review your treatment success rates, operative volume, patient satisfaction index, and clinical compliance.
          </p>
        </div>

        <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-right self-start sm:self-auto">
          <div className="text-[10px] font-bold uppercase tracking-wider text-sky-100">Practicing Doctor</div>
          <div className="text-sm font-black text-white">{currentUser?.name || 'Dr. Sarah Johnson'}</div>
        </div>
      </div>

      {/* 4 Clinical KPI Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-3xl border border-sky-100 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Clinical Recovery Rate</span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">98.6%</div>
          <span className="text-xs text-emerald-600 font-bold mt-1 block">
            +1.2% higher than state dental average
          </span>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-sky-100 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Completed Procedures</span>
            <div className="w-9 h-9 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">142</div>
          <span className="text-xs text-sky-600 font-bold mt-1 block">
            {completedCount} logged this session
          </span>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-sky-100 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Operatory Time</span>
            <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">26m</div>
          <span className="text-xs text-amber-700 font-bold mt-1 block">
            Optimal patient comfort window
          </span>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-sky-100 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Patient Rating</span>
            <div className="w-9 h-9 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 flex items-center gap-1.5">
            <span>4.9</span>
            <span className="text-sm font-semibold text-slate-400">/ 5.0</span>
          </div>
          <span className="text-xs text-slate-500 font-bold mt-1 block">
            Based on 280+ post-op check-ins
          </span>
        </div>
      </div>

      {/* Clinical Distribution Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Procedure Breakdown */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-sky-600" />
            <span>Operative Procedure Distribution</span>
          </h3>

          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-700">Root Canal Treatments (Endodontics)</span>
                <span className="text-sky-700 font-mono">42% (58 cases)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: '42%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-700">Composite Resin Fillings & Restorations</span>
                <span className="text-sky-700 font-mono">28% (39 cases)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: '28%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-700">Crown Placements (Zirconia / PFM)</span>
                <span className="text-sky-700 font-mono">16% (22 cases)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '16%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-700">Preventive Ultrasonic Scalings</span>
                <span className="text-sky-700 font-mono">14% (19 cases)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '14%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Quality & Recovery Feedback */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Clinical Post-Op Recovery Feedback</span>
          </h3>

          <div className="space-y-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-1">
                <span>Aarav Mehta • RCT #19</span>
                <span className="text-emerald-700">Day 1 Follow-up</span>
              </div>
              <p className="text-xs text-emerald-800">
                "Pain completely relieved after sitting 1. Mild tenderness only when biting hard foods. Prescribed medications helped immediately."
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-sky-50/60 border border-sky-200/80">
              <div className="flex items-center justify-between text-xs font-bold text-sky-900 mb-1">
                <span>Sneha Patel • Tooth Filling #14</span>
                <span className="text-sky-700">Day 2 Follow-up</span>
              </div>
              <p className="text-xs text-sky-800">
                "No cold sensitivity remaining. Smooth polish feels very natural. Very comfortable experience in chair."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

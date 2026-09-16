import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  CalendarCheck, 
  XCircle, 
  UserMinus, 
  HeartPulse, 
  IndianRupee,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

export const AnalyticsScreen: React.FC = () => {
  const { appointments, followUps, invoices } = useApp();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
              Operational Analytics
            </span>
            <span className="text-xs text-slate-400">September 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Clinic Performance & Health
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Every metric answers a key clinical and operational question.
          </p>
        </div>

        <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200">
          Monthly Goal: 92% Chair Utilization
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Completed Visits</span>
            <CalendarCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">142</div>
          <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 mt-1">
            <ArrowUpRight className="w-3 h-3" /> +14% vs last month
          </span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Cancellations</span>
            <XCircle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">6</div>
          <span className="text-[11px] text-slate-500 font-medium mt-1 block">
            4.2% cancellation rate (Very low)
          </span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">No-Shows</span>
            <UserMinus className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">2</div>
          <span className="text-[11px] text-teal-600 font-bold mt-1 block">
            Reduced 60% by Smart Traffic SMS
          </span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Follow-up Rate</span>
            <HeartPulse className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">94.8%</div>
          <span className="text-[11px] text-sky-600 font-bold mt-1 block">
            Automated check-ins completed
          </span>
        </div>
      </div>

      {/* Visual Analytics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Mix: New vs Returning */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900">
              Patient Mix: New vs Returning
            </h2>
            <span className="text-xs text-slate-400">Retention Ratio</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-teal-700">Returning Patients (74%)</span>
                <span className="text-slate-900">105 Patients</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-teal-600 rounded-full" style={{ width: '74%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-sky-600">New Patients (26%)</span>
                <span className="text-slate-900">37 Patients</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: '26%' }} />
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-teal-50/70 rounded-2xl border border-teal-200/80 text-xs text-teal-950 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <span>
              <strong>AI Insight:</strong> Patient retention increased by 18% following the implementation of automated day-after follow-up care.
            </span>
          </div>
        </div>

        {/* Treatment Distribution */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900">
              Procedure Distribution
            </h2>
            <span className="text-xs text-slate-400">Clinical Focus</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
              <span className="font-semibold text-slate-800">Endodontics (Root Canals & Crowns)</span>
              <span className="font-black text-slate-900">42% (₹245,000)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
              <span className="font-semibold text-slate-800">Preventive Scaling & Checkups</span>
              <span className="font-black text-slate-900">28% (₹88,000)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
              <span className="font-semibold text-slate-800">Orthodontics (Clear Aligners)</span>
              <span className="font-black text-slate-900">18% (₹190,000)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
              <span className="font-semibold text-slate-800">Surgical Implants & Extractions</span>
              <span className="font-black text-slate-900">12% (₹145,000)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

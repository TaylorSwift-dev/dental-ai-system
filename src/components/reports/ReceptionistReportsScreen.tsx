import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  CalendarCheck, 
  CreditCard, 
  XCircle, 
  UserX, 
  CheckCircle2,
  Stethoscope,
  Sparkles
} from 'lucide-react';

export const ReceptionistReportsScreen: React.FC = () => {
  const { appointments, invoices, patients, doctors } = useApp();

  const todayDate = '2026-09-13';
  const todayApts = appointments.filter(a => a.date === todayDate);
  const completedToday = todayApts.filter(a => a.status === 'completed');
  const cancelledToday = todayApts.filter(a => a.status === 'cancelled');
  const noShowsToday = todayApts.filter(a => a.status === 'no-show');

  const totalRevenue = invoices.reduce((sum, i) => sum + i.total, 0);
  const totalCollected = invoices.reduce((sum, i) => sum + i.paid, 0);
  const totalPending = invoices.reduce((sum, i) => sum + i.pending, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header (Section 18) */}
      <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
            Section 18 • Daily Clinic Reports
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Reception Daily Performance & Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Review daily throughput, completion ratios, no-show monitoring, revenue collection, and doctor workload.
        </p>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-3xl border border-sky-100 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase mb-1">
            <span>Today's Total</span>
            <CalendarCheck className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{todayApts.length}</div>
          <span className="text-xs text-slate-500 font-medium">Booked appointments</span>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-emerald-100 shadow-xs">
          <div className="flex items-center justify-between text-xs text-emerald-800 font-bold uppercase mb-1">
            <span>Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-600">{completedToday.length}</div>
          <span className="text-xs text-emerald-700 font-medium">Successfully treated</span>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-rose-100 shadow-xs">
          <div className="flex items-center justify-between text-xs text-rose-800 font-bold uppercase mb-1">
            <span>Cancelled / No-Show</span>
            <XCircle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-3xl font-black text-rose-600">
            {cancelledToday.length + noShowsToday.length}
          </div>
          <span className="text-xs text-rose-600 font-medium">
            {cancelledToday.length} cancelled • {noShowsToday.length} no-show
          </span>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-purple-100 shadow-xs">
          <div className="flex items-center justify-between text-xs text-purple-800 font-bold uppercase mb-1">
            <span>Registered Patients</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-3xl font-black text-purple-700">{patients.length}</div>
          <span className="text-xs text-purple-600 font-medium">Active clinic roster</span>
        </div>
      </div>

      {/* Revenue & Doctor Workload Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Collection Report */}
        <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900">Clinic Revenue & Receivables</h3>
              <p className="text-xs text-slate-400">Total invoiced vs collected vs pending</p>
            </div>
            <span className="p-2 rounded-2xl bg-emerald-50 text-emerald-700">
              <CreditCard className="w-5 h-5" />
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-600">Total Billed:</span>
                <span className="font-mono font-black text-slate-900">₹{totalRevenue.toLocaleString()}</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
                <div 
                  className="bg-emerald-500 h-full" 
                  style={{ width: `${(totalCollected / totalRevenue) * 100}%` }}
                ></div>
                <div 
                  className="bg-rose-500 h-full" 
                  style={{ width: `${(totalPending / totalRevenue) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                <span className="text-xs text-emerald-800 font-bold block">Cash & UPI Cleared</span>
                <span className="text-xl font-black text-emerald-700 font-mono">₹{totalCollected.toLocaleString()}</span>
                <span className="text-[10px] text-emerald-600 block mt-0.5">
                  {Math.round((totalCollected / totalRevenue) * 100)}% Collection Rate
                </span>
              </div>

              <div className="p-3 bg-rose-50 rounded-2xl border border-rose-100">
                <span className="text-xs text-rose-800 font-bold block">Pending Counter Balances</span>
                <span className="text-xl font-black text-rose-700 font-mono">₹{totalPending.toLocaleString()}</span>
                <span className="text-[10px] text-rose-600 block mt-0.5">
                  Follow-up queued
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Appointment Workload Distribution (Section 18) */}
        <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900">Doctor Workload Distribution</h3>
              <p className="text-xs text-slate-400">Total appointments scheduled per dentist</p>
            </div>
            <span className="p-2 rounded-2xl bg-sky-50 text-sky-700">
              <Stethoscope className="w-5 h-5" />
            </span>
          </div>

          <div className="space-y-3">
            {doctors.map(doc => {
              const count = appointments.filter(a => a.doctorId === doc.id || a.doctorName === doc.name).length;
              const pct = Math.round((count / appointments.length) * 100) || 10;

              return (
                <div key={doc.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <img src={doc.avatar} alt={doc.name} className="w-6 h-6 rounded-full object-cover" />
                      <span className="font-bold text-slate-800">{doc.name}</span>
                    </div>
                    <span className="font-bold font-mono text-sky-800">{count} visits ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-sky-500 h-full rounded-full" style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  Filter, 
  User, 
  PhoneCall, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

const HOURS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

export const ReceptionistCalendarView: React.FC = () => {
  const { 
    appointments, 
    doctors, 
    openScheduleModal, 
    openRescheduleModal, 
    startCall 
  } = useApp();

  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('all');
  const [currentDateString, setCurrentDateString] = useState<string>('2026-09-13');

  const filteredAppointments = appointments.filter(apt => {
    if (selectedDoctor !== 'all' && apt.doctorName !== selectedDoctor) return false;
    if (viewMode === 'day' && apt.date !== currentDateString) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-sky-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
              Section 11 • Calendar Scheduling
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Clinic Master Calendar
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Day, week, and month scheduling views with doctor and treatment filters.
          </p>
        </div>

        <button
          onClick={() => openScheduleModal({ date: currentDateString })}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-sky-600/25 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Appointment</span>
        </button>
      </div>

      {/* View Switcher & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-sky-100 shadow-xs">
        {/* Date Selector */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setCurrentDateString('2026-09-13')}
              className={`px-3 py-1.5 rounded-lg transition-all ${currentDateString === '2026-09-13' ? 'bg-white text-sky-900 shadow-xs' : 'text-slate-600'}`}
            >
              Today (Sep 13)
            </button>
            <button
              onClick={() => setCurrentDateString('2026-09-14')}
              className={`px-3 py-1.5 rounded-lg transition-all ${currentDateString === '2026-09-14' ? 'bg-white text-sky-900 shadow-xs' : 'text-slate-600'}`}
            >
              Tomorrow (Sep 14)
            </button>
          </div>
        </div>

        {/* View Mode & Doctor Filter */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
            {(['day', 'week', 'month'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                  viewMode === mode ? 'bg-white text-sky-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                {mode} View
              </button>
            ))}
          </div>

          <select
            value={selectedDoctor}
            onChange={e => setSelectedDoctor(e.target.value)}
            className="px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">All Doctors</option>
            {doctors.map(d => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Calendar Grid View */}
      {viewMode === 'day' ? (
        <div className="bg-white rounded-3xl border border-sky-100 shadow-sm overflow-hidden divide-y divide-slate-100">
          <div className="px-6 py-4 bg-sky-50/50 border-b border-sky-100 flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-sky-900">
              Schedule Timeline — {currentDateString === '2026-09-13' ? 'Sunday, 13 September 2026' : 'Monday, 14 September 2026'}
            </span>
            <span className="text-xs text-slate-500 font-semibold">{filteredAppointments.length} bookings</span>
          </div>

          <div className="divide-y divide-slate-100">
            {HOURS.map(hour => {
              const hourBase = hour.split(':')[0];
              const ampm = hour.split(' ')[1];
              const matchingApts = filteredAppointments.filter(a => a.time.startsWith(hourBase) && a.time.endsWith(ampm));

              return (
                <div key={hour} className="p-4 sm:p-5 flex items-start gap-4 hover:bg-slate-50/60 transition-colors">
                  <div className="w-20 pt-1 font-mono font-bold text-xs text-slate-400 shrink-0 text-right">
                    {hour}
                  </div>

                  <div className="flex-1 space-y-2">
                    {matchingApts.length === 0 ? (
                      <div 
                        onClick={() => openScheduleModal({ date: currentDateString, time: hour })}
                        className="p-3 rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs font-medium hover:border-sky-300 hover:text-sky-600 hover:bg-sky-50/40 cursor-pointer transition-all flex items-center gap-2"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Available Slot — Click to Book</span>
                      </div>
                    ) : (
                      matchingApts.map(apt => (
                        <div 
                          key={apt.id}
                          className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                        >
                          <div className="flex items-center gap-3">
                            <img src={apt.patientAvatar} alt={apt.patientName} className="w-9 h-9 rounded-xl object-cover ring-1 ring-sky-300 shrink-0" />
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">{apt.patientName}</h4>
                                <span className="text-[10px] font-mono font-bold text-sky-700 bg-white px-1.5 py-0.5 rounded border border-sky-200">
                                  {apt.time}
                                </span>
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded capitalize bg-white text-slate-700">
                                  {apt.status}
                                </span>
                              </div>
                              <p className="text-xs text-slate-600 mt-0.5">
                                {apt.reason} • <strong className="text-sky-900">{apt.doctorName}</strong> ({apt.room || 'Operatory 1'})
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                            <button
                              onClick={() => startCall({
                                name: apt.patientName,
                                phone: apt.patientPhone || '+91 98201 44521',
                                avatar: apt.patientAvatar,
                                treatment: apt.reason
                              })}
                              className="p-1.5 rounded-lg bg-white hover:bg-sky-100 text-sky-700 transition-colors"
                              title="Call"
                            >
                              <PhoneCall className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => openRescheduleModal(apt)}
                              className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold border border-slate-200"
                            >
                              Reschedule
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Week/Month Multi-column grid */
        <div className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {['Sun 13 Sep', 'Mon 14 Sep', 'Tue 15 Sep', 'Wed 16 Sep', 'Thu 17 Sep', 'Fri 18 Sep', 'Sat 19 Sep'].map((day, idx) => {
              const dayDate = idx === 0 ? '2026-09-13' : idx === 1 ? '2026-09-14' : `2026-09-${13 + idx}`;
              const dayApts = appointments.filter(a => a.date === dayDate);

              return (
                <div key={day} className={`p-3.5 rounded-2xl border min-h-[160px] flex flex-col justify-between ${
                  idx === 0 ? 'bg-sky-50/60 border-sky-300' : 'bg-slate-50/60 border-slate-200'
                }`}>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black text-slate-900">{day}</span>
                      <span className="text-[10px] font-bold text-sky-700 bg-white px-1.5 py-0.5 rounded-full">
                        {dayApts.length}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {dayApts.slice(0, 3).map(a => (
                        <div key={a.id} className="p-1.5 bg-white rounded-xl text-[11px] border border-slate-200/80 truncate shadow-2xs">
                          <span className="font-bold text-slate-900 block truncate">{a.time} - {a.patientName}</span>
                          <span className="text-slate-400 text-[10px] truncate block">{a.reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => openScheduleModal({ date: dayDate })}
                    className="w-full py-1 mt-2 text-[10px] font-bold text-sky-700 bg-white hover:bg-sky-600 hover:text-white rounded-lg border border-sky-200 transition-colors"
                  >
                    + Add
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, Clock, RotateCcw, AlertTriangle } from 'lucide-react';

const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:15 AM', '12:00 PM', '02:00 PM', '02:30 PM',
  '03:30 PM', '04:00 PM', '04:30 PM', '05:30 PM'
];

export const RescheduleModal: React.FC = () => {
  const { 
    isRescheduleModalOpen, 
    activeRescheduleAppointment, 
    closeRescheduleModal, 
    rescheduleAppointment,
    doctors 
  } = useApp();

  const [newDate, setNewDate] = useState<string>('2026-09-14');
  const [newTime, setNewTime] = useState<string>('02:30 PM');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');

  useEffect(() => {
    if (activeRescheduleAppointment) {
      setNewDate(activeRescheduleAppointment.date);
      setNewTime(activeRescheduleAppointment.time);
      setSelectedDoctor(activeRescheduleAppointment.doctorName);
    }
  }, [activeRescheduleAppointment]);

  if (!isRescheduleModalOpen || !activeRescheduleAppointment) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    rescheduleAppointment(
      activeRescheduleAppointment.id, 
      newDate, 
      newTime, 
      selectedDoctor
    );
    closeRescheduleModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-sky-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-cyan-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/20">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">Reschedule Appointment</h2>
              <p className="text-xs text-sky-100">Patient: {activeRescheduleAppointment.patientName}</p>
            </div>
          </div>
          <button
            onClick={closeRescheduleModal}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Current Booking Overview */}
          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/70 text-xs">
            <span className="font-bold text-amber-900 block">Current Booking:</span>
            <p className="text-amber-800 mt-0.5">
              {activeRescheduleAppointment.date} at {activeRescheduleAppointment.time} • {activeRescheduleAppointment.reason} • {activeRescheduleAppointment.doctorName}
            </p>
          </div>

          {/* New Doctor */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
              Attending Doctor
            </label>
            <select
              value={selectedDoctor}
              onChange={e => setSelectedDoctor(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-bold text-slate-800"
            >
              {doctors.map(d => (
                <option key={d.id} value={d.name}>
                  {d.name} ({d.specialty})
                </option>
              ))}
            </select>
          </div>

          {/* New Date Selection */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
              New Date
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setNewDate('2026-09-13')}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                  newDate === '2026-09-13'
                    ? 'bg-sky-500 text-white border-sky-600 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                Today (13 Sep)
              </button>
              <button
                type="button"
                onClick={() => setNewDate('2026-09-14')}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                  newDate === '2026-09-14'
                    ? 'bg-sky-500 text-white border-sky-600 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                Tomorrow (14 Sep)
              </button>
            </div>
          </div>

          {/* New Time Selection */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
              New Time Slot
            </label>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map(slot => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setNewTime(slot)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                    newTime === slot
                      ? 'bg-sky-500 text-white border-sky-600 shadow-xs'
                      : 'bg-white hover:bg-sky-50/50 border-slate-200 text-slate-700'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeRescheduleModal}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-sky-600/30 transition-all active:scale-98"
            >
              Confirm Reschedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

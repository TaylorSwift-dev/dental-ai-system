import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  SearchCheck, 
  Calendar, 
  Clock, 
  Star, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ChevronRight,
  ShieldCheck,
  Phone,
  Radio,
  Eye,
  CalendarPlus
} from 'lucide-react';
import { ActionMenu } from '../common/ActionMenu';

const TREATMENTS_LIST = [
  'Tooth Filing',
  'Braces & Aligners',
  'Dental Implants',
  'Root Canal Treatment',
  'Routine Scaling',
  'Teeth Whitening',
  'Wisdom Tooth Extraction',
  'Pediatric Dentistry'
];

export const DoctorAvailabilityScreen: React.FC = () => {
  const { doctors, openScheduleModal, startCall, setCurrentNav, showToast } = useApp();

  const [selectedTreatment, setSelectedTreatment] = useState<string>('Tooth Filing');
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-13');
  const [preferredTime, setPreferredTime] = useState<string>('04:00 PM');

  // Filter and score doctors matching this treatment
  const matchedDoctors = doctors.map(doc => {
    const isTreatmentMatch = doc.treatments.some(t => 
      t.toLowerCase().includes(selectedTreatment.toLowerCase()) || 
      selectedTreatment.toLowerCase().includes(t.toLowerCase())
    );

    const isAvailable = doc.status === 'available';
    const busyUntil = doc.status === 'in-consultation' ? '5:30 PM' : null;

    return {
      ...doc,
      isTreatmentMatch,
      isAvailable,
      busyUntil
    };
  }).sort((a, b) => (b.isTreatmentMatch ? 1 : 0) - (a.isTreatmentMatch ? 1 : 0));

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
            Section 9 • Doctor Availability Finder
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Check Doctor Availability
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Instantly find dentists matching required treatment, patient preferred date and time, with one-click slot booking.
        </p>
      </div>

      {/* Input Finder Controls (Section 9 Specification Inputs) */}
      <div className="bg-gradient-to-br from-sky-500 via-sky-600 to-cyan-600 p-6 sm:p-7 rounded-3xl text-white shadow-lg shadow-sky-500/15 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SearchCheck className="w-5 h-5 text-sky-200" />
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-sky-100">
              Availability Criteria
            </h2>
          </div>
          <span className="text-xs text-sky-200">Real-time doctor schedule query</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Treatment Input */}
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
            <label className="text-xs font-bold text-sky-100 block mb-1.5">
              1. Treatment
            </label>
            <select
              value={selectedTreatment}
              onChange={e => setSelectedTreatment(e.target.value)}
              className="w-full px-3 py-2 bg-white text-slate-900 font-bold rounded-xl text-xs sm:text-sm focus:outline-none"
            >
              {TREATMENTS_LIST.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Date Input */}
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
            <label className="text-xs font-bold text-sky-100 block mb-1.5">
              2. Date
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedDate('2026-09-13')}
                className={`py-2 px-3 text-xs font-bold rounded-xl transition-all ${
                  selectedDate === '2026-09-13'
                    ? 'bg-white text-sky-900 shadow-sm'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Today (13 Sep)
              </button>
              <button
                type="button"
                onClick={() => setSelectedDate('2026-09-14')}
                className={`py-2 px-3 text-xs font-bold rounded-xl transition-all ${
                  selectedDate === '2026-09-14'
                    ? 'bg-white text-sky-900 shadow-sm'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Tomorrow (14 Sep)
              </button>
            </div>
          </div>

          {/* Preferred Time Input */}
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
            <label className="text-xs font-bold text-sky-100 block mb-1.5">
              3. Preferred Time Slot
            </label>
            <select
              value={preferredTime}
              onChange={e => setPreferredTime(e.target.value)}
              className="w-full px-3 py-2 bg-white text-slate-900 font-bold rounded-xl text-xs sm:text-sm focus:outline-none"
            >
              <option value="10:00 AM">10:00 AM (Morning)</option>
              <option value="11:30 AM">11:30 AM (Late Morning)</option>
              <option value="02:30 PM">02:30 PM (Afternoon)</option>
              <option value="04:00 PM">04:00 PM (Late Afternoon)</option>
              <option value="05:30 PM">05:30 PM (Evening)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Matching Results: Visual Cards inspired by reference image */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-black text-slate-900">
              Matching Doctors for "{selectedTreatment}"
            </h3>
            <p className="text-xs text-slate-400">
              Queried for {selectedDate === '2026-09-13' ? 'Today' : 'Tomorrow'} around {preferredTime}
            </p>
          </div>
          <span className="text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            {matchedDoctors.filter(d => d.isAvailable).length} Doctors Available Right Now
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {matchedDoctors.map(doc => (
            <div 
              key={doc.id}
              className={`p-6 rounded-3xl border transition-all bg-white shadow-sm hover:shadow-md ${
                doc.isAvailable ? 'border-sky-200 ring-1 ring-sky-100' : 'border-slate-200 opacity-90'
              }`}
            >
              <div className="flex items-start gap-4">
                <img
                  src={doc.avatar}
                  alt={doc.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-sky-300 shrink-0 shadow-xs"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-base font-black text-slate-900 truncate">{doc.name}</h4>
                    <span className="flex items-center text-xs font-bold text-amber-500 shrink-0">
                      <Star className="w-3.5 h-3.5 fill-current inline mr-1" />
                      {doc.rating}
                    </span>
                  </div>

                  <p className="text-xs text-sky-700 font-bold">{doc.specialty}</p>
                  <p className="text-[11px] text-slate-400">{doc.qualifications} • {doc.room}</p>

                  {/* Reference UI Statistics Pill Tags: Experience, Patients, Reviews */}
                  <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-600">
                      {doc.experienceYears} Years Exp
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-600">
                      {doc.patientsCount} Patients
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-600">
                      {doc.reviewsCount} Reviews
                    </span>
                  </div>
                </div>
              </div>

              {/* Status & Next Available Strip (Section 9 Example) */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      doc.isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                    }`}></span>
                    <span className="text-xs font-bold text-slate-800">
                      {doc.isAvailable ? 'Available Now' : `Busy until ${doc.busyUntil || '5:30 PM'}`}
                    </span>
                  </div>
                  <span className="text-xs text-sky-700 font-semibold block mt-0.5">
                    Next Slot: <strong>{doc.nextAvailableSlot}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openScheduleModal({
                      doctorId: doc.id,
                      doctorName: doc.name,
                      doctorSpecialty: doc.specialty,
                      reason: selectedTreatment,
                      date: selectedDate,
                      time: doc.nextAvailableSlot || preferredTime
                    })}
                    className="px-4 py-2 bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all active:scale-98 flex items-center gap-1.5"
                  >
                    <CalendarPlus className="w-3.5 h-3.5" />
                    <span>Book Slot</span>
                  </button>

                  <ActionMenu
                    buttonTitle={`Availability actions for ${doc.name}`}
                    items={[
                      {
                        label: `Intercom Operatory (${doc.room})`,
                        icon: Radio,
                        onClick: () => showToast(`Intercom connected to ${doc.name} in ${doc.room}`, 'info')
                      },
                      {
                        label: 'Call Doctor Phone',
                        icon: Phone,
                        onClick: () => startCall({
                          name: doc.name,
                          phone: doc.phone,
                          avatar: doc.avatar,
                          treatment: `Availability Inquiry for ${selectedTreatment}`
                        })
                      },
                      {
                        label: 'View Doctor Directory Profile',
                        icon: Eye,
                        onClick: () => setCurrentNav('doctors')
                      }
                    ]}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

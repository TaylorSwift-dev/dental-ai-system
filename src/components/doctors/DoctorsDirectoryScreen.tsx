import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Doctor } from '../../types';
import { 
  Stethoscope, 
  Calendar, 
  Clock, 
  Star, 
  CheckCircle2, 
  Plus, 
  ChevronRight, 
  Phone, 
  X,
  UserCheck,
  Sparkles,
  Radio,
  Eye,
  CalendarPlus
} from 'lucide-react';
import { ActionMenu } from '../common/ActionMenu';

export const DoctorsDirectoryScreen: React.FC = () => {
  const { doctors, appointments, openScheduleModal, startCall, updateDoctorStatus, showToast } = useApp();

  const [selectedDoctorForSchedule, setSelectedDoctorForSchedule] = useState<Doctor | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');

  const todayDate = '2026-09-13';

  const specialties = ['All', 'Endodontist', 'Orthodontist', 'Prosthodontist', 'Periodontist', 'Pediatric', 'Surgeon'];

  const filteredDoctors = doctors.filter(doc => {
    if (selectedSpecialty === 'All') return true;
    return doc.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-sky-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
              Section 8 • Doctor Management
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Clinic Doctors & Schedules
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time dentist availability, today's allocated patient load, and day-timeline schedules.
          </p>
        </div>

        <button
          onClick={() => openScheduleModal()}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-sky-600/25 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Book Appointment</span>
        </button>
      </div>

      {/* Specialization Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {specialties.map(spec => (
          <button
            key={spec}
            onClick={() => setSelectedSpecialty(spec)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 ${
              selectedSpecialty === spec
                ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/25'
                : 'bg-white text-slate-600 border border-sky-100 hover:border-sky-300'
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Doctor Cards Grid (Inspired by Reference UI) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doc => {
          const docAppointmentsToday = appointments.filter(a => a.doctorId === doc.id && a.date === todayDate);

          return (
            <div
              key={doc.id}
              className="bg-white rounded-3xl border border-sky-100 shadow-sm hover:shadow-md hover:border-sky-300 transition-all p-6 flex flex-col justify-between"
            >
              <div>
                {/* Profile Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-sky-300 shadow-xs"
                    />
                    <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                      doc.status === 'available' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}></span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-black text-slate-900 truncate">{doc.name}</h3>
                      <span className="flex items-center text-xs font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current inline mr-1" />
                        {doc.rating}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-sky-700">{doc.specialty}</p>
                    <span className="text-[11px] text-slate-400 block">{doc.qualifications}</span>
                    <span className="text-[10px] text-slate-500 font-mono block mt-0.5">{doc.room}</span>
                  </div>
                </div>

                {/* Experience Pills from Reference UI */}
                <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50 rounded-2xl border border-slate-100 text-center mb-4">
                  <div>
                    <span className="text-xs font-black text-slate-800 block">{doc.experienceYears} Yrs</span>
                    <span className="text-[10px] text-slate-400 font-medium">Experience</span>
                  </div>
                  <div>
                    <span className="text-xs font-black text-slate-800 block">{doc.patientsCount}</span>
                    <span className="text-[10px] text-slate-400 font-medium">Patients</span>
                  </div>
                  <div>
                    <span className="text-xs font-black text-slate-800 block">{doc.reviewsCount}</span>
                    <span className="text-[10px] text-slate-400 font-medium">Reviews</span>
                  </div>
                </div>

                {/* Status Indicator (Section 8 Example format) */}
                <div className="p-3 bg-sky-50/60 rounded-2xl border border-sky-100 mb-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${
                        doc.status === 'available' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                      }`}></span>
                      <span className="text-xs font-black text-slate-900 capitalize">
                        {doc.status === 'available' ? '🟢 Available' : '🟡 In Consultation'}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-semibold">
                      {docAppointmentsToday.length} today
                    </span>
                  </div>

                  <span className="text-xs text-sky-800 block font-semibold">
                    Next available: <strong>{doc.nextAvailableSlot}</strong>
                  </span>
                </div>

                {/* Treatments List */}
                <div className="flex items-center gap-1.5 flex-wrap mb-4">
                  {doc.treatments.slice(0, 3).map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-lg bg-slate-100 text-[10px] font-bold text-slate-700">
                      {t}
                    </span>
                  ))}
                  {doc.treatments.length > 3 && (
                    <span className="text-[10px] font-bold text-slate-400">+{doc.treatments.length - 3}</span>
                  )}
                </div>
              </div>

              {/* Doctor Card Footer: Single Primary Action [View Schedule] + ActionMenu (...) */}
              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setSelectedDoctorForSchedule(doc)}
                  className="flex-1 py-2.5 px-4 bg-sky-50 hover:bg-sky-100 text-sky-700 hover:text-sky-900 rounded-2xl text-xs font-extrabold transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Schedule</span>
                </button>

                <ActionMenu
                  buttonTitle={`Actions for ${doc.name}`}
                  items={[
                    {
                      label: 'Book Appointment',
                      icon: CalendarPlus,
                      onClick: () => openScheduleModal({ doctorId: doc.id, doctorName: doc.name, doctorSpecialty: doc.specialty })
                    },
                    {
                      label: `Intercom Operatory (${doc.room})`,
                      icon: Radio,
                      onClick: () => showToast(`Intercom connected to ${doc.name} in ${doc.room}`, 'info')
                    },
                    {
                      label: doc.status === 'available' ? 'Mark In Consultation' : 'Mark Available',
                      icon: CheckCircle2,
                      divider: true,
                      onClick: () => updateDoctorStatus(doc.id, doc.status === 'available' ? 'in-consultation' : 'available')
                    }
                  ]}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Doctor Daily Schedule Modal */}
      {selectedDoctorForSchedule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-sky-100 overflow-hidden">
            <div className="bg-gradient-to-r from-sky-600 to-cyan-600 p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedDoctorForSchedule.avatar}
                  alt={selectedDoctorForSchedule.name}
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/30"
                />
                <div>
                  <h3 className="text-lg font-black">{selectedDoctorForSchedule.name}</h3>
                  <p className="text-xs text-sky-100">Today's Day Timeline • {selectedDoctorForSchedule.room}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDoctorForSchedule(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Timeline Slots (Sunday, 13 Sep 2026)
                </span>
                <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full">
                  Status: {selectedDoctorForSchedule.status}
                </span>
              </div>

              <div className="space-y-2.5">
                {selectedDoctorForSchedule.slots.map((slot, idx) => (
                  <div 
                    key={idx}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                      slot.isAvailable
                        ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-white border border-slate-200">
                        {slot.time}
                      </span>
                      <div>
                        <span className="text-xs font-bold block">
                          {slot.isAvailable ? '🟢 Open Slot' : `🔴 ${slot.patientName || 'Booked'}`}
                        </span>
                        {slot.treatment && (
                          <span className="text-[11px] text-slate-500">{slot.treatment}</span>
                        )}
                      </div>
                    </div>

                    {slot.isAvailable ? (
                      <button
                        onClick={() => {
                          const doc = selectedDoctorForSchedule;
                          setSelectedDoctorForSchedule(null);
                          openScheduleModal({
                            doctorId: doc.id,
                            doctorName: doc.name,
                            doctorSpecialty: doc.specialty,
                            time: slot.time
                          });
                        }}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs"
                      >
                        Book Slot
                      </button>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400">Reserved</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
              <button
                onClick={() => setSelectedDoctorForSchedule(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

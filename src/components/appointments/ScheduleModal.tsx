import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { DENTAL_TREATMENTS } from '../../types';
import { 
  X, 
  Search, 
  UserPlus, 
  Calendar, 
  Clock, 
  User, 
  Stethoscope, 
  CheckCircle2, 
  Star,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  CalendarDays,
  Zap
} from 'lucide-react';

const STANDARD_TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '02:00 PM',
  '02:30 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:30 PM'
];

export const ScheduleModal: React.FC = () => {
  const { 
    isScheduleModalOpen, 
    closeScheduleModal, 
    scheduleModalPrefill, 
    patients, 
    doctors, 
    appointments,
    addAppointment,
    openAddPatientModal,
    showToast 
  } = useApp();

  // 1. Patient State
  const [patientSearch, setPatientSearch] = useState<string>('');
  const [selectedPatientId, setSelectedPatientId] = useState<string>('P-1001');
  const [isChangingPatient, setIsChangingPatient] = useState<boolean>(false);

  // 2. Treatment State
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>('root-canal');

  // 3. Booking Type State (Next Available vs Specific Date)
  const [bookingType, setBookingType] = useState<'next-available' | 'specific-date'>('next-available');

  // 4. Doctor State
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('DOC-1');

  // 5. Date & Time State
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-14');
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');

  const activeTreatment = DENTAL_TREATMENTS.find(t => t.id === selectedTreatmentId) || DENTAL_TREATMENTS[0];
  const activePatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  useEffect(() => {
    if (scheduleModalPrefill) {
      if (scheduleModalPrefill.patientId) setSelectedPatientId(scheduleModalPrefill.patientId);
      if (scheduleModalPrefill.reason) {
        const found = DENTAL_TREATMENTS.find(t => 
          t.name.toLowerCase().includes(scheduleModalPrefill.reason!.toLowerCase()) || 
          scheduleModalPrefill.reason!.toLowerCase().includes(t.name.toLowerCase())
        );
        if (found) setSelectedTreatmentId(found.id);
      }
      if (scheduleModalPrefill.doctorId) setSelectedDoctorId(scheduleModalPrefill.doctorId);
      if (scheduleModalPrefill.date) {
        setSelectedDate(scheduleModalPrefill.date);
        setBookingType('specific-date');
      }
      if (scheduleModalPrefill.time) setSelectedTime(scheduleModalPrefill.time);
    }
  }, [scheduleModalPrefill]);

  // Skill-based doctor matching: Prioritize doctors who specialize in activeTreatment
  const sortedDoctors = [...doctors].sort((a, b) => {
    const aMatch = a.treatments.some(t => 
      t.toLowerCase().includes(activeTreatment.name.toLowerCase()) || 
      activeTreatment.name.toLowerCase().includes(t.toLowerCase())
    ) || a.specialty.toLowerCase().includes(activeTreatment.specialty.toLowerCase());

    const bMatch = b.treatments.some(t => 
      t.toLowerCase().includes(activeTreatment.name.toLowerCase()) || 
      activeTreatment.name.toLowerCase().includes(t.toLowerCase())
    ) || b.specialty.toLowerCase().includes(activeTreatment.specialty.toLowerCase());

    if (aMatch && !bMatch) return -1;
    if (!aMatch && bMatch) return 1;
    return 0;
  });

  // Automatically select the best specialist if current doctor doesn't match
  useEffect(() => {
    const topDoc = sortedDoctors[0];
    if (topDoc && !scheduleModalPrefill?.doctorId) {
      setSelectedDoctorId(topDoc.id);
    }
  }, [selectedTreatmentId]);

  if (!isScheduleModalOpen) return null;

  const activeDoctor = doctors.find(d => d.id === selectedDoctorId) || sortedDoctors[0];

  // Filter patients by name or phone
  const filteredPatients = patientSearch.trim() === ''
    ? patients.slice(0, 4)
    : patients.filter(p => 
        p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
        p.phone.replace(/\s+/g, '').includes(patientSearch.replace(/\s+/g, ''))
      );

  // Double-booking check: which slots are already booked for activeDoctor on selectedDate?
  const bookedSlots = appointments
    .filter(a => a.date === selectedDate && a.doctorName === activeDoctor.name && a.status !== 'cancelled')
    .map(a => a.time);

  const allSlotsBooked = STANDARD_TIME_SLOTS.every(slot => bookedSlots.includes(slot));

  const handleConfirmAppointment = (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent double booking
    if (bookedSlots.includes(selectedTime)) {
      showToast(`${selectedTime} is already booked with ${activeDoctor.name} on ${selectedDate}. Please choose another slot.`, 'error');
      return;
    }

    addAppointment({
      patientId: activePatient.id,
      patientName: activePatient.name,
      patientAvatar: activePatient.avatar,
      patientPhone: activePatient.phone,
      doctorId: activeDoctor.id,
      doctorName: activeDoctor.name,
      doctorSpecialty: activeDoctor.specialty,
      date: selectedDate,
      time: selectedTime,
      status: 'confirmed',
      reason: activeTreatment.name,
      room: activeDoctor.room,
      estimatedDuration: activeTreatment.duration,
      confirmationStatus: 'confirmed',
      paymentStatus: 'Pending'
    });

    closeScheduleModal();
    showToast(`Appointment confirmed for ${activePatient.name} with ${activeDoctor.name} on ${selectedDate} at ${selectedTime}`, 'success');
  };

  const handleAddToWaitingList = () => {
    closeScheduleModal();
    showToast(`${activePatient.name} added to Priority Waiting List for ${activeTreatment.name} on ${selectedDate}`, 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-sky-100 overflow-hidden my-8 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 p-5 sm:p-6 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold mb-1">
              <span>Single Step Reception Booking</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">Book Appointment</h2>
            <p className="text-xs text-sky-100 mt-0.5">Streamlined workflow with doctor skill matching & double-booking prevention.</p>
          </div>

          <button
            onClick={closeScheduleModal}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleConfirmAppointment} className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* STEP 1: Search / Select Patient */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-[10px] font-black">1</span>
                Patient
              </label>
              {isChangingPatient ? (
                <button
                  type="button"
                  onClick={() => setIsChangingPatient(false)}
                  className="text-xs font-bold text-sky-600 hover:text-sky-800"
                >
                  Done
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsChangingPatient(true)}
                  className="text-xs font-bold text-sky-600 hover:text-sky-800 hover:underline"
                >
                  Change Patient
                </button>
              )}
            </div>

            {!isChangingPatient && activePatient ? (
              /* Selected Patient Pill */
              <div className="p-3 bg-sky-50/70 border border-sky-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={activePatient.avatar}
                    alt={activePatient.name}
                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-sky-200 shrink-0"
                  />
                  <div>
                    <h4 className="text-sm font-black text-slate-900">{activePatient.name}</h4>
                    <p className="text-xs text-slate-500 font-mono">{activePatient.phone} • {activePatient.gender}, {activePatient.age}y</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  Selected
                </span>
              </div>
            ) : (
              /* Search Patient Input & Results Dropdown */
              <div className="space-y-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search patient by name or mobile number (e.g. Rahul)..."
                    value={patientSearch}
                    onChange={e => setPatientSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                  />
                </div>

                <div className="max-h-36 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-xl bg-white shadow-xs">
                  {filteredPatients.length === 0 ? (
                    <div className="p-3 text-center text-xs text-slate-500 flex items-center justify-between">
                      <span>No patient found for "{patientSearch}"</span>
                      <button
                        type="button"
                        onClick={() => {
                          closeScheduleModal();
                          openAddPatientModal(true);
                        }}
                        className="flex items-center gap-1 text-sky-600 font-bold hover:underline"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>+ Add New Patient</span>
                      </button>
                    </div>
                  ) : (
                    filteredPatients.map(p => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setSelectedPatientId(p.id);
                          setIsChangingPatient(false);
                          setPatientSearch('');
                        }}
                        className="p-2.5 hover:bg-sky-50/60 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <img src={p.avatar} alt={p.name} className="w-7 h-7 rounded-lg object-cover" />
                          <div>
                            <span className="text-xs font-extrabold text-slate-900 block">{p.name}</span>
                            <span className="text-[11px] text-slate-500 font-mono">{p.phone}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="px-2.5 py-1 bg-sky-50 text-sky-700 text-xs font-bold rounded-lg hover:bg-sky-500 hover:text-white transition-colors"
                        >
                          Select
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      closeScheduleModal();
                      openAddPatientModal(true);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900 hover:underline pt-1"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Patient not listed? + Add New Patient</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* STEP 2: Select Treatment */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-[10px] font-black">2</span>
                Select Treatment & Service
              </label>
              <span className="text-[11px] text-slate-400 font-semibold">Configured dental pricing</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {DENTAL_TREATMENTS.map(t => {
                const isSelected = selectedTreatmentId === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTreatmentId(t.id)}
                    className={`p-2.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-1 ${
                      isSelected
                        ? 'bg-sky-500 text-white border-sky-600 shadow-xs'
                        : 'bg-white hover:bg-sky-50/50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base">{t.icon}</span>
                      <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        ₹{t.defaultPrice.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-black block truncate leading-tight">{t.name}</span>
                      <span className={`text-[10px] ${isSelected ? 'text-sky-100' : 'text-slate-400'}`}>
                        {t.duration}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: Booking Type (Next Available vs Specific Date) */}
          <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-[10px] font-black">3</span>
                Booking Preference
              </label>

              {/* Segmented Control */}
              <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
                <button
                  type="button"
                  onClick={() => {
                    setBookingType('next-available');
                    setSelectedDate('2026-09-14');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    bookingType === 'next-available'
                      ? 'bg-sky-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Next Available</span>
                </button>
                <button
                  type="button"
                  onClick={() => setBookingType('specific-date')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    bookingType === 'specific-date'
                      ? 'bg-sky-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <CalendarDays className="w-3.5 h-3.5" />
                  <span>Specific Date</span>
                </button>
              </div>
            </div>

            {/* If Specific Date is selected, reveal the Date Picker */}
            {bookingType === 'specific-date' ? (
              <div className="p-3.5 bg-white rounded-xl border border-sky-200 space-y-2 animate-in fade-in duration-150">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block">
                      Choose Specific Date:
                    </label>
                    <span className="text-[11px] text-slate-500">
                      Shows real-time doctor availability for this day
                    </span>
                  </div>
                  <input
                    type="date"
                    value={selectedDate}
                    min="2026-09-13"
                    onChange={e => setSelectedDate(e.target.value)}
                    className="px-3.5 py-1.5 bg-slate-50 font-bold text-xs sm:text-sm text-slate-900 border border-slate-300 rounded-xl shadow-xs focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>

                {/* Quick Date Shortcuts */}
                <div className="flex items-center gap-1.5 pt-1 overflow-x-auto">
                  <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">Quick:</span>
                  {[
                    { label: 'Today (13 Sep)', val: '2026-09-13' },
                    { label: 'Tomorrow (14 Sep)', val: '2026-09-14' },
                    { label: '20 Sep 2026', val: '2026-09-20' },
                    { label: '25 Sep 2026', val: '2026-09-25' }
                  ].map(d => (
                    <button
                      key={d.val}
                      type="button"
                      onClick={() => setSelectedDate(d.val)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all ${
                        selectedDate === d.val
                          ? 'bg-sky-50 text-sky-700 border-sky-300 font-bold'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between text-xs text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200">
                <span>Earliest open slot: <strong>Tomorrow, 14 September 2026</strong></span>
                <span className="text-sky-700 font-bold">Fast-tracked</span>
              </div>
            )}
          </div>

          {/* STEP 4: Suitable Doctors (Skill-Based Auto-Matching for Selected Date) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-[10px] font-black">4</span>
                Suitable Doctors for {activeTreatment.name}
              </label>
              <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Specialist Filtered
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {sortedDoctors.map(doc => {
                const isSelected = selectedDoctorId === doc.id;
                const isSkillMatch = doc.treatments.some(t => 
                  t.toLowerCase().includes(activeTreatment.name.toLowerCase()) || 
                  activeTreatment.name.toLowerCase().includes(t.toLowerCase())
                ) || doc.specialty.toLowerCase().includes(activeTreatment.specialty.toLowerCase());

                return (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoctorId(doc.id)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'bg-sky-50/90 border-sky-500 ring-2 ring-sky-300/40 shadow-xs'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-11 h-11 rounded-xl object-cover ring-2 ring-sky-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black text-slate-900 truncate">{doc.name}</h4>
                        <span className={`text-[10px] font-bold flex items-center gap-1 ${
                          doc.status === 'available' ? 'text-emerald-600' : 'text-amber-600'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${doc.status === 'available' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          {doc.status === 'available' ? 'Available' : 'Busy'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">{doc.specialty}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        {isSkillMatch && (
                          <span className="text-[10px] font-bold text-sky-800 bg-sky-100/70 px-1.5 py-0.5 rounded">
                            Specialist Match
                          </span>
                        )}
                        <span className="text-[10px] font-medium text-slate-400">
                          Next: {doc.nextAvailableSlot}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 5: Selectable Time Slots (Zero manual typing, double-booking lockout) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-[10px] font-black">5</span>
                Available Time Slots on {selectedDate}
              </label>
              <span className="text-[11px] text-slate-500 font-semibold">
                With {activeDoctor.name}
              </span>
            </div>

            {allSlotsBooked ? (
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center space-y-2">
                <p className="text-xs font-bold text-amber-900">
                  No slots currently available for {activeDoctor.name} on {selectedDate}.
                </p>
                <button
                  type="button"
                  onClick={handleAddToWaitingList}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                >
                  + Add to Priority Waiting List
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {STANDARD_TIME_SLOTS.map(slot => {
                  const isBooked = bookedSlots.includes(slot);
                  const isSelected = selectedTime === slot && !isBooked;

                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={isBooked}
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                        isBooked
                          ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through opacity-60'
                          : isSelected
                          ? 'bg-sky-500 text-white border-sky-600 shadow-xs'
                          : 'bg-white hover:bg-sky-50/60 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span>{slot}</span>
                      {isBooked ? (
                        <span className="text-[9px] uppercase font-bold text-rose-500 no-underline">Booked</span>
                      ) : isSelected ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            )}
            <div className="flex items-center justify-between text-[11px] text-slate-400 italic">
              <span>* Occupied slots are physically locked to eliminate double-booking.</span>
              <button
                type="button"
                onClick={handleAddToWaitingList}
                className="text-sky-600 hover:underline not-italic font-semibold"
              >
                + Patient prefers another time? Add to Waiting List
              </button>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <div className="text-xs text-slate-500 hidden sm:block">
              Summary: <strong className="text-slate-800">{activePatient.name}</strong> • <strong className="text-sky-700">{activeTreatment.name}</strong> • {selectedDate} at <strong className="text-slate-900">{selectedTime}</strong>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={closeScheduleModal}
                className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 sm:flex-initial px-6 py-2.5 bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-sky-600/30 transition-all active:scale-98"
              >
                Confirm Appointment
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  UserPlus, 
  CalendarPlus, 
  Save, 
  AlertCircle, 
  CheckCircle2,
  Phone
} from 'lucide-react';

export const AddPatientModal: React.FC = () => {
  const { 
    isAddPatientModalOpen, 
    closeAddPatientModal, 
    addPatient, 
    openScheduleModal,
    addPatientBookCallback 
  } = useApp();

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [phoneTouched, setPhoneTouched] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [age, setAge] = useState<string>('28');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Female');
  const [assignedBD, setAssignedBD] = useState<string>('Amit');
  const [allergies, setAllergies] = useState<string>('');
  const [medicalNotes, setMedicalNotes] = useState<string>('');

  if (!isAddPatientModalOpen) return null;

  // Indian Mobile Number Validation: 10 digits starting with 6, 7, 8, or 9
  const cleanDigits = phone.replace(/\D/g, '');
  const isValidIndianMobile = /^[6-9]\d{9}$/.test(cleanDigits);
  const showPhoneError = phoneTouched && phone.length > 0 && !isValidIndianMobile;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Prevent alphabetic characters - only allow digits
    const rawVal = e.target.value;
    const digitsOnly = rawVal.replace(/\D/g, '').slice(0, 10);
    setPhone(digitsOnly);
    if (!phoneTouched) setPhoneTouched(true);
  };

  const handleSave = (bookNow: boolean) => {
    setPhoneTouched(true);
    if (!name.trim() || !isValidIndianMobile) return;

    const formattedPhone = `+91 ${cleanDigits.slice(0, 5)} ${cleanDigits.slice(5)}`;

    const newPat = addPatient({
      name: name.trim(),
      phone: formattedPhone,
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      age: parseInt(age) || 30,
      gender,
      assignedBD,
      bdStatus: 'Follow-up Required',
      avatar: gender === 'Male'
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250'
        : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
      medicalOverview: {
        allergies: allergies ? allergies.split(',').map(a => a.trim()) : [],
        medicalHistory: medicalNotes ? [medicalNotes] : [],
        currentMedications: [],
        importantNotes: medicalNotes
      },
      dentalHistory: []
    });

    // Reset fields
    setName('');
    setPhone('');
    setPhoneTouched(false);
    setEmail('');
    setAllergies('');
    setMedicalNotes('');

    closeAddPatientModal();

    if (bookNow || addPatientBookCallback) {
      openScheduleModal({
        patientId: newPat.id,
        patientName: newPat.name,
        patientPhone: newPat.phone,
        patientAvatar: newPat.avatar
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-sky-100 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/20">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">Add New Patient</h2>
              <p className="text-xs text-sky-100">Quick front desk intake (No unnecessary fields)</p>
            </div>
          </div>
          <button
            onClick={closeAddPatientModal}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Full Name */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder="e.g. Rahul Sharma"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
            />
          </div>

          {/* Phone with Validation */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700">
                Mobile Number *
              </label>
              <span className="text-[11px] text-slate-400 font-mono">
                {cleanDigits.length}/10 digits
              </span>
            </div>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-bold text-slate-500 pointer-events-none">
                <Phone className="w-3.5 h-3.5 text-sky-600 mr-1" />
                <span>+91</span>
                <span className="text-slate-300">|</span>
              </div>
              <input
                type="tel"
                required
                placeholder="98765 43210"
                value={phone}
                onChange={handlePhoneChange}
                onBlur={() => setPhoneTouched(true)}
                className={`w-full pl-20 pr-10 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 font-mono font-bold transition-colors ${
                  showPhoneError
                    ? 'border-rose-300 focus:ring-rose-500 text-rose-900 bg-rose-50/30'
                    : isValidIndianMobile
                    ? 'border-emerald-300 focus:ring-emerald-500 text-slate-900'
                    : 'border-slate-200 focus:ring-sky-500 text-slate-900'
                }`}
              />
              {isValidIndianMobile && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2" />
              )}
            </div>
            {showPhoneError && (
              <p className="text-xs text-rose-600 font-bold mt-1.5 flex items-center gap-1 animate-in fade-in duration-150">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Enter a valid 10-digit mobile number.</span>
              </p>
            )}
          </div>

          {/* Age, Gender & BD Assigner */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Age</label>
              <input
                type="number"
                min="1"
                max="120"
                placeholder="28"
                value={age}
                onChange={e => setAge(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500 font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Gender</label>
              <select
                value={gender}
                onChange={e => setGender(e.target.value as any)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500 font-bold text-slate-800"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center gap-1">
                <span>Assign BD</span>
              </label>
              <select
                value={assignedBD}
                onChange={e => setAssignedBD(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500 font-bold text-slate-800"
              >
                <option value="Amit">Amit</option>
                <option value="Priya S.">Priya S.</option>
                <option value="Vikram">Vikram</option>
                <option value="Sunita">Sunita</option>
              </select>
            </div>
          </div>

          {/* Medical Alerts (Optional Quick Tag) */}
          <div className="pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center justify-between">
              <span>Known Allergies / Medical Alert</span>
              <span className="text-[10px] text-slate-400 font-medium">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Penicillin allergy, Diabetic, High BP, None"
              value={allergies}
              onChange={e => setAllergies(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Footer Actions: Save Patient / Save & Book Appointment */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={closeAddPatientModal}
            className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-200/60 transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => handleSave(false)}
              disabled={!name.trim() || !isValidIndianMobile}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs rounded-xl shadow-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4 text-sky-600" />
              <span>Save Patient</span>
            </button>

            <button
              type="button"
              onClick={() => handleSave(true)}
              disabled={!name.trim() || !isValidIndianMobile}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-sky-600/30 transition-all active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <CalendarPlus className="w-4 h-4" />
              <span>Save & Book Appointment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

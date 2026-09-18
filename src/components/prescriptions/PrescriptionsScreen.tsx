import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Prescription, PrescriptionMedicine } from '../../types';
import { 
  Sparkles, 
  Plus, 
  Search, 
  Printer, 
  Trash2, 
  FileText, 
  Calendar, 
  Stethoscope, 
  Pill, 
  Clock, 
  X,
  CheckCircle2,
  Share2
} from 'lucide-react';

export const PrescriptionsScreen: React.FC = () => {
  const { 
    prescriptions, 
    addPrescription, 
    patients, 
    currentUser,
    showToast 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isNewRxModalOpen, setIsNewRxModalOpen] = useState(false);
  const [previewRx, setPreviewRx] = useState<Prescription | null>(null);

  // New Rx form state
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || '');
  const [diagnosis, setDiagnosis] = useState('');
  const [notes, setNotes] = useState('');
  const [medicines, setMedicines] = useState<Omit<PrescriptionMedicine, 'id'>[]>([
    {
      name: 'Amoxicillin 500mg',
      dosage: '1 capsule',
      frequency: '1-0-1 (Twice daily)',
      duration: '5 days',
      instructions: 'Take after meals'
    }
  ]);

  const addMedicineRow = () => {
    setMedicines(prev => [
      ...prev,
      {
        name: '',
        dosage: '1 tablet',
        frequency: '1-0-1',
        duration: '3 days',
        instructions: 'Take after meals'
      }
    ]);
  };

  const removeMedicineRow = (index: number) => {
    if (medicines.length === 1) return;
    setMedicines(prev => prev.filter((_, i) => i !== index));
  };

  const updateMedicine = (index: number, field: keyof Omit<PrescriptionMedicine, 'id'>, value: string) => {
    setMedicines(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleCreatePrescription = (e: React.FormEvent) => {
    e.preventDefault();
    const pat = patients.find(p => p.id === selectedPatientId);
    
    const formattedMedicines: PrescriptionMedicine[] = medicines.map((m, idx) => ({
      ...m,
      id: `MED-${idx + 1}`
    }));

    const newRx = addPrescription({
      patientId: selectedPatientId,
      patientName: pat?.name || 'Walk-in Patient',
      doctorName: currentUser?.name || 'Dr. Sarah Johnson',
      diagnosis: diagnosis || 'Post-procedure dental care',
      medicines: formattedMedicines,
      notes
    });

    setIsNewRxModalOpen(false);
    setPreviewRx(newRx);
  };

  const filteredPrescriptions = prescriptions.filter(rx => 
    rx.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rx.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rx.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-sky-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
            <span>Clinical Pharmacology • Electronic Prescriptions</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Digital Prescriptions (Rx)
          </h1>
          <p className="text-xs sm:text-sm text-sky-100 mt-1 max-w-xl">
            Generate, print, and archive electronic prescriptions with dosage schedules, dental precautions, and digital signatures.
          </p>
        </div>

        <button
          onClick={() => {
            setDiagnosis('');
            setNotes('');
            setIsNewRxModalOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-sky-50 text-sky-700 rounded-2xl text-xs sm:text-sm font-black shadow-md transition-all active:scale-98 self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4 text-sky-600" />
          <span>+ Write Prescription</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by patient, diagnosis, or Rx #..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
          />
        </div>
        <span className="text-xs font-bold text-slate-400 hidden sm:inline">
          Showing {filteredPrescriptions.length} prescriptions
        </span>
      </div>

      {/* Prescriptions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPrescriptions.map(rx => (
          <div 
            key={rx.id} 
            className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-sky-200 transition-all p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-black bg-sky-50 text-sky-700 border border-sky-200 font-mono">
                  {rx.id}
                </span>
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {rx.date}
                </span>
              </div>

              <h3 className="text-base font-black text-slate-900">{rx.patientName}</h3>
              <p className="text-xs font-semibold text-sky-800 mt-0.5">{rx.diagnosis}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">By {rx.doctorName}</p>

              {/* Medicine Pills Preview */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Prescribed Drugs ({rx.medicines.length})
                </span>
                {rx.medicines.slice(0, 3).map((med, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-800 truncate">{med.name}</span>
                    <span className="text-[11px] text-sky-600 font-semibold shrink-0">{med.frequency}</span>
                  </div>
                ))}
                {rx.medicines.length > 3 && (
                  <span className="text-[11px] text-slate-400 font-semibold block text-center">
                    +{rx.medicines.length - 3} more medicines
                  </span>
                )}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setPreviewRx(rx)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 rounded-xl text-xs font-bold transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>View & Print Rx</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Prescription Modal */}
      {isNewRxModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-sky-50/50">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-sky-100 text-sky-700">
                  <Pill className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Create Electronic Prescription</h3>
                  <p className="text-xs text-slate-500">Dr. Sarah Johnson • Operatory 1</p>
                </div>
              </div>
              <button 
                onClick={() => setIsNewRxModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePrescription} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Select Patient
                  </label>
                  <select
                    value={selectedPatientId}
                    onChange={(e) => setSelectedPatientId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500"
                  >
                    {patients.map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.phone})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Clinical Diagnosis
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acute Pulpitis #19"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Dynamic Medicine Rows (Adapted from prescription_screen.dart) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Prescribed Medicines
                  </label>
                  <button
                    type="button"
                    onClick={addMedicineRow}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Another Medicine</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {medicines.map((med, index) => (
                    <div key={index} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-sky-700">Medicine #{index + 1}</span>
                        {medicines.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMedicineRow(index)}
                            className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          placeholder="Medicine Name (e.g. Amoxicillin 500mg)"
                          value={med.name}
                          onChange={(e) => updateMedicine(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500"
                        />
                        <input
                          type="text"
                          placeholder="Dosage (e.g. 1 cap / 500mg)"
                          value={med.dosage}
                          onChange={(e) => updateMedicine(index, 'dosage', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        <input
                          type="text"
                          placeholder="Frequency (e.g. 1-0-1)"
                          value={med.frequency}
                          onChange={(e) => updateMedicine(index, 'frequency', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-sky-500"
                        />
                        <input
                          type="text"
                          placeholder="Duration (e.g. 5 days)"
                          value={med.duration}
                          onChange={(e) => updateMedicine(index, 'duration', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-sky-500"
                        />
                        <input
                          type="text"
                          placeholder="Instructions (e.g. After food)"
                          value={med.instructions}
                          onChange={(e) => updateMedicine(index, 'instructions', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-sky-500 col-span-2 sm:col-span-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  General Dietary / Clinical Instructions
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Soft diet for 48 hours. Avoid chewing hard items on lower left side."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewRxModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white text-xs font-black rounded-xl shadow-md transition-all active:scale-98"
                >
                  Generate & Preview Rx
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Prescription Modal */}
      {previewRx && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-sky-50/50">
              <span className="text-xs font-black uppercase text-sky-800">Printable Electronic Rx</span>
              <button 
                onClick={() => setPreviewRx(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Prescription Slip Content (Styled for print) */}
            <div id="printable-rx" className="p-8 space-y-6 text-slate-900">
              {/* Doctor Letterhead */}
              <div className="flex items-start justify-between border-b-2 border-sky-600 pb-4">
                <div>
                  <h2 className="text-xl font-black text-sky-900">{previewRx.doctorName}</h2>
                  <p className="text-xs font-bold text-slate-600">BDS, MDS (Endodontics & Conservative Dentistry)</p>
                  <p className="text-xs text-slate-500">Reg No: DENT-MH-2018-4421</p>
                  <p className="text-xs text-slate-500">SmileCare Dental Hospital • Operatory 1</p>
                </div>
                <div className="text-right">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center font-black text-xl ml-auto">
                    ⚕️
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 mt-1 block">Rx No: {previewRx.id}</span>
                </div>
              </div>

              {/* Patient Info Row */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl text-xs font-semibold">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Patient Name</span>
                  <span className="text-slate-900 font-bold">{previewRx.patientName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Date</span>
                  <span className="text-slate-900 font-bold">{previewRx.date}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Diagnosis</span>
                  <span className="text-sky-800 font-bold">{previewRx.diagnosis}</span>
                </div>
              </div>

              {/* Rx Symbol */}
              <div className="text-2xl font-black text-sky-600 font-serif">
                ℞
              </div>

              {/* Medicines Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">Medicine Name</th>
                      <th className="p-2.5">Dosage</th>
                      <th className="p-2.5">Frequency</th>
                      <th className="p-2.5">Duration</th>
                      <th className="p-2.5">Instructions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {previewRx.medicines.map((med, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="p-2.5 font-bold text-slate-900">{med.name}</td>
                        <td className="p-2.5">{med.dosage}</td>
                        <td className="p-2.5 text-sky-700 font-semibold">{med.frequency}</td>
                        <td className="p-2.5">{med.duration}</td>
                        <td className="p-2.5 text-slate-600">{med.instructions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {previewRx.notes && (
                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 text-xs">
                  <strong className="text-amber-900 font-bold">Special Advice: </strong>
                  <span className="text-amber-800">{previewRx.notes}</span>
                </div>
              )}

              {/* Doctor Signature */}
              <div className="pt-8 flex items-end justify-between">
                <div className="text-[10px] text-slate-400">
                  <p>Valid for 30 days from date of issue.</p>
                  <p>Computer-generated verifiable prescription.</p>
                </div>
                <div className="text-center">
                  <div className="font-serif italic text-sky-800 text-sm font-bold border-b border-slate-400 pb-1 px-4">
                    Dr. Sarah Johnson
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1 block">
                    Authorized Doctor Signature
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-2.5 bg-slate-50">
              <button
                type="button"
                onClick={() => setPreviewRx(null)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 rounded-xl"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-black shadow-md transition-all active:scale-98"
              >
                <Printer className="w-4 h-4" />
                <span>Print Prescription</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

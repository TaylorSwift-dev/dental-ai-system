import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DENTAL_TREATMENTS } from '../../types';
import { 
  Sparkles, 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  IndianRupee, 
  Filter, 
  FileText, 
  ChevronRight,
  Stethoscope,
  X
} from 'lucide-react';

export const TreatmentsScreen: React.FC = () => {
  const { 
    dentalTreatments, 
    addDentalTreatment, 
    updateDentalTreatmentStatus, 
    patients,
    currentUser,
    setCurrentNav,
    setSelectedPatientId 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Planned' | 'In Progress' | 'Completed'>('all');
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  // Form states
  const [selectedPatient, setSelectedPatient] = useState(patients[0]?.id || '');
  const [selectedTreatment, setSelectedTreatment] = useState(DENTAL_TREATMENTS[0]?.name || 'Root Canal Treatment');
  const [selectedTeeth, setSelectedTeeth] = useState<string[]>(['#19']);
  const [treatmentStatus, setTreatmentStatus] = useState<'Planned' | 'In Progress' | 'Completed'>('In Progress');
  const [treatmentCost, setTreatmentCost] = useState<number>(5000);
  const [treatmentNotes, setTreatmentNotes] = useState('');

  const commonTeeth = ['#11', '#12', '#13', '#14', '#15', '#16', '#17', '#18', '#19', '#21', '#24', '#26', '#31', '#36', '#46', 'Full Mouth'];

  const toggleTooth = (tooth: string) => {
    if (tooth === 'Full Mouth') {
      setSelectedTeeth(['Full Mouth']);
      return;
    }
    const filtered = selectedTeeth.filter(t => t !== 'Full Mouth');
    if (filtered.includes(tooth)) {
      setSelectedTeeth(filtered.filter(t => t !== tooth));
    } else {
      setSelectedTeeth([...filtered, tooth]);
    }
  };

  const handleTreatmentChange = (trtName: string) => {
    setSelectedTreatment(trtName);
    const found = DENTAL_TREATMENTS.find(t => t.name === trtName);
    if (found) {
      setTreatmentCost(found.defaultPrice);
    }
  };

  const handleCreateTreatment = (e: React.FormEvent) => {
    e.preventDefault();
    const pat = patients.find(p => p.id === selectedPatient);
    addDentalTreatment({
      patientId: selectedPatient,
      patientName: pat?.name || 'Walk-in Patient',
      doctorName: currentUser?.name || 'Dr. Sarah Johnson',
      treatmentName: selectedTreatment,
      toothNumbers: selectedTeeth.length > 0 ? selectedTeeth : ['General'],
      status: treatmentStatus,
      cost: treatmentCost,
      notes: treatmentNotes
    });
    setIsRecordModalOpen(false);
    setTreatmentNotes('');
  };

  const filteredTreatments = dentalTreatments.filter(item => {
    const matchesSearch = item.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.treatmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.toothNumbers.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-sky-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
            <span>Clinical Operatory • Procedures & Tooth Charting</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Dental Treatments & Procedures
          </h1>
          <p className="text-xs sm:text-sm text-sky-100 mt-1 max-w-xl">
            Track patient procedures, active tooth restorations, root canal stages, and completed clinical care.
          </p>
        </div>

        <button
          onClick={() => setIsRecordModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-sky-50 text-sky-700 rounded-2xl text-xs sm:text-sm font-black shadow-md transition-all active:scale-98 self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4 text-sky-600" />
          <span>+ Record Treatment</span>
        </button>
      </div>

      {/* Quick Catalog Bar */}
      <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Standard Clinical Procedures
        </h3>
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {DENTAL_TREATMENTS.map(t => (
            <div 
              key={t.id}
              onClick={() => {
                handleTreatmentChange(t.name);
                setIsRecordModalOpen(true);
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200/70 hover:border-sky-300 text-xs font-bold text-slate-700 hover:text-sky-800 transition-all cursor-pointer shrink-0"
            >
              <span>{t.icon}</span>
              <span>{t.name}</span>
              <span className="text-[11px] text-sky-600 font-mono">₹{t.defaultPrice.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search patient, procedure, or tooth #..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-full sm:w-auto overflow-x-auto">
          {(['all', 'Planned', 'In Progress', 'Completed'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                filterStatus === status 
                  ? 'bg-white text-sky-700 shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {status === 'all' ? 'All Treatments' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Treatments List / Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filteredTreatments.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              No clinical treatments found matching your filter criteria.
            </div>
          ) : (
            filteredTreatments.map(item => (
              <div 
                key={item.id} 
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-sky-50/40 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center font-bold text-sm shrink-0">
                    <Stethoscope className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-base font-black text-slate-900">{item.treatmentName}</h4>
                      
                      {/* Tooth numbers badges */}
                      {item.toothNumbers.map(tooth => (
                        <span key={tooth} className="px-2 py-0.5 rounded-full text-[11px] font-black bg-sky-100 text-sky-800 border border-sky-200">
                          {tooth}
                        </span>
                      ))}

                      {/* Status badge */}
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        item.status === 'Completed' 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                          : item.status === 'In Progress'
                          ? 'bg-sky-100 text-sky-800 border border-sky-300 animate-pulse'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1 font-medium">
                      <span>Patient: <strong className="text-slate-800">{item.patientName}</strong></span>
                      <span>•</span>
                      <span>Doctor: {item.doctorName}</span>
                      <span>•</span>
                      <span>Date: {item.date}</span>
                    </div>

                    {item.notes && (
                      <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-mono">
                        {item.notes}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                  <div className="text-right">
                    <div className="text-xs text-slate-400 font-bold uppercase">Estimated Fee</div>
                    <div className="text-base font-black text-slate-900 font-mono">₹{item.cost.toLocaleString()}</div>
                  </div>

                  {item.status !== 'Completed' && (
                    <button
                      onClick={() => updateDentalTreatmentStatus(item.id, 'Completed')}
                      className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold transition-all"
                    >
                      Mark Done
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Record Treatment Modal */}
      {isRecordModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-sky-50/50">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-sky-100 text-sky-700">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <h3 className="text-base font-black text-slate-900">Record Dental Treatment</h3>
              </div>
              <button 
                onClick={() => setIsRecordModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTreatment} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Select Patient
                </label>
                <select
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500"
                >
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.phone})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Procedure
                </label>
                <select
                  value={selectedTreatment}
                  onChange={(e) => handleTreatmentChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500"
                >
                  {DENTAL_TREATMENTS.map(t => (
                    <option key={t.id} value={t.name}>{t.name} (₹{t.defaultPrice.toLocaleString()})</option>
                  ))}
                </select>
              </div>

              {/* Tooth selector pills */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Tooth / Arch Number
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1 bg-slate-50 rounded-xl border border-slate-200/70">
                  {commonTeeth.map(tooth => {
                    const isSelected = selectedTeeth.includes(tooth);
                    return (
                      <button
                        type="button"
                        key={tooth}
                        onClick={() => toggleTooth(tooth)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                          isSelected 
                            ? 'bg-sky-600 text-white shadow-xs' 
                            : 'bg-white text-slate-600 border border-slate-200 hover:border-sky-300'
                        }`}
                      >
                        {tooth}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Status
                  </label>
                  <select
                    value={treatmentStatus}
                    onChange={(e) => setTreatmentStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500"
                  >
                    <option value="Planned">Planned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Cost (₹)
                  </label>
                  <input
                    type="number"
                    value={treatmentCost}
                    onChange={(e) => setTreatmentCost(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Clinical Notes / Observations
                </label>
                <textarea
                  rows={3}
                  value={treatmentNotes}
                  onChange={(e) => setTreatmentNotes(e.target.value)}
                  placeholder="e.g. BMP completed with F2. Obturation scheduled for next visit."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsRecordModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white text-xs font-black rounded-xl shadow-md transition-all active:scale-98"
                >
                  Save Treatment Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MedicalNote } from '../../types';
import { 
  Sparkles, 
  Plus, 
  Search, 
  FileText, 
  Calendar, 
  User, 
  Stethoscope, 
  ClipboardList, 
  CheckCircle2, 
  X,
  Eye,
  Activity
} from 'lucide-react';

export const MedicalNotesScreen: React.FC = () => {
  const { 
    medicalNotes, 
    addMedicalNote, 
    patients, 
    currentUser 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<MedicalNote | null>(null);

  // Form states
  const [patientId, setPatientId] = useState(patients[0]?.id || '');
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [examinationFindings, setExaminationFindings] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [toothNumbers, setToothNumbers] = useState('#19');

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    const pat = patients.find(p => p.id === patientId);

    addMedicalNote({
      patientId,
      patientName: pat?.name || 'Walk-in Patient',
      doctorName: currentUser?.name || 'Dr. Sarah Johnson',
      chiefComplaint,
      examinationFindings,
      diagnosis,
      clinicalNotes,
      toothNumbers: toothNumbers ? toothNumbers.split(',').map(s => s.trim()) : []
    });

    setIsAddNoteModalOpen(false);
    setChiefComplaint('');
    setExaminationFindings('');
    setDiagnosis('');
    setClinicalNotes('');
  };

  const filteredNotes = medicalNotes.filter(n =>
    n.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.chiefComplaint.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-sky-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
            <span>Clinical Documentation • SOAP Progress Notes</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Clinical Medical Notes
          </h1>
          <p className="text-xs sm:text-sm text-sky-100 mt-1 max-w-xl">
            Document chief complaints, clinical intraoral examination, differential diagnosis, and operative treatment steps.
          </p>
        </div>

        <button
          onClick={() => setIsAddNoteModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-sky-50 text-sky-700 rounded-2xl text-xs sm:text-sm font-black shadow-md transition-all active:scale-98 self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4 text-sky-600" />
          <span>+ New Clinical Note</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search notes by patient, diagnosis, or symptom..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
          />
        </div>
        <span className="text-xs font-bold text-slate-400 hidden sm:inline">
          Showing {filteredNotes.length} clinical notes
        </span>
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        {filteredNotes.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center text-slate-400 text-xs border border-slate-200/80 shadow-xs">
            No clinical notes found. Click "+ New Clinical Note" to record examination findings.
          </div>
        ) : (
          filteredNotes.map(note => (
            <div 
              key={note.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:border-sky-200 p-6 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center font-bold text-sm">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black text-slate-900">{note.patientName}</h3>
                      {note.toothNumbers && note.toothNumbers.map(t => (
                        <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-black bg-sky-100 text-sky-800 border border-sky-200">
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 font-medium">Recorded by {note.doctorName} • {note.date}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedNote(note)}
                  className="px-3.5 py-1.5 bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200 rounded-xl text-xs font-bold transition-all self-start sm:self-auto"
                >
                  View Full Note
                </button>
              </div>

              {/* SOAP Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-1">
                    Chief Complaint (S)
                  </span>
                  <p className="text-slate-800 font-medium leading-relaxed">
                    {note.chiefComplaint}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-1">
                    Diagnosis (A)
                  </span>
                  <p className="text-sky-900 font-bold leading-relaxed">
                    {note.diagnosis}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 md:col-span-2">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-1">
                    Examination Findings & Clinical Observations (O / P)
                  </span>
                  <p className="text-slate-700 font-medium leading-relaxed">
                    {note.examinationFindings}
                  </p>
                  {note.clinicalNotes && (
                    <p className="text-slate-600 mt-2 pt-2 border-t border-slate-200/60 font-mono text-[11px]">
                      Procedure: {note.clinicalNotes}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Note Modal (Adapted from visit_notes_screen.dart) */}
      {isAddNoteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-sky-50/50">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-sky-100 text-sky-700">
                  <ClipboardList className="w-4 h-4" />
                </div>
                <h3 className="text-base font-black text-slate-900">Add Clinical SOAP Note</h3>
              </div>
              <button 
                onClick={() => setIsAddNoteModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveNote} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Patient
                  </label>
                  <select
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500"
                  >
                    {patients.map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.phone})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Tooth / Region (e.g. #19, Upper Right)
                  </label>
                  <input
                    type="text"
                    value={toothNumbers}
                    onChange={(e) => setToothNumbers(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Chief Complaint / Reason for Visit
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Patient states throbbing pain in lower jaw..."
                  value={chiefComplaint}
                  onChange={(e) => setChiefComplaint(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Intraoral & Radiographic Examination Findings
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Carious lesion on #19, percussion tenderness positive, cold test lingering..."
                  value={examinationFindings}
                  onChange={(e) => setExaminationFindings(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Clinical Diagnosis
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Symptomatic Irreversible Pulpitis"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Procedure Performed & Next Plan
                </label>
                <textarea
                  rows={3}
                  placeholder="Canals prepared up to F2, NaOCl irrigation, Ca(OH)2 placed. Recall for obturation in 7 days."
                  value={clinicalNotes}
                  onChange={(e) => setClinicalNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddNoteModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white text-xs font-black rounded-xl shadow-md transition-all active:scale-98"
                >
                  Save SOAP Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Note Detail Drawer Modal */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-sky-50/50">
              <div>
                <h3 className="text-base font-black text-slate-900">{selectedNote.patientName}</h3>
                <p className="text-xs text-slate-500">{selectedNote.date} • {selectedNote.doctorName}</p>
              </div>
              <button 
                onClick={() => setSelectedNote(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs max-h-[70vh] overflow-y-auto">
              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">Diagnosis</span>
                <p className="text-sm font-black text-sky-900">{selectedNote.diagnosis}</p>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">Chief Complaint</span>
                <p className="text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">{selectedNote.chiefComplaint}</p>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">Examination Findings</span>
                <p className="text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">{selectedNote.examinationFindings}</p>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">Clinical Procedure Notes</span>
                <p className="text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100 font-mono text-[11px] leading-relaxed">{selectedNote.clinicalNotes}</p>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex justify-end bg-slate-50">
              <button
                onClick={() => setSelectedNote(null)}
                className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold"
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

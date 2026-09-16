import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { voiceService } from '../../services/voiceService';
import { VoiceState } from '../../types';
import { WaveformVisualizer } from '../common/WaveformVisualizer';
import { 
  Mic, 
  MicOff, 
  CheckCircle2, 
  Edit3, 
  RefreshCw, 
  AlertTriangle, 
  ShieldAlert, 
  FileCheck, 
  Pill, 
  Stethoscope, 
  Sparkles, 
  Calendar, 
  User, 
  History, 
  AlertCircle,
  Copy,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const ConsultationScreen: React.FC = () => {
  const { 
    selectedPatient, 
    clinicalNote, 
    updateClinicalNote, 
    approveClinicalNote, 
    showToast,
    setCurrentNav 
  } = useApp();

  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [liveTranscript, setLiveTranscript] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editableNote, setEditableNote] = useState(clinicalNote);

  useEffect(() => {
    setEditableNote(clinicalNote);
  }, [clinicalNote]);

  useEffect(() => {
    voiceService.registerCallbacks(
      (state) => {
        setVoiceState(state);
      },
      (text, isFinal) => {
        setLiveTranscript(text);
        if (isFinal) {
          handleProcessVoiceDictation(text);
        }
      }
    );

    return () => {
      voiceService.stopListening();
    };
  }, []);

  const handleStartVoiceNotes = () => {
    setLiveTranscript('');
    const sampleDictation = "Patient Aarav Sharma complains of severe throbbing pain in tooth number 30 for 3 days. Exam shows deep disto-occlusal decay extending into the pulp chamber. Percussion positive. Diagnosis is symptomatic irreversible pulpitis. Plan root canal stage one emergency pulpectomy today. Prescribe Clindamycin 300mg because patient is allergic to penicillin, plus Ketorol DT for pain. Schedule follow-up in 6 days.";
    voiceService.startListening(sampleDictation);
    showToast("Listening to doctor dictation...", 'info');
  };

  const handleStopVoiceNotes = () => {
    voiceService.stopListening();
    if (liveTranscript) {
      handleProcessVoiceDictation(liveTranscript);
    }
  };

  const handleProcessVoiceDictation = (dictationText: string) => {
    setVoiceState('processing');
    setTimeout(() => {
      updateClinicalNote({
        chiefComplaint: 'Severe throbbing pain in lower-right back jaw (#30) for 3 days, aggravated by hot foods.',
        clinicalObservations: 'Tooth #30 presents with deep disto-occlusal caries extending to the pulp horns. Percussion positive. Normal probing depths (2-3mm). Radiolucency visible on radiograph.',
        diagnosis: 'Symptomatic Irreversible Pulpitis with Symptomatic Apical Periodontitis (#30)',
        toothNumber: '#30',
        treatmentPlan: 'Emergency pulpectomy under rubber dam. Shaping, sodium hypochlorite irrigation, calcium hydroxide dressing. Full Zirconia crown restoration planned post-obturation.',
        followUpRecommendation: 'Return in 6 days for canal obturation. Advised to call if swelling or fever develops.',
        followUpDays: 6,
        rawVoiceTranscript: dictationText,
        isApproved: false // Strictly draft!
      });
      setVoiceState('completed');
      showToast("Voice notes structured into AI Draft. Please review and approve.", 'info');
    }, 900);
  };

  const handleRegenerate = () => {
    showToast("AI Regenerating clinical summary...", 'info');
    setTimeout(() => {
      updateClinicalNote({
        clinicalObservations: 'Tooth #30 exhibits extensive deep occlusal-distal carious breakdown with pulpal exposure. Cold test produces sharp, lingering pain. No mobility noted.'
      });
      showToast("Draft updated with refreshed clinical phrasing", 'success');
    }, 700);
  };

  const handleSaveEdits = () => {
    updateClinicalNote(editableNote);
    setIsEditing(false);
    showToast("Clinical draft modifications saved.", 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Consultation Header Banner */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
              Active Operatory 1
            </span>
            <span className="text-xs text-slate-400">Consultation in Progress</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {selectedPatient.name}
            </h1>
            <span className="text-sm font-semibold text-slate-500">
              {selectedPatient.age} yrs • {selectedPatient.gender} • ID: {selectedPatient.id}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
            <span className="font-semibold text-slate-700">Reason:</span> Molar throbbing pain (#30)
            <span>•</span>
            <span className="text-teal-700 font-medium">Last Visit: May 2025 (Composite Filling #19)</span>
          </p>
        </div>

        {/* Doctor Voice Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (voiceState === 'listening') {
                handleStopVoiceNotes();
              } else {
                handleStartVoiceNotes();
              }
            }}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all shadow-sm ${
              voiceState === 'listening'
                ? 'bg-rose-600 text-white shadow-rose-600/30 ring-4 ring-rose-100 animate-pulse'
                : 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/30'
            }`}
          >
            {voiceState === 'listening' ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            <span>{voiceState === 'listening' ? 'Stop Recording' : 'Start Voice Notes'}</span>
          </button>
        </div>
      </div>

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Patient Info (3 Cols) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Medical Alerts Card */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-soft">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              Medical Alerts & Allergies
            </h3>

            <div className="space-y-2.5">
              {selectedPatient.medicalOverview.allergies.map((allergy, idx) => (
                <div key={idx} className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl">
                  <div className="text-xs font-black text-rose-800 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    {allergy}
                  </div>
                </div>
              ))}

              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 font-medium">
                <span className="font-bold block text-amber-950 mb-0.5">Clinical Note:</span>
                {selectedPatient.medicalOverview.importantNotes}
              </div>
            </div>
          </div>

          {/* Dental History Timeline */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-soft">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <History className="w-4 h-4 text-teal-600" />
              Dental History Timeline
            </h3>

            <div className="relative pl-4 space-y-4 border-l-2 border-teal-100">
              {selectedPatient.dentalHistory.map((item) => (
                <div key={item.id} className="relative">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-teal-600 ring-4 ring-white" />
                  <div className="text-[11px] font-bold text-teal-700">{item.year} • {item.date}</div>
                  <div className="text-xs font-bold text-slate-800">{item.treatment}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.notes}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: Consultation Workspace (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Live Voice Feedback Bar (when recording) */}
          {voiceState === 'listening' && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl shadow-soft">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-xs font-bold text-rose-700">Listening to voice notes...</span>
                </div>
                <WaveformVisualizer state="listening" barCount={12} />
              </div>
              <p className="text-xs font-mono text-slate-700 italic bg-white/70 p-2.5 rounded-xl border border-rose-100">
                "{liveTranscript || 'Start speaking your clinical observations...'}"
              </p>
            </div>
          )}

          {/* DRAFT Warning / Approval Banner */}
          <div className={`p-4 rounded-2xl border transition-all ${
            clinicalNote.isApproved
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : 'bg-amber-50/90 border-amber-200/90 text-amber-950 shadow-soft'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-2.5">
                {clinicalNote.isApproved ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      clinicalNote.isApproved ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-200 text-amber-900'
                    }`}>
                      {clinicalNote.isApproved ? 'APPROVED CLINICAL RECORD' : 'AI DRAFT — REQUIRES DOCTOR APPROVAL'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {clinicalNote.isApproved
                      ? `Signed by ${clinicalNote.doctorSignature} at ${clinicalNote.approvedAt}`
                      : 'AI has structured your spoken words. The doctor holds final medical authority.'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                {!clinicalNote.isApproved && (
                  <>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      {isEditing ? 'Cancel Edit' : 'Edit'}
                    </button>
                    <button
                      onClick={handleRegenerate}
                      className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Regenerate
                    </button>
                    <button
                      onClick={approveClinicalNote}
                      className="px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-sm shadow-teal-600/25 transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Approve
                    </button>
                  </>
                )}
                {clinicalNote.isApproved && (
                  <button
                    onClick={() => setCurrentNav('reports')}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                  >
                    <span>Explain to Patient</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Structured Note Content */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-soft space-y-5">
            {/* Chief Complaint */}
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                1. Chief Complaint
              </label>
              {isEditing ? (
                <textarea
                  value={editableNote.chiefComplaint}
                  onChange={(e) => setEditableNote({ ...editableNote, chiefComplaint: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-50 border rounded-xl"
                  rows={2}
                />
              ) : (
                <p className="text-sm text-slate-800 font-medium bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  {clinicalNote.chiefComplaint}
                </p>
              )}
            </div>

            {/* Symptoms */}
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                2. Symptoms & Duration
              </label>
              <div className="space-y-1.5">
                {clinicalNote.symptoms.map((symptom, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-teal-50/40 px-3 py-1.5 rounded-lg border border-teal-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                    <span>{symptom}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical Observations */}
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                3. Clinical Observations & Radiographs
              </label>
              {isEditing ? (
                <textarea
                  value={editableNote.clinicalObservations}
                  onChange={(e) => setEditableNote({ ...editableNote, clinicalObservations: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-50 border rounded-xl"
                  rows={3}
                />
              ) : (
                <p className="text-xs leading-relaxed text-slate-700 bg-slate-50/70 p-3 rounded-xl border border-slate-100 font-sans">
                  {clinicalNote.clinicalObservations}
                </p>
              )}
            </div>

            {/* Diagnosis */}
            <div className="p-3.5 bg-slate-900 text-white rounded-2xl">
              <span className="text-[10px] font-bold text-teal-300 uppercase tracking-wider block mb-1">
                4. Primary Clinical Diagnosis
              </span>
              <p className="text-sm font-bold text-white flex items-center justify-between">
                <span>{clinicalNote.diagnosis}</span>
                <span className="text-xs font-mono px-2 py-0.5 bg-slate-800 text-teal-300 rounded border border-slate-700">
                  Tooth #30
                </span>
              </p>
            </div>

            {/* Treatment Plan */}
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                5. Treatment Executed & Plan
              </label>
              <p className="text-xs leading-relaxed text-slate-700 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                {clinicalNote.treatmentPlan}
              </p>
            </div>

            {/* Prescription */}
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Pill className="w-3.5 h-3.5 text-teal-600" />
                6. Prescription & Allergy Safeguards
              </label>
              <div className="space-y-2">
                {clinicalNote.prescription.map((rx, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{rx.medicine}</span>
                      <span className="text-teal-700 font-mono">{rx.dosage}</span>
                    </div>
                    <div className="text-slate-500 mt-0.5">{rx.frequency} • {rx.duration}</div>
                    <div className="text-[11px] text-slate-600 mt-1 italic font-medium bg-white p-1.5 rounded border border-slate-100">
                      {rx.instructions}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Follow-up */}
            <div className="flex items-center justify-between p-3 bg-teal-50/70 rounded-xl border border-teal-200 text-xs">
              <span className="font-bold text-teal-900">7. Follow-Up:</span>
              <span className="text-teal-800 font-medium">{clinicalNote.followUpRecommendation}</span>
            </div>

            {isEditing && (
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdits}
                  className="px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: AI Copilot & Real-Time Suggestions (3 Cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-soft">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-teal-600" />
              AI Clinical Copilot
            </h3>

            <div className="space-y-3">
              <div className="p-3 bg-teal-50/80 rounded-xl border border-teal-200 text-xs text-teal-950">
                <span className="font-bold block text-teal-800 mb-1">Safety Rule Enforced:</span>
                Penicillin allergy detected. Switched proposed antibiotic from Augmentin to Clindamycin 300mg.
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                <span className="font-bold block text-slate-800 mb-1">Recommended ADA Code:</span>
                D3330 (Molar Root Canal, 3 canals) + D2950 (Core Build-up).
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                <span className="font-bold block text-slate-800 mb-1">Patient Anxiety Management:</span>
                Apply benzocaine 20% topical gel 2 minutes prior to inferior alveolar nerve block.
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-soft">
            <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4" />
              One-Click Actions
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => setCurrentNav('reports')}
                className="w-full text-left p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-between transition-colors"
              >
                <span>Translate Note for Patient</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                onClick={() => setCurrentNav('treatment-plans')}
                className="w-full text-left p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-between transition-colors"
              >
                <span>View Stage Treatment Plan</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                onClick={() => setCurrentNav('billing')}
                className="w-full text-left p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-between transition-colors"
              >
                <span>Generate Itemized Invoice</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

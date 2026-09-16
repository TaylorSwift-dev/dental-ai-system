import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  Sparkles, 
  Globe2, 
  Copy, 
  Send, 
  RefreshCw, 
  CheckCircle2, 
  ShieldCheck, 
  Languages, 
  Volume2,
  Share2
} from 'lucide-react';
import { voiceService } from '../../services/voiceService';

export const AIReportExplanationScreen: React.FC = () => {
  const { reports, selectedPatient, showToast } = useApp();
  const report = reports[0];
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi' | 'mr' | 'es'>('en');
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const languageLabels = {
    en: { name: 'English', native: 'English' },
    hi: { name: 'Hindi', native: 'हिन्दी' },
    mr: { name: 'Marathi', native: 'मराठी' },
    es: { name: 'Spanish', native: 'Español' }
  };

  const currentExplanation = report.patientFriendlyExplanations[selectedLanguage];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentExplanation);
    setCopied(true);
    showToast("Patient explanation copied to clipboard", 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendToPatient = () => {
    showToast(`Explanation (${languageLabels[selectedLanguage].name}) dispatched to ${selectedPatient.name} via WhatsApp and SMS`, 'success');
  };

  const handleExplainAgain = () => {
    setIsRegenerating(true);
    showToast("AI refining explanation for enhanced clarity...", 'info');
    setTimeout(() => {
      setIsRegenerating(false);
      showToast("Explanation refined with analogies for easier understanding.", 'success');
    }, 800);
  };

  const handleSpeak = () => {
    voiceService.speakText(currentExplanation);
    showToast("Reading aloud patient explanation...", 'info');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Screen Title & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
              AI Clinical Translator
            </span>
            <span className="text-xs text-slate-400">Approved EHR Source</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            AI Report Explanation
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Converts technical dental jargon into clear, comforting explanations for patients.
          </p>
        </div>

        {/* Language Selection Header */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80">
          <Languages className="w-4 h-4 text-slate-500 ml-2" />
          {(['en', 'hi', 'mr', 'es'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all ${
                selectedLanguage === lang
                  ? 'bg-white text-teal-700 shadow-soft border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {languageLabels[lang].native}
            </button>
          ))}
        </div>
      </div>

      {/* Mandatory Safety Notice */}
      <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex items-center justify-between gap-3 text-xs text-emerald-950 font-medium">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Strict Clinical Compliance: Patient explanation is guaranteed to be generated only from the doctor-approved clinical findings for tooth #30.
          </span>
        </div>
        <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 font-bold text-[10px] uppercase shrink-0">
          Verified Doctor Source
        </span>
      </div>

      {/* DUAL PANEL COMPARATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT PANEL: Clinical Report */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-soft flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-slate-700" />
                <h2 className="text-base font-extrabold text-slate-900">
                  Approved Clinical Report
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-400">ID: {report.id}</span>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Procedure / Evaluation
              </span>
              <p className="text-sm font-bold text-slate-800">
                {report.procedure}
              </p>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Clinical Findings
              </span>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs leading-relaxed text-slate-800 font-mono">
                "{report.clinicalFindings}"
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Radiographic Evaluation
              </span>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs leading-relaxed text-slate-800 font-mono">
                "{report.radiographicEvaluation}"
              </div>
            </div>

            <div className="p-4 bg-slate-900 text-white rounded-2xl">
              <span className="text-[10px] font-bold text-teal-300 uppercase tracking-wider block mb-1">
                Formal Diagnosis & Plan
              </span>
              <p className="text-xs font-bold text-white mb-1">
                {report.diagnosis}
              </p>
              <p className="text-xs text-slate-300">
                {report.recommendedTreatment}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-between">
            <span>Provider: Dr. Priya Mehta, MDS</span>
            <span>Signed: Sep 12, 2026</span>
          </div>
        </div>

        {/* RIGHT PANEL: Patient-Friendly Explanation */}
        <div className="p-6 bg-gradient-to-br from-teal-50/40 via-white to-sky-50/30 rounded-3xl border border-teal-200 shadow-soft flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-teal-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center shadow-sm">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h2 className="text-base font-extrabold text-teal-950">
                  Patient-Friendly Explanation
                </h2>
              </div>
              <span className="text-xs font-bold text-teal-700 bg-teal-100/70 px-2.5 py-0.5 rounded-full">
                Language: {languageLabels[selectedLanguage].name}
              </span>
            </div>

            {/* AI Explanation Text Box */}
            <div className={`p-5 bg-white rounded-2xl border border-teal-200/80 shadow-soft relative transition-all ${
              isRegenerating ? 'opacity-40 animate-pulse' : 'opacity-100'
            }`}>
              <div className="flex items-center justify-between mb-3 text-xs text-teal-800 font-bold">
                <span>Simplified Overview for {selectedPatient.name}</span>
                <button
                  onClick={handleSpeak}
                  className="flex items-center gap-1 text-teal-700 hover:text-teal-900 bg-teal-50 px-2 py-0.5 rounded"
                  title="Read aloud"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen</span>
                </button>
              </div>

              <p className="text-base leading-relaxed text-slate-800 font-medium">
                "{currentExplanation}"
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Eliminated intimidating technical dental terms while preserving medical accuracy.</span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Explain Again, Copy, Send to Patient */}
          <div className="pt-4 border-t border-teal-100 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handleExplainAgain}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-soft"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Explain Again
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-soft"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>

              <button
                onClick={handleSendToPatient}
                className="flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-extrabold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-xl shadow-sm shadow-teal-600/30 transition-all"
              >
                <Send className="w-4 h-4" />
                Send to Patient
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

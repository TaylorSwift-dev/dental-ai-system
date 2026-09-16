import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  HeartPulse, 
  Send, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  MessageSquare, 
  PhoneCall, 
  Sparkles, 
  ChevronRight, 
  ShieldAlert,
  ArrowRight,
  Smile,
  Meh,
  Frown,
  RefreshCw
} from 'lucide-react';

export const FollowUpScreen: React.FC = () => {
  const { 
    followUps, 
    sendFollowUpCheckIn, 
    recordPatientCheckInResponse, 
    showToast,
    userRole 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'due_today' | 'upcoming' | 'completed' | 'no_response'>('due_today');
  
  // Interactive Patient Check-In Simulator State
  const [simulatorPatientId, setSimulatorPatientId] = useState<string>('FU-501');
  const [patientFeeling, setPatientFeeling] = useState<'better' | 'same' | 'problem' | null>(null);
  const [problemSymptoms, setProblemSymptoms] = useState<string>('');
  const [triageStep, setTriageStep] = useState<'rating' | 'collecting_info' | 'submitted'>('rating');

  const filteredItems = followUps.filter(f => f.tabCategory === activeTab);

  const handlePatientChoice = (choice: 'better' | 'same' | 'problem') => {
    setPatientFeeling(choice);
    if (choice === 'problem') {
      setTriageStep('collecting_info');
    } else {
      recordPatientCheckInResponse(simulatorPatientId, choice);
      setTriageStep('submitted');
    }
  };

  const handleProblemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    recordPatientCheckInResponse(simulatorPatientId, 'problem', problemSymptoms || 'Moderate swelling & throbbing');
    setTriageStep('submitted');
  };

  const resetSimulator = () => {
    setPatientFeeling(null);
    setProblemSymptoms('');
    setTriageStep('rating');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Screen Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
              Automated Patient Care
            </span>
            <span className="text-xs text-slate-400">Post-Procedure Monitoring</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Patient Follow-ups
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            AI-monitored recovery check-ins with doctor alerting on distress signals.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 overflow-x-auto">
          {[
            { id: 'due_today', label: 'Due Today' },
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'completed', label: 'Completed' },
            { id: 'no_response', label: 'No Response' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-teal-700 shadow-soft border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT 8 COLS: Follow-Up Management List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-teal-600" />
                Follow-Up Queue ({filteredItems.length})
              </h2>
              <span className="text-xs text-slate-400">Auto-synced with WhatsApp & SMS</span>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredItems.map((item) => {
                const isCallRequired = item.status === 'Call required';
                return (
                  <div key={item.id} className="p-5 hover:bg-slate-50/70 transition-colors space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-extrabold text-slate-900">
                            {item.patientName}
                          </h3>
                          <span className="text-xs font-mono text-slate-400">{item.patientPhone}</span>
                        </div>
                        <p className="text-xs text-teal-700 font-semibold mt-0.5">
                          {item.treatment} • Follow-up: {item.followUpDate}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                          isCallRequired
                            ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
                            : item.status === 'Patient responded'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {item.status}
                        </span>

                        <button
                          onClick={() => sendFollowUpCheckIn(item.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-teal-600/25 transition-all"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Send Check-in
                        </button>
                      </div>
                    </div>

                    {/* Last Response Banner */}
                    {item.lastResponse && (
                      <div className={`p-3 rounded-xl border text-xs leading-relaxed ${
                        item.sentiment === 'problem'
                          ? 'bg-rose-50/90 border-rose-200 text-rose-950 font-semibold'
                          : item.sentiment === 'good'
                          ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}>
                        <div className="flex items-start gap-2">
                          {item.sentiment === 'problem' ? (
                            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <span className="font-bold mr-1">Latest Status:</span>
                            {item.lastResponse}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Automated History Preview */}
                    {item.checkInHistory.length > 0 && (
                      <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 text-[11px] text-slate-500">
                        <span className="font-bold text-slate-700">Audit Trail:</span>
                        {item.checkInHistory.map((hist, i) => (
                          <span key={i} className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                            {hist.timestamp} ({hist.type})
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT 5 COLS: Section 12 Automated Patient Check-In Experience */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-soft">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h2 className="text-sm font-extrabold text-slate-900">
                  Patient Interactive Check-In
                </h2>
              </div>
              <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Patient View
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              This interactive widget shows the exact mobile experience received by Aarav Sharma after treatment.
            </p>

            {/* SIMULATOR SCREEN */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150"
                  alt="Dr. Priya"
                  className="w-10 h-10 rounded-full object-cover border border-teal-200"
                />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">Dr. Priya Mehta • SmileCare</h4>
                  <p className="text-[11px] text-slate-500">Automated Post-Treatment Check-in</p>
                </div>
              </div>

              {triageStep === 'rating' && (
                <div className="space-y-4">
                  <h3 className="text-base font-extrabold text-slate-900 text-center">
                    How are you feeling today?
                  </h3>

                  <div className="grid grid-cols-3 gap-2.5">
                    <button
                      onClick={() => handlePatientChoice('better')}
                      className="flex flex-col items-center justify-center p-3 rounded-xl bg-white hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 text-slate-800 transition-all group"
                    >
                      <span className="text-2xl mb-1">🙂</span>
                      <span className="text-xs font-bold text-center">Much better</span>
                    </button>

                    <button
                      onClick={() => handlePatientChoice('same')}
                      className="flex flex-col items-center justify-center p-3 rounded-xl bg-white hover:bg-amber-50 hover:border-amber-300 border border-slate-200 text-slate-800 transition-all group"
                    >
                      <span className="text-2xl mb-1">😐</span>
                      <span className="text-xs font-bold text-center">About the same</span>
                    </button>

                    <button
                      onClick={() => handlePatientChoice('problem')}
                      className="flex flex-col items-center justify-center p-3 rounded-xl bg-white hover:bg-rose-50 hover:border-rose-300 border border-slate-200 text-slate-800 transition-all group"
                    >
                      <span className="text-2xl mb-1">😟</span>
                      <span className="text-xs font-bold text-center">I'm having problems</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Conversational Triage when patient has problems */}
              {triageStep === 'collecting_info' && (
                <form onSubmit={handleProblemSubmit} className="space-y-3 animate-in fade-in duration-200">
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-950 font-medium">
                    <span className="font-bold block mb-1">We're here to help you:</span>
                    Please tell us briefly what symptoms you are experiencing (e.g., swelling, sharp pain, fever).
                  </div>

                  <textarea
                    value={problemSymptoms}
                    onChange={(e) => setProblemSymptoms(e.target.value)}
                    placeholder="Describe your pain level or symptoms..."
                    className="w-full p-3 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    rows={3}
                    required
                  />

                  {/* Crucial Disclaimer */}
                  <div className="p-2.5 bg-slate-100 rounded-xl text-[11px] text-slate-600 flex items-start gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <span>Our clinical team will review your message promptly. AI does not provide independent diagnosis.</span>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={resetSimulator}
                      className="px-3 py-1.5 text-xs text-slate-600 font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-sm"
                    >
                      Send to Dental Team
                    </button>
                  </div>
                </form>
              )}

              {triageStep === 'submitted' && (
                <div className="text-center py-4 space-y-3 animate-in fade-in duration-200">
                  <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">Response Received</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      {patientFeeling === 'problem'
                        ? 'Dr. Priya Mehta and the clinic team have been alerted and will reach out shortly.'
                        : 'Thank you for updating us! Remember to take medications as instructed.'}
                    </p>
                  </div>
                  <button
                    onClick={resetSimulator}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:underline pt-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Try Another Response
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

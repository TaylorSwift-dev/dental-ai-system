import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Grid, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RotateCcw,
  FileText,
  User,
  Sparkles,
  X
} from 'lucide-react';

export const CallManagerModal: React.FC = () => {
  const { isCallModalOpen, activeCallPatient, endCall, logCall, showToast } = useApp();

  const [callStatus, setCallStatus] = useState<'ringing' | 'connected' | 'ended'>('ringing');
  const [seconds, setSeconds] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSpeaker, setIsSpeaker] = useState<boolean>(true);
  const [showKeypad, setShowKeypad] = useState<boolean>(false);
  const [callNotes, setCallNotes] = useState<string>('');
  const [selectedOutcome, setSelectedOutcome] = useState<'Completed' | 'No Answer' | 'Busy' | 'Reschedule Requested' | 'Voicemail'>('Completed');

  // Timer effect
  useEffect(() => {
    let timer: any = null;
    if (isCallModalOpen) {
      setCallStatus('ringing');
      setSeconds(0);
      setCallNotes('');
      setSelectedOutcome('Completed');

      // Automatically connect after 2.5 seconds to simulate answer
      const ringTimer = setTimeout(() => {
        setCallStatus('connected');
      }, 2500);

      return () => clearTimeout(ringTimer);
    }
  }, [isCallModalOpen]);

  useEffect(() => {
    let interval: any = null;
    if (callStatus === 'connected') {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  if (!isCallModalOpen || !activeCallPatient) return null;

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndAndSave = () => {
    logCall({
      patientId: activeCallPatient.patientId,
      patientName: activeCallPatient.name,
      phone: activeCallPatient.phone,
      duration: formatTime(seconds),
      outcome: selectedOutcome,
      notes: callNotes || `Call logged by front desk receptionist. Outcome: ${selectedOutcome}.`,
      appointmentContext: activeCallPatient.treatment || activeCallPatient.time
    });
    endCall();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-sky-100 overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 p-6 text-white text-center relative">
          <button
            onClick={endCall}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-20 h-20 rounded-full mx-auto ring-4 ring-white/30 overflow-hidden mb-3 bg-white/20 flex items-center justify-center shadow-lg">
            {activeCallPatient.avatar ? (
              <img src={activeCallPatient.avatar} alt={activeCallPatient.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-10 h-10 text-white" />
            )}
          </div>

          <h3 className="text-xl font-black tracking-tight">{activeCallPatient.name}</h3>
          <p className="text-sm text-sky-100 font-mono mt-0.5">{activeCallPatient.phone}</p>

          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-xs">
            {callStatus === 'ringing' && (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping"></span>
                <span>Ringing patient...</span>
              </>
            )}
            {callStatus === 'connected' && (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                <span>Call Connected • {formatTime(seconds)}</span>
              </>
            )}
            {callStatus === 'ended' && (
              <>
                <span className="w-2 h-2 rounded-full bg-rose-300"></span>
                <span>Call Ended</span>
              </>
            )}
          </div>
        </div>

        {/* Call In-Progress Controls */}
        <div className="p-6 space-y-5">
          {activeCallPatient.treatment && (
            <div className="bg-sky-50/70 border border-sky-100 rounded-2xl p-3 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Context / Treatment:</span>
              <span className="font-bold text-sky-900">{activeCallPatient.treatment}</span>
            </div>
          )}

          {/* Quick Hardware Controls */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setIsMuted(m => !m)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all text-xs font-bold ${
                isMuted
                  ? 'bg-rose-50 border-rose-200 text-rose-700'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
              }`}
            >
              {isMuted ? <MicOff className="w-5 h-5 mb-1 text-rose-600" /> : <Mic className="w-5 h-5 mb-1" />}
              <span>{isMuted ? 'Muted' : 'Mute'}</span>
            </button>

            <button
              onClick={() => setIsSpeaker(s => !s)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all text-xs font-bold ${
                isSpeaker
                  ? 'bg-sky-50 border-sky-200 text-sky-700'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
              }`}
            >
              {isSpeaker ? <Volume2 className="w-5 h-5 mb-1 text-sky-600" /> : <VolumeX className="w-5 h-5 mb-1" />}
              <span>{isSpeaker ? 'Speaker On' : 'Speaker Off'}</span>
            </button>

            <button
              onClick={() => setShowKeypad(k => !k)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all text-xs font-bold ${
                showKeypad
                  ? 'bg-sky-50 border-sky-200 text-sky-700'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <Grid className="w-5 h-5 mb-1" />
              <span>Keypad</span>
            </button>
          </div>

          {/* Keypad Simulation Drawer */}
          {showKeypad && (
            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200 animate-in fade-in duration-150">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map(key => (
                <button
                  key={key}
                  onClick={() => showToast(`Key tone: ${key}`, 'info')}
                  className="py-2 rounded-xl bg-white hover:bg-sky-50 text-slate-800 font-bold border border-slate-200/80 text-sm shadow-xs transition-all active:scale-95"
                >
                  {key}
                </button>
              ))}
            </div>
          )}

          {/* Call Outcome Selection */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
              Select Call Outcome
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Completed', color: 'hover:border-emerald-300' },
                { label: 'No Answer', color: 'hover:border-amber-300' },
                { label: 'Busy', color: 'hover:border-rose-300' },
                { label: 'Reschedule Requested', color: 'hover:border-sky-300' },
                { label: 'Voicemail', color: 'hover:border-purple-300' }
              ].map(opt => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setSelectedOutcome(opt.label as any)}
                  className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all text-left truncate ${
                    selectedOutcome === opt.label
                      ? 'bg-sky-500 text-white border-sky-600 shadow-xs'
                      : `bg-white text-slate-700 border-slate-200 ${opt.color}`
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Receptionist Call Note */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center justify-between">
              <span>Add Front Desk Note</span>
              <span className="text-[10px] text-slate-400">Saves to patient history</span>
            </label>
            <textarea
              rows={2}
              value={callNotes}
              onChange={e => setCallNotes(e.target.value)}
              placeholder="e.g., Patient confirmed arrival at 10:00 AM, requested wheelchair assistance upon entry..."
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleEndAndSave}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md shadow-rose-600/30 transition-all active:scale-98"
            >
              <PhoneOff className="w-4 h-4" />
              <span>End Call & Log Result</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

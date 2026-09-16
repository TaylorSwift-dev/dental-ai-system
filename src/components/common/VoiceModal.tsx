import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { voiceService } from '../../services/voiceService';
import { VoiceState } from '../../types';
import { WaveformVisualizer } from './WaveformVisualizer';
import { 
  Mic, 
  MicOff, 
  X, 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  FileText, 
  Users, 
  Clock, 
  CheckCircle2, 
  Volume2 
} from 'lucide-react';

export const VoiceModal: React.FC = () => {
  const { isGlobalVoiceModalOpen, closeVoiceModal, executeVoiceAction } = useApp();
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [transcript, setTranscript] = useState<string>('');
  const [inputQuery, setInputQuery] = useState<string>('');
  const [aiResponseText, setAiResponseText] = useState<string>('');

  const quickActions = [
    { label: "Show today's patients", query: "Show today's patients", icon: Users },
    { label: "Book a follow-up for Aarav", query: "Book a follow-up for Aarav", icon: Calendar },
    { label: "Prepare the clinical note", query: "Prepare the clinical note", icon: FileText },
    { label: "Show patients who missed follow-up", query: "Show patients who missed their follow-up", icon: Clock },
    { label: "Explain this report", query: "Explain this report to patient", icon: FileText },
    { label: "Generate today's clinic report", query: "Generate today's clinic report", icon: Sparkles }
  ];

  useEffect(() => {
    voiceService.registerCallbacks(
      (state) => {
        setVoiceState(state);
        if (state === 'completed') {
          handleActionTrigger(transcript || "Show today's patients");
        }
      },
      (text, isFinal) => {
        setTranscript(text);
        if (isFinal) {
          handleActionTrigger(text);
        }
      }
    );

    return () => {
      voiceService.stopListening();
    };
  }, [transcript]);

  if (!isGlobalVoiceModalOpen) return null;

  const handleStartListening = (presetText?: string) => {
    setAiResponseText('');
    setTranscript('');
    voiceService.startListening(presetText);
  };

  const handleStopListening = () => {
    voiceService.stopListening();
    if (transcript.trim()) {
      handleActionTrigger(transcript);
    }
  };

  const handleActionTrigger = (command: string) => {
    if (!command.trim()) return;
    setVoiceState('processing');
    setTimeout(() => {
      setVoiceState('responding');
      let reply = `Executing action: "${command}". Routing to the appropriate clinical workflow.`;
      if (command.toLowerCase().includes("today's patient")) {
        reply = "Loading today's patient queue. Aarav Sharma is waiting in Operatory 1.";
      } else if (command.toLowerCase().includes("follow-up")) {
        reply = "Opening follow-up management. Aarav Sharma has an open follow-up check-in.";
      } else if (command.toLowerCase().includes("clinical note")) {
        reply = "Preparing draft clinical note for Aarav Sharma based on recent diagnosis.";
      } else if (command.toLowerCase().includes("explain")) {
        reply = "Opening patient-friendly clinical translation tool with multi-language preview.";
      }

      setAiResponseText(reply);
      voiceService.speakText(reply);

      setTimeout(() => {
        setVoiceState('completed');
        setTimeout(() => {
          executeVoiceAction(command);
          closeVoiceModal();
        }, 1100);
      }, 1000);
    }, 600);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    setTranscript(inputQuery);
    handleActionTrigger(inputQuery);
    setInputQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-elevated border border-slate-200 overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-sm shadow-teal-600/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">AuraVoice AI Assistant</h2>
              <p className="text-xs text-slate-500">Autonomous Clinic Workflow Orchestrator</p>
            </div>
          </div>
          <button
            onClick={closeVoiceModal}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Central Voice Arena */}
        <div className="p-6 sm:p-8 flex flex-col items-center text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-1">
            How can I help you, Doctor?
          </h3>
          <p className="text-sm text-slate-500 max-w-sm mb-6">
            Speak naturally to orchestrate appointments, notes, reports, and follow-ups.
          </p>

          {/* Large Mic Button */}
          <div className="relative my-2">
            {voiceState === 'listening' && (
              <div className="absolute -inset-3 rounded-full bg-teal-500/20 animate-ping" />
            )}
            <button
              onClick={() => {
                if (voiceState === 'listening') {
                  handleStopListening();
                } else {
                  handleStartListening();
                }
              }}
              className={`relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-xl ${
                voiceState === 'listening'
                  ? 'bg-rose-500 text-white shadow-rose-500/40 ring-4 ring-rose-200'
                  : voiceState === 'processing'
                  ? 'bg-amber-500 text-white shadow-amber-500/40 ring-4 ring-amber-200'
                  : voiceState === 'responding'
                  ? 'bg-sky-500 text-white shadow-sky-500/40 ring-4 ring-sky-200'
                  : voiceState === 'completed'
                  ? 'bg-emerald-600 text-white shadow-emerald-600/40'
                  : 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/30 hover:scale-105 active:scale-95'
              }`}
            >
              {voiceState === 'listening' ? (
                <MicOff className="w-8 h-8" />
              ) : voiceState === 'completed' ? (
                <CheckCircle2 className="w-8 h-8" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
              <span className="text-[10px] font-semibold tracking-wider uppercase mt-1">
                {voiceState === 'idle' ? 'Tap to Speak' : voiceState}
              </span>
            </button>
          </div>

          {/* Animated Waveform */}
          <div className="h-10 mt-4 flex items-center justify-center">
            {voiceState === 'listening' ? (
              <div className="flex flex-col items-center">
                <span className="text-xs font-semibold text-rose-600 mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  Listening...
                </span>
                <WaveformVisualizer state="listening" barCount={16} />
              </div>
            ) : voiceState === 'processing' ? (
              <span className="text-xs font-semibold text-amber-600 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-spin" />
                Processing intent...
              </span>
            ) : voiceState === 'responding' ? (
              <div className="flex flex-col items-center">
                <span className="text-xs font-semibold text-sky-600 mb-1 flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5" />
                  Orchestrating system...
                </span>
                <WaveformVisualizer state="responding" barCount={16} />
              </div>
            ) : voiceState === 'completed' ? (
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Action completed
              </span>
            ) : (
              <span className="text-xs text-slate-400">Ready for your command</span>
            )}
          </div>

          {/* Transcript / Spoken Feedback */}
          {transcript && (
            <div className="w-full mt-4 p-3 bg-teal-50/70 border border-teal-200/70 rounded-xl text-left">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-teal-700 block mb-0.5">
                You Spoke:
              </span>
              <p className="text-sm font-medium text-slate-800 italic">"{transcript}"</p>
            </div>
          )}

          {/* AI Response Output */}
          {aiResponseText && (
            <div className="w-full mt-2 p-3 bg-slate-900 text-white rounded-xl text-left shadow-sm">
              <div className="flex items-center gap-1.5 text-xs text-teal-300 font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                Aura AI Response:
              </div>
              <p className="text-sm leading-relaxed text-slate-200">{aiResponseText}</p>
            </div>
          )}

          {/* Actionable Prompt Suggestions */}
          <div className="w-full mt-6 text-left">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
              Suggested Clinic Workflows
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickActions.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      handleStartListening(action.query);
                    }}
                    className="flex items-center justify-between p-2.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-teal-50 hover:text-teal-800 rounded-xl border border-slate-200/80 transition-all text-left group"
                  >
                    <span className="flex items-center gap-2 truncate">
                      <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 shrink-0" />
                      <span className="truncate">"{action.label}"</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Text Input Fallback at bottom */}
        <form onSubmit={handleTextSubmit} className="p-4 bg-slate-50 border-t border-slate-200/80 flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Type a clinic instruction (e.g., 'Book follow-up for Aarav')..."
            className="flex-1 px-4 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 placeholder-slate-400"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-semibold rounded-xl transition-all"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

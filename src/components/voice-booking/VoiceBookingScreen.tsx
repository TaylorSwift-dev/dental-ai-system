import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { voiceService } from '../../services/voiceService';
import { VoiceState } from '../../types';
import { WaveformVisualizer } from '../common/WaveformVisualizer';
import { 
  Mic, 
  MicOff, 
  Sparkles, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Navigation, 
  MapPin, 
  User, 
  ArrowRight,
  RefreshCw,
  PhoneCall
} from 'lucide-react';

export const VoiceBookingScreen: React.FC = () => {
  const { addAppointment, showToast, setCurrentNav } = useApp();
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [transcript, setTranscript] = useState<string>('');
  const [step, setStep] = useState<'idle' | 'listening' | 'understood' | 'confirmed'>('idle');

  // AI understood entities
  const [extractedData, setExtractedData] = useState({
    reason: 'Severe tooth pain in lower right jaw',
    preferredDate: 'Tomorrow (Sunday, Sep 13)',
    preferredTime: 'Evening (5:00 PM – 7:00 PM)',
    urgency: 'High (Same / Next Day)'
  });

  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Priya Mehta');
  const [selectedSlot, setSelectedSlot] = useState('5:30 PM');

  useEffect(() => {
    voiceService.registerCallbacks(
      (state) => {
        setVoiceState(state);
      },
      (text, isFinal) => {
        setTranscript(text);
        if (isFinal) {
          handleVoiceUnderstood(text);
        }
      }
    );

    return () => {
      voiceService.stopListening();
    };
  }, []);

  const handleStartBookingVoice = (customPhrase?: string) => {
    setTranscript('');
    setStep('listening');
    const phrase = customPhrase || "I need a dentist tomorrow evening for severe tooth pain.";
    voiceService.startListening(phrase);
    showToast("Listening... speak your appointment request naturally.", 'info');
  };

  const handleVoiceUnderstood = (spokenText: string) => {
    setVoiceState('processing');
    setTimeout(() => {
      setVoiceState('completed');
      setStep('understood');
      showToast("AI understood your request. Select your preferred slot below.", 'success');
      voiceService.speakText("I understood you need an appointment for tooth pain tomorrow evening. Here are available doctors and slots.");
    }, 800);
  };

  const handleConfirmAppointment = () => {
    addAppointment({
      doctorName: selectedDoctor,
      doctorSpecialty: selectedDoctor === 'Dr. Priya Mehta' ? 'General & Endodontics' : 'Oral & Maxillofacial Surgery',
      date: '2026-09-13',
      time: selectedSlot,
      reason: extractedData.reason,
      status: 'scheduled',
      trafficInfo: {
        distance: '14.2 km',
        duration: '38 min',
        status: 'Moderate',
        recommendedDeparture: '4:10 PM'
      }
    });
    setStep('confirmed');
    voiceService.speakText(`Your appointment with ${selectedDoctor} for tomorrow at ${selectedSlot} is confirmed.`);
  };

  const resetBooking = () => {
    setStep('idle');
    setTranscript('');
    setVoiceState('idle');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-teal-50 text-teal-700 border border-teal-200 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          Voice-First Intelligent Booking
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Tell us what you need.
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-lg mx-auto">
          No complicated forms. Just speak naturally like you're talking to our receptionist.
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 sm:p-10">
        {step !== 'confirmed' && (
          <div className="flex flex-col items-center text-center">
            {/* Microphone Button */}
            <div className="relative my-4">
              {voiceState === 'listening' && (
                <div className="absolute -inset-4 rounded-full bg-teal-500/20 animate-ping" />
              )}
              <button
                onClick={() => {
                  if (voiceState === 'listening') {
                    voiceService.stopListening();
                    handleVoiceUnderstood(transcript || "I need a dentist tomorrow evening for tooth pain.");
                  } else {
                    handleStartBookingVoice();
                  }
                }}
                className={`w-28 h-28 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-xl ${
                  voiceState === 'listening'
                    ? 'bg-rose-500 text-white ring-8 ring-rose-100 shadow-rose-500/40'
                    : 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/30 hover:scale-105 active:scale-95'
                }`}
              >
                {voiceState === 'listening' ? (
                  <MicOff className="w-10 h-10" />
                ) : (
                  <Mic className="w-10 h-10" />
                )}
                <span className="text-[10px] font-bold tracking-wider uppercase mt-1">
                  {voiceState === 'listening' ? 'Listening...' : 'Tap to Speak'}
                </span>
              </button>
            </div>

            {/* Waveform visualizer */}
            <div className="h-10 my-2 flex items-center justify-center">
              {voiceState === 'listening' ? (
                <div className="flex flex-col items-center">
                  <span className="text-xs font-semibold text-rose-600 mb-1">
                    Listening to your voice...
                  </span>
                  <WaveformVisualizer state="listening" barCount={16} />
                </div>
              ) : (
                <span className="text-xs text-slate-400">
                  Example: "I need a dentist tomorrow evening for tooth pain."
                </span>
              )}
            </div>

            {/* Live Transcript */}
            {transcript && (
              <div className="w-full max-w-md p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-left my-3">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                  Patient Spoke:
                </span>
                <p className="text-sm font-semibold text-slate-800 italic">"{transcript}"</p>
              </div>
            )}

            {/* Quick Prompt Presets */}
            {step === 'idle' && (
              <div className="w-full mt-6 text-left">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Or click one of these common requests:
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => handleStartBookingVoice("I need a dentist tomorrow evening for tooth pain.")}
                    className="w-full p-3 rounded-xl bg-slate-50 hover:bg-teal-50 hover:text-teal-900 border border-slate-200 text-xs font-semibold text-slate-700 text-left flex items-center justify-between transition-colors"
                  >
                    <span>"I need a dentist tomorrow evening for tooth pain."</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>
                  <button
                    onClick={() => handleStartBookingVoice("Book a routine teeth cleaning for next Saturday morning.")}
                    className="w-full p-3 rounded-xl bg-slate-50 hover:bg-teal-50 hover:text-teal-900 border border-slate-200 text-xs font-semibold text-slate-700 text-left flex items-center justify-between transition-colors"
                  >
                    <span>"Book a routine teeth cleaning for next Saturday morning."</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: AI UNDERSTOOD & SLOT SELECTION */}
        {step === 'understood' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
            {/* AI Understood Card */}
            <div className="p-5 bg-teal-50/80 rounded-2xl border border-teal-200 shadow-soft">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm font-extrabold text-teal-900">
                  AI Understood
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-teal-100">
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">Reason</span>
                  <span className="text-slate-800 font-bold text-sm">{extractedData.reason}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-teal-100">
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">Preferred Date</span>
                  <span className="text-slate-800 font-bold text-sm">{extractedData.preferredDate}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-teal-100">
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">Preferred Time</span>
                  <span className="text-slate-800 font-bold text-sm">{extractedData.preferredTime}</span>
                </div>
              </div>
            </div>

            {/* Doctor & Slot Selection */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">
                Available Doctors & Slots for Tomorrow
              </h3>

              <div className="space-y-4">
                {/* Doctor 1: Dr. Priya Mehta */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  selectedDoctor === 'Dr. Priya Mehta'
                    ? 'border-teal-400 bg-teal-50/30 ring-2 ring-teal-200'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150"
                        alt="Dr. Priya Mehta"
                        className="w-11 h-11 rounded-full object-cover border border-teal-200"
                      />
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900">Dr. Priya Mehta</h4>
                        <p className="text-xs text-slate-500">General Dentistry & Endodontics</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      ★ 4.9 (320+ reviews)
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {['5:00 PM', '5:30 PM', '6:00 PM'].map((slot) => (
                      <button
                        key={slot}
                        onClick={() => {
                          setSelectedDoctor('Dr. Priya Mehta');
                          setSelectedSlot(slot);
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          selectedDoctor === 'Dr. Priya Mehta' && selectedSlot === slot
                            ? 'bg-teal-600 text-white shadow-sm'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Doctor 2: Dr. Rajesh Rao */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  selectedDoctor === 'Dr. Rajesh Rao'
                    ? 'border-teal-400 bg-teal-50/30 ring-2 ring-teal-200'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150"
                        alt="Dr. Rajesh Rao"
                        className="w-11 h-11 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900">Dr. Rajesh Rao</h4>
                        <p className="text-xs text-slate-500">Oral Surgery & Implantology</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      ★ 4.8 (210+ reviews)
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {['6:30 PM', '7:00 PM'].map((slot) => (
                      <button
                        key={slot}
                        onClick={() => {
                          setSelectedDoctor('Dr. Rajesh Rao');
                          setSelectedSlot(slot);
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          selectedDoctor === 'Dr. Rajesh Rao' && selectedSlot === slot
                            ? 'bg-teal-600 text-white shadow-sm'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={resetBooking}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Start over
              </button>

              <button
                onClick={handleConfirmAppointment}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white text-sm font-extrabold rounded-xl shadow-md shadow-teal-600/30 transition-all flex items-center gap-2"
              >
                <span>Confirm Booking for {selectedSlot}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: APPOINTMENT CONFIRMED */}
        {step === 'confirmed' && (
          <div className="text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Booking Confirmed
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                You're all set!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                SMS and WhatsApp confirmation sent with digital clinic pass.
              </p>
            </div>

            {/* Confirmed Details Card */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-3 max-w-md mx-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs text-slate-500 font-medium">Doctor:</span>
                <span className="text-sm font-bold text-slate-900">{selectedDoctor}</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs text-slate-500 font-medium">Date & Time:</span>
                <span className="text-sm font-bold text-teal-700">Tomorrow (Sep 13) at {selectedSlot}</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs text-slate-500 font-medium">Clinic:</span>
                <span className="text-xs font-semibold text-slate-800 text-right">SmileCare Dental Clinic & Implant Center</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Reason:</span>
                <span className="text-xs font-semibold text-slate-800">{extractedData.reason}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  showToast("Appointment added to your Google/Apple Calendar", 'success');
                }}
                className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-soft transition-all"
              >
                <Calendar className="w-4 h-4 text-teal-600" />
                Add to Calendar
              </button>

              <button
                onClick={() => window.open('https://maps.google.com', '_blank')}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm shadow-teal-600/30 transition-all"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </button>
            </div>

            <div className="pt-4">
              <button
                onClick={resetBooking}
                className="text-xs text-teal-700 hover:underline font-bold"
              >
                Book another appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Settings, 
  Mic, 
  Volume2, 
  ShieldCheck, 
  Bell, 
  Building, 
  Database, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const { showToast } = useApp();
  const [speechFeedback, setSpeechFeedback] = useState<boolean>(true);
  const [autoDraftApprove, setAutoDraftApprove] = useState<boolean>(false);
  const [smsReminders, setSmsReminders] = useState<boolean>(true);
  const [trafficAlerts, setTrafficAlerts] = useState<boolean>(true);

  const handleSave = () => {
    showToast("Settings & AI voice thresholds successfully updated", 'success');
  };

  return (
    <div className="max-w-4xl space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
            System & Clinic Preferences
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Settings & AI Safeguards
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Configure clinical voice recognition, strict medical draft modes, and clinic profile.
        </p>
      </div>

      {/* Voice & Clinical AI Controls */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-soft space-y-6">
        <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <Mic className="w-5 h-5 text-teal-600" />
          Voice AI & Medical Safeguards
        </h2>

        <div className="space-y-4 divide-y divide-slate-100">
          <div className="flex items-center justify-between pt-3">
            <div>
              <h4 className="text-sm font-bold text-slate-800">Doctor Approval Required on AI Drafts</h4>
              <p className="text-xs text-slate-500">Always enforce DRAFT state until doctor clicks Approve.</p>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
              Enforced (HIPAA/NABH)
            </span>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div>
              <h4 className="text-sm font-bold text-slate-800">Voice Synthesis (Read Aloud Responses)</h4>
              <p className="text-xs text-slate-500">Provide audio confirmation when AI executes clinic actions.</p>
            </div>
            <input
              type="checkbox"
              checked={speechFeedback}
              onChange={(e) => setSpeechFeedback(e.target.checked)}
              className="w-5 h-5 text-teal-600 accent-teal-600 rounded"
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div>
              <h4 className="text-sm font-bold text-slate-800">Smart Traffic Leave-Now Notifications</h4>
              <p className="text-xs text-slate-500">Automatically calculate Google Traffic buffers for appointments.</p>
            </div>
            <input
              type="checkbox"
              checked={trafficAlerts}
              onChange={(e) => setTrafficAlerts(e.target.checked)}
              className="w-5 h-5 text-teal-600 accent-teal-600 rounded"
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div>
              <h4 className="text-sm font-bold text-slate-800">Automated Day-After Follow-Up Dispatch</h4>
              <p className="text-xs text-slate-500">Send WhatsApp check-ins "How are you feeling?" next morning.</p>
            </div>
            <input
              type="checkbox"
              checked={smsReminders}
              onChange={(e) => setSmsReminders(e.target.checked)}
              className="w-5 h-5 text-teal-600 accent-teal-600 rounded"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MessageSquare, 
  Send, 
  Check, 
  CheckCheck, 
  Clock, 
  Filter, 
  User, 
  Sparkles,
  Phone,
  Search
} from 'lucide-react';
import { ClinicMessage } from '../../types';

export const MessagesScreen: React.FC = () => {
  const { messages, sendMessage, selectedPatient, showToast } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [newMsgText, setNewMsgText] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Messages' },
    { id: 'appointment', label: 'Confirmations' },
    { id: 'reminder', label: 'Reminders' },
    { id: 'followup', label: 'Follow-ups' },
    { id: 'treatment', label: 'Treatment Info' },
    { id: 'billing', label: 'Billing' },
    { id: 'patient_message', label: 'Patient Inquiries' },
  ];

  const filtered = messages.filter(m => {
    if (activeCategory === 'all') return true;
    return m.category === activeCategory;
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsgText.trim()) return;
    sendMessage(selectedPatient.id, newMsgText, 'patient_message');
    setNewMsgText('');
  };

  const getStatusIcon = (status: ClinicMessage['status']) => {
    switch (status) {
      case 'Sent':
        return <Check className="w-3.5 h-3.5 text-slate-400" />;
      case 'Delivered':
        return <CheckCheck className="w-3.5 h-3.5 text-slate-400" />;
      case 'Read':
        return <CheckCheck className="w-3.5 h-3.5 text-teal-600" />;
      case 'Responded':
        return <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-1.5 py-0.5 rounded">Responded</span>;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
              Omnichannel Messaging
            </span>
            <span className="text-xs text-slate-400">WhatsApp & SMS Gateway</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Communications Center
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Automated appointment notices, leave-now traffic alerts, and doctor check-ins.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-white text-teal-700 shadow-soft border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Feed */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filtered.map((msg) => (
            <div key={msg.id} className="p-5 hover:bg-slate-50/70 transition-colors space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-slate-900">{msg.patientName}</span>
                  <span className="text-xs text-slate-400 font-mono">{msg.patientPhone}</span>
                  <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {msg.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>{msg.timestamp}</span>
                  <span className="flex items-center gap-1" title={msg.status}>
                    {getStatusIcon(msg.status)}
                    <span className="hidden sm:inline font-medium text-slate-600">{msg.status}</span>
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/70 text-xs text-slate-800 leading-relaxed">
                <span className="font-bold text-teal-800 mr-1.5">[{msg.sender}]:</span>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Quick reply bar */}
        <form onSubmit={handleSend} className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-3">
          <input
            type="text"
            value={newMsgText}
            onChange={(e) => setNewMsgText(e.target.value)}
            placeholder={`Message ${selectedPatient.name} via WhatsApp/SMS...`}
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm shadow-teal-600/30 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

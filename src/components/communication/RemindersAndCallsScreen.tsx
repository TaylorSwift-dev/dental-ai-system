import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  PhoneCall, 
  Send, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Calendar, 
  Phone, 
  MessageSquare,
  Sparkles,
  Plus
} from 'lucide-react';

export const RemindersAndCallsScreen: React.FC = () => {
  const { 
    upcomingCalls,
    updateUpcomingCallStatus,
    callLogs, 
    appointments, 
    startCall, 
    sendPatientReminder, 
    showToast 
  } = useApp();

  const tomorrowDate = '2026-09-14';
  const tomorrowAppointments = appointments.filter(a => a.date === tomorrowDate);

  const [activeSubTab, setActiveSubTab] = useState<'upcoming' | 'logs' | 'reminders'>('upcoming');
  const [callFilter, setCallFilter] = useState<string>('all');

  return (
    <div className="space-y-6 pb-12">
      {/* Header (Section 12) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-sky-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
              Section 12 • Patient Calling & Communications
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Phone Center & Automated Reminders
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Reception telephony call logs, follow-up outcomes, notes, and tomorrow's WhatsApp/SMS reminder dispatches.
          </p>
        </div>

        <button
          onClick={() => startCall({
            name: 'Quick Dial',
            phone: '+91 98201 44521',
            treatment: 'Front Desk Inquiry'
          })}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-sky-600/25 transition-all shrink-0"
        >
          <Phone className="w-4 h-4" />
          <span>Open Phone Dialer</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center bg-white p-1 rounded-2xl border border-sky-100 shadow-xs self-start w-fit">
        <button
          onClick={() => setActiveSubTab('upcoming')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeSubTab === 'upcoming' ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <PhoneCall className="w-4 h-4" />
          <span>Upcoming Patient Calls ({upcomingCalls.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('logs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeSubTab === 'logs' ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Call Logs ({callLogs.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('reminders')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeSubTab === 'reminders' ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>Tomorrow's Reminders ({tomorrowAppointments.length})</span>
        </button>
      </div>

      {/* Content Area */}
      {activeSubTab === 'upcoming' ? (
        /* Upcoming Calls Roster */
        <div className="bg-white rounded-3xl border border-sky-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-sky-50/50 to-white">
            <div>
              <h2 className="text-sm sm:text-base font-black text-slate-900">Patient Follow-up & Confirmation Call Roster</h2>
              <p className="text-xs text-slate-400">Receptionist daily queue for pre-op calls, recalls, and treatment follow-ups</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Filter:</span>
              <select
                value={callFilter}
                onChange={e => setCallFilter(e.target.value)}
                className="px-3 py-1.5 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500"
              >
                <option value="all">All Calls</option>
                <option value="Not Called">Not Called</option>
                <option value="Call Back">Call Back</option>
                <option value="No Answer">No Answer</option>
                <option value="Confirmed">Confirmed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-black text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Patient & Reason</th>
                  <th className="py-3.5 px-4">Contact Phone</th>
                  <th className="py-3.5 px-4">Scheduled Slot</th>
                  <th className="py-3.5 px-4">Call Status</th>
                  <th className="py-3.5 px-6">Front Desk Notes</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {upcomingCalls
                  .filter(c => callFilter === 'all' || c.status === callFilter)
                  .map(call => (
                    <tr key={call.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-6">
                        <span className="font-extrabold text-slate-900 block text-sm">{call.patientName}</span>
                        <span className="text-[11px] text-sky-700 font-semibold">{call.reason}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <a 
                          href={`tel:${call.phone}`} 
                          className="font-mono font-bold text-sky-600 hover:underline flex items-center gap-1.5"
                          title="Click to dial natively"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{call.phone}</span>
                        </a>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-800 block">{call.scheduledTime}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                          call.priority === 'high' ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {call.priority} priority
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={call.status}
                          onChange={e => updateUpcomingCallStatus(call.id, e.target.value as any)}
                          className={`text-xs font-bold px-2.5 py-1 rounded-xl border focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                            call.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                            call.status === 'Called' ? 'bg-sky-50 text-sky-800 border-sky-200' :
                            call.status === 'No Answer' ? 'bg-rose-50 text-rose-800 border-rose-200' :
                            call.status === 'Call Back' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                            'bg-slate-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          <option value="Not Called">Not Called</option>
                          <option value="Called">Called</option>
                          <option value="No Answer">No Answer</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Call Back">Call Back</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-6">
                        <input
                          type="text"
                          defaultValue={call.notes}
                          onBlur={e => updateUpcomingCallStatus(call.id, (call.status || call.callStatus), e.target.value)}
                          placeholder="Add brief note..."
                          className="w-full max-w-xs px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-sky-400"
                        />
                      </td>

                      <td className="py-3.5 px-6 text-right">
                        <button
                          onClick={() => startCall({
                            name: call.patientName,
                            phone: call.phone,
                            treatment: call.reason,
                            patientId: call.patientId
                          })}
                          className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all inline-flex items-center gap-1.5"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>Call</span>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeSubTab === 'logs' ? (
        /* Call Logs Table (Section 12: See phone #, call patient, mark completed, no answer, notes) */
        <div className="bg-white rounded-3xl border border-sky-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-sky-50/40">
            <div>
              <h2 className="text-sm font-black text-slate-900">Recent Telephony History</h2>
              <p className="text-xs text-slate-400">All outbound reception calls logged with outcome & notes</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-black text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Patient</th>
                  <th className="py-3.5 px-4">Phone Number</th>
                  <th className="py-3.5 px-4">Time & Duration</th>
                  <th className="py-3.5 px-4">Call Outcome</th>
                  <th className="py-3.5 px-6">Front Desk Notes</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {callLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-6">
                      <span className="font-extrabold text-slate-900 block">{log.patientName}</span>
                      {log.appointmentContext && (
                        <span className="text-[10px] text-slate-400">{log.appointmentContext}</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-mono font-medium text-slate-600">
                      {log.phone}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-800 block">{log.timestamp}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Dur: {log.duration}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        log.outcome === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                        log.outcome === 'No Answer' ? 'bg-amber-100 text-amber-800' :
                        log.outcome === 'Busy' ? 'bg-rose-100 text-rose-800' :
                        log.outcome === 'Reschedule Requested' ? 'bg-purple-100 text-purple-800' :
                        'bg-sky-100 text-sky-800'
                      }`}>
                        {log.outcome}
                      </span>
                    </td>

                    <td className="py-3.5 px-6 text-slate-600 max-w-xs truncate">
                      {log.notes}
                    </td>

                    <td className="py-3.5 px-6 text-right">
                      <button
                        onClick={() => startCall({
                          name: log.patientName,
                          phone: log.phone,
                          treatment: log.appointmentContext,
                          patientId: log.patientId
                        })}
                        className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs rounded-xl transition-colors"
                      >
                        Call Back
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Tomorrow's Reminders Queue (Section 4 & 16) */
        <div className="bg-white rounded-3xl border border-sky-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-50/50 to-white">
            <div>
              <h2 className="text-sm font-black text-slate-900">Tomorrow's Confirmation Roster</h2>
              <p className="text-xs text-slate-400">Dispatch WhatsApp / SMS confirmation notices to prevent no-shows</p>
            </div>

            <button
              onClick={() => {
                tomorrowAppointments.forEach(a => sendPatientReminder(a.id, 'whatsapp'));
                showToast("Automated batch reminders dispatched for tomorrow's visits!", 'success');
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
            >
              Send All Reminders
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {tomorrowAppointments.map(apt => (
              <div key={apt.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-black text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100">
                    {apt.time}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-slate-900">{apt.patientName}</h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        apt.confirmationStatus === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                        apt.confirmationStatus === 'reminder-sent' ? 'bg-purple-100 text-purple-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {apt.confirmationStatus === 'confirmed' ? 'Confirmed' :
                         apt.confirmationStatus === 'reminder-sent' ? 'Reminder Sent' : 'Pending Confirmation'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 font-mono">
                      {apt.patientPhone || '+91 98450 77665'} • {apt.reason} • Dr. {apt.doctorName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => sendPatientReminder(apt.id, 'sms')}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                  >
                    SMS
                  </button>

                  <button
                    onClick={() => sendPatientReminder(apt.id, 'whatsapp')}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-200 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={() => startCall({
                      name: apt.patientName,
                      phone: apt.patientPhone || '+91 98450 77665',
                      avatar: apt.patientAvatar,
                      treatment: `Confirmation for tomorrow at ${apt.time}`
                    })}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Patient</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

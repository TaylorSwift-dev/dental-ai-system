import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  UserCheck, 
  CalendarCheck, 
  AlertCircle, 
  CreditCard, 
  PhoneCall, 
  CheckCircle2, 
  Plus, 
  Search,
  Clock,
  Send
} from 'lucide-react';

export const ReceptionistDashboard: React.FC = () => {
  const { 
    appointments, 
    updateAppointmentStatus, 
    invoices, 
    followUps, 
    sendFollowUpCheckIn,
    setCurrentNav,
    showToast 
  } = useApp();

  const waitingList = appointments.filter(a => a.status === 'waiting');
  const scheduledToday = appointments.filter(a => a.status === 'scheduled');
  const pendingPayments = invoices.filter(inv => inv.pending > 0);
  const urgentFollowUps = followUps.filter(f => f.status === 'Call required');

  const handleMarkArrived = (id: string, name: string) => {
    updateAppointmentStatus(id, 'waiting');
    showToast(`${name} marked as Arrived in Reception. Doctor notified.`, 'success');
  };

  const handleCollectPayment = (invNumber: string, name: string) => {
    showToast(`Payment collection receipt generated for ${name} (${invNumber})`, 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Front Desk Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
              Front Desk Station
            </span>
            <span className="text-xs text-slate-400">Receptionist: Elena Vance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            SmileCare Front Desk
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Real-time patient check-ins, payments pending, and queue coordination.
          </p>
        </div>

        <button
          onClick={() => setCurrentNav('assistant')}
          className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm shadow-teal-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Walk-in / New Booking</span>
        </button>
      </div>

      {/* Reception Metric Strips */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-soft">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">In Waiting Area</span>
          <div className="text-3xl font-black text-amber-600 mt-1">{waitingList.length}</div>
          <span className="text-xs text-slate-500 font-medium">Ready for Operatory</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-soft">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Expected Today</span>
          <div className="text-3xl font-black text-slate-900 mt-1">{scheduledToday.length}</div>
          <span className="text-xs text-slate-500 font-medium">Upcoming bookings</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-soft">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Payments Due</span>
          <div className="text-3xl font-black text-rose-600 mt-1">{pendingPayments.length}</div>
          <span className="text-xs text-slate-500 font-medium">Invoices unpaid</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-soft">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Calls Needed</span>
          <div className="text-3xl font-black text-sky-600 mt-1">{urgentFollowUps.length}</div>
          <span className="text-xs text-slate-500 font-medium">Follow-up check</span>
        </div>
      </div>

      {/* Main Reception Queues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Waiting Room Queue */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-amber-600" />
              Waiting Room Live Queue
            </h2>
            <span className="text-xs text-slate-400">{waitingList.length} waiting</span>
          </div>

          <div className="divide-y divide-slate-100">
            {waitingList.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No patients currently in the lobby.
              </div>
            ) : (
              waitingList.map((apt) => (
                <div key={apt.id} className="p-4 hover:bg-slate-50 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={apt.patientAvatar}
                      alt={apt.patientName}
                      className="w-10 h-10 rounded-full object-cover border border-amber-200"
                    />
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">{apt.patientName}</h4>
                      <p className="text-xs text-slate-500">
                        {apt.time} • {apt.reason} • <strong className="text-teal-700">{apt.doctorName}</strong>
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-lg animate-pulse">
                    Waiting
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pending Check-Ins (Expected Today) */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-teal-600" />
              Incoming Patient Check-Ins
            </h2>
            <span className="text-xs text-slate-400">Click to Admit</span>
          </div>

          <div className="divide-y divide-slate-100">
            {scheduledToday.map((apt) => (
              <div key={apt.id} className="p-4 hover:bg-slate-50 flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {apt.time}
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-900">{apt.patientName}</h4>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{apt.reason}</p>
                </div>

                <button
                  onClick={() => handleMarkArrived(apt.id, apt.patientName)}
                  className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                >
                  Mark Arrived
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desk Billing & Payments Pending */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-slate-700" />
            Desk Payment Counter & Pending Receipts
          </h2>
          <span className="text-xs text-slate-400">Instant UPI / Card Collection</span>
        </div>

        <div className="divide-y divide-slate-100">
          {pendingPayments.map((inv) => (
            <div key={inv.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-extrabold text-slate-900">{inv.patientName}</h4>
                  <span className="text-xs font-mono text-slate-400">{inv.invoiceNumber}</span>
                </div>
                <p className="text-xs text-slate-500">{inv.treatment}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Balance Due</span>
                  <span className="text-sm font-black text-rose-600">₹{inv.pending.toLocaleString()}</span>
                </div>

                <button
                  onClick={() => handleCollectPayment(inv.invoiceNumber, inv.patientName)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  Collect Payment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

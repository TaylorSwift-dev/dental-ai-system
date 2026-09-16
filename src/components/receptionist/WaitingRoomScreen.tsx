import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  UserCheck, 
  Clock, 
  PhoneCall, 
  Bell, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Plus,
  Stethoscope,
  Building2,
  Eye,
  Send,
  CalendarPlus,
  XCircle
} from 'lucide-react';
import { ActionMenu } from '../common/ActionMenu';

export const WaitingRoomScreen: React.FC = () => {
  const { 
    appointments, 
    checkInPatient, 
    notifyDoctor, 
    updateAppointmentStatus, 
    cancelAppointment,
    rescheduleAppointment,
    sendPatientReminder,
    openRescheduleModal,
    setSelectedPatientId,
    setCurrentNav,
    startCall, 
    openScheduleModal,
    doctors 
  } = useApp();

  const todayDate = '2026-09-13';
  const waitingList = appointments.filter(a => a.date === todayDate && a.status === 'waiting');
  const upcomingToday = appointments.filter(a => a.date === todayDate && a.status === 'scheduled');
  const inConsultation = appointments.filter(a => a.date === todayDate && a.status === 'in-consultation');

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-sky-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
              Live Lobby Monitor
            </span>
            <span className="text-xs text-slate-400">Section 15 • Real-time Lobby Triage</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Clinic Waiting Room
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Monitor seated patients, track lobby wait durations, notify operatory doctors, and dispatch patients.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-xs text-slate-400 block font-bold">Currently Waiting</span>
            <span className="text-xl font-black text-amber-600">{waitingList.length} Patients</span>
          </div>
          <button
            onClick={() => openScheduleModal()}
            className="flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-sky-600/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Walk-In Intake</span>
          </button>
        </div>
      </div>

      {/* Operatory Station Status Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-amber-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider">Lobby Waiting</span>
            <UserCheck className="w-4 h-4 text-amber-600 animate-pulse" />
          </div>
          <div className="text-3xl font-black text-amber-600 mt-1">{waitingList.length}</div>
          <span className="text-xs text-slate-500">Average wait time: 11 mins</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-teal-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-teal-800 uppercase tracking-wider">In Operatory Chair</span>
            <Stethoscope className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-3xl font-black text-teal-700 mt-1">{inConsultation.length}</div>
          <span className="text-xs text-slate-500">Under active clinical care</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-sky-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-sky-800 uppercase tracking-wider">Expected Today</span>
            <Clock className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-3xl font-black text-sky-600 mt-1">{upcomingToday.length}</div>
          <span className="text-xs text-slate-500">Upcoming arrivals scheduled</span>
        </div>
      </div>

      {/* Main Section: Currently Waiting Patients */}
      <div className="bg-white rounded-3xl border border-sky-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-amber-50/50 to-white">
          <div>
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-amber-600" />
              Patients Seated in Waiting Room ({waitingList.length})
            </h2>
            <p className="text-xs text-slate-400">Click 'Notify Doctor' to page the operatory room</p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {waitingList.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs sm:text-sm">
              No patients currently in the lobby. See incoming queue below to check in arriving patients.
            </div>
          ) : (
            waitingList.map((apt, idx) => (
              <div key={apt.id} className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-amber-50/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-black text-xs flex items-center justify-center shrink-0">
                    #{idx + 1}
                  </div>

                  <img
                    src={apt.patientAvatar}
                    alt={apt.patientName}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-amber-300 shrink-0 shadow-xs"
                  />

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-black text-slate-900">{apt.patientName}</h3>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-900 animate-pulse border border-amber-200">
                        Waiting — {apt.waitingMinutes || 12} minutes
                      </span>
                      <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        Check-in: {apt.waitingSince || apt.time}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600">
                      Procedure: <strong className="text-sky-900">{apt.reason}</strong> • Assigned: <span className="font-bold text-slate-800">{apt.doctorName}</span> ({apt.room || 'Operatory 1'})
                    </p>

                    <p className="text-xs text-slate-400">
                      Phone: <span className="font-mono">{apt.patientPhone || '+91 98201 44521'}</span>
                    </p>
                  </div>
                </div>

                {/* Receptionist Dispatch Actions (Section 15): Single Primary + ActionMenu */}
                <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
                  <button
                    onClick={() => notifyDoctor(apt.id, apt.doctorName, apt.patientName)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                    title="Alert doctor in operatory via intercom"
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>Notify Doctor</span>
                  </button>

                  <ActionMenu
                    items={[
                      {
                        label: 'Admit to Operatory',
                        icon: ArrowRight,
                        onClick: () => updateAppointmentStatus(apt.id, 'in-consultation')
                      },
                      {
                        label: 'Call Patient',
                        icon: PhoneCall,
                        onClick: () => startCall({
                          name: apt.patientName,
                          phone: apt.patientPhone || '+91 98201 44521',
                          avatar: apt.patientAvatar,
                          treatment: apt.reason,
                          patientId: apt.patientId
                        })
                      },
                      {
                        label: 'Send WhatsApp Reminder',
                        icon: Send,
                        onClick: () => sendPatientReminder(apt.id, 'whatsapp')
                      },
                      {
                        label: 'View Patient Record',
                        icon: Eye,
                        onClick: () => {
                          setSelectedPatientId(apt.patientId);
                          setCurrentNav('patients');
                        }
                      },
                      {
                        label: 'Reschedule',
                        icon: CalendarPlus,
                        onClick: () => openRescheduleModal(apt)
                      },
                      {
                        label: 'Cancel Appointment',
                        icon: XCircle,
                        danger: true,
                        divider: true,
                        onClick: () => cancelAppointment(apt.id, 'Cancelled from lobby')
                      }
                    ]}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Incoming Patient Arrivals Today (Click to Check In) */}
      <div className="bg-white rounded-3xl border border-sky-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-slate-900">
              Expected Today — Pending Check-In ({upcomingToday.length})
            </h2>
            <p className="text-xs text-slate-400">Click 'Check In' as soon as patient reaches the front desk</p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {upcomingToday.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              All today's appointments have arrived or concluded.
            </div>
          ) : (
            upcomingToday.map(apt => (
              <div key={apt.id} className="p-4 sm:p-5 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-black text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100">
                    {apt.time}
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">{apt.patientName}</h4>
                    <p className="text-xs text-slate-500">{apt.reason} • {apt.doctorName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => checkInPatient(apt.id)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Check In</span>
                  </button>

                  <ActionMenu
                    items={[
                      {
                        label: 'Call Patient',
                        icon: PhoneCall,
                        onClick: () => startCall({
                          name: apt.patientName,
                          phone: apt.patientPhone || '+91 98201 44521',
                          avatar: apt.patientAvatar,
                          treatment: apt.reason,
                          patientId: apt.patientId
                        })
                      },
                      {
                        label: 'Send WhatsApp Reminder',
                        icon: Send,
                        onClick: () => sendPatientReminder(apt.id, 'whatsapp')
                      },
                      {
                        label: 'View Patient File',
                        icon: Eye,
                        onClick: () => {
                          setSelectedPatientId(apt.patientId);
                          setCurrentNav('patients');
                        }
                      },
                      {
                        label: 'Reschedule',
                        icon: CalendarPlus,
                        onClick: () => openRescheduleModal(apt)
                      },
                      {
                        label: 'Cancel Appointment',
                        icon: XCircle,
                        danger: true,
                        divider: true,
                        onClick: () => cancelAppointment(apt.id, 'Cancelled before arrival')
                      }
                    ]}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

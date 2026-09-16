import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Patient } from '../../types';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  PhoneCall, 
  CalendarPlus, 
  Receipt, 
  Edit3, 
  Clock, 
  CreditCard, 
  AlertTriangle, 
  ChevronRight, 
  X,
  FileText,
  Calendar,
  Sparkles,
  Eye,
  Send,
  MessageSquare
} from 'lucide-react';
import { ActionMenu } from '../common/ActionMenu';

export const PatientManagementScreen: React.FC = () => {
  const { 
    patients, 
    selectedPatientId, 
    setSelectedPatientId, 
    appointments, 
    invoices, 
    startCall, 
    openScheduleModal, 
    openCreateBillModal, 
    openAddPatientModal,
    assignBDToPatient,
    showToast 
  } = useApp();

  const [search, setSearch] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'pending-bill' | 'recent'>('all');
  const [sortKey, setSortKey] = useState<'name' | 'visits'>('name');
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  // Active patient for profile view
  const activePatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  // Invoices for active patient
  const patientInvoices = invoices.filter(i => i.patientId === activePatient?.id || i.patientName === activePatient?.name);
  const patientAppointments = appointments.filter(a => a.patientId === activePatient?.id || a.patientName === activePatient?.name);
  const patientPendingBill = patientInvoices.reduce((acc, inv) => acc + inv.pending, 0);

  // Filtered and sorted list
  const filteredPatients = patients.filter(p => {
    if (search) {
      const q = search.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchPhone = p.phone.includes(q);
      const matchEmail = p.email.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchEmail) return false;
    }

    if (filterType === 'pending-bill') {
      const hasPending = invoices.some(inv => (inv.patientId === p.id || inv.patientName === p.name) && inv.pending > 0);
      if (!hasPending) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortKey === 'name') return a.name.localeCompare(b.name);
    return b.stats.totalVisits - a.stats.totalVisits;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header (Section 6) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-sky-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
              Section 6 & 7 • Patient Management
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Patient Registry & EHR Profiles
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Search, filter, view complete dental histories, past and upcoming visits, and billing balances.
          </p>
        </div>

        <button
          onClick={() => openAddPatientModal(false)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-sky-600/25 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Patient</span>
        </button>
      </div>

      {/* Filter & Search Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-sky-100 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by patient name, phone number, email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${filterType === 'all' ? 'bg-white text-sky-900 shadow-xs' : 'text-slate-600'}`}
            >
              All ({patients.length})
            </button>
            <button
              onClick={() => setFilterType('pending-bill')}
              className={`px-3 py-1.5 rounded-lg transition-all ${filterType === 'pending-bill' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600'}`}
            >
              Pending Balance
            </button>
          </div>

          <select
            value={sortKey}
            onChange={e => setSortKey(e.target.value as any)}
            className="px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500"
          >
            <option value="name">Sort: Name (A-Z)</option>
            <option value="visits">Sort: Most Visits</option>
          </select>
        </div>
      </div>

      {/* Patient Table (Section 6: Name, Phone, Last Visit, Next Appointment, Treatment, Payment Status) */}
      <div className="bg-white rounded-3xl border border-sky-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-sky-50/50 border-b border-sky-100 text-[11px] font-black text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-6">Patient</th>
                <th className="py-3.5 px-4">Phone</th>
                <th className="py-3.5 px-4">Last Visit</th>
                <th className="py-3.5 px-4">Next Appointment</th>
                <th className="py-3.5 px-4">Assigned BD</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredPatients.map(p => {
                const patApts = appointments.filter(a => a.patientId === p.id || a.patientName === p.name);
                const nextApt = patApts.find(a => a.status === 'scheduled' || a.status === 'confirmed');
                const pInvoices = invoices.filter(i => i.patientId === p.id || i.patientName === p.name);
                const hasPending = pInvoices.some(i => i.pending > 0);
                const pendingAmt = pInvoices.reduce((s, i) => s + i.pending, 0);

                return (
                  <tr 
                    key={p.id}
                    onClick={() => {
                      setSelectedPatientId(p.id);
                      setIsProfileOpen(true);
                    }}
                    className="hover:bg-sky-50/40 cursor-pointer transition-colors group"
                  >
                    {/* Name & Avatar */}
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.avatar}
                          alt={p.name}
                          className="w-10 h-10 rounded-2xl object-cover ring-1 ring-sky-200 shrink-0"
                        />
                        <div>
                          <span className="font-black text-slate-900 text-sm group-hover:text-sky-700 block">
                            {p.name}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Age: {p.age} • {p.gender}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-600">
                      {p.phone}
                    </td>

                    {/* Last Visit */}
                    <td className="py-3.5 px-4 text-slate-600">
                      {p.stats.lastTreatmentDate || 'May 14, 2025'}
                    </td>

                    {/* Next Appointment */}
                    <td className="py-3.5 px-4">
                      {nextApt ? (
                        <span className="font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-lg border border-sky-100">
                          {nextApt.date === '2026-09-13' ? 'Today' : nextApt.date === '2026-09-14' ? 'Tomorrow' : nextApt.date} {nextApt.time}
                        </span>
                      ) : (
                        <span className="text-slate-400">None Scheduled</span>
                      )}
                    </td>

                    {/* Assigned BD Assigner */}
                    <td className="py-3.5 px-4" onClick={e => e.stopPropagation()}>
                      <select
                        value={p.assignedBD || ''}
                        onChange={e => {
                          const val = e.target.value;
                          assignBDToPatient(p.id, val, val ? 'Contacted' : undefined);
                        }}
                        className="text-xs font-semibold px-2 py-1 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:border-sky-300 focus:ring-2 focus:ring-sky-500 focus:outline-none max-w-[150px] truncate"
                      >
                        <option value="">Unassigned</option>
                        <option value="Rahul Sharma (BD Lead)">Rahul Sharma</option>
                        <option value="Priya Verma (Treatment Coord)">Priya Verma</option>
                        <option value="Amit Patel (Care Advisor)">Amit Patel</option>
                        <option value="Sneha Rao (Patient Rel)">Sneha Rao</option>
                      </select>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      {hasPending ? (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          Pending ₹{pendingAmt.toLocaleString()}
                        </span>
                      ) : p.bdStatus === 'Converted' ? (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Converted
                        </span>
                      ) : p.assignedBD ? (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                          In Follow-up
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700">
                          Active
                        </span>
                      )}
                    </td>

                    {/* Actions: Replaced repeated buttons with clean 3-dot ActionMenu */}
                    <td className="py-3.5 px-6 text-right" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-end">
                        <ActionMenu
                          buttonTitle={`Actions for ${p.name}`}
                          items={[
                            {
                              label: 'View EHR Profile',
                              icon: Eye,
                              onClick: () => {
                                setSelectedPatientId(p.id);
                                setIsProfileOpen(true);
                              }
                            },
                            {
                              label: 'Book Appointment',
                              icon: CalendarPlus,
                              onClick: () => openScheduleModal({
                                patientId: p.id,
                                patientName: p.name,
                                patientPhone: p.phone,
                                patientAvatar: p.avatar
                              })
                            },
                            {
                              label: 'Call Patient',
                              icon: PhoneCall,
                              onClick: () => startCall({
                                name: p.name,
                                phone: p.phone,
                                avatar: p.avatar,
                                treatment: p.stats.lastTreatment,
                                patientId: p.id
                              })
                            },
                            {
                              label: 'Send WhatsApp Message',
                              icon: MessageSquare,
                              onClick: () => showToast(`WhatsApp chat opened for ${p.name}`, 'info')
                            },
                            {
                              label: 'Create Bill / Invoice',
                              icon: Receipt,
                              divider: true,
                              onClick: () => openCreateBillModal({
                                patientId: p.id,
                                patientName: p.name
                              })
                            },
                            {
                              label: 'Edit Patient Info',
                              icon: Edit3,
                              onClick: () => showToast(`Editing profile of ${p.name}`, 'info')
                            }
                          ]}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Profile Drawer / Modal (Section 7 Specification) */}
      {isProfileOpen && activePatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="bg-gradient-to-r from-sky-600 to-cyan-600 p-6 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4">
                <img
                  src={activePatient.avatar}
                  alt={activePatient.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/30 shadow-md"
                />
                <div>
                  <h2 className="text-xl font-black">{activePatient.name}</h2>
                  <p className="text-xs text-sky-100">
                    ID: {activePatient.id} • {activePatient.gender}, {activePatient.age} years
                  </p>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white">
                    {activePatient.stats.totalVisits} visits logged
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsProfileOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content (Personal, Dental, Appointments, Billing) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Personal Information (Section 7.1) */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-sky-800 mb-2.5">
                  Personal & Contact Information
                </h3>
                <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl text-xs border border-slate-100">
                  <div>
                    <span className="text-slate-400 block font-medium">Primary Phone:</span>
                    <span className="font-bold text-slate-800 font-mono">{activePatient.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Email Address:</span>
                    <span className="font-bold text-slate-800">{activePatient.email}</span>
                  </div>
                  {activePatient.emergencyContact ? (
                    <div className="col-span-2">
                      <span className="text-slate-400 block font-medium">Emergency Contact:</span>
                      <span className="font-bold text-slate-800">
                        {activePatient.emergencyContact.name} ({activePatient.emergencyContact.relationship}) — {activePatient.emergencyContact.phone}
                      </span>
                    </div>
                  ) : null}
                  <div className="col-span-2 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 block font-medium">Assigned Business Development (BD):</span>
                      <span className="font-bold text-slate-800">
                        {activePatient.assignedBD || 'Not yet assigned'}
                      </span>
                    </div>
                    <select
                      value={activePatient.assignedBD || ''}
                      onChange={e => {
                        const val = e.target.value;
                        assignBDToPatient(activePatient.id, val, val ? 'Contacted' : undefined);
                      }}
                      className="text-xs font-semibold px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-sky-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    >
                      <option value="">Assign BD...</option>
                      <option value="Rahul Sharma (BD Lead)">Rahul Sharma</option>
                      <option value="Priya Verma (Treatment Coord)">Priya Verma</option>
                      <option value="Amit Patel (Care Advisor)">Amit Patel</option>
                      <option value="Sneha Rao (Patient Rel)">Sneha Rao</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Dental Information (Section 7.2) */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-sky-800 mb-2.5">
                  Dental & Medical Overview
                </h3>
                <div className="space-y-2 text-xs">
                  {/* Allergies Alert */}
                  {activePatient.medicalOverview.allergies.length > 0 && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 flex items-center gap-2 font-bold">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>Allergies: {activePatient.medicalOverview.allergies.join(', ')}</span>
                    </div>
                  )}

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                    <div>
                      <span className="text-slate-400 font-medium block">Clinical & Medical Notes:</span>
                      <p className="text-slate-700 font-semibold mt-0.5">
                        {activePatient.medicalOverview.importantNotes || 'Nil chronic systemic contraindications.'}
                      </p>
                    </div>

                    <div>
                      <span className="text-slate-400 font-medium block">Past Dental Treatments:</span>
                      <div className="mt-1 space-y-1">
                        {activePatient.dentalHistory.length === 0 ? (
                          <span className="text-slate-400 italic">No past history charted.</span>
                        ) : (
                          activePatient.dentalHistory.map(dh => (
                            <div key={dh.id} className="flex items-center justify-between text-[11px] p-2 bg-white rounded-xl border border-slate-200/60">
                              <span className="font-bold text-slate-800">{dh.treatment} {dh.toothNumber}</span>
                              <span className="text-slate-400">{dh.date} • {dh.doctor}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointments (Section 7.3) */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-sky-800 mb-2.5">
                  Appointments ({patientAppointments.length})
                </h3>
                <div className="space-y-2 text-xs">
                  {patientAppointments.length === 0 ? (
                    <div className="p-4 bg-slate-50 rounded-2xl text-slate-400 text-center">
                      No appointment records found.
                    </div>
                  ) : (
                    patientAppointments.map(a => (
                      <div key={a.id} className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sky-700">{a.date} at {a.time}</span>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 capitalize">
                              {a.status}
                            </span>
                          </div>
                          <span className="text-slate-500 block mt-0.5">{a.reason} • {a.doctorName}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Billing Summary (Section 7.4) */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-sky-800 mb-2.5">
                  Billing & Balance
                </h3>
                <div className="grid grid-cols-3 gap-2.5 p-4 bg-slate-50 rounded-2xl text-center border border-slate-100 text-xs mb-3">
                  <div>
                    <span className="text-slate-400 block">Total Invoiced</span>
                    <span className="font-black text-slate-800 text-sm font-mono">
                      ₹{patientInvoices.reduce((s, i) => s + i.total, 0).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Paid Amount</span>
                    <span className="font-black text-emerald-600 text-sm font-mono">
                      ₹{patientInvoices.reduce((s, i) => s + i.paid, 0).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Pending Due</span>
                    <span className="font-black text-rose-600 text-sm font-mono">
                      ₹{patientPendingBill.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  {patientInvoices.map(inv => (
                    <div key={inv.id} className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-800">{inv.treatment}</span>
                        <span className="text-[10px] text-slate-400 block font-mono">{inv.invoiceNumber} • {inv.date}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-slate-900 block font-mono">₹{inv.total.toLocaleString()}</span>
                        <span className={`text-[10px] font-bold ${inv.pending > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                          {inv.pending > 0 ? `Pending: ₹${inv.pending.toLocaleString()}` : 'Paid'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile Action Footer (Section 7 Actions: Book, Call, Create Bill) */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2 shrink-0">
              <button
                onClick={() => startCall({
                  name: activePatient.name,
                  phone: activePatient.phone,
                  avatar: activePatient.avatar,
                  treatment: activePatient.stats.lastTreatment,
                  patientId: activePatient.id
                })}
                className="flex-1 py-2.5 px-3 bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Patient</span>
              </button>

              <button
                onClick={() => openScheduleModal({
                  patientId: activePatient.id,
                  patientName: activePatient.name,
                  patientPhone: activePatient.phone,
                  patientAvatar: activePatient.avatar
                })}
                className="flex-1 py-2.5 px-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5"
              >
                <CalendarPlus className="w-3.5 h-3.5" />
                <span>Book Appointment</span>
              </button>

              <button
                onClick={() => openCreateBillModal({
                  patientId: activePatient.id,
                  patientName: activePatient.name,
                  treatment: activePatient.stats.lastTreatment
                })}
                className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5"
              >
                <Receipt className="w-3.5 h-3.5" />
                <span>Create Bill</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  X, 
  User, 
  Calendar, 
  Stethoscope, 
  CreditCard, 
  Phone, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { 
    isGlobalSearchOpen, 
    closeGlobalSearch, 
    patients, 
    appointments, 
    doctors, 
    invoices, 
    setSelectedPatientId, 
    setCurrentNav,
    startCall 
  } = useApp();

  const [query, setQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isGlobalSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isGlobalSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isGlobalSearchOpen) closeGlobalSearch();
        else {
          // Open search modal
          inputRef.current?.focus();
        }
      }
      if (e.key === 'Escape' && isGlobalSearchOpen) {
        closeGlobalSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGlobalSearchOpen, closeGlobalSearch]);

  if (!isGlobalSearchOpen) return null;

  const q = query.toLowerCase().trim();

  // Categorized matching
  const matchedPatients = q
    ? patients.filter(p => p.name.toLowerCase().includes(q) || p.phone.includes(q))
    : [];

  const matchedAppointments = q
    ? appointments.filter(a => a.patientName.toLowerCase().includes(q) || a.reason.toLowerCase().includes(q) || a.doctorName.toLowerCase().includes(q))
    : [];

  const matchedDoctors = q
    ? doctors.filter(d => d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q))
    : [];

  const matchedInvoices = q
    ? invoices.filter(i => i.invoiceNumber.toLowerCase().includes(q) || i.patientName.toLowerCase().includes(q) || i.treatment.toLowerCase().includes(q))
    : [];

  const totalResults = matchedPatients.length + matchedAppointments.length + matchedDoctors.length + matchedInvoices.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-sky-100 overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-sky-50/50">
          <Search className="w-5 h-5 text-sky-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type patient name, phone #, doctor, appointment, or invoice..."
            className="w-full bg-transparent text-sm sm:text-base font-semibold text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full hover:bg-slate-200 text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={closeGlobalSearch}
            className="px-2 py-1 text-xs font-bold text-slate-500 hover:text-slate-800 bg-white rounded-lg border border-slate-200 shrink-0"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
          {!q ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              <Search className="w-8 h-8 mx-auto text-sky-300 mb-2" />
              <p className="font-bold text-slate-600">Quick Global Search</p>
              <p className="mt-0.5">Search across patients, appointments, doctors, and billing invoices.</p>
            </div>
          ) : totalResults === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No matching dental records found for "{query}".
            </div>
          ) : (
            <>
              {/* Patients Group */}
              {matchedPatients.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-sky-800 px-2 mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    Patients ({matchedPatients.length})
                  </h4>
                  <div className="space-y-1">
                    {matchedPatients.map(p => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setSelectedPatientId(p.id);
                          setCurrentNav('patients');
                          closeGlobalSearch();
                        }}
                        className="p-2.5 hover:bg-sky-50 rounded-2xl flex items-center justify-between cursor-pointer group transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img src={p.avatar} alt={p.name} className="w-9 h-9 rounded-full object-cover ring-1 ring-sky-200" />
                          <div>
                            <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-sky-700 block">
                              {p.name}
                            </span>
                            <span className="text-xs text-slate-400 font-mono">{p.phone} • Age: {p.age}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startCall({ name: p.name, phone: p.phone, avatar: p.avatar, patientId: p.id });
                              closeGlobalSearch();
                            }}
                            className="p-1.5 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-700"
                            title="Call patient"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </button>
                          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-sky-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Appointments Group */}
              {matchedAppointments.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-sky-800 px-2 mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Appointments ({matchedAppointments.length})
                  </h4>
                  <div className="space-y-1">
                    {matchedAppointments.map(a => (
                      <div
                        key={a.id}
                        onClick={() => {
                          setCurrentNav('appointments');
                          closeGlobalSearch();
                        }}
                        className="p-2.5 hover:bg-sky-50 rounded-2xl flex items-center justify-between cursor-pointer group transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-sky-700">
                              {a.patientName}
                            </span>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-800">
                              {a.date} at {a.time}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500 block mt-0.5">
                            {a.reason} • {a.doctorName}
                          </span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                          a.status === 'waiting' ? 'bg-amber-100 text-amber-800' :
                          a.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                          'bg-sky-100 text-sky-800'
                        }`}>
                          {a.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Doctors Group */}
              {matchedDoctors.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-sky-800 px-2 mb-2 flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5" />
                    Doctors ({matchedDoctors.length})
                  </h4>
                  <div className="space-y-1">
                    {matchedDoctors.map(d => (
                      <div
                        key={d.id}
                        onClick={() => {
                          setCurrentNav('doctors');
                          closeGlobalSearch();
                        }}
                        className="p-2.5 hover:bg-sky-50 rounded-2xl flex items-center justify-between cursor-pointer group transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img src={d.avatar} alt={d.name} className="w-9 h-9 rounded-xl object-cover ring-1 ring-sky-200" />
                          <div>
                            <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-sky-700 block">
                              {d.name}
                            </span>
                            <span className="text-xs text-slate-400">{d.specialty} • Next: {d.nextAvailableSlot}</span>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          d.status === 'available' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {d.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Invoices Group */}
              {matchedInvoices.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-sky-800 px-2 mb-2 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5" />
                    Invoices & Bills ({matchedInvoices.length})
                  </h4>
                  <div className="space-y-1">
                    {matchedInvoices.map(inv => (
                      <div
                        key={inv.id}
                        onClick={() => {
                          setCurrentNav('billing');
                          closeGlobalSearch();
                        }}
                        className="p-2.5 hover:bg-sky-50 rounded-2xl flex items-center justify-between cursor-pointer group transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-slate-500">{inv.invoiceNumber}</span>
                            <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-sky-700">
                              {inv.patientName}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500 block">{inv.treatment}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-black text-slate-900 block font-mono">₹{inv.total.toLocaleString()}</span>
                          <span className={`text-[10px] font-bold ${inv.pending > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                            {inv.pending > 0 ? `Pending: ₹${inv.pending.toLocaleString()}` : 'Paid'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

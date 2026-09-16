import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Bell, 
  UserCheck, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  AlertCircle, 
  Phone
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    appointments, 
    notifications, 
    markNotificationRead, 
    clearAllNotifications, 
    openGlobalSearch,
    setCurrentNav
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState<boolean>(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const waitingCount = appointments.filter(a => a.status === 'waiting').length;
  const unreadNotifs = notifications.filter(n => !n.read);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white/95 backdrop-blur-md border-b border-sky-100 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-20 shadow-[0_1px_3px_rgba(2,132,199,0.04)]">
      {/* Left: Global Search & Date */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button
          onClick={openGlobalSearch}
          className="relative w-full max-w-md flex items-center gap-2.5 pl-3.5 pr-3 py-2 text-xs sm:text-sm bg-sky-50/70 hover:bg-sky-50 border border-sky-200/70 rounded-xl text-slate-500 hover:text-slate-800 transition-all text-left shadow-2xs group"
        >
          <Search className="w-4 h-4 text-sky-600 group-hover:scale-110 transition-transform shrink-0" />
          <span className="truncate">Search patients, phones, doctors, invoices...</span>
          <kbd className="hidden sm:inline-flex ml-auto items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-bold bg-white text-sky-700 border border-sky-200 rounded-md shadow-2xs">
            Ctrl+K
          </kbd>
        </button>

        {/* Date Display */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-semibold text-slate-600 shrink-0">
          <Calendar className="w-3.5 h-3.5 text-sky-600" />
          <span>Sunday, 13 Sep 2026</span>
        </div>
      </div>

      {/* Right Controls: Lobby Status, Notifications, Receptionist Profile */}
      <div className="flex items-center gap-3">
        {/* Waiting Room Pill (Direct context badge) */}
        <button
          onClick={() => setCurrentNav('waiting-room')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 text-amber-800 text-xs font-bold transition-all shadow-2xs"
          title="Open Waiting Room Lobby"
        >
          <UserCheck className="w-4 h-4 text-amber-600 animate-pulse" />
          <span>{waitingCount} in Lobby</span>
        </button>

        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(prev => !prev)}
            className="relative p-2 rounded-xl text-slate-600 hover:text-sky-700 hover:bg-sky-50 border border-slate-200/80 transition-all"
            title="Front Desk Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifs.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center ring-2 ring-white animate-bounce">
                {unreadNotifs.length}
              </span>
            )}
          </button>

          {/* Popover Menu */}
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-sky-100 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Front Desk Alerts</h3>
                  <p className="text-[11px] text-slate-400">{unreadNotifs.length} unread updates</p>
                </div>
                {unreadNotifs.length > 0 && (
                  <button
                    onClick={clearAllNotifications}
                    className="text-xs font-semibold text-sky-600 hover:text-sky-800 hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    No new alerts at this time.
                  </div>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationRead(n.id);
                        if (n.linkNav) setCurrentNav(n.linkNav);
                        setIsNotifOpen(false);
                      }}
                      className={`p-3 sm:px-4 flex items-start gap-3 hover:bg-sky-50/60 cursor-pointer transition-colors ${
                        !n.read ? 'bg-sky-50/40' : ''
                      }`}
                    >
                      <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                        n.type === 'appointment' ? 'bg-sky-100 text-sky-700' :
                        n.type === 'cancellation' ? 'bg-rose-100 text-rose-700' :
                        n.type === 'rescheduled' ? 'bg-purple-100 text-purple-700' :
                        n.type === 'payment' ? 'bg-emerald-100 text-emerald-700' :
                        n.type === 'doctor' ? 'bg-amber-100 text-amber-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {n.type === 'appointment' && <Calendar className="w-3.5 h-3.5" />}
                        {n.type === 'cancellation' && <AlertCircle className="w-3.5 h-3.5" />}
                        {n.type === 'rescheduled' && <Clock className="w-3.5 h-3.5" />}
                        {n.type === 'payment' && <CreditCard className="w-3.5 h-3.5" />}
                        {n.type === 'doctor' && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {n.type === 'reminder' && <Phone className="w-3.5 h-3.5" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-xs font-bold text-slate-900 truncate">{n.title}</h4>
                          <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{n.message}</p>
                      </div>

                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0 mt-2"></span>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="px-4 pt-2 border-t border-slate-100 text-center">
                <button
                  onClick={() => {
                    setCurrentNav('appointments');
                    setIsNotifOpen(false);
                  }}
                  className="text-xs font-bold text-sky-600 hover:text-sky-700"
                >
                  View All Appointments
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Receptionist Profile Badge */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150"
            alt="Elena Vance"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-sky-300 shadow-2xs"
          />
          <div className="hidden md:block text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-slate-900">Elena Vance</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider block -mt-0.5">
              Front Desk Lead
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

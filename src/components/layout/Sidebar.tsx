import React from 'react';
import { useApp } from '../../context/AppContext';
import { NavItem } from '../../types';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  UserCheck, 
  Stethoscope, 
  SearchCheck, 
  Calendar, 
  CreditCard, 
  PhoneCall, 
  BarChart3, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Phone,
  HelpCircle
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { 
    currentNav, 
    setCurrentNav, 
    isSidebarCollapsed, 
    toggleSidebar,
    appointments,
    invoices,
    callLogs,
    startCall
  } = useApp();

  const waitingCount = appointments.filter(a => a.status === 'waiting').length;
  const todayCount = appointments.filter(a => a.date === '2026-09-13' && a.status !== 'cancelled').length;
  const pendingInvoicesCount = invoices.filter(i => i.pending > 0).length;

  const navItems: Array<{ 
    id: NavItem; 
    label: string; 
    icon: React.ComponentType<{ className?: string }>; 
    badge?: number; 
    badgeColor?: string 
  }> = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointments', label: 'Appointments', icon: CalendarDays, badge: todayCount, badgeColor: 'bg-sky-100 text-sky-800' },
    { id: 'waiting-room', label: 'Waiting Room', icon: UserCheck, badge: waitingCount, badgeColor: 'bg-amber-100 text-amber-800 animate-pulse' },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'doctors', label: 'Doctors & Schedules', icon: Stethoscope },
    { id: 'availability', label: 'Check Availability', icon: SearchCheck },
    { id: 'calendar', label: 'Clinic Calendar', icon: Calendar },
    { id: 'billing', label: 'Billing & Payments', icon: CreditCard, badge: pendingInvoicesCount, badgeColor: 'bg-rose-100 text-rose-800' },
    { id: 'calls', label: 'Calls & Reminders', icon: PhoneCall },
    { id: 'reports', label: 'Reports & Stats', icon: BarChart3 },
    { id: 'portfolio', label: 'Product Portfolio', icon: Sparkles },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      <aside 
        className={`hidden md:flex flex-col bg-white border-r border-sky-100 transition-all duration-300 z-30 select-none ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sky-100 bg-gradient-to-r from-sky-50/50 to-white">
          <div 
            onClick={() => setCurrentNav('dashboard')}
            className="flex items-center gap-3 overflow-hidden cursor-pointer group"
          >
            {/* Tooth Icon Motif */}
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-600 to-cyan-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C9.5 2 7.8 3.5 7.4 5.3C6.7 8.3 7 12 7.5 15.5C8 19 9.5 22 10.5 22C11.5 22 11.5 19.5 12 19.5C12.5 19.5 12.5 22 13.5 22C14.5 22 16 19 16.5 15.5C17 12 17.3 8.3 16.6 5.3C16.2 3.5 14.5 2 12 2Z" />
              </svg>
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col truncate">
                <span className="font-black text-base tracking-tight text-slate-900 leading-tight">
                  SmileCare<span className="text-sky-600 ml-0.5">Dental</span>
                </span>
                <span className="text-[11px] text-sky-700 font-bold tracking-wide uppercase">
                  Reception OS
                </span>
              </div>
            )}
          </div>

          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg text-slate-400 hover:text-sky-700 hover:bg-sky-50 transition-colors shrink-0"
            title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto py-3 px-2.5 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentNav(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all relative group ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                    : 'text-slate-600 hover:text-sky-900 hover:bg-sky-50/70'
                }`}
                title={isSidebarCollapsed ? item.label : undefined}
              >
                <Icon className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'text-white' : 'text-sky-600 group-hover:scale-110'}`} />
                
                {!isSidebarCollapsed && (
                  <span className="truncate text-left flex-1">{item.label}</span>
                )}

                {!isSidebarCollapsed && item.badge !== undefined && item.badge > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-black shrink-0 ${
                    isActive ? 'bg-white/20 text-white' : (item.badgeColor || 'bg-slate-100 text-slate-700')
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Fast Action Widget */}
        {!isSidebarCollapsed && (
          <div className="p-3 m-2.5 bg-gradient-to-br from-sky-50 to-cyan-50/60 rounded-2xl border border-sky-100">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-extrabold text-sky-900">Front Desk Dial Pad</span>
            </div>
            <p className="text-[11px] text-slate-500 mb-2 leading-relaxed">
              Need to contact a patient or follow up on tomorrow's visits?
            </p>
            <button
              onClick={() => startCall({
                name: 'Quick Dial',
                phone: '+91 98201 44521',
                treatment: 'Patient Follow-up'
              })}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white hover:bg-sky-600 hover:text-white text-sky-700 font-bold text-xs rounded-xl border border-sky-200/80 shadow-xs transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Open Call Dialer</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

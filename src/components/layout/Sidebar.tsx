import React from 'react';
import { useApp } from '../../context/AppContext';
import { NavItem } from '../../types';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  UserCheck, 
  Stethoscope, 
  CreditCard, 
  PhoneCall, 
  BarChart3, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Pill,
  FileText,
  Bell,
  LogOut,
  ArrowRightLeft
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { 
    currentNav, 
    setCurrentNav, 
    isSidebarCollapsed, 
    toggleSidebar,
    appointments,
    invoices,
    notifications,
    userRole,
    currentUser,
    logout,
    switchRole
  } = useApp();

  const waitingCount = appointments.filter(a => a.status === 'waiting').length;
  const todayCount = appointments.filter(a => a.date === '2026-09-13' && a.status !== 'cancelled').length;
  const pendingInvoicesCount = invoices.filter(i => i.pending > 0).length;
  const unreadNotifications = notifications.filter(n => !n.read).length;

  // Receptionist Sidebar Specification (Step 7)
  const receptionistNavItems: Array<{ 
    id: NavItem; 
    label: string; 
    icon: React.ComponentType<{ className?: string }>; 
    badge?: number; 
    badgeColor?: string 
  }> = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointments', label: 'Appointments', icon: CalendarDays, badge: todayCount, badgeColor: 'bg-sky-100 text-sky-800' },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'doctors', label: 'Doctors', icon: Stethoscope },
    { id: 'billing', label: 'Billing', icon: CreditCard, badge: pendingInvoicesCount, badgeColor: 'bg-rose-100 text-rose-800' },
    { id: 'calls', label: 'Reminders', icon: PhoneCall },
    { id: 'portfolio', label: 'Product Portfolio', icon: Sparkles },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Doctor Sidebar Specification (Step 7)
  const doctorNavItems: Array<{ 
    id: NavItem; 
    label: string; 
    icon: React.ComponentType<{ className?: string }>; 
    badge?: number; 
    badgeColor?: string 
  }> = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointments', label: 'Appointments', icon: CalendarDays, badge: todayCount, badgeColor: 'bg-sky-100 text-sky-800' },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'treatments', label: 'Treatments', icon: Stethoscope },
    { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
    { id: 'medical-notes', label: 'Medical Notes', icon: FileText },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const activeNavItems = userRole === 'doctor' ? doctorNavItems : receptionistNavItems;

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
                  AuraDental<span className="text-sky-600 ml-0.5">OS</span>
                </span>
                <span className="text-[10px] text-sky-700 font-extrabold tracking-wide uppercase">
                  {userRole === 'doctor' ? 'Doctor Suite' : 'Reception OS'}
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

        {/* Role Indicator Banner */}
        {!isSidebarCollapsed && (
          <div className="px-3 pt-3">
            <div className={`p-2 rounded-2xl flex items-center justify-between text-xs font-bold ${
              userRole === 'doctor' 
                ? 'bg-sky-50/80 border border-sky-200 text-sky-800' 
                : 'bg-cyan-50/80 border border-cyan-200 text-cyan-800'
            }`}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="capitalize">{userRole} Portal</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto py-3 px-2.5 space-y-1">
          {activeNavItems.map((item) => {
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

        {/* User Profile & Logout Bottom Section */}
        <div className="p-3 border-t border-sky-100 bg-slate-50/50">
          {!isSidebarCollapsed ? (
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={currentUser?.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200'}
                  alt={currentUser?.name || 'User'}
                  className="w-9 h-9 rounded-xl object-cover ring-1 ring-sky-300 shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs font-black text-slate-900 truncate">
                    {currentUser?.name || (userRole === 'doctor' ? 'Dr. Sarah Johnson' : 'Elena Vance')}
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold truncate capitalize">
                    {currentUser?.title || userRole}
                  </div>
                </div>
              </div>

              <button
                onClick={logout}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors shrink-0"
                title="Sign out of clinic"
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={logout}
              className="w-full flex items-center justify-center p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
              title="Sign out of clinic"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

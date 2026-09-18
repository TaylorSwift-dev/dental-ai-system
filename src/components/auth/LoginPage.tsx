import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Stethoscope, 
  UserCheck, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  Activity
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useApp();

  const [selectedRole, setSelectedRole] = useState<'doctor' | 'receptionist'>('doctor');
  const [email, setEmail] = useState<string>('sarah.johnson@smiledental.com');
  const [password, setPassword] = useState<string>('••••••••');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRoleChange = (role: 'doctor' | 'receptionist') => {
    setSelectedRole(role);
    if (role === 'doctor') {
      setEmail('sarah.johnson@smiledental.com');
    } else {
      setEmail('elena.vance@smiledental.com');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    login(selectedRole, {
      email: email
    });
  };

  const handleQuickLogin = (role: 'doctor' | 'receptionist') => {
    login(role);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-sky-50 via-cyan-50/40 to-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-5xl bg-white rounded-3xl sm:rounded-[36px] border border-sky-100/80 shadow-xl shadow-sky-500/5 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* Left Column: Visual Hero (Styled directly after the user's reference screenshot) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-sky-500 via-sky-600 to-cyan-600 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle glowing ring aura in background */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Tag */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold tracking-wide text-white mb-6">
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              <span>AuraDental OS • Healthcare Platform</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                Connect With Trusted Doctors Instantly
              </h2>
              <p className="text-xs sm:text-sm text-sky-100 leading-relaxed max-w-sm">
                Next-generation voice-first dental clinic operating system connecting patients, doctors, and front desk operations.
              </p>
            </div>
          </div>

          {/* Center 3D Tooth & Medical Device Showcase (matching reference image) */}
          <div className="relative z-10 py-8 flex flex-col items-center justify-center">
            <div className="relative group">
              {/* Pulsing circular aura */}
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse" />
              
              {/* 3D-styled Tooth Icon container */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-white/25 to-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white shadow-lg flex items-center justify-center relative">
                  <svg className="w-16 h-16 sm:w-20 sm:h-20 text-sky-500 fill-current drop-shadow-md" viewBox="0 0 24 24">
                    <path d="M12 2C8.5 2 6.5 4 6 7C5 12 5.5 17 6.5 20C7 21.5 8 22 9 22C10.5 22 10.5 19.5 11 19.5C11.5 19.5 11.5 22 13 22C14 22 15 21.5 15.5 20C16.5 17 17 12 16 7C15.5 4 13.5 2 12 2Z" />
                  </svg>
                  {/* Orbiting halo effect */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-cyan-300 border-2 border-white shadow-sm flex items-center justify-center">
                    <Activity className="w-3 h-3 text-sky-800" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-[11px] font-bold text-white backdrop-blur-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Clinic Operatories Online
              </span>
            </div>
          </div>

          {/* Bottom Security / Compliance Badge */}
          <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-[11px] text-sky-100 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-200" />
              <span>HIPAA & NABH Ready</span>
            </span>
            <span>v2.5 Production Release</span>
          </div>
        </div>

        {/* Right Column: Interactive Login Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
          <div>
            {/* Header / Title */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Sign In to Clinic
                </h1>
                <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                  Select your workstation role to enter your dedicated dashboard.
                </p>
              </div>

              {/* Clinic Icon Stamp */}
              <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center shadow-xs shrink-0">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C8.5 2 6.5 4 6 7C5 12 5.5 17 6.5 20C7 21.5 8 22 9 22C10.5 22 10.5 19.5 11 19.5C11.5 19.5 11.5 22 13 22C14 22 15 21.5 15.5 20C16.5 17 17 12 16 7C15.5 4 13.5 2 12 2Z" />
                </svg>
              </div>
            </div>

            {/* Role Selection Segmented Control */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Select Your Role
              </label>

              <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/60">
                {/* Doctor Role Option */}
                <button
                  type="button"
                  onClick={() => handleRoleChange('doctor')}
                  className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    selectedRole === 'doctor'
                      ? 'bg-white text-sky-700 shadow-sm shadow-sky-500/10 border border-sky-200/60'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    selectedRole === 'doctor' ? 'bg-sky-50 text-sky-600' : 'bg-slate-200/70 text-slate-500'
                  }`}>
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <span>Doctor / Clinical</span>
                </button>

                {/* Receptionist Role Option */}
                <button
                  type="button"
                  onClick={() => handleRoleChange('receptionist')}
                  className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    selectedRole === 'receptionist'
                      ? 'bg-white text-sky-700 shadow-sm shadow-sky-500/10 border border-sky-200/60'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    selectedRole === 'receptionist' ? 'bg-sky-50 text-sky-600' : 'bg-slate-200/70 text-slate-500'
                  }`}>
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <span>Receptionist / Front Desk</span>
                </button>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email or Work Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder={selectedRole === 'doctor' ? 'doctor@smiledental.com' : 'receptionist@smiledental.com'}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Password
                  </label>
                  <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-xs font-bold text-sky-600 hover:text-sky-700">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter password"
                    className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Workstation Checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-sky-600 rounded-lg border-slate-300 focus:ring-sky-500"
                  />
                  <span className="text-xs font-semibold text-slate-600">Remember this workstation</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white font-black text-sm sm:text-base shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-70 mt-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Enter {selectedRole === 'doctor' ? 'Doctor Dashboard' : 'Receptionist Dashboard'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick 1-Click Fast Login Demo Bar */}
          <div className="pt-6 mt-6 border-t border-slate-100">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5 text-center">
              Quick 1-Click Demo Login
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickLogin('doctor')}
                className="flex items-center gap-3 p-2.5 rounded-2xl bg-sky-50/70 hover:bg-sky-100 border border-sky-200/80 text-left transition-all group active:scale-98"
              >
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200"
                  alt="Dr. Sarah"
                  className="w-9 h-9 rounded-xl object-cover ring-1 ring-sky-300 shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-sky-700 truncate">
                    Dr. Sarah Johnson
                  </div>
                  <div className="text-[10px] text-sky-700 font-semibold truncate">
                    Log in as Doctor &rarr;
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('receptionist')}
                className="flex items-center gap-3 p-2.5 rounded-2xl bg-cyan-50/70 hover:bg-cyan-100 border border-cyan-200/80 text-left transition-all group active:scale-98"
              >
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
                  alt="Elena Vance"
                  className="w-9 h-9 rounded-xl object-cover ring-1 ring-cyan-300 shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-cyan-800 truncate">
                    Elena Vance
                  </div>
                  <div className="text-[10px] text-cyan-800 font-semibold truncate">
                    Log in as Receptionist &rarr;
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

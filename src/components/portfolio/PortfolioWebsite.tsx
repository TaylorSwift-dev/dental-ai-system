import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  PhoneCall, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  Zap, 
  Layers, 
  Activity, 
  CreditCard, 
  Users, 
  Award,
  ExternalLink,
  ChevronRight,
  Code2,
  Cpu,
  Smile,
  HeartHandshake
} from 'lucide-react';

export const PortfolioWebsite: React.FC = () => {
  const { setCurrentNav } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'workflow' | 'comparison' | 'tech'>('overview');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans -mx-4 sm:-mx-6 lg:-mx-8 -my-6 px-4 sm:px-8 py-10">
      {/* Top Navbar */}
      <nav className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 sticky top-4 z-40 mb-10 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-sky-500/25">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C9.5 2 7.8 3.5 7.4 5.3C6.7 8.3 7 12 7.5 15.5C8 19 9.5 22 10.5 22C11.5 22 11.5 19.5 12 19.5C12.5 19.5 12.5 22 13.5 22C14.5 22 16 19 16.5 15.5C17 12 17.3 8.3 16.6 5.3C16.2 3.5 14.5 2 12 2Z" />
            </svg>
          </div>
          <div>
            <span className="text-base font-black tracking-tight text-white block">
              AuraDental<span className="text-sky-400">AI</span>
            </span>
            <span className="text-[10px] text-sky-400 font-bold uppercase tracking-widest block">
              Next-Gen Reception OS
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1 bg-slate-800/60 p-1 rounded-xl text-xs font-semibold text-slate-300">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'overview' ? 'bg-sky-500 text-white shadow-xs' : 'hover:text-white'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('workflow')}
            className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'workflow' ? 'bg-sky-500 text-white shadow-xs' : 'hover:text-white'}`}
          >
            Receptionist Workflow
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'comparison' ? 'bg-sky-500 text-white shadow-xs' : 'hover:text-white'}`}
          >
            Benchmark vs Dentee/MocDoc
          </button>
          <button
            onClick={() => setActiveTab('tech')}
            className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'tech' ? 'bg-sky-500 text-white shadow-xs' : 'hover:text-white'}`}
          >
            Tech Architecture
          </button>
        </div>

        <button
          onClick={() => setCurrentNav('dashboard')}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-sky-500/25 transition-all transform active:scale-95"
        >
          <span>Open Live App</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </nav>

      {/* Hero Section */}
      <header className="max-w-5xl mx-auto text-center py-12 px-4 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-950/80 border border-sky-800/60 text-sky-400 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Product Presentation & Architectural Review</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
          Dental Receptionist Software <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-400">
            Re-engineered for Zero Cognitive Load
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-normal">
          Legacy software like Dentee and MocDoc force receptionists to navigate through dozens of nested forms, manual calculations, and high-friction menus. 
          <strong className="text-white font-semibold block mt-1">
            "The software should manage the workflow for the user, not make the user manage complicated software."
          </strong>
        </p>

        <div className="flex items-center justify-center gap-4 pt-4 flex-wrap">
          <button
            onClick={() => setCurrentNav('dashboard')}
            className="flex items-center gap-2.5 px-8 py-3.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black rounded-2xl shadow-xl shadow-sky-500/30 transition-all text-sm transform hover:-translate-y-0.5"
          >
            <Zap className="w-4 h-4 text-slate-950 fill-current" />
            <span>Launch Live Interactive System</span>
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className="flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold rounded-2xl border border-slate-800 text-sm transition-all"
          >
            <span>View Comparison Matrix</span>
          </button>
        </div>
      </header>

      {/* Core Highlights Strip */}
      <section className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
        <div className="p-5 bg-slate-900/60 rounded-3xl border border-slate-800">
          <span className="text-3xl font-black text-sky-400 font-mono">10s</span>
          <h4 className="text-sm font-bold text-white mt-1">Patient Registration</h4>
          <p className="text-xs text-slate-400 mt-1">Strict 10-digit Indian phone validation. No address or redundant emergency fields.</p>
        </div>
        <div className="p-5 bg-slate-900/60 rounded-3xl border border-slate-800">
          <span className="text-3xl font-black text-emerald-400 font-mono">1-Click</span>
          <h4 className="text-sm font-bold text-white mt-1">Lobby Check-in</h4>
          <p className="text-xs text-slate-400 mt-1">Real-time waiting room roster with instant one-click doctor chime notification.</p>
        </div>
        <div className="p-5 bg-slate-900/60 rounded-3xl border border-slate-800">
          <span className="text-3xl font-black text-amber-400 font-mono">Auto</span>
          <h4 className="text-sm font-bold text-white mt-1">Doctor Skill Matching</h4>
          <p className="text-xs text-slate-400 mt-1">Root canal treatments automatically match Endodontists; Implants match Surgeons.</p>
        </div>
        <div className="p-5 bg-slate-900/60 rounded-3xl border border-slate-800">
          <span className="text-3xl font-black text-cyan-400 font-mono">0</span>
          <h4 className="text-sm font-bold text-white mt-1">Double Booking Risk</h4>
          <p className="text-xs text-slate-400 mt-1">Time slots are clickable buttons. Booked slots are physically locked and disabled.</p>
        </div>
      </section>

      {/* The Problem vs Solution Deep Dive */}
      <section className="max-w-6xl mx-auto py-12 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black text-white">The Core Philosophy</h2>
          <p className="text-sm text-slate-400">Show only what is needed at that moment. Eliminate receptionist cognitive overload.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Legacy Pitfalls */}
          <div className="p-8 bg-rose-950/20 rounded-3xl border border-rose-900/40 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-900/40 text-rose-400 flex items-center justify-center font-black">
                ✕
              </div>
              <h3 className="text-lg font-bold text-rose-300">How Legacy Systems Fail Receptionists</h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span><strong>50+ Menus & Cluttered Screens:</strong> Staff are buried under billing ledgers, accounting journals, and generic hospital forms.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span><strong>Excessive Intake Fields:</strong> Asking for permanent address, blood group, and emergency contacts before booking a simple checkup.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span><strong>Manual Time Typing:</strong> Typing "10:30 AM" into text inputs leads to human error, typos, and overlapping appointments.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span><strong>Unclear Outbound Calling:</strong> No prioritized queue for tomorrow's confirmations, resulting in 20-30% patient no-show rates.</span>
              </li>
            </ul>
          </div>

          {/* AuraDental Solution */}
          <div className="p-8 bg-sky-950/20 rounded-3xl border border-sky-800/40 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-900/40 text-sky-400 flex items-center justify-center font-black">
                ✓
              </div>
              <h3 className="text-lg font-bold text-sky-300">The AuraDental AI Breakthrough</h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Progressive Disclosure:</strong> Only primary actions visible. Secondary utilities organized into standard 3-dot action menus.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>10-Second Intake with Strict Phone Validation:</strong> Captures Name, Age, Gender, and 10-digit Indian Mobile (/^[6-9]\d{9}$/).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Clickable Time Slots with Lockout:</strong> Click to book. Booked slots show "Booked" and cannot be clicked again.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Pre-configured Default Pricing:</strong> Selecting Root Canal auto-fills ₹5,000; Filling auto-fills ₹1,500. Printable tax receipts.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Receptionist Workflow Pipeline */}
      <section className="max-w-6xl mx-auto py-12 space-y-8" id="workflow">
        <div className="text-center space-y-2">
          <div className="inline-block px-3 py-1 bg-sky-900/40 text-sky-400 text-xs font-bold rounded-full border border-sky-700/50">
            End-to-End Operational Pipeline
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">How a Receptionist Uses the System</h2>
          <p className="text-sm text-slate-400">Streamlined in seconds from patient phone call to chair exit.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-900/60 rounded-3xl border border-slate-800 space-y-3">
            <span className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 text-xs font-black flex items-center justify-center">01</span>
            <h4 className="text-base font-extrabold text-white">Patient Enters or Calls</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Click <strong>+ Add Patient</strong> on top banner. Type Name and 10-digit phone. Save directly or click <strong>Save & Book Appointment</strong>.
            </p>
          </div>

          <div className="p-6 bg-slate-900/60 rounded-3xl border border-slate-800 space-y-3">
            <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-black flex items-center justify-center">02</span>
            <h4 className="text-base font-extrabold text-white">Intelligent Slot Allocation</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Select treatment preset. The system highlights qualified dentists and presents open pill-shaped timeslots with double-booking prevention.
            </p>
          </div>

          <div className="p-6 bg-slate-900/60 rounded-3xl border border-slate-800 space-y-3">
            <span className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-black flex items-center justify-center">03</span>
            <h4 className="text-base font-extrabold text-white">Lobby Queue & 1-Click Notify</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              When patient arrives, click <strong>Check In</strong>. Patient moves to Live Waiting Room. Click <strong>Notify Doc</strong> to chime the operatory.
            </p>
          </div>

          <div className="p-6 bg-slate-900/60 rounded-3xl border border-slate-800 space-y-3">
            <span className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 text-xs font-black flex items-center justify-center">04</span>
            <h4 className="text-base font-extrabold text-white">Desk Payment Collection</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standard treatment price is auto-populated. Collect via UPI, Cash or Card. Generate and print clean clinic tax invoice with GSTIN.
            </p>
          </div>

          <div className="p-6 bg-slate-900/60 rounded-3xl border border-slate-800 space-y-3">
            <span className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 text-xs font-black flex items-center justify-center">05</span>
            <h4 className="text-base font-extrabold text-white">Prioritized Outbound Calls</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receptionist opens Upcoming Calls roster. Status toggles: <em>Not Called, Called, No Answer, Confirmed, Call Back</em> with native dial links.
            </p>
          </div>

          <div className="p-6 bg-slate-900/60 rounded-3xl border border-slate-800 space-y-3">
            <span className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 text-xs font-black flex items-center justify-center">06</span>
            <h4 className="text-base font-extrabold text-white">BD Coordinator Lead Roster</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              High-value treatment leads (Implants, Aligners) can be assigned directly to dedicated clinic BD personnel to maximize patient conversion.
            </p>
          </div>
        </div>
      </section>

      {/* Benchmark Matrix vs Competitors */}
      <section className="max-w-6xl mx-auto py-12 space-y-6" id="comparison">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black text-white">Competitive Benchmark</h2>
          <p className="text-sm text-slate-400">Comparing AuraDental OS against legacy dental software in India and globally.</p>
        </div>

        <div className="overflow-x-auto bg-slate-900/70 rounded-3xl border border-slate-800 p-2 shadow-2xl">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-4 px-6 font-bold">Feature / Operational Capability</th>
                <th className="py-4 px-4 font-black text-sky-400 bg-sky-950/40 rounded-t-2xl">AuraDental AI OS</th>
                <th className="py-4 px-4 font-semibold text-slate-300">Dentee</th>
                <th className="py-4 px-4 font-semibold text-slate-300">MocDoc</th>
                <th className="py-4 px-4 font-semibold text-slate-300">Generic EHR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-3.5 px-6 font-bold">Design Philosophy</td>
                <td className="py-3.5 px-4 font-black text-emerald-400 bg-sky-950/20">Zero Cognitive Clutter (Task Focused)</td>
                <td className="py-3.5 px-4 text-slate-400">Complex Portal</td>
                <td className="py-3.5 px-4 text-slate-400">Hospital Multi-Menu</td>
                <td className="py-3.5 px-4 text-slate-400">Generic Form</td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-bold">Patient Intake Speed</td>
                <td className="py-3.5 px-4 font-black text-emerald-400 bg-sky-950/20">10 Seconds (Minimal Fields)</td>
                <td className="py-3.5 px-4 text-slate-400">90-120 Seconds</td>
                <td className="py-3.5 px-4 text-slate-400">2-3 Minutes</td>
                <td className="py-3.5 px-4 text-slate-400">2+ Minutes</td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-bold">Phone Validation</td>
                <td className="py-3.5 px-4 font-black text-emerald-400 bg-sky-950/20">Strict 10-Digit Mobile Regex</td>
                <td className="py-3.5 px-4 text-slate-400">Loose Text Field</td>
                <td className="py-3.5 px-4 text-slate-400">Generic String</td>
                <td className="py-3.5 px-4 text-slate-400">No Regex</td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-bold">Double-Booking Lockout</td>
                <td className="py-3.5 px-4 font-black text-emerald-400 bg-sky-950/20">Active UI Lockout on Time Pills</td>
                <td className="py-3.5 px-4 text-slate-400">Manual Warning</td>
                <td className="py-3.5 px-4 text-slate-400">Text Timeslot</td>
                <td className="py-3.5 px-4 text-slate-400">None</td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-bold">Specialist Doctor Matching</td>
                <td className="py-3.5 px-4 font-black text-emerald-400 bg-sky-950/20">Auto (Endo for RCT, etc.)</td>
                <td className="py-3.5 px-4 text-slate-400">Manual Selection</td>
                <td className="py-3.5 px-4 text-slate-400">Manual Selection</td>
                <td className="py-3.5 px-4 text-slate-400">None</td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-bold">Default Price Population</td>
                <td className="py-3.5 px-4 font-black text-emerald-400 bg-sky-950/20">Auto (₹5,000 RCT, ₹1,500 Filling)</td>
                <td className="py-3.5 px-4 text-slate-400">Manual Entry</td>
                <td className="py-3.5 px-4 text-slate-400">Item Catalogue</td>
                <td className="py-3.5 px-4 text-slate-400">Manual Typing</td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-bold">Integrated Outbound Call Roster</td>
                <td className="py-3.5 px-4 font-black text-emerald-400 bg-sky-950/20">Built-in with Status Toggles</td>
                <td className="py-3.5 px-4 text-slate-400">Add-on Module</td>
                <td className="py-3.5 px-4 text-slate-400">SMS Only</td>
                <td className="py-3.5 px-4 text-slate-400">None</td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-bold">BD Lead Assigner</td>
                <td className="py-3.5 px-4 font-black text-emerald-400 bg-sky-950/20">Direct front desk BD assignment</td>
                <td className="py-3.5 px-4 text-slate-400">Separate CRM</td>
                <td className="py-3.5 px-4 text-slate-400">No CRM</td>
                <td className="py-3.5 px-4 text-slate-400">None</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Tech Architecture */}
      <section className="max-w-6xl mx-auto py-12 space-y-6" id="tech">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black text-white">Modern Engineering Stack</h2>
          <p className="text-sm text-slate-400">Architected for instantaneous response, zero server lag, and fluid interactions.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 bg-slate-900/60 rounded-2xl border border-slate-800 text-center">
            <Code2 className="w-6 h-6 text-sky-400 mx-auto mb-2" />
            <span className="font-extrabold text-white text-sm block">React 18 + Vite</span>
            <span className="text-[11px] text-slate-400">Ultra-fast client bundle</span>
          </div>
          <div className="p-5 bg-slate-900/60 rounded-2xl border border-slate-800 text-center">
            <Layers className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <span className="font-extrabold text-white text-sm block">TypeScript</span>
            <span className="text-[11px] text-slate-400">Strict clinical type safety</span>
          </div>
          <div className="p-5 bg-slate-900/60 rounded-2xl border border-slate-800 text-center">
            <Cpu className="w-6 h-6 text-teal-400 mx-auto mb-2" />
            <span className="font-extrabold text-white text-sm block">Web Speech API</span>
            <span className="text-[11px] text-slate-400">Voice-first handsfree intake</span>
          </div>
          <div className="p-5 bg-slate-900/60 rounded-2xl border border-slate-800 text-center">
            <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <span className="font-extrabold text-white text-sm block">Tailwind CSS</span>
            <span className="text-[11px] text-slate-400">Clean healthcare aesthetic</span>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="max-w-4xl mx-auto text-center py-16 space-y-6 border-t border-slate-800 mt-12">
        <h3 className="text-3xl font-black text-white">
          Experience the Difference at the Front Desk
        </h3>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Test the live receptionist dashboard, create a bill, book an appointment, or check out the waiting room queue in real time.
        </p>
        <button
          onClick={() => setCurrentNav('dashboard')}
          className="px-8 py-4 bg-gradient-to-r from-sky-500 via-cyan-400 to-teal-400 hover:opacity-95 text-slate-950 font-black rounded-2xl shadow-xl shadow-sky-500/25 transition-all text-base font-bold"
        >
          Launch Reception OS Now
        </button>
      </footer>
    </div>
  );
};

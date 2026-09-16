import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GitFork, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  IndianRupee, 
  CreditCard, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Download,
  Share2
} from 'lucide-react';

export const TreatmentPlanScreen: React.FC = () => {
  const { treatmentPlans, selectedPatient, setCurrentNav, showToast } = useApp();
  const plan = treatmentPlans[0];

  const handleStageClick = (stageNum: number) => {
    showToast(`Stage ${stageNum} details opened. Clinical records mapped.`, 'info');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
              Active Treatment Plan #{plan.id}
            </span>
            <span className="text-xs text-slate-400">Patient: {plan.patientName}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {plan.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Target tooth: <span className="font-bold text-teal-700">{plan.toothNumber || 'Tooth #30'}</span> • Comprehensive staging protocol
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast("Treatment plan PDF generated and ready for print", 'success')}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-bold transition-all"
          >
            <Download className="w-4 h-4" />
            Export Plan
          </button>
          <button
            onClick={() => setCurrentNav('billing')}
            className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm shadow-teal-600/25"
          >
            <CreditCard className="w-4 h-4" />
            Billing Breakdown
          </button>
        </div>
      </div>

      {/* Financial & Time Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-soft">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Estimated Total
          </span>
          <div className="text-2xl font-black text-slate-900">
            ₹{plan.estimatedCost.toLocaleString()}
          </div>
          <span className="text-xs text-teal-700 font-semibold mt-0.5 block">
            Covers 4 clinical phases
          </span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-soft">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Insurance Coverage
          </span>
          <div className="text-2xl font-black text-emerald-600">
            ₹{plan.insuranceCovered.toLocaleString()}
          </div>
          <span className="text-xs text-slate-500 font-medium mt-0.5 block">
            Pre-approved via MediShield
          </span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-soft">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Patient Co-Pay
          </span>
          <div className="text-2xl font-black text-amber-600">
            ₹{plan.outOfPocket.toLocaleString()}
          </div>
          <span className="text-xs text-slate-500 font-medium mt-0.5 block">
            ₹3,000 paid at check-in
          </span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-soft">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Expected Duration
          </span>
          <div className="text-2xl font-black text-slate-900">
            {plan.expectedDuration.split(' ')[0]} {plan.expectedDuration.split(' ')[1]}
          </div>
          <span className="text-xs text-slate-500 font-medium mt-0.5 block">
            {plan.appointmentsRequired} appointments required
          </span>
        </div>
      </div>

      {/* Visual Timeline & Stages */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft p-6 sm:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <GitFork className="w-5 h-5 text-teal-600" />
              Sequential Treatment Stages
            </h2>
            <p className="text-xs text-slate-500">
              Structured clinical workflow with milestone completions
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-black bg-teal-100 text-teal-800">
            Stage 2 of 4 Active
          </span>
        </div>

        {/* Visual Flow Timeline */}
        <div className="relative pl-6 sm:pl-10 space-y-8 border-l-2 border-slate-200 ml-4 sm:ml-6">
          {plan.stages.map((stage) => {
            const isCompleted = stage.status === 'Completed';
            const isUpcoming = stage.status === 'Upcoming';
            const isPending = stage.status === 'Pending';

            return (
              <div 
                key={stage.number} 
                onClick={() => handleStageClick(stage.number)}
                className="relative group cursor-pointer"
              >
                {/* Milestone Node */}
                <div className={`absolute -left-[35px] sm:-left-[51px] top-1 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm transition-all ${
                  isCompleted 
                    ? 'bg-emerald-500 text-white ring-4 ring-emerald-100' 
                    : isUpcoming
                    ? 'bg-teal-600 text-white ring-4 ring-teal-100 animate-pulse'
                    : 'bg-slate-200 text-slate-600 ring-4 ring-slate-100'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : stage.number}
                </div>

                {/* Stage Content Card */}
                <div className={`p-5 rounded-2xl border transition-all ${
                  isUpcoming
                    ? 'bg-teal-50/50 border-teal-300 ring-2 ring-teal-200/60 shadow-soft'
                    : isCompleted
                    ? 'bg-slate-50/80 border-slate-200 hover:bg-slate-100'
                    : 'bg-white border-slate-200 hover:bg-slate-50 opacity-80'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold text-slate-400">
                        STAGE 0{stage.number}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900">
                        {stage.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                        isCompleted
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : isUpcoming
                          ? 'bg-teal-100 text-teal-800 border-teal-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {stage.status}
                      </span>
                      {stage.scheduledDate && (
                        <span className="text-xs font-medium text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {stage.scheduledDate}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {stage.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Stage Estimate:</span>
                    <span className="font-extrabold text-slate-800">₹{stage.cost.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

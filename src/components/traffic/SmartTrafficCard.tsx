import React from 'react';
import { Navigation, Clock, Car, MapPin, AlertCircle, Calendar } from 'lucide-react';
import { Appointment } from '../../types';

interface SmartTrafficCardProps {
  appointment?: Appointment;
  compact?: boolean;
}

export const SmartTrafficCard: React.FC<SmartTrafficCardProps> = ({ appointment, compact = false }) => {
  const docName = appointment?.doctorName || 'Dr. Priya Mehta';
  const time = appointment?.time || '5:00 PM';
  const clinic = 'SmileCare Dental Clinic & Implant Center';
  const traffic = appointment?.trafficInfo?.status || 'Moderate';
  const travelTime = appointment?.trafficInfo?.duration || '38 min';
  const departureTime = appointment?.trafficInfo?.recommendedDeparture || '4:10 PM';

  return (
    <div className={`relative overflow-hidden rounded-2xl border transition-all duration-200 ${
      compact 
        ? 'p-4 bg-gradient-to-br from-teal-900/5 via-white to-slate-50 border-teal-200/80 shadow-sm' 
        : 'p-6 bg-white border-slate-200/80 shadow-card'
    }`}>
      {/* Subtle indicator bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 via-emerald-500 to-sky-500" />

      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
              Smart Travel Intelligence
            </span>
            <span className="text-xs text-slate-400">Live Traffic Feed</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            Your appointment with {docName}
          </h3>
          <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            Today, {time} • {clinic}
          </p>
        </div>

        <div className="hidden sm:flex flex-col items-end text-right">
          <span className="text-xs text-slate-500">Live Status</span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 mt-0.5">
            <Car className="w-3.5 h-3.5 text-amber-600" />
            {traffic} Traffic
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50/80 rounded-xl border border-slate-100 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Est. Travel Time</div>
            <div className="text-sm font-bold text-slate-800">{travelTime}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Recommended Departure</div>
            <div className="text-sm font-extrabold text-teal-700">Leave by {departureTime}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Clinic Destination</div>
            <div className="text-sm font-semibold text-slate-800 truncate">14.2 km (Via Western Exp)</div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <AlertCircle className="w-3.5 h-3.5 text-teal-600" />
          <span>Buffer includes 10 min parking & receptionist check-in.</span>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => window.open('https://maps.google.com', '_blank')}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-xl transition-all shadow-sm shadow-teal-600/20"
          >
            <Navigation className="w-4 h-4" />
            Get Directions
          </button>
        </div>
      </div>
    </div>
  );
};

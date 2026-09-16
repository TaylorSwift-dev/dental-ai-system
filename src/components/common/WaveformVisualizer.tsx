import React from 'react';
import { VoiceState } from '../../types';

interface WaveformVisualizerProps {
  state: VoiceState;
  barCount?: number;
  className?: string;
}

export const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({ 
  state, 
  barCount = 14, 
  className = '' 
}) => {
  const isListening = state === 'listening';
  const isProcessing = state === 'processing';
  const isResponding = state === 'responding';

  return (
    <div className={`flex items-center justify-center gap-1.5 h-10 px-3 ${className}`}>
      {Array.from({ length: barCount }).map((_, i) => {
        let heightClass = 'h-1.5 opacity-30';
        let bgClass = 'bg-teal-500';
        let animStyle = {};

        if (isListening) {
          bgClass = 'bg-teal-600';
          const randomDelays = [0.1, 0.25, 0.15, 0.35, 0.05, 0.2, 0.3, 0.12, 0.22, 0.18, 0.28, 0.08, 0.14, 0.26];
          const delay = randomDelays[i % randomDelays.length];
          const duration = 0.6 + (i % 5) * 0.15;
          animStyle = {
            animation: `voiceWave ${duration}s ease-in-out infinite alternate ${delay}s`,
            height: `${25 + ((i * 17) % 65)}%`
          };
          heightClass = 'w-1 rounded-full';
        } else if (isProcessing) {
          bgClass = 'bg-amber-500';
          animStyle = {
            animation: `pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite ${i * 0.08}s`,
            height: '45%'
          };
          heightClass = 'w-1 rounded-full';
        } else if (isResponding) {
          bgClass = 'bg-sky-500';
          animStyle = {
            animation: `voiceWave 0.8s ease-in-out infinite alternate ${i * 0.05}s`,
            height: `${30 + ((i * 23) % 55)}%`
          };
          heightClass = 'w-1 rounded-full';
        } else if (state === 'completed') {
          bgClass = 'bg-emerald-500';
          heightClass = 'h-3 w-1 rounded-full opacity-80';
        }

        return (
          <div
            key={i}
            className={`transition-all duration-300 ${heightClass} ${bgClass}`}
            style={animStyle}
          />
        );
      })}
    </div>
  );
};

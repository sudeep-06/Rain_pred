import React from 'react';

export default function ProbabilityGauge({ probability, prediction, confidence }) {
  // SVG Arc Math for a full 360 degree circle
  const radius = 45;
  const circumference = 2 * Math.PI * radius; // ~282.74
  const strokeDashoffset = circumference - (probability / 100) * circumference;

  // Determine dynamic gradient stops and badge styles based on prediction/probability
  let gradientStops = {
    start: '#2dd4bf', // Teal-400
    end: '#0d9488'    // Teal-600
  };
  let badgeClasses = 'bg-slate-100 border-slate-200 text-slate-600';
  let badgeText = 'No Precipitation';
  let ratingText = 'Low Risk';

  if (prediction === 'Heavy Rain') {
    gradientStops = { start: '#f87171', end: '#dc2626' }; // Red-400 to Red-600
    badgeClasses = 'bg-red-100 border border-red-200 text-red-600';
    badgeText = 'Heavy Rain Frontal Activity';
    ratingText = 'Severe Risk';
  } else if (prediction === 'Moderate Rain') {
    gradientStops = { start: '#FCD34D', end: '#F97316' }; // Yellow-300 to Orange-500 (matches Stitch design)
    badgeClasses = 'bg-orange-100 border border-orange-200 text-orange-600';
    badgeText = 'Moderate Showers Expected';
    ratingText = 'Elevated Risk';
  } else if (prediction === 'Light Rain') {
    gradientStops = { start: '#38bdf8', end: '#0284c7' }; // Sky-400 to Sky-600
    badgeClasses = 'bg-sky-100 border border-sky-200 text-sky-600';
    badgeText = 'Light Transient Drizzle';
    ratingText = 'Moderate Risk';
  } else {
    // No Rain
    gradientStops = { start: '#2dd4bf', end: '#0d9488' }; // Teal
    badgeClasses = 'bg-teal-100 border border-teal-200 text-teal-700';
    badgeText = 'No Atmospheric Moisture';
    ratingText = 'Stable Air';
  }

  return (
    <div className="glass p-8 rounded-2xl flex flex-col items-center justify-start relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-100/30"></div>
      
      <h3 className="absolute top-6 left-6 font-label-md text-label-md text-on-surface flex items-center gap-2 font-bold">
        <span className={`w-2 h-2 rounded-full animate-pulse ${
          prediction === 'Heavy Rain' ? 'bg-red-500' : prediction === 'Moderate Rain' ? 'bg-orange-500' : 'bg-teal-500'
        }`}></span>
        Inference Score Output
      </h3>

      {/* SVG Circle Gauge */}
      <div className="relative w-64 h-64 flex items-center justify-center mt-4">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background Track */}
          <circle 
            cx="50" 
            cy="50" 
            fill="none" 
            r={radius} 
            stroke="rgba(15, 23, 42, 0.05)" 
            strokeLinecap="round" 
            strokeWidth="6"
          ></circle>

          {/* Progress Track Linear Gradient */}
          <defs>
            <linearGradient id="gauge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradientStops.start}></stop>
              <stop offset="100%" stopColor={gradientStops.end}></stop>
            </linearGradient>
          </defs>

          {/* Active Progress Circle */}
          <circle 
            className="gauge-ring" 
            cx="50" 
            cy="50" 
            fill="none" 
            r={radius} 
            stroke="url(#gauge-grad)" 
            strokeLinecap="round" 
            strokeWidth="8" 
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
              filter: `drop-shadow(0 0 8px ${prediction === 'Heavy Rain' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(251, 146, 60, 0.4)'})`
            }}
          ></circle>
        </svg>

        {/* Center Labels */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[56px] font-bold leading-none text-on-surface">
            {probability}
            <span className="text-headline-md font-normal text-on-surface-variant opacity-70">%</span>
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold uppercase tracking-[0.2em] mt-2">
            Rain Probability
          </span>
          <div className={`mt-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${badgeClasses}`}>
            {prediction}
          </div>
        </div>
      </div>

      {/* Model Confidence Meter */}
      <div className="mt-12 w-full max-w-md text-center space-y-4">
        <div className="flex justify-between items-center px-1">
          <span className="text-label-sm font-label-sm text-on-surface-variant font-medium">Model Confidence</span>
          <span className="text-label-sm font-label-sm text-tertiary font-bold">{confidence}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-200/60 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-tertiary/50 via-tertiary to-teal-500 shadow-sm transition-all duration-1000" 
            style={{ width: `${confidence}%` }}
          ></div>
        </div>
        <p className="text-[11px] text-on-surface-variant/80 font-label-sm italic">
          Classification: {badgeText} ({ratingText}).
        </p>
      </div>
    </div>
  );
}

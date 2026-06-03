import React from 'react';
import { 
  Thermometer, 
  Droplets, 
  Gauge, 
  Wind, 
  Cloud, 
  CloudRain, 
  Sun, 
  Waves,
  HelpCircle 
} from 'lucide-react';

const iconMap = {
  temperature: Thermometer,
  humidity: Droplets,
  pressure: Gauge,
  windSpeed: Wind,
  cloudCover: Cloud,
  dewPoint: CloudRain,
  sunshine: Sun,
  evaporation: Waves
};

export default function ParameterSlider({
  name,
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  description,
  onChange,
  hasWarning = false,
  warningMsg = ""
}) {
  const IconComponent = iconMap[name] || HelpCircle;

  return (
    <div className={`space-y-2 transition-all duration-200 p-2.5 rounded-xl border ${
      hasWarning ? 'border-amber-300 bg-amber-500/5' : 'border-transparent hover:bg-slate-900/5'
    }`}>
      <div className="flex justify-between items-end">
        <label className="font-label-sm text-label-sm text-on-surface font-semibold flex items-center gap-2 group-hover:text-tertiary transition-colors">
          <IconComponent 
            size={16} 
            className={hasWarning ? 'text-amber-500' : 'text-tertiary'} 
          />
          <span className="leading-none">{label}</span>
          {description && (
            <span 
              className="text-on-surface-variant/40 hover:text-on-surface-variant/80 cursor-help" 
              title={description}
            >
              <HelpCircle size={12} />
            </span>
          )}
        </label>
        
        <span className={`px-2 py-0.5 rounded font-label-md text-label-md font-bold shadow-sm ${
          hasWarning 
            ? 'bg-amber-100 text-amber-700 border border-amber-200' 
            : 'bg-tertiary/10 text-tertiary'
        }`}>
          {value} {unit}
        </span>
      </div>

      <input
        type="range"
        className="w-full cursor-pointer accent-tertiary"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(name, Number(e.target.value))}
      />

      <div className="flex justify-between text-[10px] text-on-surface-variant/60 font-medium">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>

      {hasWarning && (
        <div className="text-[10px] text-amber-600 font-semibold flex items-center gap-1.5 mt-1">
          <span className="material-symbols-outlined text-xs leading-none">warning</span>
          <span>{warningMsg}</span>
        </div>
      )}
    </div>
  );
}

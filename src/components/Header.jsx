import React, { useState, useEffect } from 'react';

export default function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 shrink-0 flex items-center justify-between px-gutter bg-white/30 backdrop-blur-md border-b border-white/50 z-40 shadow-sm">
      <div className="flex items-center gap-8">
        <h2 className="font-display-lg text-[20px] font-bold text-on-surface tracking-tight">RainPredict</h2>
        <nav className="flex gap-6">
          <a className="font-label-md text-label-md text-tertiary border-b-2 border-tertiary pb-1" href="#">Analysis</a>
          <a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#">Models</a>
          <a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#">Global Map</a>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {/* Real-time Inference Clock */}
        <div className="flex items-center gap-2 font-label-sm text-[11px] text-on-surface-variant/70">
          <span>INFERENCE:</span>
          <span className="text-tertiary font-bold">{time.toLocaleTimeString()}</span>
        </div>

        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
          <input 
            className="bg-white/50 border border-slate-200 rounded-full py-1.5 pl-9 pr-4 text-label-sm font-label-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-tertiary/30 w-64 transition-all duration-300" 
            placeholder="Search region..." 
            type="text"
          />
        </div>

        <button className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-tertiary transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>

        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-tertiary to-teal-400 flex items-center justify-center text-white font-bold text-[12px] cursor-pointer shadow-sm">
          JD
        </div>
      </div>
    </header>
  );
}

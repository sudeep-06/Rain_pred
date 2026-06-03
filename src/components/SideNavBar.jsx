import React, { useState, useEffect } from 'react';

export default function SideNavBar() {
  const [ingestionTimeLeft, setIngestionTimeLeft] = useState({ minutes: 4, seconds: 12 });

  // Countdown timer simulation for weather data ingestion
  useEffect(() => {
    const interval = setInterval(() => {
      setIngestionTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          return { minutes: 5, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (t) => {
    return `${t.minutes}m ${t.seconds < 10 ? '0' : ''}${t.seconds}s`;
  };

  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 flex flex-col p-gutter bg-white/40 backdrop-blur-xl border-r border-white/50 shadow-lg z-50">
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined text-headline-md" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_done</span>
          </div>
          <div>
            <h1 class="text-body-lg font-bold text-on-surface leading-tight">RainPredict v1.4</h1>
            <p class="font-label-sm text-label-sm text-on-surface-variant opacity-80">Explainable ML Pipeline</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        <a className="flex items-center gap-3 px-4 py-3 text-tertiary font-bold bg-tertiary/10 rounded-lg shadow-sm transition-all duration-200" href="#">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-label-md text-label-md">Dashboard</span>
        </a>
      </nav>

      <div className="mt-auto space-y-4">
        <div className="p-4 rounded-xl bg-white/50 border border-white/60 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-sm text-label-sm text-tertiary">Forecast Up to Date</span>
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
          </div>
          <div className="text-[10px] text-on-surface-variant/80 font-label-sm leading-tight">
            Next ingestion in {formatTime(ingestionTimeLeft)}
          </div>
        </div>
      </div>
    </aside>
  );
}

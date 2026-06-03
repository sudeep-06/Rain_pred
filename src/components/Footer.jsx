import React from 'react';

export default function Footer() {
  return (
    <footer className="h-12 shrink-0 flex items-center justify-between px-gutter bg-white/50 backdrop-blur-lg border-t border-white/60 z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
      <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
        © {new Date().getFullYear()} Meteorological AI Division. RainPredict Explainer System.
      </span>
      <div className="flex gap-6">
        <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors font-medium" href="#">Documentation</a>
        <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors font-medium" href="#">Privacy Policy</a>
        <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors font-medium" href="#">Model Ethics</a>
      </div>
    </footer>
  );
}

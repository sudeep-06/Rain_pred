import React from 'react';

export default function ShapChart({ shapValues, baseline, probability }) {
  // Find maximum absolute value to scale the bars proportionally
  const maxVal = Math.max(...shapValues.map(s => Math.abs(s.value)), 10);

  return (
    <div className="glass p-6 rounded-2xl h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-3 h-3 bg-purple-500 rounded-sm shadow-sm"></span>
        <h3 className="font-headline-md text-[18px] text-on-surface font-bold">SHAP Feature Impact Attribution</h3>
      </div>
      
      <p className="text-on-surface-variant text-label-sm font-label-sm mb-6 leading-relaxed">
        Shows how each metric pushes the prediction away from the <span className="text-on-surface font-bold">{baseline}% baseline</span>.
      </p>

      {/* Model Baseline/Prediction Summary Box */}
      <div className="bg-slate-900/5 border border-dashed border-slate-200/80 p-3.5 rounded-xl flex justify-between items-center text-label-sm font-medium mb-6">
        <div className="flex flex-col gap-0.5">
          <span className="text-on-surface-variant/60 text-[10px] uppercase font-bold tracking-wider">Model Baseline</span>
          <span className="font-semibold text-on-surface">{baseline}.0% Probability</span>
        </div>
        <div className="h-6 w-px bg-slate-300"></div>
        <div className="flex flex-col gap-0.5 items-end">
          <span className="text-on-surface-variant/60 text-[10px] uppercase font-bold tracking-wider">Model Prediction</span>
          <span className={`font-bold ${probability >= 45 ? 'text-error' : 'text-tertiary'}`}>
            {probability}.0% Probability
          </span>
        </div>
      </div>

      {/* SHAP Bars Container */}
      <div className="flex-1 flex flex-col gap-5">
        {/* Alignment labels */}
        <div className="flex justify-between text-[10px] text-on-surface-variant/60 font-bold uppercase tracking-wider border-b border-slate-200/60 pb-1.5 mb-1">
          <span className="text-tertiary flex items-center gap-1">
            ← Inhibits (-SHAP)
          </span>
          <span>Baseline (0)</span>
          <span className="text-error flex items-center gap-1">
            Promotes (+SHAP) →
          </span>
        </div>

        {shapValues.map((item) => {
          const val = item.value;
          const absVal = Math.abs(val);
          // Scale absolute value to max 45% track width
          const barWidth = (absVal / maxVal) * 45; 
          const isPositive = val >= 0;

          return (
            <div key={item.feature} className="space-y-1.5">
              <div className="flex justify-between items-center text-label-sm font-label-sm">
                <span className="text-on-surface-variant font-medium">{item.label}</span>
                <span className={`font-semibold ${isPositive ? 'text-error' : 'text-tertiary'}`}>
                  {isPositive ? `+${val.toFixed(1)}%` : `${val.toFixed(1)}%`}
                </span>
              </div>

              {/* Bar Track with Center Line */}
              <div className="h-2 w-full bg-slate-200/60 rounded-full overflow-hidden flex shimmer relative">
                {/* Zero Divider line in the center */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-300 z-10"></div>

                {/* Positive contribution bar (extends right) */}
                {isPositive ? (
                  <>
                    <div className="h-full bg-transparent" style={{ width: '50%' }}></div>
                    <div className="h-full bg-error" style={{ width: `${barWidth}%` }}></div>
                    <div className="h-full bg-transparent" style={{ width: `${50 - barWidth}%` }}></div>
                  </>
                ) : (
                  /* Negative contribution bar (extends left) */
                  <>
                    <div className="h-full bg-transparent" style={{ width: `${50 - barWidth}%` }}></div>
                    <div className="h-full bg-tertiary" style={{ width: `${barWidth}%` }}></div>
                    <div className="h-full bg-transparent" style={{ width: '50%' }}></div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend Footer */}
      <div className="mt-auto pt-6 flex justify-between items-center border-t border-slate-200">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-error"></span>
          <span className="text-[10px] text-on-surface-variant font-label-sm uppercase tracking-wider font-semibold">Increases Probability</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-tertiary"></span>
          <span className="text-[10px] text-on-surface-variant font-label-sm uppercase tracking-wider font-semibold">Inhibits Precipitation</span>
        </div>
      </div>
    </div>
  );
}

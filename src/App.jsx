import { useState, useEffect, useRef } from 'react';
import SideNavBar from './components/SideNavBar';
import ParameterSlider from './components/ParameterSlider';
import ProbabilityGauge from './components/ProbabilityGauge';
import ShapChart from './components/ShapChart';
import { predictRain } from './predictor';
import { Play, RefreshCw } from 'lucide-react';

const INITIAL_PARAMS = {
  temperature: 25,
  humidity: 76,
  pressure: 1008,
  windSpeed: 12,
  cloudCover: 44,
  dewPoint: 14,
  sunshine: 6.5,
  evaporation: 4.2
};

export default function App() {
  const [params, setParams] = useState(INITIAL_PARAMS);
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionData, setPredictionData] = useState(null);
  const [parametersDirty, setParametersDirty] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationFrameId;
    const particles = [];
    const particleCount = 60;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.init(); }
      init() {
        this.x = Math.random() * width;
        this.y = Math.random() * height - height;
        this.length = Math.random() * 20 + 10;
        this.speed = Math.random() * 5 + 3;
        this.opacity = Math.random() * 0.2 + 0.1;
      }
      draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + 1, this.y + this.length);
        ctx.strokeStyle = `rgba(148, 163, 184, ${this.opacity})`;
        ctx.stroke();
      }
      update() {
        this.y += this.speed;
        if (this.y > height) this.init();
      }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => { p.update(); p.draw(); });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => { handleRunPrediction(true); }, []);

  const handleParamChange = (name, value) => {
    setParams((prev) => ({ ...prev, [name]: value }));
    setParametersDirty(true);
  };

  const handleReset = () => {
    setParams(INITIAL_PARAMS);
    setParametersDirty(true);
  };

  const handleRunPrediction = (isInitial = false) => {
    setIsPredicting(true);
    setParametersDirty(false);

    const result = predictRain(params);

    setTimeout(() => {
      setPredictionData(result);
      setIsPredicting(false);
    }, isInitial ? 50 : 800);
  };

  const dewPointConflict = params.dewPoint > params.temperature;

  return (
    // ✅ FIX 1: Root is flex row, full viewport, no overflow-hidden
    <div className="flex w-screen h-screen relative">
      <canvas ref={canvasRef} id="rain" className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
      <div className="aurora" />

      {/* Sidebar — fixed width, full height */}
      <SideNavBar />

      {/* ✅ FIX 2: Right column scrolls; does NOT stretch to force height */}
      <div className="flex-1 min-w-0 flex flex-col relative z-10 overflow-y-auto">

        {/* ✅ FIX 3: main is NOT flex-1, just auto height so it wraps content */}
        <main className="p-gutter custom-scrollbar">

          {/* ✅ FIX 4: dashboard-panels uses align-items: start so panels don't stretch */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.5rem',
              alignItems: 'start',
              width: '100%',
              paddingBottom: '1.5rem',
            }}
          >

            {/* Panel 1: Meteorological Features */}
            <div className="glass p-6 rounded-2xl flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-md text-[18px] text-on-surface flex items-center gap-2 font-bold">
                  <span className="material-symbols-outlined text-tertiary">analytics</span>
                  Meteorological Features
                </h3>
                <button
                  onClick={handleReset}
                  className="text-label-sm font-label-sm text-tertiary/80 hover:text-tertiary transition-colors uppercase tracking-widest font-semibold flex items-center gap-1"
                >
                  <RefreshCw size={12} />
                  Reset
                </button>
              </div>

              <p className="text-on-surface-variant text-label-sm font-label-sm leading-relaxed">
                Adjust parameters to simulate regional micro-climates and model response.
              </p>

              <div className="space-y-4 pr-1">
                <ParameterSlider name="temperature" label="Air Temperature" value={params.temperature} min={-10} max={50} unit="°C" description="Ambient air temperature at ground station level." onChange={handleParamChange} />
                <ParameterSlider name="humidity" label="Relative Humidity" value={params.humidity} min={0} max={100} unit="%" description="Percentage of moisture currently held by the atmosphere compared to saturation level." onChange={handleParamChange} />
                <ParameterSlider name="pressure" label="Atmospheric Pressure" value={params.pressure} min={950} max={1050} unit="hPa" description="Barometric pressure at sea level. Stable trends usually lie around 1013 hPa." onChange={handleParamChange} />
                <ParameterSlider name="windSpeed" label="Wind Velocity" value={params.windSpeed} min={0} max={120} unit="km/h" description="Average surface level wind velocity over a 10-minute interval." onChange={handleParamChange} />
                <ParameterSlider name="cloudCover" label="Cloud Coverage" value={params.cloudCover} min={0} max={100} unit="%" description="The fraction of the sky covered by clouds." onChange={handleParamChange} />
                <ParameterSlider name="dewPoint" label="Atmospheric Dew Point" value={params.dewPoint} min={-20} max={30} unit="°C" description="The temperature air must be cooled to in order to reach condensation saturation." onChange={handleParamChange} hasWarning={dewPointConflict} warningMsg={`Dew point is restricted by ambient temperature. Cap will apply at ${params.temperature}°C.`} />
                <ParameterSlider name="sunshine" label="Sunshine Duration" value={params.sunshine} min={0} max={14} step={0.1} unit="hrs" description="Daily solar exposure interval. High hours represent cloud-free daytime cycles." onChange={handleParamChange} />
                <ParameterSlider name="evaporation" label="Evaporation Rate" value={params.evaporation} min={0} max={20} step={0.1} unit="mm" description="Daily water depth evaporated from soils into the atmosphere." onChange={handleParamChange} />
              </div>

              <button
                disabled={isPredicting}
                onClick={() => handleRunPrediction()}
                className={`w-full py-4.5 rounded-xl text-[15px] font-bold tracking-wider transition-all duration-300 flex justify-center items-center gap-2.5 shadow-sm border ${parametersDirty
                    ? 'bg-gradient-to-r from-tertiary to-teal-600 text-white hover:from-teal-600 hover:to-tertiary shadow-md hover:-translate-y-0.5 border-transparent'
                    : 'bg-white/50 border-slate-200 text-on-surface-variant cursor-default'
                  }`}
              >
                {isPredicting ? (
                  <><div className="loader-spinner" /><span>Inference Running...</span></>
                ) : (
                  <><Play size={16} fill="currentColor" /><span>{parametersDirty ? 'Update Rain Forecast' : 'Forecast Up to Date'}</span></>
                )}
              </button>
            </div>

            {/* Panel 2: Inference Output + Advisory */}
            <div className="flex flex-col gap-4">
              {isPredicting ? (
                <div className="glass p-8 rounded-2xl flex flex-col items-center justify-center gap-5">
                  <div className="w-16 h-16 rounded-full border-[3px] border-tertiary/10 border-t-tertiary animate-spin shadow-sm" />
                  <div className="text-center space-y-2">
                    <h3 className="font-headline-md text-lg text-on-surface font-semibold">Analyzing Atmospheric Conditions</h3>
                    <p className="text-sm text-on-surface-variant max-w-[300px] leading-relaxed">
                      Evaluating cloud fronts, dew-point matrices, and barometric depression gradients...
                    </p>
                  </div>
                </div>
              ) : predictionData ? (
                <>
                  <ProbabilityGauge
                    probability={predictionData.probability}
                    prediction={predictionData.prediction}
                    confidence={predictionData.confidence}
                  />
                  <div className="glass p-6 rounded-2xl border-l-4 border-l-tertiary bg-tertiary/5 flex flex-col gap-3">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-tertiary border border-tertiary/10">
                        <span className="material-symbols-outlined">info</span>
                      </div>
                      <div className="space-y-2 flex-1">
                        <h4 className="font-label-md text-label-md text-on-surface font-bold">Meteorologist Advisory & Logic Explanation</h4>
                        <p className="text-body-md text-on-surface-variant leading-relaxed text-sm">{predictionData.recommendation}</p>
                      </div>
                    </div>
                    <div className="flex gap-6 pt-3 border-t border-slate-200/50 text-[11px] font-label-sm text-on-surface-variant font-semibold uppercase">
                      <span>Pressure State: <span className="text-error font-bold">{predictionData.metadata.pressureStatus}</span></span>
                      <span>Dew Point: <span className="text-tertiary font-bold">{Math.min(params.dewPoint, params.temperature)}°C</span></span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="glass p-8 rounded-2xl flex items-center justify-center text-on-surface-variant text-center">
                  <p>Configure parameters and run the forecast model to view diagnostic assessments.</p>
                </div>
              )}
            </div>

            {/* Panel 3: SHAP Feature Impact */}
            <div>
              {predictionData ? (
                <ShapChart
                  shapValues={predictionData.shapValues}
                  baseline={predictionData.baseline}
                  probability={predictionData.probability}
                />
              ) : (
                <div className="glass p-8 rounded-2xl flex items-center justify-center text-on-surface-variant text-center">
                  <p>Awaiting model inference data to map attributions...</p>
                </div>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
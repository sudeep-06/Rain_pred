import React, { useState } from 'react';
import { Database, Cpu, Layers, BarChart3, CloudLightning, ArrowRight } from 'lucide-react';

export default function MlPipeline() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: 'Data Collection',
      icon: Database,
      color: 'var(--color-rain)',
      features: 'Temp · Humidity · Pressure · Wind · Clouds · Dew Point',
      details: 'Ingests real-time meteorological observations from automated weather stations or public API sources (OpenWeatherMap, NOAA, ERA5). Raw attributes represent high-frequency atmospheric measures.'
    },
    {
      id: 1,
      title: 'Feature Engineering',
      icon: Layers,
      color: 'var(--color-cloud)',
      features: 'Normalize · Correlate · Lag features · SHAP prep',
      details: 'Calculates physical parameters like Dew Point Depression ($T - T_{dew}$). Normalizes numeric values with MinMaxScaler and constructs temporal lag arrays to capture falling pressure trends.'
    },
    {
      id: 2,
      title: 'ML Model Inference',
      icon: Cpu,
      color: 'var(--color-success)',
      features: 'Random Forest / XGBoost / LSTM inference',
      details: 'Evaluates parameters against a trained ensemble model (Random Forest / XGBoost). Trees vote on split criteria (e.g. pressure < 1008hPa & humidity > 78%) to return raw prediction logits.'
    },
    {
      id: 3,
      title: 'Probability Score',
      icon: BarChart3,
      color: 'var(--color-warning)',
      features: 'Calibrated 0-100% · SHAP factor weights',
      details: 'Converts raw ensemble decision boundaries to calibrated frequencies via Isotonic Regression, ensuring that a 70% model output equals a 70% real-world rain likelihood.'
    },
    {
      id: 4,
      title: 'Prediction Output',
      icon: CloudLightning,
      color: 'var(--color-error)',
      features: 'No Rain · Light · Moderate · Heavy Rain',
      details: 'Maps calibrated probabilities to categorical warnings (None to Heavy Rain) and packages the SHAP feature attributions into API payloads for the dashboard.'
    }
  ];

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{
          fontSize: '1.1rem',
          color: 'var(--text-primary)',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{
            width: '6px',
            height: '16px',
            borderRadius: '3px',
            background: 'linear-gradient(180deg, var(--color-rain), var(--color-cloud))',
            boxShadow: '0 0 8px var(--color-rain-glow)'
          }}></span>
          ML Pipeline & Infrastructure Details
        </h3>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Interactive overview of the production-grade pipeline. Click on any stage to see its execution logic.
        </p>
      </div>

      {/* Steps Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        padding: '12px 0'
      }}>
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          const isActive = activeStep === step.id;

          return (
            <React.Fragment key={step.id}>
              <div 
                onClick={() => setActiveStep(step.id)}
                className={`pipeline-step ${isActive ? 'active' : ''}`}
                style={{
                  flex: '1 1 170px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  minHeight: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '14px',
                  borderRadius: '12px',
                  border: isActive ? `1.5px solid ${step.color}` : '1px solid rgba(255, 255, 255, 0.05)',
                  background: isActive ? `rgba(255, 255, 255, 0.02)` : 'rgba(0, 0, 0, 0.1)',
                  boxShadow: isActive ? `0 0 15px rgba(255,255,255,0.02)` : 'none',
                  transform: isActive ? 'scale(1.03)' : 'none',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: isActive ? step.color : 'rgba(255, 255, 255, 0.04)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '8px',
                  color: isActive ? '#000000' : 'var(--text-secondary)',
                  transition: 'all var(--transition-fast)',
                  boxShadow: isActive ? `0 0 10px ${step.color}` : 'none'
                }}>
                  <StepIcon size={18} />
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                  {step.title}
                </span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.2 }}>
                  {step.features.split(' · ').slice(0, 2).join(' · ')}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <ArrowRight 
                  size={14} 
                  style={{
                    color: 'var(--text-muted)',
                    opacity: 0.4,
                    display: 'none' // Hidden on narrow screens, shown via flex-row gaps in desktop. Will show flex layout helper.
                  }}
                  className="pipeline-arrow"
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Active Stage Detailed Panel */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.015)',
        border: '1px solid rgba(255, 255, 255, 0.04)',
        borderRadius: '12px',
        padding: '16px',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            color: steps[activeStep].color,
            border: `1px solid ${steps[activeStep].color}`,
            padding: '2px 6px',
            borderRadius: '4px'
          }}>
            Stage {activeStep + 1}
          </span>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>
            {steps[activeStep].title} Process
          </h4>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
          {steps[activeStep].details}
        </p>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.03)', paddingTop: '8px' }}>
          <strong>Feature set:</strong> <span style={{ color: 'var(--text-primary)' }}>{steps[activeStep].features}</span>
        </div>
      </div>

      {/* Production KPIs Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '16px',
        marginTop: '8px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        paddingTop: '20px'
      }}>
        {[
          { label: 'Typical Accuracy (RF)', val: '87%' },
          { label: 'Input Feature Count', val: '8' },
          { label: 'Output Classes', val: '4' },
          { label: 'Inference Latency', val: '~50ms' }
        ].map((kpi, idx) => (
          <div key={idx} style={{
            background: 'rgba(255, 255, 255, 0.01)',
            border: '1px solid rgba(255, 255, 255, 0.03)',
            borderRadius: '10px',
            padding: '12px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              color: 'var(--text-primary)'
            }}>
              {kpi.val}
            </div>
            <div style={{
              fontSize: '0.7rem',
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginTop: '4px'
            }}>
              {kpi.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

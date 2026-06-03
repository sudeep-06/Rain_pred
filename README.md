# RainPredict v1.4

An explainable machine learning dashboard for rainfall probability forecasting using meteorological parameters and feature attribution analysis.

## Overview

RainPredict is an interactive weather intelligence dashboard that simulates rainfall prediction based on atmospheric conditions. The application combines a prediction engine, explainable AI visualizations, and a modern analytics interface to help users understand not only the forecast outcome but also the contributing factors behind each prediction.

The system provides:

* Real-time rainfall probability estimation
* Interactive meteorological parameter controls
* Explainable AI (SHAP-style) feature attribution
* Confidence scoring
* Forecast diagnostics and recommendations
* Simulated ML inference workflow
* Modern responsive dashboard UI

---

## Features

### Meteorological Parameter Controls

Users can modify:

* Air Temperature (°C)
* Relative Humidity (%)
* Atmospheric Pressure (hPa)
* Wind Speed (km/h)
* Cloud Cover (%)
* Dew Point (°C)
* Sunshine Duration (hours)
* Evaporation Rate (mm)

Each parameter directly influences the prediction model and updates the forecast output.

### Rainfall Probability Prediction

The system generates:

* Rain Probability (%)
* Forecast Classification
* Confidence Score
* Atmospheric Interpretation

Prediction categories include:

* No Rain
* Light Rain
* Moderate Rain
* Heavy Rain

### Explainable AI

RainPredict includes SHAP-inspired attribution analysis to explain how each weather variable affects the final prediction.

Positive contributions increase rainfall probability while negative contributions suppress precipitation likelihood.

### Meteorologist Advisory

The dashboard automatically generates:

* Atmospheric condition summaries
* Pressure analysis
* Moisture interpretation
* Forecast recommendations

### Interactive Dashboard

The interface includes:

* Sidebar navigation
* Forecast controls
* Probability gauge
* Feature attribution charts
* Simulated API console
* Real-time inference clock

---

## Technology Stack

### Frontend

* React 18
* Vite
* Tailwind CSS
* Lucide React Icons

### Visualization

* SVG-based Probability Gauge
* Custom SHAP Attribution Charts
* Dynamic Atmospheric Metrics

### Styling

* Tailwind CSS
* Custom Design Tokens
* Glassmorphism Components
* Responsive Layout System

---

## Project Structure

```text
RainPredict/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── SideNavBar.jsx
│   │   ├── ParameterSlider.jsx
│   │   ├── ProbabilityGauge.jsx
│   │   ├── ShapChart.jsx
│   │   └── MLPipeline.jsx
│   │
│   ├── predictor.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/rainpredict.git
cd rainpredict
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## Build for Production

Create a production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## Model Logic

The prediction engine evaluates atmospheric variables and estimates precipitation probability using weighted meteorological heuristics.

Key indicators include:

* Humidity
* Cloud Cover
* Pressure Trends
* Dew Point
* Wind Conditions
* Solar Exposure
* Evaporation Activity

The model produces:

```json
{
  "probability": 46,
  "prediction": "Moderate Rain",
  "confidence": 89
}
```

---

## Explainability Layer

The SHAP-inspired attribution engine calculates each feature's contribution toward the final rainfall probability.

Example:

| Feature     | Impact |
| ----------- | ------ |
| Humidity    | +18%   |
| Cloud Cover | +12%   |
| Pressure    | -8%    |
| Sunshine    | -6%    |

This enables transparent and interpretable forecasting decisions.

---

## Future Enhancements

Planned improvements include:

* Live weather API integration
* Historical forecast analytics
* Regional map visualization
* Model comparison dashboard
* Time-series forecasting
* Real SHAP computation
* Deep learning forecasting models
* Multi-location support
* Weather alert notifications

---

## Screenshots

Add screenshots of:

* Dashboard Overview
* Probability Gauge
* SHAP Attribution Analysis
* Forecast Advisory Panel

---

## License

MIT License

Copyright (c) 2025 RainPredict

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files to deal in the Software without restriction.

---

## Author

Sudeep

Student • Builder • Aspiring Founder

---

## Acknowledgments

* React Team
* Vite Team
* Tailwind CSS
* Lucide Icons
* Open Source Community

Built for explainable weather intelligence and interactive machine learning visualization.

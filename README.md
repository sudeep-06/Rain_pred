<div align="center">

# 🌧️ RainPredict

### Interactive rainfall prediction and feature-attribution dashboard

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_App-0ea5a8?style=for-the-badge&logo=vercel&logoColor=white)](https://rain-pred.vercel.app)
[![React](https://img.shields.io/badge/React-19-087ea4?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

**Adjust atmospheric conditions, run a prediction, and explore exactly which features influenced the result.**

</div>

## Overview

RainPredict is a responsive, browser-based rainfall prediction dashboard built with React and Vite. It combines a configurable meteorological interface with a rule-based simulation engine to estimate rainfall probability and present the result in an understandable, explainable format.

The app is designed as an educational and interactive demonstration—not an operational weather forecasting system.

## ✨ Features

- **Interactive meteorological controls** for eight atmospheric variables
- **Rainfall probability gauge** from `0–100%`
- **Four prediction categories:** No Rain, Light Rain, Moderate Rain, and Heavy Rain
- **SHAP-like feature attribution chart** showing how each input affects the forecast
- **Model confidence and meteorological advisories** based on parameter consistency
- **Animated loading states** and a dynamic rain-particle canvas
- **Responsive three-panel dashboard** for desktop and mobile
- **Reset and rerun controls** for rapid experimentation

## 🧩 Atmospheric Inputs

| Parameter | Range | Unit | Role |
|---|---:|---|---|
| Air temperature | −10 to 50 | °C | Convective and evaporation effects |
| Relative humidity | 0 to 100 | % | Atmospheric moisture |
| Atmospheric pressure | 950 to 1050 | hPa | Barometric depression or stability |
| Wind velocity | 0 to 120 | km/h | Front movement and moisture dynamics |
| Cloud coverage | 0 to 100 | % | Visible cloud fraction |
| Dew point | −20 to 30 | °C | Saturation and condensation potential |
| Sunshine duration | 0 to 14 | hours | Reduced precipitation signal |
| Evaporation rate | 0 to 20 | mm | Moisture and convective activity |

The interface also validates physically unrealistic dew-point values by limiting the dew point to the current air temperature during calculation.

## 🧠 How the Prediction Works

RainPredict begins with a **25% baseline probability** and calculates feature contributions for:

- Relative humidity
- Atmospheric pressure
- Dew-point saturation
- Cloud coverage
- Sunshine duration
- Wind dynamics
- Evapotranspiration

The contributions are combined with the baseline and clamped to a range of `0–100%`. Feature attributions are normalized so that they sum to the final change from the baseline.

| Probability | Category |
|---:|---|
| 75–100% | Heavy Rain |
| 45–74% | Moderate Rain |
| 20–44% | Light Rain |
| 0–19% | No Rain |

Confidence is reduced when inputs conflict—for example, high humidity paired with high pressure or strong cloud cover paired with extensive sunshine.

> **Important:** The engine is rule-based and does not use live weather data or a trained production model. It is intended for learning, prototyping, and interface demonstration only.

## 🛠️ Tech Stack

- [React 19](https://react.dev/) — UI components and state management
- [Vite 8](https://vite.dev/) — development server and production builds
- [Tailwind CSS 3](https://tailwindcss.com/) — utility styling
- [Lucide React](https://lucide.dev/) — interface icons
- Vanilla JavaScript Canvas — animated rain particles
- ESLint — code quality checks

## 📁 Project Structure

```text
Rain_pred/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── SideNavBar.jsx
│   │   ├── ParameterSlider.jsx
│   │   ├── ProbabilityGauge.jsx
│   │   ├── ShapChart.jsx
│   │   └── MlPipeline.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
│   └── predictor.js
├── index.html
├── dashboard.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── eslint.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

```bash
git clone https://github.com/sudeep-06/Rain_pred.git
cd Rain_pred
npm install
```

### Run Locally

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview
```

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

## 🔌 Prediction Module

The core engine is exported by `src/predictor.js`:

```javascript
import { predictRain } from './src/predictor.js';

const forecast = predictRain({
  temperature: 28,
  humidity: 72,
  pressure: 1008,
  windSpeed: 12,
  cloudCover: 75,
  dewPoint: 24,
  sunshine: 3,
  evaporation: 5
});

console.log(forecast.probability);
console.log(forecast.prediction);
console.log(forecast.confidence);
console.log(forecast.shapValues);
```

The result contains:

- `probability` — final rainfall percentage
- `prediction` — rainfall category
- `confidence` — confidence score
- `shapValues` — normalized feature impacts
- `recommendation` — generated meteorological advisory
- `baseline` — baseline probability
- `metadata` — pressure, dew-point, and conflict information

## ⚠️ Limitations

- Not a substitute for professional weather forecasts
- Does not integrate live weather APIs or forecast data
- Uses simplified rules rather than a trained machine-learning model
- Not suitable for safety-critical planning or emergency decisions

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/improvement
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add a useful improvement"
   ```
4. Push the branch and open a pull request

Please run `npm run lint` and `npm run build` before submitting changes.

## 👤 Author

Created by [Sudeep](https://github.com/sudeep-06).

<div align="center">

[Live Demo](https://rain-pred.vercel.app) · [Report an Issue](https://github.com/sudeep-06/Rain_pred/issues)

</div>

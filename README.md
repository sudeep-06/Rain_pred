# Rain Predictor

A browser-based rainfall probability dashboard that estimates rain intensity from atmospheric conditions. Users can adjust meteorological parameters and receive a probability score, prediction category, confidence level, feature contributions, and weather recommendations.

**Live Demo:** [https://rain-pred.vercel.app](https://rain-pred.vercel.app)

## Features

- Rain probability prediction from 0–100%
- Rain categories:
  - No Rain
  - Light Rain
  - Moderate Rain
  - Heavy Rain
- Adjustable atmospheric parameters
- SHAP-like feature contribution visualization
- Model confidence score
- Meteorological explanations and recommendations
- Responsive interface built for desktop and mobile

## Atmospheric Inputs

The predictor uses:

- Temperature
- Relative humidity
- Atmospheric pressure
- Wind speed
- Cloud cover
- Dew point
- Sunshine duration
- Evaporation

## How It Works

The Meteorological Simulation Engine starts from a 25% rainfall baseline and calculates feature impacts for humidity, pressure, dew point, cloud cover, sunshine, wind, and evaporation.

The resulting probabilities are categorized as follows:

| Probability | Prediction |
|---:|---|
| 75–100% | Heavy Rain |
| 45–74% | Moderate Rain |
| 20–44% | Light Rain |
| 0–19% | No Rain |

Feature contributions are normalized to sum to the change from the baseline probability.

> The application presents a simulated meteorological inference engine. It is intended for demonstration and educational purposes, not operational weather forecasting.

## Technologies

- HTML
- CSS
- JavaScript
- Vite
- Tailwind CSS
- ESLint

## Project Structure

```text
Rain_pred/
├── src/
│   └── predictor.js
├── public/
├── index.html
├── dashboard.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── eslint.config.js
└── README.md
```


## Getting Started

### Prerequisites

- Node.js
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

Open the local URL printed by Vite in your browser.

### Build for Production

```bash
npm run build
```

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Prediction API

The predictor is implemented in `src/predictor.js`:

```javascript
predictRain({
  temperature: 28,
  humidity: 72,
  pressure: 1008,
  windSpeed: 12,
  cloudCover: 75,
  dewPoint: 24,
  sunshine: 3,
  evaporation: 5
})
```

The returned object includes:

- `probability`
- `prediction`
- `confidence`
- `shapValues`
- `recommendation`
- `baseline`
- `metadata`

## Limitations

- The prediction engine is rule-based rather than a trained production weather model.
- It does not use live weather station or forecast data.
- Its calculations should not be used for safety-critical decisions.

## Author

Created by **Sudeep**.

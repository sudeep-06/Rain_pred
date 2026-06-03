/**
 * Meteorological Simulation Engine (Simulating Claude-API ML Inference)
 * Calculates rainfall probability, SHAP values, and model confidence based on weather parameters.
 */

export function predictRain(params) {
  const {
    temperature,
    humidity,
    pressure,
    windSpeed,
    cloudCover,
    dewPoint,
    sunshine,
    evaporation
  } = params;

  // 1. Calculate physical dew point depression (ambient temp - dew point)
  // Dew point cannot exceed ambient temperature in reality. If it does, cap it for the math.
  const actualDewPoint = Math.min(dewPoint, temperature);
  const dewPointDepression = temperature - actualDewPoint;

  // 2. Base model probability (historical baseline for the region)
  const BASELINE_PROBABILITY = 25.0; // 25% average rain day baseline

  // 3. Compute raw contributions (SHAP-like values) for each feature
  // Relative Humidity Effect
  let humidityImpact = 0;
  if (humidity >= 50) {
    humidityImpact = (humidity - 50) * 0.75; // Up to +37.5% at 100% humidity
  } else {
    humidityImpact = (humidity - 50) * 0.4;  // Down to -20% at 0% humidity
  }

  // Atmospheric Pressure Effect
  // Standard sea-level pressure is 1013 hPa
  let pressureImpact = 0;
  if (pressure < 1013) {
    pressureImpact = (1013 - pressure) * 1.6; // Up to +100.8% for very low pressure (950 hPa)
  } else {
    pressureImpact = (1013 - pressure) * 1.1; // Down to -40.7% for high pressure (1050 hPa)
  }

  // Dew Point Depression Effect (ambient cooling towards saturation)
  let dewPointImpact = 0;
  if (dewPointDepression <= 2) {
    dewPointImpact = 25.0; // High saturation
  } else if (dewPointDepression <= 6) {
    dewPointImpact = (6 - dewPointDepression) * 5.0; // Linear decrease
  } else {
    dewPointImpact = Math.max(-25.0, (6 - dewPointDepression) * 1.5); // Negative impact for dry air
  }

  // Cloud Cover Effect
  let cloudCoverImpact = (cloudCover - 40) * 0.35; // Baseline at 40%. Max +21%, Min -14%

  // Sunshine Hours Effect (negatively correlates with immediate precipitation)
  let sunshineImpact = (6 - sunshine) * 2.5; // Baseline at 6 hours. Max +15% (0 hrs), Min -20% (14 hrs)

  // Wind Speed Effect
  // High winds can signify arriving fronts (positive) or dispersing clouds (negative)
  let windImpact = 0;
  if (pressure < 1010) {
    // If pressure is low, wind speed indicates storm dynamic intensity
    windImpact = windSpeed * 0.2; // Up to +24% for storm winds
  } else {
    // Under high pressure, high wind disperses moisture
    windImpact = -windSpeed * 0.15; // Down to -18%
  }

  // Evaporation Effect
  let evaporationImpact = 0;
  if (temperature > 25 && humidity > 60) {
    // Promotes convective rain showers (thunderstorms)
    evaporationImpact = evaporation * 0.8; // Up to +16%
  } else {
    evaporationImpact = -evaporation * 0.3; // Down to -6%
  }

  // Sum of contributions
  const rawSum = humidityImpact + pressureImpact + dewPointImpact + cloudCoverImpact + sunshineImpact + windImpact + evaporationImpact;
  
  // Calculate final probability
  let probability = BASELINE_PROBABILITY + rawSum;
  
  // Clamp probability between 0 and 100
  if (probability > 100) probability = 100;
  if (probability < 0) probability = 0;

  // Re-adjust SHAP values proportionally so they sum to exactly (probability - BASELINE_PROBABILITY)
  const actualDiff = probability - BASELINE_PROBABILITY;
  const rawContributions = {
    humidity: humidityImpact,
    pressure: pressureImpact,
    dewPoint: dewPointImpact,
    cloudCover: cloudCoverImpact,
    sunshine: sunshineImpact,
    windSpeed: windImpact,
    evaporation: evaporationImpact
  };

  const rawContributionsSum = Object.values(rawContributions).reduce((a, b) => a + b, 0);
  
  const shapValues = {};
  if (Math.abs(rawContributionsSum) > 0.01) {
    const scaleFactor = actualDiff / rawContributionsSum;
    Object.keys(rawContributions).forEach(key => {
      // Calibrate so they sum to the exact difference
      shapValues[key] = Number((rawContributions[key] * (actualDiff === 0 ? 0 : scaleFactor)).toFixed(2));
    });
  } else {
    Object.keys(rawContributions).forEach(key => {
      shapValues[key] = 0;
    });
  }

  // 4. Determine Prediction Category
  let prediction = 'No Rain';
  if (probability >= 75) {
    prediction = 'Heavy Rain';
  } else if (probability >= 45) {
    prediction = 'Moderate Rain';
  } else if (probability >= 20) {
    prediction = 'Light Rain';
  }

  // 5. Calculate Model Confidence
  // Confidence is high if parameters agree (e.g., high humidity AND low pressure AND high cloud cover)
  // Confidence is lower if parameters conflict (e.g., high humidity but high pressure and lots of sunshine)
  let conflictScore = 0;
  // Conflict 1: High humidity and high pressure
  if (humidity > 70 && pressure > 1018) conflictScore += 25;
  // Conflict 2: High cloud cover and high sunshine hours
  if (cloudCover > 70 && sunshine > 9) conflictScore += 20;
  // Conflict 3: High rain probability but dew point depression is very high (dry air)
  if (probability > 60 && dewPointDepression > 12) conflictScore += 30;
  // Conflict 4: Low humidity but high evaporation
  if (humidity < 35 && evaporation > 10) conflictScore += 15;

  let confidence = Math.max(45, 95 - conflictScore);
  // Add slight random perturbation to simulate ML model calibration variance
  confidence = Math.round(confidence);

  // 6. Generate Meteorological Recommendation & Explanation
  let recommendation = '';
  if (probability < 20) {
    recommendation = `Atmospheric conditions are stable. The high pressure system (${pressure} hPa) combined with dry air (dew point depression of ${dewPointDepression.toFixed(1)}°C) inhibits vertical cloud growth. No precipitation is expected. Outdoor activities are highly favorable.`;
  } else if (probability < 45) {
    recommendation = `Minor atmospheric instability detected. Moderate relative humidity (${humidity}%) and light cloud cover (${cloudCover}%) may lead to localized, transient light rain or drizzle. Confidence is moderate. Carrying a compact umbrella is advised.`;
  } else if (probability < 75) {
    recommendation = `Significant convective activity. Falling barometric pressure (${pressure} hPa) and elevated moisture levels (humidity ${humidity}%) are creating favorable updrafts for precipitation. Expect intermittent moderate rainfall. Outdoor work should be planned with caution.`;
  } else {
    recommendation = `High-intensity storm system probable. Severe atmospheric saturation (dew point depression of ${dewPointDepression.toFixed(1)}°C) and deep barometric depression (${pressure} hPa) are triggering strong storm-front condensation. Expect heavy, sustained rainfall with possible wind gusts. Secure outdoor items and prepare for drainage delays.`;
  }

  return {
    probability: Math.round(probability),
    prediction,
    confidence,
    shapValues: [
      { feature: 'humidity', label: 'Relative Humidity', value: shapValues.humidity },
      { feature: 'pressure', label: 'Atmospheric Pressure', value: shapValues.pressure },
      { feature: 'dewPoint', label: 'Dew Point Saturation', value: shapValues.dewPoint },
      { feature: 'cloudCover', label: 'Cloud Coverage', value: shapValues.cloudCover },
      { feature: 'sunshine', label: 'Sunshine Duration', value: shapValues.sunshine },
      { feature: 'windSpeed', label: 'Wind Dynamics', value: shapValues.windSpeed },
      { feature: 'evaporation', label: 'Evapotranspiration', value: shapValues.evaporation }
    ],
    recommendation,
    baseline: BASELINE_PROBABILITY,
    metadata: {
      dewPointDepression: Number(dewPointDepression.toFixed(1)),
      pressureStatus: pressure < 1009 ? 'Low (Depression)' : pressure > 1018 ? 'High (Anticyclonic)' : 'Standard Barometric',
      dewPointConflict: dewPoint > temperature
    }
  };
}

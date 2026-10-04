/**
 * Scenario Simulation Model
 * Research-backed illustrative deltas scaled by intensity (25%-100%) and projection time horizon.
 */

export const SCENARIOS = [
  {
    id: 'noTrees',
    name: 'No Trees',
    tagline: 'Complete Urban Deforestation',
    icon: 'TreePineOff',
    category: 'Ecosystem',
    description: 'All trees and canopy cover removed from the city grid.',
    color: '#EF4444',
    bgGradient: 'from-rose-500/20 to-red-600/10',
    deltas: {
      temp: 2.5,        // +2.5 °C
      pm25Pct: 30,      // +30% PM2.5
      co2Ppm: 8,        // +8 ppm
      noiseDb: 4,       // +4 dB
      healthScore: -20, // -20 points
      biodiversity: -60 // -60%
    },
    whyText: 'Trees act as natural air filters (intercepting particulate matter), dampeners for acoustic vibration, and evaporative coolers. Without them, the urban heat island effect spikes and toxic particulates remain suspended.'
  },
  {
    id: 'noVehicles',
    name: 'No Vehicles',
    tagline: 'Zero-Emission Pedestrian City',
    icon: 'CarOff',
    category: 'Mobility',
    description: 'All combustion engines and private motor vehicles replaced by walking, cycling & zero-emission transit.',
    color: '#10B981',
    bgGradient: 'from-emerald-500/20 to-teal-600/10',
    deltas: {
      temp: -0.3,
      pm25Pct: -35,
      co2Ppm: -4,
      noiseDb: -15,
      healthScore: 15,
      biodiversity: 5
    },
    whyText: 'Vehicular tailpipe emissions contribute over 30–40% of ground-level urban PM2.5 and NOx. Eliminating vehicles collapses noise pollution and drastically cuts acute respiratory hospitalizations.'
  },
  {
    id: 'noFactories',
    name: 'No Industrial Smoke',
    tagline: 'Clean Factory Tech',
    icon: 'FactoryOff',
    category: 'Industry',
    description: 'Heavy manufacturing plants transition to zero-emission closed-loop clean energy systems.',
    color: '#38BDF8',
    bgGradient: 'from-sky-500/20 to-cyan-600/10',
    deltas: {
      temp: -0.2,
      pm25Pct: -30,
      co2Ppm: -6,
      noiseDb: -2,
      healthScore: 12,
      biodiversity: 10
    },
    whyText: 'Industrial stacks emit massive loads of sulfur dioxide, soot, and carbon monoxide. Eliminating industrial plumes creates clean tropospheric clearance.'
  },
  {
    id: 'allElectric',
    name: '100% Electric Transit',
    tagline: 'All Fleet Electrified',
    icon: 'Zap',
    category: 'Mobility',
    description: 'Every two-wheeler, car, auto-rickshaw, and bus switches to battery electric powertrains.',
    color: '#F59E0B',
    bgGradient: 'from-amber-500/20 to-yellow-600/10',
    deltas: {
      temp: -0.1,
      pm25Pct: -15,
      co2Ppm: -2,
      noiseDb: -6,
      healthScore: 6,
      biodiversity: 2
    },
    whyText: 'Electric vehicles remove direct tailpipe emissions in dense residential corridors and reduce engine combustion hum, though tire/brake wear particles remain.'
  },
  {
    id: 'tenXTrees',
    name: '10x Urban Forest',
    tagline: 'Megacity Miyawaki Canopy',
    icon: 'Trees',
    category: 'Ecosystem',
    description: 'A 1000% increase in native trees, vertical green walls, and pocket urban forests.',
    color: '#22C55E',
    bgGradient: 'from-green-500/20 to-emerald-700/10',
    deltas: {
      temp: -1.5,
      pm25Pct: -15,
      co2Ppm: -3,
      noiseDb: -3,
      healthScore: 10,
      biodiversity: 40
    },
    whyText: 'Dense urban forests create microclimates that lower ambient asphalt temperatures through evapotranspiration while creating thriving habitats for pollinators and bird life.'
  },
  {
    id: 'noRain',
    name: 'Extreme Drought',
    tagline: 'Extended Rainless Heatwave',
    icon: 'CloudOff',
    category: 'Climate',
    description: 'Prolonged absence of precipitation causing groundwater depletion and dust storm surge.',
    color: '#FB923C',
    bgGradient: 'from-orange-500/20 to-amber-700/10',
    deltas: {
      temp: 1.8,
      pm25Pct: 18,
      co2Ppm: 3,
      noiseDb: 0,
      healthScore: -14,
      biodiversity: -35
    },
    whyText: 'Rainfall naturally "washes" aerosol particles from the sky (wet deposition). Droughts dry topsoil into airborne dust and induce thermal stress across humans and urban wildlife.'
  }
];

export const TIME_HORIZONS = [
  { id: 'now', label: 'Current Impact', multiplier: 1.0, year: '2026' },
  { id: '10yr', label: '+10 Years', multiplier: 1.45, year: '2036' },
  { id: '50yr', label: '+50 Years', multiplier: 2.20, year: '2076' }
];

/**
 * Compute simulated metrics from baseline and active scenario toggles
 */
export function calculateSimulatedMetrics(baseline, activeScenarioIds, intensity = 1.0, timeMultiplier = 1.0) {
  const baseTemp = baseline?.temp || 31;
  const baseAqi = baseline?.aqi || 178;
  const basePm25 = baseline?.pm25 || 82;
  const baseCo2 = 418; // ambient atmospheric ppm baseline
  const baseNoise = 68; // urban ambient decibels
  const baseHealth = 65; // base health index (0-100)
  const baseBio = 50; // base urban biodiversity index (0-100)

  let tempDelta = 0;
  let pm25DeltaPct = 0;
  let co2DeltaPpm = 0;
  let noiseDeltaDb = 0;
  let healthScoreDelta = 0;
  let bioDelta = 0;

  activeScenarioIds.forEach(id => {
    const sc = SCENARIOS.find(s => s.id === id);
    if (sc) {
      tempDelta += (sc.deltas.temp || 0);
      pm25DeltaPct += (sc.deltas.pm25Pct || 0);
      co2DeltaPpm += (sc.deltas.co2Ppm || 0);
      noiseDeltaDb += (sc.deltas.noiseDb || 0);
      healthScoreDelta += (sc.deltas.healthScore || 0);
      bioDelta += (sc.deltas.biodiversity || 0);
    }
  });

  const effScale = intensity * timeMultiplier;

  const finalTemp = +(baseTemp + tempDelta * effScale).toFixed(1);
  const finalPm25 = Math.max(5, Math.round(basePm25 * (1 + (pm25DeltaPct * effScale) / 100)));
  
  // Approximate AQI scaling based on PM2.5 delta
  const aqiRatio = finalPm25 / Math.max(1, basePm25);
  const finalAqi = Math.min(500, Math.max(10, Math.round(baseAqi * aqiRatio)));
  
  const finalCo2 = +(baseCo2 + co2DeltaPpm * effScale).toFixed(1);
  const finalNoise = Math.max(30, Math.min(95, Math.round(baseNoise + noiseDeltaDb * effScale)));
  const finalHealth = Math.max(5, Math.min(100, Math.round(baseHealth + healthScoreDelta * effScale)));
  const finalBio = Math.max(0, Math.min(100, Math.round(baseBio + bioDelta * effScale)));

  return {
    temp: { current: finalTemp, baseline: baseTemp, delta: +(finalTemp - baseTemp).toFixed(1), unit: '°C' },
    aqi: { current: finalAqi, baseline: baseAqi, delta: finalAqi - baseAqi, unit: 'AQI' },
    pm25: { current: finalPm25, baseline: basePm25, delta: finalPm25 - basePm25, unit: 'µg/m³' },
    co2: { current: finalCo2, baseline: baseCo2, delta: +(finalCo2 - baseCo2).toFixed(1), unit: 'ppm' },
    noise: { current: finalNoise, baseline: baseNoise, delta: finalNoise - baseNoise, unit: 'dB' },
    health: { current: finalHealth, baseline: baseHealth, delta: finalHealth - baseHealth, unit: '/100' },
    biodiversity: { current: finalBio, baseline: baseBio, delta: finalBio - baseBio, unit: '/100' }
  };
}

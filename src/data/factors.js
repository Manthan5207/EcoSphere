/**
 * Emission Factors & Environmental Benchmarks (all approximate in kg CO2e)
 * Estimates based on Central Electricity Authority (India), GHG Protocol, and IPCC values.
 */

export const EMISSION_FACTORS = {
  // Transport (kg CO2e per passenger-km)
  transport: {
    petrolCar: 0.17,
    dieselCar: 0.17,
    cngCar: 0.12,
    electricCar: 0.08, // based on Indian national grid intensity
    twoWheeler: 0.04,
    autoRickshaw: 0.07,
    bus: 0.03,
    metroTrain: 0.03,
    flightDomestic: 0.15, // per passenger-km
  },

  // Home Energy
  energy: {
    electricityPerKWh: 0.71, // Single editable Indian grid average (kg CO2e / kWh)
    lpgCylinder: 42.0,      // per 14.2 kg cylinder
    pipedGasPerM3: 2.0,     // per m³ (PNG)
  },

  // Food & Diet (kg CO2e per day)
  diet: {
    vegan: 1.5,
    vegetarian: 1.7,
    eggetarian: 2.0,
    occasionalMeat: 2.5,
    dailyMeat: 3.3,
  },

  // Goods & Waste (kg CO2e per year)
  shopping: {
    low: 300,       // Minimalist, repairs first, second-hand
    medium: 700,    // Average urban consumer
    high: 1500,     // Frequent fast fashion, gadgets & deliveries
  },

  waste: {
    noRecycling: 300, // Landfilled organic & packaging waste
    recycles: 0,      // Segregated dry/plastic recycling
    composts: -100,   // Composting diversion carbon credit
  },
};

// Benchmarks for comparative visuals (in tonnes CO2e / year)
export const BENCHMARKS = {
  indiaAvg: 2.0,
  worldAvg: 4.7,
  sustainableTarget2030: 2.3,
  usAvg: 14.8,
};

// Conversions & equivalencies
export const EQUIVALENCIES = {
  treeAbsorptionPerYear: 21, // 1 mature tree absorbs ~21 kg CO2/year
  carKmPerKgCO2: 1 / 0.17,   // ~5.88 km avoided per kg CO2 saved
  phoneChargesPerKgCO2: 122, // ~122 smartphone charges per kg CO2
  ledBulbHoursPerKgCO2: 80,  // ~80 hours of LED usage per kg CO2
};

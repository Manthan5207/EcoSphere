/**
 * Mock Environmental Data Fallback
 * Guaranteed offline data representation for Delhi and global cities.
 */

export const MOCK_DELHI_DATA = {
  isMock: true,
  city: 'Delhi',
  admin1: 'Delhi',
  country: 'India',
  latitude: 28.6139,
  longitude: 77.2090,
  updatedAt: new Date().toISOString(),
  source: 'Offline Model Data (Calibrated Fallback)',
  
  airQuality: {
    aqi: 178,
    category: 'Unhealthy',
    categoryCode: 'unhealthy',
    color: '#EF4444',
    healthAdvice: 'Active children and adults, and people with respiratory disease, should avoid prolonged outdoor exertion.',
    maskRecommended: true,
    outdoorExercise: 'Avoid',
    pollutants: {
      pm2_5: { value: 82, unit: 'µg/m³', maxSafe: 15, name: 'PM2.5 (Fine Particulates)', risk: 'Hazardous for lungs' },
      pm10: { value: 145, unit: 'µg/m³', maxSafe: 45, name: 'PM10 (Coarse Dust)', risk: 'Upper airway irritation' },
      nitrogen_dioxide: { value: 42, unit: 'µg/m³', maxSafe: 25, name: 'NO₂ (Nitrogen Dioxide)', risk: 'Vehicular exhaust gas' },
      ozone: { value: 38, unit: 'µg/m³', maxSafe: 100, name: 'O₃ (Ground Ozone)', risk: 'Photochemical smog oxidant' },
      carbon_monoxide: { value: 1.8, unit: 'mg/m³', maxSafe: 4.0, name: 'CO (Carbon Monoxide)', risk: 'Incomplete combustion byproduct' },
      sulphur_dioxide: { value: 14, unit: 'µg/m³', maxSafe: 40, name: 'SO₂ (Sulfur Dioxide)', risk: 'Industrial coal/oil emission' },
      uv_index: { value: 6.2, unit: 'UVI', maxSafe: 5.0, name: 'UV Index', risk: 'High solar ultraviolet radiation' }
    }
  },

  weather: {
    temperature: 31,
    apparentTemperature: 34,
    humidity: 48,
    windSpeed: 14,
    pressure: 1008,
    precipitation: 0,
    weatherCode: 1,
    weatherLabel: 'Mainly Clear & Sunny',
    icon: 'Sun',
    uvIndex: 6.2,
    sunrise: '06:14 AM',
    sunset: '06:22 PM'
  },

  hourly: [
    { time: '00:00', temp: 24, aqi: 155, pm25: 68 },
    { time: '02:00', temp: 23, aqi: 162, pm25: 72 },
    { time: '04:00', temp: 22, aqi: 185, pm25: 88 },
    { time: '06:00', temp: 23, aqi: 210, pm25: 105 },
    { time: '08:00', temp: 26, aqi: 230, pm25: 118 },
    { time: '10:00', temp: 29, aqi: 195, pm25: 94 },
    { time: '12:00', temp: 31, aqi: 178, pm25: 82 },
    { time: '14:00', temp: 32, aqi: 165, pm25: 74 },
    { time: '16:00', temp: 31, aqi: 170, pm25: 78 },
    { time: '18:00', temp: 28, aqi: 190, pm25: 92 },
    { time: '20:00', temp: 27, aqi: 205, pm25: 102 },
    { time: '22:00', temp: 25, aqi: 180, pm25: 85 }
  ],

  daily: [
    { day: 'Today', tempMax: 32, tempMin: 22, code: 1, label: 'Sunny', rainProb: 5, uvMax: 7 },
    { day: 'Mon', tempMax: 33, tempMin: 23, code: 2, label: 'Partly Cloudy', rainProb: 15, uvMax: 7 },
    { day: 'Tue', tempMax: 31, tempMin: 22, code: 3, label: 'Overcast', rainProb: 25, uvMax: 6 },
    { day: 'Wed', tempMax: 29, tempMin: 21, code: 61, label: 'Light Showers', rainProb: 65, uvMax: 4 },
    { day: 'Thu', tempMax: 28, tempMin: 20, code: 63, label: 'Rain', rainProb: 80, uvMax: 4 },
    { day: 'Fri', tempMax: 30, tempMin: 21, code: 2, label: 'Clearing', rainProb: 20, uvMax: 6 },
    { day: 'Sat', tempMax: 32, tempMin: 22, code: 0, label: 'Clear Sky', rainProb: 10, uvMax: 7 }
  ]
};

export const POPULAR_CITIES = [
  { name: 'Delhi', admin1: 'Delhi', country: 'India', lat: 28.6139, lon: 77.2090 },
  { name: 'Mumbai', admin1: 'Maharashtra', country: 'India', lat: 19.0760, lon: 72.8777 },
  { name: 'Bengaluru', admin1: 'Karnataka', country: 'India', lat: 12.9716, lon: 77.5946 },
  { name: 'Kolkata', admin1: 'West Bengal', country: 'India', lat: 22.5726, lon: 88.3639 },
  { name: 'Chennai', admin1: 'Tamil Nadu', country: 'India', lat: 13.0827, lon: 80.2707 },
  { name: 'Hyderabad', admin1: 'Telangana', country: 'India', lat: 17.3850, lon: 78.4867 },
  { name: 'London', admin1: 'England', country: 'United Kingdom', lat: 51.5074, lon: -0.1278 },
  { name: 'New York', admin1: 'New York', country: 'United States', lat: 40.7128, lon: -74.0060 }
];

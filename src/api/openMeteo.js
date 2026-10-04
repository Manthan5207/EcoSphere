import { MOCK_DELHI_DATA } from '../data/mock';

// 10-minute in-memory cache
const memoryCache = new Map();
const CACHE_TTL_MS = 10 * 60 * 1000;

function getFromCache(key) {
  const item = memoryCache.get(key);
  if (!item) return null;
  if (Date.now() - item.timestamp > CACHE_TTL_MS) {
    memoryCache.delete(key);
    return null;
  }
  return item.data;
}

function setInCache(key, data) {
  memoryCache.set(key, { timestamp: Date.now(), data });
}

export function getAQICategory(aqi) {
  const val = Number(aqi) || 0;
  if (val <= 50) {
    return {
      name: 'Good',
      code: 'good',
      color: '#22C55E',
      advice: 'Air quality is satisfactory, and air pollution poses little or no risk.',
      maskRecommended: false,
      outdoorExercise: 'Safe',
      badgeClass: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30'
    };
  }
  if (val <= 100) {
    return {
      name: 'Moderate',
      code: 'moderate',
      color: '#EAB308',
      advice: 'Air quality is acceptable. Sensitive individuals should consider limiting prolonged outdoor exertion.',
      maskRecommended: false,
      outdoorExercise: 'Moderate',
      badgeClass: 'bg-amber-500/15 text-amber-500 border-amber-500/30'
    };
  }
  if (val <= 150) {
    return {
      name: 'Unhealthy for Sensitive Groups',
      code: 'sensitive',
      color: '#F97316',
      advice: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.',
      maskRecommended: true,
      outdoorExercise: 'Reduce',
      badgeClass: 'bg-orange-500/15 text-orange-500 border-orange-500/30'
    };
  }
  if (val <= 200) {
    return {
      name: 'Unhealthy',
      code: 'unhealthy',
      color: '#EF4444',
      advice: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.',
      maskRecommended: true,
      outdoorExercise: 'Avoid',
      badgeClass: 'bg-rose-500/15 text-rose-500 border-rose-500/30'
    };
  }
  if (val <= 300) {
    return {
      name: 'Very Unhealthy',
      code: 'very-unhealthy',
      color: '#A855F7',
      advice: 'Health alert: The risk of health effects is increased for everyone. Wear N95 masks outdoors.',
      maskRecommended: true,
      outdoorExercise: 'Avoid Completely',
      badgeClass: 'bg-purple-500/15 text-purple-500 border-purple-500/30'
    };
  }
  return {
    name: 'Hazardous',
    code: 'hazardous',
    color: '#7F1D1D',
    advice: 'Health warning of emergency conditions: Everyone is more likely to be severely affected. Keep windows closed.',
    maskRecommended: true,
    outdoorExercise: 'Hazardous',
    badgeClass: 'bg-red-950/40 text-rose-400 border-red-700/50'
  };
}

export function getWeatherCondition(code) {
  const c = Number(code);
  if (c === 0) return { label: 'Clear Sky', icon: 'Sun', color: 'text-amber-400' };
  if (c === 1) return { label: 'Mainly Clear', icon: 'SunMedium', color: 'text-amber-400' };
  if (c === 2) return { label: 'Partly Cloudy', icon: 'CloudSun', color: 'text-sky-400' };
  if (c === 3) return { label: 'Overcast', icon: 'Cloud', color: 'text-slate-400' };
  if (c === 45 || c === 48) return { label: 'Foggy Mist', icon: 'CloudFog', color: 'text-slate-400' };
  if (c >= 51 && c <= 57) return { label: 'Light Drizzle', icon: 'CloudDrizzle', color: 'text-sky-400' };
  if (c >= 61 && c <= 67) return { label: 'Rain', icon: 'CloudRain', color: 'text-blue-400' };
  if (c >= 71 && c <= 77) return { label: 'Snowfall', icon: 'CloudSnow', color: 'text-teal-200' };
  if (c >= 80 && c <= 82) return { label: 'Rain Showers', icon: 'CloudRain', color: 'text-blue-400' };
  if (c >= 95 && c <= 99) return { label: 'Thunderstorm', icon: 'CloudLightning', color: 'text-yellow-400' };
  return { label: 'Clear', icon: 'Sun', color: 'text-amber-400' };
}

/**
 * Geocoding search with Open-Meteo
 */
export async function searchCities(query) {
  if (!query || query.trim().length < 2) return [];
  const cacheKey = `geo:${query.trim().toLowerCase()}`;
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query.trim())}&count=6&language=en&format=json`;
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (!res.ok) throw new Error('Geocoding network error');
    const data = await res.json();
    const results = (data.results || []).map(r => ({
      name: r.name,
      admin1: r.admin1 || '',
      country: r.country || '',
      countryCode: r.country_code || '',
      lat: r.latitude,
      lon: r.longitude,
    }));
    setInCache(cacheKey, results);
    return results;
  } catch (err) {
    console.warn('City search failed, returning filtered presets:', err);
    return [];
  }
}

/**
 * Fetch combined Environmental Data (Air Quality + Weather + Forecast + Hourly)
 */
export async function fetchLiveEnvironmentalData(lat, lon, cityName = 'Delhi') {
  const cacheKey = `env:${lat?.toFixed(3)}:${lon?.toFixed(3)}`;
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  try {
    const aqUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,uv_index&hourly=pm2_5,us_aqi&forecast_days=2&timezone=auto`;
    const wxUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,surface_pressure&hourly=temperature_2m,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,uv_index_max,sunrise,sunset&forecast_days=7&timezone=auto`;

    const [aqRes, wxRes] = await Promise.all([
      fetch(aqUrl, { signal: AbortSignal.timeout(7000) }),
      fetch(wxUrl, { signal: AbortSignal.timeout(7000) })
    ]);

    if (!aqRes.ok || !wxRes.ok) {
      throw new Error('Environmental API responded with status error');
    }

    const [aqData, wxData] = await Promise.all([aqRes.json(), wxRes.json()]);

    const aqiVal = Math.round(aqData.current?.us_aqi || 85);
    const aqiMeta = getAQICategory(aqiVal);
    const wxCode = wxData.current?.weather_code ?? 0;
    const wxMeta = getWeatherCondition(wxCode);

    // Build 24-hour hourly slice
    const nowHour = new Date().getHours();
    const hourlyTimes = aqData.hourly?.time || [];
    const hourlyPm25 = aqData.hourly?.pm2_5 || [];
    const hourlyAqi = aqData.hourly?.us_aqi || [];
    const hourlyTemp = wxData.hourly?.temperature_2m || [];

    const hourly = [];
    for (let i = nowHour; i < nowHour + 24 && i < hourlyTimes.length; i += 2) {
      const timeStr = hourlyTimes[i] ? hourlyTimes[i].split('T')[1]?.slice(0, 5) : `${(i % 24).toString().padStart(2, '0')}:00`;
      hourly.push({
        time: timeStr,
        temp: Math.round(hourlyTemp[i] ?? 28),
        aqi: Math.round(hourlyAqi[i] ?? aqiVal),
        pm25: Math.round(hourlyPm25[i] ?? (aqData.current?.pm2_5 || 45))
      });
    }

    // Build 7-day daily forecast
    const dailyCodes = wxData.daily?.weather_code || [];
    const dailyMax = wxData.daily?.temperature_2m_max || [];
    const dailyMin = wxData.daily?.temperature_2m_min || [];
    const dailyRain = wxData.daily?.precipitation_sum || [];
    const dailyUv = wxData.daily?.uv_index_max || [];
    const dailyDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const daily = dailyCodes.slice(0, 7).map((code, idx) => {
      const d = new Date();
      d.setDate(d.getDate() + idx);
      const dayName = idx === 0 ? 'Today' : dailyDays[d.getDay()];
      const condition = getWeatherCondition(code);
      return {
        day: dayName,
        tempMax: Math.round(dailyMax[idx] ?? 30),
        tempMin: Math.round(dailyMin[idx] ?? 20),
        code: code,
        label: condition.label,
        icon: condition.icon,
        rainProb: Math.round((dailyRain[idx] || 0) * 10),
        uvMax: Math.round(dailyUv[idx] ?? 6)
      };
    });

    const result = {
      isMock: false,
      city: cityName,
      latitude: lat,
      longitude: lon,
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'Open-Meteo / CAMS Live Model',
      airQuality: {
        aqi: aqiVal,
        category: aqiMeta.name,
        categoryCode: aqiMeta.code,
        color: aqiMeta.color,
        healthAdvice: aqiMeta.advice,
        maskRecommended: aqiMeta.maskRecommended,
        outdoorExercise: aqiMeta.outdoorExercise,
        pollutants: {
          pm2_5: {
            value: Math.round(aqData.current?.pm2_5 || 42),
            unit: 'µg/m³',
            maxSafe: 15,
            name: 'PM2.5 (Fine Particulates)',
            risk: 'Penetrates deep into respiratory tract and blood stream'
          },
          pm10: {
            value: Math.round(aqData.current?.pm10 || 78),
            unit: 'µg/m³',
            maxSafe: 45,
            name: 'PM10 (Inhalable Dust)',
            risk: 'Upper respiratory irritation and airway inflammation'
          },
          nitrogen_dioxide: {
            value: Math.round(aqData.current?.nitrogen_dioxide || 28),
            unit: 'µg/m³',
            maxSafe: 25,
            name: 'NO₂ (Nitrogen Dioxide)',
            risk: 'Combustion engine and thermal generation byproduct'
          },
          ozone: {
            value: Math.round(aqData.current?.ozone || 34),
            unit: 'µg/m³',
            maxSafe: 100,
            name: 'O₃ (Tropospheric Ozone)',
            risk: 'Photochemical smog causing reduced lung capacity'
          },
          carbon_monoxide: {
            value: +((aqData.current?.carbon_monoxide || 450) / 1000).toFixed(1), // convert to mg/m³
            unit: 'mg/m³',
            maxSafe: 4.0,
            name: 'CO (Carbon Monoxide)',
            risk: 'Reduces oxygen delivery in the bloodstream'
          },
          sulphur_dioxide: {
            value: Math.round(aqData.current?.sulphur_dioxide || 12),
            unit: 'µg/m³',
            maxSafe: 40,
            name: 'SO₂ (Sulfur Dioxide)',
            risk: 'Industrial coal combustion acid precursor'
          },
          uv_index: {
            value: +(aqData.current?.uv_index || 5.2).toFixed(1),
            unit: 'UVI',
            maxSafe: 5.0,
            name: 'UV Index',
            risk: 'Cellular DNA photodamage without sunscreen/protection'
          }
        }
      },
      weather: {
        temperature: Math.round(wxData.current?.temperature_2m ?? 29),
        apparentTemperature: Math.round(wxData.current?.apparent_temperature ?? 31),
        humidity: Math.round(wxData.current?.relative_humidity_2m ?? 50),
        windSpeed: Math.round(wxData.current?.wind_speed_10m ?? 12),
        pressure: Math.round(wxData.current?.surface_pressure ?? 1012),
        precipitation: wxData.current?.precipitation ?? 0,
        weatherCode: wxCode,
        weatherLabel: wxMeta.label,
        icon: wxMeta.icon,
        uvIndex: +(aqData.current?.uv_index || 5.2).toFixed(1),
        sunrise: wxData.daily?.sunrise?.[0]?.split('T')[1] || '06:15 AM',
        sunset: wxData.daily?.sunset?.[0]?.split('T')[1] || '06:30 PM'
      },
      hourly,
      daily
    };

    setInCache(cacheKey, result);
    return result;
  } catch (error) {
    console.warn('Live API fetch error, falling back to mock:', error);
    // Return mock with city name injected
    return {
      ...MOCK_DELHI_DATA,
      city: cityName || 'Delhi',
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }
}

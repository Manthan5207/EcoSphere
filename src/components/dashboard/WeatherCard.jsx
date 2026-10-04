import React from 'react';
import { Card } from '../common/Card';
import { 
  Sun, 
  SunMedium, 
  CloudSun, 
  Cloud, 
  CloudFog, 
  CloudDrizzle, 
  CloudRain, 
  CloudSnow, 
  CloudLightning,
  Wind,
  Droplets,
  Gauge as GaugeIcon,
  Sunrise,
  Sunset,
  Thermometer
} from 'lucide-react';

const iconMap = {
  Sun,
  SunMedium,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning
};

export default function WeatherCard({ weather = {} }) {
  const IconComponent = iconMap[weather.icon] || Sun;

  return (
    <Card className="p-6 relative overflow-hidden" hover={false}>
      {/* Background Gradient Orbs */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Current Atmosphere
          </span>
          <h3 className="text-xl font-heading font-bold text-slate-800 dark:text-white mt-0.5">
            {weather.weatherLabel || 'Mainly Clear'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
            <Thermometer className="w-3.5 h-3.5 text-amber-500" />
            Feels like {weather.apparentTemperature ?? weather.temperature}°C
          </p>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-sky-500/10 dark:bg-sky-500/20 flex items-center justify-center text-sky-500 dark:text-sky-300 shadow-inner">
          <IconComponent className="w-8 h-8" />
        </div>
      </div>

      {/* Main Temperature Display */}
      <div className="my-5 flex items-baseline gap-2">
        <span className="text-5xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight">
          {weather.temperature ?? '--'}
        </span>
        <span className="text-2xl font-bold text-slate-400">°C</span>
      </div>

      {/* Micro Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/40">
          <Droplets className="w-4 h-4 text-sky-500 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Humidity</span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {weather.humidity ?? '--'}%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/40">
          <Wind className="w-4 h-4 text-teal-500 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Wind Speed</span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {weather.windSpeed ?? '--'} km/h
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/40">
          <GaugeIcon className="w-4 h-4 text-purple-500 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Pressure</span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {weather.pressure ?? '--'} hPa
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/40">
          <Sun className="w-4 h-4 text-amber-500 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">UV Index</span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {weather.uvIndex ?? '--'} UVI
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

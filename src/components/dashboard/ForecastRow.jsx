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
  Droplets
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

export default function ForecastRow({ daily = [] }) {
  if (!daily || !daily.length) return null;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-heading font-bold text-slate-800 dark:text-white">
          7-Day Weather Forecast
        </h3>
        <span className="text-xs text-slate-400">Open-Meteo High-Resolution Model</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {daily.map((item, idx) => {
          const IconComponent = iconMap[item.icon] || Sun;
          const isToday = idx === 0;

          return (
            <Card
              key={`${item.day}-${idx}`}
              className={`p-3.5 flex flex-col items-center justify-between text-center transition-all ${
                isToday ? 'border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-950/20' : ''
              }`}
              hover={true}
            >
              <span className={`text-xs font-bold uppercase tracking-wider ${isToday ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>
                {item.day}
              </span>

              <div className="my-2.5 p-2 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 text-sky-500">
                <IconComponent className="w-6 h-6" />
              </div>

              <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300 truncate max-w-full block">
                {item.label}
              </span>

              <div className="flex items-center gap-2 mt-2 font-heading">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {item.tempMax}°
                </span>
                <span className="text-xs text-slate-400">
                  {item.tempMin}°
                </span>
              </div>

              {item.rainProb > 0 && (
                <div className="flex items-center gap-1 mt-1 text-[10px] text-sky-500 font-medium">
                  <Droplets className="w-3 h-3" />
                  <span>{item.rainProb}%</span>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

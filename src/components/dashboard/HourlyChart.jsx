import React, { useState } from 'react';
import { Card } from '../common/Card';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { Activity, Thermometer, Wind } from 'lucide-react';

export default function HourlyChart({ hourly = [] }) {
  const [metric, setMetric] = useState('aqi'); // 'aqi' | 'temp' | 'pm25'

  if (!hourly || !hourly.length) return null;

  const metricConfig = {
    aqi: {
      key: 'aqi',
      label: 'Air Quality (US AQI)',
      unit: 'AQI',
      stroke: '#EF4444',
      fill: 'url(#aqiGradient)',
      icon: Activity,
    },
    temp: {
      key: 'temp',
      label: 'Temperature (°C)',
      unit: '°C',
      stroke: '#38BDF8',
      fill: 'url(#tempGradient)',
      icon: Thermometer,
    },
    pm25: {
      key: 'pm25',
      label: 'PM2.5 (Fine Dust)',
      unit: 'µg/m³',
      stroke: '#F59E0B',
      fill: 'url(#pm25Gradient)',
      icon: Wind,
    }
  };

  const current = metricConfig[metric];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 text-white p-3 rounded-xl border border-emerald-500/30 shadow-xl text-xs">
          <p className="font-semibold text-slate-400 mb-1">{label} Forecast</p>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: current.stroke }}></span>
            <span className="font-bold text-sm">
              {payload[0].value} {current.unit}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6" hover={false}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-lg font-heading font-bold text-slate-800 dark:text-white">
            24-Hour Atmospheric Trajectory
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time projection across daytime solar & boundary layer cycles
          </p>
        </div>

        {/* Toggle Pills */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900/60 p-1 rounded-xl border border-emerald-500/10">
          <button
            onClick={() => setMetric('aqi')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              metric === 'aqi'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Air Quality (AQI)
          </button>
          <button
            onClick={() => setMetric('temp')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              metric === 'temp'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Temperature (°C)
          </button>
          <button
            onClick={() => setMetric('pm25')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              metric === 'pm25'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            PM2.5 (µg/m³)
          </button>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={hourly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="pm25Gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(100, 116, 139, 0.15)" />
            <XAxis 
              dataKey="time" 
              tickLine={false} 
              stroke="#94a3b8" 
              fontSize={11} 
              tickMargin={8} 
            />
            <YAxis 
              tickLine={false} 
              stroke="#94a3b8" 
              fontSize={11} 
              domain={['auto', 'auto']} 
            />
            <RechartsTooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={current.key}
              stroke={current.stroke}
              strokeWidth={3}
              fill={current.fill}
              dot={{ r: 3, fill: current.stroke }}
              activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

import React from 'react';
import { Card } from '../common/Card';
import AnimatedCounter from '../common/AnimatedCounter';
import { 
  Thermometer, 
  Wind, 
  CloudRain, 
  Volume2, 
  HeartPulse, 
  Trees, 
  ArrowUp, 
  ArrowDown, 
  Minus 
} from 'lucide-react';

export default function ImpactMetrics({ metrics }) {
  if (!metrics) return null;

  const items = [
    {
      key: 'temp',
      title: 'Local Temperature',
      data: metrics.temp,
      icon: Thermometer,
      invertGood: true, // lower is better
      description: 'Microclimate ambient heat'
    },
    {
      key: 'aqi',
      title: 'Air Quality (US AQI)',
      data: metrics.aqi,
      icon: Wind,
      invertGood: true,
      description: 'Overall respiratory exposure'
    },
    {
      key: 'pm25',
      title: 'PM2.5 Concentration',
      data: metrics.pm25,
      icon: Wind,
      invertGood: true,
      description: 'Fine alveolar particulates'
    },
    {
      key: 'co2',
      title: 'Atmospheric CO₂',
      data: metrics.co2,
      icon: CloudRain,
      invertGood: true,
      description: 'Global warming driving gas'
    },
    {
      key: 'noise',
      title: 'Acoustic Noise',
      data: metrics.noise,
      icon: Volume2,
      invertGood: true,
      description: 'Continuous street decibels'
    },
    {
      key: 'health',
      title: 'Health Safety Index',
      data: metrics.health,
      icon: HeartPulse,
      invertGood: false, // higher is better
      description: 'Hospitalization risk index'
    },
    {
      key: 'biodiversity',
      title: 'Biodiversity Vitality',
      data: metrics.biodiversity,
      icon: Trees,
      invertGood: false,
      description: 'Avian & pollinator presence'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white">
          Simulated Environmental Feedback
        </h3>
        <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
          Real-Time Delta vs Baseline
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item) => {
          const { data, icon: Icon, invertGood } = item;
          const delta = data.delta;
          const isZero = delta === 0;
          const isPositive = delta > 0;
          
          // Determine if the change is an environmental improvement (green) or degradation (red)
          const isImprovement = isZero 
            ? null 
            : invertGood 
            ? !isPositive // for temp, aqi, noise: decreasing is good!
            : isPositive; // for health, biodiversity: increasing is good!

          const badgeBg = isZero
            ? 'bg-slate-500/10 text-slate-400 border-slate-500/20'
            : isImprovement
            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
            : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30';

          return (
            <Card key={item.key} className="p-4" hover={true}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 block">{item.description}</span>
                  </div>
                </div>

                {/* Delta Pill */}
                <div className={`px-2 py-0.5 rounded-full text-xs font-bold border flex items-center gap-0.5 ${badgeBg}`}>
                  {isZero ? (
                    <Minus className="w-3 h-3" />
                  ) : isPositive ? (
                    <ArrowUp className="w-3 h-3" />
                  ) : (
                    <ArrowDown className="w-3 h-3" />
                  )}
                  <span>
                    {isZero ? 'Baseline' : `${isPositive ? '+' : ''}${delta} ${data.unit}`}
                  </span>
                </div>
              </div>

              {/* Value Comparison */}
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-heading font-black text-slate-900 dark:text-white">
                    <AnimatedCounter value={data.current} decimals={typeof data.current === 'number' && data.current % 1 !== 0 ? 1 : 0} />
                  </span>
                  <span className="text-xs font-medium text-slate-400 ml-1">{data.unit}</span>
                </div>

                <div className="text-[11px] text-slate-400 text-right">
                  <span>Base: {data.baseline} {data.unit}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

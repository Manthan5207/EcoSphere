import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Navigation, Loader2, X } from 'lucide-react';
import { searchCities } from '../../api/openMeteo';
import { POPULAR_CITIES } from '../../data/mock';
import { useStore } from '../../store/useStore';
import { useToast } from '../common/Toast';

export default function CitySearch({ onSelectCity }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [locating, setLocating] = useState(false);
  const containerRef = useRef(null);
  const { setLocation, location: currentLocation } = useStore();
  const { addToast } = useToast();

  // Debounced search
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      const res = await searchCities(query);
      setResults(res);
      setLoading(false);
      setIsOpen(true);
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (city) => {
    const loc = {
      name: city.name,
      admin1: city.admin1 || '',
      country: city.country || 'India',
      lat: city.lat,
      lon: city.lon,
    };
    setLocation(loc);
    if (onSelectCity) onSelectCity(loc);
    setQuery('');
    setIsOpen(false);
    addToast({ message: `Location updated to ${loc.name}`, type: 'success' });
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      addToast({ message: 'Geolocation is not supported by your browser', type: 'error' });
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const loc = {
          name: 'Your Location',
          admin1: '',
          country: '',
          lat,
          lon,
        };
        setLocation(loc);
        if (onSelectCity) onSelectCity(loc);
        setLocating(false);
        addToast({ message: 'Loaded live sensor data for your GPS coordinates', type: 'success' });
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setLocating(false);
        addToast({ message: 'Could not access GPS location. Switched to Delhi.', type: 'warning' });
      },
      { timeout: 8000 }
    );
  };

  return (
    <div className="w-full" ref={containerRef}>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            {loading ? <Loader2 className="w-4 h-4 animate-spin text-emerald-500" /> : <Search className="w-4 h-4" />}
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder={`Search Indian or global cities (e.g. Mumbai, Bengaluru, Tokyo)...`}
            className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-white/90 dark:bg-[#12201A] border border-emerald-500/20 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm shadow-sm transition-all"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setResults([]); }}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Autocomplete Dropdown */}
          {isOpen && (results.length > 0 || query.length >= 2) && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl z-50 overflow-hidden max-h-60 overflow-y-auto">
              {results.length > 0 ? (
                results.map((city, idx) => (
                  <button
                    key={`${city.lat}-${city.lon}-${idx}`}
                    onClick={() => handleSelect(city)}
                    className="w-full px-4 py-2.5 text-left text-sm flex items-center justify-between hover:bg-emerald-500/10 transition-colors border-b border-slate-100 dark:border-slate-800/60 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{city.name}</span>
                      {city.admin1 && (
                        <span className="text-xs text-slate-400">{city.admin1}, {city.country}</span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {city.lat.toFixed(2)}°, {city.lon.toFixed(2)}°
                    </span>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-slate-400">
                  {loading ? 'Searching satellite database...' : 'No matching cities found.'}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Use My Location Button */}
        <button
          onClick={handleUseMyLocation}
          disabled={locating}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-glow-emerald transition-all active:scale-95 whitespace-nowrap disabled:opacity-50"
        >
          {locating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
          <span>{locating ? 'Locating...' : 'Use My GPS'}</span>
        </button>
      </div>

      {/* Quick Select Popular Cities Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-2 no-scrollbar">
        <span className="text-[11px] font-medium text-slate-400 shrink-0 mr-1">Popular:</span>
        {POPULAR_CITIES.map((c) => {
          const isSelected = currentLocation.name === c.name;
          return (
            <button
              key={c.name}
              onClick={() => handleSelect(c)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-emerald-500 text-white font-bold border-emerald-500 shadow-sm'
                  : 'bg-white/60 dark:bg-emerald-950/30 text-slate-600 dark:text-slate-300 border-emerald-500/15 hover:border-emerald-500/40 hover:bg-emerald-50 dark:hover:bg-emerald-900/30'
              }`}
            >
              {c.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

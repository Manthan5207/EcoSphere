import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  MapPin, 
  Home as HomeIcon, 
  Car, 
  Utensils, 
  Zap, 
  Settings, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  Trash2, 
  Save, 
  Camera, 
  Check, 
  X, 
  Activity,
  Award,
  Flame,
  Globe,
  Trophy
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useStore } from '../store/useStore';
import { useLeaderboardStore } from '../store/useLeaderboardStore';
import { useToast } from '../components/common/Toast';
import CitySearch from '../components/dashboard/CitySearch';
import { Card } from '../components/common/Card';

const PRESET_INITIALS = ['AS', 'RS', 'PP', 'AM', 'ES', 'VK'];

export default function Profile() {
  const navigate = useNavigate();
  const { profile, updateProfile, isDemo, autofillSampleData, deleteLocalData, user } = useAuthStore();
  const { ecoScore, streak, pledges, badges, footprint } = useStore();
  const { addToast } = useToast();

  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    displayName: profile?.displayName || 'Alex Sharma',
    email: profile?.email || 'alex.sharma@ecosphere.app',
    photoURL: profile?.photoURL || '',
    initials: profile?.initials || 'AS',
    providerLabel: profile?.providerLabel || 'Demo Account',
    homeCity: profile?.homeCity || { name: 'Delhi', lat: 28.6139, lon: 77.2090, admin1: 'Delhi', country: 'India' },
    country: profile?.country || 'India',
    currency: profile?.currency || 'INR',
    units: profile?.units || 'metric',
    householdSize: profile?.householdSize || 4,
    homeType: profile?.homeType || 'apartment',
    mainCommute: profile?.mainCommute || 'metro-train',
    averageDailyCommuteKm: profile?.averageDailyCommuteKm || 16,
    dietType: profile?.dietType || 'vegetarian',
    monthlyElectricityKwh: profile?.monthlyElectricityKwh || 180,
    theme: profile?.theme || 'light',
    aqiAlertThreshold: profile?.aqiAlertThreshold || 150,
    emailTips: profile?.emailTips !== undefined ? profile?.emailTips : true,
    memberSince: profile?.memberSince || 'Oct 2026'
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Sync state if profile changes
  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        ...profile,
        initials: profile.initials || 'AS'
      }));
    }
  }, [profile]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handlePresetInitials = (init) => {
    setFormData(prev => ({ ...prev, initials: init, photoURL: '' }));
    setHasChanges(true);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 200 * 1024) {
      addToast({ message: 'Please select an image smaller than 200 KB.', type: 'warning' });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData(prev => ({ ...prev, photoURL: reader.result }));
      setHasChanges(true);
      addToast({ message: 'Avatar image updated locally.', type: 'info' });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e?.preventDefault();
    if (!formData.displayName.trim()) {
      addToast({ message: 'Full Name is required.', type: 'warning' });
      return;
    }

    updateProfile(formData);
    setHasChanges(false);
    addToast({ message: 'Profile changes saved successfully!', type: 'success' });
  };

  const handleAutofill = () => {
    autofillSampleData();
    addToast({ message: 'Autofilled sample lifestyle profile data.', type: 'info' });
  };

  const handleDeleteConfirm = () => {
    deleteLocalData();
    setShowDeleteModal(false);
    addToast({ message: 'Local profile and user data cleared.', type: 'info' });
    navigate('/', { replace: true });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-20 space-y-8">
      {/* Header Bar */}
      <div className="glass-card p-5 rounded-2xl border border-white/60 dark:border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30 uppercase tracking-wider">
              Campus & Planetary Identity
            </span>
            {isDemo && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40">
                Demo Account
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white mt-1">
            Edit User Profile
          </h1>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Autofill sample button */}
          <button
            type="button"
            onClick={handleAutofill}
            className="text-xs font-semibold px-3 py-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all flex items-center gap-1.5"
            title="Autofill sample data for quick demo"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autofill Sample</span>
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Edit Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Avatar Selection Bar (Image 4 format) */}
        <Card className="p-6" hover={false}>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4">
            Select Avatar Preset or Custom Initials
          </label>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Active Large Avatar */}
            <div className="relative group">
              <div className="w-20 h-20 rounded-full bg-slate-950 text-white font-heading font-black text-2xl flex items-center justify-center shadow-xl overflow-hidden border-2 border-emerald-500/40">
                {formData.photoURL ? (
                  <img src={formData.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span>{formData.initials || 'AS'}</span>
                )}
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-1.5 rounded-full bg-emerald-600 text-white shadow-md hover:bg-emerald-500 transition-transform active:scale-90"
                title="Upload custom image (Max 200 KB)"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* Presets Grid */}
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                {PRESET_INITIALS.map((init) => (
                  <button
                    key={init}
                    type="button"
                    onClick={() => handlePresetInitials(init)}
                    className={`w-10 h-10 rounded-full font-bold text-xs flex items-center justify-center transition-all ${
                      formData.initials === init && !formData.photoURL
                        ? 'bg-pink-600 text-white ring-2 ring-pink-400 shadow-md scale-105'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                    }`}
                  >
                    {init}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => handlePresetInitials('🌱')}
                  className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sm hover:border-emerald-500"
                  title="Leaf icon"
                >
                  🌿
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetInitials('⚡')}
                  className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sm hover:border-emerald-500"
                  title="Energy spark"
                >
                  ⚡
                </button>
              </div>

              {/* Custom Initials Input */}
              <input
                type="text"
                maxLength={3}
                value={formData.initials}
                onChange={(e) => {
                  handleChange('initials', e.target.value.toUpperCase());
                  handleChange('photoURL', '');
                }}
                placeholder="Or custom 2-letter initials"
                className="w-full sm:w-64 px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white uppercase font-mono focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </Card>

        {/* 2. Account & Identity Card */}
        <Card className="p-6" hover={false}>
          <h3 className="text-sm font-heading font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-500" />
            Account Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.displayName}
                onChange={(e) => handleChange('displayName', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Email Address (Read-Only)
              </label>
              <input
                type="email"
                disabled
                value={formData.email}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm cursor-not-allowed"
              />
            </div>
          </div>
        </Card>

        {/* 3. Location & Atmospheric Settings */}
        <Card className="p-6" hover={false}>
          <h3 className="text-sm font-heading font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-500" />
            Home Location & Air Quality Alert
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Home City (Autofills Dashboard Location) *
              </label>
              <CitySearch onSelectCity={(city) => handleChange('homeCity', city)} />
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 flex items-center gap-1">
                <span>Active Home Location: <strong>{formData.homeCity.name}</strong> ({formData.homeCity.admin1 ? `${formData.homeCity.admin1}, ` : ''}{formData.homeCity.country})</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  AQI Warning Alert Threshold
                </label>
                <select
                  value={formData.aqiAlertThreshold}
                  onChange={(e) => handleChange('aqiAlertThreshold', parseInt(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:border-emerald-500 focus:outline-none"
                >
                  <option value={50}>AQI &gt; 50 (Moderate+)</option>
                  <option value={100}>AQI &gt; 100 (Unhealthy for Sensitive+)</option>
                  <option value={150}>AQI &gt; 150 (Unhealthy - Default)</option>
                  <option value={200}>AQI &gt; 200 (Very Unhealthy / Severe)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Preferred Currency
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => handleChange('currency', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:border-emerald-500 focus:outline-none"
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Units of Measure
                </label>
                <select
                  value={formData.units}
                  onChange={(e) => handleChange('units', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:border-emerald-500 focus:outline-none"
                >
                  <option value="metric">Metric (kg, km, °C)</option>
                  <option value="imperial">Imperial (lbs, miles, °F)</option>
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* 4. Household & Lifestyle Parameters (Pre-fills Carbon Calculator) */}
        <Card className="p-6" hover={false}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-heading font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <HomeIcon className="w-4 h-4 text-emerald-500" />
              Household & Lifestyle (Pre-fills Calculator)
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              IPCC Calibrated
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Household Size
              </label>
              <select
                value={formData.householdSize}
                onChange={(e) => handleChange('householdSize', parseInt(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:border-emerald-500 focus:outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Home Type
              </label>
              <select
                value={formData.homeType}
                onChange={(e) => handleChange('homeType', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:border-emerald-500 focus:outline-none"
              >
                <option value="apartment">Apartment / Flat</option>
                <option value="independent house">Independent House</option>
                <option value="hostel">Hostel / Hall of Residence</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Primary Commute
              </label>
              <select
                value={formData.mainCommute}
                onChange={(e) => handleChange('mainCommute', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:border-emerald-500 focus:outline-none"
              >
                <option value="metro-train">Metro Train / Public Rail</option>
                <option value="bus">Public Bus Transit</option>
                <option value="two-wheeler">Two-Wheeler (Scooter/Bike)</option>
                <option value="car">Petrol / Diesel Car</option>
                <option value="auto-rickshaw">Auto-Rickshaw / Cab</option>
                <option value="walk-cycle">Walking / Bicycle</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Avg Daily Commute (km)
              </label>
              <input
                type="number"
                min="0"
                max="250"
                value={formData.averageDailyCommuteKm}
                onChange={(e) => handleChange('averageDailyCommuteKm', parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Dietary Pattern
              </label>
              <select
                value={formData.dietType}
                onChange={(e) => handleChange('dietType', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:border-emerald-500 focus:outline-none"
              >
                <option value="vegan">Vegan (Zero animal products)</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="eggetarian">Eggetarian</option>
                <option value="occasional meat">Occasional Meat (1-2x/wk)</option>
                <option value="meat daily">Daily Meat</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Monthly Electricity (kWh)
              </label>
              <input
                type="number"
                min="10"
                max="2000"
                value={formData.monthlyElectricityKwh}
                onChange={(e) => handleChange('monthlyElectricityKwh', parseInt(e.target.value) || 100)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </Card>

        {/* 5. My Leaderboard Stats */}
        <Card className="p-6 space-y-4" hover={false}>
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <h3 className="text-sm font-heading font-bold text-slate-900 dark:text-white">
                My Leaderboard Stats
              </h3>
            </div>
            <button
              type="button"
              onClick={() => navigate('/leaderboard')}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>View Leaderboard</span>
              <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Best Rank</span>
              <span className="text-xl font-heading font-black text-amber-600 dark:text-amber-400">#3</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Global Tier</span>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Weeks Won</span>
              <span className="text-xl font-heading font-black text-emerald-600 dark:text-emerald-400">
                {currentUser?.weeksWon ?? (isDemo ? 1 : 0)}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Planet Hero Titles</span>
            </div>

            <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Points</span>
              <span className="text-xl font-heading font-black text-sky-600 dark:text-sky-400">
                {(currentUser?.totalPoints ?? (isDemo ? 1280 : 0)).toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">All-Time Points</span>
            </div>

            <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Streak</span>
              <span className="text-xl font-heading font-black text-orange-500 flex items-center justify-center gap-1">
                <Flame className="w-5 h-5 fill-orange-500" />
                <span>{currentUser?.streak ?? streak}d</span>
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">+10 bonus active</span>
            </div>
          </div>
        </Card>

        {/* 6. Verification & Trust Card (Image 5 style) */}
        <div className="p-4 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <span className="text-slate-500 dark:text-slate-400 block uppercase font-medium">Verification Status:</span>
            <div className="font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Verified Planetary Identity ({formData.providerLabel})</span>
            </div>
          </div>

          <div className="space-y-1 sm:text-right">
            <span className="text-slate-500 dark:text-slate-400 block uppercase font-medium">Eco Trust & Impact Rating:</span>
            <div className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{ecoScore}/100 Rating ({badges.length} Badges • {streak}d Streak)</span>
            </div>
          </div>
        </div>

        {/* Unsaved Changes Banner */}
        {hasChanges && (
          <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-200 text-xs flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              You have unsaved changes. Remember to click "Save Profile".
            </span>
          </div>
        )}

        {/* Bottom Actions Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete my local data</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-heading font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile</span>
            </button>
          </div>
        </div>
      </form>

      {/* Confirmation Modal for Deleting Local Data */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card p-6 rounded-3xl max-w-sm w-full border border-rose-500/30 space-y-4 shadow-2xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-500 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                Delete Local Data?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                This will clear your local stored profile, pledges, and custom settings from this browser session.
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md"
                >
                  Yes, Delete Data
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

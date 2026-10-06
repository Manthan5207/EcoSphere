import React, { useState, useRef, useEffect, useMemo } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Globe2, 
  LayoutDashboard, 
  Calculator, 
  Sliders, 
  CheckSquare, 
  BookOpen, 
  Trophy,
  User, 
  UserCheck,
  LogOut, 
  Edit3, 
  ChevronDown, 
  Star, 
  Sparkles,
  Footprints,
  Leaf,
  Presentation
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuthStore } from '../../store/useAuthStore';
import { useStore } from '../../store/useStore';
import { useLeaderboardStore } from '../../store/useLeaderboardStore';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/calculator', label: 'Calculator', icon: Calculator },
  { path: '/whatif', label: 'SCENARIO', icon: Sliders },
  { path: '/actions', label: 'Plan', icon: CheckSquare },
  { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { path: '/learn', label: 'Learn', icon: BookOpen },
  { path: '/pitch', label: 'Pitch Deck', icon: Presentation },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, isDemo, logout } = useAuthStore();
  const { ecoScore } = useStore();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    navigate('/');
  };

  const displayName = profile?.displayName || user?.displayName || 'Alex Sharma';
  const nameParts = displayName.split(' ');
  const shortName = nameParts.length > 1 ? `${nameParts[0]} ${nameParts[1][0]}.` : nameParts[0];
  const initials = profile?.initials || (nameParts[0]?.[0] + (nameParts[1]?.[0] || '')).toUpperCase() || 'AS';
  const homeCityName = profile?.homeCity?.name || 'Delhi';

  const { players } = useLeaderboardStore();
  const userRank = React.useMemo(() => {
    if (!user) return null;
    const sorted = [...players].sort((a, b) => b.weeklyPoints - a.weeklyPoints);
    const targetUid = user.uid;
    const idx = sorted.findIndex(p => p.uid === targetUid || (isDemo && (p.isDemo || p.uid === 'user-demo')));
    return idx !== -1 ? idx + 1 : null;
  }, [players, user, isDemo]);

  return (
    <>
      {/* Top Floating Glass Navbar */}
      <header className="w-full pt-3 pb-1 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-50">
        <div className="glass rounded-full px-5 py-2 flex items-center justify-between shadow-glass dark:shadow-glass-dark border border-white/60 dark:border-emerald-500/20">
          {/* Brand Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-glow-emerald group-hover:scale-105 transition-transform duration-300">
              <Globe2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
              EcoSphere
            </span>
          </NavLink>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-slate-900 dark:text-white font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-emerald-500"></span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Controls: User Avatar Button / Login + Theme Switch */}
          <div className="flex items-center gap-2.5">
            {user && userRank && (
              <Link
                to="/leaderboard"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-bold transition-all shadow-sm"
                title="Your Current Weekly Leaderboard Rank"
              >
                <span>🏆</span>
                <span>#{userRank}</span>
              </Link>
            )}

            {user ? (
              <div className="relative" ref={dropdownRef}>
                {/* Pill Avatar Button matching Image 1 */}
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-all shadow-sm group"
                >
                  <div className="w-7 h-7 rounded-full bg-slate-950 text-white font-heading font-bold text-[11px] flex items-center justify-center overflow-hidden shrink-0 border border-emerald-500/30">
                    {profile?.photoURL ? (
                      <img src={profile.photoURL} alt={displayName} className="w-full h-full object-cover" />
                    ) : (
                      <span>{initials}</span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-500 hidden sm:inline">
                    {shortName}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-emerald-500' : ''}`} />
                </button>

                {/* Dropdown Card (Image 1 Style) */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-3xl bg-white dark:bg-[#0D1B1E] border border-slate-200 dark:border-emerald-500/30 shadow-2xl p-4 space-y-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {/* User Identity Details */}
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white truncate">
                          {displayName}
                        </h4>
                        {isDemo && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                            Demo
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {homeCityName} • {profile?.homeType || 'Apartment'}
                      </p>
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-500 mt-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{ecoScore}/100 Verified Eco Citizen</span>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800"></div>

                    {/* Quick Menu Items */}
                    <div className="space-y-1 text-xs">
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 font-medium transition-colors"
                      >
                        <Edit3 className="w-4 h-4 text-emerald-500" />
                        <span>Edit Profile</span>
                      </Link>

                      <Link
                        to="/leaderboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 font-medium transition-colors"
                      >
                        <Trophy className="w-4 h-4 text-amber-500" />
                        <span>Weekly Leaderboard</span>
                      </Link>

                      <Link
                        to="/calculator"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 font-medium transition-colors"
                      >
                        <Footprints className="w-4 h-4 text-sky-500" />
                        <span>My Carbon Footprint</span>
                      </Link>

                      <Link
                        to="/actions"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 font-medium transition-colors"
                      >
                        <CheckSquare className="w-4 h-4 text-emerald-500" />
                        <span>My Action Pledges</span>
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800"></div>

                    {/* Log Out Button (Rose-tinted Image 1 style) */}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 p-2 rounded-xl bg-pink-50 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400 hover:bg-pink-100 dark:hover:bg-pink-900/40 text-xs font-bold transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-heading font-bold shadow-sm transition-all"
              >
                <User className="w-3.5 h-3.5" />
                <span>Log in</span>
              </Link>
            )}

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-emerald-500/20 px-1 py-1 shadow-glass-dark">
        <div className="grid grid-cols-7 gap-0.5 items-center">
          <NavLink
            to="/"
            className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-lg transition-all ${
              location.pathname === '/'
                ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 font-bold'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <Globe2 className="w-4 h-4" />
            <span className="text-[9px] mt-0.5">Home</span>
          </NavLink>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
                  isActive
                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-emerald-500'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[54px]">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}

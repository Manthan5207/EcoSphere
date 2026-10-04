import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe2, 
  Mail, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Leaf, 
  UserCheck, 
  AlertCircle 
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useToast } from '../components/common/Toast';
import GlobeIllustration from '../components/common/GlobeIllustration';

// Inline Official SVG Icons
function GoogleIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function MicrosoftIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 23 23">
      <path fill="#f35325" d="M1 1h10v10H1z"/>
      <path fill="#81bc06" d="M12 1h10v10H12z"/>
      <path fill="#05a6f0" d="M1 12h10v10H1z"/>
      <path fill="#ffba08" d="M12 12h10v10H12z"/>
    </svg>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();
  const { 
    loginWithGoogle, 
    loginWithGithub, 
    loginWithMicrosoft, 
    signupEmail, 
    loginEmail, 
    resetPassword, 
    loginDemo, 
    loginGuest,
    hasFirebaseKeys,
    user 
  } = useAuthStore();

  const [mode, setMode] = useState('signup'); // 'signup' | 'login'
  const [view, setView] = useState('providers'); // 'providers' | 'emailForm'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Intended redirect URL
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSuccess = (isNewUser = false) => {
    addToast({ 
      message: `Welcome to EcoSphere, ${useAuthStore.getState().profile?.displayName || 'Explorer'}!`, 
      type: 'success' 
    });
    if (isNewUser && !useAuthStore.getState().profile?.hasCompletedOnboarding) {
      navigate('/onboarding', { replace: true });
    } else {
      navigate(from, { replace: true });
    }
  };

  const handleSocialAuth = async (providerFunc) => {
    if (!hasFirebaseKeys) {
      addToast({ 
        message: 'Firebase keys are not configured in .env. Using Demo Account instead.', 
        type: 'info' 
      });
      loginDemo();
      handleSuccess(false);
      return;
    }

    setLoading(true);
    try {
      await providerFunc();
      handleSuccess(false);
    } catch (err) {
      console.error('Auth error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        addToast({ message: 'Sign-in window was closed.', type: 'info' });
      } else if (err.code === 'auth/account-exists-with-different-credential') {
        addToast({ message: 'An account already exists with this email using another provider.', type: 'warning' });
      } else {
        addToast({ message: err.message || 'Authentication failed. Try Demo Account.', type: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast({ message: 'Please enter both email and password.', type: 'warning' });
      return;
    }

    if (!hasFirebaseKeys) {
      addToast({ 
        message: 'Firebase is not connected in .env. Logging into Demo Account.', 
        type: 'info' 
      });
      loginDemo();
      handleSuccess(false);
      return;
    }

    setLoading(true);
    try {
      if (mode === 'signup') {
        await signupEmail(email, password, displayName || email.split('@')[0]);
        handleSuccess(true);
      } else {
        await loginEmail(email, password);
        handleSuccess(false);
      }
    } catch (err) {
      console.error('Email auth error:', err);
      let msg = 'Authentication error occurred.';
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        msg = 'Incorrect password. Try again or reset password.';
      } else if (err.code === 'auth/user-not-found') {
        msg = 'No account found with this email. Switch to Sign Up.';
      } else if (err.code === 'auth/email-already-in-use') {
        msg = 'This email is already registered. Please log in.';
      } else if (err.code === 'auth/weak-password') {
        msg = 'Password should be at least 6 characters.';
      }
      addToast({ message: msg, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      addToast({ message: 'Enter your email address above to receive a reset link.', type: 'warning' });
      return;
    }
    if (!hasFirebaseKeys) {
      addToast({ message: 'Demo mode: Password reset email simulation sent.', type: 'info' });
      return;
    }
    try {
      await resetPassword(email);
      addToast({ message: `Password reset email sent to ${email}`, type: 'success' });
    } catch (err) {
      addToast({ message: err.message || 'Failed to send reset email.', type: 'error' });
    }
  };

  const handleDemoSignIn = () => {
    loginDemo();
    addToast({ message: 'Signed in as Aarav Sharma (Demo Account)', type: 'success' });
    navigate(from, { replace: true });
  };

  const handleGuestSignIn = () => {
    loginGuest();
    addToast({ message: 'Continuing as Guest Explorer with standard features.', type: 'info' });
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Branding & Eco Visual Column */}
        <div className="lg:col-span-6 space-y-6 text-left hidden lg:block">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-xs border border-emerald-500/20">
            <Leaf className="w-3.5 h-3.5" />
            <span>EcoSphere Identity & Carbon Pass</span>
          </div>

          <h1 className="text-4xl font-heading font-black text-slate-900 dark:text-white leading-tight">
            See your planet.<br />
            <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500 bg-clip-text text-transparent">
              Shape its future.
            </span>
          </h1>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-md">
            Understand. Simulate. Act. Join thousands taking measurable climate action with hyper-local air monitoring and tailored emission reductions.
          </p>

          <div className="p-4 rounded-2xl glass-card border border-emerald-500/20 max-w-md space-y-2.5">
            <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Personalized household carbon footprint & IPCC targets</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Real-time localized AQI alerts with WHO health safety limits</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Verifiable climate action pledges & Eco Badges collection</span>
            </div>
          </div>

          <div className="pt-2 flex justify-center max-w-md">
            <div className="scale-90">
              <GlobeIllustration />
            </div>
          </div>
        </div>

        {/* Right Side: Authentication Card */}
        <div className="lg:col-span-6 w-full max-w-md mx-auto">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/70 dark:border-emerald-500/30 shadow-2xl relative overflow-hidden">
            {/* Top Logo / Title */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-glow-emerald mb-3">
                <Globe2 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-heading font-black text-slate-900 dark:text-white">
                {mode === 'signup' ? 'Create an EcoSphere account' : 'Log in to EcoSphere'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Understand • Simulate • Act
              </p>
            </div>

            {/* Missing Firebase Keys Notice */}
            {!hasFirebaseKeys && (
              <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-700 dark:text-amber-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Prototype Demo Mode Active:</strong> Firebase keys are optional. Click <strong>"Try Demo Account"</strong> below for an instant full live preview!
                </span>
              </div>
            )}

            {/* Providers View vs Email Form View */}
            <AnimatePresence mode="wait">
              {view === 'providers' ? (
                <motion.div
                  key="providers"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3"
                >
                  {/* Google Button */}
                  <button
                    onClick={() => handleSocialAuth(loginWithGoogle)}
                    disabled={loading}
                    type="button"
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/90 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-medium text-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-3 transition-all active:scale-98 shadow-sm"
                  >
                    <GoogleIcon className="w-4 h-4" />
                    <span>Continue with Google</span>
                  </button>

                  {/* GitHub Button */}
                  <button
                    onClick={() => handleSocialAuth(loginWithGithub)}
                    disabled={loading}
                    type="button"
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/90 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-medium text-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-3 transition-all active:scale-98 shadow-sm"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Continue with GitHub</span>
                  </button>

                  {/* Microsoft Button */}
                  <button
                    onClick={() => handleSocialAuth(loginWithMicrosoft)}
                    disabled={loading}
                    type="button"
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/90 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-medium text-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-3 transition-all active:scale-98 shadow-sm"
                  >
                    <MicrosoftIcon className="w-4 h-4" />
                    <span>Continue with Microsoft</span>
                  </button>

                  {/* Divider */}
                  <div className="relative my-4 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                    </div>
                    <span className="relative px-3 bg-white dark:bg-[#0D1B1E] text-xs font-semibold text-slate-400 uppercase">
                      Or
                    </span>
                  </div>

                  {/* Email & Password Option */}
                  <button
                    onClick={() => setView('emailForm')}
                    type="button"
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/90 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-medium text-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-3 transition-all active:scale-98 shadow-sm"
                  >
                    <Mail className="w-4 h-4 text-emerald-500" />
                    <span>Email & password</span>
                  </button>

                  {/* Try Demo Account Button */}
                  <button
                    onClick={handleDemoSignIn}
                    type="button"
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-heading font-bold text-sm shadow-glow-emerald flex items-center justify-center gap-2 transition-all active:scale-98"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Try Demo Account (Zero Network)</span>
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="emailForm"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleEmailAuth}
                  className="space-y-4"
                >
                  {mode === 'signup' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Alex Sharma"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex.sharma@campus.edu"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        <span>{showPassword ? 'Hide' : 'Show'}</span>
                      </button>
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  {mode === 'login' && (
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-xs text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-heading font-bold text-sm shadow-md transition-all active:scale-98 disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : mode === 'signup' ? 'Create Account' : 'Log in with Email'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setView('providers')}
                    className="w-full text-center text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-emerald-500 pt-1 transition-colors"
                  >
                    ← Back to all options
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Mode Switcher: Log in <-> Sign up */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-center space-y-2">
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode(mode === 'signup' ? 'login' : 'signup');
                    setView('providers');
                  }}
                  className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  {mode === 'signup' ? 'Log in' : 'Sign up'}
                </button>
              </p>

              <div>
                <button
                  onClick={handleGuestSignIn}
                  type="button"
                  className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline transition-colors"
                >
                  Continue as guest (limited session)
                </button>
              </div>
            </div>

            {/* Terms of Service Footer Note */}
            <p className="mt-4 text-[10px] text-center text-slate-400 leading-tight">
              By continuing, you agree to EcoSphere's <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

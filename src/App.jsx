import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import { ToastProvider } from './components/common/Toast';
import ProtectedRoute from './components/common/ProtectedRoute';
import { useStore } from './store/useStore';
import { useAuthStore } from './store/useAuthStore';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Calculator from './pages/Calculator';
import WhatIf from './pages/WhatIf';
import ActionPlan from './pages/ActionPlan';
import Learn from './pages/Learn';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainApp() {
  const { theme } = useStore();
  const { initAuthSubscriber } = useAuthStore();

  useEffect(() => {
    const unsub = initAuthSubscriber();
    return () => {
      if (typeof unsub === 'function') unsub();
    };
  }, [initAuthSubscriber]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F0FDF4] dark:bg-[#080E14] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 w-full pt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/whatif" element={<WhatIf />} />
          <Route path="/actions" element={<ProtectedRoute><ActionPlan /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
    </ToastProvider>
  );
}

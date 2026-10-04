import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  auth, 
  googleProvider, 
  githubProvider, 
  microsoftProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signOut, 
  onAuthStateChanged,
  isFirebaseConfigured 
} from '../lib/firebase';
import { useStore } from './useStore';

const DEFAULT_PROFILE = {
  displayName: 'Alex Sharma',
  email: 'alex.sharma@ecosphere.app',
  photoURL: '',
  initials: 'AS',
  providerLabel: 'Demo Account',
  homeCity: { name: 'Delhi', lat: 28.6139, lon: 77.2090, admin1: 'Delhi', country: 'India' },
  country: 'India',
  currency: 'INR',
  units: 'metric',
  householdSize: 4,
  homeType: 'apartment', // 'apartment' | 'independent house' | 'hostel'
  mainCommute: 'metro-train', // 'walk-cycle' | 'two-wheeler' | 'car' | 'bus' | 'metro-train' | 'auto-rickshaw'
  averageDailyCommuteKm: 16,
  dietType: 'vegetarian', // 'vegan' | 'vegetarian' | 'eggetarian' | 'occasional meat' | 'meat daily'
  monthlyElectricityKwh: 180,
  theme: 'light',
  aqiAlertThreshold: 150, // 50 | 100 | 150 | 200
  emailTips: true,
  memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
  hasCompletedOnboarding: false,
};

const DEMO_USER_PROFILE = {
  displayName: 'Aarav Sharma',
  email: 'aarav.demo@ecosphere.app',
  photoURL: '',
  initials: 'AS',
  providerLabel: 'Demo Account',
  homeCity: { name: 'Mumbai', lat: 19.0760, lon: 72.8777, admin1: 'Maharashtra', country: 'India' },
  country: 'India',
  currency: 'INR',
  units: 'metric',
  householdSize: 4,
  homeType: 'apartment',
  mainCommute: 'metro-train',
  averageDailyCommuteKm: 22,
  dietType: 'vegetarian',
  monthlyElectricityKwh: 220,
  theme: 'light',
  aqiAlertThreshold: 100,
  emailTips: true,
  memberSince: 'Oct 2026',
  hasCompletedOnboarding: true,
};

function getInitials(name) {
  if (!name) return 'ES';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      isDemo: false,
      authLoading: true,
      hasFirebaseKeys: isFirebaseConfigured,

      // Initializer called once on app mount
      initAuthSubscriber: () => {
        if (!isFirebaseConfigured || !auth) {
          set({ authLoading: false });
          return () => {};
        }

        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            const uid = firebaseUser.uid;
            // Load existing profile from localStorage if present
            const savedProfileRaw = localStorage.getItem(`ecosphere_profile_${uid}`);
            let profileData = null;
            if (savedProfileRaw) {
              try {
                profileData = JSON.parse(savedProfileRaw);
              } catch (e) {}
            }

            if (!profileData) {
              const displayName = firebaseUser.displayName || 'Eco Explorer';
              profileData = {
                ...DEFAULT_PROFILE,
                displayName,
                email: firebaseUser.email || '',
                photoURL: firebaseUser.photoURL || '',
                initials: getInitials(displayName),
                providerLabel: firebaseUser.providerData?.[0]?.providerId === 'google.com' 
                  ? 'Signed in with Google' 
                  : firebaseUser.providerData?.[0]?.providerId === 'github.com'
                  ? 'Signed in with GitHub'
                  : 'Signed in with Email',
                hasCompletedOnboarding: false,
              };
              localStorage.setItem(`ecosphere_profile_${uid}`, JSON.stringify(profileData));
            }

            set({
              user: {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
              },
              profile: profileData,
              isDemo: false,
              authLoading: false
            });

            // Sync home city with general store
            if (profileData.homeCity) {
              useStore.getState().setLocation(profileData.homeCity);
            }
          } else {
            // Only clear if not in demo mode
            if (!get().isDemo) {
              set({ user: null, profile: null, authLoading: false });
            } else {
              set({ authLoading: false });
            }
          }
        });

        return unsubscribe;
      },

      // Google Sign In
      loginWithGoogle: async () => {
        if (!isFirebaseConfigured) {
          throw new Error('Firebase credentials not configured. Please use Demo Account.');
        }
        set({ authLoading: true });
        try {
          const res = await signInWithPopup(auth, googleProvider);
          return res.user;
        } catch (err) {
          set({ authLoading: false });
          throw err;
        }
      },

      // GitHub Sign In
      loginWithGithub: async () => {
        if (!isFirebaseConfigured) {
          throw new Error('Firebase credentials not configured. Please use Demo Account.');
        }
        set({ authLoading: true });
        try {
          const res = await signInWithPopup(auth, githubProvider);
          return res.user;
        } catch (err) {
          set({ authLoading: false });
          throw err;
        }
      },

      // Microsoft Sign In
      loginWithMicrosoft: async () => {
        if (!isFirebaseConfigured) {
          throw new Error('Firebase credentials not configured. Please use Demo Account.');
        }
        set({ authLoading: true });
        try {
          const res = await signInWithPopup(auth, microsoftProvider);
          return res.user;
        } catch (err) {
          set({ authLoading: false });
          throw err;
        }
      },

      // Sign up with Email & Password
      signupEmail: async (email, password, displayName = 'Eco Citizen') => {
        if (!isFirebaseConfigured) {
          throw new Error('Firebase credentials not configured. Please use Demo Account.');
        }
        set({ authLoading: true });
        try {
          const res = await createUserWithEmailAndPassword(auth, email, password);
          const uid = res.user.uid;
          const newProfile = {
            ...DEFAULT_PROFILE,
            displayName,
            email,
            initials: getInitials(displayName),
            providerLabel: 'Signed in with Email',
            hasCompletedOnboarding: false,
          };
          localStorage.setItem(`ecosphere_profile_${uid}`, JSON.stringify(newProfile));
          set({ profile: newProfile });
          return res.user;
        } catch (err) {
          set({ authLoading: false });
          throw err;
        }
      },

      // Login with Email & Password
      loginEmail: async (email, password) => {
        if (!isFirebaseConfigured) {
          throw new Error('Firebase credentials not configured. Please use Demo Account.');
        }
        set({ authLoading: true });
        try {
          const res = await signInWithEmailAndPassword(auth, email, password);
          return res.user;
        } catch (err) {
          set({ authLoading: false });
          throw err;
        }
      },

      // Send Password Reset Email
      resetPassword: async (email) => {
        if (!isFirebaseConfigured) {
          throw new Error('Firebase credentials not configured. Please use Demo Account.');
        }
        await sendPasswordResetEmail(auth, email);
      },

      // Demo Account Sign In (Instant zero-network)
      loginDemo: () => {
        const demoUser = {
          uid: 'demo-aarav-sharma-2026',
          email: 'aarav.demo@ecosphere.app',
          displayName: 'Aarav Sharma',
          photoURL: '',
        };

        set({
          user: demoUser,
          profile: { ...DEMO_USER_PROFILE },
          isDemo: true,
          authLoading: false
        });

        // Set demo state in store: Eco score 62, 3 pledges, 3 badges, 5-day streak
        useStore.setState({
          location: DEMO_USER_PROFILE.homeCity,
          ecoScore: 62,
          streak: 5,
          pledges: ['metro-commute', 'solar-water', 'plant-diet-weekly'],
          badges: ['first-step', 'energy-saver', 'streak-3']
        });

        localStorage.setItem('ecosphere_profile_demo-aarav-sharma-2026', JSON.stringify(DEMO_USER_PROFILE));
      },

      // Continue as Guest
      loginGuest: () => {
        const guestUser = {
          uid: 'guest-' + Math.random().toString(36).substring(2, 9),
          email: '',
          displayName: 'Guest Explorer',
          isAnonymous: true
        };
        const guestProfile = {
          ...DEFAULT_PROFILE,
          displayName: 'Guest Explorer',
          email: 'guest@ecosphere.local',
          initials: 'GE',
          providerLabel: 'Guest Session',
          hasCompletedOnboarding: true,
        };
        set({
          user: guestUser,
          profile: guestProfile,
          isDemo: false,
          authLoading: false
        });
      },

      // Update Profile Fields
      updateProfile: (updatedFields) => {
        const currentProfile = get().profile || DEFAULT_PROFILE;
        const newProfile = {
          ...currentProfile,
          ...updatedFields,
          initials: updatedFields.displayName ? getInitials(updatedFields.displayName) : currentProfile.initials
        };

        set({ profile: newProfile });

        const user = get().user;
        if (user?.uid) {
          localStorage.setItem(`ecosphere_profile_${user.uid}`, JSON.stringify(newProfile));
        }

        // Sync location if updated
        if (updatedFields.homeCity) {
          useStore.getState().setLocation(updatedFields.homeCity);
        }
      },

      // Autofill Sample Data (For Demo & Fast Showcase)
      autofillSampleData: () => {
        const sample = {
          displayName: 'Alex Sharma',
          homeCity: { name: 'Bengaluru', lat: 12.9716, lon: 77.5946, admin1: 'Karnataka', country: 'India' },
          country: 'India',
          currency: 'INR',
          units: 'metric',
          householdSize: 3,
          homeType: 'apartment',
          mainCommute: 'two-wheeler',
          averageDailyCommuteKm: 18,
          dietType: 'eggetarian',
          monthlyElectricityKwh: 160,
          theme: 'light',
          aqiAlertThreshold: 100,
          emailTips: true
        };
        get().updateProfile(sample);
      },

      // Delete local data & reset state
      deleteLocalData: () => {
        const user = get().user;
        if (user?.uid) {
          localStorage.removeItem(`ecosphere_profile_${user.uid}`);
        }
        localStorage.removeItem('ecosphere_auth_storage');
        localStorage.removeItem('ecosphere_user_storage');
        get().logout();
      },

      // Log out
      logout: async () => {
        if (isFirebaseConfigured && auth) {
          try {
            await signOut(auth);
          } catch (e) {}
        }
        set({
          user: null,
          profile: null,
          isDemo: false,
          authLoading: false
        });
      }
    }),
    {
      name: 'ecosphere_auth_storage',
      partialize: (state) => ({
        user: state.user,
        profile: state.profile,
        isDemo: state.isDemo
      })
    }
  )
);

# EcoSphere — "Understand. Simulate. Act." 🌍✨

> A unified, high-performance web platform that measures your household carbon footprint, delivers live hyper-local air quality & weather forecasts for any city, simulates radical environmental "what if" climate scenarios in real-time, and generates a personalized action plan to live greener.

---

## 🌟 Key Features

### 1. 📊 Live Atmospheric Dashboard (`/dashboard`)
- **Real-Time Air Quality Gauge**: Semicircle animated SVG gauge tracking US AQI with dynamic color categories and personalized health advisories.
- **Atmospheric Pollutant Spectrum**: Live concentrations of **PM2.5**, **PM10**, **NO₂**, **O₃**, **CO**, **SO₂**, and **UV Index** with WHO reference limits and health risk tooltips.
- **Current Meteorology**: Live temperature, "feels-like" thermal comfort, humidity, wind velocity, surface pressure, and solar UV radiation.
- **24-Hour Trajectory Area Chart**: Interactive Recharts visualization with toggles between **AQI**, **Temperature (°C)**, and **PM2.5 (µg/m³)**.
- **7-Day Weather Forecast**: WMO code-mapped weather condition cards with precipitation probability and diurnal temperature ranges.
- **Global & Indian City Search**: Instant debounced search with autocomplete plus GPS **"Use My Location"** one-click geolocation.
- **Combined Insight Banner (P1)**: Dynamic synergy banner connecting live ambient AQI with your commute footprint.

### 2. 🧮 Precision Carbon Footprint Calculator (`/calculator`)
- **4-Step Interactive Wizard**:
  1. **Mobility**: Petrol/Diesel/CNG/EV car, Two-wheeler, Metro/train, Bus, and Domestic flights.
  2. **Home Energy**: Monthly electricity consumption (kWh / ₹ bill) and LPG cooking cylinders.
  3. **Diet & Nutrition**: Plant-based vegan, Indian lacto-vegetarian, eggetarian, flexitarian, and daily meat profiles.
  4. **Goods & Waste**: Minimalist to high consumer goods, and recycling/home composting credits.
- **Live Running Total Sidebar**: Instant calculation of annual emissions in **metric tonnes and kg CO₂e / year**.
- **Visual Results Breakdown**: Recharts Donut chart, comparative benchmark bars (**You vs India avg [2.0t] vs IPCC 2030 target [2.3t] vs World avg [4.7t]**), and top 3 emission drivers.

### 3. 🧪 "What If?" Environmental Scenario Simulator (`/whatif`) — *Hero Feature*
- **Animated SVG City Canvas**: Dynamic inline SVG engine featuring moving vehicles, factory chimney smoke particles, lush foliage vs deforested stumps, heat shimmer overlays, drought soil, and biodiversity layers.
- **Intervention Toggles**:
  - *No Trees* (Deforestation & heat island surge)
  - *No Vehicles* (Pedestrian green corridor)
  - *No Industrial Smoke* (Clean stack technologies)
  - *100% Electric Transit* (All-fleet electrification)
  - *10x Urban Forest* (Miyawaki megacity canopy)
  - *Extreme Drought* (Severe heatwave & dust surge)
- **Scope & Time Travel Controls**:
  - Intensity Slider (25% local, 50% suburb, 75% metro, 100% citywide)
  - Time Horizon Multiplier (Current, +10 Years, +50 Years)
- **Physics Feedback Metrics**: Real-time delta counters for **Temperature (°C)**, **AQI**, **PM2.5**, **CO₂ (ppm)**, **Noise (dB)**, **Health Safety Index**, and **Biodiversity Index**.
- **Scientific Rationale Explainer**: Deep physical and chemical explanations behind every scenario combination.

### 4. 🎯 Action Plan, Gamification & Share Card (`/actions`)
- **Ranked ROI Recommendations**: Tailored actions prioritizing your highest emission categories.
- **Interactive Pledges**: Check off commitments with celebration confetti and live-updating counters.
- **Equivalencies**: Real-time conversion into **trees planted**, **km car driving avoided**, and **smartphone charges**.
- **Eco Score (0–100) & Badges**: Gamified rating with streak tracking saved to `localStorage`.
- **High-Res Share Card Export**: Export a downloadable PNG badge card using `html-to-image` and the Web Share API.
- **Tree Offset Calculator**: Compute exact native tree requirements to neutralize your footprint.

### 5. 📚 Climate Knowledge & Learning (`/learn`)
- Myth vs Fact breakdown cards.
- Interactive FAQ accordion for urban atmospheric science.
- Scientific environmental glossary (AQI, PM2.5, Scope 1/2/3, UHI effect).

---

### 5. 🏆 Weekly Leaderboard & Eco Points Competition (`/leaderboard`)
- **Weekly Seasons**: Fresh competition cycle runs every Monday 00:00 to Sunday 23:59 (local user time) with live countdown timer.
- **Podium & Celebrations**: Top 3 ranking podium with gold crown on #1, smooth entrance rise, and celebration confetti.
- **Dynamic Scope & Category Filters**:
  - Scopes: *Global*, *My City* (calibrated to user's profile city), and *Friends*.
  - Categories: *Overall*, *Transport*, *Energy*, *Food*, and *Waste*.
- **Live Animated Rankings**: Ranked list with rank change indicators (🔺 up, 🔻 down, ✨ new), streak flames, and Framer Motion layout reorder animations.
- **Your Progress & Analytics**: Points gap to next rank, progress bar toward the podium, and Recharts activity breakdown donut/bar.
- **Hall of Fame & Winner Banners**: Spotlight of previous 8 weekly champions across `/leaderboard`, `/dashboard`, and `Home`.
- **Badges**: Planet Hero (Weekly Champion), Top 3, Top 10, Streak Master (7-day streak), and Consistent (4 consecutive active weeks).

---

### 6. 🔐 Authentication & User Identity (`/login`, `/profile`, `/onboarding`)
- **Multi-Provider Firebase Auth**: Support for **Google**, **GitHub**, **Microsoft**, and **Email/Password** sign-in options.
- **Zero-Network Demo Account**: One-click instant login (`Alex Sharma`) requiring zero configuration or network calls.
- **Interactive Profile System**:
  - Custom initials avatar picker, preset badges, and local photo upload (<200KB).
  - Home City sync (automatically sets default location across live Dashboard and Leaderboard).
  - Household & lifestyle calibration (pre-fills Carbon Calculator inputs).
  - Leaderboard statistics: best rank, seasons won, all-time points, and current active streak.
  - Personalized AQI alert threshold triggers.
  - Safe local data wipe and unsaved changes banner.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite 5, React Router v6
- **Authentication**: Firebase Web SDK v9+ (Modular Auth) with graceful fallback to offline Demo Mode.
- **Styling**: Tailwind CSS v3 (Custom Nature-Tech emerald & forest palette, dark/light glassmorphism)
- **State Management**: Zustand v4 with `persist` middleware (`localStorage`)
- **Charts & Motion**: Recharts, Framer Motion, Canvas Confetti
- **Icons**: Lucide React & Inline Official SVG vectors
- **Export Engine**: `html-to-image`
- **APIs**: Open-Meteo (Geocoding, Air Quality, Forecast) with 10-minute caching and offline fallback.

---

## 🔑 Firebase Authentication Setup Guide

EcoSphere is designed to work immediately in **Demo Account** mode without any keys. To connect your live Firebase project for Google, GitHub, Microsoft, and Email authentication:

### Step 1: Create Firebase Project
1. Navigate to the [Firebase Console](https://console.firebase.google.com/) and click **Add Project**.
2. Name your project (e.g. `ecosphere-platform`) and continue.

### Step 2: Enable Authentication Sign-In Providers
1. In the Firebase Console left menu, go to **Build** > **Authentication**.
2. Click **Get Started**, then select the **Sign-in method** tab:
   - **Google**: Enable the toggle, set your project support email, and click **Save** *(Recommended & easiest for live demo)*.
   - **Email/Password**: Enable the toggle and click **Save**.
   - **GitHub**:
     - Register a new OAuth App on [GitHub Developer Settings](https://github.com/settings/developers).
     - Copy the **Authorization callback URL** shown in Firebase (format: `https://<YOUR-PROJECT-ID>.firebaseapp.com/__/auth/handler`).
     - Paste your GitHub **Client ID** and **Client Secret** into Firebase and click **Save**.
   - **Microsoft**:
     - Register an application in the [Azure Portal / Microsoft Entra ID](https://portal.azure.com/).
     - Under Authentication, add the Firebase redirect URI (`https://<YOUR-PROJECT-ID>.firebaseapp.com/__/auth/handler`).
     - Copy the Application (client) ID and client secret into Firebase.

### Step 3: Add Authorized Domains
Under **Authentication** > **Settings** > **Authorized domains**, ensure the following domains are listed:
- `localhost`
- `127.0.0.1`
- Your production domain (e.g., `ecosphere.app` or `your-vercel-app.vercel.app`)

### Step 4: Add Web App Configuration to `.env`
1. In Firebase Project Settings (⚙️ icon) > **General**, scroll down to **Your apps** and click the **Web (`</>`)** icon.
2. Register your app name and copy the configuration keys into your local `.env` file:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=ecosphere-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ecosphere-app
VITE_FIREBASE_STORAGE_BUCKET=ecosphere-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abcdef
```

> **Note**: If `.env` is absent or unconfigured, the app automatically switches to **Prototype Demo Mode**, enabling the **"Try Demo Account"** and **"Continue as Guest"** options without throwing errors or breaking the UI.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Local Run
```bash
# Clone the repository
git clone <repo-url>
cd ecosphere

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build
```bash
npm run build
```

---

---

## 🏆 Eco Points & Leaderboard System

### 1. Point Values Table (Editable in `/src/data/points.js`)

| Action / Habit | Points Earned | Frequency Limits / Rules |
| :--- | :--- | :--- |
| **Pledge Action Plan Item** | **+10 pts** (Easy)<br>**+20 pts** (Medium)<br>**+30 pts** (Hard) | Un-pledging removes points for that calendar day |
| **Complete Carbon Footprint Audit** | **+25 pts** | Max once per weekly season |
| **Daily Eco Check-in** | **+5 pts** | Max once per calendar day |
| **Green Choice Log** (Cycled/Walked/Public Transit, Meatless Day, Zero Single-Use Plastic) | **+15 pts** per habit | Max 3 habit logs per day (45 pts/day max) |
| **Scenario Simulation Run** | **+5 pts** | Max 3 simulations per day (15 pts/day max) |
| **Daily Streak Bonus** | **+10 pts** / day | Applies from Day 3+ streak; capped at **+50 pts/week** |
| **Weekly Cap** | **600 pts** | Hard cap per player per week to prevent spam |

---

### 2. Weekly Season Lifecycle & Finalization Logic
- **Season Definition**: Standard ISO week cycle starting **Monday 00:00** and concluding **Sunday 23:59** in the user's local timezone.
- **Weekly Winner Tie-Breaker**:
  1. Primary: Highest `weeklyPoints`.
  2. Secondary: Higher consecutive active `streak`.
  3. Tertiary: Earlier `lastActiveDate` timestamp.
- **Rollover Flow**:
  - The crowned winner receives the **Planet Hero** trophy badge and entry into the **Hall of Fame**.
  - Top 3 and Top 10 badges are awarded to high-performing participants.
  - User's `weeklyPoints` reset for the fresh week, while `totalPoints` and `streak` accumulate.
  - When the app is opened in a new week, a **"Week Ended" Celebration Modal** pops up with confetti and season highlights.

---

### 3. Judge Demo Controls (`DemoToolsDrawer.jsx`)
A hidden-by-default, floating **Demo Tools** drawer is available on `/leaderboard` (toggle via the bottom-right gear ⚙️ icon for demo accounts or when `VITE_DEMO=true`):
- 🎲 **Simulate Competitor Activity**: Adds random points to 5 random demo players so the leaderboard visibly re-orders live with Framer Motion layout animations.
- ⚡ **Add 50 Points to Me**: Instantly awards 50 points to the signed-in user so judges can watch real-time rank climbing.
- 🏁 **End Week Now**: Triggers instant season rollover (`finalizeWeek`), awards badges, launches confetti, and starts a fresh week.
- 🔄 **Reset Leaderboard**: Restores the pre-seeded 24 realistic Indian players and 8-week Hall of Fame records.

---

### 4. 🛡️ Anti-Cheat Architecture Note
> **Prototype Note**: For local, responsive, and offline-capable prototype execution, point tallying, cap checking, and leaderboard reordering are executed on the client within Zustand and synced to `localStorage`.
>
> **Production Architecture**: In production deployments, all point events MUST be written to Cloud Firestore / backend with server-side validation (via Cloud Functions or backend API) enforcing:
> 1. Rate limiting on point event writes (e.g. max 1 check-in per 24 hours).
> 2. Cryptographic signature or verification of hardware/sensor inputs.
> 3. Server-side scheduled cron jobs for weekly finalization to eliminate clock-skew vulnerabilities.

---

## 🔬 Scientific Calibration & Attribution
- **Electricity Grid Factor**: 0.71 kg CO₂e / kWh (Central Electricity Authority, India).
- **Tree Absorption Standard**: ~21 kg CO₂e / mature tree / year.
- **Air Quality & Weather**: Open-Meteo API & Copernicus Atmospheric Monitoring Service (CAMS).
- **Methodology**: IPCC 6th Assessment Report & GHG Protocol.

---

*Designed and engineered for maximum ecological impact • EcoSphere 2026*


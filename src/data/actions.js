/**
 * Action Recommendations & Badges Data
 */

export const ACTIONS = [
  {
    id: 'metro-commute',
    title: 'Switch Car Commute to Metro or Bus',
    category: 'transport',
    kgSavedPerYear: 620,
    difficulty: 'Medium',
    impact: 'High',
    icon: 'Train',
    description: 'Replace 4 days of solo petrol car driving with metro rail or electric city bus.',
    tip: 'Saves ~₹35,000/year on fuel & parking while avoiding heavy traffic stress.'
  },
  {
    id: 'carpool',
    title: 'Carpool 2 Days a Week',
    category: 'transport',
    kgSavedPerYear: 280,
    difficulty: 'Easy',
    impact: 'Medium',
    icon: 'Users',
    description: 'Share your office or college ride with 2 colleagues twice weekly.',
    tip: 'Cuts your weekly fuel expenses by 50% on those shared days.'
  },
  {
    id: 'ev-switch',
    title: 'Switch to Electric Two-Wheeler / EV',
    category: 'transport',
    kgSavedPerYear: 450,
    difficulty: 'Hard',
    impact: 'High',
    icon: 'Zap',
    description: 'Transition primary commute from a petrol scooter/car to an electric vehicle.',
    tip: 'Running cost drops to ~₹0.30/km compared to ₹2.50/km for petrol.'
  },
  {
    id: 'cycle-short-trips',
    title: 'Cycle or Walk for Trips < 2 km',
    category: 'transport',
    kgSavedPerYear: 140,
    difficulty: 'Easy',
    impact: 'Medium',
    icon: 'Bike',
    description: 'Walk or pedal for quick grocery runs, errands, and neighborhood outings.',
    tip: 'Boosts cardiovascular health and eliminates zero-mile engine warming emissions.'
  },
  {
    id: 'ac-temp-24',
    title: 'Set Air Conditioner to 24°C',
    category: 'energy',
    kgSavedPerYear: 320,
    difficulty: 'Easy',
    impact: 'High',
    icon: 'ThermometerSnowflake',
    description: 'Raise your default AC setpoint from 18°C–20°C to 24°C or 25°C.',
    tip: 'Every 1°C increase reduces your AC electricity consumption by ~6%.'
  },
  {
    id: 'switch-led',
    title: 'Switch All Home Bulbs to 9W LEDs',
    category: 'energy',
    kgSavedPerYear: 180,
    difficulty: 'Easy',
    impact: 'Medium',
    icon: 'Lightbulb',
    description: 'Replace remaining CFLs and incandescent fixtures with 5-star rated LEDs.',
    tip: 'LEDs consume up to 85% less energy and last over 15,000 operational hours.'
  },
  {
    id: 'rooftop-solar',
    title: 'Install 2–3 kW Rooftop Solar',
    category: 'energy',
    kgSavedPerYear: 1450,
    difficulty: 'Hard',
    impact: 'Very High',
    icon: 'SunMedium',
    description: 'Generate clean solar power with net-metering on your building or home roof.',
    tip: 'Government PM Surya Ghar subsidy covers up to 40% of installation costs.'
  },
  {
    id: 'unplug-vampire',
    title: 'Eliminate Phantom / Vampire Power',
    category: 'energy',
    kgSavedPerYear: 90,
    difficulty: 'Easy',
    impact: 'Low',
    icon: 'PowerOff',
    description: 'Turn off power strips and unplug microwave, TV, and chargers when not in use.',
    tip: 'Standby power accounts for 5–10% of standard home electrical loads.'
  },
  {
    id: 'veggie-3-days',
    title: 'Eat Plant-Based / Vegetarian 3 Days/Week',
    category: 'food',
    kgSavedPerYear: 310,
    difficulty: 'Medium',
    impact: 'High',
    icon: 'Salad',
    description: 'Substitute meat and processed animal meals with lentils, legumes, tofu, and seasonal veggies.',
    tip: 'Reduces dietary water footprint by over 1,200 liters per weekly meatless day.'
  },
  {
    id: 'zero-food-waste',
    title: 'Portion Planning & Zero Food Waste',
    category: 'food',
    kgSavedPerYear: 190,
    difficulty: 'Easy',
    impact: 'Medium',
    icon: 'Apple',
    description: 'Plan weekly meals, freeze leftovers, and keep perishable produce fresh.',
    tip: 'Food decomposing in landfills produces potent methane gas (28x more warming than CO2).'
  },
  {
    id: 'local-seasonal-food',
    title: 'Buy Local & Seasonal Indian Produce',
    category: 'food',
    kgSavedPerYear: 110,
    difficulty: 'Easy',
    impact: 'Medium',
    icon: 'ShoppingBag',
    description: 'Choose regionally harvested grains and vegetables over air-freighted imported goods.',
    tip: 'Directly supports local mandi farmers and cuts long-distance cold-chain emissions.'
  },
  {
    id: 'compost-kitchen-waste',
    title: 'Home Composting of Kitchen Scraps',
    category: 'waste',
    kgSavedPerYear: 100,
    difficulty: 'Medium',
    impact: 'Medium',
    icon: 'Recycle',
    description: 'Turn fruit peels, coffee grounds, and food scraps into rich organic fertilizer.',
    tip: 'Produces chemical-free potting soil for home planters and balcony gardens.'
  },
  {
    id: 'ban-single-use-plastic',
    title: 'Carry Reusable Bags, Bottles & Cutlery',
    category: 'waste',
    kgSavedPerYear: 60,
    difficulty: 'Easy',
    impact: 'Low',
    icon: 'ShieldCheck',
    description: 'Refuse single-use polythene carry bags, plastic water bottles, and takeaway cutlery.',
    tip: 'Prevents microplastic buildup in urban stormwater drains and waterways.'
  },
  {
    id: 'mindful-fashion',
    title: 'Mindful Wardrobe (No Fast Fashion)',
    category: 'waste',
    kgSavedPerYear: 260,
    difficulty: 'Medium',
    impact: 'High',
    icon: 'Sparkles',
    description: 'Commit to the 30-wears rule, thrift/repair clothes, and avoid weekly fast fashion impulse buys.',
    tip: 'The global fashion sector accounts for nearly 8% of all global greenhouse emissions.'
  },
  {
    id: 'plant-5-trees',
    title: 'Plant & Nurture 5 Native Trees',
    category: 'energy',
    kgSavedPerYear: 105,
    difficulty: 'Medium',
    impact: 'Medium',
    icon: 'TreePine',
    description: 'Plant neem, peepal, or amla saplings in your community, colony park, or balcony.',
    tip: '5 mature native trees absorb over 100 kg CO2 every single year while hosting native fauna.'
  }
];

export const BADGES = [
  {
    id: 'first-step',
    name: 'Eco Initiate',
    description: 'Completed your first carbon footprint audit',
    icon: 'Sparkles',
    tier: 'Bronze',
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/30'
  },
  {
    id: 'pledge-hero',
    name: 'Climate Pledger',
    description: 'Pledged to save over 500 kg of CO2e per year',
    icon: 'HeartHandshake',
    tier: 'Silver',
    color: 'text-sky-500 bg-sky-500/10 border-sky-500/30'
  },
  {
    id: 'low-carbon',
    name: 'Green Guardian',
    description: 'Footprint is below the Indian national average (2.0 tonnes)',
    icon: 'ShieldCheck',
    tier: 'Gold',
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30'
  },
  {
    id: 'simulator-pro',
    name: 'Earth Architect',
    description: 'Simulated 3 or more What-If scenarios',
    icon: 'Globe',
    tier: 'Gold',
    color: 'text-purple-500 bg-purple-500/10 border-purple-500/30'
  },
  {
    id: 'streak-master',
    name: 'Eco Streak Champion',
    description: 'Maintained a 7-day sustainable living check-in streak',
    icon: 'Flame',
    tier: 'Diamond',
    color: 'text-teal-400 bg-teal-500/10 border-teal-500/30'
  },
  {
    id: 'planet-hero',
    name: 'Planet Hero',
    description: 'Crowned #1 Weekly Season Winner on the Leaderboard',
    icon: 'Crown',
    tier: 'Diamond',
    color: 'text-amber-400 bg-amber-500/15 border-amber-500/40 shadow-glow-amber'
  },
  {
    id: 'top-3',
    name: 'Podium Finisher',
    description: 'Finished in the Top 3 on the Weekly Leaderboard',
    icon: 'Trophy',
    tier: 'Gold',
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/30'
  },
  {
    id: 'top-10',
    name: 'Top 10 Contender',
    description: 'Reached the Top 10 on the Global Leaderboard',
    icon: 'Award',
    tier: 'Silver',
    color: 'text-sky-400 bg-sky-500/10 border-sky-500/30'
  },
  {
    id: 'consistent',
    name: 'Consistent Guardian',
    description: 'Participated in 4 consecutive weekly sustainability seasons',
    icon: 'ShieldCheck',
    tier: 'Gold',
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
  }
];

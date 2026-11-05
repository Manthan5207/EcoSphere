import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches

os.makedirs('report_diagrams', exist_ok=True)

# -------------------------------------------------------------------------
# 1. Use Case Diagram
# -------------------------------------------------------------------------
def create_use_case():
    fig, ax = plt.subplots(figsize=(10, 6.5), dpi=300)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Boundary box
    system_box = patches.FancyBboxPatch((24, 5), 52, 90, boxstyle="round,pad=1.5",
                                       fc="#F8FAFC", ec="#0F766E", lw=2)
    ax.add_patch(system_box)
    ax.text(50, 92, "EcoSphere System Boundary", ha='center', va='center', 
            fontsize=13, fontweight='bold', color="#0F766E", fontfamily='serif')

    # Primary Actor (Left)
    ax.plot([10, 10], [55, 65], color='#1E293B', lw=2) # body
    circle = patches.Circle((10, 68), 3, fc='#E2E8F0', ec='#1E293B', lw=2) # head
    ax.add_patch(circle)
    ax.plot([5, 15], [60, 60], color='#1E293B', lw=2) # arms
    ax.plot([10, 5], [55, 47], color='#1E293B', lw=2) # left leg
    ax.plot([10, 15], [55, 47], color='#1E293B', lw=2) # right leg
    ax.text(10, 42, "User / Student\nCitizen", ha='center', va='center', 
            fontsize=10, fontweight='bold', color='#1E293B', fontfamily='serif')

    # Secondary Actor (Right: External APIs)
    ax.plot([90, 90], [55, 65], color='#1E293B', lw=2)
    circle_api = patches.Circle((90, 68), 3, fc='#E2E8F0', ec='#1E293B', lw=2)
    ax.add_patch(circle_api)
    ax.plot([85, 95], [60, 60], color='#1E293B', lw=2)
    ax.plot([90, 85], [55, 47], color='#1E293B', lw=2)
    ax.plot([90, 95], [55, 47], color='#1E293B', lw=2)
    ax.text(90, 42, "Open-Meteo API /\nFirebase Service", ha='center', va='center', 
            fontsize=10, fontweight='bold', color='#1E293B', fontfamily='serif')

    # Use cases (Ovals)
    use_cases = [
        (50, 82, "UC1: View Hyperlocal Live AQI & Weather"),
        (50, 69, "UC2: Calculate Household Carbon Footprint"),
        (50, 56, "UC3: Simulate Urban 'What-If' Climate Scenarios"),
        (50, 43, "UC4: Explore Ranked Decarbonization Actions"),
        (50, 30, "UC5: Commit to Pledges & Earn Eco Score"),
        (50, 17, "UC6: Compete on Weekly Seasonal Leaderboard")
    ]

    for x, y, label in use_cases:
        ellipse = patches.Ellipse((x, y), 42, 8, fc='#CCFBF1', ec='#0D9488', lw=1.5)
        ax.add_patch(ellipse)
        ax.text(x, y, label, ha='center', va='center', fontsize=9.5, 
                fontweight='bold', color='#134E4A', fontfamily='serif')
        # Connecting lines from user
        ax.plot([14, 29], [55, y], color='#64748B', lw=1.2, ls='--')

    # Connect APIs to UC1 and UC6
    ax.plot([86, 71], [55, 82], color='#0284C7', lw=1.2, ls='-')
    ax.plot([86, 71], [55, 17], color='#0284C7', lw=1.2, ls='-')

    plt.title("Figure 4.1: EcoSphere Use Case Diagram", fontsize=12, fontweight='bold', 
              fontfamily='serif', pad=12, y=0.0)
    plt.tight_layout()
    plt.savefig('report_diagrams/uml_usecase.png', dpi=300, bbox_inches='tight')
    plt.close()

# -------------------------------------------------------------------------
# 2. Sequence Diagram
# -------------------------------------------------------------------------
def create_sequence():
    fig, ax = plt.subplots(figsize=(10.5, 6.5), dpi=300)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    lifelines = [
        (15, "User Browser\n(React UI)"),
        (38, "Telemetry &\nZustand Store"),
        (62, "Open-Meteo\nRest API"),
        (85, "Scenario &\nCarbon Engine")
    ]

    for x, name in lifelines:
        # Header box
        box = patches.FancyBboxPatch((x-10, 86), 20, 8, boxstyle="round,pad=0.3",
                                    fc='#F1F5F9', ec='#334155', lw=1.5)
        ax.add_patch(box)
        ax.text(x, 90, name, ha='center', va='center', fontsize=9, 
                fontweight='bold', color='#1E293B', fontfamily='serif')
        # Lifeline dashed
        ax.plot([x, x], [86, 8], color='#94A3B8', lw=1.2, ls=':')

    # Interactions
    arrows = [
        (15, 38, 78, "1. Select City / Geolocation Query", "#0284C7", True),
        (38, 62, 70, "2. GET /v1/air-quality & /v1/forecast", "#0284C7", True),
        (62, 38, 62, "3. Return 6 Pollutants + 7-Day Weather Data", "#0D9488", False),
        (38, 15, 54, "4. Render Real-Time AQI Gauge & Trajectory", "#0D9488", False),
        (15, 85, 44, "5. Input Lifestyle Factors (Mobility/Energy/Diet)", "#7C3AED", True),
        (85, 85, 36, "6. Compute CO2e via CEA & IPCC Factor Matrix", "#7C3AED", True),
        (85, 15, 28, "7. Deliver Donut Breakdown, Benchmarks & ROI Plan", "#059669", False),
        (15, 85, 20, "8. Toggle Urban Scenario (e.g. 10x Trees, +50Y)", "#D97706", True),
        (85, 15, 12, "9. Return Delta (AQI -38, Temp -2.8°C, Noise -4dB)", "#059669", False)
    ]

    for x1, x2, y, msg, col, is_req in arrows:
        if x1 == x2: # self call
            ax.plot([x1, x1+6, x1+6, x1], [y+3, y+3, y-1, y-1], color=col, lw=1.4)
            ax.annotate("", xy=(x1, y-1), xytext=(x1+2, y-1),
                        arrowprops=dict(arrowstyle="->", color=col, lw=1.4))
            ax.text(x1+7, y+1, msg, ha='left', va='center', fontsize=8, 
                    color=col, fontweight='bold', fontfamily='serif')
        else:
            style = "->" if is_req else "->"
            ls = "-" if is_req else "--"
            ax.annotate("", xy=(x2, y), xytext=(x1, y),
                        arrowprops=dict(arrowstyle=style, color=col, lw=1.4, ls=ls))
            mid_x = (x1 + x2) / 2
            ax.text(mid_x, y + 2, msg, ha='center', va='bottom', fontsize=8, 
                    color=col, fontweight='bold', fontfamily='serif')

    plt.title("Figure 4.2: EcoSphere Telemetry & Simulation Sequence Diagram", 
              fontsize=12, fontweight='bold', fontfamily='serif', pad=12, y=0.0)
    plt.tight_layout()
    plt.savefig('report_diagrams/uml_sequence.png', dpi=300, bbox_inches='tight')
    plt.close()

# -------------------------------------------------------------------------
# 3. Activity Diagram
# -------------------------------------------------------------------------
def create_activity():
    fig, ax = plt.subplots(figsize=(9, 7), dpi=300)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Initial node
    start = patches.Circle((50, 94), 2.5, fc='#0F172A', ec='#0F172A')
    ax.add_patch(start)
    ax.text(50, 98, "Start", ha='center', va='center', fontsize=9, fontweight='bold', fontfamily='serif')

    # Nodes
    steps = [
        (50, 83, "Launch EcoSphere Platform", 36, 6, '#F8FAFC', '#475569'),
        (50, 70, "Select City or Detect Geolocation", 36, 6, '#E0F2FE', '#0284C7'),
        (50, 57, "Fetch Open-Meteo AQI & Weather Telemetry", 44, 6, '#E0F2FE', '#0284C7'),
        (50, 44, "Engage 4-Step Carbon Calculator Wizard", 44, 6, '#F3E8FF', '#7C3AED'),
        (50, 31, "Evaluate Parametric Scenarios in What-If Simulator", 48, 6, '#FEF3C7', '#D97706'),
        (50, 18, "Commit to Ranked ROI Pledges & Update Eco Score", 48, 6, '#DCFCE7', '#16A34A')
    ]

    for x, y, text, w, h, bg, border in steps:
        box = patches.FancyBboxPatch((x-w/2, y-h/2), w, h, boxstyle="round,pad=0.5",
                                    fc=bg, ec=border, lw=1.5)
        ax.add_patch(box)
        ax.text(x, y, text, ha='center', va='center', fontsize=8.5, 
                fontweight='bold', color='#1E293B', fontfamily='serif')

    # Final Node
    end_outer = patches.Circle((50, 6), 3.2, fc='none', ec='#0F172A', lw=1.5)
    end_inner = patches.Circle((50, 6), 2, fc='#0F172A', ec='#0F172A')
    ax.add_patch(end_outer)
    ax.add_patch(end_inner)
    ax.text(50, 1.5, "End / Habit Maintained", ha='center', va='center', 
            fontsize=8.5, fontweight='bold', fontfamily='serif')

    # Connectors
    y_points = [94, 86, 73, 60, 47, 34, 21, 9]
    for i in range(len(y_points)-1):
        ax.annotate("", xy=(50, y_points[i+1]), xytext=(50, y_points[i] if i > 0 else 91.5),
                    arrowprops=dict(arrowstyle="->", color='#334155', lw=1.4))

    plt.title("Figure 4.3: EcoSphere User Journey Activity Diagram", 
              fontsize=12, fontweight='bold', fontfamily='serif', pad=12, y=0.0)
    plt.tight_layout()
    plt.savefig('report_diagrams/uml_activity.png', dpi=300, bbox_inches='tight')
    plt.close()

# -------------------------------------------------------------------------
# 4. Class / Component Architecture Diagram
# -------------------------------------------------------------------------
def create_class_diagram():
    fig, ax = plt.subplots(figsize=(10.5, 7), dpi=300)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    classes = [
        # (x, y, w, h, title, [attrs], [methods], col)
        (22, 75, 34, 20, "TelemetryService", 
         ["- BASE_URL: string", "- cache: Map<string, CacheItem>"], 
         ["+ getAirQuality(lat, lon): Promise", "+ getWeatherForecast(lat, lon): Promise", "+ computeUS_AQI(pollutants): number"], '#0284C7'),
        (75, 75, 34, 20, "CarbonCalculatorEngine", 
         ["- gridFactor: 0.82 kg/kWh", "- lpgFactor: 42.0 kg/cyl", "- vehicleFactors: Record"], 
         ["+ calculateMobility(data): number", "+ calculateHomeEnergy(data): number", "+ calculateTotalFootprint(): Result"], '#16A34A'),
        (22, 35, 34, 22, "ScenarioSimulatorEngine", 
         ["- baselineMetrics: CityBaseline", "- activeToggles: Set<ScenarioKey>", "- timeHorizon: 0 | 10 | 50"], 
         ["+ applyInterventions(): DeltaMetrics", "+ calculateUHI_Effect(): number", "+ getScientificExplanation(): string"], '#D97706'),
        (75, 35, 34, 22, "UserProgressStore (Zustand)", 
         ["- ecoScore: number (0-100)", "- pledges: Array<PledgeItem>", "- leaderboardRank: number"], 
         ["+ addPledge(actionId): void", "+ updateScore(delta): void", "+ syncWithFirebase(): Promise"], '#7C3AED')
    ]

    for x, y, w, h, name, attrs, methods, col in classes:
        # Box header
        hdr = patches.Rectangle((x-w/2, y+h/2-4), w, 4, fc=col, ec=col)
        ax.add_patch(hdr)
        ax.text(x, y+h/2-2, name, ha='center', va='center', fontsize=9.5, 
                fontweight='bold', color='white', fontfamily='serif')

        # Box body
        body = patches.Rectangle((x-w/2, y-h/2), w, h-4, fc='#F8FAFC', ec=col, lw=1.5)
        ax.add_patch(body)

        # Content
        cur_y = y + h/2 - 6
        for a in attrs:
            ax.text(x-w/2+1, cur_y, a, ha='left', va='center', fontsize=7.5, color='#334155', fontfamily='monospace')
            cur_y -= 2.2
        ax.plot([x-w/2, x+w/2], [cur_y, cur_y], color=col, lw=0.8, ls='--')
        cur_y -= 1.8
        for m in methods:
            ax.text(x-w/2+1, cur_y, m, ha='left', va='center', fontsize=7.5, color='#0F172A', fontfamily='monospace')
            cur_y -= 2.2

    # Associations
    ax.annotate("", xy=(58, 75), xytext=(39, 75), arrowprops=dict(arrowstyle="<->", color='#475569', lw=1.2))
    ax.text(48.5, 77, "synergy data", ha='center', fontsize=7.5, color='#475569', fontfamily='serif')

    ax.annotate("", xy=(22, 46), xytext=(22, 65), arrowprops=dict(arrowstyle="->", color='#475569', lw=1.2))
    ax.annotate("", xy=(75, 46), xytext=(75, 65), arrowprops=dict(arrowstyle="->", color='#475569', lw=1.2))

    plt.title("Figure 4.4: EcoSphere Core Component & Class Architecture", 
              fontsize=12, fontweight='bold', fontfamily='serif', pad=12, y=0.0)
    plt.tight_layout()
    plt.savefig('report_diagrams/uml_class.png', dpi=300, bbox_inches='tight')
    plt.close()

# -------------------------------------------------------------------------
# 5. DFD Level 0 (Context Level Diagram)
# -------------------------------------------------------------------------
def create_dfd_0():
    fig, ax = plt.subplots(figsize=(9.5, 5.5), dpi=300)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Central process
    central = patches.Circle((50, 50), 16, fc='#E0F2FE', ec='#0284C7', lw=2)
    ax.add_patch(central)
    ax.text(50, 52, "0.0\nEcoSphere\nEnvironmental\nPlatform", ha='center', va='center', 
            fontsize=10.5, fontweight='bold', color='#0369A1', fontfamily='serif')

    # Entity Left (User)
    user_ent = patches.Rectangle((4, 38), 18, 24, fc='#F1F5F9', ec='#334155', lw=1.5)
    ax.add_patch(user_ent)
    ax.text(13, 50, "User /\nEngineering\nStudent", ha='center', va='center', 
            fontsize=9.5, fontweight='bold', color='#1E293B', fontfamily='serif')

    # Entity Right (External APIs)
    api_ent = patches.Rectangle((78, 38), 18, 24, fc='#F1F5F9', ec='#334155', lw=1.5)
    ax.add_patch(api_ent)
    ax.text(87, 50, "Open-Meteo &\nFirebase Cloud\nServices", ha='center', va='center', 
            fontsize=9.5, fontweight='bold', color='#1E293B', fontfamily='serif')

    # Data flows Left
    ax.annotate("", xy=(34, 56), xytext=(22, 56), arrowprops=dict(arrowstyle="->", color='#0F766E', lw=1.4))
    ax.text(28, 59, "Lifestyle Data &\nScenario Toggles", ha='center', fontsize=7.5, color='#0F766E', fontfamily='serif')

    ax.annotate("", xy=(22, 44), xytext=(34, 44), arrowprops=dict(arrowstyle="->", color='#0369A1', lw=1.4))
    ax.text(28, 40, "Live AQI, Carbon Footprint\n& ROI Action Plan", ha='center', fontsize=7.5, color='#0369A1', fontfamily='serif')

    # Data flows Right
    ax.annotate("", xy=(78, 56), xytext=(66, 56), arrowprops=dict(arrowstyle="->", color='#7C3AED', lw=1.4))
    ax.text(72, 59, "Lat/Lon Query &\nAuth Tokens", ha='center', fontsize=7.5, color='#7C3AED', fontfamily='serif')

    ax.annotate("", xy=(66, 44), xytext=(78, 44), arrowprops=dict(arrowstyle="->", color='#D97706', lw=1.4))
    ax.text(72, 40, "Atmospheric Pollutants\n& Forecast Feeds", ha='center', fontsize=7.5, color='#D97706', fontfamily='serif')

    plt.title("Figure 4.5: EcoSphere Data Flow Diagram (DFD Level 0 - Context Level)", 
              fontsize=12, fontweight='bold', fontfamily='serif', pad=12, y=0.0)
    plt.tight_layout()
    plt.savefig('report_diagrams/dfd_level0.png', dpi=300, bbox_inches='tight')
    plt.close()

# -------------------------------------------------------------------------
# 6. DFD Level 1 (Decomposition Diagram)
# -------------------------------------------------------------------------
def create_dfd_1():
    fig, ax = plt.subplots(figsize=(10.5, 7.5), dpi=300)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # External Entity
    user = patches.Rectangle((4, 40), 14, 20, fc='#F1F5F9', ec='#334155', lw=1.5)
    ax.add_patch(user)
    ax.text(11, 50, "User /\nCitizen", ha='center', va='center', fontsize=9, fontweight='bold', fontfamily='serif')

    # 4 Processes
    processes = [
        (38, 78, "1.0\nAtmospheric\nTelemetry Intake"),
        (75, 78, "2.0\nHousehold Carbon\nComputation"),
        (75, 25, "3.0\nParametric 'What-If'\nSimulator"),
        (38, 25, "4.0\nGamified ROI\nAction Generation")
    ]

    for x, y, label in processes:
        p = patches.Circle((x, y), 11, fc='#E0F2FE', ec='#0284C7', lw=1.5)
        ax.add_patch(p)
        ax.text(x, y, label, ha='center', va='center', fontsize=8, fontweight='bold', color='#0369A1', fontfamily='serif')

    # Data Stores
    stores = [
        (56.5, 52, "D1: Emission Factors (CEA/MoPNG)", 32, 5.5),
        (56.5, 43, "D2: User State & Pledges (LocalStorage)", 32, 5.5)
    ]

    for x, y, label, w, h in stores:
        # Open ended rectangle
        ax.plot([x-w/2, x+w/2], [y+h/2, y+h/2], color='#0F766E', lw=1.5)
        ax.plot([x-w/2, x+w/2], [y-h/2, y-h/2], color='#0F766E', lw=1.5)
        ax.plot([x-w/2, x-w/2], [y-h/2, y+h/2], color='#0F766E', lw=1.5)
        ax.fill_between([x-w/2, x+w/2], y-h/2, y+h/2, color='#CCFBF1', alpha=0.5)
        ax.text(x, y, label, ha='center', va='center', fontsize=7.5, fontweight='bold', color='#134E4A', fontfamily='serif')

    # Connections
    # User to 1.0
    ax.annotate("", xy=(28, 78), xytext=(18, 56), arrowprops=dict(arrowstyle="->", color='#334155', lw=1.2))
    ax.text(20, 68, "City selection", fontsize=7, color='#334155', fontfamily='serif')

    # User to 2.0
    ax.annotate("", xy=(65, 83), xytext=(18, 54), arrowprops=dict(arrowstyle="->", color='#334155', lw=1.2))
    ax.text(36, 62, "Monthly energy/commute inputs", fontsize=7, color='#334155', fontfamily='serif')

    # User to 3.0
    ax.annotate("", xy=(65, 23), xytext=(18, 46), arrowprops=dict(arrowstyle="->", color='#334155', lw=1.2))
    ax.text(35, 34, "Scenario toggles (Trees, EVs)", fontsize=7, color='#334155', fontfamily='serif')

    # D1 to 2.0
    ax.annotate("", xy=(72, 69), xytext=(65, 54.7), arrowprops=dict(arrowstyle="->", color='#0F766E', lw=1.2))

    # 2.0 to 4.0
    ax.annotate("", xy=(46, 33), xytext=(68, 70), arrowprops=dict(arrowstyle="->", color='#7C3AED', lw=1.2))
    ax.text(58, 47, "Emissions profile", fontsize=7, color='#7C3AED', fontfamily='serif')

    # 4.0 to D2
    ax.annotate("", xy=(46, 43), xytext=(38, 36), arrowprops=dict(arrowstyle="->", color='#0F766E', lw=1.2))

    # 4.0 to User
    ax.annotate("", xy=(18, 43), xytext=(28, 25), arrowprops=dict(arrowstyle="->", color='#0369A1', lw=1.2))
    ax.text(18, 30, "ROI actions & Eco Score", fontsize=7, color='#0369A1', fontfamily='serif')

    plt.title("Figure 4.6: EcoSphere Data Flow Diagram (DFD Level 1 - Decomposition)", 
              fontsize=12, fontweight='bold', fontfamily='serif', pad=12, y=0.0)
    plt.tight_layout()
    plt.savefig('report_diagrams/dfd_level1.png', dpi=300, bbox_inches='tight')
    plt.close()

if __name__ == '__main__':
    create_use_case()
    create_sequence()
    create_activity()
    create_class_diagram()
    create_dfd_0()
    create_dfd_1()
    print("All diagrams generated successfully in report_diagrams/")


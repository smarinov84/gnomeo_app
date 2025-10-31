# gnomeo_app
Gnomeo

Vision & Target

Problem. New–mid-level gardeners struggle to (1) set up properly, (2) know what to plant when/where, and (3) react to weather/pests/disease in time.

Outcome. Fewer failed plantings, higher yield, lower effort.

North Star. “Healthy plant-days protected” (HPD): # of plant-days with adequate water/temp/pest status because of our guidance. Secondaries: 30-day retention, weekly active users (WAU), alert engagement, successful diagnosis rate, planned → harvested conversions.

Core Principles (AI-First)

Coach, don’t dashboard. Always turn data into a next-best action.

Default to automation. Auto-detect zone, soil, weather, and suggest tasks.

Low-friction inputs. Phone camera + location; minimal manual setup.

Explainability. Every recommendation shows “why” and source.

Safety & locality. Treatments & dates reflect local weather and extension guidance.

Free Data Sources (for MVP)

Plants & characteristics:
• OpenFarm (open plant/growing guides, spacing, sun, DTM) 
GitHub
+2
Hackaday
+2

• USDA PLANTS (taxonomy, distribution; stable IDs) 
USDA Plants Database
+1

Soils (U.S.):
• USDA NRCS SSURGO / Soil Data Access (texture, drainage, pH via API) 
Natural Resources Conservation Service
+2
sdmdataaccess.nrcs.usda.gov
+2

Location & climate:
• USDA Plant Hardiness Zones (map downloads) 
USDA Plant Hardiness Zone Map
+2
USDA Plant Hardiness Zone Map
+2

• NOAA/NCEI Climate Normals (frost/freeze probabilities) 
NCEI
+2
NCEI
+2

Weather (current/forecast/historical) & ET₀:
• Open-Meteo (forecast + ET₀, soil moisture; free/no key) 
Open Meteo
+2
Open Meteo
+2

• NWS API (U.S. alerts, grids) 
National Weather Service
+2
National Weather Service
+2

• NASA POWER (radiation, agro met parameters) for modeling 
power.larc.nasa.gov
+1

• Meteostat (long-term historical validation) 
Meteostat
+1

Pest & disease knowledge (textual guidance):
• UC IPM (peer-reviewed guidelines) + Home & Garden pages 
UC IPM
+2
UC IPM
+2

• Cornell Cooperative Extension—Vegetable disease factsheets & resistant varieties 
Cornell Vegetables
+1

• UMN Extension—companion planting (evidence-aware) 
University of Minnesota Extension

Computer vision training data (images):
• PlantVillage (CC0 variants exist—confirm license per split) 
TensorFlow
+1

• IP102 insect pest dataset (CVPR’19) 
GitHub

• iNaturalist API (observations; follow terms/attribution) 
api.inaturalist.org

• EPPO Global Database (taxonomy/regulated pests; tokened API) 
gd.eppo.int
+1

Note: “Companion planting” has mixed evidence; we’ll label advice provenance (research-backed vs community heuristics). 
Mississippi State Extension
+1

MVP Scope (12–14 weeks, dual web + mobile)

1) Guided Onboarding (AI setup, 15 min)

Auto-detect location → hardiness zone; fetch soil summary (texture/drainage). 
USDA Plant Hardiness Zone Map
+1

Camera walk-around (optional): detect bed rectangles & estimate size; user can edit.

Preference intake: goals (salad greens, tomatoes, pollinators), effort level, tools (drip, hose), sun hours estimate.

2) Smart Planting Plan (Your First Bed)

Suggest top candidates for the next 90 days by zone and dates; show why (frost window, DTM). 
NCEI
+1

Basic bed optimizer v1: rule-based placement using spacing, sun, height, succession (spring→summer). Export as simple layout grid with sow/plant dates. (Evidence-labeled companion hints.)

3) Real-Time Garden Guard

Weather-driven alerts: freeze, heat wave, high wind, heavy rain from NWS/Open-Meteo (+ what to do: cover, stake, delay watering). 
National Weather Service

Water guidance v1: daily ET₀-based estimate × crop coefficient defaults, adjusted by soil texture; weekly recap. (POWER/Open-Meteo ET₀ + SSURGO texture.) 
Open Meteo
+2
power.larc.nasa.gov
+2

4) Photo Diagnosis (Beta: Tomatoes + Brassicas)

CV model pipeline (PlantVillage/IP102) returns top-N likely issues + action checklist referencing UC IPM/Cornell pages. We show confidence and link out. 
Cornell Vegetables
+3
TensorFlow
+3
GitHub
+3

5) Tasks, Journal, & Progress

Auto-generated tasks (sow, thin, fertilize, harvest window, protect from frost), one-tap “done,” and photo journal entries. HPD and “plants saved by alerts” stats.

Deliberately out of MVP: community feed, marketplace, IoT sensors, advanced optimizer (ILP/CP-SAT), non-US soils, fully automated plant ID.

V1 “How it works” (Algorithm Notes)

Dates: Planting windows from climate normals + frost probability + DTM from OpenFarm; continually adjusted by 7–10-day forecast. 
NCEI
+1

Watering: ET₀ from Open-Meteo/POWER; Kc defaults per crop stage; soil texture modifies depletion threshold; present as inches/week and “today water? yes/no.” 
Open Meteo
+1

Bed layout v1: Greedy placement uses spacing, height, sun (south-to-north height gradient), seasonal succession slots; companion tips flagged with evidence-level badge. 
GitHub

Diagnosis: Lightweight classifier fine-tuned on PlantVillage + curated tomato/brassica classes; pest detection optional via pre-trained IP102 models; always pair with extension guidance. 
TensorFlow
+2
Hugging Face
+2

Product Surface (Web + Mobile)

Home: “What needs attention today” (alerts/tasks).

Plan: Your beds & upcoming sow/plant/harvest.

Scan: Take/upload photo for diagnosis.

Journal: Timeline with photos, auto-events.

Explore: Plant guides (localized), treatments.

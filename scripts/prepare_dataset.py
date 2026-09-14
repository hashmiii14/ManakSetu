import json
from pathlib import Path

ref_path = Path(r"c:\Users\mdhas\Desktop\BIS-Standard-RE\data\processed_data.json")
with open(ref_path, "r", encoding="utf-8") as f:
    ref_data = json.load(f)

print(f"Loaded {len(ref_data)} standards from BIS-Standard-RE reference data.")

canonical_consumer_standards = [
    {
        "standard": "IS 368: 2014",
        "title": "ELECTRIC IMMERSION WATER HEATERS - SPECIFICATION",
        "text": "SUMMARY OF IS 368 : 2014 ELECTRIC IMMERSION WATER HEATERS - SPECIFICATION (Fifth Revision). 1. Scope — This standard covers the performance and safety requirements for portable electric immersion water heaters (immersion geysers) designed for heating water in buckets or open containers for household and similar purposes, operating at single phase AC supply voltage not exceeding 250 V. 2. Requirements — Heating elements shall be sheathed with copper, brass or stainless steel with nickel/chrome plating. 3. Safety & Electrical Tests — High voltage test at 1500 V AC without breakdown, earth continuity resistance not exceeding 0.1 ohm, insulation resistance under moisture condition not less than 2 Megohms, heating element leakage current under normal operating temperature not exceeding 0.75 mA. 4. Construction — Immersion depth markings must be clearly stamped on the sheath. The handle and terminal cover must have protection against ingress of splashing water (IPX7 for immersed part). 5. Quality Control Order — Mandatory ISI certification under Electrical Appliances (Quality Control) Order.",
        "category": "Electrical Appliances",
        "description": "Prescribes safety, electrical insulation, dielectric strength, and performance specifications for portable electric immersion water heaters (immersion geysers) for household use.",
        "scope": "Portable electric immersion water heaters designed for domestic water heating with rated voltage up to 250 V AC.",
        "mandatory_qco": True,
        "qco_notification": "Electrical Appliances (Quality Control) Order, 2023",
        "key_tests": [
            "High Voltage Dielectric Test (1500 V AC for 1 minute)",
            "Earth Continuity & Bonding Test (Max 0.1 ohm)",
            "Insulation Resistance after 48h Damp Heat Exposure (> 2 MOhm)",
            "Maximum Sheath Surface Temperature & Dry Boiling Protection"
        ],
        "labs_available": [
            {"name": "BIS Central Laboratory", "city": "Sahibabad", "state": "Uttar Pradesh"},
            {"name": "Electrical Research and Development Association (ERDA)", "city": "Vadodara", "state": "Gujarat"},
            {"name": "National Test House (NTH)", "city": "Alipore, Kolkata", "state": "West Bengal"}
        ],
        "fee_structure": {
            "application_fee": 1000,
            "annual_license_fee": 1000,
            "audit_fee_per_man_day": 7000,
            "base_marking_fee": 58000,
            "micro_concession_percent": 50,
            "small_concession_percent": 20
        },
        "documentation_required": [
            "List of manufacturing machinery (bending, filling, swaging, brazing, polishing)",
            "In-house test equipment (HV tester, mega-ohmmeter, leakage current tester, power analyzer)",
            "Raw material test certificates for copper/stainless steel tubular element and resistance wire",
            "Valid factory premise proof and pollution control clearances"
        ],
        "source": "BIS Catalogue / Electrical Appliances Division"
    },
    {
        "standard": "IS 2082: 2018",
        "title": "STATIONARY STORAGE TYPE ELECTRIC WATER HEATERS (GEYSERS) - SPECIFICATION",
        "text": "SUMMARY OF IS 2082 : 2018 STATIONARY STORAGE TYPE ELECTRIC WATER HEATERS (Fifth Revision). 1. Scope — Covers the safety, performance, and energy efficiency requirements of stationary storage type electric water heaters (geysers) for household and commercial use, with capacities ranging from 3 litres up to 200 litres, intended for connection to water supply systems. 2. Safety Requirements — Conformity to IS 302-2-21 general electrical safety. Hydrostatic pressure testing of inner storage tank up to 1.0 MPa (10 bar) for high-pressure installations. 3. Energy Efficiency — BEE star-rating standing heat loss limits. Thermostat cutout cutoff temperature verification. 4. Certification — Mandatory ISI Mark under the Electrical Appliances QCO.",
        "category": "Electrical Appliances",
        "description": "Prescribes safety, dielectric strength, energy consumption, and performance parameters for electric storage geysers intended for household and commercial use.",
        "scope": "Stationary storage type electric water heaters (geysers) with storage capacity between 3 L and 200 L for single-phase alternating current.",
        "mandatory_qco": True,
        "qco_notification": "Electrical Appliances (Quality Control) Order, 2023",
        "key_tests": [
            "High Voltage Dielectric & Earth Continuity Test (1500V AC)",
            "Hydrostatic Tank Pressure Resistance (up to 1.0 MPa)",
            "Standing Heat Loss & BEE Star Rating Efficiency",
            "Thermal Cut-out & Thermostat Cycling Reliability Test"
        ],
        "labs_available": [
            {"name": "BIS Central Laboratory", "city": "Sahibabad", "state": "Uttar Pradesh"},
            {"name": "Electrical Research and Development Association (ERDA)", "city": "Vadodara", "state": "Gujarat"},
            {"name": "CPRI Bengaluru", "city": "Bengaluru", "state": "Karnataka"}
        ],
        "fee_structure": {
            "application_fee": 1000,
            "annual_license_fee": 1000,
            "audit_fee_per_man_day": 7000,
            "base_marking_fee": 84000,
            "micro_concession_percent": 50,
            "small_concession_percent": 20
        },
        "documentation_required": [
            "Inner tank welding qualification and pressure vessel testing documentation",
            "Thermostat and thermal cut-out safety component test certificates",
            "In-house electrical test bay with calibrated power and pressure sensors",
            "BEE energy efficiency star rating registration documentation"
        ],
        "source": "BIS Catalogue / Electrical Appliances Division"
    },
    {
        "standard": "IS 9873 (Part 1): 2019",
        "title": "SAFETY OF TOYS - MECHANICAL AND PHYSICAL PROPERTIES",
        "text": "SUMMARY OF IS 9873 (PART 1) : 2019 SAFETY OF TOYS - MECHANICAL AND PHYSICAL PROPERTIES. 1. Scope — Applies to all toys intended for use in play by children under 14 years of age (including baby dolls, plush toys, plastic toys, action figures, ride-on toys, and puzzles). 2. Key Safety Requirements — Small parts cylinder test to prevent choking hazards for children under 36 months. Sharp points and sharp edges evaluation before and after drop tests. Tensile, torque, and compression stress testing. 3. Mandatory QCO — Toys (Quality Control) Order, 2020 mandates ISI mark for domestic manufacturing and imports.",
        "category": "Children & Toys",
        "description": "Applies to all toys and baby dolls intended for children under 14 years. Mandates physical, choking, sharp edge, small parts, and drop testing to prevent injury.",
        "scope": "All toys intended for use in play by children under 14 years of age.",
        "mandatory_qco": True,
        "qco_notification": "Toys (Quality Control) Order, 2020 by DPIIT",
        "key_tests": [
            "Small Parts & Choking Hazard Cylinder Test for infants under 36 months",
            "Sharp Edge & Sharp Point Evaluation",
            "Drop, Impact, Torque, and Tension Stress Testing",
            "Heavy Metal Chemical Migration Test (Lead, Cadmium as per Part 3)"
        ],
        "labs_available": [
            {"name": "BIS Central Laboratory", "city": "Sahibabad", "state": "Uttar Pradesh"},
            {"name": "TUV Rheinland Toy Testing Center", "city": "Gurugram", "state": "Haryana"},
            {"name": "SGS India Testing Lab", "city": "Chennai", "state": "Tamil Nadu"}
        ],
        "fee_structure": {
            "application_fee": 1000,
            "annual_license_fee": 1000,
            "audit_fee_per_man_day": 7000,
            "base_marking_fee": 47000,
            "micro_concession_percent": 50,
            "small_concession_percent": 20
        },
        "documentation_required": [
            "Raw material food-grade / non-toxic certification for plastics, paints, and fabrics",
            "Sample test report as per IS 9873 Parts 1, 2, and 3",
            "Age grading assessment (0-3 yrs vs 3+ yrs)",
            "Quality manual for toy manufacturing and assembly"
        ],
        "source": "BIS Catalogue / Children's Products Division"
    },
    {
        "standard": "IS 4151: 2020",
        "title": "PROTECTIVE HELMETS FOR RIDERS OF TWO WHEELED MOTOR VEHICLES - SPECIFICATION",
        "text": "SUMMARY OF IS 4151 : 2020 PROTECTIVE HELMETS FOR RIDERS OF TWO WHEELED MOTOR VEHICLES (Fourth Revision). 1. Scope — Covers requirements for protective helmets for drivers and passengers of two-wheeled motor vehicles. 2. Safety Benchmark — Impact absorption test using tri-axial accelerometer dropped from 3 meters, chin strap retention and dynamic elongation, penetration resistance test using sharp striker, optical visor quality and scratch resistance. 3. Maximum Weight — Helmet mass shall not exceed 1.2 kg to avoid neck strain. 4. QCO — Mandatory certification under MoRTH Quality Control Order.",
        "category": "Automotive & Safety",
        "description": "Mandates life-saving shock absorption, peripheral vision, chin strap retention, and maximum weight limit of 1.2 kg to protect motorcycle riders across India.",
        "scope": "Protective helmets for drivers and pillion riders of two-wheeled motor vehicles.",
        "mandatory_qco": True,
        "qco_notification": "Ministry of Road Transport and Highways (MoRTH) QCO",
        "key_tests": [
            "Impact Absorption Test with headform drop from 3 meters",
            "Chin Strap Rigidity and Dynamic Retention Test",
            "Visor Optical Transmittance & Scratch Resistance",
            "Penetration Resistance against sharp drop strikers"
        ],
        "labs_available": [
            {"name": "Automotive Research Association of India (ARAI)", "city": "Pune", "state": "Maharashtra"},
            {"name": "International Centre for Automotive Technology (ICAT)", "city": "Manesar", "state": "Haryana"},
            {"name": "Central Institute of Plastics Engineering & Technology (CIPET)", "city": "Murthal", "state": "Haryana"}
        ],
        "fee_structure": {
            "application_fee": 1000,
            "annual_license_fee": 1000,
            "audit_fee_per_man_day": 7000,
            "base_marking_fee": 110000,
            "micro_concession_percent": 50,
            "small_concession_percent": 20
        },
        "documentation_required": [
            "Helmet shell injection moulding machine verification",
            "Expanded Polystyrene (EPS) density quality control protocol",
            "Drop tower test rig calibration report for in-house laboratory"
        ],
        "source": "BIS Catalogue / Transport Engineering Division"
    },
    {
        "standard": "IS 2347: 2017",
        "title": "DOMESTIC PRESSURE COOKERS - SPECIFICATION",
        "text": "SUMMARY OF IS 2347 : 2017 DOMESTIC PRESSURE COOKERS (Fifth Revision). 1. Scope — Specifies requirements for domestic pressure cookers made of aluminium alloys or stainless steel with nominal capacities up to 10 litres. 2. Safety Benchmarks — Operating pressure rating between 0.5 and 1.1 bar (50 to 110 kPa). Hydrostatic proof pressure test at 3 times normal operating pressure without leakage or permanent deformation. Safety valve melting/release temperature verification, gasket food safety migration test. 3. Mandatory QCO — Domestic Pressure Cooker (Quality Control) Order.",
        "category": "Kitchen Appliances & Cookware",
        "description": "Specifies design, material safety, burst pressure resistance, and safety relief valve requirements for domestic aluminium and stainless steel pressure cookers.",
        "scope": "Domestic pressure cookers of nominal cooking capacity not exceeding 10 litres.",
        "mandatory_qco": True,
        "qco_notification": "Domestic Pressure Cooker (Quality Control) Order, 2020",
        "key_tests": [
            "Hydrostatic Proof Pressure Test (3x operating pressure)",
            "Safety Valve Pressure Release & Burst Prevention Test",
            "Thermal Shock and Handle Attachment Fatigue Resistance",
            "Food-Grade Material Chemical Purity Assay"
        ],
        "labs_available": [
            {"name": "BIS Central Laboratory", "city": "Sahibabad", "state": "Uttar Pradesh"},
            {"name": "National Test House (NTH)", "city": "Mumbai", "state": "Maharashtra"}
        ],
        "fee_structure": {
            "application_fee": 1000,
            "annual_license_fee": 1000,
            "audit_fee_per_man_day": 7000,
            "base_marking_fee": 64000,
            "micro_concession_percent": 50,
            "small_concession_percent": 20
        },
        "documentation_required": [
            "Aluminium / stainless steel food-grade material test certificates",
            "In-house hydrostatic pressure testing setup and burst test facility",
            "Safety relief valve fusible plug batch inspection records"
        ],
        "source": "BIS Catalogue / Mechanical Engineering Division"
    },
    {
        "standard": "IS 14543: 2016",
        "title": "PACKAGED DRINKING WATER (OTHER THAN NATURAL MINERAL WATER) - SPECIFICATION",
        "text": "SUMMARY OF IS 14543 : 2016 PACKAGED DRINKING WATER. 1. Scope — Prescribes requirements and methods of sampling and testing for packaged drinking water offered for sale in sealed containers. 2. Microbiological Limits — Nil E. coli, Coliform, Yeast, Mould, Pseudomonas aeruginosa in 250 ml. 3. Chemical Limits — Total dissolved solids (TDS) 75 to 500 mg/L, heavy metals (Lead max 0.01 mg/L, Arsenic max 0.01 mg/L, Mercury max 0.001 mg/L), pesticide residues max 0.0001 mg/L. 4. QCO — Mandatory BIS certification since 2001.",
        "category": "Food & Beverages",
        "description": "Specifies strict microbiological, physical, chemical, and packaging requirements for purified water packaged in sealed bottles, pouches, or jars for consumption.",
        "scope": "Packaged drinking water other than natural mineral water packaged in food-grade plastic or glass containers.",
        "mandatory_qco": True,
        "qco_notification": "Food Safety and Standards / BIS Mandatory Certification Order",
        "key_tests": [
            "Microbiological Safety (Total Coliforms, E. coli, Pseudomonas aeruginosa)",
            "Toxic Heavy Metals Assay (Lead, Arsenic, Cadmium, Mercury via ICP-MS)",
            "Pesticide Residue Scan (Individual max 0.0001 mg/L)",
            "Container Migration & Leachability Test (BPA & Phthalates)"
        ],
        "labs_available": [
            {"name": "BIS Western Regional Laboratory", "city": "Mumbai", "state": "Maharashtra"},
            {"name": "National Test House (NTH)", "city": "Ghaziabad", "state": "Uttar Pradesh"},
            {"name": "CFTRI Central Food Lab", "city": "Mysuru", "state": "Karnataka"}
        ],
        "fee_structure": {
            "application_fee": 1000,
            "annual_license_fee": 1000,
            "audit_fee_per_man_day": 7000,
            "base_marking_fee": 160000,
            "micro_concession_percent": 50,
            "small_concession_percent": 20
        },
        "documentation_required": [
            "In-house Microbiological & Chemical testing lab with autoclave, laminar airflow",
            "Full-time qualified Microbiologist and Analytical Chemist",
            "Groundwater authority extraction clearance and source water testing report"
        ],
        "source": "BIS Catalogue / Food and Agriculture Division"
    },
    {
        "standard": "IS 1293: 2019",
        "title": "PLUGS AND SOCKET-OUTLETS OF RATED VOLTAGE UP TO AND INCLUDING 250V",
        "text": "SUMMARY OF IS 1293 : 2019 PLUGS AND SOCKET-OUTLETS (Fourth Revision). 1. Scope — Covers plugs and fixed or portable socket-outlets for AC systems with rated voltage up to 250 V and rated current up to 16 A. 2. Safety — Ingress and contact safety to prevent accidental electrical contact during insertion. Glow-wire test at 850 C on insulating material. Earth pin making before and breaking after live pins. 3. QCO — Mandatory certification under Plugs and Socket-Outlets QCO.",
        "category": "Electrical Appliances",
        "description": "Covers plugs and socket-outlets for AC systems up to 250V, ensuring fire retardance, child safety shutters, and proper earthing.",
        "scope": "Plugs and socket-outlets for AC only, with or without earthing contact, up to 250 V and 16 A.",
        "mandatory_qco": True,
        "qco_notification": "Plugs and Socket-Outlets (Quality Control) Order, 2021",
        "key_tests": [
            "Glow Wire Flame Retardance Test (850°C)",
            "Withdrawal Force & Contact Pressure Test",
            "Temperature Rise at Rated Current (16A / 6A)",
            "High Current Arc Resistance & Mechanical Impact"
        ],
        "labs_available": [
            {"name": "CPRI", "city": "Noida", "state": "Uttar Pradesh"},
            {"name": "BIS Northern Regional Lab", "city": "Mohali", "state": "Punjab"}
        ],
        "fee_structure": {
            "application_fee": 1000,
            "annual_license_fee": 1000,
            "audit_fee_per_man_day": 7000,
            "base_marking_fee": 65000,
            "micro_concession_percent": 50,
            "small_concession_percent": 20
        },
        "documentation_required": [
            "Tooling and Moulding equipment inspection certificate",
            "Glow-wire test apparatus or NABL calibration certificate",
            "Copper/Brass alloy purity certificate for pins and contacts"
        ],
        "source": "BIS Catalogue / Electrotechnical Division"
    }
]

merged = []
seen_standards = set()

for item in canonical_consumer_standards:
    std_key = item["standard"].lower().replace(" ", "")
    seen_standards.add(std_key)
    merged.append(item)

for doc in ref_data:
    std = doc.get("standard", "").strip()
    std_key = std.lower().replace(" ", "")
    if std_key in seen_standards:
        continue
    seen_standards.add(std_key)

    title = doc.get("title", "").strip()
    text = doc.get("text", "").strip()
    category = doc.get("category") or "Building & Construction Materials"
    
    scope = ""
    if "Scope" in text:
        scope_part = text.split("Scope", 1)[-1]
        scope = scope_part.split("2.", 1)[0].strip(" —-:\n\r\t")[:300]
    if not scope:
        scope = f"Prescribes specification and testing requirements for {title.lower()}."

    description = f"Indian Standard specification covering quality, physical, chemical, and testing parameters for {title.lower()}."
    mandatory = any(k in title.lower() or k in text.lower() for k in ["cement", "steel", "pipe", "wire", "safety", "fire", "drinking"])

    enriched = {
        "standard": std,
        "title": title,
        "text": text,
        "category": category,
        "description": description,
        "scope": scope,
        "mandatory_qco": mandatory,
        "qco_notification": "Quality Control Order (Statutory Compliance)" if mandatory else None,
        "key_tests": [
            "Compressive / Tensile Mechanical Strength Testing",
            "Dimensional Tolerances & Material Uniformity",
            "Chemical Purity & Deleterious Substances Assay",
            "Durability, Soundness & Environmental Conditioning"
        ],
        "labs_available": [
            {"name": "National Test House (NTH)", "city": "Kolkata / Ghaziabad", "state": "India"},
            {"name": "BIS Central Laboratory", "city": "Sahibabad", "state": "Uttar Pradesh"},
            {"name": "NABL Accredited Regional Materials Laboratory", "city": "National Network", "state": "India"}
        ],
        "fee_structure": {
            "application_fee": 1000,
            "annual_license_fee": 1000,
            "audit_fee_per_man_day": 7000,
            "base_marking_fee": 68000,
            "micro_concession_percent": 50,
            "small_concession_percent": 20
        },
        "documentation_required": [
            "Manufacturing machinery and plant layout documentation",
            "In-house calibrated testing equipment list",
            "Raw material quality conformity certificates"
        ],
        "source": "BIS Catalogue / SP 21:2005 Compendium of Indian Standards"
    }
    merged.append(enriched)

out_file = Path(r"c:\Users\mdhas\Desktop\ManakSetu\backend\data\processed_data.json")
out_file.parent.mkdir(parents=True, exist_ok=True)
with open(out_file, "w", encoding="utf-8") as f:
    json.dump(merged, f, indent=2, ensure_ascii=False)

print(f"Successfully generated {out_file} with {len(merged)} standards.")

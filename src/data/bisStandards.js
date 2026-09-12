export const BIS_STANDARDS = [
  {
    id: "IS-2082",
    isCode: "IS 2082:2018",
    title: "Stationary Storage Type Electric Water Heaters (Geysers)",
    category: "Electrical Appliances",
    keywords: ["geyser", "water heater", "electric heater", "storage heater", "hot water"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Electrical Appliances (Quality Control) Order, 2023",
    qcoDate: "Mandatory since 2020",
    description: "Prescribes safety, dielectric strength, energy consumption, and performance parameters for electric storage geysers intended for household use.",
    keyTests: [
      "High Voltage Dielectric & Earth Continuity Test (1500V AC)",
      "Hydrostatic Tank Pressure Resistance (up to 1.0 MPa)",
      "Insulation Resistance under high moisture",
      "Standing Heat Loss & BEE Star Rating Efficiency"
    ],
    labsAvailable: [
      { name: "BIS Central Laboratory", city: "Sahibabad (Delhi NCR)", state: "Uttar Pradesh" },
      { name: "Electrical Research and Development Association (ERDA)", city: "Vadodara", state: "Gujarat" },
      { name: "National Test House (NTH)", city: "Alipore, Kolkata", state: "West Bengal" },
      { name: "Central Power Research Institute (CPRI)", city: "Bengaluru", state: "Karnataka" }
    ],
    feeStructure: {
      applicationFee: 1000,
      annualLicenseFee: 1000,
      auditFeePerManDay: 7000,
      baseMarkingFee: 84000,
      microConcessionPercent: 50,
      smallConcessionPercent: 20,
      womenStartupConcessionPercent: 50
    },
    documentationRequired: [
      "Manufacturing Plant Machinery & Calibrated Test Equipment list",
      "In-house testing facility with qualified QC Chemist/Engineer",
      "Valid Factory Premise Proof (Lease/Deed + Factory License)",
      "Process Flowchart & Raw Material Quality Control Plan"
    ],
    consumerTip: "Always verify the 7-digit CML license number printed under the ISI mark on the geyser metal nameplate."
  },
  {
    id: "IS-14543",
    isCode: "IS 14543:2016",
    title: "Packaged Drinking Water (Other than Natural Mineral Water)",
    category: "Food & Beverages",
    keywords: ["packaged water", "water bottle", "drinking water", "mineral water", "jar water", "packaged drinking water"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Food Safety and Standards / BIS Mandatory Certification Order",
    qcoDate: "Mandatory since 2001",
    description: "Specifies strict microbiological, physical, and chemical requirements for water packaged in sealed bottles, pouches, or 20L jars for human consumption.",
    keyTests: [
      "Microbiological Safety (Total Coliforms, E. coli, Yeast & Mould, Pseudomonas)",
      "Toxic Heavy Metals Assay (Lead, Arsenic, Cadmium, Mercury via ICP-MS)",
      "Pesticide Residue Scan (Individual max 0.0001 mg/L)",
      "Container Migration & Leachability Test (BPA & Phthalates)"
    ],
    labsAvailable: [
      { name: "BIS Western Regional Laboratory", city: "Mumbai", state: "Maharashtra" },
      { name: "National Test House (NTH)", city: "Ghaziabad (NCR)", state: "Uttar Pradesh" },
      { name: "CFRTI Central Lab", city: "Mysuru", state: "Karnataka" }
    ],
    feeStructure: {
      applicationFee: 1000,
      annualLicenseFee: 1000,
      auditFeePerManDay: 7000,
      baseMarkingFee: 160000,
      microConcessionPercent: 50,
      smallConcessionPercent: 20,
      womenStartupConcessionPercent: 50
    },
    documentationRequired: [
      "In-house Microbiological & Chemical testing lab with autoclave, laminar airflow",
      "Full-time qualified Microbiologist and Analytical Chemist",
      "Source Water NOC / Groundwater Authority clearance",
      "Sanitary Conditions Inspection Report of bottling area"
    ],
    consumerTip: "Do not buy water bottles without the IS 14543 ISI logo and expiry date. Check for tamper-evident tamper seals."
  },
  {
    id: "IS-9873-P1",
    isCode: "IS 9873 (Part 1):2019",
    title: "Safety of Toys - Mechanical and Physical Properties",
    category: "Children & Toys",
    keywords: ["toy", "toys", "plastic toys", "wooden toys", "action figure", "doll", "baby toy", "kids game"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Toys (Quality Control) Order, 2020 by DPIIT",
    qcoDate: "Mandatory from 1st Jan 2021",
    description: "Applies to all toys intended for children under 14 years. Mandates rigorous physical, choking, sharp edge, small parts, and drop testing to prevent infant injury.",
    keyTests: [
      "Small Parts & Choking Hazard Cylinder Test for infants under 36 months",
      "Sharp Edge & Sharp Point Evaluation",
      "Drop, Impact, Torque, and Tension stress testing",
      "Part 3 Heavy Metal Chemical Migration Test (Lead, Antimony, Barium)"
    ],
    labsAvailable: [
      { name: "BIS Central Laboratory", city: "Sahibabad", state: "Uttar Pradesh" },
      { name: "TUV Rheinland / NABL Toy Testing Center", city: "Gurugram", state: "Haryana" },
      { name: "SGS India Testing Lab", city: "Chennai", state: "Tamil Nadu" }
    ],
    feeStructure: {
      applicationFee: 1000,
      annualLicenseFee: 1000,
      auditFeePerManDay: 7000,
      baseMarkingFee: 47000,
      microConcessionPercent: 50,
      smallConcessionPercent: 20,
      womenStartupConcessionPercent: 50
    },
    documentationRequired: [
      "Raw material food-grade / non-toxic certification for plastics/paints",
      "Sample test report as per IS 9873 Part 1, 2, and 3",
      "Age grading assessment (e.g., 0-3 yrs, 3+ yrs)",
      "Quality manual for toy assembly and packaging"
    ],
    consumerTip: "Never purchase unmarked imported toys for infants. Look for the ISI mark and age-warning label on packaging."
  },
  {
    id: "IS-1417",
    isCode: "IS 1417:2016",
    title: "Gold and Gold Alloys - Jewellery/Artefacts (Hallmarking)",
    category: "Gold & Jewellery",
    keywords: ["gold", "jewellery", "hallmark", "huid", "gold ring", "gold necklace", "bangles", "gold bar"],
    scheme: "Hallmarking Scheme (HUID)",
    schemeCode: "SCHEME_HALLMARK",
    mandatoryQCO: true,
    qcoNotification: "Hallmarking of Gold Jewellery & Gold Artefacts Order, 2020",
    qcoDate: "Phased mandatory across 343+ Indian districts",
    description: "Specifies purity benchmarks (14K - 585, 18K - 750, 20K - 833, 22K - 916, 23K - 958, 24K - 995) and mandates laser engraving of 6-digit alphanumeric HUID.",
    keyTests: [
      "Fire Assay Method (Destructive cupellation purity verification)",
      "X-Ray Fluorescence (XRF) Non-Destructive Spectrometry",
      "6-Digit Unique HUID Laser Inscription by Assaying and Hallmarking Centre (AHC)"
    ],
    labsAvailable: [
      { name: "BIS Assaying & Hallmarking Centres (AHC)", city: "Over 1,500+ centres across India", state: "All States" }
    ],
    feeStructure: {
      applicationFee: 0,
      annualLicenseFee: 0,
      auditFeePerManDay: 0,
      baseMarkingFee: 45, // per article hallmarking fee
      microConcessionPercent: 0,
      smallConcessionPercent: 0,
      womenStartupConcessionPercent: 0
    },
    documentationRequired: [
      "Jeweller Registration on Manakonline portal (Zero registration fee for MSME turnover < ₹5 Cr)",
      "GSTIN Certificate & PAN card of Jewellery firm",
      "Agreement with BIS Recognized Assaying and Hallmarking Centre (AHC)"
    ],
    consumerTip: "Every authentic gold jewel must have 3 marks: 1. BIS Logo, 2. Purity grade (e.g. 22K916), and 3. Six-digit unique HUID code."
  },
  {
    id: "IS-1293",
    isCode: "IS 1293:2019",
    title: "Plugs and Socket-Outlets of Rated Voltage up to and including 250V",
    category: "Electrical & Hardware",
    keywords: ["plug", "socket", "extension board", "3-pin plug", "2-pin plug", "wall socket", "power strip"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Plugs and Socket-Outlets (Quality Control) Order",
    qcoDate: "Mandatory from 2021",
    description: "Covers plugs and fixed/portable socket-outlets for AC systems up to 250V. Ensures fire resistance, prevention of accidental electrical touch, and robust earthing.",
    keyTests: [
      "Glow Wire Flame Retardance Test (850°C)",
      "Withdrawal Force & Contact Pressure Test",
      "Temperature Rise at rated current (16A / 6A)",
      "High Current Arc Resistance & Mechanical Impact"
    ],
    labsAvailable: [
      { name: "Central Power Research Institute (CPRI)", city: "Noida", state: "Uttar Pradesh" },
      { name: "BIS Northern Regional Lab", city: "Mohali", state: "Punjab" },
      { name: "ERDA", city: "Vadodara", state: "Gujarat" }
    ],
    feeStructure: {
      applicationFee: 1000,
      annualLicenseFee: 1000,
      auditFeePerManDay: 7000,
      baseMarkingFee: 65000,
      microConcessionPercent: 50,
      smallConcessionPercent: 20,
      womenStartupConcessionPercent: 50
    },
    documentationRequired: [
      "Tooling and Moulding equipment inspection certificate",
      "Glow-wire test apparatus or NABL calibration certificate",
      "Copper/Brass alloy purity certificate for pins and contacts"
    ],
    consumerTip: "Cheap unbranded plugs can melt and trigger house fires. Check for embossed ISI mark with IS 1293 on the plastic casing."
  },
  {
    id: "IS-13252-P1",
    isCode: "IS 13252 (Part 1):2010",
    title: "Information Technology Equipment - General Safety Requirements",
    category: "Electronics & IT",
    keywords: ["laptop", "power adapter", "charger", "printer", "scanner", "pos terminal", "router", "smart watch", "it equipment"],
    scheme: "Scheme-II (Compulsory Registration Scheme - CRS)",
    schemeCode: "SCHEME_CRS",
    mandatoryQCO: true,
    qcoNotification: "MeitY Compulsory Registration Order (CRO)",
    qcoDate: "Mandatory",
    description: "MeitY mandate for IT and electronics goods. Unlike Scheme-I, CRS does not require factory audit beforehand; registration is granted based on NABL lab test reports.",
    keyTests: [
      "Creepage Distance & Electrical Clearance",
      "Protection Against Electric Shock & Energy Hazards",
      "Thermal Endurance & Flammability Class V-0 / V-1",
      "Leakage Current under tropical moisture conditions"
    ],
    labsAvailable: [
      { name: "UL India Lab", city: "Bengaluru", state: "Karnataka" },
      { name: "Intertek Testing Services", city: "New Delhi", state: "Delhi" },
      { name: "SAMEER Laboratory", city: "Chennai", state: "Tamil Nadu" }
    ],
    feeStructure: {
      applicationFee: 1000,
      annualLicenseFee: 0,
      auditFeePerManDay: 0,
      baseMarkingFee: 53000, // Processing and Registration Fee
      microConcessionPercent: 0,
      smallConcessionPercent: 0,
      womenStartupConcessionPercent: 0
    },
    documentationRequired: [
      "Test report from BIS-recognized NABL testing laboratory (not older than 90 days)",
      "Authorized Indian Representative (AIR) undertaking for foreign manufacturers",
      "Brand owner trademark certificate or Brand Authorization Letter"
    ],
    consumerTip: "Look for the CRS self-declaration statement: 'IS 13252 (Part 1) / IEC 60950-1, R-XXXXXXXX' on chargers and electronics."
  },
  {
    id: "IS-4151",
    isCode: "IS 4151:2020",
    title: "Protective Helmets for Riders of Two Wheeled Motor Vehicles",
    category: "Automotive & Safety",
    keywords: ["helmet", "bike helmet", "two wheeler helmet", "rider safety", "motorcycle helmet"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Ministry of Road Transport and Highways (MoRTH) QCO",
    qcoDate: "Mandatory since June 2021",
    description: "Mandates life-saving shock absorption, peripheral vision, chin strap retention, and maximum weight limit of 1.2 kg to protect motorcycle riders across India.",
    keyTests: [
      "Impact Absorption Test with headform drop from 3 meters",
      "Chin Strap Rigidity and Dynamic Retention Test",
      "Visor Optical Transmittance & Scratch Resistance",
      "Penetration Resistance against sharp drop strikers"
    ],
    labsAvailable: [
      { name: "Automotive Research Association of India (ARAI)", city: "Pune", state: "Maharashtra" },
      { name: "International Centre for Automotive Technology (ICAT)", city: "Manesar", state: "Haryana" },
      { name: "Central Institute of Plastics Engineering & Technology (CIPET)", city: "Murthal", state: "Haryana" }
    ],
    feeStructure: {
      applicationFee: 1000,
      annualLicenseFee: 1000,
      auditFeePerManDay: 7000,
      baseMarkingFee: 110000,
      microConcessionPercent: 50,
      smallConcessionPercent: 20,
      womenStartupConcessionPercent: 50
    },
    documentationRequired: [
      "Helmet shell injection moulding machine verification",
      "Expanded Polystyrene (EPS) density quality control protocol",
      "Drop tower test rig calibration report for in-house laboratory"
    ],
    consumerTip: "Roadside non-ISI helmets crack on minor impact. Buying or selling non-ISI helmets is a punishable criminal offense under the BIS Act."
  },
  {
    id: "IS-12269",
    isCode: "IS 12269:2013",
    title: "Ordinary Portland Cement 53 Grade",
    category: "Construction Materials",
    keywords: ["cement", "opc 53", "portland cement", "concrete", "construction cement", "53 grade"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Cement (Quality Control) Order",
    qcoDate: "Mandatory",
    description: "Specifies compressive strength (minimum 53 MPa at 28 days), setting times, chemical purity, and fineness for high-strength infrastructure construction.",
    keyTests: [
      "Compressive Strength at 72 hours, 168 hours, and 672 hours",
      "Initial & Final Setting Time via Vicat Apparatus",
      "Soundness Test (Le-Chatelier & Autoclave)",
      "Insoluble Residue & Loss on Ignition (LOI) Chemical Analysis"
    ],
    labsAvailable: [
      { name: "National Council for Cement and Building Materials (NCCBM)", city: "Ballabgarh", state: "Haryana" },
      { name: "BIS Northern Regional Lab", city: "Chandigarh", state: "Punjab" }
    ],
    feeStructure: {
      applicationFee: 1000,
      annualLicenseFee: 1000,
      auditFeePerManDay: 7000,
      baseMarkingFee: 250000,
      microConcessionPercent: 50,
      smallConcessionPercent: 20,
      womenStartupConcessionPercent: 50
    },
    documentationRequired: [
      "Clinker quality and gypsum blending records",
      "Fully equipped wet chemical and compressive strength testing laboratory",
      "Pollution control board consents and limestone lease documentation"
    ],
    consumerTip: "Look for machine-stitched cement bags clearly marked with the ISI symbol, IS 12269, and week/year of manufacture."
  }
];

export const SCHEMES_INFO = [
  {
    code: "SCHEME_1",
    name: "Scheme-I (ISI Mark Scheme)",
    target: "Domestic Manufacturers for Products under Mandatory or Voluntary BIS Quality Standards",
    badge: "ISI Mark",
    description: "Full quality assurance scheme requiring both in-house factory testing capabilities, BIS officer factory inspection, and independent laboratory testing.",
    steps: [
      "1. Online Application submission on Manakonline with requisite documents & ₹1,000 fee",
      "2. BIS Officer conducts comprehensive Factory Audit & verification of testing machinery",
      "3. Drawing of sample by BIS officer & sealed dispatch to BIS recognized testing lab",
      "4. Scrutiny of factory audit report and independent lab test report",
      "5. Grant of License (CML Number) & permission to print ISI mark on products"
    ]
  },
  {
    code: "SCHEME_CRS",
    name: "Scheme-II (Compulsory Registration Scheme - CRS)",
    target: "Electronics & Information Technology Goods (MeitY / Ministry of Power)",
    badge: "CRS Registration",
    description: "Simplified conformity assessment based on self-declaration and third-party laboratory test reports without prior factory physical audits.",
    steps: [
      "1. Submit production sample to BIS recognized NABL test lab in India",
      "2. Receive passing test report (valid for 90 days)",
      "3. Submit online application on BIS CRS portal with test report & brand proof",
      "4. Verification by BIS CRS team & grant of Unique Registration Number (R-XXXXXXXX)"
    ]
  },
  {
    code: "SCHEME_HALLMARK",
    name: "Hallmarking Scheme (Gold & Silver)",
    target: "Jewellers, Assaying & Hallmarking Centres (AHCs)",
    badge: "6-Digit HUID",
    description: "Third-party assessment of purity in precious metals according to IS 1417 (Gold) and IS 2112 (Silver) using laser-engraved 6-digit alphanumeric HUID codes.",
    steps: [
      "1. Jeweller registers on Manakonline (Free for turnover under ₹5 Cr)",
      "2. Jeweller sends manufactured jewellery batch to BIS Recognized AHC",
      "3. AHC tests purity using fire assay / XRF and laser engraves the 6-digit HUID",
      "4. HUID synced to central BIS Care server for instant consumer mobile verification"
    ]
  }
];

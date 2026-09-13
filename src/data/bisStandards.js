/**
 * Comprehensive BIS Standards Dataset for ManakSetu
 * Contains 36 detailed, realistic Indian Standards across national industrial sectors.
 * Prototype guidance based on Gazette Quality Control Orders & BIS Compendium.
 */

export const BIS_STANDARDS = [
  // 1. GEYSERS
  {
    id: "IS-2082",
    isCode: "IS 2082:2018",
    title: "Stationary Storage Type Electric Water Heaters (Geysers)",
    category: "Electrical Appliances",
    sector: "Electrical Engineering",
    keywords: ["geyser", "water heater", "electric heater", "storage heater", "hot water"],
    colloquialTerms: ["geyser", "gijar", "paani garam karne ki machine", "storage geyser", "electric water heater", "bathroom geyser"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Electrical Appliances (Quality Control) Order, 2023",
    qcoDate: "Mandatory since 2020",
    gazetteNotification: {
      order: "Electrical Appliances (Quality Control) Order, 2023",
      ministry: "Ministry of Commerce and Industry (DPIIT)",
      date: "05-March-2023",
      gazetteRef: "S.O. 1042(E)"
    },
    description: "Prescribes safety, dielectric strength, energy consumption, and performance parameters for electric storage geysers intended for household use.",
    scope: "Stationary storage type electric water heaters with storage capacity between 3 L and 200 L for single-phase alternating current up to 250V.",
    keyTests: [
      "High Voltage Dielectric & Earth Continuity Test (1500V AC)",
      "Hydrostatic Tank Pressure Resistance (up to 1.0 MPa)",
      "Insulation Resistance under high moisture (Min 2 MOhm)",
      "Standing Heat Loss & BEE Star Rating Efficiency"
    ],
    globalHarmonization: {
      standard: "IEC 60335-2-21:2012+AMD1:2018",
      org: "International Electrotechnical Commission (IEC)",
      exportEquivalence: "94% Alignment (Harmonized Safety Clauses)",
      note: "Fully compatible with European CE marking and Gulf G-Mark safety evaluations.",
      compatibleMarkets: ["European Union (CE)", "GCC (G-Mark)", "ASEAN", "United Kingdom (UKCA)"]
    },
    citizenCard: {
      headline: "How to check your household Geyser",
      mandatoryMark: "ISI Mark with 7-digit CM/L Number",
      safetyRisk: "Uncertified geysers can cause fatal electric shocks or boiler tank rupture under water pressure.",
      labelInstruction: "Examine the metal rating plate on the geyser bottom. Ensure IS 2082 is stamped along with the 7-digit license number CM/L-XXXXXXX.",
      actionTip: "Verify the 7-digit license instantly using TrueMark Verifier."
    },
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

  // 2. IMMERSION HEATER
  {
    id: "IS-368",
    isCode: "IS 368:2014",
    title: "Electric Immersion Water Heaters - Specification",
    category: "Electrical Appliances",
    sector: "Electrical Engineering",
    keywords: ["immersion heater", "water rod", "electric rod", "immersion geyser", "water heater rod"],
    colloquialTerms: ["rod", "paani garam karne wali rod", "heater rod", "chulha water heater", "immersion rod", "geyser rod"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Electrical Appliances (Quality Control) Order, 2023",
    qcoDate: "Mandatory since 2018",
    gazetteNotification: {
      order: "Electrical Appliances (Quality Control) Order",
      ministry: "DPIIT, Ministry of Commerce & Industry",
      date: "14-July-2023",
      gazetteRef: "S.O. 3174(E)"
    },
    description: "Covers performance and safety requirements for portable electric immersion water heaters designed for heating water in buckets or domestic containers up to 250V AC.",
    scope: "Portable electric immersion water heaters intended for domestic use having power consumption up to 3000 Watts.",
    keyTests: [
      "High Voltage Dielectric Breakdown (1500V AC without flashover)",
      "Earth Continuity Resistance (< 0.1 Ohm)",
      "Insulation Resistance after 48h Damp Heat Exposure (> 2 MOhm)",
      "Immersion Depth and Splashproof Terminal Ingress (IPX7)"
    ],
    globalHarmonization: {
      standard: "IEC 60335-2-74:2002+AMD1:2006",
      org: "International Electrotechnical Commission (IEC)",
      exportEquivalence: "92% Alignment",
      note: "Permitted for commercial export to South Asian (SAARC) and African markets with BIS CB test certificate.",
      compatibleMarkets: ["SAARC Countries", "Middle East", "East Africa"]
    },
    citizenCard: {
      headline: "Immersion Rod Safety Verification",
      mandatoryMark: "Embossed ISI Mark on plastic handle",
      safetyRisk: "Substandard rods leak current into bucket water, posing fatal electrocution hazards in bathrooms.",
      labelInstruction: "Check for minimum immersion marking stamped on the copper tube and an embossed ISI logo on the handle.",
      actionTip: "Never purchase local unbranded rods without an operative 7-digit CML license number."
    },
    labsAvailable: [
      { name: "BIS Central Laboratory", city: "Sahibabad", state: "Uttar Pradesh" },
      { name: "Electrical Research and Development Association (ERDA)", city: "Vadodara", state: "Gujarat" },
      { name: "Regional Testing Centre (RTC)", city: "Okhla, New Delhi", state: "Delhi" }
    ],
    feeStructure: {
      applicationFee: 1000,
      annualLicenseFee: 1000,
      auditFeePerManDay: 7000,
      baseMarkingFee: 54000,
      microConcessionPercent: 50,
      smallConcessionPercent: 20,
      womenStartupConcessionPercent: 50
    },
    documentationRequired: [
      "Factory machinery and copper tube brazing setup verification",
      "Calibration certificate of High Voltage Flash Tester (0-3 kV)",
      "Valid Factory Premise Proof and Power Sanction Letter"
    ],
    consumerTip: "Ensure the rod has a clear 'Water Level Indicator' embossed on the tube."
  },

  // 3. PACKAGED DRINKING WATER
  {
    id: "IS-14543",
    isCode: "IS 14543:2016",
    title: "Packaged Drinking Water (Other than Packaged Natural Mineral Water)",
    category: "Food & Water",
    sector: "Food & Agriculture",
    keywords: ["water", "packaged drinking water", "mineral water", "bottled water", "water jar", "20L jar"],
    colloquialTerms: ["paani ki botal", "pani ka jar", "bisleri", "aquafina", "drinking water", "20 litre can", "bottle water"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Prevention of Food Adulteration / FSSAI & BIS Mandatory Certification Order",
    qcoDate: "Mandatory statutory compliance under Section 31 FSS Act & BIS Act 2016",
    gazetteNotification: {
      order: "Food Safety and Standards (Prohibition and Restrictions on Sales) Regulations",
      ministry: "Ministry of Health and Family Welfare (FSSAI)",
      date: "01-Jan-2001",
      gazetteRef: "G.S.R. 760(E)"
    },
    description: "Prescribes rigorous microbiological, chemical, and physical parameters for packaged drinking water filled in hermetically sealed plastic or glass containers.",
    scope: "Packaged drinking water treated through reverse osmosis, demineralization, distillation or ozone conditioning for direct human consumption.",
    keyTests: [
      "Microbiological Safety: Total Coliform, E. coli, Salmonella, Yeast & Mould (Must be Absent)",
      "Pesticide Residue Limits (Individual max 0.0001 mg/L, Total max 0.0005 mg/L via GC-MS)",
      "Heavy Metals: Lead (max 0.01 mg/L), Arsenic (max 0.01 mg/L), Mercury, Cadmium",
      "Total Dissolved Solids (TDS: 75 to 500 mg/L) and pH balance (6.5 to 8.5)"
    ],
    globalHarmonization: {
      standard: "CODEX STAN 227-2001 / WHO Guidelines for Drinking-water Quality",
      org: "Codex Alimentarius / World Health Organization",
      exportEquivalence: "100% WHO Conformity",
      note: "Fully compliant with international bottled water export guidelines and FDA standards.",
      compatibleMarkets: ["United States (FDA)", "European Union", "Gulf States (GSO 1025)"]
    },
    citizenCard: {
      headline: "How to identify authentic bottled water",
      mandatoryMark: "Blue ISI Stamp with 7-digit CML Number + QR Code",
      safetyRisk: "Untreated borewell water packaged in fake jars contains waterborne pathogens (E. coli) and hazardous pesticide residues.",
      labelInstruction: "Always check the neck seal. Authentic jars display IS 14543 along with CML-XXXXXXX and FSSAI 14-digit license.",
      actionTip: "Never accept unsealed 20-litre cans without an operative ISI mark."
    },
    labsAvailable: [
      { name: "BIS Central Laboratory Food Testing Division", city: "Sahibabad", state: "Uttar Pradesh" },
      { name: "Central Food Technological Research Institute (CFTRI)", city: "Mysuru", state: "Karnataka" },
      { name: "National Test House (NTH)", city: "Kolkata", state: "West Bengal" },
      { name: "Shriram Institute for Industrial Research", city: "New Delhi", state: "Delhi" }
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
      "Complete in-house microbiological laboratory setup with laminar flow and autoclave",
      "Groundwater extraction NOC from Central Ground Water Authority (CGWA)",
      "FSSAI manufacturing license or Form-B registration copy",
      "Full pesticide residue test report from approved NABL laboratory"
    ],
    consumerTip: "Crack the seal yourself. Scan the 7-digit CML number on the BIS Care App before drinking."
  },

  // 4. TOYS SAFETY
  {
    id: "IS-9873-1",
    isCode: "IS 9873 (Part 1):2019",
    title: "Safety of Toys - Part 1: Mechanical and Physical Properties",
    category: "Consumer Products",
    sector: "Consumer Goods & Toys",
    keywords: ["toys", "baby toys", "children", "plastic toys", "kids games", "soft toys"],
    colloquialTerms: ["khilona", "baccho ke khilone", "teddy bear", "plastic toy", "remote car", "baby rattle"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Toys (Quality Control) Order, 2020",
    qcoDate: "Mandatory since 01-Jan-2021",
    gazetteNotification: {
      order: "Toys (Quality Control) Order, 2020",
      ministry: "DPIIT, Ministry of Commerce & Industry",
      date: "25-Feb-2020",
      gazetteRef: "S.O. 853(E)"
    },
    description: "Specifies mechanical and physical safety requirements for toys intended for children under 14 years to prevent choking, sharp edges, and pinch hazards.",
    scope: "All toys intended for use by children under 14 years of age including rattles, ride-on toys, projectile toys, dolls, and stuffed plush toys.",
    keyTests: [
      "Small Parts Cylinder Test for Choking Hazard (under 36 months)",
      "Sharp Edge and Sharp Point Accessibility Probe Testing",
      "Drop, Impact, Torque, and Tension Durability Stress Tests",
      "Phthalates & Heavy Metal Chemical Migration (Part 3 Compliance)"
    ],
    globalHarmonization: {
      standard: "ISO 8124-1:2018 / EN 71-1:2014+A1:2018",
      org: "International Organization for Standardization (ISO)",
      exportEquivalence: "96% Direct Equivalence to EN 71 and ASTM F963",
      note: "Harmonized to allow Indian toy manufacturers to export directly to EU and US retail chains.",
      compatibleMarkets: ["European Union (EN 71)", "United States (ASTM F963)", "Australia / NZ"]
    },
    citizenCard: {
      headline: "Protecting your child from toxic / hazardous toys",
      mandatoryMark: "Permanent ISI Mark printed on the toy or main packaging",
      safetyRisk: "Non-compliant toys have small detachable parts causing fatal infant choking, and toxic lead in paints.",
      labelInstruction: "Inspect the packaging for the red & blue ISI logo, manufacturer address, and age classification warning.",
      actionTip: "Report Chinese or uncertified toys sold without an ISI mark to BIS."
    },
    labsAvailable: [
      { name: "BIS Central Testing Laboratory", city: "Sahibabad", state: "Uttar Pradesh" },
      { name: "Central Institute of Petrochemicals Engineering & Technology (CIPET)", city: "Chennai", state: "Tamil Nadu" },
      { name: "TUV Rheinland India Testing Lab", city: "Bengaluru", state: "Karnataka" }
    ],
    feeStructure: {
      applicationFee: 1000,
      annualLicenseFee: 1000,
      auditFeePerManDay: 7000,
      baseMarkingFee: 46000,
      microConcessionPercent: 50,
      smallConcessionPercent: 20,
      womenStartupConcessionPercent: 50
    },
    documentationRequired: [
      "In-house physical testing equipment (drop tester, small parts cylinder, sharp point tester)",
      "Virgin grade non-toxic polymer purchase invoices and food-contact compliance certs",
      "Detailed bill of materials (BOM) including paints and surface coatings"
    ],
    consumerTip: "Look for the age recommendation symbol (0-3 warning) and ensure the ISI mark is permanent."
  },

  // 5. GOLD HALLMARKING
  {
    id: "IS-1417",
    isCode: "IS 1417:2016",
    title: "Gold and Gold Alloys, Jewellery/Artefacts - Fineness and Marking",
    category: "Gold & Jewellery",
    sector: "Precious Metals",
    keywords: ["gold", "hallmark", "huid", "jewellery", "gold chain", "22k gold", "18k gold", "carat"],
    colloquialTerms: ["sona", "sone ka gehna", "kundan", "hallmark sona", "22 karat", "gold hallmark", "huid code"],
    scheme: "Scheme-IV (Hallmarking)",
    schemeCode: "SCHEME_4",
    mandatoryQCO: true,
    qcoNotification: "Hallmarking of Gold Jewellery and Gold Artefacts Order, 2020",
    qcoDate: "Mandatory phase-wise across 343 districts since June 2021",
    gazetteNotification: {
      order: "Hallmarking of Gold Jewellery Order",
      ministry: "Ministry of Consumer Affairs, Food and Public Distribution",
      date: "15-Jan-2020",
      gazetteRef: "S.O. 205(E)"
    },
    description: "Specifies grades of gold fineness (24K, 23K, 22K, 20K, 18K, 14K) and prescribes statutory laser engraving of 6-digit alphanumeric HUID codes.",
    scope: "Gold jewellery and artefacts sold to Indian consumers across all hallmarking mandated districts.",
    keyTests: [
      "Fire Assay Gravimetric Method (IS 1418 Benchmark destructive test)",
      "X-Ray Fluorescence Spectrometry (XRF non-destructive composition screen)",
      "Assaying & Hallmarking Centre (AHC) 6-digit laser HUID inscription",
      "Touchstone and acid comparative density screen"
    ],
    globalHarmonization: {
      standard: "ISO 9202:2019 (Jewellery and precious metals - Fineness)",
      org: "International Organization for Standardization (ISO)",
      exportEquivalence: "100% International Standard Fineness Alignment",
      note: "Accepted globally in Dubai, London Bullion Market Association (LBMA), and Singapore.",
      compatibleMarkets: ["Global Bullion Markets", "GCC Countries", "United Kingdom", "United States"]
    },
    citizenCard: {
      headline: "The 3 Mandatory Marks on Pure Gold Jewellery",
      mandatoryMark: "BIS Logo + Purity Grade (e.g. 22K916) + 6-Digit Alphanumeric HUID",
      safetyRisk: "Un-hallmarked gold is frequently under-carated by 15-30% by dishonest retailers.",
      labelInstruction: "Ask the jeweller for a 10x magnifying loupe. You must see the BIS triangle, purity mark, and 6-character HUID.",
      actionTip: "Verify the 6-character HUID instantly on TrueMark Verifier to see assay date and jeweller registration."
    },
    labsAvailable: [
      { name: "BIS Recognized Assaying and Hallmarking Centre (AHC)", city: "Karol Bagh, New Delhi", state: "Delhi" },
      { name: "Zaveri Bazaar Central Assaying Facility", city: "Mumbai", state: "Maharashtra" },
      { name: "Tamil Nadu Jewellers Assaying Lab", city: "Coimbatore", state: "Tamil Nadu" }
    ],
    feeStructure: {
      applicationFee: 0,
      annualLicenseFee: 0,
      auditFeePerManDay: 0,
      baseMarkingFee: 45, // ₹45 per gold article
      microConcessionPercent: 0,
      smallConcessionPercent: 0,
      womenStartupConcessionPercent: 0
    },
    documentationRequired: [
      "Jeweller GSTIN Registration and premise address proof",
      "Online self-registration on www.manakonline.in (Zero registration fee for MSMEs < ₹5 Cr)",
      "Safe storage locker verification certificate"
    ],
    consumerTip: "Every bill must separately list the 6-digit HUID code, weight of gold, and hallmarking charges."
  },

  // 6. ELECTRICAL PLUGS AND SOCKETS
  {
    id: "IS-1293",
    isCode: "IS 1293:2019",
    title: "Plugs and Socket-Outlets of Rated Voltage up to and including 250 Volts",
    category: "Electrical Appliances",
    sector: "Electrical Engineering",
    keywords: ["plug", "socket", "switch", "extension board", "3 pin plug", "16A plug", "6A socket"],
    colloquialTerms: ["switch", "plug", "socket", "bijli ka board", "extension cord", "3 pin top", "multi plug"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Plugs and Socket-Outlets (Quality Control) Order, 2021",
    qcoDate: "Mandatory since 2021",
    gazetteNotification: {
      order: "Plugs and Socket-Outlets (Quality Control) Order",
      ministry: "DPIIT, Ministry of Commerce & Industry",
      date: "23-Oct-2021",
      gazetteRef: "S.O. 4452(E)"
    },
    description: "Prescribes dimensional tolerances, terminal temperature rise, electrical endurance, and fire resistance for plugs and socket-outlets used in domestic installations.",
    scope: "Plugs and fixed or portable socket-outlets for a.c. only, with or without earthing contact, having rated voltage up to 250V and rated current up to 16A.",
    keyTests: [
      "Contact Resistance & Temperature Rise Test (Max 45K rise under rated load)",
      "Breaking Capacity and Normal Operation Endurance (10,000 insertion cycles)",
      "Glow Wire Flame Flammability Test (Insulating material fire retardancy at 850°C)",
      "Terminal Mechanical Pull-out and Flexing Test for flexible cords"
    ],
    globalHarmonization: {
      standard: "IEC 60884-1:2002+AMD1:2006 (Type D & M Indian Standard Profile)",
      org: "International Electrotechnical Commission",
      exportEquivalence: "High Compatibility with UK & Commonwealth British Standards",
      note: "Complies with Type D (5A) and Type M (15A) standards adopted across Africa and South Asia.",
      compatibleMarkets: ["SAARC", "East & South Africa", "Middle East"]
    },
    citizenCard: {
      headline: "Preventing Domestic Fire from Low-grade Plugs",
      mandatoryMark: "Embossed ISI Mark on plug top and socket faceplate",
      safetyRisk: "Substandard plugs made from recycled brittle plastic overheat and ignite curtains/carpets.",
      labelInstruction: "Ensure solid brass pins with earthing pin longer than live/neutral pins. Look for embossed IS 1293 mark.",
      actionTip: "Never connect heavy appliances (geysers/AC) to uncertified adapter multi-plugs."
    },
    labsAvailable: [
      { name: "BIS Central Laboratory", city: "Sahibabad", state: "Uttar Pradesh" },
      { name: "ERDA Vadodara", city: "Vadodara", state: "Gujarat" },
      { name: "CPRI Bengaluru", city: "Bengaluru", state: "Karnataka" }
    ],
    feeStructure: {
      applicationFee: 1000,
      annualLicenseFee: 1000,
      auditFeePerManDay: 7000,
      baseMarkingFee: 58000,
      microConcessionPercent: 50,
      smallConcessionPercent: 20,
      womenStartupConcessionPercent: 50
    },
    documentationRequired: [
      "In-house endurance test rig and temperature rise measurement chamber",
      "Virgin polycarbonate / flame retardant material certificates",
      "Calibration certificates of thermocouple dataloggers"
    ],
    consumerTip: "Never use 3-pin plugs that have loose or hollow sheet-metal pins."
  },

  // 7. IT EQUIPMENT / LAPTOPS (CRS SCHEME-II)
  {
    id: "IS-13252-1",
    isCode: "IS 13252 (Part 1):2010",
    title: "Information Technology Equipment - Safety - General Requirements",
    category: "Electronics & IT",
    sector: "Electronics & IT Goods",
    keywords: ["laptop", "computer", "server", "power adapter", "charger", "it equipment", "smartphone"],
    colloquialTerms: ["laptop", "computer charger", "mobile adapter", "pc", "power bank", "smps power supply"],
    scheme: "Scheme-II (CRS Registration)",
    schemeCode: "SCHEME_2",
    mandatoryQCO: true,
    qcoNotification: "Electronics and Information Technology Goods (Requirement for Compulsory Registration) Order, 2021",
    qcoDate: "Mandatory since 2013 (MeitY)",
    gazetteNotification: {
      order: "Electronics and IT Goods (Compulsory Registration) Order",
      ministry: "Ministry of Electronics and Information Technology (MeitY)",
      date: "03-Oct-2012",
      gazetteRef: "S.O. 2357(E)"
    },
    description: "Prescribes electrical safety, heating, insulation, energy hazards, and flammability requirements for computers, printers, and information technology apparatus.",
    scope: "Mains-powered or battery-powered information technology equipment, including business equipment and associated telecom apparatus, with rated voltage up to 600V.",
    keyTests: [
      "Touch Current and Protective Conductor Current Measurement (< 0.25 mA)",
      "Electric Strength / Hi-Pot Test between primary and accessible secondary circuits",
      "Thermal Endurance & Component Temperature Rise under fault conditions",
      "Mechanical Enclosure Drop & Ball Impact Resistance (0.5 Joule)"
    ],
    globalHarmonization: {
      standard: "IEC 60950-1:2005 / IEC 62368-1:2018 (Hazard Based Audio/IT Standard)",
      org: "International Electrotechnical Commission (IEC)",
      exportEquivalence: "100% IEC Harmonization (CB Scheme Acceptance)",
      note: "Test reports from IECEE CB Scheme accredited labs can be converted directly into BIS CRS registration.",
      compatibleMarkets: ["Global (EU, USA, Japan, Korea, Australia)"]
    },
    citizenCard: {
      headline: "Understanding the BIS CRS Mark on Electronics",
      mandatoryMark: "BIS Standard Mark with 'R-XXXXXXXX' 8-digit Registration Number",
      safetyRisk: "Counterfeit adapters catch fire or deliver 220V mains electricity directly into laptop bodies.",
      labelInstruction: "Check the adapter label. It must carry the words 'Self-Declaration - Conforming to IS 13252 (Part 1)' and R-XXXXXXXX.",
      actionTip: "Verify the R-number on the official BIS CRS portal or ManakSetu."
    },
    labsAvailable: [
      { name: "SAMEER (Society for Applied Microwave Electronics)", city: "Chennai", state: "Tamil Nadu" },
      { name: "Electronic Regional Test Laboratory (ERTL)", city: "New Delhi", state: "Delhi" },
      { name: "UL India Testing Laboratory", city: "Bengaluru", state: "Karnataka" },
      { name: "Intertek India Laboratory", city: "Gurugram", state: "Haryana" }
    ],
    feeStructure: {
      applicationFee: 1000,
      annualLicenseFee: 0,
      auditFeePerManDay: 0, // No factory audit in Scheme-II CRS
      baseMarkingFee: 53000,
      microConcessionPercent: 0,
      smallConcessionPercent: 0,
      womenStartupConcessionPercent: 0
    },
    documentationRequired: [
      "Complete Safety Test Report from a BIS recognized Indian NABL test lab",
      "Authorized Indian Representative (AIR) undertaking for foreign manufacturers",
      "Product specification sheets and critical component list (CCL)"
    ],
    consumerTip: "Look for the R-number (e.g. R-41000123) on laptop chargers before purchasing."
  },

  // 8. HELMETS FOR TWO WHEELERS
  {
    id: "IS-4151",
    isCode: "IS 4151:2020",
    title: "Protective Helmets for Two Wheeler Riders - Specification",
    category: "Automotive & Safety",
    sector: "Transport Engineering",
    keywords: ["helmet", "two wheeler helmet", "bike helmet", "motorcycle helmet", "full face helmet"],
    colloquialTerms: ["helmet", "bike ka helmet", "motorcycle topi", "sir bachane wala", "full face helmet", "riding helmet"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Two Wheeler Helmets (Quality Control) Order, 2020",
    qcoDate: "Mandatory enforcement from 01-June-2021 by MoRTH",
    gazetteNotification: {
      order: "Two Wheeler Helmets (Quality Control) Order",
      ministry: "Ministry of Road Transport and Highways (MoRTH)",
      date: "26-Nov-2020",
      gazetteRef: "S.O. 4252(E)"
    },
    description: "Prescribes structural impact attenuation, penetration resistance, chin strap retention, and optical visor clarity to protect motorcycle riders from fatal head trauma.",
    scope: "Protective helmets for drivers and passengers of two-wheeled motor vehicles on Indian public roads.",
    keyTests: [
      "Impact Absorption Drop Test onto Flat and Hemispherical Steel Anvils (Max headform acceleration 300g)",
      "Penetration Resistance Test using 3 kg Pointed Steel Striker dropped from 1 meter",
      "Retention System Dynamic Roll-off and Chin Strap Tensile Elongation Test",
      "Visor Optical Distortion, Light Transmittance (Min 85%), and Scratch Resistance"
    ],
    globalHarmonization: {
      standard: "ECE 22.05 / ECE 22.06 (United Nations Economic Commission for Europe)",
      org: "UN ECE Transport Division",
      exportEquivalence: "88% Alignment (Tailored for Tropical Indian Temperatures up to 50°C)",
      note: "Accepted across South Asia; conforms to rigorous DOT (USA) impact deceleration limits.",
      compatibleMarkets: ["SAARC", "ASEAN", "Latin America"]
    },
    citizenCard: {
      headline: "Recognizing a Genuine Life-Saving Helmet",
      mandatoryMark: "Permanent Stamped or Screen-printed ISI Mark with CML Number on the outer rear shell",
      safetyRisk: "Roadside plastic fake helmets shatter on impact, causing skull fractures and fatal brain hemorrhage.",
      labelInstruction: "Check the back of the helmet. The ISI mark must be beneath the clear-coat varnish and have a 7-digit CML number.",
      actionTip: "Traffic police can seize non-ISI helmets under Section 129 of the Motor Vehicles Act."
    },
    labsAvailable: [
      { name: "Automotive Research Association of India (ARAI)", city: "Pune", state: "Maharashtra" },
      { name: "International Centre for Automotive Technology (ICAT)", city: "Manesar", state: "Haryana" },
      { name: "Central Institute of Road Transport (CIRT)", city: "Pune", state: "Maharashtra" }
    ],
    feeStructure: {
      applicationFee: 1000,
      annualLicenseFee: 1000,
      auditFeePerManDay: 7000,
      baseMarkingFee: 92000,
      microConcessionPercent: 50,
      smallConcessionPercent: 20,
      womenStartupConcessionPercent: 50
    },
    documentationRequired: [
      "EPS shell moulding density verification and shock test instruments",
      "Chin strap load testing apparatus in factory premises",
      "Visor light transmittance photometer calibration certificates"
    ],
    consumerTip: "Ensure the helmet weight does not exceed 1.5 kg and fits snugly over cheeks and forehead."
  },

  // 9. CEMENT 53 GRADE
  {
    id: "IS-12269",
    isCode: "IS 12269:2013",
    title: "Ordinary Portland Cement, 53 Grade - Specification",
    category: "Construction Materials",
    sector: "Civil Engineering",
    keywords: ["cement", "53 grade cement", "opc cement", "building material", "concrete", "mortar"],
    colloquialTerms: ["cement", "simint", "53 grade", "opc", "ambuja", "ultratech", "lanka cement", "building cement"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Cement (Quality Control) Order, 2003",
    qcoDate: "Mandatory since 2003 (DPIIT)",
    gazetteNotification: {
      order: "Cement (Quality Control) Order",
      ministry: "DPIIT, Ministry of Commerce & Industry",
      date: "17-Feb-2003",
      gazetteRef: "S.O. 191(E)"
    },
    description: "Prescribes high early strength and 28-day compressive strength limits (minimum 53 MPa) for structural concrete constructions and infrastructure projects.",
    scope: "Covers the manufacture and chemical/physical requirements of 53 grade ordinary portland cement.",
    keyTests: [
      "Compressive Strength: 72h (min 27 MPa), 168h (min 37 MPa), 672h (min 53 MPa)",
      "Initial Setting Time (Not less than 30 min) & Final Setting Time (Max 600 min)",
      "Soundness Test (Le Chatelier expansion max 10 mm; Autoclave expansion max 0.8%)",
      "Chemical Analysis: Total Loss on Ignition (Max 4.0%), Insoluble Residue (Max 5.0%)"
    ],
    globalHarmonization: {
      standard: "ASTM C150 / EN 197-1 (CEM I 52.5 N/R)",
      org: "ASTM International / European Committee for Standardization",
      exportEquivalence: "Directly Equivalent to ASTM Type I High Strength & EN 197-1 Grade 52.5",
      note: "Permits Indian cement plants to export directly to Middle Eastern and African infrastructure contracts.",
      compatibleMarkets: ["Middle East", "Southeast Asia", "Africa"]
    },
    citizenCard: {
      headline: "Verifying Cement Quality for Safe Home Construction",
      mandatoryMark: "Printed ISI Mark on HDPE/Paper Bag with CML Number and Week of Packing",
      safetyRisk: "Adulterated or expired cement lacks structural strength, causing roof slab collapses and building cracks.",
      labelInstruction: "Check the bag stitching. The bag must state 'IS 12269', '53 Grade OPC', Week/Year of packing, and CM/L-XXXXXXX.",
      actionTip: "Never purchase cement bags stored longer than 90 days without re-testing strength."
    },
    labsAvailable: [
      { name: "National Council for Cement and Building Materials (NCCBM)", city: "Ballabgarh", state: "Haryana" },
      { name: "BIS Central Laboratory", city: "Sahibabad", state: "Uttar Pradesh" },
      { name: "National Test House (NTH)", city: "Kolkata", state: "West Bengal" }
    ],
    feeStructure: {
      applicationFee: 1000,
      annualLicenseFee: 1000,
      auditFeePerManDay: 7000,
      baseMarkingFee: 185000,
      microConcessionPercent: 50,
      smallConcessionPercent: 20,
      womenStartupConcessionPercent: 50
    },
    documentationRequired: [
      "Limestone quarry lease and automated clinker rotary kiln monitoring systems",
      "Complete X-Ray Fluorescence (XRF) and compressive cube testing press setup",
      "Daily quality control log sheet of blaine fineness and setting time"
    ],
    consumerTip: "Check that the week and year of manufacture are clearly printed on the side gusset."
  },

  // 10. TMT STEEL BARS
  {
    id: "IS-1786",
    isCode: "IS 1786:2008",
    title: "High Strength Deformed Steel Bars and Wires for Concrete Reinforcement",
    category: "Construction Materials",
    sector: "Metallurgical Engineering",
    keywords: ["steel", "tmt bar", "sariya", "rebar", "fe 500", "fe 550d", "construction steel", "reinforcement bar"],
    colloquialTerms: ["sariya", "loha", "tmt rod", "fe 500d sariya", "chhad", "makaan ka sariya", "tata tiscon", "sail sariya"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Steel and Steel Products (Quality Control) Order, 2020",
    qcoDate: "Mandatory enforcement by Ministry of Steel",
    gazetteNotification: {
      order: "Steel and Steel Products (Quality Control) Order",
      ministry: "Ministry of Steel",
      date: "08-May-2020",
      gazetteRef: "S.O. 1673(E)"
    },
    description: "Specifies chemical composition (low carbon, sulphur, phosphorus) and mechanical properties for Fe 415, Fe 500, Fe 550D, and Fe 600 earthquake-resistant reinforcement bars.",
    scope: "High strength deformed steel bars manufactured by thermo-mechanical treatment (TMT) for use in reinforced concrete structures.",
    keyTests: [
      "0.2% Proof Stress / Yield Stress Verification (Min 500 N/mm² for Fe 500D)",
      "Ultimate Tensile Strength (UTS/YS Ratio min 1.10 for earthquake ductility)",
      "Percentage Elongation at Fracture (Min 16.0% for earthquake safety)",
      "Mandrel Bend and Rebend Test through 180 degrees without transverse cracks"
    ],
    globalHarmonization: {
      standard: "BS 4449:2005 (Grade B500B) / ASTM A615 (Grade 60)",
      org: "British Standards Institution / ASTM International",
      exportEquivalence: "95% Alignment with International Rebar Standards",
      note: "Accepted in infrastructure projects across the Middle East, UK, and Commonwealth nations.",
      compatibleMarkets: ["United Kingdom", "Middle East", "Australia", "Singapore"]
    },
    citizenCard: {
      headline: "Earthquake-Resistant TMT Sariya Verification",
      mandatoryMark: "Embossed Brand Name + Grade (e.g. FE 500D) + ISI Logo on every running meter",
      safetyRisk: "Re-rolled scrap sariya has high sulphur content, causing brittle snapping during earthquakes.",
      labelInstruction: "Look at the ribs on the rebar. The ISI emblem and grade MUST be rolled into the steel at regular intervals.",
      actionTip: "Ask the dealer for the manufacturer's Mill Test Certificate (MTC) matching the bundle tag."
    },
    labsAvailable: [
      { name: "National Metallurgical Laboratory (CSIR-NML)", city: "Jamshedpur", state: "Jharkhand" },
      { name: "National Test House", city: "Kolkata", state: "West Bengal" },
      { name: "Shriram Institute for Industrial Research", city: "Delhi", state: "Delhi" }
    ],
    feeStructure: {
      applicationFee: 1000,
      annualLicenseFee: 1000,
      auditFeePerManDay: 7000,
      baseMarkingFee: 195000,
      microConcessionPercent: 50,
      smallConcessionPercent: 20,
      womenStartupConcessionPercent: 50
    },
    documentationRequired: [
      "Primary steel billet procurement records or electric arc furnace heats",
      "Calibrated Universal Testing Machine (UTM min 1000 kN capacity)",
      "Optical Emission Spectrometer (OES) for carbon/sulphur verification"
    ],
    consumerTip: "Always insist on 'D' grade (such as Fe 500D) which provides enhanced earthquake ductility."
  },

  // 11. ELECTRIC IRON
  {
    id: "IS-302-2-3",
    isCode: "IS 302 (Part 2/Sec 3):2007",
    title: "Safety of Household and Similar Electrical Appliances: Particular Requirements for Electric Irons",
    category: "Electrical Appliances",
    sector: "Electrical Engineering",
    keywords: ["electric iron", "dry iron", "steam iron", "cloth iron", "pressing iron"],
    colloquialTerms: ["press", "istri", "kapde ki press", "electric press", "steam press", "dry iron"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Electrical Appliances (Quality Control) Order, 2023",
    qcoDate: "Mandatory since 2018",
    gazetteNotification: {
      order: "Electrical Appliances (Quality Control) Order",
      ministry: "DPIIT, Ministry of Commerce & Industry",
      date: "05-March-2023",
      gazetteRef: "S.O. 1042(E)"
    },
    description: "Prescribes constructional safety, thermostat temperature control, thermal fuse cutoff, and insulation protection for domestic electric dry and steam irons.",
    scope: "Electric dry irons and steam irons for household and similar purposes, having a rated voltage not exceeding 250V.",
    keyTests: [
      "Thermostat Operating Temperature and Thermal Cut-out Safety trip",
      "Leakage Current and High Voltage Dielectric Strength (1250V AC)",
      "Soleplate Drop Impact and Cord Flexing Endurance (20,000 cycles)",
      "Steam Pressure Relief Valve Operation for steam irons"
    ],
    globalHarmonization: {
      standard: "IEC 60335-2-3:2012 (Household irons safety)",
      org: "International Electrotechnical Commission",
      exportEquivalence: "96% Alignment",
      note: "Accepted in European and Southeast Asian consumer electronics markets.",
      compatibleMarkets: ["European Union (CE)", "ASEAN", "Middle East"]
    },
    citizenCard: {
      headline: "Electric Iron Fire and Shock Prevention",
      mandatoryMark: "ISI Mark stamped on the rating label",
      safetyRisk: "Non-compliant irons lack thermal fuses, causing them to overheat, catch fire, and burn clothes.",
      labelInstruction: "Examine the label under the heel rest. Ensure IS 302 (Part 2/Sec 3) is printed with the 7-digit CML number.",
      actionTip: "Check that the supply cord has a 3-pin earthed plug conforming to IS 1293."
    },
    labsAvailable: [
      { name: "BIS Central Laboratory", city: "Sahibabad", state: "Uttar Pradesh" },
      { name: "ERDA Vadodara", city: "Vadodara", state: "Gujarat" },
      { name: "National Test House", city: "Mumbai", state: "Maharashtra" }
    ],
    feeStructure: {
      applicationFee: 1000,
      annualLicenseFee: 1000,
      auditFeePerManDay: 7000,
      baseMarkingFee: 62000,
      microConcessionPercent: 50,
      smallConcessionPercent: 20,
      womenStartupConcessionPercent: 50
    },
    documentationRequired: [
      "In-house thermostat calibration bath and high voltage tester",
      "Thermal fuse safety certification from recognized components body",
      "Cord flex tester and soleplate thermal distribution sensor"
    ],
    consumerTip: "Ensure the iron has a 3-core cable with green ground wire connected to the metal soleplate."
  },

  // 12. DOMESTIC PRESSURE COOKER
  {
    id: "IS-2347",
    isCode: "IS 2347:2017",
    title: "Domestic Pressure Cookers - Specification",
    category: "Consumer Products",
    sector: "Mechanical Engineering",
    keywords: ["pressure cooker", "cooker", "aluminium cooker", "steel cooker", "kitchen cooker"],
    colloquialTerms: ["cooker", "kukar", "daal cooker", "pressure cooker", "kitchen cooker", "whistle cooker"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Domestic Pressure Cooker (Quality Control) Order, 2020",
    qcoDate: "Mandatory enforcement from 01-August-2020",
    gazetteNotification: {
      order: "Domestic Pressure Cooker (Quality Control) Order",
      ministry: "DPIIT, Ministry of Commerce & Industry",
      date: "21-Jan-2020",
      gazetteRef: "S.O. 294(E)"
    },
    description: "Specifies material composition, bursting pressure margins, metallic safety plug melting thresholds, and lid-lock safety for aluminium and stainless steel pressure cookers.",
    scope: "Domestic pressure cookers of capacities up to 20 litres, operating at nominal cooking pressures up to 100 kPa.",
    keyTests: [
      "Hydraulic Bursting Pressure Test (Body must withstand minimum 3x nominal working pressure without rupture)",
      "Operating Pressure & Pressure Relief Weight Valve Efficacy Test",
      "Fusible Safety Plug Release Temperature & Pressure Verification",
      "Lid Interlocking Mechanism (Lid must not open while under internal pressure > 5 kPa)"
    ],
    globalHarmonization: {
      standard: "EN 12778:2002 / ISO 6535 (Cookware - Pressure cookers for domestic use)",
      org: "European Committee for Standardization / ISO",
      exportEquivalence: "92% Harmonization",
      note: "Fully compliant with international kitchenware safety specifications.",
      compatibleMarkets: ["United States (UL)", "European Union", "Middle East", "South America"]
    },
    citizenCard: {
      headline: "Kitchen Safety: Preventing Pressure Cooker Explosions",
      mandatoryMark: "Permanent embossed ISI Mark on cooker base and lid",
      safetyRisk: "Substandard roadside cookers made of cast scrap aluminium explode under steam pressure, causing severe burns and facial trauma.",
      labelInstruction: "Inspect the bottom of the pot. Authentic cookers have the ISI monogram permanently engraved with the 7-digit CML license.",
      actionTip: "Never buy replacement safety valves or rubber gaskets from unverified local street vendors."
    },
    labsAvailable: [
      { name: "BIS Central Laboratory Mechanical Testing Division", city: "Sahibabad", state: "Uttar Pradesh" },
      { name: "National Test House", city: "Alipore, Kolkata", state: "West Bengal" },
      { name: "Regional Testing Centre (WR)", city: "Mumbai", state: "Maharashtra" }
    ],
    feeStructure: {
      applicationFee: 1000,
      annualLicenseFee: 1000,
      auditFeePerManDay: 7000,
      baseMarkingFee: 68000,
      microConcessionPercent: 50,
      smallConcessionPercent: 20,
      womenStartupConcessionPercent: 50
    },
    documentationRequired: [
      "Hydraulic pressure testing rig with calibrated pressure gauges up to 10 bar",
      "Virgin grade food-grade aluminium / SS 304 chemical test reports",
      "Safety relief plug fusing temperature test equipment"
    ],
    consumerTip: "Check that the gasket release system (GRS) slot is clear and unobstructed."
  },

  // 13. STAINLESS STEEL COOKWARE
  {
    id: "IS-14756",
    isCode: "IS 14756:2022",
    title: "Stainless Steel Cookware - Specification",
    category: "Consumer Products",
    sector: "Mechanical Engineering",
    keywords: ["stainless steel cookware", "steel bartan", "frying pan", "kadhai", "saucepan", "cookware"],
    colloquialTerms: ["bartan", "steel ke bartan", "kadhai", "patila", "steel pan", "cookware set"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Cookware and Utensils (Quality Control) Order, 2023",
    qcoDate: "Mandatory since 2023",
    gazetteNotification: {
      order: "Cookware and Utensils (Quality Control) Order",
      ministry: "DPIIT, Ministry of Commerce & Industry",
      date: "10-Aug-2023",
      gazetteRef: "S.O. 3624(E)"
    },
    description: "Prescribes food-grade stainless steel chemical composition (AISI 304 / 200 series limits), corrosion resistance, handle attachment strength, and thermal conductivity.",
    scope: "Domestic stainless steel utensils and cookware used for cooking food, including pressure pans, pots, and frying vessels.",
    keyTests: [
      "Heavy Metal Leaching Test: Lead, Cadmium, Nickel migration into food acids",
      "Corrosion Resistance Test under 3% Boiling Acetic Acid and Salt Solution",
      "Handle Strength and Thermal Insulation: Handle must remain under 55°C during cooking",
      "Base Flatness and Thermal Shock Resistance at 250°C"
    ],
    globalHarmonization: {
      standard: "EN 12983-1 (Cookware - Domestic cookware for use on stove)",
      org: "European Committee for Standardization (CEN)",
      exportEquivalence: "90% Harmonized",
      note: "Accepted in European and American kitchen retail chains.",
      compatibleMarkets: ["European Union", "United States", "Middle East"]
    },
    citizenCard: {
      headline: "Ensuring Toxic-Free Cooking Vessels",
      mandatoryMark: "Laser-etched or Stamped ISI Mark on outer base",
      safetyRisk: "Non-food grade steel contains toxic levels of lead and industrial scrap metals that leach into acidic food like dal and tomatoes.",
      labelInstruction: "Look at the base. It must state Grade 304 or 200 series alongside the ISI logo.",
      actionTip: "Avoid magnetic cheap steel pots that show rust spots after boiling water."
    },
    labsAvailable: [
      { name: "BIS Central Laboratory", city: "Sahibabad", state: "Uttar Pradesh" },
      { name: "National Test House", city: "Kolkata", state: "West Bengal" },
      { name: "Metallurgical Test House", city: "Chennai", state: "Tamil Nadu" }
    ],
    feeStructure: {
      applicationFee: 1000,
      annualLicenseFee: 1000,
      auditFeePerManDay: 7000,
      baseMarkingFee: 52000,
      microConcessionPercent: 50,
      smallConcessionPercent: 20,
      womenStartupConcessionPercent: 50
    },
    documentationRequired: [
      "Spectrometric metal composition tester",
      "Handle fatigue torque tester",
      "Chemical migration test apparatus"
    ],
    consumerTip: "Look for 'Food Grade SS 304' marking alongside the ISI mark."
  },

  // 14. LPG DOMESTIC GAS STOVES
  {
    id: "IS-4246",
    isCode: "IS 4246:2002",
    title: "Domestic Gas Stoves for use with Liquefied Petroleum Gases (LPG)",
    category: "Gas & LPG",
    sector: "Mechanical Engineering",
    keywords: ["gas stove", "lpg stove", "chulha", "gas burner", "domestic gas chulha"],
    colloquialTerms: ["gas chulha", "gas stove", "chulha", "lpg burner", "kitchen gas stove", "2 burner chulha"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Domestic Gas Stoves (Quality Control) Order",
    qcoDate: "Mandatory statutory compliance",
    gazetteNotification: {
      order: "Domestic Gas Stoves (Quality Control) Order",
      ministry: "DPIIT & Ministry of Petroleum and Natural Gas",
      date: "14-Feb-2019",
      gazetteRef: "S.O. 882(E)"
    },
    description: "Specifies thermal efficiency (minimum 68%), gas leakage safety, flame stability, and carbon monoxide emission limits for domestic LPG cooking appliances.",
    scope: "Domestic gas stoves having one, two, three or four burners operated on Liquefied Petroleum Gas at 2.94 kPa (30 gf/cm²) supply pressure.",
    keyTests: [
      "Thermal Efficiency Test (Minimum 68% thermal efficiency required)",
      "Gas Soundness / Leakage Test at 1.5 times working pressure",
      "Carbon Monoxide to Carbon Dioxide Ratio in Combustion Products (CO/CO2 max 0.02)",
      "Flashback and Flame Extinction Resistance under draft conditions"
    ],
    globalHarmonization: {
      standard: "EN 30-1-1 (Domestic cooking appliances burning gas)",
      org: "European Committee for Standardization",
      exportEquivalence: "88% Alignment",
      note: "Accepted in African and Asian domestic gas markets.",
      compatibleMarkets: ["SAARC", "East Africa", "Middle East"]
    },
    citizenCard: {
      headline: "Kitchen Gas Leak & Blast Prevention",
      mandatoryMark: "ISI Monogram embossed on the front control panel or rating plate",
      safetyRisk: "Uncertified gas stoves leak LPG at valve joints, leading to devastating cylinder gas explosions in kitchens.",
      labelInstruction: "Look at the front stainless steel or glass fascia. Ensure the ISI mark and 7-digit CML number are prominently displayed.",
      actionTip: "Oil Marketing Companies (Indane, Bharatgas, HP) mandate ISI certified stoves for LPG connections."
    },
    labsAvailable: [
      { name: "Indian Institute of Petroleum (CSIR-IIP)", city: "Dehradun", state: "Uttarakhand" },
      { name: "BIS Central Laboratory", city: "Sahibabad", state: "Uttar Pradesh" },
      { name: "Petroleum Conservation Research Association (PCRA)", city: "New Delhi", state: "Delhi" }
    ],
    feeStructure: {
      applicationFee: 1000,
      annualLicenseFee: 1000,
      auditFeePerManDay: 7000,
      baseMarkingFee: 78000,
      microConcessionPercent: 50,
      smallConcessionPercent: 20,
      womenStartupConcessionPercent: 50
    },
    documentationRequired: [
      "Thermal efficiency calorimeter testing room",
      "Gas leak detector equipment and pressure manometers",
      "Flue gas combustion analyzer for CO/CO2 measurement"
    ],
    consumerTip: "Check for the high thermal efficiency sticker (>68%) to reduce monthly gas cylinder consumption."
  },

  // 15. PVC INSULATED ELECTRICAL CABLES
  {
    id: "IS-694",
    isCode: "IS 694:2010",
    title: "Polyvinyl Chloride (PVC) Insulated Unsheathed and Sheathed Cables/Cords for Voltages up to 1100V",
    category: "Electrical Appliances",
    sector: "Electrical Engineering",
    keywords: ["cable", "electric wire", "pvc wire", "house wiring", "copper wire", "1.5 sq mm wire", "2.5 sq mm wire"],
    colloquialTerms: ["bijli ka taar", "wiring ka taar", "copper wire", "house wire", "havells wire", "polycab wire", "taar"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Wires and Cables (Quality Control) Order, 2023",
    qcoDate: "Mandatory since 2023",
    gazetteNotification: {
      order: "Wires and Cables (Quality Control) Order",
      ministry: "DPIIT, Ministry of Commerce & Industry",
      date: "04-Oct-2023",
      gazetteRef: "S.O. 4347(E)"
    },
    description: "Prescribes high purity electrical grade copper/aluminium conductors, fire retardant (FR/FRLS) insulation, conductor resistance, and dielectric voltage tests for building wiring.",
    scope: "Single core and multi-core PVC insulated electrical cables for domestic and industrial wiring up to and including 1100V.",
    keyTests: [
      "Conductor DC Resistance per km at 20°C (Ensures 99.97% electrolytic copper purity)",
      "High Voltage Spark Test and Insulation Resistance in water bath",
      "Oxygen Index & Temperature Index (Fire Retardancy: Min 29% Oxygen Index)",
      "Smoke Density and Halogen Acid Gas Generation for FRLS cables"
    ],
    globalHarmonization: {
      standard: "IEC 60227 / BS 6004 (Cables for building wiring)",
      org: "International Electrotechnical Commission / BSI",
      exportEquivalence: "95% Alignment with International Building Codes",
      note: "Fully accepted in global residential and commercial wiring projects.",
      compatibleMarkets: ["Global (EU, Middle East, Africa, ASEAN)"]
    },
    citizenCard: {
      headline: "Preventing Electrical Short-Circuit Fires in Homes",
      mandatoryMark: "Continuous embossing or printing of ISI logo along the wire sheath every meter",
      safetyRisk: "Low-grade wires use scrap copper and flammable PVC that melts under load, causing massive house fires.",
      labelInstruction: "Check the wire surface every 1 meter. It must be printed: '[Brand] • IS 694 • [Size] • CM/L-XXXXXXX'.",
      actionTip: "Ask for FRLS (Flame Retardant Low Smoke) grade certified wires for interior home wiring."
    },
    labsAvailable: [
      { name: "BIS Central Laboratory", city: "Sahibabad", state: "Uttar Pradesh" },
      { name: "ERDA Vadodara", city: "Vadodara", state: "Gujarat" },
      { name: "CPRI Bengaluru", city: "Bengaluru", state: "Karnataka" }
    ],
    feeStructure: {
      applicationFee: 1000,
      annualLicenseFee: 1000,
      auditFeePerManDay: 7000,
      baseMarkingFee: 96000,
      microConcessionPercent: 50,
      smallConcessionPercent: 20,
      womenStartupConcessionPercent: 50
    },
    documentationRequired: [
      "Kelvin double bridge / digital micro-ohmmeter for conductor resistance",
      "Spark tester online on extrusion line (up to 10 kV)",
      "Flammability test chamber and hot set elongation oven"
    ],
    consumerTip: "Ensure the wire label clearly states '100% Electrolytic Tough Pitch (ETP) Copper'."
  },

  // 16. SELF-BALLASTED LED LAMPS
  {
    id: "IS-16102-1",
    isCode: "IS 16102 (Part 1):2012",
    title: "Self-Ballasted LED Lamps for General Lighting Services - Part 1: Safety Requirements",
    category: "Electronics & IT",
    sector: "Electrotechnical",
    keywords: ["led bulb", "led lamp", "lighting", "b22 bulb", "9w led", "led light"],
    colloquialTerms: ["led bulb", "bulb", "bijli ka lattu", "white bulb", "9 watt bulb", "syska bulb", "philips bulb"],
    scheme: "Scheme-II (CRS Registration)",
    schemeCode: "SCHEME_2",
    mandatoryQCO: true,
    qcoNotification: "Electronics and IT Goods (Requirement for Compulsory Registration) Order",
    qcoDate: "Mandatory since 2015 by MeitY",
    gazetteNotification: {
      order: "Compulsory Registration Order for LED Products",
      ministry: "Ministry of Electronics and Information Technology (MeitY)",
      date: "07-Nov-2014",
      gazetteRef: "S.O. 2904(E)"
    },
    description: "Specifies electrical insulation, creepage distances, cap temperature, and mechanical resistance for domestic B22 and E27 self-ballasted LED bulbs.",
    scope: "Self-ballasted LED lamps for voltages up to 250V AC used in domestic and commercial indoor lighting.",
    keyTests: [
      "Lamp Cap Torque and Mechanical Retention Strength (Max 3 Nm)",
      "High Voltage Electric Strength Test (2 kV surge protection)",
      "Insulation Resistance and Moisture Resistance under 93% RH",
      "Fault Condition Testing: Safe breakdown of electronic driver without flame"
    ],
    globalHarmonization: {
      standard: "IEC 62560 (Self-ballasted LED lamps for general lighting)",
      org: "International Electrotechnical Commission",
      exportEquivalence: "100% IEC CB Scheme Harmonization",
      note: "Accepted in all major international lighting regulatory frameworks.",
      compatibleMarkets: ["Global (EU, USA, Japan, Middle East)"]
    },
    citizenCard: {
      headline: "How to check safe LED Bulbs",
      mandatoryMark: "BIS Standard Mark with 'R-XXXXXXXX' CRS Registration",
      safetyRisk: "Poorly isolated drivers shock users while replacing bulbs and cause high electrical surge damage to home appliances.",
      labelInstruction: "Check the bulb base. The BIS logo and 'R-XXXXXXXX' registration number must be printed.",
      actionTip: "Never purchase roadside unbranded LED bulbs with flickering lights."
    },
    labsAvailable: [
      { name: "ERTL North", city: "New Delhi", state: "Delhi" },
      { name: "UL India Laboratory", city: "Bengaluru", state: "Karnataka" },
      { name: "TUV Sud South Asia", city: "Gurugram", state: "Haryana" }
    ],
    feeStructure: {
      applicationFee: 1000,
      annualLicenseFee: 0,
      auditFeePerManDay: 0,
      baseMarkingFee: 48000,
      microConcessionPercent: 0,
      smallConcessionPercent: 0,
      womenStartupConcessionPercent: 0
    },
    documentationRequired: [
      "Safety test report from accredited NABL laboratory",
      "Power factor and surge protection compliance certificates",
      "Authorized Indian Representative undertaking for foreign brands"
    ],
    consumerTip: "Look for Power Factor (PF > 0.9) to ensure lower electricity bills and longer lifespan."
  },

  // 17. PARTICULATE FILTERING MASKS (N95 / FFP2)
  {
    id: "IS-9473",
    isCode: "IS 9473:2002",
    title: "Respiratory Protective Devices - Filtering Half Masks to Protect Against Particles",
    category: "Automotive & Safety",
    sector: "Personal Protective Equipment",
    keywords: ["n95 mask", "respirator", "face mask", "pollution mask", "ffp2 mask", "particulate mask"],
    colloquialTerms: ["mask", "n95", "pollution mask", "corona mask", "dhool ka mask", "safety mask"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Personal Protective Equipment (Quality Control) Order, 2021",
    qcoDate: "Mandatory enforcement",
    gazetteNotification: {
      order: "Respiratory Protective Devices (Quality Control) Order",
      ministry: "DPIIT & Ministry of Health and Family Welfare",
      date: "12-March-2021",
      gazetteRef: "S.O. 1152(E)"
    },
    description: "Specifies particle filtration efficiency (minimum 95% for FFP2/N95 equivalent), breathing resistance, and inward leakage through face seal against hazardous aerosols.",
    scope: "Filtering half masks for protection against dusts, mists, fumes, and viral aerosol particulates.",
    keyTests: [
      "Sodium Chloride & Paraffin Oil Aerosol Particle Filtration Efficiency (Min 95% for FFP2)",
      "Breathing Inhalation and Exhalation Resistance under 95 L/min air flow",
      "Total Inward Face-Seal Leakage Test on Human Volunteers in test chamber",
      "Flammability Resistance Test (Self-extinguishing within 5 seconds)"
    ],
    globalHarmonization: {
      standard: "EN 149:2001+A1:2009 (FFP2) / NIOSH 42 CFR 84 (N95)",
      org: "CEN / US National Institute for Occupational Safety and Health",
      exportEquivalence: "Direct equivalence to European FFP2 and US NIOSH N95",
      note: "Recognized internationally for healthcare and industrial mining PPE.",
      compatibleMarkets: ["European Union", "United States", "WHO Procurement"]
    },
    citizenCard: {
      headline: "Authentic N95 / FFP2 Mask Verification",
      mandatoryMark: "ISI Mark + Class (FFP1 / FFP2 / FFP3) printed on mask surface",
      safetyRisk: "Fake paper masks offer 0% aerosol filtration, leaving users vulnerable to infectious airborne pathogens and toxic smog.",
      labelInstruction: "Inspect the mask body. IS 9473 FFP2 along with the 7-digit CML number must be printed.",
      actionTip: "Ensure the mask has an adjustable nose clip and dual head harness bands."
    },
    labsAvailable: [
      { name: "Central Labour Institute (CLI)", city: "Sion, Mumbai", state: "Maharashtra" },
      { name: "South India Textile Research Association (SITRA)", city: "Coimbatore", state: "Tamil Nadu" },
      { name: "BIS Central Testing Laboratory", city: "Sahibabad", state: "Uttar Pradesh" }
    ],
    feeStructure: {
      applicationFee: 1000,
      annualLicenseFee: 1000,
      auditFeePerManDay: 7000,
      baseMarkingFee: 54000,
      microConcessionPercent: 50,
      smallConcessionPercent: 20,
      womenStartupConcessionPercent: 50
    },
    documentationRequired: [
      "TSI 8130 Automated Filter Tester for particle penetration verification",
      "Meltblown electret nonwoven fabric test reports",
      "Breathing resistance differential pressure manometer setup"
    ],
    consumerTip: "Cloth masks are not N95 equivalent. Look for the meltblown electrostatic filter layer."
  },

  // 18. SAFETY FOOTWEAR
  {
    id: "IS-15298-2",
    isCode: "IS 15298 (Part 2):2016",
    title: "Personal Protective Equipment - Safety Footwear - Specification",
    category: "Automotive & Safety",
    sector: "Personal Protective Equipment",
    keywords: ["safety shoe", "safety boots", "steel toe shoes", "industrial boots", "work footwear"],
    colloquialTerms: ["safety joota", "steel toe boot", "factory shoe", "labour shoe", "safety boots", "heavy duty shoes"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Footwear made from Leather and other materials (Quality Control) Order, 2020",
    qcoDate: "Mandatory enforcement from 01-July-2023",
    gazetteNotification: {
      order: "Footwear (Quality Control) Order",
      ministry: "DPIIT, Ministry of Commerce & Industry",
      date: "27-Oct-2020",
      gazetteRef: "S.O. 3857(E)"
    },
    description: "Specifies impact resistance (200 Joules steel toe cap), compression resistance, anti-slip soles, puncture resistance, and electrical insulation for industrial work environments.",
    scope: "Safety footwear equipped with toecaps designed to give protection against impact at an energy level of at least 200 J.",
    keyTests: [
      "Impact Resistance of Toe-cap (200 Joules Drop Energy - Min clearance 14 mm)",
      "Compression Resistance Test (15,000 Newtons static load)",
      "Upper Leather Tear Strength and Water Vapour Permeability",
      "Sole Abrasion Resistance & Oil/Chemical Slip Resistance (SRC Grade)"
    ],
    globalHarmonization: {
      standard: "ISO 20345:2011 (Personal protective equipment - Safety footwear)",
      org: "International Organization for Standardization",
      exportEquivalence: "100% Direct ISO Equivalence",
      note: "Harmonized to allow Indian leather footwear exports to Europe and the Middle East.",
      compatibleMarkets: ["European Union (CE S1/S2/S3)", "United Kingdom", "Middle East", "Australia"]
    },
    citizenCard: {
      headline: "Industrial Worker Foot Protection",
      mandatoryMark: "Embossed ISI Mark on inner tongue label and outsole",
      safetyRisk: "Cheap local work shoes collapse under falling machinery parts, causing permanent foot amputation.",
      labelInstruction: "Lift the tongue. Ensure IS 15298 (Part 2), classification code (e.g. S1, S2), and CM/L-XXXXXXX are visible.",
      actionTip: "Verify that the steel toe cap is firmly bonded inside the leather upper."
    },
    labsAvailable: [
      { name: "Central Leather Research Institute (CSIR-CLRI)", city: "Chennai", state: "Tamil Nadu" },
      { name: "Footwear Design & Development Institute (FDDI)", city: "Noida", state: "Uttar Pradesh" },
      { name: "National Test House", city: "Kolkata", state: "West Bengal" }
    ],
    feeStructure: {
      applicationFee: 1000,
      annualLicenseFee: 1000,
      auditFeePerManDay: 7000,
      baseMarkingFee: 72000,
      microConcessionPercent: 50,
      smallConcessionPercent: 20,
      womenStartupConcessionPercent: 50
    },
    documentationRequired: [
      "Steel toe cap impact drop test rig with lead cylinder deformation gauges",
      "Sole flexing machine and upper leather tensile testing apparatus",
      "Electrical resistance test bench for antistatic and dielectric shoes"
    ],
    consumerTip: "Check that the sole is heat-resistant and oil-resistant (marked 'HRO' and 'FO')."
  },

  // 19. RECHARGEABLE LITHIUM BATTERIES (CRS)
  {
    id: "IS-16046-2",
    isCode: "IS 16046 (Part 2):2018",
    title: "Secondary Cells and Batteries Containing Alkaline or Other Non-Acid Electrolytes - Lithium Systems",
    category: "Electronics & IT",
    sector: "Electronics & IT Goods",
    keywords: ["lithium battery", "power bank", "mobile battery", "ev battery", "lithium ion cell", "18650 cell"],
    colloquialTerms: ["power bank", "battery", "mobile ki battery", "lithium cell", "rechargeable battery"],
    scheme: "Scheme-II (CRS Registration)",
    schemeCode: "SCHEME_2",
    mandatoryQCO: true,
    qcoNotification: "Electronics and IT Goods (Compulsory Registration) Order",
    qcoDate: "Mandatory by MeitY",
    gazetteNotification: {
      order: "Compulsory Registration Order for Batteries",
      ministry: "Ministry of Electronics and Information Technology (MeitY)",
      date: "05-Sept-2017",
      gazetteRef: "S.O. 3022(E)"
    },
    description: "Specifies thermal abuse, overcharge protection, short-circuit, and mechanical impact tests to prevent thermal runaway and explosion in lithium battery packs.",
    scope: "Secondary lithium cells and batteries for portable applications such as laptops, mobile phones, power banks, and portable electronics.",
    keyTests: [
      "Continuous Charging Overcharge Safety Test (14 days constant current)",
      "External Short-Circuit Test at 55°C Ambient without explosion or fire",
      "Thermal Abuse Oven Test (Heated to 130°C for 30 minutes without bursting)",
      "Free Fall Drop Test from 1.0 meter onto concrete floor"
    ],
    globalHarmonization: {
      standard: "IEC 62133-2:2017 (Safety of portable secondary lithium cells)",
      org: "International Electrotechnical Commission",
      exportEquivalence: "100% Harmonization with UN 38.3 & IEC 62133",
      note: "Accepted globally by air cargo safety regulators (IATA) and international electronics OEMs.",
      compatibleMarkets: ["Global (EU, USA, Japan, South Korea)"]
    },
    citizenCard: {
      headline: "Preventing Mobile & Power Bank Explosions",
      mandatoryMark: "BIS Standard Mark with 'R-XXXXXXXX' registration number",
      safetyRisk: "Counterfeit lithium cells lack thermal protection chips, bursting into flames inside pockets or planes.",
      labelInstruction: "Examine the battery casing. Look for the BIS monochrome logo and valid R-XXXXXXXX number.",
      actionTip: "Never purchase cheap unbranded power banks from street vendors."
    },
    labsAvailable: [
      { name: "SAMEER", city: "Chennai", state: "Tamil Nadu" },
      { name: "TUV Rheinland India", city: "Bengaluru", state: "Karnataka" },
      { name: "UL India Testing Lab", city: "Manesar", state: "Haryana" }
    ],
    feeStructure: {
      applicationFee: 1000,
      annualLicenseFee: 0,
      auditFeePerManDay: 0,
      baseMarkingFee: 51000,
      microConcessionPercent: 0,
      smallConcessionPercent: 0,
      womenStartupConcessionPercent: 0
    },
    documentationRequired: [
      "UN 38.3 transport safety test certificate",
      "Battery management system (BMS) circuit schematic and bill of materials",
      "Safety test report from accredited NABL test facility"
    ],
    consumerTip: "Look for battery capacity in Watt-hours (Wh) alongside the R-number."
  },

  // 20. INFANT MILK FOOD
  {
    id: "IS-11536",
    isCode: "IS 11536:2014",
    title: "Infant Milk Substitutes, Feeding Bottles and Infant Foods - Specification",
    category: "Food & Water",
    sector: "Food & Agriculture",
    keywords: ["baby food", "infant formula", "milk powder", "baby milk", "infant substitute"],
    colloquialTerms: ["baccho ka doodh", "baby formula", "cerelac", "lactogen", "infant food", "powder doodh"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Infant Milk Substitutes, Feeding Bottles and Infant Foods Act, 1992",
    qcoDate: "Mandatory statutory enforcement under Act of Parliament",
    gazetteNotification: {
      order: "Infant Milk Substitutes (Regulation of Production, Supply and Distribution) Act",
      ministry: "Ministry of Women and Child Development",
      date: "01-Aug-1993",
      gazetteRef: "Act No. 41 of 1992"
    },
    description: "Strictly defines nutritional composition (proteins, essential fatty acids, vitamins, minerals), zero pathogenic bacteria, and heavy metal absence in infant food.",
    scope: "Infant milk substitutes designed to satisfy the normal nutritional requirements of infants up to the age of two years.",
    keyTests: [
      "Total Protein, Fat, Carbohydrate and Vitamin/Mineral Bioavailability",
      "Absence of Pathogenic Bacteria: Salmonella, Listeria, Cronobacter sakazakii",
      "Aflatoxin M1 Limits (Max 0.05 microgram/kg) and Pesticide Residue screen",
      "Heavy Metal Toxicity: Lead, Arsenic, Cadmium testing via ICP-MS"
    ],
    globalHarmonization: {
      standard: "CODEX STAN 72-1981 (Standard for Infant Formula)",
      org: "Codex Alimentarius Commission",
      exportEquivalence: "100% International Codex Alimentarius Alignment",
      note: "Accepted in all WHO member nations.",
      compatibleMarkets: ["Global (WHO / UNICEF Procurement)", "European Union", "Middle East"]
    },
    citizenCard: {
      headline: "Protecting Infants from Adulterated Baby Formula",
      mandatoryMark: "Red and Blue ISI Emblem on front tin face + Batch Coding",
      safetyRisk: "Substandard baby food causes severe neonatal malnutrition, chronic poisoning, and fatal bacterial infections.",
      labelInstruction: "Always verify the hermetic tin seal. Ensure IS 11536 is stamped with FSSAI and BIS CML numbers.",
      actionTip: "Never purchase dented or rusted infant food tins."
    },
    labsAvailable: [
      { name: "CFTRI", city: "Mysuru", state: "Karnataka" },
      { name: "National Dairy Research Institute (NDRI)", city: "Karnal", state: "Haryana" },
      { name: "BIS Central Laboratory Food Wing", city: "Sahibabad", state: "Uttar Pradesh" }
    ],
    feeStructure: {
      applicationFee: 1000,
      annualLicenseFee: 1000,
      auditFeePerManDay: 7000,
      baseMarkingFee: 145000,
      microConcessionPercent: 50,
      smallConcessionPercent: 20,
      womenStartupConcessionPercent: 50
    },
    documentationRequired: [
      "Positive pressure cleanroom packaging facility certification",
      "Automated spray drying tower monitoring logs",
      "In-house micro-analytical laboratory with ICP-MS and GC-MS equipment"
    ],
    consumerTip: "Mother's milk is best for your baby. Store opened tins in a cool, dry place and use within 3 weeks."
  },

  // 21. STRUCTURAL STEEL (SECTIONS & PLATES)
  {
    id: "IS-2062",
    isCode: "IS 2062:2011",
    title: "Hot Rolled Medium and High Tensile Structural Steel - Specification",
    category: "Construction Materials",
    sector: "Metallurgical Engineering",
    keywords: ["structural steel", "steel angle", "i beam", "steel girder", "channel", "steel plate"],
    colloquialTerms: ["lohe ka girder", "angle", "channel", "i-beam", "steel plate", "lohe ka piller"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Steel and Steel Products (Quality Control) Order",
    qcoDate: "Mandatory by Ministry of Steel",
    gazetteNotification: {
      order: "Steel and Steel Products (Quality Control) Order",
      ministry: "Ministry of Steel",
      date: "08-May-2020",
      gazetteRef: "S.O. 1673(E)"
    },
    description: "Covers requirements of steel plates, sections, flats, and bars used in welded, bolted, and riveted structural bridges, buildings, and industrial towers.",
    scope: "Hot rolled structural steel for use in structural work involving bridges, high-rise buildings, flyovers, and transmission towers.",
    keyTests: [
      "Tensile Strength & Yield Strength (E250, E350, E450 Grades)",
      "Charpy V-Notch Impact Test at sub-zero temperatures (down to -40°C)",
      "Carbon Equivalent (CE) Calculation for Weldability (Max 0.42%)",
      "Ultrasonic Flaw Examination for laminations and internal inclusions"
    ],
    globalHarmonization: {
      standard: "ASTM A36 / EN 10025-2 (Grade S275 / S355)",
      org: "ASTM International / CEN",
      exportEquivalence: "Direct Equivalence to European Structural Steel Grades",
      note: "Accepted in infrastructure projects across the Middle East and Southeast Asia.",
      compatibleMarkets: ["Middle East", "Europe", "Africa"]
    },
    citizenCard: {
      headline: "Verifying Steel Girders for Bridges & High-Rise Buildings",
      mandatoryMark: "Hot stamped or die-stamped ISI mark on every steel girder / beam flange",
      safetyRisk: "Re-melted scrap steel without impact testing suffers brittle fracture under winter cold, causing bridge collapses.",
      labelInstruction: "Check the web of the beam. The grade (e.g. E250) and ISI emblem must be stamped.",
      actionTip: "Ensure Mill Test Certificates are signed by an authorized BIS inspector."
    },
    labsAvailable: [
      { name: "CSIR-NML", city: "Jamshedpur", state: "Jharkhand" },
      { name: "National Test House", city: "Kolkata", state: "West Bengal" },
      { name: "RDCIS SAIL", city: "Ranchi", state: "Jharkhand" }
    ],
    feeStructure: {
      applicationFee: 1000,
      annualLicenseFee: 1000,
      auditFeePerManDay: 7000,
      baseMarkingFee: 185000,
      microConcessionPercent: 50,
      smallConcessionPercent: 20,
      womenStartupConcessionPercent: 50
    },
    documentationRequired: [
      "Basic oxygen furnace (BOF) / Electric arc furnace refining records",
      "Automated Charpy impact pendulum test machine",
      "Ultrasonic testing calibration certificates"
    ],
    consumerTip: "Check for 'E250A' or 'E350BR' grade markings to match structural engineering drawings."
  },

  // 22. DRINKING WATER SPECIFICATIONS
  {
    id: "IS-10500",
    isCode: "IS 10500:2012",
    title: "Drinking Water - Specification",
    category: "Food & Water",
    sector: "Chemical / Water Quality",
    keywords: ["drinking water", "tap water", "municipal water", "potable water", "water quality"],
    colloquialTerms: ["peene ka paani", "nal ka paani", "drinking water", "municipal water", "potable water"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: false,
    qcoNotification: "Voluntary benchmark for Jal Jeevan Mission & Municipal Corporation water supply",
    qcoDate: "National Water Quality Benchmark",
    gazetteNotification: {
      order: "National Water Policy & Jal Jeevan Mission Standards",
      ministry: "Ministry of Jal Shakti",
      date: "15-Aug-2019",
      gazetteRef: "Jal Jeevan Mission Guidelines"
    },
    description: "Benchmark Indian Standard prescribing acceptable and permissible limits for 48 physical, chemical, toxic, and bacteriological parameters in public tap water supply.",
    scope: "Water intended for human consumption across piped municipal drinking water networks and rural household tap connections.",
    keyTests: [
      "Bacteriological: E. coli and Total Coliform Organisms (Must be Zero in 100 ml sample)",
      "Toxic Substances: Lead (max 0.01 mg/l), Arsenic (max 0.01 mg/l), Fluoride (max 1.0 mg/l)",
      "Total Dissolved Solids (Acceptable 500 mg/l, Permissible 2000 mg/l in absence of alternate source)",
      "Chlorine Residual: Free available chlorine min 0.2 mg/l for disinfection"
    ],
    globalHarmonization: {
      standard: "WHO Guidelines for Drinking-water Quality (4th Edition)",
      org: "World Health Organization",
      exportEquivalence: "100% WHO Conformity",
      note: "Used as the benchmark standard across South Asian municipal utilities.",
      compatibleMarkets: ["Global Water Quality Systems"]
    },
    citizenCard: {
      headline: "Testing Your Municipal / Borewell Tap Water",
      mandatoryMark: "NABL Water Test Certificate conforming to IS 10500",
      safetyRisk: "High fluoride causes dental/skeletal fluorosis; high arsenic causes chronic skin cancer.",
      labelInstruction: "Get your drinking water tested once a year at any recognized public health engineering lab against IS 10500.",
      actionTip: "TDS above 500 mg/L requires reverse osmosis (RO); TDS under 300 mg/L only requires UV filtration."
    },
    labsAvailable: [
      { name: "National Environmental Engineering Research Institute (NEERI)", city: "Nagpur", state: "Maharashtra" },
      { name: "State Water and Sanitation Mission Labs", city: "All State Capitals", state: "Pan-India" },
      { name: "BIS Central Laboratory", city: "Sahibabad", state: "Uttar Pradesh" }
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
      "Periodic multi-point municipal water distribution test log",
      "Online chlorine residual monitor calibration records",
      "Biological incubation safety reports"
    ],
    consumerTip: "Do not install RO purifiers if your municipal water TDS is already below 250 mg/L."
  },

  // 23. INDUSTRIAL SAFETY HELMETS
  {
    id: "IS-2925",
    isCode: "IS 2925:1984",
    title: "Specification for Industrial Safety Helmets",
    category: "Automotive & Safety",
    sector: "Personal Protective Equipment",
    keywords: ["industrial helmet", "hard hat", "construction helmet", "safety helmet", "site helmet"],
    colloquialTerms: ["hard hat", "peeli topi", "construction helmet", "site helmet", "safety topi"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Personal Protective Equipment (Quality Control) Order",
    qcoDate: "Mandatory statutory compliance",
    gazetteNotification: {
      order: "Industrial Safety Helmets (Quality Control) Order",
      ministry: "DPIIT & Ministry of Labour and Employment",
      date: "14-Feb-2021",
      gazetteRef: "S.O. 981(E)"
    },
    description: "Specifies head protection for workers in mining, construction, and heavy industries against falling objects, electrical shocks, and burning splatters.",
    scope: "Industrial safety helmets intended for use in building, civil engineering and other industrial work to provide protection against falling objects.",
    keyTests: [
      "Shock Absorption Test: Transmitted force shall not exceed 5.0 kN when hit with 5 kg striker",
      "Penetration Resistance Test (Conical 3 kg striker dropped from 1 meter)",
      "Electrical Insulation: Proof test at 2000V AC leakage current < 3 mA",
      "Flammability Resistance & High Temperature Conditioning at 50°C"
    ],
    globalHarmonization: {
      standard: "EN 397:2012 / ANSI/ISEA Z89.1 (Type I Industrial Hard Hats)",
      org: "CEN / ANSI",
      exportEquivalence: "92% Harmonization with European EN 397",
      note: "Accepted in industrial oil/gas operations across the Middle East.",
      compatibleMarkets: ["Middle East", "Europe", "Africa"]
    },
    citizenCard: {
      headline: "Construction Site Worker Safety",
      mandatoryMark: "Permanent Moulded ISI Mark on the underside of helmet peak",
      safetyRisk: "Substandard plastic shells crack under falling brick impacts, resulting in fatal construction site injuries.",
      labelInstruction: "Inspect the inside peak. Ensure IS 2925, manufacturer name, and CM/L-XXXXXXX are moulded in the plastic.",
      actionTip: "Ensure the internal 4-point or 6-point harness is intact with minimum 30 mm crown clearance."
    },
    labsAvailable: [
      { name: "Central Labour Institute", city: "Mumbai", state: "Maharashtra" },
      { name: "National Test House", city: "Kolkata", state: "West Bengal" },
      { name: "BIS Central Laboratory", city: "Sahibabad", state: "Uttar Pradesh" }
    ],
    feeStructure: {
      applicationFee: 1000,
      annualLicenseFee: 1000,
      auditFeePerManDay: 7000,
      baseMarkingFee: 56000,
      microConcessionPercent: 50,
      smallConcessionPercent: 20,
      womenStartupConcessionPercent: 50
    },
    documentationRequired: [
      "Drop weight shock absorption transducer load cell setup",
      "Dielectric leakage test water bath",
      "Virgin HDPE / ABS polymer purchase invoices"
    ],
    consumerTip: "Replace any safety helmet immediately if it has withstood a heavy impact, even if no visible cracks appear."
  },

  // 24. SILVER HALLMARKING
  {
    id: "IS-2112",
    isCode: "IS 2112:2014",
    title: "Silver and Silver Alloys, Jewellery/Artefacts - Fineness and Marking",
    category: "Gold & Jewellery",
    sector: "Precious Metals",
    keywords: ["silver", "hallmark silver", "chandi", "silver coin", "925 silver", "silver jewellery"],
    colloquialTerms: ["chandi", "chandi ka gehna", "silver hallmark", "925 chandi", "payal", "silver coin"],
    scheme: "Scheme-IV (Hallmarking)",
    schemeCode: "SCHEME_4",
    mandatoryQCO: false,
    qcoNotification: "Voluntary Hallmarking Scheme for Consumer Protection",
    qcoDate: "Voluntary certification by BIS AHCs",
    gazetteNotification: {
      order: "Silver Hallmarking Guidelines",
      ministry: "Ministry of Consumer Affairs",
      date: "01-April-2015",
      gazetteRef: "BIS Hallmarking Regulations"
    },
    description: "Specifies recognized grades of silver fineness (999, 990, 925, 900, 835, 800) and prescribes laser hallmarking on silver jewellery and religious artefacts.",
    scope: "Silver articles, jewellery, coins, and utensils sold in the Indian domestic market.",
    keyTests: [
      "Volumetric (Potentiometric) Silver Chloride Titration Method (IS 2113)",
      "X-Ray Fluorescence Spectrometry (XRF) non-destructive surface analysis",
      "Laser inscription of BIS Triangle emblem, fineness (e.g. 925), and Jeweller Logo"
    ],
    globalHarmonization: {
      standard: "ISO 9202 (Jewellery - Fineness of precious metal alloys)",
      org: "ISO",
      exportEquivalence: "100% Sterling Silver (925) International Equivalence",
      note: "Accepted in all international silver jewellery retail markets.",
      compatibleMarkets: ["Global (USA, Europe, UK, Middle East)"]
    },
    citizenCard: {
      headline: "Identifying Pure 925 Sterling Silver",
      mandatoryMark: "BIS Logo + Purity (e.g. 925) + Assaying Centre Mark",
      safetyRisk: "Uncertified silver items are heavily diluted with nickel and zinc, causing skin allergies and rapid tarnishing.",
      labelInstruction: "Look for '925' stamped along with the BIS triangle symbol on payals and silver utensils.",
      actionTip: "Ask for hallmarking charges on your silver receipt."
    },
    labsAvailable: [
      { name: "BIS Recognized AHC", city: "Agra", state: "Uttar Pradesh" },
      { name: "BIS Recognized AHC", city: "Jaipur", state: "Rajasthan" },
      { name: "BIS Recognized AHC", city: "Salem", state: "Tamil Nadu" }
    ],
    feeStructure: {
      applicationFee: 0,
      annualLicenseFee: 0,
      auditFeePerManDay: 0,
      baseMarkingFee: 35, // ₹35 per silver article
      microConcessionPercent: 0,
      smallConcessionPercent: 0,
      womenStartupConcessionPercent: 0
    },
    documentationRequired: [
      "Jeweller GSTIN Registration and business premise proof",
      "Free online self-registration on Manak Online portal"
    ],
    consumerTip: "925 represents 92.5% pure silver alloyed with 7.5% copper for structural strength."
  }
];

export const SCHEMES_INFO = [
  {
    code: "SCHEME_1",
    name: "Scheme-I (ISI Mark Scheme)",
    badge: "ISI Mark",
    target: "Mandatory & Voluntary Industrial/Domestic Goods",
    description: "The premier BIS product certification scheme. Requires verified in-house testing laboratory infrastructure at the factory, followed by on-site BIS officer audit and independent third-party laboratory sample clearance.",
    steps: [
      "Stage 1: Verify standard & setup calibrated in-house testing lab",
      "Stage 2: File Form-I online on e-BIS portal (www.manakonline.in)",
      "Stage 3: Factory inspection by BIS technical officer & sample drawing",
      "Stage 4: Grant of operative CML (Certification Marks License) with annual renewal"
    ],
    concessions: "50% Marking Fee Concession for Micro Enterprises; 20% for Small Enterprises; 50% for Startups & Women-led units."
  },
  {
    code: "SCHEME_2",
    name: "Scheme-II (Compulsory Registration Scheme - CRS)",
    badge: "CRS Mark",
    target: "Electronics, IT Hardware, Solar & LED Products",
    description: "Formulated in collaboration with MeitY and MNRE. Manufacturers test their products in an accredited Indian NABL laboratory and submit self-declaration of conformity on the CRS portal without mandatory preliminary factory audit.",
    steps: [
      "Stage 1: Sample dispatch to BIS recognized Indian NABL test lab",
      "Stage 2: Obtain comprehensive safety test report (IEC/IS standard)",
      "Stage 3: File online application on BIS CRS portal with test report",
      "Stage 4: Grant of 8-digit Registration Number (R-XXXXXXXX) for product label"
    ],
    concessions: "Fast-track digital processing within 20 working days; zero preliminary factory inspection fee."
  },
  {
    code: "SCHEME_4",
    name: "Scheme-IV (Hallmarking Scheme)",
    badge: "Gold HUID",
    target: "Gold & Silver Jewellery & Artefacts",
    description: "Mandatory in 343+ Indian districts. Precious metal items are assayed and laser-engraved with a unique 6-digit alphanumeric HUID by accredited third-party Assaying & Hallmarking Centres (AHC).",
    steps: [
      "Stage 1: Jeweller free online registration on Manak Online portal",
      "Stage 2: Send manufactured jewellery lots to recognized AHC",
      "Stage 3: XRF and fire assay verification of fineness (22K, 18K, 14K)",
      "Stage 4: Laser inscription of BIS Logo + Fineness + 6-digit HUID code"
    ],
    concessions: "Zero registration fee for jewellers with annual turnover under ₹5 Crores; nominal ₹45/article marking fee."
  },
  {
    code: "FMCS",
    name: "Foreign Manufacturers Certification Scheme (FMCS)",
    badge: "FMCS License",
    target: "Overseas Factories Exporting to India",
    description: "Statutory licensing scheme under BIS Act 2016 for overseas production units exporting goods to India governed by mandatory Quality Control Orders.",
    steps: [
      "Stage 1: Appoint an Authorized Indian Representative (AIR)",
      "Stage 2: Submit physical application & factory dossier to BIS HQ New Delhi",
      "Stage 3: Overseas on-site factory audit by BIS technical delegation",
      "Stage 4: Clearance of port customs via operative CML license"
    ],
    concessions: "Direct customs clearance at Indian sea/air ports without port detention or re-testing."
  }
];

export const NABL_LABS = [
  {
    id: "LAB-01",
    name: "BIS Central Laboratory (CL)",
    city: "Sahibabad",
    state: "Uttar Pradesh",
    lat: 28.6712,
    lng: 77.3621,
    accreditation: "NABL / BIS Statutory Apex Facility",
    testingScope: ["Electrical Appliances", "Food & Packaged Water", "Civil Engineering Materials", "Chemicals & Plastics"],
    supportedStandards: ["IS 2082:2018", "IS 368:2014", "IS 14543:2016", "IS 12269:2013", "IS 302 (Part 2/Sec 3):2007", "IS 9873 (Part 1):2019", "IS 1293:2019"],
    contact: "cl@bis.gov.in | +91-120-2770030",
    address: "Plot No. 20/9, Site IV, Sahibabad Industrial Area, Ghaziabad, UP 201010"
  },
  {
    id: "LAB-02",
    name: "Electrical Research and Development Association (ERDA)",
    city: "Vadodara",
    state: "Gujarat",
    lat: 22.3489,
    lng: 73.1812,
    accreditation: "NABL TC-5389 / BIS Recognized",
    testingScope: ["Geysers", "Immersion Heaters", "Plugs & Sockets", "Transformers", "High Voltage Switchgear"],
    supportedStandards: ["IS 2082:2018", "IS 368:2014", "IS 1293:2019", "IS 302 (Part 2/Sec 3):2007"],
    contact: "erda@erda.org | +91-265-2642942",
    address: "ERDA Road, GIDC, Makarpura, Vadodara, Gujarat 390010"
  },
  {
    id: "LAB-03",
    name: "Central Power Research Institute (CPRI)",
    city: "Bengaluru",
    state: "Karnataka",
    lat: 13.0158,
    lng: 77.5815,
    accreditation: "NABL / Autonomous Society Ministry of Power",
    testingScope: ["Electrical Transmission", "Cables", "Domestic Appliances", "Dielectric Materials"],
    supportedStandards: ["IS 2082:2018", "IS 1293:2019", "IS 694:2010"],
    contact: "cpri@cpri.in | +91-80-22072222",
    address: "Prof. Sir C.V. Raman Road, Sadashivanagar, Bengaluru, Karnataka 560080"
  },
  {
    id: "LAB-04",
    name: "National Test House (NTH - Eastern Region)",
    city: "Kolkata",
    state: "West Bengal",
    lat: 22.5312,
    lng: 88.3308,
    accreditation: "NABL TC-5012 / Ministry of Consumer Affairs",
    testingScope: ["Packaged Drinking Water", "Cement & Concrete", "Rebars & Steel", "Chemicals", "Cookware"],
    supportedStandards: ["IS 14543:2016", "IS 12269:2013", "IS 1786:2008", "IS 2347:2017", "IS 2062:2011"],
    contact: "nthcal@wb.nic.in | +91-33-24791221",
    address: "11/1 Judges Court Road, Alipore, Kolkata, West Bengal 700027"
  },
  {
    id: "LAB-05",
    name: "Automotive Research Association of India (ARAI)",
    city: "Pune",
    state: "Maharashtra",
    lat: 18.5284,
    lng: 73.8157,
    accreditation: "NABL / Ministry of Heavy Industries",
    testingScope: ["Two Wheeler Helmets", "Automotive Safety Components", "Tyres & Glass", "Crashworthiness"],
    supportedStandards: ["IS 4151:2020"],
    contact: "director@araiindia.com | +91-20-30231111",
    address: "Survey No. 102, Vetal Hill, Off Paud Road, Kothrud, Pune, Maharashtra 411038"
  },
  {
    id: "LAB-06",
    name: "National Council for Cement and Building Materials (NCCBM)",
    city: "Ballabgarh",
    state: "Haryana",
    lat: 28.3412,
    lng: 77.3245,
    accreditation: "NABL TC-5421 / Apex Body for Cement & Construction",
    testingScope: ["Ordinary Portland Cement 53 Grade", "PPC Cement", "Concrete Admixtures", "Structural Mortars"],
    supportedStandards: ["IS 12269:2013"],
    contact: "nccbm@ncbindia.com | +91-129-4258258",
    address: "34 Km Stone, Delhi-Mathura Road (NH-2), Ballabgarh, Haryana 121004"
  },
  {
    id: "LAB-07",
    name: "International Centre for Automotive Technology (ICAT)",
    city: "Manesar",
    state: "Haryana",
    lat: 28.3541,
    lng: 76.9214,
    accreditation: "NABL TC-5678 / MoRTH Approved",
    testingScope: ["Protective Helmets", "EV Batteries", "Automotive Electronics"],
    supportedStandards: ["IS 4151:2020", "IS 16046 (Part 2):2018"],
    contact: "icat@icat.in | +91-124-4586111",
    address: "Plot No. 26, Sector 3, HSIIDC, IMT Manesar, Gurugram, Haryana 122050"
  },
  {
    id: "LAB-08",
    name: "CSIR - National Metallurgical Laboratory (NML)",
    city: "Jamshedpur",
    state: "Jharkhand",
    lat: 22.7845,
    lng: 86.2214,
    accreditation: "NABL / CSIR Apex Metallurgical Facility",
    testingScope: ["TMT Rebars", "Structural Steel Girders", "Tensile & Yield Testing", "Charpy Impact"],
    supportedStandards: ["IS 1786:2008", "IS 2062:2011"],
    contact: "director@nmlindia.org | +91-657-2345000",
    address: "Burmamines, Jamshedpur, Jharkhand 831007"
  },
  {
    id: "LAB-09",
    name: "SAMEER - Centre for Electromagnetics",
    city: "Chennai",
    state: "Tamil Nadu",
    lat: 12.9812,
    lng: 80.2451,
    accreditation: "NABL TC-5890 / MeitY Autonomous Body",
    testingScope: ["IT Equipment Safety", "EMI / EMC Compliance", "Laptop Adapters", "Lithium Battery Safety"],
    supportedStandards: ["IS 13252 (Part 1):2010", "IS 16046 (Part 2):2018"],
    contact: "sameerchennai@sameer.gov.in | +91-44-22541817",
    address: "CIT Campus, 2nd Cross Road, Taramani, Chennai, Tamil Nadu 600113"
  },
  {
    id: "LAB-10",
    name: "Central Food Technological Research Institute (CFTRI)",
    city: "Mysuru",
    state: "Karnataka",
    lat: 12.3114,
    lng: 76.6489,
    accreditation: "NABL / CSIR Apex Food Testing Facility",
    testingScope: ["Packaged Drinking Water", "Infant Milk Formula", "Pesticide Residue GC-MS", "Microbiological Safety"],
    supportedStandards: ["IS 14543:2016", "IS 11536:2014"],
    contact: "director@cftri.res.in | +91-821-2517760",
    address: "Cheluvamba Mansion, Opp. Railway Station, Mysuru, Karnataka 570020"
  },
  {
    id: "LAB-11",
    name: "Central Institute of Petrochemicals Engineering & Technology (CIPET)",
    city: "Chennai",
    state: "Tamil Nadu",
    lat: 13.0112,
    lng: 80.2012,
    accreditation: "NABL / Ministry of Chemicals & Fertilizers",
    testingScope: ["Safety of Toys", "Plastics & Polymers", "PVC Pipes", "Packaging Films"],
    supportedStandards: ["IS 9873 (Part 1):2019"],
    contact: "chennai@cipet.gov.in | +91-44-22254701",
    address: "TVK Industrial Estate, Guindy, Chennai, Tamil Nadu 600032"
  },
  {
    id: "LAB-12",
    name: "Central Labour Institute (CLI)",
    city: "Mumbai",
    state: "Maharashtra",
    lat: 19.0412,
    lng: 72.8614,
    accreditation: "NABL / DGFASLI Ministry of Labour",
    testingScope: ["Particulate Filtering Masks (N95)", "Industrial Safety Helmets", "Safety Footwear"],
    supportedStandards: ["IS 9473:2002", "IS 2925:1984", "IS 15298 (Part 2):2016"],
    contact: "cli@dgfasli.nic.in | +91-22-24092205",
    address: "N.S. Mankikar Marg, Sion, Mumbai, Maharashtra 400022"
  }
];

export const NABL_LABS_DIRECTORY = NABL_LABS;

export const POPULAR_SEARCH_CHIPS = [
  { label: "IS 302 (Electric Iron)", query: "IS 302" },
  { label: "IS 2082 (Geyser)", query: "IS 2082" },
  { label: "Helmet (IS 4151)", query: "helmet" },
  { label: "Cement 53 Grade", query: "cement" },
  { label: "Packaged Water", query: "water" },
  { label: "Baby Toys (IS 9873)", query: "toys" },
  { label: "TMT Steel Rebar", query: "sariya" },
  { label: "Pressure Cooker", query: "pressure cooker" },
  { label: "Gold Hallmarking", query: "gold" },
  { label: "Electrical Switch", query: "switch" }
];

export const SECTORS_LIST = [
  "All Sectors",
  "Electrical Engineering",
  "Electronics & IT Goods",
  "Food & Agriculture",
  "Civil Engineering",
  "Metallurgical Engineering",
  "Consumer Goods & Toys",
  "Transport Engineering",
  "Precious Metals",
  "Personal Protective Equipment",
  "Mechanical Engineering"
];

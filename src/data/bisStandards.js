export const BIS_STANDARDS = [
  {
    id: "IS-2082",
    isCode: "IS 2082:2018",
    title: "Stationary Storage Type Electric Water Heaters (Geysers)",
    category: "Electrical Appliances",
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
      actionTip: "Verify the 7-digit license instantly using TrueMark Verifier below."
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
  {
    id: "IS-368",
    isCode: "IS 368:2014",
    title: "Electric Immersion Water Heaters - Specification",
    category: "Electrical Appliances",
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
      actionTip: "Never buy immersion rods without a valid 7-digit CML number."
    },
    labsAvailable: [
      { name: "BIS Central Laboratory", city: "Sahibabad", state: "Uttar Pradesh" },
      { name: "ERDA Vadodara", city: "Vadodara", state: "Gujarat" },
      { name: "National Test House (NTH)", city: "Alipore, Kolkata", state: "West Bengal" }
    ],
    feeStructure: {
      applicationFee: 1000,
      annualLicenseFee: 1000,
      auditFeePerManDay: 7000,
      baseMarkingFee: 57000,
      microConcessionPercent: 50,
      smallConcessionPercent: 20,
      womenStartupConcessionPercent: 50
    },
    documentationRequired: [
      "Plating bath and sheath copper/brass alloy specifications",
      "Leakage current tester and flash tester in factory lab",
      "Factory registration and MSME Udyam certificate"
    ],
    consumerTip: "Ensure the plastic handle has an embossed ISI logo with IS 368. Avoid local unbranded rods without earthing pins."
  },
  {
    id: "IS-14543",
    isCode: "IS 14543:2016",
    title: "Packaged Drinking Water (Other than Natural Mineral Water)",
    category: "Food & Beverages",
    keywords: ["packaged water", "water bottle", "drinking water", "mineral water", "jar water", "packaged drinking water"],
    colloquialTerms: ["paani ki botal", "pani botal", "bisleri water", "jar water", "mineral bottle", "chilled water", "20 litre jar"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Food Safety and Standards / BIS Mandatory Certification Order",
    qcoDate: "Mandatory since 2001",
    gazetteNotification: {
      order: "Prevention of Food Adulteration / FSSAI & BIS Mandatory Certification",
      ministry: "Ministry of Health & Family Welfare",
      date: "29-March-2001",
      gazetteRef: "G.S.R. 223(E)"
    },
    description: "Specifies strict microbiological, physical, and chemical requirements for water packaged in sealed bottles, pouches, or 20L jars for human consumption.",
    keyTests: [
      "Microbiological Safety (Total Coliforms, E. coli, Yeast & Mould, Pseudomonas)",
      "Toxic Heavy Metals Assay (Lead, Arsenic, Cadmium, Mercury via ICP-MS)",
      "Pesticide Residue Scan (Individual max 0.0001 mg/L)",
      "Container Migration & Leachability Test (BPA & Phthalates)"
    ],
    globalHarmonization: {
      standard: "CODEX STAN 227-2001 / WHO Drinking Water Guidelines",
      org: "Codex Alimentarius Commission & WHO",
      exportEquivalence: "91% Alignment (Microbiological Benchmark)",
      note: "Directly accepted for export to GCC nations and Southeast Asia under FSSAI export endorsement.",
      compatibleMarkets: ["GCC Nations", "Southeast Asia", "Africa", "EU (with sanitary health cert)"]
    },
    citizenCard: {
      headline: "Packaged Water Bottle & 20L Jar Check",
      mandatoryMark: "IS 14543 ISI Mark + 7-digit CML Number + FSSAI License",
      safetyRisk: "Uncertified refilled jars frequently carry cholera, coliform bacteria, and industrial heavy metal contaminants.",
      labelInstruction: "Always confirm both the ISI Mark and FSSAI 14-digit number on the neck label or tamper seal.",
      actionTip: "Refuse 20L jars that have scratched-off or missing ISI marks."
    },
    labsAvailable: [
      { name: "BIS Western Regional Laboratory", city: "Mumbai", state: "Maharashtra" },
      { name: "National Test House (NTH)", city: "Ghaziabad (NCR)", state: "Uttar Pradesh" },
      { name: "CFRTI Central Lab", city: "Mysuru", state: "Karnataka" },
      { name: "SGS India Lab", city: "Gurugram", state: "Haryana" }
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
    colloquialTerms: ["khilona", "toy car", "bachho ka khilona", "plastic doll", "doll", "teddy", "khelne ka saman", "remote car"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Toys (Quality Control) Order, 2020 by DPIIT",
    qcoDate: "Mandatory from 1st Jan 2021",
    gazetteNotification: {
      order: "Toys (Quality Control) Order, 2020",
      ministry: "DPIIT, Ministry of Commerce & Industry",
      date: "25-February-2020",
      gazetteRef: "S.O. 853(E)"
    },
    description: "Applies to all toys intended for children under 14 years. Mandates rigorous physical, choking, sharp edge, small parts, and drop testing to prevent infant injury.",
    keyTests: [
      "Small Parts & Choking Hazard Cylinder Test for infants under 36 months",
      "Sharp Edge & Sharp Point Evaluation",
      "Drop, Impact, Torque, and Tension stress testing",
      "Part 3 Heavy Metal Chemical Migration Test (Lead, Antimony, Barium)"
    ],
    globalHarmonization: {
      standard: "ISO 8124-1:2018 / EN 71-1:2014+A1 / ASTM F963",
      org: "ISO, CEN (Europe), and ASTM International (USA)",
      exportEquivalence: "98% Alignment (Global Toy Safety Standard)",
      note: "Harmonized with US Consumer Product Safety Improvement Act (CPSIA) and EU Toy Safety Directive 2009/48/EC.",
      compatibleMarkets: ["United States (ASTM F963)", "European Union (EN 71)", "Japan (ST 2016)", "Australia"]
    },
    citizenCard: {
      headline: "Child Toy Safety Verification",
      mandatoryMark: "BIS ISI Mark with IS 9873 Part 1 reference",
      safetyRisk: "Uncertified cheap toys break into sharp ingestion hazards or leach toxic lead paints into babies' mouths.",
      labelInstruction: "Look for the ISI Mark and age-warning recommendation ('Not suitable for under 3 years') printed on the box.",
      actionTip: "Imported toys without BIS certification are illegal for sale in India."
    },
    labsAvailable: [
      { name: "BIS Central Laboratory", city: "Sahibabad", state: "Uttar Pradesh" },
      { name: "TUV Rheinland / NABL Toy Testing Center", city: "Gurugram", state: "Haryana" },
      { name: "SGS India Testing Lab", city: "Chennai", state: "Tamil Nadu" },
      { name: "Intertek India Lab", city: "New Delhi", state: "Delhi" }
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
    colloquialTerms: ["sona", "gold chain", "hallmark sona", "kundan", "anguthi", "jhumka", "haar", "22 carat sona", "purity test"],
    scheme: "Hallmarking Scheme (HUID)",
    schemeCode: "SCHEME_HALLMARK",
    mandatoryQCO: true,
    qcoNotification: "Hallmarking of Gold Jewellery & Gold Artefacts Order, 2020",
    qcoDate: "Mandatory across 343+ Indian districts",
    gazetteNotification: {
      order: "Hallmarking of Gold Jewellery and Gold Artefacts Order, 2020",
      ministry: "Ministry of Consumer Affairs, Food and Public Distribution",
      date: "15-January-2020",
      gazetteRef: "S.O. 205(E)"
    },
    description: "Specifies purity benchmarks (14K - 585, 18K - 750, 20K - 833, 22K - 916, 23K - 958, 24K - 995) and mandates laser engraving of 6-digit alphanumeric HUID.",
    keyTests: [
      "Fire Assay Method (Destructive cupellation purity verification)",
      "X-Ray Fluorescence (XRF) Non-Destructive Spectrometry",
      "6-Digit Unique HUID Laser Inscription by Assaying and Hallmarking Centre (AHC)"
    ],
    globalHarmonization: {
      standard: "ISO 9202:2019 / Vienna Hallmarking Convention",
      org: "International Organization for Standardization & Vienna Convention",
      exportEquivalence: "99% Alignment (Precious Metals Fineness)",
      note: "Recognized by London Bullion Market Association (LBMA) and UK Hallmarking Act standards.",
      compatibleMarkets: ["United Kingdom", "Switzerland", "UAE (Dubai Gold & Commodities Exchange)", "Singapore"]
    },
    citizenCard: {
      headline: "3 Mandatory Marks on Authentic Gold",
      mandatoryMark: "1. BIS Triangle Logo | 2. Purity Grade (e.g. 22K916) | 3. 6-Digit HUID",
      safetyRisk: "Un-hallmarked gold is frequently adulterated with zinc or copper, cheating buyers by 15% to 35% in purity.",
      labelInstruction: "Examine with a jeweler loupe. Ensure the 6-character laser engraving is crisp and readable.",
      actionTip: "Input the 6-digit code into TrueMark Verifier to view assay date and jeweller registration."
    },
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
    colloquialTerms: ["switch", "bijli ka board", "plug", "socket", "extension cord", "multipin", "3 pin plug", "power point"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Plugs and Socket-Outlets (Quality Control) Order",
    qcoDate: "Mandatory from 2021",
    gazetteNotification: {
      order: "Plugs and Socket-Outlets and Alternating Current Direct Connected Static Prepayment Meters Order",
      ministry: "DPIIT",
      date: "04-December-2019",
      gazetteRef: "S.O. 4387(E)"
    },
    description: "Covers plugs and fixed/portable socket-outlets for AC systems up to 250V. Ensures fire resistance, prevention of accidental electrical touch, and robust earthing.",
    keyTests: [
      "Glow Wire Flame Retardance Test (850°C)",
      "Withdrawal Force & Contact Pressure Test",
      "Temperature Rise at rated current (16A / 6A)",
      "High Current Arc Resistance & Mechanical Impact"
    ],
    globalHarmonization: {
      standard: "IEC 60884-1:2002+AMD1:2006+AMD2:2013",
      org: "International Electrotechnical Commission (IEC)",
      exportEquivalence: "88% Alignment (Type D & M compatible)",
      note: "Standardizes the 3-pin configuration used across India, South Africa, and parts of the Middle East.",
      compatibleMarkets: ["South Africa (SABS)", "Sri Lanka", "Nepal", "Middle East"]
    },
    citizenCard: {
      headline: "Fire-Safe Plugs & Wall Sockets",
      mandatoryMark: "Moulded ISI Mark on socket faceplate and plug casing",
      safetyRisk: "Inferior recycled plastic sockets catch fire during high-power load (AC, geyser, iron) from arcing.",
      labelInstruction: "Look for embossed 'IS 1293' and manufacturer's CML number on the plastic backplate.",
      actionTip: "Do not buy multi-plug adaptors without a third earth pin."
    },
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
    colloquialTerms: ["charger", "phone charger", "adapter", "laptop cord", "power bank", "smart watch", "router"],
    scheme: "Scheme-II (Compulsory Registration Scheme - CRS)",
    schemeCode: "SCHEME_CRS",
    mandatoryQCO: true,
    qcoNotification: "MeitY Compulsory Registration Order (CRO)",
    qcoDate: "Mandatory",
    gazetteNotification: {
      order: "Electronics and Information Technology Goods (Requirement for Compulsory Registration) Order",
      ministry: "Ministry of Electronics and Information Technology (MeitY)",
      date: "03-October-2012",
      gazetteRef: "S.O. 2357(E)"
    },
    description: "MeitY mandate for IT and electronics goods. Unlike Scheme-I, CRS does not require factory audit beforehand; registration is granted based on NABL lab test reports.",
    keyTests: [
      "Creepage Distance & Electrical Clearance",
      "Protection Against Electric Shock & Energy Hazards",
      "Thermal Endurance & Flammability Class V-0 / V-1",
      "Leakage Current under tropical moisture conditions"
    ],
    globalHarmonization: {
      standard: "IEC 60950-1 / IEC 62368-1:2018",
      org: "International Electrotechnical Commission (IEC)",
      exportEquivalence: "100% Direct Adoption (CB Scheme Equivalent)",
      note: "Direct technical translation of IEC 60950-1. CB Scheme test reports from international labs are accepted for fast-track CRS.",
      compatibleMarkets: ["Worldwide (CB Scheme)", "USA (UL 62368-1)", "EU (EN 62368-1)", "Japan (PSE)"]
    },
    citizenCard: {
      headline: "Mobile Charger & Adapter Safety Mark",
      mandatoryMark: "BIS CRS Logo with R-XXXXXXXX Registration Number",
      safetyRisk: "Fake uncertified chargers lack over-voltage protection and frequently explode during charging.",
      labelInstruction: "Verify the statement: 'Self Declaration - Conforming to IS 13252 (Part 1), R-XXXXXXXX' on the charger casing.",
      actionTip: "Enter the R-number on the BIS CRS portal or TrueMark Verifier."
    },
    labsAvailable: [
      { name: "UL India Lab", city: "Bengaluru", state: "Karnataka" },
      { name: "Intertek Testing Services", city: "New Delhi", state: "Delhi" },
      { name: "SAMEER Laboratory", city: "Chennai", state: "Tamil Nadu" },
      { name: "TUV SUD South Asia", city: "Bengaluru", state: "Karnataka" }
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
    colloquialTerms: ["helmet", "bike topi", "rider helmet", "sar ki suraksha", "motorcycle helmet", "isi helmet"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Ministry of Road Transport and Highways (MoRTH) QCO",
    qcoDate: "Mandatory since June 2021",
    gazetteNotification: {
      order: "Helmet for riders of Two-Wheeler Motor Vehicles (Quality Control) Order",
      ministry: "Ministry of Road Transport and Highways (MoRTH)",
      date: "26-November-2020",
      gazetteRef: "S.O. 4252(E)"
    },
    description: "Mandates life-saving shock absorption, peripheral vision, chin strap retention, and maximum weight limit of 1.2 kg to protect motorcycle riders across India.",
    keyTests: [
      "Impact Absorption Test with headform drop from 3 meters",
      "Chin Strap Rigidity and Dynamic Retention Test",
      "Visor Optical Transmittance & Scratch Resistance",
      "Penetration Resistance against sharp drop strikers"
    ],
    globalHarmonization: {
      standard: "ECE R22.06 / DOT FMVSS 218",
      org: "United Nations ECE & US Department of Transportation",
      exportEquivalence: "92% Impact Test Harmonization",
      note: "Impact deceleration thresholds (< 300g) are directly benchmarked to European ECE R22 crash testing protocols.",
      compatibleMarkets: ["Europe (ECE R22.06)", "USA (DOT)", "Latin America", "Southeast Asia"]
    },
    citizenCard: {
      headline: "Life-Saving Two-Wheeler Helmet Verification",
      mandatoryMark: "Permanent painted or sticker ISI mark with CM/L number on rear helmet shell",
      safetyRisk: "Roadside plastic cap fake helmets shatter upon impact, causing severe traumatic brain injury.",
      labelInstruction: "Never buy helmets with removable paper ISI stickers. Authentic helmets have laminated ISI marks and chin-strap labels.",
      actionTip: "Traffic police penalize riders wearing non-ISI helmets under Section 129 of Motor Vehicles Act."
    },
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
    colloquialTerms: ["cement", "ambuja", "ultratech", "chuna cement", "ret cement", "53 grade cement", "building cement"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Cement (Quality Control) Order",
    qcoDate: "Mandatory",
    gazetteNotification: {
      order: "Cement (Quality Control) Order, 2003",
      ministry: "DPIIT, Ministry of Commerce and Industry",
      date: "17-February-2003",
      gazetteRef: "S.O. 191(E)"
    },
    description: "Specifies compressive strength (minimum 53 MPa at 28 days), setting times, chemical purity, and fineness for high-strength infrastructure construction.",
    keyTests: [
      "Compressive Strength at 72 hours, 168 hours, and 672 hours (Min 53 MPa)",
      "Initial (Min 30 min) & Final Setting Time (Max 600 min) via Vicat Apparatus",
      "Soundness Test (Le-Chatelier max 10mm & Autoclave max 0.8%)",
      "Insoluble Residue & Loss on Ignition (LOI) Chemical Analysis"
    ],
    globalHarmonization: {
      standard: "ASTM C150 (Type I/III) / EN 197-1 (CEM I 52.5N)",
      org: "ASTM International & European Committee for Standardization (CEN)",
      exportEquivalence: "95% Alignment (High Early Strength Portland)",
      note: "Accepted across GCC infrastructure projects and Southeast Asian bridge & seaport construction bids.",
      compatibleMarkets: ["GCC & Middle East", "Southeast Asia", "Africa"]
    },
    citizenCard: {
      headline: "Structural Cement Bag Check",
      mandatoryMark: "Machine-stitched bag printing of ISI Mark, IS 12269, and Week/Year of packing",
      safetyRisk: "Adulterated fly-ash cement bags result in early building cracks, slab collapse, and weak foundation strength.",
      labelInstruction: "Check the HDPE/paper bag for week and year of manufacture (e.g. W-12, Y-2026). Cement older than 90 days loses 20% strength.",
      actionTip: "Verify the manufacturer's CML number on TrueMark Verifier before pouring concrete slabs."
    },
    labsAvailable: [
      { name: "National Council for Cement and Building Materials (NCCBM)", city: "Ballabgarh", state: "Haryana" },
      { name: "BIS Northern Regional Lab", city: "Chandigarh", state: "Punjab" },
      { name: "National Test House (NTH)", city: "Kolkata", state: "West Bengal" }
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
  },
  {
    id: "IS-1786",
    isCode: "IS 1786:2008",
    title: "High Strength Deformed Steel Bars and Wires for Concrete Reinforcement (TMT Rebars)",
    category: "Construction & Metallurgy",
    keywords: ["steel", "tmt bar", "rebar", "reinforcement steel", "fe 500", "fe 550d", "construction rod"],
    colloquialTerms: ["sariya", "lohe ka sariya", "tmt rod", "construction steel", "loha", "fe 500d sariya", "chhat ka sariya"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Steel and Steel Products (Quality Control) Order",
    qcoDate: "Mandatory since 2012",
    gazetteNotification: {
      order: "Steel and Steel Products (Quality Control) Order, 2020",
      ministry: "Ministry of Steel",
      date: "22-December-2020",
      gazetteRef: "S.O. 4637(E)"
    },
    description: "Specifies chemical composition (Carbon, Sulphur, Phosphorus) and mechanical strength (Yield, Tensile, Elongation) for hot rolled TMT steel reinforcement bars.",
    keyTests: [
      "0.2% Proof Stress / Yield Stress Testing (Min 500 N/mm² for Fe 500D)",
      "Tensile Strength to Proof Stress Ratio (Min 1.10 for earthquake ductility)",
      "Bend and Rebend Ductility Test around cylindrical mandrels",
      "Spectrometric Chemical Analysis for Carbon Equivalent (CE <= 0.42%)"
    ],
    globalHarmonization: {
      standard: "BS 4449:2005 (Grade B500B) / ASTM A615 / ISO 6935-2",
      org: "BSI, ASTM, and ISO",
      exportEquivalence: "96% Alignment (High Yield Deformed Bars)",
      note: "Directly recognized for international EPC infrastructure contracts across South Asia, Middle East, and Africa.",
      compatibleMarkets: ["United Kingdom (CARES)", "Middle East", "Southeast Asia", "Africa"]
    },
    citizenCard: {
      headline: "Home Building Steel Rebar (Sariya) Check",
      mandatoryMark: "Embossed ISI Mark, IS 1786, Grade (Fe 500D) and Manufacturer Brand on EVERY meter of rebar",
      safetyRisk: "Rerolled scrap steel bars lack ductility and snap during earthquakes or heavy building loads.",
      labelInstruction: "Run your hand along the rebar ribs: authentic TMT rebars have the ISI logo and brand name stamped every meter.",
      actionTip: "Never buy smooth un-ribbed or unbranded rebars for structural pillars and roof casting."
    },
    labsAvailable: [
      { name: "National Test House (NTH)", city: "Alipore, Kolkata", state: "West Bengal" },
      { name: "CSIR-National Metallurgical Laboratory (NML)", city: "Jamshedpur", state: "Jharkhand" },
      { name: "BIS Central Laboratory", city: "Sahibabad", state: "Uttar Pradesh" }
    ],
    feeStructure: {
      applicationFee: 1000,
      annualLicenseFee: 1000,
      auditFeePerManDay: 7000,
      baseMarkingFee: 210000,
      microConcessionPercent: 50,
      smallConcessionPercent: 20,
      womenStartupConcessionPercent: 50
    },
    documentationRequired: [
      "Induction furnace or electric arc furnace metallurgical ladle sheets",
      "Universal Testing Machine (UTM) calibrated within 12 months",
      "Chemical testing spectrometer and certified reference standards"
    ],
    consumerTip: "Always demand test certificates stating Fe 500D grade with IS 1786 and verify the mill's CML number."
  },
  {
    id: "IS-302-2-3",
    isCode: "IS 302 (Part 2/Sec 3):2007",
    title: "Safety of Household and Similar Electrical Appliances - Electric Dry & Steam Irons",
    category: "Electrical Appliances",
    keywords: ["electric iron", "steam iron", "dry iron", "press", "clothes iron"],
    colloquialTerms: ["press", "istri", "iron", "kapde ki press", "steam press", "dry press"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Electrical Appliances (Quality Control) Order, 2023",
    qcoDate: "Mandatory",
    gazetteNotification: {
      order: "Electrical Appliances (Quality Control) Order, 2023",
      ministry: "DPIIT",
      date: "05-March-2023",
      gazetteRef: "S.O. 1042(E)"
    },
    description: "Prescribes electrical safety, soleplate temperature limiting, cord flex endurance, and thermal cut-off reliability for domestic dry and steam clothing irons.",
    keyTests: [
      "Dielectric Strength Test at 1250V AC",
      "Thermal Limiter / Thermostat Endurance Cycling (100,000 cycles)",
      "Supply Cord Flexing Test (20,000 flexing cycles under load)",
      "Soleplate Thermal Profile & Scorch Prevention"
    ],
    globalHarmonization: {
      standard: "IEC 60335-2-3:2012+AMD1:2015",
      org: "International Electrotechnical Commission (IEC)",
      exportEquivalence: "95% Alignment",
      note: "Harmonized with European Low Voltage Directive (LVD) standards.",
      compatibleMarkets: ["European Union", "GCC", "ASEAN", "Australia"]
    },
    citizenCard: {
      headline: "Electric Iron (Press) Verification",
      mandatoryMark: "ISI Mark with CM/L number on the rating plate",
      safetyRisk: "Defective thermostats cause soleplates to overheat and ignite clothes, causing residential fires.",
      labelInstruction: "Check the rating label under the handle or heel rest for IS 302-2-3 and the 7-digit CML code.",
      actionTip: "Verify the manufacturer license on TrueMark Verifier before purchasing."
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
      baseMarkingFee: 62000,
      microConcessionPercent: 50,
      smallConcessionPercent: 20,
      womenStartupConcessionPercent: 50
    },
    documentationRequired: [
      "Thermostat calibration bench records",
      "High voltage and earth leakage test rig certificates",
      "Factory wiring diagram and component supplier declarations"
    ],
    consumerTip: "Ensure the iron has a flexible 3-core earthed power cable and a genuine ISI certification mark."
  },
  {
    id: "IS-2347",
    isCode: "IS 2347:2017",
    title: "Domestic Pressure Cookers - Specification",
    category: "Mechanical & Cookware",
    keywords: ["pressure cooker", "cooker", "aluminium cooker", "stainless steel cooker", "safety valve"],
    colloquialTerms: ["cooker", "pressure cooker", "chulha cooker", "dal cooker", "handi cooker"],
    scheme: "Scheme-I (ISI Mark)",
    schemeCode: "SCHEME_1",
    mandatoryQCO: true,
    qcoNotification: "Domestic Pressure Cooker (Quality Control) Order, 2020",
    qcoDate: "Mandatory from 1st Feb 2021",
    gazetteNotification: {
      order: "Domestic Pressure Cooker (Quality Control) Order, 2020",
      ministry: "DPIIT, Ministry of Commerce and Industry",
      date: "21-January-2020",
      gazetteRef: "S.O. 293(E)"
    },
    description: "Specifies material purity, hydrostatic pressure bursting threshold (up to 3x operating pressure), thermal safety plug melting, and gasket release system.",
    keyTests: [
      "Hydrostatic Pressure Test (Body must withstand min 300 kPa without permanent deformation)",
      "Safety Valve / Fusible Plug Melting Temperature Verification (120°C - 140°C)",
      "Gasket Release Mechanism Pressure Venting Test",
      "Food-grade Contact Purity Assay (Lead, Cadmium release limits)"
    ],
    globalHarmonization: {
      standard: "BS EN 12778:2002 / UL 136",
      org: "British Standards / Underwriters Laboratories",
      exportEquivalence: "90% Alignment (Pressure Cookware Safety)",
      note: "Accepted in UK and North America with supplementary UL safety testing.",
      compatibleMarkets: ["United Kingdom", "United States", "Middle East"]
    },
    citizenCard: {
      headline: "Pressure Cooker Safety Check",
      mandatoryMark: "Permanent embossed ISI Mark on bottom exterior and cooker lid",
      safetyRisk: "Inferior spurious safety valves fail to release excess steam, leading to devastating kitchen explosions.",
      labelInstruction: "Inspect both the cooker body bottom and the lid. Both must carry the IS 2347 mark and CM/L license.",
      actionTip: "Never buy replacement fusible valves from roadside unauthorized vendors."
    },
    labsAvailable: [
      { name: "BIS Central Laboratory", city: "Sahibabad", state: "Uttar Pradesh" },
      { name: "National Test House (NTH)", city: "Alipore, Kolkata", state: "West Bengal" },
      { name: "CIPET", city: "Chennai", state: "Tamil Nadu" }
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
      "Virgin aluminium or stainless steel raw material mill certificates",
      "Hydrostatic burst pressure test apparatus in factory lab",
      "Safety valve batch sampling test protocols"
    ],
    consumerTip: "Never purchase uncertified pressure cookers from local markets. Unmarked cookers have exploded and caused severe burn injuries."
  }
];

export const SCHEMES_INFO = [
  {
    code: "SCHEME_1",
    name: "Scheme-I (ISI Mark Scheme)",
    target: "Domestic Manufacturers for Mandatory & Voluntary Industrial and Consumer Goods",
    badge: "ISI Mark",
    description: "Statutory product certification requiring rigorous in-house factory testing capabilities, on-site BIS officer factory verification, independent NABL sample testing, and ongoing market surveillance.",
    steps: [
      "1. Online Application submission on Manakonline with requisite documents & ₹1,000 fee",
      "2. BIS Officer conducts comprehensive Factory Audit & verification of testing machinery",
      "3. Drawing of sample by BIS officer & sealed dispatch to BIS recognized testing lab",
      "4. Scrutiny of factory audit report and independent lab test report",
      "5. Grant of License (CML Number) & permission to print ISI mark on products"
    ],
    concessions: "50% for Micro Enterprises & Startups, 20% for Small Enterprises"
  },
  {
    code: "SCHEME_CRS",
    name: "Scheme-II (Compulsory Registration Scheme - CRS)",
    target: "Electronics & Information Technology Goods (MeitY / Ministry of Power)",
    badge: "CRS Registration",
    description: "Simplified conformity assessment based on self-declaration and third-party laboratory test reports without mandatory prior factory physical audits.",
    steps: [
      "1. Submit production sample to BIS recognized NABL test lab in India",
      "2. Receive passing test report (valid for 90 days)",
      "3. Submit online application on BIS CRS portal with test report & brand proof",
      "4. Verification by BIS CRS team & grant of Unique Registration Number (R-XXXXXXXX)"
    ],
    concessions: "Direct fast-track registration within 20 working days"
  },
  {
    code: "SCHEME_HALLMARK",
    name: "Scheme-IV (Hallmarking Scheme - Gold & Silver)",
    target: "Jewellers, Assaying & Hallmarking Centres (AHCs)",
    badge: "6-Digit HUID",
    description: "Third-party assessment of purity in precious metals according to IS 1417 (Gold) and IS 2112 (Silver) using laser-engraved 6-digit alphanumeric HUID codes.",
    steps: [
      "1. Jeweller registers on Manakonline (Free for turnover under ₹5 Cr)",
      "2. Jeweller sends manufactured jewellery batch to BIS Recognized AHC",
      "3. AHC tests purity using fire assay / XRF and laser engraves the 6-digit HUID",
      "4. HUID synced to central BIS Care server for instant consumer mobile verification"
    ],
    concessions: "Zero registration fee for MSME turnover < ₹5 Crore"
  },
  {
    code: "SCHEME_FMCS",
    name: "FMCS (Foreign Manufacturers Certification Scheme)",
    target: "Overseas Exporters & International Factories Supplying Goods to India",
    badge: "FMCS Global",
    description: "Specialized licensing scheme granting foreign manufacturing units permission to use the ISI mark on goods entering Indian customs ports, requiring physical inspection by BIS auditors abroad and Authorized Indian Representative (AIR) designation.",
    steps: [
      "1. Nomination of Authorized Indian Representative (AIR) residing in India",
      "2. Submission of Form-VI on Manakonline with factory layout & calibration records",
      "3. Overseas Factory Audit by BIS technical auditors with international travel clearance",
      "4. Independent sample extraction and dispatch to BIS recognized Indian testing lab",
      "5. Execution of Performance Bank Guarantee (PBG) & Grant of License (CML Number)"
    ],
    concessions: "Fast-track air-freight sample clearance under DGFT customs window"
  }
];

export const NABL_LABS_DIRECTORY = [
  {
    id: "LAB-01",
    name: "BIS Central Laboratory",
    accreditationCode: "NABL TC-5012 / BIS-CL-01",
    city: "Sahibabad, Ghaziabad",
    state: "Uttar Pradesh",
    region: "North",
    lat: 28.6692,
    lng: 77.3489,
    applicableStandards: ["IS 2082:2018", "IS 368:2014", "IS 9873 (Part 1):2019", "IS 4151:2020", "IS 302 (Part 2/Sec 3):2007", "IS 2347:2017"],
    scopes: ["Electrical Appliances & Geysers", "Mechanical Safety & Toys", "Two-Wheeler Helmets", "Domestic Cookware"],
    turnaroundTime: "7 - 10 working days",
    contactPerson: "Dr. R. K. Sharma (Joint Director)",
    phone: "+91-120-2776031",
    email: "cl@bis.gov.in",
    address: "Plot No. 20/9, Site IV, Sahibabad Industrial Area, Ghaziabad, UP - 201010",
    accreditationValidity: "Valid up to 31-Dec-2028"
  },
  {
    id: "LAB-02",
    name: "Electrical Research and Development Association (ERDA)",
    accreditationCode: "NABL TC-5231 / ERDA-VAD",
    city: "Vadodara",
    state: "Gujarat",
    region: "West",
    lat: 22.3072,
    lng: 73.1812,
    applicableStandards: ["IS 2082:2018", "IS 368:2014", "IS 1293:2019", "IS 302 (Part 2/Sec 3):2007"],
    scopes: ["High Voltage Insulation", "Plugs & Sockets Glow Wire Testing", "Heaters & Geysers", "Switchgear"],
    turnaroundTime: "5 - 8 working days",
    contactPerson: "Er. Bhavesh Patel (Head of Testing)",
    phone: "+91-265-2642942",
    email: "erda@erda.org",
    address: "ERDA Road, GIDC Makarpura, Vadodara, Gujarat - 390010",
    accreditationValidity: "Valid up to 15-Oct-2027"
  },
  {
    id: "LAB-03",
    name: "Central Power Research Institute (CPRI)",
    accreditationCode: "NABL TC-5089 / CPRI-BLR",
    city: "Bengaluru",
    state: "Karnataka",
    region: "South",
    lat: 13.0134,
    lng: 77.5806,
    applicableStandards: ["IS 2082:2018", "IS 1293:2019", "IS 302 (Part 2/Sec 3):2007"],
    scopes: ["Short Circuit Testing", "Dielectric Breakdown", "Energy Efficiency (BEE)", "Plugs & Sockets"],
    turnaroundTime: "8 - 12 working days",
    contactPerson: "Dr. K. S. Murthy (Chief Scientist)",
    phone: "+91-80-22072222",
    email: "cpri@cpri.in",
    address: "Prof. Sir C.V. Raman Road, Sadashivanagar, Bengaluru, Karnataka - 560080",
    accreditationValidity: "Valid up to 30-Nov-2028"
  },
  {
    id: "LAB-04",
    name: "National Test House (NTH Alipore)",
    accreditationCode: "NABL TC-5001 / NTH-ER",
    city: "Alipore, Kolkata",
    state: "West Bengal",
    region: "East",
    lat: 22.5312,
    lng: 88.3325,
    applicableStandards: ["IS 1786:2008", "IS 12269:2013", "IS 14543:2016", "IS 2347:2017", "IS 2082:2018"],
    scopes: ["TMT Rebar Tensile & Bend", "Cement Compressive Testing", "Water Microbiology", "Chemical Metallurgy"],
    turnaroundTime: "6 - 9 working days",
    contactPerson: "Dr. S. K. Banerjee (Director NTH)",
    phone: "+91-33-24791221",
    email: "nth-cal@nic.in",
    address: "11/1, Judges Court Road, Alipore, Kolkata, West Bengal - 700027",
    accreditationValidity: "Valid up to 31-Aug-2029"
  },
  {
    id: "LAB-05",
    name: "Automotive Research Association of India (ARAI)",
    accreditationCode: "NABL TC-5420 / ARAI-PUN",
    city: "Pune",
    state: "Maharashtra",
    region: "West",
    lat: 18.5204,
    lng: 73.8567,
    applicableStandards: ["IS 4151:2020"],
    scopes: ["Helmet Shock Absorption Drop Tower", "Chin Strap Dynamic Retention", "Visor Transmittance", "Crash Dynamics"],
    turnaroundTime: "5 - 7 working days",
    contactPerson: "Mr. Anand Deshpande (Sr. Deputy Director)",
    phone: "+91-20-30231111",
    email: "director@araiindia.com",
    address: "Survey No. 102, Vetal Hill, Off Paud Road, Kothrud, Pune, Maharashtra - 411038",
    accreditationValidity: "Valid up to 30-Jun-2028"
  },
  {
    id: "LAB-06",
    name: "International Centre for Automotive Technology (ICAT)",
    accreditationCode: "NABL TC-5788 / ICAT-NCR",
    city: "Manesar, Gurugram",
    state: "Haryana",
    region: "North",
    lat: 28.3588,
    lng: 76.9419,
    applicableStandards: ["IS 4151:2020"],
    scopes: ["Two-Wheeler Helmets", "Automotive Electricals", "Impact Biomechanics"],
    turnaroundTime: "6 - 8 working days",
    contactPerson: "Er. Dinesh Tyagi (Director)",
    phone: "+91-124-4586111",
    email: "icat@icat.ac.in",
    address: "Plot 26, Sector 3, HSIIDC IMT Manesar, Gurugram, Haryana - 122050",
    accreditationValidity: "Valid up to 31-Mar-2027"
  },
  {
    id: "LAB-07",
    name: "UL India Testing Laboratory",
    accreditationCode: "NABL TC-6102 / UL-BLR",
    city: "Bengaluru",
    state: "Karnataka",
    region: "South",
    lat: 12.9815,
    lng: 77.7289,
    applicableStandards: ["IS 13252 (Part 1):2010"],
    scopes: ["IT Equipment Safety (CRS)", "Laptops & Chargers", "Creepage Distance & Shock Energy", "CB Scheme Reports"],
    turnaroundTime: "5 - 7 working days",
    contactPerson: "Mr. Suresh Sugavanam (VP South Asia)",
    phone: "+91-80-41384400",
    email: "infoul@ul.com",
    address: "Kalyani Tech Park, Whitefield, Bengaluru, Karnataka - 560066",
    accreditationValidity: "Valid up to 31-Dec-2028"
  },
  {
    id: "LAB-08",
    name: "National Council for Cement and Building Materials (NCCBM)",
    accreditationCode: "NABL TC-5120 / NCCBM-BLB",
    city: "Ballabgarh, Faridabad",
    state: "Haryana",
    region: "North",
    lat: 28.3415,
    lng: 77.3242,
    applicableStandards: ["IS 12269:2013"],
    scopes: ["53 Grade Cement Compressive Strength", "Vicat Setting Times", "Le-Chatelier Soundness", "Autoclave Expansion"],
    turnaroundTime: "28 working days (Standard Curing Period)",
    contactPerson: "Dr. B. N. Mohapatra (Director General)",
    phone: "+91-129-4217100",
    email: "nccbm@ncbindia.com",
    address: "34 Km Stone, Delhi-Mathura Road (NH-2), Ballabgarh, Faridabad, Haryana - 121004",
    accreditationValidity: "Valid up to 30-Nov-2027"
  },
  {
    id: "LAB-09",
    name: "CSIR-National Metallurgical Laboratory (NML)",
    accreditationCode: "NABL TC-5045 / NML-JSR",
    city: "Jamshedpur",
    state: "Jharkhand",
    region: "East",
    lat: 22.8046,
    lng: 86.2029,
    applicableStandards: ["IS 1786:2008"],
    scopes: ["TMT Rebar Yield & Proof Stress", "Fatigue & Ductility", "Optical Emission Spectrometry", "Microstructural Rib Analysis"],
    turnaroundTime: "5 - 7 working days",
    contactPerson: "Dr. Indranil Chattoraj (Director)",
    phone: "+91-657-2345115",
    email: "director@nmlindia.org",
    address: "Burmamines, Jamshedpur, Jharkhand - 831007",
    accreditationValidity: "Valid up to 15-May-2028"
  },
  {
    id: "LAB-10",
    name: "TUV Rheinland India Testing Center",
    accreditationCode: "NABL TC-5881 / TUV-GGN",
    city: "Gurugram",
    state: "Haryana",
    region: "North",
    lat: 28.4595,
    lng: 77.0266,
    applicableStandards: ["IS 9873 (Part 1):2019", "IS 13252 (Part 1):2010"],
    scopes: ["Toy Mechanical & Physical Tests", "Choking Hazard Cylinders", "Heavy Metal Migration (ICP)", "CRS Electronics"],
    turnaroundTime: "6 - 9 working days",
    contactPerson: "Ms. Anjali Sen (Lab Manager)",
    phone: "+91-124-4903300",
    email: "info@ind.tuv.com",
    address: "Plot 27, Udyog Vihar Phase IV, Gurugram, Haryana - 122015",
    accreditationValidity: "Valid up to 31-Oct-2028"
  },
  {
    id: "LAB-11",
    name: "BIS Western Regional Laboratory",
    accreditationCode: "NABL TC-5022 / BIS-WR-MUM",
    city: "Andheri East, Mumbai",
    state: "Maharashtra",
    region: "West",
    lat: 19.1136,
    lng: 72.8697,
    applicableStandards: ["IS 14543:2016", "IS 2082:2018", "IS 1293:2019", "IS 2347:2017"],
    scopes: ["Packaged Water Microbiological Safety", "Pesticide Residue GC-MS", "Cookware Burst Pressure", "Plugs & Sockets"],
    turnaroundTime: "7 - 10 working days",
    contactPerson: "Mr. V. K. Jain (Scientist-F & Head)",
    phone: "+91-22-28329295",
    email: "wrl@bis.gov.in",
    address: "Manakalaya, E-9, MIDC, Andheri (East), Mumbai, Maharashtra - 400093",
    accreditationValidity: "Valid up to 31-Dec-2028"
  },
  {
    id: "LAB-12",
    name: "SAMEER Centre for Electromagnetics",
    accreditationCode: "NABL TC-5310 / SAMEER-CHE",
    city: "Taramani, Chennai",
    state: "Tamil Nadu",
    region: "South",
    lat: 12.9863,
    lng: 80.2432,
    applicableStandards: ["IS 13252 (Part 1):2010"],
    scopes: ["Electronics Safety & EMI/EMC", "RF Radiation & Telecommunication Equipment", "CRS IT Goods"],
    turnaroundTime: "5 - 8 working days",
    contactPerson: "Dr. S. S. Rao (Program Director)",
    phone: "+91-44-22541817",
    email: "director@sameer.gov.in",
    address: "CIT Campus, 2nd Cross Road, Taramani, Chennai, Tamil Nadu - 600113",
    accreditationValidity: "Valid up to 31-Dec-2027"
  }
];

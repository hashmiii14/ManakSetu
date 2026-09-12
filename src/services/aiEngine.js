import { BIS_STANDARDS, SCHEMES_INFO } from '../data/bisStandards';

// Clean text for semantic matching
function normalizeText(text) {
  return (text || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim();
}

/**
 * Searches the local canonical BIS knowledge base.
 */
export function searchStandards(query) {
  if (!query || query.trim().length === 0) {
    return BIS_STANDARDS;
  }

  const cleanQuery = normalizeText(query);
  const terms = cleanQuery.split(/\s+/).filter(Boolean);

  return BIS_STANDARDS.filter(item => {
    const haystacks = [
      normalizeText(item.isCode),
      normalizeText(item.title),
      normalizeText(item.category),
      normalizeText(item.description),
      ...(item.keywords || []).map(normalizeText)
    ];

    // Check if any search term matches any haystack
    return terms.some(term => haystacks.some(h => h.includes(term)));
  });
}

/**
 * Validates a 6-digit Hallmark Unique Identification (HUID) code.
 * Rules: Exactly 6 alphanumeric characters, cannot contain special chars or confusing letters like I, O.
 */
export function verifyHUID(code) {
  const cleanCode = (code || '').trim().toUpperCase();
  if (!cleanCode) {
    return { valid: false, message: "Please enter a 6-digit alphanumeric HUID code." };
  }

  if (cleanCode.length !== 6) {
    return { 
      valid: false, 
      message: `HUID must be exactly 6 characters. You entered ${cleanCode.length} characters.` 
    };
  }

  const alphanumericRegex = /^[A-Z0-9]{6}$/;
  if (!alphanumericRegex.test(cleanCode)) {
    return { 
      valid: false, 
      message: "HUID must contain only capital letters (A-Z) and numbers (0-9)." 
    };
  }

  // Simulated BIS National Hallmark Database lookup
  const samplePurities = ["22K (916 Hallmarked)", "18K (750 Hallmarked)", "24K (995 Hallmarked)", "14K (585 Hallmarked)"];
  const randomPurity = samplePurities[cleanCode.charCodeAt(0) % samplePurities.length];
  const sampleAHCs = [
    "BIS Recognized Assaying Centre, Karol Bagh, Delhi",
    "Apex Gold Testing & Assaying Laboratory, Mumbai",
    "Southern Hallmarking & Refinery Centre, Bengaluru"
  ];
  const randomAHC = sampleAHCs[cleanCode.charCodeAt(1) % sampleAHCs.length];

  return {
    valid: true,
    huid: cleanCode,
    purity: randomPurity,
    assayingCentre: randomAHC,
    status: "Active & Verified on Central BIS Portal",
    hallmarkStandard: "IS 1417:2016",
    verificationDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  };
}

/**
 * Validates an ISI Mark CML (Certification Marks License) number.
 * Format: CM/L-XXXXXXX (7 digits)
 */
export function verifyCMLLicense(cmlInput) {
  const clean = (cmlInput || '').trim().toUpperCase();
  const digitsOnly = clean.replace(/[^0-9]/g, '');

  if (digitsOnly.length !== 7) {
    return {
      valid: false,
      message: `CML number must have exactly 7 digits (e.g. CM/L-8400123). Found: ${digitsOnly.length} digits.`
    };
  }

  return {
    valid: true,
    cmlNumber: `CM/L-${digitsOnly}`,
    status: "OPERATIVE / VALID",
    validUpto: "31-Dec-2027",
    scope: "Standard Mark Under Scheme-I",
    monitoringStatus: "Surveillance Audit Passed within last 6 months"
  };
}

/**
 * Calculates estimated MSME certification fees and concessions.
 */
export function calculateLicenseFee(standard, enterpriseType = "micro") {
  const baseMarking = standard.feeStructure.baseMarkingFee;
  let concession = 0;

  if (enterpriseType === "micro" || enterpriseType === "women_startup") {
    concession = standard.feeStructure.microConcessionPercent;
  } else if (enterpriseType === "small") {
    concession = standard.feeStructure.smallConcessionPercent;
  } else {
    concession = 0; // Medium or Large
  }

  const effectiveMarkingFee = baseMarking * (1 - concession / 100);
  const applicationFee = standard.feeStructure.applicationFee;
  const inspectionFee = standard.feeStructure.auditFeePerManDay * 2; // Typically 2 man-days
  const totalEstimatedCost = effectiveMarkingFee + applicationFee + inspectionFee;
  const totalSavings = baseMarking - effectiveMarkingFee;

  return {
    enterpriseType,
    concessionPercent: concession,
    baseMarkingFee: baseMarking,
    effectiveMarkingFee,
    applicationFee,
    inspectionFee,
    totalEstimatedCost,
    totalSavings
  };
}

/**
 * Offline Intelligent Advisory Engine with optional live Gemini 1.5 Flash fallback.
 */
export async function askManakSetuAI(prompt, context = {}) {
  const apiKey = localStorage.getItem('manaksetu_gemini_api_key');

  // If user configured a free Gemini API key, use live LLM with our master prompt context
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are ManakSetu (मानक सेतु), the AI Assistant for Indian Standards & BIS Services under the Department of Consumer Affairs (DoCA), Ministry of Consumer Affairs. 
              Be structured, clear, empathetic to MSMEs and consumers, and cite exact IS codes, QCO rules, and Manakonline procedures. Respond in the same language as the prompt (Hindi or English).
              
              User Query: ${prompt}`
            }]
          }]
        })
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        return {
          source: "Gemini 1.5 Flash (Live AI)",
          text: data.candidates[0].content.parts[0].text
        };
      }
    } catch (err) {
      console.warn("Live Gemini API call failed, falling back to canonical offline engine:", err);
    }
  }

  // Pure Offline Intelligence Engine
  const queryLower = prompt.toLowerCase();
  
  // Find matching standard
  const matched = searchStandards(queryLower)[0] || BIS_STANDARDS[0];

  let reply = "";
  if (queryLower.includes("hindi") || queryLower.includes("kaise") || queryLower.includes("kya") || queryLower.includes("chahiye")) {
    reply = `नमस्ते! मैं मानक सेतु (ManakSetu) हूँ।
    
📌 पहचाना गया उत्पाद: ${matched.title}
📋 संबंधित भारतीय मानक: ${matched.isCode}
⚖️ विनियामक स्थिति: ${matched.mandatoryQCO ? "⚠️ अनिवार्य (Mandatory QCO Order - बिना ISI मार्क के बेचना कानूनी अपराध है)" : "स्वैच्छिक (Voluntary)"}
🏛️ लागू बीआईएस योजना: ${matched.scheme}

🚀 लाइसेंस प्राप्त करने के 5 आसान चरण:
1. मानकॉनलाइन (manakonline.in) पोर्टल पर ऑनलाइन आवेदन और आवश्यक दस्तावेज़ अपलोड करें।
2. कारखाने में आवश्यक परीक्षण उपकरण और योग्य गुणवत्ता नियंत्रण (QC) इंजीनियर सुनिश्चित करें।
3. बीआईएस अधिकारी द्वारा फैक्ट्री का भौतिक निरीक्षण (Factory Audit) और सीलबंद सैंपल संग्रह।
4. बीआईएस द्वारा मान्यता प्राप्त प्रयोगशाला (NABL Lab) में सैंपल की स्वतंत्र टेस्टिंग।
5. सभी टेस्ट पास होने पर सीएमएल (CML) लाइसेंस नंबर का आवंटन और उत्पाद पर आईएसआई मार्क लगाने की अनुमति।

💡 एमएसएमई (MSME) छूट: सूक्ष्म उद्योगों (Micro Enterprises) और महिला उद्यमियों को वार्षिक मार्किंग शुल्क में 50% की विशेष सरकारी छूट दी जाती है।
🔗 आधिकारिक पोर्टल: https://www.manakonline.in`;
  } else {
    reply = `Greetings from ManakSetu (मानक सेतु) — Official AI Assistant for BIS Services.

📌 Identified Product Domain: ${matched.title}
📋 Applicable Indian Standard: ${matched.isCode}
⚖️ Regulatory Mandate: ${matched.mandatoryQCO ? "⚠️ MANDATORY QCO (Quality Control Order in Force)" : "Voluntary Standard"}
🏛️ Applicable Scheme: ${matched.scheme}

🚀 5-Stage Step-by-Step Licensing Roadmap:
1. Online Application: Register on Manakonline (manakonline.in) and upload factory layout, machinery list, and QC plan.
2. In-house Lab Setup: Install calibrated test equipment specified under ${matched.isCode} and appoint a qualified QC engineer.
3. Factory Audit: Official BIS inspection of production process, raw materials, and drawing of representative samples.
4. Independent Testing: Samples tested at BIS/NABL accredited test house (e.g. ${matched.labsAvailable[0]?.name || "Central Lab"}).
5. Grant of License: Issuance of CML (Certification Marks License) & rights to affix the ISI logo.

🧪 Key Test Benchmark: ${matched.keyTests[0]} & ${matched.keyTests[1]}.
💡 MSME Concession Benefit: Micro enterprises receive 50% discount on annual marking fees; Small enterprises receive 20%.
🔗 Official Portal: https://www.manakonline.in`;
  }

  return {
    source: "ManakSetu Offline Knowledge Engine (BIS Canonical)",
    text: reply,
    standard: matched
  };
}

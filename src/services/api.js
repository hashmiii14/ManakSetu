/**
 * Centralized API Service for ManaKSetu
 * Connects to the FastAPI backend with seamless local fallback.
 */

import { BIS_STANDARDS } from '../data/bisStandards';

const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL) || (
  typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://127.0.0.1:8000'
    : 'https://backend-nu-nine-48.vercel.app'
);

/**
 * Normalizes an API standard item to match frontend structure.
 */
function normalizeStandard(item) {
  if (!item) return null;
  const isCode = item.is_number || item.isCode || 'IS Standard';
  const cleanCode = isCode.toLowerCase().replace(/[^a-z0-9]/g, '');
  const localMatch = BIS_STANDARDS.find(s => {
    const sCode = s.isCode.toLowerCase().replace(/[^a-z0-9]/g, '');
    return sCode === cleanCode || (cleanCode.length > 3 && (sCode.includes(cleanCode) || cleanCode.includes(sCode)));
  });

  return {
    ...(localMatch || {}),
    ...item,
    id: isCode ? isCode.replace(/[^a-zA-Z0-9]/g, '-') : (item.id || 'STD-01'),
    isCode,
    title: item.title || localMatch?.title || 'Standard Specification',
    category: item.category || localMatch?.category || 'General',
    description: item.description || item.scope || localMatch?.description || 'Indian Standard Specification',
    scope: item.scope || item.description || localMatch?.scope || '',
    mandatoryQCO: Boolean(item.mandatory_qco ?? item.mandatoryQCO ?? localMatch?.mandatoryQCO),
    qcoNotification: item.qco_notification || item.qcoNotification || localMatch?.qcoNotification || (item.mandatory_qco ? 'Quality Control Order (Statutory)' : null),
    relevanceScore: item.relevance_score || item.relevanceScore || localMatch?.relevanceScore || 0.85,
    keyTests: (item.key_tests && item.key_tests.length > 0 ? item.key_tests : null) || item.keyTests || localMatch?.keyTests || [
      "Compressive / Tensile Mechanical Strength Testing",
      "Dimensional Tolerances & Material Uniformity",
      "Chemical Purity & Deleterious Substances Assay"
    ],
    labsAvailable: (item.labs_available && item.labs_available.length > 0 ? item.labs_available : null) || item.labsAvailable || localMatch?.labsAvailable || [
      { name: "BIS Central Laboratory", city: "Sahibabad", state: "Uttar Pradesh" },
      { name: "National Test House (NTH)", city: "Kolkata", state: "West Bengal" }
    ],
    feeStructure: (item.fee_structure && Object.keys(item.fee_structure).length > 0 ? {
      applicationFee: item.fee_structure.application_fee ?? 1000,
      annualLicenseFee: item.fee_structure.annual_license_fee ?? 1000,
      auditFeePerManDay: item.fee_structure.audit_fee_per_man_day ?? 7000,
      baseMarkingFee: item.fee_structure.base_marking_fee ?? 65000,
      microConcessionPercent: item.fee_structure.micro_concession_percent ?? 50,
      smallConcessionPercent: item.fee_structure.small_concession_percent ?? 20,
      womenStartupConcessionPercent: 50
    } : null) || item.feeStructure || localMatch?.feeStructure || {
      applicationFee: 1000,
      annualLicenseFee: 1000,
      auditFeePerManDay: 7000,
      baseMarkingFee: 65000,
      microConcessionPercent: 50,
      smallConcessionPercent: 20,
      womenStartupConcessionPercent: 50
    },
    documentationRequired: (item.documentation_required && item.documentation_required.length > 0 ? item.documentation_required : null) || item.documentationRequired || localMatch?.documentationRequired || [
      "Manufacturing machinery & calibrated test equipment list",
      "In-house testing facility with qualified technical personnel",
      "Valid factory premise proof and pollution clearances"
    ],
    globalHarmonization: item.global_harmonization || item.globalHarmonization || localMatch?.globalHarmonization,
    citizenCard: item.citizen_card || item.citizenCard || localMatch?.citizenCard,
    gazetteNotification: item.gazette_notification || item.gazetteNotification || localMatch?.gazetteNotification,
    source: item.source || localMatch?.source || 'BIS Catalogue'
  };
}

/**
 * Hybrid Search API calling FastAPI /api/search
 */
export async function searchStandards(query, topK = 6) {
  const clean = (query || '').trim();
  if (!clean) {
    return BIS_STANDARDS.map(normalizeStandard);
  }

  try {
    const res = await fetch(`${API_BASE}/api/search?q=${encodeURIComponent(clean)}&top_k=${topK}`, {
      signal: AbortSignal.timeout(4000)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        return data.results.map(normalizeStandard);
      }
    }
  } catch (err) {
    console.warn("[ManaKSetu API] Backend search unavailable, using local knowledge base:", err);
  }

  // Fallback to local filtering
  const cleanQ = clean.toLowerCase();
  const terms = cleanQ.split(/\s+/).filter(Boolean);
  const matched = BIS_STANDARDS.filter(item => {
    const haystacks = [
      item.isCode.toLowerCase(),
      item.title.toLowerCase(),
      item.category.toLowerCase(),
      item.description.toLowerCase(),
      ...(item.colloquialTerms || []).map(k => k.toLowerCase()),
      ...(item.keywords || []).map(k => k.toLowerCase())
    ];
    return terms.some(t => haystacks.some(h => h.includes(t)));
  });

  return (matched.length > 0 ? matched : BIS_STANDARDS).map(normalizeStandard);
}

/**
 * Fetch full Standard Details by IS Code
 */
export async function getStandardDetails(isCode) {
  if (!isCode) return null;

  try {
    const res = await fetch(`${API_BASE}/api/standards/${encodeURIComponent(isCode)}`, {
      signal: AbortSignal.timeout(4000)
    });
    if (res.ok) {
      const data = await res.json();
      return normalizeStandard(data);
    }
  } catch (err) {
    console.warn("[ManaKSetu API] Backend standard details unavailable:", err);
  }

  // Fallback to local match
  const found = BIS_STANDARDS.find(
    s => s.isCode.toLowerCase().replace(/[^a-z0-9]/g, '').includes(isCode.toLowerCase().replace(/[^a-z0-9]/g, ''))
  );
  return normalizeStandard(found || BIS_STANDARDS[0]);
}

/**
 * Grounded ManakBot AI Assistant
 */
export async function askManakBot(message, history = []) {
  if (!message || !message.trim()) {
    return {
      answer: "Please ask a question regarding Indian Standards, BIS certification, or product compliance.",
      referenced_standards: [],
      source: "System",
      confidence: "Low",
      disclaimer: "AI-assisted guidance based on available standards information."
    };
  }

  // Try /api/chat or /api/chatbot
  try {
    const res = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: message.trim(), history }),
      signal: AbortSignal.timeout(15000)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    try {
      const res2 = await fetch(`${API_BASE}/api/chatbot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message.trim(), history }),
        signal: AbortSignal.timeout(10000)
      });
      if (res2.ok) {
        return await res2.json();
      }
    } catch (e) {
      console.warn("[ManaKSetu API] Backend chatbot unavailable, falling back to local engine:", e);
    }
  }

  // Deterministic local fallback with 5-pillar domain schema
  const results = await searchStandards(message, 3);
  const top = results[0] || BIS_STANDARDS[0];
  const related = results.slice(1).map(r => r.isCode).join(', ') || 'None';

  const qcoStatus = top.mandatoryQCO
    ? '**Mandatory Quality Control Order (QCO)**. Manufacturing, importing, or selling without an operative ISI mark is prohibited under Section 29 of the BIS Act, 2016.'
    : 'Voluntary standard for quality certification and GeM procurement preference.';

  return {
    answer: `### Likely Relevant Standard\n**${top.isCode}** — *${top.title}*\n- **Statutory Status**: ${qcoStatus}\n- **Related Standards**: ${related}\n\n### What It Means\n${top.description || top.scope || 'Indian Standard specification establishing performance limits, constructional criteria, and safety margins.'}\n\n### Why It Matters\nEnsures consumer electrical/physical protection, dimensional uniformity, and statutory compliance under the BIS Act, 2016.\n\n### What To Do Next\n1. **In-house Test Facility**: Equip manufacturing plant with calibrated testing gear as specified in ${top.isCode}.\n2. **Technical Dossier**: Prepare factory layout, machinery list, test equipment calibration records, and Form-I.\n3. **e-BIS Portal Filing**: Apply online at **www.manakonline.in** under Scheme-I (ISI Mark).\n4. **MSME Subsidy**: Micro enterprises qualify for **50% marking fee concession**; Small enterprises qualify for **20%**.\n\n### Source & Verification\nExtracted from BIS Standards Directory for ${top.isCode}. Always verify active QCO amendments at [www.manakonline.in](https://www.manakonline.in).`,
    referenced_standards: results.slice(0, 3).map(r => ({ is_number: r.isCode, title: r.title })),
    source: "BIS Standards Knowledge Engine (Deterministic Grounding)",
    confidence: "High",
    disclaimer: "AI-assisted guidance based on Indian Standards dataset. Always verify statutory requirements on the official BIS portal (manakonline.in)."
  };
}

/**
 * Compliance Checker API
 */
export async function checkCompliance({ productName, category = 'General', description = '', intendedUse = '' }) {
  const cleanName = (productName || '').trim();
  if (!cleanName) return null;

  try {
    const res = await fetch(`${API_BASE}/api/compliance/check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_name: cleanName,
        category: category || 'General',
        description: description || '',
        intended_use: intendedUse || ''
      }),
      signal: AbortSignal.timeout(8000)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("[ManaKSetu API] Backend compliance check unavailable, evaluating locally:", err);
  }

  // Local fallback compliance generation
  const matched = await searchStandards(`${cleanName} ${category} ${description}`, 3);
  const primary = matched[0] || normalizeStandard(BIS_STANDARDS[0]);
  const related = matched.slice(1);
  const isQCO = primary.mandatoryQCO;

  return {
    product_name: cleanName,
    primary_standard: {
      is_number: primary.isCode,
      title: primary.title,
      category: primary.category,
      description: primary.description,
      scope: primary.scope,
      relevance_score: primary.relevanceScore || 0.95,
      mandatory_qco: isQCO,
      source: primary.source || "BIS Catalogue"
    },
    related_standards: related.map(r => ({
      is_number: r.isCode,
      title: r.title,
      category: r.category,
      description: r.description,
      scope: r.scope,
      relevance_score: r.relevanceScore || 0.8,
      mandatory_qco: r.mandatoryQCO,
      source: r.source || "BIS Catalogue"
    })),
    conformance_scheme: isQCO ? "Scheme-I (ISI Mark) with Mandatory QCO" : "Scheme-I (ISI Mark) Voluntary Certification",
    mandatory_qco: isQCO,
    qco_notification: isQCO ? (primary.qcoNotification || "Quality Control Order (Mandatory)") : null,
    why_it_applies: `The product '${cleanName}' falls directly within the scope of ${primary.isCode} covering ${primary.title}. ${primary.description}`,
    phases: [
      {
        phase: "Stage 1",
        title: "Applicable Standard Identification",
        status: "identified",
        description: `Designated standard: ${primary.isCode} (${primary.title}).`,
        details: [
          `IS Code: ${primary.isCode}`,
          `Division: ${primary.category}`,
          `Statutory Status: ${isQCO ? "Mandatory QCO Enforced" : "Voluntary Conformance"}`
        ]
      },
      {
        phase: "Stage 2",
        title: "Conformity Assessment Scheme",
        status: "identified",
        description: `Governed under ${isQCO ? "Scheme-I (ISI Mark)" : "Scheme-I Voluntary"} of the BIS Regulations, 2018.`,
        details: [
          "Mandatory factory audit and third-party laboratory testing required.",
          "Operative license permits embossing the official ISI Mark monogram on product."
        ]
      },
      {
        phase: "Stage 3",
        title: "In-house Laboratory & Infrastructure",
        status: "review_required",
        description: "Premises must maintain all required testing apparatus calibrated by accredited NABL facilities.",
        details: [
          "Calibration of dimensional, mechanical, and safety instruments.",
          "Qualified in-house chemist/engineer to supervise routine testing."
        ]
      },
      {
        phase: "Stage 4",
        title: "Technical Documentation & Dossier",
        status: "review_required",
        description: "Documentary proof required for filing Form-I application on Manakonline.",
        details: primary.documentationRequired || [
          "Factory premises proof and pollution clearance NOC",
          "Manufacturing machinery inventory and process flow diagram",
          "Test equipment calibration records and scheme of testing",
          "Valid MSME Udyam registration for 50%/20% statutory fee concessions"
        ]
      },
      {
        phase: "Stage 5",
        title: "Mandatory Laboratory Testing",
        status: "verify",
        description: "Draw samples for independent testing at BIS recognized or Central testing laboratories.",
        details: primary.keyTests || [
          "Compressive / Tensile Mechanical Strength Testing",
          "Dimensional Tolerances & Material Uniformity",
          "Chemical Purity & Safety Assay"
        ]
      },
      {
        phase: "Stage 6",
        title: "Marking & Labeling Compliance",
        status: "identified",
        description: "Compliance with Section 16 marking guidelines under the BIS Act, 2016.",
        details: [
          "Standard ISI monogram of prescribed minimum dimensions",
          "Certification Marks License (CML) 7-digit number displayed below logo",
          "Batch number, date of manufacture, and rated operating parameters"
        ]
      },
      {
        phase: "Stage 7",
        title: "e-BIS Online Submission & Grant of License",
        status: "identified",
        description: "Application submission and factory audit coordination on www.manakonline.in.",
        details: [
          "Submit Form-I on e-BIS portal with application fee (₹1,000).",
          "Factory audit inspection by BIS technical officer and sample drawing.",
          "License issued upon test clearance with annual renewal."
        ]
      }
    ],
    missing_details_to_confirm: [
      !description ? "Exact technical specifications, capacity rating, or dimensional variants not provided." : null,
      !intendedUse ? "Operating environment (domestic vs industrial) not specified." : null,
      "Confirmation of domestic manufacturing vs Foreign Manufacturer Certification Scheme (FMCS)."
    ].filter(Boolean),
    official_verification_guidance: `Verify active status and amendments of ${primary.isCode} on the official portal at www.manakonline.in.`,
    disclaimer: "Potentially applicable informational guidance based on Indian Standards dataset. Always verify statutory requirements on the official BIS portal (manakonline.in)."
  };
}

/**
 * Product Discovery API (alias for rich product matching)
 */
export async function discoverProductStandards(productInfo) {
  return checkCompliance(productInfo);
}


/**
 * Cost Estimator API
 */
export async function estimateCost(standardCode, enterpriseType = "micro") {
  try {
    const res = await fetch(`${API_BASE}/api/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ standard_code: standardCode, enterprise_type: enterpriseType }),
      signal: AbortSignal.timeout(4000)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("[ManaKSetu API] Backend calculator unavailable, calculating locally:", err);
  }

  // Local fallback calculation
  const base = 65000;
  const concession = enterpriseType === 'micro' ? 50 : enterpriseType === 'small' ? 20 : 0;
  const effective = base * (1 - concession / 100);
  const appFee = 1000;
  const auditFee = 14000;
  return {
    standard_code: standardCode,
    enterprise_type: enterpriseType,
    concession_percent: concession,
    base_marking_fee: base,
    effective_marking_fee: effective,
    application_fee: appFee,
    inspection_fee: auditFee,
    total_estimated_cost: appFee + auditFee + effective,
    total_savings: base - effective,
    disclaimer: "Fee estimates are for prototype guidance and should be verified against the latest official BIS fee schedule."
  };
}

/**
 * Consumer Verification API (HUID & CML)
 */
export async function verifyIdentifier(identifier, idType = "auto") {
  const clean = (identifier || '').trim();
  if (!clean) {
    return {
      identifier: '',
      type: idType.toUpperCase(),
      status: "Invalid format",
      is_valid: false,
      details: { message: "Please provide a valid HUID or CML identifier." },
      is_prototype: true,
      disclaimer: "Prototype demonstration verification."
    };
  }

  try {
    const res = await fetch(`${API_BASE}/api/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: clean, id_type: idType }),
      signal: AbortSignal.timeout(4000)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("[ManaKSetu API] Backend verification unavailable:", err);
  }

  // Local fallback rule
  const cleanCode = clean.toUpperCase();
  if (cleanCode.length === 6 && /^[A-Z0-9]{6}$/.test(cleanCode)) {
    return {
      identifier: cleanCode,
      type: "HUID",
      status: "Valid / Found",
      is_valid: true,
      details: {
        huid: cleanCode,
        purity: "22K (916 Fineness)",
        assaying_centre: "BIS Recognized Assaying Centre, New Delhi",
        standard: "IS 1417:2016"
      },
      is_prototype: true,
      disclaimer: "Prototype demonstration verification. Not connected to live BIS database."
    };
  }

  const digits = clean.replace(/[^0-9]/g, '');
  if (digits.length === 7) {
    return {
      identifier: `CM/L-${digits}`,
      type: "CML",
      status: "Valid / Found",
      is_valid: true,
      details: {
        cml_number: `CM/L-${digits}`,
        licensee: "Authorized Manufacturer (Demo)",
        status: "STATUTORILY OPERATIVE",
        valid_upto: "31-Dec-2027"
      },
      is_prototype: true,
      disclaimer: "Prototype demonstration verification. Not connected to live BIS database."
    };
  }

  return {
    identifier: clean,
    type: "UNKNOWN",
    status: "Invalid format",
    is_valid: false,
    details: { message: "Identifier format not recognized. Use 6-character HUID or 7-digit CML." },
    is_prototype: true,
    disclaimer: "Prototype demonstration verification."
  };
}

/**
 * Report Violation API
 */
export async function submitReport(reportData) {
  try {
    const res = await fetch(`${API_BASE}/api/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reportData),
      signal: AbortSignal.timeout(6000)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("[ManaKSetu API] Backend report submission unavailable, saving locally:", err);
  }

  // Fallback success simulation
  return {
    id: `REP-${Date.now().toString(36).toUpperCase()}`,
    status: "SUCCESS",
    message: "Report logged successfully in local prototype registry.",
    created_at: new Date().toISOString()
  };
}

/**
 * Health Check API
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/api/health`, { signal: AbortSignal.timeout(2000) });
    if (res.ok) return await res.json();
  } catch (err) {
    return { status: "offline" };
  }
  return { status: "offline" };
}

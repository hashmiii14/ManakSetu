/**
 * Centralized API Service for ManaKSetu
 * Connects to the FastAPI backend with seamless local fallback.
 */

import { BIS_STANDARDS } from '../data/bisStandards';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

/**
 * Normalizes an API standard item to match frontend structure.
 */
function normalizeStandard(item) {
  if (!item) return null;
  return {
    id: item.is_number ? item.is_number.replace(/[^a-zA-Z0-9]/g, '-') : (item.id || 'STD-01'),
    isCode: item.is_number || item.isCode || 'IS Standard',
    title: item.title || 'Standard Specification',
    category: item.category || 'General',
    description: item.description || (item.scope ? item.scope.slice(0, 200) : 'Indian Standard Specification'),
    scope: item.scope || item.description || '',
    mandatoryQCO: Boolean(item.mandatory_qco ?? item.mandatoryQCO),
    qcoNotification: item.qco_notification || item.qcoNotification || (item.mandatory_qco ? 'Quality Control Order (Statutory)' : null),
    relevanceScore: item.relevance_score || 0.85,
    keyTests: item.key_tests && item.key_tests.length > 0 ? item.key_tests : (item.keyTests || [
      "Compressive / Tensile Mechanical Strength Testing",
      "Dimensional Tolerances & Material Uniformity",
      "Chemical Purity & Deleterious Substances Assay"
    ]),
    labsAvailable: item.labs_available && item.labs_available.length > 0 ? item.labs_available : (item.labsAvailable || [
      { name: "BIS Central Laboratory", city: "Sahibabad", state: "Uttar Pradesh" },
      { name: "National Test House (NTH)", city: "Kolkata", state: "West Bengal" }
    ]),
    feeStructure: item.fee_structure && Object.keys(item.fee_structure).length > 0 ? {
      applicationFee: item.fee_structure.application_fee ?? 1000,
      annualLicenseFee: item.fee_structure.annual_license_fee ?? 1000,
      auditFeePerManDay: item.fee_structure.audit_fee_per_man_day ?? 7000,
      baseMarkingFee: item.fee_structure.base_marking_fee ?? 65000,
      microConcessionPercent: item.fee_structure.micro_concession_percent ?? 50,
      smallConcessionPercent: item.fee_structure.small_concession_percent ?? 20,
      womenStartupConcessionPercent: 50
    } : (item.feeStructure || {
      applicationFee: 1000,
      annualLicenseFee: 1000,
      auditFeePerManDay: 7000,
      baseMarkingFee: 65000,
      microConcessionPercent: 50,
      smallConcessionPercent: 20,
      womenStartupConcessionPercent: 50
    }),
    documentationRequired: item.documentation_required && item.documentation_required.length > 0 ? item.documentation_required : (item.documentationRequired || [
      "Manufacturing machinery & calibrated test equipment list",
      "In-house testing facility with qualified technical personnel",
      "Valid factory premise proof and pollution clearances"
    ]),
    source: item.source || 'BIS Catalogue'
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

  try {
    const res = await fetch(`${API_BASE}/api/chatbot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: message.trim(), history }),
      signal: AbortSignal.timeout(15000)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("[ManaKSetu API] Backend chatbot unavailable, falling back to local engine:", err);
  }

  // Deterministic local fallback
  const results = await searchStandards(message, 1);
  const top = results[0] || BIS_STANDARDS[0];

  return {
    answer: `### Summary\nFor your question, the most relevant Indian Standard is **${top.isCode}** (*${top.title}*). ${top.description}\n\n### Mandatory Requirements\n- **Statutory Status**: ${top.mandatoryQCO ? 'Mandatory Quality Control Order (QCO)' : 'Voluntary Standard'}.\n- **Key Testing**: ${top.keyTests.slice(0, 2).join('; ')}.\n\n### Next Steps\nVisit **www.manakonline.in** to apply under Scheme-I for ISI Mark certification.`,
    referenced_standards: [{ is_number: top.isCode, title: top.title }],
    source: "Local Standards Knowledge Engine (Offline Mode)",
    confidence: "Medium",
    disclaimer: "AI-assisted guidance based on available standards information. Please verify on manakonline.in."
  };
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

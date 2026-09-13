/**
 * Central Standards Search Service for ManakSetu
 * Provides robust multi-token search, ranking, and defensive normalization.
 */

import { BIS_STANDARDS, POPULAR_SEARCH_CHIPS, SECTORS_LIST } from '../data/bisStandards';

/**
 * Normalizes any standard item into a safe, consistent schema.
 */
export function normalizeStandardRecord(item) {
  if (!item) return null;

  const isCode = item.isCode || item.is_number || 'IS Standard';
  const id = item.id || isCode.replace(/[^a-zA-Z0-9]/g, '-');

  return {
    id,
    isCode,
    is_number: isCode,
    title: item.title || 'Indian Standard Specification',
    category: item.category || 'General',
    sector: item.sector || 'General Engineering',
    scheme: item.scheme || 'Scheme-I (ISI Mark)',
    schemeCode: item.schemeCode || 'SCHEME_1',
    mandatoryQCO: Boolean(item.mandatoryQCO ?? item.mandatory_qco),
    qcoNotification: item.qcoNotification || item.qco_notification || (item.mandatoryQCO ? 'Quality Control Order (Statutory)' : null),
    qcoDate: item.qcoDate || 'Active Standard',
    gazetteNotification: item.gazetteNotification || item.gazette_notification || null,
    description: item.description || item.scope || 'Indian Standard technical parameters from BIS compendium.',
    scope: item.scope || item.description || '',
    relevanceScore: item.relevanceScore || item.relevance_score || 0.85,
    keywords: Array.isArray(item.keywords) ? item.keywords : [],
    colloquialTerms: Array.isArray(item.colloquialTerms) ? item.colloquialTerms : [],
    keyTests: Array.isArray(item.keyTests) ? item.keyTests : (
      Array.isArray(item.key_tests) ? item.key_tests : [
        "High Voltage Dielectric Breakdown & Safety Testing",
        "Dimensional Tolerances & Material Composition",
        "Mechanical Strength & Operating Endurance",
        "Corrosion & Environmental Durability"
      ]
    ),
    globalHarmonization: item.globalHarmonization || item.global_harmonization || {
      standard: "ISO / IEC Equivalent",
      org: "International Standards Organization",
      exportEquivalence: "Harmonized Safety Requirements",
      note: "Aligns with international quality and safety benchmarks.",
      compatibleMarkets: ["Global Export Markets"]
    },
    citizenCard: item.citizenCard || item.citizen_card || {
      headline: "Consumer Quality & Safety Guide",
      mandatoryMark: "ISI Monogram with 7-digit CM/L Number",
      safetyRisk: "Uncertified products may violate safety and statutory guidelines.",
      labelInstruction: "Look for permanent embossed or stamped standard mark and 7-digit license.",
      actionTip: "Verify active status on official BIS portal."
    },
    labsAvailable: Array.isArray(item.labsAvailable) ? item.labsAvailable : (
      Array.isArray(item.labs_available) ? item.labs_available : [
        { name: "BIS Central Laboratory", city: "Sahibabad", state: "Uttar Pradesh" },
        { name: "National Test House", city: "Kolkata", state: "West Bengal" }
      ]
    ),
    feeStructure: item.feeStructure || item.fee_structure || {
      applicationFee: 1000,
      annualLicenseFee: 1000,
      auditFeePerManDay: 7000,
      baseMarkingFee: 65000,
      microConcessionPercent: 50,
      smallConcessionPercent: 20,
      womenStartupConcessionPercent: 50
    },
    documentationRequired: Array.isArray(item.documentationRequired) ? item.documentationRequired : (
      Array.isArray(item.documentation_required) ? item.documentation_required : [
        "In-house testing facility and calibrated apparatus list",
        "Factory premise proof and machinery flowchart",
        "MSME Udyam registration certificate for fee concessions"
      ]
    ),
    consumerTip: item.consumerTip || "Always look for the genuine ISI or Hallmark mark before purchasing.",
    source: item.source || 'BIS Compendium'
  };
}

/**
 * Robust Multi-token search with ranking and filtering.
 *
 * @param {string} rawQuery - search string
 * @param {object} filters - { sector, scheme, status, qcoOnly }
 * @returns {Array} ranked, normalized standard records
 */
export function searchStandards(rawQuery = '', filters = {}) {
  const query = (rawQuery || '').trim().toLowerCase();
  const tokens = query.split(/\s+/).filter(Boolean);

  let pool = BIS_STANDARDS.map(normalizeStandardRecord);

  // Apply Sector Filter
  if (filters.sector && filters.sector !== 'All Sectors' && filters.sector !== 'ALL') {
    pool = pool.filter(item => 
      (item.sector && item.sector.toLowerCase() === filters.sector.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(filters.sector.toLowerCase()))
    );
  }

  // Apply Scheme Filter
  if (filters.scheme && filters.scheme !== 'ALL') {
    pool = pool.filter(item => 
      item.schemeCode === filters.scheme || 
      (item.scheme && item.scheme.toLowerCase().includes(filters.scheme.toLowerCase()))
    );
  }

  // Apply Mandatory QCO Status Filter
  if (filters.status === 'MANDATORY' || filters.qcoOnly) {
    pool = pool.filter(item => item.mandatoryQCO);
  } else if (filters.status === 'VOLUNTARY') {
    pool = pool.filter(item => !item.mandatoryQCO);
  }

  // If no query words, return filtered pool
  if (tokens.length === 0) {
    return pool;
  }

  // Multi-tier ranking
  const scoredResults = pool.map(item => {
    let score = 0;
    const isCodeClean = item.isCode.toLowerCase().replace(/[^a-z0-9]/g, '');
    const titleLower = item.title.toLowerCase();
    const catLower = item.category.toLowerCase();
    const secLower = (item.sector || '').toLowerCase();
    const descLower = item.description.toLowerCase();
    const keywords = (item.keywords || []).map(k => k.toLowerCase());
    const colloquial = (item.colloquialTerms || []).map(c => c.toLowerCase());

    const cleanFullQuery = query.replace(/[^a-z0-9]/g, '');

    // 1. Exact IS number match (Highest priority)
    if (cleanFullQuery && isCodeClean.includes(cleanFullQuery)) {
      score += 150;
    }

    // 2. Query tokens match
    tokens.forEach(token => {
      const cleanToken = token.replace(/[^a-z0-9]/g, '');
      if (cleanToken && isCodeClean.includes(cleanToken)) {
        score += 80;
      }
      if (titleLower.includes(token)) {
        score += 45;
      }
      if (colloquial.some(c => c.includes(token))) {
        score += 40;
      }
      if (keywords.some(k => k.includes(token))) {
        score += 35;
      }
      if (catLower.includes(token) || secLower.includes(token)) {
        score += 25;
      }
      if (descLower.includes(token)) {
        score += 10;
      }
    });

    return { item, score };
  });

  // Filter out items with 0 score, then sort descending
  const matched = scoredResults
    .filter(res => res.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(res => ({
      ...res.item,
      relevanceScore: Math.min(0.99, Math.max(0.70, (res.score / 150)))
    }));

  return matched;
}

/**
 * Fetch a single standard by ID or IS Number.
 */
export function getStandardById(idOrCode) {
  if (!idOrCode) return null;

  const clean = idOrCode.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  const found = BIS_STANDARDS.find(s => {
    const sId = (s.id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const sCode = s.isCode.toLowerCase().replace(/[^a-z0-9]/g, '');
    return sId === clean || sCode === clean || (clean.length > 3 && (sCode.includes(clean) || clean.includes(sCode)));
  });

  return found ? normalizeStandardRecord(found) : null;
}

export function getPopularSearches() {
  return POPULAR_SEARCH_CHIPS;
}

export function getSectorsList() {
  return SECTORS_LIST;
}

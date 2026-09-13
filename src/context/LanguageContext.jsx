import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { HINDI_DICTIONARY, HINDI_LOWER_MAP } from '../translations/hindiDictionary';

const LanguageContext = createContext();

const TRANSLATIONS = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.standards': 'Standards',
    'nav.services': 'Services',
    'nav.manakbot': 'ManakBot',
    'nav.consumer': 'Consumer Protection',
    'nav.msme': 'MSME Relief',
    'nav.news': 'Resources',
    'nav.faq': 'Support',
    'nav.about': 'About',

    // Buttons
    'btn.search': 'Search Standards',
    'btn.manakbot': 'Ask ManakBot',
    'btn.verify': 'Verify License',
    'btn.report': 'Report Violation',
    'btn.close': 'Close',
    'btn.apply_official': 'Apply on Official Manak Online',
    'btn.calculate': 'Calculate Tariff',
    'btn.view_specs': 'View Full Standard & Roadmap',

    // Top Bar & Hero
    'top.gov': 'भारत सरकार | Government of India',
    'top.ministry': 'Ministry of Consumer Affairs, Food & Public Distribution',
    'hero.badge': 'Public Service Navigation Portal',
    'hero.title': 'Find Indian Standards and BIS Services',
    'hero.subtitle': 'National assistance portal for Indian enterprises, manufacturers, exporters, and citizens to discover Indian Standards (IS Codes), verify statutory Quality Control Orders (QCOs), and navigate Bureau of Indian Standards (BIS) conformity assessment procedures.',
    'search.placeholder': 'Search by IS Number, product, keyword or standard (e.g., IS 2082, geyser, cement, helmet)...',
    'search.filter_all': 'All Sectors',
    'search.filter_mandatory': 'Mandatory QCO Only',
    'search.quick_searches': 'Popular Searches:',

    // Verification
    'verify.title': 'Consumer Authenticity Verifier',
    'verify.subtitle': 'Verify 6-digit Gold HUID or 7-digit ISI CM/L manufacturing licenses against national registries.',
    'verify.huid_tab': 'Verify Gold 6-Digit HUID',
    'verify.cml_tab': 'Verify 7-Digit ISI CML License',
    'verify.cml_placeholder': 'Enter 7-digit CML number (e.g. 6200145, 8400192, 3344556)',

    // MSME
    'msme.badge': 'Statutory MSME Concessions',
    'msme.title': 'MSME & Startup Fee Relief',
    'msme.subtitle': '50% concession for Micro enterprises and DPIIT-recognized startups on BIS Application and Marking fees.',

    // Footer
    'footer.disclaimer': 'ManakSetu is an independent assistance prototype engineered for Smart India Hackathon (SIH 2026). All official licensing applications must be filed on www.manakonline.in.',
    'footer.rights': 'Smart India Hackathon 2026 | Jamia Hamdard, New Delhi | Team Code Snippet'
  },
  hi: {
    // Navigation
    'nav.home': 'मुख्य पृष्ठ',
    'nav.standards': 'मानक निर्देशिका',
    'nav.services': 'प्रमाणन योजनाएं',
    'nav.manakbot': 'मानक बॉट',
    'nav.consumer': 'उपभोक्ता सत्यापन',
    'nav.msme': 'एमएसएमई राहत',
    'nav.news': 'राजपत्र सूचनाएं',
    'nav.faq': 'सहायता / प्रश्न',
    'nav.about': 'हमारे बारे में',

    // Buttons
    'btn.search': 'मानक खोजें',
    'btn.manakbot': 'मानक बॉट से पूछें',
    'btn.verify': 'लाइसेंस सत्यापित करें',
    'btn.report': 'उल्लंघन की रिपोर्ट करें',
    'btn.close': 'बंद करें',
    'btn.apply_official': 'आधिकारिक मानक ऑनलाइन पर आवेदन करें',
    'btn.calculate': 'लागत एवं छूट की गणना करें',
    'btn.view_specs': 'मानक विवरण एवं रोडमैप देखें',

    // Top Bar & Hero
    'top.gov': 'भारत सरकार | Government of India',
    'top.ministry': 'उपभोक्ता मामले, खाद्य और सार्वजनिक वितरण मंत्रालय',
    'hero.badge': 'सार्वजनिक सेवा मार्गदर्शन पोर्टल',
    'hero.title': 'भारतीय मानक एवं बीआईएस सेवाएं खोजें',
    'hero.subtitle': 'भारतीय उद्यमों, निर्माताओं, निर्यातकों और नागरिकों के लिए भारतीय मानकों (IS कोड), अनिवार्य गुणवत्ता नियंत्रण आदेशों (QCO) की खोज और बीआईएस प्रमाणन प्रक्रियाओं में सहायता हेतु राष्ट्रीय पोर्टल।',
    'search.placeholder': 'आईएस संख्या, उत्पाद या कीवर्ड से खोजें (उदा. IS 2082, गीजर, सीमेंट, हेलमेट)...',
    'search.filter_all': 'सभी क्षेत्र',
    'search.filter_mandatory': 'केवल अनिवार्य QCO',
    'search.quick_searches': 'लोकप्रिय खोजें:',

    // Verification
    'verify.title': 'उपभोक्ता प्रमाणिकता सत्यापन',
    'verify.subtitle': 'सोने के 6-अंकीय HUID अथवा 7-अंकीय आईएसआई (ISI) CM/L निर्माण लाइसेंस का सत्यापन करें।',
    'verify.huid_tab': 'सोने का 6-अंकीय HUID जांचें',
    'verify.cml_tab': '7-अंकीय ISI CM/L लाइसेंस जांचें',
    'verify.cml_placeholder': '7-अंकीय CM/L संख्या दर्ज करें (उदा. 6200145, 8400192, 3344556)',

    // MSME
    'msme.badge': 'वैधानिक एमएसएमई रियायतें',
    'msme.title': 'एमएसएमई एवं स्टार्टअप शुल्क राहत',
    'msme.subtitle': 'सूक्ष्म उद्यमों (Micro) एवं डीपीआईआईटी मान्यता प्राप्त स्टार्टअप्स को बीआईएस आवेदन और अंकन शुल्क पर 50% की वैधानिक छूट।',

    // Footer
    'footer.disclaimer': 'मानक सेतु स्मार्ट इंडिया हैकाथॉन (SIH 2026) के लिए विकसित एक स्वतंत्र निर्णय-समर्थन प्रोटोटाइप है। सभी आधिकारिक लाइसेंस आवेदन www.manakonline.in पर किए जाने चाहिए।',
    'footer.rights': 'स्मार्ट इंडिया हैकाथॉन 2026 | जामिया हमदर्द, नई दिल्ली | टीम कोड स्निपेट'
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem('manaksetu_lang');
      return saved === 'hi' ? 'hi' : 'en';
    } catch (e) {
      return 'en';
    }
  });

  const setLanguage = (lang) => {
    const target = lang === 'hi' ? 'hi' : 'en';
    setLanguageState(target);
    try {
      localStorage.setItem('manaksetu_lang', target);
      document.documentElement.lang = target;
    } catch (e) {
      console.warn('Could not persist language preference', e);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  // Smart bilingual translator
  const t = (keyOrText, fallback = '') => {
    if (language === 'en') {
      return fallback || TRANSLATIONS.en[keyOrText] || keyOrText;
    }

    // Language is 'hi':
    // 1. Direct key match in TRANSLATIONS.hi
    if (TRANSLATIONS.hi[keyOrText]) return TRANSLATIONS.hi[keyOrText];

    // 2. Direct exact match in HINDI_DICTIONARY
    const candidate = fallback || keyOrText;
    if (HINDI_DICTIONARY[candidate]) return HINDI_DICTIONARY[candidate];

    const trimmed = String(candidate).trim();
    if (HINDI_DICTIONARY[trimmed]) return HINDI_DICTIONARY[trimmed];

    // 3. Lowercase match
    const lower = trimmed.toLowerCase();
    if (HINDI_LOWER_MAP[lower]) return HINDI_LOWER_MAP[lower];

    // 4. If keyOrText itself was a phrase in dictionary
    if (HINDI_DICTIONARY[keyOrText]) return HINDI_DICTIONARY[keyOrText];
    if (HINDI_LOWER_MAP[String(keyOrText).trim().toLowerCase()]) {
      return HINDI_LOWER_MAP[String(keyOrText).trim().toLowerCase()];
    }

    return fallback || keyOrText;
  };

  // Sync html lang attribute cleanly
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: 'en',
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: (key, fallback = '') => fallback || key
    };
  }
  return context;
}

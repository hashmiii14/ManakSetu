import React from 'react';
import { ExternalLink, ShieldCheck, Flag, PhoneCall } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';

export default function Footer({ onOpenReport }) {
  const { navigate } = useRouter();
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 text-xs py-10 border-t-2 border-gov-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top 5 Institutional Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          
          {/* Col 1: About ManakSetu (2 cols wide) */}
          <div className="lg:col-span-2 space-y-3">
            <Logo variant="white" size="default" />

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              ManakSetu is an assistance and navigation platform designed to simplify access to Indian Standards, mandatory Quality Control Orders (QCOs), and Bureau of Indian Standards (BIS) conformity assessment procedures.
            </p>

            <div className="pt-1 text-[11px] text-slate-400 space-y-0.5">
              <p>{t('Smart India Hackathon 2026 • Problem Statement ID:')} <strong>26107</strong></p>
              <p>{t('Theme:')} <strong>{t('Smart Automation')}</strong> • {t('Team:')} <strong>{t('Code Snippet')}</strong></p>
            </div>
          </div>

          {/* Col 2: Standards */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] pb-1 border-b border-slate-800">
              {t('Standards')}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate('/standards/search')} className="hover:text-white transition-colors">
                  {t('Instant Standards Search')}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/standards/search?sector=Electrical+Engineering')} className="hover:text-white transition-colors">
                  {t('Electrotechnical')}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/standards/search?sector=Civil+Engineering')} className="hover:text-white transition-colors">
                  {t('Civil Engineering')}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/standards/search?sector=Food+%26+Agriculture')} className="hover:text-white transition-colors">
                  {t('Food & Agriculture')}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/standards/search?sector=Electronics+%26+IT+Goods')} className="hover:text-white transition-colors">
                  {t('Electronics & IT')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] pb-1 border-b border-slate-800">
              {t('Services')}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-white transition-colors">
                  {t('Product Certification (ISI)')}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-white transition-colors">
                  {t('Compulsory Registration (CRS)')}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/consumer')} className="hover:text-white transition-colors">
                  {t('Hallmarking (HUID)')}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-white transition-colors">
                  {t('Foreign Manufacturers (FMCS)')}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-white transition-colors">
                  {t('Testing Labs (LRS)')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Resources */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] pb-1 border-b border-slate-800">
              {t('Resources')}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate('/manakbot')} className="hover:text-white transition-colors text-amber-400 font-semibold">
                  {t('ManakBot Assistant')}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/msme')} className="hover:text-white transition-colors">
                  {t('MSME 50% Relief')}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/news')} className="hover:text-white transition-colors">
                  {t('Gazette QCO Orders')}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/faq')} className="hover:text-white transition-colors">
                  {t('Frequently Asked Questions')}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-white transition-colors">
                  {t('About Project')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Official BIS Links & Helpline */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] pb-1 border-b border-slate-800">
              {t('Official Links')}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <a
                  href="https://www.manakonline.in/MANAK/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>{t('Manak Online (e-BIS)')}</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.bis.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>{t('BIS Website')}</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.crsbis.in/BIS/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>{t('CRS Portal')}</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.egazette.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>{t('e-Gazette of India')}</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <div className="p-2 bg-slate-800 rounded-sm border border-slate-700 text-[11px] space-y-0.5">
                <span className="text-slate-400 block font-medium">{t('Consumer Helpline:')}</span>
                <span className="text-amber-400 font-mono font-bold block">{t('1915 (Toll Free)')}</span>
              </div>
            </div>
          </div>

        </div>

        {/* STATUTORY MANDATORY DISCLAIMER */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-sm text-[11px] text-slate-400 leading-relaxed">
            <strong className="text-slate-200 block mb-0.5">{t('Statutory Disclaimer:')}</strong>
            <p>
              {t('ManakSetu is an independent assistance prototype engineered for Smart India Hackathon (SIH 2026). All official licensing applications must be filed on www.manakonline.in.')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
            <div>
              &copy; 2026 {t('MANAKSETU Assistive Platform • SIH 2026 Team Code Snippet')}
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/about')} className="hover:text-slate-300">{t('Privacy Policy')}</button>
              <span>|</span>
              <button onClick={() => navigate('/about')} className="hover:text-slate-300">{t('Terms of Assistance')}</button>
              <span>|</span>
              <button onClick={() => navigate('/about')} className="hover:text-slate-300">{t('Accessibility Statement')}</button>
              <span>|</span>
              <button onClick={() => navigate('/faq')} className="hover:text-slate-300">{t('Contact')}</button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

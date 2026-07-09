import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CookieIcon, X, ShieldCheck, ChartBar, Megaphone } from '@phosphor-icons/react';

const CONSENT_KEY = 'advait_cookie_consent';
const CONSENT_VERSION = '1.0';

const defaultConsent = {
  version: CONSENT_VERSION,
  essential: true,       // always true — cannot be disabled
  analytics: false,
  marketing: false,
  timestamp: null,
};

function getConsent() {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function hasConsented() {
  return getConsent() !== null;
}

export default function CookieConsent({ onConsent }) {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: false, marketing: false });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check mobile state
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Only show banner if user hasn't consented yet
    if (!hasConsented()) {
      const timer = setTimeout(() => setVisible(true), 2500);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', checkMobile);
      };
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const saveConsent = (consentObj) => {
    const full = { ...defaultConsent, ...consentObj, version: CONSENT_VERSION, timestamp: new Date().toISOString() };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(full));
    // Expose globally for analytics/ad services to check
    window.advait_consent = full;
    setVisible(false);
    if (onConsent) onConsent(full);
  };

  const handleAcceptAll = () => {
    saveConsent({ essential: true, analytics: true, marketing: true });
  };

  const handleEssentialOnly = () => {
    saveConsent({ essential: true, analytics: false, marketing: false });
  };

  const handleSaveCustom = () => {
    saveConsent({ essential: true, analytics: prefs.analytics, marketing: prefs.marketing });
    setShowCustomize(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop for customize panel on desktop */}
          {showCustomize && !isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9990] bg-black/30 backdrop-blur-sm"
              onClick={() => setShowCustomize(false)}
            />
          )}

          {isMobile ? (
            <>
              {/* Mobile Sheet Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9990] bg-black"
                onClick={() => setShowCustomize(false)}
              />

              {/* Mobile Truecaller-style Bottom Sheet */}
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 26, stiffness: 220 }}
                className="fixed bottom-0 left-0 right-0 z-[9991] bg-white rounded-t-[24px] shadow-[0_-8px_32px_rgba(0,0,0,0.15)] p-5 pb-7 overflow-y-auto max-h-[92vh] text-left border-t border-slate-100"
                role="dialog"
                aria-label="Cookie consent modal"
              >
                <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-4" />
                
                <h3 className="text-xl font-bold text-slate-900 leading-tight mb-3">
                  We use cookies on this website
                </h3>
                
                <div className="text-xs text-slate-600 leading-relaxed mb-4">
                  When you visit our website, we use necessary cookies to make our site work. With your consent, we’ll also use:
                  <ul className="list-disc pl-5 space-y-1.5 my-2.5 text-slate-700">
                    <li>
                      <span className="text-blue-600 font-semibold underline cursor-pointer" onClick={() => setShowCustomize(true)}>
                        Analytics cookies
                      </span> to understand how our site is used and improve it.
                    </li>
                    <li>
                      <span className="text-blue-600 font-semibold underline cursor-pointer" onClick={() => setShowCustomize(true)}>
                        Marketing cookies
                      </span> to measure the effectiveness of our campaigns and tailor content to your interests.
                    </li>
                    <li>
                      <span className="text-blue-600 font-semibold underline cursor-pointer" onClick={() => setShowCustomize(true)}>
                        Advertising cookies
                      </span> from our partners to show you ads that are more relevant and to limit how often you see them.
                    </li>
                  </ul>
                  You have the right to withdraw your consent at any time. You can change your cookie preferences at any time by clicking on "Edit Cookie Settings" available at the bottom of any page. For more detailed information about the cookies we use, see our <a href="/terms-and-conditions" className="text-blue-600 font-semibold underline">🍪 Cookie Policy</a>.
                </div>

                <AnimatePresence>
                  {showCustomize && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mb-4 bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-2 overflow-hidden"
                    >
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Manage Preferences</p>
                      
                      <CookieToggle
                        theme="light"
                        icon={<ShieldCheck size={14} weight="fill" className="text-emerald-500" />}
                        label="Essential Cookies"
                        description="Required for the site to work."
                        checked={true}
                        disabled
                      />
                      
                      <CookieToggle
                        theme="light"
                        icon={<ChartBar size={14} weight="fill" className="text-blue-500" />}
                        label="Analytics Cookies"
                        description="To help us measure traffic."
                        checked={prefs.analytics}
                        onChange={(v) => setPrefs(p => ({ ...p, analytics: v }))}
                      />
                      
                      <CookieToggle
                        theme="light"
                        icon={<Megaphone size={14} weight="fill" className="text-blue-500" />}
                        label="Marketing Cookies"
                        description="Used for relevant campaigns."
                        checked={prefs.marketing}
                        onChange={(v) => setPrefs(p => ({ ...p, marketing: v }))}
                      />
                      
                      <button
                        onClick={handleSaveCustom}
                        className="w-full py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Save Settings
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col gap-2.5">
                  <button
                    onClick={() => setShowCustomize(p => !p)}
                    className="py-2.5 rounded-full border border-blue-600 text-blue-600 text-xs font-semibold text-center hover:bg-blue-50/30 transition-all cursor-pointer bg-transparent"
                  >
                    Edit Cookie Settings
                  </button>
                  <button
                    onClick={handleEssentialOnly}
                    className="py-2.5 rounded-full border border-blue-600 text-blue-600 text-xs font-semibold text-center hover:bg-blue-50/30 transition-all cursor-pointer bg-transparent"
                  >
                    Accept Necessary Cookies
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold text-center transition-all cursor-pointer"
                  >
                    Accept All Cookies
                  </button>
                </div>
              </motion.div>
            </>
          ) : (
            /* Main Desktop Banner */
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26, mass: 0.9 }}
              className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-[340px] z-[9991]"
              role="dialog"
              aria-label="Cookie consent"
            >
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(15,23,42,0.98) 0%, rgba(30,41,59,0.98) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset',
                }}
                className="rounded-xl overflow-hidden"
              >
                {/* Customize Panel */}
                <AnimatePresence>
                  {showCustomize && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden border-b border-white/10"
                    >
                      <div className="p-3.5 space-y-2.5">
                        <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Manage Preferences</p>

                        <CookieToggle
                          theme="dark"
                          icon={<ShieldCheck size={14} weight="fill" className="text-emerald-400" />}
                          label="Essential Cookies"
                          description="Required for the site to work."
                          checked={true}
                          disabled
                        />

                        <CookieToggle
                          theme="dark"
                          icon={<ChartBar size={14} weight="fill" className="text-blue-400" />}
                          label="Analytics Cookies"
                          description="To help us measure traffic."
                          checked={prefs.analytics}
                          onChange={(v) => setPrefs(p => ({ ...p, analytics: v }))}
                        />

                        <CookieToggle
                          theme="dark"
                          icon={<Megaphone size={14} weight="fill" className="text-brand-orange" />}
                          label="Marketing Cookies"
                          description="Used for relevant campaigns."
                          checked={prefs.marketing}
                          onChange={(v) => setPrefs(p => ({ ...p, marketing: v }))}
                        />

                        <button
                          onClick={handleSaveCustom}
                          className="w-full py-1.5 rounded-lg bg-brand-orange text-white text-[11px] font-bold tracking-wide hover:bg-amber-500 transition-colors duration-200 cursor-pointer"
                        >
                          Save Settings
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Main Content */}
                <div className="p-3.5 space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-brand-orange/15 flex items-center justify-center shrink-0 mt-0.5">
                      <CookieIcon size={16} weight="fill" className="text-brand-orange" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-bold text-white leading-tight">We use cookies 🍪</h3>
                      <p className="text-[10px] text-white/60 mt-0.5 leading-relaxed">
                        We use cookies to enhance your experience and analyze traffic. Customize choices below.
                      </p>
                    </div>
                    <button
                      onClick={handleEssentialOnly}
                      className="shrink-0 w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-white/10 hover:text-white transition-all duration-200 cursor-pointer"
                      aria-label="Close"
                    >
                      <X size={12} weight="bold" />
                    </button>
                  </div>

                  {/* Action Buttons: 3-column Grid for responsiveness */}
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      id="cookie-accept-all"
                      onClick={handleAcceptAll}
                      className="py-1.5 px-1 rounded-lg bg-brand-orange hover:bg-amber-500 text-white text-[10px] font-bold tracking-wide transition-all duration-200 text-center cursor-pointer"
                    >
                      Accept All
                    </button>
                    <button
                      id="cookie-essential-only"
                      onClick={handleEssentialOnly}
                      className="py-1.5 px-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-[10px] font-semibold transition-all duration-200 border border-white/8 text-center cursor-pointer"
                    >
                      Essential Only
                    </button>
                    <button
                      id="cookie-customize"
                      onClick={() => setShowCustomize(p => !p)}
                      className="py-1.5 px-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-[10px] font-semibold transition-all duration-200 border border-white/8 text-center cursor-pointer"
                    >
                      Customize
                    </button>
                  </div>

                  <p className="text-[9px] text-white/30 text-center leading-relaxed">
                    By continuing, you agree to our{' '}
                    <a href="/terms-and-conditions" className="underline hover:text-white/55 transition-colors">Terms of Service</a>.
                    &nbsp;DPDP Act 2023 compliant.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}

/** Individual toggle row inside the customize panel */
function CookieToggle({ icon, label, description, checked, onChange, disabled, theme = 'dark' }) {
  const isLight = theme === 'light';
  return (
    <div className={`flex items-start gap-3 py-2 border-b last:border-0 ${isLight ? 'border-slate-150' : 'border-white/6'}`}>
      <div className="shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-semibold leading-tight ${isLight ? 'text-slate-800' : 'text-white'}`}>{label}</p>
        <p className={`text-[10px] mt-0.5 leading-relaxed ${isLight ? 'text-slate-500' : 'text-white/40'}`}>{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange && onChange(!checked)}
        className={`shrink-0 mt-1 w-9 h-5 rounded-full transition-all duration-200 relative ${
          disabled
            ? isLight ? 'bg-emerald-500/30 cursor-not-allowed' : 'bg-emerald-500/50 cursor-not-allowed'
            : checked
            ? isLight ? 'bg-blue-600 cursor-pointer' : 'bg-brand-orange cursor-pointer'
            : isLight ? 'bg-slate-200 cursor-pointer' : 'bg-white/15 cursor-pointer'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

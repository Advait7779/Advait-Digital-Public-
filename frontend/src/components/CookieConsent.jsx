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

  useEffect(() => {
    // Only show banner if user hasn't consented yet
    if (!hasConsented()) {
      const timer = setTimeout(() => setVisible(true), 2500);
      return () => clearTimeout(timer);
    }
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
          {/* Backdrop for customize panel */}
          {showCustomize && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9990] bg-black/30 backdrop-blur-sm"
              onClick={() => setShowCustomize(false)}
            />
          )}

          {/* Main Banner */}
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

                      {/* Essential — always on */}
                      <CookieToggle
                        icon={<ShieldCheck size={14} weight="fill" className="text-emerald-400" />}
                        label="Essential Cookies"
                        description="Required for the site to work."
                        checked={true}
                        disabled
                      />

                      {/* Analytics */}
                      <CookieToggle
                        icon={<ChartBar size={14} weight="fill" className="text-blue-400" />}
                        label="Analytics Cookies"
                        description="To help us measure traffic."
                        checked={prefs.analytics}
                        onChange={(v) => setPrefs(p => ({ ...p, analytics: v }))}
                      />

                      {/* Marketing */}
                      <CookieToggle
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
        </>
      )}
    </AnimatePresence>
  );
}

/** Individual toggle row inside the customize panel */
function CookieToggle({ icon, label, description, checked, onChange, disabled }) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-white/6 last:border-0">
      <div className="shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-white leading-tight">{label}</p>
        <p className="text-[10px] text-white/40 mt-0.5 leading-relaxed">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange && onChange(!checked)}
        className={`shrink-0 mt-1 w-9 h-5 rounded-full transition-all duration-200 relative ${
          disabled
            ? 'bg-emerald-500/50 cursor-not-allowed'
            : checked
            ? 'bg-brand-orange cursor-pointer'
            : 'bg-white/15 cursor-pointer'
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

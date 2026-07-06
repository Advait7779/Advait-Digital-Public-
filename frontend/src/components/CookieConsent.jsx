import React, { useState, useEffect } from 'react';
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

export function getConsent() {
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

export function hasConsented() {
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
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-[440px] z-[9991]"
            role="dialog"
            aria-label="Cookie consent"
          >
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(15,23,42,0.97) 0%, rgba(30,41,59,0.97) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,107,0,0.25)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset',
              }}
              className="rounded-2xl overflow-hidden"
            >
              {/* Top accent bar */}
              <div className="h-1 bg-gradient-to-r from-brand-orange via-amber-400 to-brand-orange" />

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
                    <div className="px-5 py-4 space-y-3">
                      <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Manage Preferences</p>

                      {/* Essential — always on */}
                      <CookieToggle
                        icon={<ShieldCheck size={16} weight="fill" className="text-emerald-400" />}
                        label="Essential Cookies"
                        description="Required for the website to work properly. Cannot be disabled."
                        checked={true}
                        disabled
                      />

                      {/* Analytics */}
                      <CookieToggle
                        icon={<ChartBar size={16} weight="fill" className="text-blue-400" />}
                        label="Analytics Cookies"
                        description="Helps us understand how visitors use the site to improve your experience."
                        checked={prefs.analytics}
                        onChange={(v) => setPrefs(p => ({ ...p, analytics: v }))}
                      />

                      {/* Marketing */}
                      <CookieToggle
                        icon={<Megaphone size={16} weight="fill" className="text-brand-orange" />}
                        label="Marketing Cookies"
                        description="Used to show you relevant ads and measure campaign performance."
                        checked={prefs.marketing}
                        onChange={(v) => setPrefs(p => ({ ...p, marketing: v }))}
                      />

                      <button
                        onClick={handleSaveCustom}
                        className="w-full py-2 rounded-lg bg-brand-orange text-white text-xs font-bold tracking-wide hover:bg-amber-500 transition-colors duration-200 cursor-pointer"
                      >
                        Save My Preferences
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main Content */}
              <div className="px-5 py-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-orange/15 flex items-center justify-center shrink-0 mt-0.5">
                    <CookieIcon size={20} weight="fill" className="text-brand-orange" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white leading-tight">We use cookies 🍪</h3>
                    <p className="text-xs text-white/55 mt-0.5 leading-relaxed">
                      We use cookies to enhance your browsing experience, analyse site traffic, and serve personalised content. You can choose what to allow below.
                    </p>
                  </div>
                  <button
                    onClick={handleEssentialOnly}
                    className="shrink-0 w-7 h-7 rounded-full bg-white/8 flex items-center justify-center text-white/40 hover:bg-white/15 hover:text-white transition-all duration-200 cursor-pointer"
                    aria-label="Accept essential only and close"
                  >
                    <X size={14} weight="bold" />
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    id="cookie-accept-all"
                    onClick={handleAcceptAll}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-brand-orange hover:bg-amber-500 text-white text-xs font-bold tracking-wide transition-all duration-200 shadow-lg shadow-brand-orange/25 cursor-pointer"
                  >
                    Accept All
                  </button>
                  <button
                    id="cookie-essential-only"
                    onClick={handleEssentialOnly}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-white/8 hover:bg-white/14 text-white/80 hover:text-white text-xs font-semibold transition-all duration-200 cursor-pointer border border-white/10"
                  >
                    Essential Only
                  </button>
                  <button
                    id="cookie-customize"
                    onClick={() => setShowCustomize(p => !p)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs font-semibold transition-all duration-200 cursor-pointer border border-white/8"
                  >
                    Customize
                  </button>
                </div>

                <p className="text-[10px] text-white/28 text-center leading-relaxed">
                  By continuing to use our site, you agree to our{' '}
                  <a href="/terms-and-conditions" className="underline hover:text-white/50 transition-colors">Terms of Service</a>.
                  &nbsp;We respect your privacy under India&apos;s DPDP Act 2023.
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

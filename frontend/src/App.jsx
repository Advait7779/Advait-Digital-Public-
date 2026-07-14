import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import EnquiryModal from './components/EnquiryModal';
import CookieConsent from './components/CookieConsent';
import { trackVisit } from './services/analytics';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy-loaded Page Imports for code-splitting (SEO performance)
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const RcsMessaging = lazy(() => import('./pages/RcsMessaging'));
const ElectionSms = lazy(() => import('./pages/ElectionSms'));
const WebDev = lazy(() => import('./pages/WebDev'));
const WhatsappMarketing = lazy(() => import('./pages/WhatsappMarketing'));
const DigitalMarketing = lazy(() => import('./pages/DigitalMarketing'));
const SmsMarketing = lazy(() => import('./pages/SmsMarketing'));
const WhatsappApi = lazy(() => import('./pages/WhatsappApi'));
const VoiceCall = lazy(() => import('./pages/VoiceCall'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Careers = lazy(() => import('./pages/Careers'));
const Admin = lazy(() => import('./pages/Admin'));

// Premium, minimal loading spinner fallback matching the site theme
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh] bg-brand-cream-light">
    <div className="w-8 h-8 border-3 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
  </div>
);


/** Inner component so useLocation is available inside Router */
function AppContent() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/admin')) return;
    // Track page view on every route change (self-hosted, privacy-safe)
    trackVisit(location.pathname);
  }, [location.pathname]);

  return null; // renders nothing — just tracks
}

export default function App() {
  const [redirectUrl, setRedirectUrl] = useState(null);

  useEffect(() => {
    const handleLinkClick = (e) => {
      const anchor = e.target.closest('a');
      if (anchor && anchor.href && anchor.href.includes('waba.advaitdigital.co.in/register')) {
        e.preventDefault();
        setRedirectUrl(anchor.href);
      }
    };
    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);

  useEffect(() => {
    if (redirectUrl) {
      const timer = setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1500); // Redirect after 1.5 seconds to let the transition play fully
      return () => clearTimeout(timer);
    }
  }, [redirectUrl]);

  return (
    <Router>
      <AppContent />
      <ScrollToTop />
      <Routes>
        {/* ── Admin CMS Panel (standalone, no main layout) ── */}
        <Route path="/admin" element={
          <Suspense fallback={<PageLoader />}>
            <Admin />
          </Suspense>
        } />

        {/* ── Public Website ── */}
        <Route path="/*" element={
          <div className="flex flex-col min-h-screen bg-brand-cream-light font-sans text-brand-charcoal antialiased">
            {/* Navigation Header */}
            <Navbar />
            
            {/* Main Content Area */}
            <main className="flex-grow">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/terms-and-conditions" element={<TermsConditions />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/careers" element={<Careers />} />
                  
                  {/* 8 Digital Services Routes */}
                  <Route path="/services/rcs" element={<RcsMessaging />} />
                  <Route path="/services/election-sms" element={<ElectionSms />} />
                  <Route path="/services/web-dev" element={<WebDev />} />
                  <Route path="/services/whatsapp-marketing" element={<WhatsappMarketing />} />
                  <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
                  <Route path="/services/sms-marketing" element={<SmsMarketing />} />
                  <Route path="/services/whatsapp-api" element={<WhatsappApi />} />
                  <Route path="/services/voice-call" element={<VoiceCall />} />
                </Routes>
              </Suspense>
            </main>
        
            {/* Footer */}
            <Footer />

            {/* Floating WhatsApp Button */}
            <a 
              href="https://wa.me/918282982829" 
              target="_blank" 
              rel="noopener noreferrer"
              className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:shadow-emerald-500/25 hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer group"
              aria-label="Contact us on WhatsApp"
            >
              <svg viewBox="0 0 256 256" className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                {/* Speech bubble outline */}
                <path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z" />
                {/* Solid telephone handset */}
                <path d="M152.58,145.23l23,11.48A24,24,0,0,1,152,176a72.08,72.08,0,0,1-72-72A24,24,0,0,1,99.29,80.46l11.48,23L101,118a8,8,0,0,0-.73,7.51,56.47,56.47,0,0,0,30.15,30.15A8,8,0,0,0,138,155Z" />
              </svg>
              <span className="absolute right-full mr-3 bg-brand-charcoal text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md font-sans">
                Chat with us
              </span>
            </a>

            {/* Cookie Consent Banner */}
            <CookieConsent />

            {/* Enquiry Modal Popup */}
            <EnquiryModal />
          </div>
        } />
      </Routes>

      {/* Full-screen Redirect Transition Overlay */}
      <AnimatePresence>
        {redirectUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-charcoal text-white px-4"
          >
            {/* Soft pulsing glow gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/5 via-transparent to-brand-orange/5 animate-pulse"></div>

            <div className="relative z-10 flex flex-col items-center space-y-6 text-center">
              {/* Pulsing brand icon */}
              <motion.div
                animate={{ 
                  scale: [1, 1.06, 1],
                  rotate: [0, 3, -3, 0]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }}
                className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center shadow-lg border border-white/10"
              >
                <img 
                  src="/favicon.png" 
                  alt="Advait Digital Icon" 
                  className="w-16 h-16 object-contain rounded-xl" 
                />
              </motion.div>

              {/* Transition Copy */}
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
                  Connecting to Advait Digital Portal
                </h3>
                <p className="text-[#E5E4DE]/60 text-xs sm:text-sm font-medium">
                  Setting up your registration workspace...
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                  className="h-full bg-brand-orange rounded-full"
                ></motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Router>
  );
}

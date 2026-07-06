import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChatTeardropText, Megaphone, Globe, WhatsappLogo, 
  TrendUp, EnvelopeOpen, PhoneCall, List, X, CaretDown,
  AppWindow, Phone, ArrowRight, CheckCircle
} from '@phosphor-icons/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [homeAccordionOpen, setHomeAccordionOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on page change
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const serviceLinks = [
    { 
      name: 'Rich Communication Service (RCS)', 
      path: '/services/rcs', 
      icon: ChatTeardropText, 
      color: 'text-indigo-600 bg-indigo-50',
      desc: 'Upgrade traditional SMS to rich, interactive, and branded messages.' 
    },
    { 
      name: 'Bulk SMS for Election', 
      path: '/services/election-sms', 
      icon: Megaphone, 
      color: 'text-blue-600 bg-blue-50',
      desc: 'Deploy targeted campaign messages to keep voters engaged.'
    },
    { 
      name: 'Website Design & Dev', 
      path: '/services/web-dev', 
      icon: Globe, 
      color: 'text-teal-600 bg-teal-50',
      desc: 'Build responsive, W3C-optimized website and portal setups.'
    },
    { 
      name: 'WhatsApp Marketing', 
      path: '/services/whatsapp-marketing', 
      icon: WhatsappLogo, 
      color: 'text-green-600 bg-green-50',
      desc: 'Engage audiences using templates, broadcast lists, and campaigns.'
    },
    { 
      name: 'Digital Marketing Services', 
      path: '/services/digital-marketing', 
      icon: TrendUp, 
      color: 'text-amber-600 bg-amber-50',
      desc: 'Execute SEO, social campaigns, and Google Ads strategies.'
    },
    { 
      name: 'SMS Marketing Services', 
      path: '/services/sms-marketing', 
      icon: EnvelopeOpen, 
      color: 'text-red-600 bg-red-50',
      desc: 'Dispatch promotional alerts, reminders, OTPs, and notifications.'
    },
    { 
      name: 'WhatsApp Business API', 
      path: '/services/whatsapp-api', 
      icon: AppWindow, 
      color: 'text-emerald-600 bg-emerald-50',
      desc: 'Set up automated chatbots and shared multi-agent team inboxes.'
    },
    { 
      name: 'Voice Call Services', 
      path: '/services/voice-call', 
      icon: PhoneCall, 
      color: 'text-pink-600 bg-pink-50',
      desc: 'Broadcast personalized, pre-recorded audio calls at scale.'
    },
  ];

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleOpenDemoModal = () => {
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent('open-enquiry-modal'));
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 ${isScrolled ? 'glass-nav shadow-md' : 'bg-transparent'}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? 'h-20' : 'h-24'}`}>
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 sm:gap-3.5 group shrink-0 min-w-0">
            <img
              src="/favicon.png"
              alt="Advait Digital"
              className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 rounded-xl object-cover shadow-sm border border-brand-charcoal/5 group-hover:scale-105 transition-transform duration-200"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-brand-charcoal leading-none whitespace-nowrap">
                Advait <span className="text-brand-orange">Digital</span>
              </span>
              <span className="text-[10px] tracking-widest text-brand-charcoal-light/60 font-semibold uppercase whitespace-nowrap">
                Digital Services
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 font-semibold text-sm h-full">
            <Link to="/" className={`hover:text-brand-orange transition duration-200 ${location.pathname === '/' ? 'text-brand-orange' : 'text-brand-charcoal'}`}>
              Home
            </Link>
            
            <Link to="/about" className={`hover:text-brand-orange transition duration-200 ${location.pathname === '/about' ? 'text-brand-orange' : 'text-brand-charcoal'}`}>
              About Us
            </Link>

            {/* Services Dropdown Trigger */}
            <div 
              className="relative h-full flex items-center"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className={`flex items-center gap-1.5 hover:text-brand-orange transition duration-200 cursor-pointer h-full ${location.pathname.startsWith('/services') ? 'text-brand-orange' : 'text-brand-charcoal'}`}>
                Services
                <CaretDown size={14} className={`transform transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Megamenu Dropdown */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 transform -translate-x-1/2 top-[calc(100%+12px)] w-[880px] max-w-[calc(100vw-32px)] bg-white rounded-2xl shadow-xl border-t-4 border-brand-orange border-l border-r border-b border-brand-charcoal/5 p-6 grid grid-cols-3 gap-x-6 gap-y-4 before:content-[''] before:absolute before:top-[-16px] before:left-0 before:w-full before:h-[16px]"
                  >
                    {serviceLinks.map((srv, idx) => {
                      const SrvIcon = srv.icon;
                      return (
                        <Link
                          key={idx}
                          to={srv.path}
                          className="flex items-start gap-3.5 p-2 rounded-xl hover:bg-brand-cream/35 transition-colors duration-200 group"
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${srv.color} transition-transform group-hover:scale-105 duration-200`}>
                            <SrvIcon size={18} weight="fill" />
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-brand-charcoal group-hover:text-brand-orange transition-colors duration-150 leading-snug">
                              {srv.name}
                            </h4>
                            <p className="text-[10px] sm:text-[11px] text-brand-charcoal-light/75 font-medium mt-0.5 leading-relaxed">
                              {srv.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/contact" className={`hover:text-brand-orange transition duration-200 ${location.pathname === '/contact' ? 'text-brand-orange' : 'text-brand-charcoal'}`}>
              Contact
            </Link>
          </div>

          {/* Call / Demo CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a 
              href="tel:+919011251125" 
              className="flex items-center gap-1.5 text-xs font-bold text-brand-charcoal-light hover:text-brand-orange transition duration-200 mr-1"
            >
              <PhoneCall size={16} />
              +91 9011251125
            </a>
            <a 
              href="https://waba.advaitdigital.co.in/login"
              className="border border-brand-charcoal/20 text-brand-charcoal hover:border-brand-orange hover:text-brand-orange px-4 py-2 rounded-lg text-sm font-semibold transition duration-200 cursor-pointer text-center"
            >
              Login
            </a>
            <a 
              href="https://waba.advaitdigital.co.in/register"
              className="bg-brand-charcoal text-white hover:bg-brand-orange px-4 py-2 rounded-lg text-sm font-semibold transition duration-200 shadow-md cursor-pointer text-center"
            >
              Register
            </a>
          </div>

          {/* Mobile menu trigger hamburger button */}
          <div className="lg:hidden flex items-center gap-3">
            <a 
              href="tel:+919011251125" 
              className="p-2 rounded-xl bg-brand-cream text-brand-charcoal-light hover:bg-brand-yellow/30 transition-colors duration-200"
            >
              <PhoneCall size={20} />
            </a>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2.5 rounded-xl bg-brand-charcoal text-white hover:bg-brand-orange transition-colors duration-200 cursor-pointer shadow-sm"
              aria-label="Open mobile menu"
            >
              <List size={22} weight="bold" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Right-Side Drawer Panel (Matching AutoSensy Style) ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[1001] lg:hidden"
            />

            {/* Right-Side Sliding Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="fixed inset-y-0 right-0 z-[1002] w-[85%] max-w-[340px] bg-white shadow-2xl flex flex-col justify-between lg:hidden border-l border-brand-charcoal/10"
            >
              {/* Drawer Header & Links Wrapper */}
              <div className="w-full flex flex-col">
                <div className="flex items-center justify-between p-5 border-b border-gray-100 w-full bg-white">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/favicon.png"
                      alt="Advait Digital"
                      className="h-8 w-8 rounded-lg object-cover border border-brand-charcoal/5"
                    />
                    <span className="font-serif text-lg font-bold text-brand-charcoal">
                      Advait <span className="text-brand-orange">Digital</span>
                    </span>
                  </div>
                  
                  {/* Rounded Close Cross Button matching screenshot 2 */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 hover:text-brand-orange hover:border-brand-orange hover:bg-brand-orange/5 flex items-center justify-center transition-all duration-200 cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X size={18} weight="bold" />
                  </button>
                </div>

                {/* Navigation Links Accordion List */}
                <div className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-220px)] w-full bg-white">
                  {/* Home */}
                  <div className="rounded-xl overflow-hidden bg-gray-50/70 border border-gray-100 w-full">
                    <button
                      onClick={() => setHomeAccordionOpen(prev => !prev)}
                      className="w-full px-4 py-3 flex items-center justify-between font-bold text-sm text-emerald-600 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <span>Home</span>
                      <CaretDown
                        size={16}
                        className={`transition-transform duration-200 ${homeAccordionOpen ? 'transform rotate-180' : ''}`}
                      />
                    </button>
                    {homeAccordionOpen && (
                      <div className="px-4 pb-3 pt-1 border-t border-gray-100 bg-white space-y-2 text-xs font-semibold text-brand-charcoal-light w-full">
                        <Link to="/" className="block py-1.5 hover:text-brand-orange w-full">Main Landing Page</Link>
                      </div>
                    )}
                  </div>

                  {/* Services Accordion */}
                  <div className="rounded-xl overflow-hidden bg-gray-50/70 border border-gray-100 w-full">
                    <button
                      onClick={toggleDropdown}
                      className="w-full px-4 py-3 flex items-center justify-between font-bold text-sm text-brand-charcoal hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <span>Services</span>
                      <CaretDown
                        size={16}
                        className={`transition-transform duration-200 ${dropdownOpen ? 'transform rotate-180' : ''}`}
                      />
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-white border-t border-gray-100 px-3 py-2 space-y-1 w-full"
                        >
                          {serviceLinks.map((srv, idx) => (
                            <Link
                              key={idx}
                              to={srv.path}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center justify-between p-2 rounded-lg text-xs font-semibold text-brand-charcoal hover:text-brand-orange hover:bg-brand-cream/30 transition-colors w-full"
                            >
                              <span className="truncate">{srv.name}</span>
                              <ArrowRight size={12} className="text-brand-charcoal-light/40 shrink-0" />
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* About Us */}
                  <Link
                    to="/about"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50/70 border border-gray-100 font-bold text-sm text-brand-charcoal hover:bg-gray-100 transition-colors w-full"
                  >
                    <span>About Us</span>
                    <CaretDown size={16} className="text-gray-400 transform -rotate-90" />
                  </Link>

                  {/* Contact */}
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50/70 border border-gray-100 font-bold text-sm text-brand-charcoal hover:bg-gray-100 transition-colors w-full"
                  >
                    <span>Contact</span>
                    <CaretDown size={16} className="text-gray-400 transform -rotate-90" />
                  </Link>
                </div>
              </div>

              {/* Drawer Footer Buttons (Call for Demo & Contact Us - Matching Screenshot 2) */}
              <div className="p-5 border-t border-gray-100 space-y-3 bg-white w-full">
                <button
                  onClick={handleOpenDemoModal}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm py-3 rounded-full flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition-all duration-200 cursor-pointer"
                >
                  <span>Free Demo Request</span>
                  <Phone size={18} weight="fill" />
                </button>

                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-white border border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-white font-bold text-sm py-3 rounded-full flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
                >
                  <span>Contact Us</span>
                  <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

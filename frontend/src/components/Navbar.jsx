import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChatTeardropText, Megaphone, Globe, WhatsappLogo, 
  TrendUp, EnvelopeOpen, PhoneCall, List, X, CaretDown,
  AppWindow, CheckCircle
} from '@phosphor-icons/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  // Close mobile menu on page change
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location]);

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

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-nav shadow-md' : 'bg-transparent'}`}>
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

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-4">
            <a 
              href="tel:+919011251125" 
              className="p-2 rounded-lg bg-brand-cream text-brand-charcoal-light hover:bg-brand-yellow/30 transition-colors duration-200"
            >
              <PhoneCall size={18} />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-brand-charcoal text-white hover:bg-brand-orange transition-colors duration-200 cursor-pointer"
            >
              {isOpen ? <X size={20} /> : <List size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slideout */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-b border-brand-charcoal/5 shadow-inner"
          >
            <div className="px-4 pt-3 pb-6 space-y-3 font-semibold text-base">
              <Link 
                to="/" 
                className="block px-3 py-2 rounded-lg hover:bg-brand-cream/30 text-brand-charcoal"
              >
                Home
              </Link>
              
              <Link 
                to="/about" 
                className="block px-3 py-2 rounded-lg hover:bg-brand-cream/30 text-brand-charcoal"
              >
                About Us
              </Link>

              {/* Mobile Services Accordion */}
              <div>
                <button 
                  onClick={toggleDropdown}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-brand-cream/30 text-brand-charcoal text-left cursor-pointer"
                >
                  <span>Services</span>
                  <CaretDown size={16} className={`transform transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-6 pr-2 py-1 space-y-1 bg-brand-cream/10 rounded-lg mt-1"
                    >
                      {serviceLinks.map((srv, idx) => (
                        <Link
                          key={idx}
                          to={srv.path}
                          className="block py-2 text-sm text-brand-charcoal-light hover:text-brand-orange font-medium"
                        >
                          {srv.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link 
                to="/contact" 
                className="block px-3 py-2 rounded-lg hover:bg-brand-cream/30 text-brand-charcoal"
              >
                Contact
              </Link>

              <div className="pt-4 border-t border-brand-charcoal/5 flex items-center gap-3">
                <a 
                  href="https://waba.advaitdigital.co.in/login"
                  className="w-1/2 border border-brand-charcoal/20 text-brand-charcoal hover:border-brand-orange hover:text-brand-orange py-2.5 rounded-lg text-center font-bold text-sm transition duration-200 cursor-pointer block"
                >
                  Login
                </a>
                <a 
                  href="https://waba.advaitdigital.co.in/register"
                  className="w-1/2 bg-brand-charcoal text-white hover:bg-brand-orange py-2.5 rounded-lg text-center font-bold text-sm shadow-md transition duration-200 cursor-pointer block"
                >
                  Register
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Envelope, MapPin, FacebookLogo, TwitterLogo, LinkedinLogo, ArrowUpRight, Eye } from '@phosphor-icons/react';
import { fetchVisitorStats } from '../services/analytics';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [visitorCount, setVisitorCount] = useState(null);

  useEffect(() => {
    fetchVisitorStats().then(stats => {
      if (stats && stats.totalCount) setVisitorCount(stats.totalCount);
    });
  }, []);

  const services = [
    { name: 'Rich Communication Service (RCS)', path: '/services/rcs' },
    { name: 'Bulk SMS for Election', path: '/services/election-sms' },
    { name: 'Website Design & Dev', path: '/services/web-dev' },
    { name: 'WhatsApp Marketing', path: '/services/whatsapp-marketing' },
    { name: 'Digital Marketing Services', path: '/services/digital-marketing' },
    { name: 'SMS Marketing Services', path: '/services/sms-marketing' },
    { name: 'WhatsApp Business API', path: '/services/whatsapp-api' },
    { name: 'Voice Call Services', path: '/services/voice-call' }
  ];

  return (
    <footer className="bg-brand-charcoal text-[#E5E4DE] pt-16 pb-8 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <img
                src="/favicon.png"
                alt="Advait Digital"
                className="h-10 w-10 shrink-0 rounded-xl object-cover shadow-md"
              />
              <span className="font-serif text-xl font-bold tracking-tight text-white leading-none whitespace-nowrap">
                Advait <span className="text-brand-orange">Digital</span>
              </span>
            </Link>
            
            <p className="text-sm text-[#E5E4DE]/70 leading-relaxed font-medium">
              Empowering businesses with top-tier digital services. Scale your customer communications with RCS, WhatsApp Business API, bulk SMS, voice calls, and bespoke web solutions.
            </p>
            
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-brand-orange hover:text-white transition duration-200 cursor-pointer">
                <FacebookLogo size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-brand-orange hover:text-white transition duration-200 cursor-pointer">
                <TwitterLogo size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-brand-orange hover:text-white transition duration-200 cursor-pointer">
                <LinkedinLogo size={18} />
              </a>
            </div>
          </div>

          {/* Digital Services Link */}
          <div>
            <h3 className="text-white font-serif text-lg font-bold mb-6 tracking-wide">
              Digital Services
            </h3>
            <ul className="space-y-3 text-sm text-[#E5E4DE]/85 font-medium">
              {services.map((srv, idx) => (
                <li key={idx}>
                  <Link to={srv.path} className="hover:text-brand-orange transition duration-200 flex items-center gap-1 group">
                    {srv.name}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-serif text-lg font-bold mb-6 tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-[#E5E4DE]/80 font-medium">
              <li>
                <Link to="/" className="hover:text-brand-orange transition duration-200">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-orange transition duration-200">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-orange transition duration-200">Contact Us</Link>
              </li>
              <li>
                <a href="#" className="hover:text-brand-orange transition duration-200">Privacy Policy</a>
              </li>
              <li>
                <Link to="/careers" className="hover:text-brand-orange transition duration-200">Careers</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-serif text-lg font-bold mb-6 tracking-wide">
              Get In Touch
            </h3>
            <ul className="space-y-4 text-sm text-[#E5E4DE]/80 font-medium">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-orange mt-0.5 shrink-0" />
                <span className="leading-relaxed">
                  Office No.522, 5th Floor, Amanora Chambers, Amanora Town Centre East Block, Pune 411028
                </span>
              </li>
              <li className="space-y-2">
                <a href="tel:+918282982829" className="flex items-start gap-3 hover:text-brand-orange transition duration-200 group">
                  <Phone size={18} className="text-brand-orange shrink-0 mt-0.5 group-hover:text-brand-orange transition-colors" />
                  <span className="font-medium">+91 8282982829</span>
                </a>
                <a href="tel:+919011251125" className="flex items-start gap-3 hover:text-brand-orange transition duration-200 group pl-7">
                  <span className="font-medium">+91 9011251125</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Envelope size={18} className="text-brand-orange shrink-0" />
                <a href="mailto:sales@advaitteleservices.com" className="hover:text-brand-orange transition duration-200 break-all">
                  sales@advaitteleservices.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#E5E4DE]/50 font-medium">
          <p>
            Copyright &copy; {currentYear} Advait Teleservices Private Limited. All rights reserved.
          </p>

          {/* Visitor Counter Badge */}
          {visitorCount !== null && (
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
              <Eye size={13} className="text-brand-orange" weight="fill" />
              <span className="text-white/60 text-[10px] font-semibold tabular-nums">
                {visitorCount.toLocaleString('en-IN')}+ visitors
              </span>
            </div>
          )}

          <div className="flex gap-6">
            <Link to="/terms-and-conditions" className="hover:text-brand-orange transition duration-150">Terms of Service</Link>
            <a href="#" className="hover:text-brand-orange transition duration-150">Privacy Policy</a>
            <a href="#" className="hover:text-brand-orange transition duration-150">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

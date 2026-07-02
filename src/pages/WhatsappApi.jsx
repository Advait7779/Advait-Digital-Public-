import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, ChatCircleDots, Handshake, 
  ShieldCheck, Lightning, Globe, Key, Clock, 
  FileText, ChartBar, Check, X 
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

// Import store mockup images
import imgShirt from '../assets/wa_store_shirt.png';
import imgHoney from '../assets/wa_store_honey.png';
import imgShoes from '../assets/wa_store_shoes.png';
import PhoneVideoPlayer from '../components/PhoneVideoPlayer';
import TechVideoPlayer from '../components/TechVideoPlayer';

export default function WhatsappApi() {
  const comparisonData = [
    { feature: 'Designed For', personal: 'Personal', businessApp: 'Single Business User', api: 'SME/Enterprise', isHighlighted: true },
    { feature: 'No of Device', personal: 'Single', businessApp: '2 Device', api: 'Multiple Devices', isHighlighted: true },
    { feature: 'End to End Encryption', personal: true, businessApp: true, api: true },
    { feature: 'Website to WhatsApp Chat', personal: true, businessApp: true, api: true },
    { feature: 'GDPR Compliant', personal: false, businessApp: true, api: true },
    { feature: 'Business Account', personal: false, businessApp: true, api: true },
    { feature: 'Bots & Automation', personal: false, businessApp: false, api: true },
    { feature: 'Shared Team Inbox', personal: false, businessApp: false, api: true },
    { feature: 'Scalable', personal: false, businessApp: false, api: true },
    { feature: 'Integration to 3rd party Software', personal: false, businessApp: false, api: true },
    { feature: 'Enterprise Level Software', personal: false, businessApp: false, api: true },
    { feature: 'Subscription Enrolment', personal: false, businessApp: false, api: true },
    { feature: 'Details Analytics & Reporting', personal: false, businessApp: false, api: true },
    { feature: '3rd Party Lead Engagement', personal: false, businessApp: false, api: true }
  ];

  const convTypes = [
    {
      title: 'User Initiated Conversation (UIC)',
      desc: 'A conversation that initiates in response to a user message. Whenever a business replies to a user within the 24 hour services that message will be associated with a user initiated conversation.'
    },
    {
      title: 'Business Initiated Conversation (BIC)',
      desc: 'A Conversation that initiates from a business sending a user a message outside the 24 hour customer service window.'
    }
  ];

  const keyFeatures = [
    {
      title: 'Break the language barrier',
      desc: 'Deliver multi-lingual support and auto template translation to converse in user’s preferred language',
      icon: Globe
    },
    {
      title: 'Security and quality standards',
      desc: 'Earn trust with clear opt-in requirements, security built in at every layer and end to end encryption',
      icon: ShieldCheck
    },
    {
      title: 'Rapid onboarding',
      desc: 'Fast-track the tedious groundwork, verification hassles and security approvals with 50% faster onboarding',
      icon: Lightning
    },
    {
      title: 'Custom, pre-approved templates',
      desc: 'Simplify launches with our template library for all your needs - appointment reminders, shipping updates, OTPs, alerts and more',
      icon: FileText
    },
    {
      title: 'Rich communication formats',
      desc: 'Elevate campaign performance with engaging images, videos, PDFs, CTAs & quick-reply buttons enabling rich 2-way chats',
      icon: ChatCircleDots
    },
    {
      title: 'Advanced analytics',
      desc: 'Analyze campaign performance, track message deliveries, read receipts, and user engagement metrics in real-time.',
      icon: ChartBar
    }
  ];

  return (
    <div className="pt-24 space-y-12 sm:space-y-16 md:space-y-24 pb-12 sm:pb-16 md:pb-20 bg-brand-cream-light">
      
      {/* Hero Banner with High Contrast and Muted Elegance */}
      <section className="bg-[#0b281b] text-white py-12 sm:py-16 md:py-20 relative overflow-hidden">
        {/* Subtle accent border */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-emerald-500 via-brand-orange to-brand-yellow opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-white transition-colors duration-150 mb-8"
          >
            <ArrowLeft size={14} />
            Back to Services
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (Text content) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                Official Meta Integration
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-white font-serif">
                WhatsApp Business API
              </h1>
              <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed font-medium">
                Advait Digital integrates the WhatsApp Business API to automate customer conversations, build interactive shopping flows, trigger transactional notifications, and support multi-device team inboxes.
              </p>
            </div>
            
            {/* Right Column (Image/Mockup) */}
            <div className="lg:col-span-5 flex justify-center">
              <img 
                src="/edited-photo.png" 
                alt="WhatsApp Business API branding mockup graphic layout" 
                className="w-full h-auto max-w-xs hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Conversation Pricing Tier Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">Session Types</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">Meta Conversations structure</h2>
            <div className="text-xs font-semibold text-brand-charcoal-light max-w-2xl mx-auto">
              💡 Conversations are deducted from a separate WhatsApp Credit Recharge paid directly to Meta.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-4">
            {convTypes.map((c, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-8 sm:p-10 border border-brand-charcoal/10 shadow-md space-y-4 hover:shadow-lg transition-shadow duration-300"
              >
                <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider inline-block">
                  {idx === 0 ? 'UIC - Inbound' : 'BIC - Outbound'}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-brand-charcoal font-serif">{c.title}</h3>
                <p className="text-sm sm:text-base text-brand-charcoal-light leading-relaxed font-medium">
                  {c.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions / Capabilities Section with User Mockup Images */}
      <section className="bg-[#f5f4ea] py-12 sm:py-16 md:py-20 border-y border-brand-charcoal/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section 2: WhatsApp Store (With Interactive Catalog Video) */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Horizontal tech video player showing messaging demo */}
              <div className="lg:col-span-6">
                <TechVideoPlayer src="/bulk election.mp4" title="WhatsApp Campaign Platform" />
              </div>

              <div className="lg:col-span-6 space-y-6">
                <span className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <ChatCircleDots size={24} />
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">
                  Sell More with your WhatsApp Store
                </h3>
                <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed font-medium">
                  Make purchasing frictionless. Showcase your catalogs, share rich single or multi-product messages, and let users place orders in the chat session.
                </p>
                <ul className="space-y-3 text-xs sm:text-sm text-brand-charcoal-light font-semibold">
                  <li className="flex items-start gap-2.5">
                    <Check size={16} className="text-brand-orange shrink-0 mt-0.5" />
                    <span>Showcase relevant products from your catalog with WhatsApp product messages through commerce API</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check size={16} className="text-brand-orange shrink-0 mt-0.5" />
                    <span>Send interactive multi and single-product messages to present products from your inventory</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check size={16} className="text-brand-orange shrink-0 mt-0.5" />
                    <span>Allow adding products to the shopping cart without risking obsolete information such as price and availability</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Displaying User Images in a Gorgeous Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
              {/* Product Card 1: Gucci Shirt */}
              <motion.div 
                className="bg-white rounded-2xl overflow-hidden border border-brand-charcoal/10 shadow-xs flex flex-col"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-[#f0ede2] p-4 flex items-center justify-center border-b border-brand-charcoal/5">
                  <img src={imgShirt} alt="Gucci Floral Shirt Whatsapp Store" className="h-64 object-contain" />
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Gucci Floral Shirt</span>
                    <h4 className="font-bold text-brand-charcoal text-sm font-serif">Catalog Integration</h4>
                    <p className="text-xs text-brand-charcoal-light font-medium">Interactive product messaging allows users to view and buy premium apparel directly in the chat.</p>
                  </div>
                  <div className="text-xs font-bold text-brand-charcoal">Price: $6.00</div>
                </div>
              </motion.div>

              {/* Product Card 2: Organic Honey */}
              <motion.div 
                className="bg-white rounded-2xl overflow-hidden border border-brand-charcoal/10 shadow-xs flex flex-col"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-[#f0ede2] p-4 flex items-center justify-center border-b border-brand-charcoal/5">
                  <img src={imgHoney} alt="Organic Honey Whatsapp Store" className="h-64 object-contain" />
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Organic Raw Honey</span>
                    <h4 className="font-bold text-brand-charcoal text-sm font-serif">Cart Management</h4>
                    <p className="text-xs text-brand-charcoal-light font-medium">Real-time inventory mapping allows orders to be compiled without outdated details.</p>
                  </div>
                  <div className="text-xs font-bold text-brand-charcoal">Price: $16.00</div>
                </div>
              </motion.div>

              {/* Product Card 3: Nike Shoes */}
              <motion.div 
                className="bg-white rounded-2xl overflow-hidden border border-brand-charcoal/10 shadow-xs flex flex-col"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-[#f0ede2] p-4 flex items-center justify-center border-b border-brand-charcoal/5">
                  <img src={imgShoes} alt="Nike Sports Shoes Whatsapp Store" className="h-64 object-contain" />
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Nike Sports Shoes</span>
                    <h4 className="font-bold text-brand-charcoal text-sm font-serif">Checkout Flow</h4>
                    <p className="text-xs text-brand-charcoal-light font-medium">Deliver instant payment links or checkout processes seamlessly in a conversational flow.</p>
                  </div>
                  <div className="text-xs font-bold text-brand-charcoal">Price: $200.00</div>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      {/* Key Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">Scale & Performance</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif max-w-2xl mx-auto">
            Programmable 2-way conversations with unmatchable scale and speed
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keyFeatures.map((f, idx) => {
            const Icon = f.icon;
            return (
              <motion.div 
                key={idx}
                className="bg-white rounded-xl p-6 border border-brand-charcoal/10 shadow-xs space-y-3"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <div className="w-9 h-9 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <h4 className="text-base font-bold text-brand-charcoal font-serif">{f.title}</h4>
                <p className="text-xs sm:text-sm text-brand-charcoal-light font-medium leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Complete Comparison Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">Matrix Overview</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">Solution Comparison Matrix</h2>
          <p className="text-brand-charcoal-light text-xs sm:text-sm font-semibold max-w-xl mx-auto">
            Compare options to select the right approach for your company's digital communications.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-brand-charcoal/10 shadow-xs">
          <table className="w-full text-left border-collapse bg-white">
            <thead>
              <tr className="bg-brand-charcoal text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                <th className="p-4 sm:p-5">Feature</th>
                <th className="p-4 sm:p-5">WhatsApp</th>
                <th className="p-4 sm:p-5">WhatsApp Business App</th>
                <th className="p-4 sm:p-5 bg-emerald-950 text-emerald-400">WhatsApp API</th>
              </tr>
            </thead>
            <tbody className="text-[11px] sm:text-xs text-brand-charcoal font-medium divide-y divide-brand-charcoal/5">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-brand-cream/10 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-brand-charcoal">{row.feature}</td>
                  
                  {/* Column 2: Personal */}
                  <td className="p-4 sm:p-5">
                    {typeof row.personal === 'boolean' ? (
                      row.personal ? (
                        <Check size={16} className="text-emerald-600 font-bold" />
                      ) : (
                        <X size={16} className="text-red-400 font-bold" />
                      )
                    ) : (
                      <span className="text-brand-charcoal-light/85">{row.personal}</span>
                    )}
                  </td>
                  
                  {/* Column 3: Business App */}
                  <td className="p-4 sm:p-5">
                    {typeof row.businessApp === 'boolean' ? (
                      row.businessApp ? (
                        <Check size={16} className="text-emerald-600 font-bold" />
                      ) : (
                        <X size={16} className="text-red-400 font-bold" />
                      )
                    ) : (
                      <span className="text-brand-charcoal-light/85">{row.businessApp}</span>
                    )}
                  </td>
                  
                  {/* Column 4: API */}
                  <td className="p-4 sm:p-5 bg-emerald-50/20 font-semibold text-emerald-900">
                    {typeof row.api === 'boolean' ? (
                      row.api ? (
                        <Check size={18} className="text-emerald-700 font-extrabold" />
                      ) : (
                        <X size={18} className="text-red-500 font-extrabold" />
                      )
                    ) : (
                      <span className="font-bold text-emerald-800">{row.api}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {/* Typographic CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#0b281b] border border-white/10 rounded-2xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15),transparent_60%)]"></div>
          <div className="relative z-10 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Ready to integrate WhatsApp Business API?
            </h3>
            <p className="text-emerald-200/80 text-xs sm:text-sm max-w-xl mx-auto font-medium leading-relaxed">
              Get template approval, custom chatbot flows, and scalable CRM connectivity. Speak directly to our lead integration team.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange/90 text-white w-full sm:w-80 py-3.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shadow-md shadow-brand-orange/20 hover:scale-[1.02]"
              >
                Start Integration Setup
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import React, { useState } from 'react';
import SEOHead from '../components/SEOHead';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  EnvelopeOpen, ArrowLeft, CurrencyInr, ArrowRight, ShieldCheck,
  CheckCircle, ListChecks, Laptop, Gear, Clock, Phone, ChatCircleText,
  UserCheck, Globe
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import PhoneVideoPlayer from '../components/PhoneVideoPlayer';
import TechVideoPlayer from '../components/TechVideoPlayer';

// Import graphics copied from uploaded assets
import imgStory from '../assets/sms_story.png';
import imgPersonal from '../assets/sms_personal.png';
import imgConversation from '../assets/sms_conversation.png';
import imgPhone from '../assets/sms_marketing_phone.png';
import imgDelivered from '../assets/sms_delivered.png';
import imgRead from '../assets/sms_read.png';
import imgAdapt from '../assets/sms_adapt.png';
import imgDashboard from '../assets/sms_dashboard.png';
import imgHelp from '../assets/sms_help.png';

export default function SmsMarketing() {
  const [pricingTab, setPricingTab] = useState('bundles'); // 'bundles', 'longcode', 'keyword'

  const corePillars = [
    {
      title: 'Tell a Story',
      desc: 'Feel unencumbered by character limits access our 1224-character limit and tell your story exactly how you want. With no setup fees or hidden charges, Advait Teleservices is your bulk text messaging solution!',
      img: imgStory
    },
    {
      title: 'Make it Personal',
      desc: 'Personalise your messages by attaching customer information through our bulk SMS software. Make your message feel relevant to your customer and achieve better results through our mass text messaging service.',
      img: imgPersonal
    },
    {
      title: 'Make it a conversation',
      desc: 'You can gain access to any replies to your bulk SMS marketing communication. You won’t have to settle for one-way marketing, as you’ll be able to deliver and receive information via our bulk SMS software.',
      img: imgConversation
    }
  ];

  const benefits = [
    {
      title: 'Your messages get delivered',
      desc: 'Our bulk SMS software guarantees delivery. We are an SMS marketing company that have expertise in the industry and we are confident in our service. Thus we are able to offer a 100% Uptime SLA Guarantee.',
      img: imgDelivered
    },
    {
      title: 'Your messages get read',
      desc: 'Choose to launch your SMS marketing campaign bypass email filters and reach your customers directly through SMS. Guarantee your customers are receiving your mass text messaging campaign and that customers are able to access your message easily. Integrate SMS campaigns into your marketing calendar and watch your open rates and click throughs soar.',
      img: imgRead
    },
    {
      title: 'Adapts to your company and your software',
      desc: 'Our bulk SMS service is customizable, meaning our team will work hard to make your messaging suit your business. We also offer sleek API integrations to cover all of your bulk SMS requirements.',
      img: imgAdapt
    },
    {
      title: 'Engage your customers on the platforms they use',
      desc: 'Send all your communications from one easy dashboard. We also offer a bulk MMS platform transactional and marketing email services electronic fax service text-to-speech voice gateway an online letter service, customized postcard printing and mailing.',
      img: imgDashboard
    },
    {
      title: 'Help is always at hand, any day, any time',
      desc: 'Did you know that you can contact us any time of day, any day of the week? That’s right, a live human is available for contact 24/7. Got a burning question? We want to know.',
      img: imgHelp
    }
  ];

  const smsBundles = [
    { qty: '10 Messages', total: 'FREE', rate: 'FREE' },
    { qty: '5,000 Messages', total: '1,475', rate: '29.5 paisa' },
    { qty: '10,000 Messages', total: '2,950', rate: '29.5 paisa' },
    { qty: '25,000 Messages', total: '7,000', rate: '28.0 paisa' },
    { qty: '50,000 Messages', total: '12,250', rate: '24.5 paisa' },
    { qty: '100,000 Messages', total: '22,500', rate: '22.5 paisa' },
    { qty: '250,000 Messages', total: '53,750', rate: '21.5 paisa' },
    { qty: '500,000 Messages', total: '1,02,500', rate: '20.5 paisa' },
    { qty: '1,000,000 Messages', total: '2,00,000', rate: '20.0 paisa' }
  ];

  const longCodeRates = [
    { duration: 'SETUP Fee', total: 'FREE', setup: 'Instant Setup' },
    { duration: '1 Month Contract', total: '5,000', setup: 'Dedicated Long Code' },
    { duration: '3 Months Contract', total: '13,500', setup: 'Dedicated Long Code' },
    { duration: '1 Year Contract', total: '40,000', setup: 'Dedicated Long Code' }
  ];

  const keywordRates = [
    { duration: 'SETUP Fee', total: 'FREE', setup: 'Instant Setup' },
    { duration: '1 Month Keyword', total: '500', setup: 'Shared Long Code' },
    { duration: '3 Months Keyword', total: '1,350', setup: 'Shared Long Code' },
    { duration: '1 Year Keyword', total: '5,000', setup: 'Shared Long Code' }
  ];

  const features = [
    'Send Files via SMS',
    'Personalize Bulk Sends',
    'Send in 20+ Languages',
    'Real-time Reports',
    'Custom Sender IDs',
    'Free SMS APIs',
    'Manage Inbound SMS',
    'Opt-out/Opt-in Path',
    'Surveys & Forms',
    'Excel to SMS Plugin',
    'Android/iOS App'
  ];

  return (
    <div className="pt-24 space-y-12 sm:space-y-16 md:space-y-24 pb-12 sm:pb-16 md:pb-20 bg-brand-cream-light font-sans">
      <SEOHead
        title="Bulk SMS Marketing Service India — Promotional & Transactional SMS"
        description="Advait Digital offers high-delivery bulk SMS marketing services in India. Send promotional, transactional, and OTP SMS to thousands instantly. DLT compliant. Serve Pune, Mumbai & all India."
        keywords="bulk SMS service India, SMS marketing India, promotional SMS India, transactional SMS service, bulk SMS Pune, OTP SMS service, DLT compliant SMS, SMS campaign India, affordable bulk SMS, mass SMS sender India"
        canonical="/services/sms-marketing"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Bulk SMS Marketing Service",
            "provider": { "@type": "Organization", "name": "Advait Digital", "url": "https://advaitdigital.co.in" },
            "areaServed": "India",
            "description": "High-delivery bulk SMS marketing — promotional, transactional, and OTP SMS campaigns with DLT compliance across India.",
            "url": "https://advaitdigital.co.in/services/sms-marketing",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "184"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://advaitdigital.co.in/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "SMS Marketing Service",
                "item": "https://advaitdigital.co.in/services/sms-marketing"
              }
            ]
          }
        ]}
      />
      
      {/* High-Contrast Crimson Hero Section */}
      <section className="bg-[#3b0b11] text-white py-12 sm:py-16 md:py-20 relative overflow-hidden">
        {/* Decorative bottom border gradient */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-red-500 via-brand-orange to-brand-yellow opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-white transition-colors duration-150 mb-8"
          >
            <ArrowLeft size={14} />
            Back to Services
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (Text content) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="px-3 py-1 rounded bg-red-500/20 text-red-300 text-xs font-bold uppercase tracking-wider">
                Marketing Channels
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif leading-tight tracking-tight text-white">
                SMS Marketing Services
              </h1>
              <p className="text-red-100/90 text-sm sm:text-base leading-relaxed font-medium">
                Advait Digital provides reliable bulk SMS marketing campaigns to connect with thousands of potential customers globally. Reach your target audience directly on their phones with personalized promotions and 100% delivery uptime.
              </p>
            </div>
            
            {/* Right Column (Image/Mockup) */}
            <div className="lg:col-span-5 flex justify-center">
              <img 
                src={imgDashboard} 
                alt="Dashboard illustration with multi-channel broadcast sending options" 
                className="w-full h-auto max-w-sm hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Pillars Circular Avatar Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {corePillars.map((pillar, idx) => (
            <div key={idx} className="bg-white border border-brand-charcoal/5 rounded-3xl p-8 text-center space-y-6 hover:shadow-md transition-shadow duration-300">
              <div className="w-28 h-28 rounded-full overflow-hidden mx-auto border-4 border-slate-100 shadow-sm">
                <img 
                  src={pillar.img} 
                  alt={pillar.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-brand-charcoal font-serif">{pillar.title}</h3>
              <p className="text-sm text-brand-charcoal-light leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Marketing vs Transactional SMS Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Horizontal tech video player mockup on the left */}
          <div className="lg:col-span-6">
            <TechVideoPlayer src="/bulk election.mp4" title="Bulk SMS & Election Marketing Portal" />
          </div>

          <div className="lg:col-span-6 space-y-10">
            {/* Marketing SMS */}
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Promotional Alerts</span>
                <h3 className="text-2xl font-bold text-brand-charcoal font-serif">Marketing SMS</h3>
                <div className="w-16 h-1 bg-red-500 rounded"></div>
              </div>
              <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed">
                Promotional sms services are used to send discounts and promotional offers to customers. We help you send bulk personalized sms to your customers with few clicks. With our easy to use platform, set up a sms campaign, and inform your customers by sending regular alerts and promo codes. Sender ID or header is created to send such messages . No alphabetic characters can be used in ID. Once set up, we provide you with instant deliverability and accurate delivery reports. Our bulk sms promotional services are designed to promote your business and boost engagement levels.
              </p>
            </div>

            {/* Transactional SMS */}
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">API Triggers & OTPs</span>
                <h3 className="text-2xl font-bold text-brand-charcoal font-serif">Transactional SMS</h3>
                <div className="w-16 h-1 bg-red-500 rounded"></div>
              </div>
              <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed">
                Use transactional sms services to interact and engage with your customers in real time. We provide a fully managed sms API that goes beyond just sending messages. You can schedule SMS, manage contacts, and get real time delivery status. We use advanced routing technologies to send transactions sms over multiple networks. use our platform to send information, alerts, and OTP 24*7 to non DND mobile numbers.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Benefits of Bulk SMS Marketing (Alternating layout with uploaded images) */}
      <section className="bg-white py-12 sm:py-16 md:py-20 border-y border-brand-charcoal/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-2">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">Why Bulk SMS</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">Benefits of Bulk SMS Marketing</h2>
            <div className="w-24 h-1 bg-brand-orange mx-auto rounded"></div>
          </div>

          <div className="space-y-24 max-w-5xl mx-auto">
            {benefits.map((benefit, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Graphic layout */}
                  <div className={`lg:col-span-5 flex justify-center ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <img 
                      src={benefit.img} 
                      alt={benefit.title} 
                      className="max-h-48 w-auto max-w-sm rounded-lg object-contain"
                    />
                  </div>

                  {/* Text layout */}
                  <div className={`lg:col-span-7 space-y-4 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <h3 className="text-xl sm:text-2xl font-bold text-brand-charcoal font-serif">{benefit.title}</h3>
                    <div className="w-12 h-1 bg-red-500 rounded"></div>
                    <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Pricing Grids & Checkboxes Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">DLT Pricing</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">Simple Flexible Bulk SMS Pricing</h2>
          <p className="text-slate-500 text-xs font-medium">Pay As You Go. No Hidden Setup Fees. Forever Free To Use SMS Platform.</p>
          <div className="w-16 h-1 bg-red-600 mx-auto rounded mb-4"></div>
          
          {/* Tabs switch */}
          <div className="inline-flex rounded-2xl p-1.5 bg-slate-100 border border-slate-200 shadow-inner mt-4">
            <button
              onClick={() => setPricingTab('bundles')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${pricingTab === 'bundles' ? 'bg-red-600 text-white shadow-md' : 'text-slate-600 hover:text-red-600'}`}
            >
              SMS Bundles (Credits)
            </button>
            <button
              onClick={() => setPricingTab('longcode')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${pricingTab === 'longcode' ? 'bg-red-600 text-white shadow-md' : 'text-slate-600 hover:text-red-600'}`}
            >
              Dedicated Long Code
            </button>
            <button
              onClick={() => setPricingTab('keyword')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${pricingTab === 'keyword' ? 'bg-red-600 text-white shadow-md' : 'text-slate-600 hover:text-red-600'}`}
            >
              Shared Keywords
            </button>
          </div>
        </div>

        {/* Pricing content display alongside the 11 checkboxes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Pricing Tables */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {pricingTab === 'bundles' && (
                <motion.div
                  key="bundles"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.18 }}
                  className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm p-6 space-y-4"
                >
                  <h4 className="text-lg font-bold text-slate-800 font-serif border-b pb-3 mb-2">SMS Bundles Rates</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 font-bold text-xs uppercase">
                          <th className="py-2.5">SMS Bundle</th>
                          <th className="py-2.5">Per Bundle</th>
                          <th className="py-2.5">Per SMS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {smsBundles.map((b, idx) => (
                          <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                            <td className="py-3 font-semibold text-slate-700">{b.qty}</td>
                            <td className="py-3 font-bold text-slate-900">
                              {b.total === 'FREE' ? 'FREE' : `₹${b.total}`}
                            </td>
                            <td className="py-3 text-slate-500 font-medium">{b.rate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {pricingTab === 'longcode' && (
                <motion.div
                  key="longcode"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.18 }}
                  className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm p-6 space-y-4"
                >
                  <h4 className="text-lg font-bold text-slate-800 font-serif border-b pb-3 mb-2">Dedicated Long Code Pricing</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                    Get a dedicated long code (10 digit number). Configure multiple inboxes using as many keywords as you like. You have sole use of this number. Any texts sent to this long number (e.g. 92205 xxxxx) are received in your inbox.
                  </p>
                  <div className="overflow-x-auto pt-2">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 font-bold text-xs uppercase">
                          <th className="py-2.5">Contract</th>
                          <th className="py-2.5">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {longCodeRates.map((lc, idx) => (
                          <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                            <td className="py-3 font-semibold text-slate-700">{lc.duration}</td>
                            <td className="py-3 font-bold text-slate-900">
                              {lc.total === 'FREE' ? 'FREE' : `₹${lc.total}`}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {pricingTab === 'keyword' && (
                <motion.div
                  key="keyword"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.18 }}
                  className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm p-6 space-y-4"
                >
                  <h4 className="text-lg font-bold text-slate-800 font-serif border-b pb-3 mb-2">Business Keyword On A Long Code</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                    Choose your own business keyword (e.g. MYCOMP) on any of the shared long codes (e.g. 92205 92205). Any SMS sent with your keyword will be received in your inbox. An effective low-cost option to get you started!
                  </p>
                  <div className="overflow-x-auto pt-2">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 font-bold text-xs uppercase">
                          <th className="py-2.5">Contract</th>
                          <th className="py-2.5">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {keywordRates.map((kw, idx) => (
                          <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                            <td className="py-3 font-semibold text-slate-700">{kw.duration}</td>
                            <td className="py-3 font-bold text-slate-900">
                              {kw.total === 'FREE' ? 'FREE' : `₹${kw.total}`}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6">
              <Link
                to="/contact"
                className="w-full text-center bg-[#3b0b11] hover:bg-[#3b0b11]/90 text-white py-3 rounded-xl text-xs font-bold transition-all duration-200 block shadow-xs hover:scale-[1.01]"
              >
                Enquire Package Rate
              </Link>
            </div>
          </div>

          {/* Features Checkbox Checklist on the Right */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
            <h4 className="text-base font-bold text-slate-800 font-serif border-b pb-3 leading-tight">
              Just pay for SMS. Get access to 50+ free features right out of the box including:
            </h4>
            <div className="space-y-3">
              {features.map((feat, idx) => (
                <div key={idx} className="flex gap-2.5 text-xs sm:text-sm text-slate-600 font-medium">
                  <CheckCircle size={16} className="text-red-600 shrink-0 mt-0.5" />
                  <p>{feat}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Explore Platform Banner CTA (just above the footer) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-[#3b0b11] py-10 sm:py-12 md:py-16 px-8 text-center space-y-6 shadow-xl border border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.15),transparent_60%)]"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-red-300 uppercase tracking-widest">Platform Integration</span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-serif">Explore our Fully Featured Bulk SMS Platform</h3>
            <p className="text-red-200/85 text-sm max-w-md mx-auto font-medium">
              We help you grow
            </p>
            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange/90 text-white w-full sm:w-80 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-md shadow-brand-orange/20 hover:scale-[1.02]"
              >
                Request A Quote
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

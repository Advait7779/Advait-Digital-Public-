import React, { useState } from 'react';
import SEOHead from '../components/SEOHead';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, Robot, FileArrowUp, CurrencyInr, CheckCircle, 
  ArrowLeft, ArrowRight, Buildings, Airplane, GraduationCap, 
  Storefront, ShoppingCart, Tag, WhatsappLogo
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

// Import graphics copied from uploaded assets
import imgBusiness from '../assets/wa_marketing_business.png';
import imgLogo from '../assets/wa_marketing_logo.png';

export default function WhatsappMarketing() {
  const [pricingMode, setPricingMode] = useState('submission'); // 'submission' or 'delivery'

  const coreBenefits = [
    { 
      title: 'Helps To Connect Globally', 
      desc: 'WhatsApp Marketing service helps the business to connect with target customers who are present across the World.',
      icon: Globe
    },
    { 
      title: 'Automated Marketing', 
      desc: 'The service providers will make use of the WhatsApp marketing software to automate the messages such that you can have good control over it.',
      icon: Robot
    },
    { 
      title: 'Multimedia Support', 
      desc: 'In WhatsApp marketing, you can send the eye-catching messages along with image and video to grab the attention of the clients instantly.',
      icon: FileArrowUp
    },
    { 
      title: 'Affordable Marketing', 
      desc: 'You can promote your product or service through Whatsapp marketing at a reasonable price when compared to other marketing techniques.',
      icon: Tag
    }
  ];

  const businessBenefits = [
    'Reach to the target audience anywhere in the world.',
    'Advertise product as DOC, XLSX, PDF, PPT attachments.',
    'Promote your product\'s in a detailed format, interactively.',
    'Get analytics report of customers who viewed your message.',
    'No more paper advertisements, promote your product digitally.',
    'Share business information in most protected file format, i.e PDF.',
    'Present your product graphically to gain better customer attention.',
    'Get keyword-focused marketing platform to promote your business.',
    'Share company profiles and product catalogue to prospective buyers.',
    'Gain insights to large user database who sent keywords to receive the message.'
  ];

  const industries = [
    { 
      name: 'ECommerce', 
      desc: 'Share product description, features, benefits, and pricing details with prospective buyers interactively via bulk SMS on WhatsApp and boost your sales graph.',
      icon: ShoppingCart 
    },
    { 
      name: 'Travel & Tourism', 
      desc: 'Attract more customers by marketing adventurous tour details along with flight details, hotel images, attractive site-seeing descriptions, etc to sell more travel packages.',
      icon: Airplane 
    },
    { 
      name: 'Real Estate Agents', 
      desc: 'An ultimate marketing platform for real estate agents to display property listings with prospective buyers in just few seconds.',
      icon: Buildings 
    },
    { 
      name: 'Banking & Insurance', 
      desc: 'Promote existing and new financial schemes, fixed-deposit offerings, insurance products, and other services to inform and attract customers to purchase it.',
      icon: CurrencyInr 
    },
    { 
      name: 'College & Universities', 
      desc: 'Educational institutions can share their admission prospectus, specific program details with aspirants based on the program-specific keywords mentioned in the WhatsApp message.',
      icon: GraduationCap 
    },
    { 
      name: 'Malls & Retail Outlets', 
      desc: 'You can share detailed information about any particular product, entire product catalog, product-wise deals, festival discounts, etc with customers to promote outlet sales.',
      icon: Storefront 
    }
  ];

  const pricingData = {
    submission: [
      { qty: '10K WhatsApp SMS', rate: '20P', total: '2,000', features: ['Deliver Between 10AM to 06PM', 'Send Text + Images, Video', 'No Refund for All Non-Whatsapp Numbers', 'Complete Campaign Reports', 'Delivery in 3-6 hrs', 'Sent Using Random Numbers', '1 Year Validity', '100% Advance Payment'] },
      { qty: '50K WhatsApp SMS', rate: '16P', total: '8,000', features: ['Deliver Between 10AM to 06PM', 'Send Text + Images, Video', 'No Refund for Non-Whatsapp Numbers', 'Complete Campaign Reports', 'Delivery in 3-6 hrs', 'Sent Using Random Numbers', '1 Year Validity', '100% Advance Payment'] },
      { qty: '1Lac WhatsApp SMS', rate: '12P', total: '12,000', features: ['Deliver Between 10AM to 06PM', 'Send Text + Images, Video', 'No Refund for Non-Whatsapp Numbers', 'Complete Campaign Reports', 'Delivery in 3-6 hrs', 'Sent Using Random Numbers', '1 Year Validity', '100% Advance Payment'] },
      { qty: '5Lac WhatsApp SMS', rate: '10P', total: '50,000', features: ['Deliver Between 10AM to 06PM', 'Send Text + Images, Video', 'No Refund for Non-Whatsapp Numbers', 'Complete Campaign Reports', 'Delivery in 3-6 hrs', 'Sent Using Random Numbers', '1 Year Validity', '100% Advance Payment'] }
    ],
    delivery: [
      { qty: '10K WhatsApp SMS', rate: '25P', total: '2,500', features: ['Deliver Between 10AM to 06PM', 'Send Text + Images, Video', 'Refund for All Non-Whatsapp Numbers', 'Complete Campaign Reports', 'Delivery in 3-6 hrs', 'Sent Using Random Numbers', '1 Year Validity', '100% Advance Payment'] },
      { qty: '50K WhatsApp SMS', rate: '20P', total: '10,000', features: ['Deliver Between 10AM to 06PM', 'Send Text + Images, Video', 'Refund for All Non-Whatsapp Numbers', 'Complete Campaign Reports', 'Delivery in 3-6 hrs', 'Sent Using Random Numbers', '1 Year Validity', '100% Advance Payment'] },
      { qty: '1Lac WhatsApp SMS', rate: '16P', total: '16,000', features: ['Deliver Between 10AM to 06PM', 'Send Text + Images, Video', 'Refund for All Non-Whatsapp Numbers', 'Complete Campaign Reports', 'Delivery in 3-6 hrs', 'Sent Using Random Numbers', '1 Year Validity', '100% Advance Payment'] },
      { qty: '5Lac WhatsApp SMS', rate: '14P', total: '70,000', features: ['Deliver Between 10AM to 06PM', 'Send Text + Images, Video', 'Refund for All Non-Whatsapp Numbers', 'Complete Campaign Reports', 'Delivery in 3-6 hrs', 'Sent Using Random Numbers', '1 Year Validity', '100% Advance Payment'] }
    ]
  };

  return (
    <div className="pt-24 space-y-12 sm:space-y-16 md:space-y-24 pb-12 sm:pb-16 md:pb-20 bg-brand-cream-light font-sans">
      <SEOHead
        title="WhatsApp Marketing Service India — Bulk WhatsApp Broadcast & Campaigns"
        description="Advait Digital offers WhatsApp marketing services in India including bulk broadcast, rich media campaigns, automated chatbot flows, and product showcase. Reach millions on WhatsApp instantly."
        keywords="WhatsApp marketing India, bulk WhatsApp message India, WhatsApp broadcast service, WhatsApp campaign India, WhatsApp business marketing, WhatsApp bulk sender India, WhatsApp marketing Pune, WhatsApp promotional messages"
        canonical="/services/whatsapp-marketing"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "WhatsApp Marketing Service",
            "provider": { "@type": "Organization", "name": "Advait Digital", "url": "https://advaitdigital.co.in" },
            "areaServed": "India",
            "description": "Bulk WhatsApp marketing campaigns with rich media, broadcast lists, and automated chatbot flows.",
            "url": "https://advaitdigital.co.in/services/whatsapp-marketing",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "142"
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
                "name": "WhatsApp Marketing Service",
                "item": "https://advaitdigital.co.in/services/whatsapp-marketing"
              }
            ]
          }
        ]}
      />
      
      {/* High-Contrast Emerald Green Hero Section */}
      <section className="bg-[#0b2b1b] text-white py-12 sm:py-16 md:py-20 relative overflow-hidden">
        {/* Decorative bottom border gradient */}
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
                Marketing Channels
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif leading-tight tracking-tight text-white">
                Whatsapp Marketing Services
              </h1>
              <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed font-medium">
                Advait Digital offers customized WhatsApp marketing solutions to help you connect globally, automate messaging campaigns, and showcase products interactively using rich media to scale your business growth.
              </p>
            </div>
            
            {/* Right Column (Image/Mockup) */}
            <div className="lg:col-span-5 flex justify-center">
              <img 
                src={imgBusiness} 
                alt="Phone displaying WhatsApp Business installation page layout" 
                className="w-full h-auto max-w-sm hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What is WhatsApp Marketing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image Column (Left on Desktop) */}
          <div className="lg:col-span-5 flex justify-center">
            <img 
              src="/edited-photo.png" 
              alt="Phone displaying WhatsApp Business installation page layout" 
              className="w-full h-auto max-w-sm"
            />
          </div>

          {/* Text Column (Right on Desktop) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Overview</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-charcoal">
                What is Whatsapp Marketing
              </h2>
              <div className="w-16 h-1 bg-emerald-600 rounded"></div>
            </div>
            
            <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed">
              WhatsApp is a free mobile app that uses internet on the smartphone to chat, make voice calls, or video calls to other WhatsApp users without any charges. WhatsApp also allows sharing of files and images easily. Businesses are increasingly incorporating bulk WhatsApp marketing campaign strategy in their marketing plans because it is cross platform tool which works across devices like android, iPhone, blackberry, windows etc.
            </p>
            <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed font-semibold text-emerald-700">
              WhatsApp is a powerful, interactive and effective marketing tool to reach large number of customers globally, through our Whatsapp marketing services you can get the data of high net worth clients in your targeted location who may be interested in buying your products or services, this saves you time and cost of involving into all other marketing tactics.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Core Benefits Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-2">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">Benefits</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">Benefits of Using Whatsapp Marketing Service</h2>
          <div className="w-24 h-1 bg-brand-orange mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreBenefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div key={idx} className="bg-white border border-brand-charcoal/5 rounded-2xl p-6 space-y-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-brand-charcoal font-serif">{benefit.title}</h3>
                <p className="text-sm text-brand-charcoal-light leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>


      {/* 10 Business Benefits checkmark list */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Business Advantages</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-charcoal">
                Benefits of Whatsapp Marketing services for your Business
              </h2>
              <p className="text-xs text-brand-charcoal-light font-medium">Connect with People & Promote your product to wide Audience Base</p>
              <div className="w-16 h-1 bg-emerald-600 rounded"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {businessBenefits.map((bullet, idx) => (
                <div key={idx} className="flex gap-3 text-sm text-brand-charcoal-light leading-relaxed">
                  <CheckCircle size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <p>{bullet}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <img 
              src={imgLogo} 
              alt="Phone showing WhatsApp Marketing logo design graphic" 
              className="w-full h-auto max-w-xs"
            />
          </div>
        </div>
      </section>

      {/* Industry Verticals Grid */}
      <section className="bg-white py-12 sm:py-16 md:py-20 border-y border-brand-charcoal/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">Verticals</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">Connect with customers Digitally via WhatsApp</h2>
            <div className="w-24 h-1 bg-brand-orange mx-auto rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind, idx) => {
              const Icon = ind.icon;
              return (
                <div key={idx} className="bg-brand-cream-light/40 border border-brand-charcoal/5 rounded-2xl p-8 space-y-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-brand-charcoal font-serif">{ind.name}</h3>
                  <p className="text-sm text-brand-charcoal-light leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Tables Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Pricing Plans</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">Budget-Friendly Bulk Campaign Plans</h2>
          <div className="w-16 h-1 bg-emerald-600 mx-auto rounded mb-4"></div>
          
          {/* Toggle Switches */}
          <div className="inline-flex rounded-2xl p-1.5 bg-slate-100 border border-slate-200 shadow-inner mt-4">
            <button
              onClick={() => setPricingMode('submission')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${pricingMode === 'submission' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-emerald-600'}`}
            >
              WhatsApp Bulk SMS (Submission)
            </button>
            <button
              onClick={() => setPricingMode('delivery')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${pricingMode === 'delivery' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-emerald-600'}`}
            >
              WhatsApp Bulk SMS (Delivery basis)
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {pricingData[pricingMode].map((pkg, idx) => (
              <motion.div
                key={`${pricingMode}-${idx}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.18, delay: idx * 0.04 }}
                className="bg-white rounded-3xl p-6 border border-slate-200/60 flex flex-col justify-between hover:shadow-lg hover:border-emerald-600/20 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Visual Accent bar on hover */}
                <div className="absolute top-0 inset-x-0 h-1 bg-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                
                <div>
                  <h3 className="text-base font-bold text-slate-800 mb-1">{pkg.qty}</h3>
                  <div className="flex items-baseline gap-1 border-b border-slate-100 pb-4 mb-4">
                    <span className="text-2xl font-bold text-slate-900 flex items-center font-serif">
                      <CurrencyInr size={20} className="text-emerald-600" />
                      {pkg.total}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">/ {pkg.rate} Per SMS</span>
                  </div>
                  
                  <ul className="space-y-2.5 mb-6 text-[10px] text-slate-600 font-semibold">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link
                  to="/contact"
                  className="w-full text-center bg-[#0b2b1b] hover:bg-[#0b2b1b]/90 text-white py-3 rounded-xl text-xs font-bold transition-all duration-200 block shadow-xs hover:scale-[1.02] cursor-pointer"
                >
                  Buy Now
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <p className="text-[10px] text-slate-400 text-center font-bold mt-6">
          * 18% GST Extra. All campaigns require 100% advance payment. Valid for 1 year. Delivered using random numbers.
        </p>
      </section>
      {/* Interactive CTA Banner: Engage with your Audience (just above the footer) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-[#0b2b1b] py-10 sm:py-12 md:py-16 px-8 text-center space-y-6 shadow-xl border border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15),transparent_60%)]"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">Digital Promotion</span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-serif">Engage with your Audience on Whatsapp</h3>
            <p className="text-emerald-200/80 text-sm max-w-md mx-auto font-medium">
              Promote Your Business Digitally
            </p>
            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange/90 text-white w-full sm:w-80 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-md shadow-brand-orange/20 hover:scale-[1.02]"
              >
                Contact Us
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

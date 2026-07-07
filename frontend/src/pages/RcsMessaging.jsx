import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CaretDown, CaretUp } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

// Import official RCS service images
import imgDashboard from '../assets/rcs_dashboard.png';
import imgComparison from '../assets/rcs_comparison.png';
import imgMultiplatform from '../assets/rcs_multiplatform.png';

export default function RcsMessaging() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'What is RCS Business Messaging?',
      a: 'RCS Business Messaging is an advanced messaging solution that allows businesses to enhance their communication with customers through interactive, rich media messages. It leverages the capabilities of RCS, an upgrade to traditional SMS, to provide a whole host of features such as branding, rich media elements, suggested replies, carousels, and more.'
    },
    {
      q: 'Does RCS fall back to SMS?',
      a: 'Yes, an RCS message can be configured to fall back to SMS (also referred to as SMS failover) if a recipient’s device or carrier does not support the RCS protocol.'
    }
  ];

  return (
    <div className="pt-24 space-y-12 sm:space-y-16 md:space-y-24 pb-12 sm:pb-16 md:pb-20 bg-brand-cream-light">
      <SEOHead
        title="RCS Messaging Service India — Rich Communication Services Business Messaging"
        description="Advait Digital offers verified RCS business messaging in India. Upgrade from plain SMS to branded, interactive RCS messages with images, carousels, quick-reply buttons, and verified sender IDs."
        keywords="RCS messaging India, rich communication services India, RCS business messaging, verified RCS sender India, RCS SMS upgrade, interactive business messaging India, RCS chatbot, branded messaging India, RCS marketing"
        canonical="/services/rcs"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "RCS Business Messaging Service",
            "provider": { "@type": "Organization", "name": "Advait Digital", "url": "https://advaitdigital.co.in" },
            "areaServed": "India",
            "description": "Verified RCS messaging campaigns with rich media, carousels, and branded sender profiles.",
            "url": "https://advaitdigital.co.in/services/rcs",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "96"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is RCS Business Messaging?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "RCS Business Messaging is an advanced messaging solution that allows businesses to enhance their communication with customers through interactive, rich media messages. It leverages the capabilities of RCS, an upgrade to traditional SMS, to provide a whole host of features such as branding, rich media elements, suggested replies, carousels, and more."
                }
              },
              {
                "@type": "Question",
                "name": "Does RCS fall back to SMS?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, an RCS message can be configured to fall back to SMS (also referred to as SMS failover) if a recipient’s device or carrier does not support the RCS protocol."
                }
              }
            ]
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
                "name": "RCS Business Messaging",
                "item": "https://advaitdigital.co.in/services/rcs"
              }
            ]
          }
        ]}
      />
      
      {/* Hero Banner with High Contrast */}
      <section className="bg-[#0b152d] text-white py-12 sm:py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-indigo-500 via-brand-orange to-brand-yellow opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-white transition-colors duration-150 mb-8"
          >
            <ArrowLeft size={14} />
            Back to Services
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (Text content) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="px-3 py-1 rounded bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                RCS Business Messaging
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-white font-serif">
                RCS Messaging Services
              </h1>
              <p className="text-indigo-100/90 text-sm sm:text-base leading-relaxed font-medium">
                Advait Digital deploys verified RCS (Rich Communication Services) campaigns to upgrade traditional SMS into interactive chats featuring branded sender profiles, rich media carousels, and quick-reply action buttons.
              </p>
            </div>
            
            {/* Phone mockup container on the right */}
            <div className="lg:col-span-5 flex justify-center text-brand-charcoal text-xs">
              <div className="w-64 bg-zinc-900 rounded-[36px] p-3 shadow-lg border-4 border-zinc-800">
                <div className="bg-slate-50 rounded-[28px] overflow-hidden h-[400px] flex flex-col justify-between border border-zinc-700/10">
                  {/* Phone Header */}
                  <div className="bg-indigo-950 text-white px-4 pt-6 pb-3 flex items-center gap-2.5 border-b border-indigo-900/30">
                    <div className="w-7 h-7 rounded-full bg-white text-indigo-950 flex items-center justify-center font-bold text-[10px] shadow-xs">
                      AD
                    </div>
                    <div>
                      <h4 className="font-bold text-[10px] leading-tight flex items-center gap-1 text-white">
                        Advait Digital
                        <span className="w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center text-[7px] text-white">✓</span>
                      </h4>
                      <p className="text-[7px] text-indigo-300 font-semibold leading-none">Verified Profile</p>
                    </div>
                  </div>
                  
                  {/* Chat Content */}
                  <div className="p-3 flex-1 overflow-y-auto space-y-3 bg-[#eef0f5] flex flex-col justify-end">
                    <div className="bg-white rounded-xl p-2.5 shadow-xs space-y-2 border border-slate-100 max-w-[90%]">
                      <div className="h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-[9px] font-bold text-white uppercase tracking-wider">
                        Live updates
                      </div>
                      <h5 className="font-bold text-[9px] text-brand-charcoal">RCS Marketing Campaign</h5>
                      <p className="text-[7px] text-brand-charcoal-light leading-relaxed font-semibold">
                        Hi John, explore our latest conversational dashboards and business services with verified branding!
                      </p>
                    </div>
                    
                    {/* Suggested actions inside chat */}
                    <div className="space-y-1.5 w-[90%]">
                      <div className="py-1.5 px-3 bg-white border border-indigo-200 rounded-full text-center text-[8px] text-indigo-800 font-bold shadow-xs cursor-pointer hover:bg-indigo-50/50">
                        View Recommendations
                      </div>
                      <div className="py-1.5 px-3 bg-white border border-indigo-200 rounded-full text-center text-[8px] text-indigo-800 font-bold shadow-xs cursor-pointer hover:bg-indigo-50/50">
                        Cart Recovery
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics & Performance Metrics Dashboard Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Official dashboard image as requested */}
          <div className="lg:col-span-6 flex justify-center">
            <img 
              src={imgDashboard} 
              alt="RCS Send and Received Performance Dashboard Analytics" 
              className="w-full h-auto max-w-xl"
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">Metrics & Performance</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">
              Track performance and Get data that Matters
            </h2>
            <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed font-medium">
              Verify message open rates and understand how customers respond and interact with detailed <strong>campaign metrics</strong> to fine-tune your activities accordingly.
            </p>
            <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed font-medium">
              With our RCS platform, you gain access to <strong>comprehensive real-time analytics</strong>. Track every message with detailed insights—know when a message is <strong>sent</strong>, <strong>delivered</strong>, and <strong>read</strong> by the end-user. This level of visibility helps you <strong>measure engagement</strong>, <strong>optimize your campaigns</strong>, and make <strong>data-driven decisions</strong> for better customer communication.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Of RCS Vs SMS (Comparison layout matches live site layout) */}
      <section className="bg-[#f5f4ea] py-12 sm:py-16 md:py-20 border-y border-brand-charcoal/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Comparison image on the right */}
            <div className="lg:col-span-6 flex justify-center lg:order-2">
              <img 
                src={imgComparison} 
                alt="Comparison between SMS and RCS templates" 
                className="w-full h-auto max-w-xl"
              />
            </div>

            {/* Comparison description on the left */}
            <div className="lg:col-span-6 space-y-6 lg:order-1">
              <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">Solution Comparison</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">Benefits Of RCS Vs SMS</h2>
              
              <div className="space-y-4">
                <div className="border-l-4 border-slate-350 pl-4 space-y-1">
                  <h4 className="font-bold text-brand-charcoal text-xs sm:text-sm uppercase tracking-wider">Before (SMS):</h4>
                  <p className="text-brand-charcoal-light text-xs sm:text-sm font-medium leading-relaxed">
                    Only plain text with a basic clickable link is sent—minimal information and no branding.
                  </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4 space-y-1">
                  <h4 className="font-bold text-indigo-950 text-xs sm:text-sm uppercase tracking-wider">After (RCS):</h4>
                  <p className="text-brand-charcoal-light text-xs sm:text-sm font-medium leading-relaxed">
                    The message is rich and interactive with a company name, logo, and verified badge.
                  </p>
                </div>
              </div>

              <p className="text-brand-charcoal-light text-xs sm:text-sm font-semibold leading-relaxed pt-2">
                RCS supports <strong>company logos</strong> and <strong>identity display</strong>, increasing trust, <strong>Two-Way Chat</strong> and many more.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Promote Business, E-commerce, Learning Platforms */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Multi-platform image on the left */}
          <div className="lg:col-span-5 flex justify-center">
            <img 
              src={imgMultiplatform} 
              alt="RCS Multi-platform branded messaging support displaying Company Name, Verified Badge, Brand Logo and Rich Media Buttons" 
              className="w-full h-auto max-w-sm"
            />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">Multi-Platform support</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">
              Promote E-commerce Business, Learning Platforms With the Brand Name and Logo
            </h2>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-brand-charcoal text-base font-serif flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
                  Branded Messaging
                </h4>
                <p className="text-brand-charcoal-light text-xs sm:text-sm font-medium leading-relaxed mt-1">
                  Shows <strong>brand name</strong>, <strong>logo</strong>, and <strong>rich media</strong> (images, buttons), which helps businesses build trust and recognition.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-brand-charcoal text-base font-serif flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
                  Interactive Experience
                </h4>
                <p className="text-brand-charcoal-light text-xs sm:text-sm font-medium leading-relaxed mt-1">
                  Customers can interact with messages by selecting options like “Preferences”, “Product Recommendations”, and “Cart Recovery” — <strong>no need to click on external links.</strong>
                </p>
              </div>
            </div>

            <div className="p-4 bg-brand-cream/35 border border-brand-charcoal/10 rounded-xl text-xs sm:text-sm text-brand-charcoal-light font-semibold leading-relaxed">
              ✨ Boost your brand communication by delivering rich messages that engage and build trust. Add your logo, brand name, videos, images, and carousels to your messaging and boost conversions.
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal text-center font-serif mb-10">Frequently Asked Questions</h2>
        
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-brand-charcoal/10 shadow-xs overflow-hidden">
              <button 
                onClick={() => toggleFaq(idx)}
                className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-sm sm:text-base text-brand-charcoal hover:bg-brand-cream/10 cursor-pointer"
              >
                <span>{faq.q}</span>
                {activeFaq === idx ? <CaretUp size={16} /> : <CaretDown size={16} />}
              </button>
              
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-brand-charcoal/5"
                  >
                    <p className="px-6 py-4 text-brand-charcoal-light text-xs sm:text-sm leading-relaxed font-medium">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Typographic CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#0b152d] border border-white/10 rounded-2xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),transparent_60%)]"></div>
          <div className="relative z-10 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Interested in RCS Business Messaging?
            </h3>
            <p className="text-indigo-200/80 text-xs sm:text-sm max-w-xl mx-auto font-medium leading-relaxed">
              Contact us today to review campaign compatibility, verified sender profiles, or to request a live demo.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange/90 text-white w-full sm:w-80 py-3.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shadow-md shadow-brand-orange/20 hover:scale-[1.02]"
              >
                Request Demo / Contact Us
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section></div>
  );
}

import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';
import { ArrowLeft } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

export default function TermsConditions() {
  const sections = [
    {
      num: "1",
      title: "Service Nature",
      content: "We provide SMS Marketing, RCS Message Marketing, and Voice Call Marketing services strictly for promotional, transactional, or informational purposes as requested by the client."
    },
    {
      num: "2",
      title: "Compliance",
      content: "All marketing campaigns must comply with telecom regulations, including TRAI, DND rules, and any applicable international laws such as GDPR or TCPA, depending on the region of service."
    },
    {
      num: "3",
      title: "Prohibited Use",
      content: "The following are strictly prohibited:",
      bullets: [
        "Sending unsolicited or spam messages",
        "Promoting illegal, fraudulent, or misleading content",
        "Using abusive, hateful, or threatening language in messages or calls"
      ]
    },
    {
      num: "4",
      title: "Billing & Payments",
      content: "All services are prepaid. No refunds will be issued for services already rendered or for undelivered messages unless due to a verified system failure on our part."
    },
    {
      num: "5",
      title: "Data Privacy",
      content: "We treat all client and recipient data as confidential. We do not sell, rent, or misuse your contact lists. Clients are responsible for ensuring their data is legally collected and stored."
    },
    {
      num: "6",
      title: "Intellectual Property",
      content: "All materials provided by the Company (software, templates, etc.) remain our intellectual property. You may not copy, reproduce, or reverse engineer any part of the Service."
    },
    {
      num: "7",
      title: "Modification of Terms",
      content: "We reserve the right to update these Terms at any time. Continued use of the Services after changes implies acceptance."
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-brand-cream-light font-sans text-brand-charcoal">
      <SEOHead
        title="Terms & Conditions — Advait Digital"
        description="Read the terms and conditions for using Advait Digital's bulk SMS, WhatsApp API, RCS messaging, voice call, and digital marketing services in India."
        keywords="Advait Digital terms and conditions, SMS service terms India, WhatsApp API terms, digital marketing terms of service"
        canonical="/terms-and-conditions"
        schema={{
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
              "name": "Terms and Conditions",
              "item": "https://advaitdigital.co.in/terms-and-conditions"
            }
          ]
        }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-orange hover:text-brand-charcoal transition-colors duration-150"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>

        {/* Page Title */}
        <div className="border-b border-brand-charcoal/10 pb-6">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-brand-charcoal leading-tight"
          >
            TERMS AND CONDITIONS
          </motion.h1>
        </div>

        {/* Content Sections */}
        <div className="space-y-10">
          {sections.map((sec, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="space-y-3"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-brand-charcoal font-serif flex items-baseline gap-2">
                <span className="text-brand-orange text-lg sm:text-xl font-sans">{sec.num}.</span>
                {sec.title}
              </h2>
              <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed font-medium">
                {sec.content}
              </p>
              
              {sec.bullets && (
                <ul className="list-disc list-inside pl-4 space-y-2 text-brand-charcoal-light text-sm sm:text-base font-medium">
                  {sec.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

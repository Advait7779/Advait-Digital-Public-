import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';
import { ArrowLeft } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  const sections = [
    {
      num: "1",
      title: "Information We Collect",
      content: "We collect personal details that you provide directly to us (such as name, company name, email address, mobile number, and billing information) when you request a demo, register for our services, or contact our support team. We also process recipient phone numbers and contact databases uploaded by you solely to execute your marketing campaigns."
    },
    {
      num: "2",
      title: "How We Use Your Data",
      content: "Your data is used to provide, operate, and maintain our messaging and digital services. Specifically, this includes delivering SMS, RCS, WhatsApp, and Voice broadcasts as instructed, processing invoices, providing technical support, and notifying you of critical system updates."
    },
    {
      num: "3",
      title: "Self-Hosted, Privacy-Safe Analytics",
      content: "We use a proprietary, self-hosted analytics system to measure anonymous website traffic (including page visits, browser types, referral sources, and device types). Unlike standard third-party tools, our analytics data is stored securely on our own database and is never shared with third-party advertising networks or tracking companies."
    },
    {
      num: "4",
      title: "Data Protection & Sharing",
      content: "We treat your contact databases and customer databases with the highest level of confidentiality. We strictly do not sell, rent, trade, or share your contact lists. We only disclose recipient numbers to telecommunications operators and service partners as technically necessary to transmit your marketing campaigns."
    },
    {
      num: "5",
      title: "Regulatory Compliance & DPDP Act",
      content: "Our services strictly adhere to the Telecom Regulatory Authority of India (TRAI) directives, including scrubbing lists against national Do Not Disturb (DND) registries. We fully comply with the principles of the Digital Personal Data Protection (DPDP) Act, 2023 of India, ensuring transparent data handling, client consent, and database security."
    },
    {
      num: "6",
      title: "Cookies and Tracking Options",
      content: "We use essential cookies to maintain secure sessions and page functionality. With your consent, we also use analytical cookies to help us evaluate site performance. You have full control to edit, accept, or reject non-essential cookie tracking at any time using our Cookie Settings banner."
    },
    {
      num: "7",
      title: "Data Retention & Access",
      content: "We store campaign logs, analytics, and contact information only as long as required to fulfill service agreements or comply with legal audit requirements. You have the right to inspect, update, or request the deletion of your personal account data at any time by contacting our support team."
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-brand-cream-light font-sans text-brand-charcoal">
      <SEOHead
        title="Privacy Policy — Advait Digital"
        description="Learn how Advait Digital collects, protects, and handles personal data, campaign contact lists, and website analytics in compliance with TRAI and DPDP Act 2023 regulations."
        keywords="Advait Digital privacy policy, SMS marketing privacy India, DPDP compliance, data security WhatsApp API"
        canonical="/privacy-policy"
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
              "name": "Privacy Policy",
              "item": "https://advaitdigital.co.in/privacy-policy"
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
            PRIVACY POLICY
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
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

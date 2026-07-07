import React from 'react';
import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';
import { Phone, Envelope, MapPin, Clock, FacebookLogo, TwitterLogo, LinkedinLogo } from '@phosphor-icons/react';
import DemoForm from '../components/DemoForm';

export default function Contact() {
  const contactInfo = [
    {
      title: 'Our Office Location',
      details: 'Office No.522, 5th Floor, Amanora Chambers, Amanora Town Centre East Block, Pune 411028',
      icon: MapPin,
      color: 'text-orange-600 bg-orange-50'
    },
    {
      title: 'Sales & Inquiries',
      phones: [
        { display: '+91 8282982829', tel: '+918282982829' },
        { display: '+91 9011251125', tel: '+919011251125' },
      ],
      icon: Phone,
      color: 'text-green-600 bg-green-50',
    },
    {
      title: 'Email Communications',
      details: 'sales@advaitteleservices.com',
      icon: Envelope,
      color: 'text-indigo-600 bg-indigo-50',
      link: 'mailto:sales@advaitteleservices.com'
    }
  ];

  return (
    <div className="pt-24 space-y-12 sm:space-y-16 md:space-y-20 pb-12 sm:pb-16 md:pb-20">
      <SEOHead
        title="Contact Us"
        description="Contact Advait Digital for bulk SMS, WhatsApp API, RCS messaging, voice call, and digital marketing services. Office at Amanora Chambers, Pune 411028. Call +91 8282982829."
        keywords="contact Advait Digital, Advait Digital Pune contact, bulk SMS company contact, digital marketing Pune contact, Amanora Chambers Pune, SMS service Pune phone number, WhatsApp API provider contact"
        canonical="/contact"
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
              "name": "Contact Us",
              "item": "https://advaitdigital.co.in/contact"
            }
          ]
        }}
      />
      {/* Hero Banner */}
      <section className="bg-brand-charcoal text-white py-10 sm:py-12 md:py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <span className="px-3 py-1 rounded-full bg-white/10 text-brand-orange text-xs font-bold uppercase tracking-wider">
            Contact Advait Digital
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif leading-tight mt-4">
            Let's Start the Conversation
          </h1>
          <p className="text-[#E5E4DE]/70 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mt-4 font-medium">
            Have questions about our RCS capabilities, DLT registration, or custom integrations? Reach out to our Pune headquarters or submit a demo request.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-charcoal">
              Contact Information
            </h2>
            
            <div className="space-y-6">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon;
                return (
                  <div key={idx} className="glass-card rounded-2xl p-6 border border-brand-charcoal/5 shadow-xs flex gap-4">
                    {info.link ? (
                      <a 
                        href={info.link} 
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${info.color} hover:opacity-85 transition-opacity cursor-pointer`}
                        aria-label={info.title}
                      >
                        <Icon size={22} weight="duotone" />
                      </a>
                    ) : info.phones ? (
                      <a 
                        href={`tel:${info.phones[0].tel}`} 
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${info.color} hover:opacity-85 transition-opacity cursor-pointer`}
                        aria-label={`Call ${info.title}`}
                      >
                        <Icon size={22} weight="duotone" />
                      </a>
                    ) : (
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${info.color}`}>
                        <Icon size={22} weight="duotone" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-brand-charcoal text-sm mb-1">{info.title}</h3>
                      {info.phones ? (
                        <div className="space-y-0.5">
                          {info.phones.map((phone, i) => (
                            <a
                              key={i}
                              href={`tel:${phone.tel}`}
                              className="block text-xs sm:text-sm text-brand-charcoal-light font-medium hover:text-brand-orange transition-colors"
                            >
                              {i === 1 ? `Alternative: ${phone.display}` : phone.display}
                            </a>
                          ))}
                        </div>
                      ) : info.link ? (
                        <a href={info.link} className="text-xs sm:text-sm text-brand-charcoal-light font-medium hover:text-brand-orange transition-colors">
                          {info.details}
                        </a>
                      ) : (
                        <p className="text-xs sm:text-sm text-brand-charcoal-light font-medium leading-relaxed">
                          {info.details}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Timings */}
            <div className="glass-card rounded-2xl p-6 border border-brand-charcoal/5 shadow-xs flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0">
                <Clock size={22} weight="duotone" />
              </div>
              <div>
                <h3 className="font-bold text-brand-charcoal text-sm mb-1">Business Hours</h3>
                <p className="text-xs text-brand-charcoal-light font-medium leading-relaxed">
                  Campaign Submissions: 10:00 AM - 06:00 PM (Monday - Saturday)
                </p>
                <p className="text-xs text-brand-charcoal-light/60 font-semibold mt-0.5">
                  Technical Support & Call API: 24/7 Service Available
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <DemoForm />
          </div>

        </div>
      </section>

      {/* Map Embed Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl overflow-hidden shadow-md border border-brand-charcoal/5 h-96 relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.279883584852!2d73.94828131539031!3d18.516248387413904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c184067ef5ab%3A0xe54fb7a28e200746!2sAmanora%20Chambers!5e0!3m2!1sen!2sin!4v1655389650000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Advait Office Location at Amanora Chambers, Pune"
          ></iframe>
        </div>
      </section>
    </div>
  );
}

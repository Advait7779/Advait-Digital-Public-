import React from 'react';
import SEOHead from '../components/SEOHead';
import { 
  ShieldCheck, Eye, Target, ListChecks,
  ArrowRight, Check
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import imgAboutDesigner from '../assets/about_designer.png';
import imgEasyInstallation from '../assets/about_easy_installation.png';
import imgCostEffective from '../assets/about_cost_effective.png';
import imgCustomerSupport from '../assets/about_customer_support.png';

export default function About() {
  const whoWeArePoints = [
    'Dedicated Customer Care team for efficient support.',
    'Continuous up-gradation of system to ensure up-to-date service.',
    'Flexible Price Plans to suit your needs.',
    'Take care of our clients — the rest takes care of itself.',
    'Create and cultivate long-term relationships with clients.',
  ];

  const systemValues = [
    { title: 'Easy Installation', image: imgEasyInstallation },
    { title: 'Cost Effective', image: imgCostEffective },
    { title: '24/7 Customer Support', image: imgCustomerSupport },
  ];

  const visionPoints = [
    'Achieve complete customer satisfaction.',
    'Respond immediately to the changing needs of our clients.',
    'Provide high quality service and product to clients.',
    'Create and cultivate long-term relationships with clients.',
  ];

  const missionPoints = [
    'To stand out unique in our services.',
    'Respond immediately to the changing needs of our clients.',
    'Provide high quality service and products to clients.',
    'To deliver our innovations globally.',
    'Advanced application in the area of safety & security.',
  ];

  const featurePoints = [
    'Real Time Tracking',
    'Alert Notification',
    'Easy to Install & Easy to Use',
    'Reliable, Accurate and cost effective',
    'Mobile app Notification',
  ];

  return (
    <div className="pt-24 space-y-12 sm:space-y-16 md:space-y-20 pb-12 sm:pb-16 md:pb-20 bg-brand-cream-light">
      <SEOHead
        title="About Advait Digital — Bulk SMS & Digital Marketing Company Pune India"
        description="Advait Teleservices Private Limited (Advait Digital) is a leading SMS service provider, WhatsApp API partner, and digital marketing company based in Pune, India. Trusted by businesses across India."
        keywords="about Advait Digital, Advait Teleservices Private Limited, bulk SMS company Pune, digital marketing company India, SMS service provider India, WhatsApp API company Pune, RCS messaging company, about us, messaging service Pune"
        canonical="/about"
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
              "name": "About Us",
              "item": "https://advaitdigital.co.in/about"
            }
          ]
        }}
      />

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-orange via-[#c0392b] to-[#4a148c] text-white py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_55%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight">
              What's good
            </h1>
            <p className="text-xl sm:text-2xl font-semibold text-white/90 leading-snug">
              for our clients is always good for us
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-brand-charcoal hover:bg-brand-cream px-6 py-3 rounded-lg text-sm font-bold transition duration-200 shadow-md"
            >
              Contact Us
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">About Us</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">
              Who We Are
            </h2>
            <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed font-medium">
              We <strong className="text-brand-charcoal">"Advait Teleservices Private Limited"</strong> are a leading <strong className="text-brand-charcoal">Wholesale Trader</strong> and <strong className="text-brand-charcoal">Service Provider</strong> of a wide range of <strong className="text-brand-charcoal">Tracking Devices, Vehicle Trackers, GPS Systems, SMS Services</strong> and <strong className="text-brand-charcoal">Website Designing</strong> in India. Customers choose us for our high standards of quality and commitment to services.
            </p>
            <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed font-medium">
              We have worked closely with our clients, understanding their unique needs and requirements. Customizing our products to encompass the business goals of our clients has helped us develop long-lasting relations of trust and confidence. Advait Teleservices has one target — to deliver quality service at reasonable and affordable pricing so customers can utilize it for their own development.
            </p>
            <ul className="space-y-3 pt-2">
              {whoWeArePoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-brand-charcoal-light font-medium">
                  <Check size={18} weight="bold" className="text-brand-orange shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 flex lg:justify-end justify-center overflow-visible">
            <img
              src="/edited-photo (1).png"
              alt="Web designer and developer illustration representing Advait Teleservices digital services"
              className="w-full h-auto max-w-lg lg:max-w-xl lg:-mr-16 xl:-mr-24 hover:scale-[1.02] transition-transform duration-300 relative z-10"
            />
          </div>
        </div>
      </section>

      {/* Our System */}
      <section className="bg-[#0b1b36] py-10 sm:py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif text-center mb-12">
            Our System
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {systemValues.map((val, idx) => (
              <div key={idx} className="text-center space-y-4">
                <div className="w-32 h-32 rounded-3xl border border-white/25 flex items-center justify-center mx-auto p-2">
                  <img
                    src={val.image}
                    alt={val.title}
                    className="w-full h-full object-contain mix-blend-lighten"
                  />
                </div>
                <h3 className="text-lg font-bold text-white font-serif">{val.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision, Mission & Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Vision */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 border-b border-brand-charcoal/10 pb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                <Eye size={22} />
              </div>
              <h2 className="text-xl font-bold text-brand-charcoal font-serif">Our Vision</h2>
            </div>
            <ul className="space-y-3">
              {visionPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-charcoal-light font-medium">
                  <ShieldCheck size={18} className="text-brand-orange shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mission */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 border-b border-brand-charcoal/10 pb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                <Target size={22} />
              </div>
              <h2 className="text-xl font-bold text-brand-charcoal font-serif">Our Mission</h2>
            </div>
            <ul className="space-y-3">
              {missionPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-charcoal-light font-medium">
                  <ShieldCheck size={18} className="text-brand-orange shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 border-b border-brand-charcoal/10 pb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                <ListChecks size={22} />
              </div>
              <h2 className="text-xl font-bold text-brand-charcoal font-serif">Features</h2>
            </div>
            <ul className="space-y-3">
              {featurePoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-charcoal-light font-medium">
                  <ShieldCheck size={18} className="text-brand-orange shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-brand-charcoal border border-white/5 rounded-3xl p-10 md:p-16 text-center space-y-6 relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 pointer-events-none"></div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white">
              Ready to Partner With Us?
            </h2>
            <p className="text-[#E5E4DE]/80 text-sm sm:text-base max-w-xl mx-auto font-medium leading-relaxed">
              We strive to deliver results for our clients with a leading team of experts who work round the clock to drive your business success.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
              <Link
                to="/contact"
                className="w-full sm:w-auto bg-brand-orange text-white hover:bg-brand-orange/90 px-8 py-3.5 rounded-xl font-bold shadow-md transition duration-200 flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                Get In Touch
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

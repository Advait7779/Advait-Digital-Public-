import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';
import { ArrowLeft, Info } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const plans = [
    {
      name: 'Basic',
      desc: 'Get started fast',
      price: '1,500',
      period: '/ month',
      billing: 'Billed monthly',
      popular: false,
      buttonText: 'Register Now',
      buttonUrl: 'https://waba.advaitdigital.co.in/register',
      tableHeader: 'PER TEMPLATE MESSAGE (WABA)',
      rates: [
        { label: 'Marketing', value: '₹1.09' },
        { label: 'Utility', value: '₹0.145' },
        { label: 'Authentication', value: '₹0.145' },
        { label: 'Service', value: 'Free' }
      ]
    },
    {
      name: 'Pro',
      desc: 'Growth Marketer',
      price: '3,000',
      period: '/ month',
      billing: 'Billed monthly',
      popular: true,
      buttonText: 'Register Now',
      buttonUrl: 'https://waba.advaitdigital.co.in/register',
      tableHeader: 'WABA & VOICE RATES',
      rates: [
        { label: 'Marketing', value: '₹1.09' },
        { label: 'Utility', value: '₹0.145' },
        { label: 'Authentication', value: '₹0.145' },
        { label: 'Service', value: 'Free' },
        { label: 'Voice Call', value: '₹0.30' }
      ]
    },
    {
      name: 'Pro Plus',
      desc: 'Enterprise Grade',
      price: '4,500',
      period: '/ month',
      billing: 'Billed monthly',
      popular: false,
      buttonText: 'Register Now',
      buttonUrl: 'https://waba.advaitdigital.co.in/register',
      tableHeader: 'WABA, VOICE & EMAIL RATES',
      rates: [
        { label: 'Marketing', value: '₹1.09' },
        { label: 'Utility', value: '₹0.145' },
        { label: 'Authentication', value: '₹0.145' },
        { label: 'Service', value: 'Free' },
        { label: 'Voice Call', value: '₹0.30' },
        { label: 'Email', value: '₹0.20' }
      ]
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-brand-cream-light font-sans text-brand-charcoal pb-12 sm:pb-16 md:pb-20">
      <SEOHead
        title="Official WhatsApp API & Marketing Pricing Plans — Advait Digital"
        description="Check official WhatsApp Business API subscription plans. Basic, Pro, and Pro Plus plans featuring template messages, voice broadcast, and bulk email integration."
        keywords="WhatsApp API pricing India, WhatsApp Business API cost, WABA plan pricing Pune, bulk email rates, voice call rates"
        canonical="/pricing"
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
              "name": "Pricing",
              "item": "https://advaitdigital.co.in/pricing"
            }
          ]
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-orange hover:text-brand-charcoal transition-colors duration-150"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>

        {/* Header Block */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Pricing Plans</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-charcoal font-serif">
            WhatsApp Business API Pricing
          </h1>
          <div className="w-16 h-1 bg-emerald-600 mx-auto rounded"></div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 max-w-6xl mx-auto items-stretch justify-center">
          {plans.map((pkg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`bg-white rounded-[32px] p-8 w-full flex flex-col justify-between transition-all duration-300 relative ${
                pkg.popular 
                  ? 'border-[3px] border-emerald-500 shadow-lg' 
                  : 'border border-slate-200/80 shadow-md hover:shadow-lg'
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-wider flex items-center gap-1 shadow-md shadow-emerald-500/20 uppercase">
                  ★ Most Popular
                </div>
              )}
              
              <div className="flex flex-col h-full justify-between">
                <div>
                  {/* Header */}
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">{pkg.name}</h2>
                    <Info size={18} className="text-slate-400 shrink-0 cursor-help" weight="bold" />
                  </div>
                  
                  <p className="text-sm font-bold text-emerald-600 mt-1 leading-none">{pkg.desc}</p>
                  
                  {/* Price Display */}
                  <div className="mt-8 flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight flex items-center">
                      ₹{pkg.price}
                    </span>
                    <span className="text-slate-500 text-sm font-bold">{pkg.period}</span>
                  </div>
                  <p className="text-xs text-slate-400 font-bold mt-1.5">{pkg.billing}</p>
                  
                  {/* CTA Button */}
                  <a
                    href={pkg.buttonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-2xl text-base font-extrabold transition-all duration-200 block shadow-md shadow-emerald-500/10 hover:scale-[1.01] mt-8 cursor-pointer"
                  >
                    {pkg.buttonText}
                  </a>
                </div>

                {/* Per Template Rates Table */}
                <div className="mt-8 bg-[#f5f8f7] border border-[#e3ebe9] rounded-2xl p-5">
                  <div className="flex items-center gap-1 text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-4">
                    <span>{pkg.tableHeader}</span>
                    <Info size={14} className="text-emerald-700/60 shrink-0 cursor-help" weight="bold" />
                  </div>
                  
                  <div className="space-y-3">
                    {pkg.rates.map((rate, rIdx) => (
                      <div 
                        key={rIdx} 
                        className="flex items-center justify-between text-xs font-bold py-1 border-b border-emerald-950/5 last:border-0 last:pb-0"
                      >
                        <span className="text-slate-500">{rate.label}</span>
                        <span className="text-slate-800 font-extrabold">{rate.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

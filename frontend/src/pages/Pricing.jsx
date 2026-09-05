import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Info, 
  WhatsappLogo, 
  ChatText, 
  ChatTeardropText, 
  PhoneCall, 
  EnvelopeSimple, 
  Check, 
  ShieldCheck 
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const ALL_CHANNELS = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: WhatsappLogo,
    iconColor: 'text-[#25D366]',
    iconBg: 'bg-[#25D366]/10'
  },
  {
    id: 'sms',
    label: 'SMS',
    icon: ChatText,
    iconColor: 'text-[#F97316]',
    iconBg: 'bg-[#F97316]/10'
  },
  {
    id: 'rcs',
    label: 'RCS',
    icon: ChatTeardropText,
    iconColor: 'text-[#8B5CF6]',
    iconBg: 'bg-[#8B5CF6]/10'
  },
  {
    id: 'voice',
    label: 'Voice',
    icon: PhoneCall,
    iconColor: 'text-[#0284C7]',
    iconBg: 'bg-[#0284C7]/10'
  },
  {
    id: 'email',
    label: 'Email',
    icon: EnvelopeSimple,
    iconColor: 'text-[#E11D48]',
    iconBg: 'bg-[#E11D48]/10'
  }
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'

  const plans = [
    {
      id: 'wa-only',
      monthlyName: 'Standard Monthly Whatsapp',
      yearlyName: 'Standard WhatsApp',
      desc: 'Essential WhatsApp Business API',
      monthlyPrice: '1,499',
      yearlyPrice: '11,999',
      yearlySavings: 'Save ₹5,989/yr',
      popular: false,
      includedChannels: ['whatsapp'],
      buttonText: 'Register Now',
      buttonUrl: 'https://waba.advaitdigital.co.in/register'
    },
    {
      id: 'wa-sms',
      monthlyName: 'WhatsApp + SMS',
      yearlyName: 'WhatsApp + SMS',
      desc: 'Dual Channel Broadcast Suite',
      monthlyPrice: '2,499',
      yearlyPrice: '20,000',
      yearlySavings: 'Save ₹9,988/yr',
      popular: false,
      includedChannels: ['whatsapp', 'sms'],
      buttonText: 'Register Now',
      buttonUrl: 'https://waba.advaitdigital.co.in/register'
    },
    {
      id: 'wa-sms-rcs',
      monthlyName: 'WhatsApp + SMS + RCS',
      yearlyName: 'WhatsApp + SMS + RCS',
      desc: 'Omnichannel Messaging Trio',
      monthlyPrice: '3,999',
      yearlyPrice: '30,000',
      yearlySavings: 'Save ₹17,988/yr',
      popular: true,
      includedChannels: ['whatsapp', 'sms', 'rcs'],
      buttonText: 'Register Now',
      buttonUrl: 'https://waba.advaitdigital.co.in/register'
    },
    {
      id: 'wa-sms-rcs-voice',
      monthlyName: 'Standard Monthly WhatsApp+ SMS+ RCS+ Voice',
      yearlyName: 'WhatsApp + SMS + RCS + Voice',
      desc: 'High-Touch Multi-Channel Suite',
      monthlyPrice: '4,499',
      yearlyPrice: '40,000',
      yearlySavings: 'Save ₹13,988/yr',
      popular: false,
      includedChannels: ['whatsapp', 'sms', 'rcs', 'voice'],
      buttonText: 'Register Now',
      buttonUrl: 'https://waba.advaitdigital.co.in/register'
    },
    {
      id: 'all-5',
      monthlyName: 'All 5 Services',
      yearlyName: 'All 5 Services',
      desc: 'Complete Enterprise Omnichannel Suite',
      monthlyPrice: '5,000',
      yearlyPrice: '49,999',
      yearlySavings: 'Save ₹10,001/yr',
      popular: false,
      includedChannels: ['whatsapp', 'sms', 'rcs', 'voice', 'email'],
      buttonText: 'Register Now',
      buttonUrl: 'https://waba.advaitdigital.co.in/register'
    }
  ];


  return (
    <div className="pt-24 min-h-screen bg-brand-cream-light font-sans text-brand-charcoal pb-12 sm:pb-16 md:pb-20">
      <SEOHead
        title="Official WhatsApp API & Multi-Channel Pricing Plans — Advait Digital"
        description="Transparent WhatsApp Business API, SMS, RCS, Voice, and Email subscription plans. Choose monthly or yearly billing with instant channel access and verified Razorpay checkout."
        keywords="WhatsApp API pricing India, WhatsApp Business API cost, WABA plan pricing Pune, bulk email rates, voice call rates, RCS pricing, SMS marketing pricing"
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
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
            WhatsApp & Multi-Channel Pricing
          </h1>
          <div className="w-16 h-1 bg-emerald-600 mx-auto rounded"></div>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto pt-1 font-medium">
            Scale your customer engagement with official WhatsApp API, SMS, RCS, Voice, and Email automation.
          </p>
        </div>

        {/* Monthly / Yearly Billing Toggle Switch */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <div className="bg-slate-200/80 p-1.5 rounded-full inline-flex items-center shadow-inner border border-slate-300/70 relative">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`relative px-5 sm:px-7 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('yearly')}
              className={`relative px-5 sm:px-7 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                billingCycle === 'yearly'
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Yearly Billing</span>
              <span className={`text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full transition-colors ${
                billingCycle === 'yearly' 
                  ? 'bg-white text-emerald-700 shadow-xs' 
                  : 'bg-emerald-100 text-emerald-700'
              }`}>
                Save up to 37%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid - 5 Cards in a Single Row on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 xl:gap-5 pt-4 max-w-[1480px] mx-auto items-stretch">
          <AnimatePresence mode="wait">
            {plans.map((pkg, idx) => {
              const currentPrice = billingCycle === 'monthly' ? pkg.monthlyPrice : pkg.yearlyPrice;
              const currentPeriod = billingCycle === 'monthly' ? '/ mo' : '/ yr';
              const currentBilling = billingCycle === 'monthly' ? 'Billed monthly' : 'Billed annually';
              const currentName = billingCycle === 'monthly' ? pkg.monthlyName : pkg.yearlyName;

              return (
                <motion.div
                  key={`${pkg.id}-${billingCycle}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className={`w-full bg-white rounded-[24px] xl:rounded-[28px] p-4 sm:p-4.5 xl:p-5 flex flex-col justify-between transition-all duration-300 relative ${
                    pkg.popular 
                      ? 'border-[2.5px] border-emerald-500 shadow-xl ring-2 ring-emerald-500/10' 
                      : 'border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-0.5'
                  }`}
                >
                  {/* Popular Badge */}
                  {pkg.popular && (
                    <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-3 py-1 rounded-full text-[9px] xl:text-[10px] font-black tracking-wider flex items-center gap-1 shadow-md shadow-emerald-500/20 uppercase whitespace-nowrap z-10">
                      ★ Most Popular
                    </div>
                  )}
                  
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-1.5 min-h-[46px] xl:min-h-[52px]">
                        <h2 className="text-sm sm:text-base xl:text-lg font-black text-slate-800 tracking-tight leading-snug">
                          {currentName}
                        </h2>
                        <Info size={16} className="text-slate-400 shrink-0 cursor-help mt-0.5" weight="bold" />
                      </div>
                      
                      <p className="text-[11px] xl:text-xs font-bold text-emerald-600 mt-1 leading-tight min-h-[28px]">
                        {pkg.desc}
                      </p>
                      
                      {/* Price Display */}
                      <div className="mt-4 sm:mt-5 flex items-baseline gap-1">
                        <span className="text-2xl sm:text-3xl xl:text-[34px] font-extrabold text-slate-900 tracking-tight flex items-center">
                          ₹{currentPrice}
                        </span>
                        <span className="text-slate-500 text-xs xl:text-sm font-bold">
                          {currentPeriod}
                        </span>
                      </div>
                      
                      {/* Billing Period Subtext & Yearly Savings */}
                      <div className="flex items-center gap-1.5 mt-1 flex-wrap min-h-[22px]">
                        <p className="text-[11px] text-slate-400 font-bold">
                          {currentBilling}
                        </p>
                        {billingCycle === 'yearly' && (
                          <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.5 rounded">
                            {pkg.yearlySavings}
                          </span>
                        )}
                      </div>
                      
                      {/* CTA Button */}
                      <a
                        href={pkg.buttonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 sm:py-3 rounded-xl text-xs xl:text-sm font-extrabold transition-all duration-200 block shadow-md shadow-emerald-500/15 hover:scale-[1.01] mt-4 sm:mt-5 cursor-pointer"
                      >
                        {pkg.buttonText}
                      </a>
                    </div>

                    {/* Channels Box (1/5 to 5/5 Included) */}
                    <div className="mt-5 sm:mt-6 bg-[#f5f8f7] border border-[#e3ebe9] rounded-xl xl:rounded-2xl p-3 xl:p-3.5">
                      <div className="flex items-center justify-between text-[9px] xl:text-[10px] font-black text-emerald-700 uppercase tracking-wider mb-2.5">
                        <span>CHANNELS ({pkg.includedChannels.length}/5)</span>
                        <Info size={13} className="text-emerald-700/60 shrink-0 cursor-help" weight="bold" />
                      </div>
                      
                      <div className="space-y-1.5">
                        {ALL_CHANNELS.map((channel) => {
                          const isIncluded = pkg.includedChannels.includes(channel.id);
                          const ChannelIcon = channel.icon;

                          return (
                            <div 
                              key={channel.id} 
                              className={`flex items-center justify-between text-[11px] xl:text-xs py-1.5 px-2 rounded-lg transition-colors ${
                                isIncluded 
                                  ? 'bg-white border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.03)]' 
                                  : 'opacity-35'
                              }`}
                            >
                              <div className="flex items-center gap-1.5 xl:gap-2 truncate">
                                {/* Custom Checkbox */}
                                <div className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 transition-colors ${
                                  isIncluded 
                                    ? 'bg-blue-600 text-white shadow-xs' 
                                    : 'border border-slate-300 bg-slate-100'
                                }`}>
                                  {isIncluded && <Check size={10} weight="bold" />}
                                </div>

                                {/* Channel Icon with Colored Tone */}
                                <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                                  isIncluded ? channel.iconColor : 'text-slate-400'
                                }`}>
                                  <ChannelIcon size={15} weight="fill" />
                                </div>

                                {/* Channel Name */}
                                <span className={`font-bold text-[11px] xl:text-xs truncate ${
                                  isIncluded ? 'text-slate-800' : 'text-slate-400 line-through decoration-slate-300'
                                }`}>
                                  {channel.label}
                                </span>
                              </div>

                              {/* Status Indicator */}
                              <span className={`text-[9px] xl:text-[10px] font-bold shrink-0 ml-1 ${
                                isIncluded ? 'text-blue-600' : 'text-slate-400'
                              }`}>
                                {isIncluded ? 'Active' : '—'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Razorpay Trust & Usage Notice Banner (from Image 1 & 2 Footer) */}
        <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-slate-600 max-w-6xl mx-auto px-2">
          <div className="flex items-center gap-2 text-emerald-800">
            <ShieldCheck size={18} weight="fill" className="text-emerald-600 shrink-0" />
            <span>Secure payment through Razorpay. UPI and cards accepted.</span>
          </div>
          <div className="text-slate-500 font-medium">
            Plan charges do not include service usage.
          </div>
        </div>


      </div>
    </div>
  );
}

import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  WhatsappLogo, 
  ChatText, 
  ChatTeardropText, 
  PhoneCall, 
  EnvelopeSimple, 
  Check, 
  ShieldCheck,
  Sparkle,
  Star,
  CheckCircle,
  LockKey
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const ALL_CHANNELS = [
  {
    id: 'whatsapp',
    label: 'WhatsApp API',
    icon: WhatsappLogo,
    activeColor: 'text-[#25D366]',
    activeBg: 'bg-[#25D366]/10',
    activeBorder: 'border-[#25D366]/25'
  },
  {
    id: 'sms',
    label: 'Bulk SMS',
    icon: ChatText,
    activeColor: 'text-[#F97316]',
    activeBg: 'bg-[#F97316]/10',
    activeBorder: 'border-[#F97316]/25'
  },
  {
    id: 'rcs',
    label: 'RCS Messaging',
    icon: ChatTeardropText,
    activeColor: 'text-[#8B5CF6]',
    activeBg: 'bg-[#8B5CF6]/10',
    activeBorder: 'border-[#8B5CF6]/25'
  },
  {
    id: 'voice',
    label: 'Voice Call',
    icon: PhoneCall,
    activeColor: 'text-[#0284C7]',
    activeBg: 'bg-[#0284C7]/10',
    activeBorder: 'border-[#0284C7]/25'
  },
  {
    id: 'email',
    label: 'Email Marketing',
    icon: EnvelopeSimple,
    activeColor: 'text-[#E11D48]',
    activeBg: 'bg-[#E11D48]/10',
    activeBorder: 'border-[#E11D48]/25'
  }
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'

  const plans = [
    {
      id: 'wa-only',
      badge: 'STARTER',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      monthlyName: 'Standard WhatsApp',
      yearlyName: 'Standard WhatsApp',
      desc: 'Official WhatsApp Business API for direct 1-to-1 customer chats & broadcasts.',
      monthlyPrice: '1,499',
      yearlyPrice: '11,999',
      yearlyPerMonth: '999',
      yearlySavings: 'Save ₹5,989/yr',
      popular: false,
      includedChannels: ['whatsapp'],
      features: [
        'Official Meta Cloud API Access',
        'Automated Chatbot & Quick Replies',
        'Verified Shared Team Inbox',
        '99.9% High Delivery SLA'
      ],
      buttonText: 'Get Started',
      buttonUrl: 'https://waba.advaitdigital.co.in/register'
    },
    {
      id: 'wa-sms',
      badge: 'GROWTH',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200/80',
      monthlyName: 'WhatsApp + SMS',
      yearlyName: 'WhatsApp + SMS',
      desc: 'Dual-channel broadcast suite with automatic fallback between WhatsApp & SMS.',
      monthlyPrice: '2,499',
      yearlyPrice: '20,000',
      yearlyPerMonth: '1,666',
      yearlySavings: 'Save ₹9,988/yr',
      popular: false,
      includedChannels: ['whatsapp', 'sms'],
      features: [
        'Everything in WhatsApp Plan',
        'High-Speed DLT SMS Gateway',
        'Smart Fallback: WhatsApp → SMS',
        'Unified Campaign Analytics'
      ],
      buttonText: 'Get Started',
      buttonUrl: 'https://waba.advaitdigital.co.in/register'
    },
    {
      id: 'wa-sms-rcs',
      badge: 'MOST POPULAR',
      badgeColor: 'bg-[#f36308] text-white border-transparent shadow-xs',
      monthlyName: 'WhatsApp + SMS + RCS',
      yearlyName: 'WhatsApp + SMS + RCS',
      desc: 'Interactive messaging trio with rich carousels, action buttons & verified branding.',
      monthlyPrice: '3,999',
      yearlyPrice: '30,000',
      yearlyPerMonth: '2,500',
      yearlySavings: 'Save ₹17,988/yr',
      popular: true,
      includedChannels: ['whatsapp', 'sms', 'rcs'],
      features: [
        'WhatsApp + High-Speed SMS',
        'Rich RCS Carousels & Quick CTAs',
        'Verified Brand Checkmark & Sender',
        'High CTR Conversational Marketing'
      ],
      buttonText: 'Get Started',
      buttonUrl: 'https://waba.advaitdigital.co.in/register'
    },
    {
      id: 'wa-sms-rcs-voice',
      badge: 'SCALE',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200/80',
      monthlyName: 'WhatsApp + SMS + RCS + Voice',
      yearlyName: 'WhatsApp + SMS + RCS + Voice',
      desc: 'High-touch 4-channel stack including automated outbound IVR & voice calls.',
      monthlyPrice: '4,499',
      yearlyPrice: '40,000',
      yearlyPerMonth: '3,333',
      yearlySavings: 'Save ₹13,988/yr',
      popular: false,
      includedChannels: ['whatsapp', 'sms', 'rcs', 'voice'],
      features: [
        'Full Messaging Trio Included',
        'Automated Outbound Voice Calls',
        'Custom Audio & IVR Call Routing',
        'Instant Call Pickup Analytics'
      ],
      buttonText: 'Get Started',
      buttonUrl: 'https://waba.advaitdigital.co.in/register'
    },
    {
      id: 'all-5',
      badge: 'ENTERPRISE',
      badgeColor: 'bg-violet-50 text-violet-700 border-violet-200/80',
      monthlyName: 'All 5 Services',
      yearlyName: 'All 5 Services',
      desc: 'Complete enterprise omnichannel engine: WhatsApp, SMS, RCS, Voice & Email.',
      monthlyPrice: '5,000',
      yearlyPrice: '49,999',
      yearlyPerMonth: '4,166',
      yearlySavings: 'Save ₹10,001/yr',
      popular: false,
      includedChannels: ['whatsapp', 'sms', 'rcs', 'voice', 'email'],
      features: [
        'All 5 Channels Fully Activated',
        'High-Volume Email Marketing',
        'Dedicated Technical Account Manager',
        '24/7 Priority SLA & Custom Webhooks'
      ],
      buttonText: 'Get Started',
      buttonUrl: 'https://waba.advaitdigital.co.in/register'
    }
  ];


  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9]/50 to-[#f8fafc] font-sans text-slate-900 pb-16 sm:pb-20">
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
      
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        
        {/* Top Navigation & Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#f36308] hover:text-slate-900 transition-colors duration-200 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
            <ShieldCheck size={14} className="text-emerald-600" weight="fill" />
            <span>Official Meta Cloud API Provider</span>
          </div>
        </div>

        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200/80 text-[#f36308] px-3.5 py-1.2 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-2xs">
            <Sparkle size={13} weight="fill" />
            <span>Transparent Subscription Plans</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-serif leading-tight">
            WhatsApp &amp; Multi-Channel <span className="bg-gradient-to-r from-[#f36308] to-[#ea580c] bg-clip-text text-transparent">Pricing</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed max-w-2xl mx-auto">
            Scale your brand outreach with verified WhatsApp Business API, SMS, RCS, Voice, and Email. Switch channels anytime with zero setup penalty.
          </p>
        </div>

        {/* Monthly / Yearly Billing Toggle Switch */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
          <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-full inline-flex items-center shadow-md border border-slate-200/90 relative">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`relative px-6 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all duration-300 cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('yearly')}
              className={`relative px-6 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                billingCycle === 'yearly'
                  ? 'bg-gradient-to-r from-[#f36308] to-[#ea580c] text-white shadow-md shadow-[#f36308]/25'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Yearly Billing</span>
              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full transition-colors ${
                billingCycle === 'yearly' 
                  ? 'bg-white text-[#ea580c] shadow-2xs' 
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                SAVE UP TO 37%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid - 5 Cards in a Single Row on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 xl:gap-5 pt-3 items-stretch">
          <AnimatePresence mode="wait">
            {plans.map((pkg, idx) => {
              const currentPrice = billingCycle === 'monthly' ? pkg.monthlyPrice : pkg.yearlyPrice;
              const currentPeriod = billingCycle === 'monthly' ? '/ mo' : '/ yr';
              const currentName = billingCycle === 'monthly' ? pkg.monthlyName : pkg.yearlyName;

              return (
                <motion.div
                  key={`${pkg.id}-${billingCycle}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className={`w-full bg-white rounded-[26px] p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 relative group ${
                    pkg.popular 
                      ? 'border-2 border-[#f36308] shadow-xl shadow-orange-500/10 ring-4 ring-[#f36308]/10 bg-gradient-to-b from-orange-50/30 via-white to-white' 
                      : 'border border-slate-200/90 shadow-md hover:shadow-xl hover:border-slate-300'
                  }`}
                >
                  {/* Top Popular Floating Ribbon */}
                  {pkg.popular && (
                    <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#f36308] to-[#ea580c] text-white px-3.5 py-1 rounded-full text-[10px] font-black tracking-wider flex items-center gap-1.5 shadow-md shadow-[#f36308]/30 uppercase whitespace-nowrap z-10">
                      <Star size={11} weight="fill" className="text-yellow-200" />
                      <span>MOST POPULAR</span>
                    </div>
                  )}

                  <div className="flex flex-col h-full justify-between">
                    <div>
                      {/* Tier Badge & Channels Count */}
                      <div className="flex items-center justify-between gap-1 mb-2.5">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.8 rounded-full border ${pkg.badgeColor}`}>
                          {pkg.badge}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                          {pkg.includedChannels.length}/5 Channels
                        </span>
                      </div>

                      {/* Plan Title */}
                      <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug min-h-[46px] flex items-center">
                        {currentName}
                      </h2>

                      {/* Subtitle Description */}
                      <p className="text-[11px] font-medium text-slate-500 mt-1 leading-snug min-h-[34px]">
                        {pkg.desc}
                      </p>

                      {/* Divider */}
                      <div className="h-px bg-slate-100 my-3.5" />

                      {/* Price Section */}
                      <div className="space-y-1">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl xl:text-[34px] font-black text-slate-900 tracking-tight">
                            ₹{currentPrice}
                          </span>
                          <span className="text-slate-500 text-xs font-bold">
                            {currentPeriod}
                          </span>
                        </div>

                        {/* Breakdown / Savings Pill */}
                        <div className="min-h-[24px] flex items-center flex-wrap gap-1.5">
                          {billingCycle === 'yearly' ? (
                            <>
                              <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                                {pkg.yearlySavings}
                              </span>
                              <span className="text-[10px] font-semibold text-slate-400">
                                (₹{pkg.yearlyPerMonth}/mo)
                              </span>
                            </>
                          ) : (
                            <span className="text-[11px] font-semibold text-slate-400">
                              Billed monthly • Cancel anytime
                            </span>
                          )}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <a
                        href={pkg.buttonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full text-center py-2.8 px-3 rounded-xl text-xs xl:text-sm font-black transition-all duration-200 block mt-4 cursor-pointer ${
                          pkg.popular
                            ? 'bg-gradient-to-r from-[#f36308] to-[#ea580c] hover:from-[#ea580c] hover:to-[#c2410c] text-white shadow-md shadow-[#f36308]/30 hover:scale-[1.02] active:scale-[0.98]'
                            : 'bg-slate-900 hover:bg-[#f36308] text-white shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.98]'
                        }`}
                      >
                        {pkg.buttonText}
                      </a>
                    </div>

                    {/* Channels Stack Section */}
                    <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
                      <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-wider">
                        <span>CHANNELS INCLUDED</span>
                        <span className={`font-black ${pkg.popular ? 'text-[#f36308]' : 'text-slate-700'}`}>
                          {pkg.includedChannels.length} OF 5
                        </span>
                      </div>

                      {/* Channel Row List - Clean & Non-truncated */}
                      <div className="space-y-1.5">
                        {ALL_CHANNELS.map((channel) => {
                          const isIncluded = pkg.includedChannels.includes(channel.id);
                          const ChannelIcon = channel.icon;

                          return (
                            <div 
                              key={channel.id} 
                              className={`flex items-center justify-between text-[11px] py-1.5 px-2 rounded-lg transition-colors ${
                                isIncluded 
                                  ? `${channel.activeBg} border ${channel.activeBorder}` 
                                  : 'bg-slate-50/80 border border-slate-100 opacity-40'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                                  isIncluded ? channel.activeColor : 'text-slate-400'
                                }`}>
                                  <ChannelIcon size={14} weight="fill" />
                                </div>
                                <span className={`font-bold text-[11px] truncate ${
                                  isIncluded ? 'text-slate-800' : 'text-slate-400'
                                }`}>
                                  {channel.label}
                                </span>
                              </div>

                              {/* Status Tag */}
                              {isIncluded ? (
                                <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded-full shrink-0">
                                  <Check size={9} weight="bold" />
                                  Active
                                </span>
                              ) : (
                                <span className="text-[10px] font-bold text-slate-300 shrink-0 pr-1">
                                  —
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Key Features Bullet Points */}
                      <div className="pt-2 border-t border-dashed border-slate-200/80">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-2">
                          WHAT'S INCLUDED:
                        </p>
                        <ul className="space-y-1.5">
                          {pkg.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-1.5 text-[10px] sm:text-[11px] text-slate-600 font-semibold leading-tight">
                              <CheckCircle size={13} weight="fill" className={`shrink-0 mt-0.5 ${pkg.popular ? 'text-[#f36308]' : 'text-emerald-600'}`} />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Razorpay Trust & Usage Notice Banner */}
        <div className="pt-8 border-t border-slate-200/80 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck size={22} weight="fill" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900">
                  Verified Razorpay Checkout &amp; Instant Activation
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  Supports all Indian UPI, NetBanking, Credit/Debit Cards, and Corporate Accounts.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl shrink-0">
              <LockKey size={14} className="text-slate-600" weight="bold" />
              <span>Plan charges do not include per-message telecom usage.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

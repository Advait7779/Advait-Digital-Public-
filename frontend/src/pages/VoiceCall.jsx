import SEOHead from '../components/SEOHead';
import { 
  ArrowLeft, CheckCircle, CurrencyInr, Microphone, 
  Calendar, Globe, ChartLineUp, ShieldCheck, Users,
  Buildings, Airplane, Storefront, Briefcase
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

// Import graphics copied from uploaded assets
import imgRouting from '../assets/vc_routing.png';
import imgConnect from '../assets/vc_connect.png';

export default function VoiceCall() {
  const features = [
    { 
      title: 'Voice Broadcasting Facilities', 
      desc: 'Broadcast the latest news, offers, and deals to your audience, and boost your sales revenue.',
      icon: Microphone 
    },
    { 
      title: 'User Friendly Panel', 
      desc: 'Easily set up and execute bulk voice calls with our robust and user-friendly platform.',
      icon: ChartLineUp 
    },
    { 
      title: 'Segment Audience', 
      desc: 'Specify the audience based on the user persona and target using multiple voice calls.',
      icon: Users 
    },
    { 
      title: 'Schedule Voice Campaign', 
      desc: 'Schedule your calls for a specific date and time. The system will automate the calls.',
      icon: Calendar 
    },
    { 
      title: 'Supports Multiple Languages', 
      desc: 'The software comes with customized language features to reach a wider audience.',
      icon: Globe 
    },
    { 
      title: 'Excellent Support Team', 
      desc: 'Still doubts? Our support team is available round the clock to help our customers at every level.',
      icon: ShieldCheck 
    }
  ];

  const advantages = [
    'Customize language and messages to target customers who reside anywhere in India.',
    'Streamline all the calls, easily manage and execute campaigns successfully.',
    'Schedule calls depending on your audience availability.',
    'Store enormous databases in the system. No human intervention is needed.',
    'Send qualified voice recorded messages with good connectivity.',
    'Brand message through voice calls have a higher penetration among audiences.',
    'Calling prove to an effective interaction channel with your customers.',
    'The entire voice service is mobile. Location change keep the service undisturbed.'
  ];

  const industries = [
    {
      name: 'Customer Service',
      desc: [
        'Reduces operational and additional costs.',
        'A valuable asset to boost customer experience.',
        'Automate, monitor, and manage calls easily.'
      ],
      icon: Users
    },
    {
      name: 'Travel and Tourism',
      desc: [
        'Effective communication mode.',
        'Keep your customers informed.',
        'Manage multiple call campaign at one time.'
      ],
      icon: Airplane
    },
    {
      name: 'Finance',
      desc: [
        'Excellent mobility features.',
        'Cost-effective service that saves money.',
        'Less investment required.'
      ],
      icon: CurrencyInr
    },
    {
      name: 'Manufacturing',
      desc: [
        'Highly effective in the competitive industry.',
        'Flexible and scalable mode of messaging.',
        'Manage calls for different departments.'
      ],
      icon: Briefcase
    },
    {
      name: 'Real Estate',
      desc: [
        'Effective and effortless communication mode.',
        'Send latest real estate news, offers, deals.',
        'Higher penetration Rate.'
      ],
      icon: Buildings
    },
    {
      name: 'E-Commerce',
      desc: [
        'Send sales information through calls.',
        'Product characteristics and features.',
        'Send product confirmations and details.'
      ],
      icon: Storefront
    }
  ];

  const useCases = [
    {
      title: 'Client Surveys',
      desc: 'Take customer surveys with voice calls. Its cost effective, easy to use. Automate the voice message to reach the customers timely.'
    },
    {
      title: 'Latest deals/Offers',
      desc: 'Promote your services/ products to your audience with on-point advertising voice call messages.'
    },
    {
      title: 'Notifications / Reminders',
      desc: 'Notify people about any important event using voice recorded messages. Similarly, send reminders to people for their periodic medication renewal.'
    },
    {
      title: 'Lead Generation',
      desc: 'Use voice calls to generate leads online and attract potential customers for your business. Nurture your leads with the latest updates through on point voice messages.'
    },
    {
      title: 'Fundraising',
      desc: 'Trying to raise funds? Take your message/ campaign straight to your audience with clear and concise voice messages. Support your campaign & raise funds.'
    },
    {
      title: 'Confirmation',
      desc: 'Send voice call messages to confirm product order/ delivery updates/ meeting schedules. Easily record customized voice messages & send them to your audience.'
    }
  ];

  const packages = [
    { qty: '2,000 Voice Calls', total: '1,000', rate: '50P Per Call' },
    { qty: '5,000 Voice Calls', total: '2,000', rate: '40P Per Call' },
    { qty: '10,000 Voice Calls', total: '3,500', rate: '35P Per Call' },
    { qty: '25,000 Voice Calls', total: '7,500', rate: '30P Per Call' },
    { qty: '50,000 Voice Calls', total: '14,000', rate: '28P Per Call' },
    { qty: '1Lac Voice Calls', total: '22,000', rate: '22P Per Call' },
    { qty: '2Lac Voice Calls', total: '40,000', rate: '20P Per Call' },
    { qty: '5Lac Voice Calls', total: '80,000', rate: '16P Per Call' }
  ];

  return (
    <div className="pt-24 space-y-12 sm:space-y-16 md:space-y-24 pb-12 sm:pb-16 md:pb-20 bg-brand-cream-light font-sans">
      <SEOHead
        title="Bulk Voice Call Service India — Automated IVR & Voice Broadcast"
        description="Advait Digital offers bulk voice call and automated IVR services across India. Broadcast pre-recorded voice messages to thousands of contacts for marketing, election campaigns, and customer alerts."
        keywords="bulk voice call India, automated voice call service, IVR service India, voice broadcast India, voice call marketing India, robocall India, automated calling service, voice OTP India, bulk voice message India, voice call Pune"
        canonical="/services/voice-call"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Bulk Voice Call Service",
            "provider": { "@type": "Organization", "name": "Advait Digital", "url": "https://advaitdigital.co.in" },
            "areaServed": "India",
            "description": "Automated bulk voice call and IVR broadcasting for marketing, election campaigns, and customer notifications.",
            "url": "https://advaitdigital.co.in/services/voice-call",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "128"
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
                "name": "Voice Call Services",
                "item": "https://advaitdigital.co.in/services/voice-call"
              }
            ]
          }
        ]}
      />
      
      {/* High-Contrast Rose-Crimson Hero Section */}
      <section className="bg-[#4c0b1a] text-white py-12 sm:py-16 md:py-20 relative overflow-hidden">
        {/* Decorative bottom border gradient */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-rose-500 via-brand-orange to-brand-yellow opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-white transition-colors duration-150 mb-8"
          >
            <ArrowLeft size={14} />
            Back to Services
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (Text content) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="px-3 py-1 rounded bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider">
                Audio Solutions
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif leading-tight tracking-tight text-white">
                Voice Call Services
              </h1>
              <p className="text-rose-100/90 text-sm sm:text-base leading-relaxed font-medium">
                Advait Digital offers automated bulk voice call broadcasting to deliver pre-recorded messages, customer surveys, and campaign announcements instantly to wide audiences across India.
              </p>
            </div>
            
            {/* Right Column (Image/Mockup) */}
            <div className="lg:col-span-5 flex justify-center">
              <img 
                src={imgConnect} 
                alt="Two phones facing each other representing mobile voice call broadcast connections" 
                className="w-full h-auto max-w-xs hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What is Voice Call Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image Column (Left on Desktop) */}
          <div className="lg:col-span-5 flex justify-center">
            <img 
              src={imgRouting} 
              alt="Phone displaying automated call routing flowchart layout" 
              className="w-full h-auto max-w-sm"
            />
          </div>

          {/* Text Column (Right on Desktop) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">What is voice call services?</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-charcoal">
                Interactive Voice Broadcasts
              </h2>
              <div className="w-16 h-1 bg-rose-500 rounded"></div>
            </div>
            
            <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed">
              Voice call services help you to reach customers easily with pre-recorded messages. Create your voice message and automate the calling process with few clicks. Easily manage and keep records of calls through bulk voice calling service. Use our services to send important information like:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-brand-charcoal font-semibold text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-rose-600 shrink-0" />
                <span>Alerts / Reminders</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-rose-600 shrink-0" />
                <span>Business Promotion</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-rose-600 shrink-0" />
                <span>Latest Offers and Deals</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-rose-600 shrink-0" />
                <span>Social Campaigns</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-rose-600 shrink-0" />
                <span>Customer Surveys</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voice Call Features Grid */}
      <section className="bg-white py-12 sm:py-16 md:py-20 border-y border-brand-charcoal/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">Features</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">Voice Call Services Feature</h2>
            <p className="text-xs text-brand-charcoal-light font-medium">Our services are designed to address your needs & provide effective solutions</p>
            <div className="w-24 h-1 bg-brand-orange mx-auto rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="bg-brand-cream-light/40 border border-brand-charcoal/5 rounded-2xl p-8 space-y-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-brand-charcoal font-serif">{feat.title}</h3>
                  <p className="text-sm text-brand-charcoal-light leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Voice Call Can Do for your Business */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Column (Left on Desktop) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Business Advantages</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-charcoal">
                What Voice call Can Do For Your Business
              </h2>
              <p className="text-xs text-brand-charcoal-light font-medium">Easily connect with your audience in the internet-driven world</p>
              <div className="w-16 h-1 bg-rose-500 rounded"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {advantages.map((adv, idx) => (
                <div key={idx} className="flex gap-3 text-sm text-brand-charcoal-light leading-relaxed">
                  <CheckCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
                  <p>{adv}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Column (Right on Desktop) */}
          <div className="lg:col-span-5 flex justify-center">
            <img 
              src={imgConnect} 
              alt="Two phones showing cloud-connected voice call illustration" 
              className="w-full h-auto max-w-sm"
            />
          </div>
        </div>
      </section>

      {/* Industry Verticals Section */}
      <section className="bg-white py-12 sm:py-16 md:py-20 border-y border-brand-charcoal/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">Industry Solutions</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">One stop solution for every industry</h2>
            <p className="text-xs text-brand-charcoal-light font-medium">How voice call services can be great for your business</p>
            <div className="w-24 h-1 bg-brand-orange mx-auto rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind, idx) => {
              const Icon = ind.icon;
              return (
                <div key={idx} className="bg-brand-cream-light/40 border border-brand-charcoal/5 rounded-2xl p-8 space-y-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-brand-charcoal font-serif">{ind.name}</h3>
                  <ul className="space-y-2 text-xs text-brand-charcoal-light font-medium">
                    {ind.desc.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex gap-1.5 items-start">
                        <span className="text-rose-500 font-bold">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How have businesses used Automated calls Usages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-2">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Use Cases</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">How have businesses used Automated calls Usages</h2>
          <p className="text-xs text-brand-charcoal-light font-medium">Use voice broadcast software to connect with your audience & meet goals</p>
          <div className="w-16 h-1 bg-rose-500 mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {useCases.map((use, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 border border-brand-charcoal/5 shadow-xs space-y-3 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-brand-charcoal flex items-center gap-2 font-serif">
                <span className="w-2 h-6 rounded-full bg-rose-600"></span>
                {use.title}
              </h3>
              <p className="text-sm text-brand-charcoal-light font-medium leading-relaxed">
                {use.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Voice Call Packages Pricing Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Pricing Plans</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">Voice call Services Packages</h2>
          <div className="w-16 h-1 bg-rose-500 mx-auto rounded mb-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200/60 flex flex-col justify-between hover:shadow-lg hover:border-rose-600/20 transition-all duration-300 relative overflow-hidden group">
              {/* Visual Accent bar on hover */}
              <div className="absolute top-0 inset-x-0 h-1 bg-rose-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              
              <div>
                <h3 className="text-base font-bold text-slate-800 mb-1">{pkg.qty}</h3>
                <div className="flex items-baseline gap-1 border-b border-slate-100 pb-4 mb-4">
                  <span className="text-2xl font-bold text-slate-900 flex items-center font-serif">
                    <CurrencyInr size={20} className="text-rose-600" />
                    {pkg.total}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">/ {pkg.rate}</span>
                </div>
                
                <ul className="space-y-2.5 mb-6 text-[10px] text-slate-600 font-semibold">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-rose-600 shrink-0" />
                    <span>Deliver Between 07AM to 09PM</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-rose-600 shrink-0" />
                    <span>Delivery to DND Customers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-rose-600 shrink-0" />
                    <span>30 secs Call Pulse Rate</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-rose-600 shrink-0" />
                    <span>Own Mobile Number Sender ID</span>
                  </li>
                </ul>
              </div>
              
              <Link
                to="/contact"
                className="w-full text-center bg-[#4c0b1a] hover:bg-[#4c0b1a]/90 text-white py-3 rounded-xl text-xs font-bold transition-all duration-200 block shadow-xs hover:scale-[1.02] cursor-pointer"
              >
                Buy Now
              </Link>
            </div>
          ))}
        </div>
        
        <p className="text-[10px] text-slate-400 text-center font-bold mt-6">
          * 18% GST Extra. All packages require 100% advance payment. Valid for 1 year. Delivered using random numbers. Own mobile sender ID setup included.
        </p>
      </section>

    </div>
  );
}

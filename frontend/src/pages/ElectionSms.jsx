import { useState, useEffect, useRef } from 'react';
import SEOHead from '../components/SEOHead';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, WhatsappLogo, ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

// Import election campaign graphic
import imgElectionHero from '../assets/election_hero.png';
import TechVideoPlayer from '../components/TechVideoPlayer';

const ELECTION_CONVERSATION = [
  { sender: 'user', text: "Hi, who is the candidate for our ward?" },
  {
    sender: 'bot',
    text: "Hello! Our candidate is Amit Sharma. Here is his profile & vision card:",
    card: {
      title: "Amit Sharma",
      subtitle: "Candidate - Ward 12",
      details: "Focus: Clean Water & Smart Roads",
      action: "View Manifesto"
    }
  },
  { sender: 'user', text: "Looks great. Where is the rally today?" },
  { sender: 'bot', text: "Today's rally is at Town Hall, starting at 5:00 PM. See you there!" },
  { sender: 'user', text: "Will there be a live stream?" },
  { sender: 'bot', text: "Yes! Watch live at 5:00 PM: advait.in/live" }
];
const ElectionChatStream = () => {
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    let index = 0;
    const timeouts = [];

    const addNextMessage = () => {
      if (index < ELECTION_CONVERSATION.length) {
        const currentMsg = ELECTION_CONVERSATION[index];
        setMessages(prev => [...prev, currentMsg]);
        index++;
        const delay = currentMsg.sender === 'user' ? 1200 : 2000;
        const t = setTimeout(addNextMessage, delay);
        timeouts.push(t);
      } else {
        const resetT = setTimeout(() => {
          setMessages([]);
          index = 0;
          const restartT = setTimeout(addNextMessage, 1000);
          timeouts.push(restartT);
        }, 5000);
        timeouts.push(resetT);
      }
    };

    const startT = setTimeout(addNextMessage, 500);
    timeouts.push(startT);

    return () => timeouts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div 
      ref={chatContainerRef}
      className="flex-1 bg-[#efeae2] p-2.5 overflow-y-auto space-y-2.5 flex flex-col justify-start scrollbar-none"
    >
      <AnimatePresence>
        {messages.map((msg, idx) => {
          if (!msg) return null; // safety check
          const isUser = msg.sender === 'user';
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`flex ${isUser ? 'justify-start' : 'justify-end'} w-full`}
            >
              <div 
                className={`max-w-[85%] rounded-lg p-2.5 text-[10px] leading-relaxed shadow-xs border ${
                  isUser 
                    ? 'bg-white text-brand-charcoal border-slate-100 rounded-tl-none' 
                    : 'bg-[#d9fdd3] text-brand-charcoal border-[#c1ebd0] rounded-tr-none'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                {msg.card && (
                  <div className="mt-2 bg-white border border-slate-100 rounded-md overflow-hidden shadow-2xs">
                    <div className="bg-emerald-950 text-white p-2 text-center text-[9px] font-bold">
                      {msg.card.title}
                    </div>
                    <div className="p-2 space-y-1">
                      <p className="font-bold text-[9px] text-brand-charcoal">{msg.card.subtitle}</p>
                      <p className="text-[8px] text-brand-charcoal-light font-medium">{msg.card.details}</p>
                      <div className="mt-1.5 text-center py-1 bg-emerald-50 text-emerald-800 rounded text-[8px] font-bold border border-emerald-100">
                        {msg.card.action}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default function ElectionSms() {
  return (
    <div className="pt-24 space-y-12 sm:space-y-16 md:space-y-24 pb-12 sm:pb-16 md:pb-20 bg-brand-cream-light">
      <SEOHead
        title="Election Bulk SMS & Voice Call Service India — Political Campaign Messaging"
        description="Advait Digital provides bulk SMS, voice call, and WhatsApp services for election campaigns in India. Reach lakhs of voters with candidate speech broadcasts, manifesto SMS, and automated voter outreach."
        keywords="election bulk SMS India, political campaign SMS, voter outreach SMS, election voice call service, bulk SMS election campaign, political SMS India, candidate SMS broadcast, election WhatsApp campaign, election messaging service India"
        canonical="/services/election-sms"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Election Bulk SMS & Voice Call Service",
            "provider": { "@type": "Organization", "name": "Advait Digital", "url": "https://advaitdigital.co.in" },
            "areaServed": "India",
            "description": "Bulk SMS, voice call, and WhatsApp services for political campaigns and election voter outreach.",
            "url": "https://advaitdigital.co.in/services/election-sms"
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
                "name": "Election SMS & Voice Services",
                "item": "https://advaitdigital.co.in/services/election-sms"
              }
            ]
          }
        ]}
      />
      
      {/* Hero Banner with High Contrast and Legibility */}
      <section className="bg-[#0b1b36] text-white py-12 sm:py-16 md:py-20 relative overflow-hidden">
        {/* Subtle accent border */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 via-brand-orange to-brand-yellow opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-300 hover:text-white transition-colors duration-150 mb-8"
          >
            <ArrowLeft size={14} />
            Back to Services
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (Text content) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="px-3 py-1 rounded bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
                Campaign & Political Outreach
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-white font-serif">
                Bulk SMS & Voice Services for Elections
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed font-medium">
                Advait Digital provides political campaigns with massive voter outreach solutions including election bulk SMS, automated candidate voice speeches, and interactive WhatsApp campaigns to connect with constituents.
              </p>
            </div>
            
            {/* Election Campaign Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <img 
                src={imgElectionHero} 
                alt="Election Campaign Bulk SMS outreach illustration" 
                className="w-full h-auto max-w-sm hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Live Video Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <TechVideoPlayer 
              src="/bulk election.mp4" 
              title="Bulk SMS & Election Campaign Platform Demo" 
            />
          </div>
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">Live Platform Demo</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">
              Live Election Bulk SMS Portal
            </h2>
            <div className="w-20 h-1 bg-brand-orange rounded"></div>
            <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed font-medium">
              See our political messaging system in action. Dispatch bulk SMS notifications, candidate manifesto broadcasts, and real-time voter updates with guaranteed high-speed delivery and direct carrier routing.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section: Bulk SMS Campaigns */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">Voter Mobilization</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">
              Bulk SMS Services for Election Campaigns
            </h2>
            <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed font-medium">
              In today’s rapidly evolving landscape, even election campaigns are undergoing profound transformations. The traditional methods of political outreach have shifted dramatically. Digital media has become the dominant force in shaping election processes, procedures, and promotional strategies.
            </p>
            <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed font-medium">
              Now, political parties have unprecedented access to their constituents, leveraging tools like bulk SMS services to effectively communicate their message.
            </p>
          </div>

          {/* Key Advantages */}
          <div className="lg:col-span-5 space-y-5">
            <h3 className="font-serif text-lg font-bold text-brand-charcoal border-b border-brand-charcoal/10 pb-3">
              Advantages of SMS Campaigns
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">1</span>
                <div>
                  <h4 className="font-bold text-sm text-brand-charcoal">Optimize Your Advertising Budget</h4>
                  <p className="text-xs text-brand-charcoal-light font-medium leading-relaxed mt-0.5">
                    Reach voters at a fraction of traditional ad costs without losing impact.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">2</span>
                <div>
                  <h4 className="font-bold text-sm text-brand-charcoal">Effectively Communicate Your Message</h4>
                  <p className="text-xs text-brand-charcoal-light font-medium leading-relaxed mt-0.5">
                    Deliver your message instantly to mass audiences on devices they check daily.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">3</span>
                <div>
                  <h4 className="font-bold text-sm text-brand-charcoal">Effortless Alerts and Announcements</h4>
                  <p className="text-xs text-brand-charcoal-light font-medium leading-relaxed mt-0.5">
                    Send timely rally updates, reminders, and campaign news to keep voters informed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Voice Call Campaigns */}
      <section className="bg-[#f5f4ea] py-12 sm:py-16 md:py-20 border-y border-brand-charcoal/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <PhoneCall size={24} />
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">
                Voice Call Services for Election Campaigns
              </h2>
              <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed font-bold">
                Connect directly with your audience through Transactional Voice Calls.
              </p>
              <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed font-medium">
                Personalize your message and effortlessly deliver it to your targeted audience using our intuitive platform for customized voice messages.
              </p>
              <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed font-medium">
                We help you connect to your audience with voice call services. Easily record voice calls via an automated online system and send them to your voters anywhere in India. Voice call services allow you to easily reach constituents by using pre-recorded messages. With a few clicks, you can create your voice message and automate the calling process. Using a bulk voice calling service, you can easily manage and keep track of calls.
              </p>
            </div>

            {/* Campaign details pointwise list */}
            <div className="lg:col-span-5 space-y-5">
              <h3 className="font-serif text-lg font-bold text-brand-charcoal border-b border-brand-charcoal/10 pb-3">
                Voice Call Campaigns
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">1</span>
                  <div>
                    <h4 className="font-bold text-sm text-brand-charcoal">Voice Call Campaigns in Elections</h4>
                    <p className="text-xs text-brand-charcoal-light font-medium leading-relaxed mt-0.5">
                      Send customized voice calls to an audience based on the message, language, etc. and target a wider audience.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">2</span>
                  <div>
                    <h4 className="font-bold text-sm text-brand-charcoal">Bulk SMS Capability</h4>
                    <p className="text-xs text-brand-charcoal-light font-medium leading-relaxed mt-0.5">
                      Take the message to your voter's ears at a highly budget-friendly price.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 3: WhatsApp Bulk SMS campaigns */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 lg:order-2">
            <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <WhatsappLogo size={24} />
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">
              Bulk WhatsApp SMS Services
            </h2>
            <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed font-bold">
              Empower your business with our effortless and powerful platform designed for bulk WhatsApp SMS services.
            </p>
            <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed font-medium">
              Seamlessly dispatch millions of promotional, transactional, implicit, and explicit messages, along with reminders, OTPs, and alerts, all with just a simple click. Stay connected with your customers anytime, anywhere, and drive engagement like never before.
            </p>
          </div>

          {/* Simulated WhatsApp Phone Interface */}
          <div className="lg:col-span-5 flex justify-center lg:order-1 w-full">
            <div className="relative w-full max-w-[280px] aspect-[9/16] bg-brand-charcoal rounded-[36px] p-1 shadow-xl border-2 border-brand-charcoal flex items-center justify-center overflow-hidden select-none">
              {/* Speaker/Notch (Thin) */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-3 w-24 bg-brand-charcoal rounded-b-lg z-20 flex items-center justify-center pointer-events-none">
                <div className="w-8 h-0.5 bg-white/20 rounded-full mb-0.5"></div>
              </div>
              
              {/* Screen Container */}
              <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-slate-50 flex flex-col justify-between">
                <div className="bg-emerald-950 text-white px-3.5 pt-7 pb-2.5 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[11px] font-bold text-emerald-950">AD</div>
                  <div>
                    <h4 className="font-bold text-[11px] leading-tight flex items-center gap-1 text-white">
                      Advait Digital
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500 flex items-center justify-center text-[6px] text-white">✓</span>
                    </h4>
                    <span className="text-[8px] text-emerald-300 flex items-center gap-1 leading-none mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Online
                    </span>
                  </div>
                </div>
                
                {/* Animated Chatstream */}
                <ElectionChatStream />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Campaign Statistics Representation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-brand-charcoal/10">
            <div className="space-y-2 p-4">
              <span className="text-3xl sm:text-4xl font-bold text-brand-orange font-serif">98%</span>
              <p className="text-[10px] uppercase font-bold text-brand-charcoal tracking-wider">SMS Open Rate</p>
              <p className="text-brand-charcoal-light text-[11px] font-medium max-w-xs mx-auto">Messages are read within 3 minutes of delivery.</p>
            </div>
            
            <div className="space-y-2 p-4">
              <span className="text-3xl sm:text-4xl font-bold text-brand-orange font-serif">Instant</span>
              <p className="text-[10px] uppercase font-bold text-brand-charcoal tracking-wider">Mass Delivery</p>
              <p className="text-brand-charcoal-light text-[11px] font-medium max-w-xs mx-auto">Dispatches notifications simultaneously with a single click.</p>
            </div>

            <div className="space-y-2 p-4">
              <span className="text-3xl sm:text-4xl font-bold text-brand-orange font-serif">100%</span>
              <p className="text-[10px] uppercase font-bold text-brand-charcoal tracking-wider">DLT Compliant</p>
              <p className="text-brand-charcoal-light text-[11px] font-medium max-w-xs mx-auto">Safe, legally compliant messaging channels with registration templates.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Banner CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#0b1b36] border border-white/10 rounded-2xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_60%)]"></div>
          <div className="relative z-10 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">Need Election Campaign Broadcasts?</h3>
            <p className="text-blue-200/80 text-xs sm:text-sm max-w-xl mx-auto font-medium leading-relaxed font-sans">
              Get setup within hours. Talk to our political outreach specialists to review pricing and campaign scheduling.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange/90 text-white w-full sm:w-80 py-3.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shadow-md shadow-brand-orange/20 hover:scale-[1.02]"
              >
                Contact Sales Desk
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

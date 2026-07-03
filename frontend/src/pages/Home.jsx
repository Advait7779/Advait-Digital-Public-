import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Users, Clock, Lightbulb, ArrowRight,
  CaretLeft, CaretRight, Star, Quotes
} from '@phosphor-icons/react';
import ServiceCard from '../components/ServiceCard';
import PhoneVideoPlayer from '../components/PhoneVideoPlayer';
import TechVideoPlayer from '../components/TechVideoPlayer';

// Import services illustrations
import rcsMultiplatform from '../assets/rcs_multiplatform.png';
import electionHero from '../assets/election_hero.png';
import webDesign from '../assets/web_design.png';
import waMarketing from '../assets/wa_marketing_business.png';
import dmGrowth from '../assets/dm_growth.png';
import smsStory from '../assets/sms_story.png';
import waStoreShoes from '../assets/wa_store_shoes.png';
import vcConnect from '../assets/vc_connect.png';
import waMobileHero from '../assets/edited-photo.png'; // new WhatsApp phone image

/* ─────────────────────────────────────────────────────────────────
   MESSAGE CARDS — Pinnacle style, small & varied shapes
   - Smaller fonts & padding so they don't crowd the phone
   - Cards positioned further out so they sit beside not on top
   - 4 distinct shapes: standard rounded, pill badge, square tight, wide shallow
───────────────────────────────────────────────────────────────── */

const MESSAGE_CARDS = [
  {
    // Shape A: standard card with icon row + body — top left
    id: 'card-a',
    side: 'left',
    topPct: '5%',
    leftPct: '10%',
    senderColor: '#075E54',
    senderBg: '#dcfce7',
    sender: 'WhatsApp',
    senderIcon: '💬',
    body: 'Campaign activated!\nReach: 1,00,000 contacts.',
    highlight: null,
    maxW: 158,
    shape: 'standard',   // rounded-2xl, normal padding
  },
  {
    // Shape B: pill / badge — single compact line, top right
    id: 'card-b',
    side: 'right',
    topPct: '8%',
    rightPct: '0%',
    senderColor: '#1e3a5f',
    senderBg: '#e0e9ff',
    sender: 'Advait Digital',
    senderIcon: '✅',
    body: 'OTP: 582914  •  Valid 10 min',
    highlight: '582914',
    maxW: 178,
    shape: 'pill',       // fully rounded, single-line compact
  },
  {
    // Shape C: square tight card — bottom left
    id: 'card-c',
    side: 'left',
    topPct: '60%',
    leftPct: '0%',
    senderColor: '#7c3aed',
    senderBg: '#f3e8ff',
    sender: 'Advait Digital',
    senderIcon: '📦',
    body: 'Order #AD9501 out for delivery.\nadvait.in/track',
    highlight: 'advait.in/track',
    maxW: 162,
    shape: 'square',     // rounded-xl, tighter padding
  },
  {
    // Shape D: wide shallow strip — bottom right
    id: 'card-d',
    side: 'right',
    topPct: '62%',
    rightPct: '0%',
    senderColor: '#b45309',
    senderBg: '#fef3c7',
    sender: 'RCS Alert',
    senderIcon: '🔔',
    body: 'Verified business profile is now active.',
    highlight: null,
    maxW: 170,
    shape: 'wide',       // rounded-lg, single compact strip
  },
];

/* Renders highlight text */
const renderBody = (body, highlight) => {
  if (!highlight) return <span>{body}</span>;
  const parts = body.split(highlight);
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 && (
        <span style={{ color: '#2563eb', textDecoration: 'underline', fontWeight: 600 }}>
          {highlight}
        </span>
      )}
    </span>
  ));
};

/* Shape-specific style maps */
const SHAPE_STYLES = {
  standard: { borderRadius: 14, padding: '7px 9px 8px', iconSize: 22, iconFont: 11 },
  pill:     { borderRadius: 999, padding: '6px 11px',   iconSize: 20, iconFont: 10 },
  square:   { borderRadius: 10,  padding: '6px 8px 7px', iconSize: 20, iconFont: 10 },
  wide:     { borderRadius: 8,   padding: '5px 9px',    iconSize: 18, iconFont: 10 },
};

/* Single animated card */
const MessageCard = ({ card, visible }) => {
  const isLeft = card.side === 'left';
  const s = SHAPE_STYLES[card.shape];

  const posStyle = {
    position: 'absolute',
    top: card.topPct,
    maxWidth: card.maxW,
    zIndex: 20,
    ...(isLeft ? { left: card.leftPct } : { right: card.rightPct }),
  };

  const isPill = card.shape === 'pill';
  const isWide = card.shape === 'wide';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={card.id}
          style={posStyle}
          initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{   opacity: 0, x: isLeft ? -30 : 30 }}
          transition={{ duration: 0.48, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: s.borderRadius,
              boxShadow: '0 4px 18px rgba(0,0,0,0.10)',
              border: '1px solid #f0f0f0',
              padding: s.padding,
              display: isPill || isWide ? 'flex' : 'block',
              alignItems: isPill || isWide ? 'center' : undefined,
              gap: isPill || isWide ? 6 : undefined,
            }}
          >
            {/* Pill & wide: inline icon + text in one row */}
            {(isPill || isWide) ? (
              <>
                <span
                  style={{
                    width: s.iconSize, height: s.iconSize,
                    borderRadius: '50%',
                    background: card.senderBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: s.iconFont, flexShrink: 0,
                  }}
                >
                  {card.senderIcon}
                </span>
                <div>
                  <p style={{ fontSize: 9, fontWeight: 800, color: card.senderColor, textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1, marginBottom: 2 }}>
                    {card.sender}
                  </p>
                  <p style={{ fontSize: 10, color: '#374151', fontWeight: 500, lineHeight: 1.35, whiteSpace: 'pre-line' }}>
                    {renderBody(card.body, card.highlight)}
                  </p>
                </div>
              </>
            ) : (
              /* Standard & square: icon row then body below */
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                  <span
                    style={{
                      width: s.iconSize, height: s.iconSize,
                      borderRadius: '50%',
                      background: card.senderBg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: s.iconFont, flexShrink: 0,
                    }}
                  >
                    {card.senderIcon}
                  </span>
                  <span style={{ fontSize: 9, fontWeight: 800, color: card.senderColor, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {card.sender}
                  </span>
                </div>
                <p style={{ fontSize: 10, color: '#374151', fontWeight: 500, lineHeight: 1.45, whiteSpace: 'pre-line' }}>
                  {renderBody(card.body, card.highlight)}
                </p>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* Orchestrator — cards come in one-by-one, all stay, then full reset */
const MessageStream = ({ active }) => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setVisibleCount(0);
      return;
    }

    // Sequence: reveal card 1 at 0.4s, card 2 at 1.2s, card 3 at 2.0s, card 4 at 2.8s
    // Then reset all at 6.5s and start over
    const delays = [400, 1200, 2000, 2800];

    const timeouts = [];

    const runCycle = () => {
      // Reveal cards one by one
      delays.forEach((d, i) => {
        const t = setTimeout(() => setVisibleCount(i + 1), d);
        timeouts.push(t);
      });

      // Reset after full cycle
      const reset = setTimeout(() => {
        setVisibleCount(0);
        // brief gap then restart
        const restart = setTimeout(runCycle, 500);
        timeouts.push(restart);
      }, 6500);
      timeouts.push(reset);
    };

    runCycle();

    return () => timeouts.forEach(clearTimeout);
  }, [active]);

  return (
    <>
      {MESSAGE_CARDS.map((card, i) => (
        <MessageCard
          key={card.id}
          card={card}
          enterDelay={0}             // delay is handled by visibleCount gating
          visible={visibleCount > i && active}
        />
      ))}
    </>
  );
};

/* ─── Main Home Component ────────────────────────────────────────── */
export default function Home() {
  const digitalServices = [
    {
      title: 'Rich Communication Service (RCS)',
      description: 'Upgrade traditional SMS to rich, interactive, and branded messaging with company logos, verified badges, videos, and suggested action replies.',
      path: '/services/rcs',
      image: rcsMultiplatform,
      colorClass: 'bg-indigo-600'
    },
    {
      title: 'Bulk SMS for Election',
      description: 'Deploy target-focused promotional and transactional SMS campaigns. Keep voters engaged with announcements, alerts, and instant announcements.',
      path: '/services/election-sms',
      image: electionHero,
      colorClass: 'bg-blue-600'
    },
    {
      title: 'Website Design & Development',
      description: 'Transform your brand into a visual story. We build fully responsive, standard-compliant, W3C optimized websites with custom CMS integrations.',
      path: '/services/web-dev',
      image: webDesign,
      colorClass: 'bg-teal-600'
    },
    {
      title: 'WhatsApp Marketing Services',
      description: 'Engage customers using WhatsApp broadcast lists and campaigns. Showcase your products and reach audiences directly with rich media alerts.',
      path: '/services/whatsapp-marketing',
      image: waMarketing,
      colorClass: 'bg-green-600'
    },
    {
      title: 'Digital Marketing Services',
      description: 'Planning and executing SEO, Social Media Campaigns, and Google Ads strategies tailored to drive leads and convert visitors into active customers.',
      path: '/services/digital-marketing',
      image: dmGrowth,
      colorClass: 'bg-amber-600'
    },
    {
      title: 'SMS Marketing Services',
      description: 'Direct SMS campaigns that cut through the noise. Dispatch promotional, transactional, reminders, OTPs, and notifications at scale with 100% reach.',
      path: '/services/sms-marketing',
      image: smsStory,
      colorClass: 'bg-red-600'
    },
    {
      title: 'WhatsApp Business API',
      description: 'Build automated chatbots, integrate shared team inboxes, send commerce catalog messages, and design programmable 2-way workflows.',
      path: '/services/whatsapp-api',
      image: waStoreShoes,
      colorClass: 'bg-emerald-600'
    },
    {
      title: 'Voice Call Services',
      description: 'Broadcast personalized, pre-recorded audio messages. Target wide audiences across India with transaction-based automated voice campaigns.',
      path: '/services/voice-call',
      image: vcConnect,
      colorClass: 'bg-pink-600'
    }
  ];

  const valueProps = [
    { title: 'Trusted Tech Organization', desc: 'A well-established name building enterprise-grade software and communications frameworks.', icon: ShieldCheck },
    { title: 'Extraordinary Customer Support', desc: 'Dedicated 24/7 technical and campaign support to ensure your broadcasts always deliver.', icon: Users },
    { title: 'Proactive Approach', desc: 'Forward-looking solutions from RCS messaging to AI chatbots to keep your brand ahead of the curve.', icon: Lightbulb },
    { title: 'Rapid Execution & Response', desc: 'Fast onboarding, quick setup, and highly responsive infrastructure for high-scale campaigns.', icon: Clock }
  ];

  const testimonials = [
    { name: 'Vinayak Benargee', role: 'Enterprise Client', quote: 'They are very skilled and knowledgeable with good experience in their communication services.' },
    { name: 'Karthik Choksi', role: 'Business Owner', quote: 'Good website design service. It was a good experience working with their team for our portal.' },
    { name: 'Anup Dondiya', role: 'Campaign Manager', quote: 'Was happy with their election bulk SMS service. I would strongly recommend their service.' },
    { name: 'Daksh Yadav', role: 'E-commerce Partner', quote: 'They listen to your needs and customize their WhatsApp API chatbot integration accordingly.' },
    { name: 'Sarthak Mehta', role: 'Political Coordinator', quote: 'They have a very professional approach and provided hassle-free service for our campaign.' },
    { name: 'Ayushman Desai', role: 'Start-up Founder', quote: 'I am happy that they are working with such passion and providing such excellent developer support.' }
  ];

  const banners = [
    {
      title: "Ultimate Solution for Whatsapp Marketting",
      description: "Our ADVAIT DIGITAL is a trusted and efficient platform designed to revolutionize the way businesses connect with their customers. With official verification by Meta our portal ensures secure reliable and compliant communication solutions tailored to meet modern marketing needs.",
      image: waMobileHero,
      tag: "ADVAIT DIGITAL",
      path: "/services/whatsapp-marketing",
      btnText: "Explore WhatsApp Marketing",
      showStream: true,
    },
    {
      title: "Build High-Performance Custom Websites",
      description: "Transform your brand into a visual masterpiece. We construct fast, fully responsive, W3C-optimized web portals that engage visitors.",
      image: webDesign,
      tag: "Web Design & Dev",
      path: "/services/web-dev",
      btnText: "Explore Web Dev",
      showStream: false,
    },
    {
      title: "Elevate Conversations with RCS Messaging",
      description: "Upgrade traditional SMS to rich, interactive, and fully branded chat experiences with company verification and quick action buttons.",
      image: rcsMultiplatform,
      tag: "Next-Gen Messaging",
      path: "/services/rcs",
      btnText: "Explore RCS Services",
      showStream: false,
    },
    {
      title: "Targeted Outreach & SMS Campaigns",
      description: "Dispatch promotional alerts, OTPs, transactional notifications, and reminders at scale with guaranteed 100% network delivery uptime.",
      image: vcConnect,
      tag: "Bulk SMS Marketing",
      path: "/services/sms-marketing",
      btnText: "Explore SMS Marketing",
      showStream: false,
    }
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    // The main mobile hero banner (slide 0) stays for 30 seconds.
    // Subsequent banners stay for 5 seconds.
    const delay = currentBanner === 0 ? 30000 : 5000;
    const timer = setTimeout(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, delay);
    return () => clearTimeout(timer);
  }, [currentBanner, banners.length]);

  // Responsive carousel state
  const [itemsPerView, setItemsPerView] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [srvPerView, setSrvPerView] = useState(4);
  const [srvIndex, setSrvIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { setItemsPerView(3); setSrvPerView(4); }
      else if (window.innerWidth >= 768) { setItemsPerView(2); setSrvPerView(2); }
      else { setItemsPerView(1); setSrvPerView(1); }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const maxIndex = testimonials.length - itemsPerView;
    if (currentIndex > maxIndex) setCurrentIndex(Math.max(0, maxIndex));
  }, [itemsPerView]);

  useEffect(() => {
    const maxIndex = digitalServices.length - srvPerView;
    if (srvIndex > maxIndex) setSrvIndex(Math.max(0, maxIndex));
  }, [srvPerView]);

  const nextSlide = () => setCurrentIndex(prev => {
    const max = testimonials.length - itemsPerView;
    return prev >= max ? 0 : prev + 1;
  });
  const prevSlide = () => setCurrentIndex(prev => {
    const max = testimonials.length - itemsPerView;
    return prev <= 0 ? max : prev - 1;
  });
  const nextSrv = () => setSrvIndex(prev => {
    const max = digitalServices.length - srvPerView;
    return prev >= max ? 0 : prev + 1;
  });
  const prevSrv = () => setSrvIndex(prev => {
    const max = digitalServices.length - srvPerView;
    return prev <= 0 ? max : prev - 1;
  });

  return (
    <div className="pt-24 space-y-24">

      {/* ── Sliding Banner Hero Section ──────────────────────────── */}
      <section className="bg-brand-cream relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentBanner * (100 / banners.length)}%)`,
            width: `${banners.length * 100}%`
          }}
        >
          {banners.map((banner, idx) => (
            <div
              key={idx}
              style={{ width: `${100 / banners.length}%` }}
              className="flex-shrink-0 flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24"
            >
              <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                  {/* Hero Text */}
                  <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider"
                    >
                      {banner.tag}
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-charcoal leading-tight font-serif"
                    >
                      {banner.title}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium"
                    >
                      {banner.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                    >
                      <Link
                        to={banner.path}
                        className="w-full sm:w-auto bg-brand-charcoal text-white hover:bg-brand-orange px-5 py-2.5 rounded-lg font-semibold shadow-sm transition duration-200 flex items-center justify-center gap-1.5 cursor-pointer text-xs"
                      >
                        {banner.btnText}
                        <ArrowRight size={16} />
                      </Link>
                    </motion.div>
                  </div>

                  {/* ── Hero Image + Message Stream ─────────────────── */}
                  <div className="lg:col-span-5 flex justify-center select-none">
                    {banner.showStream ? (
                      /*
                       * Outer wrapper: px-20 gives 80px of horizontal breathing room
                       * on each side so the absolute-positioned cards
                       * sit beside the phone, not on it.
                       */
                      <div
                        className="relative flex items-center justify-center w-full"
                        style={{ minHeight: 340, paddingLeft: 72, paddingRight: 72 }}
                      >
                        {/* Message cards — only animate when this slide is active */}
                        <MessageStream active={idx === currentBanner} />

                        {/* Phone image — centred, smaller so cards have room */}
                        <motion.img
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          src={banner.image}
                          alt={banner.title}
                          className="relative z-10 object-contain"
                          style={{ maxHeight: 310, width: '100%' }}
                        />
                      </div>
                    ) : (
                      /* Normal static image for other slides */
                      <div className="h-48 sm:h-64 md:h-80 flex items-center">
                        <motion.img
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          src={banner.image}
                          alt={banner.title}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-20">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBanner(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentBanner === idx
                  ? 'bg-brand-orange w-6'
                  : 'bg-brand-charcoal/20 hover:bg-brand-charcoal/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── Bulk SMS & Campaign Video Section ──────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <TechVideoPlayer 
              src="/bulk election.mp4" 
              title="Bulk SMS & Campaign Messaging Platform" 
            />
          </div>
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">Live Platform Demo & Bulk SMS</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-charcoal font-serif">
              Engage Audiences & Voters Instantly with Bulk SMS
            </h2>
            <div className="w-20 h-1 bg-brand-orange rounded"></div>
            <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed font-medium">
              See our high-performance bulk messaging portal in action. With automated template triggers, customizable user variables, direct carrier routing, and election campaign support, dispatch messages that reach thousands of recipients in seconds.
            </p>
            <div className="pt-2">
              <Link
                to="/services/sms-marketing"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-charcoal hover:text-brand-orange transition-colors duration-150"
              >
                Explore Bulk SMS Services
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Slider Carousel (Our Digital Solutions) ────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-charcoal font-serif">
            Our Digital Solutions
          </h2>
          <p className="text-brand-charcoal-light max-w-xl mx-auto font-medium text-sm sm:text-base">
            Focusing exclusively on our cutting-edge communications, web development, and digital marketing frameworks.
          </p>
        </div>

        <div className="relative">
          <button
            onClick={prevSrv}
            disabled={srvIndex === 0}
            className="absolute left-0 md:left-[-20px] lg:left-[-50px] top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-brand-charcoal/10 bg-white flex items-center justify-center text-brand-charcoal hover:bg-brand-cream/35 disabled:opacity-30 disabled:hover:bg-white transition duration-200 cursor-pointer shadow-md"
            aria-label="Previous services"
          >
            <CaretLeft size={20} weight="bold" />
          </button>

          <div className="overflow-hidden mx-[-12px] md:mx-[-16px] px-1 py-4">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${srvIndex * (100 / srvPerView)}%)` }}
            >
              {digitalServices.map((service, index) => (
                <div key={index} className="w-full md:w-1/2 lg:w-1/4 shrink-0 px-3">
                  <ServiceCard service={service} index={index} />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextSrv}
            disabled={srvIndex >= digitalServices.length - srvPerView}
            className="absolute right-0 md:right-[-20px] lg:right-[-50px] top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-brand-charcoal/10 bg-white flex items-center justify-center text-brand-charcoal hover:bg-brand-cream/35 disabled:opacity-30 disabled:hover:bg-white transition duration-200 cursor-pointer shadow-md"
            aria-label="Next services"
          >
            <CaretRight size={20} weight="bold" />
          </button>
        </div>
      </section>

      {/* ── Website Development Showcase Section ──────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">Website Development & Digital Platforms</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-charcoal font-serif">
              Transform Your Business with Custom Website Development
            </h2>
            <div className="w-20 h-1 bg-brand-orange rounded"></div>
            <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed font-medium">
              Elevate your digital presence with custom web applications, responsive corporate portals, and high-converting e-commerce sites. We design ultra-fast, sleek, and mobile-optimized web solutions designed to turn visitors into loyal customers.
            </p>
            <div className="pt-2">
              <Link
                to="/services/web-dev"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-charcoal hover:text-brand-orange transition-colors duration-150"
              >
                Explore Website Development
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <TechVideoPlayer 
              src="/Website developement.mp4" 
              title="Custom Web & Portal Development Showcase" 
            />
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────────────── */}
      <section className="bg-[#1c191a] text-[#E5E4DE] py-16 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-serif">
                Partner with a Trusted Tech Team
              </h2>
              <p className="text-[#E5E4DE]/70 leading-relaxed font-medium text-sm sm:text-base">
                Advait is dedicated to building robust digital communication portals, bespoke high-converting website designs, and targeted promotional strategies tailored for campaign operations and corporate growth.
              </p>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-brand-orange transition duration-200"
                >
                  Learn More About Us
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8">
              {valueProps.map((prop, idx) => {
                const PropIcon = prop.icon;
                return (
                  <div key={idx} className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-full border border-brand-orange/30 text-brand-orange flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 duration-200 bg-brand-orange/5">
                      <PropIcon size={18} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-white group-hover:text-brand-orange transition-colors duration-150">
                        {prop.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#E5E4DE]/75 leading-relaxed font-medium">
                        {prop.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-charcoal font-serif">
            What Our Clients Say
          </h2>
          <p className="text-brand-charcoal-light max-w-xl mx-auto font-medium text-sm">
            Read verified feedback from businesses and campaign leaders who trust Advait Digital.
          </p>
        </div>

        <div className="relative">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="absolute left-0 md:left-[-20px] lg:left-[-50px] top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-brand-charcoal/10 bg-white flex items-center justify-center text-brand-charcoal hover:bg-brand-cream/35 disabled:opacity-30 disabled:hover:bg-white transition duration-200 cursor-pointer shadow-md"
            aria-label="Previous reviews"
          >
            <CaretLeft size={20} weight="bold" />
          </button>

          <div className="overflow-hidden mx-[-12px] md:mx-[-16px] px-1 py-4">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {testimonials.map((t, idx) => {
                const initials = t.name.split(' ').map(n => n[0]).join('').toUpperCase();
                return (
                  <div key={idx} className="w-full md:w-1/2 lg:w-1/3 shrink-0 px-3 md:px-4">
                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-brand-charcoal/5 shadow-xs flex flex-col justify-between h-full min-h-[260px] relative hover:shadow-md hover:border-brand-orange/20 transition-all duration-300 group">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-0.5 text-brand-orange">
                          {[...Array(5)].map((_, i) => <Star key={i} size={14} weight="fill" />)}
                        </div>
                        <Quotes size={24} className="text-brand-charcoal/10 group-hover:text-brand-orange/20 transition-colors" />
                      </div>
                      <p className="text-brand-charcoal-light/90 italic text-sm leading-relaxed mb-6 flex-grow font-medium">
                        "{t.quote}"
                      </p>
                      <div className="flex items-center gap-3 pt-4 border-t border-brand-charcoal/5">
                        <div className="w-9 h-9 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center font-bold text-xs uppercase shrink-0">
                          {initials}
                        </div>
                        <div>
                          <h4 className="font-bold text-brand-charcoal text-xs sm:text-sm">{t.name}</h4>
                          <p className="text-[10px] text-brand-charcoal-light/50 font-bold uppercase tracking-wider">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={nextSlide}
            disabled={currentIndex >= testimonials.length - itemsPerView}
            className="absolute right-0 md:right-[-20px] lg:right-[-50px] top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-brand-charcoal/10 bg-white flex items-center justify-center text-brand-charcoal hover:bg-brand-cream/35 disabled:opacity-30 disabled:hover:bg-white transition duration-200 cursor-pointer shadow-md"
            aria-label="Next reviews"
          >
            <CaretRight size={20} weight="bold" />
          </button>

          <div className="flex justify-center items-center gap-2 mt-6">
            {Array.from({ length: testimonials.length - itemsPerView + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? 'bg-brand-orange w-6'
                    : 'bg-brand-charcoal/20 hover:bg-brand-charcoal/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-brand-charcoal border border-white/5 rounded-3xl p-10 md:p-16 text-center space-y-6 relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 pointer-events-none"></div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white">
              Ready to Upgrade Your Outreach?
            </h2>
            <p className="text-[#E5E4DE]/80 text-sm sm:text-base max-w-xl mx-auto font-medium leading-relaxed">
              We specialize in setting up custom message templates, DLT registrations, and scalable web solutions. Contact our sales department to receive a live demonstration.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
              <a
                href="https://waba.advaitdigital.co.in/register"
                className="w-full sm:w-auto bg-brand-orange text-white hover:bg-brand-orange/90 px-8 py-3.5 rounded-xl font-bold shadow-md transition duration-200 flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                Register Now
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
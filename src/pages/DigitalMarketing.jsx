import React from 'react';
import { 
  Users, Cpu, FileText, Target, ShieldCheck, 
  ArrowLeft, ArrowRight, Megaphone, Laptop, 
  ChatCircleText, Globe, Phone, Gear
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import PhoneVideoPlayer from '../components/PhoneVideoPlayer';
import TechVideoPlayer from '../components/TechVideoPlayer';

// Import graphics copied from uploaded assets
import imgHeads from '../assets/dm_heads.png';
import imgFunnel from '../assets/dm_funnel.png';

export default function DigitalMarketing() {
  const teamValues = [
    { 
      title: 'Experienced Team', 
      desc: 'We are the team of experts that can deliver some unique results in time.', 
      icon: Users 
    },
    { 
      title: 'Tech Savvy', 
      desc: 'We are technologically adaptable/ Staying updates with latest tools and technologies.', 
      icon: Cpu 
    },
    { 
      title: 'Tracking & Reporting', 
      desc: 'We keep a complete track of the project done along with proper report analysis.', 
      icon: FileText 
    },
    { 
      title: 'Result Oriented', 
      desc: 'We strive to deliver the best possible results that can boost your business.', 
      icon: Target 
    }
  ];

  const services = [
    {
      title: 'Social Media Marketing',
      desc: 'Create your own brand on multi-level Social Media Marketing.',
      icon: Megaphone
    },
    {
      title: 'Web Development',
      desc: 'Transforming your brand into a visual story with the help of our web designers.',
      icon: Laptop
    },
    {
      title: 'Bulk SMS Services',
      desc: 'Bulk SMS is the powerful tool to send your promotions and information to your customers at critical time.',
      icon: ChatCircleText
    },
    {
      title: 'Search Engine Optimization',
      desc: 'Website will be appearing at the top of the organic search results.',
      icon: Globe
    },
    {
      title: 'Voice call Services',
      desc: 'Voice call is the speaking message, which reaches directly to the prospects mobile or landing numbers.',
      icon: Phone
    }
  ];

  const digitalFeatures = [
    {
      title: 'Universal Availability',
      desc: 'Digital Marketing platforms are available for every product and service in the market, allowing any business to launch a global campaign.'
    },
    {
      title: 'Rapid Market Reach',
      desc: 'It offers a highly efficient and fast way to reach thousands of potential customers and target audiences in real-time.'
    },
    {
      title: 'Cost-Effective Advertising',
      desc: 'The average cost for online promotions is significantly lower than traditional marketing methods, maximizing return on investment.'
    },
    {
      title: 'Instant Customer Feedback',
      desc: 'Allows customers to leave direct feedback and reviews, enabling businesses to communicate interactively and build immediate trust.'
    },
    {
      title: 'Simplified Direct Engagement',
      desc: 'It is simple to connect and engage directly with your customers, helping you establish persistent brand loyalty and customer care.'
    }
  ];

  return (
    <div className="pt-24 space-y-12 sm:space-y-16 md:space-y-24 pb-12 sm:pb-16 md:pb-20 bg-brand-cream-light font-sans">
      
      {/* High-Contrast Hero Banner */}
      <section className="bg-[#0c1b3d] text-white py-12 sm:py-16 md:py-20 relative overflow-hidden">
        {/* Decorative bottom border gradient */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 via-brand-orange to-brand-yellow opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-white transition-colors duration-150 mb-8"
          >
            <ArrowLeft size={14} />
            Back to Services
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Title & Overview copy */}
            <div className="lg:col-span-7 space-y-6">
              <span className="px-3 py-1 rounded bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
                Services
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif leading-tight tracking-tight text-white">
                Digital Marketing Services
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed font-medium">
                Advait Digital designs results-oriented social media campaigns, search engine optimization (SEO), and targeted Google Ads to expand your brand exposure, drive web traffic, and generate premium sales leads.
              </p>
            </div>
            
            {/* Right Flowchart Image */}
            <div className="lg:col-span-5 flex justify-center">
              <img 
                src={imgHeads} 
                alt="Flowchart diagram connecting two heads representing ideas and strategy" 
                className="w-full h-auto max-w-sm hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core pillars Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-2">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">Our Strengths</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">Leading Team of Expertise</h2>
          <div className="w-24 h-1 bg-brand-orange mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="bg-white border border-brand-charcoal/5 rounded-2xl p-6 space-y-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-brand-charcoal font-serif">{val.title}</h3>
                <p className="text-sm text-brand-charcoal-light leading-relaxed">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Brand Building Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Tech Video Mockup Column (Left on Desktop) */}
          <div className="lg:col-span-6">
            <TechVideoPlayer src="/Website developement.mp4" title="Digital Brand & Web Development Platform" />
          </div>

          {/* Text Column (Right on Desktop) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Brand Building</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-charcoal">
                Complete Brand Creation & Optimization
              </h2>
              <div className="w-16 h-1 bg-blue-500 rounded"></div>
            </div>
            
            <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed">
              We strive to generate awareness of your business with the use of campaigns and strategies with the aim of creating a unique and lasting image in the online marketplace. We offer growth to businesses by building your brand across the online world.
            </p>
            <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed font-semibold text-blue-700">
              You can now place your brand on the map with the Digital Marketing solutions driven by ROI. You can also acquire new customers at the most optimum cost and we make sure that you get this done right. This is where we help you being certified by the industry.
            </p>
          </div>
        </div>
      </section>

      {/* Lead Generation Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex justify-center lg:order-2">
            <img 
              src={imgFunnel} 
              alt="Magnet attracting leads funnel and target representation layout" 
              className="w-full h-auto max-w-md hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
          
          <div className="lg:col-span-7 space-y-6 lg:order-1">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Sale & Business Growth</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-charcoal">
                Lead Generation
              </h2>
              <div className="w-16 h-1 bg-blue-500 rounded"></div>
            </div>
            
            <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed">
              The manners in which we do business have changed rapidly. gone are those days when business promotion meant knocking on doors. With our renowned lead generation services, you can now focus on your target audience and generate your potential leads.
            </p>
            <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed font-semibold text-blue-700">
              Our digital marketing strategies will help you immensely to create a starting and growing point for your business. We help to generate traffic to your business’s website, convert those website visitors into leads and then convert them to your customers.
            </p>
          </div>
        </div>
      </section>

      {/* Our Digital Marketing Services Grid */}
      <section className="bg-white py-12 sm:py-16 md:py-20 border-y border-brand-charcoal/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">Core Offerings</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">Our Digital Marketing Services</h2>
            <div className="w-24 h-1 bg-brand-orange mx-auto rounded"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-16 max-w-5xl mx-auto">
            {services.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div key={idx} className="bg-brand-cream-light/40 border border-brand-charcoal/5 rounded-2xl p-8 space-y-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300 w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-brand-charcoal font-serif">{srv.title}</h3>
                  <p className="text-sm text-brand-charcoal-light leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Online Platforms Stand Out (Features checklist) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Key Features</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-charcoal">Important Feature of Digital Marketing</h2>
            <div className="w-16 h-1 bg-blue-500 rounded mx-auto md:mx-0"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-16 pt-2">
            {digitalFeatures.map((feat, idx) => (
              <div key={idx} className="flex gap-4 w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} weight="bold" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-sm sm:text-base text-brand-charcoal">{feat.title}</h4>
                  <p className="text-xs sm:text-sm text-brand-charcoal-light leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Footer CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#0c1b3d] border border-white/10 rounded-3xl p-8 md:p-12 text-center space-y-6 relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_60%)]"></div>
          <div className="relative z-10 space-y-6">
            <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">Growth Solutions</span>
            <h3 className="text-2xl font-serif font-bold text-white">Need ROI-Driven Growth?</h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
              Acquire new customers at the most optimum cost. Send us an enquiry with your details to define campaign strategies.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange/90 text-white w-full sm:w-80 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-md shadow-brand-orange/20 hover:scale-[1.02]"
              >
                Submit Enquiry
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

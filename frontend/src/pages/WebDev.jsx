import React from 'react';
import SEOHead from '../components/SEOHead';
import { 
  Globe, Code, Cpu, Laptop, ShoppingCart, 
  ArrowsMerge, ArrowLeft, ArrowRight, Gear, Browser,
  PaintBrush, ShieldCheck, Devices
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

// Import graphics copied from uploaded assets
import imgBetter from '../assets/web_better.png';
import imgDesign from '../assets/web_design.png';
import imgFrontend from '../assets/web_frontend.png';
import imgCms from '../assets/web_cms.png';
import TechVideoPlayer from '../components/TechVideoPlayer';

// CSS Multi-Device Mockup representing responsive site structure
const MultiDeviceMockup = () => {
  return (
    <div className="relative w-full max-w-lg h-[280px] sm:h-[360px] flex items-center justify-center select-none">
      {/* Desktop Monitor Bezel */}
      <div className="absolute top-4 left-4 w-[72%] aspect-[16/10] bg-zinc-900 rounded-xl p-1.5 shadow-2xl border border-zinc-700/40">
        <div className="w-full h-full bg-slate-900 rounded-lg overflow-hidden flex flex-col relative">
          {/* Browser Header */}
          <div className="bg-zinc-800 px-2 py-1 flex items-center gap-1 border-b border-zinc-700/50">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
            <div className="h-3.5 bg-zinc-900 border border-zinc-800 rounded flex-1 ml-2 text-[6px] text-zinc-400 flex items-center px-1 font-mono">
              advaitteleservices.com/services
            </div>
          </div>
          {/* Browser Body Mockup */}
          <div className="p-2 flex-1 space-y-1.5 overflow-hidden text-slate-400 text-[6px]">
            <div className="h-2 bg-blue-500 rounded-xs w-1/3"></div>
            <div className="space-y-0.5">
              <div className="h-1 bg-zinc-700 rounded-xs w-full"></div>
              <div className="h-1 bg-zinc-700 rounded-xs w-[90%]"></div>
            </div>
            <div className="grid grid-cols-3 gap-1 pt-1">
              <div className="h-8 bg-zinc-800 border border-zinc-700/50 rounded flex flex-col justify-between p-1">
                <span className="text-white font-bold">Web Design</span>
                <span className="text-[4px] text-zinc-500">Visualization</span>
              </div>
              <div className="h-8 bg-zinc-800 border border-zinc-700/50 rounded flex flex-col justify-between p-1">
                <span className="text-white font-bold">Front-End</span>
                <span className="text-[4px] text-zinc-500">React & CSS</span>
              </div>
              <div className="h-8 bg-zinc-800 border border-zinc-700/50 rounded flex flex-col justify-between p-1">
                <span className="text-white font-bold">CMS Dev</span>
                <span className="text-[4px] text-zinc-500">WordPress</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tablet (Overlapping right) */}
      <div className="absolute bottom-6 right-10 w-[36%] aspect-[3/4] bg-zinc-800 rounded-lg p-1 shadow-2xl border border-zinc-700">
        <div className="w-full h-full bg-slate-900 rounded-md overflow-hidden flex flex-col relative">
          <div className="bg-zinc-800 h-2 w-full border-b border-zinc-700 flex items-center justify-center">
            <div className="w-6 h-0.5 bg-zinc-900 rounded-full"></div>
          </div>
          <div className="p-1.5 flex-1 space-y-1 overflow-hidden">
            <div className="h-1.5 bg-emerald-500 rounded-xs w-1/2"></div>
            <div className="h-1 bg-zinc-700 rounded-xs w-full"></div>
            <div className="h-1 bg-zinc-700 rounded-xs w-[80%]"></div>
            <div className="grid grid-cols-2 gap-1 pt-1">
              <div className="h-10 bg-zinc-800 border border-zinc-700 rounded"></div>
              <div className="h-10 bg-zinc-800 border border-zinc-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Smartphone (Overlapping front-right) */}
      <div className="absolute bottom-2 right-2 w-[18%] aspect-[9/19] bg-zinc-900 rounded-xl p-1 shadow-2xl border border-zinc-800">
        <div className="w-full h-full bg-slate-900 rounded-[9px] overflow-hidden flex flex-col relative">
          {/* Notch */}
          <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-zinc-900 rounded-b-sm flex items-center justify-center">
            <div className="w-0.5 h-0.5 rounded-full bg-zinc-700"></div>
          </div>
          <div className="pt-3 p-1 flex-1 space-y-1 overflow-hidden">
            <div className="h-1 bg-amber-500 rounded-xs w-[70%]"></div>
            <div className="h-0.5 bg-zinc-700 rounded-xs w-full"></div>
            <div className="h-6 bg-zinc-800 border border-zinc-700 rounded-sm flex items-center justify-center text-[4px] text-zinc-400 font-bold">
              Mobile UI
            </div>
            <div className="h-6 bg-zinc-800 border border-zinc-700 rounded-sm flex items-center justify-center text-[4px] text-zinc-400 font-bold">
              Scale Fit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Pure CSS Mobile UI/UX Wireframe App Mockup
const UxUiMockup = () => {
  return (
    <div className="w-full max-w-[260px] bg-zinc-900 rounded-[32px] p-2.5 shadow-xl border border-zinc-800 relative mx-auto select-none">
      {/* Phone Speaker & Camera Bezel */}
      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-3 bg-zinc-900 rounded-b-lg flex items-center justify-center gap-1 z-20">
        <div className="w-6 h-0.5 bg-zinc-700 rounded-full"></div>
        <div className="w-1 h-1 bg-zinc-700 rounded-full"></div>
      </div>
      
      {/* Screen */}
      <div className="bg-[#0f172a] rounded-[24px] overflow-hidden aspect-[9/16] p-3 pt-5 text-white flex flex-col justify-between border border-zinc-700/20">
        {/* Header */}
        <div className="flex justify-between items-center text-[8px] text-slate-400">
          <span className="font-semibold">ADVAIT UI/UX</span>
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 flex items-center justify-center text-white text-[6px] font-bold">A</div>
        </div>
        
        {/* Analytics Card Mockup */}
        <div className="bg-slate-800/80 rounded-xl p-2 space-y-1.5 border border-slate-700/50">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-pink-500/20 flex items-center justify-center text-pink-400 text-[8px]">🎨</div>
            <div>
              <h5 className="font-bold text-[8px] text-slate-100">Layout Optimization</h5>
              <p className="text-[6px] text-slate-400">User Flow Mapping</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1 pt-0.5">
            <div className="bg-slate-900/50 rounded p-1 border border-slate-700/20">
              <div className="text-[5px] text-slate-400">Bounce Rate</div>
              <div className="text-[8px] font-bold text-emerald-400">-18.4%</div>
            </div>
            <div className="bg-slate-900/50 rounded p-1 border border-slate-700/20">
              <div className="text-[5px] text-slate-400">Conversions</div>
              <div className="text-[8px] font-bold text-pink-400">+32.6%</div>
            </div>
          </div>
        </div>

        {/* Prototype Screen Wireframe */}
        <div className="flex-1 my-1.5 bg-slate-900/40 rounded-xl border border-slate-800 p-2 flex flex-col justify-between space-y-1">
          <div className="h-1 bg-indigo-500 rounded-xs w-1/3"></div>
          <div className="space-y-0.5">
            <div className="h-1 bg-slate-800 rounded-xs w-full"></div>
            <div className="h-1 bg-slate-800 rounded-xs w-[90%]"></div>
            <div className="h-1 bg-slate-800 rounded-xs w-[85%]"></div>
          </div>
          
          <div className="flex items-center justify-between gap-1 pt-1">
            <div className="h-3 bg-pink-500 rounded-md flex-1 text-[5px] flex items-center justify-center font-bold text-white shadow-xs">
              Primary Button
            </div>
            <div className="h-3 bg-slate-800 rounded-md w-6"></div>
          </div>
        </div>

        {/* Footer Navigation Mockup */}
        <div className="border-t border-slate-800 pt-1 flex justify-between px-2 text-slate-500 text-[8px]">
          <span>🏠</span>
          <span>🔍</span>
          <span className="text-pink-400">🎛️</span>
          <span>👤</span>
        </div>
      </div>
    </div>
  );
};

// CSS Train Timeline showing technologies
const TrainTimeline = () => {
  const trainCars = [
    { label: 'HTML5', color: 'bg-red-500 border-red-600', icon: Code, desc: 'W3C Code standards' },
    { label: 'CSS3', color: 'bg-blue-500 border-blue-600', icon: PaintBrush, desc: 'Responsive layouts' },
    { label: 'JavaScript', color: 'bg-yellow-500 border-yellow-600', icon: Cpu, desc: 'Interactive features' },
    { label: 'React / SPA', color: 'bg-indigo-500 border-indigo-600', icon: Globe, desc: 'Modern interfaces' },
    { label: 'WordPress', color: 'bg-emerald-500 border-emerald-600', icon: Laptop, desc: 'CMS integration' },
    { label: 'SEO Config', color: 'bg-indigo-900 border-indigo-950', icon: ShieldCheck, desc: 'Search engine ready' }
  ];

  return (
    <div className="w-full overflow-x-auto pb-6 pt-4 flex justify-start lg:justify-center items-end px-4 gap-2 scrollbar-thin scrollbar-thumb-slate-300">
      <div className="flex items-end gap-1.5 min-w-max select-none">
        
        {/* Steam Locomotive (Front Engine) */}
        <div className="w-36 h-28 bg-amber-600 rounded-t-2xl rounded-r-lg border-2 border-amber-700 relative flex flex-col justify-between p-2.5 text-white shadow-md z-10">
          {/* Chimney and steam bubbles */}
          <div className="absolute -top-3 left-4 w-4 h-4 bg-zinc-800 border border-zinc-700 rounded-t-xs">
            <div className="absolute -top-3 -left-1 w-2.5 h-2.5 rounded-full bg-zinc-300 opacity-60 animate-bounce"></div>
            <div className="absolute -top-6 left-1 w-4 h-4 rounded-full bg-zinc-200 opacity-40 animate-bounce delay-150"></div>
          </div>
          
          <div className="flex justify-between items-start">
            <span className="text-[7px] font-bold tracking-widest bg-amber-700/60 px-1 py-0.5 rounded">ENGINE</span>
            <div className="w-5 h-5 bg-amber-700/50 rounded-full border border-amber-800 flex items-center justify-center font-bold text-[8px]">AD</div>
          </div>

          <div className="space-y-0.5">
            <h5 className="font-extrabold text-[10px] leading-none">Responsive</h5>
            <p className="text-[6px] text-amber-200">Bespoke Framework</p>
          </div>

          {/* Locomotive Wheels */}
          <div className="absolute -bottom-2.5 left-4 flex gap-4">
            <div className="w-6 h-6 rounded-full bg-zinc-800 border-4 border-zinc-900 flex items-center justify-center shadow-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-400"></div>
            </div>
            <div className="w-6 h-6 rounded-full bg-zinc-800 border-4 border-zinc-900 flex items-center justify-center shadow-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-400"></div>
            </div>
          </div>
        </div>

        {/* Train Cars (Compartments) */}
        {trainCars.map((car, idx) => {
          const Icon = car.icon;
          return (
            <div key={idx} className="flex items-center gap-1">
              {/* Coupling bar */}
              <div className="w-3 h-1 bg-zinc-500 rounded-full"></div>
              
              {/* Car Body */}
              <div className={`w-32 h-24 ${car.color} border-2 rounded-lg relative flex flex-col justify-between p-2.5 text-white shadow-xs`}>
                <div className="flex justify-between items-start">
                  <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center">
                    <Icon size={12} className="text-white" />
                  </div>
                  <span className="text-[7px] font-bold text-white/70">CAR-0{idx + 1}</span>
                </div>
                
                <div className="space-y-0.5">
                  <h6 className="font-bold text-[9px] leading-tight">{car.label}</h6>
                  <p className="text-[6px] text-white/80 leading-none">{car.desc}</p>
                </div>

                {/* Car Wheels */}
                <div className="absolute -bottom-2.5 inset-x-0 flex justify-between px-3">
                  <div className="w-5 h-5 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-zinc-400"></div>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-zinc-400"></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function WebDev() {
  return (
    <div className="pt-24 space-y-12 sm:space-y-16 md:space-y-24 pb-12 sm:pb-16 md:pb-20 bg-brand-cream-light font-sans">
      <SEOHead
        title="Website Design & Development Company Pune India — Responsive Web Solutions"
        description="Advait Digital is a top website design and development company in Pune, India. We build responsive, SEO-friendly business websites, e-commerce portals, and custom web applications."
        keywords="website design company Pune, web development India, responsive website design Pune, e-commerce website development, custom web development India, website developer Pune, business website design India, affordable web design Pune"
        canonical="/services/web-dev"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Website Design & Development",
            "provider": { "@type": "Organization", "name": "Advait Digital", "url": "https://advaitdigital.co.in" },
            "areaServed": "India",
            "description": "Professional website design and development services in Pune — responsive, SEO-friendly, and custom-built.",
            "url": "https://advaitdigital.co.in/services/web-dev",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "154"
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
                "name": "Website Design & Development",
                "item": "https://advaitdigital.co.in/services/web-dev"
              }
            ]
          }
        ]}
      />
      
      {/* High-Contrast Hero Banner */}
      <section className="bg-[#0c1b3d] text-white py-12 sm:py-16 md:py-20 relative overflow-hidden">
        {/* Subtle decorative bottom border gradient */}
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
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif leading-tight text-white tracking-tight">
                Website Design & Development
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed font-medium">
                Advait Digital builds fully responsive, modern, and SEO-friendly websites with clean custom code and user experience layouts. We help you establish a powerful web presence that turns visitors into active customers.
              </p>
            </div>
            
            {/* Right Multi-Device Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <MultiDeviceMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Live Development Video Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <TechVideoPlayer 
              src="/Website developement.mp4" 
              title="Custom Web Development & Portal Showcase" 
            />
          </div>
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">Live Development Demo</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">
              Modern Web Platforms in Action
            </h2>
            <div className="w-20 h-1 bg-brand-orange rounded"></div>
            <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed font-medium">
              Explore our custom website building and portal engineering in real-time. We craft responsive corporate websites, web applications, and interactive portals engineered for high speed, sleek user experience, and conversion optimization.
            </p>
          </div>
        </div>
      </section>

      {/* Explaining Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
        
        {/* 1. Better Website */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex justify-center">
            <img 
              src={imgBetter} 
              alt="Developer Coding a Better Website Layout" 
              className="w-full h-auto max-w-lg"
            />
          </div>
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Architecture</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">Better Website</h3>
              <div className="w-16 h-1 bg-blue-500 rounded"></div>
            </div>
            <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed">
              The foundation of your online presence lies on a great website design. Going beyond a great website design along with having an excellent user experience for your customers can be made with a good first impression.
            </p>
            <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed">
              We can help you build your perfect website whether you are looking for a brand new website or help updating your current site.
            </p>
          </div>
        </div>

        {/* 2. Web Design */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 lg:order-2 flex justify-center">
            <img 
              src={imgDesign} 
              alt="Web Design mockups with wireframe graphics" 
              className="w-full h-auto max-w-lg"
            />
          </div>
          <div className="lg:col-span-6 lg:order-1 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">UI UX Visuals</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">Web Design</h3>
              <div className="w-16 h-1 bg-blue-500 rounded"></div>
            </div>
            <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed">
              Usability, functionality, as well as visualization are the three important factors of a website design with our in-house award winning web and graphic designers. By learning about your company or organization can be made with the start of our design processes.
            </p>
            <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed">
              In order to create a unique website experience for your target audience, we can learn about who you are and what your goals are. To make sure that your digital marketing goals are realized with the designs that we create, we work with you.
            </p>
          </div>
        </div>

        {/* 3. Front End Website Development */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex justify-center">
            <img 
              src={imgFrontend} 
              alt="Developers coding front end web layers in React HTML CSS" 
              className="w-full h-auto max-w-lg"
            />
          </div>
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Clean Coding Standards</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">Front End Website Development</h3>
              <div className="w-16 h-1 bg-blue-500 rounded"></div>
            </div>
            <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed">
              The foundation of the web design projects lies on HTML and Cascading Style Sheets or CSS. Every site that we are developing will be well-organized with the use of the latest HTML and CSS standards as this is of our great importance.
            </p>
            <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed">
              To make a great mobile, tablet, and desktop experience, all the websites are built with the use of the responsive design techniques. We make sure that a good user experience, as well as lay the groundwork for optimal search engine exposure using the W3C standards.
            </p>
          </div>
        </div>

        {/* 4. Content Management System (CMS) Integration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 lg:order-2 flex justify-center">
            <img 
              src={imgCms} 
              alt="CMS circle diagram infographic showing core benefits" 
              className="w-full h-auto max-w-lg"
            />
          </div>
          <div className="lg:col-span-6 lg:order-1 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Control and Flexibility</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">Content Management System (CMS) Integration</h3>
              <div className="w-16 h-1 bg-blue-500 rounded"></div>
            </div>
            <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed">
              It is important for the success of any digital marketing effort that the content of the website is kept updated. You need to give power to your team to keep marketing and messaging campaigns up to date as this is the ability of the website’s content.
            </p>
            <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed">
              Advait Teleservices specializes in WordPress Development, Drupal Development, and custom CMS solutions as we are an open-source development shop.
            </p>
          </div>
        </div>

        {/* 5. Interface Design-UX/UI */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex justify-center">
            <div className="max-w-[320px] w-full flex items-center justify-center">
              <UxUiMockup />
            </div>
          </div>
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">User Experience Design</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">Interface Design-UX/UI</h3>
              <div className="w-16 h-1 bg-blue-500 rounded"></div>
            </div>
            <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed">
              The main key to the success of every application, whether it is a website, mobile app, or desktop application is the User Experience (UX) and User Interface or UI design.
            </p>
            <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed">
              The landing page conversion, social media campaign success, and application/intranet user experience are all improved through our interface designs.
            </p>
          </div>
        </div>

      </section>

      {/* 6-Point Capability Capabilities Grid */}
      <section className="bg-white py-12 sm:py-16 md:py-20 border-y border-brand-charcoal/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">Our Solutions</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">Website Design and Development Services</h2>
            <div className="w-24 h-1 bg-brand-orange mx-auto rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Professional Websites */}
            <div className="bg-brand-cream-light/40 border border-brand-charcoal/5 rounded-2xl p-8 space-y-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Globe size={24} />
              </div>
              <h3 className="text-lg font-bold text-brand-charcoal font-serif">Professional Websites</h3>
              <p className="text-sm text-brand-charcoal-light leading-relaxed">
                It is important that your website represents you well since it is your digital hub and online face of your business.
              </p>
            </div>

            {/* Custom Digital Solution */}
            <div className="bg-brand-cream-light/40 border border-brand-charcoal/5 rounded-2xl p-8 space-y-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Gear size={24} />
              </div>
              <h3 className="text-lg font-bold text-brand-charcoal font-serif">Custom Digital Solution</h3>
              <p className="text-sm text-brand-charcoal-light leading-relaxed">
                Do you know what your need is? We help you create a custom web solution and get your exact specification. We can help you develop a highly tailored web solution.
              </p>
            </div>

            {/* WebPortal Development */}
            <div className="bg-brand-cream-light/40 border border-brand-charcoal/5 rounded-2xl p-8 space-y-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Browser size={24} />
              </div>
              <h3 className="text-lg font-bold text-brand-charcoal font-serif">WebPortal Development</h3>
              <p className="text-sm text-brand-charcoal-light leading-relaxed">
                Getting the forms of development that are an exact fit for what you do is what bespoke is. Sometimes you may need something extra to convey your work in a simple way.
              </p>
            </div>

            {/* WordPress Website */}
            <div className="bg-brand-cream-light/40 border border-brand-charcoal/5 rounded-2xl p-8 space-y-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Laptop size={24} />
              </div>
              <h3 className="text-lg font-bold text-brand-charcoal font-serif">WordPress Website</h3>
              <p className="text-sm text-brand-charcoal-light leading-relaxed">
                On the internet, did you know that WordPress powers over 30% of the websites? We work with WordPress to provide you with a website that suits your needs with the ability to customize themes.
              </p>
            </div>

            {/* E-commerce Website */}
            <div className="bg-brand-cream-light/40 border border-brand-charcoal/5 rounded-2xl p-8 space-y-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShoppingCart size={24} />
              </div>
              <h3 className="text-lg font-bold text-brand-charcoal font-serif">E-commerce Website</h3>
              <p className="text-sm text-brand-charcoal-light leading-relaxed">
                Do you have a complete range of catalogue of items that you need to sell online? We can help you with new website designs including scalable e-commerce integrations.
              </p>
            </div>

            {/* Bespoke Development */}
            <div className="bg-brand-cream-light/40 border border-brand-charcoal/5 rounded-2xl p-8 space-y-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ArrowsMerge size={24} />
              </div>
              <h3 className="text-lg font-bold text-brand-charcoal font-serif">Bespoke Development</h3>
              <p className="text-sm text-brand-charcoal-light leading-relaxed">
                Getting the forms of development that are an exact fit for what you do is what bespoke is. Sometimes you may need something extra to support a custom business function.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Device Responsive Site section with technology train */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">Responsiveness</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-serif">Device Responsive site</h2>
          <div className="w-16 h-1 bg-brand-orange mx-auto rounded"></div>
          <p className="text-brand-charcoal-light text-sm sm:text-base leading-relaxed">
            Their areas of business are a perfect match with mobile access for some of our clients. It is the wrong way round when much of their web traffic comes from mobile devices by building a conventional website first. We are quite happy to help as we listen to what you need and want and when the stats say mobile first. Your customers can see what they need on their phones without the text and buttons being too small as we are able to devise sites that scale appropriately for different sized mobile devices. We can be sure of your mobile site working effectively and looking in keeping with other current mobile sites as we are fortunate to work with specialists in mobile design.
          </p>
        </div>

        {/* Hand-crafted Technology Train representation */}
        <div className="w-full">
          <TrainTimeline />
        </div>
      </section>

      {/* "We are Creating the Best Website" Banner (CTA Section just above the footer) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-[#0c1b3d] py-10 sm:py-12 md:py-16 px-8 text-center space-y-6 shadow-xl border border-white/10">
          {/* Subtle glow layer */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_60%)]"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">Quality First</span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-serif">We are Creating the Best Website</h3>
            <p className="text-blue-200/80 text-sm max-w-md mx-auto font-medium">
              Our bespoke layouts, responsive configurations, and standard-compliant coding ensure high performance for your digital campaigns.
            </p>
            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange/90 text-white w-full sm:w-80 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-md shadow-brand-orange/20 hover:scale-[1.02]"
              >
                Contact Us
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}


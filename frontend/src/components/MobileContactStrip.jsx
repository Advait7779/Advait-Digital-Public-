import { PhoneCall, PaperPlaneTilt } from '@phosphor-icons/react';

export default function MobileContactStrip() {
  const handleOpenEnquiry = (e) => {
    // Open the interactive enquiry modal directly on tap
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-enquiry-modal'));
    }
  };

  return (
    <div 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.12)] flex items-stretch h-14 pb-[env(safe-area-inset-bottom,0px)]"
      role="region"
      aria-label="Quick contact actions"
    >
      {/* Call Button (Left Side) */}
      <a 
        href="tel:+919011251125"
        className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-white text-slate-900 border-r border-slate-200/80 active:bg-slate-100 transition-colors duration-150 group"
        aria-label="Call Advait Digital at +91 9011251125"
      >
        <div className="w-8 h-8 rounded-full bg-orange-50 text-[#f36308] flex items-center justify-center shrink-0 group-active:scale-95 transition-transform">
          <PhoneCall size={17} weight="fill" />
        </div>
        <div className="flex flex-col text-left leading-none">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Call Us</span>
          <span className="text-xs sm:text-sm font-black text-slate-900 tracking-tight whitespace-nowrap">+91 9011251125</span>
        </div>
      </a>

      {/* Contact Us / Enquiry Button (Right Side) */}
      <a 
        href="/contact"
        onClick={(e) => {
          e.preventDefault();
          handleOpenEnquiry(e);
        }}
        className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-[#f36308] hover:bg-[#ea580c] active:bg-[#d95507] text-white active:brightness-95 transition-all duration-150 group shadow-inner cursor-pointer"
        aria-label="Contact Us or Submit Quick Enquiry"
      >
        <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0 group-active:scale-95 transition-transform">
          <PaperPlaneTilt size={16} weight="bold" />
        </div>
        <div className="flex flex-col text-left leading-none">
          <span className="text-[9px] font-bold text-orange-100 uppercase tracking-wider mb-0.5">Quick Enquiry</span>
          <span className="text-xs sm:text-sm font-black text-white tracking-wider uppercase whitespace-nowrap">CONTACT US</span>
        </div>
      </a>
    </div>
  );
}

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, SpeakerSimpleHigh, SpeakerSimpleSlash, Globe, LockKey, ArrowClockwise } from '@phosphor-icons/react';

export default function TechVideoPlayer({ src, title = "Advait Digital Portal", className = "", variant = "browser" }) {
  const videoRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(err => console.log(err));
      setIsPaused(false);
    } else {
      videoRef.current.pause();
      setIsPaused(true);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative mx-auto w-full group select-none ${className}`}
    >
      {/* Outer Glow Effect */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-orange/20 via-amber-500/10 to-brand-orange/20 rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500"></div>

      {/* Main Tech Frame Container */}
      <div 
        className="relative w-full bg-[#1e1e24] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col cursor-pointer"
        onClick={togglePlay}
      >
        {/* Browser Top Header Bar */}
        <div className="h-10 bg-[#18181c] border-b border-white/10 px-4 flex items-center justify-between z-20 shrink-0">
          {/* Window Control Buttons */}
          <div className="flex items-center space-x-2 w-16">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block border border-red-600/40"></span>
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block border border-yellow-600/40"></span>
            <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block border border-green-600/40"></span>
          </div>

          {/* Simulated Browser Address Bar */}
          <div className="flex-1 max-w-md mx-4 h-6 bg-[#282830] rounded-md border border-white/5 flex items-center justify-between px-3 text-[11px] text-gray-400 font-mono tracking-tight shadow-inner">
            <div className="flex items-center space-x-1.5 truncate">
              <LockKey size={12} className="text-emerald-400 shrink-0" weight="fill" />
              <span className="text-gray-300 font-medium truncate">advaitdigital.in/live-demo</span>
            </div>
            <ArrowClockwise size={11} className="text-gray-500 hover:text-gray-300 shrink-0 transition-colors" />
          </div>

          {/* Tech Badge */}
          <div className="w-16 flex justify-end">
            <span className="text-[10px] uppercase font-bold tracking-wider text-brand-orange/80 bg-brand-orange/10 px-2 py-0.5 rounded border border-brand-orange/20">
              HD LIVE
            </span>
          </div>
        </div>

        {/* Video Screen Area */}
        <div className="relative w-full aspect-[16/9] bg-black overflow-hidden flex items-center justify-center">
          <video
            ref={videoRef}
            src={encodeURI(src)}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted={isMuted}
            playsInline
          />

          {/* Subtle Glare overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none z-10" />

          {/* Play/Pause Overlay Indicator */}
          {isPaused && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-20 transition-opacity duration-200">
              <div className="w-14 h-14 rounded-full bg-brand-orange/90 flex items-center justify-center text-white shadow-xl border border-white/20 transform group-hover:scale-105 transition-transform">
                <Play size={26} weight="fill" className="ml-1" />
              </div>
            </div>
          )}

          {/* Floating Mute/Unmute Control */}
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 z-30 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center space-x-2 text-white text-xs font-medium hover:bg-black/80 transition duration-200 cursor-pointer shadow-lg"
            aria-label={isMuted ? "Unmute sound" : "Mute sound"}
          >
            {isMuted ? (
              <>
                <SpeakerSimpleSlash size={15} weight="bold" className="text-brand-orange" />
                <span className="hidden sm:inline text-[11px] text-gray-200">Unmute</span>
              </>
            ) : (
              <>
                <SpeakerSimpleHigh size={15} weight="bold" className="text-emerald-400" />
                <span className="hidden sm:inline text-[11px] text-gray-200">Muted</span>
              </>
            )}
          </button>

          {/* Bottom Caption Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 pointer-events-none flex items-center justify-between">
            <span className="text-xs font-semibold text-white/90 truncate drop-shadow-sm px-1">
              {title}
            </span>
          </div>
        </div>

        {/* Laptop / Monitor Base lip (for tech hardware feel) */}
        <div className="h-2 bg-[#141418] border-t border-white/5 flex justify-center items-center">
          <div className="w-16 h-1 bg-white/10 rounded-full"></div>
        </div>
      </div>
    </motion.div>
  );
}

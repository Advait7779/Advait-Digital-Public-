import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, SpeakerSimpleHigh, SpeakerSimpleSlash } from '@phosphor-icons/react';

export default function PhoneVideoPlayer({ src, className = "" }) {
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
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className={`relative mx-auto w-full max-w-[280px] aspect-[9/16] bg-brand-charcoal rounded-[36px] p-1 shadow-xl border-2 border-brand-charcoal flex items-center justify-center overflow-hidden cursor-pointer group select-none ${className}`}
      onClick={togglePlay}
    >
      {/* Speaker/Notch (Thin) */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-3 w-24 bg-brand-charcoal rounded-b-lg z-20 flex items-center justify-center pointer-events-none">
        <div className="w-8 h-0.5 bg-white/20 rounded-full mb-0.5"></div>
      </div>
      
      {/* Video Container */}
      <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-black flex items-center justify-center">
        <video 
          ref={videoRef}
          src={src} 
          className="w-full h-full object-cover"
          autoPlay 
          loop 
          muted={isMuted}
          playsInline
        />

        {/* Play/Pause Overlay Indicator */}
        {isPaused && (
          <div className="absolute inset-0 bg-black/35 flex items-center justify-center z-10 transition-opacity duration-200">
            <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-xs flex items-center justify-center text-white shadow-md border border-white/10">
              <Play size={20} weight="fill" className="ml-0.5" />
            </div>
          </div>
        )}

        {/* Floating Mute/Unmute Control */}
        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-xs border border-white/10 flex items-center justify-center text-white hover:bg-black/75 transition duration-200 cursor-pointer shadow-xs"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <SpeakerSimpleSlash size={14} weight="bold" />
          ) : (
            <SpeakerSimpleHigh size={14} weight="bold" />
          )}
        </button>
      </div>
    </motion.div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const themeMap = {
  'bg-indigo-600': 'border-t-indigo-500',
  'bg-blue-600': 'border-t-blue-500',
  'bg-teal-600': 'border-t-teal-500',
  'bg-green-600': 'border-t-green-500',
  'bg-amber-600': 'border-t-amber-500',
  'bg-red-600': 'border-t-red-500',
  'bg-emerald-600': 'border-t-emerald-500',
  'bg-pink-600': 'border-t-pink-500'
};

export default function ServiceCard({ service, index }) {
  const { title, description, path, image, colorClass } = service;
  const borderColor = themeMap[colorClass] || 'border-t-indigo-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ type: "spring", stiffness: 220, damping: 20, delay: index * 0.02 }}
      className={`relative bg-white rounded-2xl p-6 flex flex-col justify-between group border-t-4 ${borderColor} border-x border-x-brand-charcoal/5 border-b border-b-brand-charcoal/5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 ease-out overflow-hidden h-full`}
    >
      <div className="flex flex-col h-full">
        {/* Centered illustration image box */}
        <div className="w-full h-40 bg-slate-50 flex items-center justify-center rounded-xl mb-6 overflow-hidden select-none">
          {image ? (
            <img 
              src={image} 
              alt={title} 
              className="max-w-full max-h-full object-contain p-4 transform group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="text-brand-charcoal-light/20 text-xs">No Illustration</div>
          )}
        </div>
        
        <h3 className="text-lg font-bold text-brand-charcoal mb-3 group-hover:text-brand-orange transition-colors duration-150 font-serif leading-snug">
          {title}
        </h3>
        
        <p className="text-brand-charcoal-light/95 text-xs sm:text-sm leading-relaxed mb-6 font-medium flex-grow">
          {description}
        </p>
      </div>
      
      <div className="pt-4 border-t border-brand-charcoal/5 flex items-center">
        <Link 
          to={path}
          className="text-xs font-bold uppercase tracking-wider text-brand-orange hover:text-brand-orange/80 transition-colors duration-150 cursor-pointer"
        >
          View More
        </Link>
      </div>
    </motion.div>
  );
}

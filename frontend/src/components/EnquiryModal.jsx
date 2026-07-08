import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Spinner, CaretDown, PaperPlaneTilt } from '@phosphor-icons/react';
import { sendWhatsAppLeadAlert } from '../services/whatsappService';
import { submitLead } from '../services/api';

export default function EnquiryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'election_sms'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const services = [
    { value: 'election_sms', label: 'Bulk SMS for Election' },
    { value: 'web_dev', label: 'Website Design & Development' },
    { value: 'whatsapp_marketing', label: 'WhatsApp Marketing Services' },
    { value: 'rcs', label: 'Rich Communication Service (RCS)' },
    { value: 'sms_marketing', label: 'SMS Marketing Services' },
    { value: 'whatsapp_api', label: 'WhatsApp Business API' },
    { value: 'voice_call', label: 'Voice Call Services' },
    { value: 'digital_marketing', label: 'Digital Marketing Services' }
  ];

  // Auto-open on 1st load and EVERY page refresh
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1200); // 1.2s smooth delay on every page load/refresh
    return () => clearTimeout(timer);
  }, []);

  // Global custom event trigger if any CTA clicks request opening it
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-enquiry-modal', handleOpen);
    return () => window.removeEventListener('open-enquiry-modal', handleOpen);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSelectService = (val) => {
    setFormData(prev => ({ ...prev, service: val }));
    setIsDropdownOpen(false);
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    if (!formData.service) {
      setErrorMsg('Please select a service');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const selectedServiceLabel = services.find(s => s.value === formData.service)?.label || formData.service;
    const submittedLead = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      service: selectedServiceLabel,
    };

    try {
      await submitLead({
        ...submittedLead,
        sourceForm: 'Popup Free Demo Modal'
      });

      setIsSuccess(true);

      // Trigger pre-filled WhatsApp redirect to +91 9921968968 after 1 second
      setTimeout(() => {
        sendWhatsAppLeadAlert(submittedLead);
      }, 1000);

      setTimeout(() => {
        setIsSuccess(false);
        setIsOpen(false);
        setFormData({ name: '', phone: '', email: '', service: 'election_sms' });
      }, 3500);
    } catch (err) {
      setErrorMsg(err.message || 'Unable to submit your request right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(6px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[3000] flex items-start justify-center overflow-y-auto bg-black/70 px-3 py-4 backdrop-blur-md sm:items-center sm:p-6 lg:p-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateX: 15, y: 45 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateX: -10, y: 25 }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 24,
              mass: 0.85
            }}
            style={{ transformPerspective: 1200 }}
            className="relative my-auto max-h-[calc(100vh-2rem)] w-full max-w-[min(92vw,390px)] overflow-y-auto rounded-2xl border border-brand-charcoal/5 bg-white text-brand-charcoal shadow-2xl sm:max-h-[calc(100vh-3rem)]"
          >
            {/* Top Accent Gradient Bar matching DemoForm */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-orange"></div>

            {/* Close Cross Button */}
            <button
              onClick={handleClose}
              className="absolute right-3 top-3 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-600 shadow-xs transition-all duration-200 hover:bg-brand-orange hover:text-white sm:right-4 sm:top-4"
              aria-label="Close form"
            >
              <X size={18} weight="bold" />
            </button>

            <div className="space-y-4 p-5 sm:space-y-5 sm:p-7">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center space-y-3"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle size={36} weight="fill" />
                  </div>
                  <h4 className="text-2xl font-bold font-serif text-brand-charcoal">Request Received!</h4>
                  <p className="text-xs sm:text-sm text-brand-charcoal-light font-medium max-w-xs mx-auto leading-relaxed">
                    Thank you, <span className="font-bold text-brand-charcoal">{formData.name}</span>. Our team will contact you shortly on <span className="font-bold text-brand-orange">{formData.phone}</span>.
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Form Header */}
                  <div className="pr-8 space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-brand-orange bg-brand-orange/10 px-2.5 py-0.5 rounded-full inline-block">
                      Free Demo & Consultation
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-serif text-brand-charcoal tracking-tight">
                      Fill This Form For Free Demo
                    </h3>
                    <p className="text-xs text-brand-charcoal-light/75 font-medium">
                      Get instant access to live platform demos and customized campaign solutions.
                    </p>
                  </div>

                  {errorMsg && (
                    <motion.div 
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-semibold"
                    >
                      {errorMsg}
                    </motion.div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3.5 text-left sm:space-y-4">
                    {/* Name Field */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal-light mb-1.5">
                        Full Name <span className="text-brand-orange">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3.5 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-xs sm:text-sm font-medium text-brand-charcoal focus:outline-hidden focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange focus:bg-white transition duration-200"
                      />
                    </div>

                    {/* Mobile No Field */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal-light mb-1.5">
                        Mobile No <span className="text-brand-orange">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength={10}
                        required
                        className="w-full px-3.5 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-xs sm:text-sm font-medium text-brand-charcoal focus:outline-hidden focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange focus:bg-white transition duration-200"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal-light mb-1.5">
                        Email Address <span className="text-brand-orange">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3.5 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-xs sm:text-sm font-medium text-brand-charcoal focus:outline-hidden focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange focus:bg-white transition duration-200"
                      />
                    </div>

                    {/* Theme-Styled Custom Dropdown for Product Services */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal-light mb-1.5">
                        Product Services <span className="text-brand-orange">*</span>
                      </label>
                      <div className="relative">
                        {/* Dropdown Trigger Button */}
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(prev => !prev)}
                          className={`w-full px-3.5 py-2.5 rounded-lg bg-gray-50 border text-left flex justify-between items-center transition duration-200 text-xs sm:text-sm cursor-pointer ${
                            isDropdownOpen
                              ? 'border-brand-orange ring-2 ring-brand-orange/20 bg-white'
                              : 'border-gray-200 hover:border-brand-charcoal/30'
                          } focus:outline-hidden`}
                        >
                          <span className="font-semibold text-brand-charcoal truncate">
                            {services.find(s => s.value === formData.service)?.label || 'Select Service'}
                          </span>
                          <CaretDown
                            size={16}
                            className={`text-brand-charcoal-light transition-transform duration-200 shrink-0 ${
                              isDropdownOpen ? 'transform rotate-180 text-brand-orange' : ''
                            }`}
                          />
                        </button>

                        {/* Backdrop overlay to close dropdown when clicking outside */}
                        {isDropdownOpen && (
                          <div
                            className="fixed inset-0 z-30 cursor-default"
                            onClick={() => setIsDropdownOpen(false)}
                          />
                        )}

                        {/* Animated Theme Options Menu (Opens Upward) */}
                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 6 }}
                              transition={{ duration: 0.15 }}
                              className="absolute bottom-full mb-1.5 left-0 z-50 w-full bg-white border border-brand-charcoal/15 rounded-xl shadow-2xl max-h-56 overflow-y-auto"
                            >
                              <div className="py-1">
                                {services.map((item) => (
                                  <button
                                    key={item.value}
                                    type="button"
                                    onClick={() => handleSelectService(item.value)}
                                    className={`w-full px-3.5 py-2.5 text-left text-xs font-medium transition duration-150 flex items-center justify-between cursor-pointer ${
                                      formData.service === item.value
                                        ? 'bg-brand-orange/10 text-brand-orange font-bold'
                                        : 'text-brand-charcoal hover:bg-brand-cream/40 hover:text-brand-orange'
                                    }`}
                                  >
                                    <span className="truncate">{item.label}</span>
                                    {formData.service === item.value && (
                                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0"></span>
                                    )}
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-brand-orange hover:bg-brand-charcoal text-white font-bold text-xs sm:text-sm py-3 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-brand-orange/20"
                      >
                        {isSubmitting ? (
                          <>
                            <Spinner size={18} className="animate-spin" />
                            <span>Submitting Request...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Request</span>
                            <PaperPlaneTilt size={16} weight="bold" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

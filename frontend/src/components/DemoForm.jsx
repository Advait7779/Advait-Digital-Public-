import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperPlaneTilt, CheckCircle, Spinner } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { sendWhatsAppLeadAlert } from '../services/whatsappService';

export default function DemoForm({ defaultService = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: defaultService,
    message: '',
    consent: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectService = (val) => {
    setFormData(prev => ({ ...prev, service: val }));
    setIsDropdownOpen(false);
    if (errors.service) {
      setErrors(prev => ({ ...prev, service: '' }));
    }
  };

  const services = [
    { value: 'rcs', label: 'Rich Communication Service (RCS)' },
    { value: 'election_sms', label: 'Bulk SMS for Election' },
    { value: 'web_dev', label: 'Website Design & Development' },
    { value: 'whatsapp_marketing', label: 'WhatsApp Marketing Services' },
    { value: 'digital_marketing', label: 'Digital Marketing Services' },
    { value: 'sms_marketing', label: 'SMS Marketing Services' },
    { value: 'whatsapp_api', label: 'WhatsApp Business API' },
    { value: 'voice_call', label: 'Voice Call Services' }
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile number is required';
    } else if (!/^\+?([0-9]{2})?[-. ]?([0-9]{10})$/.test(formData.phone.replace(/[\s\-]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.service) newErrors.service = 'Please select a service';
    if (!formData.consent) newErrors.consent = 'You must authorize notifications and agree to terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitError('');
    setIsSuccess(true);

    const serviceLabel = services.find(s => s.value === formData.service)?.label || formData.service;

    // Send lead to backend API for secure email dispatch to sales@advaitteleservices.com
    fetch('/api/submit-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || 'Not provided',
        service: serviceLabel,
        message: formData.message || 'No message provided',
        sourceForm: 'Demo Request Form (Contact Section)'
      }),
    }).catch(() => {});

    // Trigger pre-filled WhatsApp redirect to +91 9921968968 after 1 second
    setTimeout(() => {
      sendWhatsAppLeadAlert({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        service: serviceLabel
      });
    }, 1000);

    setFormData({
      name: '',
      phone: '',
      email: '',
      service: defaultService,
      message: '',
      consent: false
    });
  };

  return (
    <div className="glass-card rounded-2xl p-8 md:p-10 shadow-xl relative overflow-hidden border border-brand-charcoal/5 max-w-xl mx-auto">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-orange"></div>
      
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-brand-charcoal mb-2">Request a Free Demo</h3>
              <p className="text-brand-charcoal-light/75 text-sm">
                Fill out the details below and our experts will contact you for a live demonstration.
              </p>
            </div>
            
            <div className="space-y-4">
              {/* Name field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal-light mb-1.5" htmlFor="name">
                  Full Name <span className="text-brand-orange">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 rounded-lg bg-white border ${errors.name ? 'border-brand-orange' : 'border-brand-charcoal/10'} focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition duration-200 text-sm`}
                />
                {errors.name && <p className="text-brand-orange text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Grid for Mobile and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Mobile No */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal-light mb-1.5" htmlFor="phone">
                    Mobile No <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9921968968"
                    className={`w-full px-4 py-3 rounded-lg bg-white border ${errors.phone ? 'border-brand-orange' : 'border-brand-charcoal/10'} focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition duration-200 text-sm`}
                  />
                  {errors.phone && <p className="text-brand-orange text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal-light mb-1.5" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="sales@company.com"
                    className={`w-full px-4 py-3 rounded-lg bg-white border ${errors.email ? 'border-brand-orange' : 'border-brand-charcoal/10'} focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition duration-200 text-sm`}
                  />
                  {errors.email && <p className="text-brand-orange text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Service Select */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal-light mb-1.5" htmlFor="service">
                  Select Service <span className="text-brand-orange">*</span>
                </label>
                <div className="relative">
                  {/* Trigger */}
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(prev => !prev)}
                    className={`w-full px-4 py-3 rounded-lg bg-white border text-left flex justify-between items-center transition duration-200 text-sm cursor-pointer ${
                      isDropdownOpen
                        ? 'border-brand-orange ring-2 ring-brand-orange/20'
                        : errors.service
                          ? 'border-brand-orange'
                          : 'border-brand-charcoal/10 hover:border-brand-charcoal/30'
                    } focus:outline-none`}
                  >
                    <span className={formData.service ? 'text-brand-charcoal font-medium' : 'text-brand-charcoal-light/40 font-medium'}>
                      {formData.service 
                        ? services.find(s => s.value === formData.service)?.label 
                        : '-- Select Digital Service --'}
                    </span>
                    <svg
                      className={`fill-current h-4 w-4 text-brand-charcoal-light transition-transform duration-200 ${
                        isDropdownOpen ? 'transform rotate-180 text-brand-orange' : ''
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </button>

                  {/* Backdrop overlay to close the dropdown when clicking outside */}
                  {isDropdownOpen && (
                    <div 
                      className="fixed inset-0 z-20 cursor-default" 
                      onClick={() => setIsDropdownOpen(false)}
                    />
                  )}

                  {/* Dropdown Options List */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-30 mt-1.5 w-full bg-white border border-brand-charcoal/10 rounded-xl shadow-lg max-h-60 overflow-y-auto"
                      >
                        <div className="py-1">
                          <button
                            type="button"
                            onClick={() => handleSelectService('')}
                            className="w-full px-4 py-2.5 text-left text-sm text-brand-charcoal-light/50 hover:bg-brand-cream/35 hover:text-brand-charcoal transition duration-150 block cursor-pointer font-medium"
                          >
                            -- Select Digital Service --
                          </button>
                          {services.map(srv => (
                            <button
                              key={srv.value}
                              type="button"
                              onClick={() => handleSelectService(srv.value)}
                              className={`w-full px-4 py-2.5 text-left text-sm transition duration-150 block font-medium cursor-pointer ${
                                formData.service === srv.value
                                  ? 'bg-brand-orange/10 text-brand-orange font-semibold'
                                  : 'text-brand-charcoal hover:bg-brand-cream/35 hover:text-brand-orange'
                              }`}
                            >
                              {srv.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {errors.service && <p className="text-brand-orange text-xs mt-1">{errors.service}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal-light mb-1.5" htmlFor="message">
                  Brief Requirements / Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your business goals or campaign requirements..."
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-brand-charcoal/10 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition duration-200 text-sm resize-none"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-brand-charcoal/10 text-brand-orange focus:ring-brand-orange/20 focus:border-brand-orange transition duration-200 cursor-pointer shrink-0"
                  />
                  <label htmlFor="consent" className="text-xs text-brand-charcoal-light/95 leading-relaxed select-none cursor-pointer">
                    I hereby authorise to send notifications on SMS/Messages/WhatsApp/Promotional/RCS/Information Messages by clicking Sign Up, you agree to our <Link to="/terms-and-conditions" className="text-brand-orange hover:underline font-semibold">Terms of Services</Link> and then you have Read Our Privacy Policy. <span className="text-brand-orange font-bold">*</span>
                  </label>
                </div>
                {errors.consent && <p className="text-brand-orange text-xs mt-1">{errors.consent}</p>}
              </div>
            </div>

            {/* Submit Button */}
            {submitError && (
              <p className="text-brand-orange text-xs text-center font-medium">{submitError}</p>
            )}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-brand-charcoal text-white hover:bg-brand-orange font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:bg-brand-charcoal/50 text-sm"
            >
              {isSubmitting ? (
                <>
                  <Spinner className="animate-spin h-5 w-5" />
                  Sending Request...
                </>
              ) : (
                <>
                  <PaperPlaneTilt size={18} className="font-bold" />
                  Submit Request
                </>
              )}
            </motion.button>
          </motion.form>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center py-10 space-y-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            >
              <CheckCircle size={72} weight="fill" className="text-brand-orange" />
            </motion.div>
            <h3 className="text-2xl font-bold text-brand-charcoal">Demo Request Submitted!</h3>
            <p className="text-brand-charcoal-light/80 text-sm max-w-sm">
              Thank you for requesting a demo. Our team will get back to you within 24 hours on your mobile number.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="text-brand-orange hover:text-brand-charcoal font-semibold text-sm transition duration-200 mt-4 cursor-pointer"
            >
              Submit Another Request
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

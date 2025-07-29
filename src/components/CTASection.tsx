import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Send, User, Building } from 'lucide-react';

const CTASection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler l'envoi du formulaire
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: ''
      });
      alert('Message sent successfully! We will contact you soon.');
    }, 2000);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "+971 55 845 0710",
      action: "Call Now",
      href: "tel:+971558450710"
    },
    {
      icon: Mail,
      title: "Send an Email",
      description: "contact@bdtech-solutions.com",
      action: "Send Email",
      href: "mailto:contact@bdtech-solutions.com"
    }
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-bdtech-dark via-bdtech-medium to-bdtech-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Have a question? An idea? Contact us!
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left Content - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/20"
          >
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Nom et Entreprise */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <User size={18} className="absolute left-3 top-3 text-white" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                    className="w-full pl-9 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-bdtech-light transition-colors duration-200 text-sm sm:text-base"
                  />
                </div>
                <div className="relative">
                  <Building size={18} className="absolute left-3 top-3 text-white" />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your company"
                    className="w-full pl-9 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-bdtech-light transition-colors duration-200 text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Email et Téléphone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-3 text-white" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your email"
                    required
                    className="w-full pl-9 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-bdtech-light transition-colors duration-200 text-sm sm:text-base"
                  />
                </div>
                <div className="relative">
                  <Phone size={18} className="absolute left-3 top-3 text-white" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Your phone"
                    className="w-full pl-9 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-bdtech-light transition-colors duration-200 text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your message..."
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-bdtech-light transition-colors duration-200 resize-none text-sm sm:text-base"
                />
              </div>

              {/* Bouton d'envoi */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-bdtech-light hover:bg-bdtech-medium text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Right Content - Coordonnées */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >


            {/* Contact Methods */}
            <div className="space-y-4 sm:space-y-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-bdtech-light rounded-lg flex items-center justify-center">
                      <method.icon size={20} className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                        {method.title}
                      </h3>
                      <p className="text-gray-200 text-xs sm:text-sm mb-2">
                        {method.description}
                      </p>
                      <a
                        href={method.href}
                        className="text-bdtech-light hover:text-white font-medium text-xs sm:text-sm transition-colors duration-200"
                      >
                        {method.action} →
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-16"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 border border-white/20">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
              Start your IT transformation today
            </h3>
            <p className="text-gray-200 max-w-2xl mx-auto text-sm sm:text-base">
              Join over 500 companies that trust BDTECH Solutions for their IT infrastructure
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection; 
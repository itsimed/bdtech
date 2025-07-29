import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Building, Mail, Phone, MessageCircle } from 'lucide-react';

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactPopup: React.FC<ContactPopupProps> = ({ isOpen, onClose }) => {
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
      onClose();
    }, 2000);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-bdtech-light to-bdtech-medium rounded-lg flex items-center justify-center">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-bdtech-dark">
                    Contact Us
                  </h2>
                  <p className="text-sm text-gray-600">
                    We are here to help you
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Nom et Entreprise */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      required
                      className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bdtech-light focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>
                  <div className="relative">
                    <Building size={18} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your company"
                      className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bdtech-light focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>
                </div>

                {/* Email et Téléphone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your email"
                      required
                      className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bdtech-light focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your phone"
                      className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bdtech-light focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bdtech-light focus:border-transparent resize-none text-sm sm:text-base"
                  />
                </div>

                {/* Bouton d'envoi */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-bdtech-light to-bdtech-medium hover:from-bdtech-medium hover:to-bdtech-dark text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
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

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-3">
                    <Phone size={16} className="text-bdtech-medium" />
                    <span className="text-gray-600">+971 55 845 0710</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail size={16} className="text-bdtech-medium" />
                    <span className="text-gray-600">contact@bdtech-solutions.com</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactPopup; 
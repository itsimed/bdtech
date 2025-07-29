import React from 'react';
import { motion } from 'framer-motion';

const ServiceCTA: React.FC = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-bdtech-light to-bdtech-medium rounded-lg sm:rounded-xl lg:rounded-2xl p-6 sm:p-8 lg:p-12 text-white">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 lg:mb-6">
              Prêt à commencer votre transformation IT ?
            </h3>
            <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 lg:mb-8 opacity-90 max-w-2xl mx-auto px-2 sm:px-4">
              Contactez-nous dès aujourd'hui pour un audit gratuit de votre infrastructure
            </p>
            <motion.button
              onClick={scrollToContact}
              className="bg-white text-bdtech-medium hover:bg-gray-100 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Commencer maintenant
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceCTA; 
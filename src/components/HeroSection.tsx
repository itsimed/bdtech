import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { heroData } from '../data/home';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)] flex items-start bg-gradient-to-br from-white via-blue-50 to-bdtech-light/10 pt-0">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 md:w-60 md:h-60 lg:w-80 lg:h-80 bg-bdtech-light/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 md:w-60 md:h-60 lg:w-80 lg:h-80 bg-bdtech-medium/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-start h-full">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1 flex flex-col justify-center py-8 sm:py-12 lg:py-16 xl:py-20"
          >
            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-bdtech-dark leading-tight"
            >
              {heroData.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl"
            >
              {heroData.subtitle}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xs sm:text-sm md:text-base text-gray-500 leading-relaxed max-w-xl"
            >
              {heroData.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <motion.button
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-bdtech-medium hover:bg-bdtech-dark text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Our Services</span>
                <ArrowRight size={16} className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
              
              <motion.button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="border-2 border-bdtech-medium text-bdtech-medium hover:bg-bdtech-medium hover:text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-200 text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone size={16} className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Contact Us</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative order-1 lg:order-2 h-full min-h-[500px] lg:min-h-[700px] xl:min-h-[800px] -mt-0"
          >
            <img 
              src="https://storage.googleapis.com/bdtech/public/herohome.webp" 
              alt="BDTECH Solutions Hero" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-2 sm:bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-4 h-6 sm:w-5 sm:h-8 lg:w-6 lg:h-10 border-2 border-bdtech-medium rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-0.5 h-1.5 sm:h-2 lg:h-3 bg-bdtech-medium rounded-full mt-1 sm:mt-1.5 lg:mt-2"
          ></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection; 
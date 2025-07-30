import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { heroData } from '../data/home';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)] flex items-start bg-gradient-to-br from-white via-blue-50 to-bdtech-light/10 pt-0">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-8 -right-8 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-60 lg:h-60 xl:w-80 xl:h-80 bg-bdtech-light/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-60 lg:h-60 xl:w-80 xl:h-80 bg-bdtech-medium/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-16 items-start h-full">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 order-2 lg:order-1 flex flex-col justify-center py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20"
          >
            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-bdtech-dark leading-tight"
            >
              {heroData.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 leading-relaxed max-w-xl"
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
              className="grid grid-cols-2 sm:flex sm:flex-row gap-2 sm:gap-3 md:gap-4"
            >
              <motion.button
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-bdtech-medium hover:bg-bdtech-dark text-white px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg font-semibold flex items-center justify-center space-x-1 sm:space-x-1.5 md:space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl text-xs sm:text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="truncate">Our Services</span>
                <ArrowRight size={12} className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 flex-shrink-0" />
              </motion.button>
              
              <motion.button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="border-2 border-bdtech-medium text-bdtech-medium hover:bg-bdtech-medium hover:text-white px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg font-semibold flex items-center justify-center space-x-1 sm:space-x-1.5 md:space-x-2 transition-all duration-200 text-xs sm:text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone size={12} className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                <span className="truncate">Contact Us</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative order-1 lg:order-2 h-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[700px] xl:min-h-[800px] -mt-0"
          >
            <img 
              src="https://storage.googleapis.com/bdtech/public/herohome.webp" 
              alt="BDTECH Solutions Hero" 
              className="w-full h-full object-cover rounded-lg sm:rounded-xl lg:rounded-2xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="hidden sm:block absolute bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-6 xl:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-3 h-4 sm:w-4 sm:h-6 md:w-5 md:h-8 lg:w-6 lg:h-10 border-2 border-bdtech-medium rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-0.5 h-1 sm:h-1.5 md:h-2 lg:h-3 bg-bdtech-medium rounded-full mt-0.5 sm:mt-1 md:mt-1.5 lg:mt-2"
          ></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection; 
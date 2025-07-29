import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import type { Testimonial } from '../types';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-bdtech-dark to-bdtech-medium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ce que disent nos clients
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Découvrez les témoignages de nos clients satisfaits qui ont transformé leur infrastructure IT
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Quote Icon */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
            <div className="w-16 h-16 bg-bdtech-light rounded-full flex items-center justify-center">
              <Quote size={32} className="text-white" />
            </div>
          </div>

          {/* Testimonial Cards */}
          <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm p-8 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                {/* Rating */}
                <div className="flex justify-center space-x-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-xl lg:text-2xl text-white leading-relaxed mb-8 italic">
                  "{testimonials[currentIndex].content}"
                </blockquote>

                {/* Author Info */}
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold text-white">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-bdtech-light font-medium">
                    {testimonials[currentIndex].role}
                  </p>
                  <p className="text-gray-300 text-sm">
                    {testimonials[currentIndex].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-bdtech-light scale-125'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
        >
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-bdtech-light mb-2">500+</div>
            <div className="text-gray-300">Clients satisfaits</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-bdtech-light mb-2">1000+</div>
            <div className="text-gray-300">Projets réalisés</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-bdtech-light mb-2">10+</div>
            <div className="text-gray-300">Années d'expérience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-bdtech-light mb-2">24/7</div>
            <div className="text-gray-300">Support disponible</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialCarousel; 
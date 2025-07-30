import React from 'react';
import HeroSection from '../components/HeroSection';
import ServiceCard from '../components/ServiceCard';


import PartnerGrid from '../components/PartnerGrid';
import TrustCarousel from '../components/TrustCarousel';
import CTASection from '../components/CTASection';
import ServiceCTA from '../components/ServiceCTA';
import { 
  services, 
   
} from '../data/home';


const Home: React.FC = () => {

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* About Section - Multiple alternating sections */}
      <section id="about" className="py-8 sm:py-12 lg:py-16 xl:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section 1: Photo à gauche, Texte à droite */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center mb-8 sm:mb-12 lg:mb-16 xl:mb-20">
            {/* Left - Photo */}
            <div className="relative order-1 lg:order-1">
              <img
                src="https://storage.googleapis.com/bdtech/public/storyy.webp"
                alt="BDTECH Solutions - Notre histoire"
                className="w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-80 object-contain rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm"
              />
            </div>

            {/* Right - Texte */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-6 order-2 lg:order-2">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-bdtech-dark leading-tight">
                Our Story
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                Founded in Dubai, BDTECH SOLUTIONS was created to provide intelligent and reliable 
                IT and security services.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-500 leading-relaxed">
                Supported by solid expertise and the trust of our clients, we have become 
                a key partner for modern businesses.
              </p>
            </div>
          </div>

          {/* Section 2: Texte à gauche, Photo à droite */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center mb-8 sm:mb-12 lg:mb-16 xl:mb-20">
            {/* Left - Texte */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-6 order-2 lg:order-1">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-bdtech-dark leading-tight">
                Our Vision
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                At BDTECH SOLUTIONS, our vision is to be a trusted leader in IT and security solutions, 
                enabling businesses to access intelligent and scalable technologies.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-500 leading-relaxed">
                We provide reliable support that drives long-term growth for our clients.
              </p>
            </div>

            {/* Right - Photo */}
            <div className="relative order-1 lg:order-2">
              <img
                src="https://storage.googleapis.com/bdtech/public/vision.webp"
                alt="BDTECH Solutions - Notre vision"
                className="w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-80 object-contain rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm"
              />
            </div>
          </div>

          {/* Section 3: Photo à gauche, Texte à droite */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center mb-8 sm:mb-12 lg:mb-16 xl:mb-20">
            {/* Left - Photo */}
            <div className="relative order-1 lg:order-1">
              <img
                src="https://storage.googleapis.com/bdtech/public/values.webp"
                alt="BDTECH Solutions - Nos valeurs"
                className="w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-80 object-contain rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm"
              />
            </div>

            {/* Right - Texte */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-6 order-2 lg:order-2">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-bdtech-dark leading-tight">
                Our Approach
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                At BDTECH SOLUTIONS, we leverage cutting-edge technologies like AI, cloud, 
                and intelligent infrastructure to drive security, efficiency, and growth 
                for your business.
              </p>
            </div>
          </div>


        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-bdtech-dark mb-4 sm:mb-6">
              Our Services
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Complete and customized IT solutions to meet all your needs
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Service CTA Section */}
      <ServiceCTA />

      {/* Trust Carousel */}
      <section id="trust">
        <TrustCarousel />
      </section>

      {/* Partners */}
      <PartnerGrid />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default Home; 
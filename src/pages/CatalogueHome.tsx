import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Monitor, Code, MousePointer, Wifi, Shield, FileText, Package, ArrowRight, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { categories, products } from '../data/mockProducts';
import { contactData } from '../data/home';
import CatalogueNavbar from '../components/CatalogueNavbar';
import ProductCard from '../components/ProductCard';
import ContactButton from '../components/ContactButton';

const CatalogueHome: React.FC = () => {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    Monitor: Monitor,
    Code: Code,
    MousePointer: MousePointer,
    Wifi: Wifi,
    Shield: Shield,
    FileText: FileText,
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get featured products (first 4 products)
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Catalogue Navbar */}
      <CatalogueNavbar />

      {/* Hero Section */}
      <section className="min-h-[calc(100vh-160px)] sm:min-h-[calc(100vh-180px)] flex items-center justify-center relative overflow-hidden py-8 sm:py-12 lg:py-16">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-bdtech-light to-bdtech-medium"></div>
        
        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-48 lg:h-64 bg-gradient-to-t from-white via-white/90 via-white/60 to-transparent"></div>
        
        {/* Scroll animation at bottom - Hidden on mobile */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-bdtech-light rounded-full flex justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(40, 187, 241, 0.1) 0%, rgba(0, 101, 179, 0.1) 50%, rgba(27, 47, 75, 0.1) 100%)'
            }}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 rounded-full mt-2"
              style={{
                background: 'linear-gradient(135deg, #28BBF1 0%, #0065B3 50%, #1B2F4B 100%)'
              }}
            />
          </motion.div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Column - Text and Buttons */}
            <div className="text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 xl:mb-8 text-white leading-tight"
              >
                Product Catalog
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90 mb-4 sm:mb-6 lg:mb-8 xl:mb-10 leading-relaxed text-white px-2 sm:px-0"
              >
                Discover our complete range of professional IT solutions
              </motion.p>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center lg:justify-start"
              >
                <Link
                  to="/catalogue/produits"
                  className="btn-gradient-border inline-flex items-center justify-center space-x-2 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base lg:text-lg w-full sm:w-auto"
                >
                  <Package size={16} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                  <span>Explore all products</span>
                </Link>
                <ContactButton 
                  variant="primary"
                  size="lg"
                  className="px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg w-full sm:w-auto"
                >
                  Contact an expert
                </ContactButton>
              </motion.div>
            </div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center lg:justify-end order-first lg:order-last"
            >
              <img 
                src="https://storage.googleapis.com/bdtech/public/cataloghero.webp" 
                alt="BDTECH Catalogue Hero" 
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl object-contain"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-gray-50/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bdtech-dark mb-3 sm:mb-4">
              Our Categories
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl sm:max-w-2xl mx-auto px-4">
              Browse our solutions by expertise area
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {categories.map((category, index) => {
              const IconComponent = iconMap[category.icon] || Package;
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    to={`/catalogue/${category.id}`}
                    className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-4 sm:p-6 group"
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-bdtech-light to-bdtech-medium rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <IconComponent size={20} className="text-white sm:w-6 sm:h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-bdtech-dark group-hover:text-bdtech-medium transition-colors duration-200 truncate">
                          {category.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{category.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-xs text-gray-500">{category.productCount} products</span>
                          <ArrowRight size={12} className="text-bdtech-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 sm:w-3.5 sm:h-3.5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bdtech-dark mb-3 sm:mb-4">
              Featured Products
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl sm:max-w-2xl mx-auto px-4">
              Discover our most popular products
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} showStockStatus={false} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-8 sm:mt-12"
          >
            <Link
              to="/catalogue/produits"
              className="inline-flex items-center space-x-2 btn-gradient-border px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <span>View all products</span>
              <ArrowRight size={18} className="sm:w-5 sm:h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 via-bdtech-light/5 to-bdtech-medium/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bdtech-dark mb-4 sm:mb-6">
              Need help choosing?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto px-4">
              Our BDTECH experts are here to advise and guide you in choosing your IT solutions
            </p>
            <ContactButton 
              variant="primary"
              size="lg"
              className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base"
            >
              Contact our experts
            </ContactButton>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bdtech-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <img
                  src="https://storage.googleapis.com/bdtech/public/logo%20footer.webp"
                  alt="BDTECH Solutions Logo"
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Expert IT Services for Enhanced Performance. Empowering businesses through innovation, security, and reliable technology solutions.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail size={16} className="text-bdtech-light" />
                  <a
                    href={`mailto:${contactData.email}`}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {contactData.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone size={16} className="text-bdtech-light" />
                  <a
                    href={`tel:${contactData.phone}`}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {contactData.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin size={16} className="text-bdtech-light" />
                  <span className="text-gray-300">{contactData.address}</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  to="/"
                  onClick={() => {
                    // Scroll to top after navigation
                    setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 100);
                  }}
                  className="block text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Back to Home
                </Link>
                <Link
                  to="/catalogue"
                  className="block text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Catalog
                </Link>
                <Link
                  to="/catalogue/produits"
                  className="block text-gray-300 hover:text-white transition-colors duration-200"
                >
                  All products
                </Link>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="block text-gray-300 hover:text-white transition-colors duration-200 text-left"
                >
                  Back to top
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} BDTECH Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CatalogueHome; 
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Linkedin, Mail, Phone, MapPin, Home, User, Settings, MessageCircle, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { contactData } from '../data/home';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = ['home', 'about', 'services', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home', isLink: false, id: 'home', icon: Home },
    { name: 'About', href: '#about', isLink: false, id: 'about', icon: User },
    { name: 'Services', href: '#services', isLink: false, id: 'services', icon: Settings },
    { name: 'Contact', href: '#contact', isLink: false, id: 'contact', icon: MessageCircle }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-white/90 backdrop-blur-sm shadow-sm'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* Mobile Layout - Structure complètement différente */}
          <div className="lg:hidden relative h-16">
            {/* Logo à gauche */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
              <Link to="/" className="block">
                <img
                  src="https://storage.googleapis.com/bdtech/public/logonavbar.webp"
                  alt="BDTECH Solutions Logo"
                  className="w-28 h-28 object-contain"
                />
              </Link>
            </div>
            
            {/* Bouton hamburger à droite */}
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-bdtech-dark hover:text-bdtech-medium p-3 bg-white rounded-lg shadow-sm"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between h-20">
            <Link to="/" className="flex items-center">
              <img
                src="https://storage.googleapis.com/bdtech/public/logonavbar.webp"
                alt="BDTECH Solutions Logo"
                className="w-24 h-24 xl:w-28 xl:h-28 object-contain"
              />
            </Link>

            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className={`text-bdtech-dark hover:text-bdtech-medium transition-colors duration-200 font-medium ${
                      activeSection === item.id ? 'text-bdtech-medium' : ''
                    }`}
                  >
                    {item.name}
                  </button>
                  {activeSection === item.id && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                      className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-bdtech-light to-bdtech-medium"
                    />
                  )}
                </div>
              ))}
            </div>

            <Link to="/login">
              <button className="bg-bdtech-medium hover:bg-bdtech-dark text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium">
                Login
              </button>
            </Link>
          </div>

          {/* Mobile Navigation - Design amélioré */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden border-t border-gray-100 bg-white shadow-lg fixed top-16 left-0 right-0 w-screen"
              >
                <div className="py-4 px-4 sm:px-6 max-w-full">
                  {/* Navigation Items */}
                  <div className="space-y-2 mb-6">
                    {navItems.map((item, index) => (
                      <motion.button
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => scrollToSection(item.href)}
                        className={`w-full flex items-center px-4 py-4 text-left rounded-xl transition-all duration-200 font-medium ${
                          activeSection === item.id 
                            ? 'bg-bdtech-medium text-white shadow-md' 
                            : 'text-bdtech-dark hover:text-bdtech-medium hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-base">{item.name}</span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200 mb-6"></div>

                  {/* Login Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Link to="/login" className="block">
                      <button className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-bdtech-medium to-bdtech-dark text-white px-6 py-4 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                        <LogIn size={20} />
                        <span>Login</span>
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="pt-16 lg:pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-bdtech-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <img
                  src="https://storage.googleapis.com/bdtech/public/logo%20footer.webp"
                  alt="BDTECH Solutions Logo"
                  className="h-10 sm:h-12 w-auto"
                />
              </div>
              <p className="text-gray-300 mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
                Expert IT Services for Enhanced Performance. Empowering businesses through innovation, security, and reliable technology solutions.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/company/bd-tech-solutions/?originalSubdomain=fr"
                  className="text-gray-300 hover:text-bdtech-light transition-colors duration-200"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={18} className="sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact</h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Mail size={14} className="sm:w-4 sm:h-4 text-bdtech-light flex-shrink-0" />
                  <a
                    href={`mailto:${contactData.email}`}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                  >
                    {contactData.email}
                  </a>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Phone size={14} className="sm:w-4 sm:h-4 text-bdtech-light flex-shrink-0" />
                  <a
                    href={`tel:${contactData.phone}`}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                  >
                    {contactData.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <MapPin size={14} className="sm:w-4 sm:h-4 text-bdtech-light flex-shrink-0" />
                  <span className="text-gray-300 text-xs sm:text-sm">{contactData.address}</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h3>
              <div className="space-y-1 sm:space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="block text-gray-300 hover:text-white transition-colors duration-200 text-left text-xs sm:text-sm"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              © {new Date().getFullYear()} BDTECH Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 
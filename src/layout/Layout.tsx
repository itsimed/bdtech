import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Linkedin, Mail, Phone, MapPin, Home, User, Settings, MessageCircle, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { contactData } from '../data/home';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');


  useEffect(() => {
    const handleScroll = () => {
      // Detect active section
      const sections = ['home', 'about', 'services', 'trust', 'contact'];
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
    { name: 'Partners', href: '#trust', isLink: false, id: 'trust', icon: MessageCircle },
    { name: 'Contact', href: '#contact', isLink: false, id: 'contact', icon: MessageCircle }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    setIsMenuOpen(false);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-white">
             {/* Navbar */}
               <nav
          className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg"
        >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      {/* Mobile Layout - Structure simple comme CatalogueNavbar */}
                                    <div className="lg:hidden flex items-center justify-between h-16">
               {/* Logo à gauche */}
               <Link to="/" className="flex items-center">
                 <img
                   src="https://storage.googleapis.com/bdtech/public/logonavbar.webp"
                   alt="BDTECH Solutions Logo"
                   className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                 />
               </Link>
               
               {/* Bouton hamburger à droite */}
               <button
                 onClick={() => setIsMenuOpen(!isMenuOpen)}
                 className="text-bdtech-dark hover:text-bdtech-medium transition-colors duration-200 p-2 bg-white rounded-lg shadow-sm hover:shadow-md flex items-center justify-center w-10 h-10"
               >
                 {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
               </button>
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
                Catalog
              </button>
            </Link>
          </div>

                                          {/* Mobile Navigation - Design amélioré */}
           {isMenuOpen && (
             <div className="lg:hidden border-t border-gray-100 bg-white shadow-lg fixed top-16 left-0 right-0 w-full z-40">
                 <div className="py-3 sm:py-4 px-3 sm:px-4 md:px-6 max-w-full">
                   {/* Navigation Items */}
                   <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                     {navItems.map((item, index) => (
                       <button
                         key={item.name}
                         onClick={() => scrollToSection(item.href)}
                         className={`w-full flex items-center px-3 sm:px-4 py-2.5 sm:py-3 md:py-4 text-left rounded-lg sm:rounded-xl transition-all duration-200 font-medium ${
                           activeSection === item.id 
                             ? 'bg-bdtech-medium text-white shadow-md' 
                             : 'text-bdtech-dark hover:text-bdtech-medium hover:bg-gray-50'
                         }`}
                       >
                         <span className="text-xs sm:text-sm md:text-base">{item.name}</span>
                       </button>
                     ))}
                   </div>

                   {/* Divider */}
                   <div className="border-t border-gray-200 mb-4 sm:mb-6"></div>

                   {/* Login Button */}
                   <div>
                     <Link to="/login" className="block">
                        <button className="w-full flex items-center justify-center space-x-1.5 sm:space-x-2 md:space-x-3 bg-gradient-to-r from-bdtech-medium to-bdtech-dark text-white px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm md:text-base shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                          <Package size={16} className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span>Catalog</span>
                        </button>
                      </Link>
                   </div>
                 </div>
               </div>
             )}
        </div>
      </nav>

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
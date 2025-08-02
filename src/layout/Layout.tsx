import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail, Phone, MapPin, Home, User, Settings, MessageCircle, Package, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { contactData } from '../data/home';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { user, isAuthenticated, logout } = useAuth();


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

  // Handle click outside mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const mobileMenu = document.querySelector('.mobile-menu');
      const hamburgerButton = document.querySelector('.hamburger-button');
      
      if (isMenuOpen && mobileMenu && !mobileMenu.contains(target) && !hamburgerButton?.contains(target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
               <Link to="/" className="flex items-center" onClick={scrollToTop}>
                 <img
                   src="https://storage.googleapis.com/bdtech/public/logonavbar.webp"
                   alt="BDTECH Solutions Logo"
                   className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                 />
               </Link>
               
               {/* Bouton hamburger à droite */}
               <motion.button
                 onClick={() => setIsMenuOpen(!isMenuOpen)}
                 className="hamburger-button text-bdtech-dark hover:text-bdtech-medium transition-colors duration-200 p-2 bg-white rounded-lg shadow-sm hover:shadow-md flex items-center justify-center w-10 h-10"
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 transition={{ duration: 0.1 }}
               >
                 <AnimatePresence mode="wait">
                   {isMenuOpen ? (
                     <motion.div
                       key="close"
                       initial={{ rotate: -90, opacity: 0 }}
                       animate={{ rotate: 0, opacity: 1 }}
                       exit={{ rotate: 90, opacity: 0 }}
                       transition={{ duration: 0.2 }}
                     >
                       <X size={20} />
                     </motion.div>
                   ) : (
                     <motion.div
                       key="menu"
                       initial={{ rotate: 90, opacity: 0 }}
                       animate={{ rotate: 0, opacity: 1 }}
                       exit={{ rotate: -90, opacity: 0 }}
                       transition={{ duration: 0.2 }}
                     >
                       <Menu size={20} />
                     </motion.div>
                   )}
                 </AnimatePresence>
               </motion.button>
             </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between h-20">
            <Link to="/" className="flex items-center" onClick={scrollToTop}>
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

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-bdtech-dark">
                  Welcome, {user?.firstName}
                </span>
                <Link to="/catalogue">
                  <button className="bg-bdtech-medium hover:bg-bdtech-dark text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium text-sm">
                    Catalog
                  </button>
                </Link>
                <button 
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium text-sm flex items-center space-x-1"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-bdtech-medium hover:bg-bdtech-dark text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium">
                  Login
                </button>
              </Link>
            )}
          </div>

                                                                                     {/* Mobile Navigation - Design amélioré */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div 
                  className="mobile-menu lg:hidden border-t border-gray-100 bg-white shadow-lg fixed top-16 left-0 right-0 w-full z-40"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                 <div className="py-3 sm:py-4 px-3 sm:px-4 md:px-6 max-w-full">
                   {/* Navigation Items */}
                   <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                     {navItems.map((item, index) => (
                       <motion.button
                         key={item.name}
                         onClick={() => scrollToSection(item.href)}
                         className={`w-full flex items-center px-3 sm:px-4 py-2.5 sm:py-3 md:py-4 text-left rounded-lg sm:rounded-xl transition-all duration-200 font-medium ${
                           activeSection === item.id 
                             ? 'bg-bdtech-medium text-white shadow-md' 
                             : 'text-bdtech-dark hover:text-bdtech-medium hover:bg-gray-50'
                         }`}
                         initial={{ opacity: 0, x: -20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ 
                           duration: 0.3, 
                           delay: 0.1 + (index * 0.05),
                           ease: "easeOut" 
                         }}
                       >
                         <span className="text-xs sm:text-sm md:text-base">{item.name}</span>
                       </motion.button>
                     ))}
                   </div>

                   {/* Divider */}
                   <div className="border-t border-gray-200 mb-4 sm:mb-6"></div>

                   {/* Auth Buttons */}
                   <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ 
                       duration: 0.3, 
                       delay: 0.4,
                       ease: "easeOut" 
                     }}
                     className="space-y-2"
                   >
                     {isAuthenticated ? (
                       <>
                         <div className="text-center py-2">
                           <span className="text-sm text-bdtech-dark">
                             Welcome, {user?.firstName}
                           </span>
                         </div>
                         <Link to="/catalogue" className="block">
                           <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-bdtech-medium to-bdtech-dark text-white px-4 py-3 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200">
                             <Package size={16} />
                             <span>Catalog</span>
                           </button>
                         </Link>
                         <button 
                           onClick={logout}
                           className="w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200"
                         >
                           <LogOut size={16} />
                           <span>Logout</span>
                         </button>
                       </>
                     ) : (
                       <Link to="/login" className="block">
                         <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-bdtech-medium to-bdtech-dark text-white px-4 py-3 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200">
                           <User size={16} />
                           <span>Login</span>
                         </button>
                       </Link>
                     )}
                   </motion.div>
                                   </div>
                </motion.div>
              )}
            </AnimatePresence>
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
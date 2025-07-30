import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, ChevronDown, ArrowRight, Menu, X } from 'lucide-react';
import { categories } from '../data/mockProducts';
import { createPortal } from 'react-dom';
import { useCart } from '../context/CartContext';
import CartDropdown from './CartDropdown';

const CatalogueNavbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0, top: 0, width: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const { toggleCart, getTotalItems } = useCart();

  const handleCategoryEnter = (categoryId: string, event: React.MouseEvent<HTMLDivElement>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Calculer la position du dropdown
    const rect = event.currentTarget.getBoundingClientRect();
    const navbarElement = event.currentTarget.closest('nav');
    const navbarRect = navbarElement?.getBoundingClientRect();
    
    // Utiliser la position relative à la catégorie pour l'alignement horizontal
    // et la position absolue de la navbar pour la position verticale
    const navbarBottom = navbarRect ? navbarRect.bottom : 112;
    
    setDropdownPosition({
      left: rect.left,
      top: navbarBottom,
      width: rect.width
    });
    
    setHoveredCategory(categoryId);
    setIsDropdownOpen(true);
  };

  const handleCategoryLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
      setHoveredCategory(null);
    }, 150);
  };

  const handleDropdownEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
      setHoveredCategory(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Fermer le menu mobile quand on change de route
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setExpandedMobileCategory(null);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setExpandedMobileCategory(null);
    }
  };

  const toggleMobileCategory = (categoryId: string) => {
    setExpandedMobileCategory(expandedMobileCategory === categoryId ? null : categoryId);
  };

  // Function to handle navigation with scroll to top
  const handleNavigation = (to: string) => {
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
    setExpandedMobileCategory(null);
    
    // Navigate and scroll to top
    window.location.href = to;
    window.scrollTo(0, 0);
  };

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Row - Logo, Search, Actions */}
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <button 
              onClick={() => handleNavigation('/')}
              className="flex items-center focus:outline-none focus:ring-0 focus:border-0 focus:shadow-none"
            >
              <img 
                src="https://storage.googleapis.com/bdtech/public/logonavbar.webp" 
                alt="BDTECH Logo" 
                className="w-24 h-24 sm:w-36 sm:h-36 object-contain select-none"
              />
            </button>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden sm:flex flex-1 max-w-2xl mx-4 lg:mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search for a product..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bdtech-light focus:border-transparent"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              {/* Cart */}
              <button 
                onClick={toggleCart}
                className="relative text-bdtech-dark hover:text-bdtech-medium transition-colors duration-200"
              >
                <ShoppingCart size={22} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              {/* User */}
              <Link
                to="/profile"
                className="text-bdtech-dark hover:text-bdtech-medium transition-colors duration-200"
              >
                <User size={22} />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="sm:hidden text-bdtech-dark hover:text-bdtech-medium transition-colors duration-200 p-2 bg-white rounded-lg shadow-sm hover:shadow-md flex items-center justify-center w-10 h-10"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Bottom Row - Categories - Desktop only */}
          <div className="hidden sm:block border-t border-gray-100">
            <div className="flex items-center justify-center space-x-0 py-3 overflow-x-auto">
              {categories.map((category, index) => {
                const isActive = location.pathname === `/catalogue/${category.id}`;
                const hasSubcategories = category.subcategories.length > 0;
                
                return (
                  <React.Fragment key={category.id}>
                    <div
                      className="relative"
                      onMouseEnter={(e) => handleCategoryEnter(category.id, e)}
                      onMouseLeave={handleCategoryLeave}
                    >
                      <button
                        onClick={() => handleNavigation(`/catalogue/${category.id}`)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                          isActive
                            ? 'bg-bdtech-light text-white'
                            : hoveredCategory === category.id
                            ? 'bg-gray-50 text-bdtech-dark'
                            : 'text-bdtech-dark hover:text-bdtech-medium hover:bg-gray-50'
                        }`}
                      >
                        <span className="font-medium text-sm">{category.name}</span>
                        {hasSubcategories && (
                          <ChevronDown 
                            size={14} 
                            className={`transition-transform duration-200 ${
                              hoveredCategory === category.id ? 'rotate-180' : ''
                            }`} 
                          />
                        )}
                      </button>
                    </div>
                    
                    {/* Séparateur vertical */}
                    {index < categories.length - 1 && (
                      <div className="w-px h-6 bg-gray-300 mx-2"></div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="sm:hidden border-t border-gray-100 bg-white"
            >
              {/* Mobile Search */}
              <div className="p-4 border-b border-gray-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search for a product..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bdtech-light focus:border-transparent"
                  />
                </div>
              </div>

              {/* Mobile Categories */}
              <div className="py-2">
                {categories.map((category) => {
                  const isActive = location.pathname === `/catalogue/${category.id}`;
                  const hasSubcategories = category.subcategories.length > 0;
                  const isExpanded = expandedMobileCategory === category.id;
                  
                  return (
                    <div key={category.id} className="border-b border-gray-50">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => handleNavigation(`/catalogue/${category.id}`)}
                          className={`flex-1 px-4 py-3 text-left transition-colors duration-200 ${
                            isActive
                              ? 'bg-bdtech-light text-white'
                              : 'text-bdtech-dark hover:bg-gray-50'
                          }`}
                        >
                          <span className="font-medium">{category.name}</span>
                        </button>
                        
                        {hasSubcategories && (
                          <button
                            onClick={() => toggleMobileCategory(category.id)}
                            className="px-4 py-3 text-bdtech-dark hover:text-bdtech-medium transition-colors duration-200"
                          >
                            <ChevronDown 
                              size={16} 
                              className={`transition-transform duration-200 ${
                                isExpanded ? 'rotate-180' : ''
                              }`} 
                            />
                          </button>
                        )}
                      </div>
                      
                      {/* Mobile Subcategories */}
                      {hasSubcategories && (
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="bg-gray-50"
                            >
                              {category.subcategories.map((subcategory) => (
                                <button
                                  key={subcategory.id}
                                  onClick={() => handleNavigation(`/catalogue/${category.id}/${subcategory.id}`)}
                                  className="block w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                                >
                                  {subcategory.name}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Dropdown Portal - Outside of navbar - Desktop only */}
      {isDropdownOpen && hoveredCategory && createPortal(
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="hidden sm:block fixed bg-white border border-gray-200 rounded-b-lg shadow-xl z-50 min-w-64"
          style={{
            left: `${dropdownPosition.left}px`,
            top: `${dropdownPosition.top - 1}px`, // Connecter visuellement
            width: `${Math.max(dropdownPosition.width, 256)}px`,
            borderTop: 'none', // Enlever la bordure du haut
            borderTopLeftRadius: '0',
            borderTopRightRadius: '0'
          }}
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleDropdownLeave}
        >
          <div className="py-2">
            {(() => {
              const category = categories.find(cat => cat.id === hoveredCategory);
              if (!category) return null;

              return (
                <div className="flex flex-col">
                  {category.subcategories.map((subcategory) => (
                    <button
                      key={subcategory.id}
                      onClick={() => {
                        handleNavigation(`/catalogue/${category.id}/${subcategory.id}`);
                        setIsDropdownOpen(false);
                        setHoveredCategory(null);
                      }}
                      className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <span>{subcategory.name}</span>
                      <ArrowRight size={14} className="text-gray-400" />
                    </button>
                  ))}
                </div>
              );
            })()}
          </div>
        </motion.div>,
        document.body
      )}

      {/* Cart Dropdown */}
      <CartDropdown />
    </>
  );
};

export default CatalogueNavbar; 
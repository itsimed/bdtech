import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Share2, Check, Cpu, HardDrive, MemoryStick, Monitor } from 'lucide-react';
import CatalogueNavbar from '../components/CatalogueNavbar';
import { getProductById } from '../data/mockProducts';
import { useCart } from '../context/CartContext';


const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id || '');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  
  // PC Configuration - Initialize with default configuration
  const getDefaultConfiguration = () => {
    if (!product?.configurations) return null;
    
    const defaultConfig = product.configurations.configurations.find(config => config.default) || 
                         product.configurations.configurations[0];
    return defaultConfig;
  };

  const [selectedConfiguration, setSelectedConfiguration] = useState(getDefaultConfiguration());

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-bdtech-light/10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-bdtech-dark mb-4">Product not found</h1>
          <Link
            to="/catalogue"
            className="inline-flex items-center space-x-2 text-bdtech-medium hover:text-bdtech-dark transition-colors duration-200"
          >
            <ArrowLeft size={16} />
            <span>Back to catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  // Calculate total price with selected configuration
  const calculateTotalPrice = () => {
    if (selectedConfiguration) {
      return selectedConfiguration.price;
    }
    return product.price;
  };

  const handleConfigurationChange = (configuration: any) => {
    setSelectedConfiguration(configuration);
  };

  const handleAddToCart = () => {
    // Add directly 1 unit to cart
    addItem(product, 1, selectedConfiguration?.id || undefined);
  };

  const handleGoBack = () => {
    // Use navigation history to go back
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // Fallback to catalog if no history
      navigate('/catalogue');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Catalogue Navbar */}
      <CatalogueNavbar />

      {/* Product Details */}
      <div className="pt-40 sm:pt-44 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleGoBack}
          className="flex items-center space-x-2 text-bdtech-medium hover:text-bdtech-dark transition-colors duration-200 mb-4 sm:mb-6"
        >
          <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
          <span className="text-sm font-medium">Back</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl sm:rounded-2xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-bdtech-light to-bdtech-medium rounded-lg sm:rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-4xl sm:text-6xl">
                    {product.brand.charAt(0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2 sm:space-x-4">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index
                      ? 'border-bdtech-medium'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-bdtech-light to-bdtech-medium rounded flex items-center justify-center">
                      <span className="text-white font-bold text-xs sm:text-sm">
                        {product.brand.charAt(0)}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Brand and Name */}
            <div>
              <p className="text-bdtech-medium font-medium mb-2 text-sm sm:text-base">{product.brand}</p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bdtech-dark mb-3 sm:mb-4">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <span className="text-2xl sm:text-3xl font-bold text-bdtech-dark">
                  {formatPrice(calculateTotalPrice())}
                </span>
                {product.originalPrice && (
                  <span className="text-lg sm:text-xl text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="px-2 sm:px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs sm:text-sm font-medium">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>
              {product.category === 'hardware' && product.configurations && selectedConfiguration && selectedConfiguration.price !== product.price && (
                <p className="text-xs sm:text-sm text-gray-600">
                  Selected configuration: {selectedConfiguration.name}
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? 'In stock' : 'Out of stock'}
              </span>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-bdtech-dark mb-2 sm:mb-3">Description</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* PC Configuration Grid */}
            {product.category === 'hardware' && product.configurations && (
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-base sm:text-lg font-semibold text-bdtech-dark">Choose your configuration</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {product.configurations.configurations.map((config) => (
                    <motion.div
                      key={config.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative p-4 sm:p-6 border-2 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-200 ${
                        selectedConfiguration?.id === config.id
                          ? 'border-bdtech-medium bg-bdtech-light/5 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                      onClick={() => handleConfigurationChange(config)}
                    >
                      {/* Popular Badge */}
                      {config.default && (
                        <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-bdtech-medium text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                            Recommended
                          </span>
                        </div>
                      )}

                      {/* Configuration Header */}
                      <div className="text-center mb-3 sm:mb-4">
                        <h4 className="font-bold text-base sm:text-lg text-bdtech-dark mb-1 sm:mb-2">{config.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{config.description}</p>
                        <div className="text-xl sm:text-2xl font-bold text-bdtech-medium">
                          {formatPrice(config.price)}
                        </div>
                      </div>

                      {/* Configuration Specs */}
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center space-x-2">
                          <Cpu size={14} className="sm:w-4 sm:h-4 text-bdtech-medium flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-700">{config.specs.processor}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MemoryStick size={14} className="sm:w-4 sm:h-4 text-bdtech-medium flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-700">{config.specs.ram}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <HardDrive size={14} className="sm:w-4 sm:h-4 text-bdtech-medium flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-700">{config.specs.storage}</span>
                        </div>
                        {config.specs.graphics && (
                          <div className="flex items-center space-x-2">
                            <Monitor size={14} className="sm:w-4 sm:h-4 text-bdtech-medium flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-gray-700">{config.specs.graphics}</span>
                          </div>
                        )}
                      </div>

                      {/* Selection Indicator */}
                      {selectedConfiguration?.id === config.id && (
                        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-bdtech-medium rounded-full flex items-center justify-center">
                            <Check size={14} className="sm:w-4 sm:h-4 text-white" />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2 sm:px-3 py-2 hover:bg-gray-100 transition-colors duration-200"
                  >
                    -
                  </button>
                  <span className="px-3 sm:px-4 py-2 border-x border-gray-300 min-w-[50px] sm:min-w-[60px] text-center text-sm sm:text-base">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2 sm:px-3 py-2 hover:bg-gray-100 transition-colors duration-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                    product.inStock
                      ? 'bg-bdtech-dark hover:bg-bdtech-medium text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart size={18} className="sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Add to cart</span>
                </button>

                <div className="flex space-x-2 sm:space-x-4">
                  <button className="p-3 sm:p-4 border-2 border-gray-300 rounded-lg hover:border-bdtech-medium hover:text-bdtech-medium transition-colors duration-200">
                    <Heart size={18} className="sm:w-5 sm:h-5" />
                  </button>

                  <button className="p-3 sm:p-4 border-2 border-gray-300 rounded-lg hover:border-bdtech-medium hover:text-bdtech-medium transition-colors duration-200">
                    <Share2 size={18} className="sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>


          </motion.div>
        </div>

        {/* Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 sm:mt-12 lg:mt-16"
        >
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
              <h2 className="text-xl sm:text-2xl font-bold text-bdtech-dark">Technical Specifications</h2>
              {product.category === 'hardware' && product.configurations && selectedConfiguration && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs sm:text-sm text-gray-600">Configuration:</span>
                  <span className="px-2 sm:px-3 py-1 bg-bdtech-light text-bdtech-dark rounded-full text-xs sm:text-sm font-medium">
                    {selectedConfiguration.name}
                  </span>
                </div>
              )}
            </div>
            
            <motion.div 
              key={selectedConfiguration?.id || 'default'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
            >
              {/* Dynamic specifications based on selected configuration */}
              {product.category === 'hardware' && product.configurations && selectedConfiguration ? (
                <>
                  {/* Configuration-specific specs */}
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <Cpu size={14} className="sm:w-4 sm:h-4 text-bdtech-medium mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">{selectedConfiguration.specs.processor}</span>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <MemoryStick size={14} className="sm:w-4 sm:h-4 text-bdtech-medium mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">{selectedConfiguration.specs.ram}</span>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <HardDrive size={14} className="sm:w-4 sm:h-4 text-bdtech-medium mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">{selectedConfiguration.specs.storage}</span>
                  </div>
                  {selectedConfiguration.specs.graphics && (
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <Monitor size={14} className="sm:w-4 sm:h-4 text-bdtech-medium mt-1 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-700">{selectedConfiguration.specs.graphics}</span>
                    </div>
                  )}
                  
                  {/* Common product specs */}
                  {product.specifications.slice(0, 3).map((spec, index) => (
                    <div key={index} className="flex items-start space-x-2 sm:space-x-3">
                      <Check size={14} className="sm:w-4 sm:h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-700">{spec}</span>
                    </div>
                  ))}
                </>
              ) : (
                /* Default specifications for non-configurable products */
                product.specifications.map((spec, index) => (
                  <div key={index} className="flex items-start space-x-2 sm:space-x-3">
                    <Check size={14} className="sm:w-4 sm:h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">{spec}</span>
                  </div>
                ))
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductPage; 
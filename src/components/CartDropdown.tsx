import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Package, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../context/CartContext';
import { createPortal } from 'react-dom';

const CartDropdown: React.FC = () => {
  const { state, toggleCart, closeCart, removeItem, updateQuantity, getTotalItems, getTotalPrice, clearCart } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeCart();
      }
    };

    if (state.isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [state.isOpen, closeCart]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  const getItemPrice = (item: CartItem) => {
    const basePrice = item.product.price;
    const configPrice = item.selectedConfiguration && item.product.configurations
      ? item.product.configurations.configurations.find(c => c.id === item.selectedConfiguration)?.price || 0
      : 0;
    return (basePrice + configPrice) * item.quantity;
  };

  const getConfigurationName = (item: CartItem) => {
    if (!item.selectedConfiguration || !item.product.configurations) return null;
    const config = item.product.configurations.configurations.find(c => c.id === item.selectedConfiguration);
    return config?.name;
  };

  return createPortal(
    <AnimatePresence>
      {state.isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex justify-end"
        >
          <motion.div
            ref={dropdownRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="text-bdtech-dark" size={24} />
                <h2 className="text-xl font-bold text-bdtech-dark">Cart</h2>
                {getTotalItems() > 0 && (
                  <span className="bg-bdtech-light text-white text-sm font-medium px-2 py-1 rounded-full">
                    {getTotalItems()}
                  </span>
                )}
              </div>
              <button
                onClick={toggleCart}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <Package className="text-gray-300 mb-4" size={64} />
                  <h3 className="text-lg font-medium text-gray-500 mb-2">Your cart is empty</h3>
                  <p className="text-sm text-gray-400">Add products to start shopping</p>
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  {state.items.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${item.selectedConfiguration || 'default'}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex items-start space-x-3">
                        {/* Product Image */}
                        <div className="w-16 h-16 bg-gradient-to-br from-bdtech-light to-bdtech-medium rounded-lg flex items-center justify-center flex-shrink-0">
                          <Package className="text-white" size={24} />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-bdtech-dark text-sm leading-tight">
                            {item.product.name}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">{item.product.brand}</p>
                          {getConfigurationName(item) && (
                            <p className="text-xs text-bdtech-medium mt-1 font-medium">
                              {getConfigurationName(item)}
                            </p>
                          )}
                          <p className="text-sm font-bold text-bdtech-dark mt-2">
                            {formatPrice(getItemPrice(item))}
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200 flex-shrink-0"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                        <span className="text-sm text-gray-600">Quantity:</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-gray-200 bg-white p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-bdtech-dark">Total:</span>
                  <span className="text-xl font-bold text-bdtech-dark">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>
                <div className="space-y-3">
                  <button className="w-full bg-bdtech-medium text-white py-3 px-4 rounded-lg font-semibold hover:bg-bdtech-dark transition-colors duration-200">
                    Checkout
                  </button>
                                      <button
                      onClick={() => {
                        clearCart();
                        console.log('Cart cleared');
                      }}
                      className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                    >
                      Clear cart
                    </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CartDropdown; 
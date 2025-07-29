import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';

interface AddToCartAnimationProps {
  isVisible: boolean;
  onAnimationComplete: () => void;
}

const AddToCartAnimation: React.FC<AddToCartAnimationProps> = ({ isVisible, onAnimationComplete }) => {
  const [showCheck, setShowCheck] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Show check mark after a delay
      const timer = setTimeout(() => {
        setShowCheck(true);
      }, 300);

      // Complete animation after total delay
      const completeTimer = setTimeout(() => {
        onAnimationComplete();
        setShowCheck(false);
      }, 1500);

      return () => {
        clearTimeout(timer);
        clearTimeout(completeTimer);
      };
    }
  }, [isVisible, onAnimationComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        >
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ 
              scale: [0.8, 1.2, 1],
              rotate: [-10, 10, 0]
            }}
            transition={{ 
              duration: 0.6,
              times: [0, 0.5, 1],
              ease: "easeOut"
            }}
            className="bg-bdtech-medium text-white rounded-full p-6 shadow-2xl"
          >
            <AnimatePresence mode="wait">
              {!showCheck ? (
                <motion.div
                  key="cart"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ShoppingCart size={32} />
                </motion.div>
              ) : (
                <motion.div
                  key="check"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check size={32} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Confirmation message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-4 text-center"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-white font-semibold text-lg bg-bdtech-dark px-4 py-2 rounded-lg shadow-lg"
            >
              Product added to cart!
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddToCartAnimation; 
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import ContactPopup from './ContactPopup';

interface ContactButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  className?: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children = 'Contactez-nous',
  className = ''
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const baseClasses = "inline-flex items-center justify-center space-x-2 font-semibold transition-all duration-200 rounded-lg";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-bdtech-light to-bdtech-medium hover:from-bdtech-medium hover:to-bdtech-dark text-white shadow-lg hover:shadow-xl",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700",
    outline: "border-2 border-bdtech-medium text-bdtech-medium hover:bg-bdtech-medium hover:text-white"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <>
      <motion.button
        onClick={() => setIsPopupOpen(true)}
        className={buttonClasses}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle size={18} className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>{children}</span>
      </motion.button>

      <ContactPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </>
  );
};

export default ContactButton; 
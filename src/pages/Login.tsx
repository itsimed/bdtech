import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, ArrowLeft } from 'lucide-react';

interface FormErrors {
  email?: string;
  password?: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Validation functions
  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email format';
    }
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password.trim()) {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must contain at least 6 characters';
    }
    return undefined;
  };

  const handleInputChange = (field: 'email' | 'password', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    
    const newErrors: FormErrors = {};
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      console.log('Login attempt with:', {
        email: formData.email,
        password: formData.password
      });
      
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success simulation
      console.log('Login successful!');
      alert('Login successful! (Simulation)');
      
    } catch (error) {
      console.error('Login error:', error);
      alert('Login error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-bdtech-light/10 flex flex-col items-center justify-start pt-2 lg:pt-4 p-4">
      {/* Logo BDTECH - Séparé du formulaire */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center"
      >
        <img
          src="https://storage.googleapis.com/bdtech/public/logonavbar.webp"
          alt="BDTECH Solutions Logo"
          className="w-32 h-32 lg:w-40 lg:h-40 object-contain mx-auto mb-4"
        />
      </motion.div>

      {/* Formulaire de login */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 border border-gray-100 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-16 bg-gradient-to-br from-bdtech-light to-bdtech-medium rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <User size={28} className="text-white" />
          </motion.div>
          
          <h1 className="text-2xl lg:text-3xl font-bold text-bdtech-dark mb-2">
            Login
          </h1>
          <p className="text-gray-600">
            Access your client area
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-bdtech-dark">
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your@email.com"
              required
              autoComplete="email"
              className={`
                w-full px-4 py-3 border rounded-lg transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-bdtech-light focus:border-transparent
                ${errors.email 
                  ? 'border-red-300 bg-red-50' 
                  : 'border-gray-300 bg-white hover:border-gray-400'
                }
              `}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-bdtech-dark">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Your password"
                required
                autoComplete="current-password"
                className={`
                  w-full px-4 py-3 border rounded-lg transition-all duration-200 pr-12
                  focus:outline-none focus:ring-2 focus:ring-bdtech-light focus:border-transparent
                  ${errors.password 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-300 bg-white hover:border-gray-400'
                  }
                `}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-bdtech-dark transition-colors duration-200"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className={`
              w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200
              flex items-center justify-center space-x-2
              ${isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-bdtech-dark hover:bg-bdtech-medium shadow-lg hover:shadow-xl'
              }
            `}
            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <User size={20} />
                <span>Login</span>
              </>
            )}
          </motion.button>
        </form>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 space-y-4"
        >
          {/* Back to Home */}
          <div className="text-center">
            <a
              href="/"
              className="inline-flex items-center space-x-2 text-sm text-gray-600 hover:text-bdtech-dark transition-colors duration-200"
            >
              <ArrowLeft size={16} />
              <span>Back to home</span>
            </a>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Access Catalogue */}
          <div className="text-center">
            <Link
              to="/catalogue"
              className="inline-flex items-center space-x-2 text-sm text-bdtech-medium hover:text-bdtech-dark transition-colors duration-200 font-medium"
            >
              <span>Access product catalog</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login; 
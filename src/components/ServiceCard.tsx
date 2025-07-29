import React from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, Headphones, Code } from 'lucide-react';
import type { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    Shield: Shield,
    Headphones: Headphones,
    Code: Code,
  };

  const IconComponent = iconMap[service.icon] || Shield;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-bdtech-light/20"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-bdtech-light/5 to-bdtech-medium/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className="w-16 h-16 bg-gradient-to-br from-bdtech-light to-bdtech-medium rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
          whileHover={{ rotate: 5 }}
        >
          <IconComponent size={32} className="text-white" />
        </motion.div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-bdtech-dark mb-4 group-hover:text-bdtech-medium transition-colors duration-300">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Features List */}
        <div className="space-y-3">
          {service.features.map((feature, featureIndex) => (
            <motion.div
              key={featureIndex}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-3"
            >
              <div className="w-5 h-5 bg-bdtech-light/20 rounded-full flex items-center justify-center">
                <Check size={12} className="text-bdtech-medium" />
              </div>
              <span className="text-gray-700 text-sm font-medium">{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-bdtech-light/30 transition-all duration-300"></div>
    </motion.div>
  );
};

export default ServiceCard; 
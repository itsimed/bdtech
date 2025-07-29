import React from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, Rocket, Settings } from 'lucide-react';
import type { ProcessStep } from '../types';

interface ProcessStepsProps {
  steps: ProcessStep[];
}

const ProcessSteps: React.FC<ProcessStepsProps> = ({ steps }) => {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    Search: Search,
    FileText: FileText,
    Rocket: Rocket,
    Settings: Settings,
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-bdtech-dark mb-6">
            Comment ça marche
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Notre processus en 4 étapes simples pour transformer votre infrastructure IT
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-bdtech-light to-bdtech-medium transform -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const IconComponent = iconMap[step.icon] || Settings;
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-8 h-8 bg-bdtech-medium text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>

                  {/* Card */}
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-bdtech-light/20 relative z-20">
                    {/* Icon */}
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-bdtech-light to-bdtech-medium rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 5 }}
                    >
                      <IconComponent size={32} className="text-white" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-bdtech-dark mb-4 text-center group-hover:text-bdtech-medium transition-colors duration-300">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-center leading-relaxed">
                      {step.description}
                    </p>

                    {/* Arrow for mobile */}
                    {index < steps.length - 1 && (
                      <div className="lg:hidden flex justify-center mt-6">
                        <motion.div
                          animate={{ y: [0, 10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-bdtech-medium"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M7 13l5 5 5-5"/>
                            <path d="M7 6l5 5 5-5"/>
                          </svg>
                        </motion.div>
                      </div>
                    )}
                  </div>

                  {/* Connection Line for Desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-1 bg-gradient-to-r from-bdtech-light to-bdtech-medium z-10"></div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>


      </div>
    </section>
  );
};

export default ProcessSteps; 
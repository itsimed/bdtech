import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const PartnerGrid: React.FC = () => {
  const [position, setPosition] = useState(0);

  const partnerImages = [
    {
      id: 1,
      src: "https://storage.googleapis.com/bdtech/public/partners/Design%20sans%20titre.webp",
      alt: "Partner 1"
    },
    {
      id: 2,
      src: "https://storage.googleapis.com/bdtech/public/partners/Design%20sans%20titre%20(7).webp",
      alt: "Partner 2"
    },
    {
      id: 3,
      src: "https://storage.googleapis.com/bdtech/public/partners/Design%20sans%20titre%20(6).webp",
      alt: "Partner 3"
    },
    {
      id: 4,
      src: "https://storage.googleapis.com/bdtech/public/partners/Design%20sans%20titre%20(5).webp",
      alt: "Partner 4"
    },
    {
      id: 5,
      src: "https://storage.googleapis.com/bdtech/public/partners/Design%20sans%20titre%20(4).webp",
      alt: "Partner 5"
    },
    {
      id: 6,
      src: "https://storage.googleapis.com/bdtech/public/partners/Design%20sans%20titre%20(3).webp",
      alt: "Partner 6"
    },
    {
      id: 7,
      src: "https://storage.googleapis.com/bdtech/public/partners/Design%20sans%20titre%20(2).webp",
      alt: "Partner 7"
    },
    {
      id: 8,
      src: "https://storage.googleapis.com/bdtech/public/partners/Design%20sans%20titre%20(1).webp",
      alt: "Partner 8"
    }
  ];

  // Continuous rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => prev - 1);
    }, 50); // Smooth continuous movement

    return () => clearInterval(interval);
  }, []);

  // Duplicate images for seamless loop
  const duplicatedImages = [...partnerImages, ...partnerImages, ...partnerImages];

  return (
    <section className="py-8 sm:py-12 lg:py-16 xl:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-bdtech-dark mb-3 sm:mb-4 lg:mb-6">
            Our Partners
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
            We collaborate with industry leaders to provide you with the best solutions
          </p>
        </motion.div>

        {/* Continuous Carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-12"
            style={{
              transform: `translateX(${position}px)`,
            }}
            animate={{
              x: position,
            }}
            transition={{
              duration: 0.05,
              ease: "linear",
            }}
          >
            {duplicatedImages.map((image, index) => (
              <div
                key={`${image.id}-${index}`}
                className="flex-shrink-0 w-20 h-12 sm:w-24 sm:h-16 md:w-32 md:h-20 lg:w-40 lg:h-24 xl:w-48 xl:h-28"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-contain transition-all duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PartnerGrid; 
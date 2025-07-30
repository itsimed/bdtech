import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TrustCarousel: React.FC = () => {
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(-1); // -1 for left, 1 for right

  const trustImages = [
    {
      id: 1,
      src: "https://storage.googleapis.com/bdtech/public/trust/lvmh.webp",
      alt: "LVMH"
    },
    {
      id: 2,
      src: "https://storage.googleapis.com/bdtech/public/trust/sephore.webp",
      alt: "Sephora"
    },
    {
      id: 3,
      src: "https://storage.googleapis.com/bdtech/public/trust/chaumet.webp",
      alt: "Chaumet"
    },
    {
      id: 4,
      src: "https://storage.googleapis.com/bdtech/public/trust/tag.webp",
      alt: "TAG"
    },
    {
      id: 5,
      src: "https://storage.googleapis.com/bdtech/public/trust/tiff.webp",
      alt: "TIFF"
    }
  ];

  // Continuous rotation with direction change
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        // Calculate the width of one complete set of images
        const imageWidth = 20; // Base width of each image
        const spacing = 16; // Base spacing between images
        const totalWidth = trustImages.length * (imageWidth + spacing);
        
        // Change direction when reaching the end or beginning
        if (prev <= -totalWidth) {
          setDirection(1); // Change to right direction
          return prev + 1;
        } else if (prev >= 0) {
          setDirection(-1); // Change to left direction
          return prev - 1;
        }
        
        // Continue in current direction
        return prev + direction;
      });
    }, 50); // Smooth continuous movement

    return () => clearInterval(interval);
  }, [direction]);

  // Duplicate images for seamless loop - need 2 sets for smooth infinite loop
  const duplicatedImages = [...trustImages, ...trustImages];

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
            They choose to trust us
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
            World-renowned companies trust us for their IT and security solutions
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

export default TrustCarousel; 
import React from 'react';

import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import type { Product } from '../data/mockProducts';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
  showStockStatus?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = 'grid', showStockStatus = true }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  if (viewMode === 'list') {
    return (
      <div
        className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200"
      >
        <Link to={`/produit/${product.id}`} className="block">
          <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 sm:p-6">
            {/* Image */}
            <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-lg flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
              <Package size={24} className="sm:w-8 sm:h-8 text-gray-400" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1 mb-3 sm:mb-0">
                  <h3 className="text-base sm:text-lg font-semibold text-bdtech-dark truncate">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{product.brand}</p>
                </div>

                {/* Price */}
                <div className="flex-shrink-0 sm:ml-6 sm:text-right">
                  <div className="text-lg sm:text-xl font-bold text-bdtech-dark">
                    {formatPrice(product.price)}
                  </div>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </div>
                  )}
                  {showStockStatus && (
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        product.inStock 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? 'En stock' : 'Rupture'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  // Grid mode (default)
  return (
    <div
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200"
    >
      <Link to={`/produit/${product.id}`} className="block">
        {/* Image */}
        <div className="aspect-square bg-gray-200 flex items-center justify-center">
          <Package size={40} className="sm:w-12 sm:h-12 text-gray-400" />
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-base font-semibold text-bdtech-dark truncate leading-tight">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">{product.brand}</p>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-base sm:text-lg font-bold text-bdtech-dark">
                {formatPrice(product.price)}
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="text-xs sm:text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </div>
              )}
            </div>
            {showStockStatus && (
              <span className={`text-xs px-2 py-1 rounded-full ${
                product.inStock 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.inStock ? 'En stock' : 'Rupture'}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard; 
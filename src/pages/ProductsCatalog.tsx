import React, { useState, useEffect } from 'react';
import { apiService, type Product } from '../services/api';
import { motion } from 'framer-motion';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, SortAsc, Grid, List, ShoppingBag, Star } from 'lucide-react';
import CatalogueNavbar from '../components/CatalogueNavbar';

const ProductsCatalog: React.FC = () => {
  const { categorie, souscategorie } = useParams<{ categorie?: string; souscategorie?: string }>();
  const [searchParams] = useSearchParams();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Charger les produits depuis l'API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getProducts();
        setProducts(response.data.products);
      } catch (err: any) {
        setError(err.message || 'Failed to load products');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filtrer et trier les produits
  const filteredProducts = React.useMemo(() => {
    let filtered = [...products];

    if (categorie) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === categorie.toLowerCase()
      );
      
      if (souscategorie) {
        filtered = filtered.filter(product => 
          product.subcategory?.toLowerCase() === souscategorie.toLowerCase()
        );
      }
    }

    // Trier par prix
    filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.pricing.price - b.pricing.price;
      } else {
        return b.pricing.price - a.pricing.price;
      }
    });

    return filtered;
  }, [products, categorie, souscategorie, sortOrder]);

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const getSortLabel = () => {
    return `Price ${sortOrder === 'asc' ? '↑' : '↓'}`;
  };

  // Calcul du nom de la page pour l'affichage
  const getPageTitle = () => {
    if (souscategorie) {
      return souscategorie.charAt(0).toUpperCase() + souscategorie.slice(1);
    }
    if (categorie) {
      return categorie.charAt(0).toUpperCase() + categorie.slice(1);
    }
    return 'Tous les produits';
  };

  // Composant ProductCard pour afficher un produit
  const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const primaryImage = product.primaryImage || product.images[0];
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
      >
        {/* Image */}
        <div className="relative h-48 sm:h-56 bg-gray-100">
          {primaryImage ? (
            <img
              src={primaryImage.url}
              alt={primaryImage.alt || product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Package size={48} />
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-1">
            {product.featured && (
              <span className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center space-x-1">
                <Star size={12} />
                <span>Featured</span>
              </span>
            )}
            {product.pricing.discount > 0 && (
              <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                -{product.pricing.discount}%
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>{product.brand}</span>
            <span>{product.category}</span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>

          {/* Description */}
          {product.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-bdtech-dark">
                  {product.pricing.price} {product.pricing.currency}
                </span>
                {product.pricing.originalPrice && product.pricing.originalPrice > product.pricing.price && (
                  <span className="text-sm text-gray-500 line-through">
                    {product.pricing.originalPrice} {product.pricing.currency}
                  </span>
                )}
              </div>
              {product.pricing.discount > 0 && (
                <span className="text-xs text-green-600 font-medium">
                  You save {product.pricing.discount}%
                </span>
              )}
            </div>
            
            <button className="bg-bdtech-medium hover:bg-bdtech-dark text-white p-2 rounded-lg transition-colors duration-200">
              <ShoppingBag size={16} />
            </button>
          </div>

          {/* Stock Status */}
          <div className="mt-3 flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${product.stock.isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-xs text-gray-600">
              {product.stock.isAvailable ? `${product.stock.quantity} in stock` : 'Out of stock'}
            </span>
          </div>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CatalogueNavbar />
        <div className="pt-40 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bdtech-medium mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CatalogueNavbar />
        <div className="pt-40 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-bdtech-medium hover:bg-bdtech-dark text-white px-4 py-2 rounded-lg"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CatalogueNavbar />
      
      {/* Header Section */}
      <section className="pt-40 sm:pt-44 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 overflow-x-auto pb-2">
              <Link to="/catalogue" className="hover:text-bdtech-dark transition-colors whitespace-nowrap">
                Catalogue
              </Link>
              {categorie && (
                <>
                  <span className="text-gray-400">/</span>
                  <Link to={`/catalogue/${categorie}`} className="hover:text-bdtech-dark transition-colors whitespace-nowrap">
                    {categorie.charAt(0).toUpperCase() + categorie.slice(1)}
                  </Link>
                </>
              )}
              {souscategorie && (
                <>
                  <span className="text-gray-400">/</span>
                  <span className="text-bdtech-dark font-medium whitespace-nowrap">
                    {souscategorie.charAt(0).toUpperCase() + souscategorie.slice(1)}
                  </span>
                </>
              )}
            </nav>

            {/* Title and Controls */}
            <div className="space-y-4 sm:space-y-6">
              {/* Title Section */}
              <div className="space-y-2 sm:space-y-3">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bdtech-dark leading-tight">
                  {getPageTitle()}
                </h1>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Discover our selection of quality IT products with client-specific pricing
                </p>
              </div>
              
              {/* Controls Section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Stats */}
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Package size={16} className="text-bdtech-medium" />
                    <span className="font-medium">{filteredProducts.length} product{filteredProducts.length > 1 ? 's' : ''}</span>
                  </div>
                </div>
                
                {/* View Mode Toggle and Sort */}
                <div className="flex items-center justify-between sm:justify-end space-x-3">
                  {/* Sort Button */}
                  <button
                    onClick={handleSort}
                    className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-3 sm:px-4 py-2 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <SortAsc size={16} className="text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 hidden sm:inline">{getSortLabel()}</span>
                    <span className="text-sm font-medium text-gray-700 sm:hidden">Price</span>
                  </button>

                  {/* View Mode Toggle */}
                  <div className="flex items-center space-x-1 bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-all duration-200 ${
                        viewMode === 'grid' 
                          ? 'bg-bdtech-medium text-white shadow-sm' 
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Grid size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-all duration-200 ${
                        viewMode === 'list' 
                          ? 'bg-bdtech-medium text-white shadow-sm' 
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <List size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Package size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">No products available for your account in this category.</p>
              <Link 
                to="/catalogue" 
                className="inline-flex items-center space-x-2 bg-bdtech-medium hover:bg-bdtech-dark text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <ArrowLeft size={16} />
                <span>Back to Catalogue</span>
              </Link>
            </motion.div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductsCatalog;
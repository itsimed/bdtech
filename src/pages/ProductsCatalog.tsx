import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, SortAsc, Grid, List } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CatalogueNavbar from '../components/CatalogueNavbar';
import { products, getCategoryById, getSubcategoryById } from '../data/mockProducts';

const ProductsCatalog: React.FC = () => {
  const { categorie, souscategorie } = useParams<{ categorie?: string; souscategorie?: string }>();
  const [searchParams] = useSearchParams();
  
  // Log des paramètres pour déboguer
  console.log('ProductsCatalog params:', { categorie, souscategorie, searchParams: Object.fromEntries(searchParams) });
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Récupérer les informations de catégorie et sous-catégorie
  const category = categorie ? getCategoryById(categorie) : null;
  const subcategory = categorie && souscategorie ? getSubcategoryById(categorie, souscategorie) : null;

  // Filtrer et trier les produits selon les paramètres
  useEffect(() => {
    console.log('ProductsCatalog useEffect triggered:', { categorie, souscategorie, sortOrder });
    
    let filtered = [...products]; // Créer une copie pour éviter la mutation

    if (categorie) {
      filtered = filtered.filter(product => product.category === categorie);
      console.log('Filtered by category:', categorie, 'Products count:', filtered.length);
      
      if (souscategorie) {
        filtered = filtered.filter(product => product.subcategory === souscategorie);
        console.log('Filtered by subcategory:', souscategorie, 'Products count:', filtered.length);
      }
    }

    // Trier les produits par prix uniquement
    filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    console.log('Final filtered products count:', filtered.length);
    setFilteredProducts(filtered);
  }, [categorie, souscategorie, sortOrder]);



  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const getSortLabel = () => {
    return `Price ${sortOrder === 'asc' ? '↑' : '↓'}`;
  };



  // Gérer le focus et la navigation mobile
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Forcer le re-render quand on revient sur la page
    const handleFocus = () => {
      console.log('Page focused, re-triggering filter');
      // Re-déclencher le filtrage
      let filtered = [...products];
      
      if (categorie) {
        filtered = filtered.filter(product => product.category === categorie);
        
        if (souscategorie) {
          filtered = filtered.filter(product => product.subcategory === souscategorie);
        }
      }

      filtered.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });

      setFilteredProducts(filtered);
    };

    // Écouter les événements de focus et visibility
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
    };
  }, [categorie, souscategorie, sortOrder]);





  return (
    <div className="min-h-screen bg-gray-50">
      <CatalogueNavbar />
      
      {/* Header Section */}
      <section className="bg-white border-b border-gray-200">
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
              {category && (
                <>
                  <span className="text-gray-400">/</span>
                  <Link to={`/catalogue/${category.id}`} className="hover:text-bdtech-dark transition-colors whitespace-nowrap">
                    {category.name}
                  </Link>
                </>
              )}
              {subcategory && (
                <>
                  <span className="text-gray-400">/</span>
                  <span className="text-bdtech-dark font-medium whitespace-nowrap">{subcategory.name}</span>
                </>
              )}
            </nav>

            {/* Title and Controls */}
            <div className="space-y-4 sm:space-y-6">
              {/* Title Section */}
              <div className="space-y-2 sm:space-y-3">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bdtech-dark leading-tight">
                  {subcategory ? subcategory.name : category ? category.name : 'All Products'}
                </h1>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {subcategory 
                    ? subcategory.description 
                    : category 
                    ? category.description 
                    : 'Discover our selection of quality IT products'
                  }
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
                          ? 'bg-bdtech-light text-white shadow-sm' 
                          : 'text-gray-500 hover:text-bdtech-dark hover:bg-gray-50'
                      }`}
                    >
                      <Grid size={18} className="sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-all duration-200 ${
                        viewMode === 'list' 
                          ? 'bg-bdtech-light text-white shadow-sm' 
                          : 'text-gray-500 hover:text-bdtech-dark hover:bg-gray-50'
                      }`}
                    >
                      <List size={18} className="sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-6 sm:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length > 0 ? (
            <div
              className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                : "space-y-3 sm:space-y-4"
              }
            >
              {filteredProducts.map((product) => (
                <div key={product.id}>
                  <ProductCard product={product} viewMode={viewMode} />
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 sm:py-16"
            >
              <Package size={48} className="sm:w-16 sm:h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
                No products found
              </h3>
              <p className="text-sm sm:text-base text-gray-500 mb-6 px-4">
                No products match your search criteria.
              </p>
              <Link
                to="/catalogue"
                className="inline-flex items-center space-x-2 bg-bdtech-medium hover:bg-bdtech-dark text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <ArrowLeft size={16} />
                <span className="text-sm sm:text-base">Back to catalog</span>
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductsCatalog; 
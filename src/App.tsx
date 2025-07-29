
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import CatalogueHome from './pages/CatalogueHome';
import ProductsCatalog from './pages/ProductsCatalog';
import ProductPage from './pages/ProductPage';
import Profile from './pages/Profile';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={
            <Layout>
              <Home />
            </Layout>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/catalogue" element={<CatalogueHome />} />
          <Route path="/catalogue/produits" element={<ProductsCatalog />} />
          <Route path="/catalogue/:categorie" element={<ProductsCatalog />} />
          <Route path="/catalogue/:categorie/:souscategorie" element={<ProductsCatalog />} />
          <Route path="/produit/:id" element={<ProductPage />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;

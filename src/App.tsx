
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import CatalogueHome from './pages/CatalogueHome';
import ProductsCatalog from './pages/ProductsCatalog';
import ProductPage from './pages/ProductPage';
import Profile from './pages/Profile';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <CartProvider>
          <Routes>
            <Route path="/" element={
              <Layout>
                <Home />
              </Layout>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/catalogue" element={
              <ProtectedRoute>
                <CatalogueHome />
              </ProtectedRoute>
            } />
            <Route path="/catalogue/produits" element={
              <ProtectedRoute>
                <ProductsCatalog />
              </ProtectedRoute>
            } />
            <Route path="/catalogue/:categorie" element={
              <ProtectedRoute>
                <ProductsCatalog />
              </ProtectedRoute>
            } />
            <Route path="/catalogue/:categorie/:souscategorie" element={
              <ProtectedRoute>
                <ProductsCatalog />
              </ProtectedRoute>
            } />
            <Route path="/produit/:id" element={
              <ProtectedRoute>
                <ProductPage />
              </ProtectedRoute>
            } />
          </Routes>
        </CartProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;

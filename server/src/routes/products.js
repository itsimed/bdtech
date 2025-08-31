import express from 'express';
import {
  getClientProducts,
  getClientProduct,
  searchClientProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  setClientPricing,
  getAllProducts
} from '../controllers/productController.js';
import { protect, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Routes publiques pour les clients authentifiés
router.get('/', protect, getClientProducts);
router.get('/search', protect, searchClientProducts);
router.get('/:id', protect, getClientProduct);

// Routes admin
router.use('/admin', protect, requireAdmin);
router.get('/admin/', getAllProducts);
router.post('/admin/', createProduct);
router.put('/admin/:id', updateProduct);
router.delete('/admin/:id', deleteProduct);
router.post('/admin/:id/pricing', setClientPricing);

export default router;

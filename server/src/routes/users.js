import express from 'express';
import {
  getProfile,
  updateProfile,
  deleteAccount,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  toggleUserStatus
} from '../controllers/userController.js';
import { validateProfileUpdate } from '../middleware/validation.js';
import { protect, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// User profile routes
router.get('/profile', getProfile);
router.put('/profile', validateProfileUpdate, updateProfile);
router.delete('/profile', deleteAccount);

// Admin routes
router.get('/', requireAdmin, getAllUsers);
router.get('/:id', requireAdmin, getUserById);
router.put('/:id', requireAdmin, updateUserById);
router.delete('/:id', requireAdmin, deleteUserById);
router.patch('/:id/toggle-status', requireAdmin, toggleUserStatus);

export default router; 
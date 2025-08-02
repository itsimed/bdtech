import express from 'express';
import {
  register,
  login,
  getMe,
  logout,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerification,
  changePassword
} from '../controllers/authController.js';
import {
  validateRegistration,
  validateLogin,
  validatePasswordReset,
  validateNewPassword
} from '../middleware/validation.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);
router.post('/forgot-password', validatePasswordReset, forgotPassword);
router.post('/reset-password/:token', validateNewPassword, resetPassword);
router.post('/verify-email/:token', verifyEmail);

// Protected routes
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);
router.post('/resend-verification', protect, resendVerification);
router.post('/change-password', protect, validateNewPassword, changePassword);

export default router; 
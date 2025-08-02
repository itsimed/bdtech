import User from '../models/User.js';
import { generateToken, generateEmailVerificationToken, generatePasswordResetToken } from '../utils/jwt.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import crypto from 'crypto';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    company,
    position,
    address
  } = req.body;

  // Check if user already exists
  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    return res.status(400).json({
      status: 'error',
      message: 'User with this email already exists'
    });
  }

  // Generate email verification token
  const emailVerificationToken = generateEmailVerificationToken();

  // Create new user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phone,
    company,
    position,
    address,
    emailVerificationToken,
    emailVerificationExpires: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  });

  // Generate JWT token
  const token = generateToken(user._id, user.role);

  // Remove password from response
  user.password = undefined;

  res.status(201).json({
    status: 'success',
    message: 'User registered successfully. Please check your email to verify your account.',
    data: {
      user,
      token
    }
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists and password is correct
  const user = await User.findByEmail(email).select('+password');
  if (!user) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid email or password'
    });
  }

  // Check if account is locked
  if (user.isLocked) {
    return res.status(423).json({
      status: 'error',
      message: 'Account is temporarily locked due to too many failed login attempts. Please try again later.'
    });
  }

  // Check if user is active
  if (!user.isActive) {
    return res.status(401).json({
      status: 'error',
      message: 'Account is deactivated'
    });
  }

  // Check password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    // Increment login attempts
    await user.incLoginAttempts();
    
    return res.status(401).json({
      status: 'error',
      message: 'Invalid email or password'
    });
  }

  // Reset login attempts on successful login
  await User.resetLoginAttempts(email);

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  // Generate JWT token
  const token = generateToken(user._id, user.role);

  // Remove password from response
  user.password = undefined;

  res.status(200).json({
    status: 'success',
    message: 'Login successful',
    data: {
      user,
      token
    }
  });
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {
  // In a stateless JWT setup, logout is handled client-side
  // by removing the token from storage
  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully'
  });
});

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findByEmail(email);
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'No user found with this email address'
    });
  }

  // Generate password reset token
  const resetToken = generatePasswordResetToken();
  const resetTokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hour

  // Save reset token to user
  user.passwordResetToken = resetToken;
  user.passwordResetExpires = resetTokenExpiry;
  await user.save();

  // TODO: Send email with reset link
  // For now, we'll return the token (in production, send via email)
  res.status(200).json({
    status: 'success',
    message: 'Password reset email sent',
    data: {
      resetToken // Remove this in production
    }
  });
});

// @desc    Reset password
// @route   POST /api/auth/reset-password/:token
// @access  Public
export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  // Find user by reset token
  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid or expired password reset token'
    });
  }

  // Update password and clear reset token
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // Generate new JWT token
  const newToken = generateToken(user._id, user.role);

  res.status(200).json({
    status: 'success',
    message: 'Password reset successful',
    data: {
      token: newToken
    }
  });
});

// @desc    Verify email
// @route   POST /api/auth/verify-email/:token
// @access  Public
export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  // Find user by verification token
  const user = await User.findOne({
    emailVerificationToken: token,
    emailVerificationExpires: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid or expired email verification token'
    });
  }

  // Mark email as verified
  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'Email verified successfully'
  });
});

// @desc    Resend email verification
// @route   POST /api/auth/resend-verification
// @access  Private
export const resendVerification = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user.isEmailVerified) {
    return res.status(400).json({
      status: 'error',
      message: 'Email is already verified'
    });
  }

  // Generate new verification token
  const emailVerificationToken = generateEmailVerificationToken();

  user.emailVerificationToken = emailVerificationToken;
  user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  await user.save();

  // TODO: Send verification email
  res.status(200).json({
    status: 'success',
    message: 'Verification email sent',
    data: {
      emailVerificationToken // Remove this in production
    }
  });
});

// @desc    Change password
// @route   POST /api/auth/change-password
// @access  Private
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select('+password');

  // Check current password
  const isCurrentPasswordCorrect = await user.comparePassword(currentPassword);
  if (!isCurrentPasswordCorrect) {
    return res.status(401).json({
      status: 'error',
      message: 'Current password is incorrect'
    });
  }

  // Update password
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'Password changed successfully'
  });
}); 
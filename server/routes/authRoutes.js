import express from 'express';
import { 
  register, 
  login, 
  verifyEmail, 
  resendVerificationCode 
} from '../controllers/authController.js';
import { auth } from '../middleware/auth.js';
import mongoose from 'mongoose';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerificationCode);

// Protected routes
router.get('/me', auth, (req, res) => {
  res.json({
    status: 'success',
    data: {
      user: {
        id: req.user._id,
        fullName: req.user.fullName,
        phone: req.user.phone,
        email: req.user.email,
        location: req.user.location,
        userType: req.user.userType,
        isVerified: req.user.isVerified
      }
    }
  });
});

// Add this route for testing
router.get('/test-email-config', (req, res) => {
  res.json({
    hasApiKey: !!process.env.RESEND_API_KEY,
    apiKeyLength: process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.length : 0
  });
});

// Add this temporarily and remove after using it
router.get('/reset-collection', async (req, res) => {
  try {
    await mongoose.connection.collections['users'].drop();
    res.json({ message: 'Collection reset successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router; 
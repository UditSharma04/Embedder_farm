import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendVerificationEmail } from '../services/emailService.js';
import { generateVerificationCode, generateExpiryTime } from '../utils/verificationUtils.js';

// Create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// Register user
export const register = async (req, res) => {
  try {
    const { fullName, phone, email, location, password, userType } = req.body;
    
    // Log the received data
    console.log('Registration attempt:', {
      fullName: fullName || 'missing',
      phone: phone || 'missing',
      email: email || 'missing',
      location: location || 'missing',
      userType: userType || 'missing',
      hasPassword: !!password
    });

    // Validate all required fields are present
    const requiredFields = ['fullName', 'phone', 'email', 'location', 'password', 'userType'];
    const missingFields = requiredFields.filter(field => !req.body[field] || req.body[field].trim() === '');
    
    if (missingFields.length > 0) {
      console.log('Missing fields:', missingFields);
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Validate phone number format
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        error: 'Phone number must be exactly 10 digits'
      });
    }

    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({
        error: 'Please enter a valid email address'
      });
    }

    // Check for existing user with same phone or email
    const existingUser = await User.findOne({
      $or: [
        { phone },
        { email }
      ]
    });

    if (existingUser) {
      if (existingUser.phone === phone) {
        return res.status(400).json({
          error: 'Phone number already registered'
        });
      }
      if (existingUser.email === email) {
        return res.status(400).json({
          error: 'Email already registered'
        });
      }
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        error: 'Password must be at least 6 characters long'
      });
    }

    // Validate user type
    if (!['farmer', 'buyer'].includes(userType.toLowerCase())) {
      return res.status(400).json({
        error: 'Invalid user type'
      });
    }

    // Generate verification code
    const verificationCode = generateVerificationCode();
    const verificationCodeExpires = generateExpiryTime();

    // Create new user
    const user = await User.create({
      fullName,
      phone,
      email,
      location,
      password,
      userType: userType.toLowerCase(),
      verificationCode,
      verificationCodeExpires
    });

    // Send verification email
    await sendVerificationEmail(email, fullName, verificationCode);
    
    // Generate token
    const token = createToken(user._id);

    res.status(201).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          fullName: user.fullName,
          phone: user.phone,
          email: user.email,
          location: user.location,
          userType: user.userType
        },
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        error: `This ${field} is already registered`
      });
    }

    if (error.name === 'ValidationError') {
      const errorMessage = Object.values(error.errors)[0].message;
      console.log('Validation error:', errorMessage);
      return res.status(400).json({
        error: errorMessage
      });
    }

    res.status(500).json({ 
      error: 'An error occurred during registration',
      details: error.message 
    });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Check if input is email or phone
    const isEmail = /^\S+@\S+\.\S+$/.test(phone);
    
    // Find user by email or phone
    const user = await User.findOne(
      isEmail ? { email: phone.toLowerCase() } : { phone }
    );

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if user is active
    if (!user.active) {
      return res.status(401).json({ error: 'Account is deactivated' });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(401).json({ 
        error: 'Please verify your email before logging in',
        needsVerification: true,
        email: user.email
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = createToken(user._id);

    res.json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          fullName: user.fullName,
          phone: user.phone,
          email: user.email,
          location: user.location,
          userType: user.userType,
          isVerified: user.isVerified
        },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'An error occurred during login' 
    });
  }
};

// Add this to your existing controller
export const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ 
      email,
      verificationCode: code,
      verificationCodeExpires: { $gt: new Date() }
    });
    
    if (!user) {
      return res.status(400).json({ 
        error: 'Invalid or expired verification code' 
      });
    }

    // Update user verification status
    user.isVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpires = null;
    await user.save();

    res.json({ 
      status: 'success',
      message: 'Email verified successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Verification failed',
      details: error.message 
    });
  }
};

// Add a resend verification code endpoint
export const resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ error: 'Email is already verified' });
    }

    // Generate new verification code
    const verificationCode = generateVerificationCode();
    const verificationCodeExpires = generateExpiryTime();

    user.verificationCode = verificationCode;
    user.verificationCodeExpires = verificationCodeExpires;
    await user.save();

    // Send new verification email
    await sendVerificationEmail(email, user.fullName, verificationCode);

    res.json({ 
      status: 'success',
      message: 'Verification code resent successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to resend verification code',
      details: error.message 
    });
  }
}; 
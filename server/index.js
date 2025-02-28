import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import { sendVerificationEmail } from './services/emailService.js';

// Load environment variables before any other imports
dotenv.config();

const app = express();

// After dotenv.config()
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET', 'RESEND_API_KEY', 'CLIENT_URL'];
const missingEnvVars = requiredEnvVars.filter(key => !process.env[key]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
  console.error('Please check your .env file');
  process.exit(1);
}

// Morgan configuration for logging
// Use 'dev' format in development and 'combined' in production
const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(morganFormat, {
  skip: (req, res) => {
    // Skip logging for successful health check endpoints
    return req.url === '/health' && res.statusCode === 200;
  },
  // Custom tokens for additional logging info
  stream: {
    write: (message) => {
      // Remove line breaks for cleaner logs
      console.log(message.trim());
    }
  }
}));

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection with retry logic
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MongoDB connection string is missing');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      dbName: 'embedder_farm',
      retryWrites: true,
      w: 'majority',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      minPoolSize: 5,
      connectTimeoutMS: 10000,
      heartbeatFrequencyMS: 30000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Connected to database: ${conn.connection.name}`);
    console.log(`Connection state: ${conn.connection.readyState}`);
  } catch (error) {
    console.error('MongoDB connection error details:', {
      message: error.message,
      code: error.code,
      codeName: error.codeName,
      errorLabels: error.errorLabels,
      name: error.name
    });
    
    const maskedUri = process.env.MONGODB_URI.replace(
      /:([^@]+)@/,
      ':****@'
    );
    console.log('Attempted connection with URI:', maskedUri);
    
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

// Initial connection
connectDB();

// MongoDB Connection Event Handlers
mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', {
    message: error.message,
    code: error.code,
    name: error.name
  });
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
  connectDB();
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});

// Routes
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Promise Rejection:', error);
}); 
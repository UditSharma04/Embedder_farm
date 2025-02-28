import { Resend } from 'resend';
import dotenv from 'dotenv';

// Load environment variables first
dotenv.config();

// Initialize Resend with API key after loading env vars
let resend;
try {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not found in environment variables');
  } else {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
} catch (error) {
  console.error('Error initializing Resend:', error);
}

export const sendVerificationEmail = async (email, fullName, verificationCode) => {
  try {
    if (!resend) {
      console.error('Resend client not initialized');
      return { error: 'Email service not configured properly' };
    }

    console.log('Attempting to send email with API key:', process.env.RESEND_API_KEY ? 'Present' : 'Missing');
    
    const { data, error } = await resend.emails.send({
      from: 'FarmConnect <onboarding@resend.dev>',
      to: email,
      subject: 'Verify Your FarmConnect Account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #2B5C2B; margin-bottom: 10px;">Welcome to FarmConnect!</h1>
            <p style="font-size: 16px; color: #666;">India's Largest Agricultural Network</p>
          </div>
          
          <div style="background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <p style="font-size: 16px; color: #333;">Hi ${fullName},</p>
            <p style="font-size: 16px; color: #333;">Thank you for signing up. Please use the verification code below to verify your account:</p>
            
            <div style="background-color: #f8f8f8; border-radius: 4px; padding: 16px; text-align: center; margin: 24px 0;">
              <span style="font-size: 32px; letter-spacing: 4px; font-weight: bold; color: #2B5C2B;">${verificationCode}</span>
            </div>
            
            <p style="font-size: 14px; color: #666;">This code will expire in 10 minutes.</p>
            <p style="font-size: 14px; color: #666;">If you didn't create an account, please ignore this email.</p>
          </div>
          
          <div style="text-align: center; margin-top: 20px;">
            <p style="font-size: 14px; color: #666;">Best regards,<br>The FarmConnect Team</p>
          </div>
        </div>
      `
    });

    if (error) {
      console.error('Email sending error:', error);
      return { error: error.message };
    }

    console.log('Email sent successfully:', data);
    return { success: true, data };

  } catch (error) {
    console.error('Email service error:', error);
    return { error: error.message };
  }
}; 
import axios from 'axios';
import { TwoFactorMethod, TwoFactorVerification } from '../types/auth';

const TWILIO_API_URL = 'https://api.twilio.com/2010-04-01';

export async function sendTwoFactorCode(
  userId: string,
  method: TwoFactorMethod,
  destination: string
): Promise<boolean> {
  try {
    // In production, this would call your backend API which would use Twilio
    // For demo, we'll simulate the API call
    console.log(`Sending 2FA code via ${method} to ${destination}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  } catch (error) {
    console.error('Failed to send 2FA code:', error);
    return false;
  }
}

export async function verifyTwoFactorCode(verification: TwoFactorVerification): Promise<boolean> {
  try {
    // In production, this would verify the code with your backend
    // For demo, we'll accept any 6-digit code
    const isValid = /^\d{6}$/.test(verification.code);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return isValid;
  } catch (error) {
    console.error('Failed to verify 2FA code:', error);
    return false;
  }
}
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || process.env.RESEND_KEY || '';

if (!resendApiKey) {
  console.warn('RESEND_API_KEY not found in environment variables');
}

export const resend = new Resend(resendApiKey);

export interface EmailData {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(emailData: EmailData) {
  try {
    const result = await resend.emails.send(emailData);
    return { success: true, data: result };
  } catch (error) {
    console.error('Resend API error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

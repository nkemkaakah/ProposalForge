import { Resend } from 'resend';

// Clean the API key to remove any potential whitespace/newlines
const rawApiKey = process.env.RESEND_API_KEY || 're_Ya7kxFbv_C3MBZHxhrfaZbsKwJ5xNQjBn';
const resendApiKey = rawApiKey?.trim().replace(/[\r\n]/g, '');

console.log('🔑 Using API key:', resendApiKey ? `${resendApiKey.substring(0, 8)}...` : 'None');
console.log('🌍 Environment RESEND_API_KEY:', process.env.RESEND_API_KEY ? 'Set' : 'Not set');
console.log('📏 API key length:', resendApiKey?.length);
console.log('✅ API key format valid:', resendApiKey?.startsWith('re_') && resendApiKey?.length === 36);

if (!resendApiKey) {
  console.warn('⚠️  RESEND_API_KEY not found in environment variables');
}

export const resend = new Resend(resendApiKey);

export interface EmailData {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(emailData: EmailData) {
  console.log('📤 Attempting to send email...');
  console.log('📧 Email details:', { 
    to: emailData.to, 
    from: emailData.from, 
    subject: emailData.subject,
    hasHtml: !!emailData.html,
    htmlLength: emailData.html?.length 
  });
  
  try {
    const result = await resend.emails.send(emailData);
    console.log('✅ Resend API result:', JSON.stringify(result, null, 2));
    
    // Check if we got an error in the response
    if (result.error) {
      console.log('⚠️  Resend returned an error in response:', result.error);
      return { 
        success: false, 
        error: `Resend API error: ${result.error.message} (${result.error.name})`,
        data: result
      };
    }
    
    if (result.data?.id) {
      console.log('✨ Email sent successfully with ID:', result.data.id);
    }
    
    return { success: true, data: result };
  } catch (error) {
    console.error('❌ Resend API error (caught exception):', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

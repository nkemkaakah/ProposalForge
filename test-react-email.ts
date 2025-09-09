import 'dotenv/config';
import { render } from '@react-email/render';
import DemoDigestEmail from './shared/email/DemoDigestEmail';

console.log('🧪 Testing React Email Rendering...');

const testData = {
  companyName: "Test Company",
  bannerImageUrl: "",
  chartImageUrl: "",
  dateRange: "September 1, 2025 - September 7, 2025",
  totalTickets: "928",
  qaScore: "95",
  totalInteractions: "5387"
};

console.log('📧 Test data:', testData);

try {
  const emailHTML = await render(DemoDigestEmail(testData));
  
  console.log('✅ React email rendered successfully!');
  console.log('📏 HTML length:', emailHTML.length);
  console.log('🔍 HTML starts with:', emailHTML.substring(0, 100) + '...');
  
  // Check if it contains expected content from the rich template
  const hasSpectranet = emailHTML.includes('Spectranet');
  const hasComplaintCategories = emailHTML.includes('complaint');
  const hasScorecard = emailHTML.includes('Scorecard');
  
  console.log('✨ Rich content checks:');
  console.log('  - Contains Spectranet:', hasSpectranet);
  console.log('  - Contains complaint categories:', hasComplaintCategories);  
  console.log('  - Contains scorecard:', hasScorecard);
  
  if (hasSpectranet && hasComplaintCategories && hasScorecard) {
    console.log('🎉 SUCCESS: Rich template content is being rendered!');
  } else {
    console.log('⚠️ WARNING: Some rich content may be missing');
  }
  
} catch (error) {
  console.error('❌ Error rendering email:', error);
}

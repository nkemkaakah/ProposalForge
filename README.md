# ProposalForge - Demo Email Sender

A modern full-stack application for sending rich, customizable customer service digest emails to prospects. Built with React, TypeScript, Express, and Resend.

## 🚀 Features

- **Rich Email Templates**: Beautiful, professional customer digest reports with Nigerian fintech context
- **Live Preview**: See exactly what your email will look like before sending
- **Customizable Content**: Add company branding, custom images, and metrics
- **Email Delivery**: Powered by Resend API for reliable email delivery
- **Email Logging**: Track sent emails with status and delivery IDs
- **Rate Limiting**: Built-in protection against spam (5 emails per minute)
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Full-Stack TypeScript**: Type-safe development across client and server

## 🎯 Perfect For

- **Sales Teams**: Send impressive demo reports to prospects
- **Customer Success**: Showcase service quality metrics
- **Fintech Companies**: Demonstrate customer insights capabilities
- **Marketing**: Create engaging prospect touchpoints

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible components
- **React Hook Form** - Form management
- **TanStack Query** - Server state management
- **Wouter** - Lightweight routing
- **Vite** - Fast development and building

### Backend
- **Node.js + Express** - Server runtime and framework
- **TypeScript** - Full type safety
- **Resend** - Email delivery service
- **@react-email/render** - React to HTML email conversion
- **Zod** - Schema validation
- **Drizzle ORM** - Type-safe database queries
- **PostgreSQL** - Database (optional)

### Development
- **TSX** - TypeScript execution
- **ESBuild** - Fast bundling
- **Drizzle Kit** - Database migrations

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Valid Resend API key

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ProposalForge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Resend API key:
   ```
   RESEND_API_KEY=re_your_actual_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Frontend: http://localhost:5000
   - Backend API: http://localhost:5000/api

## 🔧 Configuration

### Environment Variables

```bash
# Resend API Configuration
RESEND_API_KEY=re_your_api_key_here

# Database Configuration (optional)
DATABASE_URL=postgresql://username:password@localhost:5432/proposalforge

# Server Configuration
PORT=5000
NODE_ENV=development
```

### Getting a Resend API Key

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain (or use their test domain for development)
3. Generate an API key from your dashboard
4. Add it to your `.env` file

## 📧 Email Template

The application includes a rich customer service digest template featuring:

- **Company Branding**: Customizable company name and images
- **Key Metrics**: QA scores, ticket counts, interaction totals
- **Complaint Analysis**: Detailed breakdown with real examples
- **Service Issues**: Customer pain points and resolution status  
- **Product Issues**: Feature requests and bug reports
- **Scorecard Performance**: Team performance metrics
- **Nigerian Context**: Fintech-specific use cases (Spectranet, Opay, etc.)

## 🎨 Customization

### Company Information
- Company name
- Banner/header image URL
- Chart/graph image URL

### Metrics
- Date range for the report
- Total tickets processed
- Average QA score
- Total interactions (calls, chats, emails)

### Visual Elements
- Custom company branding
- Upload your own charts and graphs
- Responsive email design

## 📋 API Endpoints

### POST /api/send-email
Send a customer digest email
```typescript
{
  companyName: string;
  recipientEmail: string;
  bannerImageUrl?: string;
  chartImageUrl?: string;
  dateRange?: string;
  totalTickets?: string;
  qaScore?: string;
  totalInteractions?: string;
}
```

### POST /api/generate-email  
Generate HTML without sending
```typescript
// Same request body as above
// Returns: { html: string }
```

### GET /api/email-logs
Get email sending history
```typescript
// Returns array of email log entries
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Setup
- Set `NODE_ENV=production`
- Configure your production database URL
- Ensure Resend API key is set
- Set up your domain verification in Resend

## 🧪 Development

### Available Scripts

```bash
# Start development server (frontend + backend)
npm run dev

# Type checking
npm run check

# Build for production
npm run build

# Start production server
npm start

# Database operations
npm run db:push
```

### Architecture

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Route components  
│   │   └── lib/           # Utilities
├── server/                # Express backend
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database layer
│   └── utils/             # Server utilities
├── shared/                # Shared code
│   ├── schema.ts          # Validation schemas
│   └── email/             # Email templates
└── dist/                  # Built files
```

### Key Features

- **Single Server**: One process serves both frontend and API
- **Hot Reload**: Instant development feedback
- **Type Safety**: Full TypeScript coverage
- **Email Testing**: Built-in test utilities
- **Error Handling**: Comprehensive error management
- **Logging**: Detailed request/response logging

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

**Port 5000 already in use**
```bash
# Kill existing processes
pkill -f node
# Or on Windows
Get-Process -Name "node" | Stop-Process -Force
```

**Resend API errors**
- Verify your API key is correct
- Check domain verification status
- Ensure you're not hitting rate limits

**TypeScript errors**
```bash
npm run check
```

**Email not sending**
- Check API key configuration
- Verify from domain in Resend dashboard
- Check email logs endpoint for error details

### Debug Mode

Enable detailed logging by checking the server console output when running `npm run dev`. The application provides comprehensive logging for:

- API key validation
- Email generation process
- Resend API responses
- Database operations

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

---

Built with ❤️ for modern email marketing and customer success teams.

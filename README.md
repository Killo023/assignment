# AssignmentAI - Production Ready AI-Powered Assignment Help

A comprehensive, production-ready SaaS application that uses advanced AI to assist students with their assignments. Built with Next.js 14, featuring enterprise-grade security, comprehensive monitoring, and a professional dark-themed design optimized for conversions.

## 🌟 Features

### Core Functionality
- **AI-Powered Assignment Processing**: Uses Google Gemini and Hugging Face APIs with multiple model fallbacks
- **Secure File Upload**: PDF, DOCX, and TXT files with comprehensive security validation
- **Subject Selection**: 15+ academic subjects with specialized AI prompts
- **Multiple Output Formats**: PDF, DOCX, and TXT download options
- **Real-time Processing**: Async AI processing with status updates and error handling

### User Management
- **Multi-Provider Authentication**: NextAuth.js with Google, GitHub OAuth, and email/password
- **Password Reset**: Secure email-based password reset functionality
- **Role-Based Access**: Student, Professor, and Admin roles with appropriate permissions
- **Subscription Tiers**: Free (3 assignments/month), Premium ($19.99/month), Institution ($99/month)
- **Assignment Tracking**: Complete history with download and sharing
- **Usage Limits**: Automatic monthly reset and premium upgrades

### Payment Integration
- **PayPal Smart Buttons**: Secure subscription processing
- **Webhook Handling**: Automatic subscription management
- **Free Trial**: No credit card required to start

### Security & Ethics
- **Enterprise Security**: Comprehensive input validation, XSS protection, and CSRF prevention
- **Rate Limiting**: Advanced rate limiting with Redis for API protection
- **File Upload Security**: File type validation, size limits, virus scanning
- **Email Security**: SendGrid-powered secure email delivery
- **Academic Integrity**: Disclaimers and watermarking
- **Terms of Service**: Built-in compliance features
- **Comprehensive Logging**: Security event logging and monitoring

## 🚀 Tech Stack

### Frontend
- **Next.js 14**: App Router with server components
- **Tailwind CSS**: Dark theme with gradient accents
- **Framer Motion**: Smooth animations and transitions
- **React Dropzone**: Drag-and-drop file uploads
- **Lucide React**: Modern icon library

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **MongoDB Atlas**: Free tier database with Mongoose ODM
- **NextAuth.js**: Authentication with multiple providers
- **Hugging Face API**: Free AI model inference

### AI & Processing
- **Zephyr-7B-beta**: Primary AI model for assignment completion
- **Mistral-7B**: Fallback model for reliability
- **Mammoth.js**: DOCX file text extraction
- **PDF-parse**: PDF file text extraction

### Payment & Storage
- **PayPal Smart Buttons**: Subscription processing with webhook support
- **Firebase Storage**: File storage with security rules
- **Upstash Redis**: Rate limiting and caching
- **SendGrid**: Transactional email delivery

### Production Features
- **Database Migration**: Automated migration scripts for schema updates
- **Comprehensive Logging**: Production-ready logging with multiple levels
- **Error Tracking**: Structured error handling and monitoring
- **Performance Monitoring**: Response time tracking and optimization
- **Security Monitoring**: Security event logging and alerting

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account
- Hugging Face API key
- PayPal Developer account
- Google/GitHub OAuth apps

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/assignmentai.git
   cd assignmentai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   - MongoDB Atlas connection string
   - NextAuth secret and OAuth credentials
   - Hugging Face API key
   - PayPal client credentials
   - Firebase configuration

4. **Run database migration (if needed)**
   ```bash
   npm run db:migrate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables

Copy `env.example` to `.env.local` and configure:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/assignmentai

# NextAuth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

# AI Services
HUGGINGFACE_API_KEY=your-huggingface-api-key
GEMINI_API_KEY=your-gemini-api-key

# Email Service
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com

# PayPal
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret
PAYPAL_MODE=sandbox # or 'live' for production

# Firebase (optional)
FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id

# Rate Limiting
UPSTASH_REDIS_REST_URL=your-upstash-redis-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-redis-token

# Public Variables
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your-paypal-client-id
```

### OAuth Setup

1. **Google OAuth**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

2. **GitHub OAuth**
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Create a new OAuth App
   - Set callback URL: `http://localhost:3000/api/auth/callback/github`

### PayPal Setup

1. **PayPal Developer Account**
   - Create account at [PayPal Developer](https://developer.paypal.com/)
   - Create a new app for sandbox testing
   - Get client ID and secret

2. **Subscription Plan**
   - Create a subscription plan in PayPal dashboard
   - Update the plan ID in `/app/pricing/page.js`

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy automatically

3. **Configure Custom Domain**
   - Add `theassignmentai.com` in Vercel settings
   - Update DNS records

### Environment Variables for Production

Set these in your Vercel dashboard:

```env
NEXTAUTH_URL=https://theassignmentai.com
MONGODB_URI=your-production-mongodb-uri
HUGGINGFACE_API_KEY=your-production-api-key
PAYPAL_CLIENT_ID=your-production-paypal-client-id
PAYPAL_CLIENT_SECRET=your-production-paypal-client-secret
```

### Database Setup

1. **MongoDB Atlas**
   - Create a free cluster
   - Get connection string
   - Add IP whitelist for Vercel

2. **Collections**
   - Users: `users`
   - Assignments: `assignments`

## 📊 Cost Control

### Free Tier Limits
- **Hugging Face API**: 30,000 requests/month
- **MongoDB Atlas**: 512MB storage
- **Vercel**: 100GB bandwidth/month
- **Upstash Redis**: 10,000 requests/day

### Optimization Strategies
- **Token Limits**: 1024 tokens per AI request
- **Request Caching**: Redis for repeated queries
- **Model Fallback**: Mistral-7B if Zephyr fails
- **Monthly Cleanup**: Cron job for inactive users

## 🔒 Security Features

### Input Validation
- File type validation (PDF, DOCX, TXT only)
- File size limits (10MB max)
- Content sanitization for XSS protection

### Rate Limiting
- API rate limiting with Upstash Redis
- User assignment limits
- Subscription-based access control

### Authentication
- NextAuth.js with multiple providers
- Session management
- Protected API routes

## 🎨 Design Features

### Dark Theme
- Professional dark color scheme
- Gradient accents (#6366f1 to #8b5cf6)
- Glass morphism effects
- Smooth animations

### Conversion Optimization
- Hero section with clear value proposition
- Social proof and testimonials
- Urgency elements ("First 100 users free")
- Multiple CTAs throughout

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions

## 📈 Analytics & Monitoring

### Built-in Tracking
- Assignment completion rates
- User engagement metrics
- Subscription conversion rates
- Error tracking and logging

### Performance Monitoring
- Vercel Analytics integration
- API response time monitoring
- Error rate tracking
- User session analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This application is for educational purposes only. Users are responsible for:
- Reviewing and citing sources appropriately
- Ensuring academic integrity
- Following their institution's policies
- Using the content responsibly

## 🆘 Support

For support, email support@theassignmentai.com or create an issue on GitHub.

---

**Built with ❤️ using Next.js 14 and modern web technologies** 
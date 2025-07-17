# AssignmentAI Setup Guide

## Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Database (Required for full functionality)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/assignmentai?retryWrites=true&w=majority

# NextAuth (Required for authentication)
NEXTAUTH_SECRET=your-nextauth-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers (Optional - for Google/GitHub login)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

# AI Services (Optional - for AI processing)
HUGGINGFACE_API_KEY=your-huggingface-api-key

# PayPal (Optional - for payments)
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret

# Public Variables
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your-paypal-client-id
```

## Quick Start (Development Mode)

For development without external services:

1. **Create `.env.local`** with just these minimal variables:
```env
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

2. **Run the application**:
```bash
npm run dev
```

3. **Access the app** at http://localhost:3000

## Features Available in Development Mode:

- ✅ Landing page with full styling
- ✅ Dashboard interface
- ✅ File upload (mock processing)
- ✅ Mock AI responses
- ✅ Authentication UI (without actual OAuth)

## Full Setup (Production Ready):

### 1. MongoDB Atlas
- Create free cluster at https://cloud.mongodb.com
- Get connection string
- Add to `MONGODB_URI`

### 2. NextAuth Secret
- Generate random string: `openssl rand -base64 32`
- Add to `NEXTAUTH_SECRET`

### 3. OAuth Providers (Optional)
- Google: https://console.cloud.google.com
- GitHub: https://github.com/settings/developers

### 4. Hugging Face API
- Get free API key at https://huggingface.co/settings/tokens
- Add to `HUGGINGFACE_API_KEY`

### 5. PayPal (Optional)
- Create developer account at https://developer.paypal.com
- Get client credentials
- Add to PayPal variables

## Current Status

The application is running in **development mode** with:
- ✅ Styling and UI working
- ✅ Mock database operations
- ✅ Mock AI responses
- ✅ Authentication interface

You can now explore the application at http://localhost:3000! 
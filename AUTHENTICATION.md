# Authentication System Documentation

## Overview

The AssignmentAI application supports multiple authentication methods:

1. **OAuth Authentication** (Google & GitHub)
2. **Email/Password Authentication**
3. **Hybrid System** - Users can use either method

## Authentication Methods

### 1. OAuth Authentication (NextAuth.js)

**Providers:**
- Google OAuth
- GitHub OAuth

**Features:**
- One-click sign-in
- Automatic account creation
- Secure token management
- Session persistence

**Configuration:**
```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

### 2. Email/Password Authentication

**Features:**
- Traditional email/password registration
- Password hashing with bcrypt
- JWT token generation
- Secure password validation

**API Endpoints:**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

## User Model

```javascript
{
  email: String (required, unique),
  name: String (required),
  password: String (optional - for email auth),
  image: String (optional - for OAuth),
  subscription: String (enum: 'free', 'premium'),
  assignmentsUsed: Number,
  assignmentsLimit: Number,
  lastResetDate: Date,
  paypalSubscriptionId: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Authentication Flow

### OAuth Flow
1. User clicks "Continue with Google/GitHub"
2. Redirected to OAuth provider
3. User authorizes the application
4. NextAuth creates/updates user in database
5. User is redirected to dashboard

### Email/Password Flow
1. User fills registration form
2. API validates input and checks for existing user
3. Password is hashed with bcrypt
4. User is created in database
5. User is redirected to sign-in page
6. User enters credentials
7. API validates credentials and returns JWT token
8. Token is stored in localStorage
9. User is redirected to dashboard

## Usage

### Frontend Components

#### 1. Navigation Bar
```javascript
import { useAuth } from '../hooks/useAuth'

const { user, isAuthenticated, signOut } = useAuth()
```

#### 2. Protected Routes
```javascript
// Middleware automatically protects /dashboard routes
// Users are redirected to /auth/signin if not authenticated
```

#### 3. Authentication Pages
- `/auth/signin` - OAuth sign-in options
- `/auth/signin-email` - Email/password sign-in
- `/auth/signup` - User registration

### API Utilities

#### 1. Authenticated Requests
```javascript
import { authenticatedFetch } from '../lib/auth'

const response = await authenticatedFetch('/api/protected-endpoint', {
  method: 'POST',
  body: JSON.stringify(data)
})
```

#### 2. Token Management
```javascript
import { getAuthToken, setAuthToken, removeAuthToken } from '../lib/auth'

// Get current token
const token = getAuthToken()

// Set new token
setAuthToken(newToken)

// Remove token (logout)
removeAuthToken()
```

## Security Features

### Password Security
- Passwords are hashed using bcrypt with 12 salt rounds
- Minimum password length: 6 characters
- Passwords are never stored in plain text

### Token Security
- JWT tokens expire after 7 days
- Tokens are signed with NEXTAUTH_SECRET
- Automatic token validation and cleanup

### Route Protection
- Middleware protects all `/dashboard` routes
- Automatic redirect to sign-in for unauthenticated users
- Session validation on both client and server side

## Environment Variables

Required environment variables for authentication:

```env
# Database
MONGODB_URI=your-mongodb-connection-string

# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

## Error Handling

### Common Error Messages
- "All fields are required" - Missing form data
- "Password must be at least 6 characters long" - Password validation
- "User with this email already exists" - Duplicate registration
- "Invalid email or password" - Login failure
- "This account was created with OAuth" - Wrong auth method

### Error Response Format
```javascript
{
  error: "Error message",
  status: 400
}
```

## Testing Authentication

### 1. OAuth Testing
- Use test Google/GitHub accounts
- Ensure OAuth apps are configured correctly
- Test callback URLs

### 2. Email/Password Testing
- Test registration with valid/invalid data
- Test login with correct/incorrect credentials
- Test password validation rules

### 3. Integration Testing
- Test protected route access
- Test logout functionality
- Test session persistence

## Troubleshooting

### Common Issues

1. **OAuth not working**
   - Check environment variables
   - Verify OAuth app configuration
   - Check callback URLs

2. **Email auth not working**
   - Check database connection
   - Verify bcrypt installation
   - Check JWT secret configuration

3. **Session not persisting**
   - Check NEXTAUTH_SECRET
   - Verify cookie settings
   - Check browser storage

### Debug Mode
Enable debug logging by setting:
```env
NEXTAUTH_DEBUG=true
```

## Best Practices

1. **Always validate input** on both client and server
2. **Use HTTPS** in production
3. **Implement rate limiting** for auth endpoints
4. **Log authentication events** for security monitoring
5. **Regular security audits** of authentication flow
6. **Keep dependencies updated** for security patches

## Future Enhancements

1. **Two-factor authentication** (2FA)
2. **Password reset functionality**
3. **Email verification**
4. **Social login providers** (Facebook, Twitter)
5. **Role-based access control** (RBAC)
6. **Session management dashboard** 
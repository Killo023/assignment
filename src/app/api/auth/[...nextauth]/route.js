import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import dbConnect from '../../../../lib/db'
import User from '../../../../models/User'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'mock-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock-client-secret',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || 'mock-client-id',
      clientSecret: process.env.GITHUB_SECRET || 'mock-client-secret',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email@example.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials.email.toLowerCase() });
        if (!user || !user.password) {
          throw new Error('Invalid email or password');
        }
        const bcrypt = require('bcryptjs');
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid email or password');
        }
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          subscription: user.subscription,
          trialEndDate: user.trialEndDate,
          assignmentsUsed: user.assignmentsUsed,
          assignmentsLimit: user.assignmentsLimit == null ? 1 : user.assignmentsLimit
        };
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('DEBUG: signIn callback called for', user.email);
      try {
        await dbConnect();
        let existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          // Create new user
          const now = new Date();
          const trialEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
          let userData = {
            email: user.email,
            name: user.name,
            image: user.image,
            subscription: 'trial',
            trialEndDate: trialEnd,
            role: user.role || 'student'
          };
          if (userData.role === 'admin' || userData.role === 'professor') {
            userData.institutionSubscription = 'trial';
            userData.institutionTrialEndDate = trialEnd;
          }
          const newUser = new User(userData);
          await newUser.save();
          console.log('DEBUG: New user created with trial:', user.email);
        } else {
          // Update existing user to grant trial if missing or expired
          const now = new Date();
          if (!existingUser.trialEndDate || !existingUser.subscription || (existingUser.subscription !== 'trial' && existingUser.subscription !== 'premium') || new Date(existingUser.trialEndDate) < now) {
            const trialEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
            existingUser.subscription = 'trial';
            existingUser.trialEndDate = trialEnd;
            await existingUser.save();
            console.log('DEBUG: Existing user granted trial:', user.email);
          } else {
            console.log('DEBUG: User already exists and has valid trial or premium:', user.email);
          }
        }
        return true;
      } catch (error) {
        console.error('Sign in error:', error);
        return true; // Allow sign-in even if there's an error
      }
    },
    async jwt({ token, user }) {
      // Persist custom user fields to the token for credentials provider
      if (user) {
        token.id = user.id || user._id || token.id;
        token.role = user.role;
        token.subscription = user.subscription;
        token.trialEndDate = user.trialEndDate;
        token.assignmentsUsed = user.assignmentsUsed;
        token.assignmentsLimit = user.assignmentsLimit;
      }
      return token;
    },
    async session({ session, token }) {
      try {
        console.log('DEBUG: session callback token:', token)
        console.log('DEBUG: session callback session.user before:', session.user)
        // For development, add mock user data
        if (process.env.NODE_ENV === 'development' && !process.env.MONGODB_URI) {
          session.user.id = 'mock-user-id'
          session.user.subscription = 'free'
          session.user.assignmentsUsed = 0
          session.user.assignmentsLimit = 1 // Ensure at least 1 for free users
          return session
        }
        // If token has user info (credentials login), use it
        if (token && token.role) {
          session.user.id = token.id || token.userId || session.user.id
          session.user.role = token.role
          session.user.subscription = token.subscription
          session.user.trialEndDate = token.trialEndDate
          session.user.assignmentsUsed = token.assignmentsUsed
          session.user.assignmentsLimit = token.assignmentsLimit
        } else {
          await dbConnect()
          const user = await User.findOne({ email: session.user.email })
          if (user) {
            session.user.id = user._id.toString()
            session.user.subscription = user.subscription
            session.user.trialEndDate = user.trialEndDate // Ensure trialEndDate is included
            session.user.institutionTrialEndDate = user.institutionTrialEndDate // For institution users
            session.user.assignmentsUsed = user.assignmentsUsed
            session.user.assignmentsLimit = (user.assignmentsLimit == null ? 1 : user.assignmentsLimit)
            session.user.role = user.role // <-- Add this line
          }
        }
        console.log('DEBUG: session callback session.user after:', session.user)
        return session
      } catch (error) {
        console.error('Session error:', error)
        return session
      }
    },
    async redirect({ url, baseUrl, user }) {
      // If user is available, check role for redirect
      if (user && (user.role === 'admin' || user.role === 'professor')) {
        return baseUrl + '/dashboard/institution';
      }
      // Default: go to dashboard
      return baseUrl + '/dashboard';
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-here',
})

export const authOptions = handler.authOptions || handler.options || {};

export { handler as GET, handler as POST } 
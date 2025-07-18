import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import dbConnect from './db'
import User from '../models/User'

export const authOptions = {
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
          assignmentsUsed: user.assignmentsUsed,
          assignmentsLimit: user.assignmentsLimit == null ? 1 : user.assignmentsLimit
        };
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('DEBUG: signIn callback called for', user.email, 'with account:', account?.provider);
      try {
        console.log('DEBUG: Connecting to database in signIn...');
        await dbConnect();
        console.log('DEBUG: Database connected, searching for existing user...');
        
        let existingUser = await User.findOne({ email: user.email });
        console.log('DEBUG: Existing user search result:', existingUser ? 'Found' : 'Not found');
        
        if (!existingUser) {
          // Create new user
          console.log('DEBUG: Creating new user...');
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
          console.log('DEBUG: User data to save:', userData);
          
          const newUser = new User(userData);
          const savedUser = await newUser.save();
          console.log('DEBUG: New user created successfully:', {
            id: savedUser._id,
            email: savedUser.email,
            subscription: savedUser.subscription,
            trialEndDate: savedUser.trialEndDate
          });
        } else {
          console.log('DEBUG: Existing user found:', {
            id: existingUser._id,
            email: existingUser.email,
            subscription: existingUser.subscription,
            trialEndDate: existingUser.trialEndDate
          });
          
          // Update existing user to grant trial if missing or expired
          const now = new Date();
          if (!existingUser.trialEndDate || !existingUser.subscription || (existingUser.subscription !== 'trial' && existingUser.subscription !== 'premium') || new Date(existingUser.trialEndDate) < now) {
            console.log('DEBUG: Updating existing user with new trial...');
            const trialEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
            existingUser.subscription = 'trial';
            existingUser.trialEndDate = trialEnd;
            const updatedUser = await existingUser.save();
            console.log('DEBUG: Existing user updated with trial:', {
              id: updatedUser._id,
              email: updatedUser.email,
              subscription: updatedUser.subscription,
              trialEndDate: updatedUser.trialEndDate
            });
          } else {
            console.log('DEBUG: User already has valid trial or premium, no update needed');
          }
        }
        return true;
      } catch (error) {
        console.error('Sign in error:', error);
        console.error('Sign in error stack:', error.stack);
        return true; // Allow sign-in even if there's an error
      }
    },
    async jwt({ token, user }) {
      // Persist custom user fields to the token for credentials provider
      if (user) {
        token.id = user.id || user._id || token.id;
        token.role = user.role;
        token.subscription = user.subscription;
        token.assignmentsUsed = user.assignmentsUsed;
        token.assignmentsLimit = user.assignmentsLimit;
      }
      return token;
    },
    async session({ session, token }) {
      try {
        console.log('DEBUG: session callback started')
        console.log('DEBUG: session.user.email:', session?.user?.email)
        console.log('DEBUG: token:', token)
        
        if (!session?.user?.email) {
          console.log('DEBUG: No user email in session, returning session as-is')
          return session
        }
        
        // Always load real user data from database
        console.log('DEBUG: Connecting to database...')
        await dbConnect()
        console.log('DEBUG: Database connected, searching for user...')
        
        const user = await User.findOne({ email: session.user.email })
        console.log('DEBUG: Database query result:', user ? 'User found' : 'User not found')
        
        if (user) {
          console.log('DEBUG: Found user in database:', { 
            email: user.email, 
            subscription: user.subscription, 
            trialEndDate: user.trialEndDate,
            role: user.role,
            _id: user._id
          })
          
          session.user.id = user._id.toString()
          session.user.subscription = user.subscription
          session.user.trialEndDate = user.trialEndDate
          session.user.institutionSubscription = user.institutionSubscription
          session.user.institutionTrialEndDate = user.institutionTrialEndDate
          session.user.assignmentsUsed = user.assignmentsUsed
          session.user.assignmentsLimit = (user.assignmentsLimit == null ? 1 : user.assignmentsLimit)
          session.user.role = user.role
          
          console.log('DEBUG: Updated session.user:', session.user)
        } else {
          console.log('DEBUG: No user found in database for email:', session.user.email)
          // Try to find all users to debug
          const allUsers = await User.find({}).limit(5)
          console.log('DEBUG: Sample users in database:', allUsers.map(u => ({ email: u.email, subscription: u.subscription })))
        }
        
        console.log('DEBUG: Final session.user:', session.user)
        return session
      } catch (error) {
        console.error('Session callback error:', error)
        console.error('Error stack:', error.stack)
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
} 
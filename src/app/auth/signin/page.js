'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Github, 
  ArrowLeft,
  Lock,
  Shield,
  AlertCircle,
  Mail
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function SignIn() {
  const [loadingProvider, setLoadingProvider] = useState('')
  const [error, setError] = useState('')

  const handleSignIn = (provider) => {
    setError('')
    setLoadingProvider(provider)
    // Use default redirect behavior for NextAuth
    signIn(provider, { callbackUrl: '/dashboard' })
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            
            <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2">Welcome to AssignmentAI</h1>
            <p className="text-gray-400">Sign in to access your dashboard</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Sign In Options */}
          <div className="space-y-4">
            <button
              onClick={() => handleSignIn('google')}
              disabled={!!loadingProvider}
              className="w-full btn-primary flex items-center justify-center"
            >
              {loadingProvider === 'google' ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <div className="w-5 h-5 mr-3 relative">
                    <Image
                      src="/google.svg"
                      alt="Google"
                      width={20}
                      height={20}
                      priority
                    />
                  </div>
                  Continue with Google
                </>
              )}
            </button>

            <button
              onClick={() => handleSignIn('github')}
              disabled={!!loadingProvider}
              className="w-full btn-secondary flex items-center justify-center"
            >
              {loadingProvider === 'github' ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Github className="w-5 h-5 mr-3" />
                  Continue with GitHub
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">Or sign in with email</span>
            </div>
          </div>

          {/* Email Sign In Option */}
          <Link 
            href="/auth/signin-email" 
            className="w-full btn-secondary flex items-center justify-center"
          >
            <Mail className="w-5 h-5 mr-3" />
            Sign in with Email
          </Link>

          {/* Info Section */}
          <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-blue-400 mb-1">Secure Authentication</h3>
                <p className="text-xs text-blue-300">
                  Your account is protected with industry-standard OAuth 2.0 security protocols. We only request essential profile information needed for account creation.
                </p>
              </div>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-primary-400 hover:text-primary-300 font-medium">
                Sign up here
              </Link>
            </p>
          </div>

          {/* Terms */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{' '}
              <Link href="/terms" className="text-primary-400 hover:text-primary-300">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-primary-400 hover:text-primary-300">
                Privacy Policy
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 
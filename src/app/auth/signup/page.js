'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Mail, Lock, User, School, Github } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('student')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingProvider, setLoadingProvider] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, role }),
      })
      const data = await res.json()
      if (res.ok) {
        setSuccess('Account created! Please sign in.')
        setEmail('')
        setPassword('')
        setName('')
        setRole('student')
      } else {
        setError(data.message || 'Registration failed')
      }
    } catch (err) {
      setError('Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const handleSocialSignUp = (provider) => {
    setLoadingProvider(provider)
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
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-4">
              <User className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Create Your Account</h1>
            <p className="text-gray-400">Sign up as a student or institution admin/professor</p>
          </div>
          {/* Social Sign Up Buttons */}
          <div className="space-y-4 mb-6">
            <button
              onClick={() => handleSocialSignUp('google')}
              disabled={!!loadingProvider}
              className="w-full btn-primary flex items-center justify-center"
            >
              {loadingProvider === 'google' ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <div className="w-5 h-5 mr-3 relative">
                    <Image src="/google.svg" alt="Google" width={20} height={20} priority />
                  </div>
                  Continue with Google
                </>
              )}
            </button>
            <button
              onClick={() => handleSocialSignUp('github')}
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
              <span className="px-2 bg-gray-900 text-gray-400">Or sign up with email</span>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              className="input-field w-full"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <input
              type="email"
              className="input-field w-full"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="input-field w-full"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <div className="mb-2">
              <label className="block text-gray-300 font-semibold mb-2">Account Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={role === 'student'}
                    onChange={() => setRole('student')}
                    className="accent-blue-500"
                  />
                  <span>Student</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="professor"
                    checked={role === 'professor'}
                    onChange={() => setRole('professor')}
                    className="accent-blue-500"
                  />
                  <span>Institution (Admin/Professor)</span>
                </label>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Students get access to assignment help. Institution accounts can manage classes, assignments, and analytics.
              </div>
            </div>
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
            {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
            {success && <div className="text-green-400 text-sm mt-2">{success}</div>}
          </form>
          <div className="text-center mt-6 text-gray-400">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-blue-400 hover:underline">Sign In</Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 
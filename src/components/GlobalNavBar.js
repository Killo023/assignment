'use client'

import Link from 'next/link'
import { Brain, Menu, X, User, CreditCard, Settings, ChevronDown, Crown, GraduationCap, Shield } from 'lucide-react'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'

export default function GlobalNavBar() {
  const { data: session, status } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)

  const isAuthenticated = status === 'authenticated'

  // Function to get role icon and styling
  const getRoleDisplay = (role) => {
    switch (role) {
      case 'admin':
        return {
          icon: Crown,
          text: 'Admin',
          color: 'text-purple-400',
          bgColor: 'bg-purple-900/20',
          borderColor: 'border-purple-600'
        }
      case 'professor':
        return {
          icon: GraduationCap,
          text: 'Professor',
          color: 'text-blue-400',
          bgColor: 'bg-blue-900/20',
          borderColor: 'border-blue-600'
        }
      case 'student':
        return {
          icon: Shield,
          text: 'Student',
          color: 'text-green-400',
          bgColor: 'bg-green-900/20',
          borderColor: 'border-green-600'
        }
      default:
        return {
          icon: User,
          text: 'User',
          color: 'text-gray-400',
          bgColor: 'bg-gray-900/20',
          borderColor: 'border-gray-600'
        }
    }
  }

  const roleDisplay = session?.user?.role ? getRoleDisplay(session.user.role) : null
  const RoleIcon = roleDisplay?.icon || User

  // Function to handle sign out
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
    setAccountMenuOpen(false)
    setMobileMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center mr-3">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <Link href="/" className="text-2xl font-bold gradient-text">
              AssignmentAI
            </Link>
          </div>
          
          {/* Center - Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
          </div>
          
          {/* Right side - User section */}
          <div className="flex items-center space-x-4">
            {/* Role Display - Desktop */}
            {isAuthenticated && roleDisplay && (
              <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full border text-sm font-medium">
                <RoleIcon className={`w-4 h-4 ${roleDisplay.color}`} />
                <span className={roleDisplay.color}>{roleDisplay.text}</span>
              </div>
            )}
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link href={session?.user?.role === 'student' ? "/dashboard" : "/dashboard/institution"} className="btn-primary">
                    Dashboard
                  </Link>
                  {/* Account Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span className="max-w-32 truncate">{session?.user?.name || session?.user?.email}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {accountMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2">
                        <Link
                          href="/account"
                          className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
                          onClick={() => setAccountMenuOpen(false)}
                        >
                          <User className="w-4 h-4 mr-3" />
                          Account
                        </Link>
                        <Link
                          href="/billing"
                          className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
                          onClick={() => setAccountMenuOpen(false)}
                        >
                          <CreditCard className="w-4 h-4 mr-3" />
                          Billing & Subscription
                        </Link>
                        <div className="border-t border-gray-700 my-1"></div>
                        <button
                          onClick={handleSignOut}
                          className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
                        >
                          <Settings className="w-4 h-4 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link href="/auth/signin" className="text-gray-300 hover:text-white transition-colors">
                    Sign In
                  </Link>
                  <Link href="/auth/signup" className="btn-primary">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/95 rounded-lg mt-4">
              {/* Role Display - Mobile */}
              {isAuthenticated && roleDisplay && (
                <div className="flex items-center space-x-2 px-3 py-2 rounded-lg border text-sm font-medium mb-2">
                  <RoleIcon className={`w-4 h-4 ${roleDisplay.color}`} />
                  <span className={roleDisplay.color}>{roleDisplay.text}</span>
                </div>
              )}
              
              <Link 
                href="/" 
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                href="/contact" 
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                href="/pricing" 
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              {isAuthenticated ? (
                <>
                  <Link 
                    href={session?.user?.role === 'student' ? "/dashboard" : "/dashboard/institution"}
                    className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/account" 
                    className="flex items-center px-3 py-2 text-gray-300 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-4 h-4 mr-3" />
                    Account
                  </Link>
                  <Link 
                    href="/billing" 
                    className="flex items-center px-3 py-2 text-gray-300 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <CreditCard className="w-4 h-4 mr-3" />
                    Billing & Subscription
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/auth/signin" 
                    className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/auth/signup" 
                    className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 
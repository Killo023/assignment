'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { getCurrentUser, isAuthenticated, logout } from '../lib/auth'

export const useAuth = () => {
  const { data: session, status } = useSession()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      // Check NextAuth session first
      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
          subscription: session.user.subscription,
          assignmentsUsed: session.user.assignmentsUsed,
          assignmentsLimit: session.user.assignmentsLimit,
          authType: 'oauth'
        })
        setLoading(false)
        return
      }

      // Check custom JWT token if no NextAuth session
      if (status === 'unauthenticated') {
        const customUser = getCurrentUser()
        if (customUser) {
          setUser({
            id: customUser.userId,
            email: customUser.email,
            name: customUser.name,
            authType: 'email'
          })
        }
        setLoading(false)
      }
    }

    checkAuth()
  }, [session, status])

  const signOut = () => {
    if (user?.authType === 'email') {
      logout()
    } else {
      // NextAuth signOut
      window.location.href = '/api/auth/signout'
    }
  }

  return {
    user,
    loading,
    isAuthenticated: !!user,
    signOut
  }
} 
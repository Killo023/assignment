import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import jwt from 'jsonwebtoken'

export async function middleware(request) {
  const { pathname } = request.nextUrl

  // Protected routes that require authentication
  const protectedRoutes = ['/dashboard']
  
  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtectedRoute) {
    // Check for NextAuth session
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    })

    // Check for custom JWT token in headers (for email/password auth)
    const authHeader = request.headers.get('authorization')
    const customToken = authHeader?.replace('Bearer ', '')

    // Check for custom JWT token in cookies (for email/password auth)
    const cookieToken = request.cookies.get('authToken')?.value
    let validCookieToken = false
    if (cookieToken) {
      try {
        jwt.verify(cookieToken, process.env.NEXTAUTH_SECRET || 'your-secret-key-here')
        validCookieToken = true
      } catch (e) {
        validCookieToken = false
      }
    }

    // If no valid token found, redirect to signin
    if (!token && !customToken && !validCookieToken) {
      const signinUrl = new URL('/auth/signin', request.url)
      signinUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(signinUrl)
    }
  }

  // Auth routes - redirect to dashboard if already authenticated
  const authRoutes = ['/auth/signin', '/auth/signup', '/auth/signin-email']
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  if (isAuthRoute) {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    })

    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/:path*'
  ]
} 
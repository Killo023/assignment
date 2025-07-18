import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth-config'
import dbConnect from '../../../lib/db'
import User from '../../../models/User'

export async function GET() {
  try {
    console.log('DEBUG SESSION API: Starting...')
    
    // Test 1: Get session
    const session = await getServerSession(authOptions)
    console.log('DEBUG SESSION API: Raw session:', JSON.stringify(session, null, 2))
    
    if (!session?.user?.email) {
      return NextResponse.json({ 
        error: 'No session or email found',
        session: session
      }, { status: 401 })
    }
    
    // Test 2: Database connection
    console.log('DEBUG SESSION API: Connecting to database...')
    await dbConnect()
    console.log('DEBUG SESSION API: Database connected successfully')
    
    // Test 3: Find user
    console.log('DEBUG SESSION API: Looking for user with email:', session.user.email)
    const user = await User.findOne({ email: session.user.email })
    console.log('DEBUG SESSION API: User query result:', user)
    
    if (!user) {
      // Test 4: List all users
      console.log('DEBUG SESSION API: User not found, listing all users...')
      const allUsers = await User.find({}).limit(10)
      console.log('DEBUG SESSION API: All users in database:', allUsers.map(u => ({ 
        email: u.email, 
        subscription: u.subscription,
        trialEndDate: u.trialEndDate,
        role: u.role 
      })))
      
      return NextResponse.json({
        error: 'User not found in database',
        searchedEmail: session.user.email,
        allUsers: allUsers.map(u => ({ email: u.email, subscription: u.subscription })),
        sessionUser: session.user
      }, { status: 404 })
    }
    
    // Test 5: Return user data
    console.log('DEBUG SESSION API: User found successfully')
    return NextResponse.json({
      success: true,
      sessionEmail: session.user.email,
      userFromDB: {
        id: user._id,
        email: user.email,
        subscription: user.subscription,
        trialEndDate: user.trialEndDate,
        role: user.role,
        assignmentsUsed: user.assignmentsUsed,
        assignmentsLimit: user.assignmentsLimit
      },
      sessionUser: session.user
    })
    
  } catch (error) {
    console.error('DEBUG SESSION API: Error:', error)
    console.error('DEBUG SESSION API: Error stack:', error.stack)
    return NextResponse.json({
      error: 'Internal server error',
      message: error.message,
      stack: error.stack
    }, { status: 500 })
  }
} 
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import dbConnect from '../../../lib/db'
import User from '../../../models/User'
import Assignment from '../../../models/Assignment'

// Simple authOptions for this endpoint
const authOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-here',
};

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions)
    console.log('Assignments API - Session data:', session);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()
    
    const user = await User.findOne({ email: session.user.email })
    if (!user) {
      console.log('User not found for email:', session.user.email);
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Fetch user's assignments, sorted by creation date (newest first)
    const assignments = await Assignment.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json({ assignments })

  } catch (error) {
    console.error('Fetch assignments error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 
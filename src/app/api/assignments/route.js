import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import dbConnect from '../../../lib/db'
import User from '../../../models/User'
import Assignment from '../../../models/Assignment'

export async function GET(request) {
  try {
    const session = await getServerSession()
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    console.log('Session email:', session?.user?.email);

    await dbConnect()

    const allUsers = await User.find({});
    console.log('All user emails:', allUsers.map(u => u.email));
    
    const user = await User.findOne({ email: session.user.email })
    if (!user) {
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
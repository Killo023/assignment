import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import dbConnect from '../../../lib/db.js';
import User from '../../../models/User.js';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await dbConnect();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }
    return Response.json({
      email: user.email,
      role: user.role,
      subscription: user.subscription,
      institutionSubscription: user.institutionSubscription,
      paypalSubscriptionId: user.paypalSubscriptionId,
      trialEndDate: user.trialEndDate,
      institutionTrialEndDate: user.institutionTrialEndDate
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()
    
    // Find the current user
    const user = await User.findOne({ email: session.user.email })
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Update user role to professor
    user.role = 'professor'
    await user.save()

    console.log('DEBUG: User role updated to professor:', user.email)

    return NextResponse.json({ 
      success: true, 
      message: 'Role updated to professor successfully',
      user: {
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    console.error('Role update error:', error)
    return NextResponse.json({ error: 'Failed to update role' }, { status: 500 })
  }
} 
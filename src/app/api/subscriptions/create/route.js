import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'
import dbConnect from '../../../../lib/db'
import User from '../../../../models/User'

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { planType, paypalSubscriptionId } = await request.json()
    
    if (!planType || !['premium', 'institution'].includes(planType)) {
      return NextResponse.json({ error: 'Invalid plan type' }, { status: 400 })
    }

    // Always get the latest user from DB
    await dbConnect()
    const user = await User.findOne({ email: session.user.email })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    const userRole = user.role
    if (planType === 'institution' && userRole !== 'admin' && userRole !== 'professor') {
      return NextResponse.json({ error: 'Institution plan is only available to administrators and professors' }, { status: 403 })
    }
    if (planType === 'premium' && userRole !== 'student') {
      return NextResponse.json({ error: 'Student plan is only available to students' }, { status: 403 })
    }

    // Update user subscription based on plan type
    const trialEndDate = new Date()
    trialEndDate.setDate(trialEndDate.getDate() + 7) // 7-day trial
    
    if (planType === 'premium') {
      user.subscription = 'trial'
      user.assignmentsLimit = 999999 // Unlimited for premium
      user.trialEndDate = trialEndDate
      if (paypalSubscriptionId) {
        user.paypalSubscriptionId = paypalSubscriptionId
      }
    } else if (planType === 'institution') {
      if (paypalSubscriptionId) {
        user.institutionSubscription = 'premium'
        user.institutionTrialEndDate = null
        user.paypalSubscriptionId = paypalSubscriptionId
      } else {
        user.institutionSubscription = 'trial'
        user.institutionTrialEndDate = trialEndDate
      }
    }

    await user.save()

    return NextResponse.json({ 
      success: true, 
      message: `${planType} subscription activated successfully` 
    })

  } catch (error) {
    console.error('Subscription creation error:', error)
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 })
  }
} 
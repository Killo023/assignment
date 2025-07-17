import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import dbConnect from '../../../../lib/db'
import User from '../../../../models/User'

export async function GET(request) {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()
    
    const user = await User.findOne({ email: session.user.email })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get subscription details
    const subscriptionInfo = {
      currentPlan: user.subscription || 'free',
      assignmentsUsed: user.assignmentsUsed || 0,
      assignmentsLimit: user.assignmentsLimit || 1,
      paypalSubscriptionId: user.paypalSubscriptionId,
      subscriptionCancelledAt: user.subscriptionCancelledAt,
      trialEndDate: user.trialEndDate,
      createdAt: user.createdAt,
      role: user.role
    }

    // If user has PayPal subscription, get additional details
    if (user.paypalSubscriptionId && user.subscription !== 'free') {
      try {
        const paypalResponse = await fetch(`https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${user.paypalSubscriptionId}`, {
          headers: {
            'Authorization': `Bearer ${await getPayPalAccessToken()}`,
            'Content-Type': 'application/json'
          }
        })

        if (paypalResponse.ok) {
          const paypalData = await paypalResponse.json()
          subscriptionInfo.paypalDetails = {
            status: paypalData.status,
            nextBillingTime: paypalData.billing_info?.next_billing_time,
            cycleExecutions: paypalData.billing_info?.cycle_executions,
            startTime: paypalData.start_time
          }
        }
      } catch (error) {
        console.error('PayPal API error:', error)
        // Continue without PayPal details if API fails
      }
    }

    return NextResponse.json(subscriptionInfo)

  } catch (error) {
    console.error('Get subscription status error:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}

// Helper function to get PayPal access token
async function getPayPalAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64')

  const response = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  })

  if (!response.ok) {
    throw new Error('Failed to get PayPal access token')
  }

  const data = await response.json()
  return data.access_token
} 
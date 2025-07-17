import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import dbConnect from '../../../../lib/db'
import User from '../../../../models/User'

export async function POST(request) {
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

    // Check if user has an active subscription
    if (!user.subscription || user.subscription === 'free') {
      return NextResponse.json({ error: 'No active subscription to cancel' }, { status: 400 })
    }

    // If user has PayPal subscription ID, cancel it via PayPal API
    if (user.paypalSubscriptionId) {
      try {
        const paypalResponse = await fetch(`https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${user.paypalSubscriptionId}/cancel`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${await getPayPalAccessToken()}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          },
          body: JSON.stringify({
            reason: 'User requested cancellation'
          })
        })

        if (!paypalResponse.ok) {
          console.error('PayPal cancellation failed:', await paypalResponse.text())
          return NextResponse.json({ 
            error: 'Failed to cancel subscription with payment provider. Please contact support.' 
          }, { status: 500 })
        }
      } catch (error) {
        console.error('PayPal API error:', error)
        return NextResponse.json({ 
          error: 'Failed to cancel subscription with payment provider. Please contact support.' 
        }, { status: 500 })
      }
    }

    // Update user subscription status
    user.subscription = 'cancelled'
    user.subscriptionCancelledAt = new Date()
    user.assignmentsLimit = 1 // Reset to free tier limit
    await user.save()

    return NextResponse.json({ 
      message: 'Subscription cancelled successfully',
      subscription: 'cancelled'
    })

  } catch (error) {
    console.error('Cancel subscription error:', error)
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
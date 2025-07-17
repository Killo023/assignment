import { NextResponse } from 'next/server'
import dbConnect from '../../../../lib/db'
import User from '../../../../models/User'

export async function POST(request) {
  try {
    const body = await request.json()
    
    // Verify PayPal webhook signature (in production, you should verify the webhook)
    // For now, we'll process the webhook directly
    
    const { event_type, resource } = body
    
    await dbConnect()
    
    switch (event_type) {
      case 'BILLING.SUBSCRIPTION.ACTIVATED':
        await handleSubscriptionActivated(resource)
        break
      
      case 'BILLING.SUBSCRIPTION.CANCELLED':
        await handleSubscriptionCancelled(resource)
        break
      
      case 'BILLING.SUBSCRIPTION.EXPIRED':
        await handleSubscriptionExpired(resource)
        break
      
      case 'BILLING.SUBSCRIPTION.SUSPENDED':
        await handleSubscriptionSuspended(resource)
        break
      
      default:
        console.log('Unhandled PayPal webhook event:', event_type)
    }
    
    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error('PayPal webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

async function handleSubscriptionActivated(resource) {
  try {
    const { id: subscriptionId, subscriber } = resource
    console.log('PayPal Webhook: ACTIVATED for', subscriber.email_address, 'subscriptionId:', subscriptionId)
    // Find user by email
    const user = await User.findOne({ email: subscriber.email_address })
    if (user) {
      console.log('PayPal Webhook: Found user', user.email, 'role:', user.role)
      user.subscription = 'premium'
      user.paypalSubscriptionId = subscriptionId
      user.assignmentsLimit = 999999 // Unlimited for premium
      // Set institutionSubscription for admin/professor
      if (user.role === 'admin' || user.role === 'professor') {
        user.institutionSubscription = 'premium'
        user.institutionTrialEndDate = null
        console.log('PayPal Webhook: Upgraded institutionSubscription for', user.email)
      }
      await user.save()
      console.log(`User ${user.email} upgraded to premium`)
    } else {
      console.log('PayPal Webhook: No user found for', subscriber.email_address)
    }
  } catch (error) {
    console.error('Error handling subscription activation:', error)
  }
}

async function handleSubscriptionCancelled(resource) {
  try {
    const { id: subscriptionId } = resource
    
    // Find user by subscription ID
    const user = await User.findOne({ paypalSubscriptionId: subscriptionId })
    
    if (user) {
      user.subscription = 'free'
      user.paypalSubscriptionId = null
      user.assignmentsLimit = 3 // Reset to free tier
      await user.save()
      
      console.log(`User ${user.email} subscription cancelled`)
    }
  } catch (error) {
    console.error('Error handling subscription cancellation:', error)
  }
}

async function handleSubscriptionExpired(resource) {
  try {
    const { id: subscriptionId } = resource
    
    // Find user by subscription ID
    const user = await User.findOne({ paypalSubscriptionId: subscriptionId })
    
    if (user) {
      user.subscription = 'free'
      user.paypalSubscriptionId = null
      user.assignmentsLimit = 3 // Reset to free tier
      await user.save()
      
      console.log(`User ${user.email} subscription expired`)
    }
  } catch (error) {
    console.error('Error handling subscription expiration:', error)
  }
}

async function handleSubscriptionSuspended(resource) {
  try {
    const { id: subscriptionId } = resource
    
    // Find user by subscription ID
    const user = await User.findOne({ paypalSubscriptionId: subscriptionId })
    
    if (user) {
      user.subscription = 'free'
      user.paypalSubscriptionId = null
      user.assignmentsLimit = 3 // Reset to free tier
      await user.save()
      
      console.log(`User ${user.email} subscription suspended`)
    }
  } catch (error) {
    console.error('Error handling subscription suspension:', error)
  }
} 
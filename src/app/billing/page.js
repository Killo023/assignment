'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Calendar, Download, ArrowLeft, CheckCircle, AlertCircle, X } from 'lucide-react'
import Link from 'next/link'

export default function BillingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [billingHistory, setBillingHistory] = useState([])
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)
  const [subscriptionData, setSubscriptionData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
    } else {
      fetchSubscriptionData()
    }
  }, [session, status, router])

  const fetchSubscriptionData = async () => {
    try {
      const response = await fetch('/api/billing/subscription-status')
      if (response.ok) {
        const data = await response.json()
        setSubscriptionData(data)
      } else {
        console.error('Failed to fetch subscription data')
      }
    } catch (error) {
      console.error('Error fetching subscription data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelSubscription = async () => {
    setIsCancelling(true)
    try {
      const response = await fetch('/api/billing/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      const data = await response.json()
      
      if (response.ok) {
        alert('Subscription cancelled successfully. You will continue to have access until the end of your current billing period.')
        // Refresh subscription data
        await fetchSubscriptionData()
      } else {
        alert(data.error || 'Failed to cancel subscription. Please try again or contact support.')
      }
      setShowCancelModal(false)
    } catch (error) {
      console.error('Error cancelling subscription:', error)
      alert('Failed to cancel subscription. Please try again or contact support.')
    } finally {
      setIsCancelling(false)
    }
  }

  // Mock billing history data
  useEffect(() => {
    setBillingHistory([
      {
        id: 1,
        date: '2024-01-15',
        amount: 29.99,
        status: 'paid',
        description: 'Premium Plan - Monthly'
      },
      {
        id: 2,
        date: '2023-12-15',
        amount: 29.99,
        status: 'paid',
        description: 'Premium Plan - Monthly'
      }
    ]  )
  }, [])

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) return null

  const currentPlan = subscriptionData?.currentPlan || 'free'
  const assignmentsUsed = subscriptionData?.assignmentsUsed || 0
  const assignmentsLimit = subscriptionData?.assignmentsLimit || 1
  const isCancelled = subscriptionData?.currentPlan === 'cancelled'
  const cancelledAt = subscriptionData?.subscriptionCancelledAt
  const trialEndDate = subscriptionData?.trialEndDate
  const isTrial = currentPlan === 'trial'
  // Calculate trial days and hours remaining
  const getTrialTimeRemaining = () => {
    if (!trialEndDate) return { days: 0, hours: 0, expired: true }
    const now = new Date()
    const end = new Date(trialEndDate)
    const diffMs = end - now
    if (diffMs <= 0) return { days: 0, hours: 0, expired: true }
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    return { days: diffDays, hours: diffHours, expired: false, end }
  }
  const trialTime = getTrialTimeRemaining()
  
  // Determine plan label and period
  let planLabel = 'Free';
  let planPeriod = 'Forever';
  if (isTrial && !trialTime.expired) {
    planLabel = 'Trial';
    planPeriod = 'Trial period';
  } else if (isTrial && trialTime.expired) {
    planLabel = 'Trial expired';
    planPeriod = 'Upgrade required';
  } else if (isCancelled) {
    planLabel = 'Cancelled';
    planPeriod = 'Until period end';
  } else if (currentPlan === 'premium') {
    planLabel = 'Premium';
    planPeriod = 'per month';
  }
  
  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href={session?.user?.role === 'student' ? "/dashboard" : "/dashboard/institution"} className="flex items-center text-gray-400 hover:text-white mb-4 mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white">Billing & Subscription</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Subscription */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Current Subscription
              </h2>

              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                {/* Trial Status */}
                {isTrial && (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center text-green-400 mb-2">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          <span className="font-semibold">Free Trial Active</span>
                        </div>
                        <p className="text-green-300 text-sm">
                          {trialTime.expired
                            ? 'Trial expired. Please upgrade to continue.'
                            : `You have ${trialTime.days} day${trialTime.days !== 1 ? 's' : ''} and ${trialTime.hours} hour${trialTime.hours !== 1 ? 's' : ''} remaining in your free trial.`}
                        </p>
                        {trialEndDate && !trialTime.expired && (
                          <p className="text-green-200 text-xs mt-1">
                            Trial ends: {new Date(trialEndDate).toLocaleString()}
                          </p>
                        )}
                        {trialTime.expired && (
                          <Link href="/pricing" className="btn-primary mt-3 inline-block">Upgrade Now</Link>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-400">{trialTime.expired ? 0 : trialTime.days}</div>
                        <div className="text-xs text-green-300">days left</div>
                        {!trialTime.expired && (
                          <div className="text-xs text-green-300">({trialTime.hours}h left)</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {isCancelled && (
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-4">
                    <AlertCircle className="w-5 h-5 text-yellow-400 mb-2" />
                    <p className="text-yellow-400 text-sm">
                      Your subscription has been cancelled. You will continue to have access until the end of your current billing period.
                    </p>
                    {cancelledAt && (
                      <p className="text-yellow-300 text-xs mt-2">
                        Cancelled on: {new Date(cancelledAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                )}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white capitalize">
                      {planLabel} Plan
                    </h3>
                    <p className="text-gray-400">
                      {planLabel === 'Free' ? 'Basic access with limitations' : 
                       planLabel === 'Trial' ? 'Full access during trial period' :
                       planLabel === 'Trial expired' ? 'Trial expired. Please upgrade to continue.' :
                       planLabel === 'Cancelled' ? 'Access until end of billing period' : 'Full access to all features'}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {planLabel === 'Premium' ? '$19.99' : planLabel === 'Trial expired' ? '—' : 'Free'}
                    </div>
                    <div className="text-sm text-gray-400">
                      {planPeriod}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Assignments Used</span>
                    <span className="text-white font-semibold">
                      {assignmentsUsed} / {assignmentsLimit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Chat Prompts</span>
                    <span className="text-white font-semibold">
                      {session.user?.role === 'student' ? '10 free' : 'Unlimited'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">AI Grading</span>
                    <span className="text-white font-semibold">
                      {currentPlan === 'free' || isCancelled ? 'Limited' : 'Unlimited'}
                    </span>
                  </div>
                </div>

                {currentPlan === 'free' && !isCancelled && (
                  <div className="mt-6">
                    <Link href="/pricing" className="btn-primary">
                      Upgrade to Premium
                    </Link>
                  </div>
                )}
                {currentPlan !== 'free' && !isCancelled && (
                  <div className="mt-6">
                    <button
                      onClick={() => setShowCancelModal(true)}
                      className="btn-secondary text-red-400 hover:text-red-300 border-red-500 hover:border-red-400"
                    >
                      Cancel Subscription
                    </button>
                  </div>
                )}
                {isCancelled && (
                  <div className="mt-6">
                    <Link href="/pricing" className="btn-primary">
                      Reactivate Subscription
                    </Link>
                  </div>
                )}
              </div>

              {/* Billing History */}
              <h3 className="text-lg font-semibold text-white mb-4">Billing History</h3>
              <div className="space-y-3">
                {billingHistory.length > 0 ? (
                  billingHistory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {item.status === 'paid' ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-yellow-400" />
                          )}
                          <span className="text-white font-medium">{item.description}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">${item.amount}</div>
                        <div className="text-sm text-gray-400">{item.date}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                    <p>No billing history yet</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Payment Methods & Actions */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Payment Methods</h3>
              <div className="space-y-3">
                <button className="flex items-center w-full p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-left">
                  <CreditCard className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-gray-300">Add Payment Method</span>
                </button>
                <button className="flex items-center w-full p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-left">
                  <Calendar className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-gray-300">Update Billing Cycle</span>
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card mt-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/pricing"
                  className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <CreditCard className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-gray-300">View Plans</span>
                </Link>
                <button className="flex items-center w-full p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-left">
                  <Download className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-gray-300">Download Invoices</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Cancel Subscription Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Cancel Subscription</h3>
              <button
                onClick={() => setShowCancelModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-6">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
                <AlertCircle className="w-5 h-5 text-red-400 mb-2" />
                <p className="text-red-400 text-sm">
                  Are you sure you want to cancel your subscription?
                </p>
              </div>
              
              <div className="space-y-3 text-sm text-gray-300">
                <p><strong>What happens when you cancel:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>You'll continue to have access until the end of your current billing period</li>
                  <li>You'll lose access to premium features after that</li>
                  <li>Your data will be preserved but limited to free tier restrictions</li>
                  <li>You can reactivate your subscription at any time</li>
                </ul>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleCancelSubscription}
                disabled={isCancelling}
                className="flex-1 btn-secondary text-red-400 hover:text-red-300 border-red-500 hover:border-red-400 disabled:opacity-50"
              >
                {isCancelling ? 'Cancelling...' : 'Yes, Cancel Subscription'}
              </button>
              <button
                onClick={() => setShowCancelModal(false)}
                disabled={isCancelling}
                className="flex-1 btn-primary"
              >
                Keep Subscription
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
} 
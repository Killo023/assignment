'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { motion } from 'framer-motion'
import { 
  Check, 
  Star, 
  Zap, 
  Shield, 
  Clock,
  Users,
  Download,
  Share2
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function PricingPage() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState({})
  const [paypalLoaded, setPaypalLoaded] = useState(false)
  const paypalButtonRendered = useRef({})

  // Check if user can access institution plan
  const canAccessInstitutionPlan = session?.user?.role === 'admin' || session?.user?.role === 'professor'
  // Check if user can access student plan
  const canAccessStudentPlan = session?.user?.role === 'student'

  // PayPal plan IDs (you'll need to create these in your PayPal dashboard)
  const paypalPlans = {
    premium: 'P-7GV30049EJ916364FNB4US5A', // Student plan id
    institution: 'P-66C56760WD917472BNB4UUGA' // Institution plan id
  }

  // PayPal config checks
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const isPayPalConfigured = paypalClientId && paypalClientId !== 'test' &&
    paypalPlans.premium !== 'P-5ML4271244454362XMQIZHI' &&
    paypalPlans.institution !== 'P-5ML4271244454362XMQIZHI';

  useEffect(() => {
    // Load PayPal script
    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test'}&vault=true&intent=subscription`
    script.async = true
    script.onload = () => setPaypalLoaded(true)
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const plans = [
    {
      name: 'Premium',
      price: '$19.99',
      period: 'per month',
      originalPrice: '$29.99',
      trialDays: 7,
      description: 'Unlimited assignments with priority processing',
      features: [
        'Unlimited assignments',
        'Priority AI processing',
        'All file formats supported',
        'Priority email support',
        'Faster processing time',
        'Advanced analytics',
        'Custom formatting options',
        'Bulk processing',
        '7-day free trial',
        'Cancel anytime'
      ],
      popular: false,
      planType: 'premium',
      restricted: !canAccessStudentPlan // Only students can subscribe
    },
    {
      name: 'Institution',
      price: '$49.99',
      period: 'per month',
      originalPrice: '$149',
      trialDays: 7,
      description: 'Complete institution management with AI-powered tools',
      features: [
        'Unlimited classes and assignments',
        'AI-powered plagiarism detection',
        'Automated grading with custom rubrics',
        'Advanced analytics and reporting',
        'Student enrollment management',
        'Priority support and onboarding',
        'LMS integration capabilities',
        'Custom branding options',
        '7-day free trial',
        'Cancel anytime'
      ],
      popular: true,
      planType: 'institution',
      restricted: !canAccessInstitutionPlan // Only admins/professors can subscribe
    }
  ]

  const handleSubscribe = async (planType) => {
    if (!session) {
      toast.error('Please sign in to subscribe')
      return
    }

    // For now, use the direct subscription method (bypass PayPal for testing)
    setLoading(prev => ({ ...prev, [planType]: true }))

    try {
      const response = await fetch('/api/subscriptions/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planType }),
      })

      if (response.ok) {
        toast.success('Subscription activated successfully!')
        setTimeout(() => {
          window.location.reload();
        }, 1500)
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to activate subscription')
      }
    } catch (error) {
      console.error('Subscription error:', error)
      toast.error('Failed to process subscription')
    } finally {
      setLoading(prev => ({ ...prev, [planType]: false }))
    }
  }

  const createPayPalButton = (planType, planName) => {
    if (!paypalLoaded || !window.paypal) {
      return (
        <button
          disabled
          className="btn-primary w-full opacity-50 cursor-not-allowed"
        >
          Loading PayPal...
        </button>
      )
    }

    return window.paypal.Buttons({
      createSubscription: function(data, actions) {
        return actions.subscription.create({
          'plan_id': paypalPlans[planType]
        })
      },
      onApprove: async function(data, actions) {
        setLoading(prev => ({ ...prev, [planType]: true }))
        
        try {
          // Verify subscription with PayPal and update user
          const response = await fetch('/api/subscriptions/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              planType,
              paypalSubscriptionId: data.subscriptionID 
            }),
          })

          if (response.ok) {
            toast.success(`${planName} subscription activated successfully!`)
            setTimeout(() => {
              window.location.reload();
            }, 1500)
          } else {
            const error = await response.json()
            toast.error(error.error || 'Failed to activate subscription')
          }
        } catch (error) {
          console.error('Subscription error:', error)
          toast.error('Failed to process subscription')
        } finally {
          setLoading(prev => ({ ...prev, [planType]: false }))
        }
      },
      onError: function(err) {
        console.error('PayPal error:', err)
        toast.error('Payment failed. Please try again.')
        setLoading(prev => ({ ...prev, [planType]: false }))
      }
    }).render(`#paypal-button-${planType}`)
  }

  useEffect(() => {
    if (paypalLoaded && window.paypal) {
      // Render PayPal buttons for each plan only once
      plans.forEach(plan => {
        if (!plan.restricted && plan.planType !== 'free' && !paypalButtonRendered.current[plan.planType]) {
          window.paypal.Buttons({
            createSubscription: function(data, actions) {
              return actions.subscription.create({
                'plan_id': paypalPlans[plan.planType]
              })
            },
            onApprove: async function(data, actions) {
              setLoading(prev => ({ ...prev, [plan.planType]: true }))
              try {
                const response = await fetch('/api/subscriptions/create', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ 
                    planType: plan.planType,
                    paypalSubscriptionId: data.subscriptionID 
                  }),
                })
                if (response.ok) {
                  toast.success(`${plan.name} subscription activated successfully!`)
                  setTimeout(() => {
                    window.location.reload();
                  }, 1500)
                } else {
                  const error = await response.json()
                  toast.error(error.error || 'Failed to activate subscription')
                }
              } catch (error) {
                console.error('Subscription error:', error)
                toast.error('Failed to process subscription')
              } finally {
                setLoading(prev => ({ ...prev, [plan.planType]: false }))
              }
            },
            onError: function(err) {
              console.error('PayPal error:', err)
              toast.error('Payment failed. Please try again.')
              setLoading(prev => ({ ...prev, [plan.planType]: false }))
            }
          }).render(`#paypal-button-${plan.planType}`)
          paypalButtonRendered.current[plan.planType] = true
        }
      })
    }
  }, [paypalLoaded, plans])

  // Fallback for when PayPal is not configured
  const renderFallbackButton = (plan) => {
    if (!paypalLoaded || !process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID) {
      return (
        <button
          onClick={() => handleSubscribe(plan.planType)}
          disabled={loading[plan.planType]}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading[plan.planType] ? 'Activating...' : `Subscribe to ${plan.name}`}
        </button>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* PayPal Config Warning */}
      {!isPayPalConfigured && (
        <div className="bg-red-600 text-white text-center py-3 px-4 font-semibold">
          PayPal integration is not fully configured. Please set NEXT_PUBLIC_PAYPAL_CLIENT_ID and real PayPal plan IDs in your environment and code. The PayPal buttons will not work until this is done.
        </div>
      )}
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-6">
              Choose the perfect plan for your academic needs
            </p>
            
            {/* Trial Countdown */}
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4 max-w-md mx-auto">
              <div className="text-green-400 font-semibold mb-2">🎉 Limited Time Offer</div>
              <div className="text-white text-lg font-bold mb-1">7-Day Free Trial</div>
              <div className="text-gray-400 text-sm">Start your free trial today, no credit card required</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.filter(plan => {
            // Only show plans the user is eligible for, or show all if not logged in
            if (!session) return true
            if (plan.planType === 'premium' && !canAccessStudentPlan) return false
            if (plan.planType === 'institution' && !canAccessInstitutionPlan) return false
            return true
          }).map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`card relative ${plan.popular ? 'ring-2 ring-primary-500' : ''} ${plan.restricted ? 'opacity-60' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              {plan.restricted && (
                <div className="absolute -top-4 right-4">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Admin/Professor Only
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                
                {/* Trial Badge */}
                {plan.trialDays && (
                  <div className="mb-3">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {plan.trialDays}-Day Free Trial
                    </span>
                  </div>
                )}
                
                <div className="mb-4">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>
                  {plan.originalPrice && (
                    <div className="mt-1">
                      <span className="text-lg text-gray-500 line-through">{plan.originalPrice}</span>
                      <span className="text-green-400 ml-2 font-medium">Save {Math.round(((parseFloat(plan.originalPrice.replace('$', '')) - parseFloat(plan.price.replace('$', ''))) / parseFloat(plan.originalPrice.replace('$', ''))) * 100)}%</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-400">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                {plan.name === 'Free' ? (
                  <a
                    href="/dashboard"
                    className="btn-primary w-full"
                  >
                    Get Started Free
                  </a>
                ) : plan.restricted ? (
                  <div className="space-y-2">
                    <button
                      disabled
                      className="btn-primary w-full opacity-50 cursor-not-allowed"
                    >
                      Admin/Professor Only
                    </button>
                    <p className="text-xs text-gray-500">
                      Contact your institution administrator
                    </p>
                  </div>
                ) : !isPayPalConfigured ? (
                  <div className="space-y-2">
                    <button
                      disabled
                      className="btn-primary w-full opacity-50 cursor-not-allowed"
                    >
                      PayPal Not Configured
                    </button>
                    <p className="text-xs text-red-400">
                      Please contact the site administrator to enable payments.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* PayPal Button */}
                    <div id={`paypal-button-${plan.planType}`}></div>
                    {/* Fallback Button */}
                    {renderFallbackButton(plan)}
                    {/* Development Bypass Button */}
                    {process.env.NODE_ENV === 'development' && (
                      <button
                        onClick={() => handleSubscribe(plan.planType)}
                        disabled={loading[plan.planType]}
                        className="w-full bg-gray-600 hover:bg-gray-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors text-sm"
                      >
                        {loading[plan.planType] ? 'Activating...' : `Dev: Activate ${plan.name}`}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Everything You Need for Academic Success
            </h2>
            <p className="text-xl text-gray-400">
              Advanced AI technology meets academic excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Get your assignments completed in minutes, not hours'
              },
              {
                icon: Shield,
                title: 'Academic Quality',
                description: 'Professional-grade content with proper citations and formatting'
              },
              {
                icon: Users,
                title: 'Trusted by Students',
                description: 'Join thousands of students who trust AssignmentAI'
              },
              {
                icon: Clock,
                title: '24/7 Availability',
                description: 'Access our AI assistant anytime, anywhere'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="card text-center"
              >
                <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: 'What file formats are supported?',
                answer: 'We support PDF, DOCX, and TXT files. Premium users get additional format options.'
              },
              {
                question: 'Is the content plagiarism-free?',
                answer: 'Yes, our AI generates original content. However, we recommend reviewing and citing sources appropriately.'
              },
              {
                question: 'Can I cancel anytime?',
                answer: 'Absolutely! You can cancel your subscription at any time with no questions asked.'
              },
              {
                question: 'Do you offer a money-back guarantee?',
                answer: 'Yes, we offer a 30-day money-back guarantee. If you\'re not satisfied, we\'ll refund your subscription.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="card"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-20"
        >
          <div className="card max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Your Academic Experience?
            </h2>
            <p className="text-gray-400 mb-6">
              Join thousands of students who have already improved their grades with AssignmentAI
            </p>
            <a href="/dashboard" className="btn-primary text-lg px-8 py-4">
              Get Started Today
            </a>
            <p className="text-sm text-gray-500 mt-4">
              Cancel anytime • 30-day money-back guarantee
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 
import React from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  Star, 
  Zap, 
  Shield, 
  Users, 
  Award,
  Clock,
  ArrowRight,
  Crown,
  GraduationCap,
  Building,
  Play
} from 'lucide-react'
import { useSession } from 'next-auth/react'

export default function PricingPreview() {
  const { data: session } = useSession();
  const trialFeatures = [
    'Unlimited assignments',
    'Advanced AI feedback',
    'Real-time plagiarism detection',
    'Full citation library',
    'Writing tutorials',
    'Progress analytics',
    'Academic integrity monitoring',
    'Priority support',
    'Grade improvement tracking',
    'Custom study plans'
  ]

  const studentPlan = {
    name: 'Student Trial',
    price: 'Free',
    period: '7 Days',
    description: 'Full access to all features for 7 days',
    features: trialFeatures,
    color: 'emerald',
    popular: true
  }

  const institutionPlan = {
    name: 'Institution Trial',
    price: '$49.99',
    period: 'per month',
    description: 'Complete platform access for evaluation',
    features: [
      'Unlimited students',
      'University-wide analytics',
      'Custom integrations',
      'Advanced security',
      'Dedicated account manager',
      'Custom training program',
      'API access',
      'LMS integration',
      'White-label options',
      'Advanced reporting'
    ],
    color: 'deep-navy',
    popular: false
  }

  // Role-based plan visibility
  const canAccessStudentPlan = session?.user?.role === 'student';
  const canAccessInstitutionPlan = session?.user?.role === 'admin' || session?.user?.role === 'professor';

  return (
    <section className="py-20 bg-gradient-to-br from-paper-white to-eggshell-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-sm font-medium mb-6">
            <Play className="w-4 h-4 mr-2" />
            Free Trial
          </div>
          <h2 className="text-4xl font-bold text-deep-navy-900 mb-6">
            Start Your 7-Day Free Trial
          </h2>
          <p className="text-xl text-academic-gray-600 max-w-3xl mx-auto">
            Experience the full power of AssignmentAI with complete access to all features. 
            No credit card required, no commitment.
          </p>
        </motion.div>

        {/* Trial Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Student Trial */}
            {(canAccessStudentPlan || !session) && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-emerald-500 to-deep-navy-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-2" />
                    Most Popular
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-2xl p-8 h-full hover:border-emerald-300 transition-all duration-300 hover:transform hover:scale-105 ring-2 ring-emerald-300">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center mb-4">
                      <GraduationCap className="w-8 h-8 text-emerald-600 mr-3" />
                      <h4 className="text-2xl font-bold text-deep-navy-900">{studentPlan.name}</h4>
                    </div>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-4xl font-bold text-emerald-600">{studentPlan.price}</span>
                      <span className="text-academic-gray-600 ml-1">/{studentPlan.period}</span>
                    </div>
                    <p className="text-academic-gray-600">{studentPlan.description}</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {studentPlan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span className="text-academic-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Institution Trial */}
            {(canAccessInstitutionPlan || !session) && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-deep-navy-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Crown className="w-4 h-4 mr-2" />
                    Enterprise
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-deep-navy-50 to-deep-navy-100 border border-deep-navy-200 rounded-2xl p-8 h-full hover:border-deep-navy-300 transition-all duration-300 hover:transform hover:scale-105 ring-2 ring-deep-navy-300">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center mb-4">
                      <Building className="w-8 h-8 text-deep-navy-600 mr-3" />
                      <h4 className="text-2xl font-bold text-deep-navy-900">{institutionPlan.name}</h4>
                    </div>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-4xl font-bold text-deep-navy-600">{institutionPlan.price}</span>
                      <span className="text-academic-gray-600 ml-1">/{institutionPlan.period}</span>
                    </div>
                    <p className="text-academic-gray-600">{institutionPlan.description}</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {institutionPlan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-deep-navy-500" />
                        <span className="text-academic-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full bg-gradient-to-r from-deep-navy-500 to-deep-navy-600 hover:from-deep-navy-600 hover:to-deep-navy-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Trial Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-deep-navy-50 to-emerald-50 border border-deep-navy-200 rounded-3xl p-8 mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-deep-navy-900 mb-4">
              Why Start with a Free Trial?
            </h3>
            <p className="text-academic-gray-600 max-w-2xl mx-auto">
              Experience the full platform without any commitment. See the difference AssignmentAI can make in your academic journey.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-deep-navy-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-deep-navy-900 font-semibold mb-2">No Credit Card Required</h4>
              <p className="text-academic-gray-600 text-sm">Start immediately without any payment information</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-deep-navy-500 to-soft-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-deep-navy-900 font-semibold mb-2">Full Feature Access</h4>
              <p className="text-academic-gray-600 text-sm">Experience every feature during your trial period</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-soft-gold-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-deep-navy-900 font-semibold mb-2">7 Days to Decide</h4>
              <p className="text-academic-gray-600 text-sm">Plenty of time to evaluate the platform</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-deep-navy-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-deep-navy-900 font-semibold mb-2">Easy Cancellation</h4>
              <p className="text-academic-gray-600 text-sm">Cancel anytime with no questions asked</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-deep-navy-500 to-emerald-500 rounded-3xl p-8 text-center text-white"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-6">
              Ready to Transform Your Academic Experience?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of students and institutions who have already improved their academic performance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-deep-navy-600 font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                <Building className="w-5 h-5 mr-2" />
                Schedule Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
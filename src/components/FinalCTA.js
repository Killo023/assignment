import React from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Star, 
  Shield, 
  Users, 
  GraduationCap,
  Building,
  Zap,
  Award,
  CheckCircle,
  Clock,
  Play
} from 'lucide-react'

export default function FinalCTA() {
  const benefits = [
    {
      icon: Star,
      text: '4.9/5 rating from 2,500+ reviews',
      color: 'soft-gold'
    },
    {
      icon: Shield,
      text: 'Academic integrity guaranteed',
      color: 'emerald'
    },
    {
      icon: Users,
      text: 'Trusted by 500+ universities',
      color: 'deep-navy'
    },
    {
      icon: Award,
      text: '35% average grade improvement',
      color: 'emerald'
    }
  ]

  const guarantees = [
    {
      icon: Clock,
      text: '7-day free trial',
      color: 'emerald'
    },
    {
      icon: Shield,
      text: 'No credit card required',
      color: 'deep-navy'
    },
    {
      icon: Zap,
      text: 'Full feature access',
      color: 'soft-gold'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-deep-navy-900 via-deep-navy-800 to-emerald-900">
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
            Start Your Free Trial
          </div>
          <h2 className="text-5xl font-bold text-white mb-6">
            Transform Your Academic Success Today
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of students and hundreds of institutions who have already 
            improved their academic performance with AssignmentAI.
          </p>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 bg-gradient-to-r from-${benefit.color}-500 to-${benefit.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <p className="text-gray-300 font-semibold">{benefit.text}</p>
            </div>
          ))}
        </motion.div>

        {/* Main CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-deep-navy-500 to-emerald-500 rounded-3xl p-8 mb-12"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-white mb-6">
              Choose Your Path to Academic Excellence
            </h3>
            <p className="text-xl text-white opacity-90 mb-8">
              Whether you're a student seeking better grades or an institution looking to scale, 
              we have the perfect solution for you.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Student CTA */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-center mb-4">
                  <GraduationCap className="w-8 h-8 text-emerald-400 mr-3" />
                  <h4 className="text-xl font-bold text-white">For Students</h4>
                </div>
                <p className="text-gray-300 mb-4">
                  Get personalized AI feedback, improve your writing, and achieve better grades.
                </p>
                <button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>

              {/* Institution CTA */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-center mb-4">
                  <Building className="w-8 h-8 text-deep-navy-300 mr-3" />
                  <h4 className="text-xl font-bold text-white">For Institutions</h4>
                </div>
                <p className="text-gray-300 mb-4">
                  Scale your teaching impact with AI-powered tools and comprehensive analytics.
                </p>
                <button className="w-full bg-gradient-to-r from-deep-navy-500 to-deep-navy-600 hover:from-deep-navy-600 hover:to-deep-navy-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {guarantees.map((guarantee, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 bg-gradient-to-r from-${guarantee.color}-500 to-${guarantee.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <guarantee.icon className="w-8 h-8 text-white" />
              </div>
              <p className="text-gray-300 font-semibold">{guarantee.text}</p>
            </div>
          ))}
        </motion.div>

        {/* Final Urgency */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-soft-gold-500 to-emerald-500 rounded-3xl p-8 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-6">
              Don't Wait to Improve Your Academic Performance
            </h3>
            <p className="text-xl text-white opacity-90 mb-8">
              Join the thousands of students and institutions who have already transformed 
              their academic experience with AssignmentAI.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-deep-navy-600 font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                Start Free Trial Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                <Building className="w-5 h-5 mr-2" />
                Schedule Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
            
            <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-white opacity-80">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                Cancel anytime
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                Instant access
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 text-sm mb-4">
            Trusted by leading institutions worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-gray-400 font-semibold">MIT</div>
            <div className="text-gray-400 font-semibold">Stanford</div>
            <div className="text-gray-400 font-semibold">Harvard</div>
            <div className="text-gray-400 font-semibold">Yale</div>
            <div className="text-gray-400 font-semibold">UC Berkeley</div>
            <div className="text-gray-400 font-semibold">Columbia</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
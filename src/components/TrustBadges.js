import React from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Lock, 
  Award, 
  CheckCircle, 
  Users, 
  Globe,
  Zap,
  Star
} from 'lucide-react'

export default function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: 'SOC 2 Compliant',
      description: 'Enterprise-grade security',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Lock,
      title: '256-bit Encryption',
      description: 'Bank-level security',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Award,
      title: 'Best AI Tool 2024',
      description: 'EdTech Awards Winner',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Users,
      title: '50,000+ Students',
      description: 'Trusted worldwide',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Globe,
      title: '99.9% Uptime',
      description: 'Reliable service',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Zap,
      title: 'Instant Processing',
      description: 'Real-time AI analysis',
      color: 'from-red-500 to-pink-500'
    }
  ]

  return (
    <section className="py-16 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Trusted by Students & Institutions Worldwide
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join thousands of students who have improved their grades with our AI-powered platform
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105 text-center">
                <div className={`w-12 h-12 bg-gradient-to-r ${badge.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <badge.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">
                  {badge.title}
                </h3>
                <p className="text-gray-400 text-xs">
                  {badge.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 grid md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-white font-semibold">4.9/5 Rating</p>
            <p className="text-gray-400 text-sm">From 2,500+ reviews</p>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">35%</div>
            <p className="text-white font-semibold">Average Grade Improvement</p>
            <p className="text-gray-400 text-sm">Proven results</p>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
            <p className="text-white font-semibold">AI Support Available</p>
            <p className="text-gray-400 text-sm">Always here to help</p>
          </div>
        </motion.div>

        {/* Security Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-2xl p-6 text-center"
        >
          <div className="flex items-center justify-center space-x-4 mb-4">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <h3 className="text-2xl font-bold text-white">100% Secure & Private</h3>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Your assignments are encrypted, processed securely, and never shared. 
            We maintain strict academic integrity standards while protecting your privacy.
          </p>
        </motion.div>
      </div>
    </section>
  )
} 
import React from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Award, 
  Clock, 
  TrendingUp,
  FileText,
  Globe,
  Star,
  Zap
} from 'lucide-react'

export default function StatsSection() {
  const stats = [
    {
      icon: Users,
      number: '50,000+',
      label: 'Students Worldwide',
      description: 'Trust our platform daily',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Award,
      number: '35%',
      label: 'Average Grade Improvement',
      description: 'Proven results',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Clock,
      number: '< 2 min',
      label: 'Average Processing Time',
      description: 'Lightning fast AI',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FileText,
      number: '2.5M+',
      label: 'Assignments Processed',
      description: 'Reliable AI analysis',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Globe,
      number: '150+',
      label: 'Countries Served',
      description: 'Global reach',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Star,
      number: '4.9/5',
      label: 'Student Rating',
      description: 'From 2,500+ reviews',
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900/20 to-indigo-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Trusted by Students & Institutions Worldwide
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of students who have transformed their academic performance 
            with our AI-powered assignment assistance platform
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                  {stat.number}
                </div>
                <div className="text-white font-semibold mb-2">
                  {stat.label}
                </div>
                <div className="text-gray-400 text-sm">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-blue-500/30 rounded-3xl p-8 text-center"
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <TrendingUp className="w-8 h-8 text-blue-400" />
            <h3 className="text-2xl font-bold text-white">Rapid Growth & Success</h3>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-1">500%</div>
              <div className="text-gray-300">Growth in 2024</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400 mb-1">98%</div>
              <div className="text-gray-300">Student Satisfaction</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400 mb-1">24/7</div>
              <div className="text-gray-300">AI Support</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-400 mb-1">$2M+</div>
              <div className="text-gray-300">Student Savings</div>
            </div>
          </div>
        </motion.div>

        {/* Testimonial Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30">
            <div className="flex items-center justify-center space-x-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-xl text-gray-300 mb-6 italic">
              "AssignmentAI transformed my academic journey. My grades improved from C+ to A- 
              in just one semester. The AI feedback is incredibly detailed and helpful!"
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">Sarah Johnson</div>
                <div className="text-gray-400 text-sm">Computer Science Student, Stanford</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Your Academic Success?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join 50,000+ students who have already improved their grades with our AI-powered platform. 
              Start your free trial today and see the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-2xl transition-all duration-300 transform hover:scale-105">
                Start Free Trial
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl text-lg border border-white/20 transition-all duration-300">
                View Success Stories
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
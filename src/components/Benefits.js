import React from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Shield, 
  Brain, 
  Award,
  Users,
  Zap,
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react'

const benefits = [
  { 
    icon: TrendingUp, 
    title: '35% Higher Grades', 
    desc: 'Students using AssignmentAI see a 35% average grade improvement within one semester.',
    metric: '35%',
    color: 'from-green-500 to-emerald-500',
    gradient: 'from-green-600/20 to-emerald-600/20'
  },
  { 
    icon: DollarSign, 
    title: '$127K Saved', 
    desc: 'Institutions and students save thousands in tutoring and administrative costs annually.',
    metric: '$127K',
    color: 'from-blue-500 to-cyan-500',
    gradient: 'from-blue-600/20 to-cyan-600/20'
  },
  { 
    icon: Clock, 
    title: '25+ Hours Saved', 
    desc: 'Save over 25 hours per semester on assignments, research, and writing tasks.',
    metric: '25+',
    color: 'from-purple-500 to-pink-500',
    gradient: 'from-purple-600/20 to-pink-600/20'
  },
  { 
    icon: Shield, 
    title: '100% Privacy', 
    desc: 'Your data is encrypted and never shared—guaranteed with bank-level security.',
    metric: '100%',
    color: 'from-orange-500 to-red-500',
    gradient: 'from-orange-600/20 to-red-600/20'
  },
  { 
    icon: Brain, 
    title: 'AI-Powered Learning', 
    desc: 'Advanced machine learning provides personalized feedback and learning insights.',
    metric: 'AI',
    color: 'from-indigo-500 to-blue-500',
    gradient: 'from-indigo-600/20 to-blue-600/20'
  },
  { 
    icon: Award, 
    title: 'Proven Results', 
    desc: 'Trusted by 50,000+ students and 500+ institutions worldwide with proven outcomes.',
    metric: '50K+',
    color: 'from-yellow-500 to-orange-500',
    gradient: 'from-yellow-600/20 to-orange-600/20'
  }
]

export default function Benefits() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900/10 to-indigo-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600/20 border border-blue-400/30 text-blue-200 text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2" />
            Proven Results
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">
            Transform Your Academic Success
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of students who have already improved their grades, saved time, 
            and achieved their academic goals with our AI-powered platform.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className={`bg-gradient-to-br ${benefit.gradient} border border-gray-700/50 rounded-2xl p-8 h-full hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105`}>
                <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="text-3xl font-bold text-white mb-4">
                  {benefit.metric}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {benefit.desc}
                </p>
                
                <div className="flex items-center text-blue-400 font-semibold text-sm group-hover:text-blue-300 transition-colors duration-300">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ROI Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-blue-500/30 rounded-3xl p-8"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Calculate Your ROI
              </h3>
              <p className="text-gray-300 mb-6 text-lg">
                See how much time and money you can save with AssignmentAI. 
                Our platform pays for itself within the first month.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Save 25+ hours per semester</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Improve grades by 35% on average</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Reduce tutoring costs by 80%</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Increase confidence and motivation</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h4 className="text-white font-semibold mb-4">Your Savings Calculator</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Time Saved (hours/semester)</span>
                  <span className="text-green-400 font-bold">25</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Tutoring Costs Saved</span>
                  <span className="text-blue-400 font-bold">$2,400</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Grade Improvement</span>
                  <span className="text-purple-400 font-bold">+35%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Platform Cost</span>
                  <span className="text-red-400 font-bold">-$19.99/mo</span>
                </div>
                <div className="border-t border-gray-600 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">Total Savings</span>
                    <span className="text-green-400 font-bold text-xl">$2,380</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Urgency Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 rounded-2xl p-6 text-center"
        >
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Zap className="w-8 h-8 text-orange-400" />
            <h3 className="text-2xl font-bold text-white">Limited Time Offer</h3>
          </div>
          <p className="text-orange-200 text-lg mb-4">
            🎉 First 100 new users get 50% off Premium Plan + Free AI Tutor Session!
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              <span>Only 23 spots left</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>Offer ends in 48 hours</span>
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
              Ready to Transform Your Academic Journey?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join 50,000+ students who have already improved their grades and saved time. 
              Start your free trial today and see the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 mr-2" />
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
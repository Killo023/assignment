import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Minus, Sparkles, Award, Clock, DollarSign } from 'lucide-react'

const data = [
  { 
    label: 'Instant Feedback', 
    ai: 'Yes', 
    tutor: 'No', 
    free: 'No',
    aiIcon: CheckCircle,
    tutorIcon: XCircle,
    freeIcon: XCircle
  },
  { 
    label: 'Plagiarism Check', 
    ai: 'Advanced', 
    tutor: 'Sometimes', 
    free: 'Limited',
    aiIcon: CheckCircle,
    tutorIcon: Minus,
    freeIcon: Minus
  },
  { 
    label: '24/7 Access', 
    ai: 'Yes', 
    tutor: 'No', 
    free: 'Yes',
    aiIcon: CheckCircle,
    tutorIcon: XCircle,
    freeIcon: CheckCircle
  },
  { 
    label: 'AI-Powered Suggestions', 
    ai: 'Advanced', 
    tutor: 'No', 
    free: 'No',
    aiIcon: CheckCircle,
    tutorIcon: XCircle,
    freeIcon: XCircle
  },
  { 
    label: 'Grade Improvement Guarantee', 
    ai: 'Yes', 
    tutor: 'No', 
    free: 'No',
    aiIcon: CheckCircle,
    tutorIcon: XCircle,
    freeIcon: XCircle
  },
  { 
    label: 'Cost per Month', 
    ai: '$19.99', 
    tutor: '$200+', 
    free: '$0',
    aiIcon: DollarSign,
    tutorIcon: DollarSign,
    freeIcon: DollarSign
  }
]

export default function ComparisonTable() {
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
            <Sparkles className="w-4 h-4 mr-2" />
            Why Choose AssignmentAI
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">
            How We Compare to Alternatives
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See why thousands of students choose AssignmentAI over traditional tutoring 
            and free tools for their academic success.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="overflow-x-auto"
        >
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-gray-700/50">
                  <th className="py-6 px-6 text-left text-white font-bold">Feature</th>
                  <th className="py-6 px-6 text-center">
                    <div className="flex flex-col items-center">
                      <Award className="w-6 h-6 text-blue-400 mb-2" />
                      <span className="text-white font-bold">AssignmentAI</span>
                      <span className="text-blue-400 text-sm">Recommended</span>
                    </div>
                  </th>
                  <th className="py-6 px-6 text-center">
                    <div className="flex flex-col items-center">
                      <Clock className="w-6 h-6 text-gray-400 mb-2" />
                      <span className="text-white font-bold">Traditional Tutors</span>
                      <span className="text-gray-400 text-sm">Expensive</span>
                    </div>
                  </th>
                  <th className="py-6 px-6 text-center">
                    <div className="flex flex-col items-center">
                      <DollarSign className="w-6 h-6 text-gray-400 mb-2" />
                      <span className="text-white font-bold">Free Tools</span>
                      <span className="text-gray-400 text-sm">Limited</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <motion.tr
                    key={row.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors duration-300"
                  >
                    <td className="py-4 px-6 font-semibold text-gray-200">
                      {row.label}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <row.aiIcon className="w-5 h-5 text-green-400" />
                        <span className="text-green-400 font-semibold">{row.ai}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <row.tutorIcon className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300">{row.tutor}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <row.freeIcon className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300">{row.free}</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-6 text-center">
            <Award className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-white font-bold mb-2">Best Value</h3>
            <p className="text-gray-300 text-sm">
              Advanced AI features at a fraction of tutoring costs
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-2xl p-6 text-center">
            <Clock className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-white font-bold mb-2">Always Available</h3>
            <p className="text-gray-300 text-sm">
              24/7 access to AI assistance whenever you need it
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-6 text-center">
            <CheckCircle className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-white font-bold mb-2">Proven Results</h3>
            <p className="text-gray-300 text-sm">
              35% average grade improvement with money-back guarantee
            </p>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of students who have already switched to AssignmentAI 
              and improved their academic performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                <Award className="w-5 h-5 mr-2" />
                Start Free Trial
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl text-lg border border-white/20 transition-all duration-300">
                View Pricing
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
import React from 'react'
import { motion } from 'framer-motion'
import { Upload, MessageSquare, ShieldCheck, Download, ArrowRight, Sparkles } from 'lucide-react'

const steps = [
  { 
    icon: Upload, 
    title: 'Upload or Paste', 
    desc: 'Add your essay, code, or homework in seconds.',
    color: 'from-blue-500 to-cyan-500',
    gradient: 'from-blue-600/20 to-cyan-600/20'
  },
  { 
    icon: MessageSquare, 
    title: 'Get Instant Feedback', 
    desc: 'AI reviews and suggests improvements immediately.',
    color: 'from-green-500 to-emerald-500',
    gradient: 'from-green-600/20 to-emerald-600/20'
  },
  { 
    icon: ShieldCheck, 
    title: 'Check Plagiarism', 
    desc: 'Scan for originality and AI-generated content.',
    color: 'from-purple-500 to-pink-500',
    gradient: 'from-purple-600/20 to-pink-600/20'
  },
  { 
    icon: Download, 
    title: 'Download or Submit', 
    desc: 'Export your improved work or submit with confidence.',
    color: 'from-orange-500 to-red-500',
    gradient: 'from-orange-600/20 to-red-600/20'
  }
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-900 via-blue-900/10 to-indigo-900/10">
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
            Simple 4-Step Process
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">
            How AssignmentAI Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get started in minutes with our simple 4-step process. 
            From upload to improved assignment in under 2 minutes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className={`bg-gradient-to-br ${step.gradient} border border-gray-700/50 rounded-2xl p-8 h-full hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105`}>
                <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="text-2xl font-bold text-white mb-2">
                  {index + 1}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4">
                  {step.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Process Flow Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-3xl p-8"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Lightning Fast Processing
              </h3>
              <p className="text-gray-300 mb-6 text-lg">
                Our advanced AI technology processes your assignments in under 2 minutes, 
                providing detailed feedback and suggestions for improvement.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Instant AI analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">Real-time plagiarism detection</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300">Detailed improvement suggestions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span className="text-gray-300">Export in multiple formats</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h4 className="text-white font-semibold mb-4">Processing Timeline</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Upload</span>
                  <span className="text-green-400 font-semibold">0-10s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">AI Analysis</span>
                  <span className="text-blue-400 font-semibold">30-60s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Plagiarism Check</span>
                  <span className="text-purple-400 font-semibold">15-30s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Generate Report</span>
                  <span className="text-pink-400 font-semibold">10-20s</span>
                </div>
                <div className="border-t border-gray-600 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">Total Time</span>
                    <span className="text-green-400 font-bold text-xl">< 2 min</span>
                  </div>
                </div>
              </div>
            </div>
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
              Ready to Get Started?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of students who have already improved their grades. 
              Start your free trial today and see the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                <Upload className="w-5 h-5 mr-2" />
                Start Free Trial
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl text-lg border border-white/20 transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
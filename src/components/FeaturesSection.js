import React from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  FileText, 
  Shield, 
  Zap, 
  Target, 
  BarChart3,
  MessageSquare,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  TrendingUp
} from 'lucide-react'

export default function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms provide comprehensive feedback on grammar, style, structure, and content quality.',
      benefits: ['Instant feedback', 'Detailed suggestions', 'Learning insights'],
      color: 'from-blue-500 to-cyan-500',
      gradient: 'from-blue-600/20 to-cyan-600/20'
    },
    {
      icon: FileText,
      title: 'Plagiarism Detection',
      description: 'Industry-leading plagiarism detection with access to billions of academic sources and real-time scanning.',
      benefits: ['99.9% accuracy', 'Real-time scanning', 'Academic integrity'],
      color: 'from-green-500 to-emerald-500',
      gradient: 'from-green-600/20 to-emerald-600/20'
    },
    {
      icon: Target,
      title: 'Grade Improvement Guarantee',
      description: 'Our proven methodology has helped students improve their grades by an average of 35% within one semester.',
      benefits: ['Proven results', 'Money-back guarantee', 'Personalized approach'],
      color: 'from-purple-500 to-pink-500',
      gradient: 'from-purple-600/20 to-pink-600/20'
    },
    {
      icon: Zap,
      title: 'Lightning Fast Processing',
      description: 'Get detailed analysis and feedback in under 2 minutes, even for complex assignments and research papers.',
      benefits: ['< 2 min processing', '24/7 availability', 'No waiting time'],
      color: 'from-orange-500 to-red-500',
      gradient: 'from-orange-600/20 to-red-600/20'
    },
    {
      icon: MessageSquare,
      title: 'Smart Study Assistant',
      description: 'AI-powered study companion that helps you understand concepts, generate practice questions, and track your progress.',
      benefits: ['Concept explanations', 'Practice questions', 'Progress tracking'],
      color: 'from-indigo-500 to-blue-500',
      gradient: 'from-indigo-600/20 to-blue-600/20'
    },
    {
      icon: BarChart3,
      title: 'Performance Analytics',
      description: 'Track your academic progress with detailed analytics, identify improvement areas, and set achievable goals.',
      benefits: ['Progress tracking', 'Goal setting', 'Performance insights'],
      color: 'from-yellow-500 to-orange-500',
      gradient: 'from-yellow-600/20 to-orange-600/20'
    }
  ]

  return (
    <section className="py-20 bg-gray-900">
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
            Powerful Features
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">
            Everything You Need to Excel Academically
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our comprehensive AI-powered platform provides all the tools you need to improve your grades, 
            enhance your writing skills, and achieve academic success.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className={`bg-gradient-to-br ${feature.gradient} border border-gray-700/50 rounded-2xl p-8 h-full hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105`}>
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center text-blue-400 font-semibold text-sm group-hover:text-blue-300 transition-colors duration-300">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Advanced Features Banner */}
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
                Advanced AI Capabilities
              </h3>
              <p className="text-gray-300 mb-6 text-lg">
                Our cutting-edge AI technology goes beyond basic grammar checking. 
                It understands context, academic standards, and provides personalized learning insights.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">Context-aware suggestions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300">Subject-specific feedback</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span className="text-gray-300">Citation assistance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Research paper formatting</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-semibold">AI Analysis Dashboard</h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Writing Quality</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-600 rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-green-400 font-semibold text-sm">85%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Academic Style</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-600 rounded-full h-2">
                        <div className="bg-blue-400 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                      <span className="text-blue-400 font-semibold text-sm">92%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Originality</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-600 rounded-full h-2">
                        <div className="bg-purple-400 h-2 rounded-full" style={{ width: '98%' }}></div>
                      </div>
                      <span className="text-purple-400 font-semibold text-sm">98%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-3 shadow-lg"
              >
                <div className="text-white text-center">
                  <div className="text-lg font-bold">A+</div>
                  <div className="text-xs">Quality</div>
                </div>
              </motion.div>
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
              Experience the Power of AI-Powered Learning
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of students who have already transformed their academic performance. 
              Start your free trial and see the difference AI can make.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Start Free Trial
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl text-lg border border-white/20 transition-all duration-300">
                View Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
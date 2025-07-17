import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  GraduationCap, 
  Users, 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  Star,
  Clock,
  BookOpen,
  Award,
  Brain,
  Zap,
  Eye
} from 'lucide-react'

export default function HeroSection() {
  const [activePersona, setActivePersona] = useState('student')

  const studentContent = {
    heroImage: "Animated AI tutor helping with homework",
    socialProof: "Used by 50,000+ students at MIT, Stanford, Harvard",
    ctaButton: "Start Free Trial",
    subtitle: "AI-powered academic assistance that respects academic integrity",
    features: [
      { icon: Brain, text: "Smart AI feedback", color: "emerald" },
      { icon: Shield, text: "Academic integrity protected", color: "deep-navy" },
      { icon: BookOpen, text: "Citation assistance", color: "soft-gold" }
    ]
  }

  const professorContent = {
    heroImage: "Dashboard reducing grading stack",
    socialProof: "Adopted by 500+ departments worldwide",
    ctaButton: "Start Free Trial",
    subtitle: "Scale your teaching impact with AI-powered assessment tools",
    features: [
      { icon: Users, text: "Class management", color: "emerald" },
      { icon: Award, text: "Automated grading", color: "deep-navy" },
      { icon: Eye, text: "Integrity monitoring", color: "soft-gold" }
    ]
  }

  const content = activePersona === 'student' ? studentContent : professorContent

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-eggshell-white via-deep-navy-50 to-emerald-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-deep-navy-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-deep-navy-50 to-emerald-50 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Persona Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center bg-paper-white rounded-full p-1 shadow-lg border border-academic-gray-200 mb-6"
            >
              <button
                onClick={() => setActivePersona('student')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center ${
                  activePersona === 'student'
                    ? 'bg-deep-navy-500 text-white shadow-md'
                    : 'text-academic-gray-600 hover:text-deep-navy-500'
                }`}
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                Students
              </button>
              <button
                onClick={() => setActivePersona('professor')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center ${
                  activePersona === 'professor'
                    ? 'bg-deep-navy-500 text-white shadow-md'
                    : 'text-academic-gray-600 hover:text-deep-navy-500'
                }`}
              >
                <Users className="w-4 h-4 mr-2" />
                Professors
              </button>
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-sm font-medium mb-6"
            >
              <Shield className="w-4 h-4 mr-2" />
              AI Ethics & Academic Integrity First
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl lg:text-6xl xl:text-7xl font-bold text-deep-navy-900 mb-6 leading-tight"
            >
              {activePersona === 'student' ? (
                <>
                  Transform Your
                  <span className="block bg-gradient-to-r from-deep-navy-500 via-emerald-500 to-soft-gold-500 bg-clip-text text-transparent">
                    Academic Success
                  </span>
                  with Ethical AI
                </>
              ) : (
                <>
                  Scale Your
                  <span className="block bg-gradient-to-r from-deep-navy-500 via-emerald-500 to-soft-gold-500 bg-clip-text text-transparent">
                    Teaching Impact
                  </span>
                  with AI-Powered Tools
                </>
              )}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xl text-academic-gray-600 mb-8 max-w-2xl lg:max-w-none"
            >
              {content.subtitle}
            </motion.p>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start"
            >
              {content.features.map((feature, index) => (
                <div key={index} className="flex items-center text-academic-gray-700 text-sm">
                  <CheckCircle className={`w-4 h-4 mr-2 text-${feature.color}-500`} />
                  {feature.text}
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Link 
                href={activePersona === 'student' ? "/auth/signup" : "/contact"} 
                className="group bg-gradient-to-r from-deep-navy-500 to-deep-navy-600 hover:from-deep-navy-600 hover:to-deep-navy-700 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="#how-it-works" 
                className="bg-paper-white hover:bg-academic-gray-50 text-deep-navy-600 font-semibold px-8 py-4 rounded-xl text-lg border border-academic-gray-200 transition-all duration-300 flex items-center justify-center shadow-sm"
              >
                <Zap className="w-5 h-5 mr-2" />
                See How It Works
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-academic-gray-500"
            >
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-deep-navy-400 to-emerald-400 border-2 border-paper-white"></div>
                  ))}
                </div>
                <span>{content.socialProof}</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-soft-gold-500 mr-1" />
                <span>4.9/5 rating</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            {/* Main Dashboard Mockup */}
            <div className="relative bg-paper-white rounded-2xl p-6 border border-academic-gray-200 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-deep-navy-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-deep-navy-900 font-semibold">AssignmentAI Dashboard</div>
                    <div className="text-academic-gray-500 text-sm">
                      {activePersona === 'student' ? 'Student Mode' : 'Professor Mode'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-soft-gold-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-deep-navy-400 rounded-full"></div>
                </div>
              </div>

              {/* Content Area */}
              <div className="space-y-4">
                {/* AI Analysis Card */}
                <div className="bg-gradient-to-r from-emerald-50 to-deep-navy-50 rounded-xl p-4 border border-emerald-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-deep-navy-900 font-semibold">AI Analysis Results</h3>
                    <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                      Complete
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-academic-gray-600">Grammar Score</span>
                      <span className="text-emerald-600 font-semibold">95%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-academic-gray-600">Clarity Score</span>
                      <span className="text-deep-navy-600 font-semibold">88%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-academic-gray-600">Integrity Check</span>
                      <span className="text-emerald-600 font-semibold">Passed ✓</span>
                    </div>
                  </div>
                </div>

                {/* Ethical AI Badge */}
                <div className="bg-gradient-to-r from-soft-gold-50 to-emerald-50 rounded-xl p-4 border border-soft-gold-200">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-6 h-6 text-soft-gold-600" />
                    <div>
                      <h4 className="text-deep-navy-900 font-semibold text-sm">AI Ethics Active</h4>
                      <p className="text-academic-gray-600 text-xs">This suggestion references 3 academic sources</p>
                    </div>
                  </div>
                </div>

                {/* Suggestions Card */}
                <div className="bg-academic-gray-50 rounded-xl p-4">
                  <h3 className="text-deep-navy-900 font-semibold mb-3">AI Suggestions</h3>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
                      <span className="text-academic-gray-700 text-sm">Improve thesis statement clarity</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-deep-navy-400 rounded-full mt-2"></div>
                      <span className="text-academic-gray-700 text-sm">Add supporting evidence for claim #3</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-soft-gold-400 rounded-full mt-2"></div>
                      <span className="text-academic-gray-700 text-sm">Consider alternative conclusion approach</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-academic-gray-50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-deep-navy-900 font-semibold">Grade Improvement</span>
                    <span className="text-emerald-600 font-bold">+35%</span>
                  </div>
                  <div className="w-full bg-academic-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-emerald-400 to-deep-navy-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-500 to-deep-navy-500 rounded-xl p-3 shadow-lg"
            >
              <div className="text-white text-center">
                <div className="text-2xl font-bold">A+</div>
                <div className="text-xs">Grade</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 bg-gradient-to-r from-soft-gold-500 to-emerald-500 rounded-xl p-3 shadow-lg"
            >
              <div className="text-white text-center">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-xs">Accuracy</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-deep-navy-300 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-deep-navy-400 rounded-full mt-2"></div>
        </motion.div>
      </motion.div>
    </section>
  )
} 
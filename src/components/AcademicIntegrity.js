import React from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  BookOpen, 
  Users,
  Lock,
  Eye,
  Award,
  Target,
  Zap,
  Star,
  GraduationCap
} from 'lucide-react'

export default function AcademicIntegrity() {
  const integrityFeatures = [
    {
      icon: Shield,
      title: 'Plagiarism Detection',
      description: 'Advanced AI scans against billions of academic sources',
      stats: '99.8% accuracy',
      color: 'emerald'
    },
    {
      icon: Eye,
      title: 'AI Usage Monitoring',
      description: 'Detect and flag potential AI-generated content',
      stats: 'Real-time analysis',
      color: 'deep-navy'
    },
    {
      icon: Lock,
      title: 'Academic Policy Compliance',
      description: 'Built-in checks for university honor codes',
      stats: '500+ policies',
      color: 'soft-gold'
    },
    {
      icon: Users,
      title: 'Human Review System',
      description: 'Expert educators review flagged content',
      stats: '24/7 monitoring',
      color: 'emerald'
    }
  ]

  const safeguards = [
    {
      title: 'Watermarked Drafts',
      description: 'All AI-assisted work is clearly marked until final submission',
      icon: AlertTriangle,
      color: 'soft-gold'
    },
    {
      title: 'Citation Requirements',
      description: 'Mandatory source attribution for all AI suggestions',
      icon: BookOpen,
      color: 'emerald'
    },
    {
      title: 'Confidence Scoring',
      description: 'Transparent confidence levels for all AI recommendations',
      icon: Target,
      color: 'deep-navy'
    },
    {
      title: 'Audit Trails',
      description: 'Complete history of AI interactions and decisions',
      icon: Eye,
      color: 'emerald'
    }
  ]

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
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-deep-navy-100 border border-deep-navy-200 text-deep-navy-700 text-sm font-medium mb-6">
            <Shield className="w-4 h-4 mr-2" />
            Academic Integrity
          </div>
          <h2 className="text-4xl font-bold text-deep-navy-900 mb-6">
            Protecting Academic Excellence
          </h2>
          <p className="text-xl text-academic-gray-600 max-w-3xl mx-auto">
            Our platform is built with academic integrity at its core, providing robust safeguards 
            to maintain the highest standards of academic honesty and excellence.
          </p>
        </motion.div>

        {/* Integrity Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {integrityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className={`bg-gradient-to-br from-${feature.color}-50 to-${feature.color}-100 border border-${feature.color}-200 rounded-2xl p-6 h-full hover:border-${feature.color}-300 transition-all duration-300 hover:transform hover:scale-105`}>
                <div className={`w-14 h-14 bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-deep-navy-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-academic-gray-600 mb-4 leading-relaxed">
                  {feature.description}
                </p>

                <div className={`text-${feature.color}-600 font-bold text-lg`}>
                  {feature.stats}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Integrity Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-paper-white rounded-3xl p-8 border border-academic-gray-200 shadow-xl mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-deep-navy-900 mb-4">
              Academic Integrity Dashboard
            </h3>
            <p className="text-academic-gray-600 max-w-2xl mx-auto">
              Real-time monitoring and analysis of academic integrity across all submissions
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Integrity Score */}
            <div className="bg-gradient-to-r from-emerald-50 to-deep-navy-50 border border-emerald-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-deep-navy-900 font-semibold">Integrity Score</h4>
                <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                  Excellent
                </div>
              </div>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-emerald-600 mb-2">98.5%</div>
                <div className="text-academic-gray-600 text-sm">Overall Integrity Rating</div>
              </div>
              <div className="w-full bg-academic-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-emerald-400 to-deep-navy-400 h-2 rounded-full" style={{ width: '98.5%' }}></div>
              </div>
            </div>

            {/* Recent Checks */}
            <div className="bg-academic-gray-50 rounded-2xl p-6">
              <h4 className="text-deep-navy-900 font-semibold mb-4">Recent Integrity Checks</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-academic-gray-700 text-sm">Essay Submission</span>
                  <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs">
                    Passed
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-academic-gray-700 text-sm">Research Paper</span>
                  <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs">
                    Passed
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-academic-gray-700 text-sm">Lab Report</span>
                  <div className="bg-soft-gold-100 text-soft-gold-700 px-2 py-1 rounded-full text-xs">
                    Review
                  </div>
                </div>
              </div>
            </div>

            {/* AI Usage Analytics */}
            <div className="bg-gradient-to-r from-soft-gold-50 to-emerald-50 border border-soft-gold-200 rounded-2xl p-6">
              <h4 className="text-deep-navy-900 font-semibold mb-4">AI Usage Analytics</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-academic-gray-600">Ethical Usage</span>
                    <span className="text-emerald-600 font-semibold">95%</span>
                  </div>
                  <div className="w-full bg-academic-gray-200 rounded-full h-2">
                    <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-academic-gray-600">Citation Accuracy</span>
                    <span className="text-deep-navy-600 font-semibold">98%</span>
                  </div>
                  <div className="w-full bg-academic-gray-200 rounded-full h-2">
                    <div className="bg-deep-navy-400 h-2 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-academic-gray-600">Original Content</span>
                    <span className="text-soft-gold-600 font-semibold">97%</span>
                  </div>
                  <div className="w-full bg-academic-gray-200 rounded-full h-2">
                    <div className="bg-soft-gold-400 h-2 rounded-full" style={{ width: '97%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Safeguards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {safeguards.map((safeguard, index) => (
            <motion.div
              key={safeguard.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className={`bg-gradient-to-br from-${safeguard.color}-50 to-${safeguard.color}-100 border border-${safeguard.color}-200 rounded-2xl p-6 h-full hover:border-${safeguard.color}-300 transition-all duration-300`}>
                <div className={`w-12 h-12 bg-gradient-to-r from-${safeguard.color}-500 to-${safeguard.color}-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <safeguard.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-deep-navy-900 mb-3">
                  {safeguard.title}
                </h3>
                
                <p className="text-academic-gray-600 leading-relaxed">
                  {safeguard.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Integrity Commitment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-deep-navy-500 to-emerald-500 rounded-3xl p-8 text-center text-white"
        >
          <div className="max-w-4xl mx-auto">
            <GraduationCap className="w-16 h-16 mx-auto mb-6 text-white" />
            <h3 className="text-3xl font-bold mb-6">
              Zero Tolerance for Academic Misconduct
            </h3>
            <p className="text-xl mb-8 opacity-90">
              We maintain the highest standards of academic integrity. Our platform is designed to 
              enhance learning while preventing any form of academic dishonesty.
            </p>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">99.8%</div>
                <div className="opacity-90">Detection Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="opacity-90">Monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="opacity-90">Policy Compliance</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="opacity-90">Transparency</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
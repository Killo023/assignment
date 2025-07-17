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
  Star,
  Eye,
  BookOpen,
  GraduationCap,
  Building
} from 'lucide-react'

export default function TrustArchitecture() {
  const trustPillars = [
    {
      icon: Shield,
      title: 'Academic Integrity First',
      description: 'Built-in safeguards ensure ethical AI usage and original work submission',
      color: 'emerald',
      gradient: 'from-emerald-50 to-emerald-100'
    },
    {
      icon: Lock,
      title: 'Bank-Level Security',
      description: '256-bit encryption, SOC 2 compliance, and FERPA/GDPR adherence',
      color: 'deep-navy',
      gradient: 'from-deep-navy-50 to-deep-navy-100'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: '35% average grade improvement with 30-day money-back guarantee',
      color: 'soft-gold',
      gradient: 'from-soft-gold-50 to-soft-gold-100'
    },
    {
      icon: Users,
      title: 'Trusted by Institutions',
      description: '500+ universities and 50,000+ students worldwide',
      color: 'emerald',
      gradient: 'from-emerald-50 to-emerald-100'
    },
    {
      icon: Eye,
      title: 'Transparent AI',
      description: 'Every AI suggestion includes source references and confidence scores',
      color: 'deep-navy',
      gradient: 'from-deep-navy-50 to-deep-navy-100'
    },
    {
      icon: BookOpen,
      title: 'Academic Standards',
      description: 'Aligned with university honor codes and academic policies',
      color: 'soft-gold',
      gradient: 'from-soft-gold-50 to-soft-gold-100'
    }
  ]

  const certifications = [
    { name: 'SOC 2 Type II', icon: Shield, description: 'Enterprise security compliance' },
    { name: 'FERPA Compliant', icon: Lock, description: 'Student privacy protection' },
    { name: 'GDPR Ready', icon: Globe, description: 'International data protection' },
    { name: '256-bit Encryption', icon: Zap, description: 'Bank-level data security' }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-eggshell-white to-paper-white">
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
            Trust Architecture
          </div>
          <h2 className="text-4xl font-bold text-deep-navy-900 mb-6">
            Built on Academic Integrity & Trust
          </h2>
          <p className="text-xl text-academic-gray-600 max-w-3xl mx-auto">
            Our platform is designed with ethical AI practices, robust security, and academic integrity 
            at its core. Trusted by leading institutions worldwide.
          </p>
        </motion.div>

        {/* Trust Pillars */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {trustPillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className={`bg-gradient-to-br ${pillar.gradient} border border-${pillar.color}-200 rounded-2xl p-8 h-full hover:border-${pillar.color}-300 transition-all duration-300 hover:transform hover:scale-105`}>
                <div className={`w-16 h-16 bg-gradient-to-r from-${pillar.color}-500 to-${pillar.color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <pillar.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-deep-navy-900 mb-4">
                  {pillar.title}
                </h3>
                
                <p className="text-academic-gray-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-deep-navy-50 to-emerald-50 border border-deep-navy-200 rounded-3xl p-8 mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-deep-navy-900 mb-4">
              Security & Compliance Certifications
            </h3>
            <p className="text-academic-gray-600 max-w-2xl mx-auto">
              Our platform meets the highest standards for security, privacy, and academic integrity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-deep-navy-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <cert.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-deep-navy-900 font-semibold mb-2">{cert.name}</h4>
                <p className="text-academic-gray-600 text-sm">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Ethical AI Framework */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 items-center"
        >
          <div>
            <h3 className="text-3xl font-bold text-deep-navy-900 mb-6">
              Ethical AI Framework
            </h3>
            <p className="text-academic-gray-600 mb-6 text-lg">
              Our AI is designed with academic integrity at its core, providing transparent 
              suggestions that enhance learning while maintaining ethical standards.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-academic-gray-700">Source attribution for all AI suggestions</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-academic-gray-700">Confidence scores for transparency</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-academic-gray-700">Built-in plagiarism detection</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-academic-gray-700">Academic policy compliance</span>
              </div>
            </div>
          </div>
          
          <div className="bg-paper-white rounded-2xl p-6 border border-academic-gray-200 shadow-lg">
            <h4 className="text-deep-navy-900 font-semibold mb-4">AI Ethics Badge</h4>
            <div className="bg-gradient-to-r from-emerald-50 to-soft-gold-50 border border-emerald-200 rounded-xl p-4 mb-4">
              <div className="flex items-center space-x-3 mb-3">
                <Shield className="w-6 h-6 text-emerald-600" />
                <span className="text-deep-navy-900 font-semibold">AI Ethics Active</span>
              </div>
              <p className="text-academic-gray-600 text-sm mb-3">
                This suggestion references 3 academic sources and maintains 95% confidence level.
              </p>
              <div className="flex items-center justify-between text-xs text-academic-gray-500">
                <span>Sources: 3 academic papers</span>
                <span>Confidence: 95%</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-academic-gray-600 text-sm">
                Remember: Submit only original work (academic policy)
              </p>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-deep-navy-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-deep-navy-900 mb-2">500+</div>
            <div className="text-academic-gray-600 font-semibold">Universities Trust Us</div>
            <div className="text-academic-gray-500 text-sm">Leading institutions worldwide</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-deep-navy-500 to-soft-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-deep-navy-900 mb-2">4.9/5</div>
            <div className="text-academic-gray-600 font-semibold">Trust Rating</div>
            <div className="text-academic-gray-500 text-sm">From 2,500+ reviews</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-soft-gold-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Building className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-deep-navy-900 mb-2">99.9%</div>
            <div className="text-academic-gray-600 font-semibold">Uptime</div>
            <div className="text-academic-gray-500 text-sm">Reliable service guarantee</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
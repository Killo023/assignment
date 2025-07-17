import React from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Eye, 
  BookOpen, 
  CheckCircle, 
  AlertTriangle,
  Brain,
  Zap,
  Target,
  Users,
  Lock,
  Award,
  Star
} from 'lucide-react'

export default function AIEthicsFramework() {
  const ethicalPrinciples = [
    {
      icon: Shield,
      title: 'Academic Integrity First',
      description: 'Every AI suggestion is designed to enhance learning while maintaining academic honesty',
      color: 'emerald',
      features: ['Plagiarism prevention', 'Citation requirements', 'Original work emphasis']
    },
    {
      icon: Eye,
      title: 'Complete Transparency',
      description: 'All AI suggestions include source references and confidence scores',
      color: 'deep-navy',
      features: ['Source attribution', 'Confidence levels', 'Decision explanations']
    },
    {
      icon: BookOpen,
      title: 'Educational Enhancement',
      description: 'AI tools are designed to teach, not replace, student learning',
      color: 'soft-gold',
      features: ['Learning objectives', 'Skill development', 'Knowledge building']
    },
    {
      icon: Users,
      title: 'Human Oversight',
      description: 'AI suggestions are reviewed and can be overridden by users',
      color: 'emerald',
      features: ['Human judgment', 'Customizable settings', 'Override capabilities']
    }
  ]

  const transparencyFeatures = [
    {
      title: 'Source Attribution',
      description: 'Every AI suggestion includes references to academic sources',
      icon: BookOpen,
      color: 'emerald'
    },
    {
      title: 'Confidence Scoring',
      description: 'Clear confidence levels for all AI recommendations',
      icon: Target,
      color: 'deep-navy'
    },
    {
      title: 'Audit Trail',
      description: 'Complete history of AI interactions and decisions',
      icon: Eye,
      color: 'soft-gold'
    },
    {
      title: 'Academic Compliance',
      description: 'Built-in checks for university honor codes and policies',
      icon: Shield,
      color: 'emerald'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-deep-navy-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-sm font-medium mb-6">
            <Shield className="w-4 h-4 mr-2" />
            AI Ethics Framework
          </div>
          <h2 className="text-4xl font-bold text-deep-navy-900 mb-6">
            Ethical AI Built for Academic Excellence
          </h2>
          <p className="text-xl text-academic-gray-600 max-w-3xl mx-auto">
            Our AI is designed with academic integrity at its core, providing transparent, 
            educational assistance that enhances learning while maintaining ethical standards.
          </p>
        </motion.div>

        {/* Ethical Principles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {ethicalPrinciples.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className={`bg-gradient-to-br from-${principle.color}-50 to-${principle.color}-100 border border-${principle.color}-200 rounded-2xl p-6 h-full hover:border-${principle.color}-300 transition-all duration-300 hover:transform hover:scale-105`}>
                <div className={`w-14 h-14 bg-gradient-to-r from-${principle.color}-500 to-${principle.color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <principle.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-deep-navy-900 mb-4">
                  {principle.title}
                </h3>
                
                <p className="text-academic-gray-600 mb-4 leading-relaxed">
                  {principle.description}
                </p>

                <div className="space-y-2">
                  {principle.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className={`w-3 h-3 text-${principle.color}-500`} />
                      <span className="text-academic-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Transparency Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-paper-white rounded-3xl p-8 border border-academic-gray-200 shadow-xl mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-deep-navy-900 mb-4">
              AI Transparency in Action
            </h3>
            <p className="text-academic-gray-600 max-w-2xl mx-auto">
              See how our AI provides transparent, ethical suggestions with full source attribution
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Document Editor Mockup */}
            <div className="bg-academic-gray-50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-deep-navy-900 font-semibold">Document Editor</h4>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-soft-gold-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-deep-navy-400 rounded-full"></div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-paper-white rounded-xl p-4 border border-academic-gray-200">
                  <p className="text-academic-gray-700 text-sm leading-relaxed">
                    The impact of climate change on agricultural productivity has been extensively studied in recent decades. 
                    <span className="bg-yellow-100 px-1 rounded">Research indicates</span> that rising temperatures and changing precipitation patterns significantly affect crop yields.
                  </p>
                </div>
                
                <div className="bg-paper-white rounded-xl p-4 border border-academic-gray-200">
                  <p className="text-academic-gray-700 text-sm leading-relaxed">
                    <span className="bg-green-100 px-1 rounded">Studies have shown</span> that adaptation strategies, including crop diversification and improved irrigation systems, can mitigate some of these effects.
                  </p>
                </div>
              </div>
            </div>

            {/* AI Suggestions Panel */}
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-emerald-50 to-deep-navy-50 border border-emerald-200 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Brain className="w-5 h-5 text-emerald-600" />
                  <span className="text-deep-navy-900 font-semibold">AI Suggestion</span>
                  <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                    95% Confidence
                  </div>
                </div>
                <p className="text-academic-gray-700 text-sm mb-3">
                  Consider adding specific data points to strengthen your argument about climate change impacts.
                </p>
                <div className="bg-paper-white rounded-lg p-3 border border-emerald-200">
                  <div className="text-xs text-academic-gray-500 mb-2">Referenced Sources:</div>
                  <div className="space-y-1">
                    <div className="text-xs text-deep-navy-700">• IPCC Climate Report 2023</div>
                    <div className="text-xs text-deep-navy-700">• Nature Climate Change (2022)</div>
                    <div className="text-xs text-deep-navy-700">• Agricultural Systems Journal</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-soft-gold-50 to-emerald-50 border border-soft-gold-200 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Shield className="w-5 h-5 text-soft-gold-600" />
                  <span className="text-deep-navy-900 font-semibold">Integrity Check</span>
                  <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                    Passed ✓
                  </div>
                </div>
                <p className="text-academic-gray-700 text-sm">
                  Your writing shows original analysis with proper citation structure. No plagiarism detected.
                </p>
              </div>

              <div className="bg-gradient-to-r from-deep-navy-50 to-emerald-50 border border-deep-navy-200 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Target className="w-5 h-5 text-deep-navy-600" />
                  <span className="text-deep-navy-900 font-semibold">Learning Objective</span>
                </div>
                <p className="text-academic-gray-700 text-sm">
                  This suggestion helps develop critical thinking and evidence-based writing skills.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Transparency Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {transparencyFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className={`w-16 h-16 bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-deep-navy-900 font-semibold mb-2">{feature.title}</h4>
              <p className="text-academic-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Ethical AI Commitment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-deep-navy-500 to-emerald-500 rounded-3xl p-8 text-center text-white"
        >
          <div className="max-w-3xl mx-auto">
            <Shield className="w-16 h-16 mx-auto mb-6 text-white" />
            <h3 className="text-3xl font-bold mb-6">
              Our Commitment to Ethical AI
            </h3>
            <p className="text-xl mb-8 opacity-90">
              We believe AI should enhance education while maintaining the highest standards of academic integrity. 
              Every feature is designed with transparency, accountability, and educational value in mind.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="opacity-90">Transparent AI</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Zero</div>
                <div className="opacity-90">Plagiarism Tolerance</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="opacity-90">Human Oversight</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
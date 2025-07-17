import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  GraduationCap, 
  Users, 
  Brain, 
  FileText, 
  CheckCircle, 
  ArrowRight,
  Clock,
  Award,
  Eye,
  BookOpen,
  Shield,
  Zap,
  Target,
  TrendingUp,
  BarChart3,
  Settings,
  MessageSquare,
  Calendar,
  Download,
  Upload
} from 'lucide-react'

export default function DualPersonaFeatures() {
  const [activePersona, setActivePersona] = useState('student')

  const studentFeatures = [
    {
      icon: Brain,
      title: 'Smart AI Feedback',
      description: 'Get instant, personalized feedback on your assignments with detailed explanations',
      benefits: ['Grammar & style suggestions', 'Structure improvements', 'Citation assistance'],
      color: 'emerald',
      gradient: 'from-emerald-50 to-emerald-100'
    },
    {
      icon: Shield,
      title: 'Academic Integrity Protection',
      description: 'Ensure your work meets academic standards with built-in plagiarism detection',
      benefits: ['Originality checking', 'Citation validation', 'Academic policy compliance'],
      color: 'deep-navy',
      gradient: 'from-deep-navy-50 to-deep-navy-100'
    },
    {
      icon: BookOpen,
      title: 'Learning Enhancement',
      description: 'Improve your writing skills with AI-powered learning resources and tutorials',
      benefits: ['Writing style guides', 'Subject-specific tips', 'Progress tracking'],
      color: 'soft-gold',
      gradient: 'from-soft-gold-50 to-soft-gold-100'
    },
    {
      icon: Target,
      title: 'Grade Improvement',
      description: 'Achieve better grades with targeted feedback and improvement suggestions',
      benefits: ['Performance analytics', 'Weakness identification', 'Study recommendations'],
      color: 'emerald',
      gradient: 'from-emerald-50 to-emerald-100'
    }
  ]

  const professorFeatures = [
    {
      icon: Users,
      title: 'Class Management',
      description: 'Efficiently manage multiple classes, students, and assignments in one platform',
      benefits: ['Student enrollment', 'Assignment creation', 'Grade tracking'],
      color: 'emerald',
      gradient: 'from-emerald-50 to-emerald-100'
    },
    {
      icon: Award,
      title: 'Automated Grading',
      description: 'Save hours with AI-powered grading that maintains academic standards',
      benefits: ['Rubric-based assessment', 'Consistent evaluation', 'Time savings'],
      color: 'deep-navy',
      gradient: 'from-deep-navy-50 to-deep-navy-100'
    },
    {
      icon: Eye,
      title: 'Integrity Monitoring',
      description: 'Detect and prevent academic dishonesty with advanced AI analysis',
      benefits: ['Plagiarism detection', 'AI usage monitoring', 'Audit trails'],
      color: 'soft-gold',
      gradient: 'from-soft-gold-50 to-soft-gold-100'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Get detailed analytics on class performance and student progress',
      benefits: ['Performance metrics', 'Trend analysis', 'Individual tracking'],
      color: 'emerald',
      gradient: 'from-emerald-50 to-emerald-100'
    }
  ]

  const features = activePersona === 'student' ? studentFeatures : professorFeatures

  const workflows = {
    student: [
      { step: 1, title: 'Upload Assignment', icon: Upload, description: 'Submit your document for AI analysis' },
      { step: 2, title: 'AI Analysis', icon: Brain, description: 'Get instant feedback and suggestions' },
      { step: 3, title: 'Review & Improve', icon: Eye, description: 'Apply suggestions and enhance your work' },
      { step: 4, title: 'Submit with Confidence', icon: CheckCircle, description: 'Submit knowing your work meets standards' }
    ],
    professor: [
      { step: 1, title: 'Create Assignment', icon: FileText, description: 'Set up assignments with rubrics' },
      { step: 2, title: 'Student Submissions', icon: Download, description: 'Receive and organize submissions' },
      { step: 3, title: 'AI Grading', icon: Award, description: 'Automated assessment with human oversight' },
      { step: 4, title: 'Review & Approve', icon: CheckCircle, description: 'Final review and grade release' }
    ]
  }

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
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-sm font-medium mb-6">
            <Users className="w-4 h-4 mr-2" />
            Dual-Persona Features
          </div>
          <h2 className="text-4xl font-bold text-deep-navy-900 mb-6">
            Tailored for Your Academic Role
          </h2>
          <p className="text-xl text-academic-gray-600 max-w-3xl mx-auto">
            Whether you're a student seeking academic support or a professor scaling your teaching impact, 
            our platform adapts to your specific needs and workflow.
          </p>
        </motion.div>

        {/* Persona Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center bg-paper-white rounded-full p-1 shadow-lg border border-academic-gray-200">
            <button
              onClick={() => setActivePersona('student')}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center ${
                activePersona === 'student'
                  ? 'bg-deep-navy-500 text-white shadow-md'
                  : 'text-academic-gray-600 hover:text-deep-navy-500'
              }`}
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              Student Features
            </button>
            <button
              onClick={() => setActivePersona('professor')}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center ${
                activePersona === 'professor'
                  ? 'bg-deep-navy-500 text-white shadow-md'
                  : 'text-academic-gray-600 hover:text-deep-navy-500'
              }`}
            >
              <Users className="w-4 h-4 mr-2" />
              Professor Features
            </button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className={`bg-gradient-to-br ${feature.gradient} border border-${feature.color}-200 rounded-2xl p-8 h-full hover:border-${feature.color}-300 transition-all duration-300 hover:transform hover:scale-105`}>
                <div className={`w-16 h-16 bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-deep-navy-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-academic-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                <div className="space-y-3">
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <CheckCircle className={`w-4 h-4 text-${feature.color}-500`} />
                      <span className="text-academic-gray-700 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Workflow Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-deep-navy-50 to-emerald-50 border border-deep-navy-200 rounded-3xl p-8 mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-deep-navy-900 mb-4">
              {activePersona === 'student' ? 'Student Workflow' : 'Professor Workflow'}
            </h3>
            <p className="text-academic-gray-600 max-w-2xl mx-auto">
              {activePersona === 'student' 
                ? 'Simple steps to improve your academic performance with AI assistance'
                : 'Streamlined process to manage classes and automate grading efficiently'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {workflows[activePersona].map((workflow, index) => (
              <motion.div
                key={workflow.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                {index < workflows[activePersona].length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-deep-navy-300 to-emerald-300 z-0"></div>
                )}
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-deep-navy-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <workflow.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="bg-paper-white rounded-xl p-4 border border-academic-gray-200 shadow-sm">
                    <div className="text-2xl font-bold text-deep-navy-900 mb-2">
                      {workflow.step}
                    </div>
                    <h4 className="text-deep-navy-900 font-semibold mb-2">
                      {workflow.title}
                    </h4>
                    <p className="text-academic-gray-600 text-sm">
                      {workflow.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ROI Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 items-center"
        >
          <div>
            <h3 className="text-3xl font-bold text-deep-navy-900 mb-6">
              {activePersona === 'student' ? 'Student Success Metrics' : 'Professor Impact Metrics'}
            </h3>
            <p className="text-academic-gray-600 mb-6 text-lg">
              {activePersona === 'student' 
                ? 'See measurable improvements in your academic performance and learning outcomes.'
                : 'Track the impact of AI-powered tools on your teaching efficiency and student outcomes.'
              }
            </p>
            
            <div className="space-y-4">
              {activePersona === 'student' ? (
                <>
                  <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
                    <span className="text-academic-gray-700">Average Grade Improvement</span>
                    <span className="text-emerald-600 font-bold text-xl">+35%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-deep-navy-50 rounded-xl">
                    <span className="text-academic-gray-700">Time Saved per Assignment</span>
                    <span className="text-deep-navy-600 font-bold text-xl">2.5 hours</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-soft-gold-50 rounded-xl">
                    <span className="text-academic-gray-700">Writing Confidence</span>
                    <span className="text-soft-gold-600 font-bold text-xl">+78%</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
                    <span className="text-academic-gray-700">Grading Time Saved</span>
                    <span className="text-emerald-600 font-bold text-xl">75%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-deep-navy-50 rounded-xl">
                    <span className="text-academic-gray-700">Student Engagement</span>
                    <span className="text-deep-navy-600 font-bold text-xl">+42%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-soft-gold-50 rounded-xl">
                    <span className="text-academic-gray-700">Administrative Efficiency</span>
                    <span className="text-soft-gold-600 font-bold text-xl">+60%</span>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="bg-paper-white rounded-2xl p-6 border border-academic-gray-200 shadow-lg">
            <h4 className="text-deep-navy-900 font-semibold mb-4">
              {activePersona === 'student' ? 'Student Dashboard Preview' : 'Professor Dashboard Preview'}
            </h4>
            <div className="space-y-4">
              <div className="bg-academic-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-deep-navy-900 font-medium">
                    {activePersona === 'student' ? 'Recent Assignments' : 'Class Overview'}
                  </span>
                  <span className="text-emerald-600 text-sm font-medium">
                    {activePersona === 'student' ? '3 Pending' : '5 Active Classes'}
                  </span>
                </div>
                <div className="space-y-2">
                  {activePersona === 'student' ? (
                    <>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        <span className="text-academic-gray-700 text-sm">Essay Draft - 85% Complete</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-soft-gold-400 rounded-full"></div>
                        <span className="text-academic-gray-700 text-sm">Research Paper - Ready for Review</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        <span className="text-academic-gray-700 text-sm">English 101 - 45 Students</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-soft-gold-400 rounded-full"></div>
                        <span className="text-academic-gray-700 text-sm">History 201 - 32 Students</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-50 to-deep-navy-50 rounded-xl p-4 border border-emerald-200">
                <div className="flex items-center space-x-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <span className="text-deep-navy-900 font-medium">
                    {activePersona === 'student' ? 'Performance Trend' : 'Class Analytics'}
                  </span>
                </div>
                <div className="w-full bg-academic-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-gradient-to-r from-emerald-400 to-deep-navy-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <div className="text-xs text-academic-gray-500">
                  {activePersona === 'student' ? '85% improvement this semester' : '85% of students showing progress'}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
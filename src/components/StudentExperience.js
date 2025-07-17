import React from 'react'
import { motion } from 'framer-motion'
import { 
  GraduationCap, 
  Brain, 
  BookOpen, 
  Target, 
  CheckCircle, 
  ArrowRight,
  Clock,
  Award,
  Eye,
  Shield,
  Zap,
  TrendingUp,
  MessageSquare,
  Calendar,
  Download,
  Upload,
  Star,
  Users
} from 'lucide-react'

export default function StudentExperience() {
  const studentFeatures = [
    {
      icon: Brain,
      title: 'Smart AI Feedback',
      description: 'Get instant, personalized feedback on your writing with detailed explanations',
      color: 'emerald',
      benefits: ['Grammar suggestions', 'Style improvements', 'Structure analysis']
    },
    {
      icon: Shield,
      title: 'Academic Integrity',
      description: 'Ensure your work meets academic standards with built-in safeguards',
      color: 'deep-navy',
      benefits: ['Plagiarism detection', 'Citation checking', 'Originality verification']
    },
    {
      icon: BookOpen,
      title: 'Learning Resources',
      description: 'Access comprehensive study materials and writing guides',
      color: 'soft-gold',
      benefits: ['Writing tutorials', 'Subject guides', 'Citation help']
    },
    {
      icon: Target,
      title: 'Progress Tracking',
      description: 'Monitor your improvement with detailed analytics and insights',
      color: 'emerald',
      benefits: ['Performance metrics', 'Weakness identification', 'Study recommendations']
    }
  ]

  const assignmentQueue = [
    { id: 1, title: 'Essay - Climate Change Impact', status: 'completed', grade: 'A-', time: '2 hours ago' },
    { id: 2, title: 'Research Paper - AI Ethics', status: 'in-progress', grade: null, time: '1 day ago' },
    { id: 3, title: 'Lab Report - Chemistry', status: 'pending', grade: null, time: '3 days ago' },
    { id: 4, title: 'Final Project - History', status: 'draft', grade: null, time: '1 week ago' }
  ]

  const learningStats = [
    { metric: 'Grade Improvement', value: '+35%', color: 'emerald' },
    { metric: 'Writing Confidence', value: '+78%', color: 'deep-navy' },
    { metric: 'Time Saved', value: '2.5 hrs', color: 'soft-gold' },
    { metric: 'Assignments Completed', value: '24', color: 'emerald' }
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
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-sm font-medium mb-6">
            <GraduationCap className="w-4 h-4 mr-2" />
            Student Experience
          </div>
          <h2 className="text-4xl font-bold text-deep-navy-900 mb-6">
            Transform Your Academic Journey
          </h2>
          <p className="text-xl text-academic-gray-600 max-w-3xl mx-auto">
            Experience AI-powered learning that enhances your skills while maintaining academic integrity. 
            Get personalized feedback, improve your writing, and achieve better grades.
          </p>
        </motion.div>

        {/* Student Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {studentFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className={`bg-gradient-to-br from-${feature.color}-50 to-${feature.color}-100 border border-${feature.color}-200 rounded-2xl p-8 h-full hover:border-${feature.color}-300 transition-all duration-300 hover:transform hover:scale-105`}>
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

        {/* Student Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-paper-white rounded-3xl p-8 border border-academic-gray-200 shadow-xl mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-deep-navy-900 mb-4">
              Student Dashboard Preview
            </h3>
            <p className="text-academic-gray-600 max-w-2xl mx-auto">
              See how our platform enhances your learning experience with AI-powered assistance
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Assignment Queue */}
            <div className="bg-gradient-to-r from-emerald-50 to-deep-navy-50 border border-emerald-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-deep-navy-900 font-semibold">My Assignments</h4>
                <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                  4 Active
                </div>
              </div>
              
              <div className="space-y-3">
                {assignmentQueue.map((assignment) => (
                  <div key={assignment.id} className="bg-paper-white rounded-xl p-3 border border-academic-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-deep-navy-900 font-medium text-sm">{assignment.title}</span>
                      {assignment.status === 'completed' ? (
                        <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs">
                          {assignment.grade}
                        </div>
                      ) : assignment.status === 'in-progress' ? (
                        <div className="bg-soft-gold-100 text-soft-gold-700 px-2 py-1 rounded-full text-xs">
                          In Progress
                        </div>
                      ) : (
                        <div className="bg-deep-navy-100 text-deep-navy-700 px-2 py-1 rounded-full text-xs">
                          {assignment.status}
                        </div>
                      )}
                    </div>
                    <div className="text-academic-gray-500 text-xs">{assignment.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Feedback */}
            <div className="bg-academic-gray-50 rounded-2xl p-6">
              <h4 className="text-deep-navy-900 font-semibold mb-4">AI Feedback</h4>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-emerald-50 to-soft-gold-50 border border-emerald-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Brain className="w-5 h-5 text-emerald-600" />
                    <span className="text-deep-navy-900 font-semibold text-sm">Writing Enhancement</span>
                  </div>
                  <p className="text-academic-gray-700 text-sm mb-3">
                    Consider strengthening your thesis statement with more specific evidence.
                  </p>
                  <div className="flex items-center justify-between text-xs text-academic-gray-500">
                    <span>Confidence: 95%</span>
                    <span>Sources: 3</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-deep-navy-50 to-emerald-50 border border-deep-navy-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Shield className="w-5 h-5 text-deep-navy-600" />
                    <span className="text-deep-navy-900 font-semibold text-sm">Integrity Check</span>
                  </div>
                  <p className="text-academic-gray-700 text-sm">
                    Your work shows original analysis. No plagiarism detected.
                  </p>
                </div>
              </div>
            </div>

            {/* Learning Analytics */}
            <div className="bg-gradient-to-r from-soft-gold-50 to-emerald-50 border border-soft-gold-200 rounded-2xl p-6">
              <h4 className="text-deep-navy-900 font-semibold mb-4">Learning Analytics</h4>
              <div className="space-y-4">
                {learningStats.map((stat, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-academic-gray-600">{stat.metric}</span>
                      <span className={`text-${stat.color}-600 font-semibold`}>{stat.value}</span>
                    </div>
                    <div className="w-full bg-academic-gray-200 rounded-full h-2">
                      <div className={`bg-${stat.color}-400 h-2 rounded-full`} style={{ width: index === 0 ? '85%' : index === 1 ? '78%' : index === 2 ? '65%' : '90%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Student Workflow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-deep-navy-50 to-emerald-50 border border-deep-navy-200 rounded-3xl p-8 mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-deep-navy-900 mb-4">
              Simple Student Workflow
            </h3>
            <p className="text-academic-gray-600 max-w-2xl mx-auto">
              Four easy steps to improve your academic performance with AI assistance
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-deep-navy-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-deep-navy-900 font-semibold mb-2">1. Upload Assignment</h4>
              <p className="text-academic-gray-600 text-sm">Submit your document for AI analysis</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-soft-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-deep-navy-900 font-semibold mb-2">2. Get AI Feedback</h4>
              <p className="text-academic-gray-600 text-sm">Receive instant suggestions and improvements</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-soft-gold-500 to-deep-navy-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-deep-navy-900 font-semibold mb-2">3. Review & Improve</h4>
              <p className="text-academic-gray-600 text-sm">Apply suggestions and enhance your work</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-deep-navy-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-deep-navy-900 font-semibold mb-2">4. Submit with Confidence</h4>
              <p className="text-academic-gray-600 text-sm">Submit knowing your work meets standards</p>
            </div>
          </div>
        </motion.div>

        {/* Student Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 items-center"
        >
          <div>
            <h3 className="text-3xl font-bold text-deep-navy-900 mb-6">
              Why Students Love AssignmentAI
            </h3>
            <p className="text-academic-gray-600 mb-6 text-lg">
              Our platform is designed to enhance your learning experience while maintaining 
              the highest standards of academic integrity.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-academic-gray-700">35% average grade improvement</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-academic-gray-700">2.5 hours saved per assignment</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-academic-gray-700">78% increase in writing confidence</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-academic-gray-700">100% academic integrity guarantee</span>
              </div>
            </div>
          </div>
          
          <div className="bg-paper-white rounded-2xl p-6 border border-academic-gray-200 shadow-lg">
            <h4 className="text-deep-navy-900 font-semibold mb-4">Student Success Stories</h4>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-emerald-50 to-deep-navy-50 rounded-xl p-4 border border-emerald-200">
                <div className="flex items-center space-x-3 mb-2">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <span className="text-deep-navy-900 font-medium">Sarah M.</span>
                  <Star className="w-4 h-4 text-soft-gold-500" />
                  <span className="text-soft-gold-600 text-sm">5.0</span>
                </div>
                <p className="text-academic-gray-600 text-sm">
                  "AssignmentAI helped me improve my writing skills and boosted my confidence. My grades went from B- to A!"
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-soft-gold-50 to-emerald-50 rounded-xl p-4 border border-soft-gold-200">
                <div className="flex items-center space-x-3 mb-2">
                  <Users className="w-5 h-5 text-soft-gold-600" />
                  <span className="text-deep-navy-900 font-medium">Michael T.</span>
                  <Star className="w-4 h-4 text-soft-gold-500" />
                  <span className="text-soft-gold-600 text-sm">5.0</span>
                </div>
                <p className="text-academic-gray-600 text-sm">
                  "The AI feedback is incredibly helpful and the integrity features give me peace of mind."
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-deep-navy-50 to-emerald-50 rounded-xl p-4 border border-deep-navy-200">
                <div className="flex items-center space-x-3 mb-2">
                  <Users className="w-5 h-5 text-deep-navy-600" />
                  <span className="text-deep-navy-900 font-medium">Emma L.</span>
                  <Star className="w-4 h-4 text-soft-gold-500" />
                  <span className="text-soft-gold-600 text-sm">5.0</span>
                </div>
                <p className="text-academic-gray-600 text-sm">
                  "I love how it saves me time while helping me learn. The citation assistance is amazing!"
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
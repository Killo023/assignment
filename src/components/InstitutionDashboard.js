import React from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Award, 
  BarChart3, 
  Settings, 
  MessageSquare, 
  Calendar,
  FileText,
  Eye,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Download,
  Upload,
  Brain,
  Shield
} from 'lucide-react'

export default function InstitutionDashboard() {
  const dashboardFeatures = [
    {
      icon: Users,
      title: 'Class Management',
      description: 'Efficiently manage multiple classes, students, and assignments',
      color: 'emerald',
      stats: '5 Active Classes'
    },
    {
      icon: Award,
      title: 'Automated Grading',
      description: 'AI-powered assessment with human oversight',
      color: 'deep-navy',
      stats: '75% Time Saved'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Comprehensive performance metrics and trends',
      color: 'soft-gold',
      stats: 'Real-time Data'
    },
    {
      icon: Eye,
      title: 'Integrity Monitoring',
      description: 'Advanced plagiarism and AI usage detection',
      color: 'emerald',
      stats: '99.8% Accuracy'
    }
  ]

  const gradingQueue = [
    { id: 1, student: 'Sarah Johnson', assignment: 'Essay - Climate Change', status: 'graded', grade: 'A-', time: '2 min ago' },
    { id: 2, student: 'Michael Chen', assignment: 'Research Paper', status: 'pending', grade: null, time: '5 min ago' },
    { id: 3, student: 'Emma Davis', assignment: 'Lab Report', status: 'review', grade: null, time: '8 min ago' },
    { id: 4, student: 'James Wilson', assignment: 'Final Project', status: 'graded', grade: 'B+', time: '12 min ago' }
  ]

  const classStats = [
    { name: 'English 101', students: 45, assignments: 8, avgGrade: 'B+' },
    { name: 'History 201', students: 32, assignments: 6, avgGrade: 'A-' },
    { name: 'Biology 150', students: 28, assignments: 10, avgGrade: 'B' },
    { name: 'Math 205', students: 38, assignments: 12, avgGrade: 'B+' }
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
            <Users className="w-4 h-4 mr-2" />
            Institution Dashboard
          </div>
          <h2 className="text-4xl font-bold text-deep-navy-900 mb-6">
            Scale Your Teaching Impact
          </h2>
          <p className="text-xl text-academic-gray-600 max-w-3xl mx-auto">
            Powerful tools for professors and institutions to manage classes, automate grading, 
            and maintain academic integrity at scale.
          </p>
        </motion.div>

        {/* Dashboard Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {dashboardFeatures.map((feature, index) => (
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

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-paper-white rounded-3xl p-8 border border-academic-gray-200 shadow-xl mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-deep-navy-900 mb-4">
              Professor Dashboard Preview
            </h3>
            <p className="text-academic-gray-600 max-w-2xl mx-auto">
              See how our platform streamlines academic management and assessment
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Grading Queue */}
            <div className="bg-gradient-to-r from-emerald-50 to-deep-navy-50 border border-emerald-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-deep-navy-900 font-semibold">Grading Queue</h4>
                <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                  4 Pending
                </div>
              </div>
              
              <div className="space-y-3">
                {gradingQueue.map((item) => (
                  <div key={item.id} className="bg-paper-white rounded-xl p-3 border border-academic-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-deep-navy-900 font-medium text-sm">{item.student}</span>
                      {item.status === 'graded' ? (
                        <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs">
                          {item.grade}
                        </div>
                      ) : item.status === 'review' ? (
                        <div className="bg-soft-gold-100 text-soft-gold-700 px-2 py-1 rounded-full text-xs">
                          Review
                        </div>
                      ) : (
                        <div className="bg-deep-navy-100 text-deep-navy-700 px-2 py-1 rounded-full text-xs">
                          Pending
                        </div>
                      )}
                    </div>
                    <div className="text-academic-gray-600 text-xs mb-1">{item.assignment}</div>
                    <div className="text-academic-gray-500 text-xs">{item.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Class Overview */}
            <div className="bg-academic-gray-50 rounded-2xl p-6">
              <h4 className="text-deep-navy-900 font-semibold mb-4">Class Overview</h4>
              <div className="space-y-3">
                {classStats.map((cls, index) => (
                  <div key={index} className="bg-paper-white rounded-xl p-3 border border-academic-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-deep-navy-900 font-medium text-sm">{cls.name}</span>
                      <span className="text-emerald-600 font-bold text-sm">{cls.avgGrade}</span>
                    </div>
                    <div className="flex justify-between text-xs text-academic-gray-600">
                      <span>{cls.students} students</span>
                      <span>{cls.assignments} assignments</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Analytics */}
            <div className="bg-gradient-to-r from-soft-gold-50 to-emerald-50 border border-soft-gold-200 rounded-2xl p-6">
              <h4 className="text-deep-navy-900 font-semibold mb-4">Performance Analytics</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-academic-gray-600">Grading Efficiency</span>
                    <span className="text-emerald-600 font-semibold">+75%</span>
                  </div>
                  <div className="w-full bg-academic-gray-200 rounded-full h-2">
                    <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-academic-gray-600">Student Engagement</span>
                    <span className="text-deep-navy-600 font-semibold">+42%</span>
                  </div>
                  <div className="w-full bg-academic-gray-200 rounded-full h-2">
                    <div className="bg-deep-navy-400 h-2 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-academic-gray-600">Integrity Score</span>
                    <span className="text-soft-gold-600 font-semibold">98.5%</span>
                  </div>
                  <div className="w-full bg-academic-gray-200 rounded-full h-2">
                    <div className="bg-soft-gold-400 h-2 rounded-full" style={{ width: '98.5%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Workflow Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-deep-navy-50 to-emerald-50 border border-deep-navy-200 rounded-3xl p-8 mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-deep-navy-900 mb-4">
              Streamlined Academic Workflow
            </h3>
            <p className="text-academic-gray-600 max-w-2xl mx-auto">
              From assignment creation to final grading, our platform optimizes every step of the academic process
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-deep-navy-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-deep-navy-900 font-semibold mb-2">1. Create Assignment</h4>
              <p className="text-academic-gray-600 text-sm">Set up assignments with rubrics and requirements</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-soft-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-deep-navy-900 font-semibold mb-2">2. Receive Submissions</h4>
              <p className="text-academic-gray-600 text-sm">Students submit work through secure portal</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-soft-gold-500 to-deep-navy-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-deep-navy-900 font-semibold mb-2">3. AI Assessment</h4>
              <p className="text-academic-gray-600 text-sm">Automated grading with human oversight</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-deep-navy-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-deep-navy-900 font-semibold mb-2">4. Review & Approve</h4>
              <p className="text-academic-gray-600 text-sm">Final review and grade release</p>
            </div>
          </div>
        </motion.div>

        {/* Benefits for Institutions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 items-center"
        >
          <div>
            <h3 className="text-3xl font-bold text-deep-navy-900 mb-6">
              Why Institutions Choose AssignmentAI
            </h3>
            <p className="text-academic-gray-600 mb-6 text-lg">
              Our platform is designed to meet the unique needs of educational institutions, 
              providing scalable solutions that maintain academic standards.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-academic-gray-700">Reduce administrative workload by 60%</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-academic-gray-700">Maintain academic integrity standards</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-academic-gray-700">Scale to thousands of students</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-academic-gray-700">Comprehensive analytics and reporting</span>
              </div>
            </div>
          </div>
          
          <div className="bg-paper-white rounded-2xl p-6 border border-academic-gray-200 shadow-lg">
            <h4 className="text-deep-navy-900 font-semibold mb-4">Institution Analytics</h4>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-emerald-50 to-deep-navy-50 rounded-xl p-4 border border-emerald-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-deep-navy-900 font-medium">Department Performance</span>
                  <span className="text-emerald-600 font-bold">+28%</span>
                </div>
                <div className="text-academic-gray-600 text-sm">Average grade improvement across all departments</div>
              </div>
              
              <div className="bg-gradient-to-r from-soft-gold-50 to-emerald-50 rounded-xl p-4 border border-soft-gold-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-deep-navy-900 font-medium">Faculty Efficiency</span>
                  <span className="text-soft-gold-600 font-bold">+75%</span>
                </div>
                <div className="text-academic-gray-600 text-sm">Time saved on grading and administrative tasks</div>
              </div>
              
              <div className="bg-gradient-to-r from-deep-navy-50 to-emerald-50 rounded-xl p-4 border border-deep-navy-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-deep-navy-900 font-medium">Student Satisfaction</span>
                  <span className="text-deep-navy-600 font-bold">4.8/5</span>
                </div>
                <div className="text-academic-gray-600 text-sm">Average student satisfaction rating</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
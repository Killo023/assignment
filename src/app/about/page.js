'use client'

import { motion } from 'framer-motion'
import { 
  Brain, 
  Users, 
  Target, 
  Award, 
  Globe, 
  Shield,
  Zap,
  Heart
} from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { number: '50,000+', label: 'Students Helped', icon: Users },
    { number: '95%', label: 'Success Rate', icon: Target },
    { number: '24/7', label: 'AI Support', icon: Zap },
    { number: '100%', label: 'Secure', icon: Shield }
  ]

  const values = [
    {
      icon: Brain,
      title: 'Innovation',
      description: 'We leverage cutting-edge AI technology to provide intelligent academic assistance.'
    },
    {
      icon: Heart,
      title: 'Student Success',
      description: 'Your academic success is our primary goal. We\'re here to support your learning journey.'
    },
    {
      icon: Shield,
      title: 'Academic Integrity',
      description: 'We promote ethical learning practices and help you develop your own skills.'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Quality education support should be available to students worldwide.'
    }
  ]

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief AI Officer',
      bio: 'Former Stanford researcher with 15+ years in educational technology and AI.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Product',
      bio: 'Education technology veteran who has helped scale multiple edtech startups.'
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Academic Director',
      bio: 'PhD in Education with expertise in curriculum development and student learning outcomes.'
    },
    {
      name: 'Alex Thompson',
      role: 'Lead Engineer',
      bio: 'Full-stack developer passionate about creating intuitive educational tools.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-white mb-6">
              About AssignmentAI
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're revolutionizing how students approach their academic assignments through 
              intelligent AI assistance, making quality education support accessible to everyone.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto">
              To democratize access to high-quality academic support by leveraging artificial intelligence 
              to provide personalized, intelligent assistance that helps students learn more effectively 
              and achieve their educational goals.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Our Values</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              These core principles guide everything we do at AssignmentAI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="card text-center"
              >
                <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  AssignmentAI was born from a simple observation: students around the world struggle 
                  with academic assignments, often feeling overwhelmed and unsupported. Traditional 
                  tutoring services are expensive and not always accessible.
                </p>
                <p>
                  Our founders, a team of educators and technologists, recognized the potential of 
                  artificial intelligence to bridge this gap. We set out to create an AI-powered 
                  platform that could provide intelligent, personalized academic assistance to 
                  students of all backgrounds.
                </p>
                <p>
                  Today, AssignmentAI serves tens of thousands of students worldwide, helping them 
                  improve their academic performance while developing better learning strategies. 
                  We're proud to be part of their educational journey.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="relative"
            >
              <div className="w-full h-96 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl border border-gray-700 flex items-center justify-center">
                <Brain className="w-24 h-24 text-blue-400" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Meet Our Team</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              The passionate individuals behind AssignmentAI's mission to transform education
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                className="card text-center"
              >
                <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-blue-400 mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Transform Your Academic Experience?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Join thousands of students who have already improved their grades with AssignmentAI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/dashboard" className="btn-primary text-lg px-8 py-4">
                Start Free Trial
              </a>
              <a href="/contact" className="btn-secondary text-lg px-8 py-4">
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 
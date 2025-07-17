import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  Shield,
  Brain,
  Users,
  Award
} from 'lucide-react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'How does AssignmentAI maintain academic integrity?',
      answer: 'Our platform is built with academic integrity at its core. We use transparent AI that provides source attribution for all suggestions, built-in plagiarism detection, and confidence scoring. Every AI recommendation includes references to academic sources, and we maintain strict compliance with university honor codes.',
      category: 'integrity',
      icon: Shield
    },
    {
      question: 'What makes AssignmentAI different from other AI writing tools?',
      answer: 'Unlike generic AI writing tools, AssignmentAI is specifically designed for academic use. We focus on educational enhancement rather than content generation, provide transparent source attribution, maintain academic integrity standards, and offer role-specific features for both students and professors.',
      category: 'features',
      icon: Brain
    },
    {
      question: 'Can professors use AssignmentAI for grading?',
      answer: 'Yes! Our platform includes comprehensive tools for professors including automated grading with human oversight, class management, integrity monitoring, and detailed analytics. Professors can set custom rubrics, monitor student progress, and maintain academic standards while saving significant time.',
      category: 'professors',
      icon: Users
    },
    {
      question: 'What kind of support do you offer for institutions?',
      answer: 'We provide enterprise-level support including dedicated account managers, custom training programs, API access, LMS integrations, and white-label options. Our team works closely with institutions to ensure successful implementation and ongoing support.',
      category: 'institutions',
      icon: Award
    },
    {
      question: 'How accurate is the plagiarism detection?',
      answer: 'Our plagiarism detection achieves 99.8% accuracy by scanning against billions of academic sources, including published papers, books, and online content. We also detect AI-generated content and provide detailed reports with source links and similarity percentages.',
      category: 'integrity',
      icon: Shield
    },
    {
      question: 'Do you offer student discounts?',
      answer: 'Yes! We offer special pricing for students with valid student IDs. Additionally, many universities provide institutional access to AssignmentAI, allowing students to use the platform at no additional cost. Contact us for verification and pricing details.',
      category: 'pricing',
      icon: Award
    },
    {
      question: 'What data security measures do you have in place?',
      answer: 'We implement bank-level security including 256-bit encryption, SOC 2 Type II compliance, FERPA compliance for student privacy, and GDPR readiness. All data is encrypted in transit and at rest, and we never share user data with third parties.',
      category: 'security',
      icon: Shield
    },
    {
      question: 'Can I integrate AssignmentAI with my existing LMS?',
      answer: 'Yes! We offer integrations with major Learning Management Systems including Canvas, Blackboard, Moodle, and Google Classroom. Our API also allows for custom integrations with proprietary systems. Contact our sales team for specific integration requirements.',
      category: 'institutions',
      icon: Users
    },
    {
      question: 'What if I\'m not satisfied with the results?',
      answer: 'We offer a 30-day money-back guarantee for all individual plans. If you\'re not completely satisfied with your results, we\'ll provide a full refund, no questions asked. For institutions, we offer custom satisfaction guarantees as part of our service agreements.',
      category: 'support',
      icon: Award
    },
    {
      question: 'How do you ensure the AI suggestions are academically sound?',
      answer: 'Our AI is trained on academic databases and peer-reviewed sources. Every suggestion includes confidence scores and source references. We maintain a team of academic experts who continuously review and validate our AI outputs to ensure they meet scholarly standards.',
      category: 'quality',
      icon: Brain
    }
  ]

  const categories = [
    { name: 'All', icon: HelpCircle, color: 'emerald' },
    { name: 'Academic Integrity', icon: Shield, color: 'deep-navy' },
    { name: 'Features', icon: Brain, color: 'soft-gold' },
    { name: 'Professors', icon: Users, color: 'emerald' },
    { name: 'Institutions', icon: Award, color: 'deep-navy' }
  ]

  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredFaqs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => {
        const categoryMap = {
          'Academic Integrity': 'integrity',
          'Features': 'features',
          'Professors': 'professors',
          'Institutions': 'institutions'
        }
        return faq.category === categoryMap[selectedCategory]
      })

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
            <HelpCircle className="w-4 h-4 mr-2" />
            Frequently Asked Questions
          </div>
          <h2 className="text-4xl font-bold text-deep-navy-900 mb-6">
            Everything You Need to Know
          </h2>
          <p className="text-xl text-academic-gray-600 max-w-3xl mx-auto">
            Get answers to common questions about AssignmentAI's features, 
            academic integrity, and how we support both students and institutions.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex items-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.name
                  ? `bg-${category.color}-500 text-white shadow-md`
                  : 'bg-paper-white text-academic-gray-600 hover:text-deep-navy-500 border border-academic-gray-200'
              }`}
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <div className="bg-paper-white border border-academic-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-academic-gray-50 transition-colors duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 bg-gradient-to-r from-${faq.icon.name === 'Shield' ? 'emerald' : faq.icon.name === 'Brain' ? 'deep-navy' : faq.icon.name === 'Users' ? 'soft-gold' : 'emerald'}-500 to-${faq.icon.name === 'Shield' ? 'emerald' : faq.icon.name === 'Brain' ? 'deep-navy' : faq.icon.name === 'Users' ? 'soft-gold' : 'emerald'}-600 rounded-xl flex items-center justify-center`}>
                      <faq.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-deep-navy-900 pr-4">
                      {faq.question}
                    </h3>
                  </div>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-academic-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-academic-gray-500 flex-shrink-0" />
                  )}
                </button>
                
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-8 pb-6"
                  >
                    <div className="border-t border-academic-gray-200 pt-6">
                      <p className="text-academic-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-deep-navy-50 to-emerald-50 border border-deep-navy-200 rounded-3xl p-8 text-center"
        >
          <h3 className="text-3xl font-bold text-deep-navy-900 mb-4">
            Still Have Questions?
          </h3>
          <p className="text-academic-gray-600 mb-6 max-w-2xl mx-auto">
            Our support team is here to help you get the most out of AssignmentAI. 
            We're available 24/7 to answer any questions you might have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-deep-navy-500 to-deep-navy-600 hover:from-deep-navy-600 hover:to-deep-navy-700 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 mr-2" />
              Contact Support
            </button>
            <button className="bg-paper-white hover:bg-academic-gray-50 text-deep-navy-600 font-semibold px-8 py-4 rounded-xl text-lg border border-academic-gray-200 transition-all duration-300 flex items-center justify-center">
              <Users className="w-5 h-5 mr-2" />
              Schedule Demo
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
import React from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, TrendingUp, Award, Users } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Computer Science Student',
      institution: 'Stanford University',
      avatar: 'S',
      rating: 5,
      content: 'AssignmentAI completely transformed my academic journey. My grades improved from C+ to A- in just one semester. The AI feedback is incredibly detailed and the plagiarism detection gives me confidence in my work.',
      improvement: '+35%',
      beforeGrade: 'C+',
      afterGrade: 'A-',
      color: 'from-blue-500 to-purple-500'
    },
    {
      name: 'Michael Chen',
      role: 'Engineering Student',
      institution: 'MIT',
      avatar: 'M',
      rating: 5,
      content: 'The AI-powered analysis is mind-blowing. It caught issues I never would have noticed and provided specific suggestions that actually improved my writing. My professors have noticed the improvement!',
      improvement: '+42%',
      beforeGrade: 'B-',
      afterGrade: 'A',
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Business Student',
      institution: 'Harvard University',
      avatar: 'E',
      rating: 5,
      content: 'As an international student, I struggled with academic writing. AssignmentAI helped me understand proper citation, improve my grammar, and develop better arguments. It\'s like having a personal tutor 24/7.',
      improvement: '+28%',
      beforeGrade: 'C',
      afterGrade: 'B+',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'David Thompson',
      role: 'Professor',
      institution: 'University of California',
      avatar: 'D',
      rating: 5,
      content: 'I recommend AssignmentAI to all my students. The quality of submissions has improved significantly, and students are more confident in their work. The platform maintains academic integrity while providing valuable learning tools.',
      improvement: 'N/A',
      beforeGrade: 'N/A',
      afterGrade: 'N/A',
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'Lisa Wang',
      role: 'Graduate Student',
      institution: 'Columbia University',
      avatar: 'L',
      rating: 5,
      content: 'Writing my thesis was overwhelming until I found AssignmentAI. The AI helped me structure my arguments, improve my academic style, and ensure originality. I received the highest grade in my department.',
      improvement: '+45%',
      beforeGrade: 'B',
      afterGrade: 'A+',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      name: 'James Wilson',
      role: 'Academic Advisor',
      institution: 'Yale University',
      avatar: 'J',
      rating: 5,
      content: 'We\'ve seen a remarkable improvement in student performance since implementing AssignmentAI. The platform provides the perfect balance of assistance and learning, helping students develop essential academic skills.',
      improvement: 'N/A',
      beforeGrade: 'N/A',
      afterGrade: 'N/A',
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900/10 to-indigo-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600/20 border border-blue-400/30 text-blue-200 text-sm font-medium mb-6">
            <Quote className="w-4 h-4 mr-2" />
            Student Success Stories
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">
            What Our Students & Institutions Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of students who have transformed their academic performance 
            and institutions that have improved their educational outcomes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105 h-full">
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-300 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </blockquote>

                {/* Grade Improvement */}
                {testimonial.improvement !== 'N/A' && (
                  <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <div className="text-sm text-gray-400">Before</div>
                        <div className="text-2xl font-bold text-red-400">{testimonial.beforeGrade}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-400">Improvement</div>
                        <div className="text-2xl font-bold text-green-400">{testimonial.improvement}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-400">After</div>
                        <div className="text-2xl font-bold text-green-400">{testimonial.afterGrade}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${testimonial.color} rounded-full flex items-center justify-center`}>
                    <span className="text-white font-bold">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                    <div className="text-blue-400 text-sm font-medium">{testimonial.institution}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">35%</div>
            <div className="text-gray-300 font-semibold">Average Grade Improvement</div>
            <div className="text-gray-400 text-sm">Across all students</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">98%</div>
            <div className="text-gray-300 font-semibold">Student Satisfaction</div>
            <div className="text-gray-400 text-sm">Would recommend to peers</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-gray-300 font-semibold">Institutions Trust Us</div>
            <div className="text-gray-400 text-sm">Universities worldwide</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
            <div className="text-gray-300 font-semibold">Average Rating</div>
            <div className="text-gray-400 text-sm">From 2,500+ reviews</div>
          </div>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-blue-500/30 rounded-3xl p-8"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-2xl text-gray-300 mb-6 italic leading-relaxed">
                "AssignmentAI didn't just improve my grades—it transformed how I approach academic writing. 
                The AI feedback is incredibly insightful and the platform is so easy to use. 
                I went from struggling with essays to getting consistent A's."
              </blockquote>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <div>
                  <div className="text-white font-bold text-lg">Sarah Johnson</div>
                  <div className="text-gray-300">Computer Science Student</div>
                  <div className="text-blue-400 font-medium">Stanford University</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h4 className="text-white font-semibold mb-4">Sarah's Journey</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Writing Quality</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-600 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                    <span className="text-green-400 font-semibold">95%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Grade Improvement</span>
                  <span className="text-green-400 font-bold text-lg">+35%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Time Saved</span>
                  <span className="text-blue-400 font-bold text-lg">15 hrs/week</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Confidence Level</span>
                  <span className="text-purple-400 font-bold text-lg">98%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Join Thousands of Successful Students
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              See the same results as Sarah and thousands of other students. 
              Start your free trial today and transform your academic performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-2xl transition-all duration-300 transform hover:scale-105">
                Start Your Success Story
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl text-lg border border-white/20 transition-all duration-300">
                Read More Reviews
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
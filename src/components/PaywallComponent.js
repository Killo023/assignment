'use client'

import { Crown, Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function PaywallComponent({ feature, description, benefits = [] }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Crown className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          {feature} - Premium Feature
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Benefits */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-4">What you'll get:</h2>
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing */}
        <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl p-6 border border-purple-700">
          <h2 className="text-xl font-semibold text-white mb-4">Institution Plan</h2>
          <div className="mb-4">
            <span className="text-4xl font-bold text-white">$99</span>
            <span className="text-gray-300">/month</span>
          </div>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center text-gray-300">
              <Check className="w-4 h-4 text-green-400 mr-2" />
              Unlimited classes
            </li>
            <li className="flex items-center text-gray-300">
              <Check className="w-4 h-4 text-green-400 mr-2" />
              AI grading & feedback
            </li>
            <li className="flex items-center text-gray-300">
              <Check className="w-4 h-4 text-green-400 mr-2" />
              Plagiarism detection
            </li>
            <li className="flex items-center text-gray-300">
              <Check className="w-4 h-4 text-green-400 mr-2" />
              Advanced analytics
            </li>
            <li className="flex items-center text-gray-300">
              <Check className="w-4 h-4 text-green-400 mr-2" />
              Priority support
            </li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link 
          href="/pricing?plan=institution" 
          className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Upgrade to Institution Plan
          <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
        <p className="text-gray-400 text-sm mt-4">
          Start your 7-day free trial • Cancel anytime
        </p>
      </div>
    </div>
  )
} 
import React from 'react';
import Link from 'next/link';
import { Lock, Users, BarChart3, Shield, Zap, CheckCircle } from 'lucide-react';

export default function InstitutionPaywall({ feature, onUpgrade }) {
  const features = [
    {
      icon: Users,
      title: 'Unlimited Classes',
      description: 'Create and manage unlimited courses with full student enrollment'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive insights into student performance and engagement'
    },
    {
      icon: Shield,
      title: 'Plagiarism Detection',
      description: 'AI-powered plagiarism detection with detailed reports'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            {feature} Requires Institution Plan
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Upgrade to our Institution Plan to unlock advanced features for managing your educational institution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Free Plan */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-xl font-semibold text-white mb-4">Free Institution Plan</h3>
            <div className="text-3xl font-bold text-gray-400 mb-6">$0<span className="text-lg">/month</span></div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                2 classes maximum
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                Assignment management
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                AI grading tools
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                Basic institution settings
              </li>
            </ul>
            <div className="text-sm text-gray-500">
              Perfect for small institutions getting started
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-xl p-6 border-2 border-blue-500 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Recommended
              </span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Institution Plan</h3>
            <div className="text-3xl font-bold text-blue-400 mb-6">$99<span className="text-lg">/month</span></div>
            <ul className="space-y-3 mb-6">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  {feature.title}
                </li>
              ))}
            </ul>
            <button
              onClick={onUpgrade}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Upgrade Now
            </button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-400 mb-4">
            Need help choosing? Contact our sales team for a custom quote.
          </p>
          <Link href="/dashboard/institution" className="text-blue-400 hover:text-blue-300 transition-colors">
            ← Back to Institution Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
} 
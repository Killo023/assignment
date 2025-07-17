'use client'

import { useState } from 'react'
import { Brain, TrendingUp, Award, Users, Star, Zap } from 'lucide-react'

const SVGIllustration = ({ type, className = "", fallbackIcon: FallbackIcon = Brain }) => {
  const [imageError, setImageError] = useState(false)

  const getImageSrc = () => {
    switch (type) {
      case 'hero': return '/hero-illustration.svg'
      case 'stats': return '/stats-illustration.svg'
      case 'benefits': return '/benefits-illustration.svg'
      case 'features': return '/features-illustration.svg'
      case 'testimonials': return '/testimonials-illustration.svg'
      case 'cta': return '/cta-illustration.svg'
      default: return '/hero-illustration.svg'
    }
  }

  const getFallbackContent = () => {
    switch (type) {
      case 'hero':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Processing</h3>
            <p className="text-gray-400">Advanced AI technology at work</p>
          </div>
        )
      case 'stats':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Platform Statistics</h3>
            <p className="text-gray-400">Track your success metrics</p>
          </div>
        )
      case 'benefits':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Key Benefits</h3>
            <p className="text-gray-400">Why choose our platform</p>
          </div>
        )
      case 'features':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mb-4">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Advanced Features</h3>
            <p className="text-gray-400">Powerful tools for success</p>
          </div>
        )
      case 'testimonials':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Student Success</h3>
            <p className="text-gray-400">Real testimonials from users</p>
          </div>
        )
      case 'cta':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
              <Star className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Get Started</h3>
            <p className="text-gray-400">Join thousands of students</p>
          </div>
        )
      default:
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
              <FallbackIcon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Illustration</h3>
            <p className="text-gray-400">Visual content</p>
          </div>
        )
    }
  }

  if (imageError) {
    return (
      <div className={`flex items-center justify-center min-h-[300px] ${className}`}>
        {getFallbackContent()}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <img
        src={getImageSrc()}
        alt={`${type} illustration`}
        className="w-full h-auto"
        style={{ minHeight: '300px', display: 'block' }}
        onError={() => {
          console.error(`${type} image failed to load`);
          setImageError(true);
        }}
        onLoad={() => {
          console.log(`${type} image loaded successfully`);
        }}
      />
    </div>
  )
}

export default SVGIllustration 
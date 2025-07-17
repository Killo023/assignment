'use client'

import { useInstitutionSubscription } from '../../../../hooks/useInstitutionSubscription'
import InstitutionPaywall from '../../../../components/InstitutionPaywall'

export default function InstitutionAnalytics() {
  const { isPremium, isCancelled } = useInstitutionSubscription()

  const handleUpgrade = () => {
    window.location.href = '/pricing?plan=institution'
  }

  // Show paywall for premium features if user doesn't have access
  if (!isPremium || isCancelled) {
    return <InstitutionPaywall feature="Analytics" onUpgrade={handleUpgrade} />
  }

  return (
    <div className="bg-eggshell-white min-h-screen p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Analytics & Insights</h1>
      <p className="text-gray-600 mb-6 max-w-2xl">
        Comprehensive analytics and insights into student performance, engagement patterns, and institutional trends. 
        Make data-driven decisions to improve educational outcomes.
      </p>
      <div className="card-landing">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Analytics Dashboard</h2>
        <p className="text-gray-500">
          This feature is available with the Institution Plan. You can now:
        </p>
        <ul className="mt-4 space-y-2 text-gray-700">
          <li>• View comprehensive student performance analytics</li>
          <li>• Track engagement patterns and trends</li>
          <li>• Generate institutional reports and insights</li>
          <li>• Monitor assignment completion rates</li>
          <li>• Analyze plagiarism detection statistics</li>
        </ul>
      </div>
    </div>
  )
} 
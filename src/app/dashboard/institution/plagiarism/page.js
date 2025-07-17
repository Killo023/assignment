'use client'

import { useInstitutionSubscription } from '../../../../hooks/useInstitutionSubscription'
import InstitutionPaywall from '../../../../components/InstitutionPaywall'

export default function InstitutionPlagiarism() {
  const { isPremium, isCancelled } = useInstitutionSubscription()

  const handleUpgrade = () => {
    window.location.href = '/pricing?plan=institution'
  }

  // Show paywall for premium features if user doesn't have access
  if (!isPremium || isCancelled) {
    return <InstitutionPaywall feature="Plagiarism Detection" onUpgrade={handleUpgrade} />
  }

  return (
    <div className="bg-eggshell-white min-h-screen p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Plagiarism Detection</h1>
      <p className="text-gray-600 mb-6 max-w-2xl">
        Review flagged plagiarism cases, analyze similarity reports, and manage academic integrity. 
        Our AI-powered system detects potential issues across multiple sources.
      </p>
      <div className="card-landing">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Plagiarism Dashboard</h2>
        <p className="text-gray-500">
          This feature is available with the Institution Plan. You can now:
        </p>
        <ul className="mt-4 space-y-2 text-gray-700">
          <li>• Review AI-flagged plagiarism cases</li>
          <li>• Analyze detailed similarity reports</li>
          <li>• Compare submissions against academic databases</li>
          <li>• Generate integrity reports for administrators</li>
          <li>• Set custom detection thresholds</li>
        </ul>
      </div>
    </div>
  )
} 
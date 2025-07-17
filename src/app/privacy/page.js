export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="card space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
            <p className="text-gray-300">
              We collect information you provide directly to us, such as when you create an account, upload assignments, or contact us.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-300">
              We use the information we collect to provide, maintain, and improve our services, process assignments, and communicate with you.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Information Sharing</h2>
            <p className="text-gray-300">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
            <p className="text-gray-300">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, or destruction.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 
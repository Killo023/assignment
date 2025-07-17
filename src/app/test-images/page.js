'use client'

export default function TestImages() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Image Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Hero Illustration</h2>
            <img
              src="/hero-illustration.svg"
              alt="Hero"
              className="w-full h-auto border border-gray-600"
              onError={(e) => {
                console.error('Hero image failed to load');
                e.target.style.border = '2px solid red';
              }}
              onLoad={() => console.log('Hero image loaded')}
            />
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Features Illustration</h2>
            <img
              src="/features-illustration.svg"
              alt="Features"
              className="w-full h-auto border border-gray-600"
              onError={(e) => {
                console.error('Features image failed to load');
                e.target.style.border = '2px solid red';
              }}
              onLoad={() => console.log('Features image loaded')}
            />
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Stats Illustration</h2>
            <img
              src="/stats-illustration.svg"
              alt="Stats"
              className="w-full h-auto border border-gray-600"
              onError={(e) => {
                console.error('Stats image failed to load');
                e.target.style.border = '2px solid red';
              }}
              onLoad={() => console.log('Stats image loaded')}
            />
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Benefits Illustration</h2>
            <img
              src="/benefits-illustration.svg"
              alt="Benefits"
              className="w-full h-auto border border-gray-600"
              onError={(e) => {
                console.error('Benefits image failed to load');
                e.target.style.border = '2px solid red';
              }}
              onLoad={() => console.log('Benefits image loaded')}
            />
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Testimonials Illustration</h2>
            <img
              src="/testimonials-illustration.svg"
              alt="Testimonials"
              className="w-full h-auto border border-gray-600"
              onError={(e) => {
                console.error('Testimonials image failed to load');
                e.target.style.border = '2px solid red';
              }}
              onLoad={() => console.log('Testimonials image loaded')}
            />
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">CTA Illustration</h2>
            <img
              src="/cta-illustration.svg"
              alt="CTA"
              className="w-full h-auto border border-gray-600"
              onError={(e) => {
                console.error('CTA image failed to load');
                e.target.style.border = '2px solid red';
              }}
              onLoad={() => console.log('CTA image loaded')}
            />
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-blue-900 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Debug Info</h3>
          <p className="text-blue-200 text-sm">
            Check the browser console for image load/error messages. 
            Red borders indicate failed image loads.
          </p>
        </div>
      </div>
    </div>
  )
} 
'use client'

import { useState } from 'react'
import { useInstitutionSubscription } from '../../../../hooks/useInstitutionSubscription'
import PaywallComponent from '../../../../components/PaywallComponent'

export default function InstitutionGrading() {
  const { canAccessGrading, loading: subscriptionLoading } = useInstitutionSubscription()
  const [text, setText] = useState('')
  const [rubric, setRubric] = useState('')
  const [result, setResult] = useState(null)
  const [override, setOverride] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Show loading while checking subscription
  if (subscriptionLoading) {
    return (
      <div className="bg-eggshell-white p-8 min-h-screen">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
        </div>
      </div>
    )
  }

  // Show paywall if user doesn't have access
  if (!canAccessGrading()) {
    return (
      <div className="bg-eggshell-white p-8 min-h-screen">
        <PaywallComponent 
          feature="AI Grading"
          description="Automate grading with AI assistance, set custom rubrics, and provide detailed feedback. Save time while maintaining grading consistency across all submissions."
          benefits={[
            "AI-powered grading with custom rubrics",
            "Detailed feedback and scoring breakdown",
            "Consistent grading across all submissions",
            "Time-saving automation for educators"
          ]}
        />
      </div>
    )
  }

  const handleGrade = async (e) => {
    e.preventDefault()
    setError(); setResult(null)
    if (!text || !rubric) {
      setError('Paste text and rubric')
      return
    }
    setLoading(true)
    const res = await fetch('/api/institution/grading', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, rubric: JSON.parse(rubric) })
    })
    const data = await res.json()
    setLoading(false)
    if (res.ok) {
      setResult(data)
    } else {
      setError(data.error || 'Grading failed')
    }
  }

  return (
    <div className="bg-eggshell-white min-h-screen p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">AI Grading</h1>
      <p className="text-gray-600 mb-6 max-w-2xl">
        Automate grading with AI assistance, set custom rubrics, and provide detailed feedback. 
        Save time while maintaining grading consistency across all submissions.
      </p>
      
      <form onSubmit={handleGrade} className="mb-8 flex flex-col md:flex-row gap-4 items-end">
        <textarea
          className="input-field w-full md:w-96"
          placeholder="Paste submission text..."
          value={text}
          onChange={e => setText(e.target.value)}
          rows={3}
        />
        <textarea
          className="input-field w-full md:w-64"
          placeholder="Paste rubric (JSON)"
          value={rubric}
          onChange={e => setRubric(e.target.value)}
          rows={3}
        />
        <button type="submit" className="btn-primary-landing" disabled={loading}>{loading ? 'Grading...' : 'Run AI Grading'}</button>
      </form>
      
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      
      {result && (
        <div className="card-landing mb-6">
          <div className="text-xl font-semibold mb-2 text-gray-900">Score: <span className="text-blue-700">{result.score}/100</span></div>
          <div className="mb-2 text-gray-700">Feedback: {result.feedback}</div>
          <div className="mb-2 text-gray-700">Breakdown:</div>
          <ul className="text-sm text-gray-500 mb-4">
            {Object.entries(result.breakdown).map(([k, v]) => (
              <li key={k}>{k}: {v}/20</li>
            ))}
          </ul>
          <div className="mt-4">
            <label className="block text-gray-700 font-semibold mb-1">Manual Override</label>
            <input
              className="input-field w-32"
              placeholder="New Score"
              value={override}
              onChange={e => setOverride(e.target.value)}
              type="number"
              min="0"
              max="100"
            />
            <span className="ml-2 text-xs text-gray-500">(Demo only: not saved)</span>
          </div>
        </div>
      )}
    </div>
  )
} 
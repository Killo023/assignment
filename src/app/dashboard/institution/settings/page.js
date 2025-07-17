'use client'

import { useEffect, useState } from 'react'

export default function InstitutionSettings() {
  const [settings, setSettings] = useState(null)
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true)
      const res = await fetch('/api/institution/settings')
      const data = await res.json()
      setSettings(data)
      setForm(data)
      setLoading(false)
    }
    fetchSettings()
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true); setSuccess(''); setError('')
    const res = await fetch('/api/institution/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    setSaving(false)
    if (res.ok) {
      setSettings(data)
      setSuccess('Settings updated!')
    } else {
      setError('Failed to update settings')
    }
  }

  return (
    <div className="bg-eggshell-white min-h-screen p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Institution Settings</h1>
      <p className="text-gray-600 mb-6 max-w-2xl">Configure LMS integrations, plagiarism thresholds, grading policies, user permissions, and SSO. Ensure compliance and data protection.</p>
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6 max-w-xl card-landing">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">LMS Integration</label>
            <select name="lmsIntegration" className="input-field w-full" value={form.lmsIntegration} onChange={handleChange}>
              <option value="None">None</option>
              <option value="Canvas">Canvas</option>
              <option value="Blackboard">Blackboard</option>
              <option value="Moodle">Moodle</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Plagiarism Threshold</label>
            <input
              type="number"
              name="plagiarismThreshold"
              className="input-field w-full"
              min="0"
              max="1"
              step="0.01"
              value={form.plagiarismThreshold}
              onChange={handleChange}
            />
            <div className="text-xs text-gray-500">Submissions above this similarity score are flagged.</div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Grading Policy</label>
            <select name="gradingPolicy" className="input-field w-full" value={form.gradingPolicy} onChange={handleChange}>
              <option value="Standard">Standard</option>
              <option value="Departmental">Departmental</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Single Sign-On (SSO)</label>
            <input
              type="checkbox"
              name="ssoEnabled"
              checked={form.ssoEnabled}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-gray-700">Enable SSO for institution users</span>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">User Permissions</label>
            <ul className="text-sm text-gray-500">
              {form.permissions && form.permissions.map((p, i) => (
                <li key={i}>{p.role}: {p.access}</li>
              ))}
            </ul>
          </div>
          <button type="submit" className="btn-primary-landing" disabled={saving}>{saving ? 'Saving...' : 'Save Settings'}</button>
          {success && <div className="text-green-600 text-sm mt-2">{success}</div>}
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </form>
      )}
    </div>
  );
} 
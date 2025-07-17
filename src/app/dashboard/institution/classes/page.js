'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useInstitutionSubscription } from '../../../../hooks/useInstitutionSubscription'

export default function InstitutionClasses() {
  const { data: session } = useSession()
  const { isPremium, isCancelled } = useInstitutionSubscription()
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ title: '', code: '', rubric: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const fetchClasses = async () => {
    setLoading(true)
    const res = await fetch('/api/institution/classes')
    const data = await res.json()
    setClasses(data.classes || [])
    setLoading(false)
  }

  useEffect(() => { fetchClasses() }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    setError(); setSuccess('')
    
    // Check class limit for free users
    if (!isPremium && !isCancelled && classes.length >= 2) {
      setError('Free plan limited to 2 classes. Upgrade to create more classes.')
      return
    }
    
    if (!form.title || !form.code) {
      setError('Title and code are required')
      return
    }
    
    const res = await fetch('/api/institution/classes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        instructor: session?.user?.id,
        rubric: form.rubric ? JSON.parse(form.rubric) : {},
      })
    })
    const data = await res.json()
    if (res.ok) {
      setSuccess('Class created!')
      setShowModal(false)
      setForm({ title: '', code: '', rubric: '' })
      fetchClasses()
    } else {
      setError(data.error || 'Error creating class')
    }
  }

  return (
    <div className="bg-eggshell-white min-h-screen p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Class Management</h1>
      <p className="text-gray-600 mb-6 max-w-2xl">Create and manage courses, enroll students, and set grading rubrics. Integrate with your LMS or upload via CSV.</p>
      
      {/* Class limit warning for free users */}
      {!isPremium && !isCancelled && classes.length >= 2 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 card-landing">
          <div className="flex items-center">
            <span className="text-yellow-700 font-semibold">Class Limit Reached</span>
          </div>
          <p className="text-yellow-600 text-sm mt-1">
            You've reached the limit of 2 classes on the free plan. Upgrade to create unlimited classes.
          </p>
        </div>
      )}
      
      <div className="mb-6 flex gap-4">
        <button 
          className="btn-primary-landing" 
          onClick={() => setShowModal(true)}
          disabled={!isPremium && !isCancelled && classes.length >= 2}
        >
          Create New Class
        </button>
        {/* Future: Import from CSV, Sync with LMS */}
      </div>
      
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        <div className="card-landing mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-900">Your Classes</h2>
          {classes.length === 0 ? (
            <p className="text-gray-500">No classes yet. Use the actions above to get started.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {classes.map(cls => (
                <li key={cls._id} className="py-3 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <span className="font-semibold text-blue-700">{cls.title}</span> <span className="text-gray-500">({cls.code})</span>
                    <div className="text-xs text-gray-500">Instructor: {cls.instructor?.name || 'N/A'}</div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2 md:mt-0">Students: {cls.students?.length || 0}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      
      {/* Modal for creating class */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <form onSubmit={handleCreate} className="bg-white p-8 rounded-xl border border-gray-200 w-full max-w-md card-landing">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Class</h2>
            <input
              className="input-field w-full mb-3"
              placeholder="Class Title"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              required
            />
            <input
              className="input-field w-full mb-3"
              placeholder="Class Code (unique)"
              value={form.code}
              onChange={e => setForm(f => ({ ...f, code: e.target.value }))}
              required
            />
            <textarea
              className="input-field w-full mb-3"
              placeholder="Rubric (JSON, optional)"
              value={form.rubric}
              onChange={e => setForm(f => ({ ...f, rubric: e.target.value }))}
              rows={3}
            />
            <div className="flex gap-2 mt-2">
              <button type="submit" className="btn-primary-landing">Create</button>
              <button type="button" className="btn-secondary-light" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            {success && <div className="text-green-600 text-sm mt-2">{success}</div>}
          </form>
        </div>
      )}
    </div>
  );
} 
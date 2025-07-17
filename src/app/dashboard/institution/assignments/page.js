'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

export default function InstitutionAssignments() {
  const { data: session } = useSession()
  const [assignments, setAssignments] = useState([])
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', class: '', dueDate: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const fetchAssignments = async () => {
    setLoading(true)
    const res = await fetch('/api/institution/assignments')
    const data = await res.json()
    setAssignments(data.assignments || [])
    setLoading(false)
  }
  const fetchClasses = async () => {
    const res = await fetch('/api/institution/classes')
    const data = await res.json()
    setClasses(data.classes || [])
  }
  useEffect(() => { fetchAssignments(); fetchClasses() }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    setError(); setSuccess('')
    if (!form.title || !form.class) {
      setError('Title and class are required')
      return
    }
    const res = await fetch('/api/institution/assignments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    if (res.ok) {
      setSuccess('Assignment created!')
      setShowModal(false)
      setForm({ title: '', description: '', class: '', dueDate: '' })
      fetchAssignments()
    } else {
      setError(data.error || 'Error creating assignment')
    }
  }

  return (
    <div className="bg-eggshell-white min-h-screen p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Assignment Management</h1>
      <p className="text-gray-600 mb-6 max-w-2xl">
        Distribute assignments to classes, track submissions, and manage deadlines. 
        Set up automated grading and plagiarism detection.
      </p>
      <div className="mb-6 flex gap-4">
        <button className="btn-primary-landing" onClick={() => setShowModal(true)}>Create Assignment</button>
        {/* Future: Import from CSV, Sync with LMS */}
      </div>
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        <div className="card-landing mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-900">Your Assignments</h2>
          {assignments.length === 0 ? (
            <p className="text-gray-500">No assignments yet. Use the actions above to get started.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {assignments.map(a => (
                <li key={a._id} className="py-3 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <span className="font-semibold text-blue-700">{a.title}</span> <span className="text-gray-500">({a.class?.title || 'N/A'})</span>
                    <div className="text-xs text-gray-500">Due: {a.dueDate ? new Date(a.dueDate).toLocaleDateString() : 'N/A'}</div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2 md:mt-0">Status: {a.status}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {/* Modal for creating assignment */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <form onSubmit={handleCreate} className="bg-white p-8 rounded-xl border border-gray-200 w-full max-w-md card-landing">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create Assignment</h2>
            <input
              className="input-field w-full mb-3"
              placeholder="Assignment Title"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              required
            />
            <textarea
              className="input-field w-full mb-3"
              placeholder="Description (optional)"
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              rows={2}
            />
            <select
              className="input-field w-full mb-3"
              value={form.class}
              onChange={e => setForm(f => ({ ...f, class: e.target.value }))}
              required
            >
              <option value="">Select Class</option>
              {classes.map(cls => (
                <option key={cls._id} value={cls._id}>{cls.title} ({cls.code})</option>
              ))}
            </select>
            <input
              type="date"
              className="input-field w-full mb-3"
              value={form.dueDate}
              onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))}
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
  )
} 
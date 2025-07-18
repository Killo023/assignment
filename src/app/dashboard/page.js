'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Upload, 
  FileText, 
  Download, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  MessageSquare,
  RefreshCw
} from 'lucide-react'
import toast from 'react-hot-toast'
import FileUpload from '../../components/FileUpload'
import AssignmentCard from '../../components/AssignmentCard'
import Link from 'next/link'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [assignments, setAssignments] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [subject, setSubject] = useState('')
  const [fileFormat, setFileFormat] = useState('pdf')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    id: '',
    university: '',
    instructor: ''
  })
  // Determine if paywall should be shown
  const now = new Date();
  const isTrialActive = session?.user?.subscription === 'trial' && session?.user?.trialEndDate && new Date(session.user.trialEndDate) > now;
  const isPremium = session?.user?.subscription === 'premium';
  const showPaywall = !isTrialActive && !isPremium;

  // Keep minimal debug logging
  console.log('Session status:', {
    subscription: session?.user?.subscription,
    isTrialActive,
    showPaywall
  });

  // Ensure assignmentsUsed and assignmentsLimit are numbers
  const assignmentsUsed = Number(session?.user?.assignmentsUsed) || 0;
  const assignmentsLimit = Number(session?.user?.assignmentsLimit) || 1;
  const assignmentsRemaining = assignmentsLimit - assignmentsUsed;
  
  // Trial status
  const isTrial = session?.user?.subscription === 'trial';
  const trialEndDate = session?.user?.trialEndDate;
  
  const getTrialDaysRemaining = () => {
    if (!trialEndDate) return 0;
    const now = new Date();
    const end = new Date(trialEndDate);
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };
  
  const trialDaysRemaining = getTrialDaysRemaining();

  useEffect(() => {
    if (showPaywall) {
      // setShowPaywall(true); // This line is removed as per the edit hint
    } else {
      // setShowPaywall(false); // This line is removed as per the edit hint
    }
  }, [showPaywall]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
    // Only allow students to access this page
    if (session && session.user?.role && session.user.role !== 'student') {
      router.replace('/dashboard/institution')
    }
  }, [status, router, session])

  const subjects = [
    'Computer Science',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Economics',
    'Business',
    'Psychology',
    'History',
    'Literature',
    'Philosophy',
    'Engineering',
    'Medicine',
    'Law',
    'Other'
  ]

  useEffect(() => {
    if (session) {
      fetchAssignments()
    }
  }, [session])

  const fetchAssignments = async () => {
    try {
      const response = await fetch('/api/assignments')
      if (response.ok) {
        const data = await response.json()
        setAssignments(data.assignments)
      }
    } catch (error) {
      console.error('Error fetching assignments:', error)
      toast.error('Failed to load assignments')
    }
  }

  const handleRefresh = async () => {
    toast.loading('Refreshing assignments...')
    await fetchAssignments()
    toast.dismiss()
    toast.success('Assignments refreshed!')
  }

  const handleFileSelect = (file) => {
    setSelectedFile(file)
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('DEBUG: handleSubmit called')
    
    if (!selectedFile || !subject) {
      toast.error('Please select a file and subject')
      return
    }

    // Remove frontend canCreateAssignment check
    // if (!session?.user?.canCreateAssignment?.()) {
    //   toast.error('You have reached your assignment limit. Upgrade to premium for unlimited assignments.')
    //   return
    // }

    setIsProcessing(true)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('subject', subject)
      formData.append('fileFormat', fileFormat)
      formData.append('studentInfo', JSON.stringify(studentInfo))
      console.log('DEBUG: Submitting formData', { subject, fileFormat, file: selectedFile?.name, studentInfo })

      const response = await fetch('/api/process', {
        method: 'POST',
        body: formData,
      })
      console.log('DEBUG: Received response', response.status)

      if (response.ok) {
        const data = await response.json()
        toast.success('Assignment submitted successfully!')
        setSelectedFile(null)
        setSubject('')
        setFileFormat('pdf')
        setShowUploadForm(false)
        fetchAssignments()
      } else {
        const error = await response.json()
        toast.error(error.message || 'Failed to process assignment')
        console.log('DEBUG: Error response', error)
      }
    } catch (error) {
      toast.error('Failed to process assignment')
      console.log('DEBUG: Exception', error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-eggshell-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) return null

  const completedAssignments = assignments.filter(a => a.status === 'completed').length
  const processingAssignments = assignments.filter(a => a.status === 'processing').length

  return (
    <div className="min-h-screen bg-eggshell-white pt-20 relative">
      {/* Paywall Modal */}
      {showPaywall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Upgrade Required</h2>
            <p className="text-gray-700 mb-6">
              Your free trial has ended.<br />
              Upgrade to Premium to unlock unlimited assignments and priority AI processing.
            </p>
            <a href="/pricing" className="btn-primary-landing w-full block mb-2">Upgrade Now</a>
            <button onClick={() => { window.location.href = '/pricing'; }} className="text-sm text-gray-500 underline">See all plans</button>
          </div>
        </div>
      )}
      {/* Trial Banner */}
      {isTrial && trialDaysRemaining > 0 && (
        <div className="bg-gradient-to-r from-green-100/60 to-blue-100/60 border-b border-green-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-green-700 font-medium">
                  Free Trial Active - {trialDaysRemaining} day{trialDaysRemaining !== 1 ? 's' : ''} remaining
                </span>
              </div>
              <Link href="/billing" className="text-green-700 hover:text-green-600 text-sm font-medium">
                Manage Subscription →
              </Link>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {session.user?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                className="btn-secondary-light"
                title="Refresh assignments"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Refresh
              </button>
              <button
                onClick={() => setShowUploadForm(!showUploadForm)}
                className="btn-primary-landing"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Assignment
              </button>
              <Link href="/dashboard/chat" className="btn-secondary-light">
                <MessageSquare className="w-5 h-5 mr-2" />
                Chat
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-landing"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-200 to-primary-400 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Assignments</p>
                <p className="text-2xl font-bold text-gray-900">{assignments.length}</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-landing"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedAssignments}</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-landing"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Processing</p>
                <p className="text-2xl font-bold text-gray-900">{processingAssignments}</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card-landing"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Remaining</p>
                <p className="text-2xl font-bold text-gray-900">{assignmentsRemaining}</p>
              </div>
            </div>
          </motion.div>
        </div>
        {/* Upload Form */}
        {showUploadForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="card-landing mb-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Upload New Assignment</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <FileUpload
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
                onRemoveFile={handleRemoveFile}
                studentInfo={studentInfo}
                onStudentInfoChange={setStudentInfo}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="input-field w-full"
                    required
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subj) => (
                      <option key={subj} value={subj}>{subj}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Output Format
                  </label>
                  <select
                    value={fileFormat}
                    onChange={(e) => setFileFormat(e.target.value)}
                    className="input-field w-full"
                  >
                    <option value="pdf">PDF</option>
                    <option value="docx">DOCX</option>
                    <option value="txt">TXT</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="btn-secondary-light"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn-primary-landing disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-500 mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Submit Assignment
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
        {/* Assignments List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Assignments</h2>
            <button
              onClick={handleRefresh}
              className="btn-secondary-light text-sm"
              title="Refresh assignments list"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
          {assignments.length === 0 ? (
            <div className="card-landing text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No assignments yet</h3>
              <p className="text-gray-500 mb-6">
                Upload your first assignment to get started with AI-powered assistance
              </p>
              <button
                onClick={() => setShowUploadForm(true)}
                className="btn-primary-landing"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Assignment
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {assignments.map((assignment) => (
                <AssignmentCard
                  key={assignment._id}
                  assignment={assignment}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 
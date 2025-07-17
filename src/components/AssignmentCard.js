'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  Share2, 
  Copy, 
  CheckCircle, 
  Clock, 
  FileText,
  Calendar,
  User
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function AssignmentCard({ assignment }) {
  const [copied, setCopied] = useState(false)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-400 animate-pulse" />
      case 'failed':
        return <FileText className="w-5 h-5 text-red-400" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-400'
      case 'processing':
        return 'text-yellow-400'
      case 'failed':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  const copyShareLink = async () => {
    const shareUrl = `${window.location.origin}/share/${assignment.shareableLink}`
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast.success('Share link copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Failed to copy link')
    }
  }

  const downloadAssignment = async () => {
    try {
      const response = await fetch(`/api/download/${assignment._id}`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${assignment.title}.${assignment.fileFormat}`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        toast.success('Assignment downloaded successfully!')
      } else {
        toast.error('Failed to download assignment')
      }
    } catch (error) {
      toast.error('Failed to download assignment')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card hover:bg-gray-800/80 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg">{assignment.title}</h3>
            <p className="text-sm text-gray-400">{assignment.subject}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon(assignment.status)}
          <span className={`text-sm font-medium ${getStatusColor(assignment.status)}`}>
            {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(assignment.createdAt)}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <User className="w-4 h-4" />
          <span>Created by you</span>
        </div>
      </div>

      {assignment.status === 'completed' && (
        <div className="mb-6">
          <h4 className="font-medium text-white mb-2">AI Response Preview:</h4>
          <div className="bg-gray-900 rounded-lg p-4 max-h-32 overflow-y-auto">
            <p className="text-sm text-gray-300 line-clamp-3">
              {assignment.aiResponse.substring(0, 200)}...
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {assignment.status === 'completed' && (
            <>
              <button
                onClick={downloadAssignment}
                className="btn-primary text-sm px-4 py-2"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
              <button
                onClick={copyShareLink}
                className="btn-secondary text-sm px-4 py-2"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4 mr-2" />
                ) : (
                  <Share2 className="w-4 h-4 mr-2" />
                )}
                {copied ? 'Copied!' : 'Share'}
              </button>
            </>
          )}
        </div>
        
        <div className="text-xs text-gray-500">
          Format: {assignment.fileFormat.toUpperCase()}
        </div>
      </div>

      {assignment.status === 'processing' && (
        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-yellow-400 animate-pulse" />
            <span className="text-sm text-yellow-400">
              AI is processing your assignment...
            </span>
          </div>
        </div>
      )}

      {assignment.status === 'failed' && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-red-400" />
            <span className="text-sm text-red-400">
              Processing failed. Please try again.
            </span>
          </div>
        </div>
      )}
    </motion.div>
  )
} 
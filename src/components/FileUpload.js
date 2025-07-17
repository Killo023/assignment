'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, X, CheckCircle, User, GraduationCap, Building } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FileUpload({ onFileSelect, selectedFile, onRemoveFile, studentInfo, onStudentInfoChange }) {
  const [dragActive, setDragActive] = useState(false)

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      onFileSelect(file)
    }
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    switch (extension) {
      case 'pdf':
        return '📄'
      case 'docx':
        return '📝'
      case 'txt':
        return '📄'
      default:
        return '📄'
    }
  }

  const handleStudentInfoChange = (field, value) => {
    onStudentInfoChange({
      ...studentInfo,
      [field]: value
    })
  }

  if (selectedFile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* File Selection */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">{getFileIcon(selectedFile.name)}</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">{selectedFile.name}</h3>
                <p className="text-sm text-gray-400">{formatFileSize(selectedFile.size)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <button
                onClick={onRemoveFile}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Student Information Form */}
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Student Information (for PDF format)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={studentInfo?.name || ''}
                onChange={(e) => handleStudentInfoChange('name', e.target.value)}
                placeholder="Enter your full name"
                className="input-field w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Student ID
              </label>
              <input
                type="text"
                value={studentInfo?.id || ''}
                onChange={(e) => handleStudentInfoChange('id', e.target.value)}
                placeholder="Enter your student ID"
                className="input-field w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                University
              </label>
              <input
                type="text"
                value={studentInfo?.university || ''}
                onChange={(e) => handleStudentInfoChange('university', e.target.value)}
                placeholder="Enter your university name"
                className="input-field w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Instructor
              </label>
              <input
                type="text"
                value={studentInfo?.instructor || ''}
                onChange={(e) => handleStudentInfoChange('instructor', e.target.value)}
                placeholder="Enter instructor name"
                className="input-field w-full"
              />
            </div>
          </div>
          
          <p className="text-xs text-gray-500 mt-3">
            This information will be included in the PDF title page for university assignment format.
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
          ${isDragActive || dragActive
            ? 'border-primary-500 bg-primary-500/10'
            : 'border-gray-600 hover:border-primary-500 hover:bg-gray-800/50'
          }
        `}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
      >
        <input {...getInputProps()} />
        
        <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
          <Upload className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-2">
          {isDragActive ? 'Drop your file here' : 'Upload your assignment'}
        </h3>
        
        <p className="text-gray-400 mb-4">
          Drag and drop your assignment file here, or click to browse
        </p>
        
        <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
          <span className="px-3 py-1 bg-gray-800 rounded-full">PDF</span>
          <span className="px-3 py-1 bg-gray-800 rounded-full">DOCX</span>
          <span className="px-3 py-1 bg-gray-800 rounded-full">TXT</span>
        </div>
        
        <p className="text-xs text-gray-500 mt-4">
          Maximum file size: 10MB
        </p>
      </div>
    </motion.div>
  )
} 
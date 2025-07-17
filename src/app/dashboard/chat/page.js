'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, FileText, Download, Copy, Check, ArrowLeft, FileDown } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { downloadPDF, downloadUniversityAssignmentPDF } from '../../../lib/pdfGenerator'

export default function ChatPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [subject, setSubject] = useState('')
  const [copied, setCopied] = useState(false)
  const messagesEndRef = useRef(null)
  const isStudent = session?.user?.role === 'student'

  const subjects = [
    'Business', 'Computer Science', 'Engineering', 'Literature', 
    'History', 'Psychology', 'Mathematics', 'Physics', 'Chemistry',
    'Biology', 'Economics', 'Philosophy', 'Sociology', 'Political Science',
    'Art', 'Music', 'Education', 'Law', 'Medicine', 'Other'
  ]

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
    }
  }, [session, status, router])

  useEffect(() => {
    // Optionally, fetch prompt count from backend/session here
    // For now, use localStorage to persist per user
    // if (isStudent && session?.user?.email) {
    //   const stored = localStorage.getItem(`chat_prompts_${session.user.email}`)
    //   setPromptCount(stored ? parseInt(stored, 10) : 0)
    // }
  }, [session, isStudent])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputText.trim()) return
    // if (isStudent && promptCount >= promptLimit) return

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)

    // if (isStudent && session?.user?.email) {
    //   const newCount = promptCount + 1
    //   setPromptCount(newCount)
    //   localStorage.setItem(`chat_prompts_${session.user.email}`, newCount)
    // }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: inputText,
          subject: subject || 'General'
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      const aiMessage = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error generating response:', error)
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error while processing your request. Please try again.',
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString(),
        isError: true
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const downloadAssignment = (text, subject) => {
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${subject}_Assignment_${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadAssignmentPDF = (text, subject) => {
    try {
      // Create student information for university format
      const studentInfo = {
        name: session?.user?.name || session?.user?.email || 'Student Name',
        id: 'Student ID',
        course: subject,
        instructor: 'Course Instructor',
        university: 'University Name'
      }
      
      const result = downloadUniversityAssignmentPDF(text, subject, `${subject} Assignment`, studentInfo)
      if (result.success) {
        console.log('University PDF downloaded successfully:', result.filename)
      } else {
        console.error('University PDF download failed:', result.error)
        // Fallback to regular PDF
        const fallbackResult = downloadPDF(text, subject, `${subject} Assignment`)
        if (!fallbackResult.success) {
          // Fallback to text download
          downloadAssignment(text, subject)
        }
      }
    } catch (error) {
      console.error('PDF generation error:', error)
      // Fallback to text download
      downloadAssignment(text, subject)
    }
  }

  const formatMessageText = (text) => {
    // Check if text contains diagrams
    if (text.includes('[DIAGRAM]')) {
      const parts = text.split(/(\[DIAGRAM\].*?```)/s)
      return parts.map((part, index) => {
        if (part.includes('[DIAGRAM]')) {
          // Extract diagram content
          const diagramMatch = part.match(/\[DIAGRAM\](.*?)```/s)
          if (diagramMatch) {
            const diagramContent = diagramMatch[1].trim()
            return (
              <div key={index} className="my-4">
                <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <div className="text-sm font-semibold text-gray-300 mb-2">📊 Diagram</div>
                  <pre className="text-xs text-green-400 font-mono whitespace-pre overflow-x-auto">
                    {diagramContent}
                  </pre>
                </div>
              </div>
            )
          }
        }
        return <span key={index}>{part}</span>
      })
    }
    return text
  }

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  // Show loading if not authenticated
  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href={isStudent ? "/dashboard" : "/dashboard/institution"} className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to {isStudent ? "Student" : "Institution"} Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold gradient-text">Assignment Chat</h1>
            </div>
            <div className="text-sm text-gray-400">
              Welcome, {session.user?.name || session.user?.email}
            </div>
          </div>
        </div>
      </header>

      {/* Subject Selection - Optional */}
      <div className="bg-gray-800/50 border-b border-gray-700 p-4">
        <div className="max-w-4xl mx-auto">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Select Subject (Optional):
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full md:w-64 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Choose a subject (optional)...</option>
            {subjects.map((subj) => (
              <option key={subj} value={subj}>{subj}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Prompt Limit Notice for Students */}
      {/* {isStudent && (
        <div className="max-w-4xl mx-auto mt-4">
          <div className={`p-3 rounded-lg text-sm ${promptCount >= promptLimit ? 'bg-red-500/10 border border-red-500/20 text-red-400' : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'}`}>
            {promptCount >= promptLimit
              ? 'You have reached your 10 free chat prompts. Upgrade to premium for unlimited access.'
              : `Free prompts used: ${promptCount} / ${promptLimit}`}
          </div>
        </div>
      )} */}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Start Your Assignment
              </h2>
              <p className="text-gray-400 max-w-md mx-auto">
                Select a subject above and describe your assignment requirements. 
                I'll help you create a comprehensive, well-structured assignment.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-3xl ${message.sender === 'user' ? 'bg-primary-600' : 'bg-gray-800'} rounded-lg p-4 border border-gray-700`}>
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300">
                        {message.sender === 'user' ? 'You' : 'AssignmentAI'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {message.timestamp}
                      </span>
                    </div>
                    <div className="text-white whitespace-pre-wrap">
                      {formatMessageText(message.text)}
                    </div>
                    {message.sender === 'ai' && !message.isError && (
                      <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-700">
                        <button
                          onClick={() => copyToClipboard(message.text)}
                          className="flex items-center space-x-1 text-sm text-gray-400 hover:text-white transition-colors"
                        >
                          {copied ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => downloadAssignment(message.text, subject)}
                          className="flex items-center space-x-1 text-sm text-gray-400 hover:text-white transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download TXT</span>
                        </button>
                        <button
                          onClick={() => downloadAssignmentPDF(message.text, subject)}
                          className="flex items-center space-x-1 text-sm text-gray-400 hover:text-white transition-colors"
                        >
                          <FileDown className="w-4 h-4" />
                          <span>Download PDF</span>
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <span className="text-gray-400 ml-2">Generating your assignment...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-gray-800 border-t border-gray-700 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-4">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your assignment requirements here... (e.g., 'Write a 1000-word essay on the impact of social media on modern communication')"
              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              rows="3"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputText.trim()}
              className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Send</span>
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Press Enter to send, Shift+Enter for new line
          </div>
        </div>
      </div>
    </div>
  )
} 
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useInstitutionSubscription } from '../../../hooks/useInstitutionSubscription'
import InstitutionPaywall from '../../../components/InstitutionPaywall'
import { Crown, AlertCircle } from 'lucide-react'

export default function InstitutionDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { 
    subscriptionStatus, 
    loading: subscriptionLoading, 
    isPremium, 
    isCancelled 
  } = useInstitutionSubscription()

  // Determine if paywall should be shown
  // Use subscriptionStatus from useInstitutionSubscription for accurate status
  const isInstitutionTrialActive = subscriptionStatus === 'trial';
  const isPremiumUser = isPremium && !isCancelled;
  const showPaywall = !isInstitutionTrialActive && !isPremiumUser;

  useEffect(() => {
    if (status === 'loading') return
    // Only allow admin/professor
    const role = session?.user?.role
    if (!session || (role !== 'admin' && role !== 'professor')) {
      router.replace('/dashboard')
    }
  }, [session, status, router])

  if (status === 'loading' || !session || subscriptionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-eggshell-white text-gray-900">
        Loading institution dashboard...
      </div>
    )
  }

  const handleUpgrade = () => {
    // TODO: Implement institution plan upgrade flow
    window.location.href = '/pricing?plan=institution'
  }

  return (
    <div className="bg-eggshell-white min-h-screen py-10 relative">
      {/* Paywall Modal */}
      {showPaywall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Upgrade Required</h2>
            <p className="text-gray-700 mb-6">
              Your free trial has ended.<br />
              Upgrade to unlock AI grading, plagiarism detection, analytics, and unlimited classes.
            </p>
            <a href="/pricing?plan=institution" className="btn-primary-landing w-full block mb-2">Upgrade Now</a>
            <button onClick={() => { window.location.href = '/pricing?plan=institution'; }} className="text-sm text-gray-500 underline">See all plans</button>
          </div>
        </div>
      )}
      <div className={showPaywall ? 'pointer-events-none opacity-40 select-none' : ''}>
        {/* Subscription Status Banner */}
        <div className="mb-6">
          {isPremiumUser ? (
            <div className="bg-gradient-to-r from-green-100/60 to-emerald-100/60 border border-green-200 rounded-lg p-4 flex items-center card-landing">
              <Crown className="w-5 h-5 text-green-500 mr-3" />
              <div>
                <h3 className="text-green-700 font-semibold">Institution Plan Active</h3>
                <p className="text-green-600 text-sm">You have access to all premium features</p>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-yellow-100/60 to-orange-100/60 border border-yellow-200 rounded-lg p-4 flex items-center card-landing">
              <AlertCircle className="w-5 h-5 text-yellow-500 mr-3" />
              <div className="flex-1">
                <h3 className="text-yellow-700 font-semibold">Free Institution Plan</h3>
                <p className="text-yellow-600 text-sm">Upgrade to unlock AI grading, plagiarism detection and advanced analytics</p>
              </div>
              <button
                onClick={handleUpgrade}
                className="btn-primary-landing ml-4"
              >
                Upgrade Now
              </button>
            </div>
          )}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to the Institution Dashboard</h1>
        <p className="text-gray-600 mb-6 max-w-2xl">
          Manage classes, assignments, grading, plagiarism detection, analytics, and settings for your institution. Use the sidebar to access each module.
        </p>
        {/* Quick Links to Modules */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <a href="/dashboard/institution/classes" className="card-landing bg-blue-50 border-blue-200 hover:bg-blue-100 transition p-6 flex flex-col items-center text-center">
            <span className="text-2xl font-bold text-blue-700 mb-2">Classes</span>
            <span className="text-gray-500">
              {isPremiumUser ? 'Manage and create unlimited classes' : 'Create and manage classes (2 max)'}
            </span>
          </a>
          <a href="/dashboard/institution/assignments" className="card-landing bg-green-50 border-green-200 hover:bg-green-100 transition p-6 flex flex-col items-center text-center">
            <span className="text-2xl font-bold text-green-700 mb-2">Assignments</span>
            <span className="text-gray-500">Distribute and track assignments</span>
          </a>
          {isPremiumUser ? (
            <a href="/dashboard/institution/grading" className="card-landing bg-purple-50 border-purple-200 hover:bg-purple-100 transition p-6 flex flex-col items-center text-center">
              <span className="text-2xl font-bold text-purple-700 mb-2">Grading</span>
              <span className="text-gray-500">AI & manual grading tools</span>
            </a>
          ) : (
            <div className="card-landing bg-gray-100 border-gray-200 p-6 flex flex-col items-center text-center opacity-60">
              <span className="text-2xl font-bold text-gray-400 mb-2">Grading</span>
              <span className="text-gray-400">Upgrade to access</span>
            </div>
          )}
          {isPremiumUser ? (
            <a href="/dashboard/institution/plagiarism" className="card-landing bg-yellow-50 border-yellow-200 hover:bg-yellow-100 transition p-6 flex flex-col items-center text-center">
              <span className="text-2xl font-bold text-yellow-700 mb-2">Plagiarism</span>
              <span className="text-gray-500">Review flagged cases</span>
            </a>
          ) : (
            <div className="card-landing bg-gray-100 border-gray-200 p-6 flex flex-col items-center text-center opacity-60">
              <span className="text-2xl font-bold text-gray-400 mb-2">Plagiarism</span>
              <span className="text-gray-400">Upgrade to access</span>
            </div>
          )}
          {isPremiumUser ? (
            <a href="/dashboard/institution/analytics" className="card-landing bg-pink-50 border-pink-200 hover:bg-pink-100 transition p-6 flex flex-col items-center text-center">
              <span className="text-2xl font-bold text-pink-700 mb-2">Analytics</span>
              <span className="text-gray-500">View insights & trends</span>
            </a>
          ) : (
            <div className="card-landing bg-gray-100 border-gray-200 p-6 flex flex-col items-center text-center opacity-60">
              <span className="text-2xl font-bold text-gray-400 mb-2">Analytics</span>
              <span className="text-gray-400">Upgrade to access</span>
            </div>
          )}
          <a href="/dashboard/institution/settings" className="card-landing bg-gray-50 border-gray-200 hover:bg-gray-100 transition p-6 flex flex-col items-center text-center">
            <span className="text-2xl font-bold text-gray-700 mb-2">Settings</span>
            <span className="text-gray-500">Institution configuration</span>
          </a>
          <a href="/dashboard/chat" className="card-landing bg-indigo-50 border-indigo-200 hover:bg-indigo-100 transition p-6 flex flex-col items-center text-center">
            <span className="text-2xl font-bold text-indigo-700 mb-2">Chat</span>
            <span className="text-gray-500">AI assignment assistance</span>
          </a>
        </div>
        {/* Summary Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-xl p-6 border border-blue-100 text-blue-700 shadow card-landing flex flex-col items-center">
            <span className="text-4xl font-bold mb-2">
              {isPremiumUser ? '12' : '2'}
            </span>
            <span className="text-lg">Active Classes</span>
            {!isPremiumUser && (
              <span className="text-xs text-gray-400 mt-1">(2 max on free plan)</span>
            )}
          </div>
          <div className="bg-white rounded-xl p-6 border border-green-100 text-green-700 shadow card-landing flex flex-col items-center">
            <span className="text-4xl font-bold mb-2">
              {isPremiumUser ? '245' : '45'}
            </span>
            <span className="text-lg">Assignments Distributed</span>
            {!isPremiumUser && (
              <span className="text-xs text-gray-400 mt-1">(Available on free plan)</span>
            )}
          </div>
          <div className="bg-white rounded-xl p-6 border border-yellow-100 text-yellow-700 shadow card-landing flex flex-col items-center">
            <span className="text-4xl font-bold mb-2">
              {isPremiumUser ? '3' : '0'}
            </span>
            <span className="text-lg">Plagiarism Cases</span>
            {!isPremiumUser && (
              <span className="text-xs text-gray-400 mt-1">(Premium feature)</span>
            )}
          </div>
        </div>
        {/* Recent Activity Feed Placeholder */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 text-gray-700 shadow card-landing mb-8">
          <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
          {isPremiumUser ? (
            <ul className="divide-y divide-gray-200">
              <li className="py-2 flex items-center justify-between">
                <span className="text-gray-700">Assignment "AI Ethics" graded</span>
                <span className="text-gray-400 text-xs">2 hours ago</span>
              </li>
              <li className="py-2 flex items-center justify-between">
                <span className="text-gray-700">Class "Intro to Robotics" created</span>
                <span className="text-gray-400 text-xs">5 hours ago</span>
              </li>
              <li className="py-2 flex items-center justify-between">
                <span className="text-gray-700">Plagiarism case flagged in "Data Science"</span>
                <span className="text-gray-400 text-xs">1 day ago</span>
              </li>
              <li className="py-2 flex items-center justify-between">
                <span className="text-gray-700">Assignment "Machine Learning" distributed</span>
                <span className="text-gray-400 text-xs">2 days ago</span>
              </li>
            </ul>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Upgrade to Institution Plan to see detailed activity and plagiarism detection</p>
              <button
                onClick={handleUpgrade}
                className="btn-primary-landing"
              >
                Upgrade Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 
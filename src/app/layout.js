import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import AuthProvider from '../components/AuthProvider'
import GlobalNavBar from '../components/GlobalNavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AssignmentAI - AI-Powered Assignment Help | 100% Free Trial',
  description: 'Get professional assignment help powered by AI. Upload your assignment, select your subject, and receive a complete solution. Free trial available for first 100 users.',
  keywords: 'assignment help, AI homework, student assistance, academic writing, free trial',
  openGraph: {
    title: 'AssignmentAI - AI-Powered Assignment Help',
    description: 'Professional assignment assistance powered by AI. Free trial available.',
    url: 'https://theassignmentai.com',
    siteName: 'AssignmentAI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AssignmentAI - AI-Powered Assignment Help',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AssignmentAI - AI-Powered Assignment Help',
    description: 'Professional assignment assistance powered by AI. Free trial available.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <GlobalNavBar />
          <div className="pt-navbar">{children}</div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1f2937',
                color: '#f9fafb',
                border: '1px solid #374151',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
} 
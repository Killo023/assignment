import { NextResponse } from 'next/server'

let settings = {
  lmsIntegration: 'None',
  plagiarismThreshold: 0.2,
  gradingPolicy: 'Standard',
  permissions: [
    { role: 'admin', access: 'all' },
    { role: 'professor', access: 'classes,assignments,grading' },
    { role: 'ta', access: 'grading' },
  ],
  ssoEnabled: false,
}

export async function GET() {
  return NextResponse.json(settings)
}

export async function POST(req) {
  const body = await req.json()
  settings = { ...settings, ...body }
  return NextResponse.json(settings)
} 
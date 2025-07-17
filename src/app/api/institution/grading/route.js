import { NextResponse } from 'next/server'
import { gradeSubmission } from '../../../../lib/gemini'

export async function POST(req) {
  const { text, rubric } = await req.json()
  if (!text || !rubric) {
    return NextResponse.json({ error: 'Missing text or rubric' }, { status: 400 })
  }
  try {
    const result = await gradeSubmission({ text, rubric })
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
} 
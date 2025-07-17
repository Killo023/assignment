import { NextResponse } from 'next/server'
import { checkPlagiarism } from '../../../../../lib/gemini'

export async function POST(req) {
  const { text } = await req.json()
  if (!text) {
    return NextResponse.json({ error: 'No text provided' }, { status: 400 })
  }
  try {
    const result = await checkPlagiarism({ text })
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
} 
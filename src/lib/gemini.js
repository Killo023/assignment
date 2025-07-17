const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

async function callGemini(messages) {
  const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: messages })
  })
  if (!res.ok) throw new Error('Gemini API error')
  const data = await res.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || ''
}

export async function gradeSubmission({ text, rubric }) {
  const prompt = [
    { role: 'user', text: `Grade the following submission according to this rubric (JSON):\n${JSON.stringify(rubric)}\nSubmission:\n${text}\nReturn a JSON with keys: score, feedback, breakdown (object with rubric categories).` }
  ]
  const response = await callGemini(prompt)
  try {
    return JSON.parse(response)
  } catch {
    return { score: null, feedback: response, breakdown: {} }
  }
}

export async function checkPlagiarism({ text }) {
  const prompt = [
    { role: 'user', text: `Check this submission for plagiarism and AI-generated content. Return a JSON with keys: risk (Low/Medium/High), sources (array of {url, similarity}), and a brief explanation.\nSubmission:\n${text}` }
  ]
  const response = await callGemini(prompt)
  try {
    return JSON.parse(response)
  } catch {
    return { risk: 'Unknown', sources: [], explanation: response }
  }
}

export async function getAnalyticsInsights({ data }) {
  const prompt = [
    { role: 'user', text: `Analyze the following academic data and summarize key insights, trends, and recommendations.\nData:\n${JSON.stringify(data)}` }
  ]
  return callGemini(prompt)
} 
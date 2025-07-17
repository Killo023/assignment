const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY
// Use a reliable, public model for demonstration. Replace 'gpt2' with your preferred model as needed.
const API_URL = "https://api-inference.huggingface.co/models/gpt2"
const FALLBACK_API_URL = "https://api-inference.huggingface.co/models/gpt2"

// Switched to Google Gemini for assignment processing. See src/lib/gemini.js for implementation.
export { generateAssignmentResponse } from './gemini.js';

export function sanitizeText(text) {
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim()
}

export function extractTextFromContent(content) {
  if (typeof content === 'string') {
    return sanitizeText(content)
  }
  
  if (content && typeof content === 'object') {
    return sanitizeText(JSON.stringify(content))
  }
  
  return ''
} 
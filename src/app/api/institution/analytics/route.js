import { NextResponse } from 'next/server'
import { getAnalyticsInsights } from '../../../../lib/gemini'

export async function GET() {
  // Dummy analytics data
  const data = {
    classPerformance: [
      { class: 'CS101', avgScore: 87, completion: 0.92 },
      { class: 'ENG201', avgScore: 78, completion: 0.85 },
    ],
    plagiarismTrends: [
      { date: '2024-01-01', incidents: 2 },
      { date: '2024-02-01', incidents: 5 },
      { date: '2024-03-01', incidents: 1 },
    ],
    gradingEfficiency: [
      { month: '2024-01', avgTime: 2.1 },
      { month: '2024-02', avgTime: 1.7 },
    ],
  }
  try {
    const insights = await getAnalyticsInsights({ data })
    return NextResponse.json({ ...data, insights })
  } catch (error) {
    return NextResponse.json({ ...data, insights: error.message })
  }
} 
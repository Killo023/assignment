import { NextResponse } from 'next/server'
import dbConnect from '../../../../lib/db'
import Assignment from '../../../../models/Assignment'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'

async function isInstitutionUser(req) {
  const session = await getServerSession(authOptions)
  return session?.user?.role === 'admin' || session?.user?.role === 'professor'
}

export async function GET(req) {
  if (!(await isInstitutionUser(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }
  await dbConnect()
  const url = new URL(req.url)
  const classId = url.searchParams.get('class')
  const query = classId ? { class: classId } : {}
  const assignments = await Assignment.find(query).populate('class', 'title code').lean()
  return NextResponse.json({ assignments })
}

export async function POST(req) {
  if (!(await isInstitutionUser(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }
  const { title, description, class: classId, dueDate } = await req.json()
  if (!title || !classId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  await dbConnect()
  const newAssignment = new Assignment({ title, description, class: classId, dueDate })
  await newAssignment.save()
  return NextResponse.json({ message: 'Assignment created', assignment: newAssignment })
} 
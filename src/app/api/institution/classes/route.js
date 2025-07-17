import { NextResponse } from 'next/server'
import dbConnect from '../../../../lib/db'
import Class from '../../../../models/Class'
import User from '../../../../models/User'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'

// Helper: check if user is admin or professor
async function isInstitutionUser(req) {
  const session = await getServerSession(authOptions)
  return session?.user?.role === 'admin' || session?.user?.role === 'professor'
}

export async function GET(req) {
  if (!(await isInstitutionUser(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }
  await dbConnect()
  const classes = await Class.find().populate('instructor', 'name email').lean()
  return NextResponse.json({ classes })
}

export async function POST(req) {
  if (!(await isInstitutionUser(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }
  const { title, code, instructor, rubric } = await req.json()
  if (!title || !code || !instructor) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  await dbConnect()
  const existing = await Class.findOne({ code })
  if (existing) {
    return NextResponse.json({ error: 'Class code already exists' }, { status: 409 })
  }
  const newClass = new Class({ title, code, instructor, rubric })
  await newClass.save()
  return NextResponse.json({ message: 'Class created', class: newClass })
} 
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import dbConnect from '../../../../lib/db'
import User from '../../../../models/User'

export async function POST(request) {
  try {
    const { name, email, password, role } = await request.json()

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    await dbConnect()

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create new user with 7-day trial
    const now = new Date();
    const trialEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const userData = {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      subscription: 'trial',
      trialEndDate: trialEnd,
      assignmentsUsed: 0,
      assignmentsLimit: 3,
      role: role || 'student',
    };

    // Add institution trial for admin/professor
    if (userData.role === 'admin' || userData.role === 'professor') {
      userData.institutionSubscription = 'trial';
      userData.institutionTrialEndDate = trialEnd;
    }

    console.log('Creating new user with data:', userData);
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    
    console.log('User created successfully:', {
      id: savedUser._id,
      email: savedUser.email,
      subscription: savedUser.subscription,
      trialEndDate: savedUser.trialEndDate
    });

    // Return success without password
    const userWithoutPassword = savedUser.toJSON();
    delete userWithoutPassword.password;

    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: userWithoutPassword
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 
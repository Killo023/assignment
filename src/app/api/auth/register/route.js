import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import dbConnect from '../../../../lib/db'
import User from '../../../../models/User'

export async function POST(request) {
  try {
    console.log('REGISTER API: Starting registration process...');
    
    // Parse request body
    let requestData;
    try {
      requestData = await request.json();
      console.log('REGISTER API: Request data received:', { 
        name: requestData.name, 
        email: requestData.email, 
        role: requestData.role,
        hasPassword: !!requestData.password 
      });
    } catch (parseError) {
      console.error('REGISTER API: Failed to parse request JSON:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON data' },
        { status: 400 }
      );
    }

    const { name, email, password, role } = requestData;

    // Validation
    console.log('REGISTER API: Validating input...');
    if (!name || !email || !password) {
      console.log('REGISTER API: Missing required fields');
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      console.log('REGISTER API: Password too short');
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    if (!email.includes('@')) {
      console.log('REGISTER API: Invalid email format');
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Database connection
    console.log('REGISTER API: Connecting to database...');
    try {
      await dbConnect();
      console.log('REGISTER API: Database connected successfully');
    } catch (dbError) {
      console.error('REGISTER API: Database connection failed:', dbError);
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    // Check if user already exists
    console.log('REGISTER API: Checking for existing user...');
    try {
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        console.log('REGISTER API: User already exists');
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 409 }
        )
      }
      console.log('REGISTER API: No existing user found, proceeding...');
    } catch (findError) {
      console.error('REGISTER API: Error checking existing user:', findError);
      return NextResponse.json(
        { error: 'Error checking existing user' },
        { status: 500 }
      );
    }

    // Hash password
    console.log('REGISTER API: Hashing password...');
    let hashedPassword;
    try {
      const saltRounds = 12;
      hashedPassword = await bcrypt.hash(password, saltRounds);
      console.log('REGISTER API: Password hashed successfully');
    } catch (hashError) {
      console.error('REGISTER API: Password hashing failed:', hashError);
      return NextResponse.json(
        { error: 'Password hashing failed' },
        { status: 500 }
      );
    }

    // Create new user with 7-day trial
    console.log('REGISTER API: Preparing user data...');
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

    console.log('REGISTER API: Creating new user with data:', {
      ...userData,
      password: '[HIDDEN]'
    });

    // Save user to database
    try {
      const newUser = new User(userData);
      const savedUser = await newUser.save();
      
      console.log('REGISTER API: User created successfully:', {
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
    } catch (saveError) {
      console.error('REGISTER API: User save failed:', saveError);
      console.error('REGISTER API: Save error details:', {
        name: saveError.name,
        message: saveError.message,
        code: saveError.code,
        stack: saveError.stack
      });
      return NextResponse.json(
        { 
          error: 'Failed to create user',
          details: saveError.message 
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('REGISTER API: Unexpected error:', error);
    console.error('REGISTER API: Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error.message 
      },
      { status: 500 }
    )
  }
} 
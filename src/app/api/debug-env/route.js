import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    
    return NextResponse.json({
      hasMongoUri: !!mongoUri,
      mongoUriLength: mongoUri?.length || 0,
      mongoUriStart: mongoUri?.substring(0, 20) || 'undefined',
      mongoUriEnd: mongoUri?.substring(mongoUri.length - 20) || 'undefined',
      nodeEnv: process.env.NODE_ENV,
      // Don't expose full URI for security
      diagnostics: {
        containsMongodbPlus: mongoUri?.includes('mongodb+srv://'),
        containsSpecialChars: mongoUri ? /[!$@#%^&*()]/g.test(mongoUri) : false,
        suspiciousChars: mongoUri ? mongoUri.match(/[!$@#%^&*()]/g) : null
      }
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to check environment',
      message: error.message
    }, { status: 500 });
  }
} 
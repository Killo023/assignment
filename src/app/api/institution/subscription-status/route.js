import { getServerSession } from 'next-auth/next';
import User from '../../../../models/User';
import dbConnect from '../../../../lib/db';

// Simple authOptions for this endpoint
const authOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-here',
};

export async function GET() {
  try {
    console.log('Getting server session...');
    const session = await getServerSession(authOptions);
    
    if (!session) {
      console.log('No session found');
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Session found for user:', session.user?.email);

    await dbConnect();
    console.log('Connected to database');
    
    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      console.log('User not found in database:', session.user.email);
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('User found:', { email: user.email, role: user.role, institutionSubscription: user.institutionSubscription });

    // Check if user has institution role
    if (user.role !== 'admin' && user.role !== 'professor') {
      console.log('Access denied for role:', user.role);
      return Response.json({ error: 'Access denied' }, { status: 403 });
    }

    // Determine institution subscription status
    let instStatus = 'free';
    const now = new Date();
    if (user.institutionSubscription === 'premium') {
      instStatus = 'premium';
    } else if (user.institutionSubscription === 'trial' && user.institutionTrialEndDate && new Date(user.institutionTrialEndDate) > now) {
      instStatus = 'trial';
    }

    console.log('Returning subscription status:', instStatus);

    return Response.json({
      subscription: instStatus,
      role: user.role
    });

  } catch (error) {
    console.error('Error checking institution subscription:', error);
    console.error('Error stack:', error.stack);
    return Response.json({ 
      error: 'Internal server error',
      message: error.message 
    }, { status: 500 });
  }
} 
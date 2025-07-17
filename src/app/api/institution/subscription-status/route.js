import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import User from '../../../../models/User';
import dbConnect from '../../../../lib/db';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if user has institution role
    if (user.role !== 'admin' && user.role !== 'professor') {
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

    return Response.json({
      subscription: instStatus,
      role: user.role
    });

  } catch (error) {
    console.error('Error checking institution subscription:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
} 
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import User from '../../../../models/User';
import dbConnect from '../../../../lib/db';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      console.log('Institution subscription check: No session found');
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Institution subscription check for:', session.user.email, 'Role:', session.user.role);

    // Early return for student users to avoid unnecessary DB calls
    if (session.user.role === 'student') {
      return Response.json({ 
        error: 'This endpoint is for institution users only',
        subscription: 'free',
        role: 'student' 
      }, { status: 200 }); // Return 200 to avoid client errors
    }

    await dbConnect();
    
    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      console.error('User not found in DB:', session.user.email);
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

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

    return Response.json({
      subscription: instStatus,
      role: user.role
    });

  } catch (error) {
    console.error('Error checking institution subscription:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
} 
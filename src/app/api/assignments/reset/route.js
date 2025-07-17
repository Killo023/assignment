import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import User from '../../../../models/User';

export async function POST(request) {
  const { email } = await request.json();
  // Only allow the admin user to reset
  if (email !== 'cyleemanualhendricks3422516@gmail.com') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await dbConnect();
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  user.assignmentsUsed = 0;
  await user.save();
  return NextResponse.json({ message: 'assignmentsUsed reset to 0' });
} 
import { NextResponse } from 'next/server';
import { prismaClientGlobal } from '@/infra/prisma';
import { auth, signIn } from '@/auth';

export async function POST(request: Request) {
  try {
    const { userEmail } = await request.json();

    // Get current session
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Verify admin user
    const ADMIN_USER_ID = process.env.NEXT_PUBLIC_ADMIN_USER_ID;
    if (!ADMIN_USER_ID) {
      return NextResponse.json(
        { error: 'Admin user not configured' },
        { status: 500 }
      );
    }

    if (session.user.id !== ADMIN_USER_ID) {
      return NextResponse.json(
        { error: 'Not authorized' },
        { status: 403 }
      );
    }

    // Find the target user
    const user = await prismaClientGlobal.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Create session for the user
    await signIn('credentials', {
      email: user.email,
      id: user.id,
      redirect: false,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
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

    // Verify admin user — use server-side ADMIN_USER_ID (not NEXT_PUBLIC_)
    const ADMIN_USER_ID = process.env.ADMIN_USER_ID;
    if (!ADMIN_USER_ID) {
      return NextResponse.json(
        { error: 'Admin user not configured — set ADMIN_USER_ID env variable' },
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

    // Use internal admin token to prevent direct credential attacks
    const INTERNAL_ADMIN_TOKEN = process.env.INTERNAL_ADMIN_TOKEN;
    if (!INTERNAL_ADMIN_TOKEN) {
      return NextResponse.json(
        { error: 'Internal admin token not configured — generate with: openssl rand -base64 32' },
        { status: 500 }
      );
    }

    // Create session for the user via the credentials provider
    await signIn('credentials', {
      email: user.email,
      id: user.id,
      adminToken: INTERNAL_ADMIN_TOKEN,
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
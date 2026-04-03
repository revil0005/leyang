import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const signups = await prisma.trainingSignup.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(signups);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch training signups' }, { status: 500 });
  }
}

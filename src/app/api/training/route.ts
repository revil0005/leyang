import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, phone, has_experience, course_id } = data;

    if (!name || !phone || !has_experience || !course_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const signup = await prisma.trainingSignup.create({
      data: {
        name,
        phone,
        has_experience,
        course_id,
      },
    });

    return NextResponse.json(signup, { status: 201 });
  } catch (error) {
    console.error('Training signup error:', error);
    return NextResponse.json({ error: 'Failed to create training signup' }, { status: 500 });
  }
}

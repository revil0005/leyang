import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { service_type, frequency, expected_time, address } = data;

    if (!service_type || !frequency || !expected_time || !address) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const order = await (prisma as any).order.create({
      data: {
        userId: 1, // Simulated user for now
        serviceType: service_type,
        frequency,
        expectedTime: new Date(expected_time),
        address,
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, phone, service_type, frequency, expected_time, notes } = data;

    if (!name || !phone || !service_type || !frequency || !expected_time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        name,
        phone,
        service_type,
        frequency,
        expected_time,
        notes: notes || '',
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { status } = await request.json();
    
    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Update string order status error', error);
    return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 });
  }
}

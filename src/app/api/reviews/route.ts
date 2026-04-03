import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { orderId, caregiverId, userId, rating, content } = await request.json();

    if (!orderId || !caregiverId || !userId || !rating) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    try {
      // 1. Create the review
      const review = await (db as any).review.create({
        data: {
          orderId: parseInt(orderId),
          caregiverId: parseInt(caregiverId),
          userId: parseInt(userId),
          rating: parseInt(rating),
          content: content || '',
        }
      });

      // 2. Update the order status to COMPLETED
      await (db as any).order.update({
        where: { id: parseInt(orderId) },
        data: { status: 'COMPLETED' }
      });

      // 3. Recalculate Caregiver average rating
      const allReviews = await (db as any).review.findMany({
        where: { caregiverId: parseInt(caregiverId) },
        select: { rating: true }
      });

      const averageRating = allReviews.reduce((acc: number, curr: { rating: number }) => acc + curr.rating, 0) / allReviews.length;

      await (db as any).caregiver.update({
        where: { id: parseInt(caregiverId) },
        data: { rating: averageRating }
      });

      return NextResponse.json({ success: true, review });
    } catch (dbError: any) {
      if (dbError.message?.includes('DATABASE_URL') || dbError.message?.includes('Environment variable') || dbError.message?.includes('Prisma')) {
        console.warn('DB not connected, using Mock fallback for Review');
        return NextResponse.json({ success: true, mock: true });
      }
      throw dbError;
    }
  } catch (error) {
    console.error('Error submitting review:', error);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}

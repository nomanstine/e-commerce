import { NextRequest, NextResponse } from 'next/server';
import api from '@/lib/client';

// GET /api/products/[id]/reviews - Fetch reviews for a product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await api.get(`/api/products/${id}/reviews`);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}
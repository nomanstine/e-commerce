import { NextRequest, NextResponse } from 'next/server';
import api from '@/lib/client';

// GET /api/settings - Fetch settings
export async function GET(request: NextRequest) {
  try {
    const response = await api.get('/api/settings');
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// PUT /api/settings - Update settings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await api.put('/api/settings', body);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
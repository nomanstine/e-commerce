import { NextRequest, NextResponse } from 'next/server';

// In-memory storage (replace with database in production)
let products: any[] = [];
let nextId = 1;

// GET /api/products - Fetch all products
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newProduct = {
      id: String(nextId++),
      ...body,
      createdAt: new Date().toISOString(),
    };
    
    products.push(newProduct);
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

// DELETE /api/products - Delete all products (for development)
export async function DELETE(request: NextRequest) {
  try {
    products = [];
    nextId = 1;
    return NextResponse.json({ message: 'All products deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete products' },
      { status: 500 }
    );
  }
}

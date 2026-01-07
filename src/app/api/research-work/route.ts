import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all research work
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    const category = searchParams.get('category');

    const where: any = {};
    if (published !== null) {
      where.published = published === 'true';
    }
    if (category) {
      where.category = category;
    }

    const researchWorks = await prisma.researchWork.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(researchWorks);
  } catch (error) {
    console.error('Error fetching research work:', error);
    return NextResponse.json(
      { error: 'Failed to fetch research work' },
      { status: 500 }
    );
  }
}

// POST create new research work
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const researchWork = await prisma.researchWork.create({
      data: body,
    });

    return NextResponse.json(researchWork, { status: 201 });
  } catch (error) {
    console.error('Error creating research work:', error);
    return NextResponse.json(
      { error: 'Failed to create research work' },
      { status: 500 }
    );
  }
}

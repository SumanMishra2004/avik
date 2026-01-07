import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const areas = await prisma.researchArea.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(areas);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch research areas' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const area = await prisma.researchArea.create({ data: body });
    return NextResponse.json(area, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create research area' }, { status: 500 });
  }
}

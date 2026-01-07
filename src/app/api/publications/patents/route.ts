import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const patents = await prisma.patent.findMany({
      orderBy: { year: 'desc' },
    });
    return NextResponse.json(patents);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch patents' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const patent = await prisma.patent.create({ data: body });
    return NextResponse.json(patent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create patent' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const journals = await prisma.journal.findMany({
      orderBy: { year: 'desc' },
    });
    return NextResponse.json(journals);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch journals' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const journal = await prisma.journal.create({ data: body });
    return NextResponse.json(journal, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create journal' }, { status: 500 });
  }
}

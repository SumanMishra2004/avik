import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const funding = await prisma.funding.findMany({
      orderBy: { year: 'desc' },
    });
    return NextResponse.json(funding);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch funding' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const fund = await prisma.funding.create({ data: body });
    return NextResponse.json(fund, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create funding' }, { status: 500 });
  }
}

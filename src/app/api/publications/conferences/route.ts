import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const conferences = await prisma.conference.findMany({
      orderBy: { year: 'desc' },
    });
    return NextResponse.json(conferences);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch conferences' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const conference = await prisma.conference.create({ data: body });
    return NextResponse.json(conference, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create conference' }, { status: 500 });
  }
}

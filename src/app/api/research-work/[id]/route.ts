import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET single research work
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const researchWork = await prisma.researchWork.findUnique({
      where: { id },
    });

    if (!researchWork) {
      return NextResponse.json(
        { error: 'Research work not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(researchWork);
  } catch (error) {
    console.error('Error fetching research work:', error);
    return NextResponse.json(
      { error: 'Failed to fetch research work' },
      { status: 500 }
    );
  }
}

// PUT update research work
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const researchWork = await prisma.researchWork.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(researchWork);
  } catch (error) {
    console.error('Error updating research work:', error);
    return NextResponse.json(
      { error: 'Failed to update research work' },
      { status: 500 }
    );
  }
}

// DELETE research work
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.researchWork.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Research work deleted successfully' });
  } catch (error) {
    console.error('Error deleting research work:', error);
    return NextResponse.json(
      { error: 'Failed to delete research work' },
      { status: 500 }
    );
  }
}

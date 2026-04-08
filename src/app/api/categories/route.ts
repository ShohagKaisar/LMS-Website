import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/categories - Get all categories
export async function GET() {
  try {
    const categories = await db.category.findMany({
      include: {
        _count: {
          select: { courses: true },
        },
      },
      orderBy: { name: 'asc' },
    })

    return NextResponse.json({ success: true, data: categories })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/progress/[id] - Get single progress record
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const progress = await db.lessonProgress.findUnique({
      where: { id },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            type: true,
            duration: true,
            courseId: true,
          },
        },
      },
    })

    if (!progress) {
      return NextResponse.json(
        { success: false, error: 'Progress record not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: progress })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch progress' },
      { status: 500 }
    )
  }
}

// PUT /api/progress/[id] - Update progress record
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { isCompleted, lastPosition } = body

    const existingProgress = await db.lessonProgress.findUnique({ where: { id } })
    if (!existingProgress) {
      return NextResponse.json(
        { success: false, error: 'Progress record not found' },
        { status: 404 }
      )
    }

    const progress = await db.lessonProgress.update({
      where: { id },
      data: {
        ...(isCompleted !== undefined && { isCompleted }),
        ...(lastPosition !== undefined && { lastPosition }),
        ...(isCompleted && !existingProgress.isCompleted && { completedAt: new Date() }),
      },
    })

    return NextResponse.json({
      success: true,
      data: progress,
      message: 'Progress updated successfully',
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update progress' },
      { status: 500 }
    )
  }
}

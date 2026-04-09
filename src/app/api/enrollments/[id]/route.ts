import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/enrollments/[id] - Get single enrollment
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const enrollment = await db.enrollment.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true, email: true, image: true },
        },
        course: {
          include: {
            sections: {
              include: {
                lessons: {
                  include: {
                    progress: true,
                  },
                  orderBy: { order: 'asc' },
                },
              },
              orderBy: { order: 'asc' },
            },
          },
        },
        payments: true,
        certificate: true,
      },
    })

    if (!enrollment) {
      return NextResponse.json(
        { success: false, error: 'Enrollment not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: enrollment })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch enrollment' },
      { status: 500 }
    )
  }
}

// PUT /api/enrollments/[id] - Update enrollment
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const existingEnrollment = await db.enrollment.findUnique({ where: { id } })
    if (!existingEnrollment) {
      return NextResponse.json(
        { success: false, error: 'Enrollment not found' },
        { status: 404 }
      )
    }

    const { status, progress } = body

    const enrollment = await db.enrollment.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(progress !== undefined && { progress }),
        ...(status === 'COMPLETED' && { completedAt: new Date() }),
      },
      include: {
        user: { select: { id: true, name: true } },
        course: { select: { id: true, title: true } },
      },
    })

    // Create notification on completion
    if (status === 'COMPLETED' && existingEnrollment.status !== 'COMPLETED') {
      await db.notification.create({
        data: {
          title: 'Course Completed! 🎉',
          message: `Congratulations! You completed "${enrollment.course.title}"`,
          type: 'COMPLETION',
          userId: existingEnrollment.userId,
        },
      })

      // Award completion points
      await db.user.update({
        where: { id: existingEnrollment.userId },
        data: { points: { increment: 50 } },
      })
    }

    return NextResponse.json({
      success: true,
      data: enrollment,
      message: 'Enrollment updated successfully',
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update enrollment' },
      { status: 500 }
    )
  }
}

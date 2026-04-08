import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/enrollments - Get enrollments (with filtering)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const userId = searchParams.get('userId')
    const courseId = searchParams.get('courseId')
    const status = searchParams.get('status')

    const where: any = {}
    if (userId) where.userId = userId
    if (courseId) where.courseId = courseId
    if (status) where.status = status

    const [enrollments, total] = await Promise.all([
      db.enrollment.findMany({
        where,
        include: {
          user: {
            select: { id: true, name: true, email: true, image: true },
          },
          course: {
            select: {
              id: true,
              title: true,
              slug: true,
              thumbnail: true,
              price: true,
            },
          },
        },
        orderBy: { enrolledAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.enrollment.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: enrollments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch enrollments' },
      { status: 500 }
    )
  }
}

// POST /api/enrollments - Create enrollment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, courseId } = body

    if (!userId || !courseId) {
      return NextResponse.json(
        { success: false, error: 'userId and courseId are required' },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = await db.user.findUnique({ where: { id: userId } })
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if course exists
    const course = await db.course.findUnique({ where: { id: courseId } })
    if (!course) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      )
    }

    // Check for existing enrollment
    const existingEnrollment = await db.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    })
    if (existingEnrollment) {
      return NextResponse.json(
        { success: false, error: 'Already enrolled in this course' },
        { status: 409 }
      )
    }

    // Check max students
    if (course.maxStudents) {
      const enrollmentCount = await db.enrollment.count({
        where: { courseId },
      })
      if (enrollmentCount >= course.maxStudents) {
        return NextResponse.json(
          { success: false, error: 'Course has reached maximum student capacity' },
          { status: 400 }
        )
      }
    }

    const enrollment = await db.enrollment.create({
      data: { userId, courseId, status: 'ACTIVE', progress: 0 },
      include: {
        user: { select: { id: true, name: true, email: true } },
        course: {
          select: { id: true, title: true, slug: true, thumbnail: true },
        },
      },
    })

    // Create a notification
    await db.notification.create({
      data: {
        title: 'New Enrollment',
        message: `You have been enrolled in "${course.title}"`,
        type: 'ENROLLMENT',
        userId,
      },
    })

    // Award points to user
    await db.user.update({
      where: { id: userId },
      data: { points: { increment: 10 } },
    })

    return NextResponse.json(
      { success: true, data: enrollment, message: 'Enrolled successfully' },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create enrollment' },
      { status: 500 }
    )
  }
}

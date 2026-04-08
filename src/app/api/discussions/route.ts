import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/discussions - Get discussions for a course
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')
    const lessonId = searchParams.get('lessonId')
    const parentId = searchParams.get('parentId')
    const userId = searchParams.get('userId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '30')

    const where: any = {}
    if (courseId) where.courseId = courseId
    if (lessonId) where.lessonId = lessonId
    if (parentId) where.parentId = parentId
    if (parentId === 'null' || parentId === '') where.parentId = null
    if (userId) where.userId = userId

    const [discussions, total] = await Promise.all([
      db.discussion.findMany({
        where,
        include: {
          user: {
            select: { id: true, name: true, image: true, role: true },
          },
          replies: {
            include: {
              user: {
                select: { id: true, name: true, image: true, role: true },
              },
            },
            orderBy: { createdAt: 'asc' },
          },
          course: {
            select: { id: true, title: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.discussion.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: discussions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch discussions' },
      { status: 500 }
    )
  }
}

// POST /api/discussions - Create a discussion
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, courseId, lessonId, parentId, title, content } = body

    if (!userId || !courseId || !content) {
      return NextResponse.json(
        { success: false, error: 'userId, courseId, and content are required' },
        { status: 400 }
      )
    }

    // Check user exists
    const user = await db.user.findUnique({ where: { id: userId } })
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Check course exists
    const course = await db.course.findUnique({ where: { id: courseId } })
    if (!course) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      )
    }

    // If parentId, check it exists
    if (parentId) {
      const parent = await db.discussion.findUnique({ where: { id: parentId } })
      if (!parent) {
        return NextResponse.json(
          { success: false, error: 'Parent discussion not found' },
          { status: 404 }
        )
      }
    }

    const discussion = await db.discussion.create({
      data: {
        userId,
        courseId,
        lessonId: lessonId || null,
        parentId: parentId || null,
        title: title || null,
        content,
      },
      include: {
        user: {
          select: { id: true, name: true, image: true, role: true },
        },
      },
    })

    return NextResponse.json(
      { success: true, data: discussion, message: 'Discussion created successfully' },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create discussion' },
      { status: 500 }
    )
  }
}

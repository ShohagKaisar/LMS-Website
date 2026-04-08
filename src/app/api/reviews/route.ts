import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/reviews - Get reviews (filter by courseId)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')
    const userId = searchParams.get('userId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    if (!courseId && !userId) {
      return NextResponse.json(
        { success: false, error: 'courseId or userId is required' },
        { status: 400 }
      )
    }

    const where: any = {}
    if (courseId) where.courseId = courseId
    if (userId) where.userId = userId

    const [reviews, total] = await Promise.all([
      db.review.findMany({
        where,
        include: {
          user: {
            select: { id: true, name: true, image: true },
          },
          course: {
            select: { id: true, title: true, slug: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.review.count({ where }),
    ])

    // Calculate average rating
    const avgRating =
      total > 0
        ? Math.round(
            (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10
          ) / 10
        : 0

    return NextResponse.json({
      success: true,
      data: reviews,
      avgRating,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

// POST /api/reviews - Create a review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, courseId, rating, comment } = body

    if (!userId || !courseId || !rating) {
      return NextResponse.json(
        { success: false, error: 'userId, courseId, and rating are required' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: 'Rating must be between 1 and 5' },
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

    // Check for existing review
    const existingReview = await db.review.findUnique({
      where: { userId_courseId: { userId, courseId } },
    })
    if (existingReview) {
      return NextResponse.json(
        { success: false, error: 'You have already reviewed this course' },
        { status: 409 }
      )
    }

    const review = await db.review.create({
      data: { userId, courseId, rating, comment },
      include: {
        user: { select: { id: true, name: true, image: true } },
        course: { select: { id: true, title: true } },
      },
    })

    // Award review points
    await db.user.update({
      where: { id: userId },
      data: { points: { increment: 5 } },
    })

    return NextResponse.json(
      { success: true, data: review, message: 'Review submitted successfully' },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create review' },
      { status: 500 }
    )
  }
}

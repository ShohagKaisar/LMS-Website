import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/courses/[id] - Get single course with details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const course = await db.course.findUnique({
      where: { id },
      include: {
        category: true,
        instructor: {
          select: {
            id: true,
            name: true,
            image: true,
            bio: true,
            role: true,
            _count: {
              select: { courses: true, reviews: true },
            },
          },
        },
        sections: {
          include: {
            lessons: {
              include: {
                quiz: {
                  include: {
                    questions: true,
                  },
                },
                progress: true,
              },
              orderBy: { order: 'asc' },
            },
          },
          orderBy: { order: 'asc' },
        },
        reviews: {
          include: {
            user: {
              select: { id: true, name: true, image: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: { enrollments: true, reviews: true },
        },
      },
    })

    if (!course) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      )
    }

    // Calculate average rating
    const avgRating =
      course.reviews.length > 0
        ? Math.round(
            (course.reviews.reduce((sum, r) => sum + r.rating, 0) /
              course.reviews.length) *
              10
          ) / 10
        : 0

    // Calculate total duration from lessons
    const totalDuration = course.sections.reduce(
      (sum, section) =>
        sum + section.lessons.reduce((ls, lesson) => ls + lesson.duration, 0),
      0
    )

    return NextResponse.json({
      success: true,
      data: { ...course, avgRating, totalDuration },
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch course' },
      { status: 500 }
    )
  }
}

// PUT /api/courses/[id] - Update a course
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const existingCourse = await db.course.findUnique({ where: { id } })
    if (!existingCourse) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      )
    }

    const {
      title,
      slug,
      description,
      shortDesc,
      thumbnail,
      previewVideo,
      level,
      language,
      price,
      discountPrice,
      status,
      isFeatured,
      maxStudents,
      categorySlug,
    } = body

    // Check slug uniqueness if changing
    if (slug && slug !== existingCourse.slug) {
      const slugExists = await db.course.findUnique({ where: { slug } })
      if (slugExists) {
        return NextResponse.json(
          { success: false, error: 'Course slug already exists' },
          { status: 409 }
        )
      }
    }

    // Check category exists if changing
    if (categorySlug) {
      const category = await db.category.findUnique({ where: { slug: categorySlug } })
      if (!category) {
        return NextResponse.json(
          { success: false, error: 'Category not found' },
          { status: 404 }
        )
      }
    }

    const course = await db.course.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(description && { description }),
        ...(shortDesc !== undefined && { shortDesc }),
        ...(thumbnail !== undefined && { thumbnail }),
        ...(previewVideo !== undefined && { previewVideo }),
        ...(level && { level }),
        ...(language && { language }),
        ...(price !== undefined && { price }),
        ...(discountPrice !== undefined && { discountPrice }),
        ...(status && { status }),
        ...(isFeatured !== undefined && { isFeatured }),
        ...(maxStudents !== undefined && { maxStudents }),
        ...(categorySlug && { categorySlug }),
      },
      include: {
        category: true,
        instructor: {
          select: { id: true, name: true, image: true },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: course,
      message: 'Course updated successfully',
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update course' },
      { status: 500 }
    )
  }
}

// DELETE /api/courses/[id] - Delete a course
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const existingCourse = await db.course.findUnique({ where: { id } })
    if (!existingCourse) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      )
    }

    await db.course.delete({ where: { id } })

    return NextResponse.json({
      success: true,
      message: 'Course deleted successfully',
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete course' },
      { status: 500 }
    )
  }
}

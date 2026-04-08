import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/courses - Get all courses with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    const level = searchParams.get('level')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const search = searchParams.get('search')
    const status = searchParams.get('status')
    const instructorId = searchParams.get('instructorId')
    const isFeatured = searchParams.get('isFeatured')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const where: any = {}

    if (category) where.categorySlug = category
    if (level) where.level = level
    if (status) where.status = status
    if (instructorId) where.instructorId = instructorId
    if (isFeatured === 'true') where.isFeatured = true

    if (minPrice !== null || maxPrice !== null) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { shortDesc: { contains: search } },
      ]
    }

    // Validate sort fields
    const validSortFields = ['createdAt', 'price', 'title']
    const orderField = validSortFields.includes(sortBy) ? sortBy : 'createdAt'

    const [courses, total] = await Promise.all([
      db.course.findMany({
        where,
        include: {
          category: true,
          instructor: {
            select: { id: true, name: true, image: true, bio: true },
          },
          _count: {
            select: { enrollments: true, reviews: true, sections: true, lessons: true },
          },
        },
        orderBy: { [orderField]: sortOrder === 'asc' ? 'asc' : 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.course.count({ where }),
    ])

    // Get average ratings for courses
    const reviews = await db.review.groupBy({
      by: ['courseId'],
      _avg: { rating: true },
    })
    const ratingMap: Record<string, number> = {}
    reviews.forEach((r) => {
      if (r.courseId && r._avg.rating) {
        ratingMap[r.courseId] = Math.round(r._avg.rating * 10) / 10
      }
    })

    const coursesWithRating = courses.map((course) => ({
      ...course,
      avgRating: ratingMap[course.id] || 0,
    }))

    return NextResponse.json({
      success: true,
      data: coursesWithRating,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}

// POST /api/courses - Create a new course
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
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
      instructorId,
    } = body

    if (!title || !slug || !description || !categorySlug || !instructorId) {
      return NextResponse.json(
        { success: false, error: 'Title, slug, description, categorySlug, and instructorId are required' },
        { status: 400 }
      )
    }

    // Check if category exists
    const category = await db.category.findUnique({ where: { slug: categorySlug } })
    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      )
    }

    // Check if instructor exists
    const instructor = await db.user.findUnique({ where: { id: instructorId } })
    if (!instructor) {
      return NextResponse.json(
        { success: false, error: 'Instructor not found' },
        { status: 404 }
      )
    }

    // Check slug uniqueness
    const existingCourse = await db.course.findUnique({ where: { slug } })
    if (existingCourse) {
      return NextResponse.json(
        { success: false, error: 'Course slug already exists' },
        { status: 409 }
      )
    }

    const course = await db.course.create({
      data: {
        title,
        slug,
        description,
        shortDesc,
        thumbnail,
        previewVideo,
        level: level || 'BEGINNER',
        language: language || 'English',
        price: price || 0,
        discountPrice,
        status: status || 'DRAFT',
        isFeatured: isFeatured || false,
        maxStudents,
        categorySlug,
        instructorId,
      },
      include: {
        category: true,
        instructor: {
          select: { id: true, name: true, image: true },
        },
      },
    })

    return NextResponse.json(
      { success: true, data: course, message: 'Course created successfully' },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create course' },
      { status: 500 }
    )
  }
}

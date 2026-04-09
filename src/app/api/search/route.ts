import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/search - Search courses
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const category = searchParams.get('category')
    const level = searchParams.get('level')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Search query (q) is required' },
        { status: 400 }
      )
    }

    const where: any = {
      status: 'PUBLISHED',
      OR: [
        { title: { contains: query } },
        { description: { contains: query } },
        { shortDesc: { contains: query } },
      ],
    }

    if (category) where.categorySlug = category
    if (level) where.level = level
    if (minPrice !== null || maxPrice !== null) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }

    const [courses, total] = await Promise.all([
      db.course.findMany({
        where,
        include: {
          category: true,
          instructor: {
            select: { id: true, name: true, image: true },
          },
          _count: {
            select: { enrollments: true, reviews: true },
          },
        },
        orderBy: { isFeatured: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.course.count({ where }),
    ])

    // Get ratings
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

    // Also search blog posts
    const blogPosts = await db.blogPost.findMany({
      where: {
        status: 'PUBLISHED',
        OR: [
          { title: { contains: query } },
          { content: { contains: query } },
        ],
      },
      take: 5,
      include: {
        author: { select: { id: true, name: true } },
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        courses: coursesWithRating,
        blogPosts,
        total,
        query,
      },
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Search failed' },
      { status: 500 }
    )
  }
}

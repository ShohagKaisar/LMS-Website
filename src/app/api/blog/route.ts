import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/blog - Get all blog posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const authorId = searchParams.get('authorId')
    const search = searchParams.get('search')

    const where: any = {}
    if (status) where.status = status
    if (authorId) where.authorId = authorId
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { content: { contains: search } },
      ]
    }

    const [posts, total] = await Promise.all([
      db.blogPost.findMany({
        where,
        include: {
          author: {
            select: { id: true, name: true, image: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.blogPost.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

// POST /api/blog - Create a blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, slug, content, excerpt, thumbnail, authorId, status, tags } = body

    if (!title || !slug || !content || !authorId) {
      return NextResponse.json(
        { success: false, error: 'title, slug, content, and authorId are required' },
        { status: 400 }
      )
    }

    // Check author exists
    const author = await db.user.findUnique({ where: { id: authorId } })
    if (!author) {
      return NextResponse.json(
        { success: false, error: 'Author not found' },
        { status: 404 }
      )
    }

    // Check slug uniqueness
    const existing = await db.blogPost.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Blog slug already exists' },
        { status: 409 }
      )
    }

    const post = await db.blogPost.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        thumbnail,
        authorId,
        status: status || 'DRAFT',
        tags: tags ? JSON.stringify(tags) : null,
      },
      include: {
        author: { select: { id: true, name: true, image: true } },
      },
    })

    return NextResponse.json(
      { success: true, data: post, message: 'Blog post created successfully' },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create blog post' },
      { status: 500 }
    )
  }
}

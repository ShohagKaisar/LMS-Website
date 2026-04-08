import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/wishlist - Get user's wishlist
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId is required' },
        { status: 400 }
      )
    }

    const wishlist = await db.wishlist.findMany({
      where: { userId },
      include: {
        course: {
          include: {
            category: true,
            instructor: {
              select: { id: true, name: true, image: true },
            },
            _count: {
              select: { enrollments: true, reviews: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, data: wishlist })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch wishlist' },
      { status: 500 }
    )
  }
}

// POST /api/wishlist - Add to wishlist
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

    // Check for existing wishlist item
    const existing = await db.wishlist.findUnique({
      where: { userId_courseId: { userId, courseId } },
    })
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Course already in wishlist' },
        { status: 409 }
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

    const wishlist = await db.wishlist.create({
      data: { userId, courseId },
      include: {
        course: {
          select: { id: true, title: true, thumbnail: true, price },
        },
      },
    })

    return NextResponse.json(
      { success: true, data: wishlist, message: 'Added to wishlist' },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to add to wishlist' },
      { status: 500 }
    )
  }
}

// DELETE /api/wishlist - Remove from wishlist
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const courseId = searchParams.get('courseId')

    if (!userId || !courseId) {
      return NextResponse.json(
        { success: false, error: 'userId and courseId are required' },
        { status: 400 }
      )
    }

    const wishlistItem = await db.wishlist.findUnique({
      where: { userId_courseId: { userId, courseId } },
    })
    if (!wishlistItem) {
      return NextResponse.json(
        { success: false, error: 'Wishlist item not found' },
        { status: 404 }
      )
    }

    await db.wishlist.delete({
      where: { id: wishlistItem.id },
    })

    return NextResponse.json({
      success: true,
      message: 'Removed from wishlist',
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to remove from wishlist' },
      { status: 500 }
    )
  }
}

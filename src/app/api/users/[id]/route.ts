import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/users/[id] - Get single user
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        bio: true,
        phone: true,
        role: true,
        isVerified: true,
        isApproved: true,
        points: true,
        streak: true,
        lastActiveAt: true,
        createdAt: true,
        updatedAt: true,
        enrollments: {
          include: {
            course: {
              select: { id: true, title: true, slug: true, thumbnail: true },
            },
          },
          orderBy: { enrolledAt: 'desc' },
        },
        badges: {
          include: { badge: true },
          orderBy: { earnedAt: 'desc' },
        },
        certificates: true,
        _count: {
          select: {
            reviews: true,
            quizAttempts: true,
            courses: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: user })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

// PUT /api/users/[id] - Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const existingUser = await db.user.findUnique({ where: { id } })
    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    const { name, email, bio, phone, image, role, isVerified, isApproved, points, streak } = body

    // Check email uniqueness if changing
    if (email && email !== existingUser.email) {
      const emailExists = await db.user.findUnique({ where: { email } })
      if (emailExists) {
        return NextResponse.json(
          { success: false, error: 'Email already in use' },
          { status: 409 }
        )
      }
    }

    const user = await db.user.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(bio !== undefined && { bio }),
        ...(phone !== undefined && { phone }),
        ...(image !== undefined && { image }),
        ...(role && { role }),
        ...(isVerified !== undefined && { isVerified }),
        ...(isApproved !== undefined && { isApproved }),
        ...(points !== undefined && { points }),
        ...(streak !== undefined && { streak }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        bio: true,
        phone: true,
        role: true,
        isVerified: true,
        isApproved: true,
        points: true,
        streak: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: user,
      message: 'User updated successfully',
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update user' },
      { status: 500 }
    )
  }
}

// DELETE /api/users/[id] - Delete user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const existingUser = await db.user.findUnique({ where: { id } })
    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    await db.user.delete({ where: { id } })

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete user' },
      { status: 500 }
    )
  }
}

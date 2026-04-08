import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/users - Get all users (with filtering and pagination)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const role = searchParams.get('role')
    const search = searchParams.get('search')

    const where: any = {}
    if (role) where.role = role
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
      ]
    }

    const [users, total] = await Promise.all([
      db.user.findMany({
        where,
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
          _count: {
            select: {
              enrollments: true,
              reviews: true,
              quizAttempts: true,
              courses: true,
              certificates: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.user.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

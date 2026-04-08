import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/notifications - Get notifications for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const isRead = searchParams.get('isRead')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId is required' },
        { status: 400 }
      )
    }

    const where: any = { userId }
    if (isRead === 'true') where.isRead = true
    if (isRead === 'false') where.isRead = false

    const [notifications, total, unreadCount] = await Promise.all([
      db.notification.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.notification.count({ where }),
      db.notification.count({
        where: { userId, isRead: false },
      }),
    ])

    return NextResponse.json({
      success: true,
      data: notifications,
      unreadCount,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}

// POST /api/notifications - Mark notifications as read
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, notificationId, markAll } = body

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId is required' },
        { status: 400 }
      )
    }

    if (markAll) {
      // Mark all as read for the user
      await db.notification.updateMany({
        where: { userId, isRead: false },
        data: { isRead: true },
      })

      return NextResponse.json({
        success: true,
        message: 'All notifications marked as read',
      })
    }

    if (notificationId) {
      const notification = await db.notification.findFirst({
        where: { id: notificationId, userId },
      })
      if (!notification) {
        return NextResponse.json(
          { success: false, error: 'Notification not found' },
          { status: 404 }
        )
      }

      await db.notification.update({
        where: { id: notificationId },
        data: { isRead: true },
      })

      return NextResponse.json({
        success: true,
        message: 'Notification marked as read',
      })
    }

    return NextResponse.json(
      { success: false, error: 'notificationId or markAll is required' },
      { status: 400 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update notification' },
      { status: 500 }
    )
  }
}

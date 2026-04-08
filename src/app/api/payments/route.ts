import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/payments - Get payments
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const userId = searchParams.get('userId')
    const enrollmentId = searchParams.get('enrollmentId')
    const status = searchParams.get('status')

    const where: any = {}
    if (userId) where.userId = userId
    if (enrollmentId) where.enrollmentId = enrollmentId
    if (status) where.status = status

    const [payments, total] = await Promise.all([
      db.payment.findMany({
        where,
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
          enrollment: {
            include: {
              course: {
                select: { id: true, title: true },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.payment.count({ where }),
    ])

    // Total revenue
    const revenueAgg = await db.payment.aggregate({
      where: { status: 'COMPLETED' },
      _sum: { amount: true },
    })

    return NextResponse.json({
      success: true,
      data: payments,
      totalRevenue: revenueAgg._sum.amount || 0,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch payments' },
      { status: 500 }
    )
  }
}

// POST /api/payments - Create a payment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, enrollmentId, amount, currency, method, transactionId, couponCode } = body

    if (!userId || !enrollmentId || amount === undefined) {
      return NextResponse.json(
        { success: false, error: 'userId, enrollmentId, and amount are required' },
        { status: 400 }
      )
    }

    // Check enrollment exists
    const enrollment = await db.enrollment.findUnique({
      where: { id: enrollmentId },
      include: { course: true },
    })
    if (!enrollment) {
      return NextResponse.json(
        { success: false, error: 'Enrollment not found' },
        { status: 404 }
      )
    }

    // Validate coupon if provided
    if (couponCode) {
      const coupon = await db.coupon.findUnique({
        where: { code: couponCode.toUpperCase() },
      })
      if (!coupon || !coupon.isActive) {
        return NextResponse.json(
          { success: false, error: 'Invalid or inactive coupon' },
          { status: 400 }
        )
      }

      // Increment coupon usage
      await db.coupon.update({
        where: { code: couponCode.toUpperCase() },
        data: { usedCount: { increment: 1 } },
      })
    }

    const payment = await db.payment.create({
      data: {
        amount,
        currency: currency || 'USD',
        method: method || 'STRIPE',
        status: 'COMPLETED',
        transactionId,
        couponCode: couponCode ? couponCode.toUpperCase() : null,
        enrollmentId,
        userId,
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        enrollment: {
          include: {
            course: { select: { id: true, title: true } },
          },
        },
      },
    })

    return NextResponse.json(
      { success: true, data: payment, message: 'Payment completed successfully' },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create payment' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/coupons - Get all coupons
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')

    const where: any = {
      isActive: true,
      validFrom: { lte: new Date() },
      validUntil: { gte: new Date() },
    }

    if (courseId) {
      where.OR = [
        { courseId },
        { courseId: null },
      ]
    } else {
      where.courseId = null
    }

    const coupons = await db.coupon.findMany({
      where,
      include: {
        course: {
          select: { id: true, title: true, thumbnail: true },
        },
      },
      orderBy: { discount: 'desc' },
    })

    return NextResponse.json({ success: true, data: coupons })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch coupons' },
      { status: 500 }
    )
  }
}

// POST /api/coupons - Validate a coupon code
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code, courseId } = body

    if (!code) {
      return NextResponse.json(
        { success: false, error: 'Coupon code is required' },
        { status: 400 }
      )
    }

    const coupon = await db.coupon.findUnique({
      where: { code: code.toUpperCase() },
      include: {
        course: {
          select: { id: true, title: true },
        },
      },
    })

    if (!coupon) {
      return NextResponse.json(
        { success: false, error: 'Invalid coupon code' },
        { status: 404 }
      )
    }

    if (!coupon.isActive) {
      return NextResponse.json(
        { success: false, error: 'This coupon is no longer active' },
        { status: 400 }
      )
    }

    const now = new Date()
    if (now < coupon.validFrom || now > coupon.validUntil) {
      return NextResponse.json(
        { success: false, error: 'This coupon has expired or is not yet valid' },
        { status: 400 }
      )
    }

    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      return NextResponse.json(
        { success: false, error: 'This coupon has reached its maximum uses' },
        { status: 400 }
      )
    }

    // Check if coupon is for specific course
    if (coupon.courseId && coupon.courseId !== courseId) {
      return NextResponse.json(
        { success: false, error: 'This coupon is not valid for this course' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        id: coupon.id,
        code: coupon.code,
        discount: coupon.discount,
        applicableCourseId: coupon.courseId,
      },
      message: `Coupon applied! ${coupon.discount}% discount`,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to validate coupon' },
      { status: 500 }
    )
  }
}

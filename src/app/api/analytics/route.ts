import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/analytics - Get analytics data
export async function GET() {
  try {
    const [
      totalUsers,
      totalCourses,
      totalEnrollments,
      completedEnrollments,
      activeEnrollments,
      totalReviews,
      usersByRole,
    ] = await Promise.all([
      db.user.count(),
      db.course.count({ where: { status: 'PUBLISHED' } }),
      db.enrollment.count(),
      db.enrollment.count({ where: { status: 'COMPLETED' } }),
      db.enrollment.count({ where: { status: 'ACTIVE' } }),
      db.review.count(),
      db.user.groupBy({
        by: ['role'],
        _count: { id: true },
      }),
    ])

    // Total revenue from completed payments
    const payments = await db.payment.findMany({
      where: { status: 'COMPLETED' },
      select: { amount: true },
    })
    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0)

    // Average rating
    const ratingAgg = await db.review.aggregate({
      _avg: { rating: true },
    })
    const avgRating = ratingAgg._avg.rating
      ? Math.round(ratingAgg._avg.rating * 10) / 10
      : 0

    // Enrollments by month (last 6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const enrollmentsByMonth = await db.enrollment.groupBy({
      by: ['enrolledAt'],
      where: { enrolledAt: { gte: sixMonthsAgo } },
      _count: { id: true },
    })

    // Group by month
    const monthMap: Record<string, number> = {}
    enrollmentsByMonth.forEach((e) => {
      const month = new Date(e.enrolledAt).toISOString().slice(0, 7)
      monthMap[month] = (monthMap[month] || 0) + e._count.id
    })
    const enrollmentsByMonthFormatted = Object.entries(monthMap)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => a.month.localeCompare(b.month))

    // Top courses by enrollment count
    const topCourses = await db.enrollment.groupBy({
      by: ['courseId'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 5,
    })

    const topCoursesWithInfo = await Promise.all(
      topCourses.map(async (tc) => {
        const course = await db.course.findUnique({
          where: { id: tc.courseId },
          select: { id: true, title: true },
        })
        return {
          id: tc.courseId,
          title: course?.title || 'Unknown',
          enrollmentCount: tc._count.id,
        }
      })
    )

    // Recent enrollments
    const recentEnrollments = await db.enrollment.findMany({
      take: 10,
      orderBy: { enrolledAt: 'desc' },
      include: {
        user: { select: { id: true, name: true, image: true } },
        course: { select: { id: true, title: true, thumbnail: true } },
      },
    })

    const roleMap: Record<string, number> = {}
    usersByRole.forEach((r) => {
      roleMap[r.role] = r._count.id
    })

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        totalCourses,
        totalEnrollments,
        totalRevenue: Math.round(totalRevenue * 100) / 100,
        totalReviews,
        avgRating,
        completedEnrollments,
        activeEnrollments,
        usersByRole: roleMap,
        enrollmentsByMonth: enrollmentsByMonthFormatted,
        topCourses: topCoursesWithInfo,
        recentEnrollments,
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

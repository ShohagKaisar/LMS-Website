import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/progress - Get lesson progress for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const courseId = searchParams.get('courseId')
    const lessonId = searchParams.get('lessonId')

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId is required' },
        { status: 400 }
      )
    }

    const where: any = { userId }
    if (lessonId) where.lessonId = lessonId
    if (courseId) {
      where.lesson = { courseId }
    }

    const progress = await db.lessonProgress.findMany({
      where,
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            type: true,
            duration: true,
            courseId: true,
            sectionId: true,
            order: true,
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    })

    return NextResponse.json({ success: true, data: progress })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch progress' },
      { status: 500 }
    )
  }
}

// POST /api/progress - Create or update lesson progress
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, lessonId, isCompleted, lastPosition } = body

    if (!userId || !lessonId) {
      return NextResponse.json(
        { success: false, error: 'userId and lessonId are required' },
        { status: 400 }
      )
    }

    // Check if lesson exists
    const lesson = await db.lesson.findUnique({ where: { id: lessonId } })
    if (!lesson) {
      return NextResponse.json(
        { success: false, error: 'Lesson not found' },
        { status: 404 }
      )
    }

    // Upsert progress
    const progress = await db.lessonProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      create: {
        userId,
        lessonId,
        isCompleted: isCompleted || false,
        lastPosition: lastPosition || 0,
        completedAt: isCompleted ? new Date() : null,
      },
      update: {
        ...(isCompleted !== undefined && { isCompleted }),
        ...(lastPosition !== undefined && { lastPosition }),
        ...(isCompleted && { completedAt: new Date() }),
      },
    })

    // Update enrollment progress if lesson is completed
    if (isCompleted) {
      const totalLessons = await db.lesson.count({
        where: { courseId: lesson.courseId },
      })
      const completedLessons = await db.lessonProgress.count({
        where: {
          userId,
          lesson: { courseId: lesson.courseId },
          isCompleted: true,
        },
      })
      const progressPercent = Math.round((completedLessons / totalLessons) * 100)

      await db.enrollment.updateMany({
        where: { userId, courseId: lesson.courseId },
        data: { progress: progressPercent },
      })

      // If fully completed, mark enrollment as completed
      if (progressPercent >= 100) {
        await db.enrollment.updateMany({
          where: { userId, courseId: lesson.courseId, status: 'ACTIVE' },
          data: { status: 'COMPLETED', completedAt: new Date() },
        })
      }
    }

    return NextResponse.json({
      success: true,
      data: progress,
      message: 'Progress updated successfully',
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update progress' },
      { status: 500 }
    )
  }
}

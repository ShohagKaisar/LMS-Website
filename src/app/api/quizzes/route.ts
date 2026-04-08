import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/quizzes - Get quizzes (with optional filtering)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')
    const lessonId = searchParams.get('lessonId')

    const where: any = {}
    if (lessonId) {
      where.lesson = { id: lessonId }
    } else if (courseId) {
      where.lesson = { courseId }
    }

    const quizzes = await db.quiz.findMany({
      where,
      include: {
        questions: {
          orderBy: { order: 'asc' },
        },
        lesson: {
          select: { id: true, title: true, courseId: true },
        },
        _count: {
          select: { attempts: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, data: quizzes })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch quizzes' },
      { status: 500 }
    )
  }
}

// POST /api/quizzes - Create a quiz
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, passingScore, timeLimit, lessonId, questions } = body

    if (!title || !questions || questions.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Title and questions are required' },
        { status: 400 }
      )
    }

    if (lessonId) {
      const lesson = await db.lesson.findUnique({ where: { id: lessonId } })
      if (!lesson) {
        return NextResponse.json(
          { success: false, error: 'Lesson not found' },
          { status: 404 }
        )
      }
    }

    const quiz = await db.quiz.create({
      data: {
        title,
        passingScore: passingScore || 60,
        timeLimit,
        ...(lessonId && { lessonId }),
        questions: {
          create: questions.map((q: any, index: number) => ({
            question: q.question,
            options: JSON.stringify(q.options),
            correctAnswer: JSON.stringify(q.correctAnswer),
            explanation: q.explanation,
            order: q.order || index,
          })),
        },
      },
      include: {
        questions: { orderBy: { order: 'asc' } },
      },
    })

    return NextResponse.json(
      { success: true, data: quiz, message: 'Quiz created successfully' },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create quiz' },
      { status: 500 }
    )
  }
}

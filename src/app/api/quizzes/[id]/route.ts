import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/quizzes/[id] - Get quiz with questions (no answers exposed)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const includeAnswers = searchParams.get('answers') === 'true'

    const quiz = await db.quiz.findUnique({
      where: { id },
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
    })

    if (!quiz) {
      return NextResponse.json(
        { success: false, error: 'Quiz not found' },
        { status: 404 }
      )
    }

    // Parse JSON strings
    const formattedQuiz = {
      ...quiz,
      questions: quiz.questions.map((q) => ({
        ...q,
        options: JSON.parse(q.options),
        correctAnswer: includeAnswers ? JSON.parse(q.correctAnswer) : undefined,
      })),
    }

    return NextResponse.json({ success: true, data: formattedQuiz })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch quiz' },
      { status: 500 }
    )
  }
}

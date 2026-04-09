import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST /api/quizzes/[id]/attempt - Submit a quiz attempt
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { userId, answers, timeTaken } = body

    if (!userId || !answers) {
      return NextResponse.json(
        { success: false, error: 'userId and answers are required' },
        { status: 400 }
      )
    }

    // Get quiz with questions and correct answers
    const quiz = await db.quiz.findUnique({
      where: { id },
      include: {
        questions: { orderBy: { order: 'asc' } },
      },
    })

    if (!quiz) {
      return NextResponse.json(
        { success: false, error: 'Quiz not found' },
        { status: 404 }
      )
    }

    // Check user exists
    const user = await db.user.findUnique({ where: { id: userId } })
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Grade the quiz
    let correctAnswers = 0
    const questionResults: any[] = []

    quiz.questions.forEach((question, index) => {
      const userAnswer = answers[index]
      const correctAnswer = JSON.parse(question.correctAnswer)

      // Normalize both to strings for comparison
      const isCorrect =
        JSON.stringify(
          Array.isArray(userAnswer) ? userAnswer.sort() : userAnswer
        ) === JSON.stringify(Array.isArray(correctAnswer) ? correctAnswer.sort() : correctAnswer)

      if (isCorrect) correctAnswers++

      questionResults.push({
        questionId: question.id,
        isCorrect,
        userAnswer,
        correctAnswer,
      })
    })

    const score = Math.round((correctAnswers / quiz.questions.length) * 100)
    const passed = score >= quiz.passingScore

    // Create quiz attempt
    const attempt = await db.quizAttempt.create({
      data: {
        score,
        totalQuestions: quiz.questions.length,
        correctAnswers,
        passed,
        timeTaken: timeTaken || null,
        answers: JSON.stringify(answers),
        userId,
        quizId: id,
      },
    })

    // Award points for passing
    if (passed) {
      await db.user.update({
        where: { id: userId },
        data: { points: { increment: 25 } },
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        ...attempt,
        questionResults,
      },
      message: passed ? 'Congratulations! You passed the quiz!' : 'You did not pass. Try again!',
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit quiz attempt' },
      { status: 500 }
    )
  }
}

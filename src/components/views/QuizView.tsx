'use client'

import { useState } from 'react'
import { Clock, CheckCircle, XCircle, ArrowLeft, ArrowRight, RotateCcw, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { useAppStore } from '@/lib/store'

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    question: 'What does HTML stand for?',
    options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'],
    correct: 0,
    explanation: 'HTML stands for Hyper Text Markup Language. It is the standard markup language for creating web pages.',
  },
  {
    id: 2,
    question: 'Which CSS property is used to create flexible layouts?',
    options: ['display: grid', 'display: block', 'display: flex', 'display: inline'],
    correct: 2,
    explanation: 'display: flex creates a flex container, enabling a flex context for its direct children.',
  },
  {
    id: 3,
    question: 'What is the correct syntax for referring to an external script?',
    options: ['<script href="script.js">', '<script name="script.js">', '<script src="script.js">', '<script file="script.js">'],
    correct: 2,
    explanation: 'The src attribute specifies the URL of an external script file.',
  },
  {
    id: 4,
    question: 'Which JavaScript method is used to add an event listener?',
    options: ['addEvent()', 'addEventListener()', 'onEvent()', 'attachEvent()'],
    correct: 1,
    explanation: 'addEventListener() sets up a function that will be called whenever the specified event is delivered to the target.',
  },
  {
    id: 5,
    question: 'What does CSS stand for?',
    options: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'],
    correct: 1,
    explanation: 'CSS stands for Cascading Style Sheets. It describes how HTML elements should be displayed.',
  },
  {
    id: 6,
    question: 'Which keyword declares a block-scoped variable in JavaScript?',
    options: ['var', 'let', 'both let and const', 'function'],
    correct: 2,
    explanation: 'Both let and const declare block-scoped variables. let allows reassignment while const does not.',
  },
  {
    id: 7,
    question: 'What is the purpose of the alt attribute in an <img> tag?',
    options: ['Specifies the image source', 'Provides alternative text for accessibility', 'Sets the image alignment', 'Defines the image border'],
    correct: 1,
    explanation: 'The alt attribute provides alternative information for an image if a user cannot view it, important for accessibility.',
  },
  {
    id: 8,
    question: 'Which CSS unit is relative to the viewport width?',
    options: ['em', 'rem', 'vw', 'px'],
    correct: 2,
    explanation: 'vw stands for viewport width. 1vw is equal to 1% of the viewport width.',
  },
]

export default function QuizView() {
  const { navigate, goBack } = useAppStore()
  const [currentQ, setCurrentQ] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResult, setShowResult] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600)

  const question = questions[currentQ]
  const isAnswered = answers[currentQ] !== undefined
  const allAnswered = Object.keys(answers).length === questions.length

  const score = questions.reduce((acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0), 0)
  const percentage = Math.round((score / questions.length) * 100)
  const passed = percentage >= 70

  const handleSelect = (idx: number) => {
    if (isAnswered) return
    setSelectedAnswer(idx)
  }

  const handleConfirm = () => {
    if (selectedAnswer === null) return
    setAnswers(prev => ({ ...prev, [question.id]: selectedAnswer }))
    setSelectedAnswer(null)
  }

  const handleSubmit = () => {
    setShowResult(true)
  }

  const handleRetry = () => {
    setCurrentQ(0)
    setAnswers({})
    setSelectedAnswer(null)
    setShowResult(false)
    setShowReview(false)
  }

  if (showResult) {
    return (
      <div className="max-w-lg mx-auto">
        <Card className="border-0 shadow-xl text-center overflow-hidden">
          <div className={`py-12 ${passed ? 'gradient-emerald' : 'bg-gradient-to-br from-slate-400 to-slate-600'}`}>
            {passed ? (
              <Trophy className="h-16 w-16 text-white mx-auto mb-4" />
            ) : (
              <RotateCcw className="h-16 w-16 text-white/60 mx-auto mb-4" />
            )}
            <h2 className="text-2xl font-bold text-white">
              {passed ? 'Congratulations!' : 'Keep Trying!'}
            </h2>
            <p className="text-white/80 mt-2">
              {passed ? 'You passed the quiz!' : 'You need 70% to pass. Review and try again.'}
            </p>
          </div>
          <CardContent className="p-8 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-3xl font-bold text-primary">{score}/{questions.length}</p>
                <p className="text-sm text-muted-foreground">Correct</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{percentage}%</p>
                <p className="text-sm text-muted-foreground">Score</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{Math.ceil(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</p>
                <p className="text-sm text-muted-foreground">Time</p>
              </div>
            </div>
            <Separator />
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={handleRetry}>
                <RotateCcw className="h-4 w-4 mr-2" /> Retry
              </Button>
              <Button variant="outline" onClick={() => setShowReview(true)}>
                Review Answers
              </Button>
              <Button onClick={() => navigate('dashboard')}>
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>

        {showReview && (
          <div className="mt-6 space-y-4">
            {questions.map((q) => {
              const userAnswer = answers[q.id]
              const isCorrect = userAnswer === q.correct
              return (
                <Card key={q.id} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-2 mb-2">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive shrink-0" />
                      )}
                      <p className="font-medium text-sm">{q.question}</p>
                    </div>
                    <div className="space-y-1 ml-7">
                      {q.options.map((opt, i) => (
                        <p key={i} className={`text-xs p-1 rounded ${
                          i === q.correct ? 'text-primary font-medium' :
                          i === userAnswer && !isCorrect ? 'text-destructive' : 'text-muted-foreground'
                        }`}>
                          {String.fromCharCode(65 + i)}. {opt}
                          {i === q.correct && ' ✓'}
                          {i === userAnswer && !isCorrect && ' ✗'}
                        </p>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 ml-7">{q.explanation}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={goBack}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <h2 className="font-semibold">JavaScript Fundamentals Quiz</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
        </div>
      </div>

      <Progress value={(Object.keys(answers).length / questions.length) * 100} className="h-2" />

      {/* Question */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <Badge variant="secondary">Question {currentQ + 1} of {questions.length}</Badge>
          </div>
          <h3 className="text-lg font-semibold mb-6">{question.question}</h3>

          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx
              const isAnswer = isAnswered && answers[question.id] === idx
              const isCorrectAnswer = isAnswered && idx === question.correct

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                    isCorrectAnswer
                      ? 'border-primary bg-primary/5'
                      : isAnswer && idx !== question.correct
                        ? 'border-destructive bg-destructive/5'
                        : isSelected
                          ? 'border-primary bg-primary/5'
                          : isAnswered
                            ? 'border-transparent opacity-60'
                            : 'border-muted hover:border-primary/50 hover:bg-muted/50'
                  }`}
                  disabled={isAnswered}
                >
                  <span className={`h-8 w-8 rounded-lg flex items-center justify-center text-sm font-medium shrink-0 ${
                    isCorrectAnswer ? 'bg-primary text-primary-foreground' :
                    isAnswer && idx !== question.correct ? 'bg-destructive text-destructive-foreground' :
                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm">{option}</span>
                  {isCorrectAnswer && <CheckCircle className="h-5 w-5 text-primary ml-auto" />}
                  {isAnswer && idx !== question.correct && <XCircle className="h-5 w-5 text-destructive ml-auto" />}
                </button>
              )
            })}
          </div>

          {!isAnswered && selectedAnswer !== null && (
            <Button className="mt-6" onClick={handleConfirm}>
              Confirm Answer
            </Button>
          )}

          {isAnswered && (
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Explanation:</strong> {question.explanation}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Previous
        </Button>

        <div className="flex gap-1">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentQ(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentQ ? 'w-6 bg-primary' :
                answers[questions[i].id] !== undefined ? 'w-2 bg-primary/40' :
                'w-2 bg-muted'
              }`}
            />
          ))}
        </div>

        {currentQ < questions.length - 1 ? (
          <Button onClick={() => setCurrentQ(currentQ + 1)} disabled={!isAnswered}>
            Next <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={!allAnswered}>
            Submit Quiz
          </Button>
        )}
      </div>
    </div>
  )
}

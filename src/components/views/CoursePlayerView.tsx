'use client'

import { useState } from 'react'
import {
  Video, FileText, HelpCircle, CheckCircle, Play, Pause, ChevronDown, ChevronUp,
  MessageSquare, Download, ArrowLeft, ArrowRight, BookOpen,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useAppStore } from '@/lib/store'
import { fetchCourseById, mockCourses } from '@/lib/api'
import type { Course, CurriculumSection } from '@/lib/api'
import { useEffect } from 'react'

export default function CoursePlayerView() {
  const { viewParams, navigate, goBack } = useAppStore()
  const [course, setCourse] = useState<Course | null>(null)
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0)
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set(['l1', 'l2']))
  const [showDiscussion, setShowDiscussion] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['s1']))

  useEffect(() => {
    const id = viewParams?.id || 'c1'
    fetchCourseById(id).then(setCourse).catch(() => {
      setCourse(mockCourses.find(c => c.id === id) || mockCourses[0])
    })
  }, [viewParams?.id])

  if (!course) return null

  const curriculum = course.curriculum.length > 0 ? course.curriculum : mockCourses.find(c => c.id === course.id)?.curriculum || []
  const currentSection = curriculum[currentSectionIdx]
  const currentLesson = currentSection?.lessons[currentLessonIdx]
  const totalLessons = curriculum.reduce((a, s) => a + s.lessons.length, 0)

  const progressPercent = Math.round((completedLessons.size / totalLessons) * 100)

  const toggleSection = (id: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const markComplete = () => {
    if (currentLesson) {
      setCompletedLessons(prev => new Set([...prev, currentLesson.id]))
    }
  }

  const goToLesson = (sIdx: number, lIdx: number) => {
    setCurrentSectionIdx(sIdx)
    setCurrentLessonIdx(lIdx)
    const section = curriculum[sIdx]
    if (section) setExpandedSections(prev => new Set([...prev, section.id]))
  }

  const goToNext = () => {
    if (!currentSection) return
    if (currentLessonIdx < currentSection.lessons.length - 1) {
      setCurrentLessonIdx(currentLessonIdx + 1)
    } else if (currentSectionIdx < curriculum.length - 1) {
      const nextS = currentSectionIdx + 1
      setCurrentSectionIdx(nextS)
      setCurrentLessonIdx(0)
      setExpandedSections(prev => new Set([...prev, curriculum[nextS].id]))
    }
  }

  const goToPrev = () => {
    if (currentLessonIdx > 0) {
      setCurrentLessonIdx(currentLessonIdx - 1)
    } else if (currentSectionIdx > 0) {
      const prevS = currentSectionIdx - 1
      setCurrentSectionIdx(prevS)
      setCurrentLessonIdx(curriculum[prevS].lessons.length - 1)
    }
  }

  return (
    <div className="space-y-4">
      {/* Top Progress Bar */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={goBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <Progress value={progressPercent} className="h-2" />
        </div>
        <span className="text-sm font-medium text-primary">{progressPercent}%</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar - Curriculum */}
        <div className="w-full lg:w-80 shrink-0">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <h2 className="font-semibold mb-3">Course Content</h2>
              <ScrollArea className="h-[calc(100vh-300px)] max-h-96 lg:max-h-none">
                <div className="space-y-2">
                  {curriculum.map((section, sIdx) => {
                    const isExpanded = expandedSections.has(section.id)
                    const sectionCompleted = section.lessons.every(l => completedLessons.has(l.id))
                    return (
                      <div key={section.id}>
                        <button
                          onClick={() => toggleSection(section.id)}
                          className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 text-left text-sm"
                        >
                          <div className="flex items-center gap-2">
                            {sectionCompleted ? (
                              <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                            ) : (
                              <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`} />
                            )}
                            <span className="font-medium">{section.title}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{section.lessons.length}</span>
                        </button>
                        {isExpanded && (
                          <div className="ml-4 space-y-0.5">
                            {section.lessons.map((lesson, lIdx) => {
                              const isActive = sIdx === currentSectionIdx && lIdx === currentLessonIdx
                              const isCompleted = completedLessons.has(lesson.id)
                              return (
                                <button
                                  key={lesson.id}
                                  onClick={() => goToLesson(sIdx, lIdx)}
                                  className={`w-full flex items-center gap-2 p-2 rounded-md text-left text-xs transition-colors ${
                                    isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted/50 text-muted-foreground'
                                  }`}
                                >
                                  {isCompleted && !isActive ? (
                                    <CheckCircle className="h-3 w-3 text-primary shrink-0" />
                                  ) : lesson.type === 'video' ? (
                                    <Video className="h-3 w-3 shrink-0" />
                                  ) : lesson.type === 'quiz' ? (
                                    <HelpCircle className="h-3 w-3 shrink-0" />
                                  ) : (
                                    <FileText className="h-3 w-3 shrink-0" />
                                  )}
                                  <span className="truncate">{lesson.title}</span>
                                  <span className="ml-auto text-xs opacity-70">{lesson.duration}</span>
                                </button>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Video Player Area */}
          <Card className="border-0 shadow-sm overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative">
              <div className="text-center text-white/60">
                {currentLesson?.type === 'video' ? (
                  <>
                    <Play className="h-16 w-16 mx-auto mb-3 opacity-60" />
                    <p className="text-lg">{currentLesson.title}</p>
                  </>
                ) : currentLesson?.type === 'quiz' ? (
                  <>
                    <HelpCircle className="h-16 w-16 mx-auto mb-3 opacity-60" />
                    <p className="text-lg">Quiz: {currentLesson.title}</p>
                  </>
                ) : (
                  <>
                    <FileText className="h-16 w-16 mx-auto mb-3 opacity-60" />
                    <p className="text-lg">{currentLesson.title}</p>
                  </>
                )}
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="font-semibold text-lg">{currentLesson?.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    Section {currentSectionIdx + 1}: {currentSection?.title}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDiscussion(!showDiscussion)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Discussion
                  </Button>
                  {currentLesson?.type === 'quiz' ? (
                    <Button size="sm" onClick={() => navigate('quiz', { id: 'q1' })}>
                      Start Quiz
                    </Button>
                  ) : (
                    <Button size="sm" onClick={markComplete}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {completedLessons.has(currentLesson?.id || '') ? 'Completed' : 'Mark Complete'}
                    </Button>
                  )}
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={goToPrev} disabled={currentSectionIdx === 0 && currentLessonIdx === 0}>
                  <ArrowLeft className="h-4 w-4 mr-1" /> Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  {currentLessonIdx + 1} of {currentSection?.lessons.length}
                </span>
                <Button variant="ghost" size="sm" onClick={goToNext}>
                  Next <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Discussion Panel */}
          {showDiscussion && (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Discussion</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium">A</div>
                    <div>
                      <p className="text-sm font-medium">Alex Johnson</p>
                      <p className="text-xs text-muted-foreground mb-1">Can someone explain the difference between Flexbox and Grid?</p>
                      <p className="text-xs text-muted-foreground">2 hours ago • 3 replies</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="h-8 w-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-medium">M</div>
                    <div>
                      <p className="text-sm font-medium">Maria Garcia</p>
                      <p className="text-xs text-muted-foreground mb-1">Great explanation! The examples really helped me understand.</p>
                      <p className="text-xs text-muted-foreground">5 hours ago • 1 reply</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <input placeholder="Ask a question..." className="flex-1 px-3 py-2 text-sm rounded-lg border bg-background" />
                  <Button size="sm">Post</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Resources */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Download className="h-4 w-4" /> Resources
              </h3>
              <div className="space-y-2">
                {['Course Slides (PDF)', 'Source Code (ZIP)', 'Cheat Sheet (PDF)', 'Exercise Files'].map((r) => (
                  <div key={r} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 text-sm">
                    <span className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" /> {r}
                    </span>
                    <Button variant="ghost" size="sm">Download</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

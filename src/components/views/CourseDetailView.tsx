'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen, Clock, Users, Globe, Star, ChevronDown, ChevronUp, Heart, Share2,
  FileText, Video, HelpCircle, Download, Award, Play, CheckCircle, MessageSquare,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAppStore } from '@/lib/store'
import { StarRating } from '@/components/shared/StarRating'
import { CourseCard } from '@/components/shared/CourseCard'
import { PageHeader } from '@/components/shared/PageHeader'
import { fetchCourseById, mockCourses } from '@/lib/api'
import type { Course } from '@/lib/api'

export default function CourseDetailView() {
  const { viewParams, navigate, addToCart, cartItems, isAuthenticated } = useAppStore()
  const [course, setCourse] = useState<Course | null>(null)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [inWishlist, setInWishlist] = useState(false)
  const [couponInput, setCouponInput] = useState('')

  useEffect(() => {
    const id = viewParams?.id
    if (!id) return
    fetchCourseById(id).then(setCourse).catch(() => {
      setCourse(mockCourses.find(c => c.id === id) || null)
    })
  }, [viewParams?.id])

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <PageHeader title="Course not found" />
      </div>
    )
  }

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const isInCart = cartItems.includes(course.id)
  const levelColors: Record<string, string> = {
    Beginner: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    Intermediate: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    Advanced: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400',
  }

  const relatedCourses = mockCourses.filter(c => c.category === course.category && c.id !== course.id).slice(0, 3)

  const ratingBreakdown = [
    { stars: 5, count: Math.round(course.reviewCount * 0.6) },
    { stars: 4, count: Math.round(course.reviewCount * 0.25) },
    { stars: 3, count: Math.round(course.reviewCount * 0.1) },
    { stars: 2, count: Math.round(course.reviewCount * 0.03) },
    { stars: 1, count: Math.round(course.reviewCount * 0.02) },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-8 gradient-emerald p-8 md:p-12">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className={levelColors[course.level]}>{course.level}</Badge>
            {course.bestseller && (
              <Badge className="bg-amber-400 text-amber-900">Bestseller</Badge>
            )}
            <Badge className="bg-white/20 text-white backdrop-blur-sm">{course.category}</Badge>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">{course.title}</h1>
          <p className="text-white/80 mb-6 max-w-3xl">{course.shortDescription}</p>
          <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
            <StarRating rating={course.rating} size="md" showValue reviewCount={course.reviewCount} />
            <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {course.studentCount.toLocaleString()} students</span>
            <span className="flex items-center gap-1"><Globe className="h-4 w-4" /> {course.language}</span>
            <span>Updated {course.lastUpdated}</span>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <Avatar className="h-10 w-10 border-2 border-white/30">
              <AvatarFallback className="bg-white/20 text-white text-sm">
                {course.instructorName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-white font-medium text-sm">Created by {course.instructorName}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({course.reviewCount})</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4">About this course</h2>
                  <p className="text-muted-foreground leading-relaxed">{course.description}</p>
                </div>

                {course.whatYouLearn.length > 0 && (
                  <div className="bg-muted/50 rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">What you&apos;ll learn</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.whatYouLearn.map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {course.requirements.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                    <ul className="space-y-2">
                      {course.requirements.map((req, i) => (
                        <li key={i} className="flex items-center gap-2 text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h2 className="text-xl font-semibold mb-4">Instructor</h2>
                  <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                      <Avatar className="h-14 w-14">
                        <AvatarFallback className="bg-primary/10 text-primary">{course.instructorName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{course.instructorName}</p>
                        <p className="text-sm text-muted-foreground">Expert Instructor</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="curriculum">
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">
                    {course.curriculum.length} sections • {course.lessonsCount} lessons • {course.duration}
                  </h2>
                </div>
                {course.curriculum.map((section) => {
                  const isExpanded = expandedSections.has(section.id)
                  return (
                    <Card key={section.id} className="border">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full flex items-center justify-between p-4 text-left"
                      >
                        <div>
                          <h3 className="font-semibold">{section.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {section.lessons.length} lessons
                          </p>
                        </div>
                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </button>
                      {isExpanded && (
                        <div className="border-t">
                          {section.lessons.map((lesson, idx) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                {lesson.type === 'video' ? (
                                  <Video className="h-4 w-4 text-muted-foreground" />
                                ) : lesson.type === 'quiz' ? (
                                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                )}
                                <div>
                                  <p className="text-sm font-medium">{lesson.title}</p>
                                  <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {(lesson.isPreview || lesson.isFree) && (
                                  <Badge variant="secondary" className="text-xs">Preview</Badge>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="text-center">
                    <p className="text-5xl font-bold">{course.rating}</p>
                    <StarRating rating={course.rating} size="lg" className="justify-center mt-2" />
                    <p className="text-sm text-muted-foreground mt-1">{course.reviewCount.toLocaleString()} ratings</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {ratingBreakdown.map((row) => (
                      <div key={row.stars} className="flex items-center gap-3">
                        <span className="text-sm w-4">{row.stars}</span>
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full"
                            style={{ width: `${(row.count / course.reviewCount) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-12 text-right">{row.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  {course.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary text-sm">
                              {review.userName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{review.userName}</p>
                            <StarRating rating={review.rating} size="sm" />
                          </div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="discussion">
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
                <h3 className="font-semibold mb-2">Q&A Discussion</h3>
                <p className="text-sm text-muted-foreground mb-4">Ask questions and share knowledge with other students.</p>
                <Button disabled>Coming Soon</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 shrink-0">
          <Card className="sticky top-24 border-0 shadow-lg">
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center gap-3">
                {course.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">${course.originalPrice}</span>
                )}
                <span className="text-3xl font-bold">${course.price}</span>
              </div>

              <Button
                className="w-full h-12 text-base"
                size="lg"
                onClick={() => {
                  if (isAuthenticated) {
                    if (!isInCart) addToCart(course.id)
                    navigate('checkout')
                  } else {
                    navigate('login')
                  }
                }}
              >
                {isAuthenticated ? (isInCart ? 'Proceed to Checkout' : 'Enroll Now') : 'Log in to Enroll'}
              </Button>

              <p className="text-xs text-center text-muted-foreground">30-day money-back guarantee</p>

              <Separator />

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Play className="h-4 w-4 text-muted-foreground" />
                  <span>{course.duration} of on-demand video</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>{course.articlesCount} articles</span>
                </div>
                <div className="flex items-center gap-3">
                  <Download className="h-4 w-4 text-muted-foreground" />
                  <span>{course.downloadableResources} downloadable resources</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span>{course.language}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span>Certificate of completion</span>
                </div>
                <div className="flex items-center gap-3">
                  <Infinity className="h-4 w-4 text-muted-foreground" />
                  <span>Full lifetime access</span>
                </div>
              </div>

              <Separator />

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setInWishlist(!inWishlist)}
                >
                  <Heart className={`h-4 w-4 mr-2 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                  {inWishlist ? 'Saved' : 'Wishlist'}
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              <div>
                <Label className="text-sm">Coupon Code</Label>
                <div className="flex gap-2 mt-1.5">
                  <Input placeholder="Enter code" className="h-9" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} />
                  <Button variant="outline" size="sm">Apply</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related Courses */}
      {relatedCourses.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCourses.map(c => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Infinity({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 12C12 12 14 8 18 8C22 8 22 12 22 12C22 12 22 16 18 16C14 16 12 12 12 12Z" />
      <path d="M12 12C12 12 10 8 6 8C2 8 2 12 2 12C2 12 2 16 6 16C10 16 12 12 12 12Z" />
    </svg>
  )
}

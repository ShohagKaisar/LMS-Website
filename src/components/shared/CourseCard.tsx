'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Course } from '@/lib/api'
import { StarRating } from './StarRating'
import { Clock, Users, BookOpen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useAppStore } from '@/lib/store'

interface CourseCardProps {
  course: Course
  variant?: 'default' | 'compact' | 'horizontal'
  className?: string
}

const levelColors: Record<string, string> = {
  Beginner: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
  Intermediate: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
  Advanced: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400',
}

export function CourseCard({ course, variant = 'default', className }: CourseCardProps) {
  const navigate = useAppStore((s) => s.navigate)

  const gradients = [
    'from-emerald-400 to-teal-600',
    'from-violet-400 to-purple-600',
    'from-rose-400 to-pink-600',
    'from-amber-400 to-orange-600',
    'from-sky-400 to-cyan-600',
    'from-lime-400 to-green-600',
  ]

  const gradientIndex =
    course.title.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % gradients.length

  if (variant === 'horizontal') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        className={cn('cursor-pointer', className)}
        onClick={() => navigate('course-detail', { id: course.id })}
      >
        <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow">
          <div className="flex flex-col sm:flex-row">
            <div
              className={`w-full sm:w-48 h-32 bg-gradient-to-br ${gradients[gradientIndex]} flex items-center justify-center shrink-0`}
            >
              <BookOpen className="h-10 w-10 text-white/70" />
            </div>
            <CardContent className="p-4 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className={cn('text-xs', levelColors[course.level])}>
                    {course.level}
                  </Badge>
                  {course.bestseller && (
                    <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
                      Bestseller
                    </Badge>
                  )}
                </div>
                <h3 className="font-semibold text-sm line-clamp-2 mb-1">{course.title}</h3>
                <p className="text-xs text-muted-foreground">{course.instructorName}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <StarRating rating={course.rating} size="sm" showValue reviewCount={course.reviewCount} />
                <div className="flex items-center gap-3">
                  {course.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      ${course.originalPrice}
                    </span>
                  )}
                  <span className="font-bold text-lg">${course.price}</span>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={cn('cursor-pointer', className)}
      onClick={() => navigate('course-detail', { id: course.id })}
    >
      <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all h-full flex flex-col">
        <div className="relative">
          <div
            className={`h-44 bg-gradient-to-br ${gradients[gradientIndex]} flex items-center justify-center`}
          >
            <BookOpen className="h-12 w-12 text-white/60" />
          </div>
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className={cn('text-xs', levelColors[course.level])}>{course.level}</Badge>
            {course.bestseller && (
              <Badge className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
                Bestseller
              </Badge>
            )}
          </div>
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-white/90 text-foreground text-xs backdrop-blur-sm">
              ${course.price}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-sm line-clamp-2 mb-1 group-hover:text-primary">
            {course.title}
          </h3>
          <p className="text-xs text-muted-foreground mb-2">{course.instructorName}</p>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">
            {course.shortDescription}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Clock className="h-3 w-3" />
            <span>{course.duration}</span>
            <Users className="h-3 w-3 ml-1" />
            <span>{course.studentCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t">
            <StarRating rating={course.rating} size="sm" showValue />
            {course.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ${course.originalPrice}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

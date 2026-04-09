'use client'

import { useState } from 'react'
import { BookOpen, Play, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useAppStore } from '@/lib/store'
import { EmptyState } from '@/components/shared/EmptyState'
import { mockCourses } from '@/lib/api'

const filters = ['All', 'In Progress', 'Completed']

export default function MyCoursesView() {
  const { navigate } = useAppStore()
  const [activeFilter, setActiveFilter] = useState('All')

  const enrolledCourses = [
    { ...mockCourses[0], progress: 65, status: 'In Progress' as const },
    { ...mockCourses[1], progress: 35, status: 'In Progress' as const },
    { ...mockCourses[3], progress: 12, status: 'In Progress' as const },
    { ...mockCourses[2], progress: 100, status: 'Completed' as const },
  ]

  const filtered = activeFilter === 'All'
    ? enrolledCourses
    : enrolledCourses.filter(c => c.status === activeFilter)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Courses</h1>
          <p className="text-muted-foreground">{enrolledCourses.length} courses enrolled</p>
        </div>
        <Button onClick={() => navigate('courses')}>Browse More Courses</Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {filters.map((f) => (
          <Button
            key={f}
            variant={activeFilter === f ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter(f)}
          >
            {f}
            {f === 'All' && <Badge variant="secondary" className="ml-2 text-xs bg-primary-foreground/20">{enrolledCourses.length}</Badge>}
          </Button>
        ))}
      </div>

      {/* Course Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <Card key={course.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
              <div className="h-36 gradient-emerald flex items-center justify-center">
                <BookOpen className="h-10 w-10 text-white/60" />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className={
                    course.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
                  }>
                    {course.status === 'Completed' ? <><CheckCircle className="h-3 w-3 mr-1" /> Completed</> : 'In Progress'}
                  </Badge>
                </div>
                <h3 className="font-semibold text-sm mb-1">{course.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{course.instructorName}</p>
                <div className="flex items-center gap-3 mb-3">
                  <Progress value={course.progress} className="h-2 flex-1" />
                  <span className="text-sm font-medium text-primary">{course.progress}%</span>
                </div>
                <Button
                  className="w-full"
                  size="sm"
                  onClick={() => navigate(course.status === 'Completed' ? 'course-player' : 'course-player', { id: course.id })}
                >
                  <Play className="h-4 w-4 mr-2" />
                  {course.status === 'Completed' ? 'Review Course' : 'Continue'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title={`No ${activeFilter.toLowerCase()} courses`}
          description={activeFilter === 'All' ? 'You haven\'t enrolled in any courses yet.' : `You don't have any ${activeFilter.toLowerCase()} courses.`}
          action={<Button onClick={() => navigate('courses')}>Browse Courses</Button>}
        />
      )}
    </div>
  )
}

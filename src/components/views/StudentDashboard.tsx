'use client'

import { motion } from 'framer-motion'
import { BookOpen, Award, Clock, Star, TrendingUp, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAppStore } from '@/lib/store'
import { StatsCard } from '@/components/shared/StatsCard'
import { CourseCard } from '@/components/shared/CourseCard'
import { mockCourses } from '@/lib/api'

const recentActivity = [
  { action: 'Completed lesson: "CSS Grid Layout"', course: 'Complete Web Development', time: '2 hours ago', type: 'complete' },
  { action: 'Started quiz: "JavaScript Fundamentals"', course: 'Complete Web Development', time: '5 hours ago', type: 'start' },
  { action: 'Enrolled in "Machine Learning with Python"', course: 'Machine Learning with Python', time: '1 day ago', type: 'enroll' },
  { action: 'Earned certificate: "UI/UX Design Basics"', course: 'UI/UX Design Fundamentals', time: '2 days ago', type: 'cert' },
  { action: 'Completed lesson: "React Component Architecture"', course: 'React & Next.js Masterclass', time: '3 days ago', type: 'complete' },
]

export default function StudentDashboard() {
  const { currentUser, navigate } = useAppStore()

  const enrolledCourses = mockCourses.filter(c => ['c1', 'c2', 'c4'].includes(c.id))
  const continueLearning = enrolledCourses.slice(0, 3).map((c, i) => ({
    ...c,
    progress: [65, 35, 12][i],
    lastLesson: ['CSS Grid Layout', 'React Component Architecture', 'NumPy and Pandas Crash Course'][i],
  }))

  const recommendedCourses = mockCourses.filter(c => !['c1', 'c2', 'c4'].includes(c.id)).slice(0, 4)

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-emerald rounded-2xl p-6 md:p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent)]" />
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Welcome back, {currentUser?.name?.split(' ')[0] || 'Student'}! 👋
            </h1>
            <p className="text-white/80 mt-1">Continue your learning journey where you left off.</p>
          </div>
          <Button
            onClick={() => navigate('courses')}
            className="bg-white text-emerald-700 hover:bg-white/90"
          >
            Browse Courses
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Enrolled Courses" value={3} icon={BookOpen} trend={{ value: 1, label: 'this month' }} />
        <StatsCard title="Completed" value={1} icon={Award} trend={{ value: 50, label: 'completion rate' }} />
        <StatsCard title="Certificates" value={1} icon={Award} />
        <StatsCard title="Learning Points" value="1,250" icon={Star} trend={{ value: 15, label: 'this week' }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Learning */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Continue Learning</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('my-courses')}>
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {continueLearning.map((course) => (
                <Card key={course.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shrink-0">
                      <BookOpen className="h-6 w-6 text-white/70" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate">{course.title}</h3>
                      <p className="text-xs text-muted-foreground">Last: {course.lastLesson}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <Progress value={course.progress} className="h-2 flex-1" />
                        <span className="text-xs font-medium text-primary">{course.progress}%</span>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => navigate('course-player', { id: course.id })}>
                      Continue
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-0">
                <div className="divide-y">
                  {recentActivity.map((activity, i) => (
                    <div key={i} className="flex items-start gap-3 p-4">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 text-xs ${
                        activity.type === 'complete' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400' :
                        activity.type === 'cert' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {activity.type === 'complete' ? '✓' : activity.type === 'cert' ? '🏆' : activity.type === 'enroll' ? '📥' : '▶'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.course}</p>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Upcoming Live Classes</h2>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">15</p>
                    <p className="text-xs text-muted-foreground">Dec</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">React Advanced Patterns</p>
                    <p className="text-xs text-muted-foreground">2:00 PM EST</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <p className="text-lg font-bold">18</p>
                    <p className="text-xs text-muted-foreground">Dec</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">ML Project Review</p>
                    <p className="text-xs text-muted-foreground">4:00 PM EST</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommended */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Recommended</h2>
            <div className="space-y-3">
              {recommendedCourses.slice(0, 3).map((course) => (
                <Card
                  key={course.id}
                  className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate('course-detail', { id: course.id })}
                >
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center shrink-0">
                      <BookOpen className="h-4 w-4 text-white/70" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{course.title}</p>
                      <p className="text-xs text-muted-foreground">{course.instructorName}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs shrink-0">${course.price}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

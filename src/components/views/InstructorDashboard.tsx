'use client'

import { useState } from 'react'
import { Plus, DollarSign, Users, Star, TrendingUp, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { useAppStore } from '@/lib/store'
import { StatsCard } from '@/components/shared/StatsCard'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from 'recharts'

const revenueData = [
  { month: 'Jul', revenue: 4200 },
  { month: 'Aug', revenue: 5800 },
  { month: 'Sep', revenue: 4900 },
  { month: 'Oct', revenue: 7200 },
  { month: 'Nov', revenue: 8100 },
  { month: 'Dec', revenue: 9400 },
]

const recentEnrollments = [
  { name: 'Alex Johnson', course: 'Complete Web Development', date: '2 hours ago', avatar: 'A' },
  { name: 'Maria Garcia', course: 'React & Next.js Masterclass', date: '5 hours ago', avatar: 'M' },
  { name: 'David Kim', course: 'Machine Learning with Python', date: '1 day ago', avatar: 'D' },
  { name: 'Lisa Wang', course: 'Complete Web Development', date: '2 days ago', avatar: 'L' },
  { name: 'Robert Brown', course: 'UI/UX Design Fundamentals', date: '3 days ago', avatar: 'R' },
]

const questions = [
  { student: 'Alex Johnson', question: 'How does CSS Grid differ from Flexbox?', course: 'Web Development', time: '1 hour ago' },
  { student: 'Maria Garcia', question: 'Can you explain React useEffect cleanup?', course: 'React Masterclass', time: '3 hours ago' },
]

export default function InstructorDashboard() {
  const { navigate, currentUser } = useAppStore()

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="gradient-emerald rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent)]" />
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Welcome back, {currentUser?.name || 'Instructor'}! 👨‍🏫
            </h1>
            <p className="text-white/80 mt-1">Here is an overview of your courses and performance.</p>
          </div>
          <Button onClick={() => navigate('instructor-courses')} className="bg-white text-emerald-700 hover:bg-white/90">
            <Plus className="h-4 w-4 mr-2" /> Create Course
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Courses" value={5} icon={Eye} color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400" />
        <StatsCard title="Total Students" value="1,247" icon={Users} color="bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400" trend={{ value: 12, label: 'this month' }} />
        <StatsCard title="Total Revenue" value="$12,450" icon={DollarSign} color="bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400" trend={{ value: 18, label: 'this month' }} />
        <StatsCard title="Avg Rating" value="4.8" icon={Star} color="bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-semibold text-lg">Revenue Overview</h2>
                  <p className="text-sm text-muted-foreground">Last 6 months</p>
                </div>
                <Badge variant="secondary">+18% from last month</Badge>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        fontSize: '12px',
                      }}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#059669" strokeWidth={2} dot={{ fill: '#059669' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Enrollments */}
        <div>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <h2 className="font-semibold text-lg mb-4">Recent Enrollments</h2>
              <div className="space-y-3">
                {recentEnrollments.map((e, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">{e.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{e.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{e.course}</p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{e.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Questions */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Student Questions</h2>
            <Badge variant="secondary">{questions.length} unanswered</Badge>
          </div>
          <div className="space-y-3">
            {questions.map((q, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">{q.student}: &ldquo;{q.question}&rdquo;</p>
                  <p className="text-xs text-muted-foreground">{q.course} • {q.time}</p>
                </div>
                <Button size="sm">Reply</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

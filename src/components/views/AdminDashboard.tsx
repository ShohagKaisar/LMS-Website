'use client'

import { DollarSign, Users, BookOpen, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAppStore } from '@/lib/store'
import { StatsCard } from '@/components/shared/StatsCard'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, AreaChart, Area,
} from 'recharts'

const userGrowthData = [
  { month: 'Jul', users: 5200 },
  { month: 'Aug', users: 6100 },
  { month: 'Sep', users: 7300 },
  { month: 'Oct', users: 8400 },
  { month: 'Nov', users: 9200 },
  { month: 'Dec', users: 10200 },
]

const revenueData = [
  { month: 'Jul', revenue: 32000 },
  { month: 'Aug', revenue: 38000 },
  { month: 'Sep', revenue: 42000 },
  { month: 'Oct', revenue: 48000 },
  { month: 'Nov', revenue: 55000 },
  { month: 'Dec', revenue: 62000 },
]

const coursePerformance = [
  { name: 'Web Dev Bootcamp', students: 15420, revenue: '$12,450', rating: 4.8 },
  { name: 'React Masterclass', students: 9870, revenue: '$8,200', rating: 4.9 },
  { name: 'ML with Python', students: 12300, revenue: '$9,800', rating: 4.8 },
  { name: 'UI/UX Design', students: 8230, revenue: '$5,600', rating: 4.7 },
  { name: 'iOS Development', students: 5400, revenue: '$4,200', rating: 4.6 },
]

const recentRegistrations = [
  { name: 'Alex Johnson', role: 'Student', date: '2 hours ago', avatar: 'A' },
  { name: 'Maria Garcia', role: 'Instructor', date: '5 hours ago', avatar: 'M' },
  { name: 'David Kim', role: 'Student', date: '1 day ago', avatar: 'D' },
  { name: 'Emily Davis', role: 'Student', date: '1 day ago', avatar: 'E' },
  { name: 'Tom Harris', role: 'Instructor', date: '2 days ago', avatar: 'T' },
]

export default function AdminDashboard() {
  const { currentUser } = useAppStore()

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent)]" />
        <div className="relative">
          <h1 className="text-2xl font-bold text-white">
            Admin Dashboard 🛡️
          </h1>
          <p className="text-white/80 mt-1">Platform overview and management.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Users" value="10,200" icon={Users} color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400" trend={{ value: 12, label: 'this month' }} />
        <StatsCard title="Total Courses" value="500" icon={BookOpen} color="bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400" trend={{ value: 8, label: 'this month' }} />
        <StatsCard title="Total Revenue" value="$62,000" icon={DollarSign} color="bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400" trend={{ value: 18, label: 'this month' }} />
        <StatsCard title="Active Enrollments" value="8,450" icon={TrendingUp} color="bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <h2 className="font-semibold text-lg mb-1">User Growth</h2>
            <p className="text-sm text-muted-foreground mb-4">New user registrations</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="users" stroke="#059669" fill="url(#colorUsers)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <h2 className="font-semibold text-lg mb-1">Revenue</h2>
            <p className="text-sm text-muted-foreground mb-4">Monthly revenue</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="revenue" fill="#059669" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Registrations */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <h2 className="font-semibold text-lg mb-4">Recent Registrations</h2>
            <div className="space-y-3">
              {recentRegistrations.map((r, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">{r.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.role}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{r.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Course Performance */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardContent className="p-6">
            <h2 className="font-semibold text-lg mb-4">Top Courses</h2>
            <div className="space-y-3">
              {coursePerformance.map((c, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                  <span className="text-sm font-bold text-muted-foreground w-5">#{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.students.toLocaleString()} students • {c.rating} ⭐</p>
                  </div>
                  <Badge variant="secondary">{c.revenue}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

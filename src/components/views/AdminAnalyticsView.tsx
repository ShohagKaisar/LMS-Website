'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table'
import {
  DollarSign, Users, Award, TrendingUp, Download, Calendar,
  BarChart3, PieChart as PieChartIcon
} from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 18500, enrollments: 245 },
  { month: 'Feb', revenue: 22300, enrollments: 312 },
  { month: 'Mar', revenue: 19800, enrollments: 278 },
  { month: 'Apr', revenue: 28400, enrollments: 389 },
  { month: 'May', revenue: 24600, enrollments: 342 },
  { month: 'Jun', revenue: 31200, enrollments: 418 },
]

const userGrowthData = [
  { month: 'Jan', students: 4200, instructors: 180 },
  { month: 'Feb', students: 4900, instructors: 205 },
  { month: 'Mar', students: 5600, instructors: 228 },
  { month: 'Apr', students: 6500, instructors: 256 },
  { month: 'May', students: 7200, instructors: 289 },
  { month: 'Jun', students: 8432, instructors: 320 },
]

const categoryData = [
  { name: 'Web Dev', value: 35, color: '#059669' },
  { name: 'Data Science', value: 25, color: '#7c3aed' },
  { name: 'Design', value: 15, color: '#ec4899' },
  { name: 'Mobile', value: 10, color: '#f59e0b' },
  { name: 'Cloud', value: 8, color: '#06b6d4' },
  { name: 'Other', value: 7, color: '#6b7280' },
]

const enrollmentData = [
  { month: 'Jan', free: 180, paid: 120 },
  { month: 'Feb', free: 210, paid: 145 },
  { month: 'Mar', free: 195, paid: 165 },
  { month: 'Apr', free: 250, paid: 198 },
  { month: 'May', free: 230, paid: 175 },
  { month: 'Jun', free: 280, paid: 220 },
]

const topCourses = [
  { name: 'Complete Web Development Bootcamp', instructor: 'Dr. Sarah Chen', enrollments: 15420, revenue: 89450, rating: 4.8 },
  { name: 'Machine Learning with Python', instructor: 'Michael Park', enrollments: 12300, revenue: 67200, rating: 4.8 },
  { name: 'React & Next.js Masterclass', instructor: 'James Wilson', enrollments: 9870, revenue: 54300, rating: 4.9 },
  { name: 'UI/UX Design Fundamentals', instructor: 'Emily Rodriguez', enrollments: 8230, revenue: 38900, rating: 4.7 },
  { name: 'Python for Data Analysis', instructor: 'Michael Park', enrollments: 7800, revenue: 31200, rating: 4.7 },
]

const completionData = [
  { month: 'Jan', completed: 89, rate: 68 },
  { month: 'Feb', completed: 112, rate: 71 },
  { month: 'Mar', completed: 98, rate: 66 },
  { month: 'Apr', completed: 145, rate: 74 },
  { month: 'May', completed: 128, rate: 72 },
  { month: 'Jun', completed: 167, rate: 78 },
]

export function AdminAnalyticsView() {
  const [dateRange, setDateRange] = useState('30days')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Analytics & Reports</h1>
          <p className="text-sm text-muted-foreground">Track platform performance and growth metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Revenue', value: '$127,450', change: '+12.5%', icon: DollarSign, color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400' },
          { title: 'Active Users', value: '8,432', change: '+8.2%', icon: Users, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' },
          { title: 'Completions', value: '2,847', change: '+15.3%', icon: Award, color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400' },
          { title: 'Avg. Rating', value: '4.6', change: '+0.2', icon: TrendingUp, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400' },
        ].map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">{stat.change} from last period</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5" /> Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Line type="monotone" dataKey="revenue" stroke="#059669" strokeWidth={3} dot={{ fill: '#059669', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                <Legend />
                <Area type="monotone" dataKey="students" stackId="1" stroke="#059669" fill="#059669" fillOpacity={0.2} name="Students" />
                <Area type="monotone" dataKey="instructors" stackId="2" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.2} name="Instructors" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><PieChartIcon className="h-5 w-5" /> Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5" /> Monthly Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                <Legend />
                <Bar dataKey="free" fill="#10b981" radius={[4, 4, 0, 0]} name="Free Courses" />
                <Bar dataKey="paid" fill="#059669" radius={[4, 4, 0, 0]} name="Paid Courses" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Completion Rate + Top Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5" /> Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={completionData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                <Legend />
                <Bar dataKey="completed" fill="#059669" radius={[4, 4, 0, 0]} name="Completions" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" /> Top Performing Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead className="text-right">Students</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCourses.map((course) => (
                  <TableRow key={course.name}>
                    <TableCell className="font-medium max-w-[200px] truncate">{course.name}</TableCell>
                    <TableCell className="text-right">{course.enrollments.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${course.revenue.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                        {course.rating}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminAnalyticsView

'use client'

import { useState } from 'react'
import { Search, Download, MoreHorizontal, CheckCircle, XCircle, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const statuses = ['All', 'Published', 'Draft', 'Archived']

const courses = [
  { id: 'c1', title: 'Complete Web Development Bootcamp', instructor: 'Dr. Sarah Chen', category: 'Web Development', price: 89.99, students: 15420, status: 'Published' },
  { id: 'c2', title: 'React & Next.js Masterclass', instructor: 'James Wilson', category: 'Web Development', price: 129.99, students: 9870, status: 'Published' },
  { id: 'c3', title: 'UI/UX Design Fundamentals', instructor: 'Emily Rodriguez', category: 'Design', price: 79.99, students: 8230, status: 'Published' },
  { id: 'c4', title: 'Machine Learning with Python', instructor: 'Michael Park', category: 'Data Science', price: 109.99, students: 12300, status: 'Published' },
  { id: 'c5', title: 'iOS App Development with Swift', instructor: 'Dr. Sarah Chen', category: 'Mobile Dev', price: 94.99, students: 5400, status: 'Published' },
  { id: 'c6', title: 'Digital Marketing Strategy', instructor: 'Emily Rodriguez', category: 'Marketing', price: 69.99, students: 4200, status: 'Published' },
  { id: 'c7', title: 'Python for Data Analysis', instructor: 'Michael Park', category: 'Data Science', price: 84.99, students: 7800, status: 'Published' },
  { id: 'c8', title: 'Advanced CSS & Animations', instructor: 'James Wilson', category: 'Web Development', price: 74.99, students: 3100, status: 'Draft' },
  { id: 'c9', title: 'Cloud Computing with AWS', instructor: 'Michael Park', category: 'Cloud', price: 119.99, students: 6500, status: 'Published' },
  { id: 'c10', title: 'Blockchain Development', instructor: 'James Wilson', category: 'Blockchain', price: 139.99, students: 2100, status: 'Draft' },
  { id: 'c11', title: 'Product Management Essentials', instructor: 'Emily Rodriguez', category: 'Business', price: 89.99, students: 3200, status: 'Published' },
  { id: 'c12', title: 'Cybersecurity Fundamentals', instructor: 'Dr. Sarah Chen', category: 'Security', price: 99.99, students: 4500, status: 'Archived' },
]

export default function AdminCoursesView() {
  const [search, setSearch] = useState('')
  const [activeStatus, setActiveStatus] = useState('All')

  const filtered = courses.filter(c => {
    const matchStatus = activeStatus === 'All' || c.status === activeStatus
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.instructor.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const statusColors: Record<string, string> = {
    Published: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    Draft: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    Archived: 'bg-muted text-muted-foreground',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Courses</h1>
          <p className="text-muted-foreground">{courses.length} total courses</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search courses..." className="pl-9 w-64" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export</Button>
        </div>
      </div>

      <div className="flex gap-2">
        {statuses.map((status) => (
          <Button key={status} variant={activeStatus === status ? 'default' : 'outline'} size="sm" onClick={() => setActiveStatus(status)}>
            {status}
            <Badge variant="secondary" className="ml-2 text-xs bg-primary-foreground/20">
              {status === 'All' ? courses.length : courses.filter(c => c.status === status).length}
            </Badge>
          </Button>
        ))}
      </div>

      <Card className="border-0 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead className="hidden sm:table-cell">Instructor</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="hidden lg:table-cell">Price</TableHead>
                  <TableHead className="hidden md:table-cell">Students</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <p className="font-medium text-sm max-w-[200px] truncate">{course.title}</p>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{course.instructor}</TableCell>
                    <TableCell className="hidden md:table-cell"><Badge variant="secondary" className="text-xs">{course.category}</Badge></TableCell>
                    <TableCell className="hidden lg:table-cell text-sm font-medium">${course.price}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm">{course.students.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[course.status]}>{course.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Eye className="h-4 w-4 mr-2" /> View Details</DropdownMenuItem>
                          {course.status === 'Draft' && (
                            <DropdownMenuItem><CheckCircle className="h-4 w-4 mr-2 text-emerald-600" /> Approve</DropdownMenuItem>
                          )}
                          {course.status === 'Published' && (
                            <DropdownMenuItem><XCircle className="h-4 w-4 mr-2 text-amber-600" /> Unpublish</DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-destructive">Archive</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

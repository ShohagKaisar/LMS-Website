'use client'

import { useState } from 'react'
import { Search, Download, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const students = [
  { id: '1', name: 'Alex Johnson', email: 'alex@example.com', courses: 3, progress: 65, lastActive: '2 hours ago', avatar: 'A' },
  { id: '2', name: 'Maria Garcia', email: 'maria@example.com', courses: 2, progress: 82, lastActive: '5 hours ago', avatar: 'M' },
  { id: '3', name: 'David Kim', email: 'david@example.com', courses: 4, progress: 45, lastActive: '1 day ago', avatar: 'D' },
  { id: '4', name: 'Lisa Wang', email: 'lisa@example.com', courses: 1, progress: 100, lastActive: '2 days ago', avatar: 'L' },
  { id: '5', name: 'Robert Brown', email: 'robert@example.com', courses: 2, progress: 28, lastActive: '3 days ago', avatar: 'R' },
  { id: '6', name: 'Amy Chen', email: 'amy@example.com', courses: 3, progress: 71, lastActive: '1 day ago', avatar: 'A' },
  { id: '7', name: 'Tom Harris', email: 'tom@example.com', courses: 1, progress: 55, lastActive: '4 days ago', avatar: 'T' },
  { id: '8', name: 'Sarah Lee', email: 'sarah@example.com', courses: 5, progress: 90, lastActive: '6 hours ago', avatar: 'S' },
]

export default function InstructorStudentsView() {
  const [search, setSearch] = useState('')

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Students</h1>
          <p className="text-muted-foreground">{students.length} total students</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search students..." className="pl-9 w-64" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export</Button>
        </div>
      </div>

      <Card className="border-0 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead className="hidden sm:table-cell">Enrolled Courses</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="hidden md:table-cell">Last Active</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">{student.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="secondary">{student.courses} courses</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={student.progress} className="h-2 w-16" />
                      <span className="text-xs font-medium">{student.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {student.lastActive}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                        <DropdownMenuItem>View Progress</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

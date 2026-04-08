'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Eye, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAppStore } from '@/lib/store'
import { EmptyState } from '@/components/shared/EmptyState'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'

const myCourses = [
  { id: 'c1', title: 'Complete Web Development Bootcamp', students: 15420, revenue: 12450, rating: 4.8, status: 'Published', progress: 100 },
  { id: 'c2', title: 'React & Next.js Masterclass', students: 9870, revenue: 8200, rating: 4.9, status: 'Published', progress: 100 },
  { id: 'c5', title: 'iOS App Development with Swift', students: 5400, revenue: 3200, rating: 4.6, status: 'Draft', progress: 75 },
  { id: 'c8', title: 'Advanced CSS & Animations', students: 3100, revenue: 1800, rating: 4.6, status: 'Published', progress: 100 },
  { id: 'c10', title: 'Blockchain Development', students: 2100, revenue: 950, rating: 4.5, status: 'Draft', progress: 40 },
]

export default function InstructorCoursesView() {
  const { navigate } = useAppStore()
  const [createOpen, setCreateOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [createStep, setCreateStep] = useState(0)

  const statusColors: Record<string, string> = {
    Published: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    Draft: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    Archived: 'bg-muted text-muted-foreground',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Courses</h1>
          <p className="text-muted-foreground">{myCourses.length} courses</p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" /> Create Course</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
            </DialogHeader>
            <Tabs value={`step-${createStep}`} onValueChange={(v) => setCreateStep(parseInt(v.split('-')[1]))}>
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="step-0">Basic Info</TabsTrigger>
                <TabsTrigger value="step-1">Curriculum</TabsTrigger>
                <TabsTrigger value="step-2">Pricing</TabsTrigger>
                <TabsTrigger value="step-3">Publish</TabsTrigger>
              </TabsList>
              <TabsContent value="step-0" className="space-y-4">
                <div>
                  <Label>Course Title</Label>
                  <Input placeholder="Enter course title" className="mt-1.5" />
                </div>
                <div>
                  <Label>Short Description</Label>
                  <Textarea placeholder="Brief description" rows={2} className="mt-1.5" />
                </div>
                <div>
                  <Label>Full Description</Label>
                  <Textarea placeholder="Detailed description" rows={4} className="mt-1.5" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Category</Label>
                    <Select><SelectTrigger className="mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="web">Web Development</SelectItem><SelectItem value="data">Data Science</SelectItem></SelectContent></Select>
                  </div>
                  <div>
                    <Label>Level</Label>
                    <Select><SelectTrigger className="mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="beginner">Beginner</SelectItem><SelectItem value="intermediate">Intermediate</SelectItem><SelectItem value="advanced">Advanced</SelectItem></SelectContent></Select>
                  </div>
                </div>
                <div className="flex justify-end"><Button onClick={() => setCreateStep(1)}>Next</Button></div>
              </TabsContent>
              <TabsContent value="step-1" className="space-y-4">
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-40" />
                  <p>Curriculum builder coming soon</p>
                  <p className="text-sm">Add sections and lessons</p>
                </div>
                <div className="flex justify-between"><Button variant="outline" onClick={() => setCreateStep(0)}>Back</Button><Button onClick={() => setCreateStep(2)}>Next</Button></div>
              </TabsContent>
              <TabsContent value="step-2" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Price ($)</Label><Input type="number" placeholder="49.99" className="mt-1.5" /></div>
                  <div><Label>Sale Price ($)</Label><Input type="number" placeholder="19.99" className="mt-1.5" /></div>
                </div>
                <div className="flex justify-between"><Button variant="outline" onClick={() => setCreateStep(1)}>Back</Button><Button onClick={() => setCreateStep(3)}>Next</Button></div>
              </TabsContent>
              <TabsContent value="step-3" className="space-y-4">
                <div className="text-center py-8">
                  <h3 className="text-lg font-semibold mb-2">Ready to Publish?</h3>
                  <p className="text-muted-foreground text-sm">Review your course details before publishing.</p>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCreateStep(2)}>Back</Button>
                  <div className="flex gap-2">
                    <Button variant="outline">Save as Draft</Button>
                    <Button onClick={() => setCreateOpen(false)}>Publish Course</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {myCourses.map((course) => (
          <Card key={course.id} className="border-0 shadow-md">
            <div className="h-32 gradient-emerald flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-white/60" />
            </div>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Badge className={statusColors[course.status]}>{course.status}</Badge>
              </div>
              <h3 className="font-semibold text-sm">{course.title}</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div><p className="text-sm font-bold">{course.students.toLocaleString()}</p><p className="text-xs text-muted-foreground">Students</p></div>
                <div><p className="text-sm font-bold">${course.revenue.toLocaleString()}</p><p className="text-xs text-muted-foreground">Revenue</p></div>
                <div><p className="text-sm font-bold">{course.rating}</p><p className="text-xs text-muted-foreground">Rating</p></div>
              </div>
              {course.status === 'Draft' && (
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-1.5" />
                </div>
              )}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-3 w-3 mr-1" /> Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigate('course-detail', { id: course.id })}>
                  <Eye className="h-3 w-3" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setDeleteId(course.id)}>
                  <Trash2 className="h-3 w-3 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        title="Delete Course"
        description="Are you sure you want to delete this course? This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
        onConfirm={() => setDeleteId(null)}
      />
    </div>
  )
}

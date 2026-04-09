'use client'

import { Download, Share2, ExternalLink, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAppStore } from '@/lib/store'
import { EmptyState } from '@/components/shared/EmptyState'

const mockCertificates = [
  {
    id: 'cert1',
    courseName: 'UI/UX Design Fundamentals',
    date: '2025-11-20',
    instructorName: 'Emily Rodriguez',
    grade: 'A',
  },
  {
    id: 'cert2',
    courseName: 'Python for Data Analysis',
    date: '2025-10-15',
    instructorName: 'Michael Park',
    grade: 'A+',
  },
]

export default function CertificatesView() {
  const { navigate } = useAppStore()

  if (mockCertificates.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Certificates</h1>
        <EmptyState
          icon={<Award className="h-16 w-16" />}
          title="No certificates yet"
          description="Complete a course to earn your first certificate."
          action={<Button onClick={() => navigate('courses')}>Browse Courses</Button>}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Certificates</h1>
        <p className="text-muted-foreground">{mockCertificates.length} certificates earned</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockCertificates.map((cert) => (
          <Card key={cert.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
            <div className="gradient-emerald p-6">
              <div className="flex items-center justify-between">
                <Award className="h-10 w-10 text-white/60" />
                <Badge className="bg-white/20 text-white border-white/30">Grade: {cert.grade}</Badge>
              </div>
              <h3 className="text-xl font-bold text-white mt-4">{cert.courseName}</h3>
              <p className="text-white/70 text-sm mt-1">Issued by LearnHub</p>
            </div>
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Instructor</span>
                <span className="font-medium">{cert.instructorName}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Issued Date</span>
                <span className="font-medium">{cert.date}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Certificate ID</span>
                <span className="font-mono text-xs">{cert.id.toUpperCase()}</span>
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">
                  <Download className="h-4 w-4 mr-2" /> Download
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" /> Share
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" /> Verify
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

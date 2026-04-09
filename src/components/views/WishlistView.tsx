'use client'

import { useState } from 'react'
import { Heart, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAppStore } from '@/lib/store'
import { CourseCard } from '@/components/shared/CourseCard'
import { EmptyState } from '@/components/shared/EmptyState'
import { mockCourses } from '@/lib/api'

export default function WishlistView() {
  const { navigate, addToCart } = useAppStore()
  const [items, setItems] = useState(mockCourses.slice(0, 3))

  const handleRemove = (id: string) => {
    setItems(prev => prev.filter(c => c.id !== id))
  }

  if (items.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Wishlist</h1>
        <EmptyState
          icon={<Heart className="h-16 w-16" />}
          title="Your wishlist is empty"
          description="Save courses you are interested in to your wishlist."
          action={<Button onClick={() => navigate('courses')}>Browse Courses</Button>}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Wishlist</h1>
        <p className="text-muted-foreground">{items.length} courses saved</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((course) => (
          <Card key={course.id} className="overflow-hidden border-0 shadow-md">
            <div className="h-36 bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center">
              <Heart className="h-10 w-10 text-white/60" />
            </div>
            <CardContent className="p-4 space-y-3">
              <h3 className="font-semibold text-sm line-clamp-2">{course.title}</h3>
              <p className="text-xs text-muted-foreground">{course.instructorName}</p>
              <div className="flex items-center gap-2">
                {course.originalPrice && (
                  <Badge variant="secondary" className="text-xs text-muted-foreground line-through">${course.originalPrice}</Badge>
                )}
                <Badge variant="secondary" className="text-xs">${course.price}</Badge>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    addToCart(course.id)
                    navigate('checkout')
                  }}
                >
                  Enroll Now
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemove(course.id)}
                  className="h-9 w-9"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

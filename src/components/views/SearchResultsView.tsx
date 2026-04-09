'use client'

import { useEffect, useState } from 'react'
import { useAppStore } from '@/lib/store'
import { fetchCourses, type Course } from '@/lib/api'
import { CourseCard } from '@/components/shared/CourseCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, SlidersHorizontal, X, BookOpen } from 'lucide-react'

export function SearchResultsView() {
  const { searchQuery, setSearchQuery, navigate } = useAppStore()
  const [results, setResults] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('popular')

  useEffect(() => {
    let cancelled = false
    fetchCourses({ search: searchQuery, sortBy, limit: 20 }).then(({ courses }) => {
      if (!cancelled) {
        setResults(courses)
        setLoading(false)
      }
    }).catch(() => {
      if (!cancelled) setLoading(false)
    })
    return () => { cancelled = true }
  }, [searchQuery, sortBy])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && navigate('search-results')}
            />
            {searchQuery && (
              <button onClick={() => { setSearchQuery(''); navigate('courses') }}
                className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-44"><SelectValue placeholder="Sort by" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {searchQuery ? (
                <>Results for &ldquo;<span className="text-emerald-600 dark:text-emerald-400">{searchQuery}</span>&rdquo;</>
              ) : 'All Courses'}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {results.length} {results.length === 1 ? 'course' : 'courses'} found
            </p>
          </div>
          <Button variant="outline" size="sm" className="lg:hidden">
            <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
          </Button>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-44 bg-muted rounded-t-xl" />
              <div className="p-4 space-y-3 bg-card rounded-b-xl">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="h-3 bg-muted rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">No courses found</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            We couldn&apos;t find any courses matching your search. Try different keywords or browse all courses.
          </p>
          <Button onClick={() => navigate('courses')} className="bg-emerald-600 hover:bg-emerald-700">
            Browse All Courses
          </Button>
        </div>
      )}
    </div>
  )
}

export default SearchResultsView

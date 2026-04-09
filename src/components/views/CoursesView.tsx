'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useAppStore } from '@/lib/store'
import { CourseCard } from '@/components/shared/CourseCard'
import { PageHeader } from '@/components/shared/PageHeader'
import { EmptyState } from '@/components/shared/EmptyState'
import { fetchCourses, mockCourses } from '@/lib/api'
import type { Course } from '@/lib/api'

const categories = ['Web Development', 'Data Science', 'Design', 'Mobile Development', 'Marketing', 'Cloud Computing', 'Blockchain', 'Cybersecurity', 'Business']
const levels = ['Beginner', 'Intermediate', 'Advanced']

function FilterSidebarContent({
  categoryFilter, levelFilter, priceRange, minRating,
  toggleCategory, toggleLevel, setPriceRange, setMinRating,
}: {
  categoryFilter: string[]; levelFilter: string[]; priceRange: number[]; minRating: number;
  toggleCategory: (c: string) => void; toggleLevel: (l: string) => void;
  setPriceRange: (v: number[]) => void; setMinRating: (r: number) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <Checkbox checked={categoryFilter.includes(cat)} onCheckedChange={() => toggleCategory(cat)} />
              <span className="text-sm">{cat}</span>
            </label>
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="font-semibold mb-3">Level</h3>
        <div className="space-y-2">
          {levels.map((lvl) => (
            <label key={lvl} className="flex items-center gap-2 cursor-pointer">
              <Checkbox checked={levelFilter.includes(lvl)} onCheckedChange={() => toggleLevel(lvl)} />
              <span className="text-sm">{lvl}</span>
            </label>
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <Slider min={0} max={200} step={10} value={priceRange} onValueChange={setPriceRange} className="mt-4" />
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="font-semibold mb-3">Rating</h3>
        <div className="flex gap-1">
          {[0, 4, 4.5].map((r) => (
            <Button key={r} variant={minRating === r ? 'default' : 'outline'} size="sm" onClick={() => setMinRating(r)} className="text-xs">
              {r === 0 ? 'All' : `${r}+`}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function CoursesView() {
  const navigate = useAppStore((s) => s.navigate)
  const searchQuery = useAppStore((s) => s.searchQuery)

  const [courses, setCourses] = useState<Course[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [page, setPage] = useState(1)

  const [categoryFilter, setCategoryFilter] = useState<string[]>([])
  const [levelFilter, setLevelFilter] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<number[]>([0, 200])
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState('popular')
  const [search, setSearch] = useState(searchQuery || '')

  useEffect(() => {
    fetchCourses({
      category: categoryFilter[0] || undefined,
      level: levelFilter[0] || undefined,
      search: search || undefined,
      sortBy,
      page,
      limit: 9,
    })
      .then((data) => {
        setCourses(data.courses)
        setTotal(data.total)
        setLoading(false)
      })
      .catch(() => {
        setCourses(mockCourses)
        setTotal(mockCourses.length)
        setLoading(false)
      })
  }, [categoryFilter, levelFilter, search, sortBy, page])

  const totalPages = Math.ceil(total / 9)

  const toggleCategory = (cat: string) => {
    setCategoryFilter((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat])
    setPage(1)
  }

  const toggleLevel = (lvl: string) => {
    setLevelFilter((prev) => prev.includes(lvl) ? prev.filter((l) => l !== lvl) : [...prev, lvl])
    setPage(1)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader
        title="Explore Courses"
        description={`Discover ${total}+ courses across various categories`}
      />

      {/* Search & Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            className="pl-9"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="lg:hidden"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Select value={sortBy} onValueChange={(v) => { setSortBy(v); setPage(1) }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters */}
      {(categoryFilter.length > 0 || levelFilter.length > 0) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {categoryFilter.map((cat) => (
            <Badge key={cat} variant="secondary" className="gap-1 cursor-pointer" onClick={() => toggleCategory(cat)}>
              {cat} <X className="h-3 w-3" />
            </Badge>
          ))}
          {levelFilter.map((lvl) => (
            <Badge key={lvl} variant="secondary" className="gap-1 cursor-pointer" onClick={() => toggleLevel(lvl)}>
              {lvl} <X className="h-3 w-3" />
            </Badge>
          ))}
          <Button variant="ghost" size="sm" className="text-xs h-6" onClick={() => { setCategoryFilter([]); setLevelFilter([]) }}>
            Clear all
          </Button>
        </div>
      )}

      <div className="flex gap-8">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <FilterSidebarContent
            categoryFilter={categoryFilter} levelFilter={levelFilter} priceRange={priceRange} minRating={minRating}
            toggleCategory={toggleCategory} toggleLevel={toggleLevel} setPriceRange={setPriceRange} setMinRating={setMinRating}
          />
        </aside>

        {/* Mobile Filter Sidebar */}
        {filtersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setFiltersOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-background p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-lg">Filters</h2>
                <Button variant="ghost" size="icon" onClick={() => setFiltersOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <FilterSidebarContent
                categoryFilter={categoryFilter} levelFilter={levelFilter} priceRange={priceRange} minRating={minRating}
                toggleCategory={toggleCategory} toggleLevel={toggleLevel} setPriceRange={setPriceRange} setMinRating={setMinRating}
              />
            </div>
          </div>
        )}

        {/* Course Grid */}
        <div className="flex-1 min-w-0">
          {courses.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  <Button variant="outline" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Button
                      key={p}
                      variant={page === p ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPage(p)}
                      className="w-9"
                    >
                      {p}
                    </Button>
                  ))}
                  <Button variant="outline" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
                    Next
                  </Button>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              icon={<Search className="h-16 w-16" />}
              title="No courses found"
              description="Try adjusting your filters or search query to find what you're looking for."
              action={
                <Button onClick={() => { setSearch(''); setCategoryFilter([]); setLevelFilter([]) }}>
                  Clear Filters
                </Button>
              }
            />
          )}
        </div>
      </div>
    </div>
  )
}

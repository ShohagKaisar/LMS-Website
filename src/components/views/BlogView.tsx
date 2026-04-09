'use client'

import { useEffect, useState } from 'react'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { useAppStore } from '@/lib/store'
import { fetchBlogPosts } from '@/lib/api'
import type { BlogPost } from '@/lib/api'

const categories = ['All', 'Web Development', 'React', 'Design', 'Data Science', 'TypeScript', 'Learning']

export default function BlogView() {
  const navigate = useAppStore((s) => s.navigate)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchBlogPosts(activeCategory === 'All' ? undefined : activeCategory).then(setPosts)
  }, [activeCategory])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <Badge variant="secondary" className="mb-3">Blog</Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Latest Articles</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Insights, tutorials, and updates from our team of experts.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Input
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <Card
            key={post.id}
            className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => navigate('blog-post', { slug: post.slug })}
          >
            <div className="h-48 gradient-emerald flex items-center justify-center">
              <span className="text-5xl opacity-40">📝</span>
            </div>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {post.readTime}
                </span>
              </div>
              <h2 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {post.authorName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs font-medium">{post.authorName}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {post.date}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

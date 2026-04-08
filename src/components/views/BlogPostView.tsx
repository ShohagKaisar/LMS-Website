'use client'

import { useEffect, useState } from 'react'
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { useAppStore } from '@/lib/store'
import { StarRating } from '@/components/shared/StarRating'
import { Card } from '@/components/ui/card'
import { fetchBlogPost, mockBlogPosts } from '@/lib/api'
import type { BlogPost } from '@/lib/api'

export default function BlogPostView() {
  const { viewParams, navigate, goBack } = useAppStore()
  const [post, setPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    const slug = viewParams?.slug
    if (!slug) return
    fetchBlogPost(slug).then(setPost).catch(() => {
      setPost(mockBlogPosts.find(p => p.slug === slug) || null)
    })
  }, [viewParams?.slug])

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Button variant="ghost" onClick={goBack} className="mb-4"><ArrowLeft className="h-4 w-4 mr-2" />Back</Button>
        <p>Post not found</p>
      </div>
    )
  }

  const relatedPosts = mockBlogPosts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Button variant="ghost" onClick={goBack} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />Back to Blog
      </Button>

      <article>
        <div className="mb-6">
          <Badge variant="secondary" className="mb-3">{post.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">{post.authorName.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-foreground">{post.authorName}</span>
            </div>
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {post.date}</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {post.readTime}</span>
          </div>
        </div>

        <div className="h-64 md:h-96 gradient-emerald rounded-2xl flex items-center justify-center mb-8">
          <span className="text-7xl opacity-40">📝</span>
        </div>

        <div className="flex gap-2 mb-6">
          {post.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
          ))}
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">{post.excerpt}</p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The world of technology is constantly evolving, and staying up-to-date with the latest trends is crucial for any developer or tech enthusiast. In this comprehensive guide, we explore the key developments that are shaping the industry and how you can leverage them in your career.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Key Takeaways</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Understanding these trends will help you make informed decisions about your learning path and career direction. Whether you are a beginner or an experienced professional, there is always something new to discover.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The most important thing is to maintain a growth mindset and be open to continuous learning. Technology moves fast, and those who adapt quickly will thrive.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
          <p className="text-muted-foreground leading-relaxed">
            As we look ahead, the possibilities are endless. By investing in your education and staying curious, you can unlock your full potential and build a rewarding career in technology.
          </p>
        </div>

        <div className="flex gap-2 mt-8 pt-6 border-t">
          <Button variant="outline" size="sm"><Share2 className="h-4 w-4 mr-2" />Share</Button>
          <Button variant="outline" size="sm"><Bookmark className="h-4 w-4 mr-2" />Save</Button>
        </div>
      </article>

      {/* Related */}
      {relatedPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map(rp => (
              <Card
                key={rp.id}
                className="overflow-hidden border-0 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate('blog-post', { slug: rp.slug })}
              >
                <div className="h-32 gradient-emerald flex items-center justify-center">
                  <span className="text-3xl opacity-40">📝</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{rp.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{rp.excerpt}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

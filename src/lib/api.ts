import { db } from '@/lib/db'

// ============ Types ============

export interface Course {
  id: string
  title: string
  slug: string
  description: string
  shortDescription: string
  thumbnail: string
  instructorId: string
  instructorName: string
  instructorAvatar: string
  category: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  price: number
  originalPrice?: number
  currency: string
  rating: number
  reviewCount: number
  studentCount: number
  duration: string
  lessonsCount: number
  articlesCount: number
  downloadableResources: number
  language: string
  lastUpdated: string
  featured: boolean
  bestseller: boolean
  tags: string[]
  whatYouLearn: string[]
  requirements: string[]
  curriculum: CurriculumSection[]
  reviews: Review[]
}

export interface CurriculumSection {
  id: string
  title: string
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  type: 'video' | 'text' | 'quiz'
  duration: string
  isPreview: boolean
  isFree: boolean
}

export interface Review {
  id: string
  userId: string
  userName: string
  userAvatar: string
  rating: number
  comment: string
  date: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  thumbnail: string
  authorName: string
  authorAvatar: string
  category: string
  date: string
  readTime: string
  tags: string[]
}

export interface User {
  id: string
  name: string
  email: string
  role: 'student' | 'instructor' | 'admin'
  avatar: string
  bio: string
  joinedDate: string
  enrolledCourses: string[]
  completedCourses: string[]
  certificates: Certificate[]
  points: number
}

export interface Certificate {
  id: string
  courseId: string
  courseName: string
  date: string
  instructorName: string
}

// ============ API Response Mappers ============

// Map API raw course data to client Course type
function mapCourseFromAPI(raw: any): Course {
  // Capitalize level: BEGINNER -> Beginner
  const levelMap: Record<string, 'Beginner' | 'Intermediate' | 'Advanced'> = {
    BEGINNER: 'Beginner',
    INTERMEDIATE: 'Intermediate',
    ADVANCED: 'Advanced',
  }
  const level = levelMap[raw.level] || 'Beginner'

  // Format duration (stored as total minutes)
  let durationStr = ''
  if (raw.totalDuration || raw.duration) {
    const mins = raw.totalDuration || raw.duration
    if (mins >= 60) {
      const h = Math.floor(mins / 60)
      const m = mins % 60
      durationStr = m > 0 ? `${h}h ${m}m` : `${h} hours`
    } else {
      durationStr = `${mins} min`
    }
  }

  // Extract fields from nested API structure
  const instructor = raw.instructor || {}
  const category = raw.category || {}
  const count = raw._count || {}

  return {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    description: raw.description,
    shortDescription: raw.shortDesc || raw.shortDescription || '',
    thumbnail: raw.thumbnail || '',
    instructorId: raw.instructorId || instructor.id || '',
    instructorName: instructor.name || raw.instructorName || '',
    instructorAvatar: instructor.image || raw.instructorAvatar || '',
    category: category.name || raw.category || '',
    level,
    price: raw.discountPrice ?? raw.price ?? 0,
    originalPrice: raw.price && raw.discountPrice ? raw.price : undefined,
    currency: 'USD',
    rating: raw.avgRating ?? raw.rating ?? 0,
    reviewCount: count.reviews ?? raw.reviewCount ?? 0,
    studentCount: count.enrollments ?? raw.studentCount ?? 0,
    duration: durationStr,
    lessonsCount: count.lessons ?? raw.lessonsCount ?? 0,
    articlesCount: 0,
    downloadableResources: 0,
    language: raw.language || 'English',
    lastUpdated: raw.updatedAt
      ? new Date(raw.updatedAt).toISOString().split('T')[0]
      : raw.lastUpdated || '',
    featured: raw.isFeatured ?? raw.featured ?? false,
    bestseller: (count.enrollments ?? 0) >= 2,
    tags: [],
    whatYouLearn: [],
    requirements: [],
    curriculum: [],  // populated separately for detail view
    reviews: [],
  }
}

// Map API detailed course (includes sections/lessons/reviews) to client Course type
function mapCourseDetailFromAPI(raw: any): Course {
  const base = mapCourseFromAPI(raw)

  // Map sections with lessons to curriculum
  if (raw.sections && Array.isArray(raw.sections)) {
    base.curriculum = raw.sections.map((section: any) => ({
      id: section.id,
      title: section.title,
      lessons: (section.lessons || []).map((lesson: any) => ({
        id: lesson.id,
        title: lesson.title,
        type: (lesson.type || 'VIDEO').toLowerCase() as 'video' | 'text' | 'quiz',
        duration: lesson.duration > 0 ? `${lesson.duration} min` : '',
        isPreview: lesson.isPreview ?? false,
        isFree: lesson.isFree ?? false,
      })),
    }))
  }

  // Map reviews
  if (raw.reviews && Array.isArray(raw.reviews)) {
    base.reviews = raw.reviews.map((r: any) => ({
      id: r.id,
      userId: r.userId || r.user?.id || '',
      userName: r.user?.name || r.userName || '',
      userAvatar: r.user?.image || r.userAvatar || '',
      rating: r.rating,
      comment: r.comment || '',
      date: r.createdAt
        ? new Date(r.createdAt).toISOString().split('T')[0]
        : r.date || '',
    }))
  }

  return base
}

// ============ Mock Data (fallback) ============

const mockInstructors = [
  { id: 'i1', name: 'Dr. Sarah Chen', avatar: '', bio: 'PhD in Computer Science from MIT. 15 years of teaching experience.' },
  { id: 'i2', name: 'James Wilson', avatar: '', bio: 'Senior Software Engineer at Google. Full-stack expert.' },
  { id: 'i3', name: 'Emily Rodriguez', avatar: '', bio: 'UX Designer at Apple. Design thinking advocate.' },
  { id: 'i4', name: 'Michael Park', avatar: '', bio: 'Data Scientist at Netflix. ML/AI specialist.' },
]

const mockCourses: Course[] = [
  {
    id: 'c1', title: 'Complete Web Development Bootcamp', slug: 'complete-web-development',
    description: 'Learn HTML, CSS, JavaScript, React, Node.js, and more in this comprehensive bootcamp. Build real-world projects and become a full-stack web developer.',
    shortDescription: 'Master full-stack web development from zero to hero with real-world projects.',
    thumbnail: '', instructorId: 'i1', instructorName: 'Dr. Sarah Chen', instructorAvatar: '',
    category: 'Web Development', level: 'Beginner', price: 49.99, originalPrice: 89.99, currency: 'USD',
    rating: 4.8, reviewCount: 2847, studentCount: 15420, duration: '42 hours', lessonsCount: 320, articlesCount: 85, downloadableResources: 45,
    language: 'English', lastUpdated: '2025-12-15', featured: true, bestseller: true, tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
    whatYouLearn: ['Build 16+ real-world web development projects', 'Master HTML5, CSS3, and modern JavaScript (ES6+)', 'Create responsive websites with Flexbox and Grid', 'Build full-stack apps with React and Node.js', 'Work with APIs, databases, and authentication', 'Deploy applications to the cloud'],
    requirements: ['No programming experience needed', 'A computer with internet access', 'Willingness to learn and practice'],
    curriculum: [
      { id: 's1', title: 'Getting Started with HTML', lessons: [
        { id: 'l1', title: 'Introduction to Web Development', type: 'video', duration: '12:30', isPreview: true, isFree: true },
        { id: 'l2', title: 'Setting Up Your Development Environment', type: 'text', duration: '5:00', isPreview: true, isFree: true },
        { id: 'l3', title: 'HTML Basics: Elements and Tags', type: 'video', duration: '18:45', isPreview: false, isFree: false },
        { id: 'l4', title: 'HTML Forms and Inputs', type: 'video', duration: '22:10', isPreview: false, isFree: false },
        { id: 'l5', title: 'HTML Quiz', type: 'quiz', duration: '15:00', isPreview: false, isFree: false },
      ]},
      { id: 's2', title: 'CSS Fundamentals', lessons: [
        { id: 'l6', title: 'CSS Selectors and Properties', type: 'video', duration: '20:15', isPreview: true, isFree: true },
        { id: 'l7', title: 'Flexbox Layout', type: 'video', duration: '25:00', isPreview: false, isFree: false },
        { id: 'l8', title: 'CSS Grid Layout', type: 'video', duration: '23:30', isPreview: false, isFree: false },
      ]},
      { id: 's3', title: 'JavaScript Deep Dive', lessons: [
        { id: 'l9', title: 'Variables, Types, and Operators', type: 'video', duration: '19:45', isPreview: false, isFree: false },
        { id: 'l10', title: 'Functions and Scope', type: 'video', duration: '24:00', isPreview: false, isFree: false },
        { id: 'l11', title: 'DOM Manipulation', type: 'video', duration: '28:15', isPreview: false, isFree: false },
        { id: 'l12', title: 'JavaScript Assessment', type: 'quiz', duration: '20:00', isPreview: false, isFree: false },
      ]},
    ],
    reviews: [
      { id: 'r1', userId: 'u10', userName: 'Alex Johnson', userAvatar: '', rating: 5, comment: 'Best web development course I\'ve ever taken! Sarah explains everything so clearly.', date: '2025-12-01' },
      { id: 'r2', userId: 'u11', userName: 'Maria Garcia', userAvatar: '', rating: 4, comment: 'Great content and well-structured. Some sections could use more exercises though.', date: '2025-11-28' },
      { id: 'r3', userId: 'u12', userName: 'David Kim', userAvatar: '', rating: 5, comment: 'Went from zero coding knowledge to landing my first developer job.', date: '2025-11-15' },
    ]
  },
  {
    id: 'c2', title: 'React & Next.js Masterclass', slug: 'react-nextjs-masterclass',
    description: 'Advanced React patterns, Next.js, TypeScript, and modern web development techniques.',
    shortDescription: 'Master React 19, Next.js, TypeScript and build production-ready apps.',
    thumbnail: '', instructorId: 'i2', instructorName: 'James Wilson', instructorAvatar: '',
    category: 'Web Development', level: 'Advanced', price: 44.99, originalPrice: 79.99, currency: 'USD',
    rating: 4.9, reviewCount: 1923, studentCount: 9870, duration: '38 hours', lessonsCount: 245, articlesCount: 62, downloadableResources: 30,
    language: 'English', lastUpdated: '2025-11-20', featured: true, bestseller: false, tags: ['React', 'Next.js', 'TypeScript'],
    whatYouLearn: ['Master React 19 with hooks and patterns', 'Build production apps with Next.js App Router', 'TypeScript for React applications'],
    requirements: ['Basic JavaScript knowledge', 'Familiarity with HTML/CSS'],
    curriculum: [
      { id: 's4', title: 'React Fundamentals Review', lessons: [
        { id: 'l13', title: 'React Component Architecture', type: 'video', duration: '18:00', isPreview: true, isFree: true },
        { id: 'l14', title: 'Advanced Hooks Patterns', type: 'video', duration: '24:30', isPreview: false, isFree: false },
      ]},
    ],
    reviews: [
      { id: 'r6', userId: 'u15', userName: 'Tom Harris', userAvatar: '', rating: 5, comment: 'James is an incredible teacher. The way he explains React patterns is unmatched.', date: '2025-12-05' },
    ]
  },
  {
    id: 'c3', title: 'UI/UX Design Fundamentals', slug: 'uiux-design-fundamentals',
    description: 'Learn design thinking, wireframing, prototyping, and user research from scratch.',
    shortDescription: 'Master UI/UX design principles and tools from an Apple designer.',
    thumbnail: '', instructorId: 'i3', instructorName: 'Emily Rodriguez', instructorAvatar: '',
    category: 'Design', level: 'Beginner', price: 34.99, originalPrice: 59.99, currency: 'USD',
    rating: 4.7, reviewCount: 1456, studentCount: 8230, duration: '28 hours', lessonsCount: 180, articlesCount: 45, downloadableResources: 20,
    language: 'English', lastUpdated: '2025-10-30', featured: true, bestseller: false, tags: ['UI Design', 'UX Design', 'Figma'],
    whatYouLearn: ['Understand core design principles', 'Create wireframes and prototypes in Figma'],
    requirements: ['No design experience needed', 'Figma account (free)'],
    curriculum: [
      { id: 's5', title: 'Design Thinking', lessons: [
        { id: 'l16', title: 'What is Design Thinking?', type: 'video', duration: '15:00', isPreview: true, isFree: true },
        { id: 'l17', title: 'Empathy Maps and User Personas', type: 'video', duration: '20:30', isPreview: false, isFree: false },
      ]},
    ],
    reviews: [
      { id: 'r8', userId: 'u17', userName: 'Amy Chen', userAvatar: '', rating: 5, comment: 'Emily\'s design thinking approach changed how I approach problems.', date: '2025-11-15' },
    ]
  },
  {
    id: 'c4', title: 'Machine Learning with Python', slug: 'machine-learning-python',
    description: 'Comprehensive machine learning course covering supervised and unsupervised learning, neural networks, and deep learning.',
    shortDescription: 'Learn ML algorithms, build models, and solve real-world problems with Python.',
    thumbnail: '', instructorId: 'i4', instructorName: 'Michael Park', instructorAvatar: '',
    category: 'Data Science', level: 'Intermediate', price: 54.99, originalPrice: 99.99, currency: 'USD',
    rating: 4.8, reviewCount: 2156, studentCount: 12300, duration: '45 hours', lessonsCount: 280, articlesCount: 95, downloadableResources: 50,
    language: 'English', lastUpdated: '2025-12-01', featured: true, bestseller: true, tags: ['Python', 'Machine Learning', 'AI'],
    whatYouLearn: ['Master Python for data science', 'Implement ML algorithms from scratch'],
    requirements: ['Basic Python programming', 'Understanding of algebra and statistics'],
    curriculum: [
      { id: 's6', title: 'Python for ML', lessons: [
        { id: 'l18', title: 'NumPy and Pandas Crash Course', type: 'video', duration: '25:00', isPreview: true, isFree: true },
        { id: 'l19', title: 'Data Visualization with Matplotlib', type: 'video', duration: '18:30', isPreview: false, isFree: false },
      ]},
    ],
    reviews: [
      { id: 'r9', userId: 'u18', userName: 'Kevin Zhang', userAvatar: '', rating: 5, comment: 'Michael makes ML accessible. The hands-on projects are incredibly practical.', date: '2025-12-10' },
    ]
  },
]

const mockBlogPosts: BlogPost[] = [
  { id: 'b1', slug: 'future-of-web-development-2026', title: 'The Future of Web Development in 2026', excerpt: 'Explore the latest trends shaping the web development landscape including AI-powered development, WebAssembly, and more.', content: '<p>The web development landscape is evolving rapidly. In 2026, we see AI-powered development tools becoming mainstream, WebAssembly enabling near-native performance in browsers, and edge computing transforming how we build and deploy applications.</p><p>Key trends include server components, partial hydration, and AI-assisted coding. Frameworks like Next.js and Remix continue to push the boundaries of what\'s possible on the web.</p>', thumbnail: '', authorName: 'Dr. Sarah Chen', authorAvatar: '', category: 'Web Development', date: '2025-12-15', readTime: '8 min read', tags: ['Web Dev', 'Trends', 'AI'] },
  { id: 'b2', slug: 'mastering-react-hooks', title: 'Mastering React Hooks: Advanced Patterns', excerpt: 'Deep dive into advanced React hook patterns that will make your code cleaner and more maintainable.', content: '<p>React Hooks have fundamentally changed how we write React components. In this article, we explore advanced patterns including custom hooks, useReducer for complex state, and composition patterns.</p>', thumbnail: '', authorName: 'James Wilson', authorAvatar: '', category: 'React', date: '2025-12-10', readTime: '12 min read', tags: ['React', 'Hooks', 'JavaScript'] },
  { id: 'b3', slug: 'design-thinking-workshop', title: 'Design Thinking: A Practical Workshop Guide', excerpt: 'Step-by-step guide to running effective design thinking workshops for your team.', content: '<p>Design thinking workshops can transform how your team approaches problem-solving. This guide covers everything from preparation to facilitation.</p>', thumbnail: '', authorName: 'Emily Rodriguez', authorAvatar: '', category: 'Design', date: '2025-12-05', readTime: '10 min read', tags: ['Design', 'UX', 'Workshop'] },
  { id: 'b4', slug: 'machine-learning-career-guide', title: 'How to Start a Career in Machine Learning', excerpt: 'A comprehensive guide for aspiring ML engineers including learning paths, resources, and career tips.', content: '<p>Starting a career in machine learning can seem daunting, but with the right approach and resources, anyone can break into this exciting field.</p>', thumbnail: '', authorName: 'Michael Park', authorAvatar: '', category: 'Data Science', date: '2025-11-28', readTime: '15 min read', tags: ['ML', 'Career', 'Data Science'] },
]

const mockCategories = [
  { id: 'cat1', name: 'Web Development', icon: 'Code', count: 145, color: '#059669' },
  { id: 'cat2', name: 'Data Science', icon: 'BarChart3', count: 89, color: '#7c3aed' },
  { id: 'cat3', name: 'Design', icon: 'Palette', count: 67, color: '#ec4899' },
  { id: 'cat4', name: 'Mobile Development', icon: 'Smartphone', count: 52, color: '#f59e0b' },
  { id: 'cat5', name: 'Marketing', icon: 'Megaphone', count: 38, color: '#ef4444' },
  { id: 'cat6', name: 'Cloud Computing', icon: 'Cloud', count: 45, color: '#06b6d4' },
  { id: 'cat7', name: 'Blockchain', icon: 'Link', count: 28, color: '#8b5cf6' },
  { id: 'cat8', name: 'Cybersecurity', icon: 'Shield', count: 34, color: '#10b981' },
  { id: 'cat9', name: 'Business', icon: 'Briefcase', count: 41, color: '#f97316' },
  { id: 'cat10', name: 'Photography', icon: 'Camera', count: 22, color: '#14b8a6' },
]

// ============ API Functions ============

export async function fetchCourses(filters?: {
  category?: string
  level?: string
  search?: string
  sortBy?: string
  page?: number
  limit?: number
}): Promise<{ courses: Course[]; total: number }> {
  try {
    const params = new URLSearchParams()
    if (filters) {
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== undefined && v !== '') params.set(k, String(v))
      })
    }
    const res = await fetch(`/api/courses?${params.toString()}`)
    if (res.ok) {
      const json = await res.json()
      if (json.success && json.data) {
        const courses: Course[] = json.data.map(mapCourseFromAPI)
        const total: number = json.pagination?.total ?? courses.length
        return { courses, total }
      }
    }
  } catch { /* fallback to mock */ }

  // Mock data fallback
  let courses = [...mockCourses]
  if (filters?.category) courses = courses.filter((c) => c.category === filters.category)
  if (filters?.level) courses = courses.filter((c) => c.level === filters.level)
  if (filters?.search) {
    const q = filters.search.toLowerCase()
    courses = courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.shortDescription.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    )
  }
  if (filters?.sortBy) {
    switch (filters.sortBy) {
      case 'popular': courses.sort((a, b) => b.studentCount - a.studentCount); break
      case 'newest': courses.sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated)); break
      case 'price-low': courses.sort((a, b) => a.price - b.price); break
      case 'price-high': courses.sort((a, b) => b.price - a.price); break
      case 'rating': courses.sort((a, b) => b.rating - a.rating); break
    }
  }
  const page = filters?.page || 1
  const limit = filters?.limit || 9
  const start = (page - 1) * limit
  return { courses: courses.slice(start, start + limit), total: courses.length }
}

export async function fetchCourseById(id: string): Promise<Course | null> {
  try {
    const res = await fetch(`/api/courses/${id}`)
    if (res.ok) {
      const json = await res.json()
      if (json.success && json.data) {
        return mapCourseDetailFromAPI(json.data)
      }
    }
  } catch { /* fallback */ }
  return mockCourses.find((c) => c.id === id) || null
}

export async function fetchFeaturedCourses(): Promise<Course[]> {
  try {
    const res = await fetch('/api/courses?status=PUBLISHED&limit=12')
    if (res.ok) {
      const json = await res.json()
      if (json.success && json.data) {
        const courses: Course[] = json.data.map(mapCourseFromAPI)
        return courses.filter((c) => c.featured)
      }
    }
  } catch { /* fallback */ }
  return mockCourses.filter((c) => c.featured)
}

export async function fetchCategories() {
  try {
    const res = await fetch('/api/categories')
    if (res.ok) {
      const json = await res.json()
      if (json.success && json.data) {
        return json.data.map((cat: any) => ({
          id: cat.id,
          name: cat.name,
          icon: cat.icon || '',
          count: cat._count?.courses || 0,
          slug: cat.slug,
        }))
      }
    }
  } catch { /* fallback */ }
  return mockCategories
}

export async function fetchBlogPosts(category?: string): Promise<BlogPost[]> {
  try {
    const params = category ? `?category=${category}` : ''
    const res = await fetch(`/api/blog${params}`)
    if (res.ok) {
      const json = await res.json()
      if (json.success && json.data) {
        return json.data.map((post: any) => ({
          id: post.id,
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt || '',
          content: post.content || '',
          thumbnail: post.thumbnail || '',
          authorName: post.author?.name || '',
          authorAvatar: post.author?.image || '',
          category: post.category || '',
          date: post.createdAt ? new Date(post.createdAt).toISOString().split('T')[0] : '',
          readTime: `${Math.max(3, Math.ceil((post.content?.length || 200) / 200))} min read`,
          tags: post.tags ? JSON.parse(post.tags) : [],
        }))
      }
    }
  } catch { /* fallback */ }
  if (category) return mockBlogPosts.filter((p) => p.category === category)
  return mockBlogPosts
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  return mockBlogPosts.find((p) => p.slug === slug) || null
}

export async function searchCourses(query: string): Promise<Course[]> {
  const { courses } = await fetchCourses({ search: query, limit: 20 })
  return courses
}

// ============ Auth API ============

export interface LoginResponse {
  success: boolean
  data?: {
    id: string
    email: string
    name: string
    role: string
    image: string
    bio: string
  }
  error?: string
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    return await res.json()
  } catch {
    return { success: false, error: 'Network error. Please try again.' }
  }
}

export interface RegisterResponse {
  success: boolean
  data?: any
  error?: string
}

export async function registerUser(data: {
  name: string
  email: string
  password: string
  role: string
}): Promise<RegisterResponse> {
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return await res.json()
  } catch {
    return { success: false, error: 'Network error. Please try again.' }
  }
}

// Demo login info
export function getDemoUsers() {
  return [
    { id: 'demo-admin', name: 'Admin User', email: 'admin@lms.com', role: 'admin' as const, avatar: '', bio: 'Platform administrator managing LearnHub LMS.' },
    { id: 'demo-instructor', name: 'Sarah Johnson', email: 'instructor1@lms.com', role: 'instructor' as const, avatar: '', bio: 'Full-stack developer with 10+ years of experience.' },
    { id: 'demo-student', name: 'John Smith', email: 'student1@lms.com', role: 'student' as const, avatar: '', bio: 'Aspiring full-stack developer.' },
  ]
}

export { mockCourses, mockBlogPosts, mockCategories, mockInstructors }

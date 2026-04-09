import { db } from '@/lib/db'

// Types
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

// Mock Data
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
    category: 'Web Development', level: 'Beginner', price: 89.99, originalPrice: 199.99, currency: 'USD',
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
      { id: 'r1', userId: 'u10', userName: 'Alex Johnson', userAvatar: '', rating: 5, comment: 'Best web development course I\'ve ever taken! Sarah explains everything so clearly. Built 3 projects already.', date: '2025-12-01' },
      { id: 'r2', userId: 'u11', userName: 'Maria Garcia', userAvatar: '', rating: 4, comment: 'Great content and well-structured. Some sections could use more exercises though.', date: '2025-11-28' },
      { id: 'r3', userId: 'u12', userName: 'David Kim', userAvatar: '', rating: 5, comment: 'Went from zero coding knowledge to landing my first developer job. Highly recommend!', date: '2025-11-15' },
      { id: 'r4', userId: 'u13', userName: 'Lisa Wang', userAvatar: '', rating: 5, comment: 'The project-based approach is amazing. Each project builds on the previous one.', date: '2025-11-10' },
      { id: 'r5', userId: 'u14', userName: 'Robert Brown', userAvatar: '', rating: 4, comment: 'Comprehensive course with great support from the instructor. Worth every penny.', date: '2025-10-22' },
    ]
  },
  {
    id: 'c2', title: 'React & Next.js Masterclass', slug: 'react-nextjs-masterclass',
    description: 'Advanced React patterns, Next.js, TypeScript, and modern web development techniques.',
    shortDescription: 'Master React 19, Next.js, TypeScript and build production-ready apps.',
    thumbnail: '', instructorId: 'i2', instructorName: 'James Wilson', instructorAvatar: '',
    category: 'Web Development', level: 'Advanced', price: 129.99, originalPrice: 249.99, currency: 'USD',
    rating: 4.9, reviewCount: 1923, studentCount: 9870, duration: '38 hours', lessonsCount: 245, articlesCount: 62, downloadableResources: 30,
    language: 'English', lastUpdated: '2025-11-20', featured: true, bestseller: false, tags: ['React', 'Next.js', 'TypeScript'],
    whatYouLearn: ['Master React 19 with hooks and patterns', 'Build production apps with Next.js App Router', 'TypeScript for React applications', 'Server components and streaming', 'Performance optimization techniques', 'Testing with Jest and React Testing Library'],
    requirements: ['Basic JavaScript knowledge', 'Familiarity with HTML/CSS', 'Node.js installed on your computer'],
    curriculum: [
      { id: 's4', title: 'React Fundamentals Review', lessons: [
        { id: 'l13', title: 'React Component Architecture', type: 'video', duration: '18:00', isPreview: true, isFree: true },
        { id: 'l14', title: 'Advanced Hooks Patterns', type: 'video', duration: '24:30', isPreview: false, isFree: false },
        { id: 'l15', title: 'State Management Deep Dive', type: 'video', duration: '22:15', isPreview: false, isFree: false },
      ]},
    ],
    reviews: [
      { id: 'r6', userId: 'u15', userName: 'Tom Harris', userAvatar: '', rating: 5, comment: 'James is an incredible teacher. The way he explains React patterns is unmatched.', date: '2025-12-05' },
      { id: 'r7', userId: 'u16', userName: 'Sarah Lee', userAvatar: '', rating: 5, comment: 'This course made me confident in React and Next.js. Got promoted at work!', date: '2025-11-30' },
    ]
  },
  {
    id: 'c3', title: 'UI/UX Design Fundamentals', slug: 'uiux-design-fundamentals',
    description: 'Learn design thinking, wireframing, prototyping, and user research from scratch.',
    shortDescription: 'Master UI/UX design principles and tools from an Apple designer.',
    thumbnail: '', instructorId: 'i3', instructorName: 'Emily Rodriguez', instructorAvatar: '',
    category: 'Design', level: 'Beginner', price: 79.99, originalPrice: 149.99, currency: 'USD',
    rating: 4.7, reviewCount: 1456, studentCount: 8230, duration: '28 hours', lessonsCount: 180, articlesCount: 45, downloadableResources: 20,
    language: 'English', lastUpdated: '2025-10-30', featured: true, bestseller: false, tags: ['UI Design', 'UX Design', 'Figma'],
    whatYouLearn: ['Understand core design principles', 'Create wireframes and prototypes in Figma', 'Conduct user research and usability testing', 'Design responsive mobile-first interfaces', 'Build a professional design portfolio'],
    requirements: ['No design experience needed', 'Figma account (free)', 'A computer with internet access'],
    curriculum: [
      { id: 's5', title: 'Design Thinking', lessons: [
        { id: 'l16', title: 'What is Design Thinking?', type: 'video', duration: '15:00', isPreview: true, isFree: true },
        { id: 'l17', title: 'Empathy Maps and User Personas', type: 'video', duration: '20:30', isPreview: false, isFree: false },
      ]},
    ],
    reviews: [
      { id: 'r8', userId: 'u17', userName: 'Amy Chen', userAvatar: '', rating: 5, comment: 'Emily\'s design thinking approach changed how I approach problems. Absolutely love this course.', date: '2025-11-15' },
    ]
  },
  {
    id: 'c4', title: 'Machine Learning with Python', slug: 'machine-learning-python',
    description: 'Comprehensive machine learning course covering supervised and unsupervised learning, neural networks, and deep learning.',
    shortDescription: 'Learn ML algorithms, build models, and solve real-world problems with Python.',
    thumbnail: '', instructorId: 'i4', instructorName: 'Michael Park', instructorAvatar: '',
    category: 'Data Science', level: 'Intermediate', price: 109.99, originalPrice: 219.99, currency: 'USD',
    rating: 4.8, reviewCount: 2156, studentCount: 12300, duration: '45 hours', lessonsCount: 280, articlesCount: 95, downloadableResources: 50,
    language: 'English', lastUpdated: '2025-12-01', featured: true, bestseller: true, tags: ['Python', 'Machine Learning', 'AI', 'TensorFlow'],
    whatYouLearn: ['Master Python for data science', 'Implement ML algorithms from scratch', 'Use scikit-learn for real-world projects', 'Build neural networks with TensorFlow', 'Deploy ML models to production'],
    requirements: ['Basic Python programming', 'Understanding of algebra and statistics', 'Familiarity with Jupyter notebooks'],
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
  {
    id: 'c5', title: 'iOS App Development with Swift', slug: 'ios-swift-development',
    description: 'Build beautiful iOS apps from scratch using Swift and SwiftUI.',
    shortDescription: 'Create stunning iOS apps with Swift and SwiftUI from scratch.',
    thumbnail: '', instructorId: 'i1', instructorName: 'Dr. Sarah Chen', instructorAvatar: '',
    category: 'Mobile Development', level: 'Beginner', price: 94.99, currency: 'USD',
    rating: 4.6, reviewCount: 876, studentCount: 5400, duration: '35 hours', lessonsCount: 200, articlesCount: 50, downloadableResources: 25,
    language: 'English', lastUpdated: '2025-09-15', featured: false, bestseller: false, tags: ['Swift', 'iOS', 'SwiftUI'],
    whatYouLearn: ['Swift programming fundamentals', 'SwiftUI for modern iOS UI', 'Core Data and persistence', 'Networking and APIs', 'App Store submission process'],
    requirements: ['A Mac computer', 'Xcode installed', 'Basic programming knowledge helpful'],
    curriculum: [],
    reviews: []
  },
  {
    id: 'c6', title: 'Digital Marketing Strategy', slug: 'digital-marketing-strategy',
    description: 'Master SEO, social media marketing, content marketing, and paid advertising.',
    shortDescription: 'Learn modern digital marketing strategies to grow any business.',
    thumbnail: '', instructorId: 'i3', instructorName: 'Emily Rodriguez', instructorAvatar: '',
    category: 'Marketing', level: 'Beginner', price: 69.99, originalPrice: 129.99, currency: 'USD',
    rating: 4.5, reviewCount: 654, studentCount: 4200, duration: '20 hours', lessonsCount: 150, articlesCount: 40, downloadableResources: 15,
    language: 'English', lastUpdated: '2025-11-01', featured: false, bestseller: false, tags: ['SEO', 'Marketing', 'Social Media'],
    whatYouLearn: ['SEO fundamentals and advanced strategies', 'Social media marketing across platforms', 'Content marketing and copywriting', 'Google Ads and Facebook Ads', 'Analytics and tracking'],
    requirements: ['No marketing experience needed', 'Basic computer skills', 'Interest in growing a business'],
    curriculum: [],
    reviews: []
  },
  {
    id: 'c7', title: 'Python for Data Analysis', slug: 'python-data-analysis',
    description: 'Learn Python, Pandas, NumPy, and data visualization for data analysis.',
    shortDescription: 'Analyze data like a pro with Python, Pandas, and visualization libraries.',
    thumbnail: '', instructorId: 'i4', instructorName: 'Michael Park', instructorAvatar: '',
    category: 'Data Science', level: 'Beginner', price: 84.99, currency: 'USD',
    rating: 4.7, reviewCount: 1234, studentCount: 7800, duration: '30 hours', lessonsCount: 210, articlesCount: 60, downloadableResources: 35,
    language: 'English', lastUpdated: '2025-10-20', featured: false, bestseller: false, tags: ['Python', 'Pandas', 'Data Analysis'],
    whatYouLearn: ['Python fundamentals for data analysis', 'Pandas for data manipulation', 'Data visualization with Matplotlib and Seaborn', 'Statistical analysis', 'Real-world data projects'],
    requirements: ['No programming experience required', 'Basic math skills', 'Computer with internet access'],
    curriculum: [],
    reviews: []
  },
  {
    id: 'c8', title: 'Advanced CSS & Animations', slug: 'advanced-css-animations',
    description: 'Master advanced CSS techniques including Grid, Flexbox, animations, and modern layout patterns.',
    shortDescription: 'Create stunning web interfaces with advanced CSS techniques.',
    thumbnail: '', instructorId: 'i2', instructorName: 'James Wilson', instructorAvatar: '',
    category: 'Web Development', level: 'Intermediate', price: 74.99, currency: 'USD',
    rating: 4.6, reviewCount: 567, studentCount: 3100, duration: '22 hours', lessonsCount: 160, articlesCount: 30, downloadableResources: 10,
    language: 'English', lastUpdated: '2025-11-10', featured: false, bestseller: false, tags: ['CSS', 'Animation', 'Design'],
    whatYouLearn: ['Advanced CSS Grid layouts', 'Complex animations and transitions', 'CSS custom properties', 'Modern responsive design', 'Performance optimization'],
    requirements: ['Basic HTML and CSS knowledge', 'Understanding of Flexbox helpful', 'Modern web browser'],
    curriculum: [],
    reviews: []
  },
  {
    id: 'c9', title: 'Cloud Computing with AWS', slug: 'aws-cloud-computing',
    description: 'Master AWS services, architecture, and deployment for cloud solutions.',
    shortDescription: 'Build and deploy scalable cloud applications with Amazon Web Services.',
    thumbnail: '', instructorId: 'i4', instructorName: 'Michael Park', instructorAvatar: '',
    category: 'Cloud Computing', level: 'Intermediate', price: 119.99, originalPrice: 199.99, currency: 'USD',
    rating: 4.7, reviewCount: 987, studentCount: 6500, duration: '40 hours', lessonsCount: 250, articlesCount: 70, downloadableResources: 40,
    language: 'English', lastUpdated: '2025-12-05', featured: false, bestseller: true, tags: ['AWS', 'Cloud', 'DevOps'],
    whatYouLearn: ['AWS core services (EC2, S3, RDS, Lambda)', 'Cloud architecture best practices', 'Serverless applications', 'CI/CD pipelines', 'Security and monitoring'],
    requirements: ['Basic understanding of networking', 'Some programming experience', 'AWS free tier account'],
    curriculum: [],
    reviews: []
  },
  {
    id: 'c10', title: 'Blockchain Development', slug: 'blockchain-development',
    description: 'Build decentralized applications with Solidity, Ethereum, and Web3.',
    shortDescription: 'Create smart contracts and dApps on Ethereum blockchain.',
    thumbnail: '', instructorId: 'i2', instructorName: 'James Wilson', instructorAvatar: '',
    category: 'Blockchain', level: 'Advanced', price: 139.99, currency: 'USD',
    rating: 4.5, reviewCount: 345, studentCount: 2100, duration: '32 hours', lessonsCount: 190, articlesCount: 55, downloadableResources: 20,
    language: 'English', lastUpdated: '2025-10-01', featured: false, bestseller: false, tags: ['Blockchain', 'Solidity', 'Ethereum'],
    whatYouLearn: ['Blockchain fundamentals', 'Smart contract development with Solidity', 'Web3.js and ethers.js', 'DeFi protocols', 'NFT creation and marketplace'],
    requirements: ['JavaScript proficiency', 'Basic understanding of cryptography', 'Metamask wallet'],
    curriculum: [],
    reviews: []
  },
  {
    id: 'c11', title: 'Product Management Essentials', slug: 'product-management',
    description: 'Learn product strategy, roadmapping, user research, and agile methodologies.',
    shortDescription: 'Become a product manager with practical frameworks and real-world skills.',
    thumbnail: '', instructorId: 'i3', instructorName: 'Emily Rodriguez', instructorAvatar: '',
    category: 'Business', level: 'Beginner', price: 89.99, currency: 'USD',
    rating: 4.4, reviewCount: 432, studentCount: 3200, duration: '18 hours', lessonsCount: 120, articlesCount: 35, downloadableResources: 12,
    language: 'English', lastUpdated: '2025-09-20', featured: false, bestseller: false, tags: ['Product Management', 'Agile', 'Strategy'],
    whatYouLearn: ['Product lifecycle management', 'User research techniques', 'Roadmap creation', 'Agile and Scrum methodologies', 'Stakeholder management'],
    requirements: ['No PM experience needed', 'Interest in technology products', 'Basic business understanding'],
    curriculum: [],
    reviews: []
  },
  {
    id: 'c12', title: 'Cybersecurity Fundamentals', slug: 'cybersecurity-fundamentals',
    description: 'Learn ethical hacking, network security, and cybersecurity best practices.',
    shortDescription: 'Protect systems and data with comprehensive cybersecurity knowledge.',
    thumbnail: '', instructorId: 'i1', instructorName: 'Dr. Sarah Chen', instructorAvatar: '',
    category: 'Cybersecurity', level: 'Beginner', price: 99.99, originalPrice: 179.99, currency: 'USD',
    rating: 4.6, reviewCount: 678, studentCount: 4500, duration: '36 hours', lessonsCount: 230, articlesCount: 65, downloadableResources: 30,
    language: 'English', lastUpdated: '2025-11-25', featured: false, bestseller: false, tags: ['Cybersecurity', 'Ethical Hacking', 'Network Security'],
    whatYouLearn: ['Network security fundamentals', 'Ethical hacking techniques', 'Vulnerability assessment', 'Incident response', 'Security best practices'],
    requirements: ['Basic computer networking knowledge', 'VirtualBox installed', 'Curiosity about security'],
    curriculum: [],
    reviews: []
  },
]

const mockBlogPosts: BlogPost[] = [
  { id: 'b1', slug: 'future-of-web-development-2026', title: 'The Future of Web Development in 2026', excerpt: 'Explore the latest trends shaping the web development landscape including AI-powered development, WebAssembly, and more.', content: 'Long form content here...', thumbnail: '', authorName: 'Dr. Sarah Chen', authorAvatar: '', category: 'Web Development', date: '2025-12-15', readTime: '8 min read', tags: ['Web Dev', 'Trends', 'AI'] },
  { id: 'b2', slug: 'mastering-react-hooks', title: 'Mastering React Hooks: Advanced Patterns', excerpt: 'Deep dive into advanced React hook patterns that will make your code cleaner and more maintainable.', content: 'Long form content...', thumbnail: '', authorName: 'James Wilson', authorAvatar: '', category: 'React', date: '2025-12-10', readTime: '12 min read', tags: ['React', 'Hooks', 'JavaScript'] },
  { id: 'b3', slug: 'design-thinking-workshop', title: 'Design Thinking: A Practical Workshop Guide', excerpt: 'Step-by-step guide to running effective design thinking workshops for your team.', content: 'Long form content...', thumbnail: '', authorName: 'Emily Rodriguez', authorAvatar: '', category: 'Design', date: '2025-12-05', readTime: '10 min read', tags: ['Design', 'UX', 'Workshop'] },
  { id: 'b4', slug: 'machine-learning-career-guide', title: 'How to Start a Career in Machine Learning', excerpt: 'A comprehensive guide for aspiring ML engineers including learning paths, resources, and career tips.', content: 'Long form content...', thumbnail: '', authorName: 'Michael Park', authorAvatar: '', category: 'Data Science', date: '2025-11-28', readTime: '15 min read', tags: ['ML', 'Career', 'Data Science'] },
  { id: 'b5', slug: 'typescript-best-practices', title: 'TypeScript Best Practices for 2026', excerpt: 'Level up your TypeScript skills with these essential best practices and patterns.', content: 'Long form content...', thumbnail: '', authorName: 'James Wilson', authorAvatar: '', category: 'TypeScript', date: '2025-11-20', readTime: '9 min read', tags: ['TypeScript', 'JavaScript', 'Best Practices'] },
  { id: 'b6', slug: 'remote-learning-tips', title: '10 Tips for Effective Remote Learning', excerpt: 'Maximize your online learning experience with these proven strategies and techniques.', content: 'Long form content...', thumbnail: '', authorName: 'Dr. Sarah Chen', authorAvatar: '', category: 'Learning', date: '2025-11-15', readTime: '6 min read', tags: ['Learning', 'Tips', 'Productivity'] },
]

const mockUsers: User[] = [
  { id: 'u1', name: 'Admin User', email: 'admin@learnhub.com', role: 'admin', avatar: '', bio: 'Platform administrator', joinedDate: '2024-01-15', enrolledCourses: [], completedCourses: [], certificates: [], points: 0 },
  { id: 'u2', name: 'Prof. Sarah Chen', email: 'sarah@learnhub.com', role: 'instructor', avatar: '', bio: 'Computer Science professor and course creator', joinedDate: '2024-02-01', enrolledCourses: [], completedCourses: [], certificates: [], points: 0 },
  { id: 'u3', name: 'John Smith', email: 'john@example.com', role: 'student', avatar: '', bio: 'Aspiring full-stack developer', joinedDate: '2024-06-15', enrolledCourses: ['c1', 'c2', 'c4'], completedCourses: [], certificates: [], points: 1250 },
  { id: 'u4', name: 'Maria Garcia', email: 'maria@example.com', role: 'instructor', avatar: '', bio: 'Design instructor with 10 years experience', joinedDate: '2024-03-20', enrolledCourses: [], completedCourses: [], certificates: [], points: 0 },
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

// API Functions
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
        if (v) params.set(k, String(v))
      })
    }
    const res = await fetch(`/api/courses?${params.toString()}`)
    if (res.ok) {
      const data = await res.json()
      return data
    }
  } catch { /* fallback to mock */ }

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
    if (res.ok) return await res.json()
  } catch { /* fallback */ }
  return mockCourses.find((c) => c.id === id) || null
}

export async function fetchFeaturedCourses(): Promise<Course[]> {
  const { courses } = await fetchCourses()
  return courses.filter((c) => c.featured)
}

export async function fetchCategories() {
  return mockCategories
}

export async function fetchBlogPosts(category?: string): Promise<BlogPost[]> {
  try {
    const params = category ? `?category=${category}` : ''
    const res = await fetch(`/api/blog${params}`)
    if (res.ok) return await res.json()
  } catch { /* fallback */ }
  if (category) return mockBlogPosts.filter((p) => p.category === category)
  return mockBlogPosts
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  return mockBlogPosts.find((p) => p.slug === slug) || null
}

export async function fetchUser(id: string): Promise<User | null> {
  return mockUsers.find((u) => u.id === id) || null
}

export async function searchCourses(query: string): Promise<Course[]> {
  const { courses } = await fetchCourses({ search: query, limit: 20 })
  return courses
}

// Demo login
export function getDemoUsers() {
  return mockUsers.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    avatar: u.avatar,
    bio: u.bio,
  }))
}

export { mockCourses, mockBlogPosts, mockCategories, mockUsers, mockInstructors }

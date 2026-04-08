// ============ USER & AUTH ============

export type UserRole = 'ADMIN' | 'INSTRUCTOR' | 'STUDENT'

export interface User {
  id: string
  email: string
  name: string
  password?: string
  image?: string
  bio?: string
  phone?: string
  role: UserRole
  isVerified: boolean
  isApproved: boolean
  points: number
  streak: number
  lastActiveAt?: string
  createdAt: string
  updatedAt: string
}

export interface UserPublic {
  id: string
  email: string
  name: string
  image?: string
  bio?: string
  role: UserRole
  isVerified: boolean
  points: number
  streak: number
  createdAt: string
}

// ============ BADGE ============

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  criteria: string
  createdAt: string
}

export interface UserBadge {
  id: string
  userId: string
  badgeId: string
  earnedAt: string
  badge?: Badge
}

// ============ CATEGORY ============

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  createdAt: string
  updatedAt: string
  _count?: {
    courses: number
  }
}

// ============ COURSE ============

export type CourseLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
export type CourseStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'

export interface Course {
  id: string
  title: string
  slug: string
  description: string
  shortDesc?: string
  thumbnail?: string
  previewVideo?: string
  level: CourseLevel
  language: string
  price: number
  discountPrice?: number
  duration: number
  status: CourseStatus
  isFeatured: boolean
  maxStudents?: number
  categorySlug: string
  instructorId: string
  createdAt: string
  updatedAt: string
  // Relations
  category?: Category
  instructor?: UserPublic
  sections?: Section[]
  _count?: {
    enrollments: number
    reviews: number
    sections: number
    lessons: number
  }
  avgRating?: number
}

// ============ SECTION & LESSON ============

export type LessonType = 'VIDEO' | 'TEXT' | 'QUIZ'

export interface Section {
  id: string
  title: string
  order: number
  courseId: string
  lessons?: Lesson[]
  createdAt: string
  updatedAt: string
}

export interface Lesson {
  id: string
  title: string
  type: LessonType
  content?: string
  duration: number
  isPreview: boolean
  isFree: boolean
  resources?: string
  order: number
  sectionId: string
  courseId: string
  quizId?: string
  createdAt: string
  updatedAt: string
  quiz?: Quiz
  progress?: LessonProgress
}

// ============ QUIZ ============

export interface Quiz {
  id: string
  title: string
  passingScore: number
  timeLimit?: number
  createdAt: string
  questions?: QuizQuestion[]
}

export interface QuizQuestion {
  id: string
  question: string
  options: string // JSON array
  correctAnswer: string // JSON array of correct indices
  explanation?: string
  order: number
  quizId: string
  createdAt: string
}

export interface QuizAttempt {
  id: string
  score: number
  totalQuestions: number
  correctAnswers: number
  passed: boolean
  timeTaken?: number
  answers: string // JSON array
  userId: string
  quizId: string
  createdAt: string
}

// ============ ENROLLMENT & PAYMENT ============

export type EnrollmentStatus = 'ACTIVE' | 'COMPLETED' | 'CANCELLED'

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  status: EnrollmentStatus
  progress: number
  enrolledAt: string
  completedAt?: string
  certificateId?: string
  course?: Course
  user?: UserPublic
  payments?: Payment[]
  certificate?: Certificate
}

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'
export type PaymentMethod = 'STRIPE' | 'PAYPAL' | 'SSLCOMMERZ'

export interface Payment {
  id: string
  amount: number
  currency: string
  method: PaymentMethod
  status: PaymentStatus
  transactionId?: string
  couponCode?: string
  enrollmentId: string
  userId: string
  createdAt: string
  enrollment?: Enrollment
  coupon?: Coupon
}

// ============ PROGRESS TRACKING ============

export interface LessonProgress {
  id: string
  isCompleted: boolean
  lastPosition: number
  completedAt?: string
  userId: string
  lessonId: string
  createdAt: string
  updatedAt: string
  lesson?: Lesson
}

// ============ REVIEWS ============

export interface Review {
  id: string
  rating: number
  comment?: string
  userId: string
  courseId: string
  createdAt: string
  updatedAt: string
  user?: UserPublic
  course?: Course
}

// ============ DISCUSSION ============

export interface Discussion {
  id: string
  title?: string
  content: string
  parentId?: string
  userId: string
  courseId: string
  lessonId?: string
  createdAt: string
  updatedAt: string
  user?: UserPublic
  replies?: Discussion[]
}

// ============ WISHLIST ============

export interface Wishlist {
  id: string
  userId: string
  courseId: string
  createdAt: string
  course?: Course
}

// ============ COUPON ============

export interface Coupon {
  id: string
  code: string
  discount: number
  maxUses?: number
  usedCount: number
  validFrom: string
  validUntil: string
  isActive: boolean
  courseId?: string
  createdAt: string
}

// ============ CERTIFICATE ============

export interface Certificate {
  id: string
  certificateNo: string
  userId: string
  enrollmentId: string
  courseId: string
  issuedAt: string
  user?: UserPublic
}

// ============ NOTIFICATION ============

export type NotificationType = 'INFO' | 'SUCCESS' | 'WARNING' | 'ENROLLMENT' | 'COMPLETION'

export interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  isRead: boolean
  userId: string
  createdAt: string
}

// ============ BLOG ============

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  thumbnail?: string
  authorId: string
  status: 'DRAFT' | 'PUBLISHED'
  tags?: string // JSON array
  createdAt: string
  updatedAt: string
  author?: UserPublic
}

// ============ LIVE CLASS ============

export type MeetingType = 'ZOOM' | 'GOOGLE_MEET'

export interface LiveClass {
  id: string
  title: string
  description?: string
  meetingUrl: string
  meetingType: MeetingType
  scheduledAt: string
  duration: number
  courseId: string
  instructorId: string
  createdAt: string
  course?: Course
  instructor?: UserPublic
}

// ============ SUBSCRIPTION ============

export type PlanInterval = 'MONTHLY' | 'YEARLY'

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  interval: PlanInterval
  features: string // JSON array
  maxCourses?: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// ============ AFFILIATE ============

export interface Affiliate {
  id: string
  code: string
  userId: string
  commission: number
  totalEarnings: number
  totalReferrals: number
  createdAt: string
  updatedAt: string
}

// ============ ANALYTICS ============

export interface AnalyticsData {
  totalUsers: number
  totalCourses: number
  totalEnrollments: number
  totalRevenue: number
  totalReviews: number
  avgRating: number
  completedEnrollments: number
  activeEnrollments: number
  usersByRole: Record<string, number>
  enrollmentsByMonth: { month: string; count: number }[]
  topCourses: { id: string; title: string; enrollmentCount: number }[]
  recentEnrollments: Enrollment[]
}

// ============ PAGINATION ============

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// ============ API RESPONSE ============

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// ============ SEARCH ============

export interface SearchResult {
  courses: Course[]
  total: number
}

// ============ COURSE FILTERS ============

export interface CourseFilters {
  category?: string
  level?: CourseLevel
  minPrice?: number
  maxPrice?: number
  search?: string
  status?: CourseStatus
  instructorId?: string
  isFeatured?: boolean
  page?: number
  limit?: number
  sortBy?: 'createdAt' | 'price' | 'title' | 'rating' | 'enrollments'
  sortOrder?: 'asc' | 'desc'
}

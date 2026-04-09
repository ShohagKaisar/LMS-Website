'use client'

import { useEffect, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Sidebar } from '@/components/layout/Sidebar'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'

const HomepageView = lazy(() => import('@/components/views/HomepageView'))
const CoursesView = lazy(() => import('@/components/views/CoursesView'))
const CourseDetailView = lazy(() => import('@/components/views/CourseDetailView'))
const PricingView = lazy(() => import('@/components/views/PricingView'))
const AboutView = lazy(() => import('@/components/views/AboutView'))
const BlogView = lazy(() => import('@/components/views/BlogView'))
const BlogPostView = lazy(() => import('@/components/views/BlogPostView'))
const ContactView = lazy(() => import('@/components/views/ContactView'))
const LoginView = lazy(() => import('@/components/views/LoginView'))
const RegisterView = lazy(() => import('@/components/views/RegisterView'))
const StudentDashboard = lazy(() => import('@/components/views/StudentDashboard'))
const MyCoursesView = lazy(() => import('@/components/views/MyCoursesView'))
const CoursePlayerView = lazy(() => import('@/components/views/CoursePlayerView'))
const QuizView = lazy(() => import('@/components/views/QuizView'))
const CertificatesView = lazy(() => import('@/components/views/CertificatesView'))
const WishlistView = lazy(() => import('@/components/views/WishlistView'))
const ProfileView = lazy(() => import('@/components/views/ProfileView'))
const InstructorDashboard = lazy(() => import('@/components/views/InstructorDashboard'))
const InstructorCoursesView = lazy(() => import('@/components/views/InstructorCoursesView'))
const InstructorStudentsView = lazy(() => import('@/components/views/InstructorStudentsView'))
const AdminDashboard = lazy(() => import('@/components/views/AdminDashboard'))
const AdminUsersView = lazy(() => import('@/components/views/AdminUsersView'))
const AdminCoursesView = lazy(() => import('@/components/views/AdminCoursesView'))
const AdminAnalyticsView = lazy(() => import('@/components/views/AdminAnalyticsView'))
const CheckoutView = lazy(() => import('@/components/views/CheckoutView'))
const SearchResultsView = lazy(() => import('@/components/views/SearchResultsView'))

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

const dashboardViews = new Set([
  'dashboard',
  'my-courses',
  'course-player',
  'quiz',
  'certificates',
  'wishlist',
  'profile',
  'instructor-dashboard',
  'instructor-courses',
  'instructor-students',
  'admin-dashboard',
  'admin-users',
  'admin-courses',
  'admin-analytics',
])

function ViewRouter() {
  const { currentView } = useAppStore()
  const viewProps = { key: currentView + '-' + Date.now() }

  switch (currentView) {
    case 'home': return <HomepageView {...viewProps} />
    case 'courses': return <CoursesView {...viewProps} />
    case 'course-detail': return <CourseDetailView {...viewProps} />
    case 'pricing': return <PricingView {...viewProps} />
    case 'about': return <AboutView {...viewProps} />
    case 'blog': return <BlogView {...viewProps} />
    case 'blog-post': return <BlogPostView {...viewProps} />
    case 'contact': return <ContactView {...viewProps} />
    case 'login': return <LoginView {...viewProps} />
    case 'register': return <RegisterView {...viewProps} />
    case 'dashboard': return <StudentDashboard {...viewProps} />
    case 'my-courses': return <MyCoursesView {...viewProps} />
    case 'course-player': return <CoursePlayerView {...viewProps} />
    case 'quiz': return <QuizView {...viewProps} />
    case 'certificates': return <CertificatesView {...viewProps} />
    case 'wishlist': return <WishlistView {...viewProps} />
    case 'profile': return <ProfileView {...viewProps} />
    case 'instructor-dashboard': return <InstructorDashboard {...viewProps} />
    case 'instructor-courses': return <InstructorCoursesView {...viewProps} />
    case 'instructor-students': return <InstructorStudentsView {...viewProps} />
    case 'admin-dashboard': return <AdminDashboard {...viewProps} />
    case 'admin-users': return <AdminUsersView {...viewProps} />
    case 'admin-courses': return <AdminCoursesView {...viewProps} />
    case 'admin-analytics': return <AdminAnalyticsView {...viewProps} />
    case 'checkout': return <CheckoutView {...viewProps} />
    case 'search-results': return <SearchResultsView {...viewProps} />
    default: return <HomepageView {...viewProps} />
  }
}

export default function Home() {
  const { currentView } = useAppStore()
  const isDashboard = dashboardViews.has(currentView)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentView])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {isDashboard ? (
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="p-6"
              >
                <Suspense fallback={<LoadingSpinner text="Loading..." />}>
                  <ViewRouter />
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      ) : (
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              <Suspense fallback={<LoadingSpinner text="Loading..." />}>
                <ViewRouter />
              </Suspense>
            </motion.div>
          </AnimatePresence>
          <Footer />
        </main>
      )}
    </div>
  )
}

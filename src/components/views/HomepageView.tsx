'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  Users,
  GraduationCap,
  Star,
  Play,
  CheckCircle,
  Code,
  BarChart3,
  Palette,
  Smartphone,
  Megaphone,
  Cloud,
  Link,
  Shield,
  Briefcase,
  Camera,
  Quote,
  ChevronLeft,
  ChevronRight,
  Zap,
  Search,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAppStore } from '@/lib/store'
import { CourseCard } from '@/components/shared/CourseCard'
import { StarRating } from '@/components/shared/StarRating'
import { fetchFeaturedCourses, fetchCategories, mockCourses, mockInstructors } from '@/lib/api'
import type { Course } from '@/lib/api'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

const iconMap: Record<string, React.ElementType> = {
  Code, BarChart3, Palette, Smartphone, Megaphone, Cloud, Link, Shield, Briefcase, Camera,
}

export default function HomepageView() {
  const navigate = useAppStore((s) => s.navigate)
  const [courses, setCourses] = useState<Course[]>([])
  const [testimonialIdx, setTestimonialIdx] = useState(0)

  useEffect(() => {
    fetchFeaturedCourses().then(setCourses).catch(() => setCourses(mockCourses.filter(c => c.featured)))
  }, [])

  const stats = [
    { icon: Users, value: '10,000+', label: 'Active Students' },
    { icon: BookOpen, value: '500+', label: 'Expert Courses' },
    { icon: GraduationCap, value: '200+', label: 'Instructors' },
    { icon: Star, value: '95%', label: 'Satisfaction' },
  ]

  const steps = [
    { icon: Search, title: 'Browse', desc: 'Explore thousands of courses across various categories and find what interests you.' },
    { icon: CheckCircle, title: 'Enroll', desc: 'Sign up and enroll in your chosen courses with our secure payment system.' },
    { icon: Play, title: 'Learn', desc: 'Watch video lessons, complete assignments, and earn certificates at your own pace.' },
  ]

  const testimonials = [
    { name: 'Alex Johnson', role: 'Frontend Developer', avatar: 'A', comment: 'LearnHub completely transformed my career. I went from a complete beginner to landing my dream job at a top tech company in just 6 months. The quality of instruction is unmatched.', rating: 5 },
    { name: 'Maria Garcia', role: 'UX Designer', avatar: 'M', comment: 'The design courses here are incredible. Emily\'s teaching style is so engaging and practical. I\'ve already applied what I learned to real client projects.', rating: 5 },
    { name: 'David Kim', role: 'Data Scientist', avatar: 'D', comment: 'Best investment I\'ve made in my education. The ML course gave me hands-on experience with real datasets and cutting-edge tools. Highly recommend!', rating: 5 },
    { name: 'Lisa Wang', role: 'Full-Stack Developer', avatar: 'L', comment: 'The bootcamp-style courses with real projects made all the difference. I built a portfolio that actually impressed employers.', rating: 4 },
    { name: 'Robert Brown', role: 'Product Manager', avatar: 'R', comment: 'LearnHub helped me transition from engineering to product management. The business courses gave me the foundation I needed.', rating: 5 },
  ]

  const categories = [
    { name: 'Web Development', icon: 'Code', color: 'bg-emerald-500', count: 145 },
    { name: 'Data Science', icon: 'BarChart3', color: 'bg-violet-500', count: 89 },
    { name: 'Design', icon: 'Palette', color: 'bg-pink-500', count: 67 },
    { name: 'Mobile Development', icon: 'Smartphone', color: 'bg-amber-500', count: 52 },
    { name: 'Marketing', icon: 'Megaphone', color: 'bg-red-500', count: 38 },
    { name: 'Cloud Computing', icon: 'Cloud', color: 'bg-cyan-500', count: 45 },
    { name: 'Cybersecurity', icon: 'Shield', color: 'bg-teal-500', count: 34 },
    { name: 'Business', icon: 'Briefcase', color: 'bg-orange-500', count: 41 },
  ]

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative gradient-emerald">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} custom={0}>
              <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-1.5 text-sm">
                <Zap className="h-3.5 w-3.5 mr-1.5" />
                New: AI-Powered Learning Paths
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              custom={1}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight"
            >
              Unlock Your
              <br />
              Potential with
              <br />
              <span className="text-emerald-200">Online Learning</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10"
            >
              Access world-class courses from expert instructors. Build real skills,
              earn certificates, and advance your career at your own pace.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              custom={3}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                onClick={() => navigate('courses')}
                className="bg-white text-emerald-700 hover:bg-white/90 text-base px-8 h-12 rounded-xl shadow-lg shadow-black/10"
              >
                Browse Courses
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('register')}
                className="border-white/40 text-white hover:bg-white/10 text-base px-8 h-12 rounded-xl"
              >
                <Play className="h-4 w-4 mr-2" />
                Start Learning
              </Button>
            </motion.div>
          </motion.div>
        </div>
        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 40C360 80 720 0 1080 40C1260 60 1380 50 1440 40V80H0V40Z" className="fill-background" />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div key={stat.label} variants={fadeInUp} custom={i}>
                <Card className="text-center border-0 shadow-md">
                  <CardContent className="pt-6 pb-6">
                    <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} custom={0} className="text-center mb-12">
              <Badge variant="secondary" className="mb-3">Popular Courses</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured Courses</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Hand-picked courses by our experts to help you get started on your learning journey.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} custom={1}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.slice(0, 6).map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
              <div className="text-center mt-10">
                <Button variant="outline" size="lg" onClick={() => navigate('courses')}>
                  View All Courses
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} custom={0} className="text-center mb-12">
              <Badge variant="secondary" className="mb-3">Categories</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Explore Topics</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find the perfect course from our wide range of categories.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} custom={1}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {categories.map((cat) => {
                  const IconComp = iconMap[cat.icon] || BookOpen
                  return (
                    <motion.button
                      key={cat.name}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate('courses')}
                      className="group"
                    >
                      <Card className="text-center p-6 border-0 shadow-md hover:shadow-lg transition-shadow h-full">
                        <CardContent className="p-0 flex flex-col items-center">
                          <div className={`h-12 w-12 rounded-xl ${cat.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                            <IconComp className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="font-semibold text-sm">{cat.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{cat.count} courses</p>
                        </CardContent>
                      </Card>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} custom={0} className="text-center mb-12">
              <Badge variant="secondary" className="mb-3">Getting Started</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Start your learning journey in three simple steps.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} custom={1}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {/* Connector line */}
                <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
                {steps.map((step, i) => (
                  <motion.div
                    key={step.title}
                    variants={fadeInUp}
                    custom={i + 1}
                    className="text-center relative"
                  >
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-5 relative z-10">
                      <step.icon className="h-7 w-7" />
                    </div>
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 text-5xl font-bold text-primary/10">
                      {i + 1}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground max-w-xs mx-auto">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} custom={0} className="text-center mb-12">
              <Badge variant="secondary" className="mb-3">Testimonials</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">What Our Students Say</h2>
            </motion.div>
            <motion.div variants={fadeInUp} custom={1}>
              <div className="relative max-w-3xl mx-auto">
                <Quote className="h-12 w-12 text-primary/15 absolute -top-4 -left-2" />
                <Card className="border-0 shadow-lg p-8 md:p-10">
                  <CardContent className="p-0">
                    <div className="text-center">
                      <Avatar className="h-16 w-16 mx-auto mb-4">
                        <AvatarFallback className="bg-primary/10 text-primary text-xl">
                          {testimonials[testimonialIdx].avatar}
                        </AvatarFallback>
                      </Avatar>
                      <StarRating rating={testimonials[testimonialIdx].rating} size="lg" className="justify-center mb-4" />
                      <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-6 italic">
                        &ldquo;{testimonials[testimonialIdx].comment}&rdquo;
                      </p>
                      <div>
                        <p className="font-semibold">{testimonials[testimonialIdx].name}</p>
                        <p className="text-sm text-muted-foreground">{testimonials[testimonialIdx].role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex justify-center gap-3 mt-6">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full"
                    onClick={() => setTestimonialIdx((i) => (i - 1 + testimonials.length) % testimonials.length)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setTestimonialIdx(i)}
                        className={`h-2 rounded-full transition-all ${i === testimonialIdx ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/30'}`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full"
                    onClick={() => setTestimonialIdx((i) => (i + 1) % testimonials.length)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Instructor Spotlight */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} custom={0} className="text-center mb-12">
              <Badge variant="secondary" className="mb-3">Expert Instructors</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Learn from the Best</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our instructors are industry professionals with years of experience.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} custom={1}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {mockInstructors.map((inst, i) => (
                  <motion.div
                    key={inst.id}
                    variants={fadeInUp}
                    custom={i + 1}
                    whileHover={{ y: -4 }}
                  >
                    <Card className="text-center p-6 border-0 shadow-md">
                      <CardContent className="p-0">
                        <Avatar className="h-20 w-20 mx-auto mb-4">
                          <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                            {inst.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold">{inst.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{inst.bio}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={0}
          >
            <div className="relative gradient-emerald rounded-2xl p-10 md:p-16 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.15),transparent)]" />
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Start Your Learning Journey Today
                </h2>
                <p className="text-white/80 max-w-xl mx-auto mb-8">
                  Join thousands of learners who are already building their future with LearnHub.
                  Get unlimited access to our entire course library.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    size="lg"
                    onClick={() => navigate('register')}
                    className="bg-white text-emerald-700 hover:bg-white/90 text-base px-8 h-12 rounded-xl"
                  >
                    Get Started for Free
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate('pricing')}
                    className="border-white/40 text-white hover:bg-white/10 text-base px-8 h-12 rounded-xl"
                  >
                    View Plans
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

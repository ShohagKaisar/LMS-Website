'use client'

import { motion } from 'framer-motion'
import { Users, BookOpen, GraduationCap, Globe, Target, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAppStore } from '@/lib/store'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
}

const team = [
  { name: 'Chris Johnson', role: 'CEO & Co-Founder', avatar: 'C' },
  { name: 'Sarah Chen', role: 'CTO & Co-Founder', avatar: 'S' },
  { name: 'James Wilson', role: 'Head of Product', avatar: 'J' },
  { name: 'Emily Rodriguez', role: 'Head of Design', avatar: 'E' },
  { name: 'Michael Park', role: 'Head of Content', avatar: 'M' },
  { name: 'Lisa Wang', role: 'Head of Marketing', avatar: 'L' },
]

const partners = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'IBM']

export default function AboutView() {
  const navigate = useAppStore((s) => s.navigate)

  return (
    <div>
      {/* Hero */}
      <section className="gradient-emerald py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <Badge className="mb-4 bg-white/20 text-white border-white/30">About Us</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Empowering Learners Worldwide
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              We believe education should be accessible, engaging, and transformative.
              Our mission is to connect curious minds with world-class instructors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.div variants={fadeInUp} custom={0}>
                <Badge variant="secondary" className="mb-3">Our Mission</Badge>
                <h2 className="text-3xl font-bold mb-4">Making Quality Education Accessible</h2>
              </motion.div>
              <motion.p variants={fadeInUp} custom={1} className="text-muted-foreground leading-relaxed mb-4">
                LearnHub was founded in 2020 with a simple idea: everyone deserves access to high-quality education regardless of their location, background, or financial situation.
              </motion.p>
              <motion.p variants={fadeInUp} custom={2} className="text-muted-foreground leading-relaxed mb-6">
                We work with industry experts and passionate educators to create courses that are not just informative but truly engaging. Our platform combines cutting-edge technology with proven pedagogical methods to deliver an exceptional learning experience.
              </motion.p>
              <motion.div variants={fadeInUp} custom={3} className="grid grid-cols-2 gap-4">
                {[
                  { icon: Target, label: 'Mission-driven' },
                  { icon: Heart, label: 'Student-first' },
                  { icon: Globe, label: 'Global reach' },
                  { icon: GraduationCap, label: 'Expert-led' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <item.icon className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="gradient-emerald rounded-2xl h-80 flex items-center justify-center"
            >
              <GraduationCap className="h-24 w-24 text-white/30" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, value: '10,000+', label: 'Students' },
              { icon: BookOpen, value: '500+', label: 'Courses' },
              { icon: GraduationCap, value: '200+', label: 'Instructors' },
              { icon: Globe, value: '120+', label: 'Countries' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={i}
              >
                <Card className="text-center border-0 shadow-md">
                  <CardContent className="py-6">
                    <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-3">Our Team</Badge>
            <h2 className="text-3xl font-bold mb-3">Meet the Team</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Passionate people building the future of online education.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={i}
                whileHover={{ y: -4 }}
              >
                <Card className="text-center p-4 border-0 shadow-md">
                  <CardContent className="p-0">
                    <Avatar className="h-16 w-16 mx-auto mb-3">
                      <AvatarFallback className="bg-primary/10 text-primary text-lg">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-sm">{member.name}</h3>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <Badge variant="secondary" className="mb-3">Trusted By</Badge>
          <h2 className="text-2xl font-bold mb-8">Our Partners</h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {partners.map((partner) => (
              <div key={partner} className="px-6 py-3 bg-muted rounded-lg text-lg font-semibold text-muted-foreground">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

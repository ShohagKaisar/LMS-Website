'use client'

import { GraduationCap, Mail, Github, Twitter, Linkedin, Youtube } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useAppStore } from '@/lib/store'

const footerLinks = {
  Company: [
    { label: 'About Us', view: 'about' },
    { label: 'Careers', view: 'about' },
    { label: 'Blog', view: 'blog' },
    { label: 'Contact', view: 'contact' },
  ],
  Courses: [
    { label: 'Web Development', view: 'courses' },
    { label: 'Data Science', view: 'courses' },
    { label: 'Design', view: 'courses' },
    { label: 'Business', view: 'courses' },
  ],
  Resources: [
    { label: 'Help Center', view: 'contact' },
    { label: 'Community', view: 'home' },
    { label: 'Partners', view: 'about' },
    { label: 'Affiliates', view: 'home' },
  ],
  Legal: [
    { label: 'Terms of Service', view: 'home' },
    { label: 'Privacy Policy', view: 'home' },
    { label: 'Cookie Policy', view: 'home' },
    { label: 'Accessibility', view: 'home' },
  ],
}

const socialLinks = [
  { icon: Twitter, label: 'Twitter' },
  { icon: Github, label: 'GitHub' },
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Youtube, label: 'YouTube' },
]

export function Footer() {
  const navigate = useAppStore((s) => s.navigate)

  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Newsletter */}
        <div className="py-10 border-b">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">Stay in the loop</h3>
              <p className="text-sm text-muted-foreground">
                Get the latest updates, articles, and resources delivered to your inbox.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full md:w-auto gap-2"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full md:w-64"
              />
              <Button type="submit">
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Links */}
        <div className="py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigate(link.view)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator />

        {/* Bottom */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sm">
              Learn<span className="text-primary">Hub</span>
            </span>
            <span className="text-xs text-muted-foreground ml-2">
              © {new Date().getFullYear()} All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <Button
                key={social.label}
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <social.icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageSquare, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const contactInfo = [
  { icon: Mail, title: 'Email', detail: 'support@learnhub.com', sub: 'We reply within 24 hours' },
  { icon: Phone, title: 'Phone', detail: '+1 (555) 123-4567', sub: 'Mon-Fri, 9am-6pm EST' },
  { icon: MapPin, title: 'Office', detail: '123 Education St, San Francisco, CA', sub: 'Visit us anytime' },
]

const faqs = [
  { q: 'How do I enroll in a course?', a: 'Simply browse our course catalog, select a course, and click "Enroll Now". You can pay with credit card or PayPal. You will get instant access to the course content.' },
  { q: 'Can I get a refund?', a: 'Yes! We offer a 30-day money-back guarantee on all paid courses. If you are not satisfied, contact our support team for a full refund.' },
  { q: 'How do I access my certificate?', a: 'Once you complete all the lessons and pass the final assessment, your certificate will be automatically generated and available for download from your dashboard.' },
  { q: 'Do you offer group discounts?', a: 'Yes, we offer special pricing for teams of 5 or more. Contact our sales team at sales@learnhub.com for a custom quote.' },
]

export default function ContactView() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Get in Touch</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Have a question, suggestion, or just want to say hello? We would love to hear from you.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {contactInfo.map((info) => (
          <Card key={info.title} className="text-center border-0 shadow-md">
            <CardContent className="py-6">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <info.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-1">{info.title}</h3>
              <p className="text-sm font-medium">{info.detail}</p>
              <p className="text-xs text-muted-foreground mt-1">{info.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" required className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="What is this about?" required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Tell us more..." rows={5} required className="mt-1.5" />
            </div>
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              {submitted ? 'Message Sent!' : 'Send Message'}
              <Send className="h-4 w-4 ml-2" />
            </Button>
          </form>
        </div>

        {/* Map placeholder */}
        <div className="bg-muted rounded-2xl h-80 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <MapPin className="h-12 w-12 mx-auto mb-3 opacity-40" />
            <p className="text-sm">Map placeholder</p>
            <p className="text-xs">San Francisco, CA</p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <MessageSquare className="h-8 w-8 text-primary mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Quick answers to common questions.</p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

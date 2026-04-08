'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, ArrowRight, Zap, Crown, Building } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useAppStore } from '@/lib/store'

const plans = [
  {
    name: 'Free',
    icon: Zap,
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    color: 'bg-muted',
    features: [
      'Access to free courses only',
      'Basic progress tracking',
      'Community access',
      'Email support',
    ],
    notIncluded: [
      'Premium courses',
      'Certificates',
      'Offline access',
      'Mentor support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    icon: Crown,
    price: '$29',
    period: '/month',
    description: 'Best for serious learners',
    color: 'bg-primary',
    features: [
      'Access to all courses',
      'Certificates of completion',
      'Offline access',
      'Priority support',
      'Learning paths',
      'Project reviews',
      'Mentor access',
    ],
    notIncluded: [],
    cta: 'Start Pro Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    icon: Building,
    price: '$99',
    period: '/month',
    description: 'For teams and organizations',
    color: 'bg-muted',
    features: [
      'Everything in Pro',
      'Team management dashboard',
      'Custom learning paths',
      'Dedicated account manager',
      'SSO & integrations',
      'Analytics & reports',
      'API access',
    ],
    notIncluded: [],
    cta: 'Contact Sales',
    popular: false,
  },
]

const faqs = [
  { q: 'Can I cancel my subscription anytime?', a: 'Yes! You can cancel your subscription at any time. You will continue to have access until the end of your billing period.' },
  { q: 'Is there a free trial for the Pro plan?', a: 'Yes, we offer a 7-day free trial for the Pro plan. No credit card required to start.' },
  { q: 'Do you offer refunds?', a: 'Yes, we offer a 30-day money-back guarantee on all paid plans. If you are not satisfied, contact our support team.' },
  { q: 'Can I switch between plans?', a: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.' },
  { q: 'Are certificates included?', a: 'Pro and Enterprise plans include certificates of completion for all courses. Free users do not receive certificates.' },
  { q: 'Do you offer team discounts?', a: 'Yes, Enterprise plans include team pricing. Contact our sales team for custom pricing for groups of 10 or more.' },
]

export default function PricingView() {
  const navigate = useAppStore((s) => s.navigate)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <Badge variant="secondary" className="mb-3">Pricing</Badge>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          Simple, Transparent Pricing
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Choose the plan that fits your learning goals. Upgrade or downgrade anytime.
        </motion.p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (i + 1) }}
          >
            <Card className={`relative h-full flex flex-col ${plan.popular ? 'border-primary shadow-lg shadow-primary/10 scale-[1.02]' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-3">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <div className={`h-12 w-12 rounded-xl ${plan.color} flex items-center justify-center mx-auto mb-4 ${plan.popular ? 'text-primary-foreground' : 'text-primary'}`}>
                  <plan.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <div className="space-y-3 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <X className="h-4 w-4 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <Button
                  className="w-full"
                  variant={plan.popular ? 'default' : 'outline'}
                  size="lg"
                  onClick={() => {
                    if (plan.name === 'Enterprise') navigate('contact')
                    else navigate('register')
                  }}
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Feature Comparison */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-center mb-8">Feature Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Feature</th>
                <th className="text-center py-3 px-4 font-medium">Free</th>
                <th className="text-center py-3 px-4 font-medium text-primary">Pro</th>
                <th className="text-center py-3 px-4 font-medium">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Free courses', true, true, true],
                ['Premium courses', false, true, true],
                ['Certificates', false, true, true],
                ['Learning paths', false, true, true],
                ['Offline access', false, true, true],
                ['Project reviews', false, true, true],
                ['Team management', false, false, true],
                ['Custom paths', false, false, true],
                ['API access', false, false, true],
                ['Priority support', false, true, true],
                ['Dedicated manager', false, false, true],
              ].map(([feature, ...vals], i) => (
                <tr key={i} className="border-b">
                  <td className="py-3 px-4">{feature}</td>
                  {(vals as boolean[]).map((v, j) => (
                    <td key={j} className="text-center py-3 px-4">
                      {v ? <Check className="h-4 w-4 text-primary mx-auto" /> : <X className="h-4 w-4 text-muted-foreground/40 mx-auto" />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
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

'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { mockCourses } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { CreditCard, CheckCircle2, ArrowLeft, ShoppingBag, Tag, Truck } from 'lucide-react'

export function CheckoutView() {
  const { navigate, goBack, cartItems, clearCart } = useAppStore()
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponDiscount, setCouponDiscount] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [formData, setFormData] = useState({
    name: '', email: '', address: '', city: '', country: 'United States', zip: ''
  })

  const coursesInCart = mockCourses.filter(c => cartItems.includes(c.id))
  const subtotal = coursesInCart.reduce((sum, c) => sum + c.price, 0)
  const discount = couponApplied ? subtotal * (couponDiscount / 100) : 0
  const total = subtotal - discount

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase()
    if (code === 'LEARN20' || code === 'WELCOME50') {
      const disc = code === 'WELCOME50' ? 50 : 20
      setCouponApplied(true)
      setCouponDiscount(disc)
    }
  }

  const handlePlaceOrder = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setOrderComplete(true)
      clearCart()
    }, 2000)
  }

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-3">Order Placed Successfully!</h2>
        <p className="text-muted-foreground mb-2">Thank you for your purchase. Your enrollment is confirmed.</p>
        <p className="text-sm text-muted-foreground mb-8">A confirmation email has been sent to your email address.</p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => navigate('dashboard')} className="bg-emerald-600 hover:bg-emerald-700">
            Go to Dashboard
          </Button>
          <Button variant="outline" onClick={() => navigate('courses')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  if (coursesInCart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Browse our courses and add some to your cart.</p>
        <Button onClick={() => navigate('courses')} className="bg-emerald-600 hover:bg-emerald-700">
          Browse Courses
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <button onClick={goBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Billing Information */}
          <Card>
            <CardHeader><CardTitle>Billing Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Main St" value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="New York" value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="10001" value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader><CardTitle>Payment Method</CardTitle></CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                {[
                  { value: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, AMEX', icon: CreditCard },
                  { value: 'paypal', label: 'PayPal', desc: 'Pay with your PayPal account', icon: CreditCard },
                  { value: 'bank', label: 'Bank Transfer', desc: 'Direct bank transfer', icon: Truck },
                ].map((method) => (
                  <label key={method.value} className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${paymentMethod === method.value ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'hover:bg-muted/50'}`}>
                    <RadioGroupItem value={method.value} />
                    <method.icon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{method.label}</p>
                      <p className="text-xs text-muted-foreground">{method.desc}</p>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Coupon */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Tag className="h-5 w-5" /> Coupon Code</CardTitle></CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Input placeholder="Enter coupon code (try LEARN20 or WELCOME50)"
                  value={couponCode} onChange={(e) => setCouponCode(e.target.value)}
                  disabled={couponApplied} />
                <Button variant={couponApplied ? 'secondary' : 'default'}
                  onClick={couponApplied ? () => { setCouponApplied(false); setCouponDiscount(0) } : applyCoupon}
                  className={couponApplied ? '' : 'bg-emerald-600 hover:bg-emerald-700'}>
                  {couponApplied ? 'Remove' : 'Apply'}
                </Button>
              </div>
              {couponApplied && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-2">
                  Coupon applied! You save {couponDiscount}% ({discount.toFixed(2)})
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-24">
            <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {coursesInCart.map((course) => (
                <div key={course.id} className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{course.title}</p>
                    <p className="text-xs text-muted-foreground">{course.instructorName}</p>
                  </div>
                  <p className="text-sm font-semibold shrink-0">${course.price}</p>
                </div>
              ))}
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-sm text-emerald-600 dark:text-emerald-400">
                    <span>Discount ({couponDiscount}%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>$0.00</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-base font-semibold"
                onClick={handlePlaceOrder} disabled={isProcessing}>
                {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                30-day money-back guarantee. Secure checkout.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CheckoutView

'use client'

import { useState } from 'react'
import { Eye, EyeOff, LogIn, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { useAppStore } from '@/lib/store'
import { loginUser, getDemoUsers } from '@/lib/api'

export default function LoginView() {
  const { login, navigate } = useAppStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await loginUser(email, password)
      if (result.success && result.data) {
        const roleMap: Record<string, string> = {
          ADMIN: 'admin',
          INSTRUCTOR: 'instructor',
          STUDENT: 'student',
        }
        const user = {
          id: result.data.id,
          name: result.data.name,
          email: result.data.email,
          role: roleMap[result.data.role] || result.data.role.toLowerCase(),
          avatar: result.data.image || '',
          bio: result.data.bio || '',
        }
        login(user)
        const view = user.role === 'admin' ? 'admin-dashboard' : user.role === 'instructor' ? 'instructor-dashboard' : 'dashboard'
        navigate(view)
      } else {
        setError(result.error || 'Invalid credentials')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = (role: 'admin' | 'instructor' | 'student') => {
    const demoUsers = getDemoUsers()
    const user = demoUsers.find((u) => u.role === role)!
    login(user)
    const view = role === 'admin' ? 'admin-dashboard' : role === 'instructor' ? 'instructor-dashboard' : 'dashboard'
    navigate(view)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardHeader className="text-center pb-2">
          <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4">
            <LogIn className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to your LearnHub account</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          {/* Demo Login Buttons */}
          <div className="mb-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-3 text-center font-medium">Quick Demo Login</p>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm" className="text-xs h-8" onClick={() => handleDemoLogin('student')}>
                Student
              </Button>
              <Button variant="outline" size="sm" className="text-xs h-8" onClick={() => handleDemoLogin('instructor')}>
                Instructor
              </Button>
              <Button variant="outline" size="sm" className="text-xs h-8" onClick={() => handleDemoLogin('admin')}>
                Admin
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 text-center">
              Or use: admin@lms.com / admin123
            </p>
          </div>

          <Separator className="mb-6" />

          {error && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive text-sm rounded-lg text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1.5"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button type="button" className="text-xs text-primary hover:underline">
                  Forgot password?
                </button>
              </div>
              <div className="relative mt-1.5">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" checked={rememberMe} onCheckedChange={(v) => setRememberMe(v as boolean)} />
              <Label htmlFor="remember" className="text-sm">Remember me</Label>
            </div>
            <Button type="submit" className="w-full h-11" size="lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <Separator className="my-6" />

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full" onClick={handleSubmit}>
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </Button>
            <Button variant="outline" className="w-full" onClick={handleSubmit}>
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don&apos;t have an account?{' '}
            <button onClick={() => navigate('register')} className="text-primary font-medium hover:underline">
              Sign up
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

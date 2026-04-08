'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  Sun,
  Moon,
  ShoppingCart,
  Menu,
  X,
  Search,
  User,
  LogOut,
  LayoutDashboard,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAppStore } from '@/lib/store'

const publicLinks = [
  { label: 'Home', view: 'home' },
  { label: 'Courses', view: 'courses' },
  { label: 'Pricing', view: 'pricing' },
  { label: 'About', view: 'about' },
  { label: 'Blog', view: 'blog' },
  { label: 'Contact', view: 'contact' },
]

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  const {
    currentView,
    navigate,
    isAuthenticated,
    currentUser,
    login,
    logout,
    cartItems,
    mobileMenuOpen,
    toggleMobileMenu,
    searchQuery,
    setSearchQuery,
  } = useAppStore()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate('search-results')
      toggleMobileMenu()
    }
  }

  const dashboardView =
    currentUser?.role === 'admin'
      ? 'admin-dashboard'
      : currentUser?.role === 'instructor'
        ? 'instructor-dashboard'
        : 'dashboard'

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-background/80 backdrop-blur-xl border-b shadow-sm'
            : 'bg-background/60 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-2 shrink-0"
            >
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl hidden sm:block">
                Learn<span className="text-primary">Hub</span>
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {publicLinks.map((link) => (
                <button
                  key={link.view}
                  onClick={() => navigate(link.view)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === link.view
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop Search */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  className="pl-9 bg-muted/50 border-0 focus-visible:ring-1 h-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>

            {/* Desktop Right */}
            <div className="hidden lg:flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="h-9 w-9"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('checkout')}
                className="h-9 w-9 relative"
              >
                <ShoppingCart className="h-4 w-4" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 h-9 px-2">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {currentUser?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium hidden xl:block">
                        {currentUser?.name?.split(' ')[0]}
                      </span>
                      <ChevronDown className="h-3 w-3 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => navigate(dashboardView)}>
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('profile')}>
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    className="h-9 text-sm"
                    onClick={() => navigate('login')}
                  >
                    Log in
                  </Button>
                  <Button
                    className="h-9 text-sm"
                    onClick={() => navigate('register')}
                  >
                    Sign up
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile buttons */}
            <div className="flex lg:hidden items-center gap-1">
              <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 relative" onClick={() => navigate('checkout')}>
                <ShoppingCart className="h-4 w-4" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9" onClick={toggleMobileMenu}>
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b bg-background overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              <nav className="space-y-1">
                {publicLinks.map((link) => (
                  <button
                    key={link.view}
                    onClick={() => {
                      navigate(link.view)
                      toggleMobileMenu()
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentView === link.view
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
              <div className="pt-3 border-t flex gap-2">
                {isAuthenticated ? (
                  <>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        navigate(dashboardView)
                        toggleMobileMenu()
                      }}
                    >
                      Dashboard
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        logout()
                        toggleMobileMenu()
                      }}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        navigate('login')
                        toggleMobileMenu()
                      }}
                    >
                      Log in
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => {
                        navigate('register')
                        toggleMobileMenu()
                      }}
                    >
                      Sign up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

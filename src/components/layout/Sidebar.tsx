'use client'

import { cn } from '@/lib/utils'
import { useAppStore } from '@/lib/store'
import {
  LayoutDashboard,
  BookOpen,
  Award,
  Heart,
  User,
  GraduationCap,
  Users,
  DollarSign,
  BarChart3,
  Settings,
  FileText,
  MessageSquare,
  ClipboardList,
  Shield,
  TrendingUp,
  LogOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

interface MenuItem {
  icon: React.ElementType
  label: string
  view: string
  params?: Record<string, string>
}

const studentMenu: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', view: 'dashboard' },
  { icon: BookOpen, label: 'My Courses', view: 'my-courses' },
  { icon: Heart, label: 'Wishlist', view: 'wishlist' },
  { icon: Award, label: 'Certificates', view: 'certificates' },
  { icon: User, label: 'Profile', view: 'profile' },
]

const instructorMenu: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', view: 'instructor-dashboard' },
  { icon: FileText, label: 'My Courses', view: 'instructor-courses' },
  { icon: Users, label: 'Students', view: 'instructor-students' },
  { icon: MessageSquare, label: 'Messages', view: 'instructor-dashboard' },
  { icon: DollarSign, label: 'Revenue', view: 'instructor-dashboard' },
  { icon: User, label: 'Profile', view: 'profile' },
]

const adminMenu: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', view: 'admin-dashboard' },
  { icon: Users, label: 'Users', view: 'admin-users' },
  { icon: GraduationCap, label: 'Courses', view: 'admin-courses' },
  { icon: BarChart3, label: 'Analytics', view: 'admin-analytics' },
  { icon: ClipboardList, label: 'Reports', view: 'admin-dashboard' },
  { icon: Shield, label: 'Settings', view: 'admin-dashboard' },
]

export function Sidebar() {
  const { currentUser, currentView, navigate, logout, sidebarOpen, toggleSidebar } =
    useAppStore()

  if (!currentUser) return null

  const role = currentUser.role || 'student'
  const menu = role === 'admin' ? adminMenu : role === 'instructor' ? instructorMenu : studentMenu

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col h-screen sticky top-0 border-r bg-card transition-all duration-300',
          sidebarOpen ? 'w-64' : 'w-16'
        )}
      >
        {/* Header */}
        <div className="p-4 flex items-center gap-3">
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarFallback className="bg-primary/10 text-primary text-sm">
              {currentUser?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{currentUser?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{role}</p>
            </div>
          )}
        </div>

        <Separator />

        {/* Menu */}
        <nav className="flex-1 p-3 space-y-1 custom-scrollbar overflow-y-auto">
          {menu.map((item) => {
            const isActive = currentView === item.view
            return (
              <button
                key={item.view + item.label}
                onClick={() => navigate(item.view, item.params)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {sidebarOpen && <span className="truncate">{item.label}</span>}
              </button>
            )
          })}
        </nav>

        <Separator />

        {/* Footer */}
        <div className="p-3 space-y-1">
          <button
            onClick={toggleSidebar}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Settings className="h-4 w-4 shrink-0" />
            {sidebarOpen && <span>Collapse</span>}
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Mobile sidebar toggle (for dashboard pages) */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <Button
          onClick={toggleSidebar}
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg bg-primary text-primary-foreground"
        >
          <LayoutDashboard className="h-5 w-5" />
        </Button>
      </div>
    </>
  )
}

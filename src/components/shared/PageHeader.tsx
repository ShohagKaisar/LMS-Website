'use client'

import { ChevronRight } from 'lucide-react'
import { useAppStore } from '@/lib/store'

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: { label: string; view: string; params?: Record<string, string> }[]
  actions?: React.ReactNode
}

export function PageHeader({ title, description, breadcrumbs, actions }: PageHeaderProps) {
  const navigate = useAppStore((s) => s.navigate)

  return (
    <div className="mb-6">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <button
            onClick={() => navigate('home')}
            className="hover:text-foreground transition-colors"
          >
            Home
          </button>
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              <ChevronRight className="h-3 w-3" />
              <button
                onClick={() => navigate(crumb.view, crumb.params)}
                className="hover:text-foreground transition-colors"
              >
                {crumb.label}
              </button>
            </span>
          ))}
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">{title}</span>
        </nav>
      )}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  )
}

import { create } from 'zustand'

interface AppState {
  // Navigation
  currentView: string
  viewParams: Record<string, string>
  navigate: (view: string, params?: Record<string, string>) => void
  goBack: () => void

  // Auth
  currentUser: any | null
  isAuthenticated: boolean
  login: (user: any) => void
  logout: () => void

  // Theme
  theme: 'light' | 'dark'
  toggleTheme: () => void

  // UI State
  sidebarOpen: boolean
  toggleSidebar: () => void
  mobileMenuOpen: boolean
  toggleMobileMenu: () => void

  // Search
  searchQuery: string
  setSearchQuery: (query: string) => void

  // Cart
  cartItems: string[] // course IDs
  addToCart: (courseId: string) => void
  removeFromCart: (courseId: string) => void
  clearCart: () => void
}

const NAVIGATION_HISTORY: Array<{ view: string; params: Record<string, string> }> = []

export const useAppStore = create<AppState>((set, get) => ({
  // Navigation
  currentView: 'home',
  viewParams: {},
  navigate: (view, params = {}) => {
    const { currentView, viewParams } = get()
    NAVIGATION_HISTORY.push({ view: currentView, params: { ...viewParams } })
    set({ currentView: view, viewParams: params })
  },
  goBack: () => {
    const prev = NAVIGATION_HISTORY.pop()
    if (prev) {
      set({ currentView: prev.view, viewParams: prev.params })
    }
  },

  // Auth
  currentUser: null,
  isAuthenticated: false,
  login: (user) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lms_user', JSON.stringify(user))
    }
    set({ currentUser: user, isAuthenticated: true })
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lms_user')
    }
    set({ currentUser: null, isAuthenticated: false })
  },

  // Theme
  theme: 'light',
  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light'
    if (typeof window !== 'undefined') {
      localStorage.setItem('lms_theme', newTheme)
      document.documentElement.classList.toggle('dark', newTheme === 'dark')
    }
    set({ theme: newTheme })
  },

  // UI State
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  mobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),

  // Search
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Cart
  cartItems: [],
  addToCart: (courseId) =>
    set((state) => ({
      cartItems: state.cartItems.includes(courseId)
        ? state.cartItems
        : [...state.cartItems, courseId],
    })),
  removeFromCart: (courseId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((id) => id !== courseId),
    })),
  clearCart: () => set({ cartItems: [] }),
}))

// Initialize from localStorage on client side
if (typeof window !== 'undefined') {
  const savedUser = localStorage.getItem('lms_user')
  if (savedUser) {
    try {
      const user = JSON.parse(savedUser)
      useAppStore.setState({ currentUser: user, isAuthenticated: true })
    } catch {
      // ignore
    }
  }

  const savedTheme = localStorage.getItem('lms_theme') as 'light' | 'dark' | null
  if (savedTheme) {
    useAppStore.setState({ theme: savedTheme })
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }
}

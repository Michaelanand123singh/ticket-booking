import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
  role: string
  image?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  _hasHydrated: boolean
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  setHasHydrated: (state: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      _hasHydrated: false,
      setUser: (user) =>
        set({ 
          user, 
          isAuthenticated: !!(user && get().token) 
        }),
      setToken: (token) => 
        set({ 
          token, 
          isAuthenticated: !!(token && get().user) 
        }),
      setHasHydrated: (state) => {
        set({ _hasHydrated: state })
        // Recalculate isAuthenticated after hydration
        const { user, token } = get()
        set({ isAuthenticated: !!(user && token) })
      },
      logout: () =>
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false 
        }),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
        // Recalculate isAuthenticated after rehydration
        if (state) {
          const { user, token } = state
          state.isAuthenticated = !!(user && token)
        }
      },
    }
  )
)


import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'

export function useAuthCheck(redirectTo: string = '/login', requireAdmin: boolean = false) {
  const router = useRouter()
  const { isAuthenticated, token, user, _hasHydrated } = useAuthStore()
  const [isChecking, setIsChecking] = useState(true)
  const hasRedirected = useRef(false)

  useEffect(() => {
    // Wait for hydration to complete
    if (!_hasHydrated) {
      return
    }

    setIsChecking(false)

    // Prevent multiple redirects
    if (hasRedirected.current) {
      return
    }

    // Check if user is authenticated
    if (!isAuthenticated || !token || !user) {
      hasRedirected.current = true
      router.push(redirectTo)
      return
    }

    // Check if admin is required
    if (requireAdmin && user.role !== 'ADMIN') {
      hasRedirected.current = true
      router.push('/dashboard')
      return
    }
  }, [_hasHydrated, isAuthenticated, token, user, router, redirectTo, requireAdmin])

  return { isChecking, isAuthenticated: isAuthenticated && !!token && !!user, user, token }
}


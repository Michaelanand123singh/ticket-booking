import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Don't redirect login/register pages
  if (pathname === '/login' || pathname === '/register') {
    return NextResponse.next()
  }

  // Protected routes - actual authentication will be handled in the pages/components
  // Middleware is kept simple for Edge runtime compatibility - we'll let the pages handle auth
  // This prevents infinite redirects while still allowing pages to check auth properly
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
  ],
}


import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // List of protected routes that require authentication
  const protectedRoutes = ['/dashboard', '/profile', '/tests']
  
  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))
  
  // Get the session token from cookies
  const sessionToken = request.cookies.get('sb-access-token')?.value || request.cookies.get('sb-refresh-token')?.value

  // If trying to access protected route without session, redirect to login
  if (isProtectedRoute && !sessionToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // If logged in and trying to access auth pages, redirect to dashboard
  if (sessionToken && (path.startsWith('/auth/login') || path.startsWith('/auth/signup'))) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api/).*)',
  ],
}

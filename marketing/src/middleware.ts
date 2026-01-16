import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define protected routes
  const isProtectedPath = path.startsWith('/admin') && path !== '/admin/login';
  
  const token = request.cookies.get('admin_session')?.value;

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If user is logged in and tries to access login page, redirect to admin dashboard
  if (path === '/admin/login' && token) {
     return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Note: Since we're using localStorage for JWT tokens (client-side only),
// middleware cannot access them. Route protection is handled at the component level
// via AuthContext. This middleware is kept minimal for future cookie-based auth if needed.

export function middleware(request: NextRequest) {
  // Currently allowing all routes - protection handled in components
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};

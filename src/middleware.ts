// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log('path', path);
  const isPublicPath = [
    '/authentication/sign-in/',
    '/authentication/sign-up/',
    '/authentication/forgot-password/',
    '/authentication/logout/'
  ].includes(path);

  console.log('Middleware triggered for:', request.nextUrl.pathname);

  // Check for token in cookies or localStorage (via request headers)
  const token = request.cookies.get('access_token')?.value ||
    request.headers.get('authorization')?.split(' ')[1];

  console.log('isPublicPath', isPublicPath);
  console.log('token', token);

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/authentication/sign-in/', request.nextUrl))
  }

  // Allow the request to continue if authenticated or public path
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*'
  ],
};
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(req) {
  const token = cookies().get('token'); // Get the token from cookies

  const protectedRoutes = ['/dashboard', '/profile', '/products', '/redeem', '/requests'];

  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL('/login', req.url)); // Redirect to login if not authenticated
  }

  return NextResponse.next(); // Allow the request if the token exists
}

export const config = {
  matcher: ['/dashboard', '/profile', '/products', '/redeem', '/requests'],
};

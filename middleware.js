import { NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/session';

export async function middleware(request) {
  const token = request.cookies.get('session')?.value;
  const payload = token ? await verifySessionToken(token) : null;

  if (!payload) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};

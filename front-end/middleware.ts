import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    console.log('middleware');
    const pathname = request.nextUrl.pathname;
    const accessToken = (await cookies()).get('accessToken')?.value;
    if(pathname.startsWith('/login') && accessToken) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    } 
    if(pathname.startsWith('/dashboard') && !accessToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/login',
    '/dashboard'
  ],
}
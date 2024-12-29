import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkRole, handleRefreshToken } from "./app/lib/actions/api";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = cookies().get("accessToken")?.value;
  const refreshToken = cookies().get("refreshToken")?.value;
  console.log(accessToken);
  let role = null;
  if (!accessToken && refreshToken) {
    const fetchRefreshTokenAPI = await handleRefreshToken();
    if (fetchRefreshTokenAPI.status === 0) {
      // setTokens(fetchRefreshTokenAPI.data.accessToken, undefined);
      const response = NextResponse.redirect(request.nextUrl);
      response.cookies.set(
        "accessToken",
        fetchRefreshTokenAPI.data.accessToken,
        { maxAge: 15 * 60 }
      );
      return response;
    }
    if(fetchRefreshTokenAPI.status === -1) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  if (pathname.startsWith("/login") && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (
    (pathname.startsWith("/dashboard") ||
      pathname.startsWith("/transaction") ||
      pathname.startsWith("/transfer") ||
      pathname.startsWith("/contacts") ||
      pathname.startsWith("/payment-request")) &&
    !accessToken
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/login",
    "/dashboard",
    "/transaction/:path*",
    "/transfer/:path*",
    "/contacts/:path*",
    "/payment-request/:path*",
  ],
};
